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
/**
 * Compact display string like `12° Leo 34'`, for a chart label.
 *
 * @param signLabel - The sign NAME to print. Pass the one the response carried whenever there is one: the degree and minute here are arithmetic on the longitude and always correct, but the sign is a name, and deriving it from a local table means the label can disagree with the sign printed beside it the moment a response answers in another language. Omitted, it falls back to the derived English name, which is right only while the caller has nothing better.
 */
export declare function formatSignPosition(longitude: number, signLabel?: string): string;
/** `12°34'` from a raw ecliptic longitude: the degree and minute within the sign, truncated to the minute, the form a wheel prints beside a glyph and a cusp. */
export declare function formatWheelDegree(longitude: number): string;
/**
 * A within-sign decimal degree (0-30) split into whole degrees and minutes, truncated to the minute.
 *
 * @remarks
 * Separate from {@link formatDegreeInSign} because a printed ephemeris interleaves the sign BETWEEN the two halves (`09♌56`, the form every published ephemeris has used for a century) rather than putting the sign beside a finished `9°56'`. Truncation rather than rounding, the way an ephemeris prints and every wheel here draws: a position at 29 degrees 59.6 minutes stays in its sign at 29°59' instead of rolling to a 30°00' that no sign has, and a table and a wheel reading the same longitude print the same minute.
 */
export declare function splitDegreeInSign(deg: number): {
    degree: number;
    minute: number;
};
/** Format a within-sign decimal degree (0-30) as degree-and-minute, e.g. 17.99 to "17°59'". The reference-grade form astrologers read when the sign is already known (asteroids, lots, directed points, fixed stars). */
export declare function formatDegreeInSign(deg: number): string;
/**
 * The point diametrically opposite a longitude (e.g. Descendant from
 * Ascendant, IC from MC). Exact derivation, always 180 degrees away.
 */
export declare function oppositePoint(longitude: number): number;
/**
 * Midpoint of the forward arc from `start` to `end` (both ecliptic
 * longitudes). Handles the 360/0 wrap, so a house spanning 350 to 20 degrees
 * yields a midpoint of 5, not 185. This is what places house numbers between two
 * cusps regardless of how unequal the house is.
 */
export declare function arcMidpoint(start: number, end: number): number;
/** A body placed on a wheel: where it really is, and where its glyph had to be drawn to stay legible. */
export interface FannedPoint<T> {
    item: T;
    /** The true ecliptic longitude. Where a leader line points, and the only value a reader should take as the position. */
    longitude: number;
    /** Where the glyph is drawn, pushed forward only as far as it takes to clear its neighbour. Equal to {@link FannedPoint.longitude} whenever nothing was in the way. */
    displayLongitude: number;
}
/**
 * Spread a cluster of bodies apart along a wheel so every glyph stays readable,
 * without moving any of them off its real position in the data.
 *
 * @remarks
 * Conjunctions inside a few degrees are the norm, not the exception: a
 * Sun-Mercury-Venus cluster or a stack of outer planets will pile four glyphs on
 * top of each other and print their degree labels over one another. Sorting by
 * longitude and pushing each later member forward until it clears
 * `minSeparation` is the conventional fix in professional chart software, and it
 * is why {@link FannedPoint} carries BOTH longitudes: the caller draws the glyph
 * at the display value and a leader line back to the true one, so nothing about
 * the drawing claims a position the response did not give.
 *
 * `minSeparation` is an ANGLE, so it depends on the radius the caller is drawing
 * at: the same glyph needs more degrees of arc on a small ring than a large one.
 * It is a number where every mark is the same width, and a function of the two
 * neighbours where they are not: a degree label grows by a retrograde mark, so
 * two centred labels clear each other at half the sum of their widths, which is
 * what a per-pair answer states and one number for the ring cannot.
 *
 * A wheel has no seam, so the sweep starts after the WIDEST gap on the ring and
 * runs once around it: a cluster straddling 0 degrees Aries fans across the
 * seam like any other, and whatever room the ring has to absorb its total
 * displacement lies at the end of the sweep rather than at an arbitrary point.
 * Only a ring too full to hold every mark at its separation still overlaps,
 * and then it overlaps at that widest gap.
 */
export declare function fanOut<T>(items: readonly T[], longitudeOf: (item: T) => number, minSeparation: number | ((prev: T, next: T) => number)): FannedPoint<T>[];
/** The ink of a horizontal mark on a wheel, in user units. */
export interface MarkSize {
    width: number;
    height: number;
}
/** An axis-aligned box in wheel units, for a horizontal label. */
interface LabelBox extends MarkSize {
    x: number;
    y: number;
}
/** The ink gap a wheel keeps between a body's glyph and its own degree label, in user units. */
export declare const GLYPH_LABEL_GAP = 2;
/** How far a horizontal box centred on a ray at `angleDeg` (0 at 3 o'clock) reaches along that ray either way. */
export declare function rayReach(angleDeg: number, box: MarkSize): number;
/** How far apart along a ray at `angleDeg` (0 at 3 o'clock) two horizontal boxes must be centred for their ink to clear by `gap`: the half heights near 12 and 6 o'clock, the half widths near 3 and 9. */
export declare function rayClearance(angleDeg: number, a: MarkSize, b: MarkSize, gap: number): number;
/**
 * Which of two label rows each mark takes, so horizontal labels on one ring
 * never print over each other.
 *
 * @remarks
 * A degree label is about twice as wide as its glyph, so a fan wide enough to
 * clear every label carries a stellium far from its houses, and one tight
 * enough to keep the glyphs honest prints neighbouring labels over each other.
 * A second row inward is the professional wheel's answer, and the row is chosen
 * from the box each label PAINTS rather than from the arc between them, because
 * a horizontal label on a ring meets its neighbour differently at every angle:
 * side by side near the top and bottom, where only a row apart separates them,
 * and one above the other at the sides, where the arc alone does. A label takes
 * the inner row only when the outer one would touch a label already placed, so
 * an uncrowded chart keeps every label on the outer row exactly as before; one
 * that would touch on both rows keeps the lesser overlap, which the fan step is
 * chosen to make impossible short of three marks inside one label width.
 */
export declare function staggerRows<T>(placed: readonly FannedPoint<T>[], boxAt: (point: FannedPoint<T>, row: number) => LabelBox): number[];
/**
 * Degrees of arc a mark of `width` user units occupies at `radius`, which is the
 * separation {@link fanOut} needs to keep two of them from touching. One
 * expression instead of a magic number per ring, so an inner ring automatically
 * asks for more degrees than an outer one.
 */
export declare function arcSeparation(width: number, radius: number): number;
/** Polar to cartesian for SVG wheel positioning. Angle in degrees, 0 at 3 o'clock. */
export declare function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number): {
    x: number;
    y: number;
};
export {};
