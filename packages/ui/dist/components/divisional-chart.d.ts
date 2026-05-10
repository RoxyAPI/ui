import { LitElement } from 'lit';
import type { DivisionalChartResponse } from '../types/index.js';
/**
 * Divisional chart renderer (D2-D60). Accepts a DivisionalChartResponse and
 * renders the same south/north kundli wheel as the birth chart, plus division
 * metadata and Vargottama planet pills.
 */
export declare class RoxyDivisionalChart extends LitElement {
    static styles: import("lit").CSSResult[];
    data: DivisionalChartResponse | null;
    chartStyle: 'south' | 'north';
    private buildHouses;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-divisional-chart': RoxyDivisionalChart;
    }
}
//# sourceMappingURL=divisional-chart.d.ts.map