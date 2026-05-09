import { LitElement } from 'lit';
interface TarotPosition {
    number?: number;
    label?: string;
    name?: string;
    position?: string;
    card?: {
        name?: string;
        imageUrl?: string;
        reversed?: boolean;
        keywords?: string[];
        arcana?: string;
    };
    interpretation?: string;
}
interface TarotSpreadData {
    spread?: string;
    positions?: TarotPosition[];
    cards?: TarotPosition[];
    reading?: string;
    question?: string;
    answer?: 'Yes' | 'No' | 'Maybe' | string;
    strength?: string;
    interpretation?: string;
}
/**
 * Tarot spread card. Renders /tarot/spreads/{three-card,celtic-cross,love},
 * /tarot/yes-no, /tarot/draw responses.
 */
export declare class RoxyTarotSpread extends LitElement {
    static styles: import("lit").CSSResult[];
    data: TarotSpreadData | null;
    spread: 'three-card' | 'celtic-cross' | 'love' | 'yes-no' | 'draw';
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-tarot-spread': RoxyTarotSpread;
    }
}
export {};
//# sourceMappingURL=tarot-spread.d.ts.map