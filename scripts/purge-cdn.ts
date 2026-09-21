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

/**
 * Purge one path and report whether the request was actually APPLIED.
 *
 * @remarks
 * The purge API answers `200 {"status":"finished"}` even when it did nothing, and states the
 * truth one level down as `paths[path].throttled`. Reading only the status code counts a
 * refused purge as a done one, which is how a run can report success against a stale edge.
 */
async function purge(
	alias: string,
	asset: string,
): Promise<{ path: string; resetSeconds: number } | null> {
	const path = `/npm/${PKG}@${alias}/${asset}`;
	try {
		const res = await fetch(`https://purge.jsdelivr.net${path}`, {
			signal: AbortSignal.timeout(20_000),
		});
		const body = (await res.json()) as {
			paths?: Record<string, { throttled?: boolean; throttlingReset?: number }>;
		};
		const entry = body.paths?.[path];
		return entry?.throttled
			? { path, resetSeconds: entry.throttlingReset ?? 0 }
			: null;
	} catch {
		// A purge that fails to send is not fatal on its own; the verify pass below is
		// what decides. Swallowing here keeps one flaky request from failing a release
		// that is otherwise fine.
		return null;
	}
}

/** Run `jobs` a few at a time. The purge API is rate-limited, so firing every path at once spends the budget on a burst and gets most of them refused. */
/**
 * Run the purge requests one at a time with a short gap, never concurrently.
 *
 * @remarks
 * Eight concurrent requests answered `finished` and `throttled: false` for every path and still left 73
 * of 184 serving the previous version twenty minutes later, on both aliases; the same paths purged one
 * per request, 250 ms apart, all flipped within ten seconds. The purge API accepts a burst and drops
 * part of it without saying so, so pacing is what makes the verify pass below mean anything.
 */
async function inSequence<T>(jobs: (() => Promise<T>)[]): Promise<T[]> {
	const out: T[] = [];
	for (const job of jobs) {
		out.push(await job());
		await new Promise((r) => setTimeout(r, 250));
	}
	return out;
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

/**
 * The version npm lists as `latest` right now, read past every cache, or null when the registry
 * cannot be reached.
 */
async function npmLatest(): Promise<string | null> {
	try {
		const res = await fetch(`https://registry.npmjs.org/${PKG}`, {
			headers: { Accept: 'application/vnd.npm.install-v1+json' },
			cache: 'no-store',
			signal: AbortSignal.timeout(20_000),
		});
		if (!res.ok) return null;
		const body = (await res.json()) as { 'dist-tags'?: { latest?: string } };
		return body['dist-tags']?.latest ?? null;
	} catch {
		return null;
	}
}

/**
 * Wait for npm before purging anything.
 *
 * @remarks
 * jsDelivr resolves `@latest` and `@0` from the npm registry, so a purge issued before npm lists the
 * new version refills every path with the previous bytes, and no amount of polling afterwards can
 * turn that green. The registry can list a version several minutes after `npm publish` returns,
 * longer than the gap between the release job and this one. So: poll the packument first, purge once
 * npm agrees, then prove the edge. The deadline is overridable so the failure path can be exercised.
 */
const NPM_DEADLINE_MS = Number(process.env.ROXY_NPM_DEADLINE_MS ?? 900_000);
const npmStarted = Date.now();
let listed = await npmLatest();
while (listed !== expected && Date.now() - npmStarted < NPM_DEADLINE_MS) {
	await Bun.sleep(10_000);
	listed = await npmLatest();
}
if (listed !== expected) {
	console.error(
		`npm lists ${PKG}@${listed ?? 'unreachable'} as latest after ${Math.round((Date.now() - npmStarted) / 1000)}s, expected ${expected}. ` +
			'Nothing was purged: a purge before npm has the version refills the edge with the old bytes. ' +
			'Check the publish step, then run `bun run purge:cdn` again.',
	);
	process.exit(1);
}
console.log(
	`npm lists ${PKG}@${expected} after ${Math.round((Date.now() - npmStarted) / 1000)}s. ` +
		`Purging ${list.length} asset(s) x ${ALIASES.length} alias(es)`,
);
/**
 * Purged ONCE, not on every poll.
 *
 * @remarks
 * Re-purging each path every five seconds for two minutes sent roughly twenty-four requests per
 * path, and the API answers a spent budget with `throttled` rather than an error. The retry loop
 * meant to rescue a slow edge was itself what got the purges refused, so the wider the asset list
 * grew the more reliably it failed. Reading the edge is not rate-limited; asking to purge it is.
 */
const throttled = (
	await inSequence(
		ALIASES.flatMap((a) => list.map((asset) => () => purge(a, asset))),
	)
).filter((t): t is { path: string; resetSeconds: number } => t !== null);

if (throttled.length > 0) {
	const longest = Math.max(...throttled.map((t) => t.resetSeconds));
	console.warn(
		`\n${throttled.length} of ${list.length * ALIASES.length} purge request(s) were throttled. ` +
			`Those paths keep serving the previous version until the window resets, in up to ${Math.ceil(longest / 60)} minute(s).`,
	);
}

// The edge takes a moment to refill. Poll rather than sleeping a fixed guess: a release
// should not fail because one region was slow, and it must not pass because we did not look.
// Overridable so the failure path can be exercised without waiting out a real deadline.
const DEADLINE_MS = Number(process.env.ROXY_PURGE_DEADLINE_MS ?? 180_000);
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
}

if (stale.length > 0) {
	console.error(
		`\njsDelivr is still serving stale bytes for ${stale.length} asset(s), expected ${expected}:`,
	);
	for (const line of stale.sort()) console.error(`  ${line}`);
	console.error(
		'\nThe release is NOT live. npm lists the new version and the CDN does not, which is the ' +
			'shape that shipped an untranslated bundle to every embed for twelve hours. ' +
			(throttled.length > 0
				? 'The purge requests above were throttled, so re-running now will not help: wait for the ' +
					'window named above, then run `bun run purge:cdn` again.'
				: 'Re-run this script; if it keeps failing, purge by hand and check status.jsdelivr.com.'),
	);
	process.exit(1);
}

console.log(
	`\nAll ${list.length * ALIASES.length} asset(s) now serve ${expected}. The release is live.`,
);
