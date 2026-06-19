import { css } from 'lit';

/**
 * Shared CSS for every kundli renderer (`<roxy-vedic-kundli>`,
 * `<roxy-divisional-chart>`, and any future `<roxy-navamsa-chart>`). Centralises
 * the SVG layout (responsive viewBox + aspect ratio), the line/text classes,
 * and the Lagna highlight so the three components stay visually identical.
 *
 * @remarks Font sizes are written in viewBox user units (the chart is 400×400
 * inside a 1:1 aspect-ratio container), so they scale linearly from a 320px
 * phone surface to a wall projector without raster loss. The Lagna palette
 * tracks `--roxy-accent` so host themes flow through unchanged.
 */
export const kundliStyles = css`
	.wrap {
		background: var(--roxy-surface, #fff);
		color: var(--roxy-fg, #0a0a0a);
		border: 1px solid var(--roxy-border, #e4e4e7);
		border-radius: var(--roxy-radius-md, 8px);
		padding: var(--roxy-space-lg, 1.5rem);
		box-shadow: var(--roxy-shadow-sm);
		display: grid;
		gap: var(--roxy-space-md, 1rem);
	}
	.header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--roxy-space-sm, 0.5rem);
	}
	.title {
		font-size: var(--roxy-text-lg, 1.125rem);
		font-weight: var(--roxy-weight-bold, 600);
		margin: 0;
	}
	svg {
		display: block;
		width: 100%;
		max-width: var(--roxy-chart-max-width, 560px);
		aspect-ratio: 1 / 1;
		height: auto;
		margin: 0 auto;
	}
	.line {
		fill: transparent;
		stroke: var(--roxy-border, #d4d4d8);
	}
	.sign-text {
		fill: var(--roxy-muted, #71717a);
		font-size: 11px;
		font-weight: 500;
		font-family: var(--roxy-font-sans);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.rashi-num {
		fill: var(--roxy-muted, #71717a);
		font-size: 12px;
		font-weight: 500;
		font-family: var(--roxy-font-sans);
	}
	.house-num {
		fill: var(--roxy-accent-ink, #b45309);
		font-size: 11px;
		font-weight: 600;
		font-family: var(--roxy-font-sans);
		opacity: 0.85;
	}
	.planet-text {
		fill: var(--roxy-fg, #0a0a0a);
		font-size: 13px;
		font-weight: 600;
		font-family: var(--roxy-font-sans);
	}
	.centre-label {
		fill: var(--roxy-muted, #71717a);
		font-size: 14px;
		font-weight: 600;
		font-family: var(--roxy-font-sans);
		letter-spacing: 0.02em;
	}
	.lagna-marker {
		fill: var(--roxy-accent-ink, #b45309);
		font-size: 10px;
		font-weight: 700;
		font-family: var(--roxy-font-sans);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.lagna-bg {
		fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
	}
	.lagna-slash {
		stroke: var(--roxy-accent, #f59e0b);
		stroke-linecap: round;
		opacity: 0.7;
	}
`;
