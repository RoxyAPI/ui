import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH, SIGNS_ORDER } from '../tokens/index.js';
import type { NatalChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { polarToCartesian } from '../utils/degree.js';
import {
	ASPECT_CLASS,
	formatNumber,
	normalizeAspect,
} from '../utils/format.js';
import { capitalize } from '../utils/string.js';

type PlanetEntry = NatalChartResponse['planets'][number];
type AspectEntry = NatalChartResponse['aspects'][number];

const SIZE = 420;
const CENTER = SIZE / 2;
const OUTER_R = 164;
const SIGN_R = 146;
const HOUSE_R = 120;
const PLANET_R = 96;
const ANGLE_TICK_R = 178;
const ANGLE_LABEL_R = 196;

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

			.details {
				margin-top: var(--roxy-space-md, 1rem);
			}

			.pill-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}

			.pill {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-sm, 4px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-fg, #0f172a) 8%, transparent);
				color: var(--roxy-fg, #0f172a);
			}

			.pill--success {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 15%, transparent);
				color: var(--roxy-success, #16a34a);
			}

			.pill--danger {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 15%, transparent);
				color: var(--roxy-danger, #dc2626);
			}

			.pill--muted {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}

			.summary {
				color: var(--roxy-fg, #0f172a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: var(--roxy-space-md, 1rem) 0;
			}

			.dist-grid {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: var(--roxy-space-md, 1rem);
			}

			@container (max-width: 639px) {
				.dist-grid {
					grid-template-columns: 1fr;
				}
			}

			.dist-section h3 {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-muted, #71717a);
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.dist-row {
				display: grid;
				grid-template-columns: 4rem 1fr 1.5rem;
				align-items: center;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-fg, #0f172a);
				margin-bottom: 4px;
			}

			.dist-bar {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 20%, transparent);
				height: 6px;
				border-radius: 3px;
			}

			.dist-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				border-radius: 3px;
			}

			.interpretations {
				margin-top: var(--roxy-space-md, 1rem);
			}
			.interpretations h3 {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 600;
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
			}
			.interp-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}
			.interp-card summary {
				cursor: pointer;
				font-weight: 500;
				color: var(--roxy-fg, #0f172a);
			}
			.interp-card summary small {
				color: var(--roxy-muted, #71717a);
				margin-left: 0.5em;
				font-weight: 400;
			}
			.interp-body {
				margin-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0f172a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
				margin-top: 0.5rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xs, 0.75rem);
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
			${this.renderDetails()}
			${this.renderInterpretations()}
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
		return SIGNS_ORDER.map((sign, i) => {
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

	private renderDetails() {
		const summary = this.data?.summary;
		const ai = this.data?.aspectsInterpretation;
		if (!summary && !ai) return nothing;

		const retrogrades = summary?.retrogradePlanets ?? [];
		const elementDist = summary?.elementDistribution ?? {};
		const modalityDist = summary?.modalityDistribution ?? {};
		const elementMax = Math.max(1, ...Object.values(elementDist));
		const modalityMax = Math.max(1, ...Object.values(modalityDist));

		return html`<div class="details">
			${
				summary?.dominantElement || summary?.dominantModality
					? html`<div class="pill-row">
						${summary.dominantElement ? html`<span class="pill">Dominant element: ${summary.dominantElement}</span>` : nothing}
						${summary.dominantModality ? html`<span class="pill">Dominant modality: ${summary.dominantModality}</span>` : nothing}
					</div>`
					: nothing
			}
			${
				ai
					? html`<div class="pill-row">
						<span class="pill pill--success">Harmonious ${ai.harmonious}</span>
						<span class="pill pill--danger">Challenging ${ai.challenging}</span>
						<span class="pill pill--muted">Neutral ${ai.neutral}</span>
					</div>`
					: nothing
			}
			${
				retrogrades.length > 0
					? html`<div class="pill-row">
						${retrogrades.map((p) => {
							const glyph = PLANET_GLYPH[p] ?? p.slice(0, 2);
							return html`<span class="pill pill--muted">${glyph} ${p} R</span>`;
						})}
					</div>`
					: nothing
			}
			${ai?.summary ? html`<p class="summary">${ai.summary}</p>` : nothing}
			${
				Object.keys(elementDist).length > 0 ||
				Object.keys(modalityDist).length > 0
					? html`<div class="dist-grid">
						${
							Object.keys(elementDist).length > 0
								? html`<div class="dist-section">
									<h3>Elements</h3>
									${Object.entries(elementDist).map(
										([label, count]) => html`<div class="dist-row">
											<span>${label}</span>
											<div class="dist-bar"><span style="width: ${Math.round((count / elementMax) * 100)}%"></span></div>
											<span>${count}</span>
										</div>`,
									)}
								</div>`
								: nothing
						}
						${
							Object.keys(modalityDist).length > 0
								? html`<div class="dist-section">
									<h3>Modalities</h3>
									${Object.entries(modalityDist).map(
										([label, count]) => html`<div class="dist-row">
											<span>${label}</span>
											<div class="dist-bar"><span style="width: ${Math.round((count / modalityMax) * 100)}%"></span></div>
											<span>${count}</span>
										</div>`,
									)}
								</div>`
								: nothing
						}
					</div>`
					: nothing
			}
		</div>`;
	}

	private renderInterpretations() {
		const planets = this.getPlanets().filter((p) => p.interpretation);
		if (planets.length === 0) return nothing;
		return html`<section class="interpretations">
			<h3>Planet readings</h3>
			${planets.map((p) => {
				const interp = p.interpretation!;
				const glyph = PLANET_GLYPH[capitalize(p.name)] ?? '';
				const deg = formatNumber(p.degree ?? 0, 1);
				return html`<details class="interp-card">
					<summary>${glyph} ${p.name} <small>${p.sign ?? ''} ${deg}</small></summary>
					<div class="interp-body">
						${interp.summary ? html`<p class="interp-summary">${interp.summary}</p>` : nothing}
						${interp.detailed ? html`<p class="interp-detail">${interp.detailed}</p>` : nothing}
						${
							interp.keywords?.length
								? html`<div class="interp-keywords">${interp.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
								: nothing
						}
					</div>
				</details>`;
			})}
		</section>`;
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

declare global {
	interface HTMLElementTagNameMap {
		'roxy-natal-chart': RoxyNatalChart;
	}
}
