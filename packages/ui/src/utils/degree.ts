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
