import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { NakshatraResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

/**
 * Nakshatra reference card. Renders /vedic-astrology/nakshatras/{id}: the
 * lunar mansion number, longitude range, ruling planet, presiding deity,
 * symbol, native characteristics, and traditional remedies.
 */
@customElement('roxy-nakshatra-card')
export class RoxyNakshatraCard extends RoxyDataElement<NakshatraResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				padding: var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.head {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.number {
				color: var(--roxy-accent-ink, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.range {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.facts {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.fact {
				display: grid;
				gap: 2px;
			}
			.fact dt {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.fact dd {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.section h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.section p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				line-height: 1.5;
			}
			.remedies {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.remedy {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.remedy strong {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
			}
		`,
	];

	protected renderData(n: NakshatraResponse) {
		const remedies = n.remedies;

		return html`<article class="wrap" aria-label=${`Nakshatra ${n.name}`}>
			<header class="head">
				<h2 class="name">${n.name}</h2>
				${
					typeof n.number === 'number'
						? html`<span class="number">Nakshatra ${n.number} of 27</span>`
						: nothing
				}
				${n.range ? html`<span class="range">${n.range}</span>` : nothing}
			</header>

			<dl class="facts">
				${n.lord ? html`<div class="fact"><dt>Lord</dt><dd>${n.lord}</dd></div>` : nothing}
				${n.deity ? html`<div class="fact"><dt>Deity</dt><dd>${n.deity}</dd></div>` : nothing}
				${n.symbol ? html`<div class="fact"><dt>Symbol</dt><dd>${n.symbol}</dd></div>` : nothing}
			</dl>

			${
				n.characteristics
					? html`<div class="section">
						<h3>Characteristics</h3>
						<p>${n.characteristics}</p>
					</div>`
					: nothing
			}

			${
				remedies
					? html`<div class="section">
						<h3>Remedies</h3>
						<div class="remedies">
							${remedies.mantras ? html`<div class="remedy"><strong>Mantras:</strong> ${remedies.mantras}</div>` : nothing}
							${remedies.gemstones ? html`<div class="remedy"><strong>Gemstones:</strong> ${remedies.gemstones}</div>` : nothing}
							${remedies.rituals ? html`<div class="remedy"><strong>Rituals:</strong> ${remedies.rituals}</div>` : nothing}
						</div>
					</div>`
					: nothing
			}
		</article>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No nakshatra data</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-nakshatra-card': RoxyNakshatraCard;
	}
}
