import { expect, test } from '@playwright/test';

/**
 * The keyless embed, proved in a real browser: a page that routes its API traffic through its own
 * server, with no key of any kind in the markup.
 *
 * @remarks
 * Each hop is unit-tested with a mocked `fetch`, and the composition still shipped broken: the
 * city search reached its own default instead of the host route, so every reading that needs
 * coordinates was unofferable on a proxied page. What no mock can prove is that the two requests
 * a birth-data form makes both leave the browser at the host origin, which is the whole promise.
 * The assertions are on the requests the page actually issued, never on what it rendered.
 */

const CITIES = {
	total: 1,
	limit: 8,
	offset: 0,
	cities: [
		{
			city: 'Manila',
			province: 'National Capital Region',
			country: 'Philippines',
			iso2: 'PH',
			latitude: 14.6042,
			longitude: 120.9822,
			timezone: 'Asia/Manila',
			utcOffset: 8,
			population: 1600000,
		},
	],
};

test('both requests of a proxied birth-data form leave at the host origin', async ({
	page,
}) => {
	const host: string[] = [];
	const direct: string[] = [];
	let submitted: Record<string, unknown> | undefined;

	await page.route('**/api/roxy/location/search*', async (route) => {
		host.push(`GET ${new URL(route.request().url()).pathname}`);
		await route.fulfill({ json: CITIES });
	});
	await page.route('**/api/roxy/proxy', async (route) => {
		const body = route.request().postDataJSON() as {
			path?: string;
			context?: Record<string, unknown>;
		};
		host.push(`POST ${body?.path}`);
		submitted = body;
		await route.fulfill({ json: {} });
	});
	// A request straight to the API is the failure this guards: on a proxied page it means a
	// route was ignored, and it is what puts a key in the browser.
	await page.route('**/roxyapi.com/**', async (route) => {
		direct.push(route.request().url());
		await route.abort();
	});

	await page.goto('/');
	await page.evaluate(() => {
		const el = document.createElement('roxy-natal-chart');
		el.id = 'e2e-proxied';
		el.setAttribute('data-endpoint', 'astrology/natal-chart');
		el.setAttribute('method', 'POST');
		el.setAttribute('spec-url', './openapi.json');
		el.setAttribute('submit-url', '/api/roxy/proxy');
		el.setAttribute('location-url', '/api/roxy/location/search');
		// The host page attaches its own data to the submission it proxies.
		el.setAttribute('submit-context', '{"token":"opaque-value"}');
		document.body.prepend(el);
	});

	const form = page.locator('#e2e-proxied roxy-endpoint-form');
	await form.locator('#roxy-form-date').waitFor();
	await form.locator('#roxy-form-date').fill('1990-07-15');
	await form.locator('#roxy-form-time').fill('14:30:00');

	await form.locator('roxy-location-search input').fill('Manila');
	// Assert on the cause rather than on a timeout: a search that ignored the host route records a
	// direct call here in about a second, where the option that never arrives takes the full test
	// timeout to report and names nothing.
	await expect
		.poll(() => host.length + direct.length, { timeout: 10_000 })
		.toBeGreaterThan(0);
	expect(direct, 'the city search bypassed the host route').toEqual([]);

	const option = form.locator('roxy-location-search [role="option"]').first();
	await option.waitFor({ timeout: 10_000 });
	await option.click();

	await form.locator('button[type="submit"]').click();
	await expect
		.poll(() => host.length, { timeout: 15_000 })
		.toBeGreaterThanOrEqual(2);

	expect(host).toEqual([
		'GET /api/roxy/location/search',
		'POST /astrology/natal-chart',
	]);
	expect(direct).toEqual([]);
	// The context arrives whole, beside the request rather than inside it.
	expect(submitted?.context).toEqual({ token: 'opaque-value' });
	expect(submitted?.body).not.toHaveProperty('token');
});
