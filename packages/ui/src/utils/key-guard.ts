/**
 * The one place the "publishable key only" rule lives. Every client-side fetch boundary ({@link ../components/location-search.ts}, {@link ./fetch-controller.ts}) calls through here so a secret or legacy unprefixed key is refused identically: no network call, the same visible message, the same `roxy-validation-error` event. Centralising it is what stops the two paths drifting into different answers for the same key, one warning and fetching where the other refuses.
 */

/** Canonical refusal message. Both fetch boundaries surface this exact wording. */
export const KEY_REFUSED_MESSAGE =
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.';

/** True when the key is a browser-safe `pk_` publishable key. */
export function isPublishableKey(key: string | undefined | null): boolean {
	return !!key && key.startsWith('pk_');
}

/**
 * The fail-closed condition: a key is PRESENT and is NOT a `pk_` key. An absent key is not refused, so a keyless public call (a form-slotted city search with no key set) still proceeds; only a real secret/legacy token in the browser is stopped.
 */
export function keyIsRefused(key: string | undefined | null): boolean {
	return !!key && !key.startsWith('pk_');
}

/**
 * Announce a refused key: dispatch the shared `roxy-validation-error` (bubbling, composed) and, when `warn` is set, log it once for the developer. The caller sets its own visible error state and skips the fetch; this only handles the parts both boundaries share.
 */
export function dispatchKeyRefusal(
	host: EventTarget,
	opts: { warn?: boolean } = {},
): void {
	if (opts.warn) console.warn(KEY_REFUSED_MESSAGE);
	host.dispatchEvent(
		new CustomEvent('roxy-validation-error', {
			detail: { reason: 'possible-secret-key', message: KEY_REFUSED_MESSAGE },
			bubbles: true,
			composed: true,
		}),
	);
}
