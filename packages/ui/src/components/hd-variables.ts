import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculateVariablesResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';
import { capitalize } from '../utils/string.js';

type Variables = CalculateVariablesResponse;
type Arrow = Variables['arrows'][number];

/**
 * Human Design variables (the four arrows / PHS). Renders /human-design/variables: the four transformation arrows laid out as they sit on the bodygraph head (top-left/right Determination + Motivation, bottom-left/right Environment + Perspective), each showing its left/right direction, the digestion/environment/awareness/perspective labels, and its color/tone/base.
 *
 * @remarks
 * The quadrant grid stays the primary read: it is the arrow map as it appears on the chart, and it is what a reader scans first. The interpretation sits below it in an exclusive accordion, grouped by the two layers the arrows belong to (the body-side Primary Health System, the mind-side Rave Psychology), because the layer description is one text shared by the two arrows in it and belongs to the group rather than to each arrow. Only one arrow reading is ever open, so the card grows by one paragraph at most.
 *
 * `cognition` rides only on the determination arrow and is rendered when present. A low-confidence calculation (a birth time near a color or tone boundary) is flagged per arrow and for the chart as a whole.
 */
@customElement('roxy-hd-variables')
export class RoxyHdVariables extends RoxyDataElement<Variables> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.grid {
				display: grid;
				grid-template-columns: repeat(2, minmax(0, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.arrow {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				align-content: start;
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
					grid-template-columns: minmax(0, 1fr);
				}
			}

			/* Interpretation. The accordion itself (.block, .interp-*) comes from
			 * interpAccordionStyles; only the layer grouping around it is local. */
			.group {
				margin-bottom: var(--roxy-space-md, 1rem);
			}
			.group:last-of-type {
				margin-bottom: 0;
			}
			.group-head {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.group-note {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: 1.6;
			}
			.facets {
				margin: 0;
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.facets dt {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.facets dd {
				margin: 0;
			}
			.footnote {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: 1.6;
			}
		`,
	];

	protected renderData(d: Variables) {
		// Place the arrows by their bodygraph `position`, not response order: the
		// 2-col grid fills row-major, so sorting to Top left, Top right, Bottom left,
		// Bottom right keeps the design column (Determination + Environment) on the
		// left and the personality column (Motivation + Perspective) on the right,
		// which is the whole point of the four-arrow layout.
		const arrows = [...(d.arrows ?? [])].sort(
			(a, b) => quadrantOrder(a.position) - quadrantOrder(b.position),
		);
		return html`<div class="wrap" part="card" aria-label="Human Design variables">
			<h2 class="title" part="header">Variables</h2>
			<div class="grid" part="details arrows">${arrows.map((a) => this.renderArrow(a))}</div>
			${
				d.confident === false
					? html`<p class="note" role="note">
						Low confidence: a birth time near a color or tone boundary${typeof d.confidenceMarginDeg === 'number' ? ` (within ${d.confidenceMarginDeg}°)` : ''}. Verify the exact birth time.
					</p>`
					: nothing
			}
			${this.renderReading(arrows, d.baseDescription)}
		</div>`;
	}

	private renderArrow(a: Arrow) {
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
					? html`<span class="ctb">Color ${a.color} · Tone ${a.tone} · Base ${a.base}${a.baseName ? `, ${a.baseName}` : ''}</span>`
					: nothing
			}
			${
				a.activation?.planet
					? html`<span class="ctb">${[a.activation.planet, capitalize(a.activation.side ?? '')].filter(Boolean).join(' · ')}</span>`
					: nothing
			}
			${
				a.confident === false
					? html`<span class="note" role="note">Knife-edge: could flip with a more precise birth time.</span>`
					: nothing
			}
		</div>`;
	}

	/**
	 * The four readings, grouped by the layer each arrow belongs to. The layer
	 * description is one text shared by both arrows of a layer, so it is lifted to
	 * the group intro rather than repeated in each body. Group order follows the
	 * already quadrant-sorted arrows, which puts the body layer before the mind
	 * layer without naming either.
	 *
	 * Prose end to end, and the arrows themselves are already tiled above with
	 * their direction, color, tone and base, so `hide-readings` takes the section
	 * whole.
	 */
	private renderReading(arrows: Arrow[], baseDescription: string | undefined) {
		const readable = arrows.filter((a) => a.description || a.colorMeaning);
		if (readable.length === 0 || this.hideReadings) return nothing;

		const groups = new Map<string, Arrow[]>();
		for (const a of readable) {
			const key = a.layer ?? '';
			const bucket = groups.get(key);
			if (bucket) bucket.push(a);
			else groups.set(key, [a]);
		}
		let index = 0;

		return html`<section class="block" part="section readings">
			<h3>Reading</h3>
			${[...groups].map(
				([layer, list]) => html`<div class="group">
					${layer ? html`<p class="group-head">${layer}</p>` : nothing}
					${
						list[0]?.layerDescription
							? html`<p class="group-note">${list[0].layerDescription}</p>`
							: nothing
					}
					${list.map((a) => this.renderArrowReading(a, index++ === 0))}
				</div>`,
			)}
			${baseDescription ? html`<p class="footnote">Base. ${baseDescription}</p>` : nothing}
		</section>`;
	}

	private renderArrowReading(a: Arrow, open: boolean) {
		// Cognition rides only on the determination arrow, so its row appears on that
		// arrow alone. Its label joins the term because, unlike color and direction,
		// the tile above carries no cognition label to read it against.
		const cog = a.cognition;
		const facets: Array<{ label: string; body: string | undefined }> = [
			{ label: 'Color', body: a.colorMeaning },
			{ label: 'Tone', body: a.toneMeaning },
			{ label: 'Direction', body: a.directionMeaning },
			{
				label: cog?.label ? `Cognition · ${cog.label}` : 'Cognition',
				body: cog?.description,
			},
		].filter((f) => Boolean(f.body));

		return html`<details class="interp-card" part="reading" name="hd-variable" ?open=${open}>
			<summary>
				<span class="interp-lead">${a.name ?? ''}</span>
				${chevron()}
				${a.position ? html`<span class="interp-aside"><small>${a.position}</small></span>` : nothing}
			</summary>
			<div class="interp-body">
				${a.description ? html`<p>${a.description}</p>` : nothing}
				${
					facets.length > 0
						? html`<dl class="facets">
							${facets.map(
								(f) => html`<dt>${f.label}</dt>
									<dd>${f.body}</dd>`,
							)}
						</dl>`
						: nothing
				}
			</div>
		</details>`;
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
