import type { TemplateResult } from 'lit';
import { nothing, svg } from 'lit';
import { PLANET_ABBR, SIGN_ABBR, SIGNS_ORDER } from '../tokens/index.js';
import { longitudeToSignPosition } from './degree.js';
import { capitalize } from './string.js';
import { renderTablist } from './tablist.js';

/**
 * Canonical viewBox geometry for every kundli style. The chart is drawn into a
 * 360-unit square centred in a 400-unit viewBox, leaving a 20-unit gutter for
 * outer labels. All coordinates below are derived from these constants; change
 * them and every cell relocates correctly.
 *
 * @remarks SVG is vector-only and scales without raster loss, so the chart
 * remains crisp from a phone screen to a wall projector. Hosts size the chart
 * by setting `width` on the surrounding container; the SVG keeps a 1:1 aspect
 * ratio via the viewBox.
 */
const VIEW_BOX = 400;
const MARGIN = 20;
const INNER = VIEW_BOX - 2 * MARGIN; // 360
const CENTRE = VIEW_BOX / 2; // 200

/**
 * Lowercase rashi key (`"aries"`) to canonical title-cased sign name (`"Aries"`).
 * Bridges API lowercase rashi strings to the SIGNS_ORDER tokens used everywhere
 * else in the render.
 */
const RASHI_TO_SIGN: Record<string, string> = Object.fromEntries(
	SIGNS_ORDER.map((s) => [s.toLowerCase(), s] as const),
);

/**
 * A graha placed inside a kundli cell. Render-only view model fed from a
 * `meta` map on the API response. Carries enough detail to draw a compact
 * in-cell label (abbreviation, whole degree, retrograde mark) and a rich SVG
 * `<title>` tooltip (exact position, nakshatra, pada, avastha).
 */
export interface PlacedGraha {
	graha: string;
	longitude?: number;
	nakshatra?: { name?: string; pada?: number; lord?: string };
	isRetrograde?: boolean;
	awastha?: string;
}

/**
 * Unified view model used by every kundli style. Caller passes a graha-keyed
 * `meta` map (from `/vedic-astrology/birth-chart`, `/divisional-chart`, or
 * `/navamsa`) through {@link toKundliViewModel} to produce this shape.
 *
 * `placements` is keyed by lowercase rashi name (`"aries"`, `"taurus"`, ...)
 * so the sign-fixed styles can index directly. The Lagna entry is not
 * counted as a planet; it only flags the ascendant cell.
 */
export interface KundliViewModel {
	lagnaSign: string;
	placements: Record<string, PlacedGraha[]>;
	divisionLabel?: string;
}

/**
 * Kundli regional styles. Sign-fixed (south, east) and house-fixed (north).
 * Exposed so consumers can type their own `chart-style` attribute reflection.
 */
export type ChartStyle = 'south' | 'north' | 'east';

const CHART_STYLES: ReadonlyArray<{ id: ChartStyle; label: string }> = [
	{ id: 'north', label: 'North' },
	{ id: 'south', label: 'South' },
	{ id: 'east', label: 'East' },
];

const RETRO_MARK = 'ʳ';

/**
 * True when the placed graha's longitude maps to a sign other than the cell
 * it occupies. The API preserves the D1 sidereal longitude on every chart, so
 * inside a D2..D60 cell that longitude refers to the D1 sign, not the cell's
 * divisional sign. In that case the degree-within-sign is not meaningful and
 * must be hidden from the in-cell label.
 */
function isDivisionalPlacement(p: PlacedGraha, cellSign: string): boolean {
	if (typeof p.longitude !== 'number' || !Number.isFinite(p.longitude)) {
		return false;
	}
	return (
		longitudeToSignPosition(p.longitude).sign.toLowerCase() !==
		cellSign.toLowerCase()
	);
}

/**
 * Compact in-cell graha label: abbreviation, optional whole-degree, retrograde
 * mark. The degree is shown only when the longitude actually maps to the cell
 * the graha is rendered in (the D1 case); divisional placements show the
 * abbreviation alone since the API longitude refers to D1, not the divisional
 * sign.
 */
function grahaLabel(p: PlacedGraha, cellSign: string): string {
	const abbr = PLANET_ABBR[capitalize(p.graha)] ?? p.graha.slice(0, 2);
	const retro = p.isRetrograde ? RETRO_MARK : '';
	if (
		typeof p.longitude !== 'number' ||
		!Number.isFinite(p.longitude) ||
		isDivisionalPlacement(p, cellSign)
	) {
		return `${abbr}${retro}`;
	}
	const { degree } = longitudeToSignPosition(p.longitude);
	return `${abbr} ${degree}°${retro}`;
}

