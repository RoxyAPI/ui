import { css } from 'lit';
import { GATE_FONT_SIZE } from './bodygraph-render.js';

/**
 * The stylesheet for anything `renderBodygraphSvg` draws, so a second chart on the same geometry cannot fork the first one's appearance.
 *
 * @remarks
 * The renderer marks each gate and channel half `src-left` or `src-right` and names neither, so a card supplies the meaning by declaring those two colours on its own root and nothing else. Each must clear 4.5:1 against the ink knocked out of it and 3:1 against the card surface, in both themes. A card still owns its `.wrap`, its layout and its legend copy.
 */
export const bodygraphChartStyles = css`
	.chart {
		display: block;
		width: 100%;
		max-width: var(--roxy-chart-max-width, 30rem);
		height: auto;
		margin: 0 auto;
	}
	/* On a phone the card padding is a sixth of the width 64 gate numbers have to
	 * share, so below that point the chart bleeds to the card edge to take it
	 * back. Only the chart moves; the prose keeps its measure. */
	@container (max-width: 26rem) {
		.chart {
			width: calc(100% + 2 * var(--roxy-space-lg, 1.5rem));
			margin-inline: calc(-1 * var(--roxy-space-lg, 1.5rem));
		}
	}

	/* Body silhouette behind the chart, a soft tint that reads on either surface.
	 * The centers paint over it, so an open center reads as a cut-out. */
	.bg-body {
		fill: color-mix(in srgb, var(--roxy-secondary, #475569) 8%, transparent);
		stroke: var(--roxy-border, #e4e4e7);
		stroke-width: 1;
	}

	/* Every channel is one connector joining its two gates, each half repainted in
	 * the colour of the gate at its own end. Both halves lit is a defined channel,
	 * one half is a hanging gate; neither is asked for separately. */
	.bg-channel {
		stroke: var(--roxy-border, #e4e4e7);
		stroke-width: 5;
		stroke-linecap: round;
	}
	.bg-half {
		stroke-width: 5;
		stroke-linecap: round;
	}
	/* A gate BOTH sources activated is one bar in two colours: the left stroke with
	 * the right stroke dashed over it. */
	.bg-half.stripe {
		stroke-linecap: butt;
		stroke-dasharray: 7 7;
	}

	/* Centers carry the traditional Human Design semantic colors when defined,
	 * constant across light and dark like chart data colors. An open center takes
	 * the card surface rather than transparent, so the wiring and the silhouette
	 * pass behind it as they do on a printed chart. */
	.bg-center {
		fill: var(--roxy-surface, #fff);
		stroke: var(--roxy-secondary, #475569);
		stroke-width: 1.8;
	}
	.bg-center.defined {
		stroke: color-mix(in srgb, var(--roxy-fg, #0a0a0a) 45%, transparent);
	}
	/* The four semantic centre colours, declared once and read by both the shape and
	 * the legend swatch that keys it, so a card cannot show a swatch in a colour the
	 * chart does not draw. */
	:host {
		--center-gold: #e0a200;
		--center-green: #2f8f00;
		--center-red: #c41f1f;
		--center-brown: #76502f;
	}
	.bg-center.bg-gold.defined,
	.legend .swatch.bg-gold {
		fill: var(--center-gold);
		background: var(--center-gold);
	}
	.bg-center.bg-green.defined,
	.legend .swatch.bg-green {
		fill: var(--center-green);
		background: var(--center-green);
	}
	.bg-center.bg-red.defined,
	.legend .swatch.bg-red {
		fill: var(--center-red);
		background: var(--center-red);
	}
	.bg-center.bg-brown.defined,
	.legend .swatch.bg-brown {
		fill: var(--center-brown);
		background: var(--center-brown);
	}

	/* All 64 gates are drawn: an unactivated gate is a named position, not an
	 * absence. Unactivated is an outlined disc in the surface colour, which also
	 * masks the wiring under it; activated is filled and knocks its number out in
	 * the surface colour, so it reads on whatever center it lands on. */
	.bg-gate-dot {
		fill: var(--roxy-surface, #fff);
		stroke: var(--roxy-border, #e4e4e7);
		stroke-width: 1;
	}
	.bg-gate-dot.on {
		stroke: none;
	}
	.bg-gate {
		fill: var(--roxy-muted, #71717a);
		font-size: ${GATE_FONT_SIZE}px;
		font-weight: 600;
		font-family: var(--roxy-font-sans);
	}
	/* The number knocked out of an activated disc. It follows the card surface, so
	 * it inverts with the theme, unless a card pins --src-ink because its source
	 * colours are constant across themes and the ink has to be too. */
	.bg-gate.on {
		fill: var(--src-ink, var(--roxy-surface, #fff));
	}

	/* The key under the chart. A card supplies the words and any swatch colours of
	 * its own; the row and the swatch box are the same on every chart. */
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
		font-size: var(--roxy-text-xs, 0.75rem);
		color: var(--roxy-muted, #71717a);
	}
	.legend .swatch {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 2px;
		margin-right: 4px;
		vertical-align: middle;
		border: 1px solid var(--roxy-secondary, #475569);
	}

	/* The two source colours, consumed in every place a source is drawn. A card
	 * declares the two values; these six rules are never restated. */
	.bg-half.src-left {
		stroke: var(--src-left);
	}
	.bg-half.src-right {
		stroke: var(--src-right);
	}
	.bg-gate-dot.on.src-left {
		fill: var(--src-left);
	}
	.bg-gate-dot.on.src-right {
		fill: var(--src-right);
	}
	.legend .swatch.src-left {
		background: var(--src-left);
	}
	.legend .swatch.src-right {
		background: var(--src-right);
	}
	/* A source swatch is a disc, matching the gate circles rather than the square
	 * centre swatches beside it. */
	.legend .swatch.source {
		border-radius: var(--roxy-radius-full, 9999px);
		border-color: transparent;
	}
`;
