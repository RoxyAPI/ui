import { expect, test } from '@playwright/test';

/**
 * The transit bi-wheel, proved in a real browser against the captured production
 * response.
 *
 * @remarks
 * Two things cannot be proved in the unit suite. happy-dom has no layout and no
 * `::part()` implementation, so it can assert that an SVG coordinate ATTRIBUTE
 * exists but never that the element is laid out where the attribute says, and
 * the showcase is the only place the component runs against a real
 * /astrology/transit-aspects response rather than a fixture.
 *
 * Every assertion is on the DOM or on a measured coordinate, never on a
 * screenshot: a picture cannot tell a correct wheel from one with the zodiac
 * running backwards, and it cannot tell a suppressed reading from one scrolled
 * out of frame.
 */

const WHEEL = 'roxy-transit-wheel#transit-wheel';

/** Geometry restated independently of the component, so a silent radius edit fails here instead of moving the expectation with it. */
const CENTER = 200;
const NATAL_R = 94;
const TRANSIT_R = 124;

/** Wait for the demo card to be populated: the page assigns `data` after its sample bundle loads, so a bare `goto` can land before the first render. */
async function ready(page: import('@playwright/test').Page) {
	await page.goto('/');
	await page.waitForFunction((sel) => {
		const el = document.querySelector(sel) as
			| (HTMLElement & { data?: unknown })
			| null;
		return (
			Boolean(el?.data) && Boolean(el?.shadowRoot?.querySelector('svg[part]'))
		);
	}, WHEEL);
}

/**
 * Re-assign the demo response with `houses` and `ascendant` removed, which is the
 * shape `/astrology/transit-aspects` returned before it began carrying them.
 *
 * @remarks
 * The captured sample now arrives WITH both, so the wheel draws real cusps off the
 * response and the degraded state stopped being reachable from the live fixture. It
 * still has to be covered: a proxy that trims fields, and any response a consumer
 * stored before the fields shipped, land in exactly this branch, and the component
 * promises to say `No house cusps` rather than invent a ring. Stripping the two
 * fields is the only way to reach it now, and it is deliberately done from the REAL
 * payload rather than a hand-written one so the rest of the response stays honest.
 */
async function stripHouses(page: import('@playwright/test').Page) {
	await page.evaluate(async (sel) => {
		const el = document.querySelector(sel) as HTMLElement & {
			data: Record<string, unknown>;
			updateComplete: Promise<unknown>;
		};
		const { houses, ascendant, ...rest } = el.data;
		void houses;
		void ascendant;
		el.data = rest;
		await el.updateComplete;
	}, WHEEL);
}

/** Set a property on the element and wait for Lit to finish the re-render. */
async function setProp(
	page: import('@playwright/test').Page,
	prop: string,
	value: unknown,
) {
	await page.evaluate(
		async ([sel, key, v]) => {
			const el = document.querySelector(sel as string) as HTMLElement & {
				updateComplete: Promise<unknown>;
			};
			(el as unknown as Record<string, unknown>)[key as string] = v;
			await el.updateComplete;
		},
		[WHEEL, prop, value] as const,
	);
}

/**
 * Read every glyph back in the wheel's own viewBox units, using the browser's
 * real geometry (`getBBox`) rather than the authored attribute, so this measures
 * where the body was actually laid out.
 */
