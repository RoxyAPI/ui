/**
 * @roxyapi/ui main entry. Importing this file registers every custom element.
 *
 * For tree-shake friendly usage, import per-component:
 *   import '@roxyapi/ui/components/natal-chart';
 */
export { RoxyBiorhythmChart } from './components/biorhythm-chart.js';
export { RoxyCompatibilityCard } from './components/compatibility-card.js';
export { RoxyDashaTimeline } from './components/dasha-timeline.js';
export { RoxyData } from './components/data.js';
export { RoxyDoshaCard } from './components/dosha-card.js';
export { RoxyEndpointForm } from './components/endpoint-form.js';
export { RoxyGunaMilan } from './components/guna-milan.js';
export { RoxyHexagram } from './components/hexagram.js';
export { RoxyHoroscopeCard } from './components/horoscope-card.js';
export { RoxyKpPlanetsTable } from './components/kp-planets-table.js';
export { RoxyLocationSearch } from './components/location-search.js';
export { RoxyMoonPhase } from './components/moon-phase.js';
export { RoxyNatalChart } from './components/natal-chart.js';
export { RoxyNumerologyCard } from './components/numerology-card.js';
export { RoxyPanchangTable } from './components/panchang-table.js';
export { RoxySynastryChart } from './components/synastry-chart.js';
export { RoxyTarotCard } from './components/tarot-card.js';
export { RoxyTarotSpread } from './components/tarot-spread.js';
export { RoxyVedicKundli } from './components/vedic-kundli.js';
export declare const ROXY_UI_VERSION = "0.1.0";
/** Component manifest used by the widgets auto-mount script and registry build. */
export declare const ROXY_UI_COMPONENTS: readonly ["natal-chart", "horoscope-card", "synastry-chart", "compatibility-card", "moon-phase", "vedic-kundli", "panchang-table", "dasha-timeline", "dosha-card", "guna-milan", "kp-planets-table", "numerology-card", "tarot-card", "tarot-spread", "biorhythm-chart", "hexagram", "endpoint-form", "location-search", "data"];
export type RoxyUIComponentName = (typeof ROXY_UI_COMPONENTS)[number];
//# sourceMappingURL=index.d.ts.map