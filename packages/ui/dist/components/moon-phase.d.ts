import { LitElement, nothing } from 'lit';
import type { GetCurrentMoonPhaseResponse, GetMoonCalendarResponse, GetUpcomingMoonPhasesResponse } from '../types/index.js';
type MoonPhaseData = GetCurrentMoonPhaseResponse | GetUpcomingMoonPhasesResponse | GetMoonCalendarResponse;
/**
 * Moon phase card. Renders /astrology/moon-phase/{current,upcoming,calendar/...}.
 */
export declare class RoxyMoonPhase extends LitElement {
    static styles: import("lit").CSSResult[];
    data: MoonPhaseData | null;
    mode: 'current' | 'upcoming' | 'calendar';
    render(): import("lit").TemplateResult<1> | typeof nothing;
    private renderSingle;
    private renderListItem;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-moon-phase': RoxyMoonPhase;
    }
}
export {};
//# sourceMappingURL=moon-phase.d.ts.map