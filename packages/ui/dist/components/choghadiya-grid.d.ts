import { LitElement } from 'lit';
import type { GetChoghadiyaResponse } from '../types/index.js';
/**
 * Choghadiya muhurta grid. Accepts a GetChoghadiyaResponse and renders
 * 8 daytime and 8 nighttime muhurta tiles in a two-column responsive layout.
 * Good periods are highlighted in green, Bad periods in red.
 */
export declare class RoxyChoghadiyaGrid extends LitElement {
    static styles: import("lit").CSSResult[];
    data: GetChoghadiyaResponse | null;
    private renderTile;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-choghadiya-grid': RoxyChoghadiyaGrid;
    }
}
//# sourceMappingURL=choghadiya-grid.d.ts.map