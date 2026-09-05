import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { registerFieldLabels, registerLocale } from '../src/i18n/registry.js';

// A synthetic catalogue, so the assertions below pin the MECHANISM rather than a
// translator's wording. `humanize` produces the English word for several of these
// ring identifiers, so an English render cannot tell a catalogued label from the
// fallback and only a translated one can.
registerLocale('zz', {
	Center: 'ZZCENTER',
	Perimeter: 'ZZPERIMETER',
});

// Same reasoning for the `unit` field-label enum the area figures read: catalogued
// here rather than borrowing the humanized English word, so a render that fell back
// to `humanize` instead of the published label would still be caught.
registerFieldLabels('zz', {
	fields: {},
	enums: { 'unit.feet': 'ZZFEET', 'unit.metres': 'ZZMETRES' },
});

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-vastu-mandala');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const rects = (el: HTMLElement): SVGRectElement[] => [
	...root(el).querySelectorAll<SVGRectElement>('rect.pada'),
];
const at = (el: HTMLElement, col: number, row: number) =>
	rects(el).find(
		(r) =>
			Number(r.getAttribute('x')) === col - 1 &&
			Number(r.getAttribute('y')) === row - 1,
	);
const num = (el: Element | null | undefined, attr: string) =>
	Number(el?.getAttribute(attr));

const cell = (
	square: number,
	rowFromNorth: number,
	columnFromWest: number,
	devataName: string,
	cls: string,
	x: number,
	y: number,
	withinPlot = true,
) => ({
	square,
	rowFromNorth,
	columnFromWest,
	devataName,
	class: cls,
	center: { x, y },
	withinPlot,
});

/**
 * A live 81 pada projection over an L-shaped plot, sixty feet east to west by forty five north to
 * south with the north-east quarter cut away. The cut is what puts fifteen square centres outside
 * the outline, and the plot is deliberately not square so a drawing that assumed square padas
 * would place the brahmasthan corners off the squares they belong to.
 */
