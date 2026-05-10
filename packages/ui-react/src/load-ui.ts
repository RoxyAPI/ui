/**
 * Loads the matching component bundle on first mount. Idempotent across
 * many components on the same page. Skips on the server (no document) so
 * React server components and Next.js SSR work without a flash.
 */
const SCRIPT_ID = 'roxyapi-ui-loader';
const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn';

let loaded: Promise<void> | null = null;

export function ensureScriptLoaded(version: string = '0.1.2'): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	if (loaded) return loaded;

	loaded = new Promise<void>((resolve, reject) => {
		void version;
		const url = `${CDN_BASE}/roxy-ui.js`;
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
