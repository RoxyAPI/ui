import type { CalculateBirthDayResponse, CalculateExpressionResponse, CalculateLifePathResponse, CalculateMaturityResponse, CalculatePersonalDayResponse, CalculatePersonalityResponse, CalculatePersonalMonthResponse, CalculatePersonalYearResponse, CalculateSoulUrgeResponse, GenerateNumerologyChartResponse, GetDailyNumberResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Single-number numerology responses that share the number + meaning + calculation + karmic-debt shape. {@link RoxyNumerologyCard.renderNumberCard} renders any of them; the `type` attribute selects only the heading label.
 */
type NumberCardData = CalculateLifePathResponse | CalculateExpressionResponse | CalculateSoulUrgeResponse | CalculatePersonalityResponse | CalculateBirthDayResponse | CalculateMaturityResponse;
type NumerologyData = NumberCardData | CalculatePersonalYearResponse | CalculatePersonalDayResponse | CalculatePersonalMonthResponse | GetDailyNumberResponse | GenerateNumerologyChartResponse;
/**
 * Numerology card. Renders /numerology/{life-path,expression,soul-urge,personality,birth-day,maturity,daily,personal-day,personal-month,personal-year,chart}.
 * Use the `type` attribute to switch the heading; the single-number types all share one layout.
 */
export declare class RoxyNumerologyCard extends RoxyDataElement<NumerologyData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    type: 'life-path' | 'expression' | 'soul-urge' | 'personality' | 'birth-day' | 'maturity' | 'daily' | 'personal-day' | 'personal-month' | 'personal-year' | 'chart';
    protected renderData(d: NumerologyData): import("lit").TemplateResult<1>;
    private renderNumberCard;
    /** The daily number carries the same full interpretation as a core number, plus the message for the day. */
    private renderDailyNumber;
    /** A personal day sits inside its personal month, which sits inside its personal year. Dropping that nesting strips the day of the context that gives it meaning. */
    private renderPersonalDay;
    private renderPersonalMonth;
    private renderPersonalYear;
    private renderChart;
    /** Everything the chart carries beyond the six core numbers: the karmic analysis, the current year and month, the four pinnacles and their paired challenges, the name-derived numbers, and the letter analysis. */
    private renderInsights;
    /** Hero row shared by every single-number view: the numeral, the label, the archetype, and the master-number badge when the number is 11, 22, or 33. */
    private renderHero;
    /**
     * Keyword chips, the strengths and challenges lists, and the three life-area readings behind a disclosure. The whole interpretation, laid out as a reading.
     *
     * Every part of it is prose or the shorthand of prose, so `hide-readings` drops the block whole rather than gating three pieces.
     */
    private renderReading;
    /**
     * Side-by-side prose lists. Each entry names a trait and explains it, so they are bulleted paragraphs, never chips.
     *
     * @remarks
     * `h3`, not `h4`. This renders at the TOP level of the single-number card, where the only heading above it is the `h2` title, so an `h4` skips a level and fails the axe `heading-order` rule. Inside a chart section or an accordion body the heading above is already an `h3`, and a repeated level is fine: the rule flags skips, not repeats.
     */
    private renderLists;
    private attr;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-numerology-card': RoxyNumerologyCard;
    }
}
export {};
