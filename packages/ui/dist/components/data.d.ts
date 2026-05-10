import { LitElement, type TemplateResult } from 'lit';
/**
 * Generic fallback renderer. Accepts ANY OpenAPI response shape and renders
 * it via field-name heuristics so future spec additions render reasonably
 * without hand-wired components.
 *
 * Heuristic order:
 *   1. Primitive (string, number, boolean) -> single line.
 *   2. Array of primitives -> chip list.
 *   3. Array of objects with shared keys -> table.
 *   4. Object with title-like field -> card with key/value rows.
 *   5. Otherwise -> definition list of all keys.
 *
 * When a schema declares an `x-roxy-ui` hint, a future dispatcher can opt
 * into a hand-tuned component instead of this fallback.
 */
type Json = string | number | boolean | null | Json[] | {
    [key: string]: Json;
};
export declare class RoxyData extends LitElement {
    static styles: import("lit").CSSResult[];
    data: Json;
    /**
     * Internal recursion depth. Nested <roxy-data> instances inherit this from
     * the parent and increment to guard against circular references in the
     * input. Not part of the public API; do not set from consumer code.
     */
    depth: number;
    render(): TemplateResult<1>;
    private renderValue;
    private renderArray;
    private renderTable;
    private renderObject;
    private renderField;
    private formatPrimitive;
    private collectKeys;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-data': RoxyData;
    }
}
export {};
//# sourceMappingURL=data.d.ts.map