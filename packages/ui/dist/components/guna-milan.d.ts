import { LitElement } from 'lit';
import type { CompatibilityResponse } from '../types/index.js';
/**
 * 36-point Ashtakoota score card. Renders /vedic-astrology/compatibility.
 */
export declare class RoxyGunaMilan extends LitElement {
    static styles: import("lit").CSSResult[];
    data: CompatibilityResponse | null;
    render(): import("lit").TemplateResult<1>;
}
export declare const GUNA_CATEGORIES: string[];
declare global {
    interface HTMLElementTagNameMap {
        'roxy-guna-milan': RoxyGunaMilan;
    }
}
//# sourceMappingURL=guna-milan.d.ts.map