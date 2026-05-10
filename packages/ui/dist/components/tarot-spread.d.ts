import { LitElement } from 'lit';
import type { CastCelticCrossResponse, CastLoveSpreadResponse, CastReadingResponse, CastThreeCardResponse, CastYesNoResponse, DrawCardsResponse } from '../types/index.js';
type TarotSpreadData = CastThreeCardResponse | CastCelticCrossResponse | CastLoveSpreadResponse | CastYesNoResponse | CastReadingResponse | DrawCardsResponse;
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