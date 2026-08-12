#!/usr/bin/env bun
/**
 * Fetch the latest OpenAPI spec from RoxyAPI and regenerate component
 * prop types. Run with: bun run generate
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';

const SPEC_URL =
	process.env.ROXY_OPENAPI_URL ?? 'https://roxyapi.com/api/v2/openapi.json';
const SPEC_PATH = 'specs/openapi.json';

/**
 * Path to read the spec from instead of fetching it.
 *
 * @remarks
 * Keeps generation offline and byte-reproducible, which is what the codegen drift check in CI
 * relies on. Distinct from `ROXY_OPENAPI_URL`, which only points the fetch at a different server.
 */
const SPEC_FILE = process.env.ROXYAPI_SPEC_FILE;

let spec: unknown;
if (SPEC_FILE) {
	console.log(
		`Reading OpenAPI spec from ${SPEC_FILE} (offline, ROXYAPI_SPEC_FILE)`,
	);
	spec = JSON.parse(await Bun.file(SPEC_FILE).text());
} else {
	console.log(`Fetching OpenAPI spec from ${SPEC_URL}`);
	try {
		const res = await fetch(SPEC_URL, {
			headers: { 'Cache-Control': 'no-cache' },
		});
		if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
		spec = await res.json();
	} catch (err) {
		if (existsSync(SPEC_PATH)) {
			console.warn(
				`! Live spec fetch failed (${err instanceof Error ? err.message : String(err)}). Using cached ${SPEC_PATH}.`,
			);
			spec = JSON.parse(await Bun.file(SPEC_PATH).text());
		} else {
			throw err;
		}
	}
}

// Patch the server URL so generated client examples point at production.
const obj = spec as { servers?: Array<{ url?: string }> };
if (obj?.servers?.[0]?.url === '/api/v2') {
	obj.servers[0].url = 'https://roxyapi.com/api/v2';
}

await mkdir('specs', { recursive: true });
await writeFile(SPEC_PATH, JSON.stringify(obj, null, 2));
console.log(`Spec saved to ${SPEC_PATH}`);

// Regenerate the component endpoint map (and the catalog that rides on it) from
// the freshly fetched spec, so a renamed or removed endpoint reflows immediately.
console.log('Syncing endpoint bindings + catalog...');
execSync('bun run scripts/sync-bindings.ts', { stdio: 'inherit' });
execSync('bun run scripts/sync-catalog.ts', { stdio: 'inherit' });

// Field labels come from the same spec, so they refresh on the same command. Build time and
// not run time: the form already consumes version-pinned schema artifacts, so fetching labels
// from the browser would add a request and a visible English-then-translated flash for no
// decoupling those artifacts do not already have.
console.log('Syncing field labels...');
execSync('bun run scripts/sync-field-labels.ts', { stdio: 'inherit' });

// Generate just response types via hey-api. Skip if module unavailable
// (allows offline scaffolding before the install completes).
try {
	console.log('Running hey-api type generator...');
	execSync('bunx openapi-ts', { stdio: 'inherit' });
	console.log('Types generated.');
} catch (err) {
	console.warn(
		`! Type generation skipped (${err instanceof Error ? err.message : String(err)}).`,
	);
}

/**
 * Vendor the freshly generated response types into each wrapper package.
 *
 * @remarks
 * The wrappers are self-contained: they carry their own copy of the types rather than depending on `@roxyapi/ui`, so a consumer installs exactly one package and is still fully typed. The copies live in gitignored `src/types/` directories, which means they must exist before ANYTHING typechecks.
 *
 * They are emitted HERE, from `generate` (which `postinstall` runs), and not from `build`, because `typecheck` runs before `build` in CI. Emitting them from `build` typechecks fine on any machine where a previous build left the directories behind, and fails with a wall of `TS2307` on a clean clone.
 */
try {
	const { emitTypes } = await import('./wrapper-meta.js');
	await emitTypes('packages/ui-react/src');
	await emitTypes('packages/ui-vue/src');
	console.log('Wrapper types vendored (ui-react, ui-vue).');
} catch (err) {
	console.warn(
		`! Wrapper type vendoring skipped (${err instanceof Error ? err.message : String(err)}).`,
	);
}
