import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

interface NumerologyCommon {
	number?: number;
	calculation?: string;
	type?: 'single' | 'master' | string;
	hasKarmicDebt?: boolean;
	karmicDebtNumber?: number;
	karmicDebtMeaning?: string;
	meaning?: string;
}

interface CoreNumber {
	number?: number;
	type?: string;
	meaning?: string;
	calculation?: string;
}

interface FullChart {
	profile?: { fullName?: string; birthDate?: string };
	coreNumbers?: Record<string, CoreNumber | number>;
	additionalInsights?: Record<string, unknown>;
	birthDayProfile?: Record<string, unknown>;
	maturityStatus?: string;
	luckyAssociations?: Record<string, unknown>;
	summary?: string;
}

interface PersonalYear {
	year?: number;
	personalYear?: number;
	title?: string;
	theme?: string;
	keywords?: string[];
	meaning?: string;
	advice?: string;
}

type NumerologyData = NumerologyCommon & FullChart & PersonalYear;

/**
 * Numerology card. Renders /numerology/{life-path,expression,personal-year,chart}.
 * Use the `type` attribute to switch the layout.
 */
@customElement('roxy-numerology-card')
export class RoxyNumerologyCard extends LitElement {
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
				font-size: 4rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
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
			.meaning {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}

			.calc {
				margin: 0;
				font-family: var(--roxy-font-mono);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 30%, transparent);
				padding: var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-sm, 4px);
				word-break: break-all;
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

			.cores {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			.cores .item {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.cores .item span:first-child {
				color: var(--roxy-muted, #71717a);
				text-transform: capitalize;
			}
			.cores .item strong {
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.karmic {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	@property({ attribute: false })
	data: NumerologyData | null = null;

	@property({ type: String, reflect: true })
	type: 'life-path' | 'expression' | 'personal-year' | 'chart' = 'life-path';

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No numerology data</div>`;

		const headerLabel = LABELS[this.type] ?? this.type;
		const number = d.personalYear ?? d.number;
		const cores = d.coreNumbers
			? Object.entries(d.coreNumbers).filter(
					([, v]) => v !== null && v !== undefined,
				)
			: [];

		return html`<article
			class="card"
			aria-label=${headerLabel}
		>
			<div class="hero">
				${typeof number === 'number' ? html`<div class="numeral">${number}</div>` : nothing}
				<div>
					<p class="label">${headerLabel}</p>
					${
						d.title
							? html`<h2 class="title">${d.title}</h2>`
							: d.type
								? html`<h2 class="title">
									${d.type === 'master' ? 'Master number' : 'Single digit'}
								</h2>`
								: nothing
					}
				</div>
			</div>
			${d.theme ? html`<p><strong>Theme:</strong> ${d.theme}</p>` : nothing}
			${d.meaning ? html`<p class="meaning">${d.meaning}</p>` : nothing}
			${d.advice ? html`<p>${d.advice}</p>` : nothing}
			${d.calculation ? html`<pre class="calc">${d.calculation}</pre>` : nothing}
			${
				d.keywords?.length
					? html`<div class="chips">
						${d.keywords.map((k) => html`<span>${k}</span>`)}
					</div>`
					: nothing
			}
			${
				cores.length > 0
					? html`<div class="cores">
						${cores.map(([k, v]) => {
							const value =
								typeof v === 'number' ? v : (v as CoreNumber).number;
							return html`<div class="item">
								<span>${humanize(k)}</span>
								<strong>${value ?? ''}</strong>
							</div>`;
						})}
					</div>`
					: nothing
			}
			${
				d.hasKarmicDebt && d.karmicDebtNumber
					? html`<div class="karmic">
						Karmic debt ${d.karmicDebtNumber}.
						${d.karmicDebtMeaning ? d.karmicDebtMeaning : ''}
					</div>`
					: nothing
			}
		</article>`;
	}
}

const LABELS: Record<string, string> = {
	'life-path': 'Life Path',
	expression: 'Expression',
	'personal-year': 'Personal Year',
	chart: 'Numerology chart',
};

function humanize(s: string): string {
	return s
		.replace(/[_-]+/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^\w/, (c) => c.toUpperCase());
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-numerology-card': RoxyNumerologyCard;
	}
}
