import type { KpPlanetsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * KP planets table with sub-lord and sub-sub-lord columns. Renders
 * /vedic-astrology/kp/planets.
 */
export declare class RoxyKpPlanetsTable extends RoxyDataElement<KpPlanetsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: KpPlanetsResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-kp-planets-table': RoxyKpPlanetsTable;
    }
}
