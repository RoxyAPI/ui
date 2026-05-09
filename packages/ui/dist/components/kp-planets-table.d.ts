import { LitElement } from 'lit';
interface KpPlanet {
    planet?: string;
    name?: string;
    sign?: string;
    signLord?: string;
    nakshatra?: string;
    nakshatraLord?: string;
    pada?: number;
    starLord?: string;
    subLord?: string;
    subSubLord?: string;
    kpNumber?: number;
    retrograde?: boolean;
    longitude?: number;
}
interface KpData {
    ayanamsa?: number | string;
    planets?: KpPlanet[];
}
/**
 * KP planets table with sub-lord and sub-sub-lord columns. Renders
 * /vedic-astrology/kp/planets.
 */
export declare class RoxyKpPlanetsTable extends LitElement {
    static styles: import("lit").CSSResult[];
    data: KpData | null;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-kp-planets-table': RoxyKpPlanetsTable;
    }
}
export {};
//# sourceMappingURL=kp-planets-table.d.ts.map