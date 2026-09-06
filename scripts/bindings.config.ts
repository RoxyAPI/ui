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
	// Both monthly ephemerides return the same shape, so one table serves both.
	// The Western one is declared first, which is what makes it the widget
	// default (declaration order, never sorted).
	getMonthlyTropicalEphemeris: [{ component: 'roxy-ephemeris-table' }],
	generateFixedStars: [{ component: 'roxy-fixed-stars' }],
	generateProfections: [{ component: 'roxy-profection-card' }],
	calculateCompatibility: [
		{ component: 'roxy-compatibility-card', attrs: { mode: 'astrology' } },
	],
	calculateTransits: [{ component: 'roxy-transits-table' }],
	// The VEDIC transit, singular, and a different response from calculateTransits
	// above: natal houses, aspects to the natal chart and the Gochara Kaksha.
	// Bound rather than left in UNBOUND_COMPONENTS because gochara is the daily
	// reading a practitioner opens, which is exactly the copy-paste audience.
	calculateTransit: [{ component: 'roxy-gochara-table' }],
	getUpagrahaPositions: [{ component: 'roxy-upagraha-table' }],
	calculateCharaKarakas: [{ component: 'roxy-chara-karakas' }],
	calculateArudhaPadas: [{ component: 'roxy-arudha-padas' }],
	getHeliacalVisibility: [{ component: 'roxy-heliacal-table' }],
	calculateBhavaBala: [{ component: 'roxy-bhava-bala-table' }],
	getVedicDailyReading: [{ component: 'roxy-vedic-daily' }],
	calculateBhavChalit: [{ component: 'roxy-bhav-chalit-table' }],
	calculateAspects: [{ component: 'roxy-aspects-table' }],
	// The bi-wheel leads: a practitioner reads transits ON the chart, and the
	// aspect rows are the same contacts in a list. Both render the one response.
	calculateTransitAspects: [
		{ component: 'roxy-transit-wheel' },
		{ component: 'roxy-aspects-table' },
	],
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
	getYearlyHoroscope: [
		{ component: 'roxy-horoscope-card', attrs: { period: 'yearly' } },
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
	// The Navagraha half of the shared ephemeris table; the Western half is
	// declared above and stays the widget default.
	getMonthlyEphemeris: [{ component: 'roxy-ephemeris-table' }],
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
	// The catalog, one yoga on its own, and a detection over a chart are three
	// reads the same card already draws. The catalog is declared first, which is
	// what keeps it the widget default.
	listYogas: [{ component: 'roxy-yoga-list' }],
	detectYogas: [{ component: 'roxy-yoga-list' }],
	getYoga: [{ component: 'roxy-yoga-list' }],
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

	// Tarot. The drawn card and the reference card are two reads of one deck and
	// one card renders both: the draw ships a single orientation and states it,
	// the reference card ships both and lets the reader pick. The draw is
	// declared first, which is what keeps it the widget default.
	getDailyCard: [{ component: 'roxy-tarot-card' }],
	getCard: [{ component: 'roxy-tarot-card' }],
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

	// Chinese astrology
	generateBaziChart: [{ component: 'roxy-bazi-chart' }],
	calculateLuckPillars: [{ component: 'roxy-luck-pillars' }],
	// One card, four questions about the same twelve animals. Declaration order is
	// the widget default, so the animal a date falls in leads.
	calculateZodiacAnimal: [
		{ component: 'roxy-zodiac-card', attrs: { mode: 'sign' } },
	],
	getZodiacAnimal: [
		{ component: 'roxy-zodiac-card', attrs: { mode: 'animal' } },
	],
	getDailyZodiacReading: [
		{ component: 'roxy-zodiac-card', attrs: { mode: 'daily' } },
	],
	getZodiacCompatibility: [
		{ component: 'roxy-zodiac-card', attrs: { mode: 'compatibility' } },
	],
	// The almanac: one day, a month of them, or a search for a date to act on.
	getAlmanacDay: [{ component: 'roxy-almanac-day', attrs: { mode: 'day' } }],
	getMonthlyAlmanac: [
		{ component: 'roxy-almanac-day', attrs: { mode: 'month' } },
	],
	lookupAuspiciousDays: [
		{ component: 'roxy-almanac-day', attrs: { mode: 'auspicious' } },
	],

	// Feng shui. The natal plate is declared first, so it is the widget default.
	generateFlyingStarChart: [
		{ component: 'roxy-flying-star-chart', attrs: { mode: 'natal' } },
	],
	getAnnualFlyingStars: [
		{ component: 'roxy-flying-star-chart', attrs: { mode: 'annual' } },
	],
	calculateKuaNumber: [{ component: 'roxy-kua-card', attrs: { mode: 'kua' } }],
	generateEightMansions: [
		{ component: 'roxy-kua-card', attrs: { mode: 'mansions' } },
	],

	// Mesoamerican astrology. The day sign leads, so it is the widget default; the
	// Calendar Round chart is the same card with the second calendar on it.
	calculateTzolkin: [
		{ component: 'roxy-mayan-day-sign', attrs: { mode: 'day' } },
	],
	generateMayanChart: [
		{ component: 'roxy-mayan-day-sign', attrs: { mode: 'chart' } },
	],

	// Vastu. The projected grid leads; the entrance read draws the same grid with
	// the door square lit.
	generateMandala: [
		{ component: 'roxy-vastu-mandala', attrs: { mode: 'mandala' } },
	],
	calculateEntrancePada: [
		{ component: 'roxy-vastu-mandala', attrs: { mode: 'entrance' } },
	],

	// Kabbalah
	calculateGematria: [{ component: 'roxy-gematria' }],

	// Ayurveda
	calculateAyurvedicConstitution: [{ component: 'roxy-dosha-constitution' }],

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

	// I Ching. One card, several reads of the same figure: a draw at random, a
	// hexagram by King Wen number, a lookup by line pattern, a cast with its
	// moving lines, and the hexagram of the day. Which one arrived is detected
	// from the payload, so none of them carries a selector attribute. The random
	// draw is declared first, which is what keeps it the widget default.
	getRandomHexagram: [{ component: 'roxy-hexagram' }],
	getHexagram: [{ component: 'roxy-hexagram' }],
	lookupHexagram: [{ component: 'roxy-hexagram' }],
	castReading: [{ component: 'roxy-hexagram' }],
	getDailyHexagram: [{ component: 'roxy-hexagram' }],
	// The daily cast nests a lighter hexagram and puts the moving-line readings at
	// the top level, so the card reads them from the resolved shape rather than
	// from the hexagram. Appended last, so no widget default moves.
	castDailyReading: [{ component: 'roxy-hexagram' }],

	// Dreams
	getDreamSymbol: [{ component: 'roxy-dream-card' }],
	searchDreamSymbols: [{ component: 'roxy-dream-search' }],

	// Angel numbers
	getAngelNumber: [{ component: 'roxy-angel-number-card' }],
	analyzeNumberSequence: [{ component: 'roxy-angel-number-lookup' }],

	// Crystals. Every list response carries the same `crystals` summary array, so
	// one gallery renders all of them and titles itself from whichever filter the
	// response echoes back. The chakra list is declared first, which is what keeps
	// it the widget default.
	getCrystalsByChakra: [{ component: 'roxy-crystal-grid' }],
	getCrystalsByElement: [{ component: 'roxy-crystal-grid' }],
	getCrystalsByZodiac: [{ component: 'roxy-crystal-grid' }],
	listCrystals: [{ component: 'roxy-crystal-grid' }],
	getBirthstones: [{ component: 'roxy-crystal-grid' }],
	searchCrystals: [{ component: 'roxy-crystal-grid' }],
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
	getAvastha: [{ component: 'roxy-reference-card' }],
};

/**
 * Components that render an endpoint response but are deliberately NOT bound above, with the endpoint each one takes.
 *
 * @remarks
 * A binding is what makes a component a one-tag widget: it enters the generated widget map, the demo Embed tab, and the hosted embed surfaces. An unbound component still ships in full as a web component and in both wrapper packages, and still self-fetches when given an explicit `data-endpoint` and a publishable key. Only the zero-config auto-mount path is withheld.
 *
 * **Empty on purpose.** Every component that renders an endpoint is now a widget. Add an entry here only for a genuine product reason, never because of bundle size: the widget map compresses at roughly ten to one, so a size argument for an entry here does not survive measuring the gzipped script.
 *
 * `bindings.test.ts` reads this map, so the every-component-is-bound gate keeps biting for everything absent from it.
 */
export const UNBOUND_COMPONENTS: Record<string, string> = {};
