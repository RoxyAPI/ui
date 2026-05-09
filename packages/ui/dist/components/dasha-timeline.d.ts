import { LitElement } from 'lit';
interface DashaPeriod {
    mahadashaLord?: string;
    antardashaLord?: string;
    pratyantardashaLord?: string;
    lord?: string;
    planet?: string;
    startDate?: string;
    endDate?: string;
    years?: number;
    durationYears?: number;
}
interface DashaData {
    moonNakshatra?: string;
    nakshatraName?: string;
    nakshatraLord?: string;
    mahadasha?: DashaPeriod;
    antardasha?: DashaPeriod;
    pratyantardasha?: DashaPeriod;
    mahadashas?: DashaPeriod[];
    antardashas?: DashaPeriod[];
    mahadashaLord?: string;
    mahadashaPeriod?: DashaPeriod;
    birthDashaBalance?: {
        lord?: string;
        years?: number;
    };
    totalYears?: number;
    remainingInMahadasha?: number;
    remainingInAntardasha?: number;
    remainingInPratyantardasha?: number;
}
/**
 * Dasha timeline. Renders /vedic-astrology/dasha/{current,major,sub/{...}}.
 * Default mode shows the active mahadasha + antardasha + pratyantardasha.
 * Switch to period="major" for the full 120-year Vimshottari timeline.
 */
export declare class RoxyDashaTimeline extends LitElement {
    static styles: import("lit").CSSResult[];
    data: DashaData | null;
    period: 'current' | 'major' | 'sub';
    render(): import("lit").TemplateResult<1>;
    private renderCurrent;
    private collectPeriods;
    private renderBar;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-dasha-timeline': RoxyDashaTimeline;
    }
}
export {};
//# sourceMappingURL=dasha-timeline.d.ts.map