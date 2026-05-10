import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { TransitsResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatNumber, formatTime } from '../utils/format.js';
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

			.nature-harmonious {
				color: var(--roxy-success-fg, #166534);
			}

			.nature-challenging {
				color: var(--roxy-danger-fg, #991b1b);
			}

			.nature-neutral {
				color: var(--roxy-muted, #71717a);
			}

			.arrow-cell {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.interp {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
				max-width: 22rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			@container (max-width: 600px) {
				.interp {
					display: none;
				}
			}

			.overflow-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}
		`,
	];

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
							${this.renderAspectsTable(transitAspects)}
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

	private renderAspectsTable(
		aspects: NonNullable<TransitsResponse['transitAspects']>,
	) {
		return html`<table class="aspects-table">
			<thead>
				<tr>
					<th scope="col">Transit Planet</th>
					<th scope="col">Natal Planet</th>
					<th scope="col">Type</th>
					<th scope="col">Orb</th>
					<th scope="col">Status</th>
					<th scope="col">Strength</th>
					<th scope="col" class="interp">Interpretation</th>
				</tr>
			</thead>
			<tbody>
				${aspects.map((a) => {
					const tGlyph = PLANET_GLYPH[capitalize(a.transitPlanet)] ?? '';
					const nGlyph = PLANET_GLYPH[capitalize(a.natalPlanet)] ?? '';
					const natureClass = `nature-${(a.nature ?? '').toLowerCase()}`;
					const summary = a.interpretation?.summary ?? '';
					const truncated =
						summary.length > 120 ? `${summary.slice(0, 120)}...` : summary;
					return html`<tr>
						<td>
							<div class="arrow-cell">
								<span class="glyph" aria-hidden="true">${tGlyph}</span>
								${a.transitPlanet}
							</div>
						</td>
						<td>
							<div class="arrow-cell">
								<span class="glyph" aria-hidden="true">${nGlyph}</span>
								${a.natalPlanet}
							</div>
						</td>
						<td class=${natureClass}>${(a.type ?? '').toLowerCase()}</td>
						<td class="num">${formatNumber(a.orb, 2)}</td>
						<td>${a.isApplying ? 'Applying' : 'Separating'}</td>
						<td class="num">${formatNumber(a.strength, 1)}</td>
						<td class="interp" title=${summary}>${truncated}</td>
					</tr>`;
				})}
			</tbody>
		</table>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-transits-table': RoxyTransitsTable;
	}
}
