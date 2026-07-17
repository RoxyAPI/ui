import { afterEach, describe, expect, mock, test } from 'bun:test';
import {
	dispatchKeyRefusal,
	isPublishableKey,
	KEY_REFUSED_MESSAGE,
	keyIsRefused,
} from '../src/utils/key-guard.js';
// Registers roxy-location-search.
import '../src/index.js';

describe('key-guard predicates', () => {
	test('only a pk_ key is publishable', () => {
		expect(isPublishableKey('pk_live_abc')).toBe(true);
		expect(isPublishableKey('sk_live_abc')).toBe(false);
		expect(isPublishableKey(undefined)).toBe(false);
	});

	test('a set non-pk key is refused; an absent key is not (keyless stays allowed)', () => {
		expect(keyIsRefused('sk_live_abc')).toBe(true);
		expect(keyIsRefused('17c32116-uuid-style')).toBe(true);
		expect(keyIsRefused('pk_test_abc')).toBe(false);
		expect(keyIsRefused(undefined)).toBe(false);
		expect(keyIsRefused('')).toBe(false);
	});

	test('dispatchKeyRefusal emits the shared bubbling validation event', () => {
		const target = document.createElement('div');
		let detail: { reason?: string; message?: string } | null = null;
		target.addEventListener('roxy-validation-error', (e) => {
			detail = (e as CustomEvent).detail;
		});
		dispatchKeyRefusal(target);
		expect(detail).not.toBeNull();
		expect((detail as unknown as { reason: string }).reason).toBe(
			'possible-secret-key',
		);
		expect((detail as unknown as { message: string }).message).toBe(
			KEY_REFUSED_MESSAGE,
		);
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
