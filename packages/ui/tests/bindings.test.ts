import { describe, expect, test } from 'bun:test';
import { UI_BINDINGS } from '../../../scripts/bindings.config.js';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import { ROXY_COMPONENTS } from '../src/manifest.js';

/**
 * Keeps the binding (this repo's bindings.config.ts), the generated endpoint
 * map, and the component manifest in lockstep. The manifest owns editorial copy;
 * bindings.config.ts owns which endpoint each component renders; the spec owns
 * the endpoint's method and path. These tests fail the build if any two
 * disagree: a binding for an operationId the spec does not have, a component in
 * the manifest with no binding, or a binding pointing at a component the library
 * does not ship.
 */
const TAGS = new Set(ROXY_COMPONENTS.map((c) => c.tag));

describe('binding config vs spec', () => {
	test('every bound operationId exists in the committed spec', async () => {
		const spec = (await Bun.file('specs/openapi.json').json()) as {
			paths: Record<string, Record<string, { operationId?: string }>>;
		};
		const operationIds = new Set<string>();
		for (const methods of Object.values(spec.paths)) {
			for (const op of Object.values(methods)) {
				if (op?.operationId) operationIds.add(op.operationId);
			}
		}
		const orphans = Object.keys(UI_BINDINGS).filter(
			(id) => !operationIds.has(id),
		);
		expect(
			orphans,
			`Binding operationIds absent from the spec:\n  ${orphans.join('\n  ')}`,
		).toEqual([]);
	});

	test('every binding component tag is one the library ships', () => {
		const unknown = Object.values(UI_BINDINGS)
			.flatMap((b) => b.map((x) => x.component))
			.filter((tag) => !TAGS.has(tag));
		expect(
			unknown,
			`Binding tags not in the manifest:\n  ${unknown.join('\n  ')}`,
		).toEqual([]);
	});
});

describe('endpoint bindings', () => {
	test('every binding targets a component the library ships', () => {
		const orphans = Object.keys(ENDPOINT_BINDINGS).filter(
			(tag) => !TAGS.has(tag),
		);
		expect(
			orphans,
			`Bindings for unknown component tags:\n  ${orphans.join('\n  ')}`,
		).toEqual([]);
	});

	test('every data-bound component has at least one endpoint binding', () => {
		// selfFetching components (the generic renderer, location search, endpoint
		// form) render no single endpoint response, so they carry no binding.
		const missing = ROXY_COMPONENTS.filter(
			(c) => !c.selfFetching && !ENDPOINT_BINDINGS[c.tag]?.length,
		).map((c) => c.tag);
		expect(
			missing,
			`Components with no x-roxy-ui binding in the published spec:\n  ${missing.join('\n  ')}`,
		).toEqual([]);
	});

	test('every binding entry has a method, path, and operationId', () => {
		for (const [tag, endpoints] of Object.entries(ENDPOINT_BINDINGS)) {
			for (const e of endpoints) {
				expect(
					e.operationId,
					`${tag} binding missing operationId`,
				).toBeTruthy();
				expect(e.method, `${tag} binding missing method`).toMatch(
					/^(GET|POST|PUT|PATCH|DELETE)$/,
				);
				expect(
					e.path.startsWith('/'),
					`${tag} path must be spec-absolute: ${e.path}`,
				).toBe(true);
			}
		}
	});
});
