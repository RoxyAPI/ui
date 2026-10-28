import type { TransitsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Transit positions and aspect table. Pass `data` from /astrology/transits.
 * When natalChart is included in the request, `data.transitAspects` and
 * `data.summary` are present and rendered automatically.
 */
export declare class RoxyTransitsTable extends RoxyDataElement<TransitsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which panel is showing: planet positions or the transit-to-natal aspects. */
    private tab;
    protected renderData(d: TransitsResponse): unknown;
    private renderSummaryCounts;
    private renderPlanetsTable;
    private renderAspectsList;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-transits-table': RoxyTransitsTable;
    }
}
