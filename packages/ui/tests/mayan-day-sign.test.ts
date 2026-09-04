import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { registerLocale } from '../src/i18n/registry.js';

// A synthetic catalogue, so the band assertions pin the two labels apart rather
// than a translator's wording: in English the fallback and the catalogue entry
// are the same word, and only a translated render can tell them apart.
registerLocale('zz', {
	Coefficient: 'ZZCOEFFICIENT',
	'Character of the number': 'ZZCHARACTER',
	Violent: 'ZZVIOLENT',
});

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-mayan-day-sign');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';

/** A live Tzolkin read: the sign in all three spellings, on the highest coefficient there is. */
const TZOLKIN = {
	date: '1990-01-15',
	daySign: 'kan',
	daySignName: 'Kʼan',
	daySignClassic: 'Kan',
	daySignKiche: 'KʼAT',
	number: 13,
	trecena: {
		number: 8,
		dayOfTrecena: 13,
		rulingSign: 'eb',
		rulingSignName: 'Ebʼ',
	},
	reading: {
		keynote: 'ZZKEYNOTE',
		numberReading: 'ZZNUMBERREADING',
		numberBand: 'violent',
		strengths: ['ZZSTRENGTH'],
		challenges: ['ZZCHALLENGE'],
		guidance: 'ZZGUIDANCE',
	},
	conventions: { correlation: 'gmt-584283' },
};

/** The same day as a Calendar Round chart, which nests the Tzolkin read and adds the second calendar. */
const CHART = {
	date: '1990-01-15',
	tzolkin: {
		daySign: TZOLKIN.daySign,
		daySignName: TZOLKIN.daySignName,
		daySignClassic: TZOLKIN.daySignClassic,
		daySignKiche: TZOLKIN.daySignKiche,
		number: TZOLKIN.number,
		trecena: TZOLKIN.trecena,
		reading: TZOLKIN.reading,
	},
	haab: {
		month: 'muwan',
		monthName: 'Muwan',
		monthClassic: 'Muan',
		day: 2,
		dayOfYear: 282,
		reading: 'ZZHAABREADING',
	},
	longCount: {
		formatted: '12.18.16.13.4',
		baktun: 12,
		katun: 18,
		tun: 16,
		winal: 13,
		kin: 4,
		daysSinceEpoch: 1863624,
		julianDayNumber: 2447907,
	},
	calendarRound: '13 Kʼan 2 Muwan',
	lordOfNight: { label: 'G3', reading: 'ZZLORDREADING' },
	yearBearer: {
		daySign: 'ik',
		daySignName: 'Ikʼ',
		number: 4,
		reading: 'ZZBEARERREADING',
	},
	cross: [
		{
			position: 'center',
			offsetDays: 0,
			daySign: 'kan',
			daySignName: 'Kʼan',
			daySignKiche: 'KʼAT',
			number: 13,
			reading: 'ZZCROSSCENTER',
		},
		{
			position: 'conception',
			offsetDays: -8,
			daySign: 'kib',
			daySignName: 'Kibʼ',
			daySignKiche: 'AJMAQ',
			number: 5,
			reading: 'ZZCROSSCONCEPTION',
		},
		{
			position: 'right',
			offsetDays: -6,
			daySign: 'etznab',
			daySignName: 'Etzʼnabʼ',
			daySignKiche: 'TIJAX',
			number: 7,
			reading: 'ZZCROSSRIGHT',
		},
	],
	summary: 'ZZSUMMARY',
	conventions: { correlation: 'gmt-584283', yearBearerSystem: 'classic' },
};

