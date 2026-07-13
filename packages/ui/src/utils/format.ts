/**
 * Display formatters for ISO timestamps and floats coming back from the API.
 * Every helper returns "" for nullish or unparseable input so it falls out of
 * template literals cleanly.
 */

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const BARE_TIME = /^\d{2}:\d{2}(:\d{2})?$/;
/** An ISO datetime with NO timezone designator: a wall clock, not an instant. */
const NAIVE_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/;

/**
 * Resolve an API timestamp to a Date plus the timezone it must be RENDERED in.
 *
 * @remarks
 * The API returns chart times naive (`2026-07-13T04:36:00`): that is 04:36 in the CHART's timezone, not UTC and not the viewer's. A wall clock must read the same for every viewer on earth, so hora at sunrise says 04:36 in Tokyo and in Chicago alike.
 *
 * Handing a naive string to `new Date()` makes the runtime interpret it in the VIEWER's zone, which is a silent corruption whenever that wall clock lands in the viewer's DST gap. In America/New_York `2026-03-08T02:30:00` does not exist, so the clock jumps and it renders as `3:30 AM`. Pinning the wall clock to UTC, which has no DST and therefore no gap, preserves the digits exactly while Intl still applies the viewer's locale conventions.
 *
 * An offset-bearing timestamp (`...Z`, `...+05:30`) IS a real instant, so it keeps the normal behaviour and converts to the viewer's local time.
 */
function resolve(input: string): { d: Date; timeZone?: string } {
	const naive = BARE_TIME.test(input)
		? `1970-01-01T${input}`
		: NAIVE_DATETIME.test(input)
			? input
			: null;
	return naive
		? { d: new Date(`${naive}Z`), timeZone: 'UTC' }
		: { d: new Date(input) };
}

export function formatTime(input: unknown): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	if (DATE_ONLY.test(input)) return '';
	const { d, timeZone } = resolve(input);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleTimeString(undefined, {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZone,
	});
}

export function formatDate(input: unknown): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	const { d, timeZone } = resolve(
		DATE_ONLY.test(input) ? `${input}T00:00:00` : input,
	);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone,
	});
}

export function formatTimeRange(
	t: { start?: string; end?: string } | undefined,
): string {
	if (!t) return '';
	const start = formatTime(t.start);
	const end = formatTime(t.end);
	if (start && end) return `${start} - ${end}`;
	return start || end || '';
}

/**
 * Format a number, dropping trailing zeros in the FRACTIONAL part only: `2.50` becomes `2.5`, `2.0` becomes `2`, and `100` stays `100`.
 *
 * @remarks
 * The old implementation ran `.replace(/\.?0+$/, '')` against the whole string, which happily ate zeros off the INTEGER when there was no decimal point. At `dp = 0` that meant `100` rendered as `1`, `90` as `9`, `20` as `2`, and `0` as the empty string. It shipped: a 100 percent tight stellium displayed as "1% tight", and an aspect of strength 100 as "str 1". Guard on the decimal point, and never strip from the integer side.
 *
 * @example
 * ```ts
 * formatNumber(100, 0); // '100'
 * formatNumber(2.5, 1); // '2.5'
 * formatNumber(2, 1);   // '2'
 * formatNumber(0, 0);   // '0'
 * ```
 */
export function formatNumber(value: unknown, dp = 1): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '';
	const fixed = value.toFixed(dp);
	return fixed.includes('.') ? fixed.replace(/\.?0+$/, '') : fixed;
}

export function formatPercent(value: unknown, dp = 1): string {
	const n = formatNumber(value, dp);
	return n ? `${n}%` : '';
}

/**
 * CSS class name per aspect type. Used by natal and synastry chart aspect
 * lines so the same color encoding (harmonious vs challenging) applies in
 * both wheels. Keys are lowercase canonical names, values are CSS class
 * suffixes the chart components define in their `:host` styles.
 */
export const ASPECT_CLASS: Record<string, string> = {
	conjunction: 'aspect-conjunction',
	sextile: 'aspect-sextile',
	square: 'aspect-square',
	trine: 'aspect-trine',
	opposition: 'aspect-opposition',
};

/**
 * Normalize the `type` field on an aspect entry to a lowercase, hyphen-separated
 * canonical name (`SEMI_SEXTILE` → `semi-sextile`). Accepts any aspect-shaped
 * object so both natal and synastry inter-aspect entries can share this.
 */
export function normalizeAspect(a: { type?: string }): string {
	return (a.type ?? '').toLowerCase().replace(/_/g, '-');
}
