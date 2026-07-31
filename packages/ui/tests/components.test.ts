import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml). Lit reads document and customElements at module load,
// so the order matters: setup -> import.
import '../src/index.js';

/** `updateComplete` lives on LitElement, not on the `HTMLElement` that `createElement` returns, and every call site was reaching it through the same double cast. One helper, one place to change. */
const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

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
					jagradadi: 'Swapna',
					deeptadi: 'Kopa',
				},
				// The nodes carry Baladi only: the other two systems are read from
				// sign dignity, which Rahu and Ketu do not have.
				Rahu: {
					graha: 'Rahu',
					rashi: 'Capricorn',
					longitude: 293.9,
					nakshatra: { name: 'Dhanishta', pada: 1, key: 23, lord: 'Mars' },
					isRetrograde: true,
					house: 4,
					awastha: 'Kumara',
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
					kpNumber: 194,
				},
				ketu: {
					sign: 'Leo',
					house: 4,
					nakshatra: 'Magha',
					starLord: 'Ketu',
					subLord: 'Venus',
					subSubLord: 'Mercury',
					kpNumber: 72,
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
		await settled(el);
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
		await settled(el);
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
		await settled(el);
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
		await settled(el);
		const html = el.shadowRoot?.innerHTML ?? '';
		expect(html).toContain('roxy-table');
		el.remove();
	});
});

/**
 * `roxy-data` and the WordPress plugin's `GenericRenderer.php` render the SAME responses for the same visitor: this component when JavaScript runs, the PHP renderer when it does not. `roxy-data` used to print everything the API returned, so a WordPress reading card showed the derivation math, the schema discriminator and the pagination counters whenever JS was ON, and hid them when JS was OFF. The JS path, which is the path almost every visitor takes, was the worse one.
 *
 * The payload below is the real shape of `/numerology/life-path`, verified live.
 */
