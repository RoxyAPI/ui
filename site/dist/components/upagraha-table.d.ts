import type { UpagrahaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Upagraha positions. Renders /vedic-astrology/upagraha: the eleven upagrahas (shadowy sub-planets) in the two groups the tradition separates them into, each with its sidereal longitude, rashi, degree in sign, and nakshatra with pada.
 *
 * @remarks
 * Gulika and Mandi are rendered as the two SEPARATE points they are. Several implementations treat the names as synonyms and print one row; the two are computed from different moments of the Saturn segment and sit a few degrees apart, which is exactly the difference a practitioner is checking when they open this table.
 *
 * Row order is the response order and is not re-sorted: the API returns each group in its classical derivation order, which is the order the positions are computed and taught in.
 */
export declare class RoxyUpagrahaTable extends RoxyDataElement<UpagrahaResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: UpagrahaResponse): unknown;
    private renderGroup;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-upagraha-table': RoxyUpagrahaTable;
    }
}
