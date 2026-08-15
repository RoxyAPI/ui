import type { TemplateResult } from 'lit';
import { nothing, svg } from 'lit';

/**
 * Fixed geometry and renderer for the Human Design bodygraph. The diagram is a
 * standard, invariant layout: nine centers in canonical positions and shapes,
 * wired by 36 channels that each join two gates, with all 64 gates at fixed
 * points inside their center, all overlaid on a front-facing human silhouette so
 * each center lands on the body part it governs. Only which centers are defined
 * and which gates are activated changes per chart, so this module holds the
 * geometry and the `RoxyBodygraph` component supplies the live state from the
 * /human-design/bodygraph response.
 *
 * @remarks
 * Points are authored in a normalized 0 to 100 grid (x left to right, y top to
 * bottom) and mapped into {@link BODYGRAPH_VIEWBOX} by {@link g}, so the chart and
 * the silhouette share one coordinate space. The viewBox window is tight to the
 * drawing rather than square, because the chart is far taller than it is wide and
 * every unused grid unit costs gate-number size.
 *
 * Center shapes hold the canonical orientations: Head triangle up, Ajna triangle
 * down, Throat and Sacral and Root squares, G diamond, Spleen triangle with its
 * base on the left edge and apex pointing right, Solar Plexus its mirror, and the
 * Heart low and right of the G, pointing UP, with 21 at the apex, 51 on the upper
 * left edge, and 26 and 40 as the two lower corners where the channels to the
 * Spleen and the Solar Plexus leave.
 *
 * `tests/bodygraph.test.ts` holds the layout to that: mirror symmetry across the
 * two side centers, every other center balanced on {@link AXIS} bar the Heart,
 * each gate circle inside its own center, no two circles overlapping, and the row
 * and column order within each center.
 */

export type BodygraphCenterId =
	| 'head'
	| 'ajna'
	| 'throat'
	| 'g'
	| 'heart'
	| 'sacral'
	| 'solar-plexus'
	| 'spleen'
	| 'root';

interface Point {
	x: number;
	y: number;
}

/** Which side of the chart activated a gate. A gate can carry both, and its circle is then split rather than forced to one. */
export interface GateSides {
	personality: boolean;
	design: boolean;
}

/** One center's drawable geometry, plus the English fallback name for its accessible title when the response carries none. */
interface CenterGeometry {
	id: BodygraphCenterId;
	label: string;
	color: CenterColor;
	points: Point[];
}

/**
 * Traditional Human Design center color group. A defined center is filled with
 * this semantic color (constant across light and dark, like chart data colors);
 * an open center takes the card surface and an outline, so the wiring passes
 * behind it and it still reads as a center. The four groups are: gold for the identity and
 * inspiration centers (Head, G), green for the mental awareness center (Ajna),
 * red for the life-force motors of will and vitality (Heart, Sacral), brown for
 * the pressure, expression, and remaining awareness centers (Throat, Spleen,
 * Solar Plexus, Root).
 */
export type CenterColor = 'gold' | 'green' | 'red' | 'brown';

/**
 * The grid window the viewBox covers: wide enough for the silhouette shoulders
 * (the centers span 18.3 to 81.9) and tall enough for the crown and the hem, with
 * nothing to spare, since margin here is width the gate numbers do not get. Kept
 * symmetric about {@link AXIS} so {@link CHART_AXIS_X} is exactly half the viewBox.
 */
const X_MIN = 14;
const X_MAX = 86;
const Y_MIN = -4;
const Y_MAX = 102;
/** Grid units to viewBox units. One number sets the resolution of every coordinate below. */
const UNIT = 6;
const VIEW_W = (X_MAX - X_MIN) * UNIT;
const VIEW_H = (Y_MAX - Y_MIN) * UNIT;

/** Map a normalized grid point into viewBox units. */
function g(x: number, y: number): Point {
	return { x: (x - X_MIN) * UNIT, y: (y - Y_MIN) * UNIT };
}

/** Chart horizontal center, the axis of symmetry for the body and the side centers. */
const AXIS = 50;

/** Reflect a normalized grid x across {@link AXIS}. */
const mirrorX = (x: number): number => 2 * AXIS - x;

