#!/usr/bin/env bun
/**
 * Generate packages/ui/src/generated/endpoint-bindings.ts by joining this
 * repo's own component-to-endpoint map (scripts/bindings.config.ts) with the
 * RoxyAPI spec (specs/openapi.json) on `operationId`, resolving each binding's
 * HTTP method + path from the spec. The API spec stays UI-agnostic; the binding
 * is owned here. Generating it is what keeps the tag-to-endpoint mapping from
 * drifting: a hand-kept endpoint string in src/manifest.ts cannot be checked
 * against the spec, and this can.
 *
 * Also emits packages/ui/src/generated/tool-components.ts, the MCP-tool-name to
 * component lookup the browser reads, resolved here so nothing builds an index
 * at run time and no runtime module has to reach for this map or the manifest.
 *
 * Also emits packages/ui/src/generated/api-languages.ts, the `?lang=` vocabulary
 * read off the same spec. It is a SEPARATE module on purpose: the language list
 * is loaded by every self-fetching component, and importing it from the
 * bindings module would put the whole tag-to-endpoint map in reach of each
 * per-component bundle.
 *
 * Reads specs/openapi.json (refreshed by scripts/generate.ts from the live
 * spec). Run standalone with `bun run bindings:sync`; also runs as a step of
 * `bun run build` and `bun run generate`. CI fails on drift.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';
import { toolNameFor } from '../packages/ui/src/utils/tool-name.js';
import { UI_BINDINGS } from './bindings.config.js';

const SPEC_PATH = 'specs/openapi.json';
const OUT_PATH = 'packages/ui/src/generated/endpoint-bindings.ts';
const LANG_OUT_PATH = 'packages/ui/src/generated/api-languages.ts';
const TOOL_OUT_PATH = 'packages/ui/src/generated/tool-components.ts';

interface EndpointBinding {
	operationId: string;
	method: string;
	path: string;
	toolName: string;
	attrs?: Record<string, string>;
}

interface SpecParameter {
	name?: string;
	in?: string;
	schema?: { enum?: string[] };
}

const spec = JSON.parse(await Bun.file(SPEC_PATH).text()) as {
	paths: Record<
		string,
		Record<string, { operationId?: string; parameters?: SpecParameter[] }>
	>;
};

/**
 * Every value the API accepts for `?lang=`, unioned across every operation that declares the parameter.
 *
 * @remarks
 * Derived rather than hand-listed for the reason lesson 23 gives: a requirement policed by a maintained list misses the next entry. The day the API gains a ninth language, a spec refresh turns it on here and in every consumer, with no code change.
 */
const apiLanguages = new Set<string>();
for (const methods of Object.values(spec.paths)) {
	for (const op of Object.values(methods)) {
		for (const param of op?.parameters ?? []) {
			if (param.name !== 'lang' || param.in !== 'query') continue;
			for (const value of param.schema?.enum ?? []) apiLanguages.add(value);
		}
	}
}
if (apiLanguages.size === 0) {
	console.error(
		`! ${SPEC_PATH} declares no \`lang\` query enum; refusing to emit an empty language list (every self-fetch would drop \`lang\`).`,
	);
	process.exit(1);
}

// operationId -> { method, path }, resolved from the spec.
const located: Record<string, { method: string; path: string }> = {};
for (const [path, methods] of Object.entries(spec.paths)) {
	for (const [method, op] of Object.entries(methods)) {
		if (op?.operationId)
			located[op.operationId] = { method: method.toUpperCase(), path };
	}
}

const byTag: Record<string, EndpointBinding[]> = {};
const missing: string[] = [];
for (const [operationId, components] of Object.entries(UI_BINDINGS)) {
	const where = located[operationId];
	if (!where) {
		missing.push(operationId);
		continue;
	}
	for (const { component, attrs } of components) {
		let list = byTag[component];
		if (!list) {
			list = [];
			byTag[component] = list;
		}
		list.push({
			operationId,
			method: where.method,
			path: where.path,
			toolName: toolNameFor(where.method, where.path),
			...(attrs ? { attrs } : {}),
		});
	}
}

/**
 * Stable output: tags sorted alphabetically for a readable diff, but each tag's endpoints kept in DECLARATION order.
 *
 * @remarks
 * **The first binding per tag is the DEFAULT** everywhere it matters: the widget map, the one-tag `data-roxy-widget` div, the demo Embed tab, and the hosted `/embed/{slug}` shell all take `endpoints[0]`. So the order here is semantics, not formatting.
 *
 * Sorting these by path looks tidy and picks the default alphabetically, which is unrelated to what a reader wants: it hands `moon-phase` the year-and-month calendar form instead of the current phase, `forecast-timeline` the significant-dates list instead of the timeline it is named after, `numerology-card` birth-day instead of life-path, and `tarot-spread` a raw draw instead of the three-card spread, twelve components in all.
 *
 * `UI_BINDINGS` already lists each component's endpoints in the order a reader would want them, so declaration order IS the intent. Preserve it. Only the tag keys are sorted, and those are never read positionally.
 */
