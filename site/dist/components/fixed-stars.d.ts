import type { FixedStarsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Fixed stars table. Leads with the high-value view from a
 * /astrology/fixed-stars response: every star-to-natal-point conjunction sorted
 * tightest first, each with its reading. The full precessed star catalog
 * (position, magnitude, traditional nature, keywords) sits in a secondary
 * disclosure so the contacts stay front and center.
 */
export declare class RoxyFixedStars extends RoxyDataElement<FixedStarsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(data: FixedStarsResponse): import("lit").TemplateResult<1>;
    private renderCatalog;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-fixed-stars': RoxyFixedStars;
    }
}
