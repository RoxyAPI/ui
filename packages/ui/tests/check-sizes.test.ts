import { describe, expect, test } from 'bun:test';
import {
	type Artifact,
	collectArtifacts,
	DEFAULT_BUDGETS,
	findOffenders,
} from '../../../scripts/check-sizes.js';

/**
 * The bundle-size gate. {@link findOffenders} is the pure comparison seam (over budget = offender, at or under = ok); the real-build assertions run only once `bun run build` has populated `dist/cdn`, and prove both that the shipped bundles fit the default budgets AND that an absurd budget makes the gate fail (it is not vacuous).
 */

describe('size gate comparison logic', () => {
	const artifacts: Artifact[] = [
		{ name: 'a', actual: 100, budget: 200, metric: 'gzip' },
		{ name: 'b', actual: 200, budget: 200, metric: 'gzip' }, // exactly at budget = ok
		{ name: 'c', actual: 201, budget: 200, metric: 'raw' }, // one byte over = offender
	];

	test('flags only artifacts strictly over budget', () => {
		expect(findOffenders(artifacts).map((o) => o.name)).toEqual(['c']);
	});

	test('no offenders when everything is within budget', () => {
		expect(
			findOffenders([{ name: 'x', actual: 1, budget: 10, metric: 'raw' }]),
		).toEqual([]);
	});
});

describe('size gate against the real build', () => {
	test('built bundles fit the default budgets, and a 1-byte budget fails every artifact', async () => {
		// dist/cdn is a build artifact (gitignored); skip when the build has not run.
		if (!(await Bun.file('packages/ui/dist/cdn/roxy-ui.js').exists())) return;

		const real = await collectArtifacts(DEFAULT_BUDGETS);
		expect(real.length).toBeGreaterThan(40);
		expect(findOffenders(real)).toEqual([]);

		const absurd = await collectArtifacts({
			fullGzip: 1,
			componentGzip: 1,
			widgetsGzip: 1,
			localeGzip: 1,
		});
		expect(findOffenders(absurd).length).toBe(absurd.length);
	});
});
