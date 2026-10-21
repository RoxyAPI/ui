import { afterEach, describe, expect, test } from 'bun:test';
import '../src/index.js';
import relocationEs from '../../../specs/fixtures/relocation-es.json' with {
	type: 'json',
};

const settled = async (element: Element): Promise<void> => {
	await (element as Element & { updateComplete: Promise<unknown> })
		.updateComplete;
	for (const child of element.shadowRoot?.querySelectorAll('*') ?? []) {
		if (child.shadowRoot) await settled(child);
	}
};

const mount = async (tag: string, data: unknown, hideReadings = false) => {
	const element = document.createElement(tag) as HTMLElement & {
		data: unknown;
		hideReadings: boolean;
	};
	element.data = data;
	element.hideReadings = hideReadings;
	document.body.appendChild(element);
	await settled(element);
	return element;
};

const childRoot = (element: HTMLElement, tag: string): ShadowRoot =>
	element.shadowRoot?.querySelector(tag)?.shadowRoot as ShadowRoot;

const planet = (name: string, longitude: number, sign: string) => ({
	name,
	longitude,
	sign,
	degree: longitude % 30,
	latitude: 1.23456,
	house: 8,
	speed: -0.123,
	isRetrograde: true,
	dignity: 'peregrine',
});

const aspect = (isApplying: boolean, marker?: string) => ({
	planet1: 'Sun',
	planet2: 'Moon',
	type: 'TRINE',
	angle: 120,
	orb: 0.25,
	strength: 95,
	isApplying,
	interpretation: 'harmonious',
	...(marker
		? { aspectInterpretation: { summary: marker, keywords: [`${marker}_KEY`] } }
		: {}),
});

const natal = {
	birthDetails: {
		date: '1990-01-15',
		time: '14:30:00',
		latitude: 40.7143,
		longitude: -74.006,
		timezone: -5,
	},
	planets: [planet('Sun', 29.999, 'Aries'), planet('Moon', 150, 'Virgo')],
	houses: [{ number: 1, longitude: 85.7, sign: 'Gemini', degree: 25.7 }],
	houseSystem: 'placidus',
	ascendant: { longitude: 85.7, sign: 'Gemini', degree: 25.7 },
	midheaven: { longitude: 350.5, sign: 'Pisces', degree: 20.5 },
	partOfFortune: {
		longitude: 321.6,
		sign: 'Aquarius',
		degree: 21.6,
		house: 9,
		sect: 'night',
	},
	vertex: { longitude: 225.7, sign: 'Scorpio', degree: 15.7, house: 5 },
	aspects: [aspect(true, 'PAIR_APPLY'), aspect(false, 'PAIR_SEPARATE')],
	summary: {
		dominantElement: 'Earth',
		dominantModality: 'Cardinal',
		retrogradePlanets: [],
		elementDistribution: { Fire: 1, Earth: 6, Air: 1, Water: 2 },
		modalityDistribution: { Cardinal: 6, Fixed: 2, Mutable: 2 },
	},
};

afterEach(() => {
	document.body.replaceChildren();
});

