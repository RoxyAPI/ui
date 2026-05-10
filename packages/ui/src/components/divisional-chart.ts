import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, RASHI_KEYS } from '../tokens/index.js';
import type { DivisionalChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import type { HouseDef } from '../utils/kundli-render.js';
import {
	RASHI_TO_SIGN,
	renderNorthFrame,
	renderNorthHouseGroup,
	renderSouthFrame,
	renderSouthHouseGroup,
} from '../utils/kundli-render.js';

type RashiBucket = {
	rashi?: string;
	signs?: Array<{ graha: string; isRetrograde?: boolean }>;
};
type ChartByRashi = { [key: string]: RashiBucket | unknown };

/**
 * Divisional chart renderer (D2-D60). Accepts a DivisionalChartResponse and
 * renders the same south/north kundli wheel as the birth chart, plus division
 * metadata and Vargottama planet pills.
 */
@customElement('roxy-divisional-chart')
export class RoxyDivisionalChart extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.header {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
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
			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				margin: 0 auto;
			}
			.line {
				fill: transparent;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.sign-text {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 500;
				font-family: var(--roxy-font-sans);
			}
			.planet-text {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 11px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 400;
				font-family: var(--roxy-font-sans);
			}
			.lagna-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 8px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.05em;
			}
			.lagna-bg {
				fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
				stroke-width: 0.8;
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

	@property({ attribute: false })
	data: DivisionalChartResponse | null = null;

	@property({ type: String, reflect: true, attribute: 'chart-style' })
	chartStyle: 'south' | 'north' = 'south';

	private buildHouses(): HouseDef[] {
		if (!this.data) return [];
		const chart = this.data.chart as ChartByRashi;
		const meta =
			(this.data.chart as { meta?: Record<string, { rashi?: string }> }).meta ??
			{};
		const lagnaSign = meta.Lagna?.rashi ?? '';
		const houses: HouseDef[] = [];
		for (let i = 0; i < 12; i++) {
			const key = RASHI_KEYS[i];
			const bucket = chart[key] as RashiBucket | undefined;
			const planets = (bucket?.signs ?? []).map((p) => p.graha).filter(Boolean);
			const sign = RASHI_TO_SIGN[key] ?? '';
			houses.push({
				number: i + 1,
				sign,
				planets,
				isLagna: lagnaSign
					? lagnaSign.toLowerCase() === sign.toLowerCase()
					: false,
			});
		}
		return houses;
	}

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No divisional chart data</div>`;

		const { division, vargottama } = this.data;
		const houses = this.buildHouses();
		const isNorth = this.chartStyle === 'north';

		return html`<div class="wrap">
			<div class="header">
				<h2 class="title">
					D${division.number} ${division.name}
					${
						division.sanskritName && division.sanskritName !== division.name
							? html`<span class="division-meta"> · ${division.sanskritName}</span>`
							: nothing
					}
				</h2>
				${
					division.significance
						? html`<p class="significance">${division.significance}</p>`
						: nothing
				}
			</div>

			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="D${division.number} ${division.name} divisional chart with twelve sign houses"
			>
				<title>D${division.number} ${division.name}</title>
				${isNorth ? renderNorthFrame() : renderSouthFrame()}
				${
					isNorth
						? houses.map((h) => renderNorthHouseGroup(h))
						: houses.map((h) => renderSouthHouseGroup(h))
				}
			</svg>

			${
				vargottama && vargottama.length > 0
					? html`<div class="vargottama-row" role="list" aria-label="Vargottama planets">
						<span class="vargottama-label">Vargottama:</span>
						${vargottama.map(
							(planet) =>
								html`<span class="vargottama-pill" role="listitem">
									${PLANET_GLYPH[planet] ?? ''} ${planet}
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