const MANDALA = {
	grid: '81-pada',
	cells: [
		cell(73, 1, 1, 'Roga', 'perimeter', 3.333333, 42.5),
		cell(64, 1, 2, 'Ahi', 'perimeter', 10, 42.5),
		cell(55, 1, 3, 'Mukhya', 'perimeter', 16.666667, 42.5),
		cell(46, 1, 4, 'Bhall\u0101\u1e6da', 'perimeter', 23.333333, 42.5),
		cell(37, 1, 5, 'Soma', 'perimeter', 30, 42.5, false),
		cell(28, 1, 6, 'Bhujaga', 'perimeter', 36.666667, 42.5, false),
		cell(19, 1, 7, 'Aditi', 'perimeter', 43.333333, 42.5, false),
		cell(10, 1, 8, 'Diti', 'perimeter', 50, 42.5, false),
		cell(1, 1, 9, 'Agni', 'perimeter', 56.666667, 42.5, false),
		cell(74, 2, 1, 'P\u0101payak\u1e63m\u0101', 'perimeter', 3.333333, 37.5),
		cell(65, 2, 2, 'Rudra', 'innerCorner', 10, 37.5),
		cell(56, 2, 3, 'Mukhya', 'perimeter', 16.666667, 37.5),
		cell(47, 2, 4, 'Bhall\u0101\u1e6da', 'perimeter', 23.333333, 37.5),
		cell(38, 2, 5, 'Soma', 'perimeter', 30, 37.5, false),
		cell(29, 2, 6, 'Bhujaga', 'perimeter', 36.666667, 37.5, false),
		cell(20, 2, 7, 'Aditi', 'perimeter', 43.333333, 37.5, false),
		cell(11, 2, 8, '\u0100pa', 'innerCorner', 50, 37.5, false),
		cell(2, 2, 9, 'Parjanya', 'perimeter', 56.666667, 37.5, false),
		cell(75, 3, 1, '\u015ao\u1e63a', 'perimeter', 3.333333, 32.5),
		cell(66, 3, 2, '\u015ao\u1e63a', 'perimeter', 10, 32.5),
		cell(57, 3, 3, 'R\u0101jayak\u1e63m\u0101', 'innerRing', 16.666667, 32.5),
		cell(48, 3, 4, 'P\u1e5bthv\u012bdhara', 'innerRing', 23.333333, 32.5),
		cell(39, 3, 5, 'P\u1e5bthv\u012bdhara', 'innerRing', 30, 32.5, false),
		cell(
			30,
			3,
			6,
			'P\u1e5bthv\u012bdhara',
			'innerRing',
			36.666667,
			32.5,
			false,
		),
		cell(21, 3, 7, '\u0100pavatsa', 'innerRing', 43.333333, 32.5, false),
		cell(12, 3, 8, 'Jayanta', 'perimeter', 50, 32.5, false),
		cell(3, 3, 9, 'Jayanta', 'perimeter', 56.666667, 32.5, false),
		cell(76, 4, 1, 'Asura', 'perimeter', 3.333333, 27.5),
		cell(67, 4, 2, 'Asura', 'perimeter', 10, 27.5),
		cell(58, 4, 3, 'Mitra', 'innerRing', 16.666667, 27.5),
		cell(49, 4, 4, 'Brahm\u0101', 'center', 23.333333, 27.5),
		cell(40, 4, 5, 'Brahm\u0101', 'center', 30, 27.5),
		cell(31, 4, 6, 'Brahm\u0101', 'center', 36.666667, 27.5),
		cell(22, 4, 7, 'Aryaman', 'innerRing', 43.333333, 27.5),
		cell(13, 4, 8, 'Indra', 'perimeter', 50, 27.5),
		cell(4, 4, 9, 'Indra', 'perimeter', 56.666667, 27.5),
		cell(77, 5, 1, 'Varu\u1e47a', 'perimeter', 3.333333, 22.5),
		cell(68, 5, 2, 'Varu\u1e47a', 'perimeter', 10, 22.5),
		cell(59, 5, 3, 'Mitra', 'innerRing', 16.666667, 22.5),
		cell(50, 5, 4, 'Brahm\u0101', 'center', 23.333333, 22.5),
		cell(41, 5, 5, 'Brahm\u0101', 'center', 30, 22.5),
		cell(32, 5, 6, 'Brahm\u0101', 'center', 36.666667, 22.5),
		cell(23, 5, 7, 'Aryaman', 'innerRing', 43.333333, 22.5),
		cell(14, 5, 8, 'S\u016brya', 'perimeter', 50, 22.5),
		cell(5, 5, 9, 'S\u016brya', 'perimeter', 56.666667, 22.5),
		cell(78, 6, 1, 'Kusumadanta', 'perimeter', 3.333333, 17.5),
		cell(69, 6, 2, 'Kusumadanta', 'perimeter', 10, 17.5),
		cell(60, 6, 3, 'Mitra', 'innerRing', 16.666667, 17.5),
		cell(51, 6, 4, 'Brahm\u0101', 'center', 23.333333, 17.5),
		cell(42, 6, 5, 'Brahm\u0101', 'center', 30, 17.5),
		cell(33, 6, 6, 'Brahm\u0101', 'center', 36.666667, 17.5),
		cell(24, 6, 7, 'Aryaman', 'innerRing', 43.333333, 17.5),
		cell(15, 6, 8, 'Saty\u0101', 'perimeter', 50, 17.5),
		cell(6, 6, 9, 'Saty\u0101', 'perimeter', 56.666667, 17.5),
		cell(79, 7, 1, 'Sugr\u012bva', 'perimeter', 3.333333, 12.5),
		cell(70, 7, 2, 'Sugr\u012bva', 'perimeter', 10, 12.5),
		cell(61, 7, 3, 'Indra', 'innerRing', 16.666667, 12.5),
		cell(52, 7, 4, 'Vivasv\u0101n', 'innerRing', 23.333333, 12.5),
		cell(43, 7, 5, 'Vivasv\u0101n', 'innerRing', 30, 12.5),
		cell(34, 7, 6, 'Vivasv\u0101n', 'innerRing', 36.666667, 12.5),
		cell(25, 7, 7, 'Savit\u0101', 'innerRing', 43.333333, 12.5),
		cell(16, 7, 8, 'Bh\u1e5b\u015ba', 'perimeter', 50, 12.5),
		cell(7, 7, 9, 'Bh\u1e5b\u015ba', 'perimeter', 56.666667, 12.5),
		cell(80, 8, 1, 'Dauv\u0101rika', 'perimeter', 3.333333, 7.5),
		cell(71, 8, 2, 'Jaya', 'innerCorner', 10, 7.5),
		cell(62, 8, 3, 'Bh\u1e5b\u1e45gar\u0101ja', 'perimeter', 16.666667, 7.5),
		cell(53, 8, 4, 'Gandharva', 'perimeter', 23.333333, 7.5),
		cell(44, 8, 5, 'Yama', 'perimeter', 30, 7.5),
		cell(35, 8, 6, 'B\u1e5bhatk\u1e63ata', 'perimeter', 36.666667, 7.5),
		cell(26, 8, 7, 'Vitatha', 'perimeter', 43.333333, 7.5),
		cell(17, 8, 8, 'S\u0101vitra', 'innerCorner', 50, 7.5),
		cell(8, 8, 9, 'Antarik\u1e63a', 'perimeter', 56.666667, 7.5),
		cell(81, 9, 1, 'Pit\u1e5b', 'perimeter', 3.333333, 2.5),
		cell(72, 9, 2, 'M\u1e5bga', 'perimeter', 10, 2.5),
		cell(63, 9, 3, 'Bh\u1e5b\u1e45gar\u0101ja', 'perimeter', 16.666667, 2.5),
		cell(54, 9, 4, 'Gandharva', 'perimeter', 23.333333, 2.5),
		cell(45, 9, 5, 'Yama', 'perimeter', 30, 2.5),
		cell(36, 9, 6, 'B\u1e5bhatk\u1e63ata', 'perimeter', 36.666667, 2.5),
		cell(27, 9, 7, 'Vitatha', 'perimeter', 43.333333, 2.5),
		cell(18, 9, 8, 'P\u016b\u1e63\u0101', 'perimeter', 50, 2.5),
		cell(9, 9, 9, 'V\u0101yu', 'perimeter', 56.666667, 2.5),
	],
	brahmasthan: {
		squares: [31, 32, 33, 40, 41, 42, 49, 50, 51],
		polygon: [
			{ x: 20, y: 15 },
			{ x: 40, y: 15 },
			{ x: 40, y: 30 },
			{ x: 20, y: 30 },
		],
		area: 300,
	},
	marma: { areaEach: 4.17 },
	vamsa: [
		{
			fromSquare: 73,
			toSquare: 9,
			from: { x: 3.333333, y: 42.5 },
			to: { x: 56.666667, y: 2.5 },
		},
		{
			fromSquare: 81,
			toSquare: 1,
			from: { x: 3.333333, y: 2.5 },
			to: { x: 56.666667, y: 42.5 },
		},
		{
			fromSquare: 27,
			toSquare: 75,
			from: { x: 43.333333, y: 2.5 },
			to: { x: 3.333333, y: 32.5 },
		},
		{
			fromSquare: 55,
			toSquare: 7,
			from: { x: 16.666667, y: 42.5 },
			to: { x: 56.666667, y: 12.5 },
		},
		{
			fromSquare: 3,
			toSquare: 63,
			from: { x: 56.666667, y: 32.5 },
			to: { x: 16.666667, y: 2.5 },
		},
		{
			fromSquare: 19,
			toSquare: 79,
			from: { x: 43.333333, y: 42.5 },
			to: { x: 3.333333, y: 12.5 },
		},
	],
	atimarma: [23, 31, 33, 39, 41, 43, 49, 51, 59],
	sources: [
		{
			text: 'Brihat Samhita',
			chapter: 53,
			verse: '42-50',
			translation: 'N. Chidambaram Iyer',
			year: 1884,
			publicDomain: true,
		},
	],
	conventions: { grid: '81-pada' },
};

