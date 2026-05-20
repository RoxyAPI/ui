import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	GetCurrentDashaResponse,
	GetMajorDashasResponse,
	GetSubDashasResponse,
} from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import { formatNumber } from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';

type DashaData =
	| GetCurrentDashaResponse
	| GetMajorDashasResponse
	| GetSubDashasResponse;

type DashaPeriod = GetMajorDashasResponse['mahadashas'][number];

/**
 * Dasha timeline. Renders /vedic-astrology/dasha/{current,major,sub/{...}}.
 * Default mode shows the active mahadasha + antardasha + pratyantardasha.
 * Switch to period="major" for the full 120-year Vimshottari timeline.
 */
@customElement('roxy-dasha-timeline')
export class RoxyDashaTimeline extends LitElement {
	static styles = [
		baseStyles,
		disclosureStyles,
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
			.nakshatra {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.current {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.current div span:first-child {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.current div strong {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.balance {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				border-left: 2px solid var(--roxy-border, #e4e4e7);
				padding-left: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.timeline {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.bar {
				display: grid;
				grid-template-columns: 5rem 1fr 8rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bar.now strong {
				color: var(--roxy-accent-fg, #b45309);
			}
			.now-badge {
				display: inline-block;
				margin-left: 0.4em;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.bar-track {
				position: relative;
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar-fill {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				opacity: 0.45;
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.bar-now .bar-fill {
				opacity: 1;
			}
			.bar-progress {
				position: absolute;
				top: -2px;
				bottom: -2px;
				width: 2px;
				background: var(--roxy-accent-fg, #b45309);
				border-radius: 2px;
				box-shadow: 0 0 0 2px
					color-mix(in srgb, var(--roxy-accent, #f59e0b) 35%, transparent);
			}
			.dates {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				text-align: right;
			}
			details.interp {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
			}
			details.interp summary {
				cursor: pointer;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--roxy-space-md, 1rem);
			}
			details.interp p {
				margin: var(--roxy-space-sm, 0.5rem) 0 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
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
	data: DashaData | null = null;

	@property({ type: String, reflect: true })
	period: 'current' | 'major' | 'sub' = 'current';

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No dasha data</div>`;

		const periods = this.collectPeriods(d);
		const maxYears = periods.length
			? Math.max(...periods.map((p) => p.durationYears))
			: 0;

		return html`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${
						this.period === 'major'
							? 'Vimshottari Mahadasha'
							: this.period === 'sub'
								? 'Antardasha'
								: 'Active dashas'
					}
				</h2>
				${
					'nakshatraName' in d && d.nakshatraName
						? html`<div class="nakshatra">
						Moon nakshatra: ${d.nakshatraName}
						${'nakshatraLord' in d && d.nakshatraLord ? html`(lord ${d.nakshatraLord})` : nothing}
					</div>`
						: nothing
				}
			</header>

			${this.renderBirthBalance(d)}
			${this.period === 'current' ? this.renderCurrent(d) : nothing}
			${
				periods.length > 0
					? html`<div class="timeline" role="list">
						${periods.map((p) => this.renderBar(p, maxYears))}
					</div>`
					: nothing
			}
			${this.renderActiveInterpretation(periods)}
		</div>`;
	}

	private renderBirthBalance(d: DashaData) {
		if (!('birthDashaBalance' in d) || !d.birthDashaBalance) return nothing;
		const b = d.birthDashaBalance;
		const lord = 'nakshatraLord' in d && d.nakshatraLord ? d.nakshatraLord : '';
		const yrs = b.years ?? 0;
		const mo = b.months ?? 0;
		const da = b.days ?? 0;
		const parts: string[] = [];
		if (yrs) parts.push(`${yrs}y`);
		if (mo) parts.push(`${mo}m`);
		if (da) parts.push(`${da}d`);
		const remaining = parts.length ? parts.join(' ') : '0d';
		return html`<p class="balance">
			Birth dasha balance: ${remaining} of
			${lord ? html`<strong>${lord}</strong>` : 'the opening mahadasha'} remained at birth.
		</p>`;
	}

	private renderActiveInterpretation(periods: DashaPeriod[]) {
		const active = periods.find((p) => this.isCurrent(p));
		if (!active?.interpretation) return nothing;
		return html`<details class="interp">
			<summary>
				<span>${active.planet} mahadasha interpretation</span>
				${chevron()}
			</summary>
			<p>${active.interpretation}</p>
		</details>`;
	}

	private renderCurrent(d: DashaData) {
		if (!('mahadasha' in d)) return nothing;
		return html`<div class="current">
			${
				'mahadasha' in d && d.mahadasha
					? html`<div>
					<span>Mahadasha</span>
					<strong>${d.mahadasha.planet}</strong>
					${
						'remainingInMahadasha' in d && d.remainingInMahadasha
							? html`<small>${formatNumber(d.remainingInMahadasha.years + d.remainingInMahadasha.months / 12, 1)} years left</small>`
							: nothing
					}
				</div>`
					: nothing
			}
			${
				'antardasha' in d && d.antardasha
					? html`<div>
					<span>Antardasha</span>
					<strong>${d.antardasha.planet}</strong>
					${
						'remainingInAntardasha' in d && d.remainingInAntardasha
							? html`<small>${formatNumber(d.remainingInAntardasha.years + d.remainingInAntardasha.months / 12, 1)} years left</small>`
							: nothing
					}
				</div>`
					: nothing
			}
			${
				'pratyantardasha' in d && d.pratyantardasha
					? html`<div>
					<span>Pratyantardasha</span>
					<strong>${d.pratyantardasha.planet}</strong>
					${
						'remainingInPratyantardasha' in d && d.remainingInPratyantardasha
							? html`<small>${formatNumber(d.remainingInPratyantardasha.years + d.remainingInPratyantardasha.months / 12, 1)} years left</small>`
							: nothing
					}
				</div>`
					: nothing
			}
		</div>`;
	}

	private collectPeriods(d: DashaData): DashaPeriod[] {
		if ('mahadashas' in d && d.mahadashas?.length) return d.mahadashas;
		if ('antardashas' in d && d.antardashas?.length) return d.antardashas;
		return [];
	}

	/** True when the current wall-clock time falls between the period's start and end. */
	private isCurrent(p: DashaPeriod): boolean {
		if (!p.startDate || !p.endDate) return false;
		const now = Date.now();
		const start = Date.parse(p.startDate);
		const end = Date.parse(p.endDate);
		if (Number.isNaN(start) || Number.isNaN(end)) return false;
		return now >= start && now < end;
	}

	/**
	 * Fractional progress (0..1) through a period at the current time. Used to
	 * draw a vertical "now" marker inside the active bar. Returns -1 outside the
	 * period so the caller can skip the marker.
	 */
	private progressIn(p: DashaPeriod): number {
		if (!p.startDate || !p.endDate) return -1;
		const start = Date.parse(p.startDate);
		const end = Date.parse(p.endDate);
		const now = Date.now();
		if (
			Number.isNaN(start) ||
			Number.isNaN(end) ||
			now < start ||
			now >= end ||
			end <= start
		) {
			return -1;
		}
		return (now - start) / (end - start);
	}

	private renderBar(p: DashaPeriod, max: number) {
		const years = p.durationYears;
		const width = max > 0 ? (years / max) * 100 : 0;
		const current = this.isCurrent(p);
		const progress = current ? this.progressIn(p) : -1;
		const trackClass = current ? 'bar-track bar-now' : 'bar-track';
		return html`<div
			class=${current ? 'bar now' : 'bar'}
			role="listitem"
			aria-current=${current ? 'time' : 'false'}
		>
			<span>
				<strong>${p.planet}</strong>${current ? html`<span class="now-badge">Now</span>` : nothing}
			</span>
			<span class=${trackClass}>
				<span class="bar-fill" style="width: ${width}%"></span>
				${
					progress >= 0
						? html`<span
							class="bar-progress"
							style="left: ${progress * width}%"
							aria-hidden="true"
						></span>`
						: nothing
				}
			</span>
			<span class="dates">
				${p.startDate ? formatYear(p.startDate) : ''}
				${p.endDate ? html`- ${formatYear(p.endDate)}` : ''}
			</span>
		</div>`;
	}
}

function formatYear(s: string): string {
	const m = s.match(/^(\d{4})/);
	return m ? m[1] : s;
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-dasha-timeline': RoxyDashaTimeline;
	}
}
