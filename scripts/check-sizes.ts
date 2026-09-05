#!/usr/bin/env bun
/**
 * Bundle-size gate. Asserts the gzip/raw budgets the README publishes and exits non-zero listing every offender, so a size regression cannot reach a registry. Run after a build (it measures `packages/ui/dist/cdn` and `packages/ui/dist/styles/fonts`).
 *
 * @remarks
 * Four budgets measured GZIPPED, because that is the byte weight a browser downloads over a compressing CDN, plus one measured RAW for the self-hosted font files (already-compressed woff2 gains nothing from gzip); the one-tag `widgets.js` reuses {@link WIDGETS_BUDGET_BYTES} so the number lives in exactly one place. {@link findOffenders} is the pure comparison seam the unit test drives with synthetic budgets.
 *
 * Every artifact CLASS the build emits needs a budget here, not just the ones that were big when it was written: an unbudgeted output is one nobody is measuring, and a chrome-string catalogue is exactly the shape that grows one string at a time.
 */
import { readdir } from 'node:fs/promises';
import { WIDGETS_BUDGET_BYTES } from './build-widgets.js';

const KB = 1024;
const CDN_DIR = 'packages/ui/dist/cdn';
const FONTS_DIR = 'packages/ui/dist/styles/fonts';

/** Ceilings for the budgeted artifact classes. */
export interface SizeBudgets {
	/** `dist/cdn/roxy-ui.js`, gzipped. */
	fullGzip: number;
	/** each `dist/cdn/components/*.js`, gzipped. */
	componentGzip: number;
	/** `dist/cdn/widgets.js`, gzipped. */
	widgetsGzip: number;
	/** each `dist/cdn/locales/*.js`, gzipped. */
	localeGzip: number;
	/** each `dist/styles/fonts/**\/*.woff2`, RAW. woff2 is already compressed, so gzip on top buys nothing and would hide a regression; this is the one budget measured uncompressed. */
	fontRaw: number;
}

export const DEFAULT_BUDGETS: SizeBudgets = {
	// The whole library in one file, which is what the copy-paste script tag
	// downloads. Like the locale ceiling below it, this is a COVERAGE tracker
	// rather than a performance limit, and it moves by re-measuring when coverage
	// moves. A page that wants one card imports the per-component bundle instead,
	// and that budget is the one that constrains a single widget.
	//
	// Re-measured after four editorial components landed for four new domains:
	// 146.7 KB before them, 154.7 KB after, so a card of this shape costs about
	// two kilobytes gzipped. The ceiling is set where that measurement lands plus
	// room for the next few, and it is raised the same way: build, read the
	// number, write down what moved it. Never raise it to make a run pass.
	fullGzip: 165 * KB,
	componentGzip: 30 * KB,
	widgetsGzip: WIDGETS_BUDGET_BYTES,
	// A catalogue is one download that translates every element on the page, and
	// it is pure text, which gzip eats. The ceiling tracks how many cards are
	// covered; Cyrillic and Devanagari reach any byte ceiling first, at roughly
	// two bytes a character against one for Latin.
	//
	// Set to where full coverage lands, re-measured: 605 entries put `ru` at
	// 15.5 KB, and the 144 still to come are long sentences rather than column
	// headers, so the landing point is near 19 KB. An earlier estimate of nine
	// bytes a string was drawn from short labels and undershot by half.
	//
	// This is a coverage tracker, not a performance limit: the payload is one
	// cached download per site, and an English site fetches none of it. It moves
	// when COVERAGE moves, which is what it is for, and the raise below is one of
	// those: two new API domains landed 28 operations of request fields, and the
	// component reading them added chrome of its own, which took `ru` from 18.3 KB
	// to 20.4 before a single new word was translated.
	//
	// Re-measured at 18 API domains, after four landed 48 operations of request
	// fields in one deploy: `ru` 22.8 KB, `hi` 21.8 KB, the Latin five
	// 19.3 to 19.8 KB. Each domain has been costing roughly half a kilobyte per
	// catalogue, so 26 KB is where coverage lands plus room for the next few, and
	// it moves again by re-measuring, never by guessing.
	//
	// **Splitting the catalogue is the next lever but it cannot answer THIS gate,
	// so do not reach for it here.** The published contract is one `<script>` per
	// language, the shape the README documents and every embedder already loads,
	// so a split can only ADD smaller per-domain payloads beside the whole one. It
	// leaves this file exactly the size it is. Splitting is about what a page has
	// to DOWNLOAD, and it is worth doing for that reason alone; it is not a way to
	// buy headroom here without breaking every consumer that loads the documented
	// file. Not the API field labels either: those are about a sixth of the source,
	// measured, and separating them buys almost nothing.
	localeGzip: 26 * KB,
	// The five self-hosted practitioner-theme subsets (Fraunces latin + latin-ext,
	// Jost latin + latin-ext + cyrillic) measure 10 to 66 KB each, so the cap sits
	// round above the largest of those with headroom for one more subset, never so
	// high that a wrong export (a whole variable family, every weight and style)
	// could pass. Re-measure and move this, never raise it to make a swap pass.
	fontRaw: 100 * KB,
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

/** Every `.woff2` under `dir`, recursing one level (the family subdirectories), sorted for deterministic output. */
async function collectFontFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const out: string[] = [];
	for (const e of entries) {
		const full = `${dir}/${e.name}`;
		if (e.isDirectory()) out.push(...(await collectFontFiles(full)));
		else if (e.name.endsWith('.woff2')) out.push(full);
	}
	return out.sort();
}

/**
 * Measure every budgeted artifact under `distCdn`: the full bundle and `widgets.js` by name, every per-component file by directory scan. Font files are scanned separately under `distFonts`, RAW rather than gzipped, so they never count against the JS bundle budgets above. Throws if the build output is absent (run `bun run build` first).
 */
export async function collectArtifacts(
	budgets: SizeBudgets = DEFAULT_BUDGETS,
	distCdn: string = CDN_DIR,
	distFonts: string = FONTS_DIR,
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
	for (const f of await collectFontFiles(distFonts)) {
		out.push({
			name: f.replace(`${distFonts}/`, 'styles/fonts/'),
			actual: (await readBytes(f)).length,
			budget: budgets.fontRaw,
			metric: 'raw',
		});
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