/** The entrance read over the same ground, door on the east side. */
const ENTRANCE = {
	pada: 4,
	side: 'East',
	startCorner: 'Northeast',
	ordinalOnSide: 4,
	square: 4,
	cell: { rowFromNorth: 4, columnFromWest: 9 },
	devata: { id: 'indra-outer', name: 'Indra', padaCount: 2 },
	effect: 'Favour with the ruler.',
	auspiciousness: 'auspicious',
	reading: 'ZZENTRANCEREADING',
	recommendedPadas: [3, 4],
	source: {
		text: 'Brihat Samhita',
		chapter: 53,
		verse: '72',
		translation: 'N. Chidambaram Iyer',
		year: 1884,
		publicDomain: true,
	},
	conventions: { grid: '81-pada' },
};

/** The grid side, taken from the response rather than from a number written here. */
const SIDE = Math.max(...MANDALA.cells.map((c) => c.rowFromNorth));

describe('the grid is drawn where the response says, north at the top', () => {
	test('one square is drawn per pada, placed by its own row and column', async () => {
		const el = await mount(MANDALA);
		expect(rects(el).length).toBe(MANDALA.cells.length);
		for (const c of MANDALA.cells) {
			const r = at(el, c.columnFromWest, c.rowFromNorth);
			expect(
				r,
				`no square at row ${c.rowFromNorth} col ${c.columnFromWest}`,
			).toBeDefined();
			expect(r?.parentElement?.textContent).toContain(c.devataName);
		}
	});

	/**
	 * The response numbers every square by its row FROM THE NORTH and its column FROM THE WEST, so a
	 * drawing on any other orientation contradicts the field names beside it. Asserted as the two
	 * relationships a reader checks first rather than as coordinates, which a re-proportioning may
	 * legitimately change.
	 */
	test('row one is the top edge and column one the left edge', async () => {
		const el = await mount(MANDALA);
		const north = at(el, 1, 1);
		const south = at(el, 1, SIDE);
		const west = at(el, 1, 1);
		const east = at(el, SIDE, 1);
		expect(num(north, 'y')).toBeLessThan(num(south, 'y'));
		expect(num(west, 'x')).toBeLessThan(num(east, 'x'));
	});

	/**
	 * The ring vocabulary is keyed on the value the response actually sends. Keying it on a plausible
	 * spelling instead resolves nothing while looking exactly like a table that works, so the centre
	 * of the grid is asserted to be tinted AND named rather than merely drawn.
	 */
	test('the centre block is painted and named from the ring the response gives', async () => {
		const el = await mount(MANDALA, { lang: 'zz' });
		const centre = MANDALA.cells.filter((c) => c.class === 'center');
		expect(centre.length).toBeGreaterThan(0);
		for (const c of centre) {
			const r = at(el, c.columnFromWest, c.rowFromNorth);
			expect(r?.classList.contains('pada-center'), String(c.square)).toBe(true);
			expect(r?.querySelector('title')?.textContent).toContain('ZZCENTER');
		}
		const edge = MANDALA.cells.find((c) => c.class === 'perimeter');
		expect(
			at(el, edge?.columnFromWest ?? 0, edge?.rowFromNorth ?? 0)?.querySelector(
				'title',
			)?.textContent,
		).toContain('ZZPERIMETER');
	});

	/** A square outside an irregular outline is a fact about the ground, so it is marked, never dropped. */
	test('a square whose centre falls outside the plot is drawn and marked', async () => {
		const el = await mount(MANDALA);
		const outside = MANDALA.cells.filter((c) => !c.withinPlot);
		expect(outside.length).toBeGreaterThan(0);
		for (const c of outside) {
			expect(
				at(el, c.columnFromWest, c.rowFromNorth)?.classList.contains(
					'pada-outside',
				),
			).toBe(true);
		}
	});
});

