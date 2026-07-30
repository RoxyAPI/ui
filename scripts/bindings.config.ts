/**
 * Component-to-endpoint binding, owned by THIS repo (not the API). Declares
 * which component(s) render each endpoint's response and the config attributes
 * that select a variant on a multi-endpoint component. `scripts/sync-bindings.ts`
 * joins this map with `specs/openapi.json` by `operationId` (resolving each
 * operation's method + path) to generate `packages/ui/src/generated/endpoint-bindings.ts`.
 *
 * The API spec stays UI-agnostic: the binding lives here because this repo is
 * the one that knows its components. To change which endpoint a component
 * renders, edit this file and rerun `bun run bindings:sync` (or `bun run generate`).
 *
 * `attrs` values MUST match the component's actual attribute enum (e.g.
 * `roxy-dosha-card`'s `type` is `manglik | kalsarpa | sadhesati`), never
 * free-form. `operationId` keys MUST exist in the spec; `bindings.test.ts`
 * fails the build otherwise.
 */
export interface UiBinding {
	/** Custom-element tag that renders this operation's response, e.g. `roxy-natal-chart`. */
	component: string;
	/** Config attributes for this operation-to-component pairing; omit when the component needs none. */
	attrs?: Record<string, string>;
}

/** operationId -> the component(s) that render its response (primary visualization first). */
export const UI_BINDINGS: Record<string, UiBinding[]> = {
	// Western astrology
	generateNatalChart: [
		{ component: 'roxy-natal-chart' },
		{ component: 'roxy-western-planets-table' },
	],
	calculateSynastry: [{ component: 'roxy-synastry-chart' }],
	generateAstrocartography: [{ component: 'roxy-astrocartography-map' }],
	generateLocalSpace: [{ component: 'roxy-local-space-compass' }],
	generateRelocationChart: [{ component: 'roxy-relocation-wheel' }],
	// Point-list Western endpoints share one editorial positions table; it
	// detects the response shape and shows the columns that shape carries.
	generateAsteroids: [{ component: 'roxy-positions-table' }],
	generateLilith: [{ component: 'roxy-positions-table' }],
	generateProgressions: [{ component: 'roxy-positions-table' }],
	generateSolarArc: [{ component: 'roxy-positions-table' }],
	calculateArabicLots: [{ component: 'roxy-positions-table' }],
	generateFixedStars: [{ component: 'roxy-fixed-stars' }],
	generateProfections: [{ component: 'roxy-profection-card' }],
	calculateCompatibility: [
		{ component: 'roxy-compatibility-card', attrs: { mode: 'astrology' } },
	],
	calculateTransits: [{ component: 'roxy-transits-table' }],
	calculateAspects: [{ component: 'roxy-aspects-table' }],
	calculateTransitAspects: [{ component: 'roxy-aspects-table' }],
	detectAspectPatterns: [{ component: 'roxy-aspects-table' }],
	getCurrentMoonPhase: [
		{ component: 'roxy-moon-phase', attrs: { mode: 'current' } },
	],
	getUpcomingMoonPhases: [
		{ component: 'roxy-moon-phase', attrs: { mode: 'upcoming' } },
	],
	getMoonCalendar: [
		{ component: 'roxy-moon-phase', attrs: { mode: 'calendar' } },
	],
	getDailyHoroscope: [
		{ component: 'roxy-horoscope-card', attrs: { period: 'daily' } },
	],
	getWeeklyHoroscope: [
		{ component: 'roxy-horoscope-card', attrs: { period: 'weekly' } },
	],
	getMonthlyHoroscope: [
		{ component: 'roxy-horoscope-card', attrs: { period: 'monthly' } },
	],

	// Vedic astrology
	generateBirthChart: [
		{ component: 'roxy-vedic-kundli' },
		{ component: 'roxy-vedic-planets-table' },
	],
	generateDivisionalChart: [{ component: 'roxy-divisional-chart' }],
	// NavamsaResponse and DivisionalChartResponse both wrap the rashis under the
	// same `.chart`, and the component reads `data.chart.meta`, so the whole
	// response binds as-is. D9 is just the divisional chart the API names.
	generateNavamsa: [{ component: 'roxy-divisional-chart' }],
	generateKpChart: [{ component: 'roxy-kp-chart' }],
	getKpPlanets: [{ component: 'roxy-kp-planets-table' }],
	getKpRulingPlanets: [{ component: 'roxy-kp-ruling-planets' }],
	calculateAshtakavarga: [{ component: 'roxy-ashtakavarga-grid' }],
	calculateShadbala: [{ component: 'roxy-shadbala-table' }],
	getMajorDashas: [
		{ component: 'roxy-dasha-timeline', attrs: { period: 'major' } },
	],
	getCurrentDasha: [
		{ component: 'roxy-dasha-timeline', attrs: { period: 'current' } },
	],
	getSubDashas: [
		{ component: 'roxy-dasha-timeline', attrs: { period: 'sub' } },
	],
	getPratyantardashas: [
		{ component: 'roxy-dasha-timeline', attrs: { period: 'antara' } },
	],
	getSookshmaDashas: [
		{ component: 'roxy-dasha-timeline', attrs: { period: 'sookshma' } },
	],
	getPranaDashas: [
		{ component: 'roxy-dasha-timeline', attrs: { period: 'prana' } },
	],
	calculateGunMilan: [{ component: 'roxy-guna-milan' }],
	getDetailedPanchang: [
		{ component: 'roxy-panchang-table', attrs: { detail: 'detailed' } },
	],
	getBasicPanchang: [
		{ component: 'roxy-panchang-table', attrs: { detail: 'basic' } },
	],
	getChoghadiya: [{ component: 'roxy-choghadiya-grid' }],
	getHora: [{ component: 'roxy-hora-table' }],
	calculateDrishti: [{ component: 'roxy-vedic-aspects' }],
	listYogas: [{ component: 'roxy-yoga-list' }],
	detectYogas: [{ component: 'roxy-yoga-list' }],
	getNakshatra: [{ component: 'roxy-nakshatra-card' }],
	checkManglikDosha: [
		{ component: 'roxy-dosha-card', attrs: { type: 'manglik' } },
	],
	checkKalsarpaDosha: [
		{ component: 'roxy-dosha-card', attrs: { type: 'kalsarpa' } },
	],
	checkSadhesati: [
		{ component: 'roxy-dosha-card', attrs: { type: 'sadhesati' } },
	],

	// Numerology
	calculateLifePath: [
		{ component: 'roxy-numerology-card', attrs: { type: 'life-path' } },
	],
	calculateExpression: [
		{ component: 'roxy-numerology-card', attrs: { type: 'expression' } },
	],
	calculateSoulUrge: [
		{ component: 'roxy-numerology-card', attrs: { type: 'soul-urge' } },
	],
	calculatePersonality: [
		{ component: 'roxy-numerology-card', attrs: { type: 'personality' } },
	],
	calculateBirthDay: [
		{ component: 'roxy-numerology-card', attrs: { type: 'birth-day' } },
	],
	calculateMaturity: [
		{ component: 'roxy-numerology-card', attrs: { type: 'maturity' } },
	],
	getDailyNumber: [
		{ component: 'roxy-numerology-card', attrs: { type: 'daily' } },
	],
	calculatePersonalDay: [
		{ component: 'roxy-numerology-card', attrs: { type: 'personal-day' } },
	],
	calculatePersonalMonth: [
		{ component: 'roxy-numerology-card', attrs: { type: 'personal-month' } },
	],
	calculatePersonalYear: [
		{ component: 'roxy-numerology-card', attrs: { type: 'personal-year' } },
	],
	generateNumerologyChart: [
		{ component: 'roxy-numerology-card', attrs: { type: 'chart' } },
	],
	calculateNumCompatibility: [
		{ component: 'roxy-compatibility-card', attrs: { mode: 'numerology' } },
	],

	// Tarot
	getDailyCard: [{ component: 'roxy-tarot-card' }],
	castThreeCard: [
		{ component: 'roxy-tarot-spread', attrs: { spread: 'three-card' } },
	],
	castCelticCross: [
		{ component: 'roxy-tarot-spread', attrs: { spread: 'celtic-cross' } },
	],
	castLoveSpread: [
		{ component: 'roxy-tarot-spread', attrs: { spread: 'love' } },
	],
	castCareerSpread: [
		{ component: 'roxy-tarot-spread', attrs: { spread: 'career' } },
	],
	castCustomSpread: [
		{ component: 'roxy-tarot-spread', attrs: { spread: 'custom' } },
	],
	castYesNo: [{ component: 'roxy-tarot-spread', attrs: { spread: 'yes-no' } }],
	drawCards: [{ component: 'roxy-tarot-spread', attrs: { spread: 'draw' } }],
	listCards: [{ component: 'roxy-tarot-catalog' }],

	// Human design
	generateBodygraph: [{ component: 'roxy-bodygraph' }],
	// The type and profile reads are the identity half of the bodygraph response,
	// so one shape-detecting card renders both without the chart.
	calculateType: [{ component: 'roxy-hd-type-card' }],
	calculateProfile: [{ component: 'roxy-hd-type-card' }],
	calculateConnection: [{ component: 'roxy-hd-connection' }],
	calculatePenta: [{ component: 'roxy-hd-penta' }],
	calculateVariables: [{ component: 'roxy-hd-variables' }],

	// Forecast (timeline, significant-dates, and transits share one event shape)
	generateTimeline: [{ component: 'roxy-forecast-timeline' }],
	findSignificantDates: [{ component: 'roxy-forecast-timeline' }],
	forecastTransits: [{ component: 'roxy-forecast-timeline' }],
	generateDigest: [{ component: 'roxy-forecast-digest' }],

	// Biorhythm
	getDailyBiorhythm: [
		{ component: 'roxy-biorhythm-chart', attrs: { mode: 'daily' } },
	],
	getForecast: [
		{ component: 'roxy-biorhythm-chart', attrs: { mode: 'forecast' } },
	],
	getCriticalDays: [
		{ component: 'roxy-biorhythm-chart', attrs: { mode: 'critical-days' } },
	],
	calculateBioCompatibility: [
		{ component: 'roxy-compatibility-card', attrs: { mode: 'biorhythm' } },
	],

	// I Ching
	getRandomHexagram: [{ component: 'roxy-hexagram' }],

	// Dreams
	getDreamSymbol: [{ component: 'roxy-dream-card' }],
	searchDreamSymbols: [{ component: 'roxy-dream-search' }],

	// Angel numbers
	getAngelNumber: [{ component: 'roxy-angel-number-card' }],
	analyzeNumberSequence: [{ component: 'roxy-angel-number-lookup' }],

	// Crystals
	getCrystalsByChakra: [{ component: 'roxy-crystal-grid' }],
	getCrystalsByElement: [{ component: 'roxy-crystal-grid' }],
	getCrystalsByZodiac: [{ component: 'roxy-crystal-grid' }],
	getCrystal: [{ component: 'roxy-crystal-card' }],

	// Reference lookups (one heuristic card for all glossary reads)
	getZodiacSign: [{ component: 'roxy-reference-card' }],
	getPlanetMeaning: [{ component: 'roxy-reference-card' }],
	getRashi: [{ component: 'roxy-reference-card' }],
	getTrigram: [{ component: 'roxy-reference-card' }],
	getGate: [{ component: 'roxy-reference-card' }],
	getCenter: [{ component: 'roxy-reference-card' }],
	getNumberMeaning: [{ component: 'roxy-reference-card' }],
	getCompoundNumber: [{ component: 'roxy-reference-card' }],
};
