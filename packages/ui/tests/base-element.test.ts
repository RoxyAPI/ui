import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';

// Registers roxy-dream-card, a concrete RoxyDataElement subclass used here to
// exercise the base in both modes. happy-dom is loaded by preload (bunfig.toml).
import '../src/components/data.js';
import '../src/components/dream-card.js';
import { BASE_PROPS } from '../../../scripts/wrapper-meta.js';
import { RoxyDataElement } from '../src/utils/base-element.js';
import {
	buildRequest,
	FetchController,
	readApiError,
} from '../src/utils/fetch-controller.js';

/**
 * The shared failure reader. Both client-side fetch boundaries route through it, so the
 * fallback matters as much as the happy path: a gateway or proxy that fails in front of the
 * API returns HTML, not `{ error }`, and a reader that assumed JSON would surface nothing at
 * all for the one class of outage the caller cannot diagnose from the page.
 */
describe('readApiError', () => {
	const res = (body: string, status = 500, type = 'application/json') =>
		new Response(body, { status, headers: { 'content-type': type } });

	test('prefers the API error string', async () => {
		expect(await readApiError(res('{"error":"Invalid API key"}', 401))).toBe(
			'Invalid API key',
		);
	});

	test('falls back to the status line on a non-JSON body', async () => {
		expect(await readApiError(res('<html>502 Bad Gateway</html>', 502))).toBe(
			'Request failed (502)',
		);
	});

	test('falls back when the JSON body carries no error field', async () => {
		expect(await readApiError(res('{"detail":"nope"}', 500))).toBe(
			'Request failed (500)',
		);
	});
});

describe('buildRequest', () => {
	test('substitutes path params and drops them from body/query', () => {
		const req = buildRequest('dreams/symbols/{id}', 'GET', {
			id: 'water',
			limit: 5,
		});
		expect(req.path).toBe('/dreams/symbols/water');
		expect(req.query).toEqual({ limit: 5 });
		expect(req.body).toBeUndefined();
	});

	test('POST routes remaining values to the body', () => {
		const req = buildRequest('astrology/natal-chart', 'POST', {
			latitude: 1,
			longitude: 2,
		});
		expect(req.path).toBe('/astrology/natal-chart');
		expect(req.body).toEqual({ latitude: 1, longitude: 2 });
	});

	test('substitutes multiple path params and url-encodes them', () => {
		const req = buildRequest('astrology/horoscope/{sign}/{period}', 'GET', {
			sign: 'aries',
			period: 'daily',
		});
		expect(req.path).toBe('/astrology/horoscope/aries/daily');
	});

	test('drops empty and undefined values', () => {
		const req = buildRequest('x', 'POST', { a: '', b: undefined, c: 'keep' });
		expect(req.body).toEqual({ c: 'keep' });
	});

	test('POST routes a spec-declared query parameter to the query string', () => {
		// Every localized endpoint takes ?lang= as a query parameter even on POST.
		// Sending it in the body silently returns English.
		const req = buildRequest(
			'human-design/bodygraph',
			'POST',
			{ date: '1990-01-15', lang: 'de' },
			['lang'],
		);
		expect(req.query).toEqual({ lang: 'de' });
		expect(req.body).toEqual({ date: '1990-01-15' });
	});
});

/** Minimal ReactiveControllerHost the controller can drive, plus an event sink. */
class FakeHost<T> {
	data: T | null = null;
	loading = false;
	error: string | null = null;
	events: CustomEvent[] = [];
	addController() {}
	removeController() {}
	requestUpdate() {}
	get updateComplete() {
		return Promise.resolve(true);
	}
	dispatchEvent(e: Event) {
		this.events.push(e as CustomEvent);
		return true;
	}
}

