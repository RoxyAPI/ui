import { nothing } from 'lit';
import type { GetCurrentMoonPhaseResponse, GetMoonCalendarResponse, GetUpcomingMoonPhasesResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type MoonPhaseData = GetCurrentMoonPhaseResponse | GetUpcomingMoonPhasesResponse | GetMoonCalendarResponse;
/**
 * Moon phase card. Renders /astrology/moon-phase/{current,upcoming,calendar/...}.
 *
 * @remarks
 * Every Moon is drawn from its own illumination: the current one, each day of a calendar month, and each principal phase of the upcoming list, its side read from the date, so a localized phase name is never parsed. `hide-readings` keeps the whole ephemeris half: the Moon, the phase name, the date, and the illumination, age, sign and distance tiles, plus every row of the upcoming and calendar lists. Only `meaning.description` and its keyword chips go.
 */
export declare class RoxyMoonPhase extends RoxyDataElement<MoonPhaseData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    mode: 'current' | 'upcoming' | 'calendar';
    protected renderData(d: MoonPhaseData): typeof nothing | import("lit").TemplateResult<1>;
    private renderSingle;
    private renderListItem;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-moon-phase': RoxyMoonPhase;
    }
}
export {};