const measure = (sel: string) => {
	const el = document.querySelector(sel) as HTMLElement;
	const root = el.shadowRoot as ShadowRoot;
	const read = (q: string) =>
		[...root.querySelectorAll<SVGGraphicsElement>(q)].map((n) => {
			const b = n.getBBox();
			return {
				text: (n.textContent ?? '').trim(),
				x: b.x + b.width / 2,
				y: b.y + b.height / 2,
				title: n.querySelector('title')?.textContent ?? '',
			};
		});
	const lines = [...root.querySelectorAll<SVGLineElement>('line.aspect')].map(
		(n) => ({
			x1: n.x1.baseVal.value,
			y1: n.y1.baseVal.value,
			x2: n.x2.baseVal.value,
			y2: n.y2.baseVal.value,
			cls: n.getAttribute('class') ?? '',
			title: n.querySelector('title')?.textContent ?? '',
		}),
	);
	const cusps = [
		...root.querySelectorAll<SVGLineElement>('line.house-cusp'),
	].map((n) => ({
		x2: n.x2.baseVal.value,
		y2: n.y2.baseVal.value,
	}));
	return {
		natal: read('text.natal-glyph'),
		transit: read('text.transit-glyph'),
		signs: read('text.sign-glyph'),
		lines,
		cusps,
		houseNums: [...root.querySelectorAll('text.house-num')].map(
			(n) => n.textContent ?? '',
		),
		headers: [...root.querySelectorAll('thead th')].map((n) =>
			(n.textContent ?? '').trim(),
		),
		hasReadings: Boolean(root.querySelector('[part~="readings"]')),
		readingRows: root.querySelectorAll('[part~="reading"]').length,
		readingText: (
			root.querySelector('[part~="readings"]')?.textContent ?? ''
		).trim().length,
		hasWheel: Boolean(root.querySelector('svg[part="chart"]')),
		hasLegend: Boolean(root.querySelector('[part~="legend"]')),
		hasTable: Boolean(root.querySelector('[part~="table"]')),
		legend: root.querySelector('[part~="legend"]')?.textContent ?? '',
		details: root.querySelector('[part~="details"]')?.textContent ?? '',
		axis: [...root.querySelectorAll('text.axis-label')].map(
			(n) => n.textContent,
		),
		// The wheel is drawn in viewBox units but painted at the card's width, so
		// the on-screen box is what proves nothing is clipped.
		svgBox: (
			root.querySelector('svg[part="chart"]') as SVGElement
		).getBoundingClientRect(),
		hostBox: el.getBoundingClientRect(),
	};
};

/** Radius of a measured point from the wheel centre, in viewBox units. */
const radius = (p: { x: number; y: number }) =>
	Math.hypot(p.x - CENTER, p.y - CENTER);

test('draws both rings and an aspect line for every returned transit', async ({
	page,
}) => {
	await ready(page);
	const m = await page.evaluate(measure, WHEEL);

	expect(m.hasWheel).toBe(true);
	expect(m.signs.length).toBe(12);
	// The live response returns all 14 bodies on each side.
	expect(m.natal.length).toBe(14);
	expect(m.transit.length).toBe(14);
	expect(m.lines.length).toBeGreaterThan(0);
	// Every line resolved to real endpoints rather than falling out as NaN.
	for (const l of m.lines) {
		for (const v of [l.x1, l.y1, l.x2, l.y2])
			expect(Number.isFinite(v)).toBe(true);
	}
	expect(m.hasLegend).toBe(true);
	expect(m.hasTable).toBe(true);
});

/**
 * The invariant a screenshot review cannot check. Both rings must sit at their
 * own radius, and the outer one must be the TRANSITING bodies, because a
 * bi-wheel read with the rings swapped is a different chart.
 */
test('the two rings sit at different radii, transiting outside natal', async ({
	page,
}) => {
	await ready(page);
	const m = await page.evaluate(measure, WHEEL);

	for (const n of m.natal) expect(radius(n)).toBeCloseTo(NATAL_R, 0);
	for (const t of m.transit) expect(radius(t)).toBeCloseTo(TRANSIT_R, 0);

	const natalMax = Math.max(...m.natal.map(radius));
	const transitMin = Math.min(...m.transit.map(radius));
	expect(transitMin).toBeGreaterThan(natalMax);

	// The rings are the ones the tooltips claim they are, so the colour and the
	// meaning agree.
	for (const n of m.natal) expect(n.title.startsWith('Natal ')).toBe(true);
	for (const t of m.transit)
		expect(t.title.startsWith('Transiting ')).toBe(true);
});

/**
 * Placement and direction, measured rather than eyeballed. The zodiac has to
 * rise counterclockwise from the left horizon, and a sign flip or a 30-degree
 * offset lands a sign in a visibly different quadrant while still drawing a
 * perfectly plausible wheel. Checked on the sign glyphs because their longitudes
 * are fixed by definition, not by whatever the sky was doing on the sample date.
 */
