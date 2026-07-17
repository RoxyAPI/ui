#!/usr/bin/env bun
/**
 * Headless Chrome walks every component section in the docs preview and
 * fails on any drift symptom: literal "[object Object]", "undefined", "NaN",
 * or "No X data" empty states. Run before screenshots and on every push.
 */

import { chromium, type Page } from '@playwright/test';

const BASE = 'http://localhost:3001';

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
	return page.evaluate(() => {
		// Sections are derived from the SAME demo manifest the page renders from
		// (window.ROXY_UI_DEMOS), so the audit can never silently drift behind a
		// newly added component. Plus ssr-markup, the one markup-hydration demo
		// hardcoded in index.html (data from a child JSON script, not a card).
		const demos = (window as unknown as { ROXY_UI_DEMOS?: { id: string }[] })
			.ROXY_UI_DEMOS;
		const sections = [
			...(demos ?? []).map((d) => ({ id: d.id })),
			{ id: 'ssr-markup' },
		];
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
	});
}

/**
 * Walk three self-fetch FORM-mode scenarios against the local spec mirror (no
 * real network): a horoscope tile picker with a selection made, a natal form
 * with the city search and date input visible, and a zero-required iching cast
 * that reduces to one button. Asserting the INPUT UI renders is the point; the
 * shared FORBIDDEN scan runs on each form's text too.
 */
async function auditForms(
	page: Page,
): Promise<{ section: string; issues: string[]; text: string }[]> {
	// Block any live API call so a tile auto-submit fails cleanly instead of
	// reaching production; the input UI is what we assert, not a result.
	await page.route('**/api/v2/**', (route) => route.abort());

	await page.evaluate(() => {
		const scenarios = [
			{
				id: 'form-horoscope',
				endpoint: 'astrology/horoscope/{sign}/daily',
				method: 'GET',
			},
			{ id: 'form-natal', endpoint: 'astrology/natal-chart', method: 'POST' },
			{ id: 'form-iching', endpoint: 'iching/cast', method: 'GET' },
		];
		const host = document.createElement('div');
		host.id = 'roxy-audit-forms';
		for (const s of scenarios) {
			const el = document.createElement('roxy-endpoint-form');
			el.id = s.id;
			el.setAttribute('data-endpoint', s.endpoint);
			el.setAttribute('method', s.method);
			// Same-origin local mirror the preview serves, so no external fetch.
			el.setAttribute('spec-url', './openapi.json');
			host.appendChild(el);
		}
		document.body.appendChild(host);
	});
	// Let each form fetch and digest the local spec mirror.
	await page.waitForTimeout(2000);
	// Make a selection on the sign picker (auto-submit fetch is aborted).
	await page.evaluate(() => {
		const f = document.getElementById('form-horoscope');
		const tile = f?.shadowRoot?.querySelector(
			'[data-tile="0"]',
		) as HTMLElement | null;
		tile?.click();
	});
	await page.waitForTimeout(300);

	return page.evaluate(() => {
		const sr = (id: string) =>
			(document.getElementById(id) as { shadowRoot?: ShadowRoot | null } | null)
				?.shadowRoot ?? null;
		const findings: { section: string; issues: string[]; text: string }[] = [];

		const horoscope = sr('form-horoscope');
		const hIssues: string[] = [];
		if (!horoscope?.querySelector('[role="radiogroup"]'))
			hIssues.push('no tile radiogroup rendered');
		if ((horoscope?.querySelectorAll('[role="radio"]').length ?? 0) !== 12)
			hIssues.push('expected 12 sign tiles');
		if (!horoscope?.querySelector('[role="radio"][aria-checked="true"]'))
			hIssues.push('sign selection did not register');
		findings.push({
			section: 'form-horoscope',
			issues: hIssues,
			text: horoscope?.textContent ?? '',
		});

		const natal = sr('form-natal');
		const nIssues: string[] = [];
		if (!natal?.querySelector('roxy-location-search'))
			nIssues.push('no city search block');
		if (!natal?.querySelector('input[type="date"]'))
			nIssues.push('no date input');
		findings.push({
			section: 'form-natal',
			issues: nIssues,
			text: natal?.textContent ?? '',
		});

		const iching = sr('form-iching');
		const iIssues: string[] = [];
		if (!iching?.querySelector('button.submit'))
			iIssues.push('no one-click cast button');
		findings.push({
			section: 'form-iching',
			issues: iIssues,
			text: iching?.textContent ?? '',
		});

		return findings;
	});
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
	// Form-mode scenarios join the same drift + issue reporting.
	raw.push(...(await auditForms(page)));

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
