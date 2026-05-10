import { LitElement } from 'lit';
import type { CastReadingResponse, GetDailyHexagramResponse, GetHexagramResponse, GetRandomHexagramResponse, LookupHexagramResponse } from '../types/index.js';
type HexagramData = GetHexagramResponse | GetRandomHexagramResponse | LookupHexagramResponse | GetDailyHexagramResponse | CastReadingResponse;
/**
 * I Ching hexagram card. Renders /iching/hexagrams/{number}, /iching/cast,
 * /iching/daily, /iching/daily/cast.
 */
export declare class RoxyHexagram extends LitElement {
    static styles: import("lit").CSSResult[];
    data: HexagramData | null;
    mode: 'lookup' | 'cast' | 'daily';
    private resolveHexagram;
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