describe('FetchController security and state machine', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	test('refuses a secret key, never calls fetch, and emits a validation error', async () => {
		const fetchMock = mock(async () => ({
			ok: true,
			status: 200,
			json: async () => ({}),
		}));
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const host = new FakeHost<unknown>();
		const fc = new FetchController(host as never);
		fc.publishableKey = 'sk_live_secret';
		await fc.run({ path: '/dreams/symbols/water', method: 'GET' });

		expect(fetchMock).not.toHaveBeenCalled();
		expect(host.error).toContain('publishable key');
		expect(host.events.some((e) => e.type === 'roxy-validation-error')).toBe(
			true,
		);
	});

	/**
	 * base-url is documented for proxied deployments, and a same-origin proxy is written the way
	 * every other route on the page is written, as a path. This is what makes the three routes a
	 * host can name behave alike: submit-url and location-url already took either shape, while a
	 * bare `new URL()` rejected the relative one here with an opaque "Invalid URL".
	 */
	test('a page-relative base-url is resolved against the page', async () => {
		const fetchMock = mock(async (_url: string | URL) => ({
			ok: true,
			status: 200,
			json: async () => ({}),
		}));
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const host = new FakeHost<unknown>();
		const fc = new FetchController(host as never);
		fc.baseUrl = '/api/roxy';
		fc.publishableKey = 'pk_test_abc';
		await fc.run({ path: '/dreams/symbols/water', method: 'GET' });

		expect(host.error).toBeNull();
		expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
			'http://localhost:3000/api/roxy/dreams/symbols/water',
		);
	});

	test('sends a pk_ key in X-API-Key and populates data on success', async () => {
		const fetchMock = mock(
			async (_url: string, _init?: { headers: Record<string, string> }) => ({
				ok: true,
				status: 200,
				json: async () => ({ name: 'Fetched' }),
			}),
		);
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const host = new FakeHost<{ name: string }>();
		const fc = new FetchController<{ name: string }>(host as never);
		fc.publishableKey = 'pk_test_abc';
		await fc.run({ path: '/dreams/symbols/water', method: 'GET' });

		expect(fetchMock).toHaveBeenCalledTimes(1);
		const init = fetchMock.mock.calls[0]?.[1];
		expect(init?.headers['X-API-Key']).toBe('pk_test_abc');
		expect(host.data).toEqual({ name: 'Fetched' });
		expect(host.error).toBeNull();
		expect(host.loading).toBe(false);
	});

	test('surfaces the API { error } message on a failed response', async () => {
		const fetchMock = mock(async () => ({
			ok: false,
			status: 422,
			json: async () => ({ error: 'Invalid latitude', code: 'bad_request' }),
		}));
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const host = new FakeHost<unknown>();
		const fc = new FetchController(host as never);
		fc.publishableKey = 'pk_test_abc';
		await fc.run({ path: '/astrology/natal-chart', method: 'POST', body: {} });

		expect(host.error).toBe('Invalid latitude');
		expect(host.data).toBeNull();
	});
});

/**
 * The proxied POST body is a contract with a route somebody else wrote, so the payload is asserted
 * as the STRING it puts on the wire rather than as a parsed object. A request with no context has
 * to serialize exactly as it always has, down to the key order, because a route is free to read it
 * however it likes; a context has to arrive whole, and only on the path whose body this code writes.
 */
describe('FetchController proxied submit payload', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	const REQ = {
		path: '/astrology/natal-chart',
		method: 'POST' as const,
		query: { lang: 'de' },
		body: { date: '1990-01-15' },
	};

	/** One submit through a `submit-url`, returning the request the controller issued. */
	async function proxied(
		context?: Record<string, unknown>,
	): Promise<{ url: string; body: string }> {
		const calls: { url: string; body: string }[] = [];
		globalThis.fetch = mock(
			async (url: string | URL, init?: { body?: string }) => {
				calls.push({ url: String(url), body: String(init?.body) });
				return { ok: true, status: 200, json: async () => ({}) };
			},
		) as unknown as typeof fetch;

		const fc = new FetchController(new FakeHost<unknown>() as never);
		fc.submitUrl = '/api/roxy/proxy';
		fc.submitContext = context;
		await fc.run(REQ);
		return calls[0] as { url: string; body: string };
	}

	test('no context posts the request byte for byte as before', async () => {
		const { url, body } = await proxied();
		expect(url).toBe('/api/roxy/proxy');
		expect(body).toBe(
			'{"path":"/astrology/natal-chart","method":"POST","query":{"lang":"de"},"body":{"date":"1990-01-15"}}',
		);
		expect(body).toBe(JSON.stringify(REQ));
	});

	test('a context rides beside the request, whole and appended last', async () => {
		const context = {
			token: 'opaque-value',
			issuedAt: 1750000000,
			nested: { source: 'host-page', flags: [1, 2] },
		};
		const { body } = await proxied(context);
		expect(JSON.parse(body)).toEqual({ ...REQ, context });
		// Appended rather than merged: every byte a route already parses is where it was.
		expect(body.startsWith(JSON.stringify(REQ).slice(0, -1))).toBe(true);
	});

	test('a direct call carries no context, even when one is set', async () => {
		const calls: { body?: string }[] = [];
		globalThis.fetch = mock(
			async (_url: string | URL, init?: { body?: string }) => {
				calls.push({ body: init?.body });
				return { ok: true, status: 200, json: async () => ({}) };
			},
		) as unknown as typeof fetch;

		const fc = new FetchController(new FakeHost<unknown>() as never);
		fc.publishableKey = 'pk_test_abc';
		fc.submitContext = { token: 'opaque-value' };
		await fc.run(REQ);

		expect(calls[0]?.body).toBe(JSON.stringify(REQ.body));
	});
});

