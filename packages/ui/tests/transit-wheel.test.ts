import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import type { CalculateTransitAspectsResponse } from '../src/types/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
	props: Record<string, unknown> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-transit-wheel');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	Object.assign(el, props);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string => root(el).textContent ?? '';

/** Numeric attribute off an SVG node, so a coordinate can be asserted rather than eyeballed. */
const num = (node: Element | null, attr: string): number =>
	Number(node?.getAttribute(attr));

/**
 * One body's glyph, found by ring and name rather than by position in the DOM.
 * The rings are emitted in longitude order (the fan-out sorts them), so an index
 * would silently start pointing at a different body the moment a fixture moves.
 * `ring` is the localized ring word the tooltip opens with, `Natal` or
 * `Transiting`.
 */
const glyph = (el: HTMLElement, ring: string, name: string): Element | null =>
	[...root(el).querySelectorAll('text[class$="-glyph"]')].find((n) =>
		(n.querySelector('title')?.textContent ?? '').startsWith(
			`${ring} ${name} `,
		),
	) ?? null;

/** Distance of a placed glyph from the wheel centre. */
const radiusOf = (node: Element | null): number =>
	Math.hypot(num(node, 'x') - CENTER, num(node, 'y') - CENTER);

/**
 * The wheel geometry, restated here on purpose.
 *
 * @remarks
 * These are the numbers the component draws with, written out independently
 * rather than imported, so a silent edit to a radius in the component fails a
 * test instead of moving the expectation with it. `polarToCartesian` puts 0
 * degrees at 3 o'clock with positive angles running clockwise on screen.
 */
const SIZE = 400;
const CENTER = 200;
const NATAL_R = 94;
const TRANSIT_R = 124;
const TRANSIT_LINE_R = 112;
const NATAL_LINE_R = 104;
const NATAL_DEG_R = 83;
const HUB_R = 70;
const BAND_R = 140;
const HOUSE_NUM_R = 58;

/** Where the component should place a longitude, derived from first principles. */
function expected(longitude: number, radius: number, ascendant = 0) {
	const angle = ((180 + ascendant - longitude) * Math.PI) / 180;
	return {
		x: CENTER + radius * Math.cos(angle),
		y: CENTER + radius * Math.sin(angle),
	};
}

/**
 * Cardinal longitudes on purpose: 0, 90, 180 and 270 land on the four compass
 * points of the wheel, so a sign flip or a 30-degree offset moves a glyph to a
 * visibly different quadrant and the assertion catches it.
 */
const body = (
	name: string,
	longitude: number,
	sign: string,
	house: number,
	over: Partial<CalculateTransitAspectsResponse['natalPlanets'][number]> = {},
): CalculateTransitAspectsResponse['natalPlanets'][number] => ({
	name: name as CalculateTransitAspectsResponse['natalPlanets'][number]['name'],
	longitude,
	latitude: 0,
	sign,
	degree: longitude % 30,
	house,
	speed: 1,
	isRetrograde: false,
	...over,
});

/**
 * Twelve UNEQUAL cusps, so a house ring drawn from them cannot be mistaken for
 * one derived at 30 degree intervals: house 1 spans 40 degrees and house 2 spans
 * 20. The set also wraps 360, which is the case an unwrapped midpoint gets wrong
 * by 180 degrees.
 */
const CUSPS = [
	{ number: 1, longitude: 350 },
	{ number: 2, longitude: 30 },
	{ number: 3, longitude: 50 },
	{ number: 4, longitude: 80 },
	{ number: 5, longitude: 110 },
	{ number: 6, longitude: 140 },
	{ number: 7, longitude: 170 },
	{ number: 8, longitude: 210 },
	{ number: 9, longitude: 230 },
	{ number: 10, longitude: 260 },
	{ number: 11, longitude: 290 },
	{ number: 12, longitude: 320 },
];

/**
 * Venus and Mars are here to make a planet1/planet2 swap DETECTABLE. The
 * same-name pairs below (transiting Sun to natal Sun) draw the identical line
 * whichever way the fields are read, so an aspect between two DIFFERENT bodies,
 * with all four longitudes distinct, is the only fixture that can fail when the
 * transiting and natal roles are exchanged.
 */
