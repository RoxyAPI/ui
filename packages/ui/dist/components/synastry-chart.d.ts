import { LitElement } from 'lit';
import type { CalculateSynastryResponse, NatalChartResponse } from '../types/index.js';
type PlanetEntry = NatalChartResponse['planets'][number];
type SynastryWithPlanets = CalculateSynastryResponse & {
    person1?: {
        planets?: PlanetEntry[];
    };
    person2?: {
        planets?: PlanetEntry[];
    };
};
/**
 * Dual-wheel synastry chart with inter-aspects table. Pass `data` from
 * /astrology/synastry.
 */
export declare class RoxySynastryChart extends LitElement {
    static styles: import("lit").CSSResult[];
    data: SynastryWithPlanets | null;
    render(): import("lit").TemplateResult<1>;
    private toAngle;
    private renderSpokes;
    private renderSigns;
    private renderRing;
    private renderInterAspectLines;
    private renderAspects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-synastry-chart': RoxySynastryChart;
    }
}
export {};
//# sourceMappingURL=synastry-chart.d.ts.map