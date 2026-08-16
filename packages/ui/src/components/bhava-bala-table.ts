import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { BhavaBalaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';
import { houseWords } from '../utils/house-themes.js';

type Bhava = BhavaBalaResponse['bhavas'][number];

/**
 * The three components that sum to the total, in the order the tradition states them. Each is a FIELD on the response, so this list names what to read and never holds a value.
 */
const COMPONENTS = [
	{
		key: 'bhavadhipatiBala',
		label: 'Bhavadhipati',
		color: 'var(--roxy-accent, #f59e0b)',
	},
	{ key: 'digBala', label: 'Dig', color: 'var(--roxy-info, #0284c7)' },
	{
		key: 'drishtiBala',
		label: 'Drishti',
		color: 'var(--roxy-success, #16a34a)',
	},
] as const;

/**
 * Bhava Bala: the strength of each of the twelve houses, ranked, with the three classical components that make up the total.
 *
 * @remarks
 * Read in RUPAS, not virupas, because rupas are the conventional unit a practitioner compares against and 60 virupas make one rupa. The virupa total is kept beside it since that is what the ranking is computed on.
 *
 * **The bar is proportional to the total across all twelve houses, never scaled to each row's own maximum.** Scaling per row would make the weakest bhava look as full as the strongest, which inverts the one thing this table exists to show. Same rule as the Shadbala bars.
 *
 * House meanings come from `houseThemes` on the response and are read through the shared `houseWords` helper, so this component holds no table of house significations of its own. The API has already chosen the vocabulary through `focus` and the language through `lang` by the time the response arrives.
 */
@customElement('roxy-bhava-bala-table')
export class RoxyBhavaBalaTable extends RoxyDataElement<BhavaBalaResponse> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.subtitle {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.rows {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.row {
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				gap: 2px;
			}
			.row-top {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.house {
				font-weight: var(--roxy-weight-bold, 600);
				min-width: 4.5rem;
			}
			.rashi {
				color: var(--roxy-secondary, #475569);
			}
			.lord {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.total {
				margin-left: auto;
				font-variant-numeric: tabular-nums;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.rank {
				font-size: var(--roxy-text-xs, 0.75rem);
				padding: 0.05rem 0.4rem;
				border-radius: var(--roxy-radius-sm, 4px);
				border: 1px solid var(--roxy-border, #e4e4e7);
				font-variant-numeric: tabular-nums;
			}
			.bar {
				display: flex;
				height: 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
			}
			.seg {
				height: 100%;
			}
			.themes {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.legend-row {
				display: flex;
				align-items: center;
				gap: 4px;
			}
			.swatch {
				width: 14px;
				height: 9px;
				border-radius: 2px;
			}
		`,
	];

	protected renderData(d: BhavaBalaResponse) {
		const bhavas = d.bhavas ?? [];
		if (!bhavas.length) return this.renderEmpty();

		// One scale for every row, taken from the strongest bhava, so the bars
		// compare against each other rather than each against itself.
		const peak = Math.max(...bhavas.map((b) => b.totalVirupas ?? 0), 1);

		return html`<div class="wrap" part="card" aria-label="Bhava bala">
			<header class="head" part="header">
				<h2 class="title">Bhava Bala</h2>
				<p class="subtitle">
					Twelve houses ranked by strength${
						d.houseSystem ? html` on the ${d.houseSystem} frame` : nothing
					}
				</p>
				${renderFrameCaption(this.effectiveLang(), d.frame)}
			</header>

			<div class="rows" part="table" role="list">
				${bhavas.map((b) => this.renderBhava(b, peak, d.houseThemes))}
			</div>

			<div class="legend" part="legend" aria-label="Component legend">
				${COMPONENTS.map(
					(c) => html`<div class="legend-row">
						<span class="swatch" style="background: ${c.color}" aria-hidden="true"></span>
						${c.label} Bala
					</div>`,
				)}
			</div>
		</div>`;
	}

	private renderBhava(
		b: Bhava,
		peak: number,
		themes: BhavaBalaResponse['houseThemes'],
	) {
		const words =
			typeof b.house === 'number' ? houseWords([b.house], themes) : '';

		return html`<article class="row" role="listitem">
			<div class="row-top">
				<span class="house">House ${b.house}</span>
				<span class="rashi">${b.rashi}</span>
				${b.lord ? html`<span class="lord">lord ${b.lord}</span>` : nothing}
				<span class="total">
					${formatNumber(this.effectiveLang(), b.totalRupas, 2)} rupas
					${
						typeof b.rank === 'number'
							? html`<span class="rank">#${b.rank}</span>`
							: nothing
					}
				</span>
			</div>
			<div
				class="bar"
				role="img"
				aria-label="Bhava bala ${formatNumber(this.effectiveLang(), b.totalVirupas, 1)} virupas"
			>
				${COMPONENTS.map((c) => {
					const v = Math.max(0, (b[c.key] as number | undefined) ?? 0);
					return v > 0
						? html`<span
								class="seg"
								style="width: ${(v / peak) * 100}%; background: ${c.color}"
								title="${c.label} ${formatNumber(this.effectiveLang(), v, 1)} virupas"
							></span>`
						: nothing;
				})}
			</div>
			${words ? html`<p class="themes">${words}</p>` : nothing}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-bhava-bala-table': RoxyBhavaBalaTable;
	}
}
