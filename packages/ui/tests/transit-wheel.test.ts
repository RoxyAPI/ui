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
): Promise<HTMLElement> {
	const el = document.createElement('roxy-transit-wheel');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
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
	over: Partial<CalculateTransitAspectsResponse['natalPlanets'][number]> = {},
): CalculateTransitAspectsResponse['natalPlanets'][number] => ({
	name: name as CalculateTransitAspectsResponse['natalPlanets'][number]['name'],
	longitude,
	latitude: 0,
	sign,
	degree: longitude % 30,
	house: 1,
	speed: 1,
	isRetrograde: false,
	...over,
});

/**
 * Venus and Mars are here to make a planet1/planet2 swap DETECTABLE. The
 * same-name pairs below (transiting Sun to natal Sun) draw the identical line
 * whichever way the fields are read, so an aspect between two DIFFERENT bodies,
 * with all four longitudes distinct, is the only fixture that can fail when the
 * transiting and natal roles are exchanged.
 */
const data: CalculateTransitAspectsResponse = {
	transitDate: '2026-05-11 12:00:00',
	natalPlanets: [
		body('Sun', 0, 'Aries'),
		body('Moon', 90, 'Cancer'),
		body('Saturn', 45, 'Taurus', { isRetrograde: true, speed: -0.05 }),
		body('Venus', 30, 'Taurus'),
		body('Mars', 210, 'Scorpio'),
	],
	transitPlanets: [
		body('Sun', 180, 'Libra'),
		body('Moon', 270, 'Capricorn'),
		body('Saturn', 315, 'Aquarius'),
		body('Venus', 60, 'Gemini'),
		body('Mars', 120, 'Leo'),
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
		expect(num(glyph(el, 'natal', 'Sun'), 'x')).toBeCloseTo(sun.x, 6);
		expect(num(glyph(el, 'natal', 'Sun'), 'y')).toBeCloseTo(sun.y, 6);
		expect(num(glyph(el, 'natal', 'Sun'), 'x')).toBeCloseTo(
			CENTER - NATAL_R,
			6,
		);

		// Natal Moon at 0 Cancer, a quarter of the zodiac on: straight down the
		// screen, because the zodiac runs counterclockwise.
		const moon = expected(90, NATAL_R);
		expect(num(glyph(el, 'natal', 'Moon'), 'x')).toBeCloseTo(CENTER, 6);
		expect(num(glyph(el, 'natal', 'Moon'), 'y')).toBeCloseTo(
			CENTER + NATAL_R,
			6,
		);
		expect(num(glyph(el, 'natal', 'Moon'), 'y')).toBeCloseTo(moon.y, 6);

		// Transiting Sun at 0 Libra, opposite the natal Sun: the right horizon.
		const tSun = expected(180, TRANSIT_R);
		expect(num(glyph(el, 'transiting', 'Sun'), 'x')).toBeCloseTo(
			CENTER + TRANSIT_R,
			6,
		);
		expect(num(glyph(el, 'transiting', 'Sun'), 'y')).toBeCloseTo(tSun.y, 6);

		// Transiting Moon at 0 Capricorn: straight up.
		expect(num(glyph(el, 'transiting', 'Moon'), 'x')).toBeCloseTo(CENTER, 6);
		expect(num(glyph(el, 'transiting', 'Moon'), 'y')).toBeCloseTo(
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
				body('Sun', 100, 'Cancer'),
				body('Mercury', 101, 'Cancer'),
				body('Venus', 102, 'Cancer'),
				body('Mars', 103, 'Cancer'),
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
			glyph(el, 'natal', 'Mars')?.querySelector('title')?.textContent,
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
			'transiting Mars square natal Venus',
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
			'transiting Sun opposition natal Sun',
		);
		el.remove();
	});

	/**
	 * The response carries no ascendant and no cusp longitudes, and its per-body
	 * `house` is 1 for every body on every chart, so the wheel must neither draw
	 * houses nor print the number. A wheel that implies placements it does not
	 * have is an accuracy bug, not a cosmetic one.
	 */
	test('draws no houses and never prints the degenerate house number', async () => {
		const el = await mount(data);
		const r = root(el);
		// No house sector numbers on the wheel, and no House column in the table:
		// the response has no cusps to draw and its per-body `house` is 1 for
		// everything, so either would state a placement that is not there.
		expect(r.querySelector('text.house-num')).toBeNull();
		const headers = [...r.querySelectorAll('thead th')].map((n) =>
			(n.textContent ?? '').trim(),
		);
		expect(headers).toEqual(['Body', 'Natal', 'Transiting']);
		for (const cell of r.querySelectorAll('tbody td')) {
			expect(cell.textContent ?? '').not.toMatch(/\bhouse\b/i);
		}
		// And the card says which orientation it is in, rather than leaving a
		// reader to guess whether the divisions are signs or houses.
		const legend = r.querySelector('[part~="legend"]')?.textContent ?? '';
		expect(legend).toContain('Sign wheel');
		expect(legend).toContain('0° Aries on the left');
		expect(legend).toContain('no houses');
		expect(r.querySelector('text.axis-label')).toBeNull();
		el.remove();
	});

	test('an ascendant supplied by the page rotates the wheel onto the real horizon', async () => {
		const el = await mount(data, { ascendant: '90' });
		const r = root(el);

		// Natal Moon sits at exactly the supplied ascendant, so it must land on the
		// left horizon: the whole point of the rotation.
		expect(num(glyph(el, 'natal', 'Moon'), 'x')).toBeCloseTo(
			CENTER - NATAL_R,
			6,
		);
		expect(num(glyph(el, 'natal', 'Moon'), 'y')).toBeCloseTo(CENTER, 6);
		// The natal Sun at 0 Aries rotates a quarter turn with it, to the top.
		const sun = expected(0, NATAL_R, 90);
		expect(num(glyph(el, 'natal', 'Sun'), 'x')).toBeCloseTo(sun.x, 6);
		expect(num(glyph(el, 'natal', 'Sun'), 'y')).toBeCloseTo(
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
		// Still no houses: a rotation is not a cusp.
		expect(r.querySelector('text.house-num')).toBeNull();
		expect(
			[...r.querySelectorAll('thead th')].map((n) =>
				(n.textContent ?? '').trim(),
			),
		).toEqual(['Body', 'Natal', 'Transiting']);
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
		// str 100, not the "1" a trailing-zero-stripping formatter would give.
		expect(body).toContain('str 100');
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
