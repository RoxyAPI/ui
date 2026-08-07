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
import { ensureServer, setTheme } from './shot-utils.js';

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
	{ id: 'transit-wheel', label: 'transit-wheel' },
	{ id: 'aspects-table', label: 'aspects-table' },
	{ id: 'astrocartography', label: 'astrocartography-map' },
	{ id: 'local-space', label: 'local-space-compass' },
	{ id: 'relocation', label: 'relocation-wheel' },
	{ id: 'asteroids', label: 'positions-table' },
	{ id: 'fixed-stars', label: 'fixed-stars' },
	{ id: 'profections', label: 'profection-card' },
	{ id: 'moon', label: 'moon-phase' },
	{ id: 'horoscope', label: 'horoscope-card' },
	{ id: 'compat', label: 'compatibility-card' },
	{ id: 'kundli', label: 'vedic-kundli' },
	{ id: 'divisional', label: 'divisional-chart' },
	{ id: 'kp-chart', label: 'kp-chart' },
	{ id: 'vedic-planets', label: 'vedic-planets-table' },
	{ id: 'kp', label: 'kp-planets-table' },
	{ id: 'kp-ruling', label: 'kp-ruling-planets' },
	{ id: 'upagraha', label: 'upagraha-table' },
	{ id: 'heliacal', label: 'heliacal-table' },
	{ id: 'gochara', label: 'gochara-table' },
	{ id: 'bhava-bala', label: 'bhava-bala-table' },
	{ id: 'bhav-chalit', label: 'bhav-chalit-table' },
	{ id: 'chara-karakas', label: 'chara-karakas' },
	{ id: 'arudha', label: 'arudha-padas' },
	{ id: 'ashtakavarga', label: 'ashtakavarga-grid' },
	{ id: 'shadbala', label: 'shadbala-table' },
	{ id: 'dasha', label: 'dasha-timeline' },
	{ id: 'guna', label: 'guna-milan' },
	{ id: 'panchang', label: 'panchang-table' },
	{ id: 'choghadiya', label: 'choghadiya-grid' },
	{ id: 'vedic-aspects', label: 'vedic-aspects' },
	{ id: 'hora-table', label: 'hora-table' },
	{ id: 'yoga', label: 'yoga-list' },
	{ id: 'nakshatra', label: 'nakshatra-card' },
	{ id: 'dosha', label: 'dosha-card' },
	{ id: 'num', label: 'numerology-card' },
	{ id: 'tarot', label: 'tarot-card' },
	{ id: 'spread', label: 'tarot-spread' },
	{ id: 'tarot-catalog', label: 'tarot-catalog' },
	{ id: 'bodygraph', label: 'bodygraph' },
	{ id: 'hd-type-card', label: 'hd-type-card' },
	{ id: 'hd-connection', label: 'hd-connection' },
	{ id: 'hd-penta', label: 'hd-penta' },
	{ id: 'hd-variables', label: 'hd-variables' },
	{ id: 'forecast-timeline', label: 'forecast-timeline' },
	{ id: 'forecast-digest', label: 'forecast-digest' },
	{ id: 'bio', label: 'biorhythm-chart' },
	{ id: 'hex', label: 'hexagram' },
	{ id: 'dream', label: 'dream-card' },
	{ id: 'dream-search', label: 'dream-search' },
	{ id: 'angel-card', label: 'angel-number-card' },
	{ id: 'angel-lookup', label: 'angel-number-lookup' },
	{ id: 'angel-lookup-unknown', label: 'angel-number-lookup-unknown' },
	{ id: 'crystals', label: 'crystal-grid' },
	{ id: 'crystal-card', label: 'crystal-card' },
	{ id: 'reference-card', label: 'reference-card' },
	{ id: 'form', label: 'endpoint-form' },
	{ id: 'loc', label: 'location-search' },
	{ id: 'data', label: 'data' },
];

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

/**
 * Optional CLI filter: `bun run screenshots bodygraph hd-variables` reshoots only
 * those targets (by label or section id) and leaves every other committed asset
 * byte-identical, so a change to one component does not churn 128 binaries. With
 * no argument every target is reshot and the directory is wiped first, so a
 * removed component cannot linger.
 */
const ONLY = new Set(process.argv.slice(2));
const SELECTED = ONLY.size
	? TARGETS.filter((t) => ONLY.has(t.label) || ONLY.has(t.id))
	: TARGETS;

async function main() {
	if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
	if (SELECTED.length === 0) {
		throw new Error(`No screenshot target matches: ${[...ONLY].join(', ')}`);
	}
	if (ONLY.size === 0) {
		// Wipe stale screenshots so removed components don't linger.
		for (const f of readdirSync(OUT_DIR)) {
			if (/\.(png|webp)$/.test(f)) unlinkSync(resolve(OUT_DIR, f));
		}
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
			for (const target of SELECTED) {
				await shoot(page, target, theme);
			}
		}
	} finally {
		await context.close();
		await browser.close();
		await server.stop();
	}
	console.log(
		`\nDone. ${SELECTED.length * 2} screenshots written to ${OUT_DIR}`,
	);
}

await main();
