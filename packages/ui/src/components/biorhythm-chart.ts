import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	GetCriticalDaysResponse,
	GetDailyBiorhythmResponse,
	GetForecastResponse,
} from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { MarkupDataController } from '../utils/markup-data.js';

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

/**
 * Biorhythm chart. Renders /biorhythm/{daily,forecast,critical-days}.
 */
@customElement('roxy-biorhythm-chart')
export class RoxyBiorhythmChart extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
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
			.energy {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-fg, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
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
			}
			.alert {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				height: auto;
			}
			.crit {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				border-radius: var(--roxy-radius-sm, 4px);
				padding: 4px 8px;
				font-size: var(--roxy-text-xs, 0.75rem);
				display: inline-block;
				margin: 2px;
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
	data: BiorhythmData | null = null;

	@property({ type: String, reflect: true })
	mode: 'daily' | 'forecast' | 'critical-days' = 'daily';

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No biorhythm data</div>`;

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
		return html`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${
					typeof d.energyRating === 'number'
						? html`<span class="energy">Energy ${d.energyRating}/10</span>`
						: nothing
				}
			</header>
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
		const cycleKeys = [
			'physical',
			'emotional',
			'intellectual',
			'intuitive',
		] as const;
		return html`<section class="wrap" aria-label="Biorhythm forecast">
			<header class="head">
				<h2 class="title">Forecast</h2>
				<span class="energy">${d.startDate} - ${d.endDate}</span>
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
				${cycleKeys.map((cycle) => {
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
			</svg>
			${
				d.summary?.periodAdvice
					? html`<p class="advice">${d.summary.periodAdvice}</p>`
					: nothing
			}
		</section>`;
	}

	private renderCritical(d: GetCriticalDaysResponse) {
		return html`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${d.totalCriticalDays} total</span>
			</header>
			<div>
				${d.criticalDays.map(
					(day) => html`<span class="crit"
						>${day.date} · ${day.cycle} ${day.severity}</span
					>`,
				)}
			</div>
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-biorhythm-chart': RoxyBiorhythmChart;
	}
}
