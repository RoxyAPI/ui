import { describe, expect, test } from 'bun:test';
import {
	CENTER_GEOMETRY,
	CHANNEL_PAIRS,
	CHART_AXIS_X,
	GATE_CENTER,
	GATE_POINTS,
	GATE_RADIUS,
} from '../src/utils/bodygraph-render.js';

/**
 * Geometry contract for the bodygraph. The chart is a fixed, invariant diagram,
 * so its symmetry and legibility are deterministic properties of the coordinate
 * model and can be asserted without rendering a pixel. These tests are the audit
 * that screenshots cannot give: they fail the moment a coordinate edit breaks
 * left/right mirror symmetry, pushes the central column off the axis, drifts a
 * gate outside its center, or overlaps two gate circles.
 *
 * @remarks
 * Symmetry, balance and containment only compare the drawing to itself, and a
 * layout can satisfy all three and still be the wrong layout. {@link CANONICAL}
 * holds the second half: the row, column and shape relationships a reader checks
 * a chart by, so the suite fails on a drawing that is internally consistent and
 * still does not match the diagram the system is drawn to.
 */

interface Pt {
	x: number;
	y: number;
}

/** Reflect a viewBox-space x across the chart axis. */
const reflect = (x: number): number => 2 * CHART_AXIS_X - x;

/** Standard even-odd ray casting; the polygon is a closed loop of viewBox points. */
function pointInPolygon(p: Pt, poly: readonly Pt[]): boolean {
	let inside = false;
	for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
		const a = poly[i];
		const b = poly[j];
		const straddles = a.y > p.y !== b.y > p.y;
		if (straddles && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) {
			inside = !inside;
		}
	}
	return inside;
}

/** Shortest distance from an interior point to the polygon's perimeter. */
function distanceToPerimeter(p: Pt, poly: readonly Pt[]): number {
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0; i < poly.length; i++) {
		const a = poly[i];
		const b = poly[(i + 1) % poly.length];
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const len2 = dx * dx + dy * dy;
		const t =
			len2 === 0
				? 0
				: Math.max(
						0,
						Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2),
					);
		best = Math.min(
			best,
			Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy)),
		);
	}
	return best;
}

/** Spleen gate to its mirror-position Solar Plexus gate (base-top, ..., apex, ..., base-bottom). */
const SIDE_MIRROR_PAIRS: ReadonlyArray<readonly [number, number]> = [
	[48, 36],
	[57, 22],
	[44, 37],
	[50, 6],
	[32, 49],
	[28, 55],
	[18, 30],
];

const CENTRAL_COLUMN = [
	'head',
	'ajna',
	'throat',
	'g',
	'sacral',
	'root',
] as const;

const ALL_GATES = Array.from({ length: 64 }, (_, i) => i + 1);

