import type { GetChoghadiyaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Choghadiya muhurta grid. Accepts a GetChoghadiyaResponse and renders
 * 8 daytime and 8 nighttime muhurta rows in a two-column responsive layout.
 * Each row names its quality in words and in the success or danger ink.
 */
export declare class RoxyChoghadiyaGrid extends RoxyDataElement<GetChoghadiyaResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /**
     * True when the current wall-clock time falls inside this period. Both
     * `start` and `end` are ISO 8601 with timezone, so the comparison is
     * timezone-aware via the host's `Date` parsing.
     */
    private isCurrent;
    private renderTile;
    protected renderData(d: GetChoghadiyaResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-choghadiya-grid': RoxyChoghadiyaGrid;
    }
}
