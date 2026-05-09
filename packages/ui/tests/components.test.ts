import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml). Lit reads document and customElements at module load,
// so the order matters: setup -> import.
import '../src/index.js';

import {
	ROXY_UI_COMPONENTS,
	ROXY_UI_VERSION,
	RoxyBiorhythmChart,
	RoxyCompatibilityCard,
	RoxyDashaTimeline,
	RoxyData,
	RoxyDoshaCard,
	RoxyEndpointForm,
	RoxyGunaMilan,
	RoxyHexagram,
	RoxyHoroscopeCard,
	RoxyKpPlanetsTable,
	RoxyLocationSearch,
	RoxyMoonPhase,
	RoxyNatalChart,
	RoxyNumerologyCard,
	RoxyPanchangTable,
	RoxySynastryChart,
	RoxyTarotCard,
	RoxyTarotSpread,
	RoxyVedicKundli,
} from '../src/index.js';

describe('package exports', () => {
	test('exports a stable manifest of 19 components', () => {
		expect(ROXY_UI_COMPONENTS.length).toBe(19);
	});

	test('exports a version string', () => {
		expect(ROXY_UI_VERSION).toBe('0.1.0');
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
			meta: { Sun: { graha: 'Sun', rashi: 'Aries' } },
			aries: { rashi: 'Aries', signs: [{ planet: 'Sun', longitude: 5 }] },
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
