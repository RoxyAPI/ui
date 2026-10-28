import { nothing } from 'lit';
import type { GetAlmanacDayResponse, GetMonthlyAlmanacResponse, LookupAuspiciousDaysResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type AlmanacData = GetAlmanacDayResponse | GetMonthlyAlmanacResponse | LookupAuspiciousDaysResponse;
/**
 * Chinese almanac (Tong Shu). Pass `data` from GET /chinese-astrology/calendar/day/{date}, or set
 * `mode` and pass the monthly read or an auspicious-day search.
 *
 * @remarks
 * What a date-selection almanac is actually consulted for: the day officer, what the day favours,
 * what it avoids, and the animal it clashes with. A single day renders as a card; a month or a
 * search renders the same day as a row, so a reader scanning thirty of them reads the same fields
 * in the same order they read one.
 *
 * **`favours` and `avoids` are the answer, not a footnote.** Almanac users pick a date by reading
 * exactly those two lists, so they lead the body of the card rather than sitting under the pillars,
 * and they survive `hide-readings` because a list of activities is a lookup result rather than a
 * written interpretation. What goes is the day officer's meaning, which is the one paragraph on the
 * card that reads as prose.
 *
 * **The clash animal is a warning and it is never omitted.** The tradition holds that a day clashes
 * with one of the twelve animals outright, and a card that showed the favourable half without it
 * would be the half a reader needs least.
 *
 * **The chrome is now fully catalogued, and the activity lists read the published option, not the
 * wire id.** `favours` and `avoids` arrive as English kebab-case identifiers with no localized
 * sibling, so each item is read through `displayOption(lang, 'activity', ...)` against the same
 * `/languages/field-labels` payload the request field publishes, rather than printed as
 * `moving-house`. The day officer, the clashing animal and the lunar mansion all echo a
 * `nameLocalized`/`animalLocalized` sibling and are read through {@link display} for the same
 * reason.
 */
export declare class RoxyAlmanacDay extends RoxyDataElement<AlmanacData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which read the response is: one day, a whole month, or a search for a date to act on. */
    mode: 'day' | 'month' | 'auspicious';
    protected renderData(d: AlmanacData): typeof nothing | import("lit").TemplateResult<1>;
    /** The full card for one day. */
    private renderDayCard;
    /** The three pillars of the day, and the animal it clashes with. */
    private renderPillars;
    /** What the day favours and what it avoids, which is the whole reason an almanac is opened. */
    private renderLists;
    /** The lunar mansion the day sits under, with the animal and planet it carries. */
    private renderMansion;
    /** The solar terms that fall inside a month, which are what the month pillar turns on. */
    private renderSolarTerms;
    /** One day inside a month or a search result, carrying the same fields the card leads with. */
    private renderDayRow;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-almanac-day': RoxyAlmanacDay;
    }
}
export {};
