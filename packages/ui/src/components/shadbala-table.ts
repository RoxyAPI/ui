import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type { ShadbalaResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';
import { capitalize } from '../utils/string.js';

type Planet = ShadbalaResponse['planets'][number];

/** CSS variable and display name for each of the 6 bala components. */
const BALA_COMPONENTS: Array<{
	key: keyof Pick<
		Planet,
		| 'sthanaBala'
		| 'digBala'
		| 'kalaBala'
		| 'chestaBala'
		| 'naisargikaBala'
		| 'drikBala'
	>;
	label: string;
	color: string;
}> = [
	{ key: 'sthanaBala', label: 'Sthana', color: 'var(--roxy-info, #0284c7)' },
	{ key: 'digBala', label: 'Dig', color: 'var(--roxy-success, #16a34a)' },
	{ key: 'kalaBala', label: 'Kala', color: 'var(--roxy-warning, #ea580c)' },
	{ key: 'chestaBala', label: 'Chesta', color: 'var(--roxy-accent, #f59e0b)' },
	{
		key: 'naisargikaBala',
		label: 'Naisargika',
		color: 'var(--roxy-secondary, #475569)',
	},
	{ key: 'drikBala', label: 'Drik', color: 'var(--roxy-danger, #dc2626)' },
];

/**
 * Shadbala six-fold planetary strength table with stacked bar visualization.
 * Pass `data` from /vedic-astrology/shadbala.
 */
@customElement('roxy-shadbala-table')
export class RoxyShadbalaTable extends LitElement {
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

			.planet-row {
				display: grid;
				grid-template-columns: 8rem 1fr auto;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				padding: var(--roxy-space-sm, 0.5rem) 0;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
			}

			.planet-row:last-of-type {
				border-bottom: none;
			}

			.planet-label {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.glyph {
				font-size: 1.2em;
				line-height: 1;
			}

			.bar-wrap {
				display: flex;
				flex-direction: column;
				gap: 4px;
			}

			.bar {
				display: flex;
				height: 12px;
				border-radius: var(--roxy-radius-sm, 4px);
				overflow: hidden;
				background: var(--roxy-border, #e4e4e7);
			}

			.bar-segment {
				height: 100%;
				transition: flex-grow var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.pills {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: 4px;
			}

			.rupas-label {
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				white-space: nowrap;
			}

			.adequacy-badge {
				display: inline-block;
				padding: 1px 6px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.adequacy-badge--adequate {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}

			.adequacy-badge--weak {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}

			.rank-badge {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-sm, 0.5rem);
			}

			.legend-row {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}

			.legend-swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: var(--roxy-radius-sm, 4px);
				flex-shrink: 0;
			}

			@container (max-width: 480px) {
				.planet-row {
					grid-template-columns: 6rem 1fr;
					grid-template-rows: auto auto;
				}
				.pills {
					grid-column: 1 / -1;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
				}
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
	data: ShadbalaResponse | null = null;

	render() {
		if (!this.data?.planets?.length) {
			return html`<div class="roxy-empty" role="status">No shadbala data</div>`;
		}

		const sorted = [...this.data.planets].sort(
			(a, b) => a.relativeRank - b.relativeRank,
		);

		return html`<div class="wrap" aria-label="Shadbala planetary strength">
			<div class="head">
				<h2 class="title">Shadbala</h2>
				<p class="subtitle">${sorted.length} planets ranked by strength</p>
			</div>

			<div role="list" aria-label="Planet strength bars">
				${sorted.map((p) => this.renderPlanetRow(p))}
			</div>

			<div class="legend" aria-label="Strength component legend">
				${BALA_COMPONENTS.map(
					(b) => html`<div class="legend-row">
						<span
							class="legend-swatch"
							style="background: ${b.color}"
							aria-hidden="true"
						></span>
						${b.label}
					</div>`,
				)}
			</div>
		</div>`;
	}

	private renderPlanetRow(p: Planet) {
		const glyph = PLANET_GLYPH[capitalize(p.planet)] ?? '';

		// Compute positive component values (drikBala can be negative)
		const values = BALA_COMPONENTS.map((b) => Math.max(0, p[b.key] as number));
		const total = values.reduce((s, v) => s + v, 0);

		const isAdequate =
			typeof p.strengthRatio === 'number' && p.strengthRatio >= 1;
		const badgeClass = isAdequate
			? 'adequacy-badge--adequate'
			: 'adequacy-badge--weak';
		const badgeLabel = isAdequate ? 'adequate' : 'weak';

		const rupasStr =
			formatNumber(p.totalRupas, 2) && formatNumber(p.minRequired, 2)
				? `${formatNumber(p.totalRupas, 2)} / ${formatNumber(p.minRequired, 2)} R`
				: '';

		return html`<div class="planet-row" role="listitem" aria-label="${p.planet} shadbala">
			<div class="planet-label">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				${p.planet}
				<span class="rank-badge" aria-label="rank ${p.relativeRank}">#${p.relativeRank}</span>
			</div>
			<div class="bar-wrap">
				<div class="bar" role="img" aria-label="Strength components for ${p.planet}">
					${
						total > 0
							? BALA_COMPONENTS.map((b, i) => {
									const v = values[i];
									if (v <= 0) return nothing;
									const grow = (v / total) * 100;
									return html`<div
									class="bar-segment"
									style="flex-grow: ${grow}; background: ${b.color};"
									title="${b.label}: ${formatNumber(v, 1)}"
								></div>`;
								})
							: nothing
					}
				</div>
			</div>
			<div class="pills">
				${rupasStr ? html`<span class="rupas-label">${rupasStr}</span>` : nothing}
				<span class="${`adequacy-badge ${badgeClass}`}">${badgeLabel}</span>
			</div>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-shadbala-table': RoxyShadbalaTable;
	}
}
