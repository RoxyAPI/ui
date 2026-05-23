import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type { GenerateBodygraphResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	BODYGRAPH_VIEWBOX,
	type BodygraphCenterId,
	channelKey,
	renderBodygraphSvg,
} from '../utils/bodygraph-render.js';
import { MarkupDataController } from '../utils/markup-data.js';
import { capitalize } from '../utils/string.js';

type GateActivation = GenerateBodygraphResponse['gates'][number];

/**
 * Human Design bodygraph. Pass `data` from /human-design/bodygraph. Renders the
 * nine centers in their canonical positions and shapes, filled when defined and
 * outlined when open, the 36 channels as wiring between gates with active
 * channels emphasized, and the activated gate numbers. A summary block lists
 * type, strategy, authority, profile, definition, incarnation cross, signature,
 * and not-self theme.
 *
 * The chart is theme-driven through `--roxy-*` custom properties on `:host`, so
 * it adopts the host palette in light and dark without runtime color probing.
 */
@customElement('roxy-bodygraph')
export class RoxyBodygraph extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.type-line {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.layout {
				display: grid;
				gap: var(--roxy-space-lg, 1.5rem);
				grid-template-columns: minmax(0, 1fr);
				align-items: start;
			}
			@container (min-width: 520px) {
				.layout {
					grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
				}
			}

			svg {
				display: block;
				width: 100%;
				max-width: 340px;
				height: auto;
				margin: 0 auto;
			}

