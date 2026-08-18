import { afterEach, describe, expect, mock, test } from 'bun:test';
import spec from '../../../specs/openapi.json';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import {
	buildFormModel,
	type FormModel,
	type OpenApiSchema,
	type OperationSchema,
} from '../src/utils/field-schema.js';
// Registers roxy-endpoint-form (and roxy-location-search it slots).
import '../src/index.js';

const SIGNS = [
	'aries',
	'taurus',
	'gemini',
	'cancer',
	'leo',
	'virgo',
	'libra',
	'scorpio',
	'sagittarius',
	'capricorn',
	'aquarius',
	'pisces',
];

/** The smallest model that makes the form draw a city search: one coordinate pair. */
const LOCATION_MODEL: FormModel = {
	title: 'Generate natal chart',
	hasLang: false,
	fields: [
		{ key: 'latitude', name: 'latitude', kind: 'number', required: true },
		{ key: 'longitude', name: 'longitude', kind: 'number', required: true },
	],
};

type FormEl = HTMLElement & { updateComplete: Promise<unknown> };

/** Drain the async loadSchema fetch + Lit re-renders. */
async function flush(el: FormEl): Promise<void> {
	for (let i = 0; i < 6; i++) {
		await el.updateComplete;
		await new Promise((r) => setTimeout(r, 0));
	}
}

/**
 * Mount a form whose slice fetch resolves to `model`. The form uses the
 * slice path (no explicit spec-url), so any `/schemas/` URL returns the model
 * and every other URL 404s.
 */
async function mountForm(
	model: FormModel,
	attrs: Record<string, string>,
): Promise<FormEl> {
	globalThis.fetch = mock(async (url: string | URL) =>
		String(url).includes('/schemas/')
			? { ok: true, status: 200, json: async () => model }
			: { ok: false, status: 404, json: async () => ({}) },
	) as unknown as typeof fetch;
	const el = document.createElement('roxy-endpoint-form') as FormEl;
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	document.body.appendChild(el);
	await flush(el);
	return el;
}

const originalFetch = globalThis.fetch;
afterEach(() => {
	globalThis.fetch = originalFetch;
});

