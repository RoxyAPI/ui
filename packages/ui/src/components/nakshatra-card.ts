import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { NakshatraResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

/**
 * Nakshatra reference card. Renders /vedic-astrology/nakshatras/{id}: the
 * lunar mansion number, longitude range, ruling planet, presiding deity,
 * symbol, native characteristics, and traditional remedies.
 *
 * @remarks
 * The classical attribution table is the card and it survives `hide-readings`
 * whole: the name, which of the twenty-seven it is, the longitude range it spans,
 * and its lord, deity and symbol. Those are what a practitioner reads a placement
 * against. The characteristics paragraph and the remedies are the reading, and
 * each carries its own heading, so each section goes whole.
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
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
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

		return html`<article class="wrap" part="card" aria-label=${this.t('Nakshatra {{name}}', { name: n.name })}>
			<header class="head" part="header">
				<h2 class="name">${n.name}</h2>
				${
					typeof n.number === 'number'
						? html`<span class="number">${this.t('Nakshatra {{number}} of 27', { number: n.number })}</span>`
						: nothing
				}
				${n.range ? html`<span class="range">${n.range}</span>` : nothing}
			</header>

			<dl class="facts" part="details">
				${n.lord ? html`<div class="fact"><dt>${this.t('Lord')}</dt><dd>${n.lord}</dd></div>` : nothing}
				${n.deity ? html`<div class="fact"><dt>${this.t('Deity')}</dt><dd>${n.deity}</dd></div>` : nothing}
				${n.symbol ? html`<div class="fact"><dt>${this.t('Symbol')}</dt><dd>${n.symbol}</dd></div>` : nothing}
			</dl>

			${
				// The lord, deity and symbol above are the mansion; this paragraph is
				// what a native of it is said to be like.
				n.characteristics && !this.hideReadings
					? html`<div class="section" part="section characteristics">
						<h3>${this.t('Characteristics')}</h3>
						<p>${n.characteristics}</p>
					</div>`
					: nothing
			}

			${
				remedies && !this.hideReadings
					? html`<div class="section" part="section remedies">
						<h3>${this.t('Remedies')}</h3>
						<div class="remedies">
							${remedies.mantras ? html`<div class="remedy"><strong>${this.t('Mantras:')}</strong> ${remedies.mantras}</div>` : nothing}
							${remedies.gemstones ? html`<div class="remedy"><strong>${this.t('Gemstones:')}</strong> ${remedies.gemstones}</div>` : nothing}
							${remedies.rituals ? html`<div class="remedy"><strong>${this.t('Rituals:')}</strong> ${remedies.rituals}</div>` : nothing}
						</div>
					</div>`
					: nothing
			}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-nakshatra-card': RoxyNakshatraCard;
	}
}
