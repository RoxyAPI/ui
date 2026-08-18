import { readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';

/**
 * The language path, end to end, in the one place it can actually be exercised.
 *
 * @remarks
 * Every other check on the catalogues is static: the unit suite proves each locale holds exactly the English key set, that nothing is left sitting as its source string, and that a component writes no words of its own. None of that proves the payload BUILDS, resolves, and reaches a mounted component, which is a chain of four separate things (a per-language bundle, a global registry, the page language, and a re-render on late arrival) and every one of them can break without a single unit test noticing.
 *
 * So this drives the same switch a host page makes: set the page language, load the one payload, and read what the components render. The showcase control is the subject rather than a fixture, so the demo everybody looks at is also the thing under test.
 */

/** A card whose heading differs from its English source in EVERY shipped language, so each case can assert the change without a per-language table. A Sanskrit-titled card is the wrong subject here: several catalogues print those names as themselves by design, and a heading that is legitimately unchanged is indistinguishable from a payload that never arrived. */
const SUBJECT = 'roxy-natal-chart';

/** The payloads the build emits, read from the directory the build reads, so a new language is covered without this file being edited. Checked against what the page actually offers, so the two cannot drift apart. */
const SHIPPED = readdirSync('packages/ui/src/locales', { withFileTypes: true })
	.filter((e) => e.isFile() && e.name.endsWith('.ts'))
	.map((e) => e.name.replace(/\.ts$/, ''))
	.sort();

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
	// And the payloads on disk are the ones the page knows about, so the list the
	// case below walks cannot drift from the list the control offers.
	expect(shipped).toEqual(SHIPPED);

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
	// Seven payload fetches on one page load, budgeted explicitly because the work
	// is real. A case per language would name the failure by itself, but it also
	// reloads the whole showcase seven times per browser for the same coverage, so
	// the language is carried in the assertion message instead.
	test.setTimeout(120_000);
	await page.goto('/');
	const english = await page.evaluate(headingOf, SUBJECT);
	expect(english.length).toBeGreaterThan(0);

	for (const lang of SHIPPED) {
		await page.selectOption('#lang-select', lang);
		await expect
			.poll(() => page.evaluate(() => document.documentElement.lang))
			.toBe(lang);
		// The payload is a separate request, so the render lands after it does, and
		// a heading still reading English means it never arrived.
		await expect
			.poll(() => page.evaluate(headingOf, SUBJECT), {
				// A fetch and a re-render, which under a loaded machine takes longer
				// than the 5s this would otherwise default to. It still fails fast on a
				// payload that never arrives, since that never resolves at all.
				timeout: 15_000,
				message: `the ${lang} payload never replaced the English heading`,
			})
			.not.toBe(english);
	}
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
