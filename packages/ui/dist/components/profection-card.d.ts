import type { ProfectionsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Annual profection card. Renders a /astrology/profections response: the year's
 * profected whole-sign house and sign, the lord of the year and where it sits in
 * the natal chart, and the reading. A single focal card, not a table.
 *
 * @remarks
 * The profection itself is arithmetic: the age, the house it activates, the sign on it, and the lord with its natal placement. Those are the card, and they all survive `hide-readings`; the closing paragraph is the only interpretation on it.
 */
export declare class RoxyProfectionCard extends RoxyDataElement<ProfectionsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(data: ProfectionsResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-profection-card': RoxyProfectionCard;
    }
}
