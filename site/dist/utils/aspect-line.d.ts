/**
 * The aspect lines every wheel draws across its centre: the colour of each aspect family, the per-line weight that makes a tight contact read as tighter than a wide one, and the five majors a wheel draws by default.
 *
 * @remarks
 * Families follow the practitioner convention: blue for trine and sextile, red for square and opposition, green for quincunx and semi-sextile; the conjunction takes the accent and the other minors stay muted. Each family class sets `--_aspect` (stroke and swatch) and `--_aspect-ink` (text on the card), so a line, a legend swatch and a grid glyph read one map. Colour and strength weighting sit on SEPARATE properties: SVG multiplies `opacity` by `stroke-opacity`, so a minor stays muted for being minor AND scales with how exact it is.
 */
/** The colour of each aspect family on the class {@link aspectClass} returns: text carrying it takes the family ink, plus the legend swatch. Include wherever an aspect is named. */
export declare const aspectFamilyStyles: import("lit").CSSResult;
/** The line every wheel draws across its centre, then the families; the order lets a family lift the minor weight. Include in a wheel's `static styles`. */
export declare const aspectLineStyles: import("lit").CSSResult[];
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
