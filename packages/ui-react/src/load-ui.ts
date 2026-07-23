/**
 * Loads the matching component bundle on first mount. Idempotent across
 * many components on the same page. Skips on the server (no document) so
 * React server components and Next.js SSR work without a flash.
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
export const ROXY_UI_VERSION = '0.17.1';

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

// Default export retained for convenience; matches the named export.
export default ensureScriptLoaded;
// Surfaces the embedded @roxyapi/ui version this build of @roxyapi/ui-react
// was generated against. Useful for diagnostics; not load-bearing.
