import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import type { GetKpDailyFinanceResponse } from '../src/types/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-kp-finance-card');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
/** The rendered card only: reading the whole shadow root pulls the stylesheet in with it. */
const text = (el: HTMLElement): string =>
	(root(el).querySelector('[part~="card"]')?.textContent ?? '').replace(
		/\s+/g,
		' ',
	);
const parts = (el: HTMLElement) =>
	new Set(
		[...root(el).querySelectorAll('[part]')].flatMap((n) =>
			(n.getAttribute('part') ?? '').split(/\s+/),
		),
	);

/**
 * One day carrying every shape the endpoint returns: a gain cusp, a loss cusp with its verdict inverted, two dasha levels, a retrograde ruling planet, three Moon windows, two worst windows and no best window, which is a fact about the day and not a missing value.
 */
const DAY: GetKpDailyFinanceResponse = {
	date: '2026-09-16',
	readingAt: '2026-09-16T12:00:00',
	ayanamsa: 'kp-newcomb',
	ayanamsaDegrees: 23.6307,
	houses: { gain: [2, 11], loss: [6, 8, 12] },
	significators: {
		gain: ['Mercury', 'Rahu', 'Moon', 'Mars', 'Venus', 'Sun'],
		loss: [
			'Sun',
			'Mars',
			'Mercury',
			'Rahu',
			'Moon',
			'Ketu',
			'Saturn',
			'Jupiter',
			'Venus',
		],
		byHouse: [
			{ house: 2, group: 'gain', significators: ['Mercury', 'Rahu', 'Moon'] },
			{ house: 6, group: 'loss', significators: ['Sun', 'Ketu', 'Sun'] },
		],
	},
	layers: {
		cusps: {
			layer: 'cusps',
			weight: 30,
			score: 60,
			rows: [
				{
					house: 2,
					longitude: 110.4537,
					signLord: 'Moon',
					starLord: 'Mercury',
					subLord: 'Venus',
					inGain: true,
					inLoss: true,
					verdict: 'mixed',
					inverted: false,
					score: 50,
				},
				{
					house: 6,
					longitude: 236.506,
					signLord: 'Mars',
					starLord: 'Mercury',
					subLord: 'Jupiter',
					inGain: false,
					inLoss: true,
					verdict: 'unfavourable',
					inverted: true,
					score: 100,
				},
			],
		},
		dasha: {
			layer: 'dasha',
			weight: 40,
			score: 39,
			rows: [
				{
					level: 'mahadasha',
					lord: 'Saturn',
					startDate: '2011-08-06T02:00:00.000Z',
					endDate: '2030-08-06T02:00:00.000Z',
					inGain: false,
					inLoss: true,
					verdict: 'unfavourable',
					retrograde: true,
					score: 0,
					weight: 10,
				},
				{
					level: 'sookshmaDasha',
					lord: 'Venus',
					startDate: '2026-09-10T00:00:00.000Z',
					endDate: '2026-09-20T00:00:00.000Z',
					inGain: true,
					inLoss: false,
					verdict: 'favourable',
					retrograde: false,
					score: 100,
					weight: 40,
				},
			],
		},
		rulingPlanets: {
			layer: 'rulingPlanets',
			weight: 15,
			score: 25,
			rows: [
				{
					planet: 'Saturn',
					inGain: false,
					inLoss: true,
					verdict: 'unfavourable',
					retrograde: true,
					score: 0,
				},
				{
					planet: 'Mars',
					inGain: true,
					inLoss: true,
					verdict: 'mixed',
					retrograde: false,
					score: 50,
				},
			],
		},
		moonWindows: {
			layer: 'moonWindows',
			weight: 15,
			score: 38.9,
			rows: [
				{
					from: '2026-09-16T00:00:00',
					to: '2026-09-16T02:22:25',
					subLord: 'Mercury',
					inGain: true,
					inLoss: true,
					verdict: 'mixed',
					score: 50,
				},
				{
					from: '2026-09-16T02:22:25',
					to: '2026-09-16T03:53:26',
					subLord: 'Ketu',
					inGain: false,
					inLoss: true,
					verdict: 'unfavourable',
					score: 0,
				},
				{
					from: '2026-09-16T03:53:26',
					to: '2026-09-17T00:00:00',
					subLord: 'Jupiter',
					inGain: false,
					inLoss: false,
					verdict: 'neutral',
					score: 50,
				},
			],
		},
	},
	score: 43.2,
	band: 'caution',
	bestWindow: null,
	worstWindows: [
		{
			from: '2026-09-16T02:22:25',
			to: '2026-09-16T03:53:26',
			subLord: 'Ketu',
			inGain: false,
			inLoss: true,
			verdict: 'unfavourable',
			score: 0,
		},
		{
			from: '2026-09-16T17:11:00',
			to: '2026-09-16T21:21:00',
			subLord: 'Saturn',
			inGain: false,
			inLoss: true,
			verdict: 'unfavourable',
			score: 0,
		},
	],
};

