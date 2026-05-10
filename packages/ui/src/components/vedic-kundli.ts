import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
	PLANET_ABBR,
	RASHI_KEYS,
	SIGN_ABBR,
	SIGNS_ORDER,
} from '../tokens/index.js';
import type { BirthChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { capitalize } from '../utils/string.js';

type RashiBucket = BirthChartResponse['aries'];

// The /vedic-astrology/birth-chart response carries all 12 rashi keys
// (aries, taurus, ..., pisces), each shaped like the spec-typed `aries`
// bucket. This local alias indexes by rashi name without per-call casts.
type BirthChartByRashi = BirthChartResponse & Record<string, RashiBucket>;

interface KundliHouse {
	house: number;
	sign: string;
	planets: string[];
}

const SOUTH_HOUSE_CENTERS: Record<number, { x: number; y: number }> = {
	1: { x: 150, y: 58 },
	2: { x: 205, y: 52 },
	3: { x: 253, y: 112 },
	4: { x: 243, y: 150 },
	5: { x: 253, y: 188 },
	6: { x: 205, y: 248 },
	7: { x: 150, y: 242 },
	8: { x: 95, y: 248 },
	9: { x: 47, y: 188 },
	10: { x: 57, y: 150 },
	11: { x: 47, y: 112 },
	12: { x: 95, y: 52 },
};

const SOUTH_SIGN_POSITIONS: Record<number, { x: number; y: number }> = {
	1: { x: 150, y: 35 },
	2: { x: 222, y: 40 },
	3: { x: 265, y: 100 },
	4: { x: 265, y: 150 },
	5: { x: 265, y: 200 },
	6: { x: 222, y: 260 },
	7: { x: 150, y: 265 },
	8: { x: 78, y: 260 },
	9: { x: 35, y: 200 },
	10: { x: 35, y: 150 },
	11: { x: 35, y: 100 },
	12: { x: 78, y: 40 },
};

// `RASHI_TO_SIGN` is derived from the canonical sign list so any future order
// change in `tokens/index.ts` automatically propagates to the kundli buckets.
const RASHI_TO_SIGN: Record<string, string> = Object.fromEntries(
	SIGNS_ORDER.map((s) => [s.toLowerCase(), s] as const),
);

/**
 * Vedic kundli (D1 Rashi chart). South Indian style by default. Pass `data`
 * from /vedic-astrology/birth-chart. North Indian style via style="north".
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

	private buildHouses(): KundliHouse[] {
		if (!this.data) return [];
		const data = this.data as BirthChartByRashi;
		const houses: KundliHouse[] = [];
		for (let i = 0; i < 12; i++) {
			const key = RASHI_KEYS[i];
			const bucket = data[key];
			const planets = (bucket?.signs ?? []).map((p) => p.graha).filter(Boolean);
			houses.push({
				house: i + 1,
				sign: RASHI_TO_SIGN[key] ?? '',
				planets,
			});
		}
		return houses;
	}

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No kundli data</div>`;
		const houses = this.buildHouses();

		return html`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
				<polygon
					class="line"
					points="220,80 220,220 80,220 80,80"
					stroke-width="1"
					fill="none"
				/>
				<line class="line" x1="150" y1="10" x2="80" y2="80" stroke-width="1" />
				<line class="line" x1="150" y1="10" x2="220" y2="80" stroke-width="1" />
				<line class="line" x1="290" y1="150" x2="220" y2="80" stroke-width="1" />
				<line class="line" x1="290" y1="150" x2="220" y2="220" stroke-width="1" />
				<line class="line" x1="150" y1="290" x2="220" y2="220" stroke-width="1" />
				<line class="line" x1="150" y1="290" x2="80" y2="220" stroke-width="1" />
				<line class="line" x1="10" y1="150" x2="80" y2="220" stroke-width="1" />
				<line class="line" x1="10" y1="150" x2="80" y2="80" stroke-width="1" />
				${houses.map((h) => this.renderHouseGroup(h))}
			</svg>
		</div>`;
	}

	private isLagna(h: KundliHouse): boolean {
		const ascSign = this.data?.meta?.Lagna?.rashi;
		if (!ascSign) return false;
		return ascSign.toLowerCase() === h.sign.toLowerCase();
	}

	private renderHouseGroup(h: KundliHouse) {
		const center = SOUTH_HOUSE_CENTERS[h.house];
		const signPos = SOUTH_SIGN_POSITIONS[h.house];
		if (!center || !signPos) return nothing;
		const signAbbr = SIGN_ABBR[h.sign] ?? '';
		const planets = h.planets ?? [];
		const isLagna = this.isLagna(h);
		return svg`
			<g>
				${
					isLagna
						? svg`<rect class="lagna-bg" x=${center.x - 30} y=${center.y - 28} width="60" height="56" rx="6" />`
						: nothing
				}
				${
					signAbbr
						? svg`<text class="sign-text" x=${signPos.x} y=${signPos.y} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>`
						: nothing
				}
				${
					isLagna
						? svg`<text class="lagna-marker" x=${center.x} y=${center.y - 18} text-anchor="middle" dominant-baseline="central">LAGNA</text>`
						: nothing
				}
				${planets.map((planet, j) => {
					const abbr = PLANET_ABBR[capitalize(planet)] ?? planet.slice(0, 2);
					const lineHeight = 13;
					const baseY = isLagna ? center.y + 8 : center.y;
					const startY = baseY - ((planets.length - 1) * lineHeight) / 2;
					const yPos = startY + j * lineHeight;
					return svg`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
				})}
			</g>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-kundli': RoxyVedicKundli;
	}
}