/**
 * Full-detail tooltip surfaced via the SVG `<title>` for each planet label.
 * Includes planet name, the divisional placement (when the longitude does not
 * match the cell, the cell's rashi is preferred), the exact D1 longitude as
 * the original reference, nakshatra and pada, avastha, and the retrograde
 * flag. Surfaces on hover or long-press without crowding the cell.
 */
function grahaTitle(p: PlacedGraha, cellSign: string): string {
	const parts: string[] = [capitalize(p.graha)];
	const divisional = isDivisionalPlacement(p, cellSign);
	if (divisional) {
		parts.push(`in ${cellSign}`);
	}
	if (typeof p.longitude === 'number' && Number.isFinite(p.longitude)) {
		const sp = longitudeToSignPosition(p.longitude);
		const minute = String(sp.minute).padStart(2, '0');
		parts.push(
			divisional
				? `D1: ${sp.degree}°${minute}' ${sp.sign}`
				: `${sp.degree}°${minute}' ${sp.sign}`,
		);
	}
	if (p.nakshatra?.name) {
		const pada = p.nakshatra.pada ? ` pada ${p.nakshatra.pada}` : '';
		parts.push(`${p.nakshatra.name}${pada}`);
	}
	if (p.awastha) parts.push(p.awastha);
	if (p.isRetrograde) parts.push('retrograde');
	return parts.join(' · ');
}

/**
 * Render a vertically centred stack of planet labels at `(cx, baseY)`, one
 * line per planet, with an SVG `<title>` per line carrying the full tooltip.
 * The stack auto-centres on `baseY` regardless of count so a 1-planet cell
 * and a 5-planet cell both look intentional.
 */
function renderPlanetStack(
	planets: PlacedGraha[],
	cellSign: string,
	cx: number,
	baseY: number,
	lineHeight: number,
): TemplateResult[] {
	const startY = baseY - ((planets.length - 1) * lineHeight) / 2;
	return planets.map((p, j) => {
		const yPos = startY + j * lineHeight;
		return svg`<text class="planet-text" x=${cx} y=${yPos} text-anchor="middle" dominant-baseline="central">${grahaLabel(
			p,
			cellSign,
		)}<title>${grahaTitle(p, cellSign)}</title></text>`;
	});
}

/**
 * Bucket a graha-keyed `meta` map (D1 birth chart or D2..D60 divisional
 * chart) into the unified {@link KundliViewModel} the renderer consumes. The
 * Lagna entry is recognised by `graha === 'Lagna'` (or key `"Lagna"`) and
 * sets `lagnaSign`; it is not bucketed as a placed planet.
 *
 * @param meta - Graha-keyed map; missing rashi entries are skipped.
 * @param divisionLabel - Optional title written inside the chart centre.
 * @param lagnaOverride - Optional rashi/sign name (case-insensitive, e.g. `"cancer"`) that replaces the `meta.Lagna`-derived ascendant. Drives the Chandra Lagna (Moon-as-ascendant) and other reference-point views: the `meta` of a `/birth-chart` response always carries the Janma Lagna as its `Lagna` key, so this is the only way to pivot the houses without a second request. Ignored when it does not resolve to a known sign.
 */
export function toKundliViewModel(
	meta: Record<
		string,
		{
			graha?: string;
			rashi?: string;
			longitude?: number;
			nakshatra?: { name?: string; pada?: number; lord?: string };
			isRetrograde?: boolean;
			awastha?: string;
		}
	>,
	divisionLabel?: string,
	lagnaOverride?: string,
): KundliViewModel {
	const placements: Record<string, PlacedGraha[]> = {};
	for (const sign of SIGNS_ORDER) placements[sign.toLowerCase()] = [];
	const override = lagnaOverride
		? (RASHI_TO_SIGN[lagnaOverride.toLowerCase()] ?? '')
		: '';
	let lagnaSign = override;
	for (const [name, pos] of Object.entries(meta ?? {})) {
		const rashiKey = (pos?.rashi ?? '').toLowerCase();
		if (name === 'Lagna' || pos?.graha === 'Lagna') {
			// An explicit override pins the ascendant; otherwise the Janma Lagna
			// from meta is the reference point.
			if (!override) lagnaSign = RASHI_TO_SIGN[rashiKey] ?? '';
			continue;
		}
		if (!rashiKey || !(rashiKey in placements)) continue;
		placements[rashiKey]?.push({
			graha: pos.graha ?? name,
			longitude: pos.longitude,
			nakshatra: pos.nakshatra,
			isRetrograde: pos.isRetrograde,
			awastha: pos.awastha,
		});
	}
	return { lagnaSign, placements, divisionLabel };
}

