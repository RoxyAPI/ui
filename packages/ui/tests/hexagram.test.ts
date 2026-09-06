import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(data: unknown): Promise<HTMLElement> {
	const el = document.createElement('roxy-hexagram');
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;

/** Every drawn line, visual TOP first, as `solid` or `broken` plus `changing` when it is moving. */
const rows = (el: HTMLElement): string[] =>
	[...root(el).querySelectorAll('.lines .line')].map((l) =>
		l.className.replace(/^line\s*/, '').trim(),
	);

const text = (el: HTMLElement): string => {
	const card = root(el).querySelector('[part~="card"]');
	if (!card) return '';
	return [...card.querySelectorAll('*')]
		.filter((n) => n.tagName !== 'STYLE')
		.map((n) => n.textContent ?? '')
		.join(' ');
};

/** Hexagram 13, Fellowship with Men. Lower trigram Fire (101), upper trigram Heaven (111), so `binary` reads 101111 from the bottom line up. */
const HEX_13 = {
	number: 13,
	symbol: '䷌',
	chinese: '同人',
	english: 'Fellowship with Men',
	pinyin: 'Tóng Rén',
	binary: '101111',
	upperTrigram: 'Heaven',
	lowerTrigram: 'Fire',
	judgment: 'Fellowship in the open furthers.',
	image: 'Heaven together with fire.',
	interpretation: { general: 'Shared purpose carries the work.' },
};

describe('the drawn figure is the response, read from the bottom up', () => {
	test('a hexagram carrying `binary` draws six lines with the FIRST digit at the bottom', async () => {
		const el = await mount(HEX_13);
		// 101111 bottom to top, so the visual order is the string reversed.
		expect(rows(el)).toEqual([
			'solid',
			'solid',
			'solid',
			'solid',
			'broken',
			'solid',
		]);
	});

	test('a cast draws its `lines` and marks only the positions that are moving', async () => {
		const el = await mount({
			seed: 'fixed',
			hexagram: HEX_13,
			// Line 1 is old yang and line 3 is old yin, so both are moving.
			lines: [9, 7, 6, 8, 8, 7],
			changingLinePositions: [1, 3],
			resultingHexagram: { ...HEX_13, number: 49, english: 'Revolution' },
		});
		expect(rows(el)).toEqual([
			'solid',
			'broken',
			'broken',
			'broken changing',
			'solid',
			'solid changing',
		]);
		expect(text(el)).toContain('1, 3');
		expect(text(el)).toContain('Revolution');
	});
});

describe('a response that carries no line data draws no figure', () => {
	/** The hexagram of the day names the figure and reads it, and carries neither `binary` nor a cast `lines` array. */
	const DAILY = {
		date: '2026-01-01',
		seed: 'fixed',
		dailyMessage: 'Meet the day in the open.',
		hexagram: {
			number: 13,
			symbol: '䷌',
			chinese: '同人',
			english: 'Fellowship with Men',
			pinyin: 'Tóng Rén',
			upperTrigram: 'Heaven',
			lowerTrigram: 'Fire',
			judgment: 'Fellowship in the open furthers.',
			image: 'Heaven together with fire.',
			interpretation: { general: 'Shared purpose carries the work.' },
		},
	};

	test('no line is drawn rather than a default pattern', async () => {
		const el = await mount(DAILY);
		expect(rows(el)).toEqual([]);
		expect(root(el).querySelector('.lines')).toBeNull();
	});

	test('everything the response DID carry still renders', async () => {
		const el = await mount(DAILY);
		const body = text(el);
		expect(root(el).querySelector('.symbol')?.textContent).toBe('䷌');
		expect(body).toContain('Fellowship with Men');
		expect(body).toContain('Heaven');
		expect(body).toContain('Fellowship in the open furthers.');
		expect(body).toContain('Meet the day in the open.');
	});
});

describe('the daily cast carries its line readings at the TOP level', () => {
	/**
	 * The shape `/iching/daily/cast` returns, as read from a live response: the figure and
	 * the moving positions at the top level, a hexagram that carries NEITHER `binary` nor
	 * `changingLines`, and the oracle statements for the moving lines only, beside it.
	 */
	const DAILY_CAST = {
		date: '2026-01-01',
		seed: 'fixed',
		hexagram: {
			number: 13,
			symbol: '䷌',
			chinese: '同人',
			english: 'Fellowship with Men',
			pinyin: 'Tóng Rén',
			upperTrigram: 'Heaven',
			lowerTrigram: 'Fire',
			judgment: 'Fellowship in the open furthers.',
			image: 'Heaven together with fire.',
			interpretation: { general: 'Shared purpose carries the work.' },
		},
		lines: [8, 7, 8, 6, 7, 6],
		changingLinePositions: [4, 6],
		changingLines: [
			{
				position: 4,
				text: 'The wall is climbed.',
				meaning: 'Hold the ground.',
			},
			{ position: 6, text: 'Fellowship in the meadow.', meaning: 'No regret.' },
		],
		resultingHexagram: {
			number: 49,
			symbol: '䷰',
			english: 'Revolution',
			upperTrigram: 'Lake',
			lowerTrigram: 'Fire',
		},
	};

	test('the figure comes from the top-level lines, not from the hexagram', async () => {
		const el = await mount(DAILY_CAST);
		// 8 7 8 6 7 6 bottom to top, so the visual order is that reversed, with
		// the two sixes moving.
		expect(rows(el)).toEqual([
			'broken changing',
			'solid',
			'broken changing',
			'broken',
			'solid',
			'broken',
		]);
	});

	test('the moving-line readings render, which is what the cast is about', async () => {
		const el = await mount(DAILY_CAST);
		const body = text(el);
		expect(body).toContain('The wall is climbed.');
		expect(body).toContain('Fellowship in the meadow.');
		expect(body).toContain('Hold the ground.');
		// The lines that did NOT move are not readings of this cast, and the
		// response does not send them, so nothing may invent one.
		expect(body).toContain('4, 6');
		expect(body).toContain('Revolution');
	});
});