/**
 * Gate circle radius and number size, in grid units. The radius is bounded by the
 * closest pair of gates on the chart (Throat 12 and 45, 2.3 grid units apart) and
 * the number by fitting two digits inside that circle. Exported so the stylesheet
 * and the overlap test read the geometry rather than restating it.
 */
export const GATE_RADIUS = 1.02 * UNIT;
export const GATE_FONT_SIZE = 1.35 * UNIT;

/**
 * The three x offsets from {@link AXIS} that every central-column gate sits on.
 * {@link COL} is the inner column shared by the Head, Ajna, Throat and Sacral and
 * Root triples and the G's 7/13 and 15/46 pairs; {@link EDGE} is the outer column
 * of the three square centers; {@link G_EDGE} is the wider pair the G diamond
 * carries at its waist. Named so the columns cannot drift apart one edit at a time.
 */
const COL = 2.87;
const EDGE = 4.4;
const G_EDGE = 5.65;

/**
 * Gate positions authored per center in the normalized grid, before the mapping
 * through {@link g}. Symmetry is structural, not hand-typed: every center on the
 * central column is authored as an offset from {@link AXIS}; the Spleen is
 * authored once on the left torso and the Solar Plexus is derived as its exact
 * mirror in {@link buildGatePoints}, so the two side centers can never drift out
 * of alignment. Within each center the gates follow the canonical reading order
 * so the numbers print where a printed chart shows them.
 *
 * @remarks Solar Plexus is intentionally empty here and filled by reflecting
 * Spleen; {@link SPLEEN_TO_SOLAR_PLEXUS} pairs each Spleen gate with the Solar
 * Plexus gate at its mirror position (base-top to base-top, apex to apex).
 */
const GATES_BY_CENTER: Record<
	BodygraphCenterId,
	Record<number, [number, number]>
> = {
	head: { 64: [AXIS - COL, 11.2], 61: [AXIS, 11.2], 63: [AXIS + COL, 11.2] },
	ajna: {
		47: [AXIS - COL, 18.0],
		24: [AXIS, 18.0],
		4: [AXIS + COL, 18.0],
		17: [AXIS - COL, 20.6],
		11: [AXIS + COL, 20.6],
		43: [AXIS, 25.3],
	},
	throat: {
		62: [AXIS - COL, 32.4],
		23: [AXIS, 32.4],
		56: [AXIS + COL, 32.4],
		16: [AXIS - EDGE, 34.7],
		35: [AXIS + EDGE, 34.7],
		20: [AXIS - EDGE, 37.3],
		12: [AXIS + EDGE, 37.3],
		45: [AXIS + EDGE, 39.6],
		31: [AXIS - COL, 41.9],
		8: [AXIS, 41.9],
		33: [AXIS + COL, 41.9],
	},
	g: {
		1: [AXIS, 47.7],
		7: [AXIS - COL, 50.3],
		13: [AXIS + COL, 50.3],
		10: [AXIS - G_EDGE, 53.4],
		25: [AXIS + G_EDGE, 53.4],
		15: [AXIS - COL, 56.8],
		46: [AXIS + COL, 56.8],
		2: [AXIS, 59.2],
	},
	heart: {
		21: [63.9, 59.5],
		51: [62.1, 61.3],
		26: [60.1, 63.3],
		40: [66.6, 63.3],
	},
	spleen: {
		48: [20.0, 70.8],
		57: [22.5, 72.4],
		44: [25.0, 73.8],
		50: [27.7, 75.3],
		32: [25.0, 76.6],
		28: [22.5, 78.0],
		18: [20.0, 79.5],
	},
	sacral: {
		5: [AXIS - COL, 72.7],
		14: [AXIS, 72.7],
		29: [AXIS + COL, 72.7],
		34: [AXIS - EDGE, 75.4],
		27: [AXIS - EDGE, 79.0],
		59: [AXIS + EDGE, 79.0],
		42: [AXIS - COL, 81.7],
		3: [AXIS, 81.7],
		9: [AXIS + COL, 81.7],
	},
	'solar-plexus': {},
	root: {
		53: [AXIS - COL, 90.2],
		60: [AXIS, 90.2],
		52: [AXIS + COL, 90.2],
		54: [AXIS - EDGE, 92.6],
		19: [AXIS + EDGE, 92.6],
		38: [AXIS - EDGE, 95.3],
		39: [AXIS + EDGE, 95.3],
		58: [AXIS - EDGE, 98.1],
		41: [AXIS + EDGE, 98.1],
	},
};

