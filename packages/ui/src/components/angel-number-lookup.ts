import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AnalyzeNumberSequenceResponse } from '../types/index.js';
import { buildMeaningSections } from '../utils/angel-sections.js';
import { baseStyles } from '../utils/base-styles.js';
import { MarkupDataController } from '../utils/markup-data.js';

/**
 * Angel number lookup card. Renders /angel-numbers/lookup: the analysed sequence with its pattern classification (type, digit count, unique digits, palindrome, repeating), the known angel-number meaning when the sequence is in the database, and the foundational digit-root meaning that interprets any sequence. Built for synchronicity trackers where users enter arbitrary numbers.
 */
@customElement('roxy-angel-number-lookup')
export class RoxyAngelNumberLookup extends LitElement {
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
			.section {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.section > .label {
				margin: 0;
			}
			.section h3 {
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
				padding: 0 var(--roxy-space-md, 1rem) var(--roxy-space-md, 1rem);
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
	data: AnalyzeNumberSequenceResponse | null = null;

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No number analysis</div>`;

		const known = d.knownMeaning;
		const root = d.digitRootMeaning;
		const heading = known?.title ?? 'Number analysis';

		return html`<article class="card" aria-label=${`Number ${d.number ?? ''}`}>
			<div class="hero">
				${d.number ? html`<div class="numeral">${d.number}</div>` : nothing}
				<div>
					<p class="label">Number analysis</p>
					<h2 class="title">${heading}</h2>
				</div>
			</div>
			<div class="badges">
				${d.type ? html`<span class="badge">${d.type}</span>` : nothing}
				${typeof d.digits === 'number' ? html`<span class="badge">${d.digits} digits</span>` : nothing}
				${typeof d.uniqueDigits === 'number' ? html`<span class="badge">${d.uniqueDigits} unique</span>` : nothing}
				${typeof d.digitRoot === 'number' ? html`<span class="badge">Digit root ${d.digitRoot}</span>` : nothing}
				${d.isPalindrome ? html`<span class="badge flag">Palindrome</span>` : nothing}
				${d.isRepeating ? html`<span class="badge flag">Repeating</span>` : nothing}
			</div>
			${
				known
					? html`<div class="section">
						<p class="label">Known angel number</p>
						${known.coreMessage ? html`<p>${known.coreMessage}</p>` : nothing}
						${
							known.keywords && known.keywords.length > 0
								? html`<div class="chips">${known.keywords.map((k) => html`<span>${k}</span>`)}</div>`
								: nothing
						}
						${this.renderMeaning(known.meaning, known.biblical, known.shadow)}
						${known.affirmation ? html`<p><em>${known.affirmation}</em></p>` : nothing}
					</div>`
					: nothing
			}
			${
				root
					? html`<div class="section">
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
		biblical?: string,
		shadow?: string,
	) {
		const sections = buildMeaningSections(meaning, biblical, shadow);
		if (sections.length === 0) return nothing;
		return html`${sections.map(
			(s, i) => html`<details name="lookup-meaning" ?open=${i === 0}>
				<summary>${s.label}</summary>
				<p>${s.body}</p>
			</details>`,
		)}`;
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
		}${this.renderMeaning(root.meaning)}${
			root.affirmation ? html`<p><em>${root.affirmation}</em></p>` : nothing
		}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-angel-number-lookup': RoxyAngelNumberLookup;
	}
}
