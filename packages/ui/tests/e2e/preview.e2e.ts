import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

/**
 * The single-component preview page, proved over the whole catalog.
 *
 * @remarks
 * `preview.html` writes no per-component markup: it resolves `?c={slug}` through
 * the same manifest globals the showcase reads, mounts the first demo for that
 * tag, and lets the deferred sample module hydrate it by id. That claim is only
 * worth anything if it holds for EVERY published slug, so the sweep below walks
 * the catalog rather than a sample of it, and names the slug it stopped on.
 *
 * The three things a component needs here, checked in that order, because each
 * one failing means something different: the element is in the document (the
 * slug resolved), it has an open shadow root with content (the definition loaded
 * and the element upgraded), and `data` is set (the fixture reached it, which
 * only works while the definition script runs before the sample module).
 */

const CATALOG = JSON.parse(
	readFileSync('packages/ui/components-catalog.json', 'utf8'),
) as { components: Array<{ tag: string; slug: string }> };

/**
 * The two components that carry no fixture, because they fetch on their own and
 * a canned response would misrepresent them. Asserted in BOTH directions, so a
 * fixture added for either one fails here until the entry is removed, and a
 * component that quietly loses its fixture fails here too.
 */
const NO_FIXTURE = new Set(['roxy-endpoint-form', 'roxy-location-search']);

/** Read the mounted element back out of the page. `null` means the slug never mounted. */
async function probe(page: import('@playwright/test').Page, tag: string) {
	return page.evaluate((t: string) => {
		const el = document.querySelector(t) as
			| (HTMLElement & { data?: unknown })
			| null;
		if (!el) return null;
		return {
			upgraded: !!el.shadowRoot,
			rendered: (el.shadowRoot?.childElementCount ?? 0) > 0,
			hasData: el.data != null,
		};
	}, tag);
}

test('every catalog slug mounts, upgrades and hydrates', async ({
	page,
	browserName,
}) => {
	/**
	 * One engine, deliberately, and only for the exhaustive walk. What it proves is a
	 * RESOLUTION and WIRING contract no engine can answer differently: the slug finds
	 * a component, the definition script runs before the fixture module, and the
	 * element upgrades with data on it. Everything genuinely engine-dependent about
	 * these components, part rules through a real cascade, layout at three widths,
	 * theming and the accessibility passes, is covered per browser by the specs
	 * beside this one, and the two behavioural cases below still run everywhere.
	 */
	test.skip(
		browserName !== 'chromium',
		'engine-independent contract, swept once',
	);

	/**
	 * One navigation per slug in a single context, so the bundle and the sample
	 * module are fetched once and every later load is served from memory. Seventy
	 * plus warm navigations do not fit the suite default, and splitting this into a
	 * test per slug would trade a warm cache for a cold one on each.
	 */
	test.setTimeout(180_000);

	const failures: string[] = [];
	page.on('pageerror', (err) => failures.push(`uncaught: ${err.message}`));

	for (const { slug, tag } of CATALOG.components) {
		await page.goto(`/preview.html?c=${slug}`);
		await page
			.waitForFunction(
				(t: string) => {
					const el = document.querySelector(t) as
						| (HTMLElement & { data?: unknown })
						| null;
					return !!el?.shadowRoot && el.shadowRoot.childElementCount > 0;
				},
				tag,
				{ timeout: 15_000 },
			)
			.catch(() => undefined);

		const state = await probe(page, tag);
		expect(state, `${slug}: <${tag}> never mounted`).not.toBeNull();
		expect(state?.upgraded, `${slug}: <${tag}> was never upgraded`).toBe(true);
		expect(state?.rendered, `${slug}: <${tag}> rendered nothing`).toBe(true);
		expect(
			state?.hasData,
			NO_FIXTURE.has(tag)
				? `${slug}: <${tag}> now has a fixture, so remove it from NO_FIXTURE`
				: `${slug}: <${tag}> has no data, so the fixture never reached it`,
		).toBe(!NO_FIXTURE.has(tag));
	}

	expect(failures, failures.join('\n')).toEqual([]);
});

test('an unrecognised slug renders a line and mounts nothing', async ({
	page,
}) => {
	const hostile = '<script>alert(1)</script>';
	await page.goto(`/preview.html?c=${encodeURIComponent(hostile)}`);

	await expect(page.locator('#mount')).toContainText('Unknown component');
	expect(await page.locator('#mount *[id]').count()).toBe(0);
	// The value never reaches the document, as markup or as text.
	expect(await page.content()).not.toContain('alert(1)');
});

test('the requested theme is on the root before the component paints', async ({
	page,
}) => {
	await page.goto('/preview.html?c=natal-chart&theme=dark');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

	await page.goto('/preview.html?c=natal-chart&theme=sideways');
	expect(
		await page.evaluate(() => document.documentElement.dataset.theme),
	).toBeUndefined();
});
