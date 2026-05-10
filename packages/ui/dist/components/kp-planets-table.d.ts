import { LitElement } from 'lit';
import type { KpPlanetsResponse } from '../types/index.js';
/**
 * KP planets table with sub-lord and sub-sub-lord columns. Renders
 * /vedic-astrology/kp/planets.
 */
export declare class RoxyKpPlanetsTable extends LitElement {
    static styles: import("lit").CSSResult[];
    data: KpPlanetsResponse | null;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-kp-planets-table': RoxyKpPlanetsTable;
    }
}
//# sourceMappingURL=kp-planets-table.d.ts.map