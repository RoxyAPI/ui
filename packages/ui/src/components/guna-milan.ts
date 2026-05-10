import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CompatibilityResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber, formatPercent } from '../utils/format.js';

const STANDARD_CATEGORIES = [
	'Varna',
	'Vasya',
	'Tara',
	'Yoni',
	'Maitri',
	'Gana',
	'Bhakoot',
	'Nadi',
];

/**
 * 36-point Ashtakoota score card. Renders /vedic-astrology/compatibility.
 */
@customElement('roxy-guna-milan')
export class RoxyGunaMilan extends LitElement {
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

			.score-header {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
			.score-info {
				flex: 1;
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
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
				line-height: 1;
			}
			.over {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-base, 1rem);
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
			td.score {
				text-align: right;
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			td.bar-cell {
				width: 30%;
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

	@property({ attribute: false })
	data: CompatibilityResponse | null = null;

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No Guna Milan data</div>`;

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
						${
							d.recommendation
								? html`<span class="recommendation">${d.recommendation}</span>`
								: nothing
						}
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
					? html`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${breakdown.map((b) => {
								const score = b.score ?? 0;
								const maxScore = b.maxScore ?? defaultMax(b.category);
								const pct = maxScore ? (score / maxScore) * 100 : 0;
								return html`<tr>
									<td>${b.category}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${pct}%"></span>
										</div>
									</td>
									<td class="score">${formatNumber(score, 1)} / ${maxScore}</td>
								</tr>`;
							})}
						</tbody>
					</table>`
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
	if (!name) return 1;
	switch (name.toLowerCase()) {
		case 'varna':
			return 1;
		case 'vasya':
			return 2;
		case 'tara':
			return 3;
		case 'yoni':
			return 4;
		case 'maitri':
			return 5;
		case 'gana':
			return 6;
		case 'bhakoot':
			return 7;
		case 'nadi':
			return 8;
		default:
			return 1;
	}
}

export const GUNA_CATEGORIES = STANDARD_CATEGORIES;

declare global {
	interface HTMLElementTagNameMap {
		'roxy-guna-milan': RoxyGunaMilan;
	}
}