describe('the KP daily finance card renders the whole response', () => {
	test('every block the endpoint returns reaches the card as a named part', async () => {
		const p = parts(await mount(DAY));
		for (const name of [
			'card',
			'header',
			'details',
			'significators',
			'cusps',
			'dasha',
			'ruling-planets',
			'moon-windows',
			'windows',
			'frame',
			'table',
		]) {
			expect(p.has(name), `no part named ${name}`).toBe(true);
		}
	});

	test('the band leads and the score is evidence beside it, never a gauge', async () => {
		const el = await mount(DAY);
		expect(root(el).querySelector('.verdict')?.textContent?.trim()).toBe(
			'Caution',
		);
		expect(root(el).querySelector('.head .evidence')?.textContent?.trim()).toBe(
			'43.2',
		);
		expect(root(el).querySelector('progress, meter')).toBeNull();
		// The only percent on the card is a layer WEIGHT, which the API defines as
		// a percent of the final score; no score is ever printed as one.
		expect(root(el).querySelector('.head')?.textContent).not.toContain('%');
	});

	test('the two house sets and their significators come before any layer', async () => {
		const el = await mount(DAY);
		const body = text(el);
		expect(body).toContain('Gain houses 2 and 11');
		expect(body).toContain('Loss houses 6, 8, and 12');
		expect(body.indexOf('Significators')).toBeLessThan(body.indexOf('Cusps'));
		const chips = [
			...root(el).querySelectorAll('[part~="significators"] .chip'),
		].map((c) => c.textContent?.trim());
		expect(chips.length).toBe(6 + 9 + 2);
		// A planet qualifying at two tiers of one house is named once, at its strongest.
		const rows = [
			...root(el).querySelectorAll('[part~="significators"] tbody tr'),
		].map((r) => (r.textContent ?? '').replace(/\s+/g, ' ').trim());
		expect(rows[1]).toBe('6 Loss Sun and Ketu');
	});

	test('each layer table carries one row per response row, with the weight and the score of the layer', async () => {
		const el = await mount(DAY);
		const rowsOf = (part: string) =>
			root(el).querySelectorAll(`[part~="${part}"] tbody tr`).length;
		expect(rowsOf('cusps')).toBe(2);
		expect(rowsOf('dasha')).toBe(2);
		expect(rowsOf('ruling-planets')).toBe(2);
		expect(rowsOf('moon-windows')).toBe(3);
		const head = root(el)
			.querySelector('[part~="cusps"] .evidence')
			?.textContent?.replace(/\s+/g, ' ');
		expect(head).toContain('Weight 30%');
		expect(head).toContain('Score 60');
	});

	test('a loss cusp is marked as one and its verdict reads the catalogue word', async () => {
		const el = await mount(DAY);
		const rows = [...root(el).querySelectorAll('[part~="cusps"] tbody tr')].map(
			(r) => (r.textContent ?? '').replace(/\s+/g, ' ').trim(),
		);
		expect(rows[0]).toContain('2 Gain');
		expect(rows[1]).toContain('6 Loss');
		expect(rows[1]).toContain('Unfavourable');
		expect(rows[1]).toContain('100');
	});

	test('a dasha level is named from the catalogue and a retrograde lord says so', async () => {
		const el = await mount(DAY);
		const rows = [...root(el).querySelectorAll('[part~="dasha"] tbody tr')].map(
			(r) => (r.textContent ?? '').replace(/\s+/g, ' ').trim(),
		);
		expect(rows[0]).toContain('Mahadasha');
		expect(rows[0]).toContain('retrograde');
		expect(rows[1]).toContain('Sookshma');
		expect(rows[1]).not.toContain('retrograde');
	});

	test('a Moon window is the wall clock of the request timezone, not the viewer', async () => {
		// The windows arrive naive, so 02:22 must read as 02:22 wherever the page
		// is opened; a runtime that shifted it into the viewer zone would move it.
		const el = await mount(DAY);
		const rows = [
			...root(el).querySelectorAll('[part~="moon-windows"] tbody tr'),
		].map((r) => (r.textContent ?? '').replace(/\s+/g, ' ').trim());
		expect(rows[1]).toContain('2:22');
		expect(rows[1]).toContain('3:53');
		expect(rows[2]).toContain('Neutral');
	});

	test('a day with no favourable window prints the worst windows alone', async () => {
		const el = await mount(DAY);
		const body = text(el);
		expect(body).not.toContain('Best window');
		expect(body).toContain('Worst windows');
		expect(root(el).querySelectorAll('.window.worst').length).toBe(2);
	});

	test('a favourable window is lifted out of the table when the day has one', async () => {
		const el = await mount({
			...DAY,
			bestWindow: DAY.layers.moonWindows.rows[0],
		});
		expect(text(el)).toContain('Best window');
		expect(root(el).querySelectorAll('.window.best').length).toBe(1);
	});

	test('the frame caption names the ayanamsa the reading was computed in', async () => {
		expect(text(await mount(DAY))).toContain('KP Newcomb');
	});

	test('nothing is written prose, so hide-readings leaves the card byte-identical', async () => {
		const plain = root(await mount(DAY)).innerHTML;
		const hidden = root(await mount(DAY, { 'hide-readings': '' })).innerHTML;
		expect(hidden).toBe(plain);
	});

	test('no field renders as an object or an undefined', async () => {
		const body = text(await mount(DAY));
		expect(body).not.toContain('[object Object]');
		expect(body).not.toContain('undefined');
		expect(body).not.toContain('NaN');
	});
});
