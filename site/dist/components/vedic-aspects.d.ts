import type { CalculateDrishtiResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Vedic graha drishti (planetary aspects) table. Renders /vedic-astrology/aspects: which planet casts an aspect on which, by special Vedic rules (every graha aspects the 7th; Mars the 4th and 8th, Jupiter the 5th and 9th, Saturn the 3rd and 10th). Mutual aspects (two planets aspecting each other) are surfaced first as they are the strongest sambandha. Each row shows the aspecting planet, the aspect kind, the aspected planet, its strength and orb.
 *
 * @remarks
 * `datetime` is the chart time, the wall clock of the request, NOT UTC: hold the date and time fixed and vary `timezone` and every longitude in the response moves, while `datetime` does not. It is labelled "Chart time" for that reason. The spec description calling it UTC is wrong and is tracked upstream. The sidereal positions the aspects were derived from are shown above the table so a reader can check the drishti against the actual placements.
 */
export declare class RoxyVedicAspects extends RoxyDataElement<CalculateDrishtiResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: CalculateDrishtiResponse): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vedic-aspects': RoxyVedicAspects;
    }
}
