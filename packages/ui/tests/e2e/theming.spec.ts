import { expect, test } from '@playwright/test';

/**
 * The theming contract, enforced across EVERY component in BOTH modes.
 *
 * @remarks
 * Setting `--roxy-accent` on `:root` must rebrand the entire library, and it must keep doing so in dark mode, whichever of the three dark signals the host uses. Two separate bugs broke that and both shipped.
 *
 * `--roxy-accent-ink` and `--roxy-ring` were hardcoded amber, so one override left the active tab, the conjunction aspect lines and the focus ring two-tone. And the `[data-theme="dark"]` / `.dark` blocks carry class and attribute specificity (0,1,1), which outranks a consumer's plain `:root` (0,1,0), so their brand survived under `prefers-color-scheme` and was silently reverted to amber under the other two dark signals: one override, three different results.
 *
 * Every library selector is now wrapped in `:where()` (zero specificity) and the two shades derive from the accent, so a consumer declaration always wins and one line is genuinely enough. This test is what keeps that true.
 */

const AMBER = ['rgb(245, 158, 11)', 'rgb(180, 83, 9)', 'rgb(251, 191, 36)'];
const BRAND = '#8b5cf6';

const probeAll = (amber: string[]) => {
	const bad: string[] = [];
	let stale = 0;
	let nodes = 0;
	let components = 0;
	for (const host of document.querySelectorAll('*')) {
		if (!host.tagName.startsWith('ROXY-')) continue;
		const sr = (host as HTMLElement).shadowRoot;
		if (!sr) continue;
		components++;
		const walk = (root: ShadowRoot) => {
			const text = root.textContent ?? '';
			for (const token of ['[object Object]', 'undefined', 'NaN']) {
				if (text.includes(token))
					bad.push(`${host.tagName.toLowerCase()}: ${token}`);
			}
			for (const el of root.querySelectorAll('*')) {
				nodes++;
				const cs = getComputedStyle(el);
				for (const p of [
					'color',
					'fill',
					'stroke',
					'borderBottomColor',
					'outlineColor',
				] as const) {
					if (amber.includes(cs[p] as string)) stale++;
				}
				if ((el as HTMLElement).shadowRoot)
					walk((el as HTMLElement).shadowRoot!);
			}
		};
		walk(sr);
	}
	return { components, nodes, stale, bad: [...new Set(bad)].slice(0, 5) };
};

for (const mode of ['light', 'dark'] as const) {
	test(`a single --roxy-accent override rebrands every component in ${mode} mode`, async ({
		page,
	}) => {
		await page.emulateMedia({ colorScheme: mode });
		await page.goto('/');
		await page.waitForTimeout(2500);
		// Exactly what the README tells a customer to write. Nothing else.
		await page.addStyleTag({ content: `:root { --roxy-accent: ${BRAND}; }` });
		await page.waitForTimeout(800);

		const r = await page.evaluate(probeAll, AMBER);
		expect(r.components).toBeGreaterThan(40);
		expect(r.bad).toEqual([]);
		expect(r.stale).toBe(0);
	});
}

for (const signal of ['class', 'attribute'] as const) {
	test(`the override survives the ${signal} dark signal`, async ({ page }) => {
		await page.goto('/');
		await page.waitForTimeout(2500);
		await page.addStyleTag({ content: `:root { --roxy-accent: ${BRAND}; }` });
		await page.evaluate((s) => {
			if (s === 'class') document.documentElement.classList.add('dark');
			else document.documentElement.setAttribute('data-theme', 'dark');
		}, signal);
		await page.waitForTimeout(800);

		const seen = await page.evaluate(() =>
			getComputedStyle(document.documentElement)
				.getPropertyValue('--roxy-accent')
				.trim(),
		);
		expect(seen.toLowerCase()).toBe(BRAND);

		const r = await page.evaluate(probeAll, AMBER);
		expect(r.stale).toBe(0);
	});
}
