import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { LO_SHU } from '../src/utils/nine-palaces.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-flying-star-chart');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';
const cells = (el: HTMLElement): Element[] => [
	...root(el).querySelectorAll('.plate .palace'),
];
const num = (cell: Element, sel: string): number =>
	Number(cell.querySelector(sel)?.textContent?.trim());

/**
 * A live period 9 plate facing S2, exactly as the endpoint returned it, including its palace order.
 *
 * @remarks
 * The response lists the palaces centre first and then along the flight path, which is NOT the
 * order they are drawn in. Keeping the wire order here is deliberate: it is what proves the
 * component places a cell by its palace name rather than by its position in the array.
 */
const PLATE = {
	period: 9,
	facing: { id: 's2', label: 'S2', chinese: '午', direction: 'South' },
	sitting: { id: 'n2', label: 'N2', chinese: '子', direction: 'North' },
	facingDegrees: 175,
	straddling: false,
	mountainCenterStar: 5,
	waterCenterStar: 4,
	mountainFlight: 'reverse',
	waterFlight: 'forward',
	structure: {
		id: 'double-sitting',
		name: 'Double Star at Sitting',
		chinese: '雙星到坐',
		meaning: 'ZZREADINGSTRUCTURE',
	},
	palaces: [
		{ palace: 'Center', base: 5, period: 9, mountain: 5, water: 4 },
		{ palace: 'Northwest', base: 6, period: 1, mountain: 4, water: 5 },
		{ palace: 'West', base: 7, period: 2, mountain: 3, water: 6 },
		{ palace: 'Northeast', base: 8, period: 3, mountain: 2, water: 7 },
		{ palace: 'South', base: 9, period: 4, mountain: 1, water: 8 },
		{ palace: 'North', base: 1, period: 5, mountain: 9, water: 9 },
		{ palace: 'Southwest', base: 2, period: 6, mountain: 8, water: 1 },
		{ palace: 'East', base: 3, period: 7, mountain: 7, water: 2 },
		{ palace: 'Southeast', base: 4, period: 8, mountain: 6, water: 3 },
	],
};

const ANNUAL = {
	year: 2026,
	centerStar: 2,
	changeoverDate: '2026-02-04',
	palaces: [
		{
			palace: 'Center',
			star: 2,
			name: 'Two Black',
			element: 'Earth',
			nature: 'inauspicious',
			meaning: 'ZZREADINGTWO',
			remedy: 'ZZREMEDYTWO',
		},
		{
			palace: 'Northwest',
			star: 3,
			name: 'Three Jade',
			element: 'Wood',
			nature: 'inauspicious',
			meaning: 'ZZREADINGTHREE',
		},
		{
			palace: 'West',
			star: 4,
			name: 'Four Green',
			element: 'Wood',
			nature: 'auspicious',
			meaning: 'ZZREADINGFOUR',
		},
		{
			palace: 'Northeast',
			star: 5,
			name: 'Five Yellow',
			element: 'Earth',
			nature: 'inauspicious',
			meaning: 'ZZREADINGFIVE',
		},
		{
			palace: 'South',
			star: 6,
			name: 'Six White',
			element: 'Metal',
			nature: 'auspicious',
			meaning: 'ZZREADINGSIX',
		},
		{
			palace: 'North',
			star: 7,
			name: 'Seven Red',
			element: 'Metal',
			nature: 'inauspicious',
			meaning: 'ZZREADINGSEVEN',
		},
		{
			palace: 'Southwest',
			star: 8,
			name: 'Eight White',
			element: 'Earth',
			nature: 'auspicious',
			meaning: 'ZZREADINGEIGHT',
		},
		{
			palace: 'East',
			star: 9,
			name: 'Nine Purple',
			element: 'Fire',
			nature: 'auspicious',
			meaning: 'ZZREADINGNINE',
		},
		{
			palace: 'Southeast',
			star: 1,
			name: 'One White',
			element: 'Water',
			nature: 'auspicious',
			meaning: 'ZZREADINGONE',
		},
	],
};

/** The palace drawn in each grid position, read off the rendered cell's own name. */
const drawnOrder = (el: HTMLElement): string[] =>
	cells(el).map(
		(c) => c.querySelector('.palace-name')?.textContent?.trim() ?? '',
	);

/** The Lo Shu number of each palace, taken from the response rather than from the drawing. */
const BASE_BY_PALACE = new Map(PLATE.palaces.map((p) => [p.palace, p.base]));

/**
 * The plate is a fixed diagram, so these assert its RELATIONSHIP to the Lo Shu square rather than
 * its symmetry with itself. A grid rotated a quarter turn, mirrored, or filled in response order
 * is still nine cells with nine numbers and still passes every count.
 */
