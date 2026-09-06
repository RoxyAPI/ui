import { ROXY_UI_TOKENS_CSS } from '../styles/tokens-css.js';

/** Element id of the injected token stylesheet. Stable so injection is idempotent and so a host page can find, inspect, or remove it. */
export const ROXY_UI_TOKENS_STYLE_ID = 'roxy-ui-tokens';

/**
 * Inject the Roxy UI design tokens (light + dark, all theme triggers) into the document head as the cascade's lowest-priority source, so a single CDN script tag yields full theming and dark mode with no separate stylesheet link.
 *
 * @remarks
 * Three invariants hold this safe for every consumer:
 *
 * - SSR-safe: a missing `document` (Node, Lit-SSR, Bun) is a no-op. Only the CDN bundle calls this; the npm/ESM entry (`src/index.ts`) never touches the document, so bundler and server consumers are unaffected.
 * - Idempotent: a second call (two script tags, HMR, re-registration) finds the existing `#roxy-ui-tokens` and returns without duplicating.
 * - Lowest priority, twice over. The tokens sit in the `roxy.tokens` cascade layer, so an unlayered host declaration outranks them at any specificity, and the style is PREPENDED to `<head>`, which registers that layer name ahead of every stylesheet the page brought with it, so a layer of the host's own sorts above it as well. A consumer `:root { --roxy-* }` brand override or a linked `tokens.css` still lands later in source order and still wins ties, so existing pages keep their exact behaviour.
 *
 * @returns The injected (or pre-existing) style element, or `null` under SSR.
 */
export function injectRoxyTokens(): HTMLStyleElement | null {
	if (typeof document === 'undefined') return null;
	const existing = document.getElementById(ROXY_UI_TOKENS_STYLE_ID);
	if (existing) return existing as HTMLStyleElement;
	const style = document.createElement('style');
	style.id = ROXY_UI_TOKENS_STYLE_ID;
	style.textContent = ROXY_UI_TOKENS_CSS;
	document.head.prepend(style);
	return style;
}
