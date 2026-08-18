/**
 * The aspect lines every wheel draws across its centre: one set of styles, and the per-line weight that makes a tight contact read as tighter than a wide one.
 *
 * @remarks
 * Three components draw this same figure, so the styles live here rather than in each of them. The nature colours and the strength weighting are carried on SEPARATE properties on purpose: SVG multiplies `opacity` by `stroke-opacity`, so a minor aspect stays muted for being minor AND scales with how exact it is, and neither signal has to know about the other.
 */

import { css } from 'lit';

/** Shared aspect-line styling. Include in a wheel's `static styles` and pair with {@link aspectLineStyle} on each line. */
export const aspectLineStyles = css`
	.aspect {
		stroke-width: 0.8;
		fill: none;
		opacity: 0.55;
	}
	.aspect-trine,
	.aspect-sextile {
		stroke: var(--roxy-success, #16a34a);
	}
	.aspect-square,
	.aspect-opposition {
		stroke: var(--roxy-danger, #dc2626);
	}
	.aspect-conjunction {
		stroke: var(--roxy-accent-ink, #b45309);
	}
	/* Minor aspects stay quieter than the majors whatever their orb. On its own
	 * channel so the strength weighting below multiplies with it instead of
	 * replacing it. */
	.aspect-other {
		stroke: var(--roxy-muted, #71717a);
		stroke-opacity: 0.7;
	}
`;

/** Faintest and heaviest an aspect line is drawn. The floor is deliberately above zero: a wide aspect is weak, not absent, and a line nobody can see reads as an aspect the chart never found. */
const MIN_OPACITY = 0.3;
const MAX_OPACITY = 0.9;
const MIN_WIDTH = 0.5;
const MAX_WIDTH = 1.8;

/**
 * Per-line weight for one aspect, as an inline `style` value.
 *
 * @remarks
 * Driven by `strength`, which the response defines as a 0-100 percentage based on orb tightness, so this is a rendering of a number the API already computed rather than a second opinion about it. Returns `undefined` when the response carries no strength, which leaves the shared defaults in {@link aspectLineStyles} in charge.
 *
 * Inline rather than a class, because tightness is continuous: bucketing it into two or three named tiers would put a boundary somewhere the data has none, and a reader comparing two lines either side of it would see a step that is not in the chart.
 */
export function aspectLineStyle(a: { strength?: number }): string | undefined {
	const { strength } = a;
	if (typeof strength !== 'number' || !Number.isFinite(strength)) {
		return undefined;
	}
	const t = Math.min(1, Math.max(0, strength / 100));
	const opacity = MIN_OPACITY + t * (MAX_OPACITY - MIN_OPACITY);
	const width = MIN_WIDTH + t * (MAX_WIDTH - MIN_WIDTH);
	return `opacity:${opacity.toFixed(3)};stroke-width:${width.toFixed(3)}`;
}
