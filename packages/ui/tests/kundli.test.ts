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
		// A house-fixed layout numbers every cell from the ascendant, so with none
		// it must number nothing: a full set of twelve reads as a complete chart.
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

/**
 * A crowded North cell: the rasi number stays clear above the graha stack and
 * the stack stays inside the chart, in every cell, for three and four grahas.
 * Read off the `y` the renderer writes, as relationships rather than coordinates.
 */
describe('a North cell never prints its number into its grahas', () => {
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
	const GRAHAS = ['Sun', 'Venus', 'Rahu', 'Mars'];
	const crowded = (rashi: string, count: number) => ({
		Lagna: { graha: 'Lagna', rashi: 'gemini' },
		...Object.fromEntries(
			GRAHAS.slice(0, count).map((graha, i) => [
				graha,
				{
					graha,
					rashi,
					longitude: SIGNS.indexOf(rashi) * 30 + 1 + i * 7,
				},
			]),
		),
	});

	for (const count of [3, 4]) {
		test(`${count} grahas`, async () => {
			const faults: string[] = [];
			for (const rashi of SIGNS) {
				const el = await mount(crowded(rashi, count), 'north');
				const y = (n: Element) => Number(n.getAttribute('y'));
				const frame = root(el).querySelector('rect.line') as Element;
				const floor =
					Number(frame.getAttribute('y')) +
					Number(frame.getAttribute('height'));
				const cell = [...root(el).querySelectorAll('g.cell')].find(
					(g) => g.querySelectorAll('.planet-text').length === count,
				) as Element;
				const number = y(cell.querySelector('.rashi-num') as Element);
				const lines = [...cell.querySelectorAll('.planet-text')].map(y);
				const pitch = (lines[1] as number) - (lines[0] as number);
				if ((lines[0] as number) - number < pitch)
					faults.push(`${rashi}: number ${number} on line ${lines[0]}`);
				if ((lines.at(-1) as number) + pitch / 2 > floor)
					faults.push(`${rashi}: last line ${lines.at(-1)} past ${floor}`);
				el.remove();
			}
			expect(faults).toEqual([]);
		});
	}
});

describe('varga positions keep their natal reference explicit', () => {
	for (const style of ['north', 'south', 'east']) {
		test(`${style} distinguishes same-sign and changed-sign placements from D1`, async () => {
			const meta = {
				Lagna: { graha: 'Lagna', rashi: 'libra', longitude: 61.9 },
				Sun: {
					graha: 'Sun',
					rashi: 'capricorn',
					longitude: 271.675,
					nakshatra: { name: 'Uttara Ashadha', pada: 2, lord: 'Sun' },
				},
				Moon: {
					graha: 'Moon',
					rashi: 'sagittarius',
					longitude: 147.668,
					nakshatra: { name: 'Uttara Phalguni', pada: 1, lord: 'Sun' },
				},
			};
			const el = document.createElement(
				'roxy-divisional-chart',
			) as HTMLElement & { data: unknown };
			el.setAttribute('chart-style', style);
			el.data = {
				division: { number: 9, name: 'Navamsa' },
				chart: { meta },
				vargottama: ['Sun'],
			};
			document.body.append(el);
			await settled(el);
			for (const node of root(el).querySelectorAll('.planet-text')) {
				const label = [...node.childNodes]
					.filter((child) => child.nodeType === Node.TEXT_NODE)
					.map((child) => child.textContent)
					.join('');
				expect(label).not.toContain('°');
				const tooltip = node.querySelector('title')?.textContent ?? '';
				expect(tooltip).toMatch(/D1: \d+°/);
				expect(tooltip).toMatch(/D1: Uttara/);
			}
			const reference = root(el).querySelector('.kundli-reference');
			expect(reference?.querySelector('summary')).not.toBeNull();
			expect(reference?.querySelectorAll('tbody tr')).toHaveLength(
				Object.keys(meta).length,
			);
			expect(reference?.textContent).toContain('D1 Position');
			expect(reference?.textContent).toContain('D1 Nakshatra');
			expect(reference?.textContent).toContain('271.675°');
			expect(reference?.textContent).toContain('61.9°');
			expect(reference?.textContent).toContain('Uttara Ashadha');
			expect(reference?.querySelector('[tabindex="0"]')).not.toBeNull();
			const enlarge = root(el).querySelector(
				'.roxy-chart-tools button',
			) as HTMLButtonElement;
			enlarge.click();
			await settled(el);
			const expanded = root(el).querySelector('.roxy-chart-expanded svg');
			expect(expanded?.namespaceURI).toBe('http://www.w3.org/2000/svg');
			expect(expanded?.querySelector('.planet-text')).not.toBeNull();
			el.setAttribute('hide-readings', '');
			await settled(el);
			expect(
				root(el).querySelector('.kundli-reference')?.textContent,
			).toContain('271.675°');
			const natal = await mount(meta, style);
			expect(grahaLabels(natal)).toContain('Su 1°');
			expect(
				titles(natal).some(
					(title) => title.startsWith('Sun') && !title.includes('D1:'),
				),
			).toBe(true);
		});
	}
});

describe('the shared chart viewport renders diagrams at both sizes', () => {
	for (const [tag, data] of [
		['roxy-vedic-kundli', { meta: WITH_LAGNA }],
		['roxy-astrocartography-map', { lines: [] }],
		['roxy-local-space-compass', { bodies: [] }],
	] as const) {
		test(`${tag} opens a real SVG with inherited controls`, async () => {
			const el = document.createElement(tag) as HTMLElement & { data: unknown };
			el.data = data;
			document.body.append(el);
			await settled(el);
			expect(root(el).querySelectorAll('.roxy-chart-view')).toHaveLength(1);
			expect(root(el).querySelector('svg')?.namespaceURI).toBe(
				'http://www.w3.org/2000/svg',
			);
			(
				root(el).querySelector('.roxy-chart-tools button') as HTMLButtonElement
			).click();
			await settled(el);
			expect(
				root(el).querySelector('.roxy-chart-expanded svg')?.namespaceURI,
			).toBe('http://www.w3.org/2000/svg');
			expect(
				root(el).querySelector('.roxy-chart-expanded svg')?.children.length,
			).toBeGreaterThan(0);
			el.remove();
		});
	}
});
