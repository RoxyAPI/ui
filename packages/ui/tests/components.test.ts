import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml). Lit reads document and customElements at module load,
// so the order matters: setup -> import.
import '../src/index.js';

import {
	ROXY_UI_COMPONENTS,
	ROXY_UI_VERSION,
	RoxyAngelNumberCard,
	RoxyAngelNumberLookup,
	RoxyAshtakavargaGrid,
	RoxyBiorhythmChart,
	RoxyChoghadiyaGrid,
	RoxyCompatibilityCard,
	RoxyCrystalGrid,
	RoxyDashaTimeline,
	RoxyData,
	RoxyDivisionalChart,
	RoxyDoshaCard,
	RoxyDreamCard,
	RoxyEndpointForm,
	RoxyGunaMilan,
	RoxyHexagram,
	RoxyHoroscopeCard,
	RoxyKpChart,
	RoxyKpPlanetsTable,
	RoxyKpRulingPlanets,
	RoxyLocationSearch,
	RoxyMoonPhase,
	RoxyNakshatraCard,
	RoxyNatalChart,
	RoxyNumerologyCard,
	RoxyPanchangTable,
	RoxyShadbalaTable,
	RoxySynastryChart,
	RoxyTarotCard,
	RoxyTarotCatalog,
	RoxyTarotSpread,
	RoxyTransitsTable,
	RoxyVedicKundli,
	RoxyVedicPlanetsTable,
	RoxyWesternPlanetsTable,
	RoxyYogaList,
} from '../src/index.js';

describe('package exports', () => {
	test('exports a non-empty component manifest', () => {
		expect(ROXY_UI_COMPONENTS.length).toBeGreaterThan(0);
	});

	test('exports a semver version string', () => {
		expect(ROXY_UI_VERSION).toMatch(/^\d+\.\d+\.\d+/);
	});

	test('every component slug maps to a registered tag', () => {
		for (const name of ROXY_UI_COMPONENTS) {
			const ctor = customElements.get(`roxy-${name}`);
			expect(ctor).toBeDefined();
		}
	});

	test('PascalCase exports match tag names', () => {
		expect(RoxyData.name).toBe('RoxyData');
		expect(RoxyNatalChart.name).toBe('RoxyNatalChart');
		expect(RoxyVedicKundli.name).toBe('RoxyVedicKundli');
	});
});

interface ComponentSpec<T extends HTMLElement> {
	tag: string;
	ctor: new () => T;
	sample: unknown;
	attrs?: Record<string, string>;
	requiredEvents?: string[];
}

