import type { GetCompoundNumberResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/** Chaldean compound number card for /numerology/compound-number/{number}: the numeral, its symbolic name, root, nature, the lower number it repeats, and the meaning, which `hide-readings` drops. */
export declare class RoxyCompoundNumber extends RoxyDataElement<GetCompoundNumberResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: GetCompoundNumberResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-compound-number': RoxyCompoundNumber;
    }
}
