import { afterEach, describe, expect, mock, test } from 'bun:test';
import { transform } from 'esbuild';
import { Window } from 'happy-dom';
import {
	buildWidgetMap,
	buildWidgetsScript,
	WIDGETS_BUDGET_BYTES,
} from '../../../scripts/build-widgets.js';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import { ROXY_COMPONENTS } from '../src/manifest.js';

interface FetchCall {
	url: string;
	init: { headers?: Record<string, string>; method?: string };
}

/** A request carrying the publishable key, which the script itself must never issue: the element sends it. */
const keyed = (c: FetchCall): boolean => !!c.init.headers?.['X-API-Key'];

/**
 * The one-tag auto-mount map is GENERATED from the endpoint bindings joined with the manifest, and the script it ships is size-budgeted. These pin both: the map covers exactly the endpoint-bound data components (never a helper, never a stray), its default and variant endpoints match the bindings, and the two mount paths (the element loading the request, or form mode) behave as specified against a mocked DOM and fetch.
 */

const HELPER_SLUGS = new Set(['data', 'endpoint-form', 'location-search']);

describe('generated widget map coverage', () => {
	test('covers exactly the endpoint-bound data components (no helper, no stray)', async () => {
		const map = await buildWidgetMap();
		for (const c of ROXY_COMPONENTS) {
			const bound = !!ENDPOINT_BINDINGS[c.tag]?.length;
			const shouldHave = bound && !c.selfFetching && !HELPER_SLUGS.has(c.slug);
			expect(!!map[c.slug], `${c.slug} map presence`).toBe(shouldHave);
		}
		for (const slug of Object.keys(map)) {
			const c = ROXY_COMPONENTS.find((x) => x.slug === slug);
			expect(c, `stray map slug ${slug}`).toBeTruthy();
			expect(c?.selfFetching).toBeFalsy();
		}
	});

	test('every default path and method matches the first endpoint binding', async () => {
		const map = await buildWidgetMap();
		for (const [slug, def] of Object.entries(map)) {
			const first = ENDPOINT_BINDINGS[`roxy-${slug}`]?.[0];
			expect(first, `binding for ${slug}`).toBeTruthy();
			expect(def.p).toBe(first?.path as string);
			expect(def.m).toBe(first?.method as string);
		}
	});

	test('every selectable variant path matches its binding', async () => {
		const map = await buildWidgetMap();
		for (const [slug, def] of Object.entries(map)) {
			if (!def.v || !def.s) continue;
			const bindings = ENDPOINT_BINDINGS[`roxy-${slug}`] ?? [];
			for (const [value, v] of Object.entries(def.v)) {
				const b = bindings.find((x) => x.attrs?.[def.s as string] === value);
				expect(b, `${slug} variant ${value}`).toBeTruthy();
				expect(v.p).toBe(b?.path as string);
			}
		}
	});
});

describe('widgets.js bundle guard', () => {
	test('skips injecting the bundle when the elements are already defined (manual include + widgets.js double-load)', async () => {
		const map = await buildWidgetMap();
		expect(buildWidgetsScript(map)).toContain(
			"customElements.get('roxy-data')",
		);
	});
});

describe('widgets.js size budget', () => {
	test('the minified script fits the raw budget', async () => {
		const map = await buildWidgetMap();
		const { code } = await transform(buildWidgetsScript(map), {
			minify: true,
			target: 'es2017',
			loader: 'js',
		});
		const out = `${code.trim()}\n`;
		// Gzipped, matching the build assertion and every other size budget: it is
		// what a browser downloads, and this file is mostly a highly compressible map.
		const bytes = Bun.gzipSync(Buffer.from(out), { level: 9 }).length;
		expect(bytes).toBeLessThanOrEqual(WIDGETS_BUDGET_BYTES);
	});
});

/** A mounted element, which in the isolated window records the request it was asked to load instead of sending it. */
type AnyEl = HTMLElement & { loaded?: unknown };

interface HostSpec {
	slug: string;
	attrs: Record<string, string>;
}

/**
 * Run the EXACT shipped script against a FRESH, isolated happy-dom window, so there is no cross-test or cross-file shared-DOM bleed. Each tag a host names is defined there as a stand-in that records the request `load()` is handed, because the straight path no longer fetches itself: it gives the element its key and has the element load the request, which is the component contract `components.test.ts` and `base-element.test.ts` pin. The script reads window/document/fetch as globals, so they are swapped for the duration and restored after; fetch is the mock the caller set before this runs.
 */