// The roxy-data island read path (hydrate, JS-property-wins, marker-class,
// malformed JSON) is unit-tested against a stub host in utils.test.ts, and the
// real-browser island -> render mount lives in the e2e spec. happy-dom cannot
// mount a custom element that has light-DOM children (its slotchange path
// throws), so those two proofs stay where they run, and this file covers the
// base's own render switch and the self-fetch additions.
describe('RoxyDataElement render switch', () => {
	test('no data and no endpoint shows the component empty state', async () => {
		const el = document.createElement('roxy-dream-card') as HTMLElement & {
			updateComplete: Promise<unknown>;
		};
		document.body.appendChild(el);
		await el.updateComplete;
		expect(el.shadowRoot?.textContent ?? '').toContain('No data');
		el.remove();
	});
});

/**
 * A tool result asked for in compact form arrives with its same-shaped arrays
 * columnar. The base decodes it so no component and no consumer has to, and the
 * pass-through case is asserted as a literal: a response with nothing encoded in
 * it reaches `renderData` as the very object that was assigned, in one update.
 */
describe('RoxyDataElement compact results', () => {
	const mount = async (data: unknown) => {
		const el = document.createElement('roxy-data') as HTMLElement & {
			data: unknown;
			updateComplete: Promise<boolean>;
		};
		document.body.appendChild(el);
		el.data = data;
		const settled = await el.updateComplete;
		return { el, settled };
	};

	/** Rendered text with stylesheets left out and nested roots followed: a bare `textContent` asserts on the CSS, and a nested component keeps its content in its own shadow root. */
	const renderedText = (node: Node): string => {
		if (node.nodeName === 'STYLE') return '';
		const inner = (node as Element & { shadowRoot?: ShadowRoot | null })
			.shadowRoot;
		const children = [...(inner ? inner.childNodes : []), ...node.childNodes];
		return children.length === 0
			? (node.textContent ?? '')
			: children.map(renderedText).join(' ');
	};

	test('a columnar payload renders as the rows it encodes', async () => {
		const { el, settled } = await mount({
			bodies: { __cols: ['planet'], __rows: [['Sun'], ['Moon'], ['Mars']] },
		});
		const nested = el.shadowRoot?.querySelector('roxy-data') as
			| (HTMLElement & { updateComplete: Promise<boolean> })
			| null;
		if (nested) await nested.updateComplete;
		const text = renderedText(el);
		expect(text).toContain('Sun');
		expect(text).toContain('Mars');
		expect(el.data).toEqual({
			bodies: [{ planet: 'Sun' }, { planet: 'Moon' }, { planet: 'Mars' }],
		});
		// Decoding happens inside the update in progress, so it costs no second one.
		expect(settled).toBe(true);
		el.remove();
	});

	test('a plain payload reaches the render as the SAME object, in one update', async () => {
		const payload = { sign: 'Aries', meaning: 'Fire' };
		const { el, settled } = await mount(payload);
		expect(el.data).toBe(payload);
		expect(settled).toBe(true);
		el.remove();
	});
});

