import { LitElement } from 'lit';
interface CompatibilityData {
    overallScore?: number;
    score?: number;
    rating?: string;
    relationshipArchetype?: string;
    advice?: string;
    summary?: string;
    categoryScores?: Record<string, number>;
    categoryBreakdown?: Record<string, number>;
    emotional?: number;
    communication?: number;
    romance?: number;
    strengths?: string[];
    challenges?: string[];
    keyAspects?: string[];
    elementBalance?: Record<string, number>;
    person1?: {
        name?: string;
        sign?: string;
        lifePath?: number;
    };
    person2?: {
        name?: string;
        sign?: string;
        lifePath?: number;
    };
}
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