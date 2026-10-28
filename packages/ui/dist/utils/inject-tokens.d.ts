/** Element id of the injected token stylesheet. Stable so injection is idempotent and so a host page can find, inspect, or remove it. */
export declare const ROXY_UI_TOKENS_STYLE_ID = "roxy-ui-tokens";
/**
 * Inject the Roxy UI design tokens (light + dark, all theme triggers) into the document head as the cascade's lowest-priority source, so every component is themed and dark-mode-correct with no separate stylesheet link.
 *
 * @remarks
 * Every element calls this when it connects, so the npm entry, a bundler build and the CDN files alike bring their tokens with the first element on the page. Three invariants hold this safe for every consumer:
 *
 * - SSR-safe: a missing `document` (Node, Lit-SSR, Bun) is a no-op.
 * - Idempotent: a second call (many elements, two script tags, HMR) finds the existing `#roxy-ui-tokens` and returns without duplicating.
 * - Lowest priority, twice over. The tokens sit in the `roxy.tokens` cascade layer, so an unlayered host declaration outranks them at any specificity, and the style is PREPENDED to `<head>`, which registers that layer name ahead of every stylesheet the page brought with it, so a layer of the host's own sorts above it as well. A consumer `:root { --roxy-* }` brand override or a linked `tokens.css` still lands later in source order and still wins ties.
 *
 * @returns The injected (or pre-existing) style element, or `null` under SSR.
 */
export declare function injectRoxyTokens(): HTMLStyleElement | null;
