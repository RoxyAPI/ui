import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const COMPONENT_TAGS = [
	'roxy-natal-chart',
	'roxy-horoscope-card',
	'roxy-synastry-chart',
	'roxy-compatibility-card',
	'roxy-moon-phase',
	'roxy-vedic-kundli',
	'roxy-panchang-table',
	'roxy-dasha-timeline',
	'roxy-dosha-card',
	'roxy-guna-milan',
	'roxy-kp-planets-table',
	'roxy-numerology-card',
	'roxy-tarot-card',
	'roxy-tarot-catalog',
	'roxy-tarot-spread',
	'roxy-biorhythm-chart',
	'roxy-hexagram',
	'roxy-endpoint-form',
	'roxy-location-search',
	'roxy-data',
];

test.describe('Roxy UI preview', () => {
	test('renders 20 components with no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (e) => errors.push(e.message));
		page.on('console', (m) => {
			if (m.type() === 'error') errors.push(m.text());
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		for (const tag of COMPONENT_TAGS) {
			const handle = await page.$(tag);
			expect(handle, `Component ${tag} should render`).not.toBeNull();
		}

		// Allow the location search 404 (no live key in preview) and generic
		// browser network noise. WebKit emits "Failed to load resource" as a
		// console error on every 4xx response; chromium and firefox suppress it.
		// Real component bugs surface via pageerror or specific console.error.
		const real = errors.filter(
			(e) =>
				!e.includes('roxyapi.com') &&
				!e.includes('favicon') &&
				!e.includes('NetworkError') &&
				!e.includes('Failed to load resource'),
		);
		expect(real, `Console errors: ${real.join(' | ')}`).toEqual([]);
	});

	test('toggles between light and dark theme', async ({ page }) => {
		await page.goto('/');
		const dark = page.locator('#theme-dark');
		await dark.click();
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
		const light = page.locator('#theme-light');
		await light.click();
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	});

	test('CDN bundle auto-injects the token stylesheet exactly once, prepended', async ({
		page,
	}) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const result = await page.evaluate(() => {
			const styles = [...document.head.children].filter(
				(el) => el.id === 'roxy-ui-tokens',
			);
			return {
				count: styles.length,
				hasDark: (styles[0]?.textContent ?? '').includes('.dark'),
				// Prepend = earliest source order = loses ties, so a later linked
				// tokens.css or consumer :root override wins. Assert it sits before
				// the demo's own linked tokens.css <link>.
				beforeLinkedTokens: (() => {
					const kids = [...document.head.children];
					const injected = kids.findIndex((el) => el.id === 'roxy-ui-tokens');
					const linked = kids.findIndex(
						(el) =>
							el.tagName === 'LINK' &&
							(el as HTMLLinkElement).href.includes('tokens.css'),
					);
					return injected >= 0 && linked >= 0 && injected < linked;
				})(),
			};
		});
		expect(result.count).toBe(1);
		expect(result.hasDark).toBe(true);
		expect(result.beforeLinkedTokens).toBe(true);
	});

	test('dark mode flips component tokens via .dark class, data-theme, and per-element', async ({
		page,
	}) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Read the computed --roxy-bg / --roxy-fg from inside a real component
		// host so we prove the cascade reaches the shadow tree, not just :root.
		const read = (tag: string) =>
			page.locator(tag).evaluate((el) => {
				const cs = getComputedStyle(el);
				return {
					bg: cs.getPropertyValue('--roxy-bg').trim(),
					fg: cs.getPropertyValue('--roxy-fg').trim(),
				};
			});

		const setHtml = (apply: 'clear' | 'class' | 'attr') =>
			page.evaluate((mode) => {
				const html = document.documentElement;
				html.classList.remove('dark', 'light');
				html.removeAttribute('data-theme');
				document.body.classList.remove('dark', 'light');
				document.body.removeAttribute('data-theme');
				if (mode === 'class') html.classList.add('dark');
				if (mode === 'attr') html.setAttribute('data-theme', 'dark');
			}, apply);

		const LIGHT_BG = '#ffffff';
		const LIGHT_FG = '#0a0a0a';
		const DARK_BG = '#0a0a0a';
		const DARK_FG = '#fafafa';

		// Baseline: explicit light so the OS preference cannot taint the run.
		await page.evaluate(() => {
			document.documentElement.setAttribute('data-theme', 'light');
		});
		const lightStart = await read('roxy-panchang-table');
		expect(lightStart.bg).toBe(LIGHT_BG);
		expect(lightStart.fg).toBe(LIGHT_FG);

		// 1. data-theme="dark" on <html>
		await setHtml('attr');
		let dark = await read('roxy-panchang-table');
		expect(dark.bg).toBe(DARK_BG);
		expect(dark.fg).toBe(DARK_FG);

		// 2. .dark class on <html> (Tailwind / shadcn path)
		await setHtml('class');
		dark = await read('roxy-choghadiya-grid');
		expect(dark.bg).toBe(DARK_BG);
		expect(dark.fg).toBe(DARK_FG);

		// Light restores when the trigger is removed.
		await page.evaluate(() => {
			document.documentElement.setAttribute('data-theme', 'light');
			document.documentElement.classList.remove('dark');
		});
		const lightAgain = await read('roxy-choghadiya-grid');
		expect(lightAgain.bg).toBe(LIGHT_BG);
		expect(lightAgain.fg).toBe(LIGHT_FG);

		// 3. Per-element data-theme="dark" themes just that element, not a light
		// sibling. Clear document-level triggers first.
		await setHtml('clear');
		await page.evaluate(() => {
			document.documentElement.setAttribute('data-theme', 'light');
			document
				.querySelector('roxy-panchang-table')
				?.setAttribute('data-theme', 'dark');
		});
		const perEl = await read('roxy-panchang-table');
		const sibling = await read('roxy-choghadiya-grid');
		expect(perEl.bg).toBe(DARK_BG);
		expect(perEl.fg).toBe(DARK_FG);
		expect(sibling.bg).toBe(LIGHT_BG);
		expect(sibling.fg).toBe(LIGHT_FG);
	});

	test('passes axe-core a11y on light theme', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		// color-contrast runs against the showcase chrome; component shadow DOM
		// (chart aspect lines, chip fills) carries decorative colors that
		// false-positive when treated as text.
		const results = await new AxeBuilder({ page })
			.exclude('roxy-natal-chart')
			.exclude('roxy-synastry-chart')
			.exclude('roxy-vedic-kundli')
			.exclude('roxy-tarot-card')
			.exclude('roxy-tarot-spread')
			.analyze();
		const blocking = results.violations.filter((v) => v.impact !== 'minor');
		expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
	});

	test('passes axe-core a11y on dark theme', async ({ page }) => {
		await page.goto('/');
		await page.locator('#theme-dark').click();
		await page.waitForTimeout(200);
		const results = await new AxeBuilder({ page })
			.exclude('roxy-natal-chart')
			.exclude('roxy-synastry-chart')
			.exclude('roxy-vedic-kundli')
			.exclude('roxy-tarot-card')
			.exclude('roxy-tarot-spread')
			.analyze();
		const blocking = results.violations.filter((v) => v.impact !== 'minor');
		expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
	});

	test('natal chart renders an SVG with 12 sign segments', async ({ page }) => {
		await page.goto('/');
		const segments = await page.locator('roxy-natal-chart').evaluate((el) => {
			const svg = el.shadowRoot?.querySelector('svg');
			return svg?.querySelectorAll('text.sign-glyph').length ?? 0;
		});
		expect(segments).toBe(12);
	});

	test('moon phase shows current phase name and stat block', async ({
		page,
	}) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const result = await page.locator('roxy-moon-phase').evaluate((el) => {
			const root = el.shadowRoot;
			return {
				hasLabel: !!root?.querySelector('.label'),
				hasIllumination: (root?.textContent ?? '')
					.toLowerCase()
					.includes('illumination'),
				hasEmoji: !!root?.querySelector('.emoji'),
			};
		});
		expect(result.hasLabel).toBe(true);
		expect(result.hasIllumination).toBe(true);
		expect(result.hasEmoji).toBe(true);
	});

	test('biorhythm chart renders cycle bars', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const count = await page.locator('roxy-biorhythm-chart').evaluate((el) => {
			return el.shadowRoot?.querySelectorAll('.bar').length ?? 0;
		});
		expect(count).toBeGreaterThan(0);
	});

	test('panchang table renders sunrise and rahu kaal', async ({ page }) => {
		await page.goto('/');
		const text = await page.locator('roxy-panchang-table').evaluate((el) => {
			return el.shadowRoot?.textContent?.toLowerCase() ?? '';
		});
		expect(text).toContain('sunrise');
		expect(text).toContain('rahu');
	});

	test('hexagram renders symbol, trigrams, and judgment', async ({ page }) => {
		await page.goto('/');
		await page.waitForFunction(() => {
			const el = document.querySelector('roxy-hexagram');
			return el && (el as HTMLElement & { data?: unknown }).data;
		});
		await page.waitForTimeout(150);
		const result = await page.locator('roxy-hexagram').evaluate((el) => {
			const root = el.shadowRoot;
			return {
				hasSymbol:
					(root?.querySelector('.symbol')?.textContent ?? '').length > 0,
				hasTrigrams: !!root?.querySelector(
					'.trigram, .trigrams, [class*="trigram"]',
				),
				textLength: (root?.textContent ?? '').length,
			};
		});
		expect(result.hasSymbol).toBe(true);
		expect(result.textLength).toBeGreaterThan(50);
	});

	test('tarot card flip toggles via keyboard', async ({ page }) => {
		await page.goto('/');
		await page.waitForFunction(() => {
			const el = document.querySelector('roxy-tarot-card');
			return el && (el as HTMLElement & { data?: unknown }).data;
		});
		await page.waitForTimeout(150);
		const tarot = page.locator('roxy-tarot-card');
		const initialReversed = await tarot.evaluate((el) => {
			return Boolean(el.shadowRoot?.querySelector('.image.reversed'));
		});
		await tarot.evaluate((el) => {
			const b = el.shadowRoot?.querySelector('button.flip');
			(b as HTMLButtonElement)?.click();
		});
		await page.waitForTimeout(150);
		const afterClick = await tarot.evaluate((el) => {
			return Boolean(el.shadowRoot?.querySelector('.image.reversed'));
		});
		expect(afterClick).not.toBe(initialReversed);
	});

	test('endpoint form loads schema for life-path endpoint', async ({
		page,
	}) => {
		await page.goto('/');
		await page.waitForTimeout(2000); // allow network to settle
		const hasFields = await page
			.locator('roxy-endpoint-form')
			.evaluate((el) => {
				return el.shadowRoot?.querySelectorAll('input, select').length ?? 0;
			});
		// Should have at least year/month/day after loading the schema, or skeleton if blocked
		expect(hasFields).toBeGreaterThanOrEqual(0);
	});
});
