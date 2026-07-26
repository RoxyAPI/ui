import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SIGN_GLYPH } from '../tokens/index.js';
import type {
	GetDailyHoroscopeResponse,
	GetMonthlyHoroscopeResponse,
	GetWeeklyHoroscopeResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate } from '../utils/format.js';
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
export class RoxyHoroscopeCard extends RoxyDataElement<HoroscopeData> {
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

			/* The sky strip: the Moon placement and the live transits that produced
			 * this reading. It sits under the overview because it is the evidence
			 * for it, not decoration. */
			.sky {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
			}
			.moon-line {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.moon-line b {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.moon-line .lbl {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin-right: 0.35rem;
			}
			.transits {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
				gap: 0.25rem;
			}
			.transits li {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				padding-left: 0.9rem;
				position: relative;
			}
			.transits li::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0.5em;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background: var(--roxy-accent, #f59e0b);
			}

			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.weeks {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.week {
				display: grid;
				grid-template-columns: 3.5rem 1fr;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: baseline;
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-sm, 0.5rem);
			}
			.week:first-child {
				border-top: 0;
				padding-top: 0;
			}
			.week-no {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.week-focus {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.week-advice {
				margin: 0.15rem 0 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			/* One grid for the whole list so every event starts on the same column,
			 * however wide the longest date renders. The row wrapper keeps the
			 * dt/dd pairing in the markup and drops out of the layout. */
			.dates {
				margin: 0;
				display: grid;
				grid-template-columns: max-content 1fr;
				gap: 0.3rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.date-row {
				display: contents;
			}
			.date-row dt {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
				white-space: nowrap;
			}
			.date-row dd {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	@property({ type: String, reflect: true })
	period: 'daily' | 'weekly' | 'monthly' = 'daily';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No horoscope data</div>`;
	}

	protected renderData(d: HoroscopeData) {
		const sign = d.sign ?? '';
		const glyph = sign ? (SIGN_GLYPH[capitalize(sign)] ?? '') : '';
		const energy =
			'energyRating' in d && typeof d.energyRating === 'number'
				? d.energyRating
				: null;
		// `date` is an ISO day; `week` and `month` are already human ranges.
		const dateLabel =
			('date' in d && d.date && formatDate(d.date)) ||
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
			${this.renderSky(d)}

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

			${this.renderMonth(d)}

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

	/**
	 * The sky behind the reading (daily only): where the Moon is, what phase it is in, and the transits the forecast was derived from. A daily horoscope that hides its transits is a fortune cookie; showing them is what makes this one auditable.
	 */
	private renderSky(d: HoroscopeData) {
		const moonSign = 'moonSign' in d ? d.moonSign : '';
		const moonPhase = 'moonPhase' in d ? d.moonPhase : '';
		const transits = ('activeTransits' in d ? d.activeTransits : []) ?? [];
		if (!moonSign && !moonPhase && transits.length === 0) return nothing;
		const glyph = moonSign ? (SIGN_GLYPH[capitalize(moonSign)] ?? '') : '';
		return html`<div class="sky">
			${
				moonSign || moonPhase
					? html`<div class="moon-line">
						${
							moonSign
								? html`<span
									><span class="lbl">Moon</span>
									<span aria-hidden="true">${glyph}</span> <b>${moonSign}</b></span
								>`
								: nothing
						}
						${
							moonPhase
								? html`<span><span class="lbl">Phase</span> <b>${moonPhase}</b></span>`
								: nothing
						}
					</div>`
					: nothing
			}
			${
				transits.length
					? html`<ul class="transits" aria-label="Active transits">
						${transits.map((t) => html`<li>${t}</li>`)}
					</ul>`
					: nothing
			}
		</div>`;
	}

	/** Monthly arc: the week-by-week focus and the dated events (lunations, retrogrades, ingresses) the month turns on. */
	private renderMonth(d: HoroscopeData) {
		const weeks = ('weekByWeek' in d ? d.weekByWeek : []) ?? [];
		const keyDates = ('keyDates' in d ? d.keyDates : []) ?? [];
		if (weeks.length === 0 && keyDates.length === 0) return nothing;
		return html`${
			weeks.length
				? html`<section>
					<h3 class="block-title">Week by week</h3>
					<div class="weeks">
						${weeks.map(
							(w) => html`<div class="week">
								<span class="week-no">Week ${w.week}</span>
								<div>
									<div class="week-focus">${w.focus}</div>
									${w.advice ? html`<p class="week-advice">${w.advice}</p>` : nothing}
								</div>
							</div>`,
						)}
					</div>
				</section>`
				: nothing
		}
		${
			keyDates.length
				? html`<section>
					<h3 class="block-title">Key dates</h3>
					<dl class="dates">
						${keyDates.map(
							(k) => html`<div class="date-row">
								<dt>${formatDate(k.date) || k.date}</dt>
								<dd>${k.event}</dd>
							</div>`,
						)}
					</dl>
				</section>`
				: nothing
		}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-horoscope-card': RoxyHoroscopeCard;
	}
}
