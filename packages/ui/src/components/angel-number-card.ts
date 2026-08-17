import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { GetAngelNumberResponse } from '../types/index.js';
import { buildMeaningSections } from '../utils/angel-sections.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';

/**
 * Angel number card. Renders /angel-numbers/numbers/{number}: the number as a hero numeral, its title and core message, the pattern type / digit root / energy badges, keyword chips, the life-area interpretations (spiritual, love, career, money, twin flame) plus the biblical and shadow readings as an exclusive accordion, the affirmation, and the action steps.
 *
 * @remarks
 * The numeral, the pattern type, the digit root and the energy badge are computed from the sequence, so they are the card's data spine and `hide-readings` keeps every one of them. The core message, the keyword chips, the life-area accordion, the affirmation and the action steps are the reading and all go, which is the same line `roxy-angel-number-lookup` already draws on the same domain.
 *
 * The accordion draws the shared `interp-accordion` through `RoxyDataElement.renderInterpretation` rather than the bare `<details>` it once hand-rolled. That local copy predated the helper, so it neither honoured `hide-readings` nor answered to `::part(reading)`, and being plain `<details>` rather than `.interp-card` markup it was invisible to the e2e guard that caught the other five.
 */
@customElement('roxy-angel-number-card')
export class RoxyAngelNumberCard extends RoxyDataElement<GetAngelNumberResponse> {
	static styles = [
		baseStyles,
		interpAccordionStyles,
		css`
			.card {
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
			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			/* Only the TEXT column may shrink. It keeps min-width: auto as a flex
			 * item, so a long title pushed the hero past the card instead of
			 * wrapping. Excluding the numeral is load-bearing: it is also a div, and
			 * letting it shrink made the 1111 overflow its own box and render
			 * underneath the title. */
			.numeral {
				flex-shrink: 0;
			}
			.hero > div:not(.numeral) {
				min-width: 0;
			}
			/* Phone width. The numeral is about half the padded card, which left the
			 * title roughly 116px and broke it onto six lines. Stack so the title
			 * gets the full width. */
			@container (max-width: 24rem) {
				.hero {
					display: grid;
					grid-template-columns: minmax(0, 1fr);
					justify-items: start;
					gap: var(--roxy-space-sm, 0.5rem);
				}
			}
			.numeral {
				font-size: 3rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
				font-variant-numeric: tabular-nums;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.core {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				line-height: 1.6;
			}
			.badges {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.badge {
				display: inline-flex;
				align-items: center;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: 3px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 35%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				text-transform: capitalize;
			}
			.badge.positive {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.badge.cautionary {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.badge.neutral {
				background: color-mix(in srgb, var(--roxy-info, #0284c7) 16%, transparent);
				color: var(--roxy-info-fg, #075985);
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.affirmation {
				margin: 0;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				border-left: 3px solid var(--roxy-accent, #f59e0b);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-radius: var(--roxy-radius-sm, 4px);
				font-style: italic;
				color: var(--roxy-fg, #0a0a0a);
			}
			.steps h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.steps ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				display: grid;
				gap: 2px;
			}
		`,
	];

	protected renderData(d: GetAngelNumberResponse) {
		const energy = (d.energy ?? '').toLowerCase();
		const energyClass =
			energy === 'positive' || energy === 'cautionary' || energy === 'neutral'
				? energy
				: '';
		const keywords = d.keywords ?? [];
		const steps = d.actionSteps ?? [];

		return html`<article class="card" part="card" aria-label=${`${this.t('Angel number')} ${d.number ?? ''}`}>
			<div class="hero" part="header">
				${d.number ? html`<div class="numeral">${d.number}</div>` : nothing}
				<div>
					<p class="label">${this.t('Angel number')}</p>
					${d.title ? html`<h2 class="title">${d.title}</h2>` : nothing}
				</div>
			</div>
			${
				// The badges below classify the sequence; this is what it is said to say.
				d.coreMessage && !this.hideReadings
					? html`<p class="core">${d.coreMessage}</p>`
					: nothing
			}
			<div class="badges" part="details">
				${d.type ? html`<span class="badge">${d.type}</span>` : nothing}
				${typeof d.digitRoot === 'number' ? html`<span class="badge">${this.t('Digit root')} ${d.digitRoot}</span>` : nothing}
				${d.energy ? html`<span class=${`badge ${energyClass}`}>${d.energy}</span>` : nothing}
			</div>
			${
				keywords.length > 0 && !this.hideReadings
					? html`<div class="chips">${keywords.map((k) => html`<span>${k}</span>`)}</div>`
					: nothing
			}
			${this.renderSections(d)}
			${d.affirmation && !this.hideReadings ? html`<p class="affirmation">${d.affirmation}</p>` : nothing}
			${
				// Each step is a sentence of advice, so the list is prose under its own
				// heading and goes whole.
				steps.length > 0 && !this.hideReadings
					? html`<div class="steps" part="section action-steps">
						<h3>${this.t('Action steps')}</h3>
						<ul>${steps.map((s) => html`<li>${s}</li>`)}</ul>
					</div>`
					: nothing
			}
		</article>`;
	}

	private renderSections(d: NonNullable<GetAngelNumberResponse>) {
		return this.renderInterpretation(
			buildMeaningSections(this.translator, d.meaning, d.biblical, d.shadow),
			'angel-meaning',
			'Reading',
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-angel-number-card': RoxyAngelNumberCard;
	}
}
