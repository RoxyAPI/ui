import { expect, test } from '@playwright/test';

/**
 * `hide-readings` and the `part` escape hatch, proved in a real browser.
 *
 * @remarks
 * Two things cannot be proved anywhere else. happy-dom has no `::part()` implementation and no real cascade, so the unit suite can assert that a `part` attribute EXISTS but never that a rule written outside the shadow root reaches the element inside it, which is the entire point of the attribute. And the showcase is the only place the components run against the captured production responses, so it is the only place a reading is real prose rather than a fixture string.
 *
 * The assertions are on the DOM and on computed style, never on a screenshot: a picture cannot tell a suppressed reading from one scrolled out of frame.
 */

const NATAL = 'roxy-natal-chart#natal';

/** Wait for the demo card to be populated. The page assigns `data` after fetching its sample bundle, so a bare `goto` can land before the first render. */
async function ready(page: import('@playwright/test').Page, selector: string) {
	await page.goto('/');
	await page.waitForFunction((sel) => {
		const el = document.querySelector(sel) as
			| (HTMLElement & { data?: unknown })
			| null;
		return (
			Boolean(el?.data) && Boolean(el?.shadowRoot?.querySelector('[part]'))
		);
	}, selector);
}

/** Set `hideReadings` on the element and wait for Lit to finish the re-render. */
async function setHideReadings(
	page: import('@playwright/test').Page,
	selector: string,
	value: boolean,
) {
	await page.evaluate(
		async ([sel, on]) => {
			const el = document.querySelector(sel as string) as HTMLElement & {
				hideReadings: boolean;
				updateComplete: Promise<unknown>;
			};
			el.hideReadings = on as boolean;
			await el.updateComplete;
		},
		[selector, value] as const,
	);
}

/** Shape of the natal card: whether the readings are in the DOM, and whether the wheel still is. */
const probe = (sel: string) => {
	const el = document.querySelector(sel) as HTMLElement;
	const root = el.shadowRoot as ShadowRoot;
	const readings = root.querySelector('[part~="readings"]');
	return {
		hasReadings: Boolean(readings),
		readingRows: root.querySelectorAll('[part~="reading"]').length,
		readingText: (readings?.textContent ?? '').trim().length,
		hasWheel: Boolean(root.querySelector('svg[part="chart"]')),
		signGlyphs: root.querySelectorAll('text.sign-glyph').length,
		planetGlyphs: root.querySelectorAll('text.planet-glyph').length,
		hasLegend: Boolean(root.querySelector('[part~="legend"]')),
		hasHeader: Boolean(root.querySelector('[part~="header"]')),
		reflected: el.hasAttribute('hide-readings'),
	};
};

test('by default the natal chart renders its written readings', async ({
	page,
}) => {
	await ready(page, NATAL);
	const r = await page.evaluate(probe, NATAL);
	expect(r.hasReadings).toBe(true);
	expect(r.readingRows).toBeGreaterThan(0);
	// Real prose from the captured response, not an empty shell of a section.
	expect(r.readingText).toBeGreaterThan(80);
	expect(r.reflected).toBe(false);
	expect(r.hasWheel).toBe(true);
});

test('hide-readings removes the readings and leaves the wheel drawn', async ({
	page,
}) => {
	await ready(page, NATAL);
	const before = await page.evaluate(probe, NATAL);
	expect(before.hasReadings).toBe(true);

	await setHideReadings(page, NATAL, true);
	const after = await page.evaluate(probe, NATAL);

	expect(after.hasReadings).toBe(false);
	expect(after.readingRows).toBe(0);
	expect(after.reflected).toBe(true);

	// The graphic is the thing being kept, so assert it is actually drawn and
	// not merely present: twelve sign segments and the same planet glyphs as
	// before.
	expect(after.hasWheel).toBe(true);
	expect(after.signGlyphs).toBe(12);
	expect(after.planetGlyphs).toBe(before.planetGlyphs);
	expect(after.planetGlyphs).toBeGreaterThan(0);
	expect(after.hasLegend).toBe(true);
	expect(after.hasHeader).toBe(true);

	// And it comes back, so nothing was destroyed on the way in.
	await setHideReadings(page, NATAL, false);
	const restored = await page.evaluate(probe, NATAL);
	expect(restored.hasReadings).toBe(true);
	expect(restored.readingRows).toBe(before.readingRows);
});

test('a ::part rule written outside the component reaches the readings inside the shadow root', async ({
	page,
}) => {
	await ready(page, NATAL);

	// Exactly what an integrator would paste into Appearance > Additional CSS.
	await page.addStyleTag({
		content: `${NATAL}::part(readings) { display: none; }`,
	});

	const styled = await page.evaluate((sel) => {
		const root = (document.querySelector(sel) as HTMLElement)
			.shadowRoot as ShadowRoot;
		const readings = root.querySelector('[part~="readings"]') as HTMLElement;
		const legend = root.querySelector('[part~="legend"]') as HTMLElement;
		return {
			readings: getComputedStyle(readings).display,
			// Control: the rule must hit the readings and nothing else.
			legend: getComputedStyle(legend).display,
		};
	}, NATAL);

	expect(styled.readings).toBe('none');
	expect(styled.legend).not.toBe('none');
});

/**
 * The vocabulary is what makes one rule enough. A page that writes `::part(readings)` once must reach every component that has readings, not just the one it was written against.
 */
