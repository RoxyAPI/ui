/**
 * Single source of truth for component metadata. Every consumer that needs
 * the (tag, pascal, slug, domain, description, heading, endpoints) tuple
 * reads from here: scripts/build-react.ts, scripts/build-registry.ts,
 * scripts/sync-docs.ts, scripts/build-widgets.ts, and the browser-side
 * apps/docs/manifest.js (mirrored at build time).
 *
 * Hand-maintained. Add a component → add one entry here. The OpenAPI spec
 * does not yet carry component metadata, so this stays manual.
 */

export type RoxyDomain =
	| 'astrology'
	| 'vedic'
	| 'numerology'
	| 'tarot'
	| 'biorhythm'
	| 'iching'
	| 'utility';

export interface RoxyComponent {
	/** Pascal-case React export name, e.g. RoxyNatalChart */
	pascal: string;
	/** Custom-element tag, e.g. roxy-natal-chart */
	tag: string;
	/** Slug used in registry filenames and shadcn paths, e.g. natal-chart */
	slug: string;
	/** Domain bucket for filtering. */
	domain: RoxyDomain;
	/** Short human-readable heading shown on demo cards. */
	heading: string;
	/** SDK methods this component is designed to render. */
	endpoints: string[];
	/** One-line description for registry / docs / SEO meta. */
	description: string;
	/** Domain column label in the synced README/AGENTS table. */
	docsLabel: string;
	/** Endpoint(s) column body in the synced README/AGENTS table. */
	endpointLabel: string;
	/** What-it-renders column body in the synced README/AGENTS table. */
	docsSummary: string;
	/** Filter category in the browser demo grid. */
	topic: string;
	/**
	 * True when the component does not consume a typed RoxyAPI response from a
	 * customer server route. Three cases today:
	 *   - <roxy-data>: pure renderer, accepts any shape, no fetch.
	 *   - <roxy-location-search>: calls /location/search itself via publishable key.
	 *   - <roxy-endpoint-form>: introspects the OpenAPI spec, emits roxy-submit.
	 * The shadcn registry codegen emits a different doc body for these so we
	 * never document a server route example with an undefined `data` reference.
	 */
	selfFetching?: boolean;
}

