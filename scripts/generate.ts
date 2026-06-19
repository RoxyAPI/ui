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

console.log(`Fetching OpenAPI spec from ${SPEC_URL}`);

let spec: unknown;
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
