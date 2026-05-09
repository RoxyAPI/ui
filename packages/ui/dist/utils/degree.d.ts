/**
 * Math helpers for converting raw ecliptic longitude decimals into the
 * sign / degree / minute / second triplet used across chart components.
 */
export interface SignPosition {
    sign: string;
    signIndex: number;
    degree: number;
    minute: number;
    second: number;
}
/**
 * Wrap longitude into [0, 360) so negative or out-of-range values still
 * resolve to a real sign. Robust to wonky upstream data.
 */
export declare function normalizeLongitude(lon: number): number;
/**
 * Convert decimal ecliptic longitude (0-360) into sign/degree/minute/second.
 * Used by every chart wheel and aspect table.
 */
export declare function longitudeToSignPosition(longitude: number): SignPosition;
/** Compact display string like "12° Leo 34'". Used in chart labels. */
export declare function formatSignPosition(longitude: number): string;
/** Polar to cartesian for SVG wheel positioning. Angle in degrees, 0 at 3 o'clock. */
export declare function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number): {
    x: number;
    y: number;
};
//# sourceMappingURL=degree.d.ts.map