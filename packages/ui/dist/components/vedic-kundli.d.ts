import { LitElement } from 'lit';
import type { BirthChartResponse } from '../types/index.js';
/**
 * Vedic kundli (D1 Rashi chart). South Indian style by default. Pass `data`
 * from /vedic-astrology/birth-chart. North Indian style via chartStyle="north".
 *
 * Theming flows through CSS custom properties on :host, so the chart adopts
 * the host page palette without runtime color probing.
 */
export declare class RoxyVedicKundli extends LitElement {
    static styles: import("lit").CSSResult[];
    data: BirthChartResponse | null;
    chartStyle: 'south' | 'north';
    private buildHouses;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vedic-kundli': RoxyVedicKundli;
    }
}
//# sourceMappingURL=vedic-kundli.d.ts.map