/** Spleen gate to the Solar Plexus gate at its mirror position (base-top, ..., apex, ..., base-bottom). */
const SPLEEN_TO_SOLAR_PLEXUS: Record<number, number> = {
	48: 36,
	57: 22,
	44: 37,
	50: 6,
	32: 49,
	28: 55,
	18: 30,
};

/**
 * Assemble the viewBox-space gate anchors and the gate to center index from
 * {@link GATES_BY_CENTER}, filling the Solar Plexus by reflecting the Spleen so
 * the two side centers are guaranteed mirror images.
 */
function buildGatePoints(): {
	points: Record<number, Point>;
	centerOf: Record<number, BodygraphCenterId>;
} {
	const points: Record<number, Point> = {};
	const centerOf: Record<number, BodygraphCenterId> = {};
	for (const [spleenGate, [x, y]] of Object.entries(GATES_BY_CENTER.spleen)) {
		GATES_BY_CENTER['solar-plexus'][
			SPLEEN_TO_SOLAR_PLEXUS[Number(spleenGate)]
		] = [mirrorX(x), y];
	}
	for (const [center, gates] of Object.entries(GATES_BY_CENTER) as Array<
		[BodygraphCenterId, Record<number, [number, number]>]
	>) {
		for (const [gate, [x, y]] of Object.entries(gates)) {
			points[Number(gate)] = g(x, y);
			centerOf[Number(gate)] = center;
		}
	}
	return { points, centerOf };
}

/**
 * The viewBox-space gate anchors ({@link GATE_POINTS}) and the gate to center
 * index ({@link GATE_CENTER}). Exported so the geometry tests can assert the
 * layout invariants (side-center mirror symmetry, central-column balance, gates
 * inside their centers, circles that never overlap) without rendering.
 */
export const { points: GATE_POINTS, centerOf: GATE_CENTER } = buildGatePoints();

/** Horizontal axis of symmetry in viewBox units, the reflection axis for geometry tests. */
export const CHART_AXIS_X = VIEW_W / 2;

/** Build a polygon from normalized grid corner pairs, mapping each through {@link g}. */
function shape(corners: ReadonlyArray<readonly [number, number]>): Point[] {
	return corners.map(([x, y]) => g(x, y));
}

/** A square center, centered on {@link AXIS}, spanning the given half-width and y range. */
function squareShape(halfWidth: number, top: number, bottom: number): Point[] {
	return shape([
		[AXIS - halfWidth, top],
		[AXIS + halfWidth, top],
		[AXIS + halfWidth, bottom],
		[AXIS - halfWidth, bottom],
	]);
}

/** Measured half-width of the three square centers (Throat, Sacral, Root), which share one width. */
const SQUARE_HALF = 5.9;

/** The Spleen triangle (base on the far-left edge, apex pointing right toward center). */
const SPLEEN_SHAPE: ReadonlyArray<readonly [number, number]> = [
	[18.3, 68.3],
	[18.3, 82.0],
	[30.3, 75.15],
];

/**
 * Center shapes in canonical orientation and color. Central-column centers are
 * built centered on {@link AXIS}; the Solar Plexus shape is the Spleen reflected
 * across the axis, so the side centers stay exact mirrors. The Heart is the
 * deliberate off-axis exception and points UP, not right.
 */
