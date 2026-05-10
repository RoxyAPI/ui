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
export declare function formatLongitude(value: unknown): string;
//# sourceMappingURL=format.d.ts.map