			/* Body silhouette behind the chart. Theme-aware: a soft warm tint in
			 * light, a muted fill in dark, with a faint outline that follows the
			 * border token so it reads on either surface. */
			.bg-body {
				fill: color-mix(in srgb, var(--roxy-secondary, #475569) 8%, transparent);
				stroke: var(--roxy-border, #e4e4e7);
				stroke-width: 1;
			}

			/* Every channel is drawn as one line joining its two gates, so the
			 * wiring always reads as a connected diagram. The faint base shows the
			 * full 36-channel skeleton; .on thickens it when both gates are active
			 * (a defined channel); .bg-half lights a single gate's hanging end. */
			.bg-channel {
				stroke: var(--roxy-secondary, #475569);
				stroke-width: 1.6;
				opacity: 0.3;
			}
			.bg-channel.on {
				stroke-width: 3.4;
				stroke-linecap: round;
				opacity: 1;
			}
			.bg-half {
				stroke: var(--roxy-secondary, #475569);
				stroke-width: 3.2;
				stroke-linecap: round;
				opacity: 0.9;
			}
			/* Thin leaders connect each center's margin label to its shape so the
			 * Heart and every other center is identifiable at a glance. */
			.bg-leader {
				stroke: var(--roxy-muted, #71717a);
				stroke-width: 1;
				opacity: 0.5;
			}

			/* Centers carry the traditional Human Design semantic colors when
			 * defined. These stay constant across light and dark, like chart data
			 * colors. Open centers are transparent with a thin theme-aware outline.
			 * The defined gate-cluster colors are chosen for >= 4.5:1 contrast with
			 * the white gate-number halo in both themes. */
			.bg-center {
				fill: transparent;
				stroke: var(--roxy-secondary, #475569);
				stroke-width: 1.8;
			}
			.bg-center.defined {
				stroke: rgba(0, 0, 0, 0.45);
			}
			.bg-center.bg-gold.defined {
				fill: #e0a200;
			}
			.bg-center.bg-green.defined {
				fill: #2f8f00;
			}
			.bg-center.bg-red.defined {
				fill: #c41f1f;
			}
			.bg-center.bg-brown.defined {
				fill: #76502f;
			}
			.bg-center-label {
				fill: var(--roxy-muted, #71717a);
				font-size: 11px;
				font-family: var(--roxy-font-sans);
			}
			/* Gate numbers sit on filled centers, so a halo (white stroke painted
			 * under the fill via paint-order) keeps them legible on any color. The
			 * size is tuned to the canonical gate spacing (the closest gates sit ~18
			 * viewBox units apart) so two-digit numbers never touch. */
			.bg-gate {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 8px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
				paint-order: stroke;
				stroke: var(--roxy-bg, #fff);
				stroke-width: 1.6px;
				stroke-linejoin: round;
			}

			.summary {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.facts {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.fact {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
			}
			.fact span {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.fact strong {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cross {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				border-left: 2px solid var(--roxy-accent, #f59e0b);
				padding-left: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.cross .gates {
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}
			.themes {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.pill {
				padding: 2px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.pill--good {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.pill--shadow {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			/* Spans the row so the color key reads as "these are the colors a center
			 * takes when defined", not a claim about this chart. Without it a red
			 * Heart swatch reads as contradicting an open (outlined) Heart. */
			.legend-caption {
				flex-basis: 100%;
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
			/* Defined-center swatches use the same semantic colors as the chart so
			 * the legend reads as a key, not decoration. Open uses the open-center
			 * outline only. */
			.legend .swatch.defined {
				border-color: rgba(0, 0, 0, 0.45);
			}
			.legend .swatch.bg-gold {
				background: #e0a200;
			}
			.legend .swatch.bg-green {
				background: #2f8f00;
			}
			.legend .swatch.bg-red {
				background: #c41f1f;
			}
			.legend .swatch.bg-brown {
				background: #76502f;
			}
		`,
	];

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: GenerateBodygraphResponse | null = null;

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No bodygraph data</div>`;

		const definedCenters = new Set<BodygraphCenterId>(
			(d.centers ?? [])
				.filter((c) => c.defined)
				.map((c) => c.id as BodygraphCenterId),
		);
		const activeGates = new Set<number>(
			(d.gates ?? []).map((g) => g.gate).filter((n): n is number => n != null),
		);
		const activeChannels = new Set<string>(
			(d.channels ?? []).map((c) => channelKey(c.gateA, c.gateB)),
		);
		const gateTitles = this.buildGateTitles(d.gates ?? []);

		return html`<div class="wrap">
			<header class="head">
				<h2 class="title">Bodygraph</h2>
				${
					d.type
						? html`<div class="type-line">
							${d.type}${d.profile ? html` · Profile ${d.profile}` : nothing}
						</div>`
						: nothing
				}
			</header>
			<div class="layout">
				<svg
					viewBox=${BODYGRAPH_VIEWBOX}
					preserveAspectRatio="xMidYMid meet"
					role="img"
					aria-label="Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette"
				>
					<title>Human Design bodygraph</title>
					<desc>
						Nine energy centers in their canonical positions over a human
						silhouette, each filled with its traditional color when defined and
						outlined when open, wired by channels between activated gates.
					</desc>
					${renderBodygraphSvg({
						definedCenters,
						activeChannels,
						activeGates,
						gateTitles,
					})}
				</svg>
				${this.renderSummary(d)}
			</div>
		</div>`;
	}

	private buildGateTitles(gates: GateActivation[]): Map<number, string> {
		const titles = new Map<number, string>();
		for (const g of gates) {
			if (g.gate == null) continue;
			const parts: string[] = [`Gate ${g.gate}`];
			if (g.line != null) parts[0] += `.${g.line}`;
			if (g.gateName) parts.push(g.gateName);
			const planet = g.planet ? capitalize(g.planet) : '';
			const glyph = planet ? (PLANET_GLYPH[planet] ?? planet) : '';
			if (glyph) parts.push(`${glyph} ${g.side ?? ''}`.trim());
			titles.set(g.gate, parts.join(' · '));
		}
		return titles;
	}

	private renderSummary(d: GenerateBodygraphResponse) {
		const facts: Array<{ label: string; value?: string }> = [
			{ label: 'Type', value: d.type },
			{ label: 'Strategy', value: d.strategy },
			{ label: 'Authority', value: d.authority },
			{ label: 'Profile', value: d.profile },
			{ label: 'Definition', value: d.definition },
		];
		const ic = d.incarnationCross;
		return html`<div class="summary">
			<div class="facts">
				${facts.map((f) =>
					f.value
						? html`<div class="fact">
							<span>${f.label}</span>
							<strong>${f.value}</strong>
						</div>`
						: nothing,
				)}
			</div>
			${
				ic?.name
					? html`<p class="cross">
						${ic.name}
						${
							ic.gates?.length
								? html`<span class="gates"> (${ic.gates.join(', ')})</span>`
								: nothing
						}
					</p>`
					: nothing
			}
			${
				d.signature || d.notSelf
					? html`<div class="themes">
						${d.signature ? html`<span class="pill pill--good">Signature: ${d.signature}</span>` : nothing}
						${d.notSelf ? html`<span class="pill pill--shadow">Not-self: ${d.notSelf}</span>` : nothing}
					</div>`
					: nothing
			}
			<div class="legend">
				<span class="legend-caption">Center colors when defined. Open centers are outlined.</span>
				<span><span class="swatch bg-gold defined"></span>Head, G</span>
				<span><span class="swatch bg-green defined"></span>Ajna</span>
				<span><span class="swatch bg-brown defined"></span>Throat, Spleen, Solar Plexus, Root</span>
				<span><span class="swatch bg-red defined"></span>Heart, Sacral</span>
				<span><span class="swatch"></span>Open center</span>
			</div>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-bodygraph': RoxyBodygraph;
	}
}
