import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculateDrishtiResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import { formatDate, formatNumber, formatTime } from '../utils/format.js';

/**
 * Vedic graha drishti (planetary aspects) table. Renders /vedic-astrology/aspects: which planet casts an aspect on which, by special Vedic rules (every graha aspects the 7th; Mars the 4th and 8th, Jupiter the 5th and 9th, Saturn the 3rd and 10th). Mutual aspects (two planets aspecting each other) are surfaced first as they are the strongest sambandha. Each row shows the aspecting planet, the aspect kind, the aspected planet, its strength and orb.
 *
 * @remarks
 * `datetime` is the chart time, the wall clock of the request, NOT UTC: hold the date and time fixed and vary `timezone` and every longitude in the response moves, while `datetime` does not. It is labelled "Chart time" for that reason. The spec description calling it UTC is wrong and is tracked upstream. The sidereal positions the aspects were derived from are shown above the table so a reader can check the drishti against the actual placements.
 */
@customElement('roxy-vedic-aspects')
export class RoxyVedicAspects extends RoxyDataElement<CalculateDrishtiResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so a nowrap table wider than the card blows
				 * the column out and drags every sibling with it, clipped on the right. This
				 * is what lets the scroll container inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
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
			.section-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
			}
			.mutual {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.mutual-pill {
				display: inline-flex;
				align-items: center;
				gap: 0.35rem;
				padding: 2px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.mutual-pill .rel {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 400;
			}
			/* --roxy-fg on the tint, never --roxy-muted. Muted text on a tinted
			 * color-mix chip measures 4.24:1 and fails WCAG AA; the tint carries the
			 * accent and the text stays high-contrast. This is the standing contrast
			 * rule and it is relearned every time someone reaches for muted here. */
			.position {
				display: inline-flex;
				align-items: baseline;
				gap: 0.35rem;
				padding: 2px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}
			.position strong {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.overflow-scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
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
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}
			tbody tr:last-child td {
				border-bottom: none;
			}
			.kind {
				display: inline-block;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
			}
			.num {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
			}
			.bar {
				display: inline-block;
				height: 6px;
				border-radius: 3px;
				background: var(--roxy-accent, #f59e0b);
				vertical-align: middle;
				margin-right: 6px;
			}
		`,
	];

	protected renderData(d: CalculateDrishtiResponse) {
		const aspects = d.aspects ?? [];
		const mutual = d.mutualAspects ?? [];
		const planets = d.planets ?? [];
		if (aspects.length === 0 && mutual.length === 0) return this.renderEmpty();
		const when = d.datetime
			? `${formatDate(this.effectiveLang(), d.datetime)}, ${formatTime(this.effectiveLang(), d.datetime)}`
			: '';

		return html`<div class="wrap" part="card" aria-label="Vedic aspects">
			<div class="head" part="header">
				<h2 class="title">Vedic aspects</h2>
				${when ? html`<p class="subtitle">Chart time ${when}</p>` : nothing}
			</div>
			${
				planets.length > 0
					? html`<div part="section positions">
						<p class="section-label">Sidereal positions</p>
						<div class="mutual">
							${planets.map(
								(p) => html`<span class="position">
									<strong>${p.name}</strong>
									${typeof p.longitude === 'number' ? formatSignPosition(p.longitude) : (p.sign ?? '')}
								</span>`,
							)}
						</div>
					</div>`
					: nothing
			}
			${
				mutual.length > 0
					? html`<div part="section mutual-aspects">
						<p class="section-label">Mutual aspects</p>
						<div class="mutual">
							${mutual.map(
								(m) => html`<span class="mutual-pill">
									${m.planet1} ⟷ ${m.planet2}
									${m.aspectType ? html`<span class="rel">${m.aspectType}</span>` : nothing}
								</span>`,
							)}
						</div>
					</div>`
					: nothing
			}
			${
				aspects.length > 0
					? html`<div class="overflow-scroll" part="table">
						<table>
							<caption class="roxy-sr-only">
								Vedic planetary aspects: aspecting planet, aspect type, aspected planet,
								strength and orb.
							</caption>
							<thead>
								<tr>
									<th scope="col">From</th>
									<th scope="col">Aspect</th>
									<th scope="col">To</th>
									<th scope="col">Strength</th>
									<th scope="col">Orb</th>
								</tr>
							</thead>
							<tbody>
								${aspects.map(
									(a) => html`<tr>
										<td>${a.aspectingPlanet}</td>
										<td><span class="kind">${a.aspectType}</span></td>
										<td>${a.aspectedPlanet}</td>
										<td>
											${typeof a.strength === 'number' ? html`<span class="bar" style="width:${Math.max(4, Math.min(100, a.strength) * 0.4)}px"></span><span class="num">${formatNumber(this.effectiveLang(), a.strength, 0)}</span>` : nothing}
										</td>
										<td class="num">${typeof a.orb === 'number' ? `${formatNumber(this.effectiveLang(), a.orb, 2)}°` : ''}</td>
									</tr>`,
								)}
							</tbody>
						</table>
					</div>`
					: nothing
			}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-aspects': RoxyVedicAspects;
	}
}
