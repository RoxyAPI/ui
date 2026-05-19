import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { TransitsResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatNumber, formatTime } from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';
import { capitalize } from '../utils/string.js';

/**
 * Transit positions and aspect table. Pass `data` from /astrology/transits.
 * When natalChart is included in the request, `data.transitAspects` and
 * `data.summary` are present and rendered automatically.
 */
@customElement('roxy-transits-table')
export class RoxyTransitsTable extends LitElement {
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
				align-items: baseline;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}

			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}

			.summary-pills {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}

			.pill {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				padding: 2px var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				border: 1px solid currentColor;
			}

			.pill--muted {
				color: var(--roxy-fg, #0a0a0a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
			}

			.pill--success {
				color: var(--roxy-success-fg, #166534);
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 10%, transparent);
			}

			.pill--danger {
				color: var(--roxy-danger-fg, #991b1b);
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
			}

			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				text-align: left;
			}

			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}

			.section-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
			}

			.glyph {
				font-size: 1.1em;
				margin-right: 2px;
				line-height: 1;
			}

			.planet-cell {
				display: flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.retro-badge {
				display: inline-block;
				font-size: 0.7em;
				padding: 1px 4px;
				border-radius: var(--roxy-radius-sm, 4px);
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				color: var(--roxy-warning-fg, #9a3412);
				font-weight: var(--roxy-weight-bold, 600);
				margin-left: 2px;
				vertical-align: middle;
			}

			.speed {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				white-space: nowrap;
			}

			.speed-arrow {
				font-size: 0.85em;
			}

			td.num {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
			}

			.overflow-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}

			.aspect-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}
			.aspect-card summary {
				cursor: pointer;
				font-weight: 500;
				color: var(--roxy-fg, #0a0a0a);
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0.5em;
			}
			.aspect-card summary .meta {
				color: var(--roxy-muted, #71717a);
				font-weight: 400;
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: auto;
				font-variant-numeric: tabular-nums;
			}
			.aspect-card .interp-body {
				margin-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.45;
			}
			.aspect-card .interp-body p {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
			}
			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
				margin-top: 0.5rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.nature-badge {
				display: inline-block;
				padding: 1px 8px;
				border-radius: 9999px;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
			}
			.nature-badge.harmonious {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.nature-badge.challenging {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.nature-badge.neutral {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
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
	data: TransitsResponse | null = null;

	render() {
		if (!this.data?.transitPlanets?.length) {
			return html`<div class="roxy-empty" role="status">No transits data</div>`;
		}

		const {
			transitDate,
			transitTime,
			transitPlanets,
			transitAspects,
			summary,
		} = this.data;

		const dateStr = [formatDate(transitDate), formatTime(transitTime)]
			.filter(Boolean)
			.join(' ');

		return html`<div class="wrap" aria-label="Transit positions table">
			<div class="head">
				<h2 class="title">Transits</h2>
				${dateStr ? html`<p class="subtitle">${dateStr}</p>` : nothing}
			</div>

			${summary ? this.renderSummaryPills(summary) : nothing}

			<div>
				<p class="section-label">Planet positions</p>
				<div class="overflow-scroll">
					${this.renderPlanetsTable(transitPlanets)}
				</div>
			</div>

			${
				transitAspects?.length
					? html`<div>
						<p class="section-label">Transit aspects</p>
						<div class="overflow-scroll">
							${this.renderAspectsList(transitAspects)}
						</div>
					</div>`
					: nothing
			}
		</div>`;
	}

	private renderSummaryPills(
		summary: NonNullable<TransitsResponse['summary']>,
	) {
		return html`<div class="summary-pills" role="region" aria-label="Aspect summary">
			<span class="pill pill--muted">
				Total: ${summary.totalAspects}
			</span>
			<span class="pill pill--success">
				Harmonious: ${summary.harmonious}
			</span>
			<span class="pill pill--danger">
				Challenging: ${summary.challenging}
			</span>
			<span class="pill pill--muted">
				Neutral: ${summary.neutral}
			</span>
		</div>`;
	}

	private renderPlanetsTable(planets: TransitsResponse['transitPlanets']) {
		return html`<table class="planets-table">
			<thead>
				<tr>
					<th scope="col">Planet</th>
					<th scope="col">Sign</th>
					<th scope="col">Degree</th>
					<th scope="col">Speed</th>
				</tr>
			</thead>
			<tbody>
				${planets.map((p) => {
					const pGlyph = PLANET_GLYPH[capitalize(p.name)] ?? '';
					const sGlyph = SIGN_GLYPH[capitalize(p.sign)] ?? '';
					const speedArrow = p.speed >= 0 ? '↑' : '↓';
					return html`<tr>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${pGlyph}</span>
								${p.name}
								${
									p.isRetrograde
										? html`<span class="retro-badge" aria-label="retrograde">R</span>`
										: nothing
								}
							</div>
						</td>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${sGlyph}</span>
								${p.sign}
							</div>
						</td>
						<td class="num">${formatNumber(p.degree, 2)}</td>
						<td class="speed">
							<span class="speed-arrow" aria-hidden="true">${speedArrow}</span>
							${formatNumber(Math.abs(p.speed), 4)}
						</td>
					</tr>`;
				})}
			</tbody>
		</table>`;
	}

	private renderAspectsList(
		aspects: NonNullable<TransitsResponse['transitAspects']>,
	) {
		return html`<div role="list" aria-label="Transit aspects">
			${aspects.map((a, idx) => {
				const tGlyph = PLANET_GLYPH[capitalize(a.transitPlanet)] ?? '';
				const nGlyph = PLANET_GLYPH[capitalize(a.natalPlanet)] ?? '';
				const nature = (a.nature ?? 'neutral').toLowerCase();
				const interp = a.interpretation;
				const type = (a.type ?? '').toLowerCase();
				const status = a.isApplying ? 'Applying' : 'Separating';
				return html`<details class="aspect-card" role="listitem" name="transit-aspects" ?open=${idx === 0}>
					<summary>
						<span aria-hidden="true">${tGlyph}</span>
						${a.transitPlanet}
						<span class="nature-badge ${nature}">${type}</span>
						<span aria-hidden="true">${nGlyph}</span>
						${a.natalPlanet}
						<span class="meta">
							${status} · orb ${formatNumber(a.orb, 2)}° · strength ${formatNumber(a.strength, 1)}
						</span>
					</summary>
					<div class="interp-body">
						${interp?.summary ? html`<p>${interp.summary}</p>` : nothing}
						${interp?.impact ? html`<p><strong>Impact:</strong> ${interp.impact}</p>` : nothing}
						${interp?.timing ? html`<p><strong>Timing:</strong> ${interp.timing}</p>` : nothing}
						${interp?.guidance ? html`<p><strong>Guidance:</strong> ${interp.guidance}</p>` : nothing}
						${
							interp?.keywords?.length
								? html`<div class="interp-keywords">
										${interp.keywords.map((k) => html`<span class="kw">${k}</span>`)}
									</div>`
								: nothing
						}
					</div>
				</details>`;
			})}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-transits-table': RoxyTransitsTable;
	}
}