describe('every devata is readable at any width', () => {
	/**
	 * A devata label is a fixed fraction of a pada, so on a phone the name in the square lands near
	 * four CSS pixels and a square title is unreachable on a touch screen. The list is what keeps the
	 * names available at the card's own text size, so it has to carry the WHOLE projection: every
	 * name, and every square under the name that holds it, checked in both directions against the
	 * response rather than against the drawing.
	 */
	test('the list names every devata and every square it holds', async () => {
		const el = await mount(MANDALA);
		const items = [...root(el).querySelectorAll('[part~="devatas"] li')];
		const expected = new Map<string, number[]>();
		for (const c of MANDALA.cells) {
			expected.set(c.devataName, [
				...(expected.get(c.devataName) ?? []),
				c.square,
			]);
		}
		expect(items.length).toBe(expected.size);

		const listed = new Map<string, number[]>();
		for (const li of items) {
			const name = li.querySelector('b')?.textContent?.trim() ?? '';
			const squares = (li.textContent ?? '')
				.replace(name, '')
				.split(',')
				.map((n) => Number(n.trim()))
				.filter((n) => Number.isFinite(n));
			listed.set(name, squares);
		}
		for (const [name, squares] of expected) {
			expect(listed.get(name), `${name} is not listed`).toEqual(
				[...squares].sort((a, b) => a - b),
			);
		}
		// Every square appears exactly once across the list, so nothing is lost and
		// nothing is counted twice.
		const all = [...listed.values()].flat().sort((a, b) => a - b);
		expect(all).toEqual(
			MANDALA.cells.map((c) => c.square).sort((a, b) => a - b),
		);
	});

	/**
	 * Both figures are areas in the square of the plot unit and they are two different quantities: one
	 * is the whole central block, the other is ONE of eighty one marma spots. Printed as bare numbers
	 * under the bare terms they read as counts, and a card that swapped them would pass every other
	 * check here, so each is pinned to the field it comes from.
	 */
	test('the two area figures are labelled apart and read from their own fields', async () => {
		const el = await mount(MANDALA);
		const facts = [
			...root(el).querySelectorAll('[part~="details"] span'),
		].filter((n) => n.querySelector('.lbl'));
		const labelled = (needle: string) =>
			facts.find((n) => (n.textContent ?? '').includes(needle));
		const brahma = labelled('Brahmasthan area');
		const marma = labelled('Area of one marma');
		expect(brahma?.textContent).toContain(String(MANDALA.brahmasthan.area));
		expect(marma?.textContent).toContain(String(MANDALA.marma.areaEach));
		expect(brahma).not.toBe(marma);
	});

	/** The division that names no devatas has nothing to list, and an empty heading is a heading that lies. */
	test('a projection with no devata names renders no list', async () => {
		const el = await mount({
			...MANDALA,
			cells: MANDALA.cells.map(({ devataName, ...rest }) => rest),
		});
		expect(root(el).querySelector('[part~="devatas"]')).toBeNull();
	});

	/**
	 * SVG text is measured in USER units, so a compass word inside the viewBox shrinks with the plate
	 * and a longer word in another language runs into the grid. Outside it, the four words hold their
	 * size in CSS pixels at every width and in every language.
	 */
	test('the compass words sit outside the drawing, not inside the viewBox', async () => {
		const el = await mount(MANDALA);
		const svg = root(el).querySelector('svg');
		expect(svg?.querySelectorAll('text.edge').length ?? 0).toBe(0);
		const words = [...root(el).querySelectorAll('.frame .compass')].map((n) =>
			n.textContent?.trim(),
		);
		expect(words).toEqual(['North', 'East', 'South', 'West']);
	});

	/**
	 * The words are part of the figure, so the chart part has to name the box that holds BOTH: a page
	 * hiding the chart on the published part name loses the whole drawing rather than the plate alone,
	 * and the same box is the one carrying the width cap a consumer overrides.
	 */
	test('the chart part covers the plate and its compass words together', async () => {
		const el = await mount(MANDALA);
		const chart = root(el).querySelector('[part~="chart"]');
		expect(chart?.querySelector('svg')).not.toBeNull();
		expect(chart?.querySelectorAll('.compass').length).toBe(4);
		expect(root(el).querySelector('svg[part]')).toBeNull();
	});
});

