import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SIGN_GLYPH } from '../tokens/index.js';
import type {
	GetDailyHoroscopeResponse,
	GetMonthlyHoroscopeResponse,
	GetWeeklyHoroscopeResponse,
} from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { MarkupDataController } from '../utils/markup-data.js';
import { capitalize } from '../utils/string.js';

type HoroscopeData =
	| GetDailyHoroscopeResponse
	| GetWeeklyHoroscopeResponse
	| GetMonthlyHoroscopeResponse;

/**
 * Daily, weekly, or monthly horoscope card. Pass `data` from
 * /astrology/horoscope/{sign}/{daily|weekly|monthly}.
 */
@customElement('roxy-horoscope-card')
export class RoxyHoroscopeCard extends LitElement {
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

			.head {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}

			.glyph {
				font-size: 2.25rem;
				color: var(--roxy-accent-ink, #b45309);
				line-height: 1;
			}

			.title {
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				letter-spacing: var(--roxy-tracking-tight);
				text-transform: capitalize;
			}

			.date {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}

			.energy {
				margin-left: auto;
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.energy-bar {
				display: inline-block;
				width: 6rem;
				height: 6px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				margin-left: 6px;
				vertical-align: middle;
			}
			.energy-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.overview {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
			}

			.sections {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}

			.section h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.section p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.lucky {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}

			.lucky strong {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.compat-wrap {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: capitalize;
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
	data: HoroscopeData | null = null;

	@property({ type: String, reflect: true })
	period: 'daily' | 'weekly' | 'monthly' = 'daily';

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No horoscope data</div>`;

		const sign = d.sign ?? '';
		const glyph = sign ? (SIGN_GLYPH[capitalize(sign)] ?? '') : '';
		const energy =
			'energyRating' in d && typeof d.energyRating === 'number'
				? d.energyRating
				: null;
		const dateLabel =
			('date' in d && d.date) ||
			('week' in d && d.week) ||
			('month' in d && d.month) ||
			'';

		return html`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${sign}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				<div>
					<h2 class="title">${sign} ${this.period}</h2>
					${dateLabel ? html`<div class="date">${dateLabel}</div>` : nothing}
				</div>
				${
					energy !== null
						? html`<span class="energy" aria-label=${`Energy ${energy} of 10`}>
							Energy ${energy}/10
							<span class="energy-bar"
								><span style="width: ${(energy / 10) * 100}%"></span
							></span>
						</span>`
						: nothing
				}
			</header>

			${d.overview ? html`<p class="overview">${d.overview}</p>` : nothing}

			<div class="sections">
				${
					d.love
						? html`<div class="section">
							<h3>Love</h3>
							<p>${d.love}</p>
						</div>`
						: nothing
				}
				${
					d.career
						? html`<div class="section">
							<h3>Career</h3>
							<p>${d.career}</p>
						</div>`
						: nothing
				}
				${
					d.health
						? html`<div class="section">
							<h3>Health</h3>
							<p>${d.health}</p>
						</div>`
						: nothing
				}
				${
					d.finance
						? html`<div class="section">
							<h3>Finance</h3>
							<p>${d.finance}</p>
						</div>`
						: nothing
				}
				${
					'advice' in d && d.advice
						? html`<div class="section">
							<h3>Advice</h3>
							<p>${d.advice}</p>
						</div>`
						: nothing
				}
			</div>

			${(() => {
				const luckyNumber =
					'luckyNumber' in d && d.luckyNumber !== undefined
						? d.luckyNumber
						: undefined;
				const luckyColor =
					'luckyColor' in d && d.luckyColor ? d.luckyColor : '';
				const luckyNumbers =
					'luckyNumbers' in d && d.luckyNumbers ? d.luckyNumbers : [];
				const luckyDays = 'luckyDays' in d && d.luckyDays ? d.luckyDays : [];
				const compatibleSigns = d.compatibleSigns ?? [];
				if (
					luckyNumber === undefined &&
					!luckyColor &&
					luckyNumbers.length === 0 &&
					luckyDays.length === 0 &&
					compatibleSigns.length === 0
				)
					return nothing;
				return html`<div class="lucky">
						${
							luckyNumber !== undefined
								? html`<span>Lucky number <strong>${luckyNumber}</strong></span>`
								: nothing
						}
						${
							luckyColor
								? html`<span>Lucky color <strong>${luckyColor}</strong></span>`
								: nothing
						}
						${
							luckyNumbers.length
								? html`<span
									>Lucky numbers
									<strong>${luckyNumbers.join(', ')}</strong></span
								>`
								: nothing
						}
						${
							luckyDays.length
								? html`<span
									>Lucky days <strong>${luckyDays.join(', ')}</strong></span
								>`
								: nothing
						}
						${
							compatibleSigns.length
								? html`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${compatibleSigns.map(
											(s) => html`<span>${s}</span>`,
										)}</span
									>
								</span>`
								: nothing
						}
					</div>`;
			})()}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-horoscope-card': RoxyHoroscopeCard;
	}
}
