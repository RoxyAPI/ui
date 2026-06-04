/**
 * CDN bundle entry. Registers every custom element (via ./index.js) and injects the design-token stylesheet so a single script tag from the CDN yields full theming and dark mode with no separate stylesheet link.
 *
 * Kept separate from ./index.ts on purpose: ./index.ts stays free of document side effects so npm, bundler, and Lit-SSR consumers import elements without a global stylesheet being forced into their page. Only the CDN IIFE, where a host page opted into a drop-in script tag, runs the injection. The injector is SSR-safe, idempotent, and prepends (lowest cascade priority) so consumer overrides still win.
 */
export * from './index.js';

import { injectRoxyTokens } from './utils/inject-tokens.js';

injectRoxyTokens();

export {
	injectRoxyTokens,
	ROXY_UI_TOKENS_STYLE_ID,
} from './utils/inject-tokens.js';
