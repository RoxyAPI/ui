import type { GetCardResponse, GetDailyCardResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type TarotData = GetCardResponse | GetDailyCardResponse;
/**
 * Tarot card. Renders /tarot/cards/{id} and /tarot/daily.
 *
 * @remarks
 * The two endpoints are NOT the same card and must not be shown the same way. The reference card ships both orientations, so the reader chooses one and the whole reading (image, keywords, description, life areas) follows that choice. The daily card is DRAWN: the API ships exactly one orientation and one set of meanings for it, so there is nothing to switch to and the draw is fixed and stated, never toggled. A flip on this shape would rotate the art and relabel the card "reversed" while the text below it stayed the upright reading.
 */
export declare class RoxyTarotCard extends RoxyDataElement<TarotData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which orientation of the REFERENCE card is being read. The daily draw ignores this: its orientation is whatever was drawn. */
    private orientation;
    protected renderData(d: TarotData): import("lit").TemplateResult<1>;
    private renderDailyCard;
    private renderFullCard;
    /** The artwork, rotated when the orientation being read is reversed. Decorative beyond its alt text: the orientation is stated in the meta line, so the image is never the only place it appears. */
    private renderImage;
    /** The five life-area readings for the orientation on screen. Grouped per orientation so switching the reference card swaps the whole accordion rather than leaving a stale section open. */
    private renderGuidance;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-tarot-card': RoxyTarotCard;
    }
}
export {};
