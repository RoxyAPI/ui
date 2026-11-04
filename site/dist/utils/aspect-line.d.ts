/** Which aspects a wheel draws, the class that keys each one to its family colour, and the per-line weight that makes a tight contact read tighter than a wide one. */
/** True for a conjunction, sextile, square, trine or opposition, whatever separator the endpoint writes. */
export declare function isMajorAspect(a: {
    type?: string;
}): boolean;
/** The class that keys an aspect to its family colour, on the canonical English type (`aspect-semi-sextile`). */
export declare function aspectClass(a: {
    type?: string;
}): string;
/**
 * Per-line weight for one aspect, as an inline `style` value.
 *
 * @remarks
 * Driven by `strength`, which the response defines as a 0-100 percentage based on orb tightness, so this is a rendering of a number the API already computed rather than a second opinion about it. Returns `undefined` when the response carries no strength, which leaves the shared defaults in {@link aspectLineStyles} in charge.
 *
 * Inline rather than a class, because tightness is continuous: bucketing it into two or three named tiers would put a boundary somewhere the data has none, and a reader comparing two lines either side of it would see a step that is not in the chart.
 */
export declare function aspectLineStyle(a: {
    strength?: number;
}): string | undefined;
