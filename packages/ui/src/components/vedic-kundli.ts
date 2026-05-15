import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BirthChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	buildHousesFromMeta,
	type HouseDef,
	renderEastFrame,
	renderEastHouseGroup,
	renderNorthFrame,
	renderNorthHouseGroup,
	renderSouthFrame,
	renderSouthHouseGroup,
} from '../utils/kundli-render.js';

/**
 * Vedic kundli (D1 Rashi chart). Pass `data` from /vedic-astrology/birth-chart.
 * Three render styles via the `chart-style` attribute: south (default),
 * north, and east. All three draw the identical planet-in-sign data, so the
 * style is purely a layout choice. Each planet shows its abbreviation and
 * whole-degree, with an SVG tooltip carrying exact position, nakshatra, pada,
 * and avastha.
 *
 * Theming flows through CSS custom properties on :host, so the chart adopts
 * the host page palette without runtime color probing.
 */
@customElement('roxy-vedic-kundli')
export class RoxyVedicKundli extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
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
				font-size: 10px;
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
		`,
	];

	@property({ attribute: false })
	data: BirthChartResponse | null = null;

	@property({ type: String, reflect: true, attribute: 'chart-style' })
	chartStyle: 'south' | 'north' | 'east' = 'south';

	private buildHouses(): HouseDef[] {
		if (!this.data?.meta) return [];
		return buildHousesFromMeta(this.data.meta);
	}

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No kundli data</div>`;
		const houses = this.buildHouses();
		const style = this.chartStyle;

		const frame =
			style === 'north'
				? renderNorthFrame()
				: style === 'east'
					? renderEastFrame()
					: renderSouthFrame();
		const houseGroup =
			style === 'north'
				? renderNorthHouseGroup
				: style === 'east'
					? renderEastHouseGroup
					: renderSouthHouseGroup;

		return html`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				${frame}
				${houses.map((h) => houseGroup(h))}
			</svg>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-kundli': RoxyVedicKundli;
	}
}
