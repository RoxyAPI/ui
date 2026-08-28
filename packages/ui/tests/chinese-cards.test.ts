import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	tag: string,
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement(tag);
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';

const animal = (id: string, name: string, chinese: string) => ({
	id,
	name,
	chinese,
	pinyin: id,
	branch: id,
	element: 'Fire',
	elementLocalized: 'Fire',
	polarity: 'yang',
});

// ---------------------------------------------------------------- luck pillars

const LUCK = {
	birthData: { date: '1990-01-15', time: '14:30:00', timezone: -5 },
	conventions: {
		dayBoundary: 'split-zi',
		yearBoundary: 'li-chun',
		hourClock: 'clock',
	},
	gender: 'male',
	direction: 'forward',
	startAge: 7,
	startAgeMonths: 4,
	daysToTerm: 22,
	boundaryTerm: 'Beginning of Spring',
	luckPillars: [
		{
			index: 0,
			id: 'wu-yin',
			number: 15,
			stem: {
				id: 'wu',
				chinese: '戊',
				pinyin: 'wu',
				element: 'Earth',
				polarity: 'yang',
			},
			branch: {
				id: 'yin',
				chinese: '寅',
				pinyin: 'yin',
				animal: 'tiger',
				element: 'Wood',
				polarity: 'yang',
			},
			tenGod: {
				id: 'indirect-resource',
				name: 'Indirect Resource',
				chinese: '偏印',
				pinyin: 'pian yin',
				category: 'resource',
				keynote: 'ZZKEYNOTE',
			},
			startAge: 7,
			endAge: 17,
			startYear: 1997,
			endYear: 2007,
		},
		{
			index: 1,
			id: 'ji-mao',
			number: 16,
			stem: {
				id: 'ji',
				chinese: '己',
				pinyin: 'ji',
				element: 'Earth',
				polarity: 'yin',
			},
			branch: {
				id: 'mao',
				chinese: '卯',
				pinyin: 'mao',
				animal: 'rabbit',
				element: 'Wood',
				polarity: 'yin',
			},
			tenGod: {
				id: 'direct-resource',
				name: 'Direct Resource',
				chinese: '正印',
				pinyin: 'zheng yin',
				category: 'resource',
				keynote: 'ZZKEYNOTE',
			},
			startAge: 17,
			endAge: 27,
			startYear: 2007,
			endYear: 2017,
		},
	],
	annualPillars: [
		{
			year: 2026,
			id: 'bing-wu',
			number: 43,
			tenGod: {
				id: 'seven-killings',
				name: 'Seven Killings',
				chinese: '七殺',
				pinyin: 'qi sha',
				category: 'influence',
				keynote: 'ZZKEYNOTE',
			},
			luckPillarIndex: 1,
		},
	],
	summary: 'ZZREADINGSUMMARY',
};

