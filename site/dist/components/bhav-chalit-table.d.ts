import type { BhavChalitResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Bhav Chalit: which house each graha actually falls in once the bhavas are cut at their real cusps rather than at sign boundaries.
 *
 * @remarks
 * **The reading is `moved`, and everything else is supporting detail.** A Bhav Chalit chart is opened to answer one question: does any graha change house between the whole-sign Rashi chart and the unequal Sripati cusps? So the count leads, the grahas that moved are called out with both placements, and the bhava spans sit underneath as the evidence.
 *
 * **Zero moved is a normal, meaningful result and must read as one.** It means the two charts agree, not that the request failed or that data is missing, so the empty case gets a sentence saying exactly that rather than an empty list.
 *
 * Bhava spans are rarely 30 degrees. The Ascendant and Midheaven are only 90 degrees apart at the equator and diverge sharply with latitude, so unequal spans are the expected result and the width is shown per bhava rather than assumed.
 *
 * House meanings come from `houseThemes` through the shared `houseWords` helper; this component holds no table of house significations.
 */
export declare class RoxyBhavChalitTable extends RoxyDataElement<BhavChalitResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: BhavChalitResponse): unknown;
    private renderMoved;
    private renderBhavaRow;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-bhav-chalit-table': RoxyBhavChalitTable;
    }
}
