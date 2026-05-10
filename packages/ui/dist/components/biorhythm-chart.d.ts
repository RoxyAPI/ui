import { LitElement } from 'lit';
import type { GetCriticalDaysResponse, GetDailyBiorhythmResponse, GetForecastResponse } from '../types/index.js';
type BiorhythmData = GetDailyBiorhythmResponse | GetForecastResponse | GetCriticalDaysResponse;
/**
 * Biorhythm chart. Renders /biorhythm/{daily,forecast,critical-days}.
 */
export declare class RoxyBiorhythmChart extends LitElement {
    static styles: import("lit").CSSResult[];
    data: BiorhythmData | null;
    mode: 'daily' | 'forecast' | 'critical-days';
    render(): import("lit").TemplateResult<1>;
    private renderDaily;
    private renderForecast;
    private renderCritical;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-biorhythm-chart': RoxyBiorhythmChart;
    }
}
export {};
//# sourceMappingURL=biorhythm-chart.d.ts.map