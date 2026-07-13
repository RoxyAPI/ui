import { css, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
	ASPECT_SYMBOL,
	PLANET_GLYPH,
	SIGN_GLYPH,
	SIGNS_ORDER,
} from '../tokens/index.js';
import type { NatalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	arcMidpoint,
	longitudeToSignPosition,
	normalizeLongitude,
	oppositePoint,
	polarToCartesian,
} from '../utils/degree.js';
import { disclosureStyles } from '../utils/disclosure.js';
import {
	ASPECT_CLASS,
	formatNumber,
	normalizeAspect,
} from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderInterpAccordion,
} from '../utils/interp-accordion.js';
import { capitalize } from '../utils/string.js';
import { renderTablist, tablistStyles } from '../utils/tablist.js';

type PlanetEntry = NatalChartResponse['planets'][number];
type AspectEntry = NatalChartResponse['aspects'][number];
type PatternEntry = NonNullable<NatalChartResponse['patterns']>[number];

/**
 * Reading order for detected configurations. A practitioner reads the rare, chart-defining figures first (a Grand Cross reframes the whole chart) and the common ones last, so the response order is re-sorted rather than dumped. Ties break on tightness, the closest to exact first.
 */
const PATTERN_ORDER: Record<string, number> = {
	GRAND_CROSS: 0,
	GRAND_TRINE: 1,
	KITE: 2,
	T_SQUARE: 3,
	YOD: 4,
	MYSTIC_RECTANGLE: 5,
	STELLIUM: 6,
};

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
export class RoxyNatalChart extends RoxyDataElement<NatalChartResponse> {
	static styles = [
		baseStyles,
		tablistStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.wrap {
				width: 100%;
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so a nowrap table wider than the card blows
				 * the column out and drags every sibling with it, clipped on the right. This
				 * is what lets the scroll container inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
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
				max-width: var(--roxy-chart-max-width, 560px);
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
				stroke: var(--roxy-accent-ink, #b45309);
			}
			.aspect-other {
				stroke: var(--roxy-muted, #71717a);
				opacity: 0.4;
			}

			.angle-marker {
				fill: var(--roxy-accent-ink, #b45309);
				font-size: 10px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
			}
			.angle-tick {
				stroke: var(--roxy-accent-ink, #b45309);
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

			.grid-scroll {
				overflow-x: auto;
				min-width: 0;
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
				color: var(--roxy-accent-ink, #b45309);
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
			.em-grid caption {
				caption-side: top;
				text-align: left;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				padding-bottom: var(--roxy-space-xs, 0.25rem);
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
			/* The dominant element row and modality column carry the same claim as
			 * the summary pills above the grid, so tint them: the pill and the cell
			 * a reader lands on must agree. */
			.em-grid .dominant {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
			}
			.em-grid th.dominant,
			.em-grid td.em-total.dominant {
				color: var(--roxy-fg, #0a0a0a);
			}

			.pattern {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
				display: grid;
				gap: 0.35rem;
			}
			.pattern-head {
				display: flex;
				align-items: baseline;
				gap: 0.5rem;
				flex-wrap: wrap;
			}
			.pattern-name {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.pattern-tag {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				text-transform: capitalize;
			}
			.pattern-tight {
				margin-left: auto;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.pattern-planets {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
			}
			.planet-chip {
				display: inline-flex;
				align-items: baseline;
				gap: 0.3rem;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			/* The apex is where the configuration discharges, so it leads the chip
			 * row and carries the accent tint. Text stays --roxy-fg: accent-ink on a
			 * tinted chip fails AA. */
			.planet-chip.apex {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 20%, transparent);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.planet-chip .apex-tag {
				font-size: 0.85em;
				font-weight: 400;
				text-transform: uppercase;
				letter-spacing: 0.04em;
			}
			.pattern-interp {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.45;
				margin: 0;
			}

			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
		`,
	];

	@property({ type: String, attribute: 'house-system', reflect: true })
	houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch' = 'placidus';

	/** Heading above the wheel. Defaults to "Natal chart"; reuse (e.g. the relocation wheel) sets its own. */
	@property({ type: String })
	heading = 'Natal chart';

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

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No chart data</div>`;
	}

	protected renderData(data: NatalChartResponse) {
		const planets = this.getPlanets();
		const aspects = data.aspects ?? [];
		const view = this.view;

		return html`<div class="wrap">
			<header>
				<h2 class="title">${this.heading}</h2>
				${
					data.birthDetails
						? html`<div class="meta">
							${[data.birthDetails.date, data.birthDetails.time]
								.filter(Boolean)
								.join(' · ')}
						</div>`
						: nothing
				}
			</header>
			${
				aspects.length > 0
					? html`${renderTablist({
							items: [
								{ id: 'wheel', label: 'Wheel' },
								{ id: 'grid', label: 'Aspect grid' },
							],
							active: view,
							onSelect: (v) => {
								this.view = v;
							},
							label: 'Natal chart views',
							idPrefix: 'natal',
							controls: true,
						})}
						<div
							id="natal-panel-${view}"
							role="tabpanel"
							aria-labelledby="natal-tab-${view}"
						>
							${view === 'wheel' ? this.renderWheel(planets, aspects) : this.renderAspectGrid(planets, aspects)}
						</div>`
					: this.renderWheel(planets, aspects)
			}
			<div class="legend">
				<span>${planets.length} planets</span>
				${aspects.length > 0 ? html`<span>${aspects.length} aspects</span>` : nothing}
				${
					data.houseSystem
						? html`<span>${data.houseSystem} houses</span>`
						: nothing
				}
				${
					aspects.length > 0
						? html`<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>harmonious</span>
							<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>challenging</span>`
						: nothing
				}
			</div>
			${this.renderDetails()}
			${this.renderPatterns()}
			${this.renderInterpretations()}
		</div>`;
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
			<table class="aspect-grid">
				<caption class="roxy-sr-only">
					Planet by planet aspect grid: the aspect each pair of planets forms, read from
					the planet naming the row across to the planet naming the column.
				</caption>
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
	 * Element by modality grid: the 4x3 cross-tab astrologers read for chart balance. Each body is placed by its sign into one cell (Fire/Earth/Air/Water row, Cardinal/Fixed/Mutable column).
	 *
	 * @remarks
	 * The cells are derived from the planet signs, not read from `summary.elementDistribution`, because a 1D distribution cannot fill a cross-tab. That makes the body set the reconciliation risk: the API counts every body it returns (nodes, Chiron, and Black Moon Lilith included), so the grid must too, or the totals here would contradict the dominant-element pill rendered right above it. Hence the totals count placed bodies rather than `planets.length` (an unrecognized sign would otherwise inflate the grand total past the sum of its rows), the caption names the body set, and the dominant row and column are tinted from `summary` so the pill and the grid land on the same cell.
	 */
	private renderElementModalityGrid() {
		const planets = this.getPlanets();
		if (planets.length === 0) return nothing;
		const ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'] as const;
		const MODALITIES = ['Cardinal', 'Fixed', 'Mutable'] as const;
		const order = SIGNS_ORDER as readonly string[];
		const summary = this.data?.summary;
		const dominantEl = capitalize(summary?.dominantElement ?? '');
		const dominantMod = capitalize(summary?.dominantModality ?? '');

		const cells: Record<string, Record<string, string[]>> = {};
		for (const el of ELEMENTS)
			cells[el] = { Cardinal: [], Fixed: [], Mutable: [] };
		let placed = 0;
		for (const p of planets) {
			const idx = order.indexOf(capitalize(p.sign ?? ''));
			if (idx < 0) continue;
			const el = ELEMENTS[idx % 4];
			const mod = MODALITIES[idx % 3];
			const glyph =
				PLANET_GLYPH[capitalize(p.name)] ?? capitalize(p.name).slice(0, 2);
			cells[el]?.[mod]?.push(glyph);
			placed++;
		}
		if (placed === 0) return nothing;

		const colTotal = (m: string) =>
			ELEMENTS.reduce((s, el) => s + (cells[el]?.[m]?.length ?? 0), 0);

		return html`<table class="em-grid" aria-label="Element and modality distribution">
			<caption>
				All ${placed} bodies in the chart, placed by sign
			</caption>
			<thead>
				<tr>
					<th></th>
					${MODALITIES.map(
						(m) =>
							html`<th scope="col" class=${m === dominantMod ? 'dominant' : ''}>${m.slice(0, 3)}</th>`,
					)}
					<th scope="col">Total</th>
				</tr>
			</thead>
			<tbody>
				${ELEMENTS.map((el) => {
					const isDomRow = el === dominantEl;
					const rowTotal = MODALITIES.reduce(
						(s, m) => s + (cells[el]?.[m]?.length ?? 0),
						0,
					);
					return html`<tr>
						<th scope="row" class=${isDomRow ? 'dominant' : ''}>${el}</th>
						${MODALITIES.map(
							(m) =>
								html`<td class=${isDomRow || m === dominantMod ? 'dominant' : ''}>${(cells[el]?.[m] ?? []).join(' ')}</td>`,
						)}
						<td class=${isDomRow ? 'em-total dominant' : 'em-total'}>${rowTotal}</td>
					</tr>`;
				})}
				<tr>
					<th scope="row">Total</th>
					${MODALITIES.map(
						(m) =>
							html`<td class=${m === dominantMod ? 'em-total dominant' : 'em-total'}>${colTotal(m)}</td>`,
					)}
					<td class="em-total">${placed}</td>
				</tr>
			</tbody>
		</table>`;
	}

	/**
	 * Detected multi-planet configurations. Each card names the figure, tags the element or modality it pivots on, flags a dissociate (out-of-sign) figure, and puts the apex planet first with its own chip, because the apex is the point the whole configuration discharges through.
	 */
	private renderPatterns() {
		const patterns = this.data?.patterns ?? [];
		if (patterns.length === 0) return nothing;
		const sorted = [...patterns].sort(
			(a, b) =>
				(PATTERN_ORDER[a.kind] ?? 9) - (PATTERN_ORDER[b.kind] ?? 9) ||
				(b.tightness ?? 0) - (a.tightness ?? 0),
		);
		return html`<section class="block">
			<h3>Chart patterns</h3>
			${sorted.map((p) => this.renderPattern(p))}
		</section>`;
	}

	private renderPattern(p: PatternEntry) {
		const planets = p.planets ?? [];
		// Apex first: the spec already orders it first for Kite, T-Square, and Yod,
		// but sorting here keeps the chip row honest for any future pattern kind.
		const ordered = p.apex
			? [...planets].sort((a, b) => Number(b === p.apex) - Number(a === p.apex))
			: planets;
		return html`<div class="pattern">
			<div class="pattern-head">
				<span class="pattern-name">${p.name}</span>
				${p.element ? html`<span class="pattern-tag">${p.element}</span>` : nothing}
				${p.modality ? html`<span class="pattern-tag">${p.modality}</span>` : nothing}
				${
					p.dissociate
						? html`<span class="pattern-tag" title="Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.">Dissociate</span>`
						: nothing
				}
				${
					// Math.round, not formatNumber(x, 0): that helper strips trailing
					// zeros, so a 100% tight pattern renders as "1%".
					typeof p.tightness === 'number'
						? html`<span class="pattern-tight">${Math.round(p.tightness)}% tight</span>`
						: nothing
				}
			</div>
			<div class="pattern-planets">
				${ordered.map((name) => {
					const glyph = PLANET_GLYPH[capitalize(name)];
					const isApex = Boolean(p.apex) && name === p.apex;
					return html`<span class=${isApex ? 'planet-chip apex' : 'planet-chip'}>
						${glyph ? html`<span aria-hidden="true">${glyph}</span>` : nothing}${name}${isApex ? html`<span class="apex-tag">apex</span>` : nothing}
					</span>`;
				})}
			</div>
			${p.interpretation ? html`<p class="pattern-interp">${p.interpretation}</p>` : nothing}
		</div>`;
	}

	private renderInterpretations() {
		const sections: InterpSection[] = this.getPlanets()
			.filter((p) => p.interpretation)
			.map((p) => {
				const interp = p.interpretation!;
				const glyph = PLANET_GLYPH[capitalize(p.name)] ?? '';
				const deg = formatNumber(p.degree ?? 0, 1);
				const lead = interp.summary || interp.detailed || '';
				// `detailed` only becomes a second paragraph when `summary` already
				// took the lead line, so a response carrying one or the other never
				// prints the same prose twice.
				const detail = interp.summary ? interp.detailed : undefined;
				return {
					label: `${glyph} ${p.name}`.trim(),
					aside: [p.sign ?? '', deg].filter(Boolean).join(' '),
					body: lead,
					extra: html`${detail ? html`<p>${detail}</p>` : nothing}
					${
						interp.keywords?.length
							? html`<div class="interp-keywords">${interp.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
							: nothing
					}`,
				};
			});
		return renderInterpAccordion(
			sections,
			'natal-planet-readings',
			'Planet readings',
		);
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
