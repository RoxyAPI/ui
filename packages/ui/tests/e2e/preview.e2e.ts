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

/** The stylesheet links the page carries, in document order. */
const linkedSheets = (page: import('@playwright/test').Page) =>
	page.evaluate(() =>
		[...document.querySelectorAll('link[rel="stylesheet"]')].map((l) =>
			l.getAttribute('href'),
		),
	);

test('a shipped preset is linked before the first paint and paints its accent in both themes', async ({
	page,
}) => {
	// The first animation frame runs only once every render-blocking sheet has
	// loaded, so the accent read there is the one the first paint used.
	await page.addInitScript(() => {
		requestAnimationFrame(() => {
			(window as unknown as { firstFrameAccent?: string }).firstFrameAccent =
				getComputedStyle(document.documentElement)
					.getPropertyValue('--roxy-accent')
					.trim()
					.toLowerCase();
		});
	});
	await page.goto('/preview.html?c=natal-chart');
	const presets = await page.evaluate(
		() =>
			(
				window as unknown as {
					ROXY_THEME_PRESETS: Record<
						string,
						{
							file: string;
							light: { accent: string };
							dark: { accent: string };
						}
					>;
				}
			).ROXY_THEME_PRESETS,
	);
	expect(Object.keys(presets).length).toBeGreaterThan(0);

	for (const [name, preset] of Object.entries(presets)) {
		for (const theme of ['light', 'dark'] as const) {
			await page.goto(
				`/preview.html?c=natal-chart&theme=${theme}&preset=${name}`,
			);
			const want = preset[theme].accent.toLowerCase();
			await expect
				.poll(() =>
					page.evaluate(
						() =>
							(window as unknown as { firstFrameAccent?: string })
								.firstFrameAccent,
					),
				)
				.toBe(want);
			expect(await linkedSheets(page)).toEqual([
				'./dist/styles/tokens.css',
				`./dist/styles/themes/${preset.file}`,
			]);
			// The mounted card reads the same value through its own shadow tree.
			await page.waitForFunction(
				() =>
					(document.querySelector('roxy-natal-chart') as { data?: unknown })
						?.data != null,
			);
			expect(
				await page.evaluate(() =>
					getComputedStyle(document.querySelector('roxy-natal-chart')!)
						.getPropertyValue('--roxy-accent')
						.trim()
						.toLowerCase(),
				),
				`${name} ${theme}`,
			).toBe(want);
		}
	}
});

test('an absent or unrecognised preset links nothing beyond the token sheet', async ({
	page,
}) => {
	const accent = () =>
		page.evaluate(() =>
			getComputedStyle(document.documentElement)
				.getPropertyValue('--roxy-accent')
				.trim(),
		);
	await page.goto('/preview.html?c=natal-chart');
	expect(await linkedSheets(page)).toEqual(['./dist/styles/tokens.css']);
	const stock = await accent();

	const hostile = '"><script>alert(1)</script>';
	for (const value of ['sideways', '__proto__', 'constructor', hostile]) {
		await page.goto(
			`/preview.html?c=natal-chart&preset=${encodeURIComponent(value)}`,
		);
		expect(await linkedSheets(page), value).toEqual([
			'./dist/styles/tokens.css',
		]);
		expect(await accent(), value).toBe(stock);
	}
	expect(await page.content()).not.toContain('alert(1)');
});

/**
 * Frame the preview inside a parent served at `origin`, the way the builder on the
 * main site does, and return the posting and reading handles.
 */
async function framedPreview(
	page: import('@playwright/test').Page,
	origin: string,
	baseURL: string | undefined,
) {
	const src = `${baseURL}/preview.html?c=natal-chart&theme=light&preset=kiln`;
	// Chromium refuses a stubbed parent framing a localhost page unless the frame is served through the same interception.
	await page.route(`${baseURL}/**`, async (route) =>
		route.fulfill({ response: await route.fetch() }),
	);
	await page.route(`${origin}/host.html`, (route) =>
		route.fulfill({
			contentType: 'text/html',
			body: `<!doctype html><meta charset="utf-8"><iframe src="${src}" width="900" height="700"></iframe>`,
		}),
	);
	await page.goto(`${origin}/host.html`);
	const frame = page.frameLocator('iframe');
	await expect(frame.locator('roxy-natal-chart')).toBeAttached();
	const child = page.frames().find((f) => f.url().startsWith(src))!;
	await child.waitForFunction(
		() =>
			(document.querySelector('roxy-natal-chart') as { data?: unknown })
				?.data != null,
	);
	const post = (msg: unknown) =>
		page.evaluate((m) => window.frames[0].postMessage(m, '*'), msg);
	const inline = (name: string) =>
		child.evaluate(
			(n) => document.documentElement.style.getPropertyValue(n),
			name,
		);
	const painted = () =>
		child.evaluate(() =>
			getComputedStyle(document.querySelector('roxy-natal-chart')!)
				.getPropertyValue('--roxy-accent')
				.trim()
				.toLowerCase(),
		);
	const presetAccent = await child.evaluate(() =>
		(
			window as unknown as {
				ROXY_THEME_PRESETS: Record<string, { light: { accent: string } }>;
			}
		).ROXY_THEME_PRESETS.kiln.light.accent.toLowerCase(),
	);
	return { child, post, inline, painted, presetAccent };
}