export const CENTER_GEOMETRY: readonly CenterGeometry[] = [
	{
		id: 'head',
		label: 'Head',
		color: 'gold',
		points: shape([
			[43.55, 12.5],
			[56.45, 12.5],
			[50.0, 1.7],
		]),
	},
	{
		id: 'ajna',
		label: 'Ajna',
		color: 'green',
		points: shape([
			[43.55, 16.5],
			[56.45, 16.5],
			[50.0, 27.7],
		]),
	},
	{
		id: 'throat',
		label: 'Throat',
		color: 'brown',
		points: squareShape(SQUARE_HALF, 31.0, 43.3),
	},
	{
		id: 'g',
		label: 'G',
		color: 'gold',
		points: shape([
			[50.0, 45.8],
			[57.7, 53.6],
			[50.0, 61.4],
			[42.3, 53.6],
		]),
	},
	{
		id: 'heart',
		label: 'Heart',
		color: 'red',
		points: shape([
			[56.65, 65.23],
			[64.2, 56.74],
			[69.75, 65.23],
		]),
	},
	{
		id: 'spleen',
		label: 'Spleen',
		color: 'brown',
		points: shape(SPLEEN_SHAPE),
	},
	{
		id: 'sacral',
		label: 'Sacral',
		color: 'red',
		points: squareShape(SQUARE_HALF, 71.3, 83.1),
	},
	{
		id: 'solar-plexus',
		label: 'Solar Plexus',
		color: 'brown',
		points: shape(
			SPLEEN_SHAPE.map(([x, y]) => [mirrorX(x), y] as [number, number]),
		),
	},
	{
		id: 'root',
		label: 'Root',
		color: 'brown',
		points: squareShape(SQUARE_HALF, 88.5, 99.8),
	},
];

/**
 * The 36 channels as ordered gate pairs. This is the canonical Human Design
 * channel set; a channel is active only when both of its gates are activated,
 * which the live response reports in its `channels` array. The static list lets
 * the renderer draw every channel as an inactive connector and overlay the
 * activated halves, so an open bodygraph still shows its full wiring skeleton.
 */
export const CHANNEL_PAIRS: ReadonlyArray<readonly [number, number]> = [
	[64, 47],
	[61, 24],
	[63, 4],
	[17, 62],
	[11, 56],
	[43, 23],
	[16, 48],
	[20, 34],
	[20, 10],
	[7, 31],
	[1, 8],
	[13, 33],
	[21, 45],
	[12, 22],
	[35, 36],
	[57, 20],
	[15, 5],
	[2, 14],
	[46, 29],
	[34, 10],
	[10, 57],
	[25, 51],
	[27, 50],
	[57, 34],
	[26, 44],
	[18, 58],
	[28, 38],
	[32, 54],
	[3, 60],
	[9, 52],
	[42, 53],
	[59, 6],
	[19, 49],
	[39, 55],
	[41, 30],
	[37, 40],
];

/**
 * Front-facing standing figure behind the chart, mirror-symmetric about {@link
 * AXIS} and authored in the same grid as the centers so the two scale together:
 * a rounded head holding the Head and Ajna, a short neck at the Throat, shoulders
 * sloping to arms whose span frames the Spleen and Solar Plexus, then hips ending
 * just below the Root. The right half is built from cubic beziers and reflected,
 * so the figure is exactly symmetric. Drawn first; the centers paint over it,
 * which is what makes an open center read as a cut-out rather than a tint.
 */
const BODY_PATH = buildBodyPath();

function buildBodyPath(): string {
	const m = mirrorX;
	// Right-side outline in grid units (x, y) from the crown down to the
	// pelvis-right corner: a start point, then triples of (ctrl1, ctrl2, end).
	const r: Array<[number, number]> = [
		[50, -3], // crown apex (start)
		[58, -3], // crown round (ctrl)
		[59, 8], // head side (ctrl)
		[56.5, 17], // brow, the head holds Head + Ajna (end)
		[56, 20], // cheek (ctrl)
		[53.5, 23.5], // jaw (ctrl)
		[51.5, 27], // neck right, narrowed to the Ajna apex (end)
		[54, 28], // neck base (ctrl)
		[64, 30], // trapezius slope (ctrl)
		[79, 35], // shoulder / deltoid, the widest point (end)
		[83, 42], // upper arm (ctrl)
		[84, 58], // outer arm, frames the side centers (ctrl)
		[83, 74], // arm past Spleen / Solar Plexus (end)
		[83, 86], // waist, held wide enough to contain the side-center bases (ctrl)
		[76, 93], // hip (ctrl)
		[68, 97], // hip (end)
		[64, 99], // toward the pelvis (ctrl)
		[62, 100.5], // pelvis (ctrl)
		[60, 100.5], // pelvis-right corner (end)
	];
	const segs: string[] = [`M ${pt(r[0])}`];
	// Walk the right side as cubic beziers, three points per segment.
	for (let i = 1; i + 2 < r.length; i += 3) {
		segs.push(`C ${pt(r[i])} ${pt(r[i + 1])} ${pt(r[i + 2])}`);
	}
	// Flat pelvis hem across to the mirrored corner.
	segs.push(`L ${ptm(r[r.length - 1], m)}`);
	// Mirror the right walk back up the left side to the crown.
	for (let i = r.length - 3; i >= 1; i -= 3) {
		segs.push(`C ${ptm(r[i + 1], m)} ${ptm(r[i], m)} ${ptm(r[i - 1], m)}`);
	}
	segs.push('Z');
	return segs.join(' ');
}

