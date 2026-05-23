/**
 * @roxyapi/ui main entry. Importing this file registers every custom element.
 *
 * For tree-shake friendly usage, import per-component:
 *   import '@roxyapi/ui/components/natal-chart';
 */

export { RoxyAshtakavargaGrid } from './components/ashtakavarga-grid.js';
// Biorhythm
export { RoxyBiorhythmChart } from './components/biorhythm-chart.js';
// Human Design
export { RoxyBodygraph } from './components/bodygraph.js';
export { RoxyChoghadiyaGrid } from './components/choghadiya-grid.js';
export { RoxyCompatibilityCard } from './components/compatibility-card.js';
export { RoxyDashaTimeline } from './components/dasha-timeline.js';
// Generic fallback first so it is always available for nested rendering
export { RoxyData } from './components/data.js';
export { RoxyDivisionalChart } from './components/divisional-chart.js';
export { RoxyDoshaCard } from './components/dosha-card.js';
// Helpers
export { RoxyEndpointForm } from './components/endpoint-form.js';
// Forecast
export { RoxyForecastTimeline } from './components/forecast-timeline.js';
export { RoxyGunaMilan } from './components/guna-milan.js';
// I Ching
export { RoxyHexagram } from './components/hexagram.js';
export { RoxyHoroscopeCard } from './components/horoscope-card.js';
export { RoxyKpChart } from './components/kp-chart.js';
export { RoxyKpPlanetsTable } from './components/kp-planets-table.js';
export { RoxyKpRulingPlanets } from './components/kp-ruling-planets.js';
export { RoxyLocationSearch } from './components/location-search.js';
export { RoxyMoonPhase } from './components/moon-phase.js';
export { RoxyNakshatraCard } from './components/nakshatra-card.js';
// Western astrology
export { RoxyNatalChart } from './components/natal-chart.js';
// Numerology
export { RoxyNumerologyCard } from './components/numerology-card.js';
export { RoxyPanchangTable } from './components/panchang-table.js';
export { RoxyShadbalaTable } from './components/shadbala-table.js';
export { RoxySynastryChart } from './components/synastry-chart.js';
// Tarot
export { RoxyTarotCard } from './components/tarot-card.js';
export { RoxyTarotSpread } from './components/tarot-spread.js';
export { RoxyTransitsTable } from './components/transits-table.js';
// Vedic astrology
export { RoxyVedicKundli } from './components/vedic-kundli.js';
export { RoxyVedicPlanetsTable } from './components/vedic-planets-table.js';
export { RoxyWesternPlanetsTable } from './components/western-planets-table.js';
export { RoxyYogaList } from './components/yoga-list.js';

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