describe('RoxyDataElement uncontrolled mode (self-fetch UI)', () => {
	test('renders the internal form when an endpoint is set and no data is present', async () => {
		const el = document.createElement('roxy-dream-card') as HTMLElement & {
			updateComplete: Promise<unknown>;
		};
		el.setAttribute('data-endpoint', 'dreams/symbols/{id}');
		el.setAttribute('method', 'GET');
		el.setAttribute('publishable-key', 'pk_test_abc');
		document.body.appendChild(el);
		await el.updateComplete;
		expect(el.shadowRoot?.innerHTML ?? '').toContain('roxy-endpoint-form');
		el.remove();
	});

	/**
	 * The form is an internal detail a consumer never places, so every value the form needs
	 * has to arrive on the component. `location-url` is the one the city search reads, and it
	 * completes the proxy path: `submit-url` covers the request the form SUBMITS, this covers
	 * the one the form issues while a visitor is still typing.
	 */
	test('location-url is forwarded to the internal form, and is absent when unset', async () => {
		const mount = async (locationUrl?: string) => {
			const el = document.createElement('roxy-dream-card') as HTMLElement & {
				updateComplete: Promise<unknown>;
			};
			el.setAttribute('data-endpoint', 'dreams/symbols/{id}');
			el.setAttribute('method', 'GET');
			el.setAttribute('submit-url', '/api/roxy/proxy');
			if (locationUrl != null) el.setAttribute('location-url', locationUrl);
			document.body.appendChild(el);
			await el.updateComplete;
			return el;
		};

		const proxied = await mount('/api/roxy/location/search');
		const form = proxied.shadowRoot?.querySelector('roxy-endpoint-form');
		expect(form?.getAttribute('location-url')).toBe(
			'/api/roxy/location/search',
		);
		proxied.remove();

		const plain = await mount();
		expect(
			plain.shadowRoot
				?.querySelector('roxy-endpoint-form')
				?.hasAttribute('location-url'),
		).toBe(false);
		plain.remove();
	});
});

/**
 * `submit-context` is the one attribute here whose value is an object, so the markup path is where
 * it can go wrong: a page writes JSON into an attribute and has no way to see that the element
 * refused it. Anything that is not an object leaves no context AND says so, because the alternative
 * is a proxy route reporting a missing value while the page believes it sent one.
 */
describe('RoxyDataElement submit-context', () => {
	const originalWarn = console.warn;
	let warnings: string[] = [];

	beforeEach(() => {
		warnings = [];
		console.warn = (...args: unknown[]) => {
			warnings.push(args.map(String).join(' '));
		};
	});
	afterEach(() => {
		console.warn = originalWarn;
	});

	/** Mount a dream card carrying a raw `submit-context` attribute and read back the parsed property. */
	async function context(raw: string): Promise<unknown> {
		const el = document.createElement('roxy-dream-card') as HTMLElement & {
			updateComplete: Promise<unknown>;
			submitContext?: unknown;
		};
		el.setAttribute('submit-url', '/api/roxy/proxy');
		el.setAttribute('submit-context', raw);
		document.body.appendChild(el);
		await el.updateComplete;
		const value = el.submitContext;
		el.remove();
		return value;
	}

	test('a JSON object attribute becomes the object the request carries', async () => {
		expect(await context('{"token":"opaque-value","tries":2}')).toEqual({
			token: 'opaque-value',
			tries: 2,
		});
		expect(warnings).toEqual([]);
	});

	test('malformed JSON leaves no context and warns', async () => {
		expect(await context('{token: opaque-value')).toBeUndefined();
		expect(warnings.length).toBe(1);
		expect(warnings[0]).toContain('submit-context');
	});

	test('valid JSON that is not an object leaves no context and warns', async () => {
		expect(await context('["opaque-value"]')).toBeUndefined();
		expect(await context('"opaque-value"')).toBeUndefined();
		expect(warnings.length).toBe(2);
	});
});

type DreamEl = HTMLElement & {
	updateComplete: Promise<unknown>;
	data: unknown;
};

async function flush(el: DreamEl): Promise<void> {
	for (let i = 0; i < 6; i++) {
		await el.updateComplete;
		await new Promise((r) => setTimeout(r, 0));
	}
}

