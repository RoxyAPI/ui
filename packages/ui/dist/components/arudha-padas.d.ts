import type { ArudhaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Arudha padas. Renders /vedic-astrology/arudha: the twelve Jaimini padas, each with the bhava it belongs to, the lord and the count that produced it, the sign it lands in, and what it is read for.
 *
 * @remarks
 * All twelve render, and two are marked. The Arudha Lagna (AL, the pada of the first house) is the one most readings start from, and the Upapada (UL, the pada of the twelfth) is the one a marriage reading turns on, so a table that shows only the AL is missing the second question it will be asked.
 *
 * The derivation is shown, not just the answer. Each row carries the bhava sign, its lord and the lord's sign, which is the count a reader checks by hand, plus a mark where the classical exception fired: a pada that fell in its own bhava or the seventh from it is moved to the tenth from there, and that step is the one implementations most often skip.
 */
export declare class RoxyArudhaPadas extends RoxyDataElement<ArudhaResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: ArudhaResponse): unknown;
    private renderRow;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-arudha-padas': RoxyArudhaPadas;
    }
}
