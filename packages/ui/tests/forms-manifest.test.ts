import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	mock,
	test,
} from 'bun:test';
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildSchemas } from '../../../scripts/build-schemas.js';
import specJson from '../../../specs/openapi.json';
import { API_LANGUAGES } from '../src/generated/api-languages.js';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import { EN_FIELD_LABELS } from '../src/generated/field-labels-en.js';
import serverLabelsJson from '../src/generated/form-labels.json';
import type { FieldLabels } from '../src/i18n/registry.js';
import {
	type FieldDef,
	type FormModel,
	type SpecDoc,
	sliceFileName,
} from '../src/utils/field-schema.js';
import { humanize } from '../src/utils/string.js';
import '../src/components/endpoint-form.js';

const spec = specJson as unknown as SpecDoc;
type ManifestLabels = FieldLabels & {
	groups: Record<string, string>;
	labels: Record<string, string>;
};
let out: string;
let manifest: {
	version: number;
	forms: Record<string, FormModel & { method: string; path: string }>;
};
let count: number;
const originalFetch = globalThis.fetch;

beforeAll(async () => {
	out = await mkdtemp(join(tmpdir(), 'roxy-forms-'));
	const output = await runBun(['scripts/build-forms.ts', out]);
	count = Number(/^Wrote (\d+) forms/m.exec(output)?.[1]);
	manifest = JSON.parse(await readFile(`${out}/forms.json`, 'utf8'));
});
afterEach(() => {
	globalThis.fetch = originalFetch;
});
afterAll(async () => {
	await rm(out, { recursive: true, force: true });
});

/** Run generation and reference label loading outside the process-global test registry. */
async function runBun(args: string[]): Promise<string> {
	const child = Bun.spawn([process.execPath, ...args], {
		stdout: 'pipe',
		stderr: 'pipe',
	});
	const [stdout, stderr, exitCode] = await Promise.all([
		new Response(child.stdout).text(),
		new Response(child.stderr).text(),
		child.exited,
	]);
	if (exitCode !== 0)
		throw new Error(`Bun child exited ${exitCode}: ${stderr || stdout}`);
	return stdout;
}

