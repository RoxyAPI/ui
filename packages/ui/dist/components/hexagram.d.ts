import { LitElement } from 'lit';
interface HexagramData {
    number?: number;
    symbol?: string;
    chinese?: string;
    english?: string;
    pinyin?: string;
    upperTrigram?: string;
    lowerTrigram?: string;
    judgment?: string;
    image?: string;
    interpretation?: {
        general?: string;
        love?: string;
        career?: string;
        decision?: string;
        advice?: string;
    };
    changingLines?: number[];
    resultingHexagram?: HexagramData;
    dailyMessage?: string;
    hexagram?: HexagramData;
    lines?: number[];
    changingLinePositions?: number[];
    seed?: string;
    date?: string;
}
/**
 * I Ching hexagram card. Renders /iching/hexagrams/{number}, /iching/cast,
 * /iching/daily, /iching/daily/cast.
 */
export declare class RoxyHexagram extends LitElement {
    static styles: import("lit").CSSResult[];
    data: HexagramData | null;
    mode: 'lookup' | 'cast' | 'daily';
    private getHexagram;
    render(): import("lit").TemplateResult<1>;
    /** When the API only ships symbol+number with no line array, render six solid yang. */
    private derivedLines;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-hexagram': RoxyHexagram;
    }
}
export {};
//# sourceMappingURL=hexagram.d.ts.map