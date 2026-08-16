import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml). Lit reads document and customElements at module load,
// so the order matters: setup -> import.
import '../src/index.js';
import { FAMILY_ORDER } from '../src/components/yoga-list.js';

/** `updateComplete` lives on LitElement, not on the `HTMLElement` that `createElement` returns, and every call site was reaching it through the same double cast. One helper, one place to change. */
const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

import {
	ROXY_UI_COMPONENTS,
	ROXY_UI_VERSION,
	RoxyAngelNumberCard,
	RoxyAngelNumberLookup,
	RoxyArudhaPadas,
	RoxyAshtakavargaGrid,
	RoxyBiorhythmChart,
	RoxyCharaKarakas,
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
	RoxyUpagrahaTable,
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
		tag: 'roxy-upagraha-table',
		ctor: RoxyUpagrahaTable as unknown as new () => HTMLElement,
		sample: {
			timeBased: [
				{
					name: 'Gulika',
					longitude: 43.21,
					rashi: 'Taurus',
					degreeInSign: 13.21,
					nakshatra: 'Rohini',
					nakshatraIndex: 4,
					nakshatraPada: 1,
				},
				{
					name: 'Mandi',
					longitude: 40.44,
					rashi: 'Taurus',
					degreeInSign: 10.44,
					nakshatra: 'Rohini',
					nakshatraIndex: 4,
					nakshatraPada: 1,
				},
			],
			sunBased: [
				{
					name: 'Dhuma',
					longitude: 45.01,
					rashi: 'Taurus',
					degreeInSign: 15.01,
					nakshatra: 'Rohini',
					nakshatraIndex: 4,
					nakshatraPada: 2,
				},
			],
		},
	},
	{
		tag: 'roxy-chara-karakas',
		ctor: RoxyCharaKarakas as unknown as new () => HTMLElement,
		sample: {
			scheme: 'eight',
			atmakaraka: 'Moon',
			darakaraka: 'Sun',
			karakas: [
				{
					id: 'atmakaraka',
					name: 'Atmakaraka',
					abbreviation: 'AK',
					graha: 'Moon',
					rashi: 'Leo',
					degreeInRashi: 27.6686,
					rankingDegree: 27.6686,
					isReversed: false,
					meaning: 'Soul and self',
					significations: 'The desire that brought the soul to this birth.',
				},
				{
					id: 'gnatikaraka',
					name: 'Gnatikaraka',
					abbreviation: 'GK',
					graha: 'Rahu',
					rashi: 'Capricorn',
					degreeInRashi: 23.9523,
					rankingDegree: 6.0477,
					isReversed: true,
					meaning: 'Relatives and obstacles',
					significations: 'Rivals, disputes and the obstacles to work through.',
				},
			],
		},
	},
	{
		tag: 'roxy-arudha-padas',
		ctor: RoxyArudhaPadas as unknown as new () => HTMLElement,
		sample: {
			lagnaRashi: 'Gemini',
			arudhaLagna: 'Pisces',
			upapada: 'Virgo',
			padas: [
				{
					id: 'a1',
					abbreviation: 'AL',
					name: 'Arudha Lagna',
					house: 1,
					bhavaRashi: 'Gemini',
					lord: 'Mercury',
					lordRashi: 'Sagittarius',
					rashi: 'Pisces',
					houseFromLagna: 10,
					exceptionApplied: true,
					meaning: 'Public image',
					significations: 'How the world sees the native.',
				},
				{
					id: 'a12',
					abbreviation: 'UL',
					name: 'Upapada',
					house: 12,
					bhavaRashi: 'Taurus',
					lord: 'Venus',
					lordRashi: 'Capricorn',
					rashi: 'Virgo',
					houseFromLagna: 4,
					exceptionApplied: false,
					meaning: 'Marriage',
					significations: 'The spouse and the durability of the marriage.',
				},
			],
		},
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

	/**
	 * A rejected search must say why. Discarding the response body made every failure
	 * identical to a city that does not exist: the box looked like it had taken the typing,
	 * and the only feedback left was the surrounding form reporting the field as unfilled,
	 * which names the wrong problem.
	 */
	test('a rejected search shows the API reason instead of failing silently', async () => {
		const originalFetch = globalThis.fetch;
		globalThis.fetch = (async () => ({
			ok: false,
			status: 401,
			json: async () => ({ error: 'Invalid API key', code: 'invalid_api_key' }),
		})) as unknown as typeof fetch;
		try {
			const el = document.createElement('roxy-location-search');
			el.setAttribute('publishable-key', 'pk_live_YOUR_KEY');
			document.body.appendChild(el);
			await settled(el);

			const root = el.shadowRoot as ShadowRoot;
			const input = root.querySelector('input') as HTMLInputElement;
			input.value = 'Manila';
			input.dispatchEvent(new Event('input'));
			// 300ms debounce, then the mocked response resolves on the microtask queue.
			await new Promise((resolve) => setTimeout(resolve, 450));
			await settled(el);

			const alert = root.querySelector('[role="alert"]');
			expect(alert?.textContent?.trim()).toBe('Invalid API key');
			// A failure must never read as an ordinary empty state. Asserted on the
			// element, not on `shadowRoot.textContent`, which concatenates the stylesheet
			// (lesson 21).
			expect(root.querySelector('.empty[role="status"]')).toBeNull();

			// It must OUTLIVE the dropdown. The click that submits the surrounding form
			// also dismisses the popup through the click-outside handler, and that is the
			// same moment the form reports the field as unfilled, so a reason that lived
			// inside the popup would vanish on the click that makes it worth reading.
			// A plain Event is enough: the click-outside handler reads only composedPath().
			document.dispatchEvent(new Event('mousedown', { bubbles: true }));
			await settled(el);
			expect(root.querySelector('[role="alert"]')?.textContent?.trim()).toBe(
				'Invalid API key',
			);
			el.remove();
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	/**
	 * A stale error is its own defect: the site owner fixes the key, the next keystroke
	 * succeeds, and a message contradicting the list under it would still be on screen.
	 */
	test('the error clears once a later search succeeds', async () => {
		const originalFetch = globalThis.fetch;
		let fail = true;
		globalThis.fetch = (async () =>
			fail
				? {
						ok: false,
						status: 401,
						json: async () => ({ error: 'Invalid API key' }),
					}
				: {
						ok: true,
						status: 200,
						json: async () => ({
							cities: [
								{
									city: 'Manila',
									country: 'Philippines',
									latitude: 14.6,
									longitude: 120.98,
									timezone: 'Asia/Manila',
									utcOffset: 8,
								},
							],
						}),
					}) as unknown as typeof fetch;
		try {
			const el = document.createElement('roxy-location-search');
			el.setAttribute('publishable-key', 'pk_live_ok');
			document.body.appendChild(el);
			await settled(el);

			const root = el.shadowRoot as ShadowRoot;
			const input = root.querySelector('input') as HTMLInputElement;
			input.value = 'Manila';
			input.dispatchEvent(new Event('input'));
			await new Promise((resolve) => setTimeout(resolve, 450));
			await settled(el);
			expect(root.querySelector('[role="alert"]')).not.toBeNull();

			fail = false;
			input.value = 'Manila C';
			input.dispatchEvent(new Event('input'));
			await new Promise((resolve) => setTimeout(resolve, 450));
			await settled(el);

			expect(root.querySelector('[role="alert"]')).toBeNull();
			expect(root.querySelectorAll('[role="option"]').length).toBe(1);
			el.remove();
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	/**
	 * The sibling half of the same silence. `No cities found` is a catalogued string that was
	 * unreachable: the success path set `isOpen = results.length > 0`, so a search matching
	 * nothing closed the box and said nothing, exactly like a failed one. A misspelt city was
	 * therefore as mute as a rejected request.
	 */
	test('a search that genuinely matches nothing still reads as empty, not as an error', async () => {
		const originalFetch = globalThis.fetch;
		globalThis.fetch = (async () => ({
			ok: true,
			status: 200,
			json: async () => ({ cities: [] }),
		})) as unknown as typeof fetch;
		try {
			const el = document.createElement('roxy-location-search');
			el.setAttribute('publishable-key', 'pk_live_ok');
			document.body.appendChild(el);
			await settled(el);

			const root = el.shadowRoot as ShadowRoot;
			const input = root.querySelector('input') as HTMLInputElement;
			input.value = 'Zzzznowhere';
			input.dispatchEvent(new Event('input'));
			await new Promise((resolve) => setTimeout(resolve, 450));
			await settled(el);

			expect(root.querySelector('[role="alert"]')).toBeNull();
			// Reads as empty, and is actually ON SCREEN rather than behind a closed box.
			const empty = root.querySelector('.empty[role="status"]');
			expect(empty?.textContent?.trim()).toBe('No cities found');
			el.remove();
		} finally {
			globalThis.fetch = originalFetch;
		}
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
 * The generic renderer against a response that carries its own translation.
 *
 * @remarks
 * `roxy-data` derives its columns from `Object.keys(row)` and knows nothing about what any of them mean, so the day the API began echoing `planetLocalized` beside `planet` this element started drawing `Planet | Planet Localized | Longitude | Sign | Sign Localized`: two extra columns, headed in English, carrying the same fact twice, on a page whose owner changed nothing. That is a REGRESSION rather than a missing feature, which is why it is repaired at the key layer both render paths funnel through (`suppress` -> `foldLocalized`) instead of at each column-building site.
 *
 * Sabotage-verified by dropping the `foldLocalized` call: the six columns come straight back and these tests go red.
 */
describe('roxy-data folds a localized field into the field it translates', () => {
	const mount = async (data: unknown) => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		const root = el.shadowRoot as ShadowRoot;
		return {
			el,
			headers: [...root.querySelectorAll('th')].map((th) =>
				th.textContent?.trim(),
			),
			cells: [...root.querySelectorAll('td')].map((td) =>
				td.textContent?.trim(),
			),
		};
	};

	/** The real shape of a monthly-ephemeris row, which is the page this shipped to. */
	const ROW = {
		planet: 'Sun',
		planetLocalized: 'Sol',
		longitude: 105.03,
		sign: 'Cancer',
		signLocalized: 'Cáncer',
		degree: 15.03,
	};

	test('a translated row keeps its column count and reads in the page language', async () => {
		const { el, headers, cells } = await mount([ROW]);
		expect(headers).toEqual(['Planet', 'Longitude', 'Sign', 'Degree']);
		expect(cells).toEqual(['Sol', '105.03', 'Cáncer', '15.03']);
		el.remove();
	});

	test('an English row, which carries no localized field, renders exactly as before', async () => {
		const { planetLocalized, signLocalized, ...english } = ROW;
		expect([planetLocalized, signLocalized]).toEqual(['Sol', 'Cáncer']);
		const { el, headers, cells } = await mount([english]);
		expect(headers).toEqual(['Planet', 'Longitude', 'Sign', 'Degree']);
		expect(cells).toEqual(['Sun', '105.03', 'Cancer', '15.03']);
		el.remove();
	});

	test('a localized field with no canonical partner still renders', async () => {
		// Suppressing on the name alone would delete the only copy of the value.
		const { el, headers, cells } = await mount([
			{ planet: 'Sun', noteLocalized: 'Nota' },
		]);
		expect(headers).toEqual(['Planet', 'Note Localized']);
		expect(cells).toEqual(['Sun', 'Nota']);
		el.remove();
	});

	test('a card rather than a table folds the same way', async () => {
		// The object path and the table path share one `suppress`, so neither can
		// be fixed without the other. Asserted rather than assumed.
		const el = document.createElement('roxy-data') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = {
			name: 'Sun',
			nameLocalized: 'Sol',
			sign: 'Cancer',
			signLocalized: 'Cáncer',
		};
		await settled(el);
		const root = el.shadowRoot as ShadowRoot;
		const rendered = (root.innerHTML ?? '').replace(
			/<style[\s\S]*?<\/style>/g,
			'',
		);
		const labels = [...root.querySelectorAll('dt')].map((dt) =>
			dt.textContent?.trim(),
		);
		expect(labels).toEqual(['Sign']);
		expect(rendered).toContain('Sol');
		expect(rendered).toContain('Cáncer');
		expect(rendered).not.toContain('Cancer<');
		el.remove();
	});
});

/**
 * `roxy-data` and the WordPress plugin's `GenericRenderer.php` render the SAME responses for the same visitor: this component when JavaScript runs, the PHP renderer when it does not. Printing everything the API returns shows a WordPress reading card the derivation math, the schema discriminator and the pagination counters whenever JS is ON, and hides them when JS is OFF, which makes the JS path, the path almost every visitor takes, the worse one.
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
 * `binary` is BOTTOM-to-top, which is how a hexagram is read and how the API documents it, so the component renders it in order and reverses nothing. Orientation needs pinning because a vertically mirrored hexagram is still a real hexagram: it renders cleanly, names a different figure, and no type or schema check can see it.
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
		// The API returns kpNumber on nodes as well as planets, and the merge that
		// folds Rahu and Ketu into the planets table has to carry it across. Drop it
		// there and the KP column blanks on precisely those two rows and nowhere
		// else, which reads as missing data rather than as a bug.
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
 * ayanamsa), the birth balance, and the lord chain. They belong in their own
 * panel rather than as extra rows under the timeline, because the dates are what
 * a reader opens the card for and provenance above them pushes those below the
 * fold.
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
				family: 'classical',
				present: true,
				evidence: 'Moon is isolated: no qualifying planet in the 2nd OR 12th.',
			},
			{
				id: 'kedara',
				name: 'Kedara Yoga',
				description: 'Seven grahas in four rasis',
				result: 'Agricultural wealth.',
				quality: 'Positive',
				family: 'sankhya',
				present: false,
				evidence: 'The seven visible grahas occupy 5 rasis, not 4',
			},
			{
				id: 'sula',
				name: 'Sula Yoga',
				description: 'Seven grahas in three rasis',
				result: 'Sharp and cruel.',
				quality: 'Both',
				family: 'sankhya',
				present: false,
				suppressedBy: 'akriti',
				evidence:
					'The seven visible grahas occupy 3 rasis, but another Nabhasa yoga is present and classically suppresses Sankhya',
			},
			{
				id: 'rajju',
				name: 'Rajju Yoga',
				description: 'All grahas in movable signs',
				result: 'Fond of travel.',
				quality: 'Both',
				family: 'asraya',
				present: false,
				suppressedBy: 'akriti',
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

	const badgeIn = (el: HTMLElement) => (name: string) => {
		const card = [
			...(el.shadowRoot?.querySelectorAll('.detail-card') ?? []),
		].find((c) => c.textContent?.includes(name));
		return card?.querySelector('.present-badge')?.textContent?.trim();
	};

	test('an outranked yoga is badged apart from one whose rule failed, and names the family that silenced it', async () => {
		const el = await mount();
		const badge = badgeIn(el);
		expect(badge('Kemadruma')).toBe('Present');
		expect(badge('Sula')).toBe('Outranked by Akriti');
		expect(badge('Rajju')).toBe('Outranked by Akriti');
		expect(badge('Kedara')).toBe('Not present');
		el.remove();
	});

	test('the verdict comes from suppressedBy, never from the evidence prose', async () => {
		// `evidence` is translated on every locale, so matching it would group correctly in
		// English and nowhere else. Both halves are asserted: the prose alone must NOT
		// promote a card, and the field alone must, with the prose translated out from
		// under it.
		const el = await mount({
			total: 0,
			yogas: [
				{
					...detected.yogas[2],
					suppressedBy: undefined,
					evidence:
						'The seven visible grahas occupy 3 rasis, but another Nabhasa yoga is present and classically suppresses Sankhya',
				},
				{
					...detected.yogas[3],
					evidence: 'सातों दृश्य ग्रह चर राशियों में हैं, परन्तु एक आकृति योग उपस्थित है',
				},
			],
		});
		const badge = badgeIn(el);
		expect(badge('Sula')).toBe('Not present');
		expect(badge('Rajju')).toBe('Outranked by Akriti');
		el.remove();
	});

	test('cards inside a verdict group are ordered by classical family', async () => {
		const el = await mount({
			total: 0,
			yogas: [
				{ ...detected.yogas[1], id: 'a', name: 'Sankhya One', present: false },
				{
					...detected.yogas[1],
					id: 'b',
					name: 'Asraya One',
					family: 'asraya',
					present: false,
				},
				{
					...detected.yogas[1],
					id: 'c',
					name: 'Classical One',
					family: 'classical',
					present: false,
				},
				{
					...detected.yogas[1],
					id: 'd',
					name: 'Akriti One',
					family: 'akriti',
					present: false,
				},
			],
		});
		const names = [
			...(el.shadowRoot?.querySelectorAll('.detail-name') ?? []),
		].map((n) => n.textContent?.trim().split(/\s{2,}|\n/)[0]);
		expect(names).toEqual([
			'Classical One',
			'Asraya One',
			'Akriti One',
			'Sankhya One',
		]);
		el.remove();
	});

	test('a de-emphasised verdict card never dims its text with opacity', async () => {
		// Opacity composites text against the page, so it lowers the contrast of every
		// colour inside the card. The muted body text of a verdict card sits close
		// enough to the AA floor that any dimming drops it under. The axe pass only
		// reaches cards in an OPEN group, so the collapsed rule-failed group needs
		// this assertion rather than the scan.
		const el = await mount();
		const sheet = (
			el.constructor as unknown as { styles: Array<{ cssText: string }> }
		).styles
			.map((s) => s.cssText)
			.join('\n');
		const verdictRules =
			sheet.match(/\.detail-card\.(absent|outranked)\s*\{[^}]*\}/g) ?? [];
		expect(verdictRules.length).toBe(2);
		expect(verdictRules.filter((r) => /opacity/.test(r))).toEqual([]);
		el.remove();
	});

	test('every family the spec can return is placed in the classical order', async () => {
		// FAMILY_ORDER holds order, never membership. Without this binding a new family
		// would sort silently to the end of every group.
		const spec = await Bun.file('specs/openapi.json').json();
		const families: string[] =
			spec.components.schemas.YogaDetectResponse.properties.yogas.items
				.properties.family.enum;
		expect(families.length).toBeGreaterThan(3);
		expect(
			families.filter((f) => !(FAMILY_ORDER as readonly string[]).includes(f)),
		).toEqual([]);
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

/** The practitioner-depth Jyotish tables added for the Jaimini and upagraha surfaces. */
describe('vedic practitioner tables', () => {
	const sampleFor = (tag: string) => specs.find((s) => s.tag === tag)?.sample;

	async function mount(tag: string) {
		const el = document.createElement(tag) as unknown as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = sampleFor(tag);
		await settled(el);
		return el;
	}

	test('upagrahas keep Gulika and Mandi as separate points', async () => {
		const el = await mount('roxy-upagraha-table');
		const names = [...(el.shadowRoot?.querySelectorAll('td.name') ?? [])].map(
			(n) => n.textContent?.trim(),
		);
		expect(names).toEqual(['Gulika', 'Mandi', 'Dhuma']);
		// Two groups, each with its own table, never merged into one list.
		expect(el.shadowRoot?.querySelectorAll('table').length).toBe(2);
		el.remove();
	});

	test('chara karakas name the scheme that produced the ranking', async () => {
		const el = await mount('roxy-chara-karakas');
		const text = el.shadowRoot?.textContent ?? '';
		expect(
			el.shadowRoot?.querySelector('.scheme-chip')?.textContent?.trim(),
		).toBe('eight');
		expect(text).toContain('Rahu included');
		// Rahu is ranked from the end of its sign, so both degrees are shown.
		expect(text).toContain('23.95');
		expect(text).toContain('6.05');
		expect(el.shadowRoot?.querySelector('.reversed')).toBeTruthy();
		el.remove();
	});

	test('arudha padas surface the Upapada and the classical exception', async () => {
		const el = await mount('roxy-arudha-padas');
		const text = el.shadowRoot?.textContent ?? '';
		expect(text).toContain('Upapada');
		expect(text).toContain('Arudha Lagna');
		// Both lifted padas are marked in the table, not only summarised above it.
		expect(el.shadowRoot?.querySelectorAll('tr.lead-row').length).toBe(2);
		expect(
			el.shadowRoot?.querySelector('.exception')?.textContent?.trim(),
		).toBe('Moved');
		el.remove();
	});
});

describe('bhav chalit', () => {
	async function mount(data: unknown) {
		const el = document.createElement(
			'roxy-bhav-chalit-table',
		) as unknown as HTMLElement & { data?: unknown };
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}

	const graha = (over: Record<string, unknown> = {}) => ({
		graha: 'Sun',
		longitude: 271.6,
		rashi: 'Capricorn',
		bhava: 8,
		rashiHouse: 8,
		moved: false,
		...over,
	});

	test('zero moved reads as a normal result, never as missing data', async () => {
		// The live sample has seven grahas moving, so this branch is the one no
		// fixture exercises. A chart where the two agree is a real and common
		// outcome, and rendering it as an empty list would read as a failed call.
		const el = await mount({
			houseSystem: 'sripati',
			movedCount: 0,
			grahas: [graha(), graha({ graha: 'Moon', bhava: 3, rashiHouse: 3 })],
			bhavas: [],
		});
		const lede = el.shadowRoot?.querySelector('.lede')?.textContent ?? '';
		expect(lede).toContain('No graha changes house');
		expect(lede).toContain('normal result');
		expect(el.shadowRoot?.querySelectorAll('.moved-row').length).toBe(0);
		el.remove();
	});

	test('a moved graha names both placements', async () => {
		const el = await mount({
			movedCount: 1,
			grahas: [graha({ graha: 'Mars', bhava: 7, rashiHouse: 6, moved: true })],
			bhavas: [],
		});
		const row = el.shadowRoot?.querySelector('.moved-row')?.textContent ?? '';
		expect(row).toContain('Mars');
		expect(row).toContain('house 6 in the Rashi chart');
		expect(row).toContain('house 7 here');
		el.remove();
	});
});

/**
 * `hide-readings` renders the chart and the data and omits the written interpretation.
 *
 * The property lives on `RoxyDataElement`, so every component inherits it and a new one picks it up with no wiring. What each component counts as a reading is its own decision, which is what these cases pin: the prose has to go, and the thing a practitioner reads the numbers off has to stay.
 *
 * Markers are deliberately unnatural strings. A `not.toContain` against real copy passes for the wrong reason the moment the sample wording drifts.
 */
describe('hide-readings', () => {
	interface ReadingCase {
		/** Test name. Distinct from the tag, because one component can carry more than one response shape. */
		name: string;
		tag: string;
		data: unknown;
		attrs?: Record<string, string>;
		/** Prose that must render by default and must be gone when readings are hidden. */
		readings: string[];
		/** Facts that must survive in both modes. */
		data_: string[];
		/** False when the component's disclosure cards sit inside a DATA section (a contact list, an aspect list) rather than a section that is only prose, so there is no block to name `readings`. */
		readingsSection?: boolean;
	}

	async function mount(
		tag: string,
		data: unknown,
		attrs: Record<string, string> = {},
	) {
		const el = document.createElement(tag) as HTMLElement & {
			data?: unknown;
			updateComplete: Promise<unknown>;
		};
		for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		return el;
	}

	/**
	 * The RENDERED text, with the shadow root's own `<style>` skipped.
	 *
	 * @remarks
	 * `shadowRoot.textContent` concatenates the stylesheet too, and these cases assert `not.toContain`, so any marker that also appears in a CSS comment or a class name fails for a reason that has nothing to do with the render. It cost a real debugging round: `yoga-list` names its Effects disclosure in a comment explaining why the marker rule is scoped.
	 */
	const text = (el: Element): string =>
		[...(el.shadowRoot?.childNodes ?? [])]
			.filter((n) => (n as Element).tagName !== 'STYLE')
			.map((n) => n.textContent ?? '')
			.join('\n');

	const natal = {
		planets: [
			{
				name: 'Sun',
				longitude: 12.5,
				sign: 'Aries',
				degree: 12.5,
				interpretation: {
					summary: 'ZZREADINGPLANET',
					keywords: ['ZZREADINGKEYWORD'],
				},
			},
			{ name: 'Moon', longitude: 200.1, sign: 'Libra', degree: 20.1 },
		],
		aspects: [
			{ planet1: 'Sun', planet2: 'Moon', aspect: 'opposition', orb: 7.6 },
		],
		houses: [],
		ascendant: { longitude: 100 },
		aspectsInterpretation: {
			harmonious: 3,
			challenging: 1,
			neutral: 0,
			summary: 'ZZREADINGASPECTS',
		},
		patterns: [
			{
				kind: 'T_SQUARE',
				name: 'T-Square',
				planets: ['Sun', 'Moon'],
				tightness: 88,
				interpretation: 'ZZREADINGPATTERN',
			},
		],
	};

	const cases: ReadingCase[] = [
		{
			name: 'roxy-natal-chart',
			tag: 'roxy-natal-chart',
			data: natal,
			readings: [
				'ZZREADINGPLANET',
				'ZZREADINGKEYWORD',
				'ZZREADINGASPECTS',
				'ZZREADINGPATTERN',
			],
			data_: ['2 planets', 'T-Square', '88% tight', 'Harmonious 3'],
		},
		{
			name: 'roxy-positions-table',
			tag: 'roxy-positions-table',
			data: {
				summary: 'ZZREADINGSUMMARY',
				houseSystem: 'placidus',
				asteroids: [
					{
						name: 'Ceres',
						sign: 'Leo',
						degree: 12.5,
						house: 5,
						interpretation: 'ZZREADINGBODY',
					},
				],
			},
			readings: ['ZZREADINGSUMMARY', 'ZZREADINGBODY'],
			data_: ['Asteroids', 'Ceres', 'Leo', 'placidus'],
		},
		{
			name: 'roxy-compatibility-card',
			tag: 'roxy-compatibility-card',
			data: {
				overallScore: 86,
				categories: { emotional: 88 },
				summary: 'ZZREADINGSUMMARY',
				interpretation: 'ZZREADINGINTERP',
				advice: 'ZZREADINGADVICE',
				strengths: ['ZZREADINGSTRENGTH'],
				archetype: { label: 'The Alchemists', description: 'ZZREADINGARCH' },
				signCompatibility: {
					sun: {
						person1Sign: 'Aries',
						person2Sign: 'Libra',
						description: 'ZZREADINGSIGN',
					},
				},
				elementBalance: {
					person1: { fire: 3, earth: 1, air: 2, water: 1 },
					person2: { fire: 1, earth: 2, air: 3, water: 1 },
					sharedElement: 'air',
					description: 'ZZREADINGELEMENT',
				},
				keyAspects: [
					{
						planet1: 'Sun',
						planet2: 'Moon',
						type: 'trine',
						orb: 2.4,
						description: 'ZZREADINGASPECT',
					},
				],
			},
			readings: [
				'ZZREADINGSUMMARY',
				'ZZREADINGINTERP',
				'ZZREADINGADVICE',
				'ZZREADINGSTRENGTH',
				'ZZREADINGARCH',
				'ZZREADINGSIGN',
				'ZZREADINGELEMENT',
				'ZZREADINGASPECT',
			],
			data_: [
				'86',
				'emotional',
				'The Alchemists',
				'Sun trine Moon',
				'Element balance',
			],
		},
		{
			name: 'roxy-numerology-card',
			tag: 'roxy-numerology-card',
			data: {
				number: 7,
				calculation: '1+9+9+0 = 7',
				meaning: {
					title: 'The Seeker',
					description: 'ZZREADINGDESC',
					career: 'ZZREADINGCAREER',
					keywords: ['ZZREADINGKEYWORD'],
					strengths: ['ZZREADINGSTRENGTH'],
				},
			},
			readings: [
				'ZZREADINGDESC',
				'ZZREADINGCAREER',
				'ZZREADINGKEYWORD',
				'ZZREADINGSTRENGTH',
			],
			data_: ['Life Path', 'The Seeker', '1+9+9+0 = 7'],
		},
		{
			name: 'roxy-tarot-card',
			tag: 'roxy-tarot-card',
			data: {
				card: {
					name: 'The Star',
					arcana: 'major',
					reversed: false,
					meaning: 'ZZREADINGMEANING',
					keywords: ['ZZREADINGKEYWORD'],
					love: 'ZZREADINGLOVE',
				},
				dailyMessage: 'ZZREADINGDAILY',
			},
			readings: [
				'ZZREADINGMEANING',
				'ZZREADINGKEYWORD',
				'ZZREADINGLOVE',
				'ZZREADINGDAILY',
			],
			data_: ['The Star', 'major arcana', 'drawn upright'],
		},
		{
			name: 'roxy-hexagram',
			tag: 'roxy-hexagram',
			data: {
				number: 11,
				english: 'Peace',
				binary: '111000',
				upperTrigram: 'Earth',
				lowerTrigram: 'Heaven',
				judgment: 'ZZREADINGJUDGMENT',
				image: 'ZZREADINGIMAGE',
				changingLines: [
					{
						position: 1,
						text: 'ZZREADINGLINE',
						meaning: 'ZZREADINGLINEMEANING',
					},
				],
			},
			readings: [
				'ZZREADINGJUDGMENT',
				'ZZREADINGIMAGE',
				'ZZREADINGLINE',
				'ZZREADINGLINEMEANING',
			],
			data_: ['11. Peace', 'Earth', 'Heaven'],
		},
		{
			name: 'roxy-biorhythm-chart (daily)',
			tag: 'roxy-biorhythm-chart',
			data: {
				quickRead: { physical: 0.5 },
				energyRating: 8,
				overallPhase: 'high',
				dailyMessage: 'ZZREADINGDAILY',
				advice: 'ZZREADINGADVICE',
				spotlight: {
					cycle: 'physical',
					value: 50,
					phase: 'high',
					message: 'ZZREADINGSPOT',
				},
			},
			readings: ['ZZREADINGDAILY', 'ZZREADINGADVICE', 'ZZREADINGSPOT'],
			data_: ['physical', 'Energy 8/10', '50%'],
			readingsSection: false,
		},
		{
			// The advisory accordion is the critical-days shape, not the daily one,
			// so the accordion path needs its own case.
			name: 'roxy-biorhythm-chart (critical days)',
			tag: 'roxy-biorhythm-chart',
			attrs: { mode: 'critical-days' },
			data: {
				startDate: '2026-08-01',
				endDate: '2026-08-31',
				totalCriticalDays: 1,
				criticalDays: [
					{
						date: '2026-08-12',
						cycle: 'physical',
						severity: 'high',
						direction: 'falling',
						period: 23,
						advisory: 'ZZREADINGADVISORY',
					},
				],
			},
			// The per-day rows live inside the advisory accordion and go with it, so
			// what survives here is the window and the counts.
			readings: ['ZZREADINGADVISORY'],
			data_: ['Critical days', 'Events', 'Aug 1, 2026'],
		},
		{
			name: 'roxy-bodygraph',
			tag: 'roxy-bodygraph',
			data: {
				type: 'Generator',
				typeDescription: 'ZZREADINGTYPE',
				strategy: 'Wait to respond',
				strategyDescription: 'ZZREADINGSTRATEGY',
				authority: 'Sacral',
				centers: [
					{
						id: 'sacral',
						name: 'Sacral',
						defined: true,
						theme: 'ZZREADINGTHEME',
					},
				],
				channels: [
					{
						gateA: 34,
						gateB: 20,
						name: 'Charisma',
						description: 'ZZREADINGCHANNEL',
					},
				],
				gates: [
					{
						gate: 34,
						line: 2,
						side: 'personality',
						gateName: 'Power',
						gateDescription: 'ZZREADINGGATE',
					},
				],
			},
			readings: [
				'ZZREADINGTYPE',
				'ZZREADINGSTRATEGY',
				'ZZREADINGTHEME',
				'ZZREADINGCHANNEL',
				'ZZREADINGGATE',
			],
			data_: ['Generator', 'Wait to respond', 'Sacral'],
		},
		{
			name: 'roxy-hd-type-card',
			tag: 'roxy-hd-type-card',
			data: {
				type: 'Generator',
				typeDescription: 'ZZREADINGTYPE',
				strategy: 'Wait to respond',
				strategyDescription: 'ZZREADINGSTRATEGY',
				authority: 'Sacral',
				authorityDescription: 'ZZREADINGAUTHORITY',
				aura: 'ZZREADINGAURA',
				signature: 'Satisfaction',
			},
			readings: [
				'ZZREADINGTYPE',
				'ZZREADINGSTRATEGY',
				'ZZREADINGAUTHORITY',
				'ZZREADINGAURA',
			],
			data_: ['Generator', 'Wait to respond', 'Satisfaction'],
		},
		{
			name: 'roxy-hd-connection',
			tag: 'roxy-hd-connection',
			data: {
				totalChannels: 1,
				combinedDefinition: 'single',
				summary: {
					electromagnetic: 1,
					dominance: 0,
					compromise: 0,
					companionship: 0,
				},
				centers: [
					{ id: 'sacral', name: 'Sacral', defined: true, definedBy: ['A'] },
				],
				channels: [
					{
						gateA: 34,
						gateB: 20,
						name: 'Charisma',
						circuit: 'Individual',
						dynamic: 'electromagnetic',
						centers: ['sacral'],
						personAGates: [34],
						personBGates: [20],
					},
				],
			},
			readings: [
				'reads the two charts as one bodygraph',
				'The classic point of attraction',
				'Defined is the state of the combined chart',
			],
			data_: ['Charisma', 'Sacral', '1 channels', 'Individual'],
		},
		{
			name: 'roxy-angel-number-lookup',
			tag: 'roxy-angel-number-lookup',
			data: {
				number: 1234,
				type: 'sequential',
				digits: 4,
				digitRoot: 1,
				knownMeaning: {
					title: 'Progress',
					coreMessage: 'ZZREADINGCORE',
					keywords: ['ZZREADINGKEYWORD'],
					meaning: { love: 'ZZREADINGLOVE' },
					affirmation: 'ZZREADINGAFFIRM',
				},
			},
			readings: [
				'ZZREADINGCORE',
				'ZZREADINGKEYWORD',
				'ZZREADINGLOVE',
				'ZZREADINGAFFIRM',
			],
			data_: ['1234', 'sequential', '4 digits', 'Digit root 1'],
		},
		{
			name: 'roxy-synastry-chart',
			tag: 'roxy-synastry-chart',
			data: {
				compatibilityScore: 78,
				analysis: {
					overall: 'ZZREADINGOVERALL',
					strengths: ['ZZREADINGSTRENGTH'],
					challenges: ['ZZREADINGCHALLENGE'],
				},
				summary: {
					total: 1,
					harmonious: 1,
					challenging: 0,
					neutral: 0,
					byType: { TRINE: 1 },
				},
				interAspects: [
					{
						planet1: 'Sun',
						planet2: 'Moon',
						type: 'TRINE',
						orb: 2.4,
						strength: 80,
						interpretation: 'harmonious',
						meaning: {
							relationshipContext: 'ZZREADINGCONTEXT',
							description: { short: 'ZZREADINGSHORT' },
							keywords: ['ZZREADINGKEYWORD'],
						},
					},
				],
				person1: {
					sunSign: 'Aries',
					planets: [{ name: 'Sun', longitude: 12 }],
				},
				person2: {
					sunSign: 'Libra',
					planets: [{ name: 'Sun', longitude: 200 }],
				},
			},
			readings: [
				'ZZREADINGOVERALL',
				'ZZREADINGSTRENGTH',
				'ZZREADINGCHALLENGE',
				'ZZREADINGCONTEXT',
				'ZZREADINGSHORT',
				'ZZREADINGKEYWORD',
			],
			// The contact line itself is data, so hiding the prose must leave the
			// header of every card standing.
			data_: ['78', 'Sun', 'Moon', 'Trine', 'orb 2.4', 'Harmonious: 1'],
			readingsSection: false,
		},
		{
			name: 'roxy-aspects-table',
			tag: 'roxy-aspects-table',
			data: {
				aspects: [
					{
						planet1: 'Sun',
						planet2: 'Moon',
						type: 'TRINE',
						orb: 2.4,
						strength: 80,
						isApplying: true,
						interpretation: 'harmonious',
						meaning: {
							description: { short: 'ZZREADINGSHORT' },
							keywords: ['ZZREADINGKEYWORD'],
						},
					},
				],
				summary: {
					total: 1,
					harmonious: 1,
					challenging: 0,
					neutral: 0,
					byType: { TRINE: 1 },
				},
			},
			readings: ['ZZREADINGSHORT', 'ZZREADINGKEYWORD'],
			data_: ['Sun', 'Moon', 'Trine', 'Applying', 'Harmonious: 1'],
			readingsSection: false,
		},
		{
			name: 'roxy-astrocartography-map',
			tag: 'roxy-astrocartography-map',
			data: {
				summary: 'ZZREADINGSUMMARY',
				lines: [
					{
						planet: 'Sun',
						symbol: '☉',
						mc: { longitude: 10, interpretation: 'ZZREADINGMC' },
						ic: { longitude: -170, interpretation: 'ZZREADINGIC' },
						ascendant: { points: [], interpretation: 'ZZREADINGAC' },
						descendant: { points: [], interpretation: 'ZZREADINGDC' },
					},
				],
			},
			readings: [
				'ZZREADINGSUMMARY',
				'ZZREADINGMC',
				'ZZREADINGIC',
				'ZZREADINGAC',
				'ZZREADINGDC',
			],
			data_: ['Astrocartography', 'Sun'],
		},
		{
			name: 'roxy-fixed-stars',
			tag: 'roxy-fixed-stars',
			data: {
				orb: 1,
				summary: 'ZZREADINGSUMMARY',
				conjunctions: [
					{
						point: 'MC',
						star: 'Regulus',
						orb: 0.42,
						interpretation: 'ZZREADINGCONTACT',
					},
				],
				stars: [],
			},
			readings: ['ZZREADINGSUMMARY', 'ZZREADINGCONTACT'],
			data_: ['Fixed stars', 'Regulus', 'MC', 'orb 0.42'],
			readingsSection: false,
		},
		{
			name: 'roxy-hd-variables',
			tag: 'roxy-hd-variables',
			data: {
				baseDescription: 'ZZREADINGBASE',
				arrows: [
					{
						name: 'Determination',
						position: 'Top left',
						direction: 'left',
						layer: 'Primary Health System',
						layerDescription: 'ZZREADINGLAYER',
						directionLabel: 'Active',
						colorLabel: 'Taste',
						color: 1,
						tone: 2,
						base: 3,
						description: 'ZZREADINGARROW',
						colorMeaning: 'ZZREADINGCOLOR',
						toneMeaning: 'ZZREADINGTONE',
						directionMeaning: 'ZZREADINGDIRECTION',
					},
				],
			},
			readings: [
				'ZZREADINGBASE',
				'ZZREADINGLAYER',
				'ZZREADINGARROW',
				'ZZREADINGCOLOR',
				'ZZREADINGTONE',
				'ZZREADINGDIRECTION',
			],
			data_: ['Variables', 'Determination', 'Active', 'Color 1'],
		},
		{
			name: 'roxy-dosha-card',
			tag: 'roxy-dosha-card',
			attrs: { type: 'sadhesati' },
			data: {
				present: true,
				severity: 'moderate',
				type: 'Rising',
				description: 'ZZREADINGDESC',
				effects: {
					career: 'ZZREADINGCAREER',
					phases: { Peak: 'ZZREADINGPEAK' },
				},
				remedies: ['ZZREADINGREMEDY'],
				exceptions: ['ZZREADINGEXCEPTION'],
				frame: { ayanamsa: 'lahiri', ayanamsaDegrees: 24.2131 },
			},
			readings: [
				'ZZREADINGDESC',
				'ZZREADINGCAREER',
				'ZZREADINGPEAK',
				'ZZREADINGREMEDY',
				'ZZREADINGEXCEPTION',
				// Each list carries its own heading, so the heading goes with it.
				'Remedies',
				'Exceptions',
			],
			// The phase IS the Sade Sati answer, so it has to outlive the prose.
			data_: [
				'Sade Sati',
				'Present',
				'Current phase',
				'Rising',
				'Sidereal frame',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-yoga-list (detect)',
			tag: 'roxy-yoga-list',
			data: {
				total: 1,
				frame: { ayanamsa: 'lahiri', ayanamsaDegrees: 23.7214 },
				yogas: [
					{
						name: 'Gaja Kesari',
						present: true,
						quality: 'Positive',
						family: 'classical',
						description: 'ZZREADINGDESC',
						result: 'ZZREADINGRESULT',
						evidence: 'Jupiter in kendra from the Moon',
					},
					{
						name: 'Kedara',
						present: false,
						suppressedBy: 'akriti',
						family: 'sankhya',
						description: 'ZZREADINGDESC2',
						evidence: 'All seven grahas fall in four rashis',
					},
				],
			},
			readings: [
				'ZZREADINGDESC',
				'ZZREADINGDESC2',
				'ZZREADINGRESULT',
				'Effects',
			],
			// The verdict, the family it was outranked by, and the classical evidence
			// behind both are the detection, not a read of it.
			data_: [
				'Detected yogas',
				'1 of 2 present',
				'Gaja Kesari',
				'Present',
				'Outranked by Akriti',
				'Jupiter in kendra from the Moon',
				'Sidereal frame',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-tarot-spread (three card)',
			tag: 'roxy-tarot-spread',
			data: {
				spread: 'three card',
				question: 'Should the move go ahead',
				positions: [
					{
						name: 'Past',
						card: { name: 'The Star', arcana: 'major', reversed: false },
						interpretation: 'ZZREADINGPOSITION',
					},
				],
				summary: 'ZZREADINGSUMMARY',
			},
			readings: ['ZZREADINGPOSITION', 'ZZREADINGSUMMARY'],
			// The question is the querent's own words echoed back, never a reading.
			data_: ['Three card', 'Should the move go ahead', 'Past', 'The Star'],
			readingsSection: false,
		},
		{
			name: 'roxy-tarot-spread (yes or no)',
			tag: 'roxy-tarot-spread',
			attrs: { spread: 'yes-no' },
			data: {
				answer: 'Yes',
				strength: 'strong',
				card: {
					name: 'The Sun',
					arcana: 'major',
					reversed: true,
					keywords: ['ZZREADINGKEYWORD'],
				},
				interpretation: 'ZZREADINGINTERP',
			},
			readings: ['ZZREADINGKEYWORD', 'ZZREADINGINTERP'],
			data_: [
				'Yes or no',
				'Yes',
				'strong',
				'The Sun',
				'(reversed)',
				'major arcana',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-profection-card',
			tag: 'roxy-profection-card',
			data: {
				age: 34,
				profectedHouse: 11,
				profectedSign: 'Aquarius',
				lordOfYear: 'Saturn',
				lordNatalPosition: { sign: 'Taurus', house: 2 },
				targetDate: '2026-08-07',
				interpretation: 'ZZREADINGINTERP',
			},
			readings: ['ZZREADINGINTERP'],
			data_: [
				'Annual profection',
				'34',
				'House 11',
				'Aquarius',
				'Saturn',
				'house 2',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-guna-milan',
			tag: 'roxy-guna-milan',
			data: {
				total: 24.5,
				maxScore: 36,
				percentage: 68,
				isCompatible: true,
				recommendation: 'ZZREADINGRECOMMENDATION',
				breakdown: [
					{
						category: 'Nadi',
						score: 8,
						maxScore: 8,
						person1: 'Aadi',
						person2: 'Madhya',
						description: 'Health and genetic compatibility',
					},
				],
				doshas: ['Bhakoot'],
				doshaCancellations: [{ dosha: 'Nadi', reason: 'same rashi' }],
				frame: { ayanamsa: 'lahiri', ayanamsaDegrees: 24.2131 },
			},
			readings: ['ZZREADINGRECOMMENDATION'],
			// The koota description says what the category evaluates and reads the same
			// for every couple, so it is a column gloss rather than a reading.
			data_: [
				'24.5',
				'Compatible',
				'Nadi',
				'Aadi',
				'Madhya',
				'Health and genetic compatibility',
				'Bhakoot',
				'Sidereal frame',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-gochara-table',
			tag: 'roxy-gochara-table',
			data: {
				transitDatetime: '2026-08-07T09:00:00Z',
				birthDatetime: '1990-01-01T09:00:00Z',
				transitingPlanets: [
					{
						name: 'Saturn',
						longitude: 310.5,
						sign: 'Aquarius',
						natalHouse: 10,
						kaksha: {
							number: 3,
							lord: 'Venus',
							startDegree: 7.5,
							endDegree: 11.25,
							bindu: true,
							binduCount: 5,
						},
						aspectsToNatal: [
							{ aspectType: 'conjunction', natalPlanet: 'Sun', orb: 4.6 },
						],
					},
				],
				keyTransits: [
					{
						planet: 'Saturn',
						description: 'ZZREADINGKEYTRANSIT',
						natalHouse: 10,
						aspects: [],
					},
				],
			},
			readings: ['ZZREADINGKEYTRANSIT', 'Key transits'],
			// The kaksha line is the calculation written out, not a read of it.
			data_: [
				'Gochara',
				'Saturn',
				'Aquarius',
				'natal house 10',
				'Kaksha',
				'ruled by Venus',
				'gave bindu',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-forecast-timeline',
			tag: 'roxy-forecast-timeline',
			data: {
				startDate: '2026-08-01',
				endDate: '2026-08-31',
				count: 1,
				events: [
					{
						date: '2026-08-12',
						domain: 'western',
						type: 'transit-aspect',
						body: 'saturn',
						target: 'moon',
						aspect: 'square',
						orb: 0.12,
						significance: 88,
						description: 'ZZREADINGEVENT',
					},
				],
			},
			readings: ['ZZREADINGEVENT'],
			// The headline is built from the structured fields, so the row is complete
			// without the sentence that restates it.
			data_: [
				'Forecast timeline',
				'Western',
				'Saturn',
				'Moon',
				'orb 0.1',
				'88',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-forecast-digest',
			tag: 'roxy-forecast-digest',
			data: {
				startDate: '2026-08-01',
				endDate: '2026-08-31',
				windows: [
					{
						days: 7,
						count: 2,
						byDomain: { western: 2 },
						top: [
							{
								date: '2026-08-12',
								domain: 'western',
								type: 'transit-aspect',
								significance: 88,
								description: 'ZZREADINGEVENT',
							},
						],
					},
				],
			},
			readings: ['ZZREADINGEVENT'],
			data_: ['Forecast digest', 'Next 7 days', '2 events', 'Western 2'],
			readingsSection: false,
		},
		{
			name: 'roxy-hd-penta',
			tag: 'roxy-hd-penta',
			data: {
				memberCount: 4,
				summary: {
					definedChannels: 1,
					filledGates: 1,
					coreDefined: true,
					gapGates: [31],
				},
				channels: [
					{
						gateA: 34,
						gateB: 20,
						name: 'Charisma',
						circuit: 'Individual',
						position: 'upper',
						defined: true,
						isCore: true,
						gateAHeldBy: [0],
						gateBHeldBy: [1, 2],
					},
				],
				gates: [
					{ gate: 34, gateName: 'Power', filled: true, heldBy: [0] },
					{ gate: 31, gateName: 'Leadership', filled: false, heldBy: [] },
				],
			},
			// Written here rather than returned by the endpoint, and still the report.
			readings: [
				'A penta is the field three to five people form',
				'Upper channels run from the G Center',
				'The role each gate brings to the group',
				'Core is the 2/14 Channel of the Beat',
			],
			// The lettering footnote is the legend those attributions are read through.
			data_: [
				'Penta',
				'4 members',
				'Upper (direction)',
				'Charisma',
				'Individual circuit',
				'Gates (1 of 2 filled)',
				'Gap',
				'Members are lettered in the order they were sent',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-moon-phase',
			tag: 'roxy-moon-phase',
			data: {
				phase: 'Waxing Gibbous Moon',
				date: '2026-08-07',
				illumination: 0.78,
				age: 10.2,
				sign: 'Sagittarius',
				distance: 384400,
				meaning: {
					symbol: '🌔',
					description: 'ZZREADINGMEANING',
					keywords: ['ZZREADINGKEYWORD'],
				},
			},
			readings: ['ZZREADINGMEANING', 'ZZREADINGKEYWORD'],
			data_: [
				'Waxing Gibbous Moon',
				'Illumination',
				'78%',
				'10.2 days',
				'Sagittarius',
				'384k km',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-horoscope-card (daily)',
			tag: 'roxy-horoscope-card',
			data: {
				sign: 'aries',
				date: '2026-08-07',
				energyRating: 8,
				overview: 'ZZREADINGOVERVIEW',
				love: 'ZZREADINGLOVE',
				career: 'ZZREADINGCAREER',
				health: 'ZZREADINGHEALTH',
				finance: 'ZZREADINGFINANCE',
				advice: 'ZZREADINGADVICE',
				moonSign: 'Libra',
				moonPhase: 'Waxing Gibbous',
				activeTransits: ['Mars trine natal Sun'],
				luckyNumber: 7,
				luckyColor: 'crimson',
				compatibleSigns: ['leo'],
			},
			readings: [
				'ZZREADINGOVERVIEW',
				'ZZREADINGLOVE',
				'ZZREADINGCAREER',
				'ZZREADINGHEALTH',
				'ZZREADINGFINANCE',
				'ZZREADINGADVICE',
				// Five headed paragraphs, so the headings go with the block.
				'Love',
				'Career',
				'Health',
				'Finance',
				'Advice',
			],
			// The sky strip is the evidence the reading was derived from, so it stays.
			data_: [
				'aries daily',
				'Energy 8/10',
				'Libra',
				'Waxing Gibbous',
				'Mars trine natal Sun',
				'Lucky number',
				'crimson',
				'leo',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-horoscope-card (monthly)',
			tag: 'roxy-horoscope-card',
			attrs: { period: 'monthly' },
			data: {
				sign: 'aries',
				month: 'August 2026',
				overview: 'ZZREADINGOVERVIEW',
				weekByWeek: [
					{ week: 1, focus: 'ZZREADINGFOCUS', advice: 'ZZREADINGWEEKADVICE' },
				],
				keyDates: [{ date: '2026-08-12', event: 'Full Moon in Aquarius' }],
			},
			readings: [
				'ZZREADINGOVERVIEW',
				'ZZREADINGFOCUS',
				'ZZREADINGWEEKADVICE',
				'Week by week',
			],
			// Dated lunations and ingresses are the month's ephemeris.
			data_: [
				'aries monthly',
				'August 2026',
				'Key dates',
				'Full Moon in Aquarius',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-crystal-card',
			tag: 'roxy-crystal-card',
			data: {
				name: 'Amethyst',
				description: 'ZZREADINGDESCRIPTION',
				planet: 'Jupiter',
				hardness: 7,
				numericalVibration: '3',
				birthMonth: 2,
				chakras: ['crown'],
				zodiacSigns: ['Pisces'],
				elements: ['Air'],
				colors: ['purple'],
				meaning: {
					spiritual: 'ZZREADINGSPIRITUAL',
					emotional: 'ZZREADINGEMOTIONAL',
					physical: 'ZZREADINGPHYSICAL',
				},
				keywords: ['ZZREADINGKEYWORD'],
				affirmation: 'ZZREADINGAFFIRMATION',
				pairsWith: ['clear-quartz'],
			},
			readings: [
				'ZZREADINGDESCRIPTION',
				'ZZREADINGSPIRITUAL',
				'ZZREADINGEMOTIONAL',
				'ZZREADINGPHYSICAL',
				'ZZREADINGKEYWORD',
				'ZZREADINGAFFIRMATION',
				'Spiritual',
				'Emotional',
				'Keywords',
			],
			// The mineral record: hardness, vibration, birthstone month, and the
			// catalogue relation to other stones.
			data_: [
				'Amethyst',
				'Jupiter',
				'7 Mohs',
				'February',
				'crown',
				'Pisces',
				'Air',
				'purple',
				'Pairs with',
				'clear quartz',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-angel-number-card',
			tag: 'roxy-angel-number-card',
			data: {
				number: 1111,
				title: 'Awakening',
				coreMessage: 'ZZREADINGCORE',
				type: 'repeating',
				digitRoot: 4,
				energy: 'positive',
				keywords: ['ZZREADINGKEYWORD'],
				meaning: { spiritual: 'ZZREADINGSPIRITUAL', love: 'ZZREADINGLOVE' },
				biblical: 'ZZREADINGBIBLICAL',
				shadow: 'ZZREADINGSHADOW',
				affirmation: 'ZZREADINGAFFIRMATION',
				actionSteps: ['ZZREADINGSTEP'],
			},
			readings: [
				'ZZREADINGCORE',
				'ZZREADINGKEYWORD',
				'ZZREADINGSPIRITUAL',
				'ZZREADINGLOVE',
				'ZZREADINGBIBLICAL',
				'ZZREADINGSHADOW',
				'ZZREADINGAFFIRMATION',
				'ZZREADINGSTEP',
				'Action steps',
			],
			data_: [
				'1111',
				'Angel number',
				'Awakening',
				'repeating',
				'Digit root 4',
				'positive',
			],
		},
		{
			name: 'roxy-nakshatra-card',
			tag: 'roxy-nakshatra-card',
			data: {
				name: 'Ashwini',
				number: 1,
				range: '0.00 to 13.20 Aries',
				lord: 'Ketu',
				deity: 'Ashwini Kumaras',
				symbol: 'Horse head',
				characteristics: 'ZZREADINGCHARACTERISTICS',
				remedies: {
					mantras: 'ZZREADINGMANTRA',
					gemstones: 'ZZREADINGGEMSTONE',
					rituals: 'ZZREADINGRITUAL',
				},
			},
			readings: [
				'ZZREADINGCHARACTERISTICS',
				'ZZREADINGMANTRA',
				'ZZREADINGGEMSTONE',
				'ZZREADINGRITUAL',
				'Characteristics',
				'Remedies',
			],
			data_: [
				'Ashwini',
				'Nakshatra 1 of 27',
				'0.00 to 13.20 Aries',
				'Ketu',
				'Ashwini Kumaras',
				'Horse head',
			],
			readingsSection: false,
		},
		{
			name: 'roxy-reference-card',
			tag: 'roxy-reference-card',
			data: {
				id: 'aries',
				name: 'Aries',
				symbol: '♈',
				element: 'Fire',
				modality: 'Cardinal',
				rulingPlanet: 'Mars',
				keywords: ['ZZREADINGKEYWORD'],
				motto: 'ZZREADINGMOTTO',
				gifts:
					'ZZREADINGGIFTS, and this sentence runs past the length at which a value is read as prose.',
				strengths: [
					'ZZREADINGSTRENGTH, which is a whole sentence rather than a value and is chipped only for want of a better shape.',
				],
				famous: ['Lady Gaga'],
				compatibleSigns: ['Leo'],
			},
			readings: [
				'ZZREADINGKEYWORD',
				'ZZREADINGMOTTO',
				'ZZREADINGGIFTS',
				'ZZREADINGSTRENGTH',
				// A list of sentences is prose laid out as chips, heading and all.
				'Strengths',
			],
			data_: [
				'Aries',
				'Reference',
				'Fire',
				'Cardinal',
				'Mars',
				'Famous',
				'Lady Gaga',
				'Compatible Signs',
				'Leo',
			],
			readingsSection: false,
		},
	];

	/**
	 * The one card where the attribute is a documented no-op, and the list a reader is promised in README.md and AGENTS.md.
	 *
	 * Pinned here so it cannot grow by accident: adding a component to it is a decision to ship an attribute that does nothing on that tag, and it has to be written into both of those files in the same change.
	 */
	const NO_OP: ReadingCase[] = [
		{
			name: 'roxy-dream-card',
			tag: 'roxy-dream-card',
			data: {
				id: 'water',
				name: 'Water',
				letter: 'w',
				meaning: 'ZZREADINGMEANING',
			},
			readings: [],
			data_: ['Water', 'ZZREADINGMEANING'],
			readingsSection: false,
		},
	];

	test.each(cases)('$name renders its readings by default', async ({
		tag,
		data,
		attrs,
		readings,
		data_,
	}: ReadingCase) => {
		const el = await mount(tag, data, attrs);
		const body = text(el);
		for (const r of readings) expect(body).toContain(r);
		for (const d of data_) expect(body).toContain(d);
		el.remove();
	});

	test.each(
		cases,
	)('$name drops every reading and keeps every fact under hide-readings', async ({
		tag,
		data,
		attrs,
		readings,
		data_,
	}: ReadingCase) => {
		const el = await mount(tag, data, {
			...(attrs ?? {}),
			'hide-readings': '',
		});
		const body = text(el);
		for (const r of readings) expect(body).not.toContain(r);
		for (const d of data_) expect(body).toContain(d);
		el.remove();
	});

	test('the default is off, and the property round-trips with the attribute', async () => {
		const el = await mount('roxy-natal-chart', natal);
		const typed = el as unknown as { hideReadings: boolean };
		expect(typed.hideReadings).toBe(false);
		expect(el.hasAttribute('hide-readings')).toBe(false);

		typed.hideReadings = true;
		await settled(el);
		expect(el.hasAttribute('hide-readings')).toBe(true);
		expect(text(el)).not.toContain('ZZREADINGPLANET');

		// Back off again: the prose returns, so nothing is destroyed on the way in.
		typed.hideReadings = false;
		await settled(el);
		expect(el.hasAttribute('hide-readings')).toBe(false);
		expect(text(el)).toContain('ZZREADINGPLANET');
		el.remove();
	});

	test('the natal wheel, the tabs and the aspect grid survive hide-readings', async () => {
		const el = await mount('roxy-natal-chart', natal, { 'hide-readings': '' });
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('svg[part="chart"]')).not.toBeNull();
		// Twelve sign glyphs is the wheel actually drawn, not just an <svg> present.
		expect(root.querySelectorAll('text.sign-glyph').length).toBe(12);
		expect(root.querySelector('[part~="tablist"]')).not.toBeNull();
		expect(root.querySelector('[part~="legend"]')).not.toBeNull();
		expect(root.querySelector('[part~="patterns"]')).not.toBeNull();
		expect(root.querySelector('[part~="readings"]')).toBeNull();
		el.remove();
	});

	/**
	 * Where the line falls INSIDE the chart patterns block, pinned in both
	 * directions.
	 *
	 * @remarks
	 * This block reads as an interpretation that `hide-readings`
	 * should have taken away, and the block does keep its labels. That is the
	 * documented contract rather than a miss: a T-Square is a geometric fact about
	 * where the bodies sit, so the figure, the element and modality it pivots on,
	 * its tightness and its planets are measurements, and only the paragraph is a
	 * reading. Both halves are asserted, because the tempting "fix" is to gate the
	 * whole block and that would silently drop five measurements a practitioner
	 * publishes deliberately.
	 *
	 * The same fixture runs through `<roxy-aspects-table>`, which renders the
	 * identical `patterns` payload. The two components must cut in the same place
	 * or the same figure appears and disappears depending on which tag a page
	 * reached for.
	 */
	test('the chart patterns block keeps its geometry and drops only its prose', async () => {
		const withFigure = {
			...natal,
			patterns: [
				{
					kind: 'T_SQUARE',
					name: 'T-Square',
					planets: ['Moon', 'Sun'],
					apex: 'Sun',
					element: 'Fire',
					modality: 'Cardinal',
					dissociate: true,
					tightness: 88,
					interpretation: 'ZZREADINGPATTERN',
				},
			],
		};
		// Every measurement in the card, and the one string that is a reading.
		const geometry = [
			'T-Square',
			'Fire',
			'Cardinal',
			'Dissociate',
			'88% tight',
			'Sun',
			'Moon',
			'apex',
		];

		for (const tag of ['roxy-natal-chart', 'roxy-aspects-table']) {
			const on = await mount(tag, withFigure);
			expect(text(on), `${tag} default`).toContain('ZZREADINGPATTERN');
			on.remove();

			const off = await mount(tag, withFigure, { 'hide-readings': '' });
			const body = text(off);
			expect(body, `${tag} hidden`).not.toContain('ZZREADINGPATTERN');
			for (const fact of geometry) {
				expect(body, `${tag} keeps ${fact}`).toContain(fact);
			}
			off.remove();
		}
	});

	/** The lever for a page that wants the block gone anyway. `hide-readings` is for prose; a block of measurements is removed by hiding its own part, which is what the README now shows. */
	test('the patterns block is targetable on its own part, separately from readings', async () => {
		const el = await mount('roxy-natal-chart', natal);
		const root = el.shadowRoot as ShadowRoot;
		const section = root.querySelector('[part~="patterns"]');
		// `section` plus its own name: the generic part is what the docs list, the
		// specific one is what a stylesheet targets.
		expect(section?.getAttribute('part')).toBe('section patterns');
		expect(section).not.toBe(root.querySelector('[part~="readings"]'));
		el.remove();
	});

	test('the dasha Readings tab goes with the readings, never left over an empty panel', async () => {
		const dasha = {
			mahadasha: {
				planet: 'Venus',
				startDate: '2020-01-01',
				endDate: '2040-01-01',
				durationYears: 20,
				interpretation: 'ZZREADINGDASHA',
			},
		};
		const on = await mount('roxy-dasha-timeline', dasha);
		expect(text(on)).toContain('Reading');
		on.remove();

		const off = await mount('roxy-dasha-timeline', dasha, {
			'hide-readings': '',
		});
		const body = text(off);
		expect(body).not.toContain('ZZREADINGDASHA');
		expect(body).not.toContain('Reading');
		// The periods themselves are the point of the card and stay.
		expect(body).toContain('Venus');
		expect(body).toContain('Mahadasha');
		off.remove();
	});

	/** A part stops at the shadow boundary, so a component that nests another has to re-export or the host page can reach only the outer one. Same for the attribute: it has to be forwarded or the inner readings ignore it. */
	test('the relocation wheel forwards hide-readings and re-exports the wheel parts', async () => {
		const relocation = {
			...natal,
			changes: {
				distanceKm: 1200,
				direction: 'north',
				ascendantSignChanged: false,
				angularPlanets: [],
				planetsChangedHouse: [],
			},
			interpretation: { summary: 'ZZREADINGRELOC' },
		};
		const el = await mount('roxy-relocation-wheel', relocation, {
			'hide-readings': '',
		});
		const root = el.shadowRoot as ShadowRoot;
		const inner = root.querySelector('roxy-natal-chart');
		expect(inner).not.toBeNull();
		expect(inner?.hasAttribute('hide-readings')).toBe(true);
		expect(inner?.getAttribute('exportparts') ?? '').toContain('readings');
		expect(text(el)).not.toContain('ZZREADINGRELOC');
		expect(text(el)).toContain('1,200 km north of birthplace');
		el.remove();
	});

	/**
	 * The vocabulary is the deliverable: one `::part(readings)` rule has to reach every component, including ones added later, so the name cannot vary per component.
	 */
	test('every reading accordion carries the same part names', async () => {
		for (const { name, tag, data, attrs, readingsSection } of cases) {
			const el = await mount(tag, data, attrs);
			const root = el.shadowRoot as ShadowRoot;
			if (readingsSection !== false) {
				const section = root.querySelector('[part~="readings"]');
				expect(section, `${name} should expose part="readings"`).not.toBeNull();
				expect(section?.getAttribute('part')).toContain('section');
			}
			// Whichever block holds it, every disclosure card is addressable by the
			// same name, so one ::part(reading) rule restyles the library.
			for (const card of root.querySelectorAll('.interp-card')) {
				expect(
					card.getAttribute('part'),
					`${name} has an .interp-card with no part`,
				).toContain('reading');
			}
			el.remove();
		}
	});

	test('the natal chart exposes its structural parts', async () => {
		const el = await mount('roxy-natal-chart', natal);
		const root = el.shadowRoot as ShadowRoot;
		const parts = [...root.querySelectorAll('[part]')].flatMap((n) =>
			(n.getAttribute('part') ?? '').split(/\s+/).filter(Boolean),
		);
		for (const name of [
			'card',
			'header',
			'tablist',
			'tab',
			'panel',
			'chart',
			'legend',
			'details',
			'section',
			'patterns',
			'pattern',
			'readings',
			'reading',
		]) {
			expect(parts, `natal chart should expose part ${name}`).toContain(name);
		}
		el.remove();
	});

	test('part names are kebab-case throughout the library', async () => {
		for (const { name, tag, data, attrs } of [...cases, ...NO_OP]) {
			const el = await mount(tag, data, attrs);
			for (const node of el.shadowRoot?.querySelectorAll('[part]') ?? []) {
				for (const part of (node.getAttribute('part') ?? '')
					.split(/\s+/)
					.filter(Boolean)) {
					expect(part, `${name} part "${part}"`).toMatch(/^[a-z][a-z0-9-]*$/);
				}
			}
			el.remove();
		}
	});

	/**
	 * `::part(card)` has to reach every component or the vocabulary is only half true: a host page that writes one border rule cannot be asked which tags it happens to apply to.
	 */
	test('every component exposes card and header, whatever else it draws', async () => {
		for (const { name, tag, data, attrs } of [...cases, ...NO_OP]) {
			const el = await mount(tag, data, attrs);
			const root = el.shadowRoot as ShadowRoot;
			for (const part of ['card', 'header']) {
				expect(
					root.querySelector(`[part~="${part}"]`),
					`${name} should expose part ${part}`,
				).not.toBeNull();
			}
			el.remove();
		}
	});

	/**
	 * A no-op has to be a decision rather than an omission, so it is asserted as one: the render is identical with the attribute and without it, and the prose the card exists for is still there.
	 */
	test.each(
		NO_OP,
	)('$name is a documented no-op and renders identically either way', async ({
		tag,
		data,
		attrs,
		data_,
	}: ReadingCase) => {
		const on = await mount(tag, data, attrs);
		const off = await mount(tag, data, {
			...(attrs ?? {}),
			'hide-readings': '',
		});
		expect(off.shadowRoot?.innerHTML).toBe(on.shadowRoot?.innerHTML ?? '');
		for (const d of data_) expect(text(off)).toContain(d);
		on.remove();
		off.remove();
	});

	/**
	 * The angel-number card hand-rolled its own `<details>` accordion, which was neither `.interp-card` markup nor a call to the shared helper, so it slipped past the guard that caught the other five. It draws the shared accordion now, and this pins that rather than the symptom.
	 */
	test('the angel number card draws the shared accordion, not a private one', async () => {
		const d = {
			number: 1111,
			title: 'Awakening',
			meaning: { spiritual: 'ZZREADINGSPIRITUAL' },
			biblical: 'ZZREADINGBIBLICAL',
		};
		const el = await mount('roxy-angel-number-card', d);
		const root = el.shadowRoot as ShadowRoot;
		const section = root.querySelector('[part~="readings"]');
		expect(section).not.toBeNull();
		expect(section?.getAttribute('part')).toContain('section');
		const rows = root.querySelectorAll('details');
		expect(rows.length).toBe(2);
		for (const row of rows) {
			expect(row.classList.contains('interp-card')).toBe(true);
			expect(row.getAttribute('part')).toContain('reading');
			// Exclusive, so the card grows by at most one open section.
			expect(row.getAttribute('name')).toBe('angel-meaning');
		}
		el.remove();
	});

	/**
	 * The one accepted cost in this batch, asserted so it stays the cost that was accepted. A digest row has no structured headline beside its sentence, so hiding the prose falls back to the shape a description-less event already renders in rather than emptying the row.
	 */
	test('a digest row keeps its date, its type and its significance without the prose', async () => {
		const digest = {
			startDate: '2026-08-01',
			endDate: '2026-08-31',
			windows: [
				{
					days: 7,
					count: 1,
					byDomain: { western: 1 },
					top: [
						{
							date: '2026-08-12',
							domain: 'western',
							type: 'transit-aspect',
							significance: 88,
							description: 'ZZREADINGEVENT',
						},
					],
				},
			],
		};
		const el = await mount('roxy-forecast-digest', digest, {
			'hide-readings': '',
		});
		const body = text(el);
		expect(body).not.toContain('ZZREADINGEVENT');
		expect(body).toContain('Transit aspect');
		expect(body).toContain('Next 7 days');
		expect(
			(el.shadowRoot as ShadowRoot).querySelector('[part~="legend"]'),
		).not.toBeNull();
		el.remove();
	});

	/**
	 * Hiding a section has to take its heading with it, or the card ships a heading over nothing: a lie to a reader and an axe `heading-order` risk to a scan.
	 */
	test('no heading is left standing over a section that was dropped', async () => {
		for (const { name, tag, data, attrs } of cases) {
			const el = await mount(tag, data, {
				...(attrs ?? {}),
				'hide-readings': '',
			});
			const root = el.shadowRoot as ShadowRoot;
			for (const heading of root.querySelectorAll('h2, h3')) {
				const block = heading.parentElement;
				if (!block) continue;
				const siblings = [...block.childNodes].filter(
					(n) => n !== heading && (n.textContent ?? '').trim().length > 0,
				);
				expect(
					siblings.length,
					`${name} left "${heading.textContent?.trim()}" over an empty block`,
				).toBeGreaterThan(0);
			}
			el.remove();
		}
	});
});

/**
 * The natal wheel draws twelve equal 30 degree sectors from the Ascendant when the response carries fewer than twelve cusps, and that is a DIFFERENT chart from a Placidus one.
 *
 * @remarks
 * It shipped silent: the numbers 1 to 12 went round the wheel, the SVG accessible name asserted `twelve houses` unconditionally, and the `{{system}} houses` legend chip simply vanished. So the one state where the drawing is the component's own construction was the one state that said nothing, and no reader could tell it from a real chart. Both halves are asserted here, in both directions, because a caveat that also shows on a good response is as useless as one that never shows.
 */
describe('the natal chart declares its equal-sector fallback', () => {
	const settled = (el: Element): Promise<void> =>
		(el as unknown as { updateComplete: Promise<void> }).updateComplete;

	/** Twelve UNEQUAL Placidus cusps, so the real path cannot be confused with the fallback. */
	const CUSPS = [
		85.7, 106.0, 126.7, 151.5, 184.3, 225.8, 265.7, 286.0, 306.7, 331.5, 4.3,
		45.8,
	].map((longitude, i) => ({ number: i + 1, longitude, sign: 'Aries' }));

	const chart = (houses: unknown) => ({
		planets: [{ name: 'Sun', longitude: 12.5, sign: 'Aries', degree: 12.5 }],
		aspects: [],
		houses,
		houseSystem: 'placidus',
		ascendant: { longitude: 85.7 },
		birthDetails: { date: '1990-01-15', time: '14:30:00' },
	});

	async function mount(houses: unknown) {
		const el = document.createElement('roxy-natal-chart') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = chart(houses);
		await settled(el);
		return el;
	}

	const CAVEAT = 'Equal sectors from the Ascendant';
	const TWELVE = 'Natal chart wheel with twelve houses, planets, and aspects';
	const FALLBACK =
		'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant';

	test('a response with all twelve cusps names its system and claims twelve houses', async () => {
		const el = await mount(CUSPS);
		const root = el.shadowRoot as ShadowRoot;
		const legend = root.querySelector('[part~="legend"]')?.textContent ?? '';
		expect(legend).toContain('placidus houses');
		expect(legend).not.toContain(CAVEAT);
		expect(root.querySelector('.caveat')).toBeNull();
		expect(
			root.querySelector('svg[part="chart"]')?.getAttribute('aria-label'),
		).toBe(TWELVE);
		// The real cusps are drawn, degree labels and all.
		expect(root.querySelectorAll('text.cusp-deg').length).toBe(12);
		el.remove();
	});

	test('a response with no cusps says so, visibly and in the accessible name', async () => {
		const el = await mount([]);
		const root = el.shadowRoot as ShadowRoot;
		const legend = root.querySelector('[part~="legend"]')?.textContent ?? '';
		expect(legend).toContain(CAVEAT);
		expect(legend).toContain('no house cusps in this response');
		// The system chip is GONE, not sitting beside the caveat contradicting it:
		// the system names cusps, and there are none.
		expect(legend).not.toContain('placidus houses');
		expect(
			root.querySelector('svg[part="chart"]')?.getAttribute('aria-label'),
		).toBe(FALLBACK);
		// No cusp degrees, because there are no cusps to print.
		expect(root.querySelectorAll('text.cusp-deg').length).toBe(0);
		// The sectors are still numbered and still drawn, so the chart is readable.
		expect(root.querySelectorAll('text.house-num').length).toBe(12);
		el.remove();
	});

	test('a partial cusp set is the fallback too, not a partly real wheel', async () => {
		// Eleven cusps is the shape that reads as data and is not: the old code
		// took `!== 12` as its condition and said nothing about it either.
		const el = await mount(CUSPS.slice(0, 11));
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('[part~="legend"]')?.textContent ?? '').toContain(
			CAVEAT,
		);
		expect(
			root.querySelector('svg[part="chart"]')?.getAttribute('aria-label'),
		).toBe(FALLBACK);
		el.remove();
	});

	test('the caveat is visible text, never a hidden or a screen-reader-only note', async () => {
		// The whole defect was that a reader could not distinguish the two charts,
		// so an sr-only caveat would be the same bug with a better conscience.
		const el = await mount([]);
		const root = el.shadowRoot as ShadowRoot;
		const caveat = root.querySelector('.caveat');
		expect(caveat).not.toBeNull();
		expect(caveat?.classList.contains('roxy-sr-only')).toBe(false);
		expect(caveat?.getAttribute('hidden')).toBeNull();
		expect((caveat?.textContent ?? '').trim().length).toBeGreaterThan(20);
		el.remove();
	});
});

/**
 * The second generic renderer against a response that carries its own translation.
 *
 * @remarks
 * `<roxy-reference-card>` builds its ENTIRE output from `Object.entries`, so it shares `<roxy-data>`'s exposure and had none of its repair: the day the API began echoing `nameLocalized` beside `name`, every non-English reference lookup drew one fact as two rows, each under its own heading, on a page whose owner changed nothing. It reached production, which `<roxy-data>` did not, because nothing here asserted the shape.
 *
 * The payload below is the real `/human-design/gates/51?lang=es` response, the one that exposed it live.
 *
 * Three levels read a key and each is covered, because folding at only one of them looks fixed from the outside: the record itself, a nested object one level down (`collect` recurses to depth 2), and the primitive join in `objectLabel` that labels an object inside an array.
 *
 * Sabotage-verified by dropping each `foldLocalized` call in turn: every one of these goes red on its own.
 */
describe('roxy-reference-card folds a localized field into the field it translates', () => {
	const mount = async (data: unknown) => {
		const el = document.createElement('roxy-reference-card') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = data;
		await settled(el);
		const root = el.shadowRoot as ShadowRoot;
		return {
			el,
			labels: [...root.querySelectorAll('dt')].map((dt) =>
				dt.textContent?.trim(),
			),
			values: [...root.querySelectorAll('dd')].map((dd) =>
				dd.textContent?.trim(),
			),
			text: (root.innerHTML ?? '').replace(/<style[\s\S]*?<\/style>/g, ''),
		};
	};

	/** The live Spanish gate lookup, verbatim. */
	const GATE = {
		number: 51,
		name: 'Shock',
		nameLocalized: 'Conmoción',
		centerName: 'Heart',
		centerNameLocalized: 'Corazón',
	};

	test('a translated lookup prints each fact ONCE, in the reader language', async () => {
		const { el, labels, values } = await mount(GATE);
		expect(labels).not.toContain('Name Localized');
		expect(labels).not.toContain('Center Name Localized');
		expect(labels.filter((l) => l === 'Center Name')).toHaveLength(1);
		expect(values).toContain('Corazón');
		expect(values).not.toContain('Heart');
		el.remove();
	});

	test('an English lookup, which carries no localized field, renders exactly as before', async () => {
		const { nameLocalized, centerNameLocalized, ...english } = GATE;
		expect([nameLocalized, centerNameLocalized]).toEqual([
			'Conmoción',
			'Corazón',
		]);
		const { el, values } = await mount(english);
		expect(values).toContain('Heart');
		expect(values).not.toContain('Corazón');
		el.remove();
	});

	test('a localized field with no canonical partner still renders', async () => {
		// Suppressing on the name alone would delete the only copy of the value.
		const { el, labels, values } = await mount({
			number: 51,
			noteLocalized: 'Nota',
		});
		expect(labels).toContain('Note Localized');
		expect(values).toContain('Nota');
		el.remove();
	});

	test('a nested object one level down folds too', async () => {
		const { el, labels, values } = await mount({
			number: 51,
			channel: { name: 'Shock', nameLocalized: 'Conmoción' },
		});
		expect(labels.some((l) => l?.includes('Localized'))).toBe(false);
		expect(values).toContain('Conmoción');
		expect(values).not.toContain('Shock');
		el.remove();
	});

	test('an object inside an array is labelled from the folded values only', async () => {
		// objectLabel joins every primitive, so an unfolded row reads
		// "Shock · Conmoción": the same fact twice inside one chip.
		const { el, text } = await mount({
			number: 51,
			partners: [{ name: 'Shock', nameLocalized: 'Conmoción' }],
		});
		expect(text).toContain('Conmoción');
		expect(text).not.toContain('Shock · Conmoción');
		el.remove();
	});
});

/**
 * The combined bodygraph a connection chart draws. The geometry is covered by
 * `bodygraph.test.ts`; what is asserted here is the mapping from the response to
 * the two sources, which is the whole reading: who carries which gate decides
 * whether a channel reads as one person holding it outright or as the two of them
 * completing it together.
 */
describe('roxy-hd-connection draws the combined bodygraph', () => {
	const CONNECTION = {
		totalChannels: 3,
		combinedDefinition: 'Single',
		summary: {
			electromagnetic: 1,
			dominance: 1,
			compromise: 1,
			companionship: 0,
		},
		centers: [
			{ id: 'sacral', name: 'Sacral', defined: true, definedBy: ['A'] },
			{ id: 'spleen', name: 'Spleen', defined: true, definedBy: ['B'] },
			{ id: 'head', name: 'Head', defined: false, definedBy: [] },
		],
		channels: [
			// One gate each: the channel completes only together.
			{
				gateA: 27,
				gateB: 50,
				name: 'Preservation',
				circuit: 'Tribal',
				dynamic: 'Electromagnetic',
				centers: ['sacral', 'spleen'],
				personAGates: [27],
				personBGates: [50],
			},
			// One person holds both gates and the other holds neither.
			{
				gateA: 3,
				gateB: 60,
				name: 'Mutation',
				circuit: 'Individual',
				dynamic: 'Dominance',
				centers: ['sacral', 'root'],
				personAGates: [3, 60],
				personBGates: [],
			},
			// Both hold gate 15, only A holds gate 5.
			{
				gateA: 15,
				gateB: 5,
				name: 'Rhythm',
				circuit: 'Collective',
				dynamic: 'Compromise',
				centers: ['g', 'sacral'],
				personAGates: [15, 5],
				personBGates: [15],
			},
		],
	};

	const mount = async () => {
		const el = document.createElement('roxy-hd-connection') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = CONNECTION;
		await settled(el);
		return el;
	};

	const chart = (el: Element) => el.shadowRoot as ShadowRoot;

	/** The mark drawn for one gate: which source classes its circle carries. */
	const sourcesOf = (root: ShadowRoot, gate: number): string[] => {
		const node = [...root.querySelectorAll('.bg-gate-node')].find(
			(g) => g.querySelector('.bg-gate')?.textContent?.trim() === String(gate),
		);
		return [...(node?.querySelectorAll('.bg-gate-dot.on') ?? [])].map((n) =>
			n.classList.contains('src-left')
				? 'left'
				: n.classList.contains('src-right')
					? 'right'
					: '?',
		);
	};

	test('draws every gate, not only the ones the two of them carry', async () => {
		const el = await mount();
		expect(chart(el).querySelectorAll('.bg-gate')).toHaveLength(64);
		el.remove();
	});

	test('a gate one person holds takes that person, a shared gate takes both', async () => {
		const el = await mount();
		const root = chart(el);
		expect(sourcesOf(root, 27)).toEqual(['left']);
		expect(sourcesOf(root, 50)).toEqual(['right']);
		// Held by both, so the circle is split rather than forced to one of them.
		expect(sourcesOf(root, 15).sort()).toEqual(['left', 'right']);
		expect(sourcesOf(root, 5)).toEqual(['left']);
		// A gate in no channel between them is a position on the chart, unmarked.
		expect(sourcesOf(root, 64)).toEqual([]);
		el.remove();
	});

	test('a channel one person holds outright draws in one colour, a shared one in two', async () => {
		const el = await mount();
		const root = chart(el);
		const halves = [...root.querySelectorAll('.bg-half')];
		const left = halves.filter((n) => n.classList.contains('src-left')).length;
		const right = halves.filter((n) =>
			n.classList.contains('src-right'),
		).length;
		// 27-50 contributes one half each way; 3-60 two lefts; 15-5 two lefts plus
		// the striped right half gate 15 adds.
		expect(left).toBe(5);
		expect(right).toBe(2);
		expect(halves.filter((n) => n.classList.contains('stripe'))).toHaveLength(
			1,
		);
		el.remove();
	});

	test('centers take the combined state', async () => {
		const el = await mount();
		const root = chart(el);
		expect(root.querySelectorAll('.bg-center.defined')).toHaveLength(2);
		expect(root.querySelectorAll('.bg-center')).toHaveLength(9);
		el.remove();
	});
});

/**
 * The angle marks on the natal wheel, which are the labels a reader looks at
 * first and the ones with no fixed spacing of their own.
 *
 * @remarks
 * ASC and DSC are always opposite, and so are MC and IC, so those four can never
 * crowd. Part of Fortune and the Vertex land wherever the chart puts them, and
 * either can fall a degree or two from an axis. Positions are read from the `x`
 * and `y` attributes the renderer writes rather than from a measured box, so the
 * invariant holds without a browser and cannot be masked by a font that happens
 * to be narrow.
 */
describe('natal wheel angle labels never print over each other', () => {
	const base = {
		planets: [{ name: 'Sun', longitude: 10, sign: 'Aries', degree: 10 }],
		houses: [],
		aspects: [],
	};

	const mountWheel = async (ascendant: number, extras: object) => {
		const el = document.createElement('roxy-natal-chart') as HTMLElement & {
			data?: unknown;
		};
		document.body.appendChild(el);
		el.data = { ...base, ascendant: { longitude: ascendant }, ...extras };
		await settled(el);
		return el;
	};

	/** Every angle label as the point the renderer placed it at. */
	const marks = (el: Element) =>
		[...(el.shadowRoot?.querySelectorAll('.angle-marker') ?? [])].map((t) => ({
			label: t.textContent?.trim() ?? '',
			x: Number(t.getAttribute('x')),
			y: Number(t.getAttribute('y')),
		}));

	/**
	 * The closest two labels come to each other. The renderer fans them to clear
	 * the widest label, so anything at or above that width is safe whichever way
	 * round the ring the pair happens to sit.
	 */
	const closest = (el: Element): { gap: number; pair: string } => {
		const m = marks(el);
		let gap = Number.POSITIVE_INFINITY;
		let pair = '';
		for (let i = 0; i < m.length; i++) {
			for (let j = i + 1; j < m.length; j++) {
				const d = Math.hypot(m[i].x - m[j].x, m[i].y - m[j].y);
				if (d < gap) {
					gap = d;
					pair = `${m[i].label}/${m[j].label}`;
				}
			}
		}
		return { gap, pair };
	};

	test('Part of Fortune landing on the Ascendant is moved clear of it', async () => {
		const el = await mountWheel(85.7, {
			midheaven: { longitude: 355.7 },
			partOfFortune: { longitude: 87.7 },
			vertex: { longitude: 200 },
		});
		// The fan sorts by longitude, so assert the SET rather than the order: which
		// order they land in the DOM is not something a reader can see.
		expect(
			marks(el)
				.map((m) => m.label)
				.sort(),
		).toEqual(['ASC', 'DSC', 'IC', 'MC', 'PoF', 'Vtx']);
		const { gap, pair } = closest(el);
		expect(gap, `${pair} only ${gap.toFixed(1)} apart`).toBeGreaterThanOrEqual(
			27,
		);
		el.remove();
	});

	test('three marks inside a couple of degrees all clear each other', async () => {
		const el = await mountWheel(200, {
			midheaven: { longitude: 110 },
			partOfFortune: { longitude: 201.5 },
			vertex: { longitude: 199 },
		});
		const { gap, pair } = closest(el);
		expect(gap, `${pair} only ${gap.toFixed(1)} apart`).toBeGreaterThanOrEqual(
			27,
		);
		el.remove();
	});

	test('an uncrowded chart is not fanned at all', async () => {
		// Nothing within the separation, so every label stays on its own tick and a
		// chart that never needed the fan draws exactly what it drew before.
		const el = await mountWheel(0, {
			midheaven: { longitude: 270 },
			partOfFortune: { longitude: 135 },
			vertex: { longitude: 45 },
		});
		const leaders = el.shadowRoot?.querySelectorAll('.angle-tick') ?? [];
		// One tick per mark and no leader among them.
		expect(leaders.length).toBe(marks(el).length);
		el.remove();
	});
});
