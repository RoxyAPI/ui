import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
	ASPECT_SYMBOL,
	PLANET_GLYPH,
	SIGN_GLYPH,
	SIGNS_ORDER,
} from '../tokens/index.js';
import type { NatalChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	arcMidpoint,
	longitudeToSignPosition,
	normalizeLongitude,
	oppositePoint,
	polarToCartesian,
} from '../utils/degree.js';
import {
	ASPECT_CLASS,
	formatNumber,
	normalizeAspect,
} from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';
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
				max-width: 560px;
				aspect-ratio: 1 / 1;
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

			.planet-deg {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 7px;
				font-family: var(--roxy-font-sans);
			}

			/* Below 480px the chart container shrinks to ~320px on phones.
			 * Bump in-SVG text up proportionally so the 7px degree band
			 * does not collapse below ~6px on screen.
			 */
			@container (max-width: 480px) {
				.sign-glyph,
				.planet-glyph {
					font-size: 18px;
				}
				.planet-deg {
					font-size: 10px;
				}
				.house-num {
					font-size: 12px;
				}
			}

			.planet-deg .retro {
				fill: var(--roxy-danger, #dc2626);
			}

			.planet-leader {
				stroke: var(--roxy-accent, #f59e0b);
				stroke-width: 0.5;
				opacity: 0.55;
			}

			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-family: var(--roxy-font-sans);
			}

			.cusp-deg {
				fill: var(--roxy-muted, #71717a);
				font-size: 6px;
				font-family: var(--roxy-font-sans);
			}

			.tick {
				stroke: var(--roxy-border, #e4e4e7);
			}
			.tick-major {
				stroke: var(--roxy-secondary, #475569);
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

			.tablist {
				display: flex;
				gap: 2px;
				border-bottom: 2px solid var(--roxy-border, #e4e4e7);
			}
			.tab {
				padding: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				background: none;
				border: none;
				border-bottom: 2px solid transparent;
				margin-bottom: -2px;
				cursor: pointer;
				color: var(--roxy-muted, #71717a);
				font-family: inherit;
				transition: color var(--roxy-motion-duration, 200ms) var(--roxy-motion-easing, ease);
			}
			.tab[aria-selected='true'] {
				color: var(--roxy-accent-fg, #b45309);
				border-bottom-color: var(--roxy-accent, #f59e0b);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.tab:hover:not([aria-selected='true']) {
				color: var(--roxy-fg, #0a0a0a);
			}

			.grid-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}
			table.aspect-grid {
				border-collapse: collapse;
				font-size: var(--roxy-text-xs, 0.75rem);
				margin: 0 auto;
			}
			table.aspect-grid th,
			table.aspect-grid td {
				width: 1.6rem;
				height: 1.6rem;
				text-align: center;
				border: 1px solid var(--roxy-border, #e4e4e7);
				padding: 0;
			}
			table.aspect-grid th {
				color: var(--roxy-secondary, #475569);
				font-weight: var(--roxy-weight-bold, 600);
			}
			table.aspect-grid td.cell {
				cursor: default;
			}
			table.aspect-grid td.empty {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 18%, transparent);
			}
			table.aspect-grid td .asp {
				font-size: 0.95em;
				line-height: 1;
			}
			table.aspect-grid td.aspect-trine .asp,
			table.aspect-grid td.aspect-sextile .asp {
				color: var(--roxy-success, #16a34a);
			}
			table.aspect-grid td.aspect-square .asp,
			table.aspect-grid td.aspect-opposition .asp {
				color: var(--roxy-danger, #dc2626);
			}
			table.aspect-grid td.aspect-conjunction .asp {
				color: var(--roxy-accent-fg, #b45309);
			}
			table.aspect-grid td.aspect-other .asp {
				color: var(--roxy-muted, #71717a);
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

			.em-grid {
				border-collapse: collapse;
				font-size: var(--roxy-text-xs, 0.75rem);
				width: 100%;
			}
			.em-grid th,
			.em-grid td {
				border: 1px solid var(--roxy-border, #e4e4e7);
				padding: 3px 5px;
				text-align: center;
				vertical-align: middle;
			}
			.em-grid th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.04em;
			}
			.em-grid th[scope='row'] {
				text-align: left;
			}
			.em-grid td {
				color: var(--roxy-accent, #f59e0b);
				font-size: 0.95em;
				line-height: 1.4;
				min-width: 1.4rem;
			}
			.em-grid .em-total {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 25%, transparent);
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

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: NatalChartResponse | null = null;

	@property({ type: String, attribute: 'house-system', reflect: true })
	houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch' = 'placidus';

	/** Which view is showing: the wheel or the planet-by-planet aspect grid. */
	@state()
	private view: 'wheel' | 'grid' = 'wheel';

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
		const view = this.view;

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
			<div
				class="tablist"
				role="tablist"
				aria-label="Natal chart views"
				@keydown=${this.onTabKeyDown}
			>
				${(['wheel', 'grid'] as const).map(
					(t) => html`<button
						class="tab"
						role="tab"
						id="tab-${t}"
						aria-selected=${view === t ? 'true' : 'false'}
						aria-controls="panel-${t}"
						tabindex=${view === t ? '0' : '-1'}
						@click=${() => {
							this.view = t;
						}}
					>
						${t === 'wheel' ? 'Wheel' : 'Aspect grid'}
					</button>`,
				)}
			</div>
			<div id="panel-${view}" role="tabpanel" aria-labelledby="tab-${view}">
				${view === 'wheel' ? this.renderWheel(planets, aspects) : this.renderAspectGrid(planets, aspects)}
			</div>
			<div class="legend">
				<span>${planets.length} planets</span>
				<span>${aspects.length} aspects</span>
				${
					this.data.houseSystem
						? html`<span>${this.data.houseSystem} houses</span>`
						: nothing
				}
				<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${this.renderDetails()}
			${this.renderInterpretations()}
		</div>`;
	}

	private onTabKeyDown(e: KeyboardEvent) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		e.preventDefault();
		this.view = this.view === 'wheel' ? 'grid' : 'wheel';
		const next = this.view;
		requestAnimationFrame(() => {
			this.shadowRoot
				?.querySelector<HTMLButtonElement>(`#tab-${next}`)
				?.focus();
		});
	}

	private renderWheel(planets: PlanetEntry[], aspects: AspectEntry[]) {
		return html`<svg
			viewBox="0 0 ${SIZE} ${SIZE}"
			role="img"
			aria-label="Natal chart wheel with twelve houses, planets, and aspects"
		>
			<title>Natal chart wheel</title>
			<desc>
				Twelve zodiac sign segments around a circular wheel. Planet glyphs are
				placed at their ecliptic longitudes. Aspect lines connect related planets.
			</desc>
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${OUTER_R} stroke-width="1.5" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${SIGN_R - 14} stroke-width="0.8" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${HOUSE_R} stroke-width="1" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${PLANET_R - 16} stroke-width="0.5" />
			${this.renderTicks()} ${this.renderSpokes()} ${this.renderSigns()}
			${this.renderHouseNumbers()} ${this.renderCuspDegrees()}
			${this.renderAspects(planets, aspects)} ${this.renderPlanets(planets)}
			${this.renderAngles()}
		</svg>`;
	}

	/**
	 * Planet-by-planet aspect grid: the lower-triangular matrix astrologers read
	 * alongside the wheel. Each filled cell shows the aspect glyph colored by
	 * nature, with the exact orb in the SVG-free `<title>` tooltip.
	 */
	private renderAspectGrid(planets: PlanetEntry[], aspects: AspectEntry[]) {
		const names = planets.map((p) => capitalize(p.name));
		// Lookup aspects by unordered planet pair.
		const byPair = new Map<string, AspectEntry>();
		for (const a of aspects) {
			const k = [capitalize(a.planet1), capitalize(a.planet2)].sort().join('|');
			byPair.set(k, a);
		}
		if (names.length === 0)
			return html`<p class="roxy-empty" role="status">No planets to grid</p>`;

		return html`<div class="grid-scroll">
			<table class="aspect-grid" aria-label="Planet by planet aspect grid">
				<thead>
					<tr>
						<th></th>
						${names.slice(0, -1).map((n) => {
							const g = PLANET_GLYPH[n] ?? n.slice(0, 2);
							return html`<th scope="col" title=${n}>${g}</th>`;
						})}
					</tr>
				</thead>
				<tbody>
					${names.slice(1).map((rowName, ri) => {
						const rowGlyph = PLANET_GLYPH[rowName] ?? rowName.slice(0, 2);
						// Row i (1-based) pairs with columns 0..i-1.
						return html`<tr>
							<th scope="row" title=${rowName}>${rowGlyph}</th>
							${names.slice(0, ri + 1).map((colName) => {
								const a = byPair.get([rowName, colName].sort().join('|'));
								if (!a) return html`<td class="empty"></td>`;
								const name = normalizeAspect(a);
								const sym =
									ASPECT_SYMBOL[name] ??
									ASPECT_SYMBOL[name.replace(/-/g, '')] ??
									name.slice(0, 3);
								const cls = ASPECT_CLASS[name] ?? 'aspect-other';
								const orb = formatNumber(a.orb, 1);
								return html`<td class=${`cell ${cls}`} title=${`${rowName} ${name} ${colName}${orb ? ` (orb ${orb}°)` : ''}`}>
									<span class="asp">${sym}</span>
								</td>`;
							})}
							${names.slice(ri + 1, -1).map(() => html`<td class="empty"></td>`)}
						</tr>`;
					})}
				</tbody>
			</table>
		</div>`;
	}

	private renderAngles() {
		const asc = this.getAscendant();
		const mc = this.getMidheaven();
		// ASC/DESC and MC/IC are exact axes; DESC and IC are the opposite points.
		const items = [
			this.renderAngleMark(asc, 'ASC'),
			this.renderAngleMark(oppositePoint(asc), 'DSC'),
		];
		if (mc !== null) {
			items.push(this.renderAngleMark(mc, 'MC'));
			items.push(this.renderAngleMark(oppositePoint(mc), 'IC'));
		}
		const pof = this.data?.partOfFortune?.longitude;
		if (typeof pof === 'number') {
			items.push(this.renderAngleMark(normalizeLongitude(pof), 'PoF'));
		}
		const vertex = this.data?.vertex?.longitude;
		if (typeof vertex === 'number') {
			items.push(this.renderAngleMark(normalizeLongitude(vertex), 'Vtx'));
		}
		return items;
	}

	private renderAngleMark(longitude: number, label: string) {
		// Tick AND label share the same angle so the label sits right at the
		// tip of the arrow, where a practitioner expects to find it. The label
		// halo at radius ANGLE_LABEL_R is clear of the wheel rim, so there is
		// no overlap with house dividers despite the shared angle.
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
		// Draw a spoke at each real house cusp longitude so Placidus / Koch
		// unequal houses render correctly. Fall back to 12 equal spokes from the
		// Ascendant only when the response carries no houses array.
		const houses = this.data?.houses ?? [];
		const cuspLongitudes =
			houses.length === 12
				? houses.map((h) => h.longitude)
				: Array.from({ length: 12 }, (_, i) => this.getAscendant() + i * 30);
		return cuspLongitudes.map((lon) => {
			const angle = this.toAngle(lon);
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
		const houses = this.data?.houses ?? [];
		// Place each house number at the angular midpoint between its cusp and
		// the next, so the label sits inside the house even when houses are
		// unequal. Fall back to equal 30-degree sectors when houses are absent.
		if (houses.length === 12) {
			return houses.map((house, i) => {
				const next = houses[(i + 1) % 12];
				const mid = arcMidpoint(
					house.longitude,
					next ? next.longitude : house.longitude + 30,
				);
				const pos = polarToCartesian(
					CENTER,
					CENTER,
					HOUSE_R - 12,
					this.toAngle(mid),
				);
				return svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${house.number}</text>`;
			});
		}
		const ascSignIndex = Math.floor(this.getAscendant() / 30);
		return Array.from({ length: 12 }, (_, i) => {
			const angle = this.toAngle(i * 30 + 15);
			const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
			const houseNum = ((i - ascSignIndex + 12) % 12) + 1;
			return svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${houseNum}</text>`;
		});
	}

	/**
	 * Degree ticks on the outer zodiac band: a short mark every 5 degrees and a
	 * longer one on each 30-degree sign cusp, so the wheel reads like a
	 * reference-grade chart rather than a bare ring of glyphs.
	 */
	private renderTicks() {
		const ticks = [];
		for (let deg = 0; deg < 360; deg += 5) {
			const angle = this.toAngle(deg);
			const isMajor = deg % 30 === 0;
			const inner = isMajor ? SIGN_R - 14 : OUTER_R - 5;
			const a = polarToCartesian(CENTER, CENTER, inner, angle);
			const b = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			ticks.push(
				svg`<line class=${isMajor ? 'tick tick-major' : 'tick'} x1=${a.x} y1=${a.y} x2=${b.x} y2=${b.y} stroke-width=${isMajor ? 1 : 0.5} />`,
			);
		}
		return ticks;
	}

	/**
	 * Degree-and-minute label printed next to each house cusp on the wheel, so
	 * the exact cusp position is readable without leaving the chart.
	 */
	private renderCuspDegrees() {
		const houses = this.data?.houses ?? [];
		if (houses.length !== 12) return nothing;
		return houses.map((house) => {
			const angle = this.toAngle(house.longitude);
			const pos = polarToCartesian(CENTER, CENTER, HOUSE_R + 9, angle);
			const sp = longitudeToSignPosition(house.longitude);
			return svg`<text class="cusp-deg" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${sp.degree}°${String(sp.minute).padStart(2, '0')}'</text>`;
		});
	}

	private renderPlanets(planets: PlanetEntry[]) {
		// Stellium-aware angular fan-out. Conjunctions within 8° are the norm
		// in professional natal charts (Sun-Mercury-Venus cluster, outer-planet
		// stacks). To keep every glyph legible without losing precision, sort
		// by longitude and push later members forward in angle until they
		// clear a minimum separation, then draw a thin leader line from each
		// displaced glyph back to the planet's true position on the outer
		// rim. Conventional approach used by professional Western natal
		// software; preserves both readability and astronomical accuracy.
		const MIN_SEPARATION = 7;
		type Placed = {
			p: PlanetEntry;
			trueLon: number;
			displayLon: number;
		};
		const sorted: Placed[] = planets
			.filter((p) => Number.isFinite(p.longitude))
			.map((p) => ({
				p,
				trueLon: normalizeLongitude(p.longitude),
				displayLon: normalizeLongitude(p.longitude),
			}))
			.sort((a, b) => a.trueLon - b.trueLon);
		// Forward sweep: clamp each to at least prev + MIN_SEPARATION.
		for (let i = 1; i < sorted.length; i++) {
			const prev = sorted[i - 1];
			const cur = sorted[i];
			if (!prev || !cur) continue;
			const wanted = prev.displayLon + MIN_SEPARATION;
			if (cur.displayLon < wanted) cur.displayLon = wanted;
		}
		// If the cluster overshot 360°, slide everything back equally so the
		// stack stays anchored near the original longitudes.
		const last = sorted[sorted.length - 1];
		if (last && last.displayLon > 360) {
			const shift = last.displayLon - 360;
			for (const s of sorted) s.displayLon -= shift;
		}
		return sorted.map(({ p, trueLon, displayLon }) => {
			const trueAngle = this.toAngle(trueLon);
			const displayAngle = this.toAngle(displayLon);
			const glyphPos = polarToCartesian(CENTER, CENTER, PLANET_R, displayAngle);
			const degPos = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R - 13,
				displayAngle,
			);
			const rimPos = polarToCartesian(CENTER, CENTER, OUTER_R - 4, trueAngle);
			const leaderInner = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R + 8,
				displayAngle,
			);
			const glyph = PLANET_GLYPH[capitalize(p.name)] ?? p.name.slice(0, 2);
			const sp = longitudeToSignPosition(p.longitude);
			const retro = p.isRetrograde === true;
			const degLabel = `${sp.degree}°${String(sp.minute).padStart(2, '0')}'`;
			const offset = Math.abs(displayLon - trueLon) > 0.5;
			return svg`<g>
				${
					offset
						? svg`<line class="planet-leader" x1=${rimPos.x} y1=${rimPos.y} x2=${leaderInner.x} y2=${leaderInner.y} />`
						: nothing
				}
				<text class="planet-glyph" x=${glyphPos.x} y=${glyphPos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}${retro ? ' retrograde' : ''} - ${degLabel} ${p.sign ?? ''}</title>${glyph}</text>
				<text class="planet-deg" x=${degPos.x} y=${degPos.y} text-anchor="middle" dominant-baseline="central">${degLabel}${retro ? svg`<tspan class="retro"> ℞</tspan>` : nothing}</text>
			</g>`;
		});
	}

	private renderDetails() {
		const summary = this.data?.summary;
		const ai = this.data?.aspectsInterpretation;
		if (!summary && !ai) return nothing;

		const retrogrades = summary?.retrogradePlanets ?? [];

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
			${this.renderElementModalityGrid()}
		</div>`;
	}

	/**
	 * Element by modality grid: the 4x3 cross-tab astrologers read for chart
	 * balance. Each planet is placed by its sign into one cell (Fire/Earth/Air/
	 * Water row, Cardinal/Fixed/Mutable column). Derived purely from the planet
	 * signs, with row, column, and grand totals.
	 */
	private renderElementModalityGrid() {
		const planets = this.getPlanets();
		if (planets.length === 0) return nothing;
		const ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'] as const;
		const MODALITIES = ['Cardinal', 'Fixed', 'Mutable'] as const;
		const order = SIGNS_ORDER as readonly string[];

		const cells: Record<string, Record<string, string[]>> = {};
		for (const el of ELEMENTS)
			cells[el] = { Cardinal: [], Fixed: [], Mutable: [] };
		for (const p of planets) {
			const idx = order.indexOf(capitalize(p.sign ?? ''));
			if (idx < 0) continue;
			const el = ELEMENTS[idx % 4];
			const mod = MODALITIES[idx % 3];
			const glyph =
				PLANET_GLYPH[capitalize(p.name)] ?? capitalize(p.name).slice(0, 2);
			cells[el]?.[mod]?.push(glyph);
		}

		return html`<table class="em-grid" aria-label="Element and modality distribution">
			<thead>
				<tr>
					<th></th>
					${MODALITIES.map((m) => html`<th scope="col">${m.slice(0, 3)}</th>`)}
					<th scope="col">Total</th>
				</tr>
			</thead>
			<tbody>
				${ELEMENTS.map((el) => {
					const rowTotal = MODALITIES.reduce(
						(s, m) => s + (cells[el]?.[m]?.length ?? 0),
						0,
					);
					return html`<tr>
						<th scope="row">${el}</th>
						${MODALITIES.map(
							(m) => html`<td>${(cells[el]?.[m] ?? []).join(' ')}</td>`,
						)}
						<td class="em-total">${rowTotal}</td>
					</tr>`;
				})}
				<tr>
					<th scope="row">Total</th>
					${MODALITIES.map(
						(m) =>
							html`<td class="em-total">${ELEMENTS.reduce((s, el) => s + (cells[el]?.[m]?.length ?? 0), 0)}</td>`,
					)}
					<td class="em-total">${planets.length}</td>
				</tr>
			</tbody>
		</table>`;
	}

	private renderInterpretations() {
		const planets = this.getPlanets().filter((p) => p.interpretation);
		if (planets.length === 0) return nothing;
		return html`<section class="interpretations">
			<h3>Planet readings</h3>
			${planets.map((p, idx) => {
				const interp = p.interpretation!;
				const glyph = PLANET_GLYPH[capitalize(p.name)] ?? '';
				const deg = formatNumber(p.degree ?? 0, 1);
				return html`<details class="interp-card" name="natal-planet-readings" ?open=${idx === 0}>
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
