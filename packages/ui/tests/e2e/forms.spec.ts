import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

/**
 * Accessibility of the self-fetch input system (Phase 1). The showcase axe suite
 * covers the number/text form (numerology life-path); this mounts the input
 * kinds it does not exercise (the zodiac tile radiogroup, a boolean toggle
 * switch, the city-search location block, and person-group card fieldsets) and
 * scans them in light and dark. Forms read the same-origin local spec mirror;
 * any live API call is aborted, since the input UI is what we assert.
 */

const FORMS = [
	{
		id: 'e2e-horoscope',
		endpoint: 'astrology/horoscope/{sign}/daily',
		method: 'GET',
	},
	{ id: 'e2e-tarot-draw', endpoint: 'tarot/draw', method: 'POST' },
	{ id: 'e2e-natal', endpoint: 'astrology/natal-chart', method: 'POST' },
	{ id: 'e2e-synastry', endpoint: 'astrology/synastry', method: 'POST' },
];

async function mountForms(page: Page): Promise<void> {
	await page.route('**/api/v2/**', (route) => route.abort());
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	await page.evaluate((forms) => {
		const host = document.createElement('div');
		host.id = 'roxy-e2e-forms';
		host.style.padding = '24px';
		for (const f of forms) {
			const el = document.createElement('roxy-endpoint-form');
			el.id = f.id;
			el.setAttribute('data-endpoint', f.endpoint);
			el.setAttribute('method', f.method);
			el.setAttribute('spec-url', './openapi.json');
			host.appendChild(el);
		}
		document.body.prepend(host);
	}, FORMS);
	// Wait until each form has digested the spec and rendered its inputs.
	await page.waitForFunction(() => {
		const ho = document.getElementById('e2e-horoscope');
		const sy = document.getElementById('e2e-synastry');
		return (
			!!ho?.shadowRoot?.querySelector('[role="radiogroup"]') &&
			!!sy?.shadowRoot?.querySelector('fieldset.person-group')
		);
	});
}

async function scan(page: Page): Promise<void> {
	const results = await new AxeBuilder({ page })
		.include('#roxy-e2e-forms')
		.analyze();
	const blocking = results.violations.filter((v) => v.impact !== 'minor');
	expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
}

test.describe('self-fetch input a11y', () => {
	test('the tile picker, toggle, location, and group cards render their ARIA roles', async ({
		page,
	}) => {
		await mountForms(page);
		const roles = await page.evaluate(() => {
			const sr = (id: string) =>
				(
					document.getElementById(id) as {
						shadowRoot?: ShadowRoot | null;
					} | null
				)?.shadowRoot ?? null;
			return {
				radios:
					sr('e2e-horoscope')?.querySelectorAll('[role="radio"]').length ?? 0,
				toggle: !!sr('e2e-tarot-draw')?.querySelector('[role="switch"]'),
				location: !!sr('e2e-natal')?.querySelector('roxy-location-search'),
				cards:
					sr('e2e-synastry')?.querySelectorAll('fieldset.person-group')
						.length ?? 0,
			};
		});
		expect(roles.radios).toBe(12);
		expect(roles.toggle).toBe(true);
		expect(roles.location).toBe(true);
		expect(roles.cards).toBeGreaterThanOrEqual(2);
	});

	test('passes axe on light theme', async ({ page }) => {
		await mountForms(page);
		await scan(page);
	});

	test('passes axe on dark theme', async ({ page }) => {
		await mountForms(page);
		await page.locator('#theme-dark').click();
		await scan(page);
	});
});

/**
 * The practitioner preset restyles every widget on a page from one theme link. This mounts a horoscope form under the preset and proves the visible result: the sign tiles still render, the heading picks up the serif display font (via `--roxy-font-display`), and the rosewater palette clears axe in light and dark.
 */
test.describe('practitioner theme preset', () => {
	async function mountThemed(page: Page): Promise<void> {
		await page.route('**/api/v2/**', (route) => route.abort());
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.addStyleTag({ url: '/dist/styles/themes/practitioner.css' });
		await page.evaluate(() => {
			const host = document.createElement('div');
			host.id = 'roxy-practitioner';
			host.style.padding = '24px';
			const el = document.createElement('roxy-endpoint-form');
			el.id = 'p-horoscope';
			el.setAttribute('data-endpoint', 'astrology/horoscope/{sign}/daily');
			el.setAttribute('method', 'GET');
			el.setAttribute('spec-url', './openapi.json');
			host.appendChild(el);
			document.body.prepend(host);
		});
		await page.waitForFunction(
			() =>
				!!document
					.getElementById('p-horoscope')
					?.shadowRoot?.querySelector('[role="radiogroup"]'),
		);
	}

	test('renders the sign tiles and applies the serif display font', async ({
		page,
	}) => {
		await mountThemed(page);
		const info = await page.evaluate(() => {
			const sr = document.getElementById('p-horoscope')?.shadowRoot;
			const title = sr?.querySelector('.title');
			return {
				radios: sr?.querySelectorAll('[role="radio"]').length ?? 0,
				titleFont: title ? getComputedStyle(title as Element).fontFamily : '',
			};
		});
		expect(info.radios).toBe(12);
		// --roxy-font-display resolves to the Fraunces serif stack under the preset.
		expect(info.titleFont.toLowerCase()).toContain('fraunces');
	});

	test('passes axe in light and dark under the preset', async ({ page }) => {
		await mountThemed(page);
		const scanThemed = async () => {
			const results = await new AxeBuilder({ page })
				.include('#roxy-practitioner')
				.analyze();
			const blocking = results.violations.filter((v) => v.impact !== 'minor');
			expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
		};
		await scanThemed();
		await page.locator('#theme-dark').click();
		await scanThemed();
	});
});
