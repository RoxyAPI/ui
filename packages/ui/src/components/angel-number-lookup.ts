import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { AnalyzeNumberSequenceResponse } from '../types/index.js';
import { buildMeaningSections } from '../utils/angel-sections.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';

/**
 * Angel number lookup card. Renders /angel-numbers/lookup: the analysed sequence with its pattern classification (type, digit count, unique digits, palindrome, repeating), the context note when the caller said where the number was seen, the known angel-number meaning when the sequence is in the database, and the foundational digit-root meaning that interprets any sequence. Built for synchronicity trackers where users enter arbitrary numbers.
 */
@customElement('roxy-angel-number-lookup')
export class RoxyAngelNumberLookup extends RoxyDataElement<AnalyzeNumberSequenceResponse> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
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
			.badges {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.badge {
				display: inline-flex;
				align-items: center;
				padding: 3px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 35%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				text-transform: capitalize;
			}
			.badge.flag {
				background: color-mix(in srgb, var(--roxy-info, #0284c7) 16%, transparent);
				color: var(--roxy-info-fg, #075985);
			}
			/* The tint carries the energy classification; the text stays --roxy-fg,
			 * because accent ink on a tinted chip misses WCAG AA. */
			.badge.energy-positive {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 18%, transparent);
			}
			.badge.energy-cautionary {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 18%, transparent);
			}
			.context {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-left: 3px solid var(--roxy-accent, #f59e0b);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
				border-radius: 0 var(--roxy-radius-sm, 4px) var(--roxy-radius-sm, 4px) 0;
			}
			.steps {
				margin: 0;
				padding-left: 1.1rem;
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.6;
			}
			.section {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.section > .label {
				margin: 0;
			}
			/* Direct child only: the accordion block renders its own muted h3 heading
			 * one level down, and this rule would otherwise repaint it. */
			.section > h3 {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.section p {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				line-height: 1.6;
				font-size: var(--roxy-text-sm, 0.875rem);
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
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No number analysis</div>`;
	}

	protected renderData(d: AnalyzeNumberSequenceResponse) {
		const known = d.knownMeaning;
		const root = d.digitRootMeaning;
		const heading = known?.title ?? 'Number analysis';
		const steps = known?.actionSteps ?? [];

		return html`<article
			class="card"
			part="card"
			aria-label=${`Number ${d.number ?? ''}`}
		>
			<div class="hero" part="header">
				${d.number ? html`<div class="numeral">${d.number}</div>` : nothing}
				<div>
					${known?.title ? html`<p class="label">Number analysis</p>` : nothing}
					<h2 class="title">${heading}</h2>
				</div>
			</div>
			<div class="badges" part="details">
				${d.type ? html`<span class="badge">${d.type}</span>` : nothing}
				${typeof d.digits === 'number' ? html`<span class="badge">${d.digits} digits</span>` : nothing}
				${typeof d.uniqueDigits === 'number' ? html`<span class="badge">${d.uniqueDigits} unique</span>` : nothing}
				${typeof d.digitRoot === 'number' ? html`<span class="badge">Digit root ${d.digitRoot}</span>` : nothing}
				${d.isPalindrome ? html`<span class="badge flag">Palindrome</span>` : nothing}
				${d.isRepeating ? html`<span class="badge flag">Repeating</span>` : nothing}
				${known?.energy ? html`<span class=${`badge energy-${known.energy}`}>${known.energy} energy</span>` : nothing}
			</div>
			${
				// The caller's own note about where the number was seen, echoed back.
				// Not an interpretation, so it survives hide-readings.
				d.contextNote
					? html`<div class="context" part="section context">
						<p class="label">Where you saw it</p>
						<p>${d.contextNote}</p>
					</div>`
					: nothing
			}
			${
				// Both sections below are interpretation end to end: the core message,
				// the life-area accordion, the affirmation and the action steps. The
				// facts they would otherwise carry (the number, its digit root, the
				// title) are already in the hero and the badges, so the whole section
				// goes rather than leaving a heading over nothing.
				known && !this.hideReadings
					? html`<div class="section" part="section known-meaning">
						<p class="label">Known angel number</p>
						${known.coreMessage ? html`<p>${known.coreMessage}</p>` : nothing}
						${
							known.keywords && known.keywords.length > 0
								? html`<div class="chips">${known.keywords.map((k) => html`<span>${k}</span>`)}</div>`
								: nothing
						}
						${this.renderMeaning(known.meaning, 'lookup-known', known.biblical, known.shadow)}
						${known.affirmation ? html`<p><em>${known.affirmation}</em></p>` : nothing}
						${
							steps.length > 0
								? html`<p class="label">What to do next</p>
									<ol class="steps">${steps.map((s) => html`<li>${s}</li>`)}</ol>`
								: nothing
						}
					</div>`
					: nothing
			}
			${
				root && !this.hideReadings
					? html`<div class="section" part="section digit-root">
						<p class="label">Foundational digit root${root.number ? ` (${root.number})` : ''}</p>
						${root.title ? html`<h3>${root.title}</h3>` : nothing}
						${root.coreMessage ? html`<p>${root.coreMessage}</p>` : nothing}
						${!known ? this.renderRootMeaning(root) : nothing}
					</div>`
					: nothing
			}
		</article>`;
	}

	private renderMeaning(
		meaning: Record<string, string> | undefined,
		name: string,
		biblical?: string,
		shadow?: string,
	) {
		return this.renderInterpretation(
			buildMeaningSections(meaning, biblical, shadow),
			name,
			'Reading',
		);
	}

	/**
	 * Render the foundational digit-root reading for an unknown sequence: keyword chips, the full life-area accordion (including money), and the affirmation. The digit-root meaning carries no biblical or shadow field, so only the life areas are passed through.
	 */
	private renderRootMeaning(
		root: NonNullable<AnalyzeNumberSequenceResponse['digitRootMeaning']>,
	) {
		return html`${
			root.keywords && root.keywords.length > 0
				? html`<div class="chips">${root.keywords.map((k) => html`<span>${k}</span>`)}</div>`
				: nothing
		}${this.renderMeaning(root.meaning, 'lookup-root')}${
			root.affirmation ? html`<p><em>${root.affirmation}</em></p>` : nothing
		}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-angel-number-lookup': RoxyAngelNumberLookup;
	}
}