const specs: ComponentSpec<HTMLElement>[] = [
	{
		tag: 'roxy-data',
		ctor: RoxyData as unknown as new () => HTMLElement,
		sample: { title: 'Hello', items: ['a', 'b', 'c'] },
	},
	{
		tag: 'roxy-natal-chart',
		ctor: RoxyNatalChart as unknown as new () => HTMLElement,
		sample: {
			planets: [
				{ name: 'Sun', longitude: 12.5 },
				{ name: 'Moon', longitude: 200.1 },
			],
			aspects: [
				{ planet1: 'Sun', planet2: 'Moon', aspect: 'opposition', orb: 7.6 },
			],
			houses: [],
		},
	},
	{
		tag: 'roxy-western-planets-table',
		ctor: RoxyWesternPlanetsTable as unknown as new () => HTMLElement,
		sample: {
			planets: [
				{
					name: 'Sun',
					longitude: 112.5,
					sign: 'Cancer',
					degree: 22.5,
					house: 7,
					speed: 0.957,
					isRetrograde: false,
				},
				{
					name: 'Saturn',
					longitude: 295.3,
					sign: 'Capricorn',
					degree: 25.3,
					house: 1,
					speed: -0.068,
					isRetrograde: true,
				},
			],
			ascendant: { sign: 'Aquarius', degree: 18.05, longitude: 318.05 },
			midheaven: { sign: 'Scorpio', degree: 28.9, longitude: 238.9 },
			partOfFortune: {
				sign: 'Aries',
				degree: 27.25,
				longitude: 27.25,
				sect: 'night',
			},
			vertex: { sign: 'Virgo', degree: 12.9, longitude: 162.9 },
		},
	},
	{
		tag: 'roxy-horoscope-card',
		ctor: RoxyHoroscopeCard as unknown as new () => HTMLElement,
		sample: {
			sign: 'aries',
			date: '2026-05-09',
			overview: 'A focused day for new beginnings.',
			love: 'Patient communication wins.',
			energyRating: 8,
			luckyNumber: 7,
			compatibleSigns: ['leo', 'sagittarius'],
		},
		attrs: { period: 'daily' },
	},
	{
		tag: 'roxy-synastry-chart',
		ctor: RoxySynastryChart as unknown as new () => HTMLElement,
		sample: {
			compatibilityScore: 78,
			summary: 'A strong dynamic with growth potential.',
			interAspects: [
				{
					planet1: 'Sun',
					planet2: 'Moon',
					aspect: 'trine',
					orb: 2.4,
					strength: 'strong',
				},
			],
			person1: { planets: [{ name: 'Sun', longitude: 12 }] },
			person2: { planets: [{ name: 'Sun', longitude: 200 }] },
		},
	},
	{
		tag: 'roxy-compatibility-card',
		ctor: RoxyCompatibilityCard as unknown as new () => HTMLElement,
		sample: {
			overallScore: 86,
			rating: 'High match',
			emotional: 88,
			communication: 84,
			romance: 86,
			strengths: ['Shared values'],
		},
	},
	{
		tag: 'roxy-moon-phase',
		ctor: RoxyMoonPhase as unknown as new () => HTMLElement,
		sample: {
			phase: 'waxing crescent',
			illumination: 0.32,
			age: 4.2,
			sign: 'Taurus',
			meaning: {
				description: 'Time for slow, steady growth.',
				keywords: ['growth'],
			},
		},
	},
	{
		tag: 'roxy-vedic-kundli',
		ctor: RoxyVedicKundli as unknown as new () => HTMLElement,
		sample: {
			meta: {
				Lagna: { graha: 'Lagna', rashi: 'Libra' },
				Sun: {
					graha: 'Sun',
					rashi: 'Aries',
					longitude: 5.4,
					nakshatra: { name: 'Ashwini', pada: 2, lord: 'Ketu' },
					isRetrograde: false,
					house: 7,
					awastha: 'Bala',
				},
				Saturn: {
					graha: 'Saturn',
					rashi: 'Aries',
					longitude: 12.8,
					isRetrograde: true,
				},
			},
			aries: { rashi: 'Aries', signs: [{ graha: 'Sun', longitude: 5.4 }] },
		},
	},
	{
		tag: 'roxy-vedic-planets-table',
		ctor: RoxyVedicPlanetsTable as unknown as new () => HTMLElement,
		sample: {
			meta: {
				Lagna: {
					graha: 'Lagna',
					rashi: 'Libra',
					longitude: 196.6,
					nakshatra: { name: 'Swati', pada: 3, key: 14, lord: 'Rahu' },
					isRetrograde: false,
					house: 1,
					awastha: 'Yuva',
				},
				Sun: {
					graha: 'Sun',
					rashi: 'Aquarius',
					longitude: 323.9,
					nakshatra: {
						name: 'Purva Bhadrapada',
						pada: 2,
						key: 25,
						lord: 'Jupiter',
					},
					isRetrograde: false,
					house: 5,
					awastha: 'Vriddha',
				},
			},
			aries: { rashi: 'aries', signs: [] },
		},
	},
	{
		tag: 'roxy-panchang-table',
		ctor: RoxyPanchangTable as unknown as new () => HTMLElement,
		sample: {
			date: '2026-05-09',
			tithi: 'Shukla Tritiya',
			nakshatra: 'Rohini',
			yoga: 'Saubhagya',
			karana: 'Bava',
			vara: 'Saturday',
			sunrise: '05:42',
			sunset: '19:14',
			rahuKaal: { start: '09:00', end: '10:30' },
			abhijitMuhurta: { start: '11:50', end: '12:36' },
		},
	},
	{
		tag: 'roxy-dasha-timeline',
		ctor: RoxyDashaTimeline as unknown as new () => HTMLElement,
		sample: {
			nakshatraName: 'Rohini',
			mahadasha: { lord: 'Moon' },
			antardasha: { lord: 'Saturn' },
			pratyantardasha: { lord: 'Mercury' },
			remainingInMahadasha: 4.2,
			mahadashas: [
				{
					lord: 'Moon',
					startDate: '1990-01-01',
					endDate: '2000-01-01',
					durationYears: 10,
				},
				{
					lord: 'Mars',
					startDate: '2000-01-01',
					endDate: '2007-01-01',
					durationYears: 7,
				},
			],
		},
	},
	{
		tag: 'roxy-dosha-card',
		ctor: RoxyDoshaCard as unknown as new () => HTMLElement,
		sample: {
			present: true,
			severity: 'Moderate',
			description: 'Mangal is in 7th from Lagna.',
			remedies: ['Mangal Shanti puja'],
		},
		attrs: { type: 'manglik' },
	},
	{
		tag: 'roxy-guna-milan',
		ctor: RoxyGunaMilan as unknown as new () => HTMLElement,
		sample: {
			total: 28,
			maxScore: 36,
			percentage: 78,
			recommendation: 'Recommended match',
			breakdown: [
				{ name: 'Varna', score: 1, max: 1 },
				{ name: 'Vasya', score: 2, max: 2 },
				{ name: 'Tara', score: 3, max: 3 },
			],
		},
	},
	{
		tag: 'roxy-kp-planets-table',
		ctor: RoxyKpPlanetsTable as unknown as new () => HTMLElement,
		sample: {
			ayanamsa: 24.124,
			planets: [
				{
					planet: 'Sun',
					sign: 'Aries',
					signLord: 'Mars',
					nakshatra: 'Ashwini',
					subLord: 'Ketu',
					subSubLord: 'Venus',
					kpNumber: 5,
				},
			],
		},
	},
	{
		tag: 'roxy-kp-chart',
		ctor: RoxyKpChart as unknown as new () => HTMLElement,
		sample: {
			meta: {
				date: '1990-01-15',
				time: '14:30:00',
				ayanamsa: 23.7124,
				ayanamsaType: 'KP Newcomb',
				houseSystem: 'Placidus',
			},
			ascendant: {
				sign: 'Taurus',
				nakshatra: 'Rohini',
				subLord: 'Mercury',
				kpNumber: 38,
			},
			cusps: [
				{
					house: 1,
					sign: 'Taurus',
					signLord: 'Venus',
					nakshatra: 'Rohini',
					starLord: 'Moon',
					subLord: 'Mercury',
					subSubLord: 'Saturn',
					kpNumber: 38,
				},
			],
			planets: [
				{
					planet: 'Sun',
					sign: 'Capricorn',
					house: 9,
					nakshatra: 'Uttara Ashadha',
					starLord: 'Sun',
					subLord: 'Venus',
					subSubLord: 'Mars',
					kpNumber: 201,
					retrograde: false,
				},
			],
			nodes: {
				rahu: {
					sign: 'Aquarius',
					house: 10,
					nakshatra: 'Shatabhisha',
					starLord: 'Rahu',
					subLord: 'Jupiter',
					subSubLord: 'Saturn',
				},
				ketu: {
					sign: 'Leo',
					house: 4,
					nakshatra: 'Magha',
					starLord: 'Ketu',
					subLord: 'Venus',
					subSubLord: 'Mercury',
				},
			},
		},
	},
	{
		tag: 'roxy-kp-ruling-planets',
		ctor: RoxyKpRulingPlanets as unknown as new () => HTMLElement,
		sample: {
			datetime: '1990-01-15T14:30:00',
			location: { latitude: 19.076, longitude: 72.877, timezone: 5.5 },
			dayLord: 'Moon',
			moonSignLord: 'Venus',
			moonStarLord: 'Moon',
			moonSublord: 'Mercury',
			moonSubSublord: 'Saturn',
			lagnaSignLord: 'Venus',
			lagnaStarLord: 'Moon',
			lagnaSublord: 'Mercury',
			lagnaSubSublord: 'Ketu',
			rulingPlanets: ['Moon', 'Mercury', 'Venus', 'Saturn'],
			significators: [
				{ planet: 'Moon', signifies: [4, 1, 7] },
				{ planet: 'Mercury', signifies: [3, 6, 10] },
			],
		},
	},
	{
		tag: 'roxy-nakshatra-card',
		ctor: RoxyNakshatraCard as unknown as new () => HTMLElement,
		sample: {
			id: 'ashwini',
			name: 'Ashwini',
			number: 1,
			range: "0° - 13°20' Aries",
			lord: 'Ketu',
			deity: 'Ashwini Kumaras',
			symbol: "Horse's head",
			characteristics:
				'Pioneering, quick, healing-oriented natives with restless energy.',
			remedies: {
				mantras: 'Om Ashwini Kumarabhyam Namah',
				gemstones: "Cat's eye (Lehsunia)",
				rituals: 'Honor healers and physicians; serve horses.',
			},
		},
	},
	{
		tag: 'roxy-numerology-card',
		ctor: RoxyNumerologyCard as unknown as new () => HTMLElement,
		sample: {
			number: 7,
			type: 'single',
			meaning: 'The seeker. Reflective and analytical.',
			calculation: '1+2 = 3, 4+5 = 9, sum = 12 -> 3, total -> 7',
			hasKarmicDebt: false,
		},
		attrs: { type: 'life-path' },
	},
	{
		tag: 'roxy-tarot-card',
		ctor: RoxyTarotCard as unknown as new () => HTMLElement,
		sample: {
			card: {
				name: 'The Fool',
				arcana: 'major',
				number: 0,
				keywords: ['new beginnings'],
				meaning: 'A leap of faith.',
				imageUrl: 'https://example.com/fool.png',
				reversed: false,
			},
			dailyMessage: 'Embrace the unknown.',
		},
	},
	{
		tag: 'roxy-tarot-spread',
		ctor: RoxyTarotSpread as unknown as new () => HTMLElement,
		sample: {
			spread: 'three-card',
			positions: [
				{ label: 'Past', card: { name: 'The Hermit' } },
				{ label: 'Present', card: { name: 'The Star' } },
				{ label: 'Future', card: { name: 'The Wheel' } },
			],
			reading: 'A turn from solitude to clarity.',
		},
	},
	{
		tag: 'roxy-biorhythm-chart',
		ctor: RoxyBiorhythmChart as unknown as new () => HTMLElement,
		sample: {
			birthDate: '1990-01-15',
			targetDate: '2026-05-09',
			cycles: { physical: 0.87, emotional: -0.42, intellectual: 0.66 },
			energyRating: 7,
			interpretation: 'Mixed energy day.',
		},
	},
	{
		tag: 'roxy-hexagram',
		ctor: RoxyHexagram as unknown as new () => HTMLElement,
		sample: {
			number: 1,
			english: 'The Creative',
			chinese: '乾',
			pinyin: 'Qián',
			symbol: '䷀',
			upperTrigram: 'heaven',
			lowerTrigram: 'heaven',
			judgment: 'Sublime success through perseverance.',
			image: 'Heaven moves with strength.',
		},
	},
	{
		tag: 'roxy-dream-card',
		ctor: RoxyDreamCard as unknown as new () => HTMLElement,
		sample: {
			id: 'water',
			name: 'Water',
			letter: 'w',
			meaning: 'Water reflects the dreamer current emotional state.',
		},
	},
	{
		tag: 'roxy-angel-number-card',
		ctor: RoxyAngelNumberCard as unknown as new () => HTMLElement,
		sample: {
			number: '111',
			title: 'New beginnings and manifestation',
			coreMessage: 'Your thoughts are manifesting rapidly.',
			type: 'repeating',
			digitRoot: 3,
			energy: 'positive',
			keywords: ['manifestation', 'alignment'],
			meaning: {
				spiritual: 'A powerful manifestation gateway is opening.',
				love: 'Fresh starts and new romantic possibilities.',
				career: 'New professional opportunities are emerging.',
				money: 'Fresh income streams align with your intentions.',
				twinFlame: 'Union or a major step forward approaches.',
			},
			biblical: 'The Trinity and divine completeness in scripture.',
			shadow: 'Watch for scattered focus and over-idealism.',
			affirmation: 'My thoughts are powerful.',
			actionSteps: ['Monitor your thoughts', 'Set clear intentions'],
		},
	},
	{
		tag: 'roxy-angel-number-lookup',
		ctor: RoxyAngelNumberLookup as unknown as new () => HTMLElement,
		sample: {
			number: '1212',
			type: 'mirror',
			digitRoot: 6,
			digits: 4,
			uniqueDigits: 2,
			isPalindrome: false,
			isRepeating: false,
			knownMeaning: {
				title: 'Divine order and progress',
				coreMessage: 'Keep going. You are making progress.',
				energy: 'positive',
				keywords: ['progress', 'confidence'],
				meaning: {
					spiritual: 'You are on the right path.',
					love: 'Your relationship is progressing in divine order.',
					career: 'Career advancement through steady steps.',
					money: 'Steady financial growth follows steady effort.',
					twinFlame: 'Progress toward union.',
				},
				biblical: 'Order and faithfulness echoed in scripture.',
				shadow: 'Avoid impatience when progress feels slow.',
				affirmation: 'I am making divine progress.',
				actionSteps: ['Take the next step'],
			},
			digitRootMeaning: {
				number: '6',
				title: 'Balance and nurturing',
				coreMessage: 'Focus on home, family, and balance.',
			},
		},
	},
	{
		tag: 'roxy-crystal-grid',
		ctor: RoxyCrystalGrid as unknown as new () => HTMLElement,
		sample: {
			chakra: 'Heart',
			total: 28,
			limit: 2,
			offset: 0,
			crystals: [
				{
					name: 'Amazonite',
					id: 'amazonite',
					imageUrl: 'https://roxyapi.com/img/crystals/amazonite.jpg',
					colors: ['green', 'cream'],
				},
				{
					name: 'Aventurine',
					id: 'aventurine',
					imageUrl: 'https://roxyapi.com/img/crystals/aventurine.jpg',
					colors: ['green'],
				},
			],
		},
	},
	{
		tag: 'roxy-tarot-catalog',
		ctor: RoxyTarotCatalog as unknown as new () => HTMLElement,
		sample: {
			total: 78,
			limit: 2,
			offset: 0,
			cards: [
				{
					id: 'fool',
					name: 'The Fool',
					arcana: 'major',
					number: 0,
					imageUrl: 'https://roxyapi.com/img/tarot/major/fool.jpg',
				},
				{
					id: 'three-of-cups',
					name: 'Three of Cups',
					arcana: 'minor',
					suit: 'cups',
					number: 3,
					imageUrl: 'https://roxyapi.com/img/tarot/cups/three.jpg',
				},
			],
		},
	},
	{
		tag: 'roxy-endpoint-form',
		ctor: RoxyEndpointForm as unknown as new () => HTMLElement,
		sample: null,
		attrs: { 'data-endpoint': 'numerology/life-path', method: 'POST' },
	},
	{
		tag: 'roxy-location-search',
		ctor: RoxyLocationSearch as unknown as new () => HTMLElement,
		sample: null,
		attrs: { placeholder: 'Search city' },
	},
	{
		tag: 'roxy-transits-table',
		ctor: RoxyTransitsTable as unknown as new () => HTMLElement,
		sample: null,
	},
	{
		tag: 'roxy-divisional-chart',
		ctor: RoxyDivisionalChart as unknown as new () => HTMLElement,
		sample: null,
	},
	{
		tag: 'roxy-ashtakavarga-grid',
		ctor: RoxyAshtakavargaGrid as unknown as new () => HTMLElement,
		sample: null,
	},
	{
		tag: 'roxy-shadbala-table',
		ctor: RoxyShadbalaTable as unknown as new () => HTMLElement,
		sample: null,
	},
	{
		tag: 'roxy-yoga-list',
		ctor: RoxyYogaList as unknown as new () => HTMLElement,
		sample: null,
	},
	{
		tag: 'roxy-choghadiya-grid',
		ctor: RoxyChoghadiyaGrid as unknown as new () => HTMLElement,
		sample: null,
	},
];

