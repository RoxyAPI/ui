import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { NatalChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { longitudeToSignPosition, polarToCartesian } from '../utils/degree.js';
import { formatNumber } from '../utils/format.js';

type PlanetEntry = NatalChartResponse['planets'][number];
type AspectEntry = NatalChartResponse['aspects'][number];

const SIZE = 384;
const CENTER = SIZE / 2;
const OUTER_R = 150;
const SIGN_R = 134;
const HOUSE_R = 110;
const PLANET_R = 88;
const ANGLE_TICK_R = 162;
const ANGLE_LABEL_R = 176;

/**
 * Western natal chart wheel. Renders the 12 zodiac signs, 12 houses, planet
 * markers, and aspect lines from a /astrology/natal-chart response.
 */
@customElement('roxy-natal-chart')
export class RoxyNatalChart extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				width: 100%;
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}

			.meta {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				height: auto;
				margin: 0 auto;
			}

			.wheel-line {
				fill: none;
				stroke: var(--roxy-border, #e4e4e7);
			}

			.sign-glyph {
				fill: var(--roxy-secondary, #475569);
				font-size: 14px;
				font-family: var(--roxy-font-sans);
			}

			.planet-glyph {
				fill: var(--roxy-accent, #f59e0b);
				font-size: 14px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}

			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-family: var(--roxy-font-sans);
			}

			.aspect {
				stroke-width: 0.8;
				fill: none;
				opacity: 0.55;
			}
			.aspect-trine,
			.aspect-sextile {
				stroke: var(--roxy-success, #16a34a);
			}
			.aspect-square,
			.aspect-opposition {
				stroke: var(--roxy-danger, #dc2626);
			}
			.aspect-conjunction {
				stroke: var(--roxy-accent-fg, #b45309);
			}
			.aspect-other {
				stroke: var(--roxy-muted, #71717a);
				opacity: 0.4;
			}

			.angle-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 10px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
			}
			.angle-tick {
				stroke: var(--roxy-accent-fg, #b45309);
				stroke-width: 1.5;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
			.legend-swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}
		`,
	];

	@property({ attribute: false })
	data: NatalChartResponse | null = null;

	@property({ type: String, attribute: 'house-system', reflect: true })
	houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch' = 'placidus';

	private getPlanets(): PlanetEntry[] {
		return this.data?.planets ?? [];
	}

	private getAscendant(): number {
		return this.data?.ascendant?.longitude ?? 0;
	}

	private getMidheaven(): number | null {
		const m = this.data?.midheaven?.longitude;
		return typeof m === 'number' ? m : null;
	}

	private toAngle(lon: number): number {
		return 180 + this.getAscendant() - lon;
	}

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No chart data</div>`;
		const planets = this.getPlanets();
		const aspects = this.data.aspects ?? [];

		return html`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${
					this.data.birthDetails
						? html`<div class="meta">
							${[this.data.birthDetails.date, this.data.birthDetails.time]
								.filter(Boolean)
								.join(' · ')}
						</div>`
						: nothing
				}
			</header>
			<svg
				viewBox="0 0 ${SIZE} ${SIZE}"
				role="img"
				aria-label="Natal chart wheel with twelve houses, planets, and aspects"
			>
				<title>Natal chart wheel</title>
				<desc>
					Twelve zodiac sign segments around a circular wheel. Planet glyphs are
					placed at their ecliptic longitudes. Aspect lines connect related planets.
				</desc>
				<circle
					class="wheel-line"
					cx=${CENTER}
					cy=${CENTER}
					r=${OUTER_R}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${CENTER}
					cy=${CENTER}
					r=${HOUSE_R}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${CENTER}
					cy=${CENTER}
					r=${PLANET_R - 16}
					stroke-width="0.5"
				/>
				${this.renderSpokes()} ${this.renderSigns()} ${this.renderHouseNumbers()}
				${this.renderAspects(planets, aspects)} ${this.renderPlanets(planets)}
				${this.renderAngles()}
			</svg>
			<div class="legend">
				<span>${planets.length} planets</span>
				<span>${aspects.length} aspects</span>
				<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
		</div>`;
	}

	private renderAngles() {
		const asc = this.getAscendant();
		const mc = this.getMidheaven();
		const items = [this.renderAngleMark(asc, 'ASC')];
		if (mc !== null) items.push(this.renderAngleMark(mc, 'MC'));
		return items;
	}

	private renderAngleMark(longitude: number, label: string) {
		const angle = this.toAngle(longitude);
		const tickInner = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
		const tickOuter = polarToCartesian(CENTER, CENTER, ANGLE_TICK_R, angle);
		const labelPos = polarToCartesian(CENTER, CENTER, ANGLE_LABEL_R, angle);
		return svg`
			<g>
				<line class="angle-tick" x1=${tickInner.x} y1=${tickInner.y} x2=${tickOuter.x} y2=${tickOuter.y} />
				<text class="angle-marker" x=${labelPos.x} y=${labelPos.y} text-anchor="middle" dominant-baseline="central">${label}</text>
			</g>
		`;
	}

	private renderSpokes() {
		return Array.from({ length: 12 }, (_, i) => {
			const angle = this.toAngle(i * 30);
			const start = polarToCartesian(CENTER, CENTER, HOUSE_R, angle);
			const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.8" />`;
		});
	}

	private renderSigns() {
		const order = [
			'Aries',
			'Taurus',
			'Gemini',
			'Cancer',
			'Leo',
			'Virgo',
			'Libra',
			'Scorpio',
			'Sagittarius',
			'Capricorn',
			'Aquarius',
			'Pisces',
		];
		return order.map((sign, i) => {
			const angle = this.toAngle(i * 30 + 15);
			const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
			return svg`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[sign]}</text>`;
		});
	}

	private renderHouseNumbers() {
		const ascSignIndex = Math.floor(this.getAscendant() / 30);
		return Array.from({ length: 12 }, (_, i) => {
			const angle = this.toAngle(i * 30 + 15);
			const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
			const houseNum = ((i - ascSignIndex + 12) % 12) + 1;
			return svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${houseNum}</text>`;
		});
	}

	private renderPlanets(planets: PlanetEntry[]) {
		return planets.map((p) => {
			if (!Number.isFinite(p.longitude)) return nothing;
			const angle = this.toAngle(p.longitude);
			const pos = polarToCartesian(CENTER, CENTER, PLANET_R, angle);
			const glyph = PLANET_GLYPH[capitalize(p.name)] ?? p.name.slice(0, 2);
			const retro = p.isRetrograde ? ' R' : '';
			const display = retro ? `${glyph}ᴿ` : glyph;
			return svg`<text class="planet-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}${retro}</title>${display}</text>`;
		});
	}

	private renderAspects(planets: PlanetEntry[], aspects: AspectEntry[]) {
		const planetMap = new Map<string, number>();
		for (const p of planets) {
			if (typeof p.longitude !== 'number') continue;
			const name = capitalize(p.name);
			if (name) planetMap.set(name, p.longitude);
		}
		return aspects.map((a) => {
			const l1 = planetMap.get(capitalize(a.planet1));
			const l2 = planetMap.get(capitalize(a.planet2));
			if (l1 === undefined || l2 === undefined) return nothing;
			const p1 = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R - 18,
				this.toAngle(l1),
			);
			const p2 = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R - 18,
				this.toAngle(l2),
			);
			const aspectName = normalizeAspect(a);
			const aspectClass = ASPECT_CLASS[aspectName] ?? 'aspect-other';
			const orbLabel = formatNumber(a.orb, 1);
			return svg`<line class=${`aspect ${aspectClass}`} x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y}><title>${a.planet1} ${aspectName || ''} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}°)` : ''}</title></line>`;
		});
	}
}

function capitalize(s: string): string {
	if (!s) return '';
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const ASPECT_CLASS: Record<string, string> = {
	conjunction: 'aspect-conjunction',
	sextile: 'aspect-sextile',
	square: 'aspect-square',
	trine: 'aspect-trine',
	opposition: 'aspect-opposition',
};

function normalizeAspect(a: AspectEntry): string {
	return (a.type ?? '').toLowerCase().replace(/_/g, '-');
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-natal-chart': RoxyNatalChart;
	}
}

// Export for external use
export { longitudeToSignPosition };
