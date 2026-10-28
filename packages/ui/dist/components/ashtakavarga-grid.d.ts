import type { AshtakavargaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Tab = 'sarva' | 'bhinna' | 'reduced' | 'pinda';
/**
 * Ashtakavarga grid: Sarvashtakavarga, Bhinnashtakavarga, the Shodhana-reduced
 * grid, and Shodhya Pinda. Pass `data` from /vedic-astrology/ashtakavarga.
 *
 * @remarks
 * Bindus are benefic points, so MORE is better in every view here. The colour
 * ramp is therefore diverging, not a single hot hue: a weak count tints toward
 * --roxy-heat (which resolves to the danger token), the classical average stays
 * neutral, a strong count tints toward --roxy-success, and each tab states its
 * own scale in a legend. The previous single-hue ramp painted the best signs the
 * most alarming shade, the exact opposite of what the numbers mean.
 */
export declare class RoxyAshtakavargaGrid extends RoxyDataElement<AshtakavargaResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    activeTab: Tab;
    protected renderData(d: AshtakavargaResponse): import("lit").TemplateResult<1>;
    /**
     * Bhinna bindus per planet per sign run 0..8 (one 0/1 contribution from each
     * of the 8 reference points). 4 is the mid, so it holds the neutral tier and
     * anything above it reads as support. The reduced grid uses the same 0..8
     * units, so it shares this scale.
     */
    private bhinnaTier;
    /**
     * Sarva bindus per sign are the column total across the 7 planets. The grand
     * total is always 337, so the classical average is 337/12 = 28.08 and the
     * bands used by readers are: under 25 weak, 25 to 29 average, 30 and above
     * strong, with the highest signs carrying transits best. The tiers follow
     * those bands rather than an even split, so 28 sits on the neutral tier.
     */
    private sarvaTier;
    /**
     * The scale, stated. Without this a reader has to guess whether a saturated
     * cell is good or bad, and in a bindu grid the answer is always "good".
     */
    private renderLegend;
    private renderSarva;
    private renderBhinna;
    /**
     * The Shodhana-purified grid (Trikona then Ekadipati), which is what Shodhya
     * Pinda is computed from. The column totals are the Reduced Sarvashtakavarga,
     * so they are shown as the total row rather than as a second table.
     */
    private renderReduced;
    /**
     * The planet-by-sign grid both the bhinna and the reduced tabs draw. The rows
     * are the 7 planets plus Lagna, but a Sarva total counts the 7 planets only
     * (which is why the classical SAV grand total is 337), so the totals row is
     * named for what it is rather than left to read as a column sum.
     */
    private renderBinduGrid;
    private renderPinda;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-ashtakavarga-grid': RoxyAshtakavargaGrid;
    }
}
export {};