describe('bodygraph geometry', () => {
	test('all 64 gates are placed exactly once', () => {
		expect(Object.keys(GATE_POINTS)).toHaveLength(64);
		for (const n of ALL_GATES) {
			expect(GATE_POINTS[n], `gate ${n} missing`).toBeDefined();
			expect(GATE_CENTER[n], `gate ${n} has no center`).toBeDefined();
		}
	});

	test('every channel joins two placed gates', () => {
		expect(CHANNEL_PAIRS).toHaveLength(36);
		for (const [a, b] of CHANNEL_PAIRS) {
			expect(GATE_POINTS[a], `channel gate ${a} missing`).toBeDefined();
			expect(GATE_POINTS[b], `channel gate ${b} missing`).toBeDefined();
		}
	});

	test('Spleen and Solar Plexus gates are exact mirror images', () => {
		for (const [left, right] of SIDE_MIRROR_PAIRS) {
			expect(GATE_CENTER[left]).toBe('spleen');
			expect(GATE_CENTER[right]).toBe('solar-plexus');
			expect(GATE_POINTS[right].x).toBeCloseTo(reflect(GATE_POINTS[left].x), 6);
			expect(GATE_POINTS[right].y).toBeCloseTo(GATE_POINTS[left].y, 6);
		}
	});

	test('Spleen and Solar Plexus shapes are exact mirror images', () => {
		const spleen = CENTER_GEOMETRY.find((c) => c.id === 'spleen');
		const solar = CENTER_GEOMETRY.find((c) => c.id === 'solar-plexus');
		expect(spleen && solar).toBeTruthy();
		expect(solar?.points).toHaveLength(spleen?.points.length ?? -1);
		for (const v of spleen?.points ?? []) {
			const hasMirror = (solar?.points ?? []).some(
				(p) =>
					Math.abs(p.x - reflect(v.x)) < 1e-6 && Math.abs(p.y - v.y) < 1e-6,
			);
			expect(hasMirror, `no mirror vertex for (${v.x}, ${v.y})`).toBe(true);
		}
	});

	test('central-column centers are balanced on the axis', () => {
		for (const id of CENTRAL_COLUMN) {
			const xs = ALL_GATES.filter((n) => GATE_CENTER[n] === id).map(
				(n) => GATE_POINTS[n].x,
			);
			expect(xs.length, `${id} has no gates`).toBeGreaterThan(0);
			const extentMid = (Math.min(...xs) + Math.max(...xs)) / 2;
			expect(extentMid, `${id} gate extent off axis`).toBeCloseTo(
				CHART_AXIS_X,
				6,
			);
		}
	});

	test('central-column center shapes are centered on the axis', () => {
		// Spleen and Solar Plexus are intentionally off-axis and checked as a mirror
		// pair above; the Heart is the documented off-axis exception.
		const offAxis = new Set(['heart', 'spleen', 'solar-plexus']);
		for (const c of CENTER_GEOMETRY) {
			if (offAxis.has(c.id)) continue;
			const xs = c.points.map((p) => p.x);
			const extentMid = (Math.min(...xs) + Math.max(...xs)) / 2;
			expect(extentMid, `${c.id} shape off axis`).toBeCloseTo(CHART_AXIS_X, 6);
		}
	});

	test('the Heart is the only center placed off the axis', () => {
		const heartXs = ALL_GATES.filter((n) => GATE_CENTER[n] === 'heart').map(
			(n) => GATE_POINTS[n].x,
		);
		const mid = (Math.min(...heartXs) + Math.max(...heartXs)) / 2;
		expect(mid).toBeGreaterThan(CHART_AXIS_X);
	});

	test('every gate CIRCLE fits inside its own center polygon', () => {
		// Every gate is drawn as a disc, and a point can sit inside a triangle while the
		// circle around it hangs over the edge. Assert the drawn shape, at the same
		// radius the renderer uses.
		for (const n of ALL_GATES) {
			const center = CENTER_GEOMETRY.find((c) => c.id === GATE_CENTER[n]);
			expect(center, `no geometry for ${GATE_CENTER[n]}`).toBeTruthy();
			const poly = center?.points ?? [];
			expect(
				pointInPolygon(GATE_POINTS[n], poly),
				`gate ${n} outside ${GATE_CENTER[n]}`,
			).toBe(true);
			const clearance = distanceToPerimeter(GATE_POINTS[n], poly);
			expect(
				clearance,
				`gate ${n} circle overhangs ${GATE_CENTER[n]} by ${(GATE_RADIUS - clearance).toFixed(2)}`,
			).toBeGreaterThanOrEqual(GATE_RADIUS);
		}
	});

	test('no two gate circles overlap', () => {
		// Tied to the exported radius rather than a fixed threshold, so enlarging the
		// circles fails here instead of merging two numbers into one blob.
		for (let i = 0; i < ALL_GATES.length; i++) {
			for (let j = i + 1; j < ALL_GATES.length; j++) {
				const a = GATE_POINTS[ALL_GATES[i]];
				const b = GATE_POINTS[ALL_GATES[j]];
				const d = Math.hypot(a.x - b.x, a.y - b.y);
				expect(
					d,
					`gates ${ALL_GATES[i]} and ${ALL_GATES[j]} only ${d.toFixed(1)} apart`,
				).toBeGreaterThan(2 * GATE_RADIUS);
			}
		}
	});
});

/**
 * The canonical layout, expressed as the relationships a reader checks a chart by.
 * Absolute coordinates are deliberately not asserted: the chart may legitimately
 * be re-proportioned, and a table of 64 frozen numbers would fail on every such
 * change while still not naming the fault.
 */
const CANONICAL = {
	/** Rows that must sit at the same height, left gate first. */
	level: [
		[62, 23],
		[23, 56],
		[16, 35],
		[20, 12],
		[31, 8],
		[8, 33],
		[27, 59],
		[54, 19],
		[38, 39],
		[58, 41],
		[7, 13],
		[15, 46],
		[10, 25],
		[26, 40],
	] as ReadonlyArray<readonly [number, number]>,
	/** The upper gate must sit strictly above the lower one. */
	above: [
		[64, 47],
		[47, 17],
		[17, 43],
		[43, 23],
		[62, 16],
		[16, 20],
		[35, 12],
		[12, 45],
		[45, 33],
		[1, 7],
		[7, 10],
		[10, 15],
		[15, 2],
		[5, 34],
		[34, 27],
		[27, 42],
		[48, 57],
		[57, 44],
		[44, 50],
		[50, 32],
		[32, 28],
		[28, 18],
		[21, 51],
		[51, 26],
		[53, 54],
		[54, 38],
		[38, 58],
	] as ReadonlyArray<readonly [number, number]>,
	/** The first gate must sit strictly left of the second. */
	leftOf: [
		[64, 61],
		[61, 63],
		[47, 4],
		[17, 11],
		[16, 35],
		[20, 12],
		[31, 33],
		[10, 25],
		[7, 13],
		[26, 40],
		[51, 21],
		[48, 50],
		[50, 6],
		[34, 59],
		[54, 19],
		[58, 41],
	] as ReadonlyArray<readonly [number, number]>,
} as const;