test('places the zodiac counterclockwise from 0 degrees Aries on the left', async ({
	page,
}) => {
	await ready(page);
	// The response now carries cusps, and a wheel with cusps rotates the first one
	// onto the left horizon. The fixed zodiacal orientation is the UNROTATED state,
	// so it is measured on the response that has neither cusps nor an ascendant.
	await stripHouses(page);
	const m = await page.evaluate(measure, WHEEL);
	expect(m.signs.length).toBe(12);

	// Sign glyphs are emitted in zodiac order, each at the midpoint of its sign,
	// so Aries is centred on 15 degrees: just below the left horizon, because the
	// wheel rises counterclockwise and SVG y grows downward.
	const aries = m.signs[0];
	const cancer = m.signs[3];
	const libra = m.signs[6];
	const capricorn = m.signs[9];
	if (!aries || !cancer || !libra || !capricorn) {
		throw new Error('twelve sign glyphs expected');
	}

	// One quadrant per cardinal sign, in order: lower left, lower right, upper
	// right, upper left. That sequence IS counterclockwise on screen, and it is
	// what pins both the phase (0 Aries on the left horizon) and the direction.
	expect([aries.x < CENTER, aries.y > CENTER]).toEqual([true, true]);
	expect([cancer.x > CENTER, cancer.y > CENTER]).toEqual([true, true]);
	expect([libra.x > CENTER, libra.y < CENTER]).toEqual([true, true]);
	expect([capricorn.x < CENTER, capricorn.y < CENTER]).toEqual([true, true]);

	// Opposite signs are diametrically opposite, within a pixel of rounding.
	expect(aries.x + libra.x).toBeCloseTo(2 * CENTER, 0);
	expect(aries.y + libra.y).toBeCloseTo(2 * CENTER, 0);

	// And the turn is the same way round for all twelve, not just the four
	// cardinal points: the z cross product of consecutive spokes stays negative,
	// which in a y-down coordinate system is counterclockwise on screen.
	for (let i = 0; i < 12; i++) {
		const a = m.signs[i];
		const b = m.signs[(i + 1) % 12];
		if (!a || !b) throw new Error('twelve sign glyphs expected');
		const cross =
			(a.x - CENTER) * (b.y - CENTER) - (a.y - CENTER) * (b.x - CENTER);
		expect(cross, `signs ${i} to ${i + 1} turn the wrong way`).toBeLessThan(0);
	}
});

/**
 * The captured sample predates the natal frame the endpoint now returns, so it
 * carries no ascendant and no house cusps and the wheel must say it is
 * sign-based rather than mark an axis it does not have. That is the honest
 * degrade, and it is worth keeping a case on even after the sample is
 * recaptured: a proxy that trims fields, and any response stored before the
 * fields shipped, land here too. Supplying an ascendant rotates the same wheel
 * and adds the axis, and still draws no houses, because a rotation is not a
 * cusp.
 */
test('a supplied ascendant rotates the wheel and marks the axis', async ({
	page,
}) => {
	await ready(page);
	await stripHouses(page);
	const before = await page.evaluate(measure, WHEEL);
	expect(before.axis).toEqual([]);
	expect(before.legend).toContain('Sign wheel');
	expect(before.legend).toContain('No house cusps');

	// 90 degrees: 0 Cancer on the left horizon.
	await setProp(page, 'ascendant', 90);
	const after = await page.evaluate(measure, WHEEL);

	expect(after.axis).toEqual(['ASC', 'DSC']);
	expect(after.legend).toContain('Ascendant on the left horizon');
	expect(after.legend).not.toContain('Sign wheel');
	// A rotation is still not a cusp: no sector ring appears.
	expect(after.cusps.length).toBe(0);

	// Cancer's midpoint (105 degrees) is now 15 degrees past the left horizon,
	// and Capricorn's is 15 degrees past the right one.
	const cancer = after.signs[3];
	const capricorn = after.signs[9];
	if (!cancer || !capricorn) throw new Error('twelve sign glyphs expected');
	expect(cancer.x).toBeLessThan(CENTER);
	expect(capricorn.x).toBeGreaterThan(CENTER);
	// Everything rotated together: the rings kept their radii, so the bodies
	// moved with the wheel rather than drifting off it.
	for (const n of after.natal) expect(radius(n)).toBeCloseTo(NATAL_R, 0);
	for (const t of after.transit) expect(radius(t)).toBeCloseTo(TRANSIT_R, 0);

	await setProp(page, 'ascendant', undefined);
	const restored = await page.evaluate(measure, WHEEL);
	expect(restored.axis).toEqual([]);
	expect(restored.legend).toContain('Sign wheel');
});

