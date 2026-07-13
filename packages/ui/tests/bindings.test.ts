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

/**
 * The `audit` derives its section list from `window.ROXY_UI_DEMOS` (see `scripts/audit.ts`), so a component with no demo card in `apps/docs/components-manifest.js` is never walked by it. It is not "untested", it is UNAUDITED: the `[object Object]` / `undefined` / `NaN` / empty-state safety net simply never runs against it, and the e2e and layout specs never see it either.
 *
 * That is exactly how a Human Design `summary` object once shipped rendering as `[object Object]` through a fully green run: typecheck passed (Lit accepts `unknown` children), and the one gate that would have caught it never walked the component. The invariant was known and unenforced, which is the same as absent. This test is the enforcement.
 */
describe('every component is reachable by the audit', () => {
	test('every component in the manifest has a demo card', async () => {
		const src = await Bun.file('apps/docs/components-manifest.js').text();
		const demoed = new Set(
			[...src.matchAll(/tag:\s*'([^']+)'/g)].map((m) => m[1] as string),
		);
		const missing = ROXY_COMPONENTS.filter((c) => !demoed.has(c.tag)).map(
			(c) => c.tag,
		);
		expect(missing).toEqual([]);
	});

	test('every demo card points at a component the library ships', async () => {
		const src = await Bun.file('apps/docs/components-manifest.js').text();
		const shipped = new Set(ROXY_COMPONENTS.map((c) => c.tag));
		const unknown = [...src.matchAll(/tag:\s*'(roxy-[^']+)'/g)]
			.map((m) => m[1] as string)
			.filter((t) => !shipped.has(t));
		expect([...new Set(unknown)]).toEqual([]);
	});
});

/**
 * The wrappers lazy-load the elements from the CDN and pin the request to the `@roxyapi/ui` release they were BUILT against, so `@roxyapi/ui-vue@x.y.z` always runs `@roxyapi/ui@x.y.z` and a consumer lockfile pins the runtime too. That pin is baked in at build time from `packages/ui/package.json`, and the release workflow bumps all three packages BEFORE it builds, so it cannot be stale.
 *
 * It only holds while the three versions move together. If they ever diverge, a wrapper would request a CDN bundle that is not its own release: this fails loudly rather than letting that ship.
 */
describe('the three packages version in lockstep', () => {
	test('ui, ui-react and ui-vue all carry the same version', async () => {
		const read = async (p: string) =>
			(
				JSON.parse(await Bun.file(`packages/${p}/package.json`).text()) as {
					version: string;
				}
			).version;
		const [ui, react, vue] = await Promise.all([
			read('ui'),
			read('ui-react'),
			read('ui-vue'),
		]);
		expect(react).toBe(ui);
		expect(vue).toBe(ui);
	});

	test('the version the wrappers pin at build time IS the ui version', async () => {
		const ui = (
			JSON.parse(await Bun.file('packages/ui/package.json').text()) as {
				version: string;
			}
		).version;
		for (const pkg of ['ui-react', 'ui-vue']) {
			const src = await Bun.file(`packages/${pkg}/src/load-ui.ts`).text();
			expect(src).toContain(`ROXY_UI_VERSION = '${ui}'`);
		}
	});
});

/**
 * `endpointLabel` is EDITORIAL display copy, hand-written in `manifest.ts` and shown on the roxyapi.com `/ui` table and in the README. Everything else about a component's endpoints is generated, so this is the one string that can quietly start lying.
 *
 * It did: `roxy-divisional-chart` was bound to `/vedic-astrology/navamsa` and its label still advertised only `/vedic-astrology/divisional-chart`, so the public table under-reported what the component renders.
 *
 * Labels legitimately compress a family with brace notation (`POST /vedic-astrology/dasha/{current,major,sub/...}`), so a literal substring check would be useless. Instead: strip the prefix every bound path shares, and require each remaining distinguishing segment to appear somewhere in the label.
 */
describe('endpointLabel tells the truth about what a component renders', () => {
	const commonPrefix = (paths: string[]): string => {
		if (paths.length < 2) return '';
		const parts = paths.map((p) => p.split('/'));
		const out: string[] = [];
		for (let i = 0; i < (parts[0]?.length ?? 0); i++) {
			const seg = parts[0]?.[i];
			if (parts.every((p) => p[i] === seg)) out.push(seg as string);
			else break;
		}
		return out.join('/');
	};

	test('every bound endpoint is named in the label', () => {
		const liars: string[] = [];
		for (const c of ROXY_COMPONENTS) {
			const bound = (ENDPOINT_BINDINGS[c.tag] ?? []).map((e) => e.path);
			if (bound.length === 0) continue;
			const prefix = commonPrefix(bound);
			const label = c.endpointLabel;
			for (const path of bound) {
				const tail = prefix ? path.slice(prefix.length) : path;
				// The first real word of what makes this path distinct.
				const token = tail.split('/').filter(Boolean)[0]?.replace(/[{}]/g, '');
				if (!token) continue;
				if (!label.includes(token)) {
					liars.push(
						`${c.tag}: label "${label}" never mentions "${token}" (${path})`,
					);
				}
			}
		}
		expect(liars).toEqual([]);
	});
});
