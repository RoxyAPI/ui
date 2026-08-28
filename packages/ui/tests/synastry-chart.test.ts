import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { registerLocale } from '../src/i18n/registry.js';
import { es } from '../src/locales/es.js';
import type { CalculateSynastryResponse } from '../src/types/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(data: unknown): Promise<HTMLElement> {
	const el = document.createElement('roxy-synastry-chart');
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string => root(el).textContent ?? '';

/** Every `<title>` the wheel emits, which is what a hover and a screen reader read. */
const tooltips = (el: HTMLElement): string[] =>
	[...root(el).querySelectorAll('title')].map((n) => n.textContent ?? '');

const person = (name: string, house: number) => ({
	name,
	ascendant: { sign: 'Leo', degree: 12.5 },
	sunSign: 'Aries',
	moonSign: 'Taurus',
	planets: [
		{
			name: 'Venus',
			longitude: 42.5,
			sign: 'Taurus',
			degree: 12.5,
			house,
			isRetrograde: false,
		},
	],
});

const FIXTURE = {
	person1: person('A', 10),
	person2: person('B', 4),
	compatibilityScore: 72,
	interAspects: [],
	summary: { total: 0, harmonious: 0, challenging: 0, neutral: 0 },
} as unknown as CalculateSynastryResponse;

describe('the synastry wheel says what it draws', () => {
	test('the legend names the sectors as signs', async () => {
		// Twelve spokes on a round chart read as house cusps to anyone used to a
		// house wheel, and this wheel divides by sign. The words are the only thing
		// standing between the two readings.
		expect(text(await mount(FIXTURE))).toContain('Sign sectors, not houses');
	});

	test('each planet carries the house it holds in its own chart', async () => {
		const found = tooltips(await mount(FIXTURE));
		expect(found.some((t) => t.includes('House 10'))).toBe(true);
		expect(found.some((t) => t.includes('House 4'))).toBe(true);
	});

	test('the score is announced through the catalogue, not a bare literal', async () => {
		// Asserted in Spanish on purpose. In English a catalogue lookup and a bare
		// template literal produce the same bytes, so an English assertion cannot
		// tell them apart and would pass on the untranslated form.
		registerLocale('es', es);
		document.documentElement.lang = 'es';
		const el = await mount(FIXTURE);
		expect(root(el).querySelector('.score')?.getAttribute('aria-label')).toBe(
			es['Score {{score}} of 100'].replace('{{score}}', '72'),
		);
		document.documentElement.lang = '';
		el.remove();
	});
});

/**
 * The house overlay: which of the OTHER person's houses each planet falls into.
 *
 * @remarks
 * The response carries two house numbers per planet and the spec is explicit that they are
 * different readings: `house` is the placement in that person's own chart, `houseInOtherChart` is
 * the overlay. Swapping the two columns produces a table that is the right shape, the right length
 * and full of plausible numbers, so every fixture here gives a planet two DIFFERENT values and the
 * assertions name which column each belongs in.
 */