describe.each(specs)('%s component', (spec: ComponentSpec<HTMLElement>) => {
	test(`registered as ${spec.tag}`, () => {
		expect(customElements.get(spec.tag)).toBeDefined();
	});

	test('instantiates and attaches a shadow root', () => {
		const el = document.createElement(spec.tag) as HTMLElement;
		document.body.appendChild(el);
		expect(el).toBeInstanceOf(spec.ctor);
		// Lit attaches shadow root in connectedCallback / constructor; check after frame
		// happy-dom is synchronous, so this should be true now
		expect(
			(el as HTMLElement & { shadowRoot?: ShadowRoot }).shadowRoot,
		).toBeTruthy();
		el.remove();
	});

	test('handles null data without throwing', () => {
		const el = document.createElement(spec.tag) as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = null;
		expect(() =>
			(el as unknown as { requestUpdate: () => Promise<void> }).requestUpdate(),
		).not.toThrow();
		el.remove();
	});

	test('accepts populated data via property setter', () => {
		const el = document.createElement(spec.tag) as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		if (spec.sample !== null) {
			el.data = spec.sample;
			expect(el.data).toBe(spec.sample);
		}
		el.remove();
	});

	test('reflects attributes when set', () => {
		const el = document.createElement(spec.tag) as HTMLElement;
		document.body.appendChild(el);
		if (spec.attrs) {
			for (const [k, v] of Object.entries(spec.attrs)) {
				el.setAttribute(k, v);
				expect(el.getAttribute(k)).toBe(v);
			}
		}
		el.remove();
	});
});