describe('bodygraph matches the reference chart', () => {
	test('gates that share a row are drawn level', () => {
		for (const [a, b] of CANONICAL.level) {
			expect(
				GATE_POINTS[a].y,
				`gates ${a} and ${b} should share a row`,
			).toBeCloseTo(GATE_POINTS[b].y, 6);
		}
	});

	test('the vertical reading order inside each center is canonical', () => {
		for (const [upper, lower] of CANONICAL.above) {
			expect(
				GATE_POINTS[upper].y,
				`gate ${upper} should sit above gate ${lower}`,
			).toBeLessThan(GATE_POINTS[lower].y);
		}
	});

	test('the horizontal reading order inside each center is canonical', () => {
		for (const [left, right] of CANONICAL.leftOf) {
			expect(
				GATE_POINTS[left].x,
				`gate ${left} should sit left of gate ${right}`,
			).toBeLessThan(GATE_POINTS[right].x);
		}
	});

	test('the Heart triangle points UP, with 26 and 40 on its base', () => {
		// One apex at the top with 21 on it, 51 on the upper left edge, and 26 and 40
		// as the two lower corners, so the channel to the Spleen leaves on the left and
		// the channel to the Solar Plexus on the right.
		const heart = CENTER_GEOMETRY.find((c) => c.id === 'heart');
		expect(heart?.points).toHaveLength(3);
		const ys = (heart?.points ?? []).map((p) => p.y);
		const apex = Math.min(...ys);
		// Exactly one vertex is the apex and the other two share the base.
		expect(ys.filter((y) => y === apex)).toHaveLength(1);
		const base = ys.filter((y) => y !== apex);
		expect(base[0]).toBeCloseTo(base[1], 6);
		// 21 is nearest the apex; 26 and 40 sit lowest and level with each other.
		const lowest = Math.max(
			GATE_POINTS[21].y,
			GATE_POINTS[51].y,
			GATE_POINTS[26].y,
			GATE_POINTS[40].y,
		);
		expect(GATE_POINTS[21].y).toBeLessThan(GATE_POINTS[51].y);
		expect(GATE_POINTS[26].y).toBe(lowest);
		expect(GATE_POINTS[40].y).toBe(lowest);
	});

	test('the Head clears the Ajna by enough to draw three channels between them', () => {
		// Too close and the two triangles read as one shape with nowhere for 64-47,
		// 61-24 and 63-4 to show. Measured as a share of the Head's own height so it
		// survives a rescale of the whole chart.
		const head = CENTER_GEOMETRY.find((c) => c.id === 'head');
		const ajna = CENTER_GEOMETRY.find((c) => c.id === 'ajna');
		const headYs = (head?.points ?? []).map((p) => p.y);
		const ajnaYs = (ajna?.points ?? []).map((p) => p.y);
		const headHeight = Math.max(...headYs) - Math.min(...headYs);
		const gap = Math.min(...ajnaYs) - Math.max(...headYs);
		expect(gap).toBeGreaterThan(0);
		expect(gap / headHeight).toBeGreaterThan(0.3);
	});

	test('the side centers stay clear of the central column', () => {
		// A central column widened past the canonical proportion pulls the Spleen apex
		// in toward the Sacral and squeezes out the room the side channels need.
		const apexOf = (id: string, pick: (xs: number[]) => number) =>
			pick(
				(CENTER_GEOMETRY.find((c) => c.id === id)?.points ?? []).map(
					(p) => p.x,
				),
			);
		const spleenApex = apexOf('spleen', (xs) => Math.max(...xs));
		const sacralLeft = apexOf('sacral', (xs) => Math.min(...xs));
		const sacralWidth = apexOf('sacral', (xs) => Math.max(...xs)) - sacralLeft;
		expect((sacralLeft - spleenApex) / sacralWidth).toBeGreaterThan(0.9);
	});
});