const sorted: Record<string, EndpointBinding[]> = {};
for (const tag of Object.keys(byTag).sort()) {
	sorted[tag] = byTag[tag];
}

const tagCount = Object.keys(sorted).length;
const endpointCount = Object.values(sorted).reduce((n, b) => n + b.length, 0);

const body = `// Generated by scripts/sync-bindings.ts (bindings.config.ts joined with ${SPEC_PATH}). Do not edit.

/**
 * One endpoint a component can render. \`path\` is the full spec path (leading
 * slash); the self-fetch \`data-endpoint\` value is that path without the
 * leading slash. \`toolName\` is the name this endpoint answers to as an MCP
 * tool, so a tool result can be routed to the component that draws it.
 * \`attrs\` are the config attributes that select this variant on a
 * multi-endpoint component.
 */
export interface EndpointBinding {
  operationId: string;
  method: string;
  path: string;
  toolName: string;
  attrs?: Record<string, string>;
}

/** Component tag -> every endpoint whose response it renders. */
export const ENDPOINT_BINDINGS: Record<string, EndpointBinding[]> = ${JSON.stringify(sorted, null, 2)};
`;

/**
 * The tool-name lookup, resolved at BUILD time so the browser carries a plain object and no index builder.
 *
 * @remarks
 * Only the four fields a caller acts on are emitted. `method` and `path` are on every {@link EndpointBinding} for the build-time consumers (the widget map, the demo mirror, the published catalog) and would be dead weight in a bundle that only has to answer "which component draws this".
 *
 * **The tie is broken HERE, on manifest order.** Three operations are rendered by two components each, one leading with the drawing and one with the table, and `ENDPOINT_BINDINGS` sorts its keys alphabetically for a readable diff, so resolving at run time would hand the transit response to the aspect table rather than to the wheel. Walking `ROXY_COMPONENTS` uses the editorial order, which already puts the drawing first.
 */
const toolComponents: Record<
	string,
	{
		tag: string;
		pascal: string;
		operationId: string;
		attrs?: Record<string, string>;
	}
> = {};
for (const { tag, pascal } of ROXY_COMPONENTS) {
	for (const binding of byTag[tag] ?? []) {
		if (toolComponents[binding.toolName]) continue;
		toolComponents[binding.toolName] = {
			tag,
			pascal,
			operationId: binding.operationId,
			...(binding.attrs ? { attrs: binding.attrs } : {}),
		};
	}
}

const toolBody = `// Generated by scripts/sync-bindings.ts (bindings.config.ts joined with ${SPEC_PATH}). Do not edit.

/** The component that renders one MCP tool result. \`toolName\` is the key it is found under. */
export interface ToolComponentEntry {
  /** Custom-element tag to create, query, or render. */
  tag: string;
  /** Export name in the React and Vue packages. */
  pascal: string;
  /** OpenAPI operation the tool calls. */
  operationId: string;
  /** Config attributes that select this endpoint on a component that renders several. Set them beside \`data\`. */
  attrs?: Record<string, string>;
}

/** MCP tool name -> the component that draws its result. */
export const TOOL_COMPONENTS: Record<string, ToolComponentEntry> = ${JSON.stringify(toolComponents, null, 2)};
`;

const langBody = `// Generated by scripts/sync-bindings.ts (the \`lang\` query enum in ${SPEC_PATH}). Do not edit.

/**
 * Every language tag the API accepts on \`?lang=\`.
 *
 * @remarks
 * A self-fetch resolves the site language from the DOM, which means ANY value a
 * host page happens to carry can reach the query string. The API rejects an
 * unlisted tag with a 400, so a page in a language we do not translate would
 * stop working the moment the language chain was completed. Membership is
 * checked against this list before \`lang\` is sent, and a miss simply omits the
 * parameter, leaving the endpoint on its English default.
 */
export const API_LANGUAGES: readonly string[] = ${JSON.stringify([...apiLanguages].sort())};
`;

await mkdir('packages/ui/src/generated', { recursive: true });
await writeFile(OUT_PATH, body);
await writeFile(TOOL_OUT_PATH, toolBody);
await writeFile(LANG_OUT_PATH, langBody);
console.log(
	`Wrote ${OUT_PATH}: ${endpointCount} endpoints across ${tagCount} components.`,
);
console.log(
	`Wrote ${TOOL_OUT_PATH}: ${Object.keys(toolComponents).length} MCP tools mapped to a component.`,
);
console.log(
	`Wrote ${LANG_OUT_PATH}: ${apiLanguages.size} API languages (${[...apiLanguages].sort().join(', ')}).`,
);

if (missing.length > 0) {
	console.warn(
		`! ${missing.length} binding(s) reference an operationId absent from ${SPEC_PATH} (rename or stale spec):\n  ${missing.join('\n  ')}`,
	);
	process.exit(1);
}
