import { LitElement } from 'lit';
interface DailyBiorhythm {
    birthDate?: string;
    targetDate?: string;
    daysSinceBirth?: number;
    cycles?: Record<string, number>;
    energyRating?: number;
    overallPhase?: string;
    interpretation?: string;
    advice?: string;
    criticalAlerts?: string[];
}
interface BiorhythmDay {
    date?: string;
    cycles?: Record<string, number>;
    energyRating?: number;
}
interface BiorhythmForecast {
    birthDate?: string;
    startDate?: string;
    endDate?: string;
    totalDays?: number;
    summary?: {
        bestDay?: string;
        worstDay?: string;
        criticalDayCount?: number;
        averageEnergy?: number;
        periodAdvice?: string;
    };
    days?: BiorhythmDay[];
}
interface CriticalDay {
    date?: string;
    cycle?: string;
    period?: string;
    direction?: string;
    severity?: string;
    advisory?: string;
}
interface CriticalDays {
    birthDate?: string;
    startDate?: string;
    endDate?: string;
    totalCriticalDays?: number;
    criticalDays?: CriticalDay[];
}
type BiorhythmData = DailyBiorhythm & BiorhythmForecast & CriticalDays;
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