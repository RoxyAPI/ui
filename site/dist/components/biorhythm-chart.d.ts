import type { GetCriticalDaysResponse, GetDailyBiorhythmResponse, GetForecastResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type BiorhythmData = GetDailyBiorhythmResponse | GetForecastResponse | GetCriticalDaysResponse;
/**
 * Biorhythm chart. Renders /biorhythm/{daily,forecast,critical-days}.
 */
export declare class RoxyBiorhythmChart extends RoxyDataElement<BiorhythmData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    mode: 'daily' | 'forecast' | 'critical-days';
    protected renderData(d: BiorhythmData): import("lit").TemplateResult<1>;
    private renderDaily;
    private renderForecast;
    private renderForecastData;
    private renderCritical;
    /** A critical day severity as a reader sees it, empty for the base case. */
    private severityName;
    private stat;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-biorhythm-chart': RoxyBiorhythmChart;
    }
}
export {};
