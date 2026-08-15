#!/usr/bin/env bun
/**
 * Shoot one premium catalog preview composite per component, light and dark, into assets/previews/{slug}-{light,dark}.webp. Each is a real Playwright render of the /shot.html stage (spec-synced heading + subtitle + tag chip over the live component), captured at 600x400 CSS px with a 2x device pixel ratio so every file is exactly 1200x800 by construction, then re-encoded to webp. `bun run previews` with no args wipes assets/previews and reshoots all; `bun run previews natal-chart aspects-table` reshoots only those slugs and leaves the rest byte-identical.
 *
 * @remarks Preview files are COMMITTED (sync-catalog reads them; check-previews gates them). Never gitignore assets/previews. The catalog preview URLs are wired in the separate catalog-sync step, not here.
 */
import {
	existsSync,
	mkdirSync,
	readdirSync,
	statSync,
	unlinkSync,
} from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { ensureServer, PREVIEW_BASE_URL, setTheme } from './shot-utils.js';

const OUT_DIR = resolve('assets/previews');
const SHOT_URL = `${PREVIEW_BASE_URL}/shot.html`;
const THEMES = ['light', 'dark'] as const;

/**
 * Per-slug presentation tuning. `scale` multiplies the mounted component (top-anchored, so it grows into the bottom bleed) when a component renders too small to fill the stage, or SHRINKS one that is too tall for its own tile to be recognisable. Presentation only: the stage stays 600x400, so the output is always 1200x800.
 */
const OVERRIDES: Record<string, { scale?: number }> = {
	// Half again taller than it is wide, so at 1x the tile frames only the crown. A
	// thumbnail has to be recognisable at rail size rather than legible.
	bodygraph: { scale: 0.5 },
	// Compact single-value cards read as lost in the stage at 1x; lift them so the
	// render fills the frame and still bleeds off the bottom.
	'moon-phase': { scale: 1.15 },
	'profection-card': { scale: 1.12 },
	'nakshatra-card': { scale: 1.1 },
	'dosha-card': { scale: 1.1 },
	'numerology-card': { scale: 1.12 },
	'dream-card': { scale: 1.1 },
	'reference-card': { scale: 1.12 },
};

const ONLY = new Set(process.argv.slice(2));

async function main() {
	if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
	if (ONLY.size === 0) {
		// Full run: wipe so a removed component cannot leave an orphan preview.
		for (const f of readdirSync(OUT_DIR)) {
			if (f.endsWith('.webp')) unlinkSync(resolve(OUT_DIR, f));
		}
	}

	const server = await ensureServer();
	const browser = await chromium.launch();
	const context = await browser.newContext({
		viewport: { width: 720, height: 920 },
		deviceScaleFactor: 2,
	});
	const page = await context.newPage();
	const errors: string[] = [];
	page.on('pageerror', (e) => errors.push(e.message));

	let shot = 0;
	try {
		await page.goto(SHOT_URL, { waitUntil: 'networkidle' });
		if (errors.length) {
			throw new Error(
				`shot.html raised page errors:\n  ${errors.join('\n  ')}`,
			);
		}

		// The stage headings use Fraunces/Jost; force them in before awaiting
		// fonts.ready so no capture falls back to a system serif (the runbook's
		// half-drawn/fallback-font failure mode).
		await page.evaluate(async () => {
			await Promise.all([
				document.fonts.load('560 28px Fraunces'),
				document.fonts.load('400 14px Jost'),
			]);
			await document.fonts.ready;
		});
		await page.waitForTimeout(1200);

		const allSlugs: string[] = await page.evaluate(
			() =>
				(window as unknown as { __STAGE_SLUGS__: string[] }).__STAGE_SLUGS__,
		);
		if (!allSlugs?.length) {
			throw new Error(
				'shot.js produced no stages (check ROXY_COMPONENTS / demos)',
			);
		}
		const unknown = [...ONLY].filter((s) => !allSlugs.includes(s));
		if (unknown.length) {
			throw new Error(`No preview stage matches: ${unknown.join(', ')}`);
		}
		const selected = ONLY.size ? allSlugs.filter((s) => ONLY.has(s)) : allSlugs;

		// Presentation-only scaling, applied once (identical across themes).
		for (const slug of selected) {
			const scale = OVERRIDES[slug]?.scale;
			if (scale) {
				await page.evaluate(
					({ slug, scale }) => {
						document
							.querySelector(`#stage-${slug} .stage-mount`)
							?.setAttribute('style', `--body-scale:${scale}`);
					},
					{ slug, scale },
				);
			}
		}

		for (const theme of THEMES) {
			console.log(`Theme: ${theme}`);
			await setTheme(page, theme);
			// Extra settle beyond setTheme's 120ms so chart SVGs and gradients
			// finish repainting under the new tokens before the element screenshot.
			await page.waitForTimeout(200);
			for (const slug of selected) {
				const buf = await page
					.locator(`#stage-${slug}`)
					.screenshot({ type: 'png' });
				const outPath = resolve(OUT_DIR, `${slug}-${theme}.webp`);
				await sharp(buf).webp({ quality: 82, effort: 6 }).toFile(outPath);
				shot++;
				const { size } = statSync(outPath);
				console.log(`  ${slug}-${theme}: ${(size / 1024).toFixed(1)} KB`);
			}
		}
	} finally {
		await context.close();
		await browser.close();
		await server.stop();
	}
	console.log(`\nDone. ${shot} previews written to ${OUT_DIR}`);
}

await main();
