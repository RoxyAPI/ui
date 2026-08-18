import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import type { GetVedicDailyReadingResponse } from '../src/types/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(data: unknown): Promise<HTMLElement> {
	const el = document.createElement('roxy-vedic-daily');
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
/** The rendered card only. Reading the whole shadow root pulls the stylesheet in with it, and a `0%` keyframe is enough to satisfy a search for copy that must not appear. */
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';

const graha = (over: Record<string, unknown>) => ({
	graha: 'Sun',
	sign: 'Capricorn',
	longitude: 290,
	houseFromMoon: 6,
	favourable: false,
	binduCount: 3,
	state: 'void',
	stateSource: 'Phaladeepika XXVI.32',
	kaksha: {
		number: 6,
		lord: 'Mercury',
		startDegree: 18.75,
		endDegree: 22.5,
		bindu: false,
		binduCount: 3,
	},
	...over,
});

/** One day carrying every section the endpoint can return, including the two shapes that are easy to render wrongly: a second Moon window, and a graha with no Bhinnashtakavarga. */
const DAY = {
	frames: {
		natal: {
			ayanamsa: 'lahiri',
			ayanamsaDegrees: 23.72,
			at: '1990-01-15',
			governs: ['subject'],
		},
		transit: {
			ayanamsa: 'lahiri',
			ayanamsaDegrees: 24.22,
			at: '2026-02-03',
			governs: ['grahas'],
		},
		kp: {
			ayanamsa: 'kp-newcomb',
			ayanamsaDegrees: 23.62,
			at: '2026-02-03',
			governs: ['areas.finance'],
		},
	},
	date: '2026-02-03',
	dayStart: '2026-02-03T17:33:00',
	dayEnd: '2026-02-04T17:32:00',
	subject: {
		janmaRashi: 'Leo',
		janmaNakshatra: 'Magha',
		janmaNakshatraNumber: 10,
		moonLongitude: 130,
	},
	panchanga: {
		vara: 'Tuesday',
		varaSanskrit: 'Mangalavara',
		paksha: 'Krishna',
		tithi: { number: 17, name: 'Dvitiya', validTo: '2026-02-04T00:41:00' },
		nakshatra: { number: 10, name: 'Magha', validTo: '2026-02-03T22:10:00' },
		yoga: { number: 5, name: 'Shobhana', validTo: '2026-02-04T02:00:00' },
		karana: { number: 4, name: 'Vanija', validTo: '2026-02-04T00:41:00' },
	},
	grahas: [
		graha({}),
		// Rahu has no Bhinnashtakavarga, so its bindu question does not apply.
		graha({
			graha: 'Rahu',
			binduCount: null,
			state: 'obstructed',
			kaksha: {
				number: 2,
				lord: 'Jupiter',
				startDegree: 3.75,
				endDegree: 7.5,
				bindu: null,
				binduCount: null,
			},
		}),
	],
	tara: [
		{
			validFrom: '2026-02-03T17:33:00',
			validTo: '2026-02-03T22:10:00',
			moonNakshatra: 'Magha',
			number: 8,
			name: 'Mitra',
			quality: 'favourable',
		},
		{
			validFrom: '2026-02-03T22:10:00',
			validTo: '2026-02-04T17:32:00',
			moonNakshatra: 'Purva Phalguni',
			number: 9,
			name: 'Parama Mitra',
			quality: 'favourable',
		},
	],
	chandrabala: [
		{
			validFrom: '2026-02-03T17:33:00',
			validTo: '2026-02-04T17:32:00',
			moonSign: 'Leo',
			houseFromMoon: 1,
			favourable: true,
			ashtamaChandra: false,
		},
	],
	dasha: [
		{
			level: 'mahadasha',
			lord: 'Rahu',
			startDate: '2012-08-05',
			endDate: '2030-08-05',
		},
		{
			level: 'antardasha',
			lord: 'Venus',
			startDate: '2024-02-22',
			endDate: '2027-02-22',
		},
	],
	areas: {
		finance: {
			score: 0,
			band: 'weak',
			positive: 0,
			negative: 7,
			drivers: [],
			cautions: [
				{
					graha: 'Rahu',
					house: 6,
					level: 1,
					grade: 'A',
					dashaLevels: ['mahadasha'],
				},
			],
			natal: {},
		},
	},
	score: 0,
	verdict: 'weak',
	tally: [
		{ state: 'void', count: 1 },
		{ state: 'obstructed', count: 1 },
	],
	evaluated: 9,
	degraded: [],
	houseThemes: { '6': ['enemies', 'disease'] },
	focus: 'general',
} as unknown as GetVedicDailyReadingResponse;

describe('the vedic daily card renders the whole response', () => {
	test('every section the endpoint returns reaches the card', async () => {
		// The response is composed of parts a reader works through in order, and a
		// card that silently drops one looks complete while answering less.
		const parts = new Set(
			[...root(await mount(DAY)).querySelectorAll('[part]')].flatMap((n) =>
				(n.getAttribute('part') ?? '').split(/\s+/),
			),
		);
		for (const name of [
			'header',
			'panchanga',
			'grahas',
			'windows',
			'finance',
			'dasha',
			'frame',
		]) {
			expect(parts.has(name), `no part named ${name}`).toBe(true);
		}
	});

	test('the verdict leads and the score is never drawn as a gauge', async () => {
		// The score is the share of grahas that support the day, and the classical
		// rules cancel far more often than they deliver, so an ordinary day sits
		// low. A percentage or a bar would read every ordinary day as a bad one.
		const el = await mount(DAY);
		const body = text(el);
		expect(root(el).querySelector('.verdict')?.textContent?.trim()).toBe(
			'Weak',
		);
		expect(body).toContain('0 of 9 grahas support this day');
		expect(body).not.toContain('0%');
		expect(root(el).querySelector('progress, meter')).toBeNull();
	});

	test('a graha with no Bhinnashtakavarga is not reported as unfavourable', async () => {
		// Null bindu means the question does not apply, which is a different answer
		// from an unfavourable stretch nobody calculated.
		const dots = [...root(await mount(DAY)).querySelectorAll('.dot')];
		expect(dots.length).toBe(2);
		expect(dots[1]?.className).not.toContain('no');
		expect(dots[1]?.className).not.toContain('yes');
	});

	test('every Moon window renders, not just the first', async () => {
		// Tara and Chandrabala are arrays because the Moon can change nakshatra or
		// rashi inside one panchanga day, and two windows is ordinary.
		const body = text(await mount(DAY));
		expect(body).toContain('Mitra');
		expect(body).toContain('Parama Mitra');
	});

	test('all three frames are named, each with what it governs', async () => {
		// One caption over sections two other frames produced is the provenance
		// failure the caption exists to prevent.
		const lines = [...root(await mount(DAY)).querySelectorAll('.roxy-frame p')];
		expect(lines.length).toBe(3);
		expect(lines.map((l) => l.textContent ?? '').join(' ')).toContain(
			'KP Newcomb',
		);
	});

	test('house wording comes from the response, never from a table here', async () => {
		const el = await mount(DAY);
		expect(text(el)).toContain('enemies, disease');
	});
});
