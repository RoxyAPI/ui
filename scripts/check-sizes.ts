#!/usr/bin/env bun
/**
 * Bundle-size gate. Asserts the gzip/raw budgets the README and CLAUDE.md claim and exits non-zero listing every offender, so a size regression cannot reach a registry. Run after a build (it measures `packages/ui/dist/cdn`).
 *
 * @remarks
 * Four budgets, ALL measured GZIPPED, because that is the byte weight a browser downloads over a compressing CDN; the one-tag `widgets.js` reuses {@link WIDGETS_BUDGET_BYTES} so the number lives in exactly one place. {@link findOffenders} is the pure comparison seam the unit test drives with synthetic budgets.
 *
 * Every artifact CLASS the build emits needs a budget here, not just the ones that were big when it was written: an unbudgeted output is one nobody is measuring, and a chrome-string catalogue is exactly the shape that grows one string at a time.
 */
import { readdir } from 'node:fs/promises';
import { WIDGETS_BUDGET_BYTES } from './build-widgets.js';

const KB = 1024;
const CDN_DIR = 'packages/ui/dist/cdn';

/** Ceilings for the three budgeted artifact classes. */
export interface SizeBudgets {
	/** `dist/cdn/roxy-ui.js`, gzipped. */
	fullGzip: number;
	/** each `dist/cdn/components/*.js`, gzipped. */
	componentGzip: number;
	/** `dist/cdn/widgets.js`, gzipped. */
	widgetsGzip: number;
	/** each `dist/cdn/locales/*.js`, gzipped. */
	localeGzip: number;
}

export const DEFAULT_BUDGETS: SizeBudgets = {
	fullGzip: 150 * KB,
	componentGzip: 30 * KB,
	widgetsGzip: WIDGETS_BUDGET_BYTES,
	// A catalogue is one download that translates every element on the page, and
	// it is pure text, which gzip eats. 8 KB is several times the natal-chart
	// scope, so the ceiling bites long before a payload is worth splitting.
	localeGzip: 8 * KB,
};

export interface Artifact {
	name: string;
	actual: number;
	budget: number;
	metric: 'gzip' | 'raw';
}

// Read as a fresh ArrayBuffer-backed view so gzipSync's typed input is satisfied.
const readBytes = async (path: string): Promise<Uint8Array<ArrayBuffer>> =>
	new Uint8Array(await Bun.file(path).arrayBuffer());

// Level 9 to match what a compressing CDN (jsDelivr, Cloudflare) actually serves,
// so the measured bytes are the bytes a browser downloads, not a lighter estimate.
const gzipLen = (bytes: Uint8Array<ArrayBuffer>): number =>
	Bun.gzipSync(bytes, { level: 9 }).length;

/**
 * Measure every budgeted artifact under `distCdn`: the full bundle and `widgets.js` by name, every per-component file by directory scan. Throws if the build output is absent (run `bun run build` first).
 */
export async function collectArtifacts(
	budgets: SizeBudgets = DEFAULT_BUDGETS,
	distCdn: string = CDN_DIR,
): Promise<Artifact[]> {
	const out: Artifact[] = [];
	out.push({
		name: 'cdn/roxy-ui.js',
		actual: gzipLen(await readBytes(`${distCdn}/roxy-ui.js`)),
		budget: budgets.fullGzip,
		metric: 'gzip',
	});
	out.push({
		name: 'cdn/widgets.js',
		actual: gzipLen(await readBytes(`${distCdn}/widgets.js`)),
		budget: budgets.widgetsGzip,
		metric: 'gzip',
	});
	for (const [dir, budget] of [
		['components', budgets.componentGzip],
		['locales', budgets.localeGzip],
	] as const) {
		const path = `${distCdn}/${dir}`;
		const files = (await readdir(path)).filter((f) => f.endsWith('.js')).sort();
		for (const f of files) {
			out.push({
				name: `cdn/${dir}/${f}`,
				actual: gzipLen(await readBytes(`${path}/${f}`)),
				budget,
				metric: 'gzip',
			});
		}
	}
	return out;
}

/** Artifacts that exceed their budget. Pure comparison seam the unit test drives. */
export function findOffenders(artifacts: Artifact[]): Artifact[] {
	return artifacts.filter((a) => a.actual > a.budget);
}

const kb = (bytes: number): string => `${(bytes / KB).toFixed(1)} KB`;

async function main() {
	const artifacts = await collectArtifacts();
	// Largest first: the number to watch is always at the top.
	for (const a of [...artifacts].sort((x, y) => y.actual - x.actual)) {
		const pct = ((a.actual / a.budget) * 100).toFixed(0);
		const tag = a.actual > a.budget ? 'FAIL' : 'ok  ';
		console.log(
			`${tag} ${a.name.padEnd(38)} ${kb(a.actual).padStart(10)} ${a.metric.padEnd(4)} / ${kb(a.budget).padStart(10)} (${pct}%)`,
		);
	}
	const offenders = findOffenders(artifacts);
	if (offenders.length) {
		console.error(`\n${offenders.length} artifact(s) over budget:`);
		for (const o of offenders) {
			console.error(
				`  ${o.name}: ${kb(o.actual)} > ${kb(o.budget)} ${o.metric}`,
			);
		}
		process.exit(1);
	}
	console.log(`\nAll ${artifacts.length} artifacts within budget.`);
}

if (import.meta.main) {
	await main();
}