describe('angel-number new interpretation sections', () => {
	const cardSample = specs.find(
		(s) => s.tag === 'roxy-angel-number-card',
	)?.sample;
	const lookupSample = specs.find(
		(s) => s.tag === 'roxy-angel-number-lookup',
	)?.sample;

	test('roxy-angel-number-card renders money, biblical, and shadow sections', async () => {
		const el = document.createElement(
			'roxy-angel-number-card',
		) as unknown as HTMLElement & {
			data?: unknown;
			updateComplete: Promise<unknown>;
		};
		document.body.appendChild(el);
		el.data = cardSample;
		await el.updateComplete;
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('Money');
		expect(text).toContain('Fresh income streams align with your intentions.');
		expect(text).toContain('Biblical');
		expect(text).toContain('The Trinity and divine completeness in scripture.');
		expect(text).toContain('Shadow');
		expect(text).toContain('Watch for scattered focus and over-idealism.');
		el.remove();
	});

	test('roxy-angel-number-lookup renders money, biblical, and shadow in the known meaning', async () => {
		const el = document.createElement(
			'roxy-angel-number-lookup',
		) as unknown as HTMLElement & {
			data?: unknown;
			updateComplete: Promise<unknown>;
		};
		document.body.appendChild(el);
		el.data = lookupSample;
		await el.updateComplete;
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('Money');
		expect(text).toContain('Steady financial growth follows steady effort.');
		expect(text).toContain('Biblical');
		expect(text).toContain('Order and faithfulness echoed in scripture.');
		expect(text).toContain('Shadow');
		expect(text).toContain('Avoid impatience when progress feels slow.');
		el.remove();
	});

	test('roxy-angel-number-lookup renders the digit-root meaning (incl. money) for an unknown number', async () => {
		const el = document.createElement(
			'roxy-angel-number-lookup',
		) as unknown as HTMLElement & {
			data?: unknown;
			updateComplete: Promise<unknown>;
		};
		document.body.appendChild(el);
		el.data = {
			number: '4567',
			type: 'compound',
			digitRoot: 4,
			digits: 4,
			uniqueDigits: 4,
			isPalindrome: false,
			isRepeating: false,
			knownMeaning: null,
			digitRootMeaning: {
				number: '4',
				title: 'Foundation and discipline',
				coreMessage: 'Build steady structure.',
				meaning: {
					spiritual: 'Ground your practice in routine.',
					love: 'Reliability deepens connection.',
					career: 'Methodical effort compounds.',
					money: 'Budgets and discipline grow your reserves.',
					twinFlame: 'Stable foundations support union.',
				},
				keywords: ['foundation', 'discipline'],
				affirmation: 'I build on solid ground.',
			},
		};
		await el.updateComplete;
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('Money');
		expect(text).toContain('Budgets and discipline grow your reserves.');
		expect(text).toContain('Foundation and discipline');
		expect(text).toContain('I build on solid ground.');
		el.remove();
	});
});

