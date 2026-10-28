import type { FindSignificantDatesResponse, ForecastTransitsResponse, GenerateTimelineResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/** Timeline, significant-dates, and forecast-transits all return the same `{ events, startDate, endDate, birthData, count }` shape. */
type ForecastTimelineData = GenerateTimelineResponse | FindSignificantDatesResponse | ForecastTransitsResponse;
/**
 * Cross-domain forecast timeline. Pass `data` from /forecast/timeline. Events
 * are grouped by calendar date down a vertical axis, each colored by its domain
 * and weighted by significance (0-100), showing the event type, body, target,
 * aspect, and description. The visual language matches the dasha timeline: a
 * left rail of dates, a significance bar per event, and a colored marker for
 * the domain.
 *
 * Theming flows through `--roxy-*` custom properties on `:host`.
 *
 * @remarks
 * `hide-readings` drops only `description`. Every event keeps its date, its domain marker, its significance bar and the headline built from the structured `body`, `aspect`, `target` and `orb`, so nothing factual is lost: the sentence restates that headline in prose, which is exactly the report a page supplying its own words does not want repeated under every row.
 */
export declare class RoxyForecastTimeline extends RoxyDataElement<ForecastTimelineData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: ForecastTimelineData): import("lit").TemplateResult<1>;
    /** Group events by their calendar date, preserving response order. */
    private groupByDate;
    private renderDay;
    private renderEvent;
    /**
     * Compact event headline built from the spec fields. Transit aspects read
     * "body aspect target"; ingresses, stations, eclipses, dasha changes, and
     * critical days fall back to "body" plus the qualifier the spec carries for
     * that type (station direction, eclipse kind). The aspect symbol is colored
     * by nature, matching the chart aspect encoding.
     */
    private renderHeadline;
    /** Type-specific qualifier text from the optional spec fields. */
    private typeQualifier;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-forecast-timeline': RoxyForecastTimeline;
    }
}
export {};