describe('luck pillars', () => {
	test('the pillars render in the order they are lived, with their ages and years', async () => {
		const el = await mount('roxy-luck-pillars', LUCK);
		const strip = [...root(el).querySelectorAll('[part~="pillar"]')];
		expect(strip.length).toBe(2);
		expect(strip[0]?.textContent).toContain('7');
		expect(strip[0]?.textContent).toContain('1997');
		expect(strip[1]?.textContent).toContain('2017');
		// Later pillars follow earlier ones in the DOM, which is what makes the
		// strip a sequence rather than a set.
		expect(
			(strip[0] as Element).compareDocumentPosition(strip[1] as Node) &
				Node.DOCUMENT_POSITION_FOLLOWING,
		).toBeTruthy();
	});

	/**
	 * A pillar is the stem read over the branch, exactly as in the natal chart card. Getting the
	 * two the wrong way round passes every count and every text assertion.
	 */
	test('the stem is drawn above the branch in every pillar', async () => {
		const el = await mount('roxy-luck-pillars', LUCK);
		for (const p of root(el).querySelectorAll('[part~="pillar"]')) {
			const chars = [...p.querySelectorAll('.hanzi')];
			expect(chars.length).toBe(2);
			expect(chars[1]?.classList.contains('hanzi-branch')).toBe(true);
		}
	});

	/**
	 * Two people born days apart can enter their first pillar years apart, so the direction and the
	 * start age are what make one strip reconcilable against another.
	 */
	test('the direction, the start age and the term it was counted to all print', async () => {
		const el = await mount('roxy-luck-pillars', LUCK);
		const body = text(el);
		expect(body).toContain('forward');
		expect(body).toContain('7y 4m');
		expect(body).toContain('Beginning of Spring');
		expect(body).toContain('li-chun');
	});

	test('hide-readings keeps the strip and the annual pillars and drops the summary', async () => {
		const el = await mount('roxy-luck-pillars', LUCK, { 'hide-readings': '' });
		expect(root(el).querySelectorAll('[part~="pillar"]').length).toBe(2);
		const body = text(el);
		expect(body).toContain('2026');
		expect(body).toContain('Seven Killings');
		expect(body).not.toContain('ZZREADINGSUMMARY');
	});
});

// ----------------------------------------------------------------- zodiac card

const SIGN = {
	date: '1990-01-15',
	animal: animal('snake', 'Snake', '巳'),
	yearPillar: { id: 'ji-si', number: 6, stem: 'ji', branch: 'si' },
	element: 'Earth',
	polarity: 'yin',
	interpretation: 'ZZREADINGINTERPRETATION',
	conventions: { yearBoundary: 'li-chun' },
};

const ANIMAL = {
	...animal('horse', 'Horse', '午'),
	traits: ['ZZTRAIT'],
	summary: 'ZZREADINGSUMMARY',
	strengths: ['ZZSTRENGTH'],
	weaknesses: ['ZZWEAKNESS'],
	compatibilitySummary: 'ZZREADINGCOMPAT',
	hours: { start: 11, end: 13 },
	trine: {
		id: 'second',
		number: 2,
		element: 'Fire',
		chinese: '火',
		pinyin: 'huo',
		members: ['tiger', 'horse', 'dog'],
		theme: 'ZZTHEME',
	},
	secretFriend: animal('goat', 'Goat', '未'),
	clashPartner: animal('rat', 'Rat', '子'),
	harmPartner: animal('ox', 'Ox', '丑'),
	elementVariants: [],
};

const DAILY = {
	animal: animal('horse', 'Horse', '午'),
	date: '2026-08-29',
	dayPillar: {
		id: 'jia-zi',
		number: 1,
		stem: 'jia',
		branch: 'zi',
		animal: 'rat',
		element: 'Wood',
	},
	relationship: 'clash',
	energyRating: 4,
	overview: 'ZZREADINGOVERVIEW',
	love: 'ZZREADINGLOVE',
	career: 'ZZREADINGCAREER',
	advice: 'ZZREADINGADVICE',
	year: {
		pillar: 'bing-wu',
		animal: 'horse',
		relationship: 'same',
		note: 'ZZREADINGNOTE',
	},
	benMingNian: true,
};

const COMPAT = {
	signs: {
		first: animal('horse', 'Horse', '午'),
		second: animal('tiger', 'Tiger', '寅'),
	},
	relationship: 'trine',
	relationshipName: 'Trine',
	relationshipChinese: '三合',
	relationshipPinyin: 'san he',
	score: 92,
	verdict: 'excellent',
	sharedElement: 'Fire',
	summary: 'ZZREADINGSUMMARY',
	strengths: ['ZZSTRENGTH'],
	frictions: ['ZZFRICTION'],
	advice: 'ZZREADINGADVICE',
};