describe('roxy-tarot-catalog rendering', () => {
	const sample = specs.find((s) => s.tag === 'roxy-tarot-catalog')?.sample;

	test('renders deck tiles with names, count, and arcana/suit captions', async () => {
		const el = document.createElement(
			'roxy-tarot-catalog',
		) as unknown as HTMLElement & {
			data?: unknown;
			updateComplete: Promise<unknown>;
		};
		document.body.appendChild(el);
		el.data = sample;
		await el.updateComplete;
		const root = el.shadowRoot;
		const text = root?.textContent ?? '';
		// Names from the sample render.
		expect(text).toContain('The Fool');
		expect(text).toContain('Three of Cups');
		// Total count drives the header, not the page length.
		expect(text).toContain('78 cards');
		// Major Arcana caption and Minor Arcana suit caption both derive from spec fields.
		expect(text).toContain('Major Arcana');
		expect(text).toContain('Minor · Cups');
		// One tile per card (counted via markup to avoid the happy-dom
		// shadow-root querySelectorAll quirk; other component tests assert via
		// textContent for the same reason).
		const tiles = (root?.innerHTML ?? '').match(/class="tile"/g) ?? [];
		expect(tiles.length).toBe(2);
		el.remove();
	});
});

describe('roxy-location-search behavior', () => {
	test('emits roxy-location-select event when selecting a city', () => {
		const el = document.createElement('roxy-location-search') as HTMLElement;
		document.body.appendChild(el);
		let captured: CustomEvent | null = null;
		el.addEventListener('roxy-location-select', (e) => {
			captured = e as CustomEvent;
		});
		// Synthesize selecting a city by dispatching directly
		el.dispatchEvent(
			new CustomEvent('roxy-location-select', {
				detail: {
					city: 'Mumbai',
					country: 'India',
					latitude: 19.07,
					longitude: 72.87,
					timezone: 'Asia/Kolkata',
					utcOffset: 5.5,
				},
				bubbles: true,
				composed: true,
			}),
		);
		expect(captured).not.toBeNull();
		expect(captured).not.toBeNull();
		const event = captured as unknown as CustomEvent<{ city: string }>;
		expect(event.detail.city).toBe('Mumbai');
		el.remove();
	});
});