function pt([x, y]: [number, number]): string {
	const p = g(x, y);
	return `${p.x} ${p.y}`;
}

function ptm([x, y]: [number, number], m: (x: number) => number): string {
	const p = g(m(x), y);
	return `${p.x} ${p.y}`;
}

function polygonPoints(pts: Point[]): string {
	return pts.map((p) => `${p.x},${p.y}`).join(' ');
}

/**
 * The class suffix for a side pair: `p` Personality, `d` Design, `pd` a gate both
 * sides activated. Personality is the dark half of a bodygraph and Design the red
 * half; a theme cannot use literal black, so Personality follows `--roxy-fg`.
 */
function sideClass(s: GateSides): 'p' | 'd' | 'pd' {
	if (s.personality && s.design) return 'pd';
	return s.personality ? 'p' : 'd';
}

/** Render the body silhouette behind the chart. */
function renderBody(): TemplateResult {
	return svg`<path class="bg-body" d=${BODY_PATH} />`;
}

/**
 * Render every channel as a pair of halves meeting at the midpoint, so one
 * function draws both states a bodygraph distinguishes: both gates activated
 * reads as one continuous bar, a single activated gate as that gate hanging
 * halfway out of its center. Each half takes the colour of the gate at ITS end,
 * so a channel carrying one Personality gate and one Design gate is half dark and
 * half red rather than forced to one of the two.
 *
 * @remarks
 * A `pd` half is drawn twice, a solid Design line under a dashed Personality one,
 * for the striped bar a gate both sides activated takes. The inactive connector
 * is drawn first so the full 36-channel skeleton stays visible on an open chart.
 */
function renderChannels(
	gateSides: ReadonlyMap<number, GateSides>,
): TemplateResult[] {
	const lines: TemplateResult[] = [];
	for (const [a, b] of CHANNEL_PAIRS) {
		const pa = GATE_POINTS[a];
		const pb = GATE_POINTS[b];
		if (!pa || !pb) continue;
		lines.push(
			svg`<line class="bg-channel" x1=${pa.x} y1=${pa.y} x2=${pb.x} y2=${pb.y} />`,
		);
		const mid = { x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 };
		for (const [gate, from] of [
			[a, pa],
			[b, pb],
		] as const) {
			const sides = gateSides.get(gate);
			if (!sides) continue;
			const cls = sideClass(sides);
			lines.push(
				svg`<line class="bg-half ${cls === 'pd' ? 'd' : cls}" x1=${from.x} y1=${from.y} x2=${mid.x} y2=${mid.y} />`,
			);
			if (cls === 'pd') {
				lines.push(
					svg`<line class="bg-half p stripe" x1=${from.x} y1=${from.y} x2=${mid.x} y2=${mid.y} />`,
				);
			}
		}
	}
	return lines;
}

/**
 * Render the nine center shapes: filled with their semantic color when defined,
 * filled with the card surface and outlined when open so the wiring and the
 * silhouette pass behind them. Each carries a `<title>` naming it in the reader's
 * language, which is both the hover tooltip and the accessible name.
 */
