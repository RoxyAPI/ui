#!/usr/bin/env bun
/**
 * Publish the shared form model for server renderers and platform integrations, without a DOM,
 * a live API call or a second field classifier. Existing per-operation schema URLs stay intact.
 * Labels come from the committed label-sync outputs; missing translations stay missing so a
 * consumer can use the English fallback, without translating API names at render time.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { API_LANGUAGES } from '../packages/ui/src/generated/api-languages.js';
import { EN_FIELD_LABELS } from '../packages/ui/src/generated/field-labels-en.js';
import serverLabelsJson from '../packages/ui/src/generated/form-labels.json';
import {
	type FieldLabels,
	labelsFor,
	translate,
} from '../packages/ui/src/i18n/registry.js';
import {
	buildFormModel,
	deriveGroupLabel,
	type FormModel,
	type SpecDoc,
} from '../packages/ui/src/utils/field-schema.js';
import { displayField } from '../packages/ui/src/utils/localized.js';
import { humanize } from '../packages/ui/src/utils/string.js';

const OUT_DIR = 'packages/ui/dist';
const LOCALES_DIR = 'packages/ui/src/locales';

/** Version identifies the manifest format, independently of the npm package version. */
export interface FormsManifest {
	version: 1;
	forms: Record<string, FormModel & { method: string; path: string }>;
}

/** Sort object keys recursively, keeping arrays in the model's render order. */
function ordered(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(ordered);
	if (value && typeof value === 'object')
		return Object.fromEntries(
			Object.entries(value)
				.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
				.map(([key, entry]) => [key, ordered(entry)]),
		);
	return value;
}

/** Generate forms.json and forms/labels/{lang}.json. Returns the number of operations written. */
export async function buildForms(outDir: string = OUT_DIR): Promise<number> {
	const spec = JSON.parse(
		await readFile('specs/openapi.json', 'utf8'),
	) as SpecDoc;
	const manifest: FormsManifest = { version: 1, forms: {} };
	const english: FieldLabels = { fields: { ...EN_FIELD_LABELS }, enums: {} };
	const addField = (name: string) => {
		english.fields[name] ??= humanize(name);
	};
	const methods = new Set([
		'get',
		'post',
		'put',
		'patch',
		'delete',
		'options',
		'head',
		'trace',
	]);
	for (const [path, item] of Object.entries(spec.paths)) {
		for (const [method, op] of Object.entries(item)) {
			if (!methods.has(method)) continue;
			if (!op.operationId)
				throw new Error(`Missing operationId: ${method} ${path}`);
			if (manifest.forms[op.operationId])
				throw new Error(`Duplicate operationId: ${op.operationId}`);
			const model = buildFormModel(
				op,
				spec.components?.schemas ?? {},
				path,
				method,
			);
			manifest.forms[op.operationId] = {
				...model,
				method: method.toUpperCase(),
				path,
			};
			for (const field of model.fields) {
				addField(field.name);
				for (const value of field.enum ?? [])
					english.enums[`${field.name}.${value}`] = humanize(value);
			}
			for (const repeat of model.repeats ?? []) addField(repeat.key);
		}
	}
	const catalogued = new Set(
		(await readdir(LOCALES_DIR))
			.filter((file) => file.endsWith('.ts'))
			.map((file) => file.replace(/\.ts$/, '')),
	);
	// The same API-language/chrome-catalogue intersection as sync-field-labels, plus English.
	const languages = API_LANGUAGES.filter(
		(lang) => lang === 'en' || catalogued.has(lang),
	).sort();
	await mkdir(`${outDir}/forms/labels`, { recursive: true });
	await writeFile(`${outDir}/forms.json`, JSON.stringify(ordered(manifest)));
	for (const lang of languages) {
		// Locale entries register their generated field-label modules through the browser's registry.
		if (lang !== 'en') await import(`../packages/ui/src/locales/${lang}.js`);
		const labels = lang === 'en' ? english : labelsFor(lang);
		if (!labels) throw new Error(`No field labels registered for ${lang}`);
		const server = (
			serverLabelsJson as Record<
				string,
				{ enums: Record<string, string>; labels: Record<string, string> }
			>
		)[lang];
		if (!server) throw new Error(`No generated server form labels for ${lang}`);
		const groups: Record<string, string> = {};
		for (const model of Object.values(manifest.forms)) {
			for (const group of model.groups ?? []) {
				if (group.key === undefined) continue;
				groups[group.key] = deriveGroupLabel(
					group.key,
					(source, vars) => translate(lang, source, vars),
					(name) => displayField(lang, name, EN_FIELD_LABELS[name]),
				);
			}
		}
		await writeFile(
			`${outDir}/forms/labels/${lang}.json`,
			JSON.stringify(
				ordered({
					...labels,
					enums: { ...labels.enums, ...server.enums },
					groups,
					labels: server.labels,
				}),
			),
		);
	}
	return Object.keys(manifest.forms).length;
}

if (import.meta.main) {
	// An optional destination lets callers generate isolated artifacts without touching dist.
	const outDir = process.argv[2] ?? OUT_DIR;
	const count = await buildForms(outDir);
	console.log(
		`Wrote ${count} forms to ${outDir}/forms.json and locale labels to ${outDir}/forms/labels`,
	);
}
