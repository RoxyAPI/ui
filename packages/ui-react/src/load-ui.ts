/**
 * Loads the matching component bundle on first mount. Idempotent across
 * many components on the same page. Skips on the server (no document) so
 * React server components and Next.js SSR work without a flash.
 *
 * Pass an explicit `version` (e.g. `'0.1.5'`) to pin the loaded bundle to a
 * specific @roxyapi/ui release; the default ('latest') resolves to whatever
 * the CDN currently serves for @latest.
 */
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

export function ensureScriptLoaded(version: string = 'latest'): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	if (loaded) return loaded;

	loaded = new Promise<void>((resolve, reject) => {
		const url = `${buildBase(version)}/roxy-ui.js`;
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
export const ROXY_UI_VERSION = '0.4.0';