const data: CalculateTransitAspectsResponse = {
	transitDate: '2026-05-11 12:00:00',
	houseSystem: 'placidus',
	// Houses that DIFFER per body and differ between the two rings, which is what
	// the live response returns and what a column of 1s cannot be confused with.
	natalPlanets: [
		body('Sun', 0, 'Aries', 8),
		body('Moon', 90, 'Cancer', 4),
		body('Saturn', 45, 'Taurus', 2, { isRetrograde: true, speed: -0.05 }),
		body('Venus', 30, 'Taurus', 11),
		body('Mars', 210, 'Scorpio', 6),
	],
	transitPlanets: [
		body('Sun', 180, 'Libra', 3),
		body('Moon', 270, 'Capricorn', 12),
		body('Saturn', 315, 'Aquarius', 9),
		body('Venus', 60, 'Gemini', 1),
		body('Mars', 120, 'Leo', 5),
	],
	aspects: [
		{
			planet1: 'Sun',
			planet2: 'Sun',
			type: 'OPPOSITION',
			angle: 180,
			orb: 0,
			isApplying: true,
			strength: 100,
			interpretation: 'challenging',
			transitInterpretation: {
				summary: 'ZZREADINGSUMMARY',
				timing: 'ZZREADINGTIMING',
				impact: 'ZZREADINGIMPACT',
				guidance: 'ZZREADINGGUIDANCE',
				keywords: ['ZZREADINGKEYWORD'],
			},
		},
		{
			planet1: 'Moon',
			planet2: 'Moon',
			type: 'OPPOSITION',
			angle: 180,
			orb: 1.5,
			isApplying: false,
			strength: 80,
			interpretation: 'harmonious',
			transitInterpretation: {
				summary: 'ZZREADINGMOON',
				timing: 'Active for a few hours',
				impact: 'x',
				guidance: 'y',
				keywords: ['k'],
			},
		},
		{
			// Transiting Mars (120) square natal Venus (30). Reading the pair the
			// other way round would draw transiting Venus (60) to natal Mars (210),
			// which is a different line on a different side of the wheel.
			planet1: 'Mars',
			planet2: 'Venus',
			type: 'SQUARE',
			angle: 90,
			orb: 0,
			isApplying: true,
			strength: 100,
			interpretation: 'challenging',
			transitInterpretation: {
				summary: 'ZZREADINGSQUARE',
				timing: 'Active for a few days',
				impact: 'x',
				guidance: 'y',
				keywords: ['k'],
			},
		},
	],
	summary: {
		total: 3,
		harmonious: 1,
		challenging: 2,
		neutral: 0,
		byType: { OPPOSITION: 2, SQUARE: 1 },
		strongest: {
			planet1: 'Sun',
			planet2: 'Sun',
			type: 'OPPOSITION',
			angle: 180,
			orb: 0,
			isApplying: true,
			strength: 100,
			interpretation: 'challenging',
			transitInterpretation: {
				summary: 'Sun opposes your natal Sun',
				timing: 'Active for a few days',
				impact: 'x',
				guidance: 'y',
				keywords: ['k'],
			},
		},
	},
};