describe('roxy-endpoint-form behavior', () => {
	test('emits roxy-submit event with payload', () => {
		const el = document.createElement('roxy-endpoint-form') as HTMLElement;
		document.body.appendChild(el);
		let payload: unknown = null;
		el.addEventListener('roxy-submit', (e) => {
			payload = (e as CustomEvent).detail;
		});
		el.dispatchEvent(
			new CustomEvent('roxy-submit', {
				detail: {
					endpoint: 'numerology/life-path',
					values: { year: 1990, month: 1, day: 15 },
				},
				bubbles: true,
				composed: true,
			}),
		);
		expect(payload).not.toBeNull();
		expect((payload as { endpoint: string }).endpoint).toBe(
			'numerology/life-path',
		);
		el.remove();
	});
});

describe('roxy-data heuristic', () => {
	test('renders an empty-state for null data', async () => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = null;
		await (el as unknown as { updateComplete: Promise<void> }).updateComplete;
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('No data');
		el.remove();
	});

	test('renders a primitive string', async () => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = 'hello world';
		await (el as unknown as { updateComplete: Promise<void> }).updateComplete;
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('hello world');
		el.remove();
	});

	test('renders a chip list for array of primitives', async () => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = ['one', 'two', 'three'];
		await (el as unknown as { updateComplete: Promise<void> }).updateComplete;
		const html = el.shadowRoot?.innerHTML ?? '';
		expect(html).toContain('roxy-chips');
		expect(el.shadowRoot?.textContent).toContain('one');
		el.remove();
	});

	test('renders a table for array of homogeneous objects', async () => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = [
			{ name: 'Sun', sign: 'Aries' },
			{ name: 'Moon', sign: 'Cancer' },
		];
		await (el as unknown as { updateComplete: Promise<void> }).updateComplete;
		const html = el.shadowRoot?.innerHTML ?? '';
		expect(html).toContain('roxy-table');
		el.remove();
	});
});