function renderCenters(
	defined: Set<BodygraphCenterId>,
	names: ReadonlyMap<BodygraphCenterId, string> | undefined,
	stateWords: { defined: string; open: string },
): TemplateResult[] {
	return CENTER_GEOMETRY.map((c) => {
		const isDefined = defined.has(c.id);
		const cls = `bg-center bg-${c.color}${isDefined ? ' defined' : ''}`;
		const label = names?.get(c.id) || c.label;
		return svg`<polygon class=${cls} points=${polygonPoints(c.points)}><title>${label}: ${isDefined ? stateWords.defined : stateWords.open}</title></polygon>`;
	});
}

/** A half-disc starting at the top of the circle and sweeping to the bottom. `sweep` 1 is the right half. */
function halfDisc(p: Point, sweep: 0 | 1): string {
	return `M ${p.x} ${p.y - GATE_RADIUS} A ${GATE_RADIUS} ${GATE_RADIUS} 0 0 ${sweep} ${p.x} ${p.y + GATE_RADIUS} Z`;
}

/**
 * Render all 64 gate numbers at their fixed points: an unactivated gate is a named
 * position on the chart, not an absence, so it draws as an outlined circle with a
 * muted number while an activated one is a filled disc with a knocked-out number.
 * A gate both sides activated is split down the middle, Design left and
 * Personality right, matching the column order of a printed chart.
 */
function renderGates(
	gateSides: ReadonlyMap<number, GateSides>,
	titles: ReadonlyMap<number, string>,
): TemplateResult[] {
	const out: TemplateResult[] = [];
	for (const [gate, p] of Object.entries(GATE_POINTS)) {
		const num = Number(gate);
		const sides = gateSides.get(num);
		const cls = sides ? sideClass(sides) : '';
		const title = titles.get(num);
		out.push(svg`<g class="bg-gate-node">
			${
				cls === 'pd'
					? [
							svg`<path class="bg-gate-dot on d" d=${halfDisc(p, 0)} />`,
							svg`<path class="bg-gate-dot on p" d=${halfDisc(p, 1)} />`,
						]
					: svg`<circle class="bg-gate-dot ${cls && `on ${cls}`}" cx=${p.x} cy=${p.y} r=${GATE_RADIUS} />`
			}
			<text class="bg-gate ${sides ? 'on' : ''}" x=${p.x} y=${p.y} text-anchor="middle" dominant-baseline="central">${num}</text>
			${title ? svg`<title>${title}</title>` : nothing}
		</g>`);
	}
	return out;
}

export interface BodygraphRenderInput {
	definedCenters: Set<BodygraphCenterId>;
	/**
	 * Which side(s) activated each gate. A gate absent from the map is not
	 * activated and draws as an outlined position.
	 *
	 * @remarks
	 * The only wiring input. A channel is defined exactly when both of its gates are
	 * activated, so the response's `channels` array is deliberately not a second
	 * one: two views of one fact would have nothing keeping them in step.
	 */
	gateSides: ReadonlyMap<number, GateSides>;
	gateTitles: ReadonlyMap<number, string>;
	/** What to name each center in its `<title>`, keyed by center id. The response is the authority for its own vocabulary, so this carries `centers[].nameLocalized` where the API sent one and `centers[].name` otherwise; an id with no entry keeps the chart's own English label. */
	centerNames?: ReadonlyMap<BodygraphCenterId, string>;
	/** The two words a center shape states its state with in its tooltip. Supplied by the caller because only a component can reach a chrome catalogue. */
	stateWords?: { defined: string; open: string };
}

export const BODYGRAPH_VIEWBOX = `0 0 ${VIEW_W} ${VIEW_H}`;

/**
 * Render the full bodygraph SVG inner content for the given live state. The
 * caller wraps it in an `<svg>` with {@link BODYGRAPH_VIEWBOX} and applies its
 * own theming CSS. Draw order: body silhouette under channels under centers
 * under gates, so the body is the backdrop, the wiring runs behind the shapes,
 * and every gate circle sits on top of whatever it lands on.
 */
export function renderBodygraphSvg(
	input: BodygraphRenderInput,
): TemplateResult {
	return svg`
		${renderBody()}
		${renderChannels(input.gateSides)}
		${renderCenters(
			input.definedCenters,
			input.centerNames,
			input.stateWords ?? { defined: 'defined', open: 'open' },
		)}
		${renderGates(input.gateSides, input.gateTitles)}
	`;
}