describe('roxy-transit-wheel', () => {
	test('registers under its tag and exposes the empty state with no data', async () => {
		expect(customElements.get('roxy-transit-wheel')).toBeDefined();
		const el = document.createElement('roxy-transit-wheel');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('No transit data');
		el.remove();
	});

	test('draws both rings, twelve signs and one line per returned aspect', async () => {
		const el = await mount(data);
		const r = root(el);
		expect(r.querySelector('svg[part="chart"]')).not.toBeNull();
		expect(r.querySelectorAll('text.sign-glyph').length).toBe(12);
		expect(r.querySelectorAll('text.natal-glyph').length).toBe(5);
		expect(r.querySelectorAll('text.transit-glyph').length).toBe(5);
		expect(r.querySelectorAll('line.aspect').length).toBe(3);
		el.remove();
	});

	/**
	 * The invariant that makes the drawing trustworthy: a body at a known
	 * longitude lands where the wheel convention says it must. A sign flip or a
	 * 30-degree offset would still produce a plausible-looking wheel, and only a
	 * coordinate assertion tells them apart from a correct one.
	 */
	test('places every body at the exact angle its longitude implies', async () => {
		const el = await mount(data);

		// Natal Sun at 0 Aries: the left horizon, which is where the default
		// sign-based orientation puts 0 degrees.
		const sun = expected(0, NATAL_R);
		expect(num(glyph(el, 'Natal', 'Sun'), 'x')).toBeCloseTo(sun.x, 6);
		expect(num(glyph(el, 'Natal', 'Sun'), 'y')).toBeCloseTo(sun.y, 6);
		expect(num(glyph(el, 'Natal', 'Sun'), 'x')).toBeCloseTo(
			CENTER - NATAL_R,
			6,
		);

		// Natal Moon at 0 Cancer, a quarter of the zodiac on: straight down the
		// screen, because the zodiac runs counterclockwise.
		const moon = expected(90, NATAL_R);
		expect(num(glyph(el, 'Natal', 'Moon'), 'x')).toBeCloseTo(CENTER, 6);
		expect(num(glyph(el, 'Natal', 'Moon'), 'y')).toBeCloseTo(
			CENTER + NATAL_R,
			6,
		);
		expect(num(glyph(el, 'Natal', 'Moon'), 'y')).toBeCloseTo(moon.y, 6);

		// Transiting Sun at 0 Libra, opposite the natal Sun: the right horizon.
		const tSun = expected(180, TRANSIT_R);
		expect(num(glyph(el, 'Transiting', 'Sun'), 'x')).toBeCloseTo(
			CENTER + TRANSIT_R,
			6,
		);
		expect(num(glyph(el, 'Transiting', 'Sun'), 'y')).toBeCloseTo(tSun.y, 6);

		// Transiting Moon at 0 Capricorn: straight up.
		expect(num(glyph(el, 'Transiting', 'Moon'), 'x')).toBeCloseTo(CENTER, 6);
		expect(num(glyph(el, 'Transiting', 'Moon'), 'y')).toBeCloseTo(
			CENTER - TRANSIT_R,
			6,
		);
		el.remove();
	});

	test('keeps the two rings at different radii, transiting outside natal', async () => {
		const el = await mount(data);
		const natal = [...root(el).querySelectorAll('text.natal-glyph')];
		const transit = [...root(el).querySelectorAll('text.transit-glyph')];

		for (const n of natal) expect(radiusOf(n)).toBeCloseTo(NATAL_R, 6);
		for (const t of transit) expect(radiusOf(t)).toBeCloseTo(TRANSIT_R, 6);
		expect(TRANSIT_R).toBeGreaterThan(NATAL_R);
		// Every glyph stays inside the viewBox, so nothing is drawn off the canvas.
		for (const g of [...natal, ...transit]) {
			expect(num(g, 'x')).toBeGreaterThan(0);
			expect(num(g, 'x')).toBeLessThan(SIZE);
		}
		el.remove();
	});

	/**
	 * Legibility without losing precision. Four bodies inside three degrees are
	 * ordinary in a real chart and would otherwise print one glyph and one degree
	 * label on top of another, so the glyphs fan apart and a leader ties each one
	 * back to where it really is. What must NOT move is the reported position: the
	 * degree label, the tooltip and the table all still say the true longitude.
	 */
	test('fans a stellium apart and still reports the true longitudes', async () => {
		const stellium = {
			...data,
			natalPlanets: [
				body('Sun', 100, 'Cancer', 5),
				body('Mercury', 101, 'Cancer', 5),
				body('Venus', 102, 'Cancer', 5),
				body('Mars', 103, 'Cancer', 5),
			],
			aspects: [],
			summary: undefined,
		};
		const el = await mount(stellium);
		const r = root(el);
		const glyphs = [...r.querySelectorAll('text.natal-glyph')];
		expect(glyphs.length).toBe(4);

		// Every glyph is still exactly on the natal ring, so the fan is angular
		// only: it never pushes a body off its own ring.
		for (const g of glyphs) expect(radiusOf(g)).toBeCloseTo(NATAL_R, 6);

		// Adjacent glyphs now clear each other. The separation is derived from the
		// radius, so restate it here rather than importing the component's number.
		// max of the glyph at the ring radius and the degree label at its own.
		const minSep = Math.max(13 / NATAL_R, 15 / NATAL_DEG_R) * (180 / Math.PI);
		const angles = glyphs
			.map((g) => Math.atan2(num(g, 'y') - CENTER, num(g, 'x') - CENTER))
			.map((a) => (a * 180) / Math.PI)
			.sort((a, b) => a - b);
		for (let i = 1; i < angles.length; i++) {
			expect((angles[i] as number) - (angles[i - 1] as number)).toBeGreaterThan(
				minSep - 0.001,
			);
		}

		// One leader per displaced body, and none for the one that did not move.
		expect(r.querySelectorAll('line.leader').length).toBe(3);

		// The reported positions are untouched: 10, 11, 12 and 13 degrees of Cancer.
		const body_ = text(el);
		for (const d of ["10°00'", "11°00'", "12°00'", "13°00'"]) {
			expect(body_).toContain(d);
		}
		expect(
			glyph(el, 'Natal', 'Mars')?.querySelector('title')?.textContent,
		).toContain("13°00'");
		el.remove();
	});

	/**
	 * `planet1` is the TRANSITING body and `planet2` the NATAL one. Verified
	 * against live responses (every returned orb reconciles with the
	 * transit-to-natal separation one way round and almost none the other), so the
	 * line has to start on the transit ring and end on the natal one.
	 */
	test('runs each aspect line from the transiting body to the natal one', async () => {
		const el = await mount(data);
		const lines = [...root(el).querySelectorAll('line.aspect')];

		// Aspect 0: transiting Sun (180) opposite natal Sun (0).
		const from = expected(180, TRANSIT_LINE_R);
		const to = expected(0, NATAL_LINE_R);
		expect(num(lines[0] ?? null, 'x1')).toBeCloseTo(from.x, 6);
		expect(num(lines[0] ?? null, 'y1')).toBeCloseTo(from.y, 6);
		expect(num(lines[0] ?? null, 'x2')).toBeCloseTo(to.x, 6);
		expect(num(lines[0] ?? null, 'y2')).toBeCloseTo(to.y, 6);
		// Read the other way round the line would start on the LEFT, where the
		// natal Sun is, so pin the side as well as the point.
		expect(num(lines[0] ?? null, 'x1')).toBeGreaterThan(CENTER);
		expect(num(lines[0] ?? null, 'x2')).toBeLessThan(CENTER);

		// Aspect 1: transiting Moon (270, straight up) opposite natal Moon (90, down).
		expect(num(lines[1] ?? null, 'y1')).toBeCloseTo(CENTER - TRANSIT_LINE_R, 6);
		expect(num(lines[1] ?? null, 'y2')).toBeCloseTo(CENTER + NATAL_LINE_R, 6);

		// Aspect 2 is the one that can tell the two readings apart, because the four
		// longitudes differ: transiting Mars (120) to natal Venus (30). Exchanging
		// the roles would draw transiting Venus (60) to natal Mars (210) instead.
		const mars = expected(120, TRANSIT_LINE_R);
		const venus = expected(30, NATAL_LINE_R);
		expect(num(lines[2] ?? null, 'x1')).toBeCloseTo(mars.x, 6);
		expect(num(lines[2] ?? null, 'y1')).toBeCloseTo(mars.y, 6);
		expect(num(lines[2] ?? null, 'x2')).toBeCloseTo(venus.x, 6);
		expect(num(lines[2] ?? null, 'y2')).toBeCloseTo(venus.y, 6);
		expect(lines[2]?.querySelector('title')?.textContent).toContain(
			'Transiting Mars square Natal Venus',
		);
		el.remove();
	});

	test('colours each aspect line by the aspect the response reports', async () => {
		const el = await mount(data);
		const lines = [...root(el).querySelectorAll('line.aspect')];
		// The class encodes the ASPECT, the badge the nature: aspect 1 is a
		// harmonious opposition in the fixture and still takes the opposition class.
		expect(lines[0]?.getAttribute('class')).toContain('aspect-opposition');
		expect(lines[1]?.getAttribute('class')).toContain('aspect-opposition');
		expect(lines[2]?.getAttribute('class')).toContain('aspect-square');
		expect(root(el).querySelector('line.aspect title')?.textContent).toContain(
			'Transiting Sun opposition Natal Sun',
		);
		el.remove();
	});

	/**
	 * The split the whole component turns on: the response NUMBERS every body by
	 * house but sends no cusp longitude, so the numbers render and the sectors do
	 * not. An earlier API revision returned `1` for everything, and the docblock
	 * saying so outlived the fix and went on justifying a missing column, so this
	 * asserts the numbers are the response's own and not a constant.
	 */
	test('renders the house numbers it has and draws no sectors it does not', async () => {
		const el = await mount(data);
		const r = root(el);
		// No sector ring: nothing supplied the cusps those numbers refer to.
		expect(r.querySelector('line.house-cusp')).toBeNull();
		expect(r.querySelector('text.house-num')).toBeNull();
		expect(r.querySelector('text.axis-label')).toBeNull();

		// The numbers themselves, in their own columns, both rings.
		const headers = [...r.querySelectorAll('thead th')].map((n) =>
			(n.textContent ?? '').trim(),
		);
		expect(headers).toEqual([
			'Body',
			'Natal',
			'Natal house',
			'Transiting',
			'Transiting house',
		]);
		const sun = [...r.querySelectorAll('tbody tr')].find((row) =>
			(row.querySelector('th')?.textContent ?? '').includes('Sun'),
		);
		const cells = [...(sun?.querySelectorAll('td') ?? [])].map((n) =>
			(n.textContent ?? '').trim(),
		);
		// Natal Sun house 8, transiting Sun house 3: different per body AND
		// different per ring, which a column of 1s cannot be.
		expect(cells[1]).toBe('8');
		expect(cells[3]).toBe('3');

		// The system behind those numbers is named on the card, and the legend
		// separately says the sectors are missing rather than leaving a reader to
		// decide whether the divisions on screen are signs or houses.
		const legend = r.querySelector('[part~="legend"]')?.textContent ?? '';
		expect(legend).toContain('placidus houses');
		expect(legend).toContain('Sign wheel, 0° Aries on the left');
		expect(legend).toContain('No house cusps');
		el.remove();
	});

	/** A response with no house on any body loses the columns and the system chip entirely, rather than printing a column of blanks under a system name. */
	test('drops the house columns when the response carries no house', async () => {
		const stripped = {
			...data,
			natalPlanets: data.natalPlanets.map((p) => ({ ...p, house: undefined })),
			transitPlanets: data.transitPlanets.map((p) => ({
				...p,
				house: undefined,
			})),
		} as unknown as CalculateTransitAspectsResponse;
		const el = await mount(stripped);
		const r = root(el);
		expect(
			[...r.querySelectorAll('thead th')].map((n) =>
				(n.textContent ?? '').trim(),
			),
		).toEqual(['Body', 'Natal', 'Transiting']);
		expect(
			r.querySelector('[part~="legend"]')?.textContent ?? '',
		).not.toContain('placidus houses');
		expect(text(el)).not.toContain('undefined');
		el.remove();
	});

	test('an ascendant supplied by the page rotates the wheel onto the real horizon', async () => {
		const el = await mount(data, { ascendant: '90' });
		const r = root(el);

		// Natal Moon sits at exactly the supplied ascendant, so it must land on the
		// left horizon: the whole point of the rotation.
		expect(num(glyph(el, 'Natal', 'Moon'), 'x')).toBeCloseTo(
			CENTER - NATAL_R,
			6,
		);
		expect(num(glyph(el, 'Natal', 'Moon'), 'y')).toBeCloseTo(CENTER, 6);
		// The natal Sun at 0 Aries rotates a quarter turn with it, to the top.
		const sun = expected(0, NATAL_R, 90);
		expect(num(glyph(el, 'Natal', 'Sun'), 'x')).toBeCloseTo(sun.x, 6);
		expect(num(glyph(el, 'Natal', 'Sun'), 'y')).toBeCloseTo(
			CENTER - NATAL_R,
			6,
		);

		// ASC and DSC are marked, and they are 180 degrees apart by derivation.
		const labels = [...r.querySelectorAll('text.axis-label')].map(
			(n) => n.textContent,
		);
		expect(labels).toEqual(['ASC', 'DSC']);
		const legend = r.querySelector('[part~="legend"]')?.textContent ?? '';
		expect(legend).toContain('Ascendant on the left horizon');
		expect(legend).not.toContain('Sign wheel');
		// Still no sector ring: a rotation is not a cusp. The house NUMBERS are
		// unaffected, because they never depended on the orientation.
		expect(r.querySelector('line.house-cusp')).toBeNull();
		expect(r.querySelector('text.house-num')).toBeNull();
		expect(legend).toContain('No house cusps');
		el.remove();
	});

	/**
	 * The sector ring, and the reason it is a PROP rather than something derived.
	 *
	 * @remarks
	 * Every assertion here is a coordinate, because a house ring that renders is
	 * not a house ring that is correct: twelve equal sectors from the Ascendant
	 * draw a perfectly plausible wheel and are a different chart. The fixture
	 * cusps are deliberately unequal (40, 20, 30 ...) and wrap 360, so a component
	 * that quietly fell back to 30 degree steps, or that mishandled the wrap,
	 * fails on the spacing rather than on the count.
	 */
	test('draws the supplied cusps at exactly the longitudes given, unequal and wrapped', async () => {
		const el = await mount(data, {}, { houses: CUSPS });
		const r = root(el);
		const lines = [...r.querySelectorAll('line.house-cusp')];
		expect(lines.length).toBe(12);

		// Each cusp line runs from the hub out to the inner edge of the sign band,
		// at the angle its own longitude implies. Orientation is the first cusp on
		// the left horizon, so 350 is the reference.
		for (const [i, cusp] of CUSPS.entries()) {
			const line = lines[i] ?? null;
			const outer = expected(cusp.longitude, BAND_R, CUSPS[0]?.longitude);
			const inner = expected(cusp.longitude, HUB_R, CUSPS[0]?.longitude);
			expect(num(line, 'x2'), `cusp ${cusp.number} x`).toBeCloseTo(outer.x, 6);
			expect(num(line, 'y2'), `cusp ${cusp.number} y`).toBeCloseTo(outer.y, 6);
			expect(num(line, 'x1')).toBeCloseTo(inner.x, 6);
			expect(num(line, 'y1')).toBeCloseTo(inner.y, 6);
		}

		// House 1 is on the left horizon, which is what makes this readable as a
		// chart rather than a rotated sign wheel.
		expect(num(lines[0] ?? null, 'x2')).toBeCloseTo(CENTER - BAND_R, 6);
		expect(num(lines[0] ?? null, 'y2')).toBeCloseTo(CENTER, 6);

		// The sectors stay UNEQUAL. Measured as the turn between consecutive cusp
		// lines, which is the one thing an equal-house fallback cannot reproduce.
		const angleOf = (n: Element | null) =>
			(Math.atan2(num(n, 'y2') - CENTER, num(n, 'x2') - CENTER) * 180) /
			Math.PI;
		const spans = lines.map((_, i) => {
			let d = angleOf(lines[i] ?? null) - angleOf(lines[(i + 1) % 12] ?? null);
			while (d < 0) d += 360;
			while (d >= 360) d -= 360;
			return Math.round(d);
		});
		expect(spans).toEqual([40, 20, 30, 30, 30, 30, 40, 20, 30, 30, 30, 30]);

		// Every sector is numbered, once, inside itself: the label sits at the arc
		// midpoint, so house 1 (350 to 30, wrapping) is centred on 10 degrees and
		// NOT on 190, which is where an unwrapped midpoint would put it.
		const nums = [...r.querySelectorAll('text.house-num')];
		expect(nums.map((n) => n.textContent)).toEqual([
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'11',
			'12',
		]);
		const first = expected(10, HOUSE_NUM_R, CUSPS[0]?.longitude);
		expect(num(nums[0] ?? null, 'x')).toBeCloseTo(first.x, 6);
		expect(num(nums[0] ?? null, 'y')).toBeCloseTo(first.y, 6);

		// And the card says where the cusps came from. No ASC label: the first cusp
		// is not the Ascendant under whole-sign, so naming it one would be wrong on
		// exactly the charts a traditional reader casts.
		const legend = r.querySelector('[part~="legend"]')?.textContent ?? '';
		expect(legend).toContain('First house cusp on the left horizon');
		expect(legend).toContain('House cusps supplied by the page');
		expect(legend).not.toContain('No house cusps');
		expect(r.querySelector('text.axis-label')).toBeNull();
		el.remove();
	});

	test('accepts twelve bare longitudes, and the JSON attribute form', async () => {
		const bare = CUSPS.map((c) => c.longitude);
		const viaProp = await mount(data, {}, { houses: bare });
		expect(root(viaProp).querySelectorAll('line.house-cusp').length).toBe(12);
		expect(
			[...root(viaProp).querySelectorAll('text.house-num')].map(
				(n) => n.textContent,
			),
		).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
		viaProp.remove();

		// The attribute path is what a plain HTML embed uses, and Lit parses it as
		// JSON, so it has to reach the same geometry.
		const viaAttr = await mount(data, { houses: JSON.stringify(bare) });
		const line = root(viaAttr).querySelectorAll('line.house-cusp')[0] ?? null;
		expect(num(line, 'x2')).toBeCloseTo(CENTER - BAND_R, 6);
		viaAttr.remove();
	});

	/** A cusp set that is not twelve houses is not half a house ring: it is no house ring. Drawing part of one would put a sector boundary where the host never claimed there was one. */
	test('ignores an incomplete or malformed cusp set whole', async () => {
		for (const bad of [
			CUSPS.slice(0, 11),
			[...CUSPS.slice(0, 11), { number: 12, longitude: Number.NaN }],
			// Twelve entries, but numbered 2 to 13: not the twelve houses.
			CUSPS.map((c) => ({ ...c, number: c.number + 1 })),
			[],
			'nonsense',
		]) {
			const el = await mount(data, {}, { houses: bad });
			const r = root(el);
			expect(
				r.querySelector('line.house-cusp'),
				`cusps ${JSON.stringify(bad).slice(0, 40)} should draw nothing`,
			).toBeNull();
			expect(r.querySelector('text.house-num')).toBeNull();
			expect(r.querySelector('[part~="legend"]')?.textContent ?? '').toContain(
				'No house cusps',
			);
			// And the wheel falls back to the honest orientation, not a broken one.
			expect(num(glyph(el, 'Natal', 'Sun'), 'x')).toBeCloseTo(
				CENTER - NATAL_R,
				6,
			);
			expect(text(el)).not.toContain('NaN');
			el.remove();
		}
	});

	/** Cusp 1 and the Ascendant are the same longitude under Placidus and are NOT under whole sign, so a page that holds both has to get the one it asked for. */
	test('a supplied ascendant outranks the first cusp for orientation', async () => {
		const el = await mount(data, { ascendant: '90' }, { houses: CUSPS });
		const r = root(el);

		// Rotated onto 90, not onto cusp 1 at 350: the natal Moon at 90 lands on the
		// left horizon and cusp 1 lands 100 degrees round from it.
		expect(num(glyph(el, 'Natal', 'Moon'), 'x')).toBeCloseTo(
			CENTER - NATAL_R,
			6,
		);
		const first = expected(350, BAND_R, 90);
		const line = r.querySelectorAll('line.house-cusp')[0] ?? null;
		expect(num(line, 'x2')).toBeCloseTo(first.x, 6);
		expect(num(line, 'y2')).toBeCloseTo(first.y, 6);

		// Both facts are stated: the axis is the supplied Ascendant, the sectors are
		// the supplied cusps.
		expect(
			[...r.querySelectorAll('text.axis-label')].map((n) => n.textContent),
		).toEqual(['ASC', 'DSC']);
		const legend = r.querySelector('[part~="legend"]')?.textContent ?? '';
		expect(legend).toContain('Ascendant on the left horizon');
		expect(legend).toContain('House cusps supplied by the page');
		el.remove();
	});

	test('renders the summary counts, the byType map and the strongest contact', async () => {
		const el = await mount(data);
		const body = text(el);
		expect(body).toContain('Total: 3');
		expect(body).toContain('Harmonious: 1');
		expect(body).toContain('Challenging: 2');
		expect(body).toContain('Neutral: 0');
		// A map is rendered as its pairs, never as the object.
		expect(body).toContain('Opposition: 2');
		expect(body).not.toContain('[object Object]');
		expect(body).toContain('Strongest');
		// strength 100, not the "1" a trailing-zero-stripping formatter would give.
		expect(body).toContain('strength 100');
		expect(body).toContain('Applying');
		el.remove();
	});

	test('renders both rings as exact positions, with retrogrades flagged', async () => {
		const el = await mount(data);
		const body = text(el);
		expect(root(el).querySelector('[part~="table"]')).not.toBeNull();
		expect(body).toContain('Natal');
		expect(body).toContain('Transiting');
		// Natal Saturn is retrograde in the fixture and the transiting one is not.
		expect(root(el).querySelectorAll('[aria-label="retrograde"]').length).toBe(
			1,
		);
		// 15 degrees into Taurus, printed as degrees and minutes.
		expect(body).toContain("15°00'");
		el.remove();
	});

	test('exposes the shared part vocabulary, all kebab-case', async () => {
		const el = await mount(data);
		const parts = [...root(el).querySelectorAll('[part]')].flatMap((n) =>
			(n.getAttribute('part') ?? '').split(/\s+/).filter(Boolean),
		);
		for (const name of [
			'card',
			'header',
			'chart',
			'legend',
			'details',
			'table',
			'readings',
			'reading',
		]) {
			expect(parts, `transit wheel should expose part ${name}`).toContain(name);
		}
		for (const p of parts) expect(p).toMatch(/^[a-z][a-z0-9-]*$/);
		// The readings block carries the same `section readings` pair as every
		// other component, so one ::part(readings) rule reaches it too.
		expect(
			root(el).querySelector('[part~="readings"]')?.getAttribute('part'),
		).toContain('section');
		el.remove();
	});

	test('renders every written transit reading by default', async () => {
		const el = await mount(data);
		const body = text(el);
		for (const s of [
			'ZZREADINGSUMMARY',
			'ZZREADINGTIMING',
			'ZZREADINGIMPACT',
			'ZZREADINGGUIDANCE',
			'ZZREADINGKEYWORD',
			'ZZREADINGMOON',
		]) {
			expect(body).toContain(s);
		}
		expect(body).toContain('Transit readings');
		expect(el.hasAttribute('hide-readings')).toBe(false);
		el.remove();
	});

	/**
	 * The reason this component exists for the customer buying it: the graphic
	 * without the report. Every word of prose leaves the DOM and every number,
	 * glyph and line stays.
	 */
	test('hide-readings drops the prose and keeps the whole wheel', async () => {
		const el = await mount(data, { 'hide-readings': '' });
		const r = root(el);
		const body = text(el);

		for (const s of [
			'ZZREADINGSUMMARY',
			'ZZREADINGTIMING',
			'ZZREADINGIMPACT',
			'ZZREADINGGUIDANCE',
			'ZZREADINGKEYWORD',
			'ZZREADINGMOON',
		]) {
			expect(body).not.toContain(s);
		}
		// The section goes whole rather than leaving a heading over an empty block.
		expect(body).not.toContain('Transit readings');
		expect(r.querySelector('[part~="readings"]')).toBeNull();
		expect(r.querySelectorAll('[part~="reading"]').length).toBe(0);

		// Everything a practitioner reads a placement off survives.
		expect(r.querySelectorAll('text.sign-glyph').length).toBe(12);
		expect(r.querySelectorAll('text.natal-glyph').length).toBe(5);
		expect(r.querySelectorAll('text.transit-glyph').length).toBe(5);
		expect(r.querySelectorAll('line.aspect').length).toBe(3);
		expect(r.querySelector('[part~="legend"]')).not.toBeNull();
		expect(r.querySelector('[part~="table"]')).not.toBeNull();
		expect(body).toContain('Total: 3');
		expect(body).toContain('Strongest');
		el.remove();
	});

	test('the property round-trips with the attribute', async () => {
		const el = await mount(data);
		const typed = el as unknown as { hideReadings: boolean };
		expect(typed.hideReadings).toBe(false);

		typed.hideReadings = true;
		await settled(el);
		expect(el.hasAttribute('hide-readings')).toBe(true);
		expect(text(el)).not.toContain('ZZREADINGSUMMARY');

		typed.hideReadings = false;
		await settled(el);
		expect(el.hasAttribute('hide-readings')).toBe(false);
		expect(text(el)).toContain('ZZREADINGSUMMARY');
		el.remove();
	});

	test('survives a response with no aspects without drawing a broken wheel', async () => {
		const el = await mount({ ...data, aspects: [], summary: undefined });
		const r = root(el);
		expect(r.querySelectorAll('line.aspect').length).toBe(0);
		expect(r.querySelectorAll('text.sign-glyph').length).toBe(12);
		expect(r.querySelectorAll('text.natal-glyph').length).toBe(5);
		expect(text(el)).not.toContain('undefined');
		expect(text(el)).not.toContain('NaN');
		el.remove();
	});

	test('skips an aspect naming a body neither ring carries', async () => {
		const el = await mount({
			...data,
			aspects: [
				{
					planet1: 'Pluto',
					planet2: 'Sun',
					type: 'TRINE',
					angle: 120,
					orb: 1,
					isApplying: true,
					strength: 50,
					interpretation: 'harmonious',
				},
			],
		});
		// No line, and no line drawn to a bogus coordinate either.
		expect(root(el).querySelectorAll('line.aspect').length).toBe(0);
		expect(text(el)).not.toContain('NaN');
		el.remove();
	});
});