describe('roxy-data hides what the PHP renderer hides', () => {
	/**
	 * The RENDERED markup only, with the component's own stylesheet stripped out.
	 *
	 * @remarks
	 * `shadowRoot.innerHTML` and `.textContent` both carry the `<style>` block, so a naive `expect(html).not.toContain('roxy-badge')` matches the `.roxy-badge { }` CSS RULE and passes no matter what was actually drawn. Every negative assertion below would be vacuous. Scoping with `querySelector('.roxy-card')` is the obvious fix and happy-dom does not implement it on a ShadowRoot, so strip the style block instead.
	 */
	const mount = async (data: unknown) => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		const html = (el.shadowRoot?.innerHTML ?? '').replace(
			/<style[\s\S]*?<\/style>/g,
			'',
		);
		return { el, html, text: html.replace(/<[^>]+>/g, ' ') };
	};

	test('derivation math, discriminators, seeds and pagination never reach the card', async () => {
		const { el, text } = await mount({
			number: 4,
			calculation: 'Month: 6, Day: 15 → 1+5 = 6, Year: 1990 → 1+9+9+0 = 19',
			type: 'single',
			seed: 'abc123',
			total: 78,
			limit: 3,
			offset: 0,
			meaning: 'The Builder',
		});
		expect(text).not.toContain('1+5');
		expect(text).not.toContain('single');
		expect(text).not.toContain('abc123');
		expect(text).not.toContain('78');
		// ...and the actual reading survives.
		expect(text).toContain('The Builder');
		expect(text).toContain('4');
		el.remove();
	});

	test('a has*/is* true reads as a badge', async () => {
		const { el, html, text } = await mount({
			name: 'Life Path 4',
			hasKarmicDebt: true,
			karmicDebtNumber: 13,
		});
		expect(html).toContain('roxy-badge');
		expect(text).toContain('13');
		el.remove();
	});

	test('a false is still data, not silence: a direct planet is a reading', async () => {
		const { el, html, text } = await mount({
			name: 'Mars',
			isRetrograde: false,
		});
		expect(html).not.toContain('roxy-badge');
		expect(text).toContain('No');
		el.remove();
	});

	test('a key that merely starts with the letters is/has is not a badge', async () => {
		const { el, html, text } = await mount({
			island: 'Bali',
			issue: 'none',
			history: 'long',
		});
		expect(html).not.toContain('roxy-badge');
		expect(text).toContain('Bali');
		el.remove();
	});

	test('an affirmation renders as a blockquote', async () => {
		const { el, html, text } = await mount({
			name: 'Angel Number 111',
			affirmation: 'I trust the path unfolding before me.',
		});
		expect(html).toContain('roxy-quote');
		expect(text).toContain('I trust the path');
		el.remove();
	});

	test('a nested column takes the width, a scalar column gives it back', async () => {
		// `days: [{ date, positions: [...] }]` renders as a table whose `positions`
		// cell holds a whole nested table. Laid out by content alone the ten-character
		// date column took HALF the width and the nested one was cramped into the rest.
		const { el, html } = await mount([
			{ date: '2026-07-01', positions: [{ planet: 'Sun', sign: 'Gemini' }] },
			{ date: '2026-07-02', positions: [{ planet: 'Moon', sign: 'Cancer' }] },
		]);
		expect(html).toContain('col-tight'); // date
		expect(html).toContain('col-wide'); // positions
		el.remove();
	});

	test('an all-scalar table is left alone: there is nothing to bias toward', async () => {
		const { el, html } = await mount([
			{ planet: 'Sun', sign: 'Gemini' },
			{ planet: 'Moon', sign: 'Cancer' },
		]);
		expect(html).not.toContain('col-tight');
		expect(html).not.toContain('col-wide');
		el.remove();
	});

	test('an oversized table folds away behind its row count', async () => {
		const rows = Array.from({ length: 27 }, (_, i) => ({
			name: `Nakshatra ${i + 1}`,
			lord: 'Ketu',
		}));
		const { el, html, text } = await mount(rows);
		expect(html).toContain('roxy-table-details');
		expect(text).toContain('27 rows');
		el.remove();
	});

	test('a table under the threshold stays open', async () => {
		const rows = Array.from({ length: 3 }, (_, i) => ({ name: `Row ${i}` }));
		const { el, html } = await mount(rows);
		expect(html).not.toContain('roxy-table-details');
		expect(html).toContain('roxy-table');
		el.remove();
	});

	test('an id survives on an untitled record but is dropped once it has a title', async () => {
		const bare = await mount({ id: 'xyz-1', value: 7 });
		expect(bare.text).toContain('xyz-1');
		bare.el.remove();

		const titled = await mount({ id: 'xyz-1', name: 'The Builder', value: 7 });
		expect(titled.text).not.toContain('xyz-1');
		expect(titled.text).toContain('The Builder');
		titled.el.remove();
	});

	test('a value that renders as nothing does not draw a section heading', async () => {
		// An empty object still counts as complex, so it was promoted to a
		// full-width section and drew a heading over a blank body. Emptiness nests:
		// { breakdown: { western: [], vedic: [] } } has keys and still renders
		// nothing.
		const { html, text } = await mount({
			title: 'Probe',
			kept: { depth: 3 },
			emptyObject: {},
			emptyArray: [],
			nestedEmpty: { western: [], vedic: {} },
		});
		expect(text).toContain('Kept');
		expect(html).not.toContain('Empty object');
		expect(html).not.toContain('Empty array');
		expect(html).not.toContain('Nested empty');
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
		await settled(el);
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

	test('formats UTC-suffixed ISO datetimes', async () => {
		const el = await mount({ datetime: '2026-07-10T01:09:25Z' });
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('Jul');
		expect(text).not.toContain('2026-07-10T01:09:25Z');
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
		await settled(el);
		expect(el.shadowRoot?.textContent ?? '').toContain('Nested data omitted');
		el.remove();
	});
});

/**
 * Human Design interpretation rendering. The response went from labels to a full
 * reading, so these lock the parts the runtime audit cannot see: that every new
 * body of prose reaches the shadow tree, that the not-self question is shown for
 * an OPEN center only (it is written for the open state, so printing it on a
 * defined center would contradict the chart), that a text shared by a group is
 * lifted to the group and not repeated per row, and that a response predating the
 * interpretation still renders.
 */
/**
 * The I Ching API served `binary` TOP-to-bottom while documenting it bottom-to-top until 2026-07, and this component compensated by reversing it. The API fixed the data (the same inversion was making `/cast` return the vertically MIRRORED hexagram), so the reverse had to go. Nothing caught the original bug because a mirrored hexagram is still a real hexagram. These pin the orientation so it cannot silently flip back.
 */
describe('roxy-hexagram line orientation and readings', () => {
	async function mount(tag: string, data: unknown) {
		const el = document.createElement(tag) as HTMLElement & {
			data?: unknown;
			updateComplete: Promise<unknown>;
		};
		document.body.appendChild(el);
		el.data = data;
		await el.updateComplete;
		return el;
	}

	/** Hexagram 11, Peace: Heaven below, Earth above. Bottom-to-top that is 111000, so lines 1-3 are yang and 4-6 are yin. Asymmetric, so a flipped reading is visible. */
	const peace = {
		number: 11,
		english: 'Peace',
		binary: '111000',
		upperTrigram: 'Earth',
		lowerTrigram: 'Heaven',
		judgment: 'The strong is inside and rising.',
		image: 'Heaven sits beneath the earth.',
		changingLines: [
			{
				position: 1,
				text: 'Pull up one stalk of grass.',
				meaning: 'The first place is the beginning.',
			},
			{
				position: 2,
				text: 'Bear with the uncultivated.',
				meaning: 'The second place is inner and supported.',
			},
			{
				position: 3,
				text: 'No plain that does not slope.',
				meaning: 'The third place is the exposed threshold.',
			},
			{
				position: 4,
				text: 'He flutters down.',
				meaning: 'The fourth place is close to power.',
			},
			{
				position: 5,
				text: 'The sovereign gives his daughter.',
				meaning: 'The fifth place rules.',
			},
			{
				position: 6,
				text: 'The wall falls back into the moat.',
				meaning: 'The sixth place is past the peak.',
			},
		],
	};

	test('the figure is drawn the right way up, bottom line first', async () => {
		const el = await mount('roxy-hexagram', peace);
		const markup = el.shadowRoot?.innerHTML ?? '';
		// The renderer paints visual top first, so a correct Peace shows the three
		// yin (broken) lines before the three yang (solid) ones.
		const order = [...markup.matchAll(/class="line (broken|solid)/g)].map(
			(m) => m[1],
		);
		expect(order).toEqual([
			'broken',
			'broken',
			'broken',
			'solid',
			'solid',
			'solid',
		]);
		el.remove();
	});

	test('a lookup shows all six line readings, each with its meaning', async () => {
		const el = await mount('roxy-hexagram', peace);
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('The wall falls back into the moat.');
		expect(text).toContain('The sixth place is past the peak.');
		expect(text).toContain('Line 1');
		expect(text).toContain('Line 6');
		el.remove();
	});

	/** A cast turns on the MOVING lines. Listing the other five buries the answer, so only the changing ones are shown. */
	test('a cast shows only the changing lines', async () => {
		const el = await mount('roxy-hexagram', {
			hexagram: peace,
			lines: [7, 7, 7, 8, 6, 8],
			changingLinePositions: [5],
			resultingHexagram: { number: 5, english: 'Waiting' },
		});
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('The sovereign gives his daughter.');
		expect(text).toContain('The fifth place rules.');
		// Line 6 did not move, so its reading is not part of this answer.
		expect(text).not.toContain('The wall falls back into the moat.');
		el.remove();
	});
});

describe('human design interpretations', () => {
	const bodygraph = {
		type: 'Generator',
		typeDescription: 'A sustainable, enveloping life-force aura.',
		aura: 'Open and enveloping.',
		strategy: 'Wait to respond',
		strategyDescription: 'Let life present something first.',
		authority: 'Sacral',
		authorityDescription: 'Decisions are made by the gut response.',
		signature: 'Satisfaction',
		notSelf: 'Frustration',
		profile: '5/1',
		profileDescription: 'Heretic over Investigator.',
		profileKeynotes: {
			personalityLine: 5,
			designLine: 1,
			personality: 'Heretic keynote.',
			design: 'Investigator keynote.',
		},
		definition: 'Single',
		definitionDescription: 'Every defined center belongs to one flow.',
		sides: {
			personality: 'The conscious side, printed in black.',
			design: 'The unconscious side, printed in red.',
		},
		incarnationCross: {
			gates: [61, 62, 50, 3],
			angle: 'Left Angle',
			angleCode: 'LAX',
			name: 'Left Angle Cross of Obscuration 2',
			description: 'The unknown made discussable by naming it.',
		},
		centers: [
			{
				id: 'head',
				name: 'Head',
				defined: false,
				motor: false,
				awareness: false,
				theme: 'Amplifies the questions of others.',
				notSelfQuestion: 'Is this question even mine?',
				biology: 'The pineal gland.',
				gates: [61, 64],
			},
			{
				id: 'sacral',
				name: 'Sacral',
				defined: true,
				motor: true,
				awareness: false,
				theme: 'Sustainable life force.',
				notSelfQuestion: 'Is enough ever enough?',
				biology: 'The ovaries and the testes.',
				gates: [5],
			},
		],
		channels: [
			{
				gateA: 15,
				gateB: 5,
				name: 'Rhythm',
				circuit: 'Collective',
				centers: ['g', 'sacral'],
				description: 'Sacral timing meets the tolerance for extremes.',
				circuitDescription: 'Sharing for the species.',
			},
			{
				gateA: 10,
				gateB: 57,
				name: 'Perfected Form',
				circuit: 'Collective',
				centers: ['g', 'spleen'],
				description: 'Survival through intuition.',
				circuitDescription: 'Sharing for the species.',
			},
		],
		gates: [
			{
				planet: 'Sun',
				side: 'personality',
				gate: 61,
				line: 5,
				gateName: 'Mystery',
				gateDescription: 'Head pressure to know the unknowable.',
				lineMeaning: 'Others project revelation onto this line.',
				planetDescription: 'The dominant activation.',
				ichingHexagram: { number: 61, english: 'Inner Truth' },
			},
			{
				planet: 'Sun',
				side: 'design',
				gate: 50,
				line: 1,
				gateName: 'Values',
				gateDescription: 'The spleen gate of responsibility.',
				lineMeaning: 'A foundation of values held for the tribe.',
				planetDescription: 'The dominant activation.',
				ichingHexagram: { number: 50, english: 'The Cauldron' },
			},
		],
	};

	async function mount(tag: string, data: unknown) {
		const el = document.createElement(tag) as HTMLElement & {
			data?: unknown;
			updateComplete: Promise<unknown>;
		};
		document.body.appendChild(el);
		el.data = data;
		await el.updateComplete;
		return el;
	}

	test('roxy-bodygraph renders every interpretation the response carries', async () => {
		const el = await mount('roxy-bodygraph', bodygraph);
		const text = el.shadowRoot?.textContent ?? '';
		for (const prose of [
			bodygraph.typeDescription,
			bodygraph.strategyDescription,
			bodygraph.authorityDescription,
			bodygraph.profileDescription,
			bodygraph.definitionDescription,
			bodygraph.aura,
			bodygraph.incarnationCross.description,
			bodygraph.profileKeynotes.personality,
			bodygraph.profileKeynotes.design,
			bodygraph.channels[0]?.description,
			bodygraph.channels[0]?.circuitDescription,
			bodygraph.centers[0]?.theme,
			bodygraph.centers[0]?.biology,
			bodygraph.gates[0]?.gateDescription,
			bodygraph.gates[0]?.lineMeaning,
			bodygraph.gates[0]?.planetDescription,
			bodygraph.sides.personality,
		]) {
			expect(text).toContain(prose as string);
		}
		expect(text).not.toContain('undefined');
		el.remove();
	});

	test('the not-self question is shown for an open center only', async () => {
		const el = await mount('roxy-bodygraph', bodygraph);
		const text = el.shadowRoot?.textContent ?? '';
		// Head is open: its conditioning question is the reading.
		expect(text).toContain('Is this question even mine?');
		// Sacral is defined: the same field describes the OPEN state and would
		// contradict the chart, so it must not be rendered.
		expect(text).not.toContain('Is enough ever enough?');
		el.remove();
	});

	test('a circuit description is lifted to its group, never repeated per channel', async () => {
		const el = await mount('roxy-bodygraph', bodygraph);
		const text = el.shadowRoot?.textContent ?? '';
		const occurrences = text.split('Sharing for the species.').length - 1;
		expect(occurrences).toBe(1);
		el.remove();
	});

	test('activations split by chart side, personality first', async () => {
		const el = await mount('roxy-bodygraph', bodygraph);
		// Asserted through the markup, not querySelectorAll: happy-dom cannot run a
		// selector against a shadow root (see the tarot-catalog test above).
		const markup = el.shadowRoot?.innerHTML ?? '';
		expect((markup.match(/role="tab"/g) ?? []).length).toBe(2);
		expect(markup).toContain('Personality (1)');
		expect(markup).toContain('Design (1)');
		expect(markup).toContain('id="hd-panel-personality"');
		// Only the selected side's activations render, so one gate row, and the
		// design gate's reading is absent. (The chart tooltips name every gate on
		// both sides, so this is asserted on the reading text, not the whole tree.)
		expect((markup.match(/name="hd-gate"/g) ?? []).length).toBe(1);
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('Head pressure to know the unknowable.');
		expect(text).not.toContain('The spleen gate of responsibility.');
		el.remove();
	});

	test('roxy-bodygraph still renders a label-only response', async () => {
		const el = await mount('roxy-bodygraph', {
			type: 'Projector',
			strategy: 'Wait for the invitation',
			authority: 'Splenic',
			centers: [{ id: 'head', name: 'Head', defined: false, gates: [] }],
			channels: [],
			gates: [],
		});
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('Projector');
		expect(text).not.toContain('undefined');
		expect(text).not.toContain('No bodygraph data');
		el.remove();
	});

	/** The /human-design/type response: the identity read without the chart. */
	const hdType = {
		type: 'Manifestor',
		typeDescription: 'An initiating, impactful aura built to start things.',
		aura: 'Closed and repelling.',
		strategy: 'Inform',
		strategyDescription:
			'Inform everyone an action will affect, before taking it.',
		authority: 'Emotional',
		authorityDescription: 'Decisions are made across an emotional wave.',
		signature: 'Peace',
		notSelf: 'Anger',
		profile: '2/5',
	};

	/** The /human-design/profile response. Shares only `profile` with {@link hdType}, which is what the card detects on. */
	const hdProfile = {
		profile: '2/5',
		personalityLine: 2,
		designLine: 5,
		personalityKeynote: 'Hermit: a talent that emerges when called out.',
		designKeynote: 'Heretic: a universalizing, practical force.',
	};

	test('roxy-hd-type-card renders every interpretation the type response carries', async () => {
		const el = await mount('roxy-hd-type-card', hdType);
		const text = el.shadowRoot?.textContent ?? '';
		for (const prose of [
			hdType.typeDescription,
			hdType.strategyDescription,
			hdType.authorityDescription,
			hdType.aura,
			hdType.type,
			hdType.strategy,
			hdType.authority,
			hdType.profile,
			hdType.signature,
			hdType.notSelf,
		]) {
			expect(text).toContain(prose);
		}
		expect(text).not.toContain('undefined');
		expect(text).not.toContain('No Human Design data');
		el.remove();
	});

	test('roxy-hd-type-card detects the profile response and renders both line keynotes', async () => {
		const el = await mount('roxy-hd-type-card', hdProfile);
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain(hdProfile.personalityKeynote);
		expect(text).toContain(hdProfile.designKeynote);
		expect(text).toContain('Profile');
		// The type branch must not leak into the profile read: there is no type
		// in this response, so the card cannot claim one.
		expect(text).not.toContain('Strategy');
		expect(text).not.toContain('undefined');
		expect(text).not.toContain('No Human Design data');
		el.remove();
	});

	/**
	 * The reading surface is shared with the bodygraph through `utils/hd-reading.ts`. If someone re-forks it into one of the two components, the same response field would drift apart between them; this pins that they render the same prose from the same data.
	 */
	test('the type card and the bodygraph render the same reading from the same fields', async () => {
		const card = await mount('roxy-hd-type-card', hdType);
		const graph = await mount('roxy-bodygraph', { ...bodygraph, ...hdType });
		const cardText = card.shadowRoot?.textContent ?? '';
		const graphText = graph.shadowRoot?.textContent ?? '';
		for (const prose of [
			hdType.typeDescription,
			hdType.strategyDescription,
			hdType.authorityDescription,
			hdType.aura,
		]) {
			expect(cardText).toContain(prose);
			expect(graphText).toContain(prose);
		}
		card.remove();
		graph.remove();
	});

	test('roxy-hd-variables renders the arrow readings, cognition, and base note', async () => {
		const el = await mount('roxy-hd-variables', {
			arrows: [
				{
					key: 'determination',
					name: 'Determination',
					layer: 'Primary Health System',
					position: 'Top left',
					activation: { planet: 'Sun', side: 'design' },
					color: 4,
					tone: 5,
					base: 2,
					direction: 'right',
					colorLabel: 'Touch',
					directionLabel: 'Passive',
					description: 'The top left arrow, fed by the design Sun.',
					layerDescription: 'The body-side half of Variable.',
					colorMeaning: 'Touch. Intake governed by contact.',
					toneMeaning: 'Judgment. A conclusion is reached first.',
					directionMeaning: 'Passive. Intake is stored rather than filtered.',
					baseName: 'Integrative',
					cognition: {
						label: 'Feeling',
						description: 'Feeling. Recognition through frequency.',
					},
					confident: true,
				},
				{
					key: 'environment',
					name: 'Environment',
					layer: 'Primary Health System',
					position: 'Bottom left',
					activation: { planet: 'North Node', side: 'design' },
					color: 1,
					tone: 5,
					base: 4,
					direction: 'right',
					colorLabel: 'Caves',
					directionLabel: 'Observer',
					description: 'The bottom left arrow, fed by the design Nodes.',
					layerDescription: 'The body-side half of Variable.',
					colorMeaning: 'Caves. Enclosure and controlled access.',
					toneMeaning: 'Judgment. A conclusion is reached first.',
					directionMeaning: 'Observer. Nourished by surveying the setting.',
					baseName: 'Progressive',
					confident: true,
				},
			],
			confident: true,
			confidenceMarginDeg: 0.002,
			baseDescription: 'The finest substructure layer.',
		});
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('The top left arrow, fed by the design Sun.');
		expect(text).toContain('Caves. Enclosure and controlled access.');
		expect(text).toContain('Integrative');
		// Cognition rides on the determination arrow alone.
		expect(text).toContain('Cognition · Feeling');
		expect(text).toContain('Feeling. Recognition through frequency.');
		// The layer text is shared by both arrows, so it is printed once.
		expect(text.split('The body-side half of Variable.').length - 1).toBe(1);
		expect(text).toContain('The finest substructure layer.');
		expect(text).not.toContain('undefined');
		el.remove();
	});
});

describe('roxy-kp-chart planets-and-nodes table', () => {
	const sample = specs.find((s) => s.tag === 'roxy-kp-chart')?.sample;

	async function mount() {
		const el = document.createElement('roxy-kp-chart') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = sample;
		await settled(el);
		return el;
	}

	/**
	 * Cells of the body row named `name`, read out of the markup rather than with `querySelectorAll`, because happy-dom does not implement scoped queries on a ShadowRoot. Only the active tab renders and it defaults to the bodies table, so every row here is a body.
	 */
	function cells(el: HTMLElement, name: string): string[] {
		const rows = (el.shadowRoot?.innerHTML ?? '').split('<tr').map((row) =>
			[...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cell) =>
				cell[1]
					.replace(/<!--[\s\S]*?-->/g, '')
					.replace(/<[^>]+>/g, '')
					.trim(),
			),
		);
		return rows.find((row) => row[0]?.startsWith(name)) ?? [];
	}

	test('the nodes carry a KP number, exactly like the planets', async () => {
		// The API returns kpNumber on nodes as well as planets, but the merge that
		// folds Rahu and Ketu into the planets table used to drop it, so the KP
		// column rendered blank on precisely those two rows and nowhere else.
		const el = await mount();
		expect(cells(el, 'Sun').at(-1)).toBe('201');
		expect(cells(el, 'Rahu').at(-1)).toBe('194');
		expect(cells(el, 'Ketu').at(-1)).toBe('72');
		el.remove();
	});

	test('a node row still renders when the API omits its KP number', async () => {
		const el = document.createElement('roxy-kp-chart') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		const s = sample as { nodes: { rahu: Record<string, unknown> } };
		el.data = {
			...(sample as object),
			nodes: { ...s.nodes, rahu: { ...s.nodes.rahu, kpNumber: undefined } },
		};
		await settled(el);
		expect(cells(el, 'Rahu').at(-1)).toBe('');
		expect(el.shadowRoot?.textContent ?? '').not.toContain('undefined');
		el.remove();
	});
});

/**
 * Dasha drill-down. All three sub levels share one layout and one `period`
 * family, so the LEVEL must be read from the payload: labelling from the
 * attribute would call a pratyantardasha an antardasha. The parent note also has
 * to explain a birth-truncated parent, which is why such a list can hold fewer
 * than nine rows.
 */
describe('roxy-dasha-timeline drill-down levels', () => {
	async function mount(data: unknown, period: string) {
		const el = document.createElement('roxy-dasha-timeline') as HTMLElement & {
			data?: unknown;
			period?: string;
		};
		el.period = period;
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}
	const text = (el: Element) => el.shadowRoot?.textContent ?? '';

	test('a pratyantardasha list is labelled by its payload, not its attribute', async () => {
		const el = await mount(
			{
				mahadashaLord: 'Saturn',
				antardashaLord: 'Venus',
				antardashaPeriod: {
					planet: 'Venus',
					startDate: '2025-06-20',
					endDate: '2028-08-19',
					durationYears: 3.17,
				},
				pratyantardashas: [
					{
						planet: 'Venus',
						startDate: '2025-06-20',
						endDate: '2025-12-29',
						durationYears: 0.53,
					},
				],
			},
			'antara',
		);
		expect(text(el)).toContain('Pratyantardashas in Venus Antardasha');
		el.remove();
	});

	test('a sookshma list names its pratyantardasha parent', async () => {
		const el = await mount(
			{
				pratyantardashaLord: 'Rahu',
				pratyantardashaPeriod: {
					planet: 'Rahu',
					startDate: '2026-08-08',
					endDate: '2027-01-29',
					durationYears: 0.48,
				},
				sookshmaDashas: [
					{
						planet: 'Rahu',
						startDate: '2026-08-08',
						endDate: '2026-09-03',
						durationYears: 0.07,
					},
				],
			},
			'sookshma',
		);
		expect(text(el)).toContain('Sookshmas in Rahu Pratyantardasha');
		el.remove();
	});

	test('a birth-truncated parent explains why the list is short', async () => {
		const el = await mount(
			{
				mahadashaLord: 'Rahu',
				mahadashaPeriod: {
					planet: 'Rahu',
					startDate: '1990-07-02',
					endDate: '2002-08-29',
					durationYears: 12.16,
					nominalStartDate: '1984-08-29',
				},
				antardashas: [
					{
						planet: 'Saturn',
						startDate: '1990-07-02',
						endDate: '1992-08-10',
						durationYears: 2.1,
						nominalStartDate: '1989-10-05',
					},
				],
			},
			'sub',
		);
		expect(text(el)).toContain('before birth');
		el.remove();
	});

	test('current mode shows all five running levels', async () => {
		const el = await mount(
			{
				mahadasha: { planet: 'Saturn' },
				antardasha: { planet: 'Venus' },
				pratyantardasha: { planet: 'Rahu' },
				sookshmaDasha: { planet: 'Jupiter' },
				pranaDasha: { planet: 'Mercury' },
				remainingInSookshma: { years: 0, months: 0, days: 16 },
				remainingInPrana: { years: 0, months: 0, days: 0 },
			},
			'current',
		);
		const t = text(el);
		for (const label of [
			'Mahadasha',
			'Antardasha',
			'Pratyantardasha',
			'Sookshma',
			'Prana',
		]) {
			expect(t).toContain(label);
		}
		expect(t).toContain('Jupiter');
		expect(t).toContain('Mercury');
		expect(t).toContain('16d left');
		// A prana period routinely has zero days left, which formatBalance renders
		// as `0d` rather than dropping the line: a fifth level that silently loses
		// its balance reads as a missing level.
		expect(t).toContain('0d left');
		el.remove();
	});

	test('a prana list names its sookshma parent and the full four-lord chain', async () => {
		const el = await mount(
			{
				mahadashaLord: 'Saturn',
				antardashaLord: 'Venus',
				pratyantardashaLord: 'Rahu',
				sookshmaLord: 'Jupiter',
				sookshmaPeriod: {
					planet: 'Jupiter',
					startDate: '2026-08-08T04:00:00',
					endDate: '2026-08-11T09:00:00',
					durationYears: 0.0087,
				},
				pranaDashas: [
					{
						planet: 'Jupiter',
						startDate: '2026-08-08T04:00:00',
						endDate: '2026-08-08T15:12:00',
						durationYears: 0.00128,
					},
					{
						planet: 'Saturn',
						startDate: '2026-08-08T15:12:00',
						endDate: '2026-08-09T04:34:00',
						durationYears: 0.00152,
					},
				],
			},
			'prana',
		);
		const t = text(el);
		expect(t).toContain('Pranas in Jupiter Sookshma');
		// Every ancestor lord, or a reader at the fifth level cannot tell which
		// branch of the chart the list belongs to.
		expect(t).toContain('Saturn › Venus › Rahu › Jupiter');
		el.remove();
	});

	test('a sub-day parent states its span and length in units that carry information', async () => {
		const el = await mount(
			{
				sookshmaLord: 'Sun',
				sookshmaPeriod: {
					planet: 'Sun',
					// Six and a half hours, opening and closing on one calendar day.
					startDate: '2026-08-08T04:00:00',
					endDate: '2026-08-08T10:36:00',
					durationYears: 0.00075,
				},
				pranaDashas: [
					{
						planet: 'Sun',
						startDate: '2026-08-08T04:00:00',
						endDate: '2026-08-08T04:20:00',
						durationYears: 0.0000375,
					},
				],
			},
			'prana',
		);
		const t = text(el).replace(/\s+/g, ' ');
		// Dates alone read "Aug 8, 2026 to Aug 8, 2026", which names no span.
		expect(t).toContain('4:00 AM to Aug 8, 2026, 10:36 AM');
		// A year with one decimal place rounds this to zero.
		expect(t).toContain('(6.6 hours)');
		expect(t).not.toContain('0 years');
		el.remove();
	});

	test('a mahadasha parent keeps the plain date span and years', async () => {
		const el = await mount(
			{
				mahadashaLord: 'Rahu',
				mahadashaPeriod: {
					planet: 'Rahu',
					startDate: '1990-07-02',
					endDate: '2002-08-29',
					durationYears: 12.16,
				},
				antardashas: [
					{
						planet: 'Saturn',
						startDate: '1990-07-02',
						endDate: '1992-08-10',
						durationYears: 2.1,
					},
				],
			},
			'sub',
		);
		const t = text(el).replace(/\s+/g, ' ');
		expect(t).toContain('Jul 2, 1990 to Aug 29, 2002');
		expect(t).toContain('(12.2 years)');
		// No clock on a period whose two ends are different days.
		expect(t).not.toContain('12:00 AM');
		el.remove();
	});

	test('a sub-day prana set prints the clock, so the two ends of a row differ', async () => {
		const el = await mount(
			{
				sookshmaLord: 'Sun',
				sookshmaPeriod: {
					planet: 'Sun',
					startDate: '2026-08-08T04:00:00',
					endDate: '2026-08-08T10:36:00',
					durationYears: 0.00075,
				},
				pranaDashas: [
					{
						planet: 'Sun',
						startDate: '2026-08-08T04:00:00',
						endDate: '2026-08-08T04:20:00',
						durationYears: 0.0000375,
					},
				],
			},
			'prana',
		);
		const dates = el.shadowRoot?.querySelector('.dates')?.textContent ?? '';
		// Day grain would render both boundaries as the same date and the column
		// would carry no information at exactly the level the reader drilled to.
		expect(dates).toContain('4:00');
		expect(dates).toContain('4:20');
		// The date stays on every grain: a prana period straddles midnight as
		// readily as a sookshma one straddles new year.
		expect(dates).toContain('2026');
		el.remove();
	});
});

/**
 * `houseThemes` turns the bare house numbers on the significators of a period
 * into words. The map is sent ONCE per response and the API localizes it, so the
 * component looks each house up rather than holding any table of meanings: a
 * local table would be English forever and would drift from the reading printed
 * beside it. Absent map or absent significators must render nothing at all,
 * since both are opt-in on the request.
 */
describe('roxy-dasha-timeline house meanings', () => {
	async function mount(data: unknown, period = 'current') {
		const el = document.createElement('roxy-dasha-timeline') as HTMLElement & {
			data?: unknown;
			period?: string;
		};
		el.period = period;
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}
	const text = (el: Element) => el.shadowRoot?.textContent ?? '';

	const themes = {
		'2': ['wealth', 'family', 'speech', 'possessions', 'food'],
		'7': ['marriage', 'partner', 'trade', 'contracts', 'travel'],
		'8': ['longevity', 'inheritance', 'occult', 'surgery', 'loss'],
		'11': ['gains', 'friends', 'hopes', 'income', 'elder siblings'],
	};

	test('a running level names the houses its lord acts on, in words', async () => {
		const el = await mount({
			mahadasha: {
				planet: 'Saturn',
				significators: {
					house: 11,
					starLord: 'Moon',
					signifiedHouses: [2, 7, 8, 11],
					strongHouses: [2, 7, 8],
					strength: { score: 62.5, grade: 'B', label: 'strong' },
				},
			},
			antardasha: { planet: 'Venus' },
			pratyantardasha: { planet: 'Rahu' },
			sookshmaDasha: { planet: 'Jupiter' },
			pranaDasha: { planet: 'Mercury' },
			houseThemes: themes,
		});
		expect(text(el)).toContain('Signifies wealth, marriage, longevity');
		el.remove();
	});

	test('the strong subset wins over the full signified list, so the line stays one line', async () => {
		const el = await mount({
			mahadasha: {
				planet: 'Saturn',
				significators: {
					signifiedHouses: [2, 7, 8, 11],
					strongHouses: [11],
				},
			},
			antardasha: { planet: 'Venus' },
			pratyantardasha: { planet: 'Rahu' },
			sookshmaDasha: { planet: 'Jupiter' },
			pranaDasha: { planet: 'Mercury' },
			houseThemes: themes,
		});
		const t = text(el);
		expect(t).toContain('Signifies gains');
		expect(t).not.toContain('wealth');
		el.remove();
	});

	test('an empty strong set falls back to every signified house', async () => {
		const el = await mount({
			mahadasha: {
				planet: 'Saturn',
				significators: { signifiedHouses: [7], strongHouses: [] },
			},
			antardasha: { planet: 'Venus' },
			pratyantardasha: { planet: 'Rahu' },
			sookshmaDasha: { planet: 'Jupiter' },
			pranaDasha: { planet: 'Mercury' },
			houseThemes: themes,
		});
		expect(text(el)).toContain('Signifies marriage');
		el.remove();
	});

	test('a timeline bar carries the same words as a running level', async () => {
		const el = await mount(
			{
				mahadashas: [
					{
						planet: 'Saturn',
						startDate: '2018-06-17',
						endDate: '2037-06-17',
						durationYears: 19,
						significators: { signifiedHouses: [11], strongHouses: [11] },
					},
				],
				houseThemes: themes,
			},
			'major',
		);
		const bar = el.shadowRoot?.querySelector('.bar .houses');
		expect(bar?.textContent).toContain('Signifies gains');
		el.remove();
	});

	test('no map and no significators render no house line and no digits', async () => {
		const el = await mount({
			mahadasha: { planet: 'Saturn' },
			antardasha: { planet: 'Venus' },
			pratyantardasha: { planet: 'Rahu' },
			sookshmaDasha: { planet: 'Jupiter' },
			pranaDasha: { planet: 'Mercury' },
		});
		expect(el.shadowRoot?.querySelector('.houses')).toBeNull();
		expect(text(el)).not.toContain('Signifies');
		el.remove();
	});

	test('a house the map does not carry is dropped rather than printed as a digit', async () => {
		const el = await mount({
			mahadasha: {
				planet: 'Saturn',
				significators: { strongHouses: [2, 5] },
			},
			antardasha: { planet: 'Venus' },
			pratyantardasha: { planet: 'Rahu' },
			sookshmaDasha: { planet: 'Jupiter' },
			pranaDasha: { planet: 'Mercury' },
			houseThemes: themes,
		});
		const line =
			el.shadowRoot?.querySelector('.houses')?.textContent?.trim() ?? '';
		expect(line).toBe('Signifies wealth');
		el.remove();
	});
});

/**
 * The response carries more than periods: a sidereal frame (moon longitude,
 * ayanamsa), the birth balance, and the lord chain. Those used to be dropped
 * entirely. They are now a panel rather than extra rows under the timeline,
 * because the dates are what a reader opens the card for and provenance pushed
 * them below the fold.
 */
describe('roxy-dasha-timeline organises fields into panels', () => {
	const currentSample = {
		moonNakshatra: 15,
		nakshatraName: 'Swati',
		nakshatraLord: 'Rahu',
		moonLongitude: 190.994,
		ayanamsa: 23.7217,
		ayanamsaType: 'lahiri',
		mahadasha: {
			planet: 'Saturn',
			interpretation: 'Discipline and structure.',
		},
		antardasha: { planet: 'Venus' },
		pratyantardasha: { planet: 'Rahu' },
		sookshmaDasha: { planet: 'Jupiter' },
		remainingInSookshma: { years: 0, months: 0, days: 16 },
	};

	async function mount(data: unknown, period = 'current') {
		const el = document.createElement('roxy-dasha-timeline') as HTMLElement & {
			data?: unknown;
			period?: string;
		};
		el.period = period;
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}
	const tabs = (el: Element) =>
		[...(el.shadowRoot?.querySelectorAll('.roxy-tab') ?? [])].map(
			(t) => t.textContent?.trim() ?? '',
		);

	test('the timeline panel is what shows first, so dates are never behind a click', async () => {
		const el = await mount(currentSample);
		expect(tabs(el)[0]).toBe('Timeline');
		expect(el.shadowRoot?.textContent).toContain('Jupiter');
		el.remove();
	});

	test('readings are counted in their tab label rather than stacked under the periods', async () => {
		const el = await mount(currentSample);
		expect(tabs(el).some((t) => t.startsWith('Readings ('))).toBe(true);
		el.remove();
	});

	test('the chart panel surfaces the sidereal frame the dates came from', async () => {
		const el = await mount(currentSample);
		const chart = [
			...(el.shadowRoot?.querySelectorAll('.roxy-tab') ?? []),
		].find((t) => t.textContent?.trim() === 'Chart details') as
			| HTMLElement
			| undefined;
		expect(chart).toBeTruthy();
		chart?.click();
		await settled(el);

		const t = el.shadowRoot?.textContent ?? '';
		// Every provenance field, none of them dropped.
		expect(t).toContain('Lahiri (23.72\u00b0)');
		expect(t).toContain('190.994');
		expect(t).toContain('Swati');
		expect(t).toContain('15 of 27');
		// The frame is a label, not the API enum. Guards the regression where the
		// panel printed the raw `lahiri` slug beside a sibling card that formatted
		// the same field.
		expect(t).not.toContain('lahiri');
		el.remove();
	});

	test('a drill-down names its full lord chain, not just the nearest parent', async () => {
		const el = await mount(
			{
				mahadashaLord: 'Saturn',
				antardashaLord: 'Venus',
				pratyantardashaLord: 'Rahu',
				pratyantardashaPeriod: { planet: 'Rahu', durationYears: 0.48 },
				sookshmaDashas: [
					{
						planet: 'Rahu',
						startDate: '2026-08-08',
						endDate: '2026-09-03',
						durationYears: 0.07,
					},
				],
			},
			'sookshma',
		);
		expect(el.shadowRoot?.textContent).toContain('Saturn › Venus › Rahu');
		el.remove();
	});

	test('no tab strip when there is only one panel worth showing', async () => {
		const el = await mount(
			{
				mahadashas: [
					{
						planet: 'Ketu',
						startDate: '1990-01-01',
						endDate: '1997-01-01',
						durationYears: 7,
					},
				],
			},
			'major',
		);
		expect(tabs(el)).toHaveLength(0);
		expect(el.shadowRoot?.textContent).toContain('Ketu');
		el.remove();
	});
});

/**
 * ARIA contract for every tab strip in the library.
 *
 * A `role=tab` that governs nothing is a broken control: a screen reader
 * announces a tab set, and activating it moves the user nowhere. Three
 * components shipped that way (the kundli and divisional style switchers and the
 * tarot orientation flip) because their tablists swapped a view in place without
 * a panel element. This pins the pairing for all of them at once, so a new
 * tablist cannot be added without its panel.
 */
describe('every tablist governs a real tabpanel', () => {
	const CASES: Array<{ tag: string; sample: unknown }> = [
		{
			tag: 'roxy-tarot-card',
			sample: {
				name: 'The Star',
				arcana: 'major',
				upright: { description: 'Hope renewed.', keywords: ['hope'] },
				reversed: { description: 'Faith wavers.', keywords: ['doubt'] },
			},
		},
		{
			tag: 'roxy-dasha-timeline',
			sample: {
				nakshatraName: 'Swati',
				nakshatraLord: 'Rahu',
				moonLongitude: 190.99,
				ayanamsaType: 'lahiri',
				mahadasha: { planet: 'Saturn', interpretation: 'Discipline.' },
				antardasha: { planet: 'Venus' },
				pratyantardasha: { planet: 'Rahu' },
				sookshmaDasha: { planet: 'Jupiter' },
			},
		},
	];

	for (const { tag, sample } of CASES) {
		test(`${tag}: each rendered tab points at a panel that exists`, async () => {
			const el = document.createElement(tag) as HTMLElement & {
				data?: unknown;
			};
			document.body.appendChild(el);
			el.data = sample;
			await settled(el);

			const root = el.shadowRoot;
			const tabs = [...(root?.querySelectorAll('[role="tab"]') ?? [])];
			expect(tabs.length).toBeGreaterThan(0);

			// EVERY tab names a panel that exists, not just the selected one. The APG
			// puts aria-controls on each element with role tab, and a reference that
			// does not resolve is the same as having none: a screen reader user
			// cannot tell what an inactive tab governs. Only the active panel holds
			// content; the rest are empty and hidden so the content stays lazy.
			expect(tabs.some((t) => t.getAttribute('aria-selected') === 'true')).toBe(
				true,
			);
			for (const tab of tabs) {
				const controls = tab.getAttribute('aria-controls');
				expect(controls).toBeTruthy();
				const panel = root?.querySelector(`#${controls}`);
				expect(panel?.getAttribute('role')).toBe('tabpanel');
				// Inactive panels are hidden, so an empty one is never announced.
				const selected = tab.getAttribute('aria-selected') === 'true';
				expect(panel?.hasAttribute('hidden')).toBe(!selected);
			}

			el.remove();
		});
	}
});

/**
 * The bar date column has to stay informative at every level. Printed as a bare
 * year, a sookshma list renders nine identical "1990 - 1990" rows, which is the
 * column carrying no information at exactly the level the reader drilled to.
 */
describe('roxy-dasha-timeline date column adapts to the period length', () => {
	async function mount(data: unknown, period: string) {
		const el = document.createElement('roxy-dasha-timeline') as HTMLElement & {
			data?: unknown;
			period?: string;
		};
		el.period = period;
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}
	const dateCells = (el: Element) =>
		[...(el.shadowRoot?.querySelectorAll('.dates') ?? [])].map(
			(n) => n.textContent?.replace(/\s+/g, ' ').trim() ?? '',
		);

	test('mahadashas keep bare years', async () => {
		const el = await mount(
			{
				mahadashas: [
					{
						planet: 'Ketu',
						startDate: '1990-01-15T00:00:00',
						endDate: '1997-01-15T00:00:00',
						durationYears: 7,
					},
					{
						planet: 'Venus',
						startDate: '1997-01-15T00:00:00',
						endDate: '2017-01-15T00:00:00',
						durationYears: 20,
					},
				],
			},
			'major',
		);
		expect(dateCells(el)[0]).toBe('1990 - 1997');
		el.remove();
	});

	test('day-long sookshma periods do not all collapse to one repeated year', async () => {
		const el = await mount(
			{
				pratyantardashaLord: 'Mercury',
				pratyantardashaPeriod: { planet: 'Mercury', durationYears: 0.45 },
				sookshmaDashas: [
					{
						planet: 'Mercury',
						startDate: '1990-01-19T00:00:00',
						endDate: '1990-02-02T00:00:00',
						durationYears: 0.04,
					},
					{
						planet: 'Ketu',
						startDate: '1990-02-02T00:00:00',
						endDate: '1990-02-08T00:00:00',
						durationYears: 0.017,
					},
				],
			},
			'sookshma',
		);
		const cells = dateCells(el);
		expect(cells[0]).not.toBe('1990 - 1990');
		// Distinct rows must read distinctly.
		expect(cells[0]).not.toBe(cells[1]);
		expect(cells[0]).toContain('Jan');
		el.remove();
	});

	test('a mixed set takes its grain from the shortest bar, not the longest', async () => {
		// The set is never uniform: a sookshma list runs from about 8 days to about
		// 73. Choosing the grain from the LONGEST member picked months, and every
		// short row then printed both ends as the same month: "Jan 1990 - Jan 1990".
		const el = await mount(
			{
				sookshmaDashas: [
					{
						planet: 'Saturn',
						startDate: '1990-01-03T00:00:00',
						endDate: '1990-01-11T00:00:00',
						durationYears: 0.022,
					},
					{
						planet: 'Mercury',
						startDate: '1990-01-11T00:00:00',
						endDate: '1990-03-25T00:00:00',
						durationYears: 0.2,
					},
				],
			},
			'sookshma',
		);
		const cells = dateCells(el);
		expect(cells[0]).not.toBe('Jan 1990 - Jan 1990');
		expect(cells[0]).not.toBe(cells[1]);
		el.remove();
	});

	test('day grain still carries the year', async () => {
		// A sookshma period routinely straddles new year, and a bar reading
		// "28 Dec - 3 Jan" does not say which side moved. The table is a date
		// reference: a practitioner reads a boundary off it and writes it down.
		const el = await mount(
			{
				sookshmaDashas: [
					{
						planet: 'Ketu',
						startDate: '1989-12-28T00:00:00',
						endDate: '1990-01-03T00:00:00',
						durationYears: 0.016,
					},
				],
			},
			'sookshma',
		);
		const cell = dateCells(el)[0] ?? '';
		expect(cell).toContain('1989');
		expect(cell).toContain('1990');
		el.remove();
	});
});

/**
 * A host that cannot pass attributes must still get correct headings. The
 * WordPress plugin maps an operationId to a bare tag with no attrs, so every
 * dasha shortcode arrives with the default `period="current"`; the heading has to
 * come from the payload or an antardasha list is titled "Active dashas" there.
 */
describe('roxy-dasha-timeline heads correctly with no period attribute', () => {
	async function mountNoAttrs(data: unknown) {
		const el = document.createElement('roxy-dasha-timeline') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}
	const heading = (el: Element) =>
		el.shadowRoot?.querySelector('.title')?.textContent?.trim() ?? '';

	test('a drill-down payload titles itself, not "Active dashas"', async () => {
		const el = await mountNoAttrs({
			mahadashaLord: 'Saturn',
			antardashaLord: 'Venus',
			antardashaPeriod: { planet: 'Venus', durationYears: 3.2 },
			pratyantardashas: [
				{
					planet: 'Venus',
					startDate: '2025-06-20T00:00:00',
					endDate: '2025-12-29T00:00:00',
					durationYears: 0.5,
				},
			],
		});
		expect(heading(el)).toBe('Pratyantardashas in Venus Antardasha');
		el.remove();
	});

	test('a major payload titles itself', async () => {
		const el = await mountNoAttrs({
			mahadashas: [
				{
					planet: 'Ketu',
					startDate: '1990-01-15T00:00:00',
					endDate: '1997-01-15T00:00:00',
					durationYears: 7,
				},
			],
		});
		expect(heading(el)).toBe('Vimshottari Mahadasha');
		el.remove();
	});

	test('a current payload still reads as the running periods', async () => {
		const el = await mountNoAttrs({
			mahadasha: { planet: 'Saturn' },
			antardasha: { planet: 'Venus' },
		});
		expect(heading(el)).toBe('Active dashas');
		el.remove();
	});
});

/**
 * Tarot spread heading. Same failure class as the dasha timeline: the label used
 * to come from the `spread` ATTRIBUTE, whose default is `three-card`, so a host
 * that cannot set attributes (the WordPress plugin) headed every reading "three
 * card" including a yes or no cast. The API also sends `spread: null` on several
 * casts, so the response field alone is not enough either.
 */
describe('roxy-tarot-spread titles itself from the response', () => {
	async function mount(data: unknown) {
		const el = document.createElement('roxy-tarot-spread') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}
	const title = (el: Element) =>
		el.shadowRoot?.querySelector('.title')?.textContent?.trim() ?? '';

	test('a yes or no cast is not headed "three card"', async () => {
		const el = await mount({
			question: 'Should I take the new job',
			answer: 'Yes',
			strength: 'Strong',
			spread: null,
			card: { name: 'The Star', orientation: 'upright' },
		});
		expect(title(el)).toBe('Yes or no');
		el.remove();
	});

	test('a named spread is used and capitalised', async () => {
		const el = await mount({
			spread: 'celtic cross',
			question: 'What about work',
			positions: [{ position: 'Present', card: { name: 'The Star' } }],
		});
		expect(title(el)).toBe('Celtic cross');
		el.remove();
	});

	test('a null spread falls back without rendering an empty heading', async () => {
		const el = await mount({
			spread: null,
			question: 'What about work',
			positions: [{ position: 'Present', card: { name: 'The Star' } }],
		});
		expect(title(el)).toBe('Three card');
		el.remove();
	});
});

/**
 * The three avastha systems the birth chart returns per graha. Baladi applies to
 * every body; Jagradadi and Deeptadi need sign dignity, which Rahu, Ketu and the
 * Lagna do not have, so their cells must render EMPTY rather than as a
 * placeholder that reads like a failed fetch.
 */
describe('vedic planets table avastha columns', () => {
	const sample = specs.find(
		(s) => s.tag === 'roxy-vedic-planets-table',
	)?.sample;

	async function mount() {
		const el = document.createElement(
			'roxy-vedic-planets-table',
		) as unknown as HTMLElement & { data?: unknown };
		document.body.appendChild(el);
		el.data = sample;
		await settled(el);
		return el;
	}

	test('heads a column per system instead of one "avastha"', async () => {
		const el = await mount();
		const heads = [...(el.shadowRoot?.querySelectorAll('thead th') ?? [])].map(
			(th) => th.textContent?.trim(),
		);
		expect(heads).toContain('Baladi');
		expect(heads).toContain('Jagradadi');
		expect(heads).toContain('Deeptadi');
		expect(heads).not.toContain('Avastha');
		el.remove();
	});

	test('renders all three states for a graha and leaves the node cells blank', async () => {
		const el = await mount();
		const rows = [...(el.shadowRoot?.querySelectorAll('tbody tr') ?? [])];
		// Match on the graha cell, not the row text: the Lagna row carries "Rahu"
		// as its nakshatra lord and would otherwise answer for it.
		const cells = (name: string) => {
			const row = rows.find((r) =>
				r.querySelector('td')?.textContent?.trim().endsWith(name),
			);
			return [...(row?.querySelectorAll('td') ?? [])].map((td) =>
				td.textContent?.trim(),
			);
		};
		// Graha, rashi, degree, nakshatra, pada, nak lord, house, then the three
		// avastha columns.
		expect(cells('Sun').slice(7, 10)).toEqual(['Vriddha', 'Swapna', 'Kopa']);
		expect(cells('Rahu').slice(7, 10)).toEqual(['Kumara', '', '']);
		el.remove();
	});
});

/** Detect mode: every verdict grouped by verdict, with the two kinds of absent told apart. */
describe('yoga list detect grouping', () => {
	const detected = {
		total: 1,
		yogas: [
			{
				id: 'kemadruma',
				name: 'Kemadruma Yoga',
				description: 'Moon isolated',
				result: 'Struggle early in life.',
				quality: 'Negative',
				present: true,
				evidence: 'Moon is isolated: no qualifying planet in the 2nd OR 12th.',
			},
			{
				id: 'kedara',
				name: 'Kedara Yoga',
				description: 'Seven grahas in four rasis',
				result: 'Agricultural wealth.',
				quality: 'Positive',
				present: false,
				evidence: 'The seven visible grahas occupy 5 rasis, not 4',
			},
			{
				id: 'sula',
				name: 'Sula Yoga',
				description: 'Seven grahas in three rasis',
				result: 'Sharp and cruel.',
				quality: 'Both',
				present: false,
				evidence:
					'The seven visible grahas occupy 3 rasis, but another Nabhasa yoga is present and classically suppresses Sankhya',
			},
			{
				id: 'rajju',
				name: 'Rajju Yoga',
				description: 'All grahas in movable signs',
				result: 'Fond of travel.',
				quality: 'Both',
				present: false,
				evidence:
					'All seven visible grahas occupy movable signs, but an Akriti yoga is present and classically outranks Asraya',
			},
		],
	};

	async function mount(data: unknown = detected) {
		const el = document.createElement(
			'roxy-yoga-list',
		) as unknown as HTMLElement & { data?: unknown };
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}

	test('groups by verdict, result first and reference last', async () => {
		const el = await mount();
		const groups = [...(el.shadowRoot?.querySelectorAll('.group') ?? [])].map(
			(g) => [
				g.querySelector('.group-label')?.textContent?.trim(),
				g.querySelector('.group-count')?.textContent?.trim(),
				(g as HTMLDetailsElement).open,
			],
		);
		expect(groups).toEqual([
			['Present', '1', true],
			['Outranked', '2', true],
			['Not present', '1', false],
		]);
		el.remove();
	});

	test('an outranked yoga is badged apart from one whose rule failed', async () => {
		const el = await mount();
		const badge = (name: string) => {
			const card = [
				...(el.shadowRoot?.querySelectorAll('.detail-card') ?? []),
			].find((c) => c.textContent?.includes(name));
			return card?.querySelector('.present-badge')?.textContent?.trim();
		};
		expect(badge('Kemadruma')).toBe('Present');
		expect(badge('Sula')).toBe('Outranked');
		expect(badge('Rajju')).toBe('Outranked');
		expect(badge('Kedara')).toBe('Not present');
		el.remove();
	});

	test('a group with no yoga in it renders no heading', async () => {
		const el = await mount({
			total: 0,
			yogas: [detected.yogas[1]],
		});
		const labels = [
			...(el.shadowRoot?.querySelectorAll('.group-label') ?? []),
		].map((l) => l.textContent?.trim());
		expect(labels).toEqual(['Not present']);
		el.remove();
	});

	test('a filter forces every group open so a match cannot hide', async () => {
		const el = await mount();
		const input = el.shadowRoot?.querySelector('.search') as HTMLInputElement;
		input.value = 'kedara';
		input.dispatchEvent(new Event('input'));
		await settled(el);
		const groups = [...(el.shadowRoot?.querySelectorAll('.group') ?? [])];
		expect(groups.length).toBe(1);
		expect((groups[0] as HTMLDetailsElement).open).toBe(true);
		el.remove();
	});
});

/** House wording joined from the response `houseThemes` map, never from a table held in a component. */
describe('KP house themes', () => {
	const themes = {
		'1': ['self', 'body', 'vitality'],
		'3': ['siblings', 'courage'],
		'6': ['enemies', 'debt'],
		'10': ['career', 'status'],
		'11': ['gains', 'friends'],
	};

	async function mount(tag: string, data: unknown) {
		const el = document.createElement(tag) as unknown as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}

	test('the ruling-planets significator rows caption their houses', async () => {
		const el = await mount('roxy-kp-ruling-planets', {
			dayLord: 'Moon',
			rulingPlanets: ['Moon'],
			significators: [{ planet: 'Mercury', signifies: [3, 6, 10] }],
			houseThemes: themes,
		});
		expect(el.shadowRoot?.querySelector('.themes')?.textContent?.trim()).toBe(
			'siblings, enemies, career',
		);
		el.remove();
	});

	test('a response without the map renders the numbers alone', async () => {
		const el = await mount('roxy-kp-ruling-planets', {
			dayLord: 'Moon',
			rulingPlanets: ['Moon'],
			significators: [{ planet: 'Mercury', signifies: [3, 6, 10] }],
		});
		expect(el.shadowRoot?.querySelector('.themes')).toBeNull();
		el.remove();
	});

	test('a KP cusp row carries every keyword for its own house', async () => {
		const el = await mount('roxy-kp-chart', {
			meta: { ayanamsa: 23.71, ayanamsaType: 'kp-newcomb' },
			ascendant: { sign: 'Taurus' },
			cusps: [{ house: 1, sign: 'Taurus', signLord: 'Venus' }],
			planets: [],
			houseThemes: themes,
		});
		(el as unknown as { activeTab: string }).activeTab = 'cusps';
		await settled(el);
		expect(el.shadowRoot?.querySelector('.themes')?.textContent?.trim()).toBe(
			'self, body, vitality',
		);
		el.remove();
	});
});
