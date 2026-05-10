import { LitElement } from 'lit';
import type { TransitsResponse } from '../types/index.js';
/**
 * Transit positions and aspect table. Pass `data` from /astrology/transits.
 * When natalChart is included in the request, `data.transitAspects` and
 * `data.summary` are present and rendered automatically.
 */
export declare class RoxyTransitsTable extends LitElement {
    static styles: import("lit").CSSResult[];
    data: TransitsResponse | null;
    render(): import("lit").TemplateResult<1>;
    private renderSummaryPills;
    private renderPlanetsTable;
    private renderAspectsList;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-transits-table': RoxyTransitsTable;
    }
}
//# sourceMappingURL=transits-table.d.ts.map