describe('the nine palaces sit where the Lo Shu puts them', () => {
	/**
	 * The Lo Shu number is not drawn: published plates carry three numbers per palace, and this is
	 * the fixed position of the palace rather than a star that flew there. It still decides WHERE a
	 * cell goes, so the check reads the number from the response and the position from the render.
	 */
	test('each position holds the palace whose Lo Shu number the square puts there', async () => {
		const el = await mount(PLATE);
		const order = drawnOrder(el);
		expect(order.length).toBe(9);
		expect(order.map((name) => BASE_BY_PALACE.get(name))).toEqual([...LO_SHU]);
	});

	test('the square holds: every row, column and both diagonals sum to fifteen', async () => {
		const el = await mount(PLATE);
		const n = drawnOrder(el).map((name) => BASE_BY_PALACE.get(name) as number);
		const at = (r: number, c: number) => n[r * 3 + c] as number;
		for (let r = 0; r < 3; r++) {
			expect(at(r, 0) + at(r, 1) + at(r, 2), `row ${r}`).toBe(15);
			expect(at(0, r) + at(1, r) + at(2, r), `column ${r}`).toBe(15);
		}
		expect(at(0, 0) + at(1, 1) + at(2, 2)).toBe(15);
		expect(at(0, 2) + at(1, 1) + at(2, 0)).toBe(15);
	});

	/** Three numbers per cell is what a published plate draws, so a fourth is a defect. */
	test('a cell carries the mountain, the period and the water star and nothing else', async () => {
		const el = await mount(PLATE);
		for (const cell of cells(el)) {
			expect(cell.querySelectorAll('.mountain').length).toBe(1);
			expect(cell.querySelectorAll('.water').length).toBe(1);
			expect(cell.querySelectorAll('.star').length).toBe(1);
			expect(cell.querySelector('.base')).toBeNull();
		}
	});

	/**
	 * South at the top is the whole orientation of the diagram and the one thing a rotated plate
	 * would get wrong while still looking right. Named cells, not positions, so a re-proportioning
	 * of the grid cannot fail this while a rotation does.
	 */
	test('south is the top row and north the bottom, with the centre in the middle', async () => {
		const el = await mount(PLATE);
		const names = cells(el).map((c) =>
			c.querySelector('.palace-name')?.textContent?.trim(),
		);
		expect(names).toEqual([
			'Southeast',
			'South',
			'Southwest',
			'East',
			'Center',
			'West',
			'Northeast',
			'North',
			'Northwest',
		]);
	});

	/**
	 * The response lists the palaces along the flight path, centre first. Placing a cell by array
	 * index rather than by name draws a plate that is wrong in a way nothing else here can see.
	 */
	test('a cell is placed by its palace name, not by its position in the response', async () => {
		const el = await mount(PLATE);
		expect(drawnOrder(el)).not.toEqual(PLATE.palaces.map((p) => p.palace));
		for (const p of PLATE.palaces) {
			const cell = cells(el).find(
				(c) =>
					c.querySelector('.palace-name')?.textContent?.trim() === p.palace,
			);
			expect(cell, `no cell for ${p.palace}`).toBeDefined();
			expect(num(cell as Element, '.mountain'), p.palace).toBe(p.mountain);
			expect(num(cell as Element, '.water'), p.palace).toBe(p.water);
			expect(num(cell as Element, '.star'), p.palace).toBe(p.period);
		}
	});

	/**
	 * Each of the nine stars appears exactly once on each plate. It is the property the response
	 * documents as the one that makes a chart checkable, so the render has to preserve it.
	 */
	test('each plate carries all nine stars exactly once', async () => {
		const el = await mount(PLATE);
		const grid = cells(el);
		for (const sel of ['.mountain', '.water', '.star']) {
			const seen = grid.map((c) => num(c, sel)).sort((a, b) => a - b);
			expect(seen, `${sel} is not a complete plate`).toEqual([
				1, 2, 3, 4, 5, 6, 7, 8, 9,
			]);
		}
	});

	/**
	 * The mountain star reads on the left of a cell and the water star on the right, which is how
	 * every published plate is drawn and the only thing telling two numbers apart at a glance.
	 */
	test('the mountain star is drawn left of the water star in every cell', async () => {
		const el = await mount(PLATE);
		for (const cell of cells(el)) {
			const m = cell.querySelector('.mountain');
			const w = cell.querySelector('.water');
			expect(m).not.toBeNull();
			expect(w).not.toBeNull();
			expect(
				(m as Element).compareDocumentPosition(w as Node) &
					Node.DOCUMENT_POSITION_FOLLOWING,
			).toBeTruthy();
		}
	});
});

describe('what decides the plate', () => {
	test('the facing, the sitting and the measured degrees all print', async () => {
		const el = await mount(PLATE);
		const body = text(el);
		expect(body).toContain('S2');
		expect(body).toContain('N2');
		expect(body).toContain('175');
		// The flight of each plate is the step that separates two charts that
		// otherwise look alike.
		expect(body).toContain('Backward');
		expect(body).toContain('Forward');
		expect(body).toContain('Double Star at Sitting');
	});
});

describe('the annual plate', () => {
	test('one star per palace, in the same nine positions', async () => {
		const el = await mount(ANNUAL, { mode: 'annual' });
		const grid = cells(el);
		expect(grid.length).toBe(9);
		expect(
			grid.map((c) => c.querySelector('.palace-name')?.textContent?.trim())[1],
		).toBe('South');
		const stars = grid.map((c) => num(c, '.star')).sort((a, b) => a - b);
		expect(stars).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		// A one-number cell has no mountain and no water half to draw.
		expect(root(el).querySelector('.plate .mountain')).toBeNull();
	});
});

describe('hide-readings', () => {
	test('every number, flight and structure name stays', async () => {
		const el = await mount(PLATE, { 'hide-readings': '' });
		const body = text(el);
		expect(cells(el).length).toBe(9);
		for (const kept of ['S2', 'Backward', 'Double Star at Sitting', '175']) {
			expect(body).toContain(kept);
		}
	});

	test('the written meanings go, on both plates', async () => {
		const natal = await mount(PLATE, { 'hide-readings': '' });
		expect(text(natal)).not.toContain('ZZREADINGSTRUCTURE');
		const annual = await mount(ANNUAL, {
			mode: 'annual',
			'hide-readings': '',
		});
		const body = text(annual);
		expect(body).not.toContain('ZZREADINGFIVE');
		expect(body).not.toContain('ZZREMEDYTWO');
		// The star names are the plate, not a reading, so they stay.
		expect(body).toContain('Five Yellow');
	});
});
