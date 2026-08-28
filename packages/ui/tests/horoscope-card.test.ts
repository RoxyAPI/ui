import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-horoscope-card');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
/** The rendered card only. Reading the whole shadow root pulls the stylesheet in with it. */
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';

const EVENTS = [
	{
		type: 'eclipse' as const,
		at: '2026-08-28T04:12:49Z',
		bodies: ['Moon'],
		sign: 'pisces',
		house: 12,
	},
	{
		type: 'aspect' as const,
		at: '2026-08-28T07:24:53Z',
		bodies: ['Mercury', 'Uranus'],
		aspect: 'square',
		house: 6,
		through: '2026-08-31T23:25:26Z',
	},
];

/** The six topic fields, which are the same reading the column carries undivided. */
const SECTIONS = {
	overview: 'The overview sentence.',
	love: 'The love sentence.',
	career: 'The career sentence.',
	health: 'The health sentence.',
	finance: 'The finance sentence.',
	advice: 'The advice sentence.',
};

const DAILY = {
	sign: 'Aries',
	date: '2026-08-28',
	...SECTIONS,
	column: 'First paragraph of the column.\n\nSecond paragraph of the column.',
	events: EVENTS,
	luckyNumber: 9,
	luckyColor: 'Red',
	compatibleSigns: ['Leo'],
	activeTransits: ['Saturn retrograde'],
	moonSign: 'Pisces',
	moonPhase: 'Full Moon',
	energyRating: 7,
};

const YEARLY = {
	sign: 'Aries',
	year: 2026,
	...SECTIONS,
	column: 'The yearly column.',
	events: EVENTS,
	themes: [
		{
			body: 'Jupiter',
			sign: 'cancer',
			house: 4,
			theme: 'home and emotional foundations',
			from: '2026-01-01',
			to: '2026-06-30',
		},
	],
	eclipses: [
		{
			date: '2026-02-17',
			kind: 'annular',
			house: 11,
			theme: 'friendships and future goals',
		},
	],
	retrogrades: [
		{
			date: '2026-02-26',
			body: 'Mercury',
			direction: 'retrograde',
			house: 12,
			theme: 'solitude and inner reflection',
		},
	],
	keyPeriods: [
		{
			from: '2026-01-23',
			to: '2026-03-02',
			body: 'Mars',
			house: 11,
			focus: 'friendships and future goals',
		},
	],
	bestPeriods: {
		love: { from: '2026-08-01', to: '2026-08-31', count: 9 },
		career: { from: '2026-01-01', to: '2026-01-31', count: 12 },
	},
	luckyNumbers: [9, 1],
	luckyColor: 'Red',
	compatibleSigns: ['Leo'],
};

describe('the reading renders in exactly one shape', () => {
	/**
	 * The endpoint returns the column and the six topic fields as the SAME reading split two ways,
	 * and says so in the spec. Rendering both prints it twice, which no gate but this one can see:
	 * both halves are legitimate markup and each is individually correct.
	 */
	test('a response carrying a column renders the column and NOT the sections', async () => {
		const el = await mount(DAILY);
		const body = text(el);
		expect(body).toContain('First paragraph of the column.');
		expect(body).not.toContain('The love sentence.');
		expect(body).not.toContain('The overview sentence.');
		expect(root(el).querySelector('[part~="column"]')).not.toBeNull();
		expect(root(el).querySelector('[part~="outlook"]')).toBeNull();
	});

	test('a response with no column falls back to the sections, unchanged', async () => {
		const { column, ...noColumn } = DAILY;
		expect(column).toBeString();
		const el = await mount(noColumn);
		const body = text(el);
		expect(body).toContain('The overview sentence.');
		expect(body).toContain('The love sentence.');
		expect(root(el).querySelector('[part~="column"]')).toBeNull();
		expect(root(el).querySelector('[part~="outlook"]')).not.toBeNull();
	});

	test('layout="sections" pins the sections even when a column arrived', async () => {
		const el = await mount(DAILY, { layout: 'sections' });
		const body = text(el);
		expect(body).toContain('The love sentence.');
		expect(body).not.toContain('First paragraph of the column.');
	});

	test('layout="column" renders nothing rather than falling through to the sections', async () => {
		const { column, ...noColumn } = DAILY;
		expect(column).toBeString();
		const el = await mount(noColumn, { layout: 'column' });
		const body = text(el);
		expect(body).not.toContain('The love sentence.');
		expect(body).not.toContain('The overview sentence.');
	});

	test('the column breaks into one paragraph per blank line', async () => {
		const el = await mount(DAILY);
		const paragraphs = root(el).querySelectorAll('[part~="column"] p');
		expect(paragraphs.length).toBe(2);
		expect(paragraphs[0]?.textContent).toBe('First paragraph of the column.');
	});
});

