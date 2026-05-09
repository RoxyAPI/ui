import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

interface DashaPeriod {
	mahadashaLord?: string;
	antardashaLord?: string;
	pratyantardashaLord?: string;
	lord?: string;
	planet?: string;
	startDate?: string;
	endDate?: string;
	years?: number;
	durationYears?: number;
}

interface DashaData {
	moonNakshatra?: string;
	nakshatraName?: string;
	nakshatraLord?: string;
	mahadasha?: DashaPeriod;
	antardasha?: DashaPeriod;
	pratyantardasha?: DashaPeriod;
	mahadashas?: DashaPeriod[];
	antardashas?: DashaPeriod[];
	mahadashaLord?: string;
	mahadashaPeriod?: DashaPeriod;
	birthDashaBalance?: { lord?: string; years?: number };
	totalYears?: number;
	remainingInMahadasha?: number;
	remainingInAntardasha?: number;
	remainingInPratyantardasha?: number;
}

/**
 * Dasha timeline. Renders /vedic-astrology/dasha/{current,major,sub/{...}}.
 * Default mode shows the active mahadasha + antardasha + pratyantardasha.
 * Switch to period="major" for the full 120-year Vimshottari timeline.
 */
@customElement('roxy-dasha-timeline')
export class RoxyDashaTimeline extends LitElement {
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
			.bar-track {
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar-track > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.dates {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				text-align: right;
			}
		`,
	];

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
			? Math.max(...periods.map((p) => p.durationYears ?? p.years ?? 1))
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
					d.nakshatraName || d.moonNakshatra
						? html`<div class="nakshatra">
							Moon nakshatra: ${d.nakshatraName ?? d.moonNakshatra}
							${d.nakshatraLord ? html`(lord ${d.nakshatraLord})` : nothing}
						</div>`
						: nothing
				}
			</header>

			${this.period === 'current' ? this.renderCurrent(d) : nothing}
			${
				periods.length > 0
					? html`<div class="timeline" role="list">
						${periods.map((p) => this.renderBar(p, maxYears))}
					</div>`
					: nothing
			}
		</div>`;
	}

	private renderCurrent(d: DashaData) {
		return html`<div class="current">
			${
				d.mahadasha
					? html`<div>
						<span>Mahadasha</span>
						<strong>${d.mahadasha.lord ?? d.mahadasha.mahadashaLord}</strong>
						${
							typeof d.remainingInMahadasha === 'number'
								? html`<small>${d.remainingInMahadasha.toFixed(1)} years left</small>`
								: nothing
						}
					</div>`
					: nothing
			}
			${
				d.antardasha
					? html`<div>
						<span>Antardasha</span>
						<strong>${d.antardasha.lord ?? d.antardasha.antardashaLord}</strong>
						${
							typeof d.remainingInAntardasha === 'number'
								? html`<small>${d.remainingInAntardasha.toFixed(1)} years left</small>`
								: nothing
						}
					</div>`
					: nothing
			}
			${
				d.pratyantardasha
					? html`<div>
						<span>Pratyantardasha</span>
						<strong
							>${
								d.pratyantardasha.lord ?? d.pratyantardasha.pratyantardashaLord
							}</strong
						>
						${
							typeof d.remainingInPratyantardasha === 'number'
								? html`<small
									>${d.remainingInPratyantardasha.toFixed(2)} years left</small
								>`
								: nothing
						}
					</div>`
					: nothing
			}
		</div>`;
	}

	private collectPeriods(d: DashaData): DashaPeriod[] {
		if (this.period === 'major' && d.mahadashas?.length) return d.mahadashas;
		if (this.period === 'sub' && d.antardashas?.length) return d.antardashas;
		return d.mahadashas ?? d.antardashas ?? [];
	}

	private renderBar(p: DashaPeriod, max: number) {
		const lord =
			p.lord ?? p.mahadashaLord ?? p.antardashaLord ?? p.planet ?? '';
		const years = p.durationYears ?? p.years ?? 0;
		const width = max > 0 ? (years / max) * 100 : 0;
		return html`<div class="bar" role="listitem">
			<span>${lord}</span>
			<span class="bar-track"><span style="width: ${width}%"></span></span>
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
