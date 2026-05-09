import { LitElement } from 'lit';
import { longitudeToSignPosition } from '../utils/degree.js';
interface PlanetEntry {
    name?: string;
    planet?: string;
    longitude?: number;
    degree?: number;
    sign?: string;
    house?: number;
    retrograde?: boolean;
    isRetrograde?: boolean;
}
interface AspectEntry {
    planet1?: string;
    planet2?: string;
    aspect?: string;
    orb?: number;
}
interface HouseEntry {
    house?: number;
    number?: number;
    cusp?: number;
    sign?: string;
}
interface NatalChartData {
    planets?: PlanetEntry[] | Record<string, PlanetEntry>;
    houses?: HouseEntry[];
    aspects?: AspectEntry[];
    ascendant?: number | {
        longitude?: number;
        sign?: string;
    };
    midheaven?: number | {
        longitude?: number;
        sign?: string;
    };
    birthDetails?: {
        date?: string;
        time?: string;
        location?: string;
    };
}
/**
 * Western natal chart wheel. Renders the 12 zodiac signs, 12 houses, planet
 * markers, and aspect lines from a /astrology/natal-chart response.
 */
export declare class RoxyNatalChart extends LitElement {
    static styles: import("lit").CSSResult[];
    data: NatalChartData | null;
    houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch';
    private getPlanets;
    render(): import("lit").TemplateResult<1>;
    private renderSpokes;
    private renderSigns;
    private renderHouseNumbers;
    private renderPlanets;
    private renderAspects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-natal-chart': RoxyNatalChart;
    }
}
export { longitudeToSignPosition };
//# sourceMappingURL=natal-chart.d.ts.map