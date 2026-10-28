import type { CastCareerSpreadResponse, CastCelticCrossResponse, CastCustomSpreadResponse, CastLoveSpreadResponse, CastReadingResponse, CastThreeCardResponse, CastYesNoResponse, DrawCardsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type TarotSpreadData = CastThreeCardResponse | CastCelticCrossResponse | CastLoveSpreadResponse | CastYesNoResponse | CastReadingResponse | CastCareerSpreadResponse | CastCustomSpreadResponse | DrawCardsResponse;
export declare class RoxyTarotSpread extends RoxyDataElement<TarotSpreadData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    spread: 'three-card' | 'celtic-cross' | 'love' | 'career' | 'custom' | 'yes-no' | 'draw';
    protected renderData(d: TarotSpreadData): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-tarot-spread': RoxyTarotSpread;
    }
}
export {};
