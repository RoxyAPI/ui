import type { CalculateAspectsResponse, CalculateTransitAspectsResponse, DetectAspectPatternsResponse, NatalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Natal + transit aspect grid with chart-pattern detection. Renders three endpoints that share an aspects/patterns shape: /astrology/aspects (natal aspects + patterns + a harmonious/challenging summary), /astrology/transit-aspects (transiting-to-natal aspects with timing guidance), and /astrology/aspect-patterns (patterns only: grand trines, t-squares, stelliums, yods, kites). Each aspect row shows the two bodies, the aspect type in its family colour, its orb and strength, and an expandable interpretation; patterns render as labelled rows listing the planets they bind, apex first.
 */
type AspectsData = CalculateAspectsResponse | CalculateTransitAspectsResponse | DetectAspectPatternsResponse | Pick<NatalChartResponse, 'aspects'>;
export declare class RoxyAspectsTable extends RoxyDataElement<AspectsData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: AspectsData): unknown;
    private renderSummary;
    /**
     * The tightest transit by orb: the one aspect the client is most likely to
     * feel today. Lifted out of the list so it is not buried among the rest.
     */
    private renderStrongest;
    private renderAspect;
    private renderMeaning;
    private renderTransit;
    /**
     * One detected configuration. The apex (the focal planet a Kite, T-Square, or Yod discharges through) leads the chip row and is called out, since a T-Square read without its apex is not a reading. `element` and `modality` only appear on the kinds whose meaning pivots on them, so they are tags rather than columns.
     */
    private renderPattern;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-aspects-table': RoxyAspectsTable;
    }
}
export {};
