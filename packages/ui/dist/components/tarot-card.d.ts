import { LitElement } from 'lit';
interface TarotCard {
    id?: string;
    name?: string;
    arcana?: 'major' | 'minor' | string;
    number?: number | string;
    position?: string;
    reversed?: boolean;
    keywords?: string[];
    meaning?: string | {
        upright?: string;
        reversed?: string;
        spiritual?: string;
        emotional?: string;
        physical?: string;
    };
    imageUrl?: string;
    upright?: {
        meaning?: string;
        keywords?: string[];
    };
}
interface TarotData {
    date?: string;
    seed?: string;
    card?: TarotCard;
    dailyMessage?: string;
}
/**
 * Tarot card. Renders /tarot/cards/{id} or /tarot/daily. Click to flip
 * between upright and reversed where the data shape supports it.
 */
export declare class RoxyTarotCard extends LitElement {
    static styles: import("lit").CSSResult[];
    data: TarotData | TarotCard | null;
    private flipped;
    private getCard;
    private toggleFlip;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-tarot-card': RoxyTarotCard;
    }
}
export {};
//# sourceMappingURL=tarot-card.d.ts.map