#!/usr/bin/env bun
/**
 * Generate packages/ui/components-catalog.json: the single machine-readable
 * catalog of every component, its domain, what it renders, and the endpoint(s)
 * it consumes. Joins the two hand-maintained editorial sources in this repo
 * (manifest.ts for copy, scripts/bindings.config.ts via the generated
 * endpoint-bindings.ts for the API mapping) into one artifact.
 *
 * Shipped in the npm package (and so served by jsDelivr at
 * `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/components-catalog.json`), it is the
 * source of truth other surfaces fetch instead of re-keying the catalog: the
 * roxyapi.com `/ui` page renders its table from it server-side, and any future
 * consumer can read it the same way. Generated, never hand-edited; rerun
 * `bun run catalog:sync` (or `bun run build`) after touching manifest.ts or
 * bindings.config.ts. Committed so it is diffable and survives without a build.
 */
import { writeFile } from 'node:fs/promises';
import { ENDPOINT_BINDINGS } from '../packages/ui/src/generated/endpoint-bindings.js';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';

const OUT_PATH = 'packages/ui/components-catalog.json';

const version = (
	JSON.parse(await Bun.file('packages/ui/package.json').text()) as {
		version: string;
	}
).version;

const components = ROXY_COMPONENTS.map((c) => {
	const endpoints = (ENDPOINT_BINDINGS[c.tag] ?? []).map((e) => ({
		operationId: e.operationId,
		method: e.method,
		path: e.path,
		...(e.attrs ? { attrs: e.attrs } : {}),
	}));
	return {
		tag: c.tag,
		pascal: c.pascal,
		slug: c.slug,
		domain: c.docsLabel,
		renders: c.docsSummary,
		// Human-readable endpoint label for tables; `endpoints` is the precise
		// machine-readable list (empty for the helper components, which bind to
		// no single endpoint).
		endpointLabel: c.endpointLabel,
		endpoints,
	};
});

const catalog = { version, generated: 'scripts/sync-catalog.ts', components };
await writeFile(OUT_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(
	`Wrote ${OUT_PATH}: ${components.length} components (v${version}).`,
);
