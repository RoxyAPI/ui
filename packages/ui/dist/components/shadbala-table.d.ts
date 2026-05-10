import { LitElement } from 'lit';
import type { ShadbalaResponse } from '../types/index.js';
/**
 * Shadbala six-fold planetary strength table with stacked bar visualization.
 * Pass `data` from /vedic-astrology/shadbala.
 */
export declare class RoxyShadbalaTable extends LitElement {
    static styles: import("lit").CSSResult[];
    data: ShadbalaResponse | null;
    render(): import("lit").TemplateResult<1>;
    private renderPlanetRow;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-shadbala-table': RoxyShadbalaTable;
    }
}
//# sourceMappingURL=shadbala-table.d.ts.map