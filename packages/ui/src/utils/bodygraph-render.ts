import type { TemplateResult } from 'lit';
import { nothing, svg } from 'lit';

/**
 * Fixed geometry and renderer for the Human Design bodygraph. The diagram is a
 * standard, invariant layout: nine centers in canonical positions and shapes,
 * wired by 36 channels that each join two gates, with the 64 gates at fixed
 * points on the center edges, all overlaid on a front-facing human silhouette so
 * each center lands on the body part it governs. Only which centers are defined
 * and which channels and gates are active changes per chart, so this module holds
 * the geometry and the {@link RoxyBodygraph} component supplies the live state
 * from the /human-design/bodygraph response.
 *
 * @remarks Every point is authored in one normalized 0 to 100 canonical grid (x
 * left to right, y top to bottom) taken from the reference Jovian Archive
 * bodygraph, then scaled into {@link BODYGRAPH_VIEWBOX} by a single transform so
 * the chart and the body share one coordinate space and scale together. The grid
 * is sized so the nine centers fill the figure exactly as in the canonical
 * "nine centers on the human body" diagram: the Head center at the crown, Ajna at
 * the forehead, Throat at the neck, G at the chest, Heart at the right chest,
 * Spleen on the left torso, Solar Plexus on the right torso (its mirror), Sacral
 * at the lower abdomen, and Root at the pelvis. Two structural truths the layout
 * preserves: the Spleen (left) and the Solar Plexus (right) are mirror images at
 * the Sacral height, so the chart is narrow at the top and wide at the bottom;
 * and the Heart sits low and to the right of the G center, above the Solar
 * Plexus. The reference chart spreads the two side centers to the page edge for
 * channel clarity; here they are shifted inward by a fixed amount so they rest on
 * the torso sides inside the figure, with every channel topology preserved. Center shapes follow the canonical orientations (Head triangle
 * up, Ajna triangle down, Throat and Sacral and Root squares, G diamond, Heart
 * triangle pointing right, Spleen triangle pointing right with its base on the
 * far-left edge, Solar Plexus its mirror). The 36 channel gate pairs are the
 * gold-standard set used by the RoxyAPI Human Design engine.
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

/**
 * One center's drawable geometry: its semantic traditional color, the polygon
 * point list of its canonical shape, and the anchor where its name label sits.
 * Shapes are explicit point lists so the triangle and diamond orientations match
 * the canonical diagram exactly. Label anchors sit in the empty margins outside
 * each shape so they never collide with the gate numbers printed on the edges.
 */
interface CenterGeometry {
	id: BodygraphCenterId;
	label: string;
	color: CenterColor;
	points: Point[];
	labelAnchor: Point;
	labelAlign: 'start' | 'middle' | 'end';
}

/**
 * Traditional Human Design center color group. A defined center is filled with
 * this semantic color (constant across light and dark, like chart data colors);
 * an open center is left transparent with a thin theme-aware outline. The four
 * groups mirror the canonical scheme: gold for the identity and inspiration
 * centers (Head, G), green for the mental awareness center (Ajna), red for the
 * life-force motors of will and vitality (Heart, Sacral), brown for the
 * pressure, expression, and remaining awareness centers (Throat, Spleen, Solar
 * Plexus, Root).
 */
export type CenterColor = 'gold' | 'green' | 'red' | 'brown';

/**
 * Viewport mapping from the normalized 0 to 100 grid into the SVG viewBox. The
 * chart proper occupies the inner grid; {@link PAD} is the slim margin (in grid
 * units) the body silhouette extends past the centers on every side, so the head
 * rises just above the Head center, the hips sit just below Root, and the
 * shoulders spread just outside Spleen and Solar Plexus. UNIT scales grid units
 * to viewBox units; the chart keeps its natural narrow-top, wide-bottom shape
 * because x and y share one scale.
 */
