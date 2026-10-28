/**
 * CDN bundle entry: registers every custom element (via ./index.js). Each element injects the design-token stylesheet when it connects, so a single script tag yields full theming and dark mode with no separate stylesheet link; the injector stays on the global for a page that wants the tokens before any element.
 */
export * from './index.js';
export { injectRoxyTokens, ROXY_UI_TOKENS_STYLE_ID, } from './utils/inject-tokens.js';
