#!/usr/bin/env bun
/**
 * Purge the jsDelivr aliases after a release, then PROVE the edge actually flipped.
 *
 * @remarks
 * Publishing to npm is not shipping. `@latest` resolves PER FILE, so a release can be
 * half-live, which is worse than not shipping at all: the bundle can still be served at
 * the previous version while `widgets.js`, `locales/*.js` and `components-catalog.json`
 * have already moved. A hosted embed then downloads a full locale catalogue and runs a
 * bundle from before those keys existed, so every widget renders untranslated while npm
 * reads correct and nothing errors.
 *
 * @remarks
 * This ran as a hand-typed step in a runbook and was missed on two consecutive releases.
 * A step a human has to remember is not a step. It is automated here and, more
 * importantly, VERIFIED here: a purge returning `"finished"` only means the request was
 * accepted, not that the edge now serves the new bytes, so the poll below is the part
 * that actually holds the guarantee.
 *
 * @remarks
 * `@0` is purged alongside `@latest` because `widgets.js` self-loads the bundle from the
 * `@0` range; leaving it stale keeps every auto-mount widget on old code even after
 * `@latest` is correct. Tag-pinned URLs (the component preview images) are NEVER purged:
 * they are immutable by construction, and purging them only costs a cache fill.
 *
 * Usage: `bun run scripts/purge-cdn.ts [version]`
 * The version defaults to the built `packages/ui/package.json`, which is what the release
 * workflow has just bumped and published.
 */

import { readdirSync } from 'node:fs';

const PKG = '@roxyapi/ui';
const ALIASES = ['latest', '0'] as const;

/**
 * Assets whose staleness is visible to a consumer, DERIVED rather than hand-listed. An
 * eighth language or a fifth theme is covered the day it exists, which is the whole reason
 * this is not a literal array: the last hand-kept copy of this list was a runbook bullet,
 * and it is what went stale.
 *
 * @remarks
 * Derived from `src/`, NOT from `dist/`, and that is deliberate. `dist/` is gitignored, so
 * a job that only checks the repo out has no build to read; reading `src/` lets this run
 * on a bare checkout with no `bun install` and no build step. The two directories carry
 * the same locale and theme names by construction, since the build emits one output per
 * source file.
 */
function assets(): string[] {
	const locales = readdirSync('packages/ui/src/locales')
		.filter((f) => f.endsWith('.ts') && f !== 'index.ts')
		.map((f) => `dist/cdn/locales/${f.replace(/\.ts$/, '.js')}`);

	const themes = readdirSync('packages/ui/src/styles/themes')
		.filter((f) => f.endsWith('.css'))
		.map((f) => `dist/styles/themes/${f}`);

	// One bundle per component, derived the same way the locales are: an embedder
	// that loads a single tag fetches only its own file, so leaving these out
	// purged the bundle nobody imports and left the ones they do.
	const components = readdirSync('packages/ui/src/components')
		.filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
		.map((f) => `dist/cdn/components/${f.replace(/\.ts$/, '.js')}`);

	return [
		// `package.json` is how a consumer and every tool reads which version
		// `@latest` resolves to, so a stale one reports the previous release while
		// the code beside it is current.
		'package.json',
		'dist/cdn/roxy-ui.js',
		'dist/cdn/widgets.js',
		'dist/manifest.json',
		'dist/styles/tokens.css',
		'components-catalog.json',
		...components,
		...themes,
		...locales,
	];
}

async function purge(alias: string, asset: string): Promise<void> {
	try {
		await fetch(`https://purge.jsdelivr.net/npm/${PKG}@${alias}/${asset}`, {
			signal: AbortSignal.timeout(20_000),
		});
	} catch {
		// A purge that fails to send is not fatal on its own; the verify pass below is
		// what decides, and it retries. Swallowing here keeps one flaky request from
		// failing a release that is otherwise fine.
	}
}

/** The version jsDelivr is actually serving for one asset, or null if it cannot be read. */
async function servedVersion(
	alias: string,
	asset: string,
): Promise<string | null> {
	try {
		const res = await fetch(
			`https://cdn.jsdelivr.net/npm/${PKG}@${alias}/${asset}`,
			{
				method: 'HEAD',
				signal: AbortSignal.timeout(20_000),
			},
		);
		return res.headers.get('x-jsd-version');
	} catch {
		return null;
	}
}

const expected =
	process.argv[2] ??
	(await Bun.file('packages/ui/package.json').json()).version;
const list = assets();

console.log(
	`Purging ${list.length} asset(s) x ${ALIASES.length} alias(es) for ${PKG}@${expected}`,
);
await Promise.all(ALIASES.flatMap((a) => list.map((asset) => purge(a, asset))));

// The edge takes a moment to refill. Poll rather than sleeping a fixed guess: a release
// should not fail because one region was slow, and it must not pass because we did not look.
// Overridable so the failure path can be exercised without waiting out a real deadline.
const DEADLINE_MS = Number(process.env.ROXY_PURGE_DEADLINE_MS ?? 120_000);
const started = Date.now();
let stale: string[] = [];

while (Date.now() - started < DEADLINE_MS) {
	const checks = await Promise.all(
		ALIASES.flatMap((alias) =>
			list.map(async (asset) => {
				const got = await servedVersion(alias, asset);
				return got === expected
					? null
					: `@${alias}/${asset} -> ${got ?? 'unreachable'}`;
			}),
		),
	);
	stale = checks.filter((c): c is string => c !== null);
	if (stale.length === 0) break;
	await Bun.sleep(5_000);
	await Promise.all(
		ALIASES.flatMap((a) => list.map((asset) => purge(a, asset))),
	);
}

if (stale.length > 0) {
	console.error(
		`\njsDelivr is still serving stale bytes for ${stale.length} asset(s), expected ${expected}:`,
	);
	for (const line of stale.sort()) console.error(`  ${line}`);
	console.error(
		'\nThe release is NOT live. npm has the new version and the CDN does not, which is the ' +
			'shape that shipped an untranslated bundle to every embed for twelve hours. ' +
			'Re-run this script; if it keeps failing, purge by hand and check status.jsdelivr.com.',
	);
	process.exit(1);
}

console.log(
	`\nAll ${list.length * ALIASES.length} asset(s) now serve ${expected}. The release is live.`,
);
