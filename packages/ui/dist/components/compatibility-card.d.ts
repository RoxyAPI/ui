import type { CalculateBioCompatibilityResponse, CalculateCompatibilityResponse, CalculateNumCompatibilityResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type CompatibilityData = CalculateCompatibilityResponse | CalculateNumCompatibilityResponse | CalculateBioCompatibilityResponse;
/**
 * Cross-domain compatibility card. Renders /astrology/compatibility-score,
 * /numerology/compatibility, or /biorhythm/compatibility responses.
 */
export declare class RoxyCompatibilityCard extends RoxyDataElement<CompatibilityData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    mode: 'astrology' | 'numerology' | 'biorhythm';
    private getBreakdown;
    protected renderData(d: CompatibilityData): import("lit").TemplateResult<1>;
    /** Contact balance behind the score. Astrology only. */
    private renderAspectBreakdown;
    /**
     * Sign-by-sign reading for the four relationship planets. The aside pairs the two signs (with degrees from `persons`, which would otherwise be dropped) so the header answers "which signs" before the body answers "and so what".
     */
    private renderSignCompatibility;
    /**
     * Elemental weight of both charts, mirrored around the element name so a shared emphasis reads as a matched pair. The shared element (or its absence) is the headline the API computes, so it is stated rather than left for the reader to spot.
     */
    private renderElementBalance;
    /**
     * Per-cycle readings the other two domains carry instead of astrology categories: the numerology core numbers (Life Path, Expression, Soul Urge) and the biorhythm cycle alignments. Both are labelled score-plus-prose, which is exactly what the interpretation accordion is for.
     */
    private renderSubScores;
    /** The astrology response, or undefined when the card is showing another domain. `signCompatibility` is unique to it, so it is the discriminator. */
    private astro;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-compatibility-card': RoxyCompatibilityCard;
    }
}
export {};