describe('the zodiac card', () => {
	test('the animal leads in hanzi, with its name and pillar under it', async () => {
		const el = await mount('roxy-zodiac-card', SIGN, { mode: 'sign' });
		expect(root(el).querySelector('.hanzi')?.textContent?.trim()).toBe('巳');
		expect(root(el).querySelector('.title')?.textContent?.trim()).toBe('Snake');
		expect(text(el)).toContain('ji');
	});

	/**
	 * The animal a date falls in depends on which boundary starts the Chinese year, and the two
	 * rules disagree for a birth in the weeks between them. A card that hides which one produced
	 * its answer cannot be checked against the almanac a reader already owns.
	 */
	test('the year boundary that decided the animal is printed', async () => {
		const el = await mount('roxy-zodiac-card', SIGN, { mode: 'sign' });
		expect(text(el)).toContain('li-chun');
	});

	test('the reference read names all three partner animals, never a subset', async () => {
		const el = await mount('roxy-zodiac-card', ANIMAL, { mode: 'animal' });
		const roles = [
			...root(el).querySelectorAll('[part~="partners"] .role'),
		].map((r) => r.textContent?.trim());
		expect(roles).toEqual(['Secret friend', 'Clash', 'Harm']);
		expect(text(el)).toContain('11:00');
	});

	test('the daily read shows its day relationship and flags the year of its own animal', async () => {
		const el = await mount('roxy-zodiac-card', DAILY, { mode: 'daily' });
		const body = text(el);
		expect(body).toContain('clash');
		expect(body).toContain('Ben Ming Nian');
		expect(body).toContain('ZZREADINGLOVE');
	});

	test('a pair renders its score and the named relationship between them', async () => {
		const el = await mount('roxy-zodiac-card', COMPAT, {
			mode: 'compatibility',
		});
		const body = text(el);
		expect(body).toContain('92');
		expect(body).toContain('Trine');
		expect(body).toContain('三合');
		expect(
			root(el).querySelector('.score-fill')?.getAttribute('style'),
		).toContain('92%');
	});

	test('hide-readings keeps every structural fact on all four modes', async () => {
		const cases: Array<[unknown, string, string[], string[]]> = [
			[SIGN, 'sign', ['Snake', 'li-chun'], ['ZZREADINGINTERPRETATION']],
			[
				ANIMAL,
				'animal',
				['Secret friend', 'Goat'],
				['ZZREADINGSUMMARY', 'ZZTRAIT', 'ZZSTRENGTH'],
			],
			[
				DAILY,
				'daily',
				['clash', 'Ben Ming Nian'],
				['ZZREADINGOVERVIEW', 'ZZREADINGLOVE', 'ZZREADINGNOTE'],
			],
			[
				COMPAT,
				'compatibility',
				['92', 'Trine'],
				['ZZREADINGSUMMARY', 'ZZFRICTION', 'ZZREADINGADVICE'],
			],
		];
		for (const [data, mode, kept, gone] of cases) {
			const el = await mount('roxy-zodiac-card', data, {
				mode,
				'hide-readings': '',
			});
			const body = text(el);
			for (const k of kept) expect(body, `${mode} lost ${k}`).toContain(k);
			for (const g of gone) expect(body, `${mode} kept ${g}`).not.toContain(g);
		}
	});
});

// ---------------------------------------------------------------- almanac card