describe('the two area figures print the unit the response echoes', () => {
	const factsOf = (el: HTMLElement) =>
		[...root(el).querySelectorAll('[part~="details"] span')].filter((n) =>
			n.querySelector('.lbl'),
		);
	const labelled = (el: HTMLElement, needle: string) =>
		factsOf(el).find((n) => (n.textContent ?? '').includes(needle));
	/** The element carrying the printed figure, whose `title` is the one place the word lives. */
	const figureOf = (fact: Element | undefined) =>
		fact?.querySelector('[title]');

	/**
	 * `ft²` and `m²` are the standard symbols, so they print the SAME in every locale, unlike a
	 * catalogued word. The title is the opposite: fixed English where the locale has no catalogue,
	 * catalogued where one exists. Checked on the SAME unit in both locales so neither run could
	 * pass by coincidence.
	 */
	test('the printed symbol is the standard one and never the locale word, in two locales', async () => {
		const english = await mount({
			...MANDALA,
			conventions: { grid: '81-pada', unit: 'feet' },
		});
		const zz = await mount(
			{ ...MANDALA, conventions: { grid: '81-pada', unit: 'feet' } },
			{ lang: 'zz' },
		);

		for (const el of [english, zz]) {
			const text = labelled(el, 'Brahmasthan area')?.textContent ?? '';
			expect(text).toContain('ft²');
			expect(text).not.toContain('Feet');
			expect(text).not.toContain('ZZFEET');
		}
		expect(
			figureOf(labelled(english, 'Brahmasthan area'))?.getAttribute('title'),
		).toBe('Feet');
		expect(
			figureOf(labelled(zz, 'Brahmasthan area'))?.getAttribute('title'),
		).toBe('ZZFEET');
	});

	/**
	 * Swapping which unit the response echoes has to swap the symbol, or a card that always printed
	 * `ft²` would pass the test above by coincidence. The title tracks the same switch.
	 */
	test('the symbol and the title both track which unit the response echoes', async () => {
		const el = await mount({
			...MANDALA,
			conventions: { grid: '81-pada', unit: 'metres' },
		});
		const marma = labelled(el, 'Area of one marma');
		expect(marma?.textContent).toContain('m²');
		expect(marma?.textContent).not.toContain('ft²');
		expect(figureOf(marma)?.getAttribute('title')).toBe('Metres');
	});

	/**
	 * A payload from before the API echoed `conventions.unit` carries no such field, and naming a
	 * unit nobody confirmed would be a guess dressed as a fact. `MANDALA` is exactly that shape (its
	 * `conventions` names only `grid`), so the bare figures print with no symbol and no title.
	 */
	test('an older payload with no unit echo prints the bare number, never a default unit', async () => {
		const el = await mount(MANDALA);
		const brahma = labelled(el, 'Brahmasthan area');
		const marma = labelled(el, 'Area of one marma');
		expect(brahma?.textContent).toContain(String(MANDALA.brahmasthan.area));
		expect(marma?.textContent).toContain(String(MANDALA.marma.areaEach));
		for (const n of [brahma, marma]) {
			expect(n?.textContent ?? '').not.toMatch(
				/ft²|m²|Feet|Metres|ZZFEET|ZZMETRES/,
			);
			expect(figureOf(n)).toBeNull();
		}
	});
});