/**
 * The house work, against the real production response rather than a fixture.
 *
 * @remarks
 * This is the assertion the old docblock would have failed. `/astrology/transit-aspects`
 * returns a real house per body and a `houseSystem`, so the captured sample has
 * to show more than one distinct house number: a column of 1s is what the API
 * used to return and what the component used to refuse to render for that reason.
 */
test('the live response fills the House columns with real, varied houses', async ({
	page,
}) => {
	await ready(page);
	const m = await page.evaluate(measure, WHEEL);

	expect(m.headers).toEqual([
		'Body',
		'Natal',
		'Natal house',
		'Transiting',
		'Transiting house',
	]);
	const houses = await page.evaluate((sel) => {
		const root = (document.querySelector(sel) as HTMLElement)
			.shadowRoot as ShadowRoot;
		return [...root.querySelectorAll('tbody tr')].map((row) =>
			[...row.querySelectorAll('td')].map((n) => (n.textContent ?? '').trim()),
		);
	}, WHEEL);
	const natalHouses = new Set(houses.map((cells) => cells[1]));
	const transitHouses = new Set(houses.map((cells) => cells[3]));
	expect(natalHouses.size).toBeGreaterThan(3);
	expect(transitHouses.size).toBeGreaterThan(3);
	for (const set of [natalHouses, transitHouses]) {
		for (const h of set) expect(Number(h)).toBeGreaterThanOrEqual(1);
		for (const h of set) expect(Number(h)).toBeLessThanOrEqual(12);
	}

	// The system behind those numbers is named, and the response now carries the
	// cusps those numbers refer to, so the wheel draws the ring instead of saying
	// it has none. Both halves are asserted: a legend that named a system while
	// drawing no sectors was the honest state when the cusps were missing, and it
	// would be a lie now that they are not.
	expect(m.legend).toMatch(/(placidus|whole-sign|equal|koch) houses/);
	expect(m.legend).toContain('House cusps from the response');
	expect(m.legend).not.toContain('No house cusps');
	expect(m.cusps.length).toBe(12);
	expect(m.houseNums.length).toBe(12);

	// And the degraded shape still says so, which is what a trimmed response gets.
	await stripHouses(page);
	const stripped = await page.evaluate(measure, WHEEL);
	expect(stripped.legend).toContain('No house cusps');
	expect(stripped.cusps.length).toBe(0);
	expect(stripped.houseNums.length).toBe(0);
});

/**
 * The sector ring, measured in a real browser. The cusps are deliberately
 * unequal, so a component that fell back to 30 degree steps draws a plausible
 * wheel and fails here on the spacing.
 */