const DAY = {
	date: '2026-08-29',
	lunar: {
		year: 2026,
		month: 7,
		day: 18,
		isLeapMonth: false,
		monthLength: 30,
		date: '2026-07-18',
	},
	yearPillar: {
		id: 'bing-wu',
		number: 43,
		stem: 'bing',
		branch: 'wu',
		chinese: '丙午',
		naYin: 'Water at the Sky River',
		naYinElement: 'Water',
	},
	monthPillar: {
		id: 'bing-shen',
		number: 33,
		stem: 'bing',
		branch: 'shen',
		chinese: '丙申',
		naYin: 'Fire at the Hill',
		naYinElement: 'Fire',
	},
	dayPillar: {
		id: 'jia-zi',
		number: 1,
		stem: 'jia',
		branch: 'zi',
		chinese: '甲子',
		naYin: 'Metal in the Sea',
		naYinElement: 'Metal',
	},
	dayOfficer: {
		id: 'open',
		name: 'Open',
		chinese: '開',
		pinyin: 'kai',
		quality: 'auspicious',
		meaning: 'ZZREADINGOFFICER',
	},
	mansion: {
		number: 4,
		name: 'Room',
		chinese: '房',
		pinyin: 'fang',
		palace: 'Azure Dragon',
		planet: 'Sun',
		animal: 'rabbit',
	},
	clashAnimal: 'horse',
	favours: ['wedding', 'travel', 'opening a business', 'signing', 'moving'],
	avoids: ['burial', 'litigation'],
};

const MONTH = {
	year: 2026,
	month: 8,
	total: 2,
	solarTerms: [
		{
			id: 'chu-shu',
			name: 'End of Heat',
			type: 'minor',
			date: '2026-08-23',
			instantUtc: '2026-08-23T02:00:00Z',
		},
	],
	days: [DAY, { ...DAY, date: '2026-08-30', favours: ['travel'] }],
};

const AUSPICIOUS = {
	activity: 'wedding',
	activityLabel: 'Wedding',
	startDate: '2026-09-01',
	endDate: '2026-10-31',
	daysSearched: 61,
	avoidAnimal: 'horse',
	total: 1,
	days: [DAY],
};

describe('the almanac card', () => {
	test('a day leads with what it favours and what it avoids', async () => {
		const el = await mount('roxy-almanac-day', DAY, { mode: 'day' });
		const body = text(el);
		expect(body).toContain('Favours');
		expect(body).toContain('wedding');
		expect(body).toContain('Avoids');
		expect(body).toContain('burial');
	});

	/** Every activity, never the first few: a trimmed list quietly drops the one a reader wanted. */
	test('every favoured activity renders, in a day card and in a row', async () => {
		const card = await mount('roxy-almanac-day', DAY, { mode: 'day' });
		expect(root(card).querySelectorAll('.chips-favour span').length).toBe(
			DAY.favours.length,
		);
		const month = await mount('roxy-almanac-day', MONTH, { mode: 'month' });
		const firstRow = root(month).querySelector('.day');
		expect(firstRow?.querySelectorAll('.chips-favour span').length).toBe(
			DAY.favours.length,
		);
	});

	test('the clash animal and the day officer are never dropped', async () => {
		const el = await mount('roxy-almanac-day', DAY, { mode: 'day' });
		const body = text(el);
		expect(body).toContain('horse');
		expect(body).toContain('Open');
		expect(
			root(el).querySelector('.tag')?.classList.contains('tag-auspicious'),
		).toBe(true);
	});

	test('a month renders one row per day plus the solar terms it turns on', async () => {
		const el = await mount('roxy-almanac-day', MONTH, { mode: 'month' });
		expect(root(el).querySelectorAll('.day').length).toBe(2);
		expect(text(el)).toContain('End of Heat');
	});

	test('a search names the activity it searched for and the animal it avoided', async () => {
		const el = await mount('roxy-almanac-day', AUSPICIOUS, {
			mode: 'auspicious',
		});
		const body = text(el);
		expect(body).toContain('Wedding');
		expect(body).toContain('Avoiding');
		expect(root(el).querySelectorAll('.day').length).toBe(1);
	});

	test('hide-readings keeps the lookup and drops only the officer meaning', async () => {
		const el = await mount('roxy-almanac-day', DAY, {
			mode: 'day',
			'hide-readings': '',
		});
		const body = text(el);
		for (const kept of ['wedding', 'burial', 'horse', 'Open', '甲子', 'Room']) {
			expect(body, `hide-readings removed ${kept}`).toContain(kept);
		}
		expect(body).not.toContain('ZZREADINGOFFICER');
	});
});
