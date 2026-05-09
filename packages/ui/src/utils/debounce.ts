/**
 * Lightweight debounce for input handlers. Used by location search.
 */
export function debounce<F extends (...args: never[]) => unknown>(
	fn: F,
	wait: number,
): F {
	let timer: ReturnType<typeof setTimeout> | undefined;
	return ((...args: Parameters<F>) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => fn(...args), wait);
	}) as F;
}
