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
		// Whitespace-agnostic: the rules are indented inside the @layer block.
		expect(TOKENS_CSS).toMatch(/^\s*\.dark,$/m);
		expect(TOKENS_CSS).toContain('[data-theme="dark"]');
		expect(TOKENS_CSS).not.toContain('.dark :host');
	});

	test('light opt-out block targets light-DOM ancestor selectors, not the dead `.light :host`', () => {
		expect(TOKENS_CSS).toContain(':root.light');
		expect(TOKENS_CSS).toMatch(/^\s*\.light,$/m);
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

/**
 * `--roxy-accent-ink` and `--roxy-ring` DERIVE from `--roxy-accent`, so overriding the accent alone rebrands the library instead of leaving the active tab, the conjunction aspect lines and the focus ring painting the old amber.
 *
 * @remarks
 * A cascade layer was tried here so that a consumer's `:root` override would also beat the `[data-theme]` blocks, which carry a higher specificity. It was reverted: layers mean UNLAYERED declarations win, so every theme block became weaker than any unlayered rule on the page, and dark mode broke the moment anything else declared a token. The theme blocks must stay authoritative. A consumer who themes dark differently sets the accent in their dark block too, exactly as shadcn requires.
 */
describe('theming contract', () => {
	test('every library selector has ZERO specificity via :where()', () => {
		// Without this, `:root.dark` and `[data-theme="dark"]` (0,1,1) outrank a
		// consumer's plain `:root` (0,1,0), so their brand accent survived under
		// prefers-color-scheme and was silently reverted to amber under the other two
		// dark signals: one override, three different results.
		expect(TOKENS_CSS).toContain(':where(:root, :host)');
		expect(TOKENS_CSS).toMatch(/:where\(\s*:root\[data-theme="dark"\]/);
		expect(TOKENS_CSS).toMatch(/:where\(\s*:root\[data-theme="light"\]/);
		// No bare high-specificity theme selector may remain.
		expect(TOKENS_CSS).not.toMatch(/^:root\[data-theme="dark"\],$/m);
		expect(TOKENS_CSS).not.toMatch(/^\.dark,$/m);
	});

	test('accent-ink and ring derive from --roxy-accent, never hardcoded', () => {
		expect(TOKENS_CSS).not.toMatch(/--roxy-accent-ink:\s*#/);
		expect(TOKENS_CSS).not.toMatch(/--roxy-ring:\s*rgba\(/);
		expect(TOKENS_CSS).toContain(
			'--roxy-accent-ink: color-mix(in oklab, var(--roxy-accent) 70%, black)',
		);
		expect(TOKENS_CSS).toContain(
			'--roxy-ring: color-mix(in srgb, var(--roxy-accent) 40%, transparent)',
		);
	});
});

/**
 * The display-font token aliases the sans stack by default, so an existing consumer sees no change; a preset overrides it to restyle every result heading and the form title in one token. happy-dom cannot resolve a var() chain, so the default is proven by construction (the token literally references --roxy-font-sans) plus a computed check that lives in the e2e suite.
 */
describe('font-display token', () => {
	test('defaults to the sans stack, so an unset preset renders headings in the body font', () => {
		expect(TOKENS_CSS).toContain('--roxy-font-display: var(--roxy-font-sans)');
		// It is only ever the alias, never a hardcoded (quoted) family, which would
		// break the "unset equals sans" guarantee.
		expect(TOKENS_CSS).not.toMatch(/--roxy-font-display:\s*"/);
	});

	test('the shared heading rule consumes the display token with a sans fallback', () => {
		const base = readFileSync(
			new URL('../src/utils/base-styles.ts', import.meta.url),
			'utf8',
		);
		expect(base).toMatch(/h1,\s*h2,\s*h3,\s*h4/);
		expect(base).toMatch(
			/font-family:\s*var\(\s*--roxy-font-display,\s*var\(\s*--roxy-font-sans/,
		);
	});
});

/**
 * The practitioner preset is an OPTIONAL theme file that only reassigns --roxy-* tokens, so it composes with the core token contract instead of replacing it. It must mirror the tokens.css trigger structure exactly (OS preference, [data-theme] / .dark opt-in, explicit-light opt-out) so it layers on the same dark-mode machinery.
 */
describe('practitioner theme preset', () => {
	const PRACTITIONER = readFileSync(
		new URL('../src/styles/themes/practitioner.css', import.meta.url),
		'utf8',
	);

	test('parses: braces balance and it carries a font @import', () => {
		const opens = (PRACTITIONER.match(/\{/g) ?? []).length;
		const closes = (PRACTITIONER.match(/\}/g) ?? []).length;
		expect(opens).toBe(closes);
		expect(opens).toBeGreaterThan(0);
		expect(PRACTITIONER).toMatch(/@import url\("https:\/\/fonts\.googleapis/);
	});

	test('mirrors the exact tokens.css trigger selectors, light and dark', () => {
		expect(PRACTITIONER).toContain(':where(:root, :host)');
		expect(PRACTITIONER).toContain('@media (prefers-color-scheme: dark)');
		expect(PRACTITIONER).toContain(':root[data-theme="dark"]');
		expect(PRACTITIONER).toContain(':root[data-theme="light"]');
		expect(PRACTITIONER).toContain(':host([data-theme="dark"])');
		expect(PRACTITIONER).toMatch(/^\s*\.dark,$/m);
		expect(PRACTITIONER).toMatch(/^\s*\.light,$/m);
	});

	test('carries both mode palettes and derives accent-ink like tokens.css', () => {
		expect(PRACTITIONER).toContain('--roxy-bg: #fbf6f3');
		expect(PRACTITIONER).toContain('--roxy-bg: #231619');
		expect(PRACTITIONER).toContain('--roxy-accent: #914955');
		expect(PRACTITIONER).toContain('--roxy-accent: #d9a2a6');
		expect(PRACTITIONER).toContain(
			'--roxy-accent-ink: color-mix(in oklab, var(--roxy-accent) 70%, black)',
		);
		expect(PRACTITIONER).toContain('--roxy-font-display:');
	});

	test('only sets --roxy-* custom properties (no bare CSS properties leak in)', () => {
		const body = PRACTITIONER.replace(/\/\*[\s\S]*?\*\//g, '').replace(
			/@import[^;]+;/g,
			'',
		);
		const props = [...body.matchAll(/([\w-]+)\s*:\s*[^{};]+;/g)].map(
			(m) => m[1],
		);
		expect(props.length).toBeGreaterThan(10);
		const foreign = props.filter((p) => !p.startsWith('--roxy-'));
		expect(foreign).toEqual([]);
	});
});