describe('the house overlay', () => {
	const planet = (
		name: string,
		house: number,
		houseInOtherChart: number,
		over: Record<string, unknown> = {},
	) => ({
		name,
		longitude: 42.5,
		sign: 'Taurus',
		degree: 12.5,
		house,
		houseInOtherChart,
		isRetrograde: false,
		...over,
	});

	const OVERLAY = {
		person1: {
			name: 'Alex',
			ascendant: { sign: 'Leo', degree: 12.5 },
			sunSign: 'Aries',
			moonSign: 'Taurus',
			planets: [
				planet('Venus', 10, 7),
				planet('Mars', 3, 11, { isRetrograde: true }),
			],
		},
		person2: {
			name: 'Sam',
			ascendant: { sign: 'Virgo', degree: 4 },
			sunSign: 'Libra',
			moonSign: 'Cancer',
			planets: [planet('Sun', 5, 2)],
		},
		compatibilityScore: 72,
		interAspects: [],
		summary: { total: 0, harmonious: 0, challenging: 0, neutral: 0 },
	} as unknown as CalculateSynastryResponse;

	const rows = (el: HTMLElement, dir: 1 | 2): Element[] => {
		const tables = [
			...root(el).querySelectorAll('[part~="house-overlay"] .overlay-dir'),
		];
		return [...(tables[dir - 1]?.querySelectorAll('tbody tr') ?? [])];
	};

	test('both directions render, because they are two different readings', async () => {
		const el = await mount(OVERLAY);
		const dirs = root(el).querySelectorAll(
			'[part~="house-overlay"] .overlay-dir',
		);
		expect(dirs.length).toBe(2);
		const headings = [...dirs].map((d) =>
			d.querySelector('h4')?.textContent?.replace(/\s+/g, ' ').trim(),
		);
		// Each names the pair in its own direction, so one is not the other twice.
		expect(headings[0]).toContain('Alex');
		expect(headings[0]).toContain('Sam');
		expect(headings[1]).toContain('Sam');
		expect(headings[1]).toContain('Alex');
		expect(headings[0]).not.toBe(headings[1]);
	});

	/** The one that catches a swapped pair of columns, which nothing else here could see. */
	test('the overlay column is houseInOtherChart and the own column is house', async () => {
		const el = await mount(OVERLAY);
		const first = rows(el, 1);
		expect(first.length).toBe(2);
		const venus = first[0] as Element;
		expect(venus.querySelector('.overlay-house')?.textContent?.trim()).toBe(
			'7',
		);
		expect(venus.querySelector('.own-house')?.textContent?.trim()).toBe('10');
		const mars = first[1] as Element;
		expect(mars.querySelector('.overlay-house')?.textContent?.trim()).toBe(
			'11',
		);
		expect(mars.querySelector('.own-house')?.textContent?.trim()).toBe('3');
		// The reverse direction reads person 2 against person 1, not the same rows again.
		const second = rows(el, 2);
		expect(second.length).toBe(1);
		expect(
			(second[0] as Element)
				.querySelector('.overlay-house')
				?.textContent?.trim(),
		).toBe('2');
	});

	test('a retrograde planet keeps its marker in the overlay row', async () => {
		const el = await mount(OVERLAY);
		const mars = rows(el, 1)[1] as Element;
		expect(mars.querySelector('.retro')).not.toBeNull();
		expect((rows(el, 1)[0] as Element).querySelector('.retro')).toBeNull();
	});

	/** A planet the API gave no overlay for is dropped, never rendered as a blank house. */
	test('a planet with no overlay house is skipped rather than left empty', async () => {
		const { houseInOtherChart, ...noOverlay } = planet('Pluto', 9, 1);
		expect(houseInOtherChart).toBe(1);
		const data = {
			...OVERLAY,
			person1: {
				...OVERLAY.person1,
				planets: [...OVERLAY.person1.planets, noOverlay],
			},
		} as unknown as CalculateSynastryResponse;
		const el = await mount(data);
		expect(rows(el, 1).length).toBe(2);
		// Only the overlay drops it. The wheel still plots it, because a longitude
		// is all the drawing needs and the planet is genuinely in the chart.
		const overlay =
			root(el).querySelector('[part~="house-overlay"]')?.textContent ?? '';
		expect(overlay).not.toContain('Pluto');
		expect(text(el)).toContain('Pluto');
	});

	test('a response with no planets renders no overlay at all', async () => {
		const bare = {
			...OVERLAY,
			person1: { ...OVERLAY.person1, planets: [] },
			person2: { ...OVERLAY.person2, planets: [] },
		} as unknown as CalculateSynastryResponse;
		const el = await mount(bare);
		expect(root(el).querySelector('[part~="house-overlay"]')).toBeNull();
	});

	/** A house number is a placement, not a claim about the pair, so it survives hide-readings. */
	test('hide-readings leaves the whole overlay standing', async () => {
		const el = document.createElement('roxy-synastry-chart');
		el.setAttribute('hide-readings', '');
		(el as HTMLElement & { data: unknown }).data = OVERLAY;
		document.body.appendChild(el);
		await settled(el);
		const host = el as HTMLElement;
		expect(
			root(host).querySelectorAll('[part~="house-overlay"] .overlay-dir')
				.length,
		).toBe(2);
		expect(rows(host, 1).length).toBe(2);
	});
});