const UNIT = 4;
const PAD = 9;
const VIEW_W = (100 + 2 * PAD) * UNIT;
const VIEW_H = (100 + 2 * PAD) * UNIT;

/** Map a normalized grid point (0 to 100) into viewBox units. */
function g(x: number, y: number): Point {
	return { x: (x + PAD) * UNIT, y: (y + PAD) * UNIT };
}

/** Chart horizontal center, the axis of symmetry for the body and the side centers. */
const AXIS = 50;

/** Reflect a normalized grid x across {@link AXIS}, the vertical axis of symmetry. */
const mirrorX = (x: number): number => 2 * AXIS - x;

/**
 * Gate positions authored per center in the normalized 0 to 100 grid, before the
 * mapping through {@link g}. Symmetry is structural, not hand-typed: every center
 * on the central column is authored balanced about {@link AXIS}; the Spleen is
 * authored once on the left torso and the Solar Plexus is derived as its exact
 * mirror in {@link buildGatePoints}, so the two side centers can never drift out
 * of alignment. The Heart is the one center the canonical bodygraph places off
 * the axis (low and to the right of the G center, with no left counterpart).
 * Within each center the gates follow the canonical reading order so the numbers
 * print where a printed chart shows them.
 *
 * @remarks Solar Plexus is intentionally empty here and filled by reflecting
 * Spleen; {@link SPLEEN_TO_SOLAR_PLEXUS} pairs each Spleen gate with the Solar
 * Plexus gate at its mirror position (base-top to base-top, apex to apex).
 */
const GATES_BY_CENTER: Record<
	BodygraphCenterId,
	Record<number, [number, number]>
