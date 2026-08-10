/**
 * Math helpers for converting raw ecliptic longitude decimals into the
 * sign / degree / minute / second triplet used across chart components.
 */

import { SIGNS_ORDER } from '../tokens/index.js';

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
export function normalizeLongitude(lon: number): number {
	const wrapped = lon % 360;
	return wrapped < 0 ? wrapped + 360 : wrapped;
}

/**
 * Convert decimal ecliptic longitude (0-360) into sign/degree/minute/second.
 * Used by every chart wheel and aspect table.
 */
export function longitudeToSignPosition(longitude: number): SignPosition {
	const lon = normalizeLongitude(longitude);
	const signIndex = Math.floor(lon / 30) % 12;
	const within = lon % 30;
	const degree = Math.floor(within);
	const minuteFloat = (within - degree) * 60;
	const minute = Math.floor(minuteFloat);
	const second = Math.round((minuteFloat - minute) * 60);
	return {
		sign: SIGNS_ORDER[signIndex] ?? 'Aries',
		signIndex,
		degree,
		minute,
		second,
	};
}

/** Compact display string like "12° Leo 34'". Used in chart labels. */
export function formatSignPosition(longitude: number): string {
	const { sign, degree, minute } = longitudeToSignPosition(longitude);
	return `${degree}° ${sign} ${String(minute).padStart(2, '0')}'`;
}

/**
 * A within-sign decimal degree (0-30) split into whole degrees and minutes, with the rounding carry already applied.
 *
 * @remarks
 * Separate from {@link formatDegreeInSign} because a printed ephemeris interleaves the sign BETWEEN the two halves (`09♌56`, the form every published ephemeris has used for a century) rather than putting the sign beside a finished `9°56'`. Rounding 59.6 minutes up has to roll the degree with it, and that carry is the part a caller gets wrong, so it lives here once and both forms read it.
 */
export function splitDegreeInSign(deg: number): {
	degree: number;
	minute: number;
} {
	let degree = Math.floor(deg);
	let minute = Math.round((deg - degree) * 60);
	if (minute === 60) {
		minute = 0;
		degree += 1;
	}
	return { degree, minute };
}

/** Format a within-sign decimal degree (0-30) as degree-and-minute, e.g. 17.99 to "17°59'". The reference-grade form astrologers read when the sign is already known (asteroids, lots, directed points, fixed stars). */
export function formatDegreeInSign(deg: number): string {
	const { degree, minute } = splitDegreeInSign(deg);
	return `${degree}°${String(minute).padStart(2, '0')}'`;
}

/**
 * The point diametrically opposite a longitude (e.g. Descendant from
 * Ascendant, IC from MC). Exact derivation, always 180 degrees away.
 */
export function oppositePoint(longitude: number): number {
	return normalizeLongitude(longitude + 180);
}

/**
 * Midpoint of the forward arc from `start` to `end` (both ecliptic
 * longitudes). Handles the 360/0 wrap, so a house spanning 350 to 20 degrees
 * yields a midpoint of 5, not 185. Used to place house numbers between two
 * cusps regardless of how unequal the house is.
 */
export function arcMidpoint(start: number, end: number): number {
	const s = normalizeLongitude(start);
	let span = normalizeLongitude(end) - s;
	if (span < 0) span += 360;
	return normalizeLongitude(s + span / 2);
}

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
 *
 * If a cluster runs past 360 degrees the whole set slides back by the overshoot,
 * which keeps the stack anchored near its real longitudes instead of wrapping
 * one member around to the far side of the wheel.
 */
export function fanOut<T>(
	items: readonly T[],
	longitudeOf: (item: T) => number,
	minSeparation: number,
): FannedPoint<T>[] {
	const placed: FannedPoint<T>[] = items
		.filter((item) => Number.isFinite(longitudeOf(item)))
		.map((item) => {
			const longitude = normalizeLongitude(longitudeOf(item));
			return { item, longitude, displayLongitude: longitude };
		})
		.sort((a, b) => a.longitude - b.longitude);

	for (let i = 1; i < placed.length; i++) {
		const prev = placed[i - 1];
		const cur = placed[i];
		if (!prev || !cur) continue;
		const wanted = prev.displayLongitude + minSeparation;
		if (cur.displayLongitude < wanted) cur.displayLongitude = wanted;
	}

	const last = placed[placed.length - 1];
	if (last && last.displayLongitude > 360) {
		const shift = last.displayLongitude - 360;
		for (const p of placed) p.displayLongitude -= shift;
	}
	return placed;
}

/**
 * Degrees of arc a mark of `width` user units occupies at `radius`, which is the
 * separation {@link fanOut} needs to keep two of them from touching. One
 * expression instead of a magic number per ring, so an inner ring automatically
 * asks for more degrees than an outer one.
 */
export function arcSeparation(width: number, radius: number): number {
	return radius > 0 ? (width / radius) * (180 / Math.PI) : 0;
}

/** Polar to cartesian for SVG wheel positioning. Angle in degrees, 0 at 3 o'clock. */
export function polarToCartesian(
	cx: number,
	cy: number,
	radius: number,
	angleDeg: number,
): { x: number; y: number } {
	const angleRad = (angleDeg * Math.PI) / 180;
	return {
		x: cx + radius * Math.cos(angleRad),
		y: cy + radius * Math.sin(angleRad),
	};
}
