import type { DivisionalChartResponse, NavamsaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { type ChartStyle } from '../utils/kundli-render.js';
/** The two responses this card draws: a chosen division, which names itself, and the navamsa, which is D9 by definition. */
type DivisionalData = DivisionalChartResponse | NavamsaResponse;
/**
 * Divisional chart renderer (D2-D60). Accepts a DivisionalChartResponse or a
 * NavamsaResponse and renders the same South / North / East kundli grid as the
 * birth chart, plus division metadata and Vargottama planet pills. A visible
 * tablist lets the end user switch styles at runtime. The varga response
 * carries a graha-keyed `chart.meta` map (no per-rashi buckets), so houses are
 * bucketed from that map.
 */
export declare class RoxyDivisionalChart extends RoxyDataElement<DivisionalData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly chartViewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    chartStyle: ChartStyle;
    private setStyle;
    private viewModel;
    protected renderData(d: DivisionalData): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-divisional-chart': RoxyDivisionalChart;
    }
}
export {};
