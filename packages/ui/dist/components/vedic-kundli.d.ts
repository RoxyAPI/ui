import { LitElement } from 'lit';
interface KundliMeta {
    [planet: string]: {
        graha?: string;
        rashi?: string;
        longitude?: number;
        nakshatra?: string;
        isRetrograde?: boolean;
    };
}
interface KundliData {
    meta?: KundliMeta;
    houses?: Array<{
        house?: number;
        number?: number;
        sign?: string;
        planets?: string[];
    }>;
    combustion?: unknown[];
    planetaryWar?: unknown[];
    [rashi: string]: unknown;
}
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
    data: KundliData | null;
    chartStyle: 'south' | 'north';
    private buildHouses;
    render(): import("lit").TemplateResult<1>;
    private renderHouseGroup;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vedic-kundli': RoxyVedicKundli;
    }
}
export {};
//# sourceMappingURL=vedic-kundli.d.ts.map