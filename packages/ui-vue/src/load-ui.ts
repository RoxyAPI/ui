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
 * pins the runtime. It used to default to '@latest', which meant a pinned wrapper
 * silently picked up whatever the CDN was serving, and a new @roxyapi/ui release
 * changed the elements under every existing install with no lockfile change.
 *
 * Pass an explicit `version` to override, or 'latest' to opt back into floating.
 *
 * Pass `baseUrl` to serve the bundle from your own origin instead of the CDN, which is
 * what an air-gapped install or a strict Content-Security-Policy needs: copy
 * `node_modules/@roxyapi/ui/dist/cdn/` onto your host and call this once at app entry,
 * before any component mounts. The loader keeps a single shared promise, so the first
 * call wins and every component reuses it.
 */
/** The @roxyapi/ui release this wrapper was generated against. The loader defaults to it, so the wrapper version in your lockfile is the runtime you actually get. */
export const ROXY_UI_VERSION = '0.32.0';

const SCRIPT_ID = 'roxyapi-ui-loader';
const CDN_BASE_LATEST =
	'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn';
const CDN_BASE_PREFIX = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@';
const CDN_BASE_SUFFIX = '/dist/cdn';

let loaded: Promise<void> | null = null;

function buildBase(version: string): string {
	if (!version || version === 'latest') return CDN_BASE_LATEST;
	return `${CDN_BASE_PREFIX}${version}${CDN_BASE_SUFFIX}`;
}

export function ensureScriptLoaded(
	version: string = ROXY_UI_VERSION,
	baseUrl?: string,
): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	if (loaded) return loaded;

	loaded = new Promise<void>((resolve, reject) => {
		const url = `${baseUrl ?? buildBase(version)}/roxy-ui.js`;
		let existing = document.getElementById(
			SCRIPT_ID,
		) as HTMLScriptElement | null;
		if (existing) {
			if (existing.dataset.loaded === 'true') {
				resolve();
			} else {
				existing.addEventListener('load', () => resolve());
				existing.addEventListener('error', () =>
					reject(new Error('roxy-ui load failed')),
				);
			}
			return;
		}
		existing = document.createElement('script');
		existing.id = SCRIPT_ID;
		existing.src = url;
		existing.async = true;
		existing.crossOrigin = 'anonymous';
		existing.addEventListener('load', () => {
			existing!.dataset.loaded = 'true';
			resolve();
		});
		existing.addEventListener('error', () =>
			reject(new Error('roxy-ui load failed')),
		);
		document.head.appendChild(existing);
	});
	return loaded;
}

/** Every language a label catalogue ships for. English is absent on purpose: the catalogue key IS the English string, so an English page downloads nothing. */
export const ROXY_UI_LOCALES = [
	'de',
	'es',
	'fr',
	'hi',
	'pt',
	'ru',
	'tr',
] as const;

const localesLoaded = new Map<string, Promise<void>>();

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
export function ensureLocaleLoaded(
	lang: string,
	version: string = ROXY_UI_VERSION,
	baseUrl?: string,
): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	const base = (lang || '').toLowerCase().split('-')[0] ?? '';
	if (!(ROXY_UI_LOCALES as readonly string[]).includes(base)) {
		return Promise.resolve();
	}
	const existing = localesLoaded.get(base);
	if (existing) return existing;

	const pending = new Promise<void>((resolve, reject) => {
		const id = `${SCRIPT_ID}-locale-${base}`;
		let el = document.getElementById(id) as HTMLScriptElement | null;
		if (el) {
			if (el.dataset.loaded === 'true') resolve();
			else {
				el.addEventListener('load', () => resolve());
				el.addEventListener('error', () =>
					reject(new Error(`roxy-ui locale ${base} load failed`)),
				);
			}
			return;
		}
		el = document.createElement('script');
		el.id = id;
		el.src = `${baseUrl ?? buildBase(version)}/locales/${base}.js`;
		el.async = true;
		el.crossOrigin = 'anonymous';
		el.addEventListener('load', () => {
			el!.dataset.loaded = 'true';
			resolve();
		});
		el.addEventListener('error', () =>
			reject(new Error(`roxy-ui locale ${base} load failed`)),
		);
		document.head.appendChild(el);
	});
	localesLoaded.set(base, pending);
	return pending;
}

// Default export retained for convenience; matches the named export.
export default ensureScriptLoaded;
// Surfaces the embedded @roxyapi/ui version this build of @roxyapi/ui-vue
// was generated against. Useful for diagnostics; not load-bearing.
