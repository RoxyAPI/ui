import { afterEach, describe, expect, test } from 'bun:test';
import '../src/index.js';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import type { RoxyDataElement } from '../src/utils/base-element.js';
import type { FormModel } from '../src/utils/field-schema.js';

/**
 * One attribute per widget: a component with a publishable key or a proxy route and no `data-endpoint` fetches the endpoint its config attributes select, and a proxy route alone carries the city search too. Every shape that worked before is pinned here as a literal.
 */

type El = HTMLElement & {
	updateComplete: Promise<unknown>;
	selfFetch(): { endpoint: string; method: string } | undefined;
	load(req: { path: string; method?: string }): Promise<void>;
	data: unknown;
};

const originalFetch = globalThis.fetch;
afterEach(() => {
	globalThis.fetch = originalFetch;
});

/** The shadow markup with stylesheets and Lit markers left out, so a literal reads as the rendered elements alone. */
const markup = (el: Element): string =>
	(el.shadowRoot?.innerHTML ?? '')
		.replace(/<style>[\s\S]*?<\/style>/g, '')
		.replace(/<!--[\s\S]*?-->/g, '');

/** Drain the async schema read and the re-renders behind it. */
async function flush(el: Element): Promise<void> {
	for (let i = 0; i < 6; i++) {
		await (el as El).updateComplete;
		await new Promise((r) => setTimeout(r, 0));
	}
}

function make(tag: string, attrs: Record<string, string>): El {
	const el = document.createElement(tag) as El;
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	return el;
}

async function mount(tag: string, attrs: Record<string, string>): Promise<El> {
	const el = make(tag, attrs);
	document.body.appendChild(el);
	await el.updateComplete;
	return el;
}

/** Every fetch answers 404, so a form mounts without reading a schema. */
function offline(): void {
	globalThis.fetch = (async () => ({
		ok: false,
		status: 404,
		json: async () => ({}),
	})) as unknown as typeof fetch;
}

const LOCATION_MODEL: FormModel = {
	title: 'Generate natal chart',
	hasLang: false,
	fields: [
		{ key: 'latitude', name: 'latitude', kind: 'number', required: true },
		{ key: 'longitude', name: 'longitude', kind: 'number', required: true },
	],
};

/** Every schema read answers `LOCATION_MODEL` and every other fetch 404s, so a form mounts its city search. */
function withSchema(): void {
	globalThis.fetch = (async (url: string | URL) =>
		String(url).includes('/schemas/')
			? { ok: true, status: 200, json: async () => LOCATION_MODEL }
			: {
					ok: false,
					status: 404,
					json: async () => ({}),
				}) as unknown as typeof fetch;
}