// ---------------------------------------------------------------------------
// South Indian: 4x4 grid with central 2x2 hollow. Signs are FIXED to cells
// (Pisces top-left corner, clockwise); houses rotate from the Lagna cell.
// ---------------------------------------------------------------------------

const SOUTH_CELL = INNER / 4; // 90

/**
 * Sign-to-cell column/row in the South Indian fixed-sign grid. Pisces sits in
 * the top-left corner and the remaining signs proceed clockwise around the
 * 12 perimeter cells. (col, row) origin is the chart top-left.
 */
const SOUTH_CELL_GRID: Record<string, { col: number; row: number }> = {
	Pisces: { col: 0, row: 0 },
	Aries: { col: 1, row: 0 },
	Taurus: { col: 2, row: 0 },
	Gemini: { col: 3, row: 0 },
	Cancer: { col: 3, row: 1 },
	Leo: { col: 3, row: 2 },
	Virgo: { col: 3, row: 3 },
	Libra: { col: 2, row: 3 },
	Scorpio: { col: 1, row: 3 },
	Sagittarius: { col: 0, row: 3 },
	Capricorn: { col: 0, row: 2 },
	Aquarius: { col: 0, row: 1 },
};

function southCellRect(sign: string): {
	x: number;
	y: number;
	w: number;
	h: number;
} {
	const g = SOUTH_CELL_GRID[sign] ?? { col: 0, row: 0 };
	return {
		x: MARGIN + g.col * SOUTH_CELL,
		y: MARGIN + g.row * SOUTH_CELL,
		w: SOUTH_CELL,
		h: SOUTH_CELL,
	};
}

/**
 * South Indian frame: outer square, the two full-span grid lines, and the
 * partial inner lines that bound the central 2x2 hollow on each edge.
 */
function renderSouthFrame(divisionLabel?: string): TemplateResult {
	const a = MARGIN;
	const b = MARGIN + SOUTH_CELL; // 110
	const c = MARGIN + 2 * SOUTH_CELL; // 200
	const d = MARGIN + 3 * SOUTH_CELL; // 290
	const e = VIEW_BOX - MARGIN; // 380
	return svg`
		<rect class="line" x=${a} y=${a} width=${INNER} height=${INNER} stroke-width="1.5" fill="none" />
		<line class="line" x1=${a} y1=${b} x2=${e} y2=${b} stroke-width="1" />
		<line class="line" x1=${a} y1=${d} x2=${e} y2=${d} stroke-width="1" />
		<line class="line" x1=${b} y1=${a} x2=${b} y2=${e} stroke-width="1" />
		<line class="line" x1=${d} y1=${a} x2=${d} y2=${e} stroke-width="1" />
		<line class="line" x1=${a} y1=${c} x2=${b} y2=${c} stroke-width="1" />
		<line class="line" x1=${d} y1=${c} x2=${e} y2=${c} stroke-width="1" />
		<line class="line" x1=${c} y1=${a} x2=${c} y2=${b} stroke-width="1" />
		<line class="line" x1=${c} y1=${d} x2=${c} y2=${e} stroke-width="1" />
		${
			divisionLabel
				? svg`<text class="centre-label" x=${CENTRE} y=${CENTRE} text-anchor="middle" dominant-baseline="central">${divisionLabel}</text>`
				: nothing
		}
	`;
}

/**
 * House number for a given sign relative to a Lagna sign. House 1 is the
 * Lagna cell; subsequent houses follow the zodiac in order. Returns 0 when
 * the Lagna sign is unknown so the caller can skip rendering the badge.
 */
function houseNumberInSign(sign: string, lagnaSign: string): number {
	const lagnaIdx = SIGNS_ORDER.findIndex((s) => s === lagnaSign);
	const signIdx = SIGNS_ORDER.findIndex((s) => s === sign);
	if (lagnaIdx === -1 || signIdx === -1) return 0;
	return ((signIdx - lagnaIdx + 12) % 12) + 1;
}