describe('the overlays land on the squares the response names', () => {
	/**
	 * The polygon arrives in PLOT coordinates and the squares arrive as a list of numbers, computed
	 * independently of each other. A drawing that mapped either one wrong would still look like a
	 * block in the middle of a grid, so this is asserted as containment of one against the other in
	 * BOTH directions.
	 */
	test('the brahmasthan polygon covers exactly the squares the response lists', async () => {
		const el = await mount(MANDALA);
		const poly = root(el).querySelector('polygon.brahmasthan');
		const points = (poly?.getAttribute('points') ?? '')
			.split(' ')
			.map((p) => p.split(',').map(Number) as [number, number]);
		expect(points.length).toBe(MANDALA.brahmasthan.polygon.length);
		const xs = points.map((p) => p[0]);
		const ys = points.map((p) => p[1]);
		const inside = (u: number, v: number) =>
			u > Math.min(...xs) &&
			u < Math.max(...xs) &&
			v > Math.min(...ys) &&
			v < Math.max(...ys);
		const listed = new Set(MANDALA.brahmasthan.squares);
		for (const c of MANDALA.cells) {
			const u = c.columnFromWest - 0.5;
			const v = c.rowFromNorth - 0.5;
			expect(inside(u, v), `square ${c.square}`).toBe(listed.has(c.square));
		}
	});

	/** Each diagonal is given as two plot points AND as the two squares it runs between; they have to agree. */
	test('every vamsa line runs between the centres of the squares it names', async () => {
		const el = await mount(MANDALA);
		const lines = [...root(el).querySelectorAll('line.vamsa')];
		expect(lines.length).toBe(MANDALA.vamsa.length);
		const centreOf = (square: number) => {
			const c = MANDALA.cells.find((x) => x.square === square);
			return [
				(c?.columnFromWest ?? 0) - 0.5,
				(c?.rowFromNorth ?? 0) - 0.5,
			] as const;
		};
		MANDALA.vamsa.forEach((v, i) => {
			const line = lines[i] as Element;
			const [fx, fy] = centreOf(v.fromSquare);
			const [tx, ty] = centreOf(v.toSquare);
			expect(num(line, 'x1')).toBeCloseTo(fx, 2);
			expect(num(line, 'y1')).toBeCloseTo(fy, 2);
			expect(num(line, 'x2')).toBeCloseTo(tx, 2);
			expect(num(line, 'y2')).toBeCloseTo(ty, 2);
		});
	});

	test('a crossing point is drawn at the centre of every square the response names', async () => {
		const el = await mount(MANDALA);
		const dots = [...root(el).querySelectorAll('circle.atimarma')];
		expect(dots.length).toBe(MANDALA.atimarma.length);
		for (const square of MANDALA.atimarma) {
			const c = MANDALA.cells.find((x) => x.square === square);
			const hit = dots.find(
				(d) =>
					Math.abs(num(d, 'cx') - ((c?.columnFromWest ?? 0) - 0.5)) < 0.01 &&
					Math.abs(num(d, 'cy') - ((c?.rowFromNorth ?? 0) - 0.5)) < 0.01,
			);
			expect(hit, `no crossing point on square ${square}`).toBeDefined();
		}
	});
});

