#!/usr/bin/env bun
/**
 * Headless Chrome walks every component section in the docs preview and
 * fails on any drift symptom: literal "[object Object]", "undefined", "NaN",
 * or "No X data" empty states. Run before screenshots and on every push.
 */

import { chromium, type Page } from '@playwright/test';

const BASE = 'http://localhost:3001';

interface Section {
	id: string;
	tag: string;
}

const SECTIONS: Section[] = [
	{ id: 'natal', tag: 'roxy-natal-chart' },
	{ id: 'synastry', tag: 'roxy-synastry-chart' },
	{ id: 'western-planets', tag: 'roxy-western-planets-table' },
	{ id: 'transits', tag: 'roxy-transits-table' },
	{ id: 'moon', tag: 'roxy-moon-phase' },
	{ id: 'horoscope', tag: 'roxy-horoscope-card' },
	{ id: 'compat', tag: 'roxy-compatibility-card' },
	{ id: 'kundli', tag: 'roxy-vedic-kundli' },
	{ id: 'divisional', tag: 'roxy-divisional-chart' },
	{ id: 'kp-chart', tag: 'roxy-kp-chart' },
	{ id: 'vedic-planets', tag: 'roxy-vedic-planets-table' },
	{ id: 'kp', tag: 'roxy-kp-planets-table' },
	{ id: 'kp-ruling', tag: 'roxy-kp-ruling-planets' },
	{ id: 'ashtakavarga', tag: 'roxy-ashtakavarga-grid' },
	{ id: 'shadbala', tag: 'roxy-shadbala-table' },
	{ id: 'dasha', tag: 'roxy-dasha-timeline' },
	{ id: 'guna', tag: 'roxy-guna-milan' },
	{ id: 'panchang', tag: 'roxy-panchang-table' },
	{ id: 'choghadiya', tag: 'roxy-choghadiya-grid' },
	{ id: 'yoga', tag: 'roxy-yoga-list' },
	{ id: 'nakshatra', tag: 'roxy-nakshatra-card' },
	{ id: 'dosha', tag: 'roxy-dosha-card' },
	{ id: 'num', tag: 'roxy-numerology-card' },
	{ id: 'tarot', tag: 'roxy-tarot-card' },
	{ id: 'spread', tag: 'roxy-tarot-spread' },
	{ id: 'bio', tag: 'roxy-biorhythm-chart' },
	{ id: 'hex', tag: 'roxy-hexagram' },
	{ id: 'form', tag: 'roxy-endpoint-form' },
	{ id: 'loc', tag: 'roxy-location-search' },
	{ id: 'data', tag: 'roxy-data' },
];

const FORBIDDEN: Array<{ pattern: RegExp; label: string }> = [
	{
		pattern: /\[object Object\]/,
		label: '[object Object] — component rendered an object directly',
	},
	{ pattern: /\bundefined\b/, label: 'literal "undefined" leaked into UI' },
	{ pattern: /^\s*NaN\s*$/m, label: 'NaN value rendered' },
	{
		pattern: /\bNo .{1,40} data\b/i,
		label: 'empty state — component received null or wrong-shape data',
	},
	{
		pattern:
			/\bNo (chart|tarot|numerology|moon|synastry|panchang|dasha|dosha|biorhythm|kundli|kp|guna|hexagram) (data|spread|reading)?\b/i,
		label: 'component-specific empty state',
	},
];

async function audit(
	page: Page,
): Promise<{ section: string; issues: string[] }[]> {
	return page.evaluate((sections) => {
		const findings: { section: string; issues: string[] }[] = [];
		for (const sec of sections) {
			const issues: string[] = [];
			const host = document.getElementById(sec.id) as HTMLElement | null;
			if (!host) {
				issues.push('component element not found in DOM');
				findings.push({ section: sec.id, issues });
				continue;
			}
			const text = (() => {
				const parts: string[] = [];
				const visit = (root: Element | ShadowRoot) => {
					const sr = (root as Element & { shadowRoot?: ShadowRoot | null })
						.shadowRoot;
					if (sr) parts.push(sr.textContent ?? '');
					else parts.push(root.textContent ?? '');
					root.querySelectorAll('*').forEach((el) => {
						const inner = (el as Element & { shadowRoot?: ShadowRoot | null })
							.shadowRoot;
						if (inner) parts.push(inner.textContent ?? '');
					});
				};
				visit(host);
				return parts.join('\n');
			})();
			findings.push({ section: sec.id, issues, text } as never);
		}
		return findings as never;
	}, SECTIONS);
}

async function main() {
	const browser = await chromium.launch();
	const ctx = await browser.newContext({
		viewport: { width: 800, height: 1200 },
	});
	const page = await ctx.newPage();
	const consoleErrors: string[] = [];
	page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
	page.on('console', (m) => {
		if (m.type() === 'error') consoleErrors.push(`console: ${m.text()}`);
	});

	await page.goto(BASE, { waitUntil: 'networkidle' });
	await page.waitForTimeout(1500);

	const raw = (await audit(page)) as unknown as Array<{
		section: string;
		issues: string[];
		text: string;
	}>;

	let fail = 0;
	for (const r of raw) {
		const hits: string[] = [];
		for (const { pattern, label } of FORBIDDEN) {
			if (pattern.test(r.text)) hits.push(label);
		}
		if (r.issues.length || hits.length) {
			fail += 1;
			console.log(`✗ ${r.section}`);
			for (const i of r.issues) console.log(`    · ${i}`);
			for (const h of hits) console.log(`    · ${h}`);
		} else {
			console.log(`✓ ${r.section}`);
		}
	}

	if (consoleErrors.length) {
		console.log(
			`\n${consoleErrors.length} runtime error${consoleErrors.length === 1 ? '' : 's'}:`,
		);
		for (const e of consoleErrors) console.log(`    ${e}`);
		fail += 1;
	}

	await browser.close();
	console.log(
		`\n${fail === 0 ? 'PASS' : `FAIL (${fail} section${fail === 1 ? '' : 's'})`}`,
	);
	process.exit(fail === 0 ? 0 : 1);
}

await main();