function renderSouthCell(
	sign: string,
	planets: PlacedGraha[],
	isLagna: boolean,
	houseNum: number,
): TemplateResult {
	const r = southCellRect(sign);
	const cx = r.x + r.w / 2;
	const cy = r.y + r.h / 2;
	const signAbbr = SIGN_ABBR[sign] ?? sign.slice(0, 2);
	// Inset the Lagna diagonal so it does not collide with the chart frame on
	// corner cells (Pisces, Gemini, Virgo, Sagittarius) or with the sign label
	// in the top-left of every cell.
	const slashInset = 14;
	return svg`
		<g class=${isLagna ? 'cell lagna' : 'cell'}>
			${
				isLagna
					? svg`
						<rect class="lagna-bg" x=${r.x} y=${r.y} width=${r.w} height=${r.h} />
						<line class="lagna-slash" x1=${r.x + r.w - slashInset} y1=${r.y + slashInset} x2=${r.x + slashInset} y2=${r.y + r.h - slashInset} stroke-width="1.2" />
					`
					: nothing
			}
			<text class="sign-text" x=${r.x + 6} y=${r.y + 12} text-anchor="start" dominant-baseline="central">${signAbbr}</text>
			${
				houseNum > 0
					? svg`<text class="house-num" x=${r.x + r.w - 6} y=${r.y + 12} text-anchor="end" dominant-baseline="central">${houseNum}</text>`
					: nothing
			}
			${
				isLagna
					? svg`<text class="lagna-marker" x=${cx} y=${r.y + 26} text-anchor="middle" dominant-baseline="central">Asc</text>`
					: nothing
			}
			${planets.length ? renderPlanetStack(planets, sign, cx, cy + 4, 14) : nothing}
		</g>
	`;
}

function renderSouthSvg(vm: KundliViewModel): TemplateResult {
	const lagnaKey = vm.lagnaSign.toLowerCase();
	return svg`
		${renderSouthFrame(vm.divisionLabel)}
		${SIGNS_ORDER.map((sign) =>
			renderSouthCell(
				sign,
				vm.placements[sign.toLowerCase()] ?? [],
				sign.toLowerCase() === lagnaKey,
				houseNumberInSign(sign, vm.lagnaSign),
			),
		)}
	`;
}

// ---------------------------------------------------------------------------
// North Indian: outer square + inscribed midpoint diamond + both outer
// diagonals. 12 cells: 4 cardinal diamonds + 8 corner triangles. Houses are
// FIXED (H1 always top-centre); signs rotate from the Lagna sign.
// ---------------------------------------------------------------------------

const NORTH_VERTICES = {
	tl: { x: MARGIN, y: MARGIN },
	tr: { x: VIEW_BOX - MARGIN, y: MARGIN },
	br: { x: VIEW_BOX - MARGIN, y: VIEW_BOX - MARGIN },
	bl: { x: MARGIN, y: VIEW_BOX - MARGIN },
	top: { x: CENTRE, y: MARGIN },
	right: { x: VIEW_BOX - MARGIN, y: CENTRE },
	bottom: { x: CENTRE, y: VIEW_BOX - MARGIN },
	left: { x: MARGIN, y: CENTRE },
	tlMid: { x: CENTRE - INNER / 4, y: CENTRE - INNER / 4 },
	trMid: { x: CENTRE + INNER / 4, y: CENTRE - INNER / 4 },
	brMid: { x: CENTRE + INNER / 4, y: CENTRE + INNER / 4 },
	blMid: { x: CENTRE - INNER / 4, y: CENTRE + INNER / 4 },
} as const;

/**
 * Centroid (geometric mean) of an arbitrary set of polygon vertices. Used by
 * every cell that needs a label-anchor point; defining it once keeps the
 * North diamond and East triangle math identical.
 */
function centroidOf(pts: Array<{ x: number; y: number }>): {
	x: number;
	y: number;
} {
	const x = pts.reduce((s, p) => s + p.x, 0) / pts.length;
	const y = pts.reduce((s, p) => s + p.y, 0) / pts.length;
	return { x, y };
}

/**
 * House centres for the North Indian diamond. Numbered 1..12 counter-clockwise
 * from the top diamond (H1 is always the ascendant cell). Centroids derived
 * from the canonical geometry above; do not edit by eye, recompute if you
 * change `VIEW_BOX` or `MARGIN`.
 */
