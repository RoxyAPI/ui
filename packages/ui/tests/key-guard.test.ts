import { afterEach, describe, expect, mock, test } from 'bun:test';
import {
	dispatchKeyRefusal,
	KEY_REFUSALS,
	keyRefusal,
	SAMPLE_PUBLISHABLE_KEY,
} from '../src/utils/key-guard.js';
// Registers roxy-location-search.
import '../src/index.js';

describe('key-guard predicates', () => {
	test('a set non-pk key is refused as a possible secret; an absent key is not (keyless stays allowed)', () => {
		expect(keyRefusal('sk_live_abc')).toBe(KEY_REFUSALS.secret);
		expect(keyRefusal('17c32116-uuid-style')).toBe(KEY_REFUSALS.secret);
		expect(keyRefusal(undefined)).toBeUndefined();
		expect(keyRefusal('')).toBeUndefined();
	});

	test('the snippet sample key is refused with its own reason; a real pk_live_ or pk_test_ key passes', () => {
		expect(keyRefusal(SAMPLE_PUBLISHABLE_KEY)).toBe(KEY_REFUSALS.sample);
		expect(KEY_REFUSALS.sample.reason).toBe('sample-key');
		expect(keyRefusal('pk_live_abc')).toBeUndefined();
		expect(keyRefusal('pk_test_abc')).toBeUndefined();
	});

	test('dispatchKeyRefusal emits the shared bubbling validation event with the reason', () => {
		for (const refusal of Object.values(KEY_REFUSALS)) {
			const target = document.createElement('div');
			let detail: { reason?: string; message?: string } | null = null;
			target.addEventListener('roxy-validation-error', (e) => {
				detail = (e as CustomEvent).detail;
			});
			dispatchKeyRefusal(target, refusal);
			expect(detail as unknown).toEqual({
				reason: refusal.reason,
				message: refusal.message,
			});
		}
	});
});

type El = HTMLElement & { updateComplete: Promise<unknown> };

describe('location-search fail-closed key handling', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	test('a secret key blocks: visible error, validation event, and no fetch', async () => {
		const fetchMock = mock(async () => ({
			ok: true,
			status: 200,
			json: async () => ({ cities: [] }),
		}));
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const el = document.createElement('roxy-location-search') as El;
		let fired = false;
		el.addEventListener('roxy-validation-error', () => {
			fired = true;
		});
		el.setAttribute('api-key', 'sk_live_secret');
		document.body.appendChild(el);
		await el.updateComplete;

		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('.roxy-error[role="alert"]')).not.toBeNull();
		// The input is gone, so there is no path to a network call.
		expect(root.querySelector('input')).toBeNull();
		expect(fired).toBe(true);
		expect(fetchMock).not.toHaveBeenCalled();
		el.remove();
	});

	test('the sample key blocks with the setup message, and nothing is fetched', async () => {
		const fetchMock = mock(async () => ({
			ok: true,
			status: 200,
			json: async () => ({ cities: [] }),
		}));
		globalThis.fetch = fetchMock as unknown as typeof fetch;

		const el = document.createElement('roxy-location-search') as El;
		let reason: string | undefined;
		el.addEventListener('roxy-validation-error', (e) => {
			reason = (e as CustomEvent).detail.reason;
		});
		el.setAttribute('publishable-key', SAMPLE_PUBLISHABLE_KEY);
		document.body.appendChild(el);
		await el.updateComplete;

		const root = el.shadowRoot as ShadowRoot;
		expect(
			root.querySelector('.roxy-error[role="alert"]')?.textContent?.trim(),
		).toBe(KEY_REFUSALS.sample.message);
		expect(root.querySelector('input')).toBeNull();
		expect(reason).toBe('sample-key');
		expect(fetchMock).not.toHaveBeenCalled();
		el.remove();
	});

	test('a pk_ key renders the search input normally', async () => {
		const el = document.createElement('roxy-location-search') as El;
		el.setAttribute('publishable-key', 'pk_live_ok');
		document.body.appendChild(el);
		await el.updateComplete;
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('input[role="combobox"]')).not.toBeNull();
		expect(root.querySelector('.roxy-error')).toBeNull();
		el.remove();
	});

	test('no key at all is allowed (keyless public search)', async () => {
		const el = document.createElement('roxy-location-search') as El;
		document.body.appendChild(el);
		await el.updateComplete;
		const root = el.shadowRoot as ShadowRoot;
		expect(root.querySelector('input[role="combobox"]')).not.toBeNull();
		expect(root.querySelector('.roxy-error')).toBeNull();
		el.remove();
	});
});