test('the readings part answers to the same name in every component that has one', async ({
	page,
}) => {
	await page.goto('/');
	await page.waitForTimeout(2500);

	const tags = await page.evaluate(() => {
		const found: string[] = [];
		for (const host of document.querySelectorAll('*')) {
			if (!host.tagName.startsWith('ROXY-')) continue;
			const root = (host as HTMLElement).shadowRoot;
			if (!root) continue;
			// Any component drawing the shared accordion must name it `readings`.
			if (
				root.querySelector('.interp-card') &&
				!root.querySelector('[part~="reading"]')
			) {
				found.push(`${host.tagName.toLowerCase()}: accordion with no part`);
			}
			if (root.querySelector('[part~="readings"]'))
				found.push(host.tagName.toLowerCase());
		}
		return found;
	});

	expect(tags.filter((t) => t.includes('no part'))).toEqual([]);
	// The showcase renders every component, so several must have shown readings.
	expect(new Set(tags).size).toBeGreaterThan(3);
});

/**
 * Every component that shows a written reading, checked against the demo's captured production responses.
 *
 * @remarks
 * **This list IS the feature.** `hideReadings` lives on `RoxyDataElement`, so the attribute is advertised on every component the moment it lands there, whether or not that component acts on it. A component that accepts it and quietly ignores it is the worst failure this feature has: a site owner sets it, sees the reading still on the page, and concludes it is broken. So membership is asserted in both directions. A tag here that stops changing fails, and a tag NOT here that starts changing fails too, which forces the decision to be written down rather than discovered.
 *
 * The list is kept in sync with the table in README.md and AGENTS.md, which is where an integrator reads it. Add a component to both or to neither.
 *
 * A tag absent from the page is skipped rather than failed, so removing a component does not strand this list.
 */
const HONOURS = [
	'roxy-angel-number-card',
	'roxy-angel-number-lookup',
	'roxy-aspects-table',
	'roxy-astrocartography-map',
	'roxy-biorhythm-chart',
	'roxy-bodygraph',
	'roxy-compatibility-card',
	'roxy-crystal-card',
	'roxy-dasha-timeline',
	'roxy-dosha-card',
	'roxy-fixed-stars',
	'roxy-forecast-digest',
	'roxy-forecast-timeline',
	'roxy-gochara-table',
	'roxy-guna-milan',
	'roxy-hd-connection',
	'roxy-hd-penta',
	'roxy-hd-type-card',
	'roxy-hd-variables',
	'roxy-hexagram',
	'roxy-horoscope-card',
	'roxy-moon-phase',
	'roxy-nakshatra-card',
	'roxy-natal-chart',
	'roxy-numerology-card',
	'roxy-positions-table',
	'roxy-profection-card',
	'roxy-reference-card',
	'roxy-relocation-wheel',
	'roxy-synastry-chart',
	'roxy-tarot-card',
	'roxy-tarot-spread',
	'roxy-transit-wheel',
	'roxy-yoga-list',
];

/**
 * The one component where the attribute is a documented no-op. `/dreams/symbols/{id}` returns the symbol, its dictionary letter, and the interpretation; dropping the interpretation would leave a heading over nothing, so it is deliberately left alone and said so in the docs.
 */
const NO_OP = ['roxy-dream-card'];

/**
 * The behavioural half, and the reason it exists: the assertions above look at markup, so they can only catch a component that draws the shared accordion and misnames it. They cannot catch one that renders its own prose and ignores the attribute outright, which is what every component outside the original eighteen was doing. This one sets the property on every populated component on the page at once and reads what actually moved.
 */
test('hide-readings does something on every component that promises it, and nothing on the rest', async ({
	page,
}) => {
	await page.goto('/');
	await page.waitForTimeout(3000);

	const rows = await page.evaluate(async () => {
		type Host = HTMLElement & {
			data?: unknown;
			hideReadings?: boolean;
			updateComplete?: Promise<unknown>;
		};
		// Top-level demo cards only: querySelectorAll does not cross a shadow
		// boundary, so a nested child (the wheel inside the relocation wheel) is
		// measured through its host, which is what a consumer sets the attribute on.
		const hosts = [...document.querySelectorAll('*')].filter(
			(n) =>
				n.tagName.startsWith('ROXY-') &&
				Boolean((n as Host).shadowRoot) &&
				(n as Host).data != null,
		) as Host[];
		const read = (h: Host) =>
			[...(h.shadowRoot as ShadowRoot).childNodes]
				.filter((n) => (n as Element).tagName !== 'STYLE')
				.map((n) => n.textContent ?? '')
				.join('').length;
		const before = hosts.map(read);
		for (const h of hosts) h.hideReadings = true;
		await Promise.all(hosts.map((h) => h.updateComplete));
		const after = hosts.map(read);
		return hosts.map((h, i) => ({
			tag: h.tagName.toLowerCase(),
			id: h.id,
			before: before[i],
			after: after[i],
		}));
	});

	expect(rows.length).toBeGreaterThan(40);

	// Nothing may GROW. Hiding a reading can only ever remove content, so a
	// component that gets longer is rendering a fallback it should not have.
	expect(
		rows.filter((r) => r.after > r.before).map((r) => `${r.tag}#${r.id}`),
	).toEqual([]);

	const changed = new Set(
		rows.filter((r) => r.after !== r.before).map((r) => r.tag),
	);
	const present = new Set(rows.map((r) => r.tag));

	// Promised and delivered.
	expect(
		HONOURS.filter((t) => present.has(t)).filter((t) => !changed.has(t)),
	).toEqual([]);

	// Nothing else moved: a component that starts honouring the attribute has to
	// be written into HONOURS and into the docs, not discovered by a customer.
	expect([...changed].filter((t) => !HONOURS.includes(t)).sort()).toEqual([]);

	// And the documented no-op really is one.
	expect(NO_OP.filter((t) => changed.has(t))).toEqual([]);
});