const NORTH_HOUSE_CENTERS: Record<number, { x: number; y: number }> = {
	1: { x: CENTRE, y: NORTH_VERTICES.tlMid.y },
	2: centroidOf([NORTH_VERTICES.tl, NORTH_VERTICES.top, NORTH_VERTICES.tlMid]),
	3: centroidOf([NORTH_VERTICES.tl, NORTH_VERTICES.left, NORTH_VERTICES.tlMid]),
	4: { x: NORTH_VERTICES.tlMid.x, y: CENTRE },
	5: centroidOf([NORTH_VERTICES.bl, NORTH_VERTICES.left, NORTH_VERTICES.blMid]),
	6: centroidOf([
		NORTH_VERTICES.bl,
		NORTH_VERTICES.bottom,
		NORTH_VERTICES.blMid,
	]),
	7: { x: CENTRE, y: NORTH_VERTICES.blMid.y },
	8: centroidOf([
		NORTH_VERTICES.br,
		NORTH_VERTICES.bottom,
		NORTH_VERTICES.brMid,
	]),
	9: centroidOf([
		NORTH_VERTICES.br,
		NORTH_VERTICES.right,
		NORTH_VERTICES.brMid,
	]),
	10: { x: NORTH_VERTICES.brMid.x, y: CENTRE },
	11: centroidOf([
		NORTH_VERTICES.tr,
		NORTH_VERTICES.right,
		NORTH_VERTICES.trMid,
	]),
	12: centroidOf([NORTH_VERTICES.tr, NORTH_VERTICES.top, NORTH_VERTICES.trMid]),
};

/**
 * Rashi number (1..12, Aries=1) occupying the given house when the Lagna sits
 * in `lagnaSign`. House 1 is the Lagna sign; subsequent houses follow the
 * zodiac in order.
 */
function rashiInHouse(houseNum: number, lagnaSign: string): number {
	const lagnaIdx = SIGNS_ORDER.findIndex((s) => s === lagnaSign);
	if (lagnaIdx === -1) return houseNum;
	return ((lagnaIdx + houseNum - 1) % 12) + 1;
}

function renderNorthFrame(divisionLabel?: string): TemplateResult {
	const { tl, tr, br, bl, top, right, bottom, left } = NORTH_VERTICES;
	return svg`
		<rect class="line" x=${tl.x} y=${tl.y} width=${INNER} height=${INNER} stroke-width="1.5" fill="none" />
		<polygon class="line" points="${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}" stroke-width="1" fill="none" />
		<line class="line" x1=${tl.x} y1=${tl.y} x2=${br.x} y2=${br.y} stroke-width="1" />
		<line class="line" x1=${tr.x} y1=${tr.y} x2=${bl.x} y2=${bl.y} stroke-width="1" />
		${
			divisionLabel
				? svg`<text class="centre-label" x=${CENTRE} y=${CENTRE} text-anchor="middle" dominant-baseline="central">${divisionLabel}</text>`
				: nothing
		}
	`;
}

function renderNorthCell(
	houseNum: number,
	rashiNum: number,
	sign: string,
	planets: PlacedGraha[],
	isLagna: boolean,
): TemplateResult {
	const c = NORTH_HOUSE_CENTERS[houseNum];
	if (!c) return svg``;
	// Tight cells (H2/3/5/6/8/9/11/12 corner triangles) clip the rasi number
	// when it sits too high above the centroid. Clamp the upward offset based
	// on the cell's distance from the chart vertical centre so the label
	// always stays comfortably inside its triangle or diamond.
	const rashiOffsetY = Math.min(14, Math.abs(c.y - CENTRE) * 0.45 + 6);
	const ascOffsetY = rashiOffsetY + 12;
	// North cells carry only a rasi number by convention. The ascendant also
	// names its sign so the reader can see which sign rises without translating
	// the number; other cells stay number-only.
	const rashiLabel = isLagna
		? `${rashiNum} · ${SIGN_ABBR[sign] ?? sign.slice(0, 2)}`
		: `${rashiNum}`;
	return svg`
		<g class=${isLagna ? 'cell lagna' : 'cell'}>
			<text class="rashi-num" x=${c.x} y=${c.y - rashiOffsetY} text-anchor="middle" dominant-baseline="central">${rashiLabel}</text>
			${
				isLagna
					? svg`<text class="lagna-marker" x=${c.x} y=${c.y - ascOffsetY} text-anchor="middle" dominant-baseline="central">Asc</text>`
					: nothing
			}
			${planets.length ? renderPlanetStack(planets, sign, c.x, c.y + 8, 12) : nothing}
		</g>
	`;
}

