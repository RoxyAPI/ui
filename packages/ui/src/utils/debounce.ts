/**
 * Lightweight debounce for input handlers. Used by location search.
 *
 * The returned function exposes a `.cancel()` method so callers can clear a
 * pending invocation when the host element disconnects, preventing the timer
 * from firing on a detached node and mutating reactive state after teardown.
 */
export interface Debounced<F extends (...args: never[]) => unknown> {
	(...args: Parameters<F>): void;
	cancel: () => void;
}

export function debounce<F extends (...args: never[]) => unknown>(
	fn: F,
	wait: number,
): Debounced<F> {
	let timer: ReturnType<typeof setTimeout> | undefined;
	const debounced = ((...args: Parameters<F>) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			timer = undefined;
			fn(...args);
		}, wait);
	}) as Debounced<F>;
	debounced.cancel = () => {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}
	};
	return debounced;
}
