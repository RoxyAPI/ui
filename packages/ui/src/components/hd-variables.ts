import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculateVariablesResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

/**
 * Human Design variables (the four arrows / PHS). Renders /human-design/variables: the four transformation arrows laid out as they sit on the bodygraph head (top-left/right Determination + Motivation, bottom-left/right Environment + Perspective), each showing its left/right direction, the digestion/environment/awareness/perspective labels, and its color/tone/base. A low-confidence calculation (near a color/tone boundary) is flagged.
 */
@customElement('roxy-hd-variables')
export class RoxyHdVariables extends RoxyDataElement<CalculateVariablesResponse> {
	static styles = [
		baseStyles,
		css`
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
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.grid {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.arrow {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.arrow-head {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.glyph {
				font-size: 1.75rem;
				line-height: 1;
				color: var(--roxy-accent-ink, #b45309);
			}
			.name {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.layer {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.labels {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.ctb {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}
			.note {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-warning-fg, #9a3412);
			}
			@container (max-width: 28rem) {
				.grid {
					grid-template-columns: 1fr;
				}
			}
		`,
	];

	protected renderData(d: CalculateVariablesResponse) {
		// Place the arrows by their bodygraph `position`, not response order: the
		// 2-col grid fills row-major, so sorting to Top left, Top right, Bottom left,
		// Bottom right keeps the design column (Determination + Environment) on the
		// left and the personality column (Motivation + Perspective) on the right,
		// which is the whole point of the four-arrow layout.
		const arrows = [...(d.arrows ?? [])].sort(
			(a, b) => quadrantOrder(a.position) - quadrantOrder(b.position),
		);
		return html`<div class="wrap" aria-label="Human Design variables">
			<h2 class="title">Variables</h2>
			<div class="grid">${arrows.map((a) => this.renderArrow(a))}</div>
			${
				d.confident === false
					? html`<p class="note" role="note">
						Low confidence: a birth time near a color or tone boundary${typeof d.confidenceMarginDeg === 'number' ? ` (within ${d.confidenceMarginDeg}°)` : ''}. Verify the exact birth time.
					</p>`
					: nothing
			}
		</div>`;
	}

	private renderArrow(
		a: NonNullable<CalculateVariablesResponse['arrows']>[number],
	) {
		// A left arrow is strategic/active, a right arrow receptive/passive in HD.
		const glyph = a.direction === 'left' ? '←' : '→';
		return html`<div class="arrow">
			<div class="arrow-head">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				<span class="name">${a.name ?? ''}</span>
			</div>
			${a.layer ? html`<span class="layer">${a.layer}</span>` : nothing}
			<span class="labels">
				${[a.directionLabel, a.colorLabel].filter(Boolean).join(' · ')}
			</span>
			${
				typeof a.color === 'number'
					? html`<span class="ctb">Color ${a.color} · Tone ${a.tone} · Base ${a.base}${a.activation?.planet ? ` · ${a.activation.planet}${a.activation.side ? ` (${a.activation.side})` : ''}` : ''}</span>`
					: nothing
			}
			${
				a.confident === false
					? html`<span class="note" role="note">Knife-edge: could flip with a more precise birth time.</span>`
					: nothing
			}
		</div>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No variables data</div>`;
	}
}

/** Canonical bodygraph reading order for the four arrows, so the 2-col grid lays them out by quadrant. Unknown positions sort last. */
function quadrantOrder(position: string | undefined): number {
	switch (position) {
		case 'Top left':
			return 0;
		case 'Top right':
			return 1;
		case 'Bottom left':
			return 2;
		case 'Bottom right':
			return 3;
		default:
			return 99;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hd-variables': RoxyHdVariables;
	}
}
