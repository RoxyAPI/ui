import { expect, test } from '@playwright/test';

/**
 * The language path, end to end, in the one place it can actually be exercised.
 *
 * @remarks
 * Every other check on the catalogues is static: the unit suite proves each locale holds exactly the English key set, that nothing is left sitting as its source string, and that a component writes no words of its own. None of that proves the payload BUILDS, resolves, and reaches a mounted component, which is a chain of four separate things (a per-language bundle, a global registry, the page language, and a re-render on late arrival) and every one of them can break without a single unit test noticing.
 *
 * So this drives the same switch a host page makes: set the page language, load the one payload, and read what the components render. The showcase control is the subject rather than a fixture, so the demo everybody looks at is also the thing under test.
 */

/** A card whose heading is translated in every shipped language, so the assertion needs no per-language table. */
const SUBJECT = 'roxy-panchang-table';

const headingOf = (tag: string) =>
	document
		.querySelector(tag)
		?.shadowRoot?.querySelector('h2')
		?.textContent?.trim() ?? '';

test('the control offers exactly the payloads the build emitted', async ({
	page,
}) => {
	await page.goto('/');
	const shipped = await page.evaluate(
		() => (window as unknown as { ROXY_LOCALES?: string[] }).ROXY_LOCALES ?? [],
	);
	expect(shipped.length).toBeGreaterThan(0);

	const values = await page.$$eval('#lang-select option', (o) =>
		o.map((x) => (x as HTMLOptionElement).value),
	);
	// English first and always, then one option per shipped payload. A hardcoded
	// list would drift the moment a language is added; this cannot.
	expect(values).toEqual(['en', ...shipped]);

	// Every option is named in its OWN language, which is what a reader picks by.
	const labels = await page.$$eval('#lang-select option', (o) =>
		o.map((x) => x.textContent?.trim() ?? ''),
	);
	expect(labels.every((l) => l.length > 0)).toBe(true);
	expect(new Set(labels).size).toBe(labels.length);
});

test('switching the control translates what the components write', async ({
	page,
}) => {
	await page.goto('/');
	const english = await page.evaluate(headingOf, SUBJECT);
	expect(english.length).toBeGreaterThan(0);

	const shipped = await page.evaluate(
		() => (window as unknown as { ROXY_LOCALES?: string[] }).ROXY_LOCALES ?? [],
	);
	const seen = new Map<string, string>();
	for (const lang of shipped) {
		await page.selectOption('#lang-select', lang);
		await expect
			.poll(() => page.evaluate(() => document.documentElement.lang))
			.toBe(lang);
		// The payload is a separate request, so the render lands after it does.
		await expect
			.poll(() => page.evaluate(headingOf, SUBJECT), { timeout: 5000 })
			.not.toBe('');
		seen.set(lang, await page.evaluate(headingOf, SUBJECT));
	}

	// At least one language must differ from English, or the payload never
	// arrived and every assertion above would still pass on the fallback.
	expect([...seen.values()].some((v) => v !== english)).toBe(true);
});

test('English loads no payload, because the key is the English source', async ({
	page,
}) => {
	const requested: string[] = [];
	page.on('request', (r) => {
		if (r.url().includes('/locales/')) requested.push(r.url());
	});

	await page.goto('/');
	await page.selectOption('#lang-select', 'en');
	await expect
		.poll(() => page.evaluate(() => document.documentElement.lang))
		.toBe('en');
	expect(requested).toEqual([]);
});
