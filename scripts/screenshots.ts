#!/usr/bin/env bun
/**
 * Capture every component section into assets/screenshots/{component}-{theme}.{png,webp}
 * at 2x DPR, light and dark. Run after `bun run build`. Auto-starts the
 * preview server if one is not already running.
 */
import {
	existsSync,
	mkdirSync,
	readdirSync,
	statSync,
	unlinkSync,
} from 'node:fs';
import { resolve } from 'node:path';
import { chromium, type Page } from '@playwright/test';
import sharp from 'sharp';

const OUT_DIR = resolve('assets/screenshots');
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

interface Target {
	id: string;
	label: string;
}

const TARGETS: Target[] = [
	{ id: 'natal', label: 'natal-chart' },
	{ id: 'synastry', label: 'synastry-chart' },
	{ id: 'western-planets', label: 'western-planets-table' },
	{ id: 'transits', label: 'transits-table' },
	{ id: 'moon', label: 'moon-phase' },
	{ id: 'horoscope', label: 'horoscope-card' },
	{ id: 'compat', label: 'compatibility-card' },
	{ id: 'kundli', label: 'vedic-kundli' },
	{ id: 'divisional', label: 'divisional-chart' },
	{ id: 'kp-chart', label: 'kp-chart' },
	{ id: 'vedic-planets', label: 'vedic-planets-table' },
	{ id: 'kp', label: 'kp-planets-table' },
	{ id: 'kp-ruling', label: 'kp-ruling-planets' },
	{ id: 'ashtakavarga', label: 'ashtakavarga-grid' },
	{ id: 'shadbala', label: 'shadbala-table' },
	{ id: 'dasha', label: 'dasha-timeline' },
	{ id: 'guna', label: 'guna-milan' },
	{ id: 'panchang', label: 'panchang-table' },
	{ id: 'choghadiya', label: 'choghadiya-grid' },
	{ id: 'yoga', label: 'yoga-list' },
	{ id: 'nakshatra', label: 'nakshatra-card' },
	{ id: 'dosha', label: 'dosha-card' },
	{ id: 'num', label: 'numerology-card' },
	{ id: 'tarot', label: 'tarot-card' },
	{ id: 'spread', label: 'tarot-spread' },
	{ id: 'bodygraph', label: 'bodygraph' },
	{ id: 'forecast-timeline', label: 'forecast-timeline' },
	{ id: 'bio', label: 'biorhythm-chart' },
	{ id: 'hex', label: 'hexagram' },
	{ id: 'form', label: 'endpoint-form' },
	{ id: 'loc', label: 'location-search' },
	{ id: 'data', label: 'data' },
];

async function ensureServer(): Promise<{ stop: () => Promise<void> }> {
	const probe = await fetch(BASE_URL).catch(() => null);
	if (probe?.ok) {
		console.log(`Reusing preview server at ${BASE_URL}`);
		return { stop: async () => {} };
	}
	console.log(`Starting preview server on ${BASE_URL}...`);
	const proc = Bun.spawn(['bun', 'run', 'preview'], {
		stdout: 'ignore',
		stderr: 'ignore',
	});
	for (let i = 0; i < 30; i++) {
		await new Promise((r) => setTimeout(r, 500));
		const res = await fetch(BASE_URL).catch(() => null);
		if (res?.ok) return { stop: async () => proc.kill() };
	}
	throw new Error('Preview server failed to start within 15s');
}

async function setTheme(page: Page, theme: 'light' | 'dark') {
	await page.evaluate((t: string) => {
		document.documentElement.dataset.theme = t;
		document.body.dataset.theme = t;
	}, theme);
	await page.waitForTimeout(120);
}

async function shoot(page: Page, target: Target, theme: 'light' | 'dark') {
	const card = page
		.locator(`#${target.id}`)
		.locator('xpath=ancestor::article[1]');
	const buf = await card.screenshot({ type: 'png', omitBackground: false });

	const pngPath = resolve(OUT_DIR, `${target.label}-${theme}.png`);
	const webpPath = resolve(OUT_DIR, `${target.label}-${theme}.webp`);

	await sharp(buf).png({ compressionLevel: 9, palette: false }).toFile(pngPath);
	await sharp(buf).webp({ quality: 88, effort: 6 }).toFile(webpPath);

	const png = statSync(pngPath).size;
	const webp = statSync(webpPath).size;
	console.log(
		`  ${target.label}-${theme}: ${(png / 1024).toFixed(1)} KB png, ${(webp / 1024).toFixed(1)} KB webp`,
	);
}

async function main() {
	if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
	// Wipe stale screenshots so removed components don't linger.
	for (const f of readdirSync(OUT_DIR)) {
		if (/\.(png|webp)$/.test(f)) unlinkSync(resolve(OUT_DIR, f));
	}

	const server = await ensureServer();
	const browser = await chromium.launch();
	const context = await browser.newContext({
		viewport: { width: 800, height: 2200 },
		deviceScaleFactor: 2,
	});
	const page = await context.newPage();

	try {
		await page.goto(BASE_URL, { waitUntil: 'networkidle' });
		await page.waitForTimeout(2500);

		for (const theme of ['light', 'dark'] as const) {
			console.log(`Theme: ${theme}`);
			await setTheme(page, theme);
			for (const target of TARGETS) {
				await shoot(page, target, theme);
			}
		}
	} finally {
		await context.close();
		await browser.close();
		await server.stop();
	}
	console.log(
		`\nDone. ${TARGETS.length * 2} screenshots written to ${OUT_DIR}`,
	);
}

await main();
