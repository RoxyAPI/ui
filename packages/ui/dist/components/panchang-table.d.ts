import { LitElement } from 'lit';
import type { GetBasicPanchangResponse, GetDetailedPanchangResponse } from '../types/index.js';
type PanchangData = GetBasicPanchangResponse | GetDetailedPanchangResponse;
/** Panchang table for /vedic-astrology/panchang/{basic,detailed}. */
export declare class RoxyPanchangTable extends LitElement {
    static styles: import("lit").CSSResult[];
    data: PanchangData | null;
    detail: 'basic' | 'detailed';
    render(): import("lit").TemplateResult<1>;
    private formatPart;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-panchang-table': RoxyPanchangTable;
    }
}
export {};
//# sourceMappingURL=panchang-table.d.ts.map