describe('the events trail', () => {
	test('every event renders its bodies, its house and its kind', async () => {
		const el = await mount(DAILY);
		const rows = root(el).querySelectorAll('[part~="events"] .row');
		expect(rows.length).toBe(EVENTS.length);
		const aspectRow = rows[1]?.textContent ?? '';
		expect(aspectRow).toContain('Mercury');
		expect(aspectRow).toContain('Uranus');
		expect(aspectRow).toContain('6');
	});

	/**
	 * The visible time is the reader's own, so it cannot be the auditable value. The `datetime`
	 * attribute is, and it must be the instant the response gave, to the second and unrounded:
	 * that is the string somebody checks against an independent ephemeris.
	 */
	test('the exact UTC instant survives into the datetime attribute, verbatim', async () => {
		const el = await mount(DAILY);
		const times = [...root(el).querySelectorAll('[part~="events"] time')].map(
			(t) => t.getAttribute('datetime'),
		);
		expect(times).toEqual(EVENTS.map((e) => e.at));
	});

	test('an aspect event carries the aspect glyph, coloured by its nature', async () => {
		const el = await mount(DAILY);
		const square = root(el).querySelector(
			'[part~="events"] .row-what .aspect-square',
		);
		expect(square).not.toBeNull();
		expect(square?.textContent?.trim()).not.toBe('');
	});

	test('a period with no events renders no events block at all', async () => {
		const el = await mount({ ...DAILY, events: [] });
		expect(root(el).querySelector('[part~="events"]')).toBeNull();
	});
});

describe('the yearly period', () => {
	test('all four dated lists render, with their houses and their dates', async () => {
		const el = await mount(YEARLY, { period: 'yearly' });
		for (const part of [
			'themes',
			'key-periods',
			'eclipses',
			'retrogrades',
			'best-periods',
		]) {
			expect(
				root(el).querySelector(`[part~="${part}"]`),
				`yearly is missing its ${part} block`,
			).not.toBeNull();
		}
		const themes =
			root(el).querySelector('[part~="themes"]')?.textContent ?? '';
		expect(themes).toContain('Jupiter');
		expect(themes).toContain('home and emotional foundations');
		expect(themes).toContain('4');
	});

	test('a life area with no best month is omitted and the others still render', async () => {
		const el = await mount(YEARLY, { period: 'yearly' });
		const tiles = root(el).querySelectorAll('[part~="best-periods"] .tile');
		expect(tiles.length).toBe(2);
		const best = root(el).querySelector('[part~="best-periods"]')?.textContent;
		expect(best).toContain('12');
	});

	/** The four-digit year is not a formatted number: grouping it renders 2.026 in half of Europe. */
	test('the year prints as four bare digits', async () => {
		const el = await mount(YEARLY, { period: 'yearly' });
		expect(root(el).querySelector('.date')?.textContent).toBe('2026');
	});
});

/**
 * Three of the four periods name their span with an ISO string, and each is a different shape.
 * Printing one as it arrives puts a wire value in front of a reader in every language.
 */
describe('the period label', () => {
	test('a weekly response prints its Monday as a date, not as ISO', async () => {
		const { date, ...weekly } = { ...DAILY, week: '2026-08-24' };
		expect(date).toBeString();
		const el = await mount(weekly, { period: 'weekly' });
		const label = root(el).querySelector('.date')?.textContent ?? '';
		expect(label).not.toBe('2026-08-24');
		expect(label).toContain('2026');
	});

	test('a monthly response prints its month, not a bare YYYY-MM', async () => {
		const { date, ...monthly } = { ...DAILY, month: '2026-08' };
		expect(date).toBeString();
		const el = await mount(monthly, { period: 'monthly' });
		const label = root(el).querySelector('.date')?.textContent ?? '';
		expect(label).not.toBe('2026-08');
		// The month the payload named, not the one a viewer west of Greenwich would
		// see if the value were parsed as an instant and rendered in a local zone.
		expect(label).toContain('Aug');
		expect(label).toContain('2026');
	});

	test('the title reads the catalogued period label, never the raw attribute', async () => {
		const el = await mount(YEARLY, { period: 'yearly' });
		const title = root(el).querySelector('.title')?.textContent ?? '';
		expect(title).toContain('Aries');
		expect(title).toContain('Yearly');
		expect(title).not.toContain('yearly');
	});

	test('the yearly blocks do not render on a period that has none', async () => {
		const el = await mount(DAILY);
		expect(root(el).querySelector('[part~="themes"]')).toBeNull();
		expect(root(el).querySelector('[part~="best-periods"]')).toBeNull();
	});
});

describe('hide-readings', () => {
	test('drops the column and keeps every dated event', async () => {
		const el = await mount(DAILY, { 'hide-readings': '' });
		const body = text(el);
		expect(body).not.toContain('First paragraph of the column.');
		expect(root(el).querySelectorAll('[part~="events"] .row').length).toBe(
			EVENTS.length,
		);
		expect(body).toContain('Saturn retrograde');
	});

	test('drops the sections shape too, so neither half of the reading survives', async () => {
		const { column, ...noColumn } = DAILY;
		expect(column).toBeString();
		const el = await mount(noColumn, { 'hide-readings': '' });
		const body = text(el);
		expect(body).not.toContain('The love sentence.');
		expect(body).not.toContain('The overview sentence.');
	});

	test('keeps every yearly list, because a date and a house are not a reading', async () => {
		const el = await mount(YEARLY, {
			period: 'yearly',
			'hide-readings': '',
		});
		for (const part of [
			'themes',
			'key-periods',
			'eclipses',
			'retrogrades',
			'best-periods',
			'events',
		]) {
			expect(
				root(el).querySelector(`[part~="${part}"]`),
				`hide-readings removed the ${part} block, which is data`,
			).not.toBeNull();
		}
	});
});
