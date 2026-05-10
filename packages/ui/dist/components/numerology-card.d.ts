import { LitElement } from 'lit';
import type { CalculateExpressionResponse, CalculateLifePathResponse, CalculatePersonalYearResponse, GenerateNumerologyChartResponse } from '../types/index.js';
type NumerologyData = CalculateLifePathResponse | CalculateExpressionResponse | CalculatePersonalYearResponse | GenerateNumerologyChartResponse;
/**
 * Numerology card. Renders /numerology/{life-path,expression,personal-year,chart}.
 * Use the `type` attribute to switch the layout.
 */
export declare class RoxyNumerologyCard extends LitElement {
    static styles: import("lit").CSSResult[];
    data: NumerologyData | null;
    type: 'life-path' | 'expression' | 'personal-year' | 'chart';
    render(): import("lit").TemplateResult<1>;
    private renderNumberCard;
    private renderPersonalYear;
    private renderChart;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-numerology-card': RoxyNumerologyCard;
    }
}
export {};
//# sourceMappingURL=numerology-card.d.ts.map