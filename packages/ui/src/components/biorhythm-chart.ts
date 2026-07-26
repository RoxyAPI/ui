import { css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	GetCriticalDaysResponse,
	GetDailyBiorhythmResponse,
	GetForecastResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import { formatDate, formatDateRange } from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderInterpAccordion,
} from '../utils/interp-accordion.js';
import { humanize } from '../utils/string.js';

type BiorhythmData =
	| GetDailyBiorhythmResponse
	| GetForecastResponse
	| GetCriticalDaysResponse;

const CYCLE_COLOR: Record<string, string> = {
	physical: '#dc2626',
	emotional: '#0284c7',
	intellectual: '#16a34a',
	intuitive: '#a855f7',
	aesthetic: '#f59e0b',
	awareness: '#ec4899',
	spiritual: '#14b8a6',
	passion: '#ef4444',
	mastery: '#6366f1',
	wisdom: '#475569',
};

/** The cycles a forecast day carries, in the order they are plotted and keyed in the legend. */
const FORECAST_CYCLES = [
	'physical',
	'emotional',
	'intellectual',
	'intuitive',
] as const;

/**
 * Biorhythm chart. Renders /biorhythm/{daily,forecast,critical-days}.
 */
@customElement('roxy-biorhythm-chart')
export class RoxyBiorhythmChart extends RoxyDataElement<BiorhythmData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.wrap {
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
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.head-meta {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.energy {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			/* The tint carries the phase; the label stays --roxy-fg, since muted or
			 * accent ink on a tinted chip misses WCAG AA. */
			.phase {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				border-radius: var(--roxy-radius-full, 9999px);
				padding: 2px 10px;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.spotlight {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-left: 3px solid var(--roxy-accent, #f59e0b);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 22%, transparent);
				border-radius: 0 var(--roxy-radius-sm, 4px) var(--roxy-radius-sm, 4px) 0;
			}
			.spotlight .label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.spotlight .lead {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.spotlight strong {
				text-transform: capitalize;
			}
			.spotlight p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.6;
			}

			.bars {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.bar {
				display: grid;
				grid-template-columns: 8rem 1fr 3.5rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.track {
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				position: relative;
			}
			.fill {
				display: block;
				height: 100%;
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.value {
				font-variant-numeric: tabular-nums;
				text-align: right;
				color: var(--roxy-muted, #71717a);
			}
			.advice {
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				max-width: var(--roxy-chart-max-width, 600px);
				height: auto;
			}

			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.key {
				display: inline-flex;
				align-items: center;
				gap: 0.35rem;
				text-transform: capitalize;
			}
			.dot {
				width: 0.6rem;
				height: 0.6rem;
				border-radius: var(--roxy-radius-full, 9999px);
			}
			.dot.critical {
				background: var(--roxy-danger, #dc2626);
			}

			.stats {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.stat {
				display: grid;
				gap: 2px;
			}
			.stat dt {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.stat dd {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				font-variant-numeric: tabular-nums;
			}

			.crit-note {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
				border-radius: var(--roxy-radius-sm, 4px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
			}
			.crit-meta {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
		`,
	];

	@property({ type: String, reflect: true })
	mode: 'daily' | 'forecast' | 'critical-days' = 'daily';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No biorhythm data</div>`;
	}

	protected renderData(d: BiorhythmData) {
		if (this.mode === 'critical-days' && 'criticalDays' in d) {
			return this.renderCritical(d as GetCriticalDaysResponse);
		}
		if (this.mode === 'forecast' && 'days' in d) {
			return this.renderForecast(d as GetForecastResponse);
		}
		return this.renderDaily(d as GetDailyBiorhythmResponse);
	}

	private renderDaily(d: GetDailyBiorhythmResponse) {
		const raw = d.quickRead ?? {};
		const entries = Object.entries(raw).map(([cycle, value]) => {
			const v = typeof value === 'number' ? value : 0;
			const normalized = Math.abs(v) > 1 ? v / 100 : v;
			return [cycle, normalized] as const;
		});
		const spot = d.spotlight;

		return html`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				<div class="head-meta">
					${d.overallPhase ? html`<span class="phase">${humanize(d.overallPhase)}</span>` : nothing}
					${
						typeof d.energyRating === 'number'
							? html`<span class="energy">Energy ${d.energyRating}/10</span>`
							: nothing
					}
				</div>
			</header>
			${
				spot
					? html`<div
						class="spotlight"
						style=${`border-left-color: ${CYCLE_COLOR[spot.cycle] ?? 'var(--roxy-accent, #f59e0b)'}`}
					>
						<p class="label">Spotlight cycle</p>
						<div class="lead">
							<strong>${spot.cycle}</strong>
							${typeof spot.value === 'number' ? html`<span class="energy">${spot.value}%</span>` : nothing}
							${spot.phase ? html`<span class="phase">${humanize(spot.phase)}</span>` : nothing}
						</div>
						${spot.message ? html`<p>${spot.message}</p>` : nothing}
					</div>`
					: nothing
			}
			<div class="bars" role="list">
				${entries.map(([cycle, v]) => {
					const pct = ((v + 1) / 2) * 100; // -1..1 -> 0..100
					const color = CYCLE_COLOR[cycle] ?? 'var(--roxy-accent, #f59e0b)';
					return html`<div class="bar" role="listitem">
						<span style="text-transform: capitalize">${cycle}</span>
						<span class="track">
							<span
								class="fill"
								style="width: ${pct}%; background: ${color}"
							></span>
						</span>
						<span class="value">${Math.round(v * 100)}%</span>
					</div>`;
				})}
			</div>
			${d.dailyMessage ? html`<p class="advice">${d.dailyMessage}</p>` : nothing}
			${d.advice ? html`<p class="advice">${d.advice}</p>` : nothing}
		</section>`;
	}

	private renderForecast(d: GetForecastResponse) {
		const days = d.days ?? [];
		if (days.length === 0)
			return html`<div class="roxy-empty" role="status">No forecast</div>`;
		const w = 600;
		const h = 160;
		const xStep = w / Math.max(days.length - 1, 1);
		const s = d.summary;

		return html`<section class="wrap" aria-label="Biorhythm forecast">
			<header class="head">
				<h2 class="title">Forecast</h2>
				<span class="energy">${formatDateRange(d.startDate, d.endDate)}</span>
			</header>
			<svg
				viewBox="0 0 ${w} ${h}"
				role="img"
				aria-label="Biorhythm cycle lines across the forecast window"
			>
				<title>Biorhythm forecast</title>
				<line
					x1="0"
					y1=${h / 2}
					x2=${w}
					y2=${h / 2}
					stroke="var(--roxy-border, #e4e4e7)"
					stroke-width="1"
				/>
				${FORECAST_CYCLES.map((cycle) => {
					const points = days
						.map((day, i) => {
							const v = day[cycle] ?? 0;
							const x = i * xStep;
							const y = h / 2 - (v / 100) * (h / 2 - 8);
							return `${x.toFixed(2)},${y.toFixed(2)}`;
						})
						.join(' ');
					const color = CYCLE_COLOR[cycle] ?? '#475569';
					return svg`<polyline points=${points} fill="none" stroke=${color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`;
				})}
				${days.map((day, i) =>
					// A critical day is a zero crossing, so it sits on the midline by
					// definition: mark it there rather than hiding it in the curves.
					day.isCritical
						? svg`<circle cx=${(i * xStep).toFixed(2)} cy=${h / 2} r="3" fill="var(--roxy-danger, #dc2626)"><title>${[
								formatDate(day.date),
								day.criticalCycles?.length
									? `${day.criticalCycles.join(', ')} critical`
									: 'critical',
								typeof day.energyRating === 'number'
									? `energy ${day.energyRating}/10`
									: '',
							]
								.filter(Boolean)
								.join(' · ')}</title></circle>`
						: nothing,
				)}
			</svg>
			<div class="legend">
				${FORECAST_CYCLES.map(
					(cycle) => html`<span class="key">
						<span class="dot" style=${`background: ${CYCLE_COLOR[cycle]}`}></span>${cycle}
					</span>`,
				)}
				<span class="key"><span class="dot critical"></span>critical day</span>
			</div>
			${
				s
					? html`<dl class="stats">
						${this.stat('Best day', formatDate(s.bestDay))}
						${this.stat('Worst day', formatDate(s.worstDay))}
						${this.stat(
							'Average energy',
							typeof s.averageEnergy === 'number'
								? `${s.averageEnergy}/10`
								: '',
						)}
						${this.stat(
							'Critical days',
							typeof s.criticalDayCount === 'number'
								? `${s.criticalDayCount}`
								: '',
						)}
					</dl>`
					: nothing
			}
			${s?.periodAdvice ? html`<p class="advice">${s.periodAdvice}</p>` : nothing}
		</section>`;
	}

	private renderCritical(d: GetCriticalDaysResponse) {
		const days = d.criticalDays ?? [];
		const doubles = d.doubleCriticalDays ?? [];
		const sections: InterpSection[] = days.map((day) => ({
			label: formatDate(day.date) || day.date,
			aside: [day.cycle, day.severity].filter(Boolean).join(' · '),
			body: day.advisory ?? '',
			extra: html`<p class="crit-meta">
				${[
					day.direction ? `${day.direction} through zero` : '',
					typeof day.period === 'number' ? `${day.period} day cycle` : '',
				]
					.filter(Boolean)
					.join(' · ')}
			</p>`,
		}));

		return html`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${formatDateRange(d.startDate, d.endDate)}</span>
			</header>
			<dl class="stats">
				${this.stat('Events', typeof d.totalCriticalDays === 'number' ? `${d.totalCriticalDays}` : '')}
				${this.stat('Double days', doubles.length ? `${doubles.length}` : '0')}
				${this.stat(
					'Triple day',
					d.tripleCriticalDay
						? formatDate(d.tripleCriticalDay)
						: 'None in range',
				)}
			</dl>
			${
				doubles.length > 0
					? html`<p class="crit-note">
						Two or more cycles cross zero on ${doubles.map((x) => formatDate(x) || x).join(', ')}. Take extra care on these dates.
					</p>`
					: nothing
			}
			${renderInterpAccordion(sections, 'biorhythm-critical', 'Advisories')}
		</section>`;
	}

	private stat(label: string, value: string) {
		if (!value) return nothing;
		return html`<div class="stat"><dt>${label}</dt><dd>${value}</dd></div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-biorhythm-chart': RoxyBiorhythmChart;
	}
}
