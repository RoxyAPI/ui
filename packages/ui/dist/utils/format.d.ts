/**
 * Display formatters for ISO timestamps and floats coming back from the API.
 * Every helper returns "" for nullish or unparseable input so it falls out of
 * template literals cleanly.
 */
export declare function formatTime(input: unknown): string;
export declare function formatDate(input: unknown): string;
export declare function formatTimeRange(t: {
    start?: string;
    end?: string;
} | undefined): string;
export declare function formatNumber(value: unknown, dp?: number): string;
export declare function formatPercent(value: unknown, dp?: number): string;
/**
 * CSS class name per aspect type. Used by natal and synastry chart aspect
 * lines so the same color encoding (harmonious vs challenging) applies in
 * both wheels. Keys are lowercase canonical names, values are CSS class
 * suffixes the chart components define in their `:host` styles.
 */
export declare const ASPECT_CLASS: Record<string, string>;
/**
 * Normalize an aspect entry's `type` field to a lowercase, hyphen-separated
 * canonical name (`SEMI_SEXTILE` → `semi-sextile`). Accepts any aspect-shaped
 * object so both natal and synastry inter-aspect entries can share this.
 */
export declare function normalizeAspect(a: {
    type?: string;
}): string;
//# sourceMappingURL=format.d.ts.map