import { LitElement } from 'lit';
import type { GetCardResponse, GetDailyCardResponse } from '../types/index.js';
type TarotData = GetCardResponse | GetDailyCardResponse;
/**
 * Tarot card. Renders /tarot/cards/{id} or /tarot/daily. Click to flip
 * between upright and reversed where the data shape supports it.
 */
export declare class RoxyTarotCard extends LitElement {
    static styles: import("lit").CSSResult[];
    data: TarotData | null;
    private flipped;
    private toggleFlip;
    render(): import("lit").TemplateResult<1>;
    private renderDailyCard;
    private renderFullCard;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-tarot-card': RoxyTarotCard;
    }
}
export {};
//# sourceMappingURL=tarot-card.d.ts.map