test('cusps supplied by the page draw a real, unequal house ring', async ({
	page,
}) => {
	await ready(page);
	// The prop path in isolation: the response now carries its own cusps and its
	// own ascendant, and an ascendant is what decides the rotation, so the supplied
	// ring could not be measured against the horizon while both were present.
	await stripHouses(page);
	const CUSPS = [350, 30, 50, 80, 110, 140, 170, 210, 230, 260, 290, 320];
	await setProp(
		page,
		'houses',
		CUSPS.map((longitude, i) => ({ number: i + 1, longitude })),
	);
	const m = await page.evaluate(measure, WHEEL);

	expect(m.houseNums).toEqual([
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
	expect(m.cusps.length).toBe(12);
	// House 1 lands on the left horizon, and the twelve turns between consecutive
	// cusps reproduce the supplied spans rather than twelve equal thirties.
	const first = m.cusps[0];
	if (!first) throw new Error('twelve cusps expected');
	expect(first.y2).toBeCloseTo(CENTER, 0);
	expect(first.x2).toBeLessThan(CENTER);
	const angle = (p: { x2: number; y2: number }) =>
		(Math.atan2(p.y2 - CENTER, p.x2 - CENTER) * 180) / Math.PI;
	const spans = m.cusps.map((_, i) => {
		const a = m.cusps[i];
		const b = m.cusps[(i + 1) % 12];
		if (!a || !b) throw new Error('twelve cusps expected');
		let d = angle(a) - angle(b);
		while (d < 0) d += 360;
		return Math.round(d);
	});
	expect(spans).toEqual([40, 20, 30, 30, 30, 30, 40, 20, 30, 30, 30, 30]);
	expect(m.legend).toContain('House cusps supplied by the page');
	expect(m.legend).not.toContain('No house cusps');

	// Taking them away puts it back, so nothing was baked in.
	await setProp(page, 'houses', undefined);
	const restored = await page.evaluate(measure, WHEEL);
	expect(restored.cusps.length).toBe(0);
	expect(restored.legend).toContain('No house cusps');

	// And the precedence, which only became reachable once the response grew cusps
	// of its own: the page-supplied ring wins, and the legend says which one is on
	// screen rather than leaving a reader to guess.
	await ready(page);
	await setProp(
		page,
		'houses',
		CUSPS.map((longitude, i) => ({ number: i + 1, longitude })),
	);
	const both = await page.evaluate(measure, WHEEL);
	expect(both.legend).toContain('House cusps supplied by the page');
	expect(both.legend).not.toContain('House cusps from the response');
});

/**
 * The same ring, from the RESPONSE rather than from a prop, measured in a real
 * browser.
 *
 * @remarks
 * This is the path that closes the house-less bi-wheel on WordPress, /embed and
 * the CDN widgets: each hands the component one operation's response and cannot
 * compose a second call, so cusps that only ever arrived as a prop never reached
 * any of them. `/astrology/transit-aspects` now returns `houses` and `ascendant`,
 * and the frame is merged into `data` here rather than read off the captured
 * sample because that sample predates the fields; it is recaptured after the API
 * deploys, and this case then covers the shipped response unchanged.
 */
test('cusps carried by the response draw the same ring with no props set', async ({
	page,
}) => {
	await ready(page);
	const CUSPS = [350, 30, 50, 80, 110, 140, 170, 210, 230, 260, 290, 320];
	const ASC = 340;
	await page.evaluate(
		async ([sel, cusps, asc]) => {
			const el = document.querySelector(sel as string) as HTMLElement & {
				data: Record<string, unknown>;
				updateComplete: Promise<unknown>;
			};
			el.data = {
				...el.data,
				houses: (cusps as number[]).map((longitude, i) => ({
					number: i + 1,
					longitude,
				})),
				ascendant: { sign: 'Pisces', degree: 10, longitude: asc },
			};
			await el.updateComplete;
		},
		[WHEEL, CUSPS, ASC] as const,
	);
	const m = await page.evaluate(measure, WHEEL);

	// The full ring, from the payload alone.
	expect(m.cusps.length).toBe(12);
	expect(m.houseNums.length).toBe(12);
	expect(m.axis).toEqual(['ASC', 'DSC']);

	// Unequal spans, so an equal-house fallback wearing the same cusp count
	// cannot pass, and the wheel turned onto the payload ASCENDANT rather than
	// onto cusp 1: the two are 10 degrees apart, so the first cusp must sit just
	// off the left horizon rather than on it.
	const angle = (p: { x2: number; y2: number }) =>
		(Math.atan2(p.y2 - CENTER, p.x2 - CENTER) * 180) / Math.PI;
	const spans = m.cusps.map((_, i) => {
		const a = m.cusps[i];
		const b = m.cusps[(i + 1) % 12];
		if (!a || !b) throw new Error('twelve cusps expected');
		let d = angle(a) - angle(b);
		while (d < 0) d += 360;
		return Math.round(d);
	});
	expect(spans).toEqual([40, 20, 30, 30, 30, 30, 40, 20, 30, 30, 30, 30]);
	const first = m.cusps[0];
	if (!first) throw new Error('twelve cusps expected');
	expect(Math.round(angle(first))).toBe(170);

	expect(m.legend).toContain('House cusps from the response');
	expect(m.legend).toContain('Ascendant on the left horizon');
	expect(m.legend).not.toContain('No house cusps');
	expect(m.legend).not.toContain('House cusps supplied by the page');

	// The rings rode the rotation rather than drifting off it.
	for (const n of m.natal) expect(radius(n)).toBeCloseTo(NATAL_R, 0);
	for (const t of m.transit) expect(radius(t)).toBeCloseTo(TRANSIT_R, 0);

	// A prop still outranks it, which is what keeps every existing embed working:
	// the payload cusps stay, turned onto 90 instead of onto 340.
	await setProp(page, 'ascendant', 90);
	const overridden = await page.evaluate(measure, WHEEL);
	expect(overridden.cusps.length).toBe(12);
	const overriddenFirst = overridden.cusps[0];
	if (!overriddenFirst) throw new Error('twelve cusps expected');
	expect(Math.round(angle(overriddenFirst))).toBe(-80);
});

/**
 * What the customer is buying: the graphic without the report. The prose leaves
 * the DOM and the wheel is still fully drawn.
 */
test('hide-readings removes the interpretations and leaves the wheel drawn', async ({
	page,
}) => {
	await ready(page);
	const before = await page.evaluate(measure, WHEEL);
	expect(before.hasReadings).toBe(true);
	expect(before.readingRows).toBeGreaterThan(0);
	// Real prose from the captured response, not an empty shell of a section.
	expect(before.readingText).toBeGreaterThan(200);

	await setProp(page, 'hideReadings', true);
	const after = await page.evaluate(measure, WHEEL);

	expect(after.hasReadings).toBe(false);
	expect(after.readingRows).toBe(0);
	expect(
		await page.evaluate(
			(sel) => document.querySelector(sel)?.hasAttribute('hide-readings'),
			WHEEL,
		),
	).toBe(true);

	// The graphic is the thing being kept, so assert it is actually drawn: the
	// same twelve signs, the same bodies at the same coordinates, and the same
	// aspect lines.
	expect(after.hasWheel).toBe(true);
	expect(after.signs.length).toBe(12);
	expect(after.natal.length).toBe(before.natal.length);
	expect(after.transit.length).toBe(before.transit.length);
	expect(after.lines.length).toBe(before.lines.length);
	for (const [i, n] of after.natal.entries()) {
		expect(n.x).toBeCloseTo(before.natal[i]?.x ?? Number.NaN, 1);
		expect(n.y).toBeCloseTo(before.natal[i]?.y ?? Number.NaN, 1);
	}
	// And the numbers around it: the legend, the counts and the positions table.
	expect(after.hasLegend).toBe(true);
	expect(after.hasTable).toBe(true);
	expect(after.details).toContain('Harmonious');
	expect(after.details).toContain('Strongest');

	// It comes back, so nothing was destroyed on the way in.
	await setProp(page, 'hideReadings', false);
	const restored = await page.evaluate(measure, WHEEL);
	expect(restored.hasReadings).toBe(true);
	expect(restored.readingRows).toBe(before.readingRows);
});

test('a ::part rule written outside the component reaches inside the shadow root', async ({
	page,
}) => {
	await ready(page);
	// Exactly what an integrator would paste into Appearance > Additional CSS.
	await page.addStyleTag({
		content: `${WHEEL}::part(readings) { display: none; }`,
	});

	const styled = await page.evaluate((sel) => {
		const root = (document.querySelector(sel) as HTMLElement)
			.shadowRoot as ShadowRoot;
		const el = (q: string) => root.querySelector(q) as HTMLElement;
		return {
			readings: getComputedStyle(el('[part~="readings"]')).display,
			// Control: the rule must hit the readings and nothing else.
			chart: getComputedStyle(el('svg[part="chart"]')).display,
			legend: getComputedStyle(el('[part~="legend"]')).display,
		};
	}, WHEEL);

	expect(styled.readings).toBe('none');
	expect(styled.chart).not.toBe('none');
	expect(styled.legend).not.toBe('none');
});

test('the card and its wheel stay inside the host at phone width', async ({
	page,
}) => {
	await page.setViewportSize({ width: 375, height: 900 });
	await ready(page);
	const m = await page.evaluate(measure, WHEEL);
	// A one-pixel tolerance for sub-pixel rounding; anything more is a card
	// blowing out of its own column.
	expect(m.svgBox.right).toBeLessThanOrEqual(m.hostBox.right + 1);
	expect(m.svgBox.left).toBeGreaterThanOrEqual(m.hostBox.left - 1);
	expect(m.svgBox.width).toBeGreaterThan(0);
});