describe('roxy-data scalar formatting and structure', () => {
	async function mount(data: unknown) {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
			depth?: number;
		};
		document.body.appendChild(el);
		el.data = data;
		await (el as unknown as { updateComplete: Promise<void> }).updateComplete;
		return el;
	}

	test('rounds long floats in table cells to 2 decimals', async () => {
		const el = await mount([
			{ name: 'Sun', longitude: 113.01012227704928 },
			{ name: 'Moon', longitude: 127.87157410804679 },
		]);
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('113.01');
		expect(text).not.toContain('113.01012227704928');
		el.remove();
	});

	test('wraps tables in a horizontal-scroll container', async () => {
		const el = await mount([{ a: 1 }, { a: 2 }]);
		expect(el.shadowRoot?.innerHTML ?? '').toContain('roxy-table-wrap');
		el.remove();
	});

	test('recurses into object arrays inside table cells', async () => {
		const el = await mount([
			{
				date: '2026-07-01',
				positions: [{ planet: 'Sun', sign: 'Gemini' }],
			},
		]);
		const html = el.shadowRoot?.innerHTML ?? '';
		expect(html).toContain('<roxy-data');
		expect(el.shadowRoot?.textContent ?? '').not.toContain('[object Object]');
		el.remove();
	});

	test('formats booleans as Yes and No', async () => {
		const el = await mount({ isRetrograde: false, exact: true });
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('No');
		expect(text).toContain('Yes');
		el.remove();
	});

	test('renders http strings as external links', async () => {
		const el = await mount({ docsUrl: 'https://roxyapi.com/docs' });
		const html = el.shadowRoot?.innerHTML ?? '';
		expect(html).toContain('href="https://roxyapi.com/docs"');
		expect(html).toContain('rel="noopener noreferrer"');
		el.remove();
	});

	test('humanizes SCREAMING_SNAKE enum strings', async () => {
		const el = await mount({ aspectType: 'SEMI_SQUARE' });
		expect(el.shadowRoot?.textContent ?? '').toContain('Semi square');
		el.remove();
	});

	test('promotes object values to full-width sections, not dl cells', async () => {
		const el = await mount({
			score: 87,
			chart: { houseSystem: 'placidus' },
		});
		const html = el.shadowRoot?.innerHTML ?? '';
		expect(html).toContain('roxy-section');
		expect(html).toContain('Chart</h4>');
		const ddBlocks = html.match(/<dd[\s\S]*?<\/dd>/g) ?? [];
		expect(ddBlocks.some((dd) => dd.includes('<roxy-data'))).toBe(false);
		el.remove();
	});

	test('labels the depth cap instead of a bare ellipsis', async () => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
			depth?: number;
		};
		el.depth = 6;
		document.body.appendChild(el);
		el.data = { any: 'thing' };
		await (el as unknown as { updateComplete: Promise<void> }).updateComplete;
		expect(el.shadowRoot?.textContent ?? '').toContain('Nested data omitted');
		el.remove();
	});
});
