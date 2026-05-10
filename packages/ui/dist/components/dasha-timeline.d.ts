import { LitElement } from 'lit';
import type { GetCurrentDashaResponse, GetMajorDashasResponse, GetSubDashasResponse } from '../types/index.js';
type DashaData = GetCurrentDashaResponse | GetMajorDashasResponse | GetSubDashasResponse;
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