import { LitElement } from 'lit';
import type { NatalChartResponse } from '../types/index.js';
/**
 * Western natal chart wheel. Renders the 12 zodiac signs, 12 houses, planet
 * markers, and aspect lines from a /astrology/natal-chart response.
 */
export declare class RoxyNatalChart extends LitElement {
    static styles: import("lit").CSSResult[];
    data: NatalChartResponse | null;
    houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch';
    private getPlanets;
    private getAscendant;
    private getMidheaven;
    private toAngle;
    render(): import("lit").TemplateResult<1>;
    private renderAngles;
    private renderAngleMark;
    private renderSpokes;
    private renderSigns;
    private renderHouseNumbers;
    private renderPlanets;
    private renderDetails;
    private renderInterpretations;
    private renderAspects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-natal-chart': RoxyNatalChart;
    }
}
//# sourceMappingURL=natal-chart.d.ts.map