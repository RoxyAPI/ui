import { type TemplateResult } from 'lit';
import { RoxyDataElement } from '../utils/base-element.js';
type Json = string | number | boolean | null | Json[] | {
    [key: string]: Json;
};
/**
 * Generic fallback heuristic order:
 * 1. Primitives render as locale-aware text; primitive arrays render as chips.
 * 2. Compact object arrays render as tables; arrays with many columns plus paragraph text or nested data render as readable records.
 * 3. Objects with a title render a heading and scalar facts; other objects render a definition list.
 * 4. Nested objects and object arrays occupy full-width sections, retaining the shared depth and disclosure policy.
 * Scalar dates, numbers and enums use shared locale-aware formatters; chrome uses t(), response labels use displayField(), and values are folded before classification.
 * Folding localized values without translating surrounding chrome gives the reader mixed languages, and the server fallback must apply the same field selection and collection presentation.
 */
export declare class RoxyData extends RoxyDataElement<Json> {
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /**
     * Internal recursion depth. Nested <roxy-data> instances inherit this from the parent and increment to guard against circular references in the input. Not part of the public API; do not set from consumer code.
     */
    depth: number;
    protected renderData(data: Json): TemplateResult<1>;
    private renderValue;
    private renderArray;
    private renderChips;
    private renderObjectArray;
    /**
     * Drop the fields that are noise on a reading card, and fold each localized twin into the field it translates. See {@link SUPPRESS_NOISE} and {@link foldLocalized}.
     *
     * @remarks
     * The single funnel for BOTH render paths, the table and the object, which is why the fold belongs here: it is one call and no column-building or row-building code has to know the convention exists. Folding runs FIRST, so a field this then suppresses takes its translation with it rather than leaving `Type Localized` standing where `Type` was hidden.
     */
    private suppress;
    private renderObject;
    /**
     * A named block of nested data. Collapses into `<details>` once it carries more than {@link DETAILS_KEYS} keys, so one fat object (a 27-nakshatra map, a 12-house table) cannot bury the rest of the card under a wall of rows.
     *
     * @remarks
     * Deliberately carries no `part`. The heading here IS a response key, so the only name this block could take is computed, and `roxy-reference-card` is the one component allowed to derive a part at runtime (`catalog.test.ts` pins it as the only one). A bare `part="section"` is the other tempting option and is worse: the vocabulary pairs `section` with a specific name precisely so `::part(section patterns)` addresses ONE block, and a token that lands identically on every key of every response addresses none of them.
     */
    private renderSection;
    private renderField;
    private renderCell;
    private scalarTemplate;
    private formatScalar;
    private collectKeys;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-data': RoxyData;
    }
}
export {};
