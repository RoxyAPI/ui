import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { GetAngelNumberResponse } from '../types/index.js';
import { buildMeaningSections } from '../utils/angel-sections.js';
import { baseStyles } from '../utils/base-styles.js';
import { MarkupDataController } from '../utils/markup-data.js';

/**
 * Angel number card. Renders /angel-numbers/numbers/{number}: the number as a hero numeral, its title and core message, the pattern type / digit root / energy badges, keyword chips, the life-area interpretations (spiritual, love, career, money, twin flame) plus the biblical and shadow readings as an exclusive accordion, the affirmation, and the action steps.
 */
@customElement('roxy-angel-number-card')
export class RoxyAngelNumberCard extends LitElement {
	static styles = [
		baseStyles,
		css`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
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
			.sections {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			details {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-sm, 4px);
				overflow: hidden;
			}
			summary {
				cursor: pointer;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-sm, 0.875rem);
				list-style-position: inside;
			}
			details p {
				margin: 0;
				padding: 0 var(--roxy-space-md, 1rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				line-height: 1.6;
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

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: GetAngelNumberResponse | null = null;

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No angel number</div>`;

		const energy = (d.energy ?? '').toLowerCase();
		const energyClass =
			energy === 'positive' || energy === 'cautionary' || energy === 'neutral'
				? energy
				: '';
		const keywords = d.keywords ?? [];
		const steps = d.actionSteps ?? [];

		return html`<article class="card" aria-label=${`Angel number ${d.number ?? ''}`}>
			<div class="hero">
				${d.number ? html`<div class="numeral">${d.number}</div>` : nothing}
				<div>
					<p class="label">Angel number</p>
					${d.title ? html`<h2 class="title">${d.title}</h2>` : nothing}
				</div>
			</div>
			${d.coreMessage ? html`<p class="core">${d.coreMessage}</p>` : nothing}
			<div class="badges">
				${d.type ? html`<span class="badge">${d.type}</span>` : nothing}
				${typeof d.digitRoot === 'number' ? html`<span class="badge">Digit root ${d.digitRoot}</span>` : nothing}
				${d.energy ? html`<span class=${`badge ${energyClass}`}>${d.energy}</span>` : nothing}
			</div>
			${
				keywords.length > 0
					? html`<div class="chips">${keywords.map((k) => html`<span>${k}</span>`)}</div>`
					: nothing
			}
			${this.renderSections(d)}
			${d.affirmation ? html`<p class="affirmation">${d.affirmation}</p>` : nothing}
			${
				steps.length > 0
					? html`<div class="steps">
						<h3>Action steps</h3>
						<ul>${steps.map((s) => html`<li>${s}</li>`)}</ul>
					</div>`
					: nothing
			}
		</article>`;
	}

	private renderSections(d: NonNullable<GetAngelNumberResponse>) {
		const sections = buildMeaningSections(d.meaning, d.biblical, d.shadow);
		if (sections.length === 0) return nothing;
		return html`<div class="sections">
			${sections.map(
				(s, i) => html`<details name="angel-meaning" ?open=${i === 0}>
					<summary>${s.label}</summary>
					<p>${s.body}</p>
				</details>`,
			)}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-angel-number-card': RoxyAngelNumberCard;
	}
}
