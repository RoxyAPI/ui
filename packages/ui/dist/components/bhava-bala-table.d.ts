import type { BhavaBalaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Bhava Bala: the strength of each of the twelve houses, ranked, with the three classical components that make up the total.
 *
 * @remarks
 * Read in RUPAS, not virupas, because rupas are the conventional unit a practitioner compares against and 60 virupas make one rupa. The virupa total is kept beside it since that is what the ranking is computed on.
 *
 * **The bar is proportional to the total across all twelve houses, never scaled to each row's own maximum.** Scaling per row would make the weakest bhava look as full as the strongest, which inverts the one thing this table exists to show. Same rule as the Shadbala bars.
 *
 * House meanings come from `houseThemes` on the response and are read through the shared `houseWords` helper, so this component holds no table of house significations of its own. The API has already chosen the vocabulary through `focus` and the language through `lang` by the time the response arrives.
 */
export declare class RoxyBhavaBalaTable extends RoxyDataElement<BhavaBalaResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: BhavaBalaResponse): unknown;
    private renderBhava;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-bhava-bala-table': RoxyBhavaBalaTable;
    }
}
