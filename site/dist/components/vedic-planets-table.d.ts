import type { BirthChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Vedic planetary positions table. Renders /vedic-astrology/birth-chart `meta`
 * as the full reference-grade positions grid a practitioner reads alongside
 * the kundli wheel: graha, rashi, exact degree, nakshatra and pada, nakshatra
 * lord, bhava (house), all three avastha systems, and retrograde.
 *
 * @remarks
 * The three avastha systems each get their own column rather than one merged
 * state, because they answer different questions and a reader looks up exactly
 * one of them at a time: Baladi is the age state read from the degree, Jagradadi
 * the waking state and Deeptadi the dispositional state, both read from sign
 * dignity. Dignity is a relationship to a sign lord, which Rahu, Ketu and the
 * Lagna do not have, so the API returns only `awastha` for those three and their
 * last two cells are deliberately EMPTY. They are not rendered as a dash or a
 * placeholder: both read as data that failed to arrive.
 *
 * The positions grid is the default view. The same birth-chart response also
 * carries chart-wide conditions and readings, surfaced as collapsed accordions
 * below the grid so they never crowd the table: combust grahas (astangata),
 * planetary wars (graha yuddha), per-graha rashi and nakshatra interpretations,
 * the active classical yogas (present === true), and the twelve bhava
 * significations. Each accordion renders only when its source array or map is
 * non-empty.
 */
export declare class RoxyVedicPlanetsTable extends RoxyDataElement<BirthChartResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Ordered [name, entry] pairs: GRAHA_ORDER first, then any extras. */
    private orderedRows;
    protected renderData(d: BirthChartResponse): unknown;
    /**
     * Uranus, Neptune and Pluto, present only when the caller sent `modernPlanets: true`.
     *
     * @remarks
     * They arrive in their OWN array rather than inside `meta`, which is deliberate on the API side and load-bearing here: a component iterating `meta` must not pick them up by accident, because classical Jyotish is defined over nine grahas. The moderns rule no sign, so they have no dignity and therefore no Baladi, Jagradadi or Deeptadi state and no house lordship.
     *
     * Those cells are left BLANK rather than filled with a zero or a dash, matching what the nodes and the Lagna already do two columns over. A zero would read as a measured state of zero strength, which is a different and false claim from "this system does not apply here".
     */
    private renderModernRows;
    private renderCombustion;
    private renderPlanetaryWar;
    private renderInterpretations;
    private renderHouses;
    private renderYogas;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vedic-planets-table': RoxyVedicPlanetsTable;
    }
}
