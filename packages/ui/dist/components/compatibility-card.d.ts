import { LitElement } from 'lit';
import type { CalculateBioCompatibilityResponse, CalculateCompatibilityResponse, CalculateNumCompatibilityResponse } from '../types/index.js';
type CompatibilityData = CalculateCompatibilityResponse | CalculateNumCompatibilityResponse | CalculateBioCompatibilityResponse;
/**
 * Cross-domain compatibility card. Renders /astrology/compatibility-score,
 * /numerology/compatibility, or /biorhythm/compatibility responses.
 */
export declare class RoxyCompatibilityCard extends LitElement {
    static styles: import("lit").CSSResult[];
    data: CompatibilityData | null;
    mode: 'astrology' | 'numerology' | 'biorhythm';
    private getBreakdown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-compatibility-card': RoxyCompatibilityCard;
    }
}
export {};
//# sourceMappingURL=compatibility-card.d.ts.map