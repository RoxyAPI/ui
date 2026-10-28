import type { ShadbalaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Shadbala six-fold planetary strength table with stacked bar visualization.
 * Pass `data` from /vedic-astrology/shadbala.
 */
export declare class RoxyShadbalaTable extends RoxyDataElement<ShadbalaResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: ShadbalaResponse): unknown;
    private renderPlanetRow;
    /**
     * Ishta and Kashta Phala, the fruit a planet is capable of giving in its dasha
     * and transits. They are derived from Uchcha and Chesta Bala, not from the
     * six-fold total, so a planet can rank first on strength and still carry a
     * heavy Kashta share. Rendering only the total hides exactly that.
     */
    private renderPhala;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-shadbala-table': RoxyShadbalaTable;
    }
}
