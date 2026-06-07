/**
 * Single source of truth for component metadata. Every consumer that needs
 * the (tag, pascal, slug, description, heading) tuple reads from here:
 * scripts/build-react.ts, scripts/build-registry.ts, scripts/sync-docs.ts,
 * scripts/build-widgets.ts, and the browser-side apps/docs/manifest.js
 * (mirrored at build time).
 *
 * Hand-maintained. Add a component → add one entry here. The OpenAPI spec
 * does not yet carry component metadata, so this stays manual.
 */

export interface RoxyComponent {
	/** Pascal-case React export name, e.g. RoxyNatalChart */
	pascal: string;
	/** Custom-element tag, e.g. roxy-natal-chart */
	tag: string;
	/** Slug used in registry filenames and shadcn paths, e.g. natal-chart */
	slug: string;
	/** Short human-readable heading shown on demo cards. */
	heading: string;
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
		heading: 'Natal chart',
		description:
			'Western natal chart wheel for /astrology/natal-chart responses',
		docsLabel: 'Western',
		endpointLabel: 'POST /astrology/natal-chart',
		docsSummary: 'Natal chart wheel with planet glyphs and aspect lines',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxySynastryChart',
		tag: 'roxy-synastry-chart',
		slug: 'synastry-chart',
		heading: 'Synastry',
		description: 'Dual-wheel synastry chart with inter-aspects table',
		docsLabel: 'Western',
		endpointLabel: 'POST /astrology/synastry',
		docsSummary: 'Dual-wheel synastry with inter-aspects table',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyWesternPlanetsTable',
		tag: 'roxy-western-planets-table',
		slug: 'western-planets-table',
		heading: 'Western planets',
		description:
			'Western planetary positions table with sign, degree, house, and motion plus the chart angles',
		docsLabel: 'Western',
		endpointLabel: 'POST /astrology/natal-chart',
		docsSummary:
			'Sign, degree, house, motion columns plus ASC, MC, PoF, Vertex',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyTransitsTable',
		tag: 'roxy-transits-table',
		slug: 'transits-table',
		heading: 'Transits',
		description: 'Live planet positions plus aspects to a natal chart',
		docsLabel: 'Western',
		endpointLabel: 'POST /astrology/transits',
		docsSummary:
			'Transit planet positions plus optional aspects to a natal chart',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyMoonPhase',
		tag: 'roxy-moon-phase',
		slug: 'moon-phase',
		heading: 'Moon phase',
		description: 'Moon phase card and calendar',
		docsLabel: 'Western',
		endpointLabel: 'GET /astrology/moon-phase/{current,upcoming,calendar/...}',
		docsSummary: 'Moon phase card and calendar',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyHoroscopeCard',
		tag: 'roxy-horoscope-card',
		slug: 'horoscope-card',
		heading: 'Daily horoscope',
		description:
			'Daily, weekly, or monthly horoscope card for /astrology/horoscope/...',
		docsLabel: 'Western',
		endpointLabel: 'GET /astrology/horoscope/{sign}/{daily,weekly,monthly}',
		docsSummary: 'Daily, weekly, or monthly horoscope card',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyCompatibilityCard',
		tag: 'roxy-compatibility-card',
		slug: 'compatibility-card',
		heading: 'Compatibility score',
		description: 'Cross-domain compatibility score card',
		docsLabel: 'Cross',
		endpointLabel:
			'POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility',
		docsSummary: 'Score card with category breakdown',
		topic: 'Astrology',
	},
	{
		pascal: 'RoxyVedicKundli',
		tag: 'roxy-vedic-kundli',
		slug: 'vedic-kundli',
		heading: 'Vedic kundli',
		description:
			'South, North, or East Indian Vedic kundli for /vedic-astrology/birth-chart with per-planet degree and nakshatra detail, plus an optional Chandra Lagna (Moon-as-ascendant) reference view',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/birth-chart',
		docsSummary:
			'South, North, or East Indian kundli with degree detail and optional Chandra Lagna view',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyDivisionalChart',
		tag: 'roxy-divisional-chart',
		slug: 'divisional-chart',
		heading: 'Divisional chart',
		description: 'D2 to D60 varga chart wheel with Vargottama markers',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/divisional-chart',
		docsSummary:
			'Generic divisional varga wheel from D2 Hora to D60 Shashtiamsa',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyKpChart',
		tag: 'roxy-kp-chart',
		slug: 'kp-chart',
		heading: 'KP chart',
		description:
			'Full KP chart with Ascendant, Placidus cusps, and planets in tabbed stellar-hierarchy tables',
		docsLabel: 'Vedic (KP)',
		endpointLabel: 'POST /vedic-astrology/kp/chart',
		docsSummary: 'Ascendant, cusps, and planets with KP stellar hierarchy',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyVedicPlanetsTable',
		tag: 'roxy-vedic-planets-table',
		slug: 'vedic-planets-table',
		heading: 'Vedic planets',
		description:
			'Vedic planetary positions table with degree, nakshatra, pada, nakshatra lord, bhava, and avastha',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/birth-chart',
		docsSummary: 'Degree, nakshatra, pada, lord, bhava, avastha columns',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyKpPlanetsTable',
		tag: 'roxy-kp-planets-table',
		slug: 'kp-planets-table',
		heading: 'KP planets',
		description: 'KP planets table with sub-lord and sub-sub-lord columns',
		docsLabel: 'Vedic (KP)',
		endpointLabel: 'POST /vedic-astrology/kp/planets',
		docsSummary: 'Sub-lord and sub-sub-lord columns',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyKpRulingPlanets',
		tag: 'roxy-kp-ruling-planets',
		slug: 'kp-ruling-planets',
		heading: 'KP ruling planets',
		description:
			'KP ruling planets with day lord, Moon and Lagna stellar hierarchies, and house significators',
		docsLabel: 'Vedic (KP)',
		endpointLabel: 'POST /vedic-astrology/kp/ruling-planets',
		docsSummary:
			'Day lord, Moon/Lagna hierarchies, ruling planets, significators',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyAshtakavargaGrid',
		tag: 'roxy-ashtakavarga-grid',
		slug: 'ashtakavarga-grid',
		heading: 'Ashtakavarga',
		description: 'Sarva and Bhinna ashtakavarga heatmap with bindu scores',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/ashtakavarga',
		docsSummary: 'Sarva, Bhinna, and Shodhya Pinda views in a tabbed heatmap',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyShadbalaTable',
		tag: 'roxy-shadbala-table',
		slug: 'shadbala-table',
		heading: 'Shadbala',
		description: 'Six-fold planetary strength with adequacy badge per planet',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/shadbala',
		docsSummary:
			'Six-fold planetary strength bar plus rupas and adequacy badge',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyDashaTimeline',
		tag: 'roxy-dasha-timeline',
		slug: 'dasha-timeline',
		heading: 'Vimshottari dasha',
		description: 'Vimshottari dasha timeline with active mahadasha highlighted',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/dasha/{current,major,sub/...}',
		docsSummary: 'Vimshottari mahadasha + antardasha + pratyantardasha',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyGunaMilan',
		tag: 'roxy-guna-milan',
		slug: 'guna-milan',
		heading: 'Guna milan',
		description: '36-point Ashtakoota matrimonial compatibility breakdown',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/compatibility',
		docsSummary: '36-point Ashtakoota with eight sub-scores',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyPanchangTable',
		tag: 'roxy-panchang-table',
		slug: 'panchang-table',
		heading: 'Panchang',
		description:
			'Panchang muhurta table with auspicious and inauspicious periods',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/panchang/{basic,detailed}',
		docsSummary: '15+ muhurtas in detailed mode',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyChoghadiyaGrid',
		tag: 'roxy-choghadiya-grid',
		slug: 'choghadiya-grid',
		heading: 'Choghadiya',
		description: 'Day and night Choghadiya muhurta tiles for activity timing',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/panchang/choghadiya',
		docsSummary: 'Day and night Choghadiya muhurta tiles colored by effect',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyYogaList',
		tag: 'roxy-yoga-list',
		slug: 'yoga-list',
		heading: 'Yoga catalog',
		description:
			'Yoga reference cards from the catalog with optional detail mode',
		docsLabel: 'Vedic',
		endpointLabel: 'GET /vedic-astrology/yoga, /yoga/{id}',
		docsSummary: 'Filterable yoga cards from the 300 plus yoga catalog',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyNakshatraCard',
		tag: 'roxy-nakshatra-card',
		slug: 'nakshatra-card',
		heading: 'Nakshatra',
		description:
			'Nakshatra reference card with lord, deity, symbol, characteristics, and remedies',
		docsLabel: 'Vedic',
		endpointLabel: 'GET /vedic-astrology/nakshatras/{id}',
		docsSummary: 'Lord, deity, symbol, characteristics, remedies',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyDoshaCard',
		tag: 'roxy-dosha-card',
		slug: 'dosha-card',
		heading: 'Manglik dosha',
		description: 'Manglik, Kaal Sarp, or Sade Sati presence card',
		docsLabel: 'Vedic',
		endpointLabel: 'POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}',
		docsSummary: 'Presence, severity, remedies, scoped effects',
		topic: 'Vedic',
	},
	{
		pascal: 'RoxyNumerologyCard',
		tag: 'roxy-numerology-card',
		slug: 'numerology-card',
		heading: 'Life path number',
		description:
			'Numerology card for life path, expression, soul urge, personality, personal year, or full chart',
		docsLabel: 'Numerology',
		endpointLabel:
			'POST /numerology/{life-path,expression,soul-urge,personality,personal-year,chart}',
		docsSummary:
			'Life path, expression, soul urge, personality, personal year, full chart',
		topic: 'Numerology',
	},
	{
		pascal: 'RoxyTarotCard',
		tag: 'roxy-tarot-card',
		slug: 'tarot-card',
		heading: 'Daily tarot card',
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
		heading: 'Three-card spread',
		description:
			'Tarot spread renderer for three-card, Celtic Cross, love, or yes/no',
		docsLabel: 'Tarot',
		endpointLabel:
			'POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw',
		docsSummary: 'Spreads with positions and reading',
		topic: 'Tarot',
	},
	{
		pascal: 'RoxyBodygraph',
		tag: 'roxy-bodygraph',
		slug: 'bodygraph',
		heading: 'Bodygraph',
		description:
			'Human Design bodygraph with nine centers, channels, and activated gates plus a type, authority, and profile summary',
		docsLabel: 'Human Design',
		endpointLabel: 'POST /human-design/bodygraph',
		docsSummary:
			'Nine-center chart with defined and open centers, active channels, gates, and a type and authority summary',
		topic: 'Human Design',
	},
	{
		pascal: 'RoxyForecastTimeline',
		tag: 'roxy-forecast-timeline',
		slug: 'forecast-timeline',
		heading: 'Forecast timeline',
		description:
			'Cross-domain forecast event strip colored by domain and weighted by significance',
		docsLabel: 'Forecast',
		endpointLabel: 'POST /forecast/timeline',
		docsSummary:
			'Date-grouped events across Western, Vedic, and biorhythm domains, weighted by significance',
		topic: 'Forecast',
	},
	{
		pascal: 'RoxyBiorhythmChart',
		tag: 'roxy-biorhythm-chart',
		slug: 'biorhythm-chart',
		heading: 'Daily biorhythm',
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
		heading: 'I Ching hexagram',
		description:
			'I Ching hexagram with trigram glyphs, judgment, image, and changing lines',
		docsLabel: 'I Ching',
		endpointLabel:
			'GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast',
		docsSummary: 'Hexagram with trigrams, judgment, image, changing lines',
		topic: 'I Ching',
	},
	{
		pascal: 'RoxyCrystalGrid',
		tag: 'roxy-crystal-grid',
		slug: 'crystal-grid',
		heading: 'Crystal grid',
		description:
			'Responsive crystal gallery with photo, name, and colour swatches from any crystals list response',
		docsLabel: 'Crystals',
		endpointLabel:
			'GET /crystals, /crystals/chakra/{chakra}, /crystals/element/{element}, /crystals/zodiac/{sign}, /crystals/birthstone/{month}, /crystals/search',
		docsSummary: 'Crystal gallery tiles with photo, name, and colour swatches',
		topic: 'Crystals',
	},
	{
		pascal: 'RoxyDreamCard',
		tag: 'roxy-dream-card',
		slug: 'dream-card',
		heading: 'Dream symbol',
		description:
			'Dream symbol card with the symbol name, full interpretation, and dictionary letter',
		docsLabel: 'Dreams',
		endpointLabel: 'GET /dreams/symbols/{id}',
		docsSummary: 'Symbol name, interpretation body, and letter chip',
		topic: 'Dreams',
	},
	{
		pascal: 'RoxyAngelNumberCard',
		tag: 'roxy-angel-number-card',
		slug: 'angel-number-card',
		heading: 'Angel number',
		description:
			'Angel number card with title, core message, badges, keywords, life-area interpretations, affirmation, and action steps',
		docsLabel: 'Angel Numbers',
		endpointLabel: 'GET /angel-numbers/numbers/{number}',
		docsSummary:
			'Number meaning with spiritual, love, career, and twin flame sections',
		topic: 'Angel Numbers',
	},
	{
		pascal: 'RoxyAngelNumberLookup',
		tag: 'roxy-angel-number-lookup',
		slug: 'angel-number-lookup',
		heading: 'Angel number lookup',
		description:
			'Angel number sequence analysis with pattern classification, the known meaning when present, and a digit-root fallback for any number',
		docsLabel: 'Angel Numbers',
		endpointLabel: 'GET /angel-numbers/lookup',
		docsSummary: 'Pattern analysis plus known meaning and digit-root fallback',
		topic: 'Angel Numbers',
	},
	{
		pascal: 'RoxyEndpointForm',
		tag: 'roxy-endpoint-form',
		slug: 'endpoint-form',
		heading: 'Schema-driven form',
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
		heading: 'City search',
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
		heading: 'Generic renderer',
		description: 'Generic fallback renderer for any OpenAPI response shape',
		docsLabel: 'Helper',
		endpointLabel: 'Any response shape',
		docsSummary: 'Generic fallback renderer for unknown shapes',
		topic: 'Helpers',
		selfFetching: true,
	},
];

export type RoxyComponentSlug = (typeof ROXY_COMPONENTS)[number]['slug'];