describe('the entrance read lights the square the response names', () => {
	test('the door sits on the cell the API gives, and that cell is on the boundary', async () => {
		const el = await mount(ENTRANCE, { mode: 'entrance' });
		const door = root(el).querySelector('rect.pada-door');
		expect(num(door, 'x')).toBe(ENTRANCE.cell.columnFromWest - 1);
		expect(num(door, 'y')).toBe(ENTRANCE.cell.rowFromNorth - 1);
		const onEdge =
			ENTRANCE.cell.rowFromNorth === 1 ||
			ENTRANCE.cell.columnFromWest === 1 ||
			ENTRANCE.cell.rowFromNorth === SIDE ||
			ENTRANCE.cell.columnFromWest === SIDE;
		expect(onEdge).toBe(true);
	});

	/**
	 * The side and the cell are computed independently, so a drawing that lit the right square on the
	 * wrong side, or the wrong square on the right side, would pass a check against either one alone.
	 */
	test('the lit square lies on the side the response names', async () => {
		const el = await mount(ENTRANCE, { mode: 'entrance' });
		const door = root(el).querySelector('rect.pada-door');
		expect(ENTRANCE.side).toBe('East');
		expect(num(door, 'x')).toBe(SIDE - 1);
	});

	test('the entrance card names the pada, its devata and its verse', async () => {
		const el = await mount(ENTRANCE, { mode: 'entrance' });
		const body = root(el).querySelector('[part~="card"]')?.textContent ?? '';
		expect(body).toContain('Indra');
		expect(body).toContain('Favour with the ruler.');
		expect(body).toContain('Brihat Samhita 53.72');
	});

	/** The projection carries no door, so a page that asked for it never grows one. */
	test('the projection read draws no door', async () => {
		const el = await mount(MANDALA, { mode: 'mandala' });
		expect(root(el).querySelector('rect.pada-door')).toBeNull();
	});
});

describe('hide-readings', () => {
	test('the whole grid stays and only the verse effect and the verdict sentence go', async () => {
		const el = await mount(ENTRANCE, {
			mode: 'entrance',
			'hide-readings': '',
		});
		expect(root(el).querySelector('rect.pada-door')).not.toBeNull();
		const body = root(el).querySelector('[part~="card"]')?.textContent ?? '';
		for (const kept of ['Indra', 'Brihat Samhita 53.72']) {
			expect(body, `hide-readings removed ${kept}, which is the map`).toContain(
				kept,
			);
		}
		expect(body).not.toContain('ZZENTRANCEREADING');
		expect(body).not.toContain('Favour with the ruler.');
	});
});
