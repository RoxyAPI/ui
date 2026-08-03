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
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { ENDPOINT_BINDINGS } from '../packages/ui/src/generated/endpoint-bindings.js';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';
import { widgetSnippets } from './widget-snippets.js';

const OUT_PATH = 'packages/ui/components-catalog.json';

const version = (
	JSON.parse(await Bun.file('packages/ui/package.json').text()) as {
		version: string;
	}
).version;

// Preview composites are committed repo assets, not npm files, so they ship via the jsDelivr gh route pinned to the release tag (same pattern as build-registry.ts). Tag-pinned URLs are immutable: release.yml bumps the version, rebuilds this catalog, publishes, and pushes the tag in one run, so the tag always exists before any consumer sees the URLs through the @latest alias cache. Omit the field when a file is missing; completeness is enforced by check-previews.ts (pre-push + CI), never here (a build must exist before previews can be shot).
// @latest while pre-1.0, matching what the /ui page and the demo already reference. Switch to @1 at the 1.0.0 cutover, in one place.
const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn';
const THEME_URL =
	'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/practitioner.css';

const PREVIEW_CDN = `https://cdn.jsdelivr.net/gh/RoxyAPI/ui@v${version}/assets/previews`;
const preview = (slug: string) =>
	existsSync(`assets/previews/${slug}-light.webp`) &&
	existsSync(`assets/previews/${slug}-dark.webp`)
		? {
				preview: {
					light: `${PREVIEW_CDN}/${slug}-light.webp`,
					dark: `${PREVIEW_CDN}/${slug}-dark.webp`,
				},
			}
		: {};

const components = ROXY_COMPONENTS.map((c) => {
	const endpoints = (ENDPOINT_BINDINGS[c.tag] ?? []).map((e) => ({
		operationId: e.operationId,
		method: e.method,
		path: e.path,
		...(e.attrs ? { attrs: e.attrs } : {}),
	}));
	// The canonical copy-paste snippets, built once here so the demo, the
	// roxyapi.com /widgets page and any future consumer render the same string
	// instead of each rebuilding it. Absent for the helpers, which bind to nothing.
	const head = endpoints[0];
	const snippets = head
		? {
				snippets: widgetSnippets({
					tag: c.tag,
					slug: c.slug,
					method: head.method,
					path: head.path,
					attrs: head.attrs,
					cdnBase: CDN_BASE,
					themeUrl: THEME_URL,
				}),
			}
		: {};
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
		...snippets,
		...preview(c.slug),
	};
});

const catalog = { version, generated: 'scripts/sync-catalog.ts', components };
await writeFile(OUT_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(
	`Wrote ${OUT_PATH}: ${components.length} components (v${version}).`,
);
