import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { hasLagna, toKundliViewModel } from '../src/utils/kundli-render.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	meta: unknown,
	style: string,
	data?: unknown,
): Promise<HTMLElement> {
	const el = document.createElement('roxy-vedic-kundli');
	el.setAttribute('chart-style', style);
	(el as HTMLElement & { data: unknown }).data = data ?? { meta };
	document.body.appendChild(el);
	await settled(el);
	return el;
}

/** The graha labels drawn INSIDE the cells, which is where a mark has to appear. Asserted apart from the legend, since the legend prints the same characters and would satisfy a whole-card search on its own. */
const grahaLabels = (el: HTMLElement): string =>
	[...(el.shadowRoot as ShadowRoot).querySelectorAll('.planet-text')]
		.map((n) => n.textContent ?? '')
		.join(' ');

/** Every `<title>` the chart emits, which is the per-graha tooltip. */
const titles = (el: HTMLElement): string[] =>
	[...(el.shadowRoot as ShadowRoot).querySelectorAll('title')].map(
		(n) => n.textContent ?? '',
	);

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string => root(el).textContent ?? '';

/** The rashi numbers the north layout writes into its twelve cells, in DOM order. */
const rashiNumbers = (el: HTMLElement): string[] =>
	[...root(el).querySelectorAll('.rashi-num')].map(
		(n) => n.textContent?.trim() ?? '',
	);

const WITH_LAGNA = {
	Lagna: { graha: 'Lagna', rashi: 'cancer' },
	Sun: { graha: 'Sun', rashi: 'capricorn', longitude: 271.6 },
	Moon: { graha: 'Moon', rashi: 'leo', longitude: 147.6 },
};

/** The same chart with the ascendant absent, which is the only thing that changes. */
const WITHOUT_LAGNA = {
	Sun: { graha: 'Sun', rashi: 'capricorn', longitude: 271.6 },
	Moon: { graha: 'Moon', rashi: 'leo', longitude: 147.6 },
};

describe('a chart with no ascendant is never drawn house-fixed', () => {
	test('hasLagna answers for the two shapes', () => {
		expect(hasLagna(toKundliViewModel(WITH_LAGNA))).toBe(true);
		expect(hasLagna(toKundliViewModel(WITHOUT_LAGNA))).toBe(false);
	});

	test('with an ascendant the north chart anchors house 1 to it', async () => {
		const el = await mount(WITH_LAGNA, 'north');
		// Cancer is rashi 4, so a Cancer Lagna puts 4 in the first house.
		expect(rashiNumbers(el).some((n) => n.startsWith('4'))).toBe(true);
		expect(text(el)).toContain('ASC');
	});

	test('without one, north draws no rashi numbers and no ascendant marker', async () => {
		const el = await mount(WITHOUT_LAGNA, 'north');
		// The failure this guards is the opposite: a full set of twelve numbers
		// anchored to an assumed Aries, which reads as a complete, correct chart.
		expect(rashiNumbers(el)).toEqual([]);
		expect(text(el)).not.toContain('ASC');
	});

	test('and the reader is told why the layout changed', async () => {
		expect(text(await mount(WITHOUT_LAGNA, 'north'))).toContain(
			'No ascendant in this chart',
		);
	});

	test('the planets still render, so nothing is lost by degrading', async () => {
		expect(text(await mount(WITHOUT_LAGNA, 'north'))).toContain('Su');
	});
});

/** Sun and Mercury within a degree, Mercury inside the Sun combustion orb. */
const WITH_STATES = {
	meta: {
		Lagna: { graha: 'Lagna', rashi: 'taurus' },
		Sun: { graha: 'Sun', rashi: 'capricorn', longitude: 280.5 },
		Mercury: {
			graha: 'Mercury',
			rashi: 'capricorn',
			longitude: 280.9,
			nakshatra: { name: 'Uttara Ashadha', pada: 2, lord: 'Sun' },
			deeptadi: 'Dipta',
		},
		Moon: { graha: 'Moon', rashi: 'leo', longitude: 147.6 },
	},
	combustion: [{ planet: 'Mercury', distanceFromSun: 0.4, orb: 14 }],
	planetaryWar: [
		{ planet1: 'Sun', planet2: 'Mercury', distance: 0.4, winner: 'Sun' },
	],
};

/** The same chart with neither state list, which is what a divisional response looks like. */
const NO_STATES = { meta: WITH_STATES.meta };

describe('the chart marks the graha states its response carries', () => {
	test('a combust graha is marked and the tooltip says so', async () => {
		const el = await mount(WITH_STATES.meta, 'south', WITH_STATES);
		expect(grahaLabels(el)).toContain('\u1d9c');
		expect(titles(el).some((t) => t.includes('combust'))).toBe(true);
	});

	test('a graha yuddha names the opponent and the winner', async () => {
		const el = await mount(WITH_STATES.meta, 'south', WITH_STATES);
		expect(grahaLabels(el)).toContain('\u02b7');
		expect(
			titles(el).some((t) => t.includes('planetary war with Sun, won by Sun')),
		).toBe(true);
	});

	test('the nakshatra lord and deeptadi reach the tooltip', async () => {
		const found = titles(await mount(WITH_STATES.meta, 'south', WITH_STATES));
		expect(found.some((t) => t.includes('nakshatra lord Sun'))).toBe(true);
		expect(found.some((t) => t.includes('Dipta'))).toBe(true);
	});

	test('the key explains only the marks this chart actually uses', async () => {
		// A legend that lists every symbol teaches a reader to look for states the
		// chart never drew, which is the same over-claim as an invented placement.
		const el = await mount(NO_STATES.meta, 'south', NO_STATES);
		const body = text(el);
		expect(body).not.toContain('combust');
		expect(body).not.toContain('planetary war');
	});

	test('the states survive the view model, keyed case-insensitively', () => {
		const vm = toKundliViewModel(WITH_STATES.meta, { states: WITH_STATES });
		const mercury = vm.placements.capricorn?.find((p) => p.graha === 'Mercury');
		expect(mercury?.combust).toBe(true);
		expect(mercury?.war?.opponent).toBe('Sun');
		expect(mercury?.war?.winner).toBe('Sun');
	});
});