describe('Western chart details retain supplied data', () => {
	test('natal aspects retain every motion state and reading through the shared detail component', async () => {
		const element = await mount('roxy-natal-chart', natal);
		const detail = childRoot(element, 'roxy-aspects-table');
		const contacts = [...detail.querySelectorAll('[role="listitem"]')];
		expect(contacts).toHaveLength(2);
		expect(contacts[0].textContent).toContain('Applying');
		expect(contacts[1].textContent).toContain('Separating');
		expect(contacts[0].textContent).toContain('PAIR_APPLY_KEY');
		expect(contacts[1].textContent).toContain('PAIR_SEPARATE');
		expect(
			element.shadowRoot
				?.querySelector('details[part~="aspects"]')
				?.hasAttribute('open'),
		).toBe(false);

		const hidden = childRoot(
			await mount('roxy-natal-chart', natal, true),
			'roxy-aspects-table',
		);
		expect(hidden.textContent).not.toContain('PAIR_APPLY');
		expect(hidden.querySelectorAll('[role="listitem"]')).toHaveLength(2);
		expect(hidden.textContent).toContain('Applying');
		expect(hidden.textContent).toContain('Separating');
		expect(hidden.textContent).toContain('0.25');
	});

	test('aspect lists own contact items without replacing native disclosure semantics', async () => {
		for (const hideReadings of [false, true]) {
			const element = await mount(
				'roxy-aspects-table',
				{
					aspects: [...natal.aspects, aspect(true)],
				},
				hideReadings,
			);
			const list = element.shadowRoot?.querySelector(
				'[role="list"]',
			) as Element;
			const contacts = [...list.children];
			expect(contacts).toHaveLength(3);
			expect(list.querySelectorAll('details[role]')).toHaveLength(0);
			for (const [i, contact] of contacts.entries()) {
				expect(contact.tagName).toBe('DIV');
				expect(contact.getAttribute('role')).toBe('listitem');
				expect(contact.querySelector('[part="reading"]')).not.toBeNull();
				const disclosure = contact.querySelector('details');
				if (hideReadings || i === 2) {
					expect(disclosure).toBeNull();
					expect(contact.querySelector('.static-head')).not.toBeNull();
				} else {
					expect(disclosure).not.toBeNull();
					expect(disclosure?.firstElementChild?.tagName).toBe('SUMMARY');
				}
			}
		}
	});

	test('standalone aspect references retain the clock and zero or fractional timezone without readings', async () => {
		for (const timezone of [0, -5.89583]) {
			const element = await mount(
				'roxy-aspects-table',
				{
					date: '1990-01-15',
					time: '14:30:42',
					timezone,
					aspects: [aspect(true)],
				},
				true,
			);
			const root = element.shadowRoot as ShadowRoot;
			expect(root.querySelector('.subtitle')?.textContent).toContain(
				'Jan 15, 1990, 2:30:42 PM',
			);
			expect(root.querySelector('.roxy-facts dt')?.textContent).toBe(
				'Timezone',
			);
			expect(root.querySelector('.roxy-facts dd')?.textContent).toBe(
				String(timezone),
			);
			expect(root.querySelectorAll('[role="listitem"]')).toHaveLength(1);
		}
	});

	test('standalone transit references retain their supplied clock without an invented offset', async () => {
		const element = await mount(
			'roxy-aspects-table',
			{
				transitDate: '2026-05-11 12:34:56',
				aspects: [aspect(false)],
			},
			true,
		);
		const root = element.shadowRoot as ShadowRoot;
		expect(root.querySelector('.subtitle')?.textContent).toContain(
			'May 11, 2026, 12:34:56 PM',
		);
		expect(root.querySelector('.roxy-facts')).toBeNull();
	});

	test('pattern runs and older aspect responses retain only their available reference context', async () => {
		const patterns = await mount(
			'roxy-aspects-table',
			{
				patterns: [
					{
						kind: 'STELLIUM',
						name: 'Stellium',
						planets: ['Sun', 'Moon', 'Mars'],
					},
				],
				total: 1,
				options: { strictOrbs: false, include: [] },
			},
			true,
		);
		expect(patterns.shadowRoot?.querySelector('.subtitle')).toBeNull();
		expect(patterns.shadowRoot?.querySelector('.roxy-facts')).toBeNull();
		const legacy = await mount(
			'roxy-aspects-table',
			{
				date: '1990-01-15',
				aspects: [aspect(true)],
			},
			true,
		);
		expect(
			legacy.shadowRoot?.querySelector('.subtitle')?.textContent?.trim(),
		).toBe('1 aspect · Jan 15, 1990');
		expect(legacy.shadowRoot?.querySelector('.roxy-facts')).toBeNull();
	});

	test('positions expose exact point houses, sect, latitude and cusp values without readings', async () => {
		const element = await mount('roxy-natal-chart', natal, true);
		const table = childRoot(element, 'roxy-western-planets-table');
		const rows = [...table.querySelectorAll('table:first-of-type tbody tr')];
		const row = (name: string) =>
			rows.find((candidate) => candidate.textContent?.includes(name));
		expect(row('Part of Fortune')?.textContent).toContain('9');
		expect(row('Part of Fortune')?.textContent).toContain('Night');
		expect(row('Vertex')?.textContent).toContain('5');
		expect(row('Sun')?.textContent).toContain('29° Aries 59');
		expect(row('Sun')?.textContent).toContain('1.23456');
		expect(row('Sun')?.textContent).toContain('29.999°');
		expect(table.textContent).toContain('40.7143');
		expect(table.textContent).toContain('2:30:00 PM');
		expect(table.querySelector('[part~="houses"]')?.textContent).toContain(
			'25° Gemini 42',
		);
	});

	test('slow motion and historical timezone fractions remain distinguishable from zero', async () => {
		const element = await mount('roxy-western-planets-table', {
			...natal,
			birthDetails: { ...natal.birthDetails, timezone: 5.89583 },
			planets: [{ ...natal.planets[0], speed: -0.000001 }],
		});
		expect(element.shadowRoot?.textContent).toContain('5.89583');
		expect(element.shadowRoot?.textContent).toContain('-0.000001');
	});

	test('transit technical details retain both rings and exact natal cusps without widening the comparison', async () => {
		const data = {
			transitDate: '2026-10-20T12:00:00Z',
			houseSystem: 'placidus',
			houses: natal.houses,
			ascendant: natal.ascendant,
			natalPlanets: natal.planets,
			transitPlanets: [
				{
					...planet('Sun', 300.12345, 'Aquarius'),
					latitude: -2.34567,
					speed: 1.875,
				},
			],
			aspects: [],
		};
		const element = await mount('roxy-transit-wheel', data, true);
		const root = element.shadowRoot as ShadowRoot;
		const tables = [...root.querySelectorAll('roxy-western-planets-table')].map(
			(table) => table.shadowRoot as ShadowRoot,
		);
		expect(tables).toHaveLength(2);
		expect(tables[0].textContent).toContain('1.23456');
		expect(tables[0].textContent).toContain('-0.123');
		expect(tables[0].textContent).toContain('85.7°');
		expect(tables[0].querySelector('[part~="houses"]')?.textContent).toContain(
			'25° Gemini 42',
		);
		expect(tables[1].textContent).toContain('-2.34567');
		expect(tables[1].textContent).toContain('1.875');
		expect(tables[1].textContent).toContain('300.12345°');
		expect(
			root.querySelector('details[part~="positions"]')?.hasAttribute('open'),
		).toBe(false);
		expect(root.querySelector('table thead tr')?.children).toHaveLength(5);
	});

	test('API distributions remain distinct from the untinted all-body cross-tab', async () => {
		const element = await mount('roxy-natal-chart', natal);
		const root = element.shadowRoot as ShadowRoot;
		const distribution = root.querySelector('[part~="distribution"]');
		expect(distribution?.textContent).toContain('10 planets');
		expect(distribution?.textContent).toContain('Earth: 6');
		expect(distribution?.textContent).toContain('Cardinal: 6');
		expect(root.querySelector('.em-grid caption')?.textContent).toContain(
			'All 2 bodies',
		);
		expect(root.querySelector('.em-grid .dominant')).toBeNull();
	});

	test('every synastry reading is reachable from the comparison table', async () => {
		const person = {
			ascendant: natal.ascendant,
			sunSign: 'Aries',
			moonSign: 'Virgo',
			planets: [],
		};
		const contacts = Array.from({ length: 13 }, (_, i) => ({
			planet1: 'Sun',
			planet2: 'Moon',
			type: 'TRINE',
			angle: 120,
			orb: i / 100,
			strength: 100 - i,
			interpretation: 'harmonious',
			meaning: {
				name: 'Trine',
				nature: 'harmonious',
				relationshipContext: `CONTEXT_${i}`,
				description: { short: `SHORT_${i}`, long: `LONG_${i}` },
				keywords: [`KEY_${i}`],
			},
		}));
		const data = {
			person1: person,
			person2: person,
			interAspects: contacts,
			compatibilityScore: 70,
		};
		const element = await mount('roxy-synastry-chart', data);
		const root = element.shadowRoot as ShadowRoot;
		const rows = [...root.querySelectorAll('.catalog tbody tr')];
		expect(rows).toHaveLength(13);
		for (const [i, row] of rows.entries()) {
			expect(row.textContent).toContain(`CONTEXT_${i}`);
			expect(row.textContent).toContain(`LONG_${i}`);
			expect(row.querySelector('details')?.hasAttribute('open')).toBe(false);
		}
		expect(root.querySelector('details.interp-card')?.textContent).toContain(
			'LONG_0',
		);
		const hidden = (await mount('roxy-synastry-chart', data, true))
			.shadowRoot as ShadowRoot;
		expect(hidden.querySelectorAll('.catalog tbody tr')).toHaveLength(13);
		expect(hidden.textContent).not.toContain('CONTEXT_');
	});

	test('relocation keeps localized payload names paired with canonical glyph lookups', async () => {
		const element = await mount('roxy-relocation-wheel', relocationEs, true);
		const root = element.shadowRoot as ShadowRoot;
		expect(
			root.querySelector('[part~="angular-planets"]')?.textContent,
		).toContain('♇ Plutón');
		const changes = [...root.querySelectorAll('.moves-list li')];
		expect(changes).toHaveLength(
			relocationEs.changes.planetsChangedHouse.length,
		);
		for (const [i, change] of changes.entries()) {
			expect(change.textContent).toContain(
				relocationEs.changes.planetsChangedHouse[i].planetLocalized,
			);
		}
		expect(root.querySelector('.move')?.textContent).toContain(
			relocationEs.ascendant.signLocalized,
		);
		expect(root.textContent).toContain('51.5072');
	});
});
