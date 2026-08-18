import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { planetGlyph } from '../tokens/index.js';
import type { DivisionalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { distinctSanskrit } from '../utils/format.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';
import {
	type ChartStyle,
	type KundliViewModel,
	renderKundliCaptions,
	renderKundliStyleTablist,
	renderKundliSvg,
	toKundliViewModel,
} from '../utils/kundli-render.js';
import { kundliStyles } from '../utils/kundli-styles.js';
import { tablistStyles } from '../utils/tablist.js';

/**
 * Divisional chart renderer (D2-D60). Accepts a DivisionalChartResponse and
 * renders the same South / North / East kundli grid as the birth chart, plus
 * division metadata and Vargottama planet pills. A visible tablist lets the
 * end user switch styles at runtime. The varga response carries a graha-keyed
 * `chart.meta` map (no per-rashi buckets), so houses are bucketed from that
 * map.
 */
@customElement('roxy-divisional-chart')
export class RoxyDivisionalChart extends RoxyDataElement<DivisionalChartResponse> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		kundliStyles,
		tablistStyles,
		css`
			.division-meta {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
			}
			.significance {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				border-left: 2px solid var(--roxy-border, #e4e4e7);
				padding-left: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.vargottama-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				align-items: center;
			}
			.vargottama-label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				font-weight: 500;
				margin-right: var(--roxy-space-xs, 0.25rem);
			}
			.vargottama-pill {
				display: inline-flex;
				align-items: center;
				gap: 0.2em;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 600;
				padding: 0.15em 0.6em;
				border-radius: 999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 22%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
			}
		`,
	];

	@property({ type: String, reflect: true, attribute: 'chart-style' })
	chartStyle: ChartStyle = 'north';

	private setStyle = (next: ChartStyle) => {
		this.chartStyle = next;
	};

	private viewModel(): KundliViewModel | null {
		if (!this.data?.chart?.meta) return null;
		const { division } = this.data;
		const label = `D${division.number} ${division.name}`;
		return toKundliViewModel(this.data.chart.meta, { divisionLabel: label });
	}

	protected renderData(d: DivisionalChartResponse) {
		const vm = this.viewModel();
		if (!vm) return this.renderEmpty();

		const { division, vargottama } = d;

		return html`<div class="wrap" part="card">
			<div class="header" part="header">
				<div>
					<h2 class="title">
						D${division.number} ${division.name}
						${
							distinctSanskrit(division.name, division.sanskritName)
								? html`<span class="division-meta"> · ${division.sanskritName}</span>`
								: nothing
						}
					</h2>
					${
						division.significance
							? html`<p class="significance">${division.significance}</p>`
							: nothing
					}
					${renderFrameCaption(this.effectiveLang(), d.frame, this.translator)}
					${renderKundliCaptions(vm, this.translator)}
				</div>
				${renderKundliStyleTablist(this.chartStyle, this.setStyle, this.translator)}
			</div>

			<div
				id="kundli-panel-${this.chartStyle}"
				part="panel"
				role="tabpanel"
				tabindex="0"
				aria-labelledby="kundli-tab-${this.chartStyle}"
			>
				<svg
					viewBox="0 0 400 400"
					preserveAspectRatio="xMidYMid meet"
					part="chart"
					role="img"
					aria-label=${this.t('{{chart}} divisional chart with twelve sign houses', { chart: `D${division.number} ${division.name}` })}
				>
					<title>D${division.number} ${division.name}</title>
					${renderKundliSvg(vm, this.chartStyle, this.translator)}
				</svg>
			</div>

			${
				vargottama && vargottama.length > 0
					? html`<div class="vargottama-row" part="details" role="list" aria-label=${this.t('Vargottama planets')}>
						<span class="vargottama-label">${this.t('Vargottama')}:</span>
						${vargottama.map(
							(planet) =>
								html`<span class="vargottama-pill" role="listitem">
									${planetGlyph(planet) ?? ''} ${planet}
								</span>`,
						)}
					</div>`
					: nothing
			}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-divisional-chart': RoxyDivisionalChart;
	}
}