/** Mount a self-fetching dream card and drive one form submit, so the base's result state can be asserted. Slice/spec fetches 404 (inner form is inert here); the API call returns a valid symbol. */
async function selfFetch(sticky: boolean): Promise<DreamEl> {
	globalThis.fetch = mock(async (url: string | URL) =>
		String(url).includes('openapi.json') || String(url).includes('/schemas/')
			? { ok: false, status: 404, json: async () => ({}) }
			: {
					ok: true,
					status: 200,
					json: async () => ({ name: 'Water', meaning: 'Flow', letter: 'W' }),
				},
	) as unknown as typeof fetch;
	const el = document.createElement('roxy-dream-card') as DreamEl;
	el.setAttribute('data-endpoint', 'dreams/symbols/{id}');
	el.setAttribute('method', 'GET');
	el.setAttribute('publishable-key', 'pk_test_abc');
	document.body.appendChild(el);
	await flush(el);
	const form = el.shadowRoot?.querySelector('roxy-endpoint-form');
	form?.dispatchEvent(
		new CustomEvent('roxy-submit', {
			detail: {
				endpoint: 'dreams/symbols/{id}',
				values: { id: 'water' },
				queryKeys: [],
				sticky,
			},
			bubbles: true,
			composed: true,
		}),
	);
	await flush(el);
	return el;
}

describe('RoxyDataElement self-fetch result affordances', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	test('a non-sticky self-fetch result shows an Edit control above the data', async () => {
		const el = await selfFetch(false);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('.roxy-edit')).not.toBeNull();
		expect(root.textContent).toContain('Water');
		el.remove();
	});

	test('a sticky self-fetch result keeps the picker above the data (no Edit button)', async () => {
		const el = await selfFetch(true);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('roxy-endpoint-form')).not.toBeNull();
		expect(root.querySelector('.roxy-edit')).toBeNull();
		expect(root.textContent).toContain('Water');
		el.remove();
	});

	test('controlled mode (data assigned) never fetches and never shows the Edit affordance', async () => {
		const fetchMock = mock(async () => ({
			ok: true,
			status: 200,
			json: async () => ({}),
		}));
		globalThis.fetch = fetchMock as unknown as typeof fetch;
		const el = document.createElement('roxy-dream-card') as DreamEl;
		// An endpoint + key are set, but data is assigned: this is the WordPress /
		// controlled path, which must render the result alone and issue no request.
		el.setAttribute('data-endpoint', 'dreams/symbols/{id}');
		el.setAttribute('method', 'GET');
		el.setAttribute('publishable-key', 'pk_test_abc');
		el.data = { name: 'Ocean', meaning: 'Depth', letter: 'O' };
		document.body.appendChild(el);
		await flush(el);
		const root = el.shadowRoot as ShadowRoot;
		expect(root.textContent).toContain('Ocean');
		expect(root.querySelector('.roxy-edit')).toBeNull();
		expect(fetchMock).not.toHaveBeenCalled();
		el.remove();
	});
});

/**
 * The attribution credit converts a self-fetch or one-tag auto-mount into distribution. It renders only alongside a RESULT and only when the `attribution` attribute is enabled, so a controlled consumer (which never sets it) stays byte-identical. Default OFF for a plain self-fetch; the widgets script turns it on; `attribution="off"` forces it off.
 */
