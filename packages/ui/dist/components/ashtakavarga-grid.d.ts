import { LitElement } from 'lit';
import type { AshtakavargaResponse } from '../types/index.js';
type Tab = 'sarva' | 'bhinna' | 'pinda';
/**
 * Ashtakavarga grid with three tabbed views: Sarvashtakavarga, Bhinnashtakavarga,
 * and Shodhya Pinda. Pass `data` from /vedic-astrology/ashtakavarga.
 */
export declare class RoxyAshtakavargaGrid extends LitElement {
    static styles: import("lit").CSSResult[];
    data: AshtakavargaResponse | null;
    activeTab: Tab;
    render(): import("lit").TemplateResult<1>;
    private onTabKeyDown;
    private focusActiveTab;
    private heatClass;
    private renderSarva;
    private renderBhinna;
    private renderPinda;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-ashtakavarga-grid': RoxyAshtakavargaGrid;
    }
}
export {};
//# sourceMappingURL=ashtakavarga-grid.d.ts.map