type FormEl = HTMLElement & { updateComplete: Promise<unknown> };
async function flush(el: FormEl) {
	for (let i = 0; i < 6; i++) {
		await el.updateComplete;
		await new Promise((resolve) => setTimeout(resolve, 0));
	}
}
async function mount(model: FormModel, method: string, path: string) {
	globalThis.fetch = mock(async (url: string | URL) =>
		String(url).includes('/schemas/')
			? { ok: true, json: async () => model }
			: { ok: false, status: 404, json: async () => ({}) },
	) as unknown as typeof fetch;
	const el = document.createElement('roxy-endpoint-form') as FormEl;
	el.setAttribute('data-endpoint', path.replace(/^\//, ''));
	el.setAttribute('method', method);
	document.body.appendChild(el);
	await flush(el);
	return el;
}

/** Read wire keys from real inputs and tile labels, excluding the component's title/help IDs. */
function renderedKeys(root: ShadowRoot): string[] {
	return [...root.querySelectorAll('[id]')]
		.flatMap((el) => {
			const id = el.id;
			if (!id.startsWith('roxy-form-')) return [];
			if (el.matches('input, select, textarea'))
				return [id.slice('roxy-form-'.length)];
			if (el.matches('.label') && id.endsWith('-label'))
				return [id.slice('roxy-form-'.length, -'-label'.length)];
			return [];
		})
		.sort();
}
function fieldNode(root: ShadowRoot, field: FieldDef): HTMLElement | null {
	return (
		root.getElementById(`roxy-form-${field.key}`) ??
		root.getElementById(`roxy-form-${field.key}-label`)
	);
}

describe('published forms manifest', () => {
	test('identifier labels carry the spec noun for every affected lookup', () => {
		const expected = {
			getRashi: 'Rashi',
			getDailyZodiacReading: 'Animal',
			getBaguaSector: 'Life area',
			getYoga: 'Yoga',
			getNakshatra: 'Nakshatra',
			getAvastha: 'Avastha',
			getCenter: 'Center',
			getDosha: 'Dosha',
			getHaabMonth: 'Haab period',
			getHebrewLetter: 'Letter',
			getMayanDaySign: 'Day sign',
			getAztecDaySign: 'Day sign',
			getDevata: 'Devata',
			getDikpalaDirection: 'Direction',
			getSephirah: 'Sephirah',
			getZodiacAnimal: 'Animal',
		};
		for (const [id, label] of Object.entries(expected))
			expect(
				manifest.forms[id]!.fields.find((f) => f.key === 'id')?.label,
			).toBe(label);
	});

	test('relocation coordinates have distinct fallback labels and unchanged wire names', () => {
		const model = manifest.forms.generateRelocationChart!;
		for (const [key, label] of Object.entries({
			birthLatitude: 'Birth latitude',
			birthLongitude: 'Birth longitude',
			relocationLatitude: 'Relocation latitude',
			relocationLongitude: 'Relocation longitude',
		}))
			expect(model.fields.find((f) => f.key === key)?.label).toBe(label);
	});

	test('every spec operation is present with method/path and the unchanged schema slice model', async () => {
		await buildSchemas(`${out}/schemas`);
		const operations = Object.entries(spec.paths).flatMap(([path, item]) =>
			Object.entries(item)
				.filter(([, op]) => op.operationId)
				.map(([method, op]) => ({
					path,
					method,
					id: op.operationId as string,
				})),
		);
		expect(Object.keys(manifest.forms).sort()).toEqual(
			operations.map((op) => op.id).sort(),
		);
		expect(count).toBe(operations.length);
		expect(manifest.version).toBe(1);
		for (const { id, method, path } of operations) {
			const {
				method: writtenMethod,
				path: writtenPath,
				...model
			} = manifest.forms[id]!;
			expect(writtenMethod).toBe(method.toUpperCase());
			expect(writtenPath).toBe(path);
			const slice = JSON.parse(
				await readFile(`${out}/schemas/${sliceFileName(method, path)}`, 'utf8'),
			);
			expect(model).toEqual(slice);
		}
	});

	test('rebuilding is byte-identical, with recursively sorted object keys and preserved field order', async () => {
		const before = await readFile(`${out}/forms.json`, 'utf8');
		const labelsBefore = await Promise.all(
			(await readdir(`${out}/forms/labels`)).map(
				async (file) =>
					[
						file,
						await readFile(`${out}/forms/labels/${file}`, 'utf8'),
					] as const,
			),
		);
		await runBun(['scripts/build-forms.ts', out]);
		expect(await readFile(`${out}/forms.json`, 'utf8')).toBe(before);
		const checkOrder = (value: unknown): void => {
			if (Array.isArray(value)) {
				value.forEach(checkOrder);
				return;
			}
			if (!value || typeof value !== 'object') return;
			expect(Object.keys(value)).toEqual(Object.keys(value).sort());
			Object.values(value).forEach(checkOrder);
		};
		checkOrder(manifest);
		for (const [file, text] of labelsBefore) {
			expect(await readFile(`${out}/forms/labels/${file}`, 'utf8')).toBe(text);
			checkOrder(JSON.parse(text));
		}
	});

	const paths = [
		'/astrology/natal-chart',
		'/astrology/relocation-chart',
		'/astrology/synastry',
		'/human-design/penta',
		'/human-design/type',
		'/numerology/chart',
		'/vastu/mandala',
		'/tarot/spreads/custom',
		'/astrology/horoscope/{sign}/daily',
		'/dreams/symbols',
		'/dreams/symbols/{id}',
		'/crystals',
		'/tarot/cards',
	];
	for (const path of paths)
		test(`Lit fields, folds and city fills match the manifest: ${path}`, async () => {
			const binding = Object.values(ENDPOINT_BINDINGS)
				.flat()
				.find((b) => b.path === path);
			expect(binding).toBeDefined();
			const method = binding!.method;
			const operation = spec.paths[path]?.[method.toLowerCase()];
			const model = manifest.forms[operation!.operationId!]!;
			const el = await mount(model, method, path);
			try {
				const root = el.shadowRoot!;
				const visible = model.fields.filter((f) => !f.role && !f.city);
				expect(renderedKeys(root)).toEqual(visible.map((f) => f.key).sort());
				for (const field of visible) {
					expect(!!fieldNode(root, field)?.closest('.advanced')).toBe(
						!!field.fold,
					);
				}
				const fieldsets = [...root.querySelectorAll('fieldset.person-group')];
				const named = model.groups!.filter((g) => g.key !== undefined);
				expect(fieldsets.length).toBe(named.length);
				expect(
					fieldsets.map((f) => f.querySelector('legend')?.textContent),
				).toEqual(named.map((g) => g.label));
				const cities = root.querySelectorAll('roxy-location-search');
				expect(cities.length).toBe(
					model.groups!.filter((g) => g.location).length +
						model.fields.filter((f) => f.city).length,
				);
				// Picking distinct cities proves exactly which wire keys each box fills, including timezone ownership.
				const state = el as unknown as { values: Record<string, unknown> };
				let cityIndex = 0;
				for (const group of model.groups!.filter((g) => g.location)) {
					const container =
						group.key === undefined ? root : fieldsets[named.indexOf(group)]!;
					const box = container.querySelector('roxy-location-search')!;
					expect(box).not.toBeNull();
					if (group.key !== undefined)
						expect(
							!!fieldsets[named.indexOf(group)]!.closest('.advanced'),
						).toBe(!!group.fold);
					const before = { ...state.values };
					const city = {
						latitude: 10 + cityIndex,
						longitude: 30 + cityIndex,
						timezone: 5 + cityIndex,
					};
					box.dispatchEvent(
						new CustomEvent('roxy-location-select', { detail: city }),
					);
					const changed = Object.keys(state.values)
						.filter((key) => state.values[key] !== before[key])
						.sort();
					expect(changed).toEqual([...group.location!.fields].sort());
					for (const key of group.location!.fields) {
						const field = model.fields.find((f) => f.key === key)!;
						expect(state.values[key]).toBe(
							city[field.name as keyof typeof city],
						);
					}
					cityIndex++;
				}
				for (const field of model.fields.filter((f) => f.city)) {
					const box = [...cities].find(
						(c) =>
							!model.groups!.some(
								(g) =>
									g.location &&
									g.key !== undefined &&
									fieldsets[named.indexOf(g)]?.contains(c),
							),
					)!;
					expect(!!box.closest('.advanced')).toBe(!!field.fold);
					const before = { ...state.values };
					box.dispatchEvent(
						new CustomEvent('roxy-location-select', {
							detail: { timezone: 'Asia/Kolkata' },
						}),
					);
					expect(state.values).toEqual({
						...before,
						[field.key]: 'Asia/Kolkata',
					});
				}
			} finally {
				el.remove();
			}
		});

	test('Spanish Lit translates a picker option the language names and reads a contextual label from the chrome catalogue', async () => {
		const rendered = JSON.parse(
			await runBun([
				'--preload',
				'./packages/ui/tests/setup.ts',
				'--eval',
				`await import('./packages/ui/src/components/endpoint-form.js');
			await import('./packages/ui/src/locales/es.js');
			const manifest = await Bun.file(${JSON.stringify(`${out}/forms.json`)}).json();
			const model = manifest.forms.getDailyZodiacReading;
			globalThis.fetch = async () => ({ok: true, json: async () => model});
			const el = document.createElement('roxy-endpoint-form');
			el.setAttribute('lang', 'es-AR');
			el.setAttribute('method', 'GET');
			el.setAttribute('data-endpoint', model.path);
			el.setAttribute('hide-sections', 'hint');
			document.body.appendChild(el);
			for(let i=0;i<6;i++) {await el.updateComplete; await new Promise(r=>setTimeout(r,0));}
			const options = [...el.shadowRoot.querySelectorAll('.tile-label')].slice(0,3).map(n=>n.textContent.trim());
			const label = el.shadowRoot.querySelector('.label').textContent.replace('*','').trim();
			// A contextual noun the chrome catalogue carries reads translated, as the server labels do.
			el.fields = manifest.forms.getCenter.fields;
			await el.updateComplete;
			console.log(JSON.stringify({ label, options, center: el.shadowRoot.querySelector('.label').textContent.replace('*','').trim() }));
			el.remove();`,
			]),
		);
		expect(rendered).toEqual({
			label: 'Animal',
			options: ['Rata', 'Buey', 'Tigre'],
			center: 'Centro',
		});
	});

	test('locale files match label sync, including deliberate gaps and English picker names', async () => {
		const catalogued = new Set(
			(await readdir('packages/ui/src/locales'))
				.filter((f) => f.endsWith('.ts'))
				.map((f) => f.slice(0, -3)),
		);
		const languages = API_LANGUAGES.filter(
			(lang) => lang === 'en' || catalogued.has(lang),
		).sort();
		expect(
			await readdir(`${out}/forms/labels`).then((files) => files.sort()),
		).toEqual(languages.map((lang) => `${lang}.json`).sort());
		const english: ManifestLabels = JSON.parse(
			await readFile(`${out}/forms/labels/en.json`, 'utf8'),
		);
		for (const model of Object.values(manifest.forms))
			for (const field of model.fields) {
				expect(english.fields[field.name]).toBe(
					EN_FIELD_LABELS[field.name] ?? humanize(field.name),
				);
				if (field.label) {
					const operationId = Object.entries(manifest.forms).find(
						([, m]) => m === model,
					)![0];
					expect(english.labels[`${operationId}.${field.key}`]).toBe(
						field.label,
					);
				}
				for (const value of field.enum ?? [])
					expect(english.enums[`${field.name}.${value}`]).toBe(
						(serverLabelsJson.en.enums as Record<string, string>)[
							`${field.name}.${value}`
						] ?? humanize(value),
					);
			}
		for (const model of Object.values(manifest.forms))
			for (const group of model.groups ?? [])
				if (group.key !== undefined) {
					expect(group.label).toBeDefined();
					expect(english.groups[group.key]).toBe(group.label!);
				}
		// Reference registration also runs in a child: no locale module touches this test process.
		const registered = JSON.parse(
			await runBun([
				'--eval',
				`const { labelsFor, translate } = await import('./packages/ui/src/i18n/registry.js');
			const { deriveGroupLabel, translatedFieldLabel } = await import('./packages/ui/src/utils/field-schema.js');
			const { displayField } = await import('./packages/ui/src/utils/localized.js');
			const { EN_FIELD_LABELS } = await import('./packages/ui/src/generated/field-labels-en.js');
			const manifest = await Bun.file(${JSON.stringify(`${out}/forms.json`)}).json();
			const serverLabels = await Bun.file('./packages/ui/src/generated/form-labels.json').json();
			const labels = {};
			for (const lang of process.argv.slice(1)) {
				await import('./packages/ui/src/locales/' + lang + '.js');
				const groups = {};
				for (const model of Object.values(manifest.forms))
					for (const group of model.groups ?? [])
						if (group.key !== undefined)
							groups[group.key] = deriveGroupLabel(group.key, (source, vars) => translate(lang, source, vars), name => displayField(lang, name, EN_FIELD_LABELS[name]));
				const contextual = {};
				for (const [operationId, model] of Object.entries(manifest.forms))
					for (const field of model.fields) {
						if (!field.label) continue;
						const label = translatedFieldLabel(lang, field);
						if (label !== undefined) contextual[operationId + '.' + field.key] = label;
					}
				const runtime = labelsFor(lang);
				if (Object.keys(runtime.enums).some(key => key.startsWith('id.') && runtime.enums[key] === serverLabels.en.enums[key])) throw new Error('A picker name that reads as English rode the runtime payload in ' + lang);
				labels[lang] = { ...runtime, enums: {...runtime.enums, ...serverLabels[lang].enums}, groups, labels: contextual };
			}
			console.log(JSON.stringify(labels));`,
				...languages.filter((lang) => lang !== 'en'),
			]),
		) as Record<string, ManifestLabels>;
		for (const lang of languages.filter((l) => l !== 'en')) {
			const labels: ManifestLabels = JSON.parse(
				await readFile(`${out}/forms/labels/${lang}.json`, 'utf8'),
			);
			expect(labels).toEqual(registered[lang]);
			for (const key of Object.keys(english.fields))
				expect<string | undefined>(labels.fields[key]).toBe(
					registered[lang]?.fields[key],
				);
			for (const key of Object.keys(english.enums))
				expect<string | undefined>(labels.enums[key]).toBe(
					registered[lang]?.enums[key],
				);
		}
		expect(registered.es?.labels['generateRelocationChart.birthLatitude']).toBe(
			'Latitud de nacimiento',
		);
		expect(registered.es?.labels['getRashi.id']).toBe('Rashi');
		expect(registered.es?.labels['getDailyZodiacReading.id']).toBeUndefined();
		expect(registered.es?.labels['getBaguaSector.id']).toBeUndefined();
		expect(registered.es?.groups.personA).toBe('Persona A');
		expect(registered.es?.groups.person1).toBe('Persona 1');
		expect(registered.es?.groups.plot).toBe('Terreno');
		expect(registered.es?.groups.natalChart).toBe('Carta natal');
	});
});
