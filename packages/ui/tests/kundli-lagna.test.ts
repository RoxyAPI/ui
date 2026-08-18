import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { hasLagna, toKundliViewModel } from '../src/utils/kundli-render.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(meta: unknown, style: string): Promise<HTMLElement> {
	const el = document.createElement('roxy-vedic-kundli');
	el.setAttribute('chart-style', style);
	(el as HTMLElement & { data: unknown }).data = { meta };
	document.body.appendChild(el);
	await settled(el);
	return el;
}

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