function renderNorthSvg(vm: KundliViewModel): TemplateResult {
	const lagnaSign = vm.lagnaSign || 'Aries';
	return svg`
		${renderNorthFrame(vm.divisionLabel)}
		${Array.from({ length: 12 }, (_, i) => {
			const houseNum = i + 1;
			const rashiNum = rashiInHouse(houseNum, lagnaSign);
			const sign = SIGNS_ORDER[rashiNum - 1] ?? 'Aries';
			return renderNorthCell(
				houseNum,
				rashiNum,
				sign,
				vm.placements[sign.toLowerCase()] ?? [],
				houseNum === 1,
			);
		})}
	`;
}

// ---------------------------------------------------------------------------
// East Indian (Bengali / Maithili): 3x3 underlying grid, 4 edge rectangles +
// 4 corner cells each split by a diagonal from the outer chart corner to the
// inner corner of the centre cell. Aries fixed top-centre; signs proceed
// counter-clockwise. Houses rotate from the Lagna.
// ---------------------------------------------------------------------------

const EAST_CELL = INNER / 3; // 120

interface EastCell {
	/** Vertices of the cell polygon, in viewBox units. */
	points: Array<{ x: number; y: number }>;
	/** Visual centroid for label placement. */
	centroid: { x: number; y: number };
}

function eastCells(): Record<string, EastCell> {
	const a = MARGIN; // 20
	const b = MARGIN + EAST_CELL; // 140
	const c = MARGIN + 2 * EAST_CELL; // 260
	const d = VIEW_BOX - MARGIN; // 380
	const aries = [
		{ x: b, y: a },
		{ x: c, y: a },
		{ x: c, y: b },
		{ x: b, y: b },
	];
	const cancer = [
		{ x: a, y: b },
		{ x: b, y: b },
		{ x: b, y: c },
		{ x: a, y: c },
	];
	const libra = [
		{ x: b, y: c },
		{ x: c, y: c },
		{ x: c, y: d },
		{ x: b, y: d },
	];
	const capricorn = [
		{ x: c, y: b },
		{ x: d, y: b },
		{ x: d, y: c },
		{ x: c, y: c },
	];
	const taurus = [
		{ x: a, y: a },
		{ x: b, y: a },
		{ x: b, y: b },
	];
	const gemini = [
		{ x: a, y: a },
		{ x: b, y: b },
		{ x: a, y: b },
	];
	const leo = [
		{ x: a, y: c },
		{ x: b, y: c },
		{ x: a, y: d },
	];
	const virgo = [
		{ x: b, y: c },
		{ x: b, y: d },
		{ x: a, y: d },
	];
	const scorpio = [
		{ x: c, y: c },
		{ x: c, y: d },
		{ x: d, y: d },
	];
	const sagittarius = [
		{ x: c, y: c },
		{ x: d, y: d },
		{ x: d, y: c },
	];
	const aquarius = [
		{ x: d, y: a },
		{ x: d, y: b },
		{ x: c, y: b },
	];
	const pisces = [
		{ x: c, y: a },
		{ x: d, y: a },
		{ x: c, y: b },
	];
	const polys = {
		Aries: aries,
		Taurus: taurus,
		Gemini: gemini,
		Cancer: cancer,
		Leo: leo,
		Virgo: virgo,
		Libra: libra,
		Scorpio: scorpio,
		Sagittarius: sagittarius,
		Capricorn: capricorn,
		Aquarius: aquarius,
		Pisces: pisces,
	} as const;
	const out: Record<string, EastCell> = {};
	for (const [sign, points] of Object.entries(polys)) {
		out[sign] = { points: [...points], centroid: centroidOf(points) };
	}
	return out;
}

const EAST_CELLS = eastCells();

