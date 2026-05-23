import { describe, expect, test } from 'bun:test';
import {
	CENTER_GEOMETRY,
	CHANNEL_PAIRS,
	CHART_AXIS_X,
	GATE_CENTER,
	GATE_POINTS,
} from '../src/utils/bodygraph-render.js';

/**
 * Geometry contract for the bodygraph. The chart is a fixed, invariant diagram,
 * so its symmetry and legibility are deterministic properties of the coordinate
 * model and can be asserted without rendering a pixel. These tests are the audit
 * that screenshots cannot give: they fail the moment a coordinate edit breaks
 * left/right mirror symmetry, pushes the central column off the axis, drifts a
 * gate outside its center, or crowds two gate numbers together.
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

	test('every gate sits inside its own center polygon', () => {
		for (const n of ALL_GATES) {
			const center = CENTER_GEOMETRY.find((c) => c.id === GATE_CENTER[n]);
			expect(center, `no geometry for ${GATE_CENTER[n]}`).toBeTruthy();
			expect(
				pointInPolygon(GATE_POINTS[n], center?.points ?? []),
				`gate ${n} outside ${GATE_CENTER[n]}`,
			).toBe(true);
		}
	});

	test('no two gate numbers are closer than the legibility threshold', () => {
		// 8px gate font with a halo; centers must stay at least this far apart in
		// viewBox units so two-digit numbers never touch.
		const MIN_DISTANCE = 9.5;
		for (let i = 0; i < ALL_GATES.length; i++) {
			for (let j = i + 1; j < ALL_GATES.length; j++) {
				const a = GATE_POINTS[ALL_GATES[i]];
				const b = GATE_POINTS[ALL_GATES[j]];
				const d = Math.hypot(a.x - b.x, a.y - b.y);
				expect(
					d,
					`gates ${ALL_GATES[i]} and ${ALL_GATES[j]} only ${d.toFixed(1)} apart`,
				).toBeGreaterThanOrEqual(MIN_DISTANCE);
			}
		}
	});
});
