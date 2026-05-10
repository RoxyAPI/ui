import { LitElement } from 'lit';
import type { KalsarpaResponse, ManglikResponse, SadhesatiResponse } from '../types/index.js';
type DoshaData = ManglikResponse | KalsarpaResponse | SadhesatiResponse;
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