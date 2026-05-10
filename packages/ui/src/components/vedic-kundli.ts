import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { RASHI_KEYS } from '../tokens/index.js';
import type { BirthChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import type { HouseDef } from '../utils/kundli-render.js';
import {
	RASHI_TO_SIGN,
	renderNorthFrame,
	renderNorthHouseGroup,
	renderSouthFrame,
	renderSouthHouseGroup,
} from '../utils/kundli-render.js';

type RashiBucket = BirthChartResponse['aries'];

// The /vedic-astrology/birth-chart response carries all 12 rashi keys
// (aries, taurus, ..., pisces), each shaped like the spec-typed `aries`
// bucket. This local alias indexes by rashi name without per-call casts.
type BirthChartByRashi = BirthChartResponse & Record<string, RashiBucket>;

/**
 * Vedic kundli (D1 Rashi chart). South Indian style by default. Pass `data`
 * from /vedic-astrology/birth-chart. North Indian style via chartStyle="north".
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
		`,
	];

	@property({ attribute: false })
	data: BirthChartResponse | null = null;

	@property({ type: String, reflect: true, attribute: 'chart-style' })
	chartStyle: 'south' | 'north' = 'south';

	private buildHouses(): HouseDef[] {
		if (!this.data) return [];
		const data = this.data as BirthChartByRashi;
		const lagnaSign = this.data?.meta?.Lagna?.rashi ?? '';
		const houses: HouseDef[] = [];
		for (let i = 0; i < 12; i++) {
			const key = RASHI_KEYS[i];
			const bucket = data[key];
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
			return html`<div class="roxy-empty" role="status">No kundli data</div>`;
		const houses = this.buildHouses();
		const isNorth = this.chartStyle === 'north';

		return html`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				${isNorth ? renderNorthFrame() : renderSouthFrame()}
				${
					isNorth
						? houses.map((h) => renderNorthHouseGroup(h))
						: houses.map((h) => renderSouthHouseGroup(h))
				}
			</svg>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-kundli': RoxyVedicKundli;
	}
}