async function runWidgets(
	map: Awaited<ReturnType<typeof buildWidgetMap>>,
	hosts: HostSpec[],
): Promise<Window> {
	const w = new Window({ url: 'http://localhost:3000' });
	const savedWindow = globalThis.window;
	const savedDocument = globalThis.document;
	globalThis.window = w as unknown as typeof globalThis.window;
	globalThis.document = w.document as unknown as typeof globalThis.document;
	try {
		(
			w as unknown as { __ROXY_WIDGETS_LOADED__?: boolean }
		).__ROXY_WIDGETS_LOADED__ = false;
		const loader = w.document.createElement('script');
		loader.id = 'roxy-ui-loader';
		w.document.head.appendChild(loader);
		for (const slug of new Set(hosts.map((h) => h.slug))) {
			w.customElements.define(
				`roxy-${slug}`,
				class extends w.HTMLElement {
					loaded?: unknown;
					load(req: unknown) {
						this.loaded = req;
					}
				},
			);
		}
		hosts.forEach((h, i) => {
			const div = w.document.createElement('div');
			div.id = `w${i}`;
			div.setAttribute('data-roxy-widget', h.slug);
			for (const [k, v] of Object.entries(h.attrs)) div.setAttribute(k, v);
			w.document.body.appendChild(div);
		});
		new Function(buildWidgetsScript(map))();
		for (let i = 0; i < 12; i++) await new Promise((r) => setTimeout(r, 0));
	} finally {
		globalThis.window = savedWindow;
		globalThis.document = savedDocument;
	}
	return w;
}

const child = (w: Window, id: string): AnyEl | null =>
	(w.document.getElementById(id)?.firstElementChild as unknown as AnyEl) ??
	null;

