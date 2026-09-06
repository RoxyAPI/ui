import { describe, expect, test } from 'bun:test';
import {
	UI_BINDINGS,
	UNBOUND_COMPONENTS,
} from '../../../scripts/bindings.config.js';
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
		// form) render no single endpoint response, so they carry no binding, and
		// UNBOUND_COMPONENTS are the ones deliberately kept out of the auto-mount
		// widget build. Everything else must be bound.
		const missing = ROXY_COMPONENTS.filter(
			(c) =>
				!c.selfFetching &&
				!UNBOUND_COMPONENTS[c.tag] &&
				!ENDPOINT_BINDINGS[c.tag]?.length,
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
 * `endpointLabel` is EDITORIAL display copy, hand-written in `manifest.ts`, shown on the roxyapi.com `/ui` table and in the README, and published in `components-catalog.json`. Everything else about the endpoints of a component is generated, so this is the one string that can drift, in either direction, and this test holds it to the bindings both ways.
 *
 * Under-reporting: `roxy-divisional-chart` was bound to `/vedic-astrology/navamsa` while its label advertised only `/vedic-astrology/divisional-chart`.
 *
 * Over-reporting is the worse half and had no gate at all: a label may advertise an endpoint no binding carries, the whole suite stays green, and `componentForTool` then resolves NOTHING for a tool name the published catalog says that component renders. Eleven names sat unresolved that way. So the check now runs in BOTH directions on an exact set, not on a substring: the label is EXPANDED into concrete endpoints and must equal what the component binds.
 *
 * Expansion rules, which are the whole grammar the labels use. A leading verb sets the method and carries forward across commas. A brace group holding a top-level comma is an ALTERNATION and multiplies out (`/numerology/{life-path,expression}`); a brace group without one is a path PARAMETER and stays literal (`/crystals/{id}`), which is what makes `{gates,centers}/{id}` collapse correctly and what caught `gates` actually taking `{number}`. Groups nest, so commas are split at brace depth zero. A member carrying `...` is a deliberate elision (`{current,major,sub/...}`) and asserts a PREFIX instead: at least one binding must start with it, and every binding under that prefix counts as named.
 */
describe('endpointLabel and the bindings are one fact, checked both ways', () => {
	/** Split on commas at brace depth zero, so a nested alternation is not torn apart. */
	const splitTop = (s: string): string[] => {
		const out: string[] = [];
		let depth = 0;
		let cur = '';
		for (const ch of s) {
			if (ch === '{') depth++;
			else if (ch === '}') depth--;
			if (ch === ',' && depth === 0) {
				out.push(cur);
				cur = '';
				continue;
			}
			cur += ch;
		}
		out.push(cur);
		return out.map((x) => x.trim()).filter(Boolean);
	};

	/** Multiply out every brace ALTERNATION, leaving path parameters alone. */
	const expand = (path: string): string[] => {
		let depth = 0;
		let start = -1;
		for (let i = 0; i < path.length; i++) {
			const ch = path[i];
			if (ch === '{') {
				if (depth === 0) start = i;
				depth++;
			} else if (ch === '}') {
				depth--;
				if (depth === 0 && start >= 0) {
					const members = splitTop(path.slice(start + 1, i));
					if (members.length > 1) {
						const head = path.slice(0, start);
						const tail = path.slice(i + 1);
						return members.flatMap((m) => expand(head + m + tail));
					}
					start = -1;
				}
			}
		}
		return [path];
	};

	const VERB = /^(GET|POST|PUT|PATCH|DELETE)\s+/;

	/** Every concrete `METHOD /path` a label names. */
	const labelEndpoints = (label: string): Array<[string, string]> => {
		const out: Array<[string, string]> = [];
		let method = '';
		for (const chunk of splitTop(label)) {
			let rest = chunk;
			const m = VERB.exec(rest);
			if (m) {
				method = m[1] as string;
				rest = rest.slice(m[0].length);
			}
			if (!rest.startsWith('/')) continue;
			for (const path of expand(rest)) out.push([method, path]);
		}
		return out;
	};

	const bound = (tag: string) => ENDPOINT_BINDINGS[tag] ?? [];

	test('the label names no endpoint the component does not bind', () => {
		const liars: string[] = [];
		let checked = 0;
		for (const c of ROXY_COMPONENTS) {
			const list = bound(c.tag);
			if (list.length === 0) continue;
			const have = new Set(list.map((b) => `${b.method} ${b.path}`));
			for (const [method, path] of labelEndpoints(c.endpointLabel)) {
				checked++;
				if (path.includes('...')) {
					const prefix = path.slice(0, path.indexOf('...'));
					if (
						list.some((b) => b.method === method && b.path.startsWith(prefix))
					)
						continue;
					liars.push(
						`${c.tag}: label promises "${method} ${prefix}..." and nothing binds it`,
					);
					continue;
				}
				if (!have.has(`${method} ${path}`)) {
					liars.push(
						`${c.tag}: label promises "${method} ${path}" and nothing binds it`,
					);
				}
			}
		}
		// Not vacuous: the labels have to have been parsed and walked.
		expect(checked).toBeGreaterThan(80);
		expect(
			liars,
			`An endpointLabel advertises an endpoint no binding carries, so componentForTool resolves nothing for its tool name. Bind it in scripts/bindings.config.ts, or correct the label to what ships:\n  ${liars.join('\n  ')}`,
		).toEqual([]);
	});

	test('the label names every endpoint the component binds', () => {
		const silent: string[] = [];
		for (const c of ROXY_COMPONENTS) {
			const list = bound(c.tag);
			if (list.length === 0) continue;
			const named = new Set<string>();
			for (const [method, path] of labelEndpoints(c.endpointLabel)) {
				if (path.includes('...')) {
					const prefix = path.slice(0, path.indexOf('...'));
					for (const b of list) {
						if (b.method === method && b.path.startsWith(prefix))
							named.add(`${b.method} ${b.path}`);
					}
					continue;
				}
				named.add(`${method} ${path}`);
			}
			for (const b of list) {
				if (!named.has(`${b.method} ${b.path}`)) {
					silent.push(
						`${c.tag}: binds "${b.method} ${b.path}" (${b.operationId}) and the label never names it`,
					);
				}
			}
		}
		expect(
			silent,
			`A bound endpoint is missing from the public endpointLabel, so the README table and components-catalog.json under-report what the component renders:\n  ${silent.join('\n  ')}`,
		).toEqual([]);
	});
});

describe('deliberately unbound components', () => {
	test('each names a component the library ships and carries no binding', () => {
		for (const [tag, endpoint] of Object.entries(UNBOUND_COMPONENTS)) {
			expect(TAGS.has(tag), `${tag} in the manifest`).toBe(true);
			expect(
				ENDPOINT_BINDINGS[tag],
				`${tag} is declared unbound but has a binding`,
			).toBeUndefined();
			expect(endpoint).toMatch(/^(GET|POST) \//);
		}
	});
});

/**
 * Provenance coverage. Fifteen Vedic responses echo the sidereal frame they were computed in, and a chart drawn without saying which frame produced it cannot be reconciled against any other calculator, because changing the ayanamsa can move a graha into a different rashi.
 *
 * This binds the spec to the source: any component rendering a frame-carrying response must call {@link renderFrameCaption}. Without it a new component ships silently unlabelled, which reads to a practitioner as a wrong chart rather than a missing caption.
 */
describe('sidereal frame provenance', () => {
	test('every component rendering a frame-carrying response renders the frame', async () => {
		const spec = (await Bun.file('specs/openapi.json').json()) as {
			paths: Record<
				string,
				Record<
					string,
					{
						operationId?: string;
						responses?: Record<
							string,
							{ content?: Record<string, { schema?: { $ref?: string } }> }
						>;
					}
				>
			>;
			components: {
				schemas: Record<string, { properties?: Record<string, unknown> }>;
			};
		};

		const framed = new Set(
			Object.entries(spec.components.schemas)
				.filter(([, s]) => s.properties?.frame)
				.map(([name]) => name),
		);
		expect(framed.size).toBeGreaterThan(10);

		const owing = new Set<string>();
		for (const methods of Object.values(spec.paths)) {
			for (const op of Object.values(methods)) {
				const ref =
					op?.responses?.['200']?.content?.['application/json']?.schema?.$ref;
				const schema = ref?.split('/').pop();
				if (!op?.operationId || !schema || !framed.has(schema)) continue;
				for (const b of UI_BINDINGS[op.operationId] ?? []) {
					owing.add(b.component);
				}
				for (const [tag, path] of Object.entries(UNBOUND_COMPONENTS)) {
					if (path.endsWith(op.operationId)) owing.add(tag);
				}
			}
		}
		expect(owing.size).toBeGreaterThan(5);

		const missing: string[] = [];
		for (const tag of owing) {
			const file = `packages/ui/src/components/${tag.replace(/^roxy-/, '')}.ts`;
			const src = await Bun.file(file).text();
			if (!src.includes('renderFrameCaption')) missing.push(tag);
		}
		expect(missing).toEqual([]);
	});
});

/**
 * A typed wrapper prop that the element never reads is a lie shipped as public API.
 *
 * @remarks
 * `roxy-natal-chart` declared `house-system`, `wrapper-meta.ts` documented it, and both generated wrappers set it on every render. Nothing anywhere read `this.houseSystem`, so a consumer following our own generated types picked a system and got silence; the legend went on reading the response field beside it. `roxy-hexagram` carried the same defect in `mode`. Neither could fail: the property is declared, the attribute reflects, the wrapper compiles, and the drift gate regenerates from the same map.
 *
 * The scan is deliberately generous. It asks only that the source MENTION `this.<prop>` somewhere, because a component that reads its own property in any way is making a decision with it, while one that never names it cannot be. That is enough to catch the whole class, and it is what makes the answer to "wire it or delete it" a test result rather than an opinion.
 */
describe('every wrapper-visible config prop is read by its element', () => {
	test('no CONFIG_PROPS entry is declared, typed, and then ignored', async () => {
		const { CONFIG_PROPS } = await import('../../../scripts/wrapper-meta.js');
		const dead: string[] = [];
		let checked = 0;
		for (const [slug, props] of Object.entries(CONFIG_PROPS)) {
			const src = await Bun.file(
				`packages/ui/src/components/${slug}.ts`,
			).text();
			for (const { prop } of props) {
				checked++;
				if (!src.includes(`this.${prop}`)) dead.push(`${slug}.${prop}`);
			}
		}
		// Not vacuous: the map has to have been found and walked.
		expect(checked).toBeGreaterThan(15);
		expect(
			dead,
			`Declared in scripts/wrapper-meta.ts, typed into both wrappers, and never read by the element. Wire it or delete it from all three:\n  ${dead.join('\n  ')}`,
		).toEqual([]);
	});
});
