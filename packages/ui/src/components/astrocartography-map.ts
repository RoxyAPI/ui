import { css, html, nothing, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { planetGlyph } from '../tokens/index.js';
import type { AstrocartographyResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import { formatDateTime } from '../utils/format.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';
import { planetColor } from '../utils/planet-color.js';
import { WORLD_LAND_PATH } from '../utils/world-map.js';

type LineSet = AstrocartographyResponse['lines'][number];
type GeoPoint = LineSet['ascendant']['points'][number];

// Equirectangular (plate carree) projection in a 360x180 unit canvas: one unit
// per degree. The SVG scales to the container width; the 2:1 aspect ratio holds.
const W = 360;
const H = 180;
const lonToX = (lon: number): number => lon + 180;
const latToY = (lat: number): number => 90 - lat;

// Reference parallels (degrees). Tropics and polar circles use the current mean
// obliquity; drawn as dashed guides so the curved rising/setting lines read
// against real climate bands, not just a bare grid.
const TROPIC = 23.44;
const POLAR = 66.56;

const formatLon = (lon: number): string =>
	lon === 0 ? '0' : `${Math.abs(lon)}°${lon > 0 ? 'E' : 'W'}`;
const formatLat = (lat: number): string =>
	lat === 0 ? '0' : `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'}`;

/**
 * Split a rising/setting line into screen polylines, breaking the path wherever
 * consecutive samples jump more than 180 degrees of longitude. Without the
 * split, a line that crosses the antimeridian draws a stray horizontal streak
 * straight across the whole map.
 */
function toSegments(points: GeoPoint[]): string[] {
	const segments: string[][] = [];
	let current: string[] = [];
	let prevLon: number | null = null;
	for (const p of points) {
		if (prevLon !== null && Math.abs(p.longitude - prevLon) > 180) {
			if (current.length) segments.push(current);
			current = [];
		}
		current.push(`${lonToX(p.longitude)},${latToY(p.latitude)}`);
		prevLon = p.longitude;
	}
	if (current.length) segments.push(current);
	return segments.filter((s) => s.length > 1).map((s) => s.join(' '));
}

const ANGLE_LABEL: Record<string, string> = {
	mc: 'MC',
	ic: 'IC',
	ascendant: 'AC',
	descendant: 'DC',
};

/**
 * Astrocartography (relocation) world map. Plots the four planetary lines for
 * every body from a /astrology/astrocartography response over a labeled
 * graticule: MC and IC as straight meridians, the Ascendant and Descendant as
 * latitude-sampled curves. Color is per body and theme-token driven; solid
 * lines are the Ascendant and Midheaven, dashed are the Descendant and IC.
 */
@customElement('roxy-astrocartography-map')
export class RoxyAstrocartographyMap extends RoxyDataElement<AstrocartographyResponse> {
	static styles = [
		baseStyles,
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
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
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
				height: auto;
				border-radius: var(--roxy-radius-sm, 4px);
			}
			.map-frame {
				fill: color-mix(in srgb, var(--roxy-border, #e4e4e7) 12%, transparent);
				stroke: var(--roxy-border, #e4e4e7);
				stroke-width: 0.8;
			}
			.land {
				fill: var(--roxy-secondary, #475569);
				opacity: 0.13;
			}
			.grat {
				stroke: var(--roxy-border, #e4e4e7);
				stroke-width: 0.4;
				fill: none;
			}
			.grat-axis {
				stroke: var(--roxy-muted, #71717a);
				stroke-width: 0.6;
				opacity: 0.6;
			}
			.grat-ref {
				stroke: var(--roxy-secondary, #475569);
				stroke-width: 0.4;
				stroke-dasharray: 2 2;
				opacity: 0.5;
				fill: none;
			}
			.axis-label {
				fill: var(--roxy-muted, #71717a);
				font-size: 5px;
				font-family: var(--roxy-font-sans);
			}
			.acg-line {
				fill: none;
				stroke-width: 1;
				opacity: 0.95;
			}
			.acg-line.dashed {
				stroke-dasharray: 4 2.5;
			}
			.acg-glyph {
				font-size: 8px;
				font-family: var(--roxy-font-sans);
				font-weight: 600;
			}
			.birthplace {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 9px;
			}
			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.legend-item {
				display: inline-flex;
				align-items: center;
				gap: 0.3rem;
			}
			.legend-swatch {
				width: 14px;
				height: 0;
				border-top-width: 2px;
				border-top-style: solid;
			}
			.legend-note {
				width: 100%;
				color: var(--roxy-muted, #71717a);
			}
			.summary {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			/* The shared lead is baseline-aligned for text; an empty swatch has no
			 * baseline worth aligning to, so centre it against the planet name. */
			.interp-dot {
				width: 10px;
				height: 10px;
				border-radius: 50%;
				flex-shrink: 0;
				align-self: center;
			}
			.interp-line {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
			}
			.interp-line .code {
				font-weight: 600;
				color: var(--roxy-accent-ink, #b45309);
				margin-right: 0.4rem;
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No astrocartography data</div>`;
	}

	protected renderData(data: AstrocartographyResponse) {
		const lines = data.lines ?? [];
		const bd = data.birthDetails;
		return html`<div class="wrap" part="card">
			<header part="header">
				<h2 class="title">Astrocartography</h2>
				${
					bd
						? html`<div class="meta">
							${formatDateTime(this.effectiveLang(), bd.date, bd.time)} ·
							${formatLat(Math.round(bd.latitude))} ${formatLon(Math.round(bd.longitude))}
						</div>`
						: nothing
				}
			</header>
			${this.renderMap(lines, bd)}
			${this.renderLegend(lines)}
			${
				// The map and its key are the deliverable here; the summary is prose
				// about what the map shows.
				data.summary && !this.hideReadings
					? html`<p class="summary">${data.summary}</p>`
					: nothing
			}
			${this.renderInterpretations(lines)}
		</div>`;
	}

	private renderMap(
		lines: LineSet[],
		bd: AstrocartographyResponse['birthDetails'],
	) {
		return html`<svg
			viewBox="0 0 ${W} ${H}"
			part="chart"
			role="img"
			aria-label="World map of planetary astrocartography lines"
		>
			<title>Astrocartography world map</title>
			<desc>
				Equirectangular world map. Each body has a Midheaven and Imum Coeli
				meridian and a curved Ascendant and Descendant line, colored per body.
			</desc>
			<rect class="map-frame" x="0" y="0" width=${W} height=${H} />
			<path class="land" d=${WORLD_LAND_PATH} fill-rule="evenodd" />
			${this.renderGraticule()}
			${lines.map((l, i) => this.renderBodyLines(l, i))}
			${
				bd
					? svg`<text class="birthplace" x=${lonToX(bd.longitude)} y=${latToY(bd.latitude)} text-anchor="middle" dominant-baseline="central"><title>Birthplace</title>★</text>`
					: nothing
			}
		</svg>`;
	}

	private renderGraticule() {
		const meridians = [];
		for (let lon = -150; lon <= 150; lon += 30) {
			const x = lonToX(lon);
			const axis = lon === 0;
			meridians.push(
				svg`<line class=${axis ? 'grat-axis' : 'grat'} x1=${x} y1="0" x2=${x} y2=${H} />`,
			);
			meridians.push(
				svg`<text class="axis-label" x=${x} y=${H - 2} text-anchor="middle">${formatLon(lon)}</text>`,
			);
		}
		const parallels = [];
		for (let lat = -60; lat <= 60; lat += 30) {
			const y = latToY(lat);
			const axis = lat === 0;
			parallels.push(
				svg`<line class=${axis ? 'grat-axis' : 'grat'} x1="0" y1=${y} x2=${W} y2=${y} />`,
			);
			parallels.push(
				svg`<text class="axis-label" x="2" y=${y - 1}>${formatLat(lat)}</text>`,
			);
		}
		// Tropics and polar circles as dashed climate-band references.
		const refs = [TROPIC, -TROPIC, POLAR, -POLAR].map(
			(lat) =>
				svg`<line class="grat-ref" x1="0" y1=${latToY(lat)} x2=${W} y2=${latToY(lat)} />`,
		);
		return svg`${meridians}${parallels}${refs}`;
	}

	private renderBodyLines(line: LineSet, index: number) {
		const color = planetColor(line.planet, index);
		// Response symbol first, then the shared table, then the full name. Never a
		// truncation: `North Node.slice(0, 2)` labelled a whole map line "No".
		const glyph = line.symbol || planetGlyph(line.planet) || line.planet;
		const items = [
			this.renderMeridian(
				line.mc.longitude,
				color,
				glyph,
				line.planet,
				'mc',
				false,
			),
			this.renderMeridian(
				line.ic.longitude,
				color,
				glyph,
				line.planet,
				'ic',
				true,
			),
			this.renderCurve(
				line.ascendant.points,
				color,
				glyph,
				line.planet,
				'ascendant',
				false,
			),
			this.renderCurve(
				line.descendant.points,
				color,
				glyph,
				line.planet,
				'descendant',
				true,
			),
		];
		return svg`${items}`;
	}

	private renderMeridian(
		lon: number,
		color: string,
		glyph: string,
		planet: string,
		angle: string,
		dashed: boolean,
	) {
		const x = lonToX(lon);
		// MC label rides the top edge, IC the bottom, so the two meridians of one
		// body never stack their glyphs at the same point.
		const labelY = angle === 'ic' ? H - 7 : 9;
		return svg`<g>
			<line class=${`acg-line${dashed ? ' dashed' : ''}`} stroke=${color} x1=${x} y1="0" x2=${x} y2=${H}><title>${planet} ${ANGLE_LABEL[angle]} line</title></line>
			<text class="acg-glyph" fill=${color} x=${x} y=${labelY} text-anchor="middle" dominant-baseline="central">${glyph}</text>
		</g>`;
	}

	private renderCurve(
		points: GeoPoint[],
		color: string,
		glyph: string,
		planet: string,
		angle: string,
		dashed: boolean,
	) {
		const segments = toSegments(points ?? []);
		if (segments.length === 0) return nothing;
		// Label at the sample nearest the equator, the most visible band.
		const anchor = (points ?? []).reduce(
			(best, p) => (Math.abs(p.latitude) < Math.abs(best.latitude) ? p : best),
			points[0] ?? { latitude: 0, longitude: 0 },
		);
		return svg`<g>
			${segments.map(
				(pts) =>
					svg`<polyline class=${`acg-line${dashed ? ' dashed' : ''}`} stroke=${color} points=${pts}><title>${planet} ${ANGLE_LABEL[angle]} line</title></polyline>`,
			)}
			<text class="acg-glyph" fill=${color} x=${lonToX(anchor.longitude)} y=${latToY(anchor.latitude)} text-anchor="middle" dominant-baseline="central">${glyph}</text>
		</g>`;
	}

	private renderLegend(lines: LineSet[]) {
		if (lines.length === 0) return nothing;
		return html`<div class="legend" part="legend">
			${lines.map((l, i) => {
				const color = planetColor(l.planet, i);
				return html`<span class="legend-item">
					<span class="legend-swatch" style=${`border-top-color: ${color}`}></span>
					${l.symbol ? html`${l.symbol} ` : nothing}${l.planet}
				</span>`;
			})}
			<span class="legend-note">Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.</span>
		</div>`;
	}

	/**
	 * The written read of each planetary line. Prose end to end, and the lines it
	 * describes are already drawn and keyed on the map above, so `hide-readings`
	 * takes the section whole.
	 */
	private renderInterpretations(lines: LineSet[]) {
		if (lines.length === 0 || this.hideReadings) return nothing;
		return html`<section class="block" part="section readings">
			<h3>Planetary lines</h3>
			${lines.map((l, i) => {
				const color = planetColor(l.planet, i);
				const rows: Array<[string, string]> = [
					['MC', l.mc.interpretation],
					['IC', l.ic.interpretation],
					['AC', l.ascendant.interpretation],
					['DC', l.descendant.interpretation],
				];
				return html`<details class="interp-card" part="reading" name="acg-lines" ?open=${i === 0}>
					<summary>
						<span class="interp-lead">
							<span class="interp-dot" style=${`background: ${color}`}></span>
							${l.symbol ? html`${l.symbol} ` : nothing}${l.planet}
						</span>
						${chevron()}
					</summary>
					<div class="interp-body">
						${rows
							.filter(([, text]) => text)
							.map(
								([code, text]) =>
									html`<p class="interp-line"><span class="code">${code}</span>${text}</p>`,
							)}
					</div>
				</details>`;
			})}
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-astrocartography-map': RoxyAstrocartographyMap;
	}
}