export const ROXY_COMPONENTS: readonly RoxyComponent[] = [
	{
		pascal: 'RoxyNatalChart',
		tag: 'roxy-natal-chart',
		slug: 'natal-chart',
		domain: 'astrology',
		heading: 'Natal chart',
		endpoints: ['astrology.generateNatalChart'],
		description:
			'Western natal chart wheel for /astrology/natal-chart responses',
		docsLabel: 'Western',
		endpointLabel: 'POST /astrology/natal-chart',
		docsSummary: 'Natal chart wheel with planet glyphs and aspect lines',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyHoroscopeCard',
		tag: 'roxy-horoscope-card',
		slug: 'horoscope-card',
		domain: 'astrology',
		heading: 'Daily horoscope',
		endpoints: [
			'astrology.getDailyHoroscope',
			'astrology.getWeeklyHoroscope',
			'astrology.getMonthlyHoroscope',
		],
		description:
			'Daily, weekly, or monthly horoscope card for /astrology/horoscope/...',
		docsLabel: 'Western',
		endpointLabel: 'GET /astrology/horoscope/{sign}/{daily,weekly,monthly}',
		docsSummary: 'Daily, weekly, or monthly horoscope card',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxySynastryChart',
		tag: 'roxy-synastry-chart',
		slug: 'synastry-chart',
		domain: 'astrology',
		heading: 'Synastry',
		endpoints: ['astrology.calculateSynastry'],
		description: 'Dual-wheel synastry chart with inter-aspects table',
		docsLabel: 'Western',
		endpointLabel: 'POST /astrology/synastry',
		docsSummary: 'Dual-wheel synastry with inter-aspects table',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyCompatibilityCard',
		tag: 'roxy-compatibility-card',
		slug: 'compatibility-card',
		domain: 'astrology',
		heading: 'Compatibility score',
		endpoints: [
			'astrology.calculateCompatibility',
			'numerology.calculateNumCompatibility',
			'biorhythm.calculateBioCompatibility',
		],
		description: 'Cross-domain compatibility score card',
		docsLabel: 'Cross',
		endpointLabel:
			'POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility',
		docsSummary: 'Score card with category breakdown',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyMoonPhase',
		tag: 'roxy-moon-phase',
		slug: 'moon-phase',
		domain: 'astrology',
		heading: 'Moon phase',
		endpoints: [
			'astrology.getCurrentMoonPhase',
			'astrology.getUpcomingMoonPhases',
			'astrology.getMoonCalendar',
		],
		description: 'Moon phase card and calendar',
		docsLabel: 'Western',
		endpointLabel: 'GET /astrology/moon-phase/{current,upcoming,calendar/...}',
		docsSummary: 'Moon phase card and calendar',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyVedicKundli',
		tag: 'roxy-vedic-kundli',
		slug: 'vedic-kundli',
		domain: 'vedic',
		heading: 'Vedic kundli',
		endpoints: ['vedicAstrology.generateBirthChart'],
		description:
			'South or North Indian Vedic kundli for /vedic-astrology/birth-chart',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/birth-chart',
		docsSummary: 'South or North Indian kundli',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyPanchangTable',
		tag: 'roxy-panchang-table',
		slug: 'panchang-table',
		domain: 'vedic',
		heading: 'Panchang',
		endpoints: [
			'vedicAstrology.getBasicPanchang',
			'vedicAstrology.getDetailedPanchang',
		],
		description:
			'Panchang muhurta table with auspicious and inauspicious periods',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/panchang/{basic,detailed}',
		docsSummary: '15+ muhurtas in detailed mode',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyDashaTimeline',
		tag: 'roxy-dasha-timeline',
		slug: 'dasha-timeline',
		domain: 'vedic',
		heading: 'Vimshottari dasha',
		endpoints: [
			'vedicAstrology.getCurrentDasha',
			'vedicAstrology.getMajorDashas',
			'vedicAstrology.getSubDashas',
		],
		description: 'Vimshottari dasha timeline with active mahadasha highlighted',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/dasha/{current,major,sub/...}',
		docsSummary: 'Vimshottari mahadasha + antardasha + pratyantardasha',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyDoshaCard',
		tag: 'roxy-dosha-card',
		slug: 'dosha-card',
		domain: 'vedic',
		heading: 'Manglik dosha',
		endpoints: [
			'vedicAstrology.checkManglikDosha',
			'vedicAstrology.checkKalsarpaDosha',
			'vedicAstrology.checkSadhesati',
		],
		description: 'Manglik, Kaal Sarp, or Sade Sati presence card',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}',
		docsSummary: 'Presence, severity, remedies, scoped effects',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyGunaMilan',
		tag: 'roxy-guna-milan',
		slug: 'guna-milan',
		domain: 'vedic',
		heading: 'Guna milan',
		endpoints: ['vedicAstrology.calculateGunMilan'],
		description: '36-point Ashtakoota matrimonial compatibility breakdown',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/compatibility',
		docsSummary: '36-point Ashtakoota with eight sub-scores',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyKpPlanetsTable',
		tag: 'roxy-kp-planets-table',
		slug: 'kp-planets-table',
		domain: 'vedic',
		heading: 'KP planets',
		endpoints: ['vedicAstrology.getKpPlanets'],
		description: 'KP planets table with sub-lord and sub-sub-lord columns',
		docsLabel: 'Vedic (KP)',
		endpointLabel: 'POST /vedic-astrology/kp/planets',
		docsSummary: 'Sub-lord and sub-sub-lord columns',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyNumerologyCard',
		tag: 'roxy-numerology-card',
		slug: 'numerology-card',
		domain: 'numerology',
		heading: 'Life path number',
		endpoints: [
			'numerology.calculateLifePath',
			'numerology.calculateExpression',
			'numerology.calculatePersonalYear',
			'numerology.generateNumerologyChart',
		],
		description:
			'Numerology card for life path, expression, personal year, or full chart',
		docsLabel: 'Numerology',
		endpointLabel:
			'POST /numerology/{life-path,expression,personal-year,chart}',
		docsSummary: 'Life path, expression, personal year, full chart',
		topic: 'Numerology',
	},
	{
		pascal: 'RoxyTarotCard',
		tag: 'roxy-tarot-card',
		slug: 'tarot-card',
		domain: 'tarot',
		heading: 'Daily tarot card',
		endpoints: ['tarot.getCard', 'tarot.getDailyCard'],
		description: 'Single tarot card with upright/reversed flip animation',
		docsLabel: 'Tarot',
		endpointLabel: 'GET /tarot/cards/{id}, POST /tarot/daily',
		docsSummary: 'Single card with upright and reversed flip',
		topic: 'Tarot',
	},
	{
		pascal: 'RoxyTarotSpread',
		tag: 'roxy-tarot-spread',
		slug: 'tarot-spread',
		domain: 'tarot',
		heading: 'Three-card spread',
		endpoints: [
			'tarot.castThreeCard',
			'tarot.castCelticCross',
			'tarot.castLoveSpread',
			'tarot.castYesNo',
			'tarot.drawCards',
		],
		description:
			'Tarot spread renderer for three-card, Celtic Cross, love, or yes/no',
		docsLabel: 'Tarot',
		endpointLabel:
			'POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw',
		docsSummary: 'Spreads with positions and reading',
		topic: 'Tarot',
	},
	{
		pascal: 'RoxyBiorhythmChart',
		tag: 'roxy-biorhythm-chart',
		slug: 'biorhythm-chart',
		domain: 'biorhythm',
		heading: 'Daily biorhythm',
		endpoints: [
			'biorhythm.getDailyBiorhythm',
			'biorhythm.getForecast',
			'biorhythm.getCriticalDays',
		],
		description: 'Daily biorhythm bars or multi-day forecast cycle lines',
		docsLabel: 'Biorhythm',
		endpointLabel: 'POST /biorhythm/{daily,forecast,critical-days}',
		docsSummary: 'Daily bars, forecast cycle lines, critical days',
		topic: 'Biorhythm',
	},
	{
		pascal: 'RoxyHexagram',
		tag: 'roxy-hexagram',
		slug: 'hexagram',
		domain: 'iching',
		heading: 'I Ching hexagram',
		endpoints: [
			'iching.getHexagram',
			'iching.castReading',
			'iching.getDailyHexagram',
			'iching.castDailyReading',
			'iching.getRandomHexagram',
		],
		description:
			'I Ching hexagram with trigram glyphs, judgment, image, and changing lines',
		docsLabel: 'I Ching',
		endpointLabel:
			'GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast',
		docsSummary: 'Hexagram with trigrams, judgment, image, changing lines',
		topic: 'I Ching',
	},
	{
		pascal: 'RoxyEndpointForm',
		tag: 'roxy-endpoint-form',
		slug: 'endpoint-form',
		domain: 'utility',
		heading: 'Schema-driven form',
		endpoints: [],
		description:
			'Schema-driven form that emits roxy-submit with a validated payload',
		docsLabel: 'Helper',
		endpointLabel: 'Any endpoint via x-roxy-ui hints',
		docsSummary: 'Schema-driven form, emits roxy-submit',
		topic: 'Helpers',
		selfFetching: true,
	},
	{
		pascal: 'RoxyLocationSearch',
		tag: 'roxy-location-search',
		slug: 'location-search',
		domain: 'utility',
		heading: 'City search',
		endpoints: ['location.searchCities'],
		description: 'City search input with debounced /location/search calls',
		docsLabel: 'Helper',
		endpointLabel: 'GET /location/search',
		docsSummary: 'Debounced city search input, emits roxy-location-select',
		topic: 'Helpers',
		selfFetching: true,
	},
	{
		pascal: 'RoxyData',
		tag: 'roxy-data',
		slug: 'data',
		domain: 'utility',
		heading: 'Generic renderer',
		endpoints: [],
		description: 'Generic fallback renderer for any OpenAPI response shape',
		docsLabel: 'Helper',
		endpointLabel: 'Any response shape',
		docsSummary: 'Generic fallback renderer for unknown shapes',
		topic: 'Helpers',
		selfFetching: true,
	},
];

export type RoxyComponentTag = (typeof ROXY_COMPONENTS)[number]['tag'];
export type RoxyComponentSlug = (typeof ROXY_COMPONENTS)[number]['slug'];
