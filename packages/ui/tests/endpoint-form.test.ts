import { afterEach, describe, expect, mock, test } from 'bun:test';
import spec from '../../../specs/openapi.json';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import {
	buildFormModel,
	type FieldDef,
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

	/**
	 * The same rule for the other enum shape. Past twelve options the enum is a
	 * `<select>`, the submit button is withheld exactly as for the tiles, and so
	 * the change itself has to submit, or a nakshatra, avastha or yoga form has
	 * no way to be sent at all.
	 */
	test('the single required select auto-submits on change, and not on the empty choice', async () => {
		const options = Array.from({ length: 27 }, (_, i) => `n${i + 1}`);
		const el = await mountForm(
			{
				title: 'Get Nakshatra by ID',
				hasLang: false,
				fields: [
					{
						key: 'id',
						name: 'id',
						kind: 'select',
						required: true,
						enum: options,
					},
				],
			},
			{ 'data-endpoint': 'vedic-astrology/nakshatras/{id}', method: 'GET' },
		);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('button.submit')).toBeNull();
		const select = root.querySelector('select') as HTMLSelectElement;
		expect(select.options.length).toBe(options.length + 1);
		let submits = 0;
		el.addEventListener('roxy-submit', () => {
			submits++;
		});
		select.value = '';
		select.dispatchEvent(new Event('change', { bubbles: true }));
		expect(submits).toBe(0);
		select.value = 'n3';
		select.dispatchEvent(new Event('change', { bubbles: true }));
		expect(submits).toBe(1);
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

	test('with nothing required, groups and undefaulted fields render in the open and no disclosure is drawn', async () => {
		const person = (group: string) =>
			['fullName', 'year', 'lifePath'].map((name) => ({
				key: `${group}.${name}`,
				name,
				group,
				kind: name === 'fullName' ? ('text' as const) : ('number' as const),
				required: false,
			}));
		const el = await mountForm(
			{
				title: 'Calculate compatibility',
				hasLang: true,
				fields: [...person('person1'), ...person('person2')],
			},
			{ 'data-endpoint': 'numerology/compatibility', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('details.advanced')).toBeNull();
		expect(root.querySelectorAll('fieldset.person-group').length).toBe(2);
		for (const key of ['person1.fullName', 'person1.year', 'person2.lifePath'])
			expect(root.getElementById(`roxy-form-${key}`)).not.toBeNull();
		expect(root.querySelector('button.submit')).not.toBeNull();
		el.remove();
	});

	test('with nothing required, only the defaulted fields collapse under Advanced', async () => {
		const el = await mountForm(
			{
				title: 'Calculate gematria',
				hasLang: false,
				fields: [
					{ key: 'text', name: 'text', kind: 'text', required: false },
					{
						key: 'includeMatches',
						name: 'includeMatches',
						kind: 'toggle',
						required: false,
						default: true,
					},
				],
			},
			{ 'data-endpoint': 'kabbalah/gematria', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		const advanced = root.querySelector('details.advanced');
		expect(advanced).not.toBeNull();
		expect(advanced?.querySelector('#roxy-form-includeMatches')).not.toBeNull();
		expect(advanced?.querySelector('#roxy-form-text')).toBeNull();
		expect(root.getElementById('roxy-form-text')).not.toBeNull();
		el.remove();
	});

	test('a required field keeps every optional group under Advanced, defaulted or not', async () => {
		const el = await mountForm(
			{
				title: 'Daily finance',
				hasLang: false,
				fields: [
					{ key: 'date', name: 'date', kind: 'date', required: true },
					{
						key: 'weights.cusps',
						name: 'cusps',
						group: 'weights',
						kind: 'number',
						required: false,
					},
				],
			},
			{ 'data-endpoint': 'vedic-astrology/kp/daily-finance', method: 'POST' },
		);
		const root = el.shadowRoot as ShadowRoot;
		const advanced = root.querySelector('details.advanced');
		expect(advanced?.querySelector('fieldset.person-group')).not.toBeNull();
		expect(root.getElementById('roxy-form-date')).not.toBeNull();
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

	test('a timezone no coordinate pair claims is a city search that submits the IANA zone', async () => {
		const schemas = (spec.components?.schemas ?? {}) as unknown as Record<
			string,
			OpenApiSchema
		>;
		const model = buildFormModel(
			(
				spec.paths as unknown as Record<string, Record<string, OperationSchema>>
			)['/astrology/aspects']?.post as OperationSchema,
			schemas,
			'astrology/aspects',
		);
		const el = await mountForm(model, {
			'data-endpoint': 'astrology/aspects',
			method: 'POST',
		});
		const root = el.shadowRoot as ShadowRoot;
		const field = root.querySelector('roxy-location-search')?.closest('.field');
		expect(root.getElementById('roxy-form-timezone')).toBeNull();
		expect(field?.querySelector('.req')).not.toBeNull();
		expect(field?.querySelector('[part~="hint"]')).toBeNull();

		const set = (
			el as unknown as { setValue: (k: string, v: unknown) => void }
		).setValue.bind(el);
		set('date', '1965-07-12');
		set('time', '14:30:00');
		root.querySelector('roxy-location-search')?.dispatchEvent(
			new CustomEvent('roxy-location-select', {
				detail: {
					city: 'Copenhagen',
					country: 'Denmark',
					latitude: 55.68,
					longitude: 12.57,
					timezone: 'Europe/Copenhagen',
					utcOffset: 2,
				},
			}),
		);
		let detail: { values: Record<string, unknown> } | undefined;
		el.addEventListener('roxy-submit', (e) => {
			detail = (e as CustomEvent).detail;
		});
		await flush(el);
		root.querySelector('form')?.requestSubmit();
		await flush(el);
		expect(detail?.values.timezone).toBe('Europe/Copenhagen');
		expect(detail?.values.latitude).toBeUndefined();
		el.remove();
	});

	test('the submit button meets the 44px touch target', () => {
		const ctor = customElements.get('roxy-endpoint-form') as unknown as {
			styles: { cssText: string }[];
		};
		const css = ctor.styles.map((s) => s.cssText).join('');
		expect(css).toMatch(/button\.submit\s*\{[^}]*min-height:\s*44px/);
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
/**
 * A request property that is an array of objects is a set of cards, one per record,
 * never a comma-separated text box. The penta is the case: three to five birth
 * records, each with its own city search, and the API rejects a string where it
 * wants an object.
 */
describe('a repeating request property renders one card per record', () => {
	const schemas = (spec.components?.schemas ?? {}) as unknown as Record<
		string,
		OpenApiSchema
	>;
	const penta = () =>
		buildFormModel(
			(
				spec.paths as unknown as Record<string, Record<string, OperationSchema>>
			)['/human-design/penta']?.post as OperationSchema,
			schemas,
			'human-design/penta',
		);

	test('the model expands the item schema into the minimum number of records', () => {
		const model = penta();
		expect(model.repeats).toEqual([{ key: 'members', min: 3, max: 5 }]);
		const groups = new Set(model.fields.map((f) => f.group));
		expect([...groups]).toEqual(['members.0', 'members.1', 'members.2']);
		// Every record carries the item's required fields as required, and no
		// text input stands in for the array itself.
		expect(
			model.fields.filter((f) => f.name === 'date' && f.required),
		).toHaveLength(3);
		expect(model.fields.some((f) => f.key === 'members')).toBe(false);
	});

	test('three member cards render, each with a city search, and the set grows to five and back', async () => {
		const el = await mountForm(penta(), {
			'data-endpoint': 'human-design/penta',
			method: 'POST',
		});
		const root = el.shadowRoot as ShadowRoot;
		const cards = () => root.querySelectorAll('fieldset.person-group');
		expect(cards().length).toBe(3);
		expect(root.querySelectorAll('roxy-location-search').length).toBe(3);
		// The legend is the published field label plus the record number; with no
		// label catalogue registered here it falls back to the humanized wire name.
		expect(
			Array.from(root.querySelectorAll('legend')).map((l) =>
				l.textContent?.trim(),
			),
		).toEqual(['Members 1', 'Members 2', 'Members 3']);
		expect(root.querySelector('input[type="text"]')).toBeNull();

		const button = (word: string) =>
			Array.from(root.querySelectorAll('button.repeat-btn')).find((b) =>
				b.textContent?.includes(word),
			) as HTMLButtonElement | undefined;
		// At the minimum there is nothing to remove; at the maximum nothing to add.
		expect(button('Remove')).toBeUndefined();
		button('Add')?.click();
		await flush(el);
		button('Add')?.click();
		await flush(el);
		expect(cards().length).toBe(5);
		expect(button('Add')).toBeUndefined();
		// An added record starts from the same schema defaults as the first.
		expect(
			(el as unknown as { values: Record<string, unknown> }).values[
				'members.4.nodeType'
			],
		).toBe(
			(el as unknown as { values: Record<string, unknown> }).values[
				'members.0.nodeType'
			],
		);
		button('Remove')?.click();
		await flush(el);
		expect(cards().length).toBe(4);
		el.remove();
	});

	test('a list of objects nested inside a group is not drawn, so the group offers its scalar alternative', () => {
		const model = buildFormModel(
			(
				spec.paths as unknown as Record<string, Record<string, OperationSchema>>
			)['/vastu/mandala']?.post as OperationSchema,
			schemas,
			'vastu/mandala',
		);
		const plot = model.fields
			.filter((f) => f.group === 'plot')
			.map((f) => f.name);
		expect(plot).toContain('width');
		expect(plot).toContain('depth');
		expect(plot).not.toContain('polygon');
		expect(model.repeats).toBeUndefined();
	});

	test('the submitted body carries the records as an array of objects', async () => {
		const el = await mountForm(penta(), {
			'data-endpoint': 'human-design/penta',
			method: 'POST',
		});
		const root = el.shadowRoot as ShadowRoot;
		let detail: { values: Record<string, unknown> } | undefined;
		el.addEventListener('roxy-submit', (e) => {
			detail = (e as CustomEvent).detail;
		});
		for (let i = 0; i < 3; i++) {
			const set = (name: string, value: unknown) => {
				(
					el as unknown as { setValue: (k: string, v: unknown) => void }
				).setValue(`members.${i}.${name}`, value);
			};
			set('date', '1990-01-15');
			set('time', '14:30:00');
			set('timezone', 5.5);
		}
		await flush(el);
		(root.querySelector('form') as HTMLFormElement).requestSubmit();
		await flush(el);
		// Three objects in record order, each carrying what was entered plus the
		// spec defaults every form pre-fills.
		const members = detail?.values.members as Record<string, unknown>[];
		expect(members).toHaveLength(3);
		for (const m of members) {
			expect(m).toMatchObject({
				date: '1990-01-15',
				time: '14:30:00',
				timezone: 5.5,
			});
		}
		el.remove();
	});
});

/**
 * A prefixed coordinate is grouped for the form and flat on the wire: the relocation
 * chart takes `birthLatitude` and `relocationLatitude` as top-level properties while
 * the form shows them as two city boxes, and a body nesting them under `birth` and
 * `relocation` is one the API rejects.
 */
describe('a prefixed coordinate group serialises flat', () => {
	test('the relocation body carries the six coordinates and the one timezone at the top level', async () => {
		const schemas = (spec.components?.schemas ?? {}) as unknown as Record<
			string,
			OpenApiSchema
		>;
		const model = buildFormModel(
			(
				spec.paths as unknown as Record<string, Record<string, OperationSchema>>
			)['/astrology/relocation-chart']?.post as OperationSchema,
			schemas,
			'astrology/relocation-chart',
		);
		const el = await mountForm(model, {
			'data-endpoint': 'astrology/relocation-chart',
			method: 'POST',
		});
		const set = (
			el as unknown as { setValue: (k: string, v: unknown) => void }
		).setValue.bind(el);
		set('date', '1990-01-15');
		set('time', '14:30:00');
		set('birthLatitude', 40.7);
		set('birthLongitude', -74);
		set('timezone', 'America/New_York');
		set('relocationLatitude', 51.5);
		set('relocationLongitude', -0.1);
		let detail: { values: Record<string, unknown> } | undefined;
		el.addEventListener('roxy-submit', (e) => {
			detail = (e as CustomEvent).detail;
		});
		await flush(el);
		(el.shadowRoot as ShadowRoot).querySelector('form')?.requestSubmit();
		await flush(el);
		expect(detail?.values).toMatchObject({
			birthLatitude: 40.7,
			birthLongitude: -74,
			relocationLatitude: 51.5,
			relocationLongitude: -0.1,
			timezone: 'America/New_York',
		});
		expect(detail?.values.birth).toBeUndefined();
		expect(detail?.values.relocation).toBeUndefined();
		el.remove();
	});
});

/**
 * What the API rejects prints where it can be fixed. A validation failure names
 * its fields by wire path, which is the key the form renders each input under,
 * so the message sits under that input, the input is marked invalid, and the
 * summary names the field by the label on the form rather than by its path.
 */
describe('server-side validation issues print under their fields', () => {
	const model = (): FormModel => ({
		title: 'Yearly horoscope',
		hasLang: false,
		fields: [
			{ key: 'sign', name: 'sign', kind: 'tiles', required: true, enum: SIGNS },
			{
				key: 'year',
				name: 'year',
				kind: 'number',
				required: false,
				inQuery: true,
			},
			{
				key: 'person1.date',
				name: 'date',
				group: 'person1',
				kind: 'date',
				required: false,
			},
		],
	});
	const issues = [
		{ path: 'year', message: 'Too small: expected number to be >=1900' },
		{ path: 'person1.date', message: 'Invalid date' },
		{ path: 'person1', message: 'Send either a name or a date' },
	];

	test('each issue prints under its input, on its group, and once in the summary by label', async () => {
		const el = await mountForm(model(), {
			'data-endpoint': 'astrology/horoscope/{sign}/yearly',
			method: 'GET',
		});
		(el as unknown as { serverIssues: unknown }).serverIssues = issues;
		await flush(el);
		const root = el.shadowRoot as ShadowRoot;
		const year = root.getElementById('roxy-form-year') as HTMLInputElement;
		expect(year.getAttribute('aria-invalid')).toBe('true');
		expect(year.getAttribute('aria-describedby')).toBe('roxy-form-year-error');
		expect(
			root.getElementById('roxy-form-year-error')?.textContent?.trim(),
		).toBe('Too small: expected number to be >=1900');
		expect(
			root.getElementById('roxy-form-person1.date-error')?.textContent?.trim(),
		).toBe('Invalid date');
		// The group-level issue sits on the card, not under any one input.
		const card = root.querySelector('fieldset.person-group') as HTMLElement;
		expect(card.textContent).toContain('Send either a name or a date');
		const summary = root.querySelector('.validation-error') as HTMLElement;
		const lines = Array.from(summary.querySelectorAll('div')).map((d) =>
			d.textContent?.replace(/\s+/g, ' ').trim(),
		);
		expect(lines).toEqual([
			'Year Too small: expected number to be >=1900',
			'Person 1 Date Invalid date',
			'Person 1 Send either a name or a date',
		]);
		el.remove();
	});

	test('an issue on a field behind Advanced opens the disclosure', async () => {
		const el = await mountForm(model(), {
			'data-endpoint': 'astrology/horoscope/{sign}/yearly',
			method: 'GET',
		});
		const root = el.shadowRoot as ShadowRoot;
		const details = () =>
			root.querySelector('details.advanced') as HTMLDetailsElement;
		expect(details().open).toBe(false);
		(el as unknown as { serverIssues: unknown }).serverIssues = [
			{ path: 'year', message: 'Too small' },
		];
		await flush(el);
		expect(details().open).toBe(true);
		el.remove();
	});

	test('editing a field clears its issue, and a new report starts clean', async () => {
		const el = await mountForm(model(), {
			'data-endpoint': 'astrology/horoscope/{sign}/yearly',
			method: 'GET',
		});
		const form = el as unknown as {
			serverIssues: unknown;
			setValue: (k: string, v: unknown) => void;
		};
		form.serverIssues = issues;
		await flush(el);
		form.setValue('year', 2026);
		await flush(el);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.getElementById('roxy-form-year-error')).toBeNull();
		expect(
			root.getElementById('roxy-form-year')?.getAttribute('aria-invalid'),
		).toBeNull();
		// The other two stay until they are edited or the API answers again.
		expect(root.getElementById('roxy-form-person1.date-error')).not.toBeNull();
		form.serverIssues = [{ path: 'year', message: 'Too big' }];
		await flush(el);
		expect(
			root.getElementById('roxy-form-year-error')?.textContent?.trim(),
		).toBe('Too big');
		expect(root.getElementById('roxy-form-person1.date-error')).toBeNull();
		el.remove();
	});
});

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

	/** Every bound endpoint's form model beside its mounted form, one at a time; the caller removes the element. */
	async function* boundForms() {
		const schemas = (spec.components?.schemas ?? {}) as unknown as Record<
			string,
			OpenApiSchema
		>;
		for (const [tag, bindings] of Object.entries(ENDPOINT_BINDINGS)) {
			for (const b of bindings) {
				const op = operation(b.path, b.method);
				if (!op) continue;
				const endpoint = b.path.replace(/^\//, '');
				const model = buildFormModel(op, schemas, endpoint);
				yield {
					label: `${tag} ${b.method} ${b.path}`,
					model,
					mount: () =>
						mountForm(model, {
							'data-endpoint': endpoint,
							method: b.method.toUpperCase(),
						}),
				};
			}
		}
	}

	test('no required parameter is left without a way to enter it', async () => {
		const unreachable: string[] = [];
		let checked = 0;

		for await (const { label, model, mount } of boundForms()) {
			const required = model.fields.filter((f) => f.required);
			if (!required.length) continue;

			const el = await mount();
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
				if (!covered) unreachable.push(`${label} -> ${f.key}`);
			}
			checked++;
			el.remove();
		}

		// A binding list that stopped resolving would pass every assertion above.
		expect(checked).toBeGreaterThan(50);
		expect(unreachable).toEqual([]);
	});

	test('no form asks a visitor to type a coordinate or a timezone', async () => {
		const typed: string[] = [];
		for await (const { label, model, mount } of boundForms()) {
			const el = await mount();
			const root = el.shadowRoot as ShadowRoot;
			for (const f of model.fields)
				if (
					BY_CITY_SEARCH.has(f.name) &&
					root.getElementById(`roxy-form-${f.key}`)
				)
					typed.push(`${label} -> ${f.key}`);
			el.remove();
		}
		expect(typed).toEqual([]);
	});

	test('every form can be sent: a submit button, or a single enum input that submits itself', async () => {
		const stuck: string[] = [];
		let checked = 0;
		for await (const { label, mount } of boundForms()) {
			const el = await mount();
			const root = el.shadowRoot as ShadowRoot;
			const button = !!root.querySelector('button.submit');
			const single = (el as unknown as { singleEnumField: FieldDef | null })
				.singleEnumField;
			if (!button && !single) stuck.push(label);
			checked++;
			el.remove();
		}
		expect(checked).toBeGreaterThan(100);
		expect(stuck).toEqual([]);
	});

	test('a form with nothing required still shows an input outside the disclosure', async () => {
		const hidden: string[] = [];
		let checked = 0;

		for await (const { label, model, mount } of boundForms()) {
			const fillable = model.fields.filter(
				(f) => !SELF_SUPPLIED.has(f.name) && f.default === undefined,
			);
			if (model.fields.some((f) => f.required) || !fillable.length) continue;

			const el = await mount();
			const root = el.shadowRoot as ShadowRoot;
			const open = Array.from(
				root.querySelectorAll(
					'input, select, textarea, [role="radiogroup"], roxy-location-search',
				),
			).filter((input) => !input.closest('details.advanced'));
			if (!open.length) hidden.push(label);
			checked++;
			el.remove();
		}

		expect(checked).toBeGreaterThan(20);
		expect(hidden).toEqual([]);
	});
});