/**
 * A refused key on a self-fetch form is a setup fault no visitor can fix, so the form says why once, where its inputs would be,
 * rather than drawing inputs that can never be sent and then blaming the first required field the visitor could not fill.
 */
describe('a self-fetch form with a refused key', () => {
	const originalFetch = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	/** A natal-chart-shaped element whose form slice resolves locally and whose data fetch is recorded. */
	async function mountElement(key: string) {
		const calls: string[] = [];
		globalThis.fetch = mock(async (url: string | URL) => {
			calls.push(String(url));
			return String(url).includes('/schemas/')
				? {
						ok: true,
						status: 200,
						json: async () => ({
							title: 'Generate natal chart',
							hasLang: false,
							fields: [
								{ key: 'date', name: 'date', kind: 'date', required: true },
								{
									key: 'latitude',
									name: 'latitude',
									kind: 'number',
									required: true,
									description: 'Birth location latitude in decimal degrees.',
								},
								{
									key: 'longitude',
									name: 'longitude',
									kind: 'number',
									required: true,
								},
							],
						}),
					}
				: { ok: false, status: 404, json: async () => ({}) };
		}) as unknown as typeof fetch;
		const el = document.createElement('roxy-natal-chart') as El;
		const reasons: string[] = [];
		el.addEventListener('roxy-validation-error', (e) =>
			reasons.push((e as CustomEvent).detail.reason),
		);
		el.setAttribute('data-endpoint', 'astrology/natal-chart');
		el.setAttribute('publishable-key', key);
		document.body.appendChild(el);
		for (let i = 0; i < 8; i++) {
			await el.updateComplete;
			await new Promise((r) => setTimeout(r, 0));
		}
		const form = el.shadowRoot?.querySelector('roxy-endpoint-form') as El;
		await form.updateComplete;
		return { el, form: form.shadowRoot as ShadowRoot, calls, reasons };
	}

	for (const [key, refusal] of [
		['sk_live_secret', KEY_REFUSALS.secret],
		['171717711', KEY_REFUSALS.secret],
		[SAMPLE_PUBLISHABLE_KEY, KEY_REFUSALS.sample],
	] as const) {
		test(`${key}: the reason renders once in the top block, with no input, no submit and no fetch`, async () => {
			const { el, form, calls, reasons } = await mountElement(key);
			const alerts = [...form.querySelectorAll('[role="alert"]')];
			expect(alerts.map((a) => a.textContent?.trim())).toEqual([
				refusal.message,
			]);
			expect(alerts[0]?.getAttribute('part')).toBe('validation-error');
			expect(form.querySelector('roxy-location-search')).toBeNull();
			expect(form.querySelector('input, button')).toBeNull();
			expect(reasons).toEqual([refusal.reason]);
			expect(calls.filter((u) => !u.includes('/schemas/'))).toEqual([]);
			el.remove();
		});
	}

	test('a real pk_ key draws the inputs and no refusal', async () => {
		const { el, form, reasons } = await mountElement('pk_live_abc');
		expect(form.querySelector('roxy-location-search')).not.toBeNull();
		expect(form.querySelector('button.submit')).not.toBeNull();
		expect(form.querySelector('[role="alert"]')).toBeNull();
		expect(reasons).toEqual([]);
		el.remove();
	});
});