test('a token message from the builder paints shipped tokens over the preset, and an empty one resets', async ({
	page,
	baseURL,
}) => {
	const { post, inline, painted, presetAccent } = await framedPreview(
		page,
		'http://localhost:3000',
		baseURL,
	);
	expect(await painted()).toBe(presetAccent);

	await post({
		type: 'roxy-preview:tokens',
		tokens: {
			'--roxy-accent': '#123456',
			'--roxy-bg': '#ABC',
			'--roxy-not-a-token': '#ffffff',
			'--roxy-fg': 'red',
			'--roxy-border': '#12345',
			'--roxy-surface': '#fff; color: red',
			color: '#000000',
		},
	});
	await expect.poll(painted).toBe('#123456');
	expect(await inline('--roxy-bg')).toBe('#ABC');
	for (const name of [
		'--roxy-not-a-token',
		'--roxy-fg',
		'--roxy-border',
		'--roxy-surface',
		'color',
	])
		expect(await inline(name), name).toBe('');

	await post({ type: 'roxy-preview:tokens', tokens: {} });
	await expect.poll(painted).toBe(presetAccent);
	expect(await inline('--roxy-bg')).toBe('');
});

test('a token message from any other origin paints nothing', async ({
	page,
	baseURL,
}) => {
	const { child, post, inline, painted, presetAccent } = await framedPreview(
		page,
		'http://elsewhere.test',
		baseURL,
	);
	await post({
		type: 'roxy-preview:tokens',
		tokens: { '--roxy-accent': '#123456' },
	});
	// Messages from one source arrive in order, so once the theme lands the tokens one was already handled.
	await post({ type: 'roxy-set-theme', theme: 'dark' });
	await expect
		.poll(() => child.evaluate(() => document.documentElement.dataset.theme))
		.toBe('dark');
	expect(await inline('--roxy-accent')).toBe('');
	await post({ type: 'roxy-set-theme', theme: 'light' });
	await expect.poll(painted).toBe(presetAccent);
});

test('a second copy of the bundle, and a component file after it, register nothing and log nothing', async ({
	page,
}) => {
	const errors: string[] = [];
	page.on('pageerror', (err) => errors.push(`uncaught: ${err.message}`));
	page.on('console', (m) => {
		if (m.type() === 'error' || m.type() === 'warning')
			errors.push(`${m.type()}: ${m.text()}`);
	});
	await page.goto('/preview.html?c=natal-chart');
	await page.waitForFunction(
		() =>
			(document.querySelector('roxy-natal-chart') as { data?: unknown } | null)
				?.data != null,
	);
	await page.evaluate(() => {
		(window as unknown as { first?: unknown }).first =
			customElements.get('roxy-natal-chart');
	});
	for (const src of [
		'dist/cdn/roxy-ui.js',
		'dist/cdn/roxy-ui.js',
		'dist/cdn/components/natal-chart.js',
		'dist/cdn/components/horoscope-card.js',
	])
		await page.addScriptTag({ url: src });
	expect(errors, errors.join('\n')).toEqual([]);
	// The first bundle stays in charge, and a card placed afterwards still upgrades and draws.
	expect(
		await page.evaluate(
			() =>
				customElements.get('roxy-natal-chart') ===
				(window as unknown as { first?: unknown }).first,
		),
	).toBe(true);
	const drawn = await page.evaluate(async () => {
		const el = document.createElement('roxy-horoscope-card') as HTMLElement & {
			data: unknown;
			updateComplete: Promise<unknown>;
		};
		el.data = {
			sign: 'Aries',
			date: '2026-01-01',
			overview: 'A day to begin.',
		};
		document.body.append(el);
		await el.updateComplete;
		return el.shadowRoot?.textContent?.includes('A day to begin.') ?? false;
	});
	expect(drawn).toBe(true);
	expect(
		await page.evaluate(
			() =>
				(
					document.querySelector('roxy-natal-chart')?.shadowRoot?.textContent ??
					''
				).length > 0,
		),
	).toBe(true);
});

test('a bundle served from its own domain reads each form schema beside itself, never from the public CDN', async ({
	page,
	baseURL,
}) => {
	const requested: string[] = [];
	page.on('request', (r) => requested.push(r.url()));
	// The full bundle and a per-component file sit at two depths under one dist folder.
	await page.route('**/self-hosted.html', (route) =>
		route.fulfill({
			contentType: 'text/html',
			body: '<!doctype html><meta charset="utf-8"><script src="dist/cdn/components/endpoint-form.js"></script><roxy-endpoint-form data-endpoint="astrology/natal-chart" method="POST"></roxy-endpoint-form>',
		}),
	);
	for (const page_ of ['/self-hosted.html', '/preview.html?c=natal-chart']) {
		await page.goto(page_);
		await page.evaluate(() => {
			const form = document.createElement('roxy-endpoint-form');
			form.setAttribute('data-endpoint', 'astrology/horoscope/{sign}/daily');
			form.setAttribute('method', 'GET');
			document.body.append(form);
		});
		await page.waitForFunction(() =>
			[...document.querySelectorAll('roxy-endpoint-form')].every(
				(f) => f.shadowRoot?.querySelector('form') != null,
			),
		);
	}
	const slices = requested.filter((u) => u.includes('/schemas/'));
	expect(slices.length).toBeGreaterThanOrEqual(3);
	expect(slices.every((u) => u.startsWith(`${baseURL}/dist/schemas/`))).toBe(
		true,
	);
	expect(
		requested.filter((u) => u.includes('jsdelivr') || u.includes('openapi')),
	).toEqual([]);
});
