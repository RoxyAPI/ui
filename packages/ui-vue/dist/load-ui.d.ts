/**
 * Loads the matching component bundle on first mount. Idempotent across
 * many components on the same page. Skips on the server (no document) so
 * Nuxt and Vue server rendering work without a flash.
 *
 * {@link ensureLocaleLoaded} is the other half and is OPT-IN: it loads the label
 * catalogue for one language from the same release, so a non-English app calls
 * both. There is one catalogue, shipped by `@roxyapi/ui` and read by every
 * wrapper, so nothing is restated here.
 *
 * Defaults to the EXACT @roxyapi/ui release this wrapper was built against, so
 * `@roxyapi/ui-vue@x.y.z` always runs `@roxyapi/ui@x.y.z` and a lockfile actually
 * pins the runtime: it is a fixed version rather than a moving alias, so a later
 * @roxyapi/ui release cannot change the elements under an existing install.
 *
 * Pass an explicit `version` to override, or 'latest' to opt back into floating.
 *
 * Pass `baseUrl` to serve the bundle from your own origin instead of the CDN, which is
 * what an air-gapped install or a strict Content-Security-Policy needs: copy
 * `node_modules/@roxyapi/ui/dist/cdn/` onto your host and call this once at app entry,
 * before any component mounts. The loader keeps a single shared promise, so the first
 * call wins and every component reuses it.
 */
/** The @roxyapi/ui release this package was generated against. The loader defaults to it, so the package version in your lockfile is the runtime you actually get. */
export declare const ROXY_UI_VERSION = "1.1.2";
export declare function ensureScriptLoaded(version?: string, baseUrl?: string): Promise<void>;
/** Every language a label catalogue ships for. English is absent on purpose: the catalogue key IS the English string, so an English page downloads nothing. */
export declare const ROXY_UI_LOCALES: readonly ["de", "es", "fr", "hi", "pt", "ru", "tr", "zh-Hans", "zh-Hant"];
/**
 * Load the label catalogue for one language, so the components write their own
 * headings, buttons, empty states and form labels in it.
 *
 * Call it once at app entry, beside `ensureScriptLoaded`. The components read the
 * language from the page (their own `lang` attribute, the nearest ancestor
 * carrying one, or `<html lang>`), so this call supplies the WORDS and the page
 * supplies the CHOICE. Loading a catalogue a page never asks for is harmless.
 *
 * `es-AR`, `es-MX` and `es-419` all resolve to the `es` catalogue, so pass the
 * page tag as it stands. English resolves to nothing at all and is not an error:
 * the catalogue is keyed by the English text, so an English page needs no payload.
 * A language outside `ROXY_UI_LOCALES` resolves the same way rather than appending
 * a script tag that 404s.
 *
 * `version` and `baseUrl` behave exactly as they do for {@link ensureScriptLoaded},
 * and passing the same `baseUrl` to both is what an air-gapped or strict-CSP host
 * needs: copy `node_modules/@roxyapi/ui/dist/cdn/` onto your own origin, which
 * carries `locales/` beside `roxy-ui.js`.
 *
 * @example
 * ```ts
 * import { ensureScriptLoaded, ensureLocaleLoaded } from '@roxyapi/ui-vue';
 *
 * ensureScriptLoaded();
 * ensureLocaleLoaded(document.documentElement.lang);
 * ```
 */
export declare function ensureLocaleLoaded(lang: string, version?: string, baseUrl?: string): Promise<void>;
export default ensureScriptLoaded;