> = {
	head: { 64: [45.5, 11.2], 61: [50, 11.2], 63: [54.5, 11.2] },
	ajna: {
		47: [45.3, 18.0],
		24: [50, 18.0],
		4: [54.7, 18.0],
		17: [45.6, 20.6],
		11: [54.4, 20.6],
		43: [50, 25.3],
	},
	throat: {
		62: [45.5, 32.3],
		23: [50, 32.3],
		56: [54.5, 32.3],
		16: [42, 34.6],
		35: [58, 34.6],
		12: [58, 37.6],
		20: [42, 40.6],
		45: [58, 40.6],
		31: [46, 42.4],
		8: [50, 42.4],
		33: [54, 42.4],
	},
	g: {
		1: [50, 47.5],
		7: [45.6, 50.3],
		13: [54.4, 50.3],
		10: [40, 53.3],
		25: [60, 53.3],
		15: [45.6, 56.6],
		46: [54.4, 56.6],
		2: [50, 59.0],
	},
	heart: {
		21: [62.5, 58.5],
		51: [62.5, 61.3],
		26: [62.5, 64.1],
		40: [73, 61.3],
	},
	spleen: {
		48: [20, 70.6],
		57: [24, 72.3],
		44: [28, 74.0],
		50: [32, 75.6],
		32: [28, 77.2],
		28: [24, 78.9],
		18: [20, 80.6],
	},
	sacral: {
		5: [45.5, 72.5],
		14: [50, 72.5],
		29: [54.5, 72.5],
		34: [42, 75.6],
		27: [42, 79.0],
		59: [58, 79.0],
		42: [45.5, 81.4],
		3: [50, 81.4],
		9: [54.5, 81.4],
	},
	'solar-plexus': {},
	root: {
		53: [45.5, 89.9],
		60: [50, 89.9],
		52: [54.5, 89.9],
		54: [42, 92.7],
		19: [58, 92.7],
		38: [42, 95.3],
		39: [58, 95.3],
		58: [42, 98.0],
		41: [58, 98.0],
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
 * the two side centers are guaranteed mirror images. Each gate sits on the
 * canonical edge of its center where its channels connect, so channel lines join
 * gate to gate cleanly and the activated numbers print in their traditional spots.
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
 * inside their centers) without rendering.
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

/** The Spleen triangle (base on the far-left edge, apex pointing right toward center). */
const SPLEEN_SHAPE: ReadonlyArray<readonly [number, number]> = [
	[18.4, 68.0],
	[18.4, 81.8],
	[34.7, 74.9],
];

/**
 * Center shapes in canonical orientation and color, labels anchored in the
 * margins. Central-column centers are built centered on {@link AXIS}; the Solar
 * Plexus shape is the Spleen reflected across the axis, so the side centers stay
 * exact mirrors. The Heart is the deliberate off-axis exception.
 */
export const CENTER_GEOMETRY: readonly CenterGeometry[] = [
	{
		id: 'head',
		label: 'Head',
		color: 'gold',
		points: shape([
			[40.0, 14.3],
			[60.0, 14.3],
			[50.0, 6.0],
		]),
		labelAnchor: g(63, 9),
		labelAlign: 'start',
	},
	{
		id: 'ajna',
		label: 'Ajna',
		color: 'green',
		points: shape([
			[40.0, 15.6],
			[60.0, 15.6],
			[50.0, 27.6],
		]),
		labelAnchor: g(62, 21),
		labelAlign: 'start',
	},
	{
		id: 'throat',
		label: 'Throat',
		color: 'brown',
		points: squareShape(9.5, 30.4, 43.6),
		labelAnchor: g(83, 34),
		labelAlign: 'start',
	},
	{
		id: 'g',
		label: 'G',
		color: 'gold',
		points: shape([
			[50.0, 45.0],
			[60.7, 53.3],
			[50.0, 61.6],
			[39.3, 53.3],
		]),
		labelAnchor: g(13, 51),
		labelAlign: 'end',
	},
	{
		id: 'heart',
		label: 'Heart',
		color: 'red',
		points: shape([
			[61.5, 57.0],
			[76.5, 61.3],
			[61.5, 65.6],
		]),
		labelAnchor: g(85, 56),
		labelAlign: 'start',
	},
	{
		id: 'spleen',
		label: 'Spleen',
		color: 'brown',
		points: shape(SPLEEN_SHAPE),
		labelAnchor: g(13, 70),
		labelAlign: 'end',
	},
	{
		id: 'sacral',
		label: 'Sacral',
		color: 'red',
		points: squareShape(9.5, 70.6, 83.6),
		// Lower-right, below the Solar Plexus: a left-side leader would clip the
		// Spleen, which sits at the same height as the Sacral.
		labelAnchor: g(85, 88),
		labelAlign: 'start',
	},
	{
		id: 'solar-plexus',
		label: 'Solar Plexus',
		color: 'brown',
		points: shape(
			SPLEEN_SHAPE.map(([x, y]) => [mirrorX(x), y] as [number, number]),
		),
		labelAnchor: g(87, 73),
		labelAlign: 'start',
	},
	{
		id: 'root',
		label: 'Root',
		color: 'brown',
		points: squareShape(9.5, 87.9, 99.9),
		labelAnchor: g(50, 103),
		labelAlign: 'middle',
	},
];

/**
 * The 36 channels as ordered gate pairs. This is the canonical Human Design
 * channel set; a channel is active only when both of its gates are activated,
 * which the live response reports in its `channels` array. The static list lets
 * the renderer draw every channel as a hanging (inactive) line and overlay the
 * active ones, so an open bodygraph still shows its full wiring skeleton.
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
 * Front-facing standing figure behind the chart, mirror-symmetric about
 * {@link AXIS}. Authored in the same normalized grid as the centers, so it scales
 * with the chart and frames it as in the canonical "nine centers on the human
 * body" diagram: a rounded head holding the Head center, a short neck at the
 * Throat, shoulders that slope to arms hanging down the outside of the torso so
 * their span frames the Spleen (left) and Solar Plexus (right), a torso that
 * narrows at the waist below the chest, then hips ending at the pelvis just below
 * the Root center. The outline is one closed loop: crown, temple, jaw, neck,
 * shoulder, down the outer arm to the hand beside the hip, in under the hip to
 * the pelvis hem, mirrored back up the left side. The right half is built from
 * cubic beziers and reflected so the figure is exactly symmetric. Drawn first and
 * behind everything so the centers, wiring, and gate numbers stay legible on top.
 */
const BODY_PATH = buildBodyPath();

function buildBodyPath(): string {
	const m = mirrorX;
	// Right-side outline in grid units (x, y) from the crown down to the
	// pelvis-right corner: a start point, then triples of (ctrl1, ctrl2, end). A
	// rounded head hugging the Head and Ajna centers, a narrowed neck, shoulders at
	// their widest, the outer torso running just past the Spleen and Solar Plexus
	// (right edges near x 82 at y 74), then waist and hip to a flat pelvis hem. The
	// left side is the mirror and the hem is a straight line, so the figure reads as
	// a torso, not a point.
	const r: Array<[number, number]> = [
		[50, -2], // crown apex (start)
		[60, -2], // crown round (ctrl)
		[60.5, 9], // head side (ctrl)
		[57, 18], // brow, head holds Head + Ajna (end)
		[56, 21], // cheek (ctrl)
		[54, 24], // jaw (ctrl)
		[52, 27], // neck right, narrowed (end)
		[54, 28], // neck base (ctrl)
		[64, 30], // trapezius slope (ctrl)
		[80, 34], // shoulder / deltoid, the widest point (end)
		[83.5, 40], // upper torso side (ctrl)
		[84, 56], // outer torso, frames the side centers (ctrl)
		[83, 74], // torso side past Spleen / Solar Plexus (end)
		[82, 84], // waist (ctrl)
		[76, 92], // hip (ctrl)
		[68, 97], // hip (end)
		[64, 99], // toward the pelvis (ctrl)
		[62, 100], // pelvis (ctrl)
		[60, 100], // pelvis-right corner (end)
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

function pairKey(a: number, b: number): string {
	return a < b ? `${a}-${b}` : `${b}-${a}`;
}

/** Render the body silhouette behind the chart. */
function renderBody(): TemplateResult {
	return svg`<path class="bg-body" d=${BODY_PATH} />`;
}

/**
 * Render every channel as a single line joining its two gates, so the wiring
 * always reads as a connected diagram rather than stubs poking out of centers.
 * Each of the 36 channels draws a faint full-length connector; a channel with
 * both gates active is redrawn thick and solid (a defined channel); a channel
 * with only one gate active lights that gate's half toward the midpoint over the
 * connector (a hanging gate). This mirrors how a printed bodygraph colors a full
 * channel only when both gates are active and shows a single hanging gate
 * otherwise, while keeping every connection visible.
 */
function renderChannels(
	activeChannels: Set<string>,
	activeGates: Set<number>,
): TemplateResult[] {
	const lines: TemplateResult[] = [];
	for (const [a, b] of CHANNEL_PAIRS) {
		const pa = GATE_POINTS[a];
		const pb = GATE_POINTS[b];
		if (!pa || !pb) continue;
		lines.push(
			svg`<line class="bg-channel" x1=${pa.x} y1=${pa.y} x2=${pb.x} y2=${pb.y} />`,
		);
		if (activeChannels.has(pairKey(a, b))) {
			lines.push(
				svg`<line class="bg-channel on" x1=${pa.x} y1=${pa.y} x2=${pb.x} y2=${pb.y} />`,
			);
			continue;
		}
		const mid = { x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 };
		if (activeGates.has(a)) {
			lines.push(
				svg`<line class="bg-half" x1=${pa.x} y1=${pa.y} x2=${mid.x} y2=${mid.y} />`,
			);
		}
		if (activeGates.has(b)) {
			lines.push(
				svg`<line class="bg-half" x1=${pb.x} y1=${pb.y} x2=${mid.x} y2=${mid.y} />`,
			);
		}
	}
	return lines;
}

/** Closest point to `p` on segment `a`-`b`, clamped to the segment ends. */
function closestPointOnSegment(p: Point, a: Point, b: Point): Point {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const len2 = dx * dx + dy * dy;
	if (len2 === 0) return a;
	const t = Math.max(
		0,
		Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2),
	);
	return { x: a.x + t * dx, y: a.y + t * dy };
}

/** Closest point on a closed polygon's perimeter to `p`, where a label leader should land. */
function closestPointOnPolygon(p: Point, poly: readonly Point[]): Point {
	let best = poly[0];
	let bestDist = Number.POSITIVE_INFINITY;
	for (let i = 0; i < poly.length; i++) {
		const q = closestPointOnSegment(p, poly[i], poly[(i + 1) % poly.length]);
		const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
		if (d < bestDist) {
			bestDist = d;
			best = q;
		}
	}
	return best;
}

/**
 * Render the nine center shapes, filled with their semantic color when defined
 * and outlined when open, each with a margin label tied to its shape by a thin
 * leader line so the Heart and every other center is unambiguous regardless of
 * whether it is defined.
 */
function renderCenters(defined: Set<BodygraphCenterId>): TemplateResult[] {
	return CENTER_GEOMETRY.map((c) => {
		const isDefined = defined.has(c.id);
		const cls = `bg-center bg-${c.color}${isDefined ? ' defined' : ''}`;
		const edge = closestPointOnPolygon(c.labelAnchor, c.points);
		return svg`<g>
			<line class="bg-leader" x1=${c.labelAnchor.x} y1=${c.labelAnchor.y} x2=${edge.x} y2=${edge.y} />
			<polygon class=${cls} points=${polygonPoints(c.points)}><title>${c.label}: ${isDefined ? 'defined' : 'open'}</title></polygon>
			<text class="bg-center-label" x=${c.labelAnchor.x} y=${c.labelAnchor.y} text-anchor=${c.labelAlign} dominant-baseline="central">${c.label}</text>
		</g>`;
	});
}

/**
 * Render the activated gate numbers at their fixed points. Numbers sit on top of
 * the filled centers, so a halo (a wider, background-colored stroke under the
 * fill) keeps them legible against any center color in both themes.
 */
function renderGateNumbers(
	activeGates: Set<number>,
	titles: Map<number, string>,
): TemplateResult[] {
	const out: TemplateResult[] = [];
	for (const [gate, p] of Object.entries(GATE_POINTS)) {
		const num = Number(gate);
		if (!activeGates.has(num)) continue;
		const title = titles.get(num);
		out.push(
			svg`<text class="bg-gate" x=${p.x} y=${p.y} text-anchor="middle" dominant-baseline="central">${num}${title ? svg`<title>${title}</title>` : nothing}</text>`,
		);
	}
	return out;
}

export interface BodygraphRenderInput {
	definedCenters: Set<BodygraphCenterId>;
	activeChannels: Set<string>;
	activeGates: Set<number>;
	gateTitles: Map<number, string>;
}

/** Build the lookup key for an active channel from its two gate numbers. */
export function channelKey(a: number, b: number): string {
	return pairKey(a, b);
}

export const BODYGRAPH_VIEWBOX = `0 0 ${VIEW_W} ${VIEW_H}`;

/**
 * Render the full bodygraph SVG inner content for the given live state. The
 * caller wraps it in an `<svg>` with {@link BODYGRAPH_VIEWBOX} and applies its
 * own theming CSS. Draw order: body silhouette under channels under centers
 * under gate numbers, so the body is the backdrop, the wiring sits behind the
 * shapes, and the numbers stay legible on top.
 */
export function renderBodygraphSvg(
	input: BodygraphRenderInput,
): TemplateResult {
	return svg`
		${renderBody()}
		${renderChannels(input.activeChannels, input.activeGates)}
		${renderCenters(input.definedCenters)}
		${renderGateNumbers(input.activeGates, input.gateTitles)}
	`;
}
