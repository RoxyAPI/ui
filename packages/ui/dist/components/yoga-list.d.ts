import { LitElement } from 'lit';
import type { GetYogaResponse, ListYogasResponse } from '../types/index.js';
type YogaListData = ListYogasResponse | GetYogaResponse | {
    yogas: Array<GetYogaResponse>;
};
/**
 * Yoga catalog and detail renderer. Accepts three data modes:
 *   - Catalog: ListYogasResponse (yogas array of {id, name} + total)
 *   - Detail: GetYogaResponse (single yoga with description, result, quality)
 *   - Detail array: { yogas: Array<GetYogaResponse> } for pre-filtered sets
 *
 * Catalog and detail-array modes include a live search filter.
 */
export declare class RoxyYogaList extends LitElement {
    static styles: import("lit").CSSResult[];
    data: YogaListData | null;
    private filter;
    private readonly handleInput;
    private renderQualityChip;
    private renderDetailCard;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-yoga-list': RoxyYogaList;
    }
}
export {};
//# sourceMappingURL=yoga-list.d.ts.map