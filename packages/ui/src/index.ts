/**
 * @roxyapi/ui main entry. Importing this file registers every custom element.
 *
 * For tree-shake friendly usage, import per-component:
 *   import '@roxyapi/ui/components/natal-chart';
 */

// Angel numbers
export { RoxyAngelNumberCard } from './components/angel-number-card.js';
export { RoxyAngelNumberLookup } from './components/angel-number-lookup.js';
export { RoxyAshtakavargaGrid } from './components/ashtakavarga-grid.js';
// Western astrology
export { RoxyAspectsTable } from './components/aspects-table.js';
export { RoxyAstrocartographyMap } from './components/astrocartography-map.js';
// Biorhythm
export { RoxyBiorhythmChart } from './components/biorhythm-chart.js';
// Human Design
export { RoxyBodygraph } from './components/bodygraph.js';
export { RoxyChoghadiyaGrid } from './components/choghadiya-grid.js';
export { RoxyCompatibilityCard } from './components/compatibility-card.js';
// Crystals
export { RoxyCrystalCard } from './components/crystal-card.js';
export { RoxyCrystalGrid } from './components/crystal-grid.js';
export { RoxyDashaTimeline } from './components/dasha-timeline.js';
// Generic fallback first so it is always available for nested rendering
export { RoxyData } from './components/data.js';
export { RoxyDivisionalChart } from './components/divisional-chart.js';
export { RoxyDoshaCard } from './components/dosha-card.js';
// Dreams
export { RoxyDreamCard } from './components/dream-card.js';
export { RoxyDreamSearch } from './components/dream-search.js';
// Helpers
export { RoxyEndpointForm } from './components/endpoint-form.js';
export { RoxyFixedStars } from './components/fixed-stars.js';
// Forecast
export { RoxyForecastDigest } from './components/forecast-digest.js';
export { RoxyForecastTimeline } from './components/forecast-timeline.js';
export { RoxyGunaMilan } from './components/guna-milan.js';
// Human Design
export { RoxyHdConnection } from './components/hd-connection.js';
export { RoxyHdPenta } from './components/hd-penta.js';
export { RoxyHdTypeCard } from './components/hd-type-card.js';
export { RoxyHdVariables } from './components/hd-variables.js';
// I Ching
export { RoxyHexagram } from './components/hexagram.js';
export { RoxyHoraTable } from './components/hora-table.js';
export { RoxyHoroscopeCard } from './components/horoscope-card.js';
export { RoxyKpChart } from './components/kp-chart.js';
export { RoxyKpPlanetsTable } from './components/kp-planets-table.js';
export { RoxyKpRulingPlanets } from './components/kp-ruling-planets.js';
export { RoxyLocalSpaceCompass } from './components/local-space-compass.js';
export { RoxyLocationSearch } from './components/location-search.js';
export { RoxyMoonPhase } from './components/moon-phase.js';
export { RoxyNakshatraCard } from './components/nakshatra-card.js';
// Western astrology
export { RoxyNatalChart } from './components/natal-chart.js';
// Numerology
export { RoxyNumerologyCard } from './components/numerology-card.js';
export { RoxyPanchangTable } from './components/panchang-table.js';
export { RoxyPositionsTable } from './components/positions-table.js';
export { RoxyProfectionCard } from './components/profection-card.js';
export { RoxyReferenceCard } from './components/reference-card.js';
export { RoxyRelocationWheel } from './components/relocation-wheel.js';
export { RoxyShadbalaTable } from './components/shadbala-table.js';
export { RoxySynastryChart } from './components/synastry-chart.js';
// Tarot
export { RoxyTarotCard } from './components/tarot-card.js';
export { RoxyTarotCatalog } from './components/tarot-catalog.js';
export { RoxyTarotSpread } from './components/tarot-spread.js';
export { RoxyTransitsTable } from './components/transits-table.js';
// Vedic astrology
export { RoxyVedicAspects } from './components/vedic-aspects.js';
export { RoxyVedicKundli } from './components/vedic-kundli.js';
export { RoxyVedicPlanetsTable } from './components/vedic-planets-table.js';
export { RoxyWesternPlanetsTable } from './components/western-planets-table.js';
export { RoxyYogaList } from './components/yoga-list.js';

// SSR helpers for the server-rendered hydration path (Pattern 7). Safe writers
// for the inline <script class="roxy-data"> the MarkupDataController reads.
export {
	roxyDataScript,
	serializeRoxyData,
} from './utils/markup-data.js';

import { ROXY_COMPONENTS, type RoxyComponentSlug } from './manifest.js';

export {
	ROXY_COMPONENTS,
	type RoxyComponent,
	type RoxyComponentSlug,
} from './manifest.js';
export { ROXY_UI_VERSION } from './version.js';

/** Slugs in declaration order. Kept for the auto-mount widgets script and downstream codegen. */
export const ROXY_UI_COMPONENTS: readonly RoxyComponentSlug[] =
	ROXY_COMPONENTS.map((c) => c.slug) as RoxyComponentSlug[];
