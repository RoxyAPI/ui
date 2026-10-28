import { type TemplateResult } from 'lit';
import type { KpChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * KP (Krishnamurti Paddhati) chart. Renders /vedic-astrology/kp/chart: an
 * Ascendant summary, a planets-and-nodes table, a Placidus cusps table, and the
 * significator tables. The Ascendant is cusp 1, so its full four-lord chain is
 * already the first row of the cusps table and the header stays a summary.
 *
 * @remarks
 * The cusp and planet sub lords are the primary predictive surface in KP, so
 * every row carries star lord, sub lord, sub-sub lord, and KP number (1-249).
 * The significators tab is the event-timing surface: house-wise (which planets
 * signify each house) and planet-wise (which houses each planet signifies),
 * both graded L1 to L4 with the API's own level labels shown as the legend.
 *
 * Every bare house number is captioned from the response `houseThemes` map, so
 * "11, 6" reads "gains, enemies" and a cusp row says what that cusp is for. The
 * words are the requested language and the requested `focus` lens, which is why
 * they are read from the payload and never from a table held here.
 */
export declare class RoxyKpChart extends RoxyDataElement<KpChartResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    private activeTab;
    /** Merge the 7 planets and the two nodes into one ordered body list. */
    private bodies;
    protected renderData(d: KpChartResponse): TemplateResult<1>;
    private renderPlanets;
    private renderCusps;
    /**
     * The KP event-timing surface. House-wise answers "which planets can deliver
     * this house", planet-wise answers "what will this planet deliver in its
     * dasha". The L1-L4 legend text is the API's own level description, so the
     * grading a reader sees is the grading the engine applied.
     */
    private renderSignificators;
    /** A keyboard-scrollable box around a wide table, named by that table caption. */
    private scrollBox;
    /** The house wording under a number cell, or nothing when the request did not ask for themes. */
    private renderThemes;
    /** An em-dash-free placeholder keeps an empty level cell from reading as missing data. */
    private renderCell;
    private planetsAtLevel;
    private housesAtLevel;
    /** Level to the API's own label, taken from the first house that carries it. */
    private renderLevelLegend;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-kp-chart': RoxyKpChart;
    }
}
