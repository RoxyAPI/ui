import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type { ShadbalaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';
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
export class RoxyShadbalaTable extends RoxyDataElement<ShadbalaResponse> {
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
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
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

			/* Ishta against Kashta: one bar, two segments, so the balance between a
			 * planet's benefic and malefic capacity is read at a glance rather than
			 * inferred from two numbers. */
			.phala {
				display: flex;
				height: 6px;
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				background: var(--roxy-border, #e4e4e7);
			}

			.phala-ishta {
				background: var(--roxy-success, #16a34a);
			}

			.phala-kashta {
				background: var(--roxy-danger, #dc2626);
			}

			.phala-label {
				display: flex;
				justify-content: space-between;
				gap: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}

			.footnote {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
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

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No shadbala data</div>`;
	}

	protected renderData(d: ShadbalaResponse) {
		if (!d.planets?.length) return this.renderEmpty();

		const sorted = [...d.planets].sort(
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
			<p class="footnote">
				Ishta Phala is the capacity to give benefic results, Kashta Phala the capacity to give
				malefic ones. Both are in virupas and are read together, since a planet can be strong
				and still deliver hardship.
			</p>
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
				${this.renderPhala(p)}
			</div>
			<div class="pills">
				${rupasStr ? html`<span class="rupas-label">${rupasStr}</span>` : nothing}
				<span class="${`adequacy-badge ${badgeClass}`}">${badgeLabel}</span>
			</div>
		</div>`;
	}

	/**
	 * Ishta and Kashta Phala, the fruit a planet is capable of giving in its dasha
	 * and transits. They are derived from Uchcha and Chesta Bala, not from the
	 * six-fold total, so a planet can rank first on strength and still carry a
	 * heavy Kashta share. Rendering only the total hides exactly that.
	 */
	private renderPhala(p: Planet) {
		const ishta = typeof p.ishtaPhala === 'number' ? p.ishtaPhala : 0;
		const kashta = typeof p.kashtaPhala === 'number' ? p.kashtaPhala : 0;
		if (ishta + kashta <= 0) return nothing;
		const ishtaStr = formatNumber(ishta, 1) || '0';
		const kashtaStr = formatNumber(kashta, 1) || '0';
		return html`<div
				class="phala"
				role="img"
				aria-label="Ishta Phala ${ishtaStr}, Kashta Phala ${kashtaStr} virupas"
			>
				<span class="phala-ishta" style="flex-grow: ${ishta}"></span>
				<span class="phala-kashta" style="flex-grow: ${kashta}"></span>
			</div>
			<div class="phala-label">
				<span>Ishta ${ishtaStr}</span>
				<span>Kashta ${kashtaStr}</span>
			</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-shadbala-table': RoxyShadbalaTable;
	}
}