const endpointOf = (path: string) => path.replace(/^\//, '');

describe('default endpoint per component', () => {
	test('every bound component carries its own endpoints, in binding order', () => {
		for (const [tag, bindings] of Object.entries(ENDPOINT_BINDINGS)) {
			const cls = customElements.get(tag) as unknown as
				| typeof RoxyDataElement
				| undefined;
			expect(cls, tag).toBeDefined();
			expect(cls?.endpoints, tag).toEqual(
				bindings.map((b) => ({
					endpoint: endpointOf(b.path),
					method: b.method as 'GET' | 'POST',
					...(b.attrs ? { attrs: b.attrs } : {}),
				})),
			);
		}
	});

	test('every endpoint a component can default to exists in the spec with its method', async () => {
		const spec = (await Bun.file('specs/openapi.json').json()) as {
			paths: Record<string, Record<string, unknown>>;
		};
		let checked = 0;
		for (const [tag, bindings] of Object.entries(ENDPOINT_BINDINGS)) {
			for (const e of (
				customElements.get(tag) as unknown as typeof RoxyDataElement
			).endpoints) {
				expect(
					spec.paths[`/${e.endpoint}`]?.[e.method.toLowerCase()],
					`${tag} ${e.method} ${e.endpoint}`,
				).toBeDefined();
				checked++;
			}
			expect(bindings.length).toBeGreaterThan(0);
		}
		expect(checked).toBeGreaterThan(140);
	});

	test('a component binds config attributes on all of its endpoints or on none, and each one is a property it declares', () => {
		for (const [tag, bindings] of Object.entries(ENDPOINT_BINDINGS)) {
			const withAttrs = bindings.filter((b) => b.attrs).length;
			expect([0, bindings.length], tag).toContain(withAttrs);
			const props = (
				customElements.get(tag) as unknown as {
					elementProperties: Map<string, { attribute?: unknown }>;
				}
			).elementProperties;
			for (const key of Object.keys(bindings[0]?.attrs ?? {})) {
				expect(props.has(key), `${tag}.${key}`).toBe(true);
				// Lit names the attribute after the lowercased property unless it says otherwise.
				const attribute = props.get(key)?.attribute;
				expect(
					typeof attribute === 'string' ? attribute : key.toLowerCase(),
				).toBe(key);
			}
		}
	});

	test('with no data-endpoint, each config value selects its own binding and a component with none takes its first', () => {
		let variants = 0;
		for (const [tag, bindings] of Object.entries(ENDPOINT_BINDINGS)) {
			const first = bindings[0];
			if (!first) continue;
			if (!first.attrs) {
				expect(
					make(tag, { 'publishable-key': 'pk_test_abc' }).selfFetch(),
					tag,
				).toEqual({ endpoint: endpointOf(first.path), method: first.method });
				continue;
			}
			for (const b of bindings) {
				expect(
					make(tag, {
						...b.attrs,
						'publishable-key': 'pk_test_abc',
					}).selfFetch(),
					`${tag} ${JSON.stringify(b.attrs)}`,
				).toEqual({ endpoint: endpointOf(b.path), method: b.method });
				variants++;
			}
		}
		expect(variants).toBeGreaterThan(50);
	});

	test('with no config attribute, the binding the property default selects is used', () => {
		expect(
			make('roxy-dasha-timeline', {
				'publishable-key': 'pk_test_abc',
			}).selfFetch(),
		).toEqual({ endpoint: 'vedic-astrology/dasha/current', method: 'POST' });
		expect(
			make('roxy-moon-phase', { 'submit-url': '/api/roxy/proxy' }).selfFetch(),
		).toEqual({ endpoint: 'astrology/moon-phase/current', method: 'GET' });
	});

	test('the minimal tag renders the form the full tag rendered', async () => {
		offline();
		const full = await mount('roxy-moon-phase', {
			mode: 'current',
			'data-endpoint': 'astrology/moon-phase/current',
			method: 'GET',
			'publishable-key': 'pk_test_abc',
		});
		const minimal = await mount('roxy-moon-phase', {
			'publishable-key': 'pk_test_abc',
		});
		const form =
			'<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="astrology/moon-phase/current" method="GET" publishable-key="pk_test_abc"></roxy-endpoint-form>';
		expect(markup(full)).toBe(form);
		expect(markup(minimal)).toBe(form);
		full.remove();
		minimal.remove();
	});

	test('an explicit data-endpoint and an explicit method are never overridden', async () => {
		offline();
		// The mode selects a GET binding; the explicit endpoint keeps the POST it always sent.
		const endpoint = await mount('roxy-zodiac-card', {
			mode: 'animal',
			'data-endpoint': 'chinese-astrology/zodiac/sign',
			'publishable-key': 'pk_test_abc',
		});
		expect(markup(endpoint)).toBe(
			'<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="chinese-astrology/zodiac/sign" method="POST" publishable-key="pk_test_abc"></roxy-endpoint-form>',
		);
		// The mode selects a POST binding; the explicit method wins over it.
		const method = await mount('roxy-zodiac-card', {
			mode: 'sign',
			method: 'GET',
			'publishable-key': 'pk_test_abc',
		});
		expect(markup(method)).toBe(
			'<roxy-endpoint-form part="form" exportparts="hint" data-endpoint="chinese-astrology/zodiac/sign" method="GET" publishable-key="pk_test_abc"></roxy-endpoint-form>',
		);
		endpoint.remove();
		method.remove();
	});

	test('a controlled element renders exactly as before', async () => {
		offline();
		const empty = await mount('roxy-dream-card', {});
		expect(markup(empty)).toBe(
			'<div class="roxy-empty" role="status" part="empty">No data</div>',
		);
		empty.remove();

		// A host that assigns data renders it alone, with or without the key a list keeps for opening rows.
		const data = { symbol: 'Water', letter: 'W', meaning: 'Emotion.' };
		const plain = await mount('roxy-dream-card', {});
		plain.data = data;
		await plain.updateComplete;
		const keyed = await mount('roxy-dream-card', {
			'publishable-key': 'pk_test_abc',
		});
		keyed.data = data;
		await keyed.updateComplete;
		expect(markup(keyed)).toBe(markup(plain));
		expect(markup(keyed)).not.toContain('roxy-endpoint-form');
		plain.remove();
		keyed.remove();
	});

	test('a pasted sample key opens the form, which shows the setup line in place of its inputs', async () => {
		withSchema();
		const el = await mount('roxy-natal-chart', {
			'publishable-key': 'pk_live_YOUR_KEY',
		});
		const form = el.shadowRoot?.querySelector('roxy-endpoint-form') as Element;
		await flush(form);
		expect(
			form.shadowRoot?.querySelector('[part="validation-error"]')?.textContent,
		).toContain('Replace the sample key');
		el.remove();
	});

	test('a request a host loads renders its failure alone, never a form', async () => {
		globalThis.fetch = (async () => ({
			ok: false,
			status: 401,
			json: async () => ({ error: 'Invalid API key' }),
		})) as unknown as typeof fetch;
		const el = make('roxy-dream-card', { 'publishable-key': 'pk_test_abc' });
		document.body.appendChild(el);
		await el.load({ path: '/dreams/symbols/water', method: 'GET' });
		await el.updateComplete;
		expect(markup(el)).toBe(
			'<div class="roxy-error" role="alert" part="error">Invalid API key</div>',
		);
		el.remove();
	});
});

interface Call {
	url: string;
	init?: RequestInit;
}

/** Type into a city search and return every request it sent. */
async function search(el: HTMLElement, calls: Call[]): Promise<Call[]> {
	document.body.appendChild(el);
	await flush(el);
	const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
	input.value = 'Manila';
	input.dispatchEvent(new Event('input'));
	await new Promise((r) => setTimeout(r, 450));
	await flush(el);
	el.remove();
	return calls;
}

function recordFetch(): Call[] {
	const calls: Call[] = [];
	globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
		calls.push({ url: String(url), init });
		return { ok: true, status: 200, json: async () => ({ cities: [] }) };
	}) as unknown as typeof fetch;
	return calls;
}

