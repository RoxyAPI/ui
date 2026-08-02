/**
 * Display formatters for ISO timestamps and floats coming back from the API.
 * Every helper returns "" for nullish or unparseable input so it falls out of
 * template literals cleanly.
 */

import { capitalize, humanize } from './string.js';

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
export function resolveDisplayDate(input: string): {
	d: Date;
	timeZone?: string;
} {
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
	const { d, timeZone } = resolveDisplayDate(input);
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
	const { d, timeZone } = resolveDisplayDate(
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

/** Two dates as one label: `Jan 1, 2026 - Jan 7, 2026`. Falls back to whichever end parses when the other is absent. */
export function formatDateRange(start: unknown, end: unknown): string {
	const a = formatDate(start);
	const b = formatDate(end);
	if (a && b) return `${a} - ${b}`;
	return a || b;
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
 * Normalize the `type` field on an aspect entry to a lowercase, hyphen-separated canonical name (`SEMI_SEXTILE` and `SEMI SEXTILE` both become `semi-sextile`). Accepts any aspect-shaped object so both natal and synastry inter-aspect entries can share this.
 *
 * @remarks
 * Spaces are folded as well as underscores because the endpoints do not agree on the separator: aspects returns `SEMI SEXTILE` where synastry returns `SEMI_SEXTILE`. Handling only the underscore left the space form failing every {@link ASPECT_CLASS} and `ASPECT_SYMBOL` lookup, so the same aspect rendered hyphenated and correctly coloured in one component and space-separated in the neutral fallback colour in another.
 */
export function normalizeAspect(a: { type?: string }): string {
	return (a.type ?? '')
		.toLowerCase()
		.trim()
		.replace(/[\s_]+/g, '-');
}

/**
 * Display label for an aspect: `SEMI_SEXTILE` -> `Semi-sextile`.
 *
 * The raw value is an API enum and the table column it lands in is read by practitioners, not parsers. {@link normalizeAspect} stays the lookup key for classes and glyphs; this is the human-facing form.
 */
export function formatAspectName(a: { type?: string }): string {
	return capitalize(normalizeAspect(a));
}

/**
 * Display label for an ayanamsa identifier. `kp-newcomb` -> `KP Newcomb`.
 *
 * The raw values are API enums, and every one of them needs a human form that {@link humanize} cannot derive: KP is an initialism that must stay uppercase, and `raman` is a person, B.V. Raman, not a word. Anything unmapped degrades to a humanized slug rather than rendering the enum, which is a safe fallback and NOT a licence to skip the map: `raman` shipped as a frame months after this map was written and read as a bare "Raman" until 2026-08-03. `format.test.ts` now fails if the committed spec gains a frame this map lacks.
 */
export const AYANAMSA_LABEL: Record<string, string> = {
	'kp-newcomb': 'KP Newcomb',
	'kp-old': 'KP Old',
	lahiri: 'Lahiri',
	raman: 'B.V. Raman',

	custom: 'Custom',
};

export function formatAyanamsa(type: unknown, degrees?: unknown): string {
	const label =
		typeof type === 'string' ? (AYANAMSA_LABEL[type] ?? humanize(type)) : '';
	const deg =
		typeof degrees === 'number' ? `${formatNumber(degrees, 2)}\u00b0` : '';
	if (label && deg) return `${label} (${deg})`;
	return label || deg;
}

/**
 * Date plus time in one label: `Jan 15, 1990, 2:30 PM`.
 *
 * @remarks
 * Components were concatenating a raw date and a raw time (`1990-01-15 \u00b7 14:30:00`) while siblings rendered the same instant through {@link formatDate}. One helper keeps every card reading the same way.
 *
 * Birth details arrive as two fields rather than one timestamp, so `time` may be passed separately; it is merged into a naive datetime, which {@link formatDate} and {@link formatTime} pin to UTC so the wall clock renders identically for every viewer.
 *
 * @example
 * ```ts
 * formatDateTime('1990-01-15T14:30:00');    // 'Jan 15, 1990, 2:30 PM'
 * formatDateTime('1990-01-15', '14:30:00'); // 'Jan 15, 1990, 2:30 PM'
 * formatDateTime('1990-01-15');             // 'Jan 15, 1990'
 * ```
 */
export function formatDateTime(input: unknown, time?: unknown): string {
	const merged =
		typeof input === 'string' &&
		DATE_ONLY.test(input) &&
		typeof time === 'string' &&
		BARE_TIME.test(time)
			? `${input}T${time}`
			: input;
	const date = formatDate(merged);
	const clock = formatTime(merged);
	if (date && clock) return `${date}, ${clock}`;
	return date || clock;
}

/**
 * The Sanskrit form of a name, but only when it actually differs from the English one.
 *
 * @remarks
 * Several endpoints pair an English `name` with a `sanskritName` that is sometimes the SAME string, because the tradition and the translation coincide (a nakshatra is `Ashwini` either way). Rendering the pair unconditionally then prints `Ashwini (Ashwini)`. That guard is the whole reason this exists: it is one comparison, it is easy to leave out, and leaving it out is invisible until a reader hits a name where the two agree.
 *
 * Presentation deliberately stays with the caller, since the same fact is drawn as a parenthetical in a table cell and as a middot-separated span on a chart heading.
 */
export function distinctSanskrit(
	name: unknown,
	sanskritName: unknown,
): string | undefined {
	if (typeof sanskritName !== 'string' || !sanskritName) return undefined;
	return sanskritName === name ? undefined : sanskritName;
}

/**
 * `English (Sanskrit)` for a value that carries both, falling back to whichever one exists.
 *
 * @example
 * ```ts
 * formatWithSanskrit('Tuesday', 'Mangalavara'); // 'Tuesday (Mangalavara)'
 * formatWithSanskrit('Ashwini', 'Ashwini');     // 'Ashwini'
 * ```
 */
export function formatWithSanskrit(
	name: unknown,
	sanskritName: unknown,
): string {
	const english = typeof name === 'string' ? name : '';
	const sanskrit = distinctSanskrit(english, sanskritName);
	if (!english) return sanskrit ?? '';
	return sanskrit ? `${english} (${sanskrit})` : english;
}
