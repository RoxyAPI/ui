import type { Page } from '@playwright/test';

/** Resolves once every demo host has drawn something besides its stylesheet, so a measurement never reads a half-rendered card. */
export async function demosRendered(page: Page): Promise<void> {
	await page.waitForFunction(() => {
		const demos =
			(window as unknown as { ROXY_UI_DEMOS?: { id: string }[] })
				.ROXY_UI_DEMOS ?? [];
		return (
			demos.length > 0 &&
			demos.every((d) => {
				const sr = document.getElementById(d.id)?.shadowRoot;
				return Boolean(
					sr && [...sr.children].some((n) => n.tagName !== 'STYLE'),
				);
			})
		);
	});
}

/** Resolves once the chrome catalogue for `lang` has registered, which is what makes every card re-render in that language. */
export async function localeLoaded(page: Page, lang: string): Promise<void> {
	await page.waitForFunction(
		(code) =>
			Boolean(
				(
					globalThis as unknown as {
						__ROXY_UI_I18N__?: { catalogs: Record<string, unknown> };
					}
				).__ROXY_UI_I18N__?.catalogs[code],
			),
		lang,
	);
}