function renderEastFrame(divisionLabel?: string): TemplateResult {
	const a = MARGIN;
	const b = MARGIN + EAST_CELL;
	const c = MARGIN + 2 * EAST_CELL;
	const d = VIEW_BOX - MARGIN;
	return svg`
		<rect class="line" x=${a} y=${a} width=${INNER} height=${INNER} stroke-width="1.5" fill="none" />
		<line class="line" x1=${a} y1=${b} x2=${b} y2=${b} stroke-width="1" />
		<line class="line" x1=${c} y1=${b} x2=${d} y2=${b} stroke-width="1" />
		<line class="line" x1=${a} y1=${c} x2=${b} y2=${c} stroke-width="1" />
		<line class="line" x1=${c} y1=${c} x2=${d} y2=${c} stroke-width="1" />
		<line class="line" x1=${b} y1=${a} x2=${b} y2=${b} stroke-width="1" />
		<line class="line" x1=${b} y1=${c} x2=${b} y2=${d} stroke-width="1" />
		<line class="line" x1=${c} y1=${a} x2=${c} y2=${b} stroke-width="1" />
		<line class="line" x1=${c} y1=${c} x2=${c} y2=${d} stroke-width="1" />
		<line class="line" x1=${a} y1=${a} x2=${b} y2=${b} stroke-width="1" />
		<line class="line" x1=${d} y1=${a} x2=${c} y2=${b} stroke-width="1" />
		<line class="line" x1=${d} y1=${d} x2=${c} y2=${c} stroke-width="1" />
		<line class="line" x1=${a} y1=${d} x2=${b} y2=${c} stroke-width="1" />
		${
			divisionLabel
				? svg`<text class="centre-label" x=${CENTRE} y=${CENTRE} text-anchor="middle" dominant-baseline="central">${divisionLabel}</text>`
				: nothing
		}
	`;
}

function renderEastCell(
	sign: string,
	planets: PlacedGraha[],
	isLagna: boolean,
	houseNum: number,
): TemplateResult {
	const cell = EAST_CELLS[sign];
	if (!cell) return svg``;
	const { centroid: cen, points } = cell;
	const signAbbr = SIGN_ABBR[sign] ?? sign.slice(0, 2);
	const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');
	return svg`
		<g class=${isLagna ? 'cell lagna' : 'cell'}>
			${
				isLagna
					? svg`<polygon class="lagna-bg" points=${polyPoints} />`
					: nothing
			}
			<text class="sign-text" x=${cen.x} y=${cen.y - 16} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>
			${
				houseNum > 0
					? svg`<text class="house-num" x=${cen.x + 18} y=${cen.y - 16} text-anchor="start" dominant-baseline="central">${houseNum}</text>`
					: nothing
			}
			${
				isLagna
					? svg`<text class="lagna-marker" x=${cen.x} y=${cen.y - 30} text-anchor="middle" dominant-baseline="central">Asc</text>`
					: nothing
			}
			${planets.length ? renderPlanetStack(planets, sign, cen.x, cen.y + 4, 12) : nothing}
		</g>
	`;
}

function renderEastSvg(vm: KundliViewModel): TemplateResult {
	const lagnaKey = vm.lagnaSign.toLowerCase();
	return svg`
		${renderEastFrame(vm.divisionLabel)}
		${SIGNS_ORDER.map((sign) =>
			renderEastCell(
				sign,
				vm.placements[sign.toLowerCase()] ?? [],
				sign.toLowerCase() === lagnaKey,
				houseNumberInSign(sign, vm.lagnaSign),
			),
		)}
	`;
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

/**
 * Render the kundli body for the requested style. Returns the SVG inner
 * content; the caller wraps it in an `<svg>` element with the canonical
 * viewBox `0 0 400 400` and applies its own theming CSS.
 */
export function renderKundliSvg(
	vm: KundliViewModel,
	style: ChartStyle,
): TemplateResult {
	switch (style) {
		case 'north':
			return renderNorthSvg(vm);
		case 'east':
			return renderEastSvg(vm);
		default:
			return renderSouthSvg(vm);
	}
}

/**
 * Render a WAI-ARIA-compliant tablist that lets the end user switch between
 * South / North / East kundli styles at runtime. The hosting component owns
 * the `chartStyle` state; this helper renders the buttons and wires the
 * arrow-key navigation plus click handler.
 *
 * @param active - The currently selected style.
 * @param setStyle - Callback the host component uses to update its state.
 */
export function renderKundliStyleTablist(
	active: ChartStyle,
	setStyle: (next: ChartStyle) => void,
): TemplateResult {
	return renderTablist({
		items: CHART_STYLES,
		active,
		onSelect: setStyle,
		label: 'Kundli style',
		idPrefix: 'kundli',
	});
}
