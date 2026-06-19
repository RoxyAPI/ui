import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { GetDreamSymbolResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

/**
 * Dream symbol card. Renders /dreams/symbols/{id}: the symbol name as a heading, the full psychological interpretation as the body, and the dictionary letter as a chip for alphabetical context.
 */
@customElement('roxy-dream-card')
export class RoxyDreamCard extends RoxyDataElement<GetDreamSymbolResponse> {
	static styles = [
		baseStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.letter {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 2.5rem;
				height: 2.5rem;
				flex: none;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-accent-ink, #b45309);
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-variant-numeric: tabular-nums;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.meaning {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				line-height: 1.6;
			}
		`,
	];

	protected renderData(d: GetDreamSymbolResponse) {
		return html`<article class="card" aria-label=${d.name ?? 'Dream symbol'}>
			<header class="head">
				${d.letter ? html`<span class="letter" aria-hidden="true">${d.letter}</span>` : nothing}
				<div>
					<p class="label">Dream symbol</p>
					${d.name ? html`<h2 class="name">${d.name}</h2>` : nothing}
				</div>
			</header>
			${d.meaning ? html`<p class="meaning">${d.meaning}</p>` : nothing}
		</article>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No dream symbol</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-dream-card': RoxyDreamCard;
	}
}