describe('the day sign carries all three of its spellings', () => {
	/**
	 * A reader arrives holding one of the three: the standard Maya spelling, the sixteenth century
	 * form printed reference tables use, or the highland form a daykeeper works in. Showing one and
	 * dropping the others makes the card unreconcilable with whichever book the reader already has.
	 */
	test('the standard, classic and highland forms all render', async () => {
		const el = await mount(TZOLKIN);
		const body = text(el);
		for (const spelling of [
			TZOLKIN.daySignName,
			TZOLKIN.daySignClassic,
			TZOLKIN.daySignKiche,
		]) {
			expect(body).toContain(spelling);
		}
	});

	/** A Tzolkin day is a number and a sign together; neither half names the day on its own. */
	test('the coefficient is drawn beside the sign', async () => {
		const el = await mount(TZOLKIN);
		const header = root(el).querySelector('[part~="header"]');
		expect(header?.querySelector('.coefficient')?.textContent?.trim()).toBe(
			String(TZOLKIN.number),
		);
		expect(header?.querySelector('.title')?.textContent?.trim()).toBe(
			TZOLKIN.daySignName,
		);
	});

	/**
	 * Only nine of the thirteen coefficients carry a recorded character, and the word names that
	 * character rather than the coefficient, which is the numeral in the hero. Labelling it
	 * `Coefficient` reads as though the coefficient itself were the adjective, so the two are asserted
	 * apart: the band label is its own string and it is NOT the one the reading section carries.
	 */
	test('the band is labelled as the character of the number, not as the coefficient', async () => {
		const el = await mount(TZOLKIN, { lang: 'zz' });
		const facts = root(el).querySelector('[part~="details"]');
		expect(facts?.textContent).toContain('ZZCHARACTER');
		expect(facts?.querySelector('.band')?.textContent?.trim()).toBe(
			'ZZVIOLENT',
		);
		expect(facts?.textContent).not.toContain('ZZCOEFFICIENT');
		// The reading behind the disclosure is the one thing on the card the
		// coefficient itself names.
		const readings = [...root(el).querySelectorAll('[part~="readings"]')]
			.map((n) => n.textContent)
			.join('');
		expect(readings).toContain('ZZCOEFFICIENT');
	});

	/** An unbanded coefficient carries no recorded character, so the card states none rather than a blank. */
	test('a coefficient the sources leave unbanded prints no character at all', async () => {
		const el = await mount({
			...TZOLKIN,
			number: 5,
			reading: { ...TZOLKIN.reading, numberBand: undefined },
		});
		expect(root(el).querySelector('.band')).toBeNull();
		expect(root(el).querySelector('.coefficient')?.textContent?.trim()).toBe(
			'5',
		);
	});

	test('the trecena and the sign it opens on are named', async () => {
		const el = await mount(TZOLKIN);
		const body = text(el);
		expect(body).toContain(String(TZOLKIN.trecena.number));
		expect(body).toContain(TZOLKIN.trecena.rulingSignName);
	});

	/** The correlation decides every value in the response, so it prints as the identifier a caller stores. */
	test('the correlation prints as the identifier the response gives', async () => {
		const el = await mount(TZOLKIN);
		expect(text(el)).toContain('gmt-584283');
	});
});

describe('the attribute says which read was asked for', () => {
	test('the day read draws no second calendar, even when handed the fuller payload', async () => {
		const el = await mount(CHART, { mode: 'day' });
		const body = text(el);
		expect(body).toContain(CHART.tzolkin.daySignName);
		expect(body).not.toContain(CHART.haab.monthName);
		expect(body).not.toContain(CHART.longCount.formatted);
		expect(body).not.toContain('ZZSUMMARY');
	});

	test('the chart read draws both calendars, the year bearer and the cross', async () => {
		const el = await mount(CHART, { mode: 'chart' });
		const body = text(el);
		expect(body).toContain(CHART.haab.monthName);
		expect(body).toContain(CHART.longCount.formatted);
		expect(body).toContain(CHART.calendarRound);
		expect(body).toContain(CHART.yearBearer.daySignName);
		expect(body).toContain(CHART.lordOfNight.label);
		expect(body).toContain('ZZSUMMARY');
	});

	/** The day sign half reads the SHAPE, so a nested payload still renders the sign correctly. */
	test('the day sign reads through the nesting in either mode', async () => {
		for (const mode of ['day', 'chart']) {
			const el = await mount(CHART, { mode });
			expect(text(el), mode).toContain(CHART.tzolkin.daySignName);
		}
	});
});

describe('the four-fold cross', () => {
	/**
	 * Each arm is named by its POSITION in the response rather than by where it sits in the array, so
	 * a response that listed the arms in another order would still label each one correctly.
	 */
	test('each arm is labelled from its position, not from its row order', async () => {
		const el = await mount(CHART, { mode: 'chart' });
		const rows = [...root(el).querySelectorAll('[part~="cross"] tbody tr')];
		expect(rows.length).toBe(CHART.cross.length);
		const labels = rows.map((r) => r.querySelector('td')?.textContent?.trim());
		expect(labels).toEqual(['Center', 'Conception arm', 'Right arm']);
	});

	test('every arm names its own day sign and its distance in days', async () => {
		const el = await mount(CHART, { mode: 'chart' });
		const body = text(el);
		for (const arm of CHART.cross) {
			expect(body).toContain(arm.daySignName);
			expect(body).toContain(String(arm.offsetDays));
		}
	});
});

describe('hide-readings', () => {
	test('both calendars stay and every sentence goes', async () => {
		const el = await mount(CHART, { mode: 'chart', 'hide-readings': '' });
		const body = text(el);
		for (const kept of [
			CHART.tzolkin.daySignName,
			CHART.haab.monthName,
			CHART.longCount.formatted,
			CHART.calendarRound,
			'gmt-584283',
		]) {
			expect(body, `hide-readings removed ${kept}, which is a date`).toContain(
				kept,
			);
		}
		for (const gone of [
			'ZZKEYNOTE',
			'ZZGUIDANCE',
			'ZZSTRENGTH',
			'ZZCHALLENGE',
			'ZZSUMMARY',
			'ZZCROSSCENTER',
			'ZZHAABREADING',
		]) {
			expect(body, `hide-readings kept ${gone}, which is prose`).not.toContain(
				gone,
			);
		}
	});
});
