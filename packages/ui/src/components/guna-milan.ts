import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CompatibilityResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber, formatPercent } from '../utils/format.js';

/**
 * The eight kootas and the points each carries, in the classical order the API
 * returns them. Used only as a fallback when a payload omits `maxScore`; the
 * spec marks it required. The names are the canonical ones (Vashya, Graha
 * Maitri), not the shortened forms.
 */
const KOOTA_MAX: Record<string, number> = {
	varna: 1,
	vashya: 2,
	tara: 3,
	yoni: 4,
	'graha maitri': 5,
	gana: 6,
	bhakoot: 7,
	nadi: 8,
};

/**
 * 36-point Ashtakoota score card. Renders /vedic-astrology/compatibility.
 *
 * @remarks
 * Each koota row carries what it actually evaluates and how each person
 * classifies under it (Varna: Shudra against Shudra, Yoni: Sheep against Horse),
 * because the point total alone tells a couple nothing about WHY a koota scored
 * as it did.
 */
@customElement('roxy-guna-milan')
export class RoxyGunaMilan extends RoxyDataElement<CompatibilityResponse> {
	static styles = [
		baseStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
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

			/* See local-space-compass: grid and flex items keep min-width: auto and
			 * widen their track rather than shrink, which pushed the whole score
			 * header past the card edge and clipped the Score column outright. */
			.card > * {
				min-width: 0;
			}
			.score-header {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
			.score-info {
				flex: 1;
				min-width: 0;
			}
			.table-scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
			}
			.score-bar {
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.total {
				font-size: 2.25rem;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
				font-variant-numeric: tabular-nums;
				line-height: 1;
			}
			.over {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-base, 1rem);
			}
			.verdict-wrap {
				display: grid;
				justify-items: end;
				gap: var(--roxy-space-xs, 0.25rem);
				text-align: right;
			}
			.verdict {
				padding: 1px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.verdict.yes {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.verdict.no {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.recommendation {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.score-ring {
				width: 120px;
				height: 120px;
				flex-shrink: 0;
			}
			.score-ring svg {
				width: 100%;
				height: 100%;
			}
			.score-ring .ring-text {
				font-size: 22px;
				font-weight: 700;
				fill: var(--roxy-fg, #0a0a0a);
				font-family: var(--roxy-font-sans);
			}
			.score-ring .ring-max {
				font-size: 10px;
				fill: var(--roxy-muted, #71717a);
				font-family: var(--roxy-font-sans);
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
			td small {
				display: block;
				margin-top: 2px;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: 1.5;
			}
			td.classification {
				color: var(--roxy-secondary, #475569);
				white-space: nowrap;
			}
			th.score {
				text-align: right;
			}
			td.score {
				text-align: right;
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			td.bar-cell {
				width: 22%;
			}
			/* The progress bar is the first thing to go on a narrow card: the score
			 * column already carries the number, and the two classification columns
			 * are the reason this table exists. */
			@container (max-width: 32rem) {
				.bar-col {
					display: none;
				}
			}

			/* Phone width. The ring is a fixed 120px and the verdict is right
			 * aligned against it, so on a ~300px card the total, the percentage and
			 * a two line recommendation were all competing for the ~115px left over
			 * and the summary read as a collision rather than a score. Stack: ring
			 * over its own line, everything else full width and left aligned. */
			@container (max-width: 26rem) {
				.score-header {
					flex-direction: column-reverse;
					align-items: stretch;
				}
				.score-ring {
					align-self: center;
				}
				/* Stacked, the ring sits directly above the same figure in larger
				 * type, so its inner label is the number printed twice in a row.
				 * role="meter" carries aria-valuenow, so dropping the text costs
				 * nothing to a screen reader and leaves a clean gauge. */
				.score-ring .ring-text,
				.score-ring .ring-max {
					display: none;
				}
				.score-bar {
					grid-template-columns: 1fr;
					gap: var(--roxy-space-xs, 0.25rem);
				}
				.verdict-wrap {
					justify-items: start;
					text-align: left;
				}
			}
			.mini-bar {
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.mini-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.tags {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.tags span {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.tags .dosha {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.tags .cancel {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 18%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No Guna Milan data</div>`;
	}

	protected renderData(d: CompatibilityResponse) {
		const breakdown = (d.breakdown ?? []).filter(
			(b) => b?.category !== undefined,
		);

		const score = d.total ?? 0;
		const max = d.maxScore ?? 36;
		const pct = (score / max) * 100;
		const trackColor =
			'color-mix(in srgb, var(--roxy-border) 50%, transparent)';
		const fillColor =
			pct >= 70
				? 'var(--roxy-success)'
				: pct >= 50
					? 'var(--roxy-warning)'
					: 'var(--roxy-danger)';
		// SVG circle with r=45: circumference = 2 * pi * 45 = 282.74
		// dasharray segments = pct * 2.827, (100 - pct) * 2.827
		const dashFill = pct * 2.827;
		const dashGap = (100 - pct) * 2.827;

		return html`<article class="card" aria-label="Guna Milan score">
			<div class="score-header">
				<div class="score-info">
					<div class="score-bar">
						<div>
							<span class="total">${formatNumber(d.total, 1)}</span>
							<span class="over"> / ${d.maxScore}</span>
							${
								typeof d.percentage === 'number'
									? html`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
										${formatPercent(d.percentage, 1)}
									</small>`
									: nothing
							}
						</div>
						<div class="verdict-wrap">
							${
								typeof d.isCompatible === 'boolean'
									? html`<span class="verdict ${d.isCompatible ? 'yes' : 'no'}">
										${d.isCompatible ? 'Compatible' : 'Not compatible'}
									</span>`
									: nothing
							}
							${
								d.recommendation
									? html`<span class="recommendation">${d.recommendation}</span>`
									: nothing
							}
						</div>
					</div>
				</div>
				<div class="score-ring" role="meter" aria-label="Guna milan score" aria-valuemin="0" aria-valuemax="36" aria-valuenow="${score}">
					<svg viewBox="0 0 100 100" aria-hidden="true">
						<circle class="ring-track" cx="50" cy="50" r="45" fill="none" stroke="${trackColor}" stroke-width="8"/>
						<circle class="ring-fill" cx="50" cy="50" r="45" fill="none" stroke="${fillColor}" stroke-width="8"
								stroke-dasharray="${dashFill},${dashGap}" stroke-linecap="round"
								transform="rotate(-90 50 50)"/>
						<text x="50" y="50" text-anchor="middle" dominant-baseline="central" class="ring-text">${score}</text>
						<text x="50" y="64" text-anchor="middle" dominant-baseline="central" class="ring-max">/${max}</text>
					</svg>
				</div>
			</div>

			${
				breakdown.length > 0
					? html`<div class="table-scroll"><table>
						<caption class="roxy-sr-only">
							Guna Milan breakdown: each koota with the classification of person 1 and
							person 2, and the score it earned out of its maximum.
						</caption>
						<thead>
							<tr>
								<th scope="col">Koota</th>
								<th scope="col">Person 1</th>
								<th scope="col">Person 2</th>
								<th scope="col" class="bar-col">Progress</th>
								<th scope="col" class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${breakdown.map((b) => {
								const score = b.score ?? 0;
								const maxScore = b.maxScore ?? defaultMax(b.category);
								const pct = maxScore ? (score / maxScore) * 100 : 0;
								return html`<tr>
									<td>
										${b.category}
										${b.description ? html`<small>${b.description}</small>` : nothing}
									</td>
									<td class="classification">${b.person1 ?? ''}</td>
									<td class="classification">${b.person2 ?? ''}</td>
									<td class="bar-cell bar-col">
										<div class="mini-bar">
											<span style="width: ${pct}%"></span>
										</div>
									</td>
									<td class="score">${formatNumber(score, 1)} / ${maxScore}</td>
								</tr>`;
							})}
						</tbody>
					</table></div>`
					: nothing
			}
			${
				(d.doshas?.length ?? 0) > 0 || (d.doshaCancellations?.length ?? 0) > 0
					? html`<div class="tags">
						${d.doshas?.map((x) => html`<span class="dosha">${x}</span>`)}
						${d.doshaCancellations?.map(
							(x) =>
								html`<span class="cancel" title=${x.reason}>${x.dosha} cancelled</span>`,
						)}
					</div>`
					: nothing
			}
		</article>`;
	}
}

function defaultMax(name?: string): number {
	return (name && KOOTA_MAX[name.toLowerCase()]) || 1;
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-guna-milan': RoxyGunaMilan;
	}
}
