import type { CastDailyReadingResponse, CastReadingResponse, GetDailyHexagramResponse, GetHexagramResponse, GetRandomHexagramResponse, LookupHexagramResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type HexagramData = GetHexagramResponse | GetRandomHexagramResponse | LookupHexagramResponse | GetDailyHexagramResponse | CastReadingResponse | CastDailyReadingResponse;
/**
 * I Ching hexagram card. Renders /iching/hexagrams/{number},
 * /iching/hexagrams/random, /iching/hexagrams/lookup, /iching/cast,
 * /iching/daily and /iching/daily/cast.
 *
 * @remarks
 * **There is deliberately no `mode` input.** Which shape arrived is
 * shape-detected from the payload in {@link RoxyHexagram.resolveHexagram}, which
 * is the rule for every multi-endpoint component here: an attribute and a
 * response can disagree, and only one of them is the reading. A `mode` property
 * shipped anyway, reflected and typed into both framework packages, and nothing
 * ever read it.
 */
export declare class RoxyHexagram extends RoxyDataElement<HexagramData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /**
     * Which shape arrived, flattened to what the card draws.
     *
     * @remarks
     * A cast prefers the top-level `changingLines` (only the lines that moved, on `/iching/daily/cast`) over the hexagram list (all six, on `/iching/cast`); both are the same `ChangingLine` shape.
     */
    private resolveHexagram;
    protected renderData(): unknown;
    private renderHexagram;
    private renderTopics;
    /**
     * The line readings. Each line carries its oracle statement and, since the 2026-07 API rewrite, a written meaning. Both are rendered: a bare "Changing lines: 3" leaves a reader no way to know what line 3 is telling them.
     *
     * @remarks
     * When lines are moving, only those lines are shown: a cast turns on the moving lines, and listing the other five buries the answer. With no lines moving (a lookup, a random draw, the daily hexagram) all six are shown, because there the hexagram is being read as a reference rather than as an answer to a question.
     */
    private renderLines;
    /**
     * Lines for a static hexagram (a lookup, a random draw, the hexagram of the day, none of which carry a cast `lines` array): read the `binary` pattern. 6 digits BOTTOM to top, so index 0 is line 1, the bottom line, exactly like the cast `lines` array. 1 = yang (solid, 7), 0 = yin (broken, 8). A response with no usable `binary` yields no lines and the figure is left undrawn, because the six lines ARE response data: a default pattern would draw one hexagram under the name and Unicode symbol of another. The Unicode `symbol` block (U+4DC0) is in King Wen order, NOT line order, so it must never be a source for the lines either.
     *
     * @remarks
     * **Read in the order the API documents and never reversed.** `binary` and the cast `lines` array both run bottom to top, so they point the same way and a `.reverse()` here would flip every asymmetric hexagram upside down. Do not add one.
     */
    private derivedLines;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-hexagram': RoxyHexagram;
    }
}
export {};
