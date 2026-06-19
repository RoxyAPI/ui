import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	CalculateBirthDayResponse,
	CalculateExpressionResponse,
	CalculateLifePathResponse,
	CalculateMaturityResponse,
	CalculatePersonalDayResponse,
	CalculatePersonalityResponse,
	CalculatePersonalMonthResponse,
	CalculatePersonalYearResponse,
	CalculateSoulUrgeResponse,
	GenerateNumerologyChartResponse,
	GetDailyNumberResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { humanize } from '../utils/string.js';

/**
 * Single-number numerology responses that share the number + meaning + calculation + karmic-debt shape. {@link RoxyNumerologyCard.renderNumberCard} renders any of them; the `type` attribute selects only the heading label.
 */
type NumberCardData =
	| CalculateLifePathResponse
	| CalculateExpressionResponse
	| CalculateSoulUrgeResponse
	| CalculatePersonalityResponse
	| CalculateBirthDayResponse
	| CalculateMaturityResponse;

type NumerologyData =
	| NumberCardData
	| CalculatePersonalYearResponse
	| CalculatePersonalDayResponse
	| CalculatePersonalMonthResponse
	| GetDailyNumberResponse
	| GenerateNumerologyChartResponse;

/**
 * Numerology card. Renders /numerology/{life-path,expression,soul-urge,personality,birth-day,maturity,personal-year,chart}.
 * Use the `type` attribute to switch the heading; the single-number types all share one layout.
 */
@customElement('roxy-numerology-card')
export class RoxyNumerologyCard extends RoxyDataElement<NumerologyData> {
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

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.numeral {
				font-size: 4rem;
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
				white-space: pre-wrap;
				overflow-wrap: anywhere;
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
				color: var(--roxy-accent-ink, #b45309);
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

	@property({ type: String, reflect: true })
	type:
		| 'life-path'
		| 'expression'
		| 'soul-urge'
		| 'personality'
		| 'birth-day'
		| 'maturity'
		| 'daily'
		| 'personal-day'
		| 'personal-month'
		| 'personal-year'
		| 'chart' = 'life-path';

	protected renderData(d: NumerologyData) {
		const headerLabel = LABELS[this.type] ?? this.type;
		if ('coreNumbers' in d) return this.renderChart(d, headerLabel);
		// Period reads share a number+theme+body shape but differ in field names;
		// check the most specific key first (a personal-day response also carries
		// personalMonth/personalYear), so the order is day -> month -> year.
		if ('personalDay' in d) {
			return this.renderPeriod(headerLabel, d.personalDay, d.theme, d.guidance);
		}
		if ('personalMonth' in d) {
			return this.renderPeriod(headerLabel, d.personalMonth, d.theme, d.focus);
		}
		if ('personalYear' in d) return this.renderPersonalYear(d, headerLabel);
		// Daily number: number + meaning, no calculation/karmic-debt; show the
		// meaning title as the heading and the daily message as the body.
		if ('dailyMessage' in d) {
			return this.renderPeriod(
				headerLabel,
				d.number,
				d.meaning?.title,
				d.dailyMessage,
			);
		}
		return this.renderNumberCard(d as NumberCardData, headerLabel);
	}

	/** Shared layout for a single period number (day/month): a hero numeral, theme heading, and guidance/focus body. */
	private renderPeriod(
		headerLabel: string,
		num: number | undefined,
		theme: string | undefined,
		body: string | undefined,
	) {
		return html`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof num === 'number' ? html`<div class="numeral">${num}</div>` : nothing}
				<div>
					<p class="label">${headerLabel}</p>
					${theme ? html`<h2 class="title">${theme}</h2>` : nothing}
				</div>
			</div>
			${body ? html`<p class="meaning">${body}</p>` : nothing}
		</article>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No numerology data</div>`;
	}

	private renderNumberCard(d: NumberCardData, headerLabel: string) {
		const keywords = d.meaning?.keywords ?? [];
		return html`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.number === 'number' ? html`<div class="numeral">${d.number}</div>` : nothing}
				<div>
					<p class="label">${headerLabel}</p>
					${d.meaning?.title ? html`<h2 class="title">${d.meaning.title}</h2>` : nothing}
				</div>
			</div>
			${d.meaning?.description ? html`<p class="meaning">${d.meaning.description}</p>` : nothing}
			${d.calculation ? html`<pre class="calc">${d.calculation}</pre>` : nothing}
			${
				keywords.length > 0
					? html`<div class="chips">
						${keywords.map((k) => html`<span>${k}</span>`)}
					</div>`
					: nothing
			}
			${
				d.hasKarmicDebt && d.karmicDebtNumber
					? html`<div class="karmic">
						Karmic debt ${d.karmicDebtNumber}.
						${karmicDebtText(d.karmicDebtMeaning)}
					</div>`
					: nothing
			}
		</article>`;
	}

	private renderPersonalYear(
		d: CalculatePersonalYearResponse,
		headerLabel: string,
	) {
		return html`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.personalYear === 'number' ? html`<div class="numeral">${d.personalYear}</div>` : nothing}
				<div>
					<p class="label">${headerLabel}</p>
					${d.theme ? html`<h2 class="title">${d.theme}</h2>` : nothing}
				</div>
			</div>
			${d.forecast ? html`<p class="meaning">${d.forecast}</p>` : nothing}
			${d.advice ? html`<p>${d.advice}</p>` : nothing}
		</article>`;
	}

	private renderChart(d: GenerateNumerologyChartResponse, headerLabel: string) {
		const cores = Object.entries(d.coreNumbers).filter(
			([, v]) => v !== null && v !== undefined,
		);
		return html`<article class="card" aria-label=${headerLabel}>
			<div>
				<p class="label">${headerLabel}</p>
				${d.profile?.name ? html`<h2 class="title">${d.profile.name}</h2>` : nothing}
			</div>
			${
				cores.length > 0
					? html`<div class="cores">
						${cores.map(
							([k, v]) => html`<div class="item">
								<span>${humanize(k)}</span>
								<strong>${v.number ?? ''}</strong>
							</div>`,
						)}
					</div>`
					: nothing
			}
		</article>`;
	}
}

const LABELS: Record<string, string> = {
	'life-path': 'Life Path',
	expression: 'Expression',
	'soul-urge': 'Soul Urge',
	personality: 'Personality',
	'birth-day': 'Birth Day',
	maturity: 'Maturity',
	daily: 'Daily Number',
	'personal-day': 'Personal Day',
	'personal-month': 'Personal Month',
	'personal-year': 'Personal Year',
	chart: 'Numerology chart',
};

type KarmicDebtMeaning = CalculateLifePathResponse['karmicDebtMeaning'];

function karmicDebtText(value: KarmicDebtMeaning | undefined): string {
	if (!value) return '';
	return [value.description, value.challenge, value.resolution]
		.filter(Boolean)
		.join(' ');
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-numerology-card': RoxyNumerologyCard;
	}
}