function searchEl(attrs: Record<string, string>): HTMLElement {
	const el = document.createElement('roxy-location-search');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	return el;
}

describe('city search route', () => {
	test('an explicit endpoint gets the GET it always got, whatever proxy route is set', async () => {
		const calls = await search(
			searchEl({
				endpoint: '/api/roxy/location/search',
				'submit-url': '/api/roxy/proxy',
				'publishable-key': 'pk_live_ok',
			}),
			recordFetch(),
		);
		expect(calls.length).toBe(1);
		expect(calls[0]?.url).toBe(
			'http://localhost:3000/api/roxy/location/search?q=Manila&limit=8',
		);
		expect(calls[0]?.init?.method).toBeUndefined();
		expect(calls[0]?.init?.body).toBeUndefined();
		expect(JSON.stringify(calls[0]?.init?.headers)).toBe(
			'{"Accept":"application/json","X-API-Key":"pk_live_ok"}',
		);
	});

	test('a proxy route alone receives the search as one proxied request', async () => {
		const calls = await search(
			searchEl({ 'submit-url': '/api/roxy/proxy' }),
			recordFetch(),
		);
		expect(calls.length).toBe(1);
		expect(calls[0]?.url).toBe('/api/roxy/proxy');
		expect(calls[0]?.init?.method).toBe('POST');
		expect(calls[0]?.init?.body).toBe(
			'{"path":"/location/search","method":"GET","query":{"q":"Manila","limit":8}}',
		);
	});

	test('the proxied search carries the page context', async () => {
		const calls = await search(
			searchEl({
				'submit-url': '/api/roxy/proxy',
				'submit-context': '{"token":"t"}',
			}),
			recordFetch(),
		);
		expect(calls[0]?.init?.body).toBe(
			'{"path":"/location/search","method":"GET","query":{"q":"Manila","limit":8},"context":{"token":"t"}}',
		);
	});

	test('a publishable key alone calls the public location search directly', async () => {
		const calls = await search(
			searchEl({ 'publishable-key': 'pk_live_ok' }),
			recordFetch(),
		);
		expect(calls.length).toBe(1);
		expect(calls[0]?.url).toBe(
			'https://roxyapi.com/api/v2/location/search?q=Manila&limit=8',
		);
		expect(JSON.stringify(calls[0]?.init?.headers)).toBe(
			'{"Accept":"application/json","X-API-Key":"pk_live_ok"}',
		);
	});
});

describe('the form hands its proxy route to the city search', () => {
	/** Mount a component whose form reads `LOCATION_MODEL` and return the city search inside it. */
	async function nestedSearch(attrs: Record<string, string>) {
		globalThis.fetch = (async (url: string | URL) =>
			String(url).includes('/schemas/')
				? { ok: true, status: 200, json: async () => LOCATION_MODEL }
				: {
						ok: false,
						status: 404,
						json: async () => ({}),
					}) as unknown as typeof fetch;
		const el = await mount('roxy-natal-chart', attrs);
		const form = el.shadowRoot?.querySelector('roxy-endpoint-form') as Element;
		await flush(form);
		const found = form.shadowRoot?.querySelector('roxy-location-search') as
			| (HTMLElement & {
					submitUrl?: string;
					submitContext?: Record<string, unknown>;
			  })
			| null;
		return { el, found };
	}

	test('a component with submit-url forwards it as a property, so the markup is unchanged', async () => {
		const { el, found } = await nestedSearch({
			'submit-url': '/api/roxy/proxy',
			'submit-context': '{"token":"t"}',
		});
		expect(found?.submitUrl).toBe('/api/roxy/proxy');
		expect(found?.submitContext).toEqual({ token: 't' });
		expect(found?.hasAttribute('submit-url')).toBe(false);
		expect(found?.hasAttribute('endpoint')).toBe(false);
		el.remove();
	});

	test('a component with a publishable key leaves the search on its own route', async () => {
		const { el, found } = await nestedSearch({
			'publishable-key': 'pk_test_abc',
		});
		expect(found?.submitUrl).toBeUndefined();
		expect(found?.getAttribute('publishable-key')).toBe('pk_test_abc');
		el.remove();
	});
});