describe('widgets.js mount paths', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	/** A fetch mock that records every call and answers each with a 404, so a test sees any request the script itself made. */
	function mockFetch(): FetchCall[] {
		const calls: FetchCall[] = [];
		globalThis.fetch = mock(
			async (
				url: string | URL,
				init?: { headers?: Record<string, string>; method?: string },
			) => {
				calls.push({ url: String(url), init: init ?? {} });
				return { ok: false, status: 404, json: async () => ({}) };
			},
		) as unknown as typeof fetch;
		return calls;
	}

	test('attrs-complete hands the element its key and the request to load; attrs-missing renders form mode', async () => {
		const map = await buildWidgetMap();
		const calls = mockFetch();

		const w = await runWidgets(map, [
			{
				slug: 'horoscope-card',
				attrs: {
					'data-publishable-key': 'pk_test_1',
					'data-sign': 'aries',
					'data-lang': 'es-AR',
				},
			},
			{
				slug: 'horoscope-card',
				attrs: { 'data-publishable-key': 'pk_test_1' },
			},
		]);

		// The script sends nothing itself: the element loads through its own guarded controller.
		expect(calls.filter(keyed).length).toBe(0);
		const el0 = child(w, 'w0');
		expect(el0?.tagName.toLowerCase()).toBe('roxy-horoscope-card');
		expect(el0?.getAttribute('publishable-key')).toBe('pk_test_1');
		expect(el0?.hasAttribute('data-endpoint')).toBe(false);
		expect(el0?.loaded).toEqual({
			path: '/astrology/horoscope/aries/daily',
			method: 'GET',
			query: { lang: 'es' },
			body: undefined,
		});
		// The credit line is opt-in: nothing is set unless the host asks for it.
		expect(el0?.hasAttribute('attribution')).toBe(false);

		// Form-mode path: the element carries data-endpoint + the key, and loads nothing.
		const el1 = child(w, 'w1');
		expect(el1?.getAttribute('data-endpoint')).toBe(
			'astrology/horoscope/{sign}/daily',
		);
		expect(el1?.getAttribute('publishable-key')).toBe('pk_test_1');
		expect(el1?.loaded).toBeUndefined();
	});

	test('a read that needs nothing opens in form mode, so the one-tag widget keeps its filters above the result as the component tag does', async () => {
		const map = await buildWidgetMap();
		const calls = mockFetch();
		const w = await runWidgets(map, [
			{
				slug: 'dream-search',
				attrs: { 'data-publishable-key': 'pk_test_4' },
			},
		]);
		expect(calls.filter(keyed).length).toBe(0);
		const el = child(w, 'w0');
		expect(el?.getAttribute('data-endpoint')).toBe('dreams/symbols');
		expect(el?.getAttribute('method')).toBe('GET');
		expect(el?.getAttribute('publishable-key')).toBe('pk_test_4');
		expect(el?.loaded).toBeUndefined();
	});

	test('the proxy wire reaches an element that loads its own request, so a row it opens rides the same route', async () => {
		const map = await buildWidgetMap();
		mockFetch();
		const w = await runWidgets(map, [
			{
				slug: 'crystal-card',
				attrs: {
					'data-publishable-key': 'pk_test_5',
					'data-id': 'amethyst',
					'data-submit-url': '/api/roxy/proxy',
				},
			},
		]);
		const el = child(w, 'w0');
		expect(el?.getAttribute('submit-url')).toBe('/api/roxy/proxy');
		expect(el?.getAttribute('publishable-key')).toBe('pk_test_5');
		expect((el?.loaded as { path?: string } | undefined)?.path).toBe(
			'/crystals/amethyst',
		);
	});

	test('a POST widget with no supplied inputs renders form mode, never an empty request', async () => {
		const map = await buildWidgetMap();
		const calls = mockFetch();

		const w = await runWidgets(map, [
			{ slug: 'natal-chart', attrs: { 'data-publishable-key': 'pk_test_2' } },
		]);

		expect(calls.filter(keyed).length).toBe(0);
		expect(child(w, 'w0')?.loaded).toBeUndefined();
		expect(child(w, 'w0')?.getAttribute('data-endpoint')).toBe(
			'astrology/natal-chart',
		);
	});

	/**
	 * The one-tag embed is the surface with no build step, so a page that keeps its keys on its
	 * own server has only these attributes to say so. Both halves of a birth-data form have to
	 * follow: the submitted request and the city search the form issues while a visitor types.
	 * The context a page attaches to the submitted one travels the same way, and must be kept out
	 * of the parameters for the same reason: it configures the wire, it is not a value to send.
	 */
	test('the proxied wire attributes reach the element and are never sent as request parameters', async () => {
		const map = await buildWidgetMap();
		const calls = mockFetch();

		const w = await runWidgets(map, [
			{
				slug: 'natal-chart',
				attrs: {
					'data-submit-url': '/api/roxy/proxy',
					'data-location-url': '/api/roxy/location/search',
					'data-submit-context': '{"token":"opaque-value"}',
				},
			},
		]);

		// No key on the page, so the bootstrap issues nothing itself and hands off to form mode.
		expect(calls.filter(keyed).length).toBe(0);
		const el = child(w, 'w0');
		expect(el?.getAttribute('submit-url')).toBe('/api/roxy/proxy');
		expect(el?.getAttribute('location-url')).toBe('/api/roxy/location/search');
		expect(el?.getAttribute('submit-context')).toBe('{"token":"opaque-value"}');
		// A route is a destination, so it must not be mistaken for a value to send.
		expect(el?.getAttribute('submitUrl')).toBeNull();
		expect(el?.getAttribute('locationUrl')).toBeNull();
		expect(el?.getAttribute('submitContext')).toBeNull();
	});

	test('data-hide-sections and data-hide-readings reach the element and never the request', async () => {
		const map = await buildWidgetMap();
		mockFetch();

		const w = await runWidgets(map, [
			{
				slug: 'horoscope-card',
				attrs: {
					'data-publishable-key': 'pk_test_3',
					'data-sign': 'leo',
					'data-hide-sections': 'hint',
					'data-hide-readings': '',
				},
			},
			{
				slug: 'aspects-table',
				attrs: {
					'data-publishable-key': 'pk_test_3',
					'data-hide-sections': 'hint',
				},
			},
		]);

		expect(child(w, 'w0')?.getAttribute('hide-sections')).toBe('hint');
		expect(child(w, 'w0')?.hasAttribute('hide-readings')).toBe(true);
		expect(child(w, 'w1')?.getAttribute('hide-sections')).toBe('hint');
		expect(JSON.stringify(child(w, 'w0')?.loaded)).not.toMatch(/hide/i);
	});

	test('data-attribution forwards verbatim on both mount paths and never reaches the request', async () => {
		const map = await buildWidgetMap();
		mockFetch();

		const w = await runWidgets(map, [
			// Immediate path: the value travels as given.
			{
				slug: 'horoscope-card',
				attrs: {
					'data-publishable-key': 'pk_test_3',
					'data-sign': 'leo',
					'data-attribution': 'on',
				},
			},
			// Form-mode path: a bare attribute still reaches the element, so the credit renders once the visitor submits.
			{
				slug: 'horoscope-card',
				attrs: { 'data-publishable-key': 'pk_test_3', 'data-attribution': '' },
			},
			// An explicit off is the element's decision, not the script's, so it is forwarded too.
			{
				slug: 'horoscope-card',
				attrs: {
					'data-publishable-key': 'pk_test_3',
					'data-sign': 'leo',
					'data-attribution': 'off',
				},
			},
		]);

		expect(child(w, 'w0')?.getAttribute('attribution')).toBe('on');
		expect(child(w, 'w1')?.getAttribute('attribution')).toBe('');
		expect(child(w, 'w2')?.getAttribute('attribution')).toBe('off');
		for (const id of ['w0', 'w2'])
			expect(JSON.stringify(child(w, id)?.loaded)).not.toContain('attribution');
	});
});
