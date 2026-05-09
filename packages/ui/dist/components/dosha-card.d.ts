import { LitElement } from 'lit';
interface DoshaData {
    present?: boolean;
    severity?: 'Mild' | 'Moderate' | 'Severe' | string;
    type?: string;
    description?: string;
    remedies?: string[];
    exceptions?: string[];
    effects?: string | {
        marriage?: string;
        personality?: string;
        timing?: string;
        relationships?: string;
        general?: string;
        phases?: Record<string, string>;
    };
}
/**
 * Dosha presence card. Renders /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}.
 * Visual severity indicator + remedies + scoped effects.
 */
export declare class RoxyDoshaCard extends LitElement {
    static styles: import("lit").CSSResult[];
    data: DoshaData | null;
    type: 'manglik' | 'kalsarpa' | 'sadhesati' | string;
    render(): import("lit").TemplateResult<1>;
    private renderEffects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-dosha-card': RoxyDoshaCard;
    }
}
export {};
//# sourceMappingURL=dosha-card.d.ts.map