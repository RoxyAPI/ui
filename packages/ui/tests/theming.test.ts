import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

import { ROXY_UI_TOKENS_CSS } from '../src/styles/tokens-css.js';
import {
	injectRoxyTokens,
	ROXY_UI_TOKENS_STYLE_ID,
} from '../src/utils/inject-tokens.js';

const TOKENS_CSS = readFileSync(
	new URL('../src/styles/tokens.css', import.meta.url),
	'utf8',
);

describe('tokens.css theme selectors', () => {
	test('dark block targets light-DOM ancestor selectors, not the dead `.dark :host`', () => {
		// The fix: tokens.css ships as a global light-DOM sheet, so dark must be
		// triggered by light-DOM selectors whose vars inherit through the shadow
		// boundary. `.dark :host` matched nothing in global delivery.
		expect(TOKENS_CSS).toContain(':root.dark');
		expect(TOKENS_CSS).toContain('\n.dark,');
		expect(TOKENS_CSS).toContain('[data-theme="dark"]');
		expect(TOKENS_CSS).not.toContain('.dark :host');
	});

	test('light opt-out block targets light-DOM ancestor selectors, not the dead `.light :host`', () => {
		expect(TOKENS_CSS).toContain(':root.light');
		expect(TOKENS_CSS).toContain('\n.light,');
		expect(TOKENS_CSS).toContain('[data-theme="light"]');
		expect(TOKENS_CSS).not.toContain('.light :host');
	});

	test('no :host-context (Firefox does not support it)', () => {
		expect(TOKENS_CSS).not.toContain(':host-context');
	});

	test('keeps the OS preference and explicit blocks', () => {
		expect(TOKENS_CSS).toContain('@media (prefers-color-scheme: dark)');
		expect(TOKENS_CSS).toContain(':root[data-theme="dark"]');
	});

	test('explicit dark block comes after the @media block so a choice beats the OS default', () => {
		const mediaIdx = TOKENS_CSS.indexOf('@media (prefers-color-scheme: dark)');
		const explicitDarkIdx = TOKENS_CSS.indexOf(':root.dark');
		expect(mediaIdx).toBeGreaterThanOrEqual(0);
		expect(explicitDarkIdx).toBeGreaterThan(mediaIdx);
	});
});

describe('tokens-css.ts codegen', () => {
	test('is byte-identical to tokens.css (run `bun run tokens:sync` if this fails)', () => {
		expect(ROXY_UI_TOKENS_CSS).toBe(TOKENS_CSS);
	});

	test('carries the dark token value so a CDN-only page can theme', () => {
		expect(ROXY_UI_TOKENS_CSS).toContain('--roxy-bg: #0a0a0a');
		expect(ROXY_UI_TOKENS_CSS).toContain('--roxy-fg: #fafafa');
	});
});

describe('injectRoxyTokens', () => {
	test('injects one #roxy-ui-tokens style, prepended, and is idempotent', () => {
		document.head.innerHTML = '';
		// A consumer override placed first; the prepended token style must land
		// before it so the override still wins on ties.
		const consumerOverride = document.createElement('style');
		consumerOverride.id = 'consumer-brand';
		document.head.appendChild(consumerOverride);

		const countTokenStyles = () =>
			[...document.head.children].filter(
				(el) => el.id === ROXY_UI_TOKENS_STYLE_ID,
			).length;

		const first = injectRoxyTokens();
		expect(first).not.toBeNull();
		expect(first?.id).toBe(ROXY_UI_TOKENS_STYLE_ID);

		expect(countTokenStyles()).toBe(1);
		// Prepended: it is the first child, before the consumer override.
		expect(document.head.firstElementChild?.id).toBe(ROXY_UI_TOKENS_STYLE_ID);

		// Second call is a no-op: still exactly one, same element.
		const second = injectRoxyTokens();
		expect(second).toBe(first);
		expect(countTokenStyles()).toBe(1);
	});

	test('carries the full token contract including dark values', () => {
		document.head.innerHTML = '';
		const style = injectRoxyTokens();
		expect(style?.textContent).toContain('--roxy-bg: #0a0a0a');
		expect(style?.textContent).toContain('.dark');
	});
});
