import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { longitudeToSignPosition, polarToCartesian } from '../utils/degree.js';

interface PlanetEntry {
	name?: string;
	planet?: string;
	longitude?: number;
	degree?: number;
	sign?: string;
	house?: number;
	retrograde?: boolean;
	isRetrograde?: boolean;
}

interface AspectEntry {
	planet1?: string;
	planet2?: string;
	aspect?: string;
	orb?: number;
}

interface HouseEntry {
	house?: number;
	number?: number;
	cusp?: number;
	sign?: string;
}

interface NatalChartData {
	planets?: PlanetEntry[] | Record<string, PlanetEntry>;
	houses?: HouseEntry[];
	aspects?: AspectEntry[];
	ascendant?: number | { longitude?: number; sign?: string };
	midheaven?: number | { longitude?: number; sign?: string };
	birthDetails?: {
		date?: string;
		time?: string;
		location?: string;
	};
}

const SIZE = 320;
const CENTER = SIZE / 2;
const OUTER_R = 150;
const SIGN_R = 134;
const HOUSE_R = 110;
const PLANET_R = 88;

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
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 32%, transparent);
				stroke-width: 0.6;
				fill: none;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
		`,
	];

	@property({ attribute: false })
	data: NatalChartData | null = null;

	@property({ type: String, attribute: 'house-system', reflect: true })
	houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch' = 'placidus';

	private getPlanets(): PlanetEntry[] {
		const p = this.data?.planets;
		if (!p) return [];
		if (Array.isArray(p)) return p;
		return Object.entries(p).map(([name, entry]) => ({ ...entry, name }));
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
							${[
								this.data.birthDetails.date,
								this.data.birthDetails.time,
								this.data.birthDetails.location,
							]
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
			</svg>
			<div class="legend">
				<span>${planets.length} planets</span>
				<span>${aspects.length} aspects</span>
				<span>House system: ${this.houseSystem}</span>
			</div>
		</div>`;
	}

	private renderSpokes() {
		return Array.from({ length: 12 }, (_, i) => {
			const angle = i * 30 - 90;
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
			const angle = i * 30 + 15 - 90;
			const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
			return svg`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[sign]}</text>`;
		});
	}

	private renderHouseNumbers() {
		return Array.from({ length: 12 }, (_, i) => {
			const angle = i * 30 + 15 - 90;
			const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
			return svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${i + 1}</text>`;
		});
	}

	private renderPlanets(planets: PlanetEntry[]) {
		return planets.map((p) => {
			const lon =
				typeof p.longitude === 'number'
					? p.longitude
					: typeof p.degree === 'number'
						? p.degree
						: NaN;
			if (!Number.isFinite(lon)) return nothing;
			const angle = lon - 90;
			const pos = polarToCartesian(CENTER, CENTER, PLANET_R, angle);
			const name = p.name ?? p.planet ?? '';
			const glyph = PLANET_GLYPH[capitalize(name)] ?? name.slice(0, 2);
			const retro = p.retrograde || p.isRetrograde ? ' R' : '';
			return svg`<text class="planet-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${name}${retro}</title>${glyph}</text>`;
		});
	}

	private renderAspects(planets: PlanetEntry[], aspects: AspectEntry[]) {
		const planetMap = new Map<string, number>();
		for (const p of planets) {
			const lon =
				typeof p.longitude === 'number'
					? p.longitude
					: typeof p.degree === 'number'
						? p.degree
						: null;
			if (lon === null) continue;
			const name = capitalize(p.name ?? p.planet ?? '');
			if (name) planetMap.set(name, lon);
		}
		return aspects.map((a) => {
			const l1 = planetMap.get(capitalize(a.planet1 ?? ''));
			const l2 = planetMap.get(capitalize(a.planet2 ?? ''));
			if (l1 === undefined || l2 === undefined) return nothing;
			const p1 = polarToCartesian(CENTER, CENTER, PLANET_R - 18, l1 - 90);
			const p2 = polarToCartesian(CENTER, CENTER, PLANET_R - 18, l2 - 90);
			return svg`<line class="aspect" x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y} />`;
		});
	}
}

function capitalize(s: string): string {
	if (!s) return '';
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-natal-chart': RoxyNatalChart;
	}
}

// Export for external use
export { longitudeToSignPosition };