describe('RoxyDataElement attribution credit', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	/** Rendered markup with the component stylesheet stripped, so a `.roxy-attribution` CSS rule cannot be mistaken for a rendered credit. */
	function credit(el: DreamEl): { present: boolean; markup: string } {
		const markup = (el.shadowRoot?.innerHTML ?? '').replace(
			/<style[\s\S]*?<\/style>/g,
			'',
		);
		return { present: markup.includes('class="roxy-attribution"'), markup };
	}

	/** Self-fetch a dream card with an optional `attribution` attribute, then submit its form. */
	async function selfFetchAttr(attribution: string | null): Promise<DreamEl> {
		globalThis.fetch = mock(async (url: string | URL) =>
			String(url).includes('openapi.json') || String(url).includes('/schemas/')
				? { ok: false, status: 404, json: async () => ({}) }
				: {
						ok: true,
						status: 200,
						json: async () => ({ name: 'Water', meaning: 'Flow', letter: 'W' }),
					},
		) as unknown as typeof fetch;
		const el = document.createElement('roxy-dream-card') as DreamEl;
		el.setAttribute('data-endpoint', 'dreams/symbols/{id}');
		el.setAttribute('method', 'GET');
		el.setAttribute('publishable-key', 'pk_test_abc');
		if (attribution != null) el.setAttribute('attribution', attribution);
		document.body.appendChild(el);
		await flush(el);
		el.shadowRoot?.querySelector('roxy-endpoint-form')?.dispatchEvent(
			new CustomEvent('roxy-submit', {
				detail: {
					endpoint: 'dreams/symbols/{id}',
					values: { id: 'water' },
					queryKeys: [],
					sticky: false,
				},
				bubbles: true,
				composed: true,
			}),
		);
		await flush(el);
		return el;
	}

	test('a plain self-fetch shows no credit (off by default)', async () => {
		const el = await selfFetchAttr(null);
		expect(credit(el).present).toBe(false);
		expect(el.shadowRoot?.textContent).toContain('Water');
		el.remove();
	});

	test('an enabled self-fetch shows the credit under the result', async () => {
		const el = await selfFetchAttr('');
		const { present, markup } = credit(el);
		expect(present).toBe(true);
		expect(markup).toContain('Spiritual data by RoxyAPI');
		expect(markup).toContain(
			'roxyapi.com/?utm_source=widget&amp;utm_medium=embed',
		);
		expect(markup).toContain('rel="noopener"');
		el.remove();
	});

	test('attribution="off" forces the credit off even in self-fetch', async () => {
		const el = await selfFetchAttr('off');
		expect(credit(el).present).toBe(false);
		el.remove();
	});

	test('auto-mount analog: assigned data plus the attribute shows the credit', async () => {
		// The widgets attrs-complete path assigns data directly (not selfFetched) and
		// sets attribution; the credit still renders alongside the result.
		const el = document.createElement('roxy-dream-card') as DreamEl;
		el.setAttribute('attribution', '');
		el.data = { name: 'Ocean', meaning: 'Depth', letter: 'O' };
		document.body.appendChild(el);
		await flush(el);
		expect(credit(el).present).toBe(true);
		el.remove();
	});

	test('controlled mode (assigned data, no attribute) never shows the credit', async () => {
		const el = document.createElement('roxy-dream-card') as DreamEl;
		el.data = { name: 'Ocean', meaning: 'Depth', letter: 'O' };
		document.body.appendChild(el);
		await flush(el);
		expect(credit(el).present).toBe(false);
		el.remove();
	});

	test('the credit copy passes the brand rules (no apostrophe, em dash, or double hyphen dash)', async () => {
		const el = await selfFetchAttr('');
		const { markup } = credit(el);
		const start = markup.indexOf('roxy-attribution');
		const snippet = markup.slice(start, start + 200);
		expect(snippet).not.toMatch(/[—–]/);
		expect(snippet).not.toMatch(/'/);
		expect(snippet).not.toMatch(/\s--\s/);
		el.remove();
	});
});

/**
 * Every attribute the base class publishes is public API, so it has to reach the React and Vue
 * wrappers too. Those props come from one hand-edited list, and a property added here but not
 * there is invisible to framework consumers with nothing to signal it: the wrappers regenerate
 * byte-identical, so the drift gate stays green. Reactive state sets `attribute: false` and is
 * absent by the same rule rather than by exception.
 */
describe('RoxyDataElement attributes reach the generated wrappers', () => {
	test('every attributed base property is declared in BASE_PROPS', () => {
		const listed = new Set(BASE_PROPS.map((p) => p.prop));
		const published = [...RoxyDataElement.elementProperties.entries()]
			.filter(([, options]) => options.attribute !== false)
			.map(([name]) => String(name));

		// Lit fills elementProperties on finalize; an empty map would pass every
		// assertion below without checking anything.
		expect(published.length).toBeGreaterThan(0);
		for (const name of published) {
			expect(listed.has(name), `${name} is missing from BASE_PROPS`).toBe(true);
		}
	});
});
