import { afterEach, describe, expect, mock, test } from 'bun:test';

// Registers roxy-dream-card, a concrete RoxyDataElement subclass used here to
// exercise the base in both modes. happy-dom is loaded by preload (bunfig.toml).
import '../src/components/dream-card.js';
import {
	buildRequest,
	FetchController,
} from '../src/utils/fetch-controller.js';

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
		expect(el.shadowRoot?.textContent ?? '').toContain('No dream symbol');
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
});