describe('endpoint-form input registry rendering', () => {
	test('a small enum renders a tile radiogroup with zodiac glyphs and no bare select', async () => {
		const el = await mountForm(
			{
				title: 'Daily horoscope',
				hasLang: true,
				fields: [
					{
						key: 'sign',
						name: 'sign',
						kind: 'tiles',
						required: true,
						enum: SIGNS,
					},
				],
			},
			{ 'data-endpoint': 'astrology/horoscope/{sign}/daily', method: 'GET' },
		);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('[role="radiogroup"]')).not.toBeNull();
		expect(root.querySelectorAll('[role="radio"]').length).toBe(12);
		expect(root.querySelector('select')).toBeNull();
		// Aries glyph is present.
		expect(root.textContent).toContain('♈');
		el.remove();
	});

	test('the single required enum auto-submits on selection and marks the event sticky', async () => {
		const el = await mountForm(
			{
				title: 'Daily horoscope',
				hasLang: false,
				fields: [
					{
						key: 'sign',
						name: 'sign',
						kind: 'tiles',
						required: true,
						enum: SIGNS,
					},
				],
			},
			{ 'data-endpoint': 'astrology/horoscope/{sign}/daily', method: 'GET' },
		);
		const root = el.shadowRoot as ShadowRoot;
		// No submit button on a single-enum picker.
		expect(root.querySelector('button.submit')).toBeNull();
		let detail: { values?: Record<string, unknown>; sticky?: boolean } | null =
			null;
		el.addEventListener('roxy-submit', (e) => {
			detail = (e as CustomEvent).detail;
		});
		root.querySelector<HTMLButtonElement>('[data-tile="0"]')?.click();
		expect(detail).not.toBeNull();
		expect(
			(detail as unknown as { values: { sign: string } }).values.sign,
		).toBe('aries');
		expect((detail as unknown as { sticky: boolean }).sticky).toBe(true);
		el.remove();
	});

	test('a boolean renders a switch, not a text input', async () => {
		const el = await mountForm(
			{
				title: 'Aspects',
				hasLang: false,
				fields: [
					{ key: 'date', name: 'date', kind: 'date', required: true },
					{
						key: 'strictOrbs',
						name: 'strictOrbs',
						kind: 'toggle',
						required: false,
					},
				],
			},
			{ 'data-endpoint': 'astrology/aspects', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('[role="switch"]')).not.toBeNull();
		el.remove();
	});

	test('optional fields collapse under one Advanced disclosure; required stay visible', async () => {
		const el = await mountForm(
			{
				title: 'Generate natal chart',
				hasLang: true,
				fields: [
					{ key: 'date', name: 'date', kind: 'date', required: true },
					{ key: 'time', name: 'time', kind: 'time', required: true },
					{ key: 'latitude', name: 'latitude', kind: 'number', required: true },
					{
						key: 'longitude',
						name: 'longitude',
						kind: 'number',
						required: true,
					},
					{ key: 'timezone', name: 'timezone', kind: 'number', required: true },
					{
						key: 'houseSystem',
						name: 'houseSystem',
						kind: 'tiles',
						required: false,
						enum: ['placidus', 'koch'],
					},
				],
			},
			{ 'data-endpoint': 'astrology/natal-chart', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		// City search replaces the lat/lon/timezone trio.
		expect(root.querySelector('roxy-location-search')).not.toBeNull();
		// The optional houseSystem lives inside the Advanced details.
		const advanced = root.querySelector('details.advanced');
		expect(advanced).not.toBeNull();
		expect(advanced?.textContent?.toLowerCase()).toContain('house');
		// A multi-field form keeps its submit button.
		expect(root.querySelector('button.submit')).not.toBeNull();
		el.remove();
	});

	test('location block shows a required mark when only timezone is required (bodygraph shape)', async () => {
		// Bodygraph requires timezone but defaults latitude/longitude, so the single
		// city-search input is still required (collectMissing blocks submit without it).
		// The asterisk must reflect that, or the block reads as optional to an embedder.
		const el = await mountForm(
			{
				title: 'Generate full Human Design bodygraph',
				hasLang: true,
				fields: [
					{ key: 'date', name: 'date', kind: 'date', required: true },
					{ key: 'time', name: 'time', kind: 'time', required: true },
					{
						key: 'latitude',
						name: 'latitude',
						kind: 'number',
						required: false,
					},
					{
						key: 'longitude',
						name: 'longitude',
						kind: 'number',
						required: false,
					},
					{ key: 'timezone', name: 'timezone', kind: 'number', required: true },
				],
			},
			{ 'data-endpoint': 'human-design/bodygraph', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		const block = root.querySelector('.location-block');
		expect(block).not.toBeNull();
		expect(block?.querySelector('.req')).not.toBeNull();
		el.remove();
	});

	test('a failed submit renders an inline role=alert listing humanized missing fields', async () => {
		const el = await mountForm(
			{
				title: 'Generate natal chart',
				hasLang: false,
				fields: [
					{ key: 'date', name: 'date', kind: 'date', required: true },
					{ key: 'latitude', name: 'latitude', kind: 'number', required: true },
					{
						key: 'longitude',
						name: 'longitude',
						kind: 'number',
						required: true,
					},
					{ key: 'timezone', name: 'timezone', kind: 'number', required: true },
				],
			},
			{ 'data-endpoint': 'astrology/natal-chart', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		let validationFired = false;
		el.addEventListener('roxy-validation-error', () => {
			validationFired = true;
		});
		root
			.querySelector('form')
			?.dispatchEvent(new Event('submit', { cancelable: true }));
		await flush(el);
		const alert = root.querySelector('.validation-error[role="alert"]');
		expect(alert).not.toBeNull();
		expect(alert?.textContent).toContain('Date');
		// The location trio collapses to one entry, not three coordinate names.
		expect(alert?.textContent).toContain('Birth location');
		expect(alert?.textContent).not.toContain('Latitude');
		expect(validationFired).toBe(true);
		el.remove();
	});

	test('a long description collapses behind a disclosure', async () => {
		const long = `${'House system for dividing the chart into twelve houses. '.repeat(4)}`;
		const el = await mountForm(
			{
				title: 'Natal',
				hasLang: false,
				fields: [
					{
						key: 'houseSystem',
						name: 'houseSystem',
						kind: 'select',
						required: true,
						enum: Array.from({ length: 20 }, (_, i) => `h${i}`),
						description: long,
					},
				],
			},
			{ 'data-endpoint': 'astrology/natal-chart', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('details.help-details')).not.toBeNull();
		el.remove();
	});

	test('person groups render as labelled card fieldsets with humanized legends', async () => {
		const el = await mountForm(
			{
				title: 'Synastry',
				hasLang: false,
				fields: [
					{
						key: 'person1.date',
						name: 'date',
						group: 'person1',
						kind: 'date',
						required: true,
					},
					{
						key: 'person2.date',
						name: 'date',
						group: 'person2',
						kind: 'date',
						required: true,
					},
				],
			},
			{ 'data-endpoint': 'astrology/synastry', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		const cards = root.querySelectorAll('fieldset.person-group');
		expect(cards.length).toBe(2);
		const legends = Array.from(root.querySelectorAll('legend')).map(
			(l) => l.textContent,
		);
		expect(legends).toContain('Person 1');
		expect(legends).toContain('Person 2');
		el.remove();
	});

	test('a hidden seed is autogenerated per submit and never rendered', async () => {
		const el = await mountForm(
			{
				title: 'Cast',
				hasLang: false,
				fields: [{ key: 'seed', name: 'seed', kind: 'text', required: false }],
			},
			{ 'data-endpoint': 'iching/cast', method: 'GET' },
		);
		const root = el.shadowRoot as ShadowRoot;
		// Seed is not a visible input; a zero-required form still shows a submit.
		expect(root.querySelector('input')).toBeNull();
		let values: Record<string, unknown> | null = null;
		el.addEventListener('roxy-submit', (e) => {
			values = (e as CustomEvent).detail.values;
		});
		root
			.querySelector('form')
			?.dispatchEvent(new Event('submit', { cancelable: true }));
		expect(values).not.toBeNull();
		expect(typeof (values as unknown as { seed: unknown }).seed).toBe('string');
		expect((values as unknown as { seed: string }).seed.length).toBeGreaterThan(
			0,
		);
		el.remove();
	});

	test('an effective lang routes to the query on submit; no lang field is shown', async () => {
		const el = await mountForm(
			{
				title: 'Bodygraph',
				hasLang: true,
				fields: [{ key: 'date', name: 'date', kind: 'date', required: true }],
			},
			{ 'data-endpoint': 'human-design/bodygraph', method: 'POST', lang: 'de' },
		);
		const root = el.shadowRoot as ShadowRoot;
		// Fill the one required field.
		const input = root.querySelector('input') as HTMLInputElement;
		input.value = '1990-01-15';
		input.dispatchEvent(new Event('input'));
		await flush(el);
		let detail: {
			values?: Record<string, unknown>;
			queryKeys?: string[];
		} | null = null;
		el.addEventListener('roxy-submit', (e) => {
			detail = (e as CustomEvent).detail;
		});
		root
			.querySelector('form')
			?.dispatchEvent(new Event('submit', { cancelable: true }));
		expect(
			(detail as unknown as { values: { lang: string } }).values.lang,
		).toBe('de');
		expect((detail as unknown as { queryKeys: string[] }).queryKeys).toContain(
			'lang',
		);
		el.remove();
	});

	/**
	 * The city search sits inside this shadow root, so a host page cannot reach it to set an
	 * endpoint on it. The form is therefore the only place the value can be stated, and a page
	 * that routes its API traffic through its own server needs the search to follow.
	 */
	test('location-url reaches the city search inside the shadow root', async () => {
		const el = await mountForm(LOCATION_MODEL, {
			'data-endpoint': 'astrology/natal-chart',
			method: 'POST',
			'location-url': '/api/roxy/location/search',
		});
		const search = (el.shadowRoot as ShadowRoot).querySelector(
			'roxy-location-search',
		) as HTMLElement & { endpoint: string };
		expect(search).not.toBeNull();
		expect(search.getAttribute('endpoint')).toBe('/api/roxy/location/search');
		// The attribute is the wire; the property is what the search reads when it fetches.
		expect(search.endpoint).toBe('/api/roxy/location/search');
		el.remove();
	});

	test('omitting location-url leaves the city search on its own endpoint', async () => {
		const el = await mountForm(LOCATION_MODEL, {
			'data-endpoint': 'astrology/natal-chart',
			method: 'POST',
		});
		const search = (el.shadowRoot as ShadowRoot).querySelector(
			'roxy-location-search',
		) as HTMLElement & { endpoint: string };
		expect(search).not.toBeNull();
		// No attribute at all, so nothing overwrites the default the search declares.
		expect(search.hasAttribute('endpoint')).toBe(false);
		expect(search.endpoint).toBe('https://roxyapi.com/api/v2/location/search');
		el.remove();
	});

	test('an empty location-url is treated as unset, not as an endpoint', async () => {
		// A template that interpolates a value it does not have writes an empty attribute.
		// Passing that through would leave the search with an endpoint it cannot resolve.
		const el = await mountForm(LOCATION_MODEL, {
			'data-endpoint': 'astrology/natal-chart',
			method: 'POST',
			'location-url': '',
		});
		const search = (el.shadowRoot as ShadowRoot).querySelector(
			'roxy-location-search',
		) as HTMLElement & { endpoint: string };
		expect(search.hasAttribute('endpoint')).toBe(false);
		expect(search.endpoint).toBe('https://roxyapi.com/api/v2/location/search');
		el.remove();
	});

	test('an explicit submit-label overrides the derived one', async () => {
		const el = await mountForm(
			{
				title: 'Natal',
				hasLang: false,
				fields: [{ key: 'date', name: 'date', kind: 'date', required: true }],
			},
			{
				'data-endpoint': 'astrology/natal-chart',
				method: 'POST',
				'submit-label': 'Draw my chart',
			},
		);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('button.submit')?.textContent?.trim()).toBe(
			'Draw my chart',
		);
		el.remove();
	});
});

/**
 * Every endpoint a component is bound to has to be submittable from the form that component
 * renders. A required parameter with no way to supply it ships as a reading nobody can request,
 * and it fails silently: the component mounts, the form draws, and only the submit is impossible.
 *
 * @remarks
 * This walks the real bindings through the real spec and mounts the real form, so it holds for
 * endpoints added later with no edit here. A required field passes on one of three grounds: it
 * renders an input of its own, the city search fills it, or the form supplies the value itself.
 * Anything else is a parameter the visitor is asked for and given no way to enter.
 */
describe('every bound endpoint can be submitted from its form', () => {
	/** Filled by the form on submit rather than entered, so no input is expected. */
	const SELF_SUPPLIED = new Set(['seed']);
	/** Written by the city search, which stands in for the whole trio. */
	const BY_CITY_SEARCH = new Set(['latitude', 'longitude', 'timezone']);

	const operation = (path: string, method: string) =>
		(
			spec.paths as unknown as Record<
				string,
				Record<string, OperationSchema | undefined> | undefined
			>
		)?.[path]?.[method.toLowerCase()];

	test('no required parameter is left without a way to enter it', async () => {
		const schemas = (spec.components?.schemas ?? {}) as unknown as Record<
			string,
			OpenApiSchema
		>;
		const unreachable: string[] = [];
		let checked = 0;

		for (const [tag, bindings] of Object.entries(ENDPOINT_BINDINGS)) {
			for (const b of bindings) {
				const op = operation(b.path, b.method);
				if (!op) continue;
				const model = buildFormModel(op, schemas, b.path.replace(/^\//, ''));
				const required = model.fields.filter((f) => f.required);
				if (!required.length) continue;

				const el = await mountForm(model, {
					'data-endpoint': b.path.replace(/^\//, ''),
					method: b.method.toUpperCase(),
				});
				const root = el.shadowRoot as ShadowRoot;
				const hasCitySearch = !!root.querySelector('roxy-location-search');

				for (const f of required) {
					const rendered =
						!!root.getElementById(`roxy-form-${f.key}`) ||
						!!root.getElementById(`roxy-form-${f.key}-label`);
					const covered =
						rendered ||
						SELF_SUPPLIED.has(f.name) ||
						(hasCitySearch && BY_CITY_SEARCH.has(f.name));
					if (!covered)
						unreachable.push(`${tag} ${b.method} ${b.path} -> ${f.key}`);
				}
				checked++;
				el.remove();
			}
		}

		// A binding list that stopped resolving would pass every assertion above.
		expect(checked).toBeGreaterThan(50);
		expect(unreachable).toEqual([]);
	});
});
