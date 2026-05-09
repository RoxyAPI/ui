import { LitElement } from 'lit';
interface GunaCategory {
    name?: string;
    score?: number;
    max?: number;
    maxScore?: number;
    description?: string;
}
interface GunaData {
    total?: number;
    totalScore?: number;
    maxScore?: number;
    percentage?: number;
    isCompatible?: boolean;
    recommendation?: string;
    doshas?: string[];
    doshaCancellations?: string[];
    breakdown?: GunaCategory[];
}
/**
 * 36-point Ashtakoota score card. Renders /vedic-astrology/compatibility.
 */
export declare class RoxyGunaMilan extends LitElement {
    static styles: import("lit").CSSResult[];
    data: GunaData | null;
    render(): import("lit").TemplateResult<1>;
}
export declare const GUNA_CATEGORIES: string[];
declare global {
    interface HTMLElementTagNameMap {
        'roxy-guna-milan': RoxyGunaMilan;
    }
}
export {};
//# sourceMappingURL=guna-milan.d.ts.map