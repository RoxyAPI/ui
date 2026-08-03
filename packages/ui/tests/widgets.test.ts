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

/** The request the widget itself issues carries the publishable key. */
const keyed = (c: FetchCall): boolean => !!c.init.headers?.['X-API-Key'];

/**
 * The one-tag auto-mount map is GENERATED from the endpoint bindings joined with the manifest, and the script it ships is size-budgeted. These pin both: the map covers exactly the endpoint-bound data components (never a helper, never a stray), its default and variant endpoints match the bindings, and the two mount paths (immediate fetch vs form mode) behave as specified against a mocked DOM and fetch.
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

type AnyEl = HTMLElement & { data?: unknown };

interface HostSpec {
	slug: string;
	attrs: Record<string, string>;
}

/**
 * Run the EXACT shipped script against a FRESH, isolated happy-dom window whose custom elements are unregistered, so each mounted element is an inert node with no lifecycle side effects (no schema-slice fetch) and no cross-test or cross-file shared-DOM bleed. The script reads window/document/fetch as globals, so they are swapped for the duration and restored after; fetch is the mock the caller set before this runs.
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

	/** A fetch mock that answers the KEYED widget request with `payload` and 404s every other URL (a mounted element's internal spec/slice fetch), recording each call. */
	function mockFetch(payload: unknown): FetchCall[] {
		const calls: FetchCall[] = [];
		globalThis.fetch = mock(
			async (
				url: string | URL,
				init?: { headers?: Record<string, string>; method?: string },
			) => {
				const call: FetchCall = { url: String(url), init: init ?? {} };
				calls.push(call);
				return keyed(call)
					? { ok: true, status: 200, json: async () => payload }
					: { ok: false, status: 404, json: async () => ({}) };
			},
		) as unknown as typeof fetch;
		return calls;
	}

	test('attrs-complete fetches with the key and assigns data; attrs-missing renders form mode', async () => {
		const map = await buildWidgetMap();
		const calls = mockFetch({ sign: 'aries' });

		const w = await runWidgets(map, [
			{
				slug: 'horoscope-card',
				attrs: { 'data-publishable-key': 'pk_test_1', 'data-sign': 'aries' },
			},
			{
				slug: 'horoscope-card',
				attrs: { 'data-publishable-key': 'pk_test_1' },
			},
		]);

		// Immediate path: exactly one keyed request, to the resolved endpoint, data assigned.
		const api = calls.filter(keyed);
		expect(api.length).toBe(1);
		expect(api[0]?.url).toContain('/astrology/horoscope/aries/daily');
		expect(api[0]?.init.headers?.['X-API-Key']).toBe('pk_test_1');
		const el0 = child(w, 'w0');
		expect(el0?.tagName.toLowerCase()).toBe('roxy-horoscope-card');
		expect(el0?.data).toEqual({ sign: 'aries' });
		// Auto-mount enables attribution by default.
		expect(el0?.getAttribute('attribution')).toBe('');

		// Form-mode path: the element carries data-endpoint + the key, and it made no keyed request.
		const el1 = child(w, 'w1');
		expect(el1?.getAttribute('data-endpoint')).toBe(
			'astrology/horoscope/{sign}/daily',
		);
		expect(el1?.getAttribute('publishable-key')).toBe('pk_test_1');
	});

	test('a POST widget with no supplied inputs renders form mode, never an empty request', async () => {
		const map = await buildWidgetMap();
		const calls = mockFetch({});

		const w = await runWidgets(map, [
			{ slug: 'natal-chart', attrs: { 'data-publishable-key': 'pk_test_2' } },
		]);

		expect(calls.filter(keyed).length).toBe(0);
		expect(child(w, 'w0')?.getAttribute('data-endpoint')).toBe(
			'astrology/natal-chart',
		);
	});

	test('data-attribution="off" suppresses the credit on an auto-mount', async () => {
		const map = await buildWidgetMap();
		mockFetch({ sign: 'leo' });

		const w = await runWidgets(map, [
			{
				slug: 'horoscope-card',
				attrs: {
					'data-publishable-key': 'pk_test_3',
					'data-sign': 'leo',
					'data-attribution': 'off',
				},
			},
		]);

		expect(child(w, 'w0')?.hasAttribute('attribution')).toBe(false);
	});
});
