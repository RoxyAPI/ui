import { LitElement } from 'lit';
import type { BirthChartResponse } from '../types/index.js';
/**
 * Vedic kundli (D1 Rashi chart). South Indian style by default. Pass `data`
 * from /vedic-astrology/birth-chart. North Indian style via style="north".
 *
 * Lifted from jyotish-vedic-astrology-app/src/components/birth-chart.tsx,
 * keeping HOUSE_CENTERS + SIGN_POSITIONS + abbreviations, dropping the React
 * DOM color-probing hook in favor of CSS custom properties on :host.
 */
export declare class RoxyVedicKundli extends LitElement {
    static styles: import("lit").CSSResult[];
    data: BirthChartResponse | null;
    chartStyle: 'south' | 'north';
    private buildHouses;
    render(): import("lit").TemplateResult<1>;
    private isLagna;
    private renderHouseGroup;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vedic-kundli': RoxyVedicKundli;
    }
}
//# sourceMappingURL=vedic-kundli.d.ts.map