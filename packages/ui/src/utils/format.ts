/**
 * Display formatters for ISO timestamps and floats coming back from the API.
 * Every helper returns "" for nullish or unparseable input so it falls out of
 * template literals cleanly.
 *
 * @remarks
 * **This file is the ONLY place in the library that may call `Intl` or a `toLocale*` method, and every helper that does takes the locale as its first argument, required.** Both halves are enforced by a source scan in `tests/i18n.test.ts`.
 *
 * The locale is the DISPLAY locale, the full tag `resolveLang` returns, region included. It is NOT the value that goes on `?lang=`: that one is truncated to a supported two-letter code because the API rejects anything else, and handing THAT to Intl would render every Argentine visitor's dates in Castilian conventions. `es-AR` is exactly the tag Intl wants.
 *
 * It is required rather than optional because the failure it prevents is an omission: `toLocaleDateString(undefined, ...)` means the locale of whoever is looking, so a Spanish page renders `Carta natal` above `Jan 15, 1990, 2:30 PM` and two visitors to one page see two different strings. An optional parameter defaults straight back to that. A missing argument is now a typecheck failure at every call site.
 */

import { capitalize, humanize } from './string.js';

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const BARE_TIME = /^\d{2}:\d{2}(:\d{2})?$/;
/** An ISO datetime with NO timezone designator: a wall clock, not an instant. */
const NAIVE_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/;

/** Canonical form per tag seen, so a page carrying an unparseable `lang` does not throw once per rendered date. */
const CANONICAL: Map<string, string> = new Map();

/**
 * The locale list to hand Intl: the page's tag first, English behind it.
 *
 * @remarks
 * Two failure modes, both reachable from a `lang` attribute a site owner typed by hand and neither of which may reach a visitor:
 *
 * - **A structurally invalid tag throws.** `lang="english"` or `lang="en_US"` makes every `toLocale*` call raise a RangeError, which inside a render is a blank component rather than a wrong date. Canonicalizing behind a try/catch degrades it to English instead.
 * - **A valid-but-unknown tag falls back to the RUNTIME default**, which is the viewer's browser again, so the bug reappears for exactly the pages least likely to notice. Naming `en` as the second entry makes the fallback the page's, not the visitor's.
 *
 * No language signal at all resolves to English for the same reason the chrome catalogue does: a page that never declares a language is English as far as this library is concerned, and English chrome over German dates is the inconsistency this whole file exists to remove. `navigator.language` is deliberately absent from the chain here as it is in `resolveLang`: it is the VISITOR's preference, not the site's.
 */
function intlLocales(locale: string | undefined): string[] {
	if (!locale) return ['en'];
	const cached = CANONICAL.get(locale);
	if (cached) return [cached, 'en'];
	let canonical = 'en';
	try {
		canonical = Intl.getCanonicalLocales(locale)[0] ?? 'en';
	} catch {
		canonical = 'en';
	}
	CANONICAL.set(locale, canonical);
	return [canonical, 'en'];
}

/**
 * Resolve an API timestamp to a Date plus the timezone it must be RENDERED in.
 *
 * @remarks
 * The API returns chart times naive (`2026-07-13T04:36:00`): that is 04:36 in the CHART's timezone, not UTC and not the viewer's. A wall clock must read the same for every viewer on earth, so hora at sunrise says 04:36 in Tokyo and in Chicago alike.
 *
 * Handing a naive string to `new Date()` makes the runtime interpret it in the VIEWER's zone, which is a silent corruption whenever that wall clock lands in the viewer's DST gap. In America/New_York `2026-03-08T02:30:00` does not exist, so the clock jumps and it renders as `3:30 AM`. Pinning the wall clock to UTC, which has no DST and therefore no gap, preserves the digits exactly while Intl still writes them in the PAGE locale conventions.
 *
 * An offset-bearing timestamp (`...Z`, `...+05:30`) IS a real instant, so it keeps the normal behaviour and converts to the viewer's local time.
 *
 * A DATE_ONLY value (`2026-08-01`) is the same wall clock with the time left off, and it is normalised HERE rather than at each call site because leaving it to the caller is a defect that formats correctly for whoever writes the code: the platform parses a bare date as UTC midnight, and Intl then renders that instant in the VIEWER's zone, so every viewer west of Greenwich reads the previous day. Three helpers pinned it inline and {@link formatDateGrain} did not, which nothing caught because its only caller passes full datetimes.
 *
 * Deliberately NOT exported. Exporting it lets a component needing a shape these helpers do not offer pin its own wall clock and call Intl itself, which is how a boundary date ends up hardcoded to one locale. A missing shape is added here, beside the locale handling, not reimplemented in a component.
 */
function resolveDisplayDate(input: string): {
	d: Date;
	timeZone?: string;
} {
	const naive = BARE_TIME.test(input)
		? `1970-01-01T${input}`
		: DATE_ONLY.test(input)
			? `${input}T00:00:00`
			: NAIVE_DATETIME.test(input)
				? input
				: null;
	return naive
		? { d: new Date(`${naive}Z`), timeZone: 'UTC' }
		: { d: new Date(input) };
}

/**
 * The clock, in the page locale: `2:30 PM` in English, `14:30` in German.
 *
 * @remarks
 * The hour cycle is the locale's, never ours. Pinning `hour12: true` puts an AM/PM clock on every page in Europe and Latin America while the embedded form beside it labels its own input "formato de 24 horas". CLDR already knows which convention each locale reads, including the ones that surprise you (`es` is 24-hour, `es-AR` is 12-hour with `p. m.`), so asserting a cycle here is asserting we know better than the locale data.
 */
export function formatTime(locale: string | undefined, input: unknown): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	if (DATE_ONLY.test(input)) return '';
	const { d, timeZone } = resolveDisplayDate(input);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleTimeString(intlLocales(locale), {
		hour: 'numeric',
		minute: '2-digit',
		timeZone,
	});
}

export function formatDate(locale: string | undefined, input: unknown): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	const { d, timeZone } = resolveDisplayDate(input);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleDateString(intlLocales(locale), {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone,
	});
}

export function formatTimeRange(
	locale: string | undefined,
	t: { start?: string; end?: string } | undefined,
): string {
	if (!t) return '';
	const start = formatTime(locale, t.start);
	const end = formatTime(locale, t.end);
	if (start && end) return `${start} - ${end}`;
	return start || end || '';
}

/** Two dates as one label: `Jan 1, 2026 - Jan 7, 2026`. Falls back to whichever end parses when the other is absent. */
export function formatDateRange(
	locale: string | undefined,
	start: unknown,
	end: unknown,
): string {
	const a = formatDate(locale, start);
	const b = formatDate(locale, end);
	if (a && b) return `${a} - ${b}`;
	return a || b;
}

/** How much of a timestamp a label shows. `time` is the whole date plus the clock. */
export type DateGrain = 'year' | 'month' | 'day' | 'time';

/**
 * A timestamp at a chosen granularity, for an axis or a bar end where the full date would not fit.
 *
 * @remarks
 * Every grain below `year` carries the year, because a period routinely straddles new year and a label reading `28 Dec - 3 Jan` says nothing about which side moved. `year` is sliced off the string rather than formatted, since a bare four-digit year is the same in every locale this library ships and running it through Intl would introduce era and numbering-system differences into an axis tick.
 */
export function formatDateGrain(
	locale: string | undefined,
	input: unknown,
	grain: DateGrain,
): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	if (grain === 'year') {
		const m = input.match(/^(\d{4})/);
		return m?.[1] ?? input;
	}
	const { d, timeZone } = resolveDisplayDate(input);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleString(intlLocales(locale), {
		day: grain === 'month' ? undefined : 'numeric',
		month: 'short',
		year: 'numeric',
		hour: grain === 'time' ? 'numeric' : undefined,
		minute: grain === 'time' ? '2-digit' : undefined,
		timeZone,
	});
}

/**
 * A day inside a month already named elsewhere: `Aug 3`, `3 ago`, `3. Aug.`.
 *
 * @remarks
 * Deliberately WITHOUT the year, which is the one thing {@link formatDateGrain} will not do at any grain below `year`, and for a good reason there: a period can straddle new year and `28 Dec - 3 Jan` says nothing about which side moved. This shape exists for the opposite case, a payload whose own fields pin the month (a monthly ephemeris carries `year` and `month` at the top level and prints them in its header), where repeating the year on thirty-one rows and a dozen chips is noise rather than safety. Do not reach for it where the month is not already on screen.
 *
 * A date-only string is pinned to UTC like every other naive value, so the digits read the same for every viewer instead of rolling back a day west of Greenwich.
 */
export function formatMonthDay(
	locale: string | undefined,
	input: unknown,
): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	const { d, timeZone } = resolveDisplayDate(input);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleDateString(intlLocales(locale), {
		month: 'short',
		day: 'numeric',
		timeZone,
	});
}

/**
 * A day of the month with its weekday: `1 Sat`, `sáb 1`, `Sa., 1.`.
 *
 * @remarks
 * The row label a printed ephemeris uses (`01 Sa`, `02 Su`), and it carries neither the month nor the year because the page header already names both. The weekday is not decoration: half of what a practitioner asks a monthly ephemeris is which DAY of the week a placement falls on, and deriving it from a bare number is exactly the arithmetic a table exists to save. Order and separator belong to the locale, which is why this is one Intl call rather than a join.
 *
 * A date-only string is pinned to UTC like every other naive value, so the weekday cannot roll backwards west of Greenwich.
 */
export function formatWeekdayDay(
	locale: string | undefined,
	input: unknown,
): string {
	if (typeof input !== 'string' || input.length === 0) return '';
	const { d, timeZone } = resolveDisplayDate(input);
	if (Number.isNaN(d.getTime())) return input;
	return d.toLocaleDateString(intlLocales(locale), {
		weekday: 'short',
		day: 'numeric',
		timeZone,
	});
}

/**
 * A calendar month and its year: `August 2026`, `agosto de 2026`, `August 2026`.
 *
 * @remarks
 * Takes the two NUMBERS an endpoint returns rather than a timestamp, because that is the shape a monthly payload echoes, and anchors them at UTC noon for the same reason {@link monthName} does: no timezone can roll the anchor into the neighbouring month. The connective belongs to the locale (`de` in Spanish, nothing in English), which is why this is one Intl call rather than a join of {@link monthName} and the year.
 */
export function formatMonthYear(
	locale: string | undefined,
	year: unknown,
	month: unknown,
): string {
	if (typeof year !== 'number' || !Number.isFinite(year)) return '';
	if (typeof month !== 'number' || !Number.isInteger(month)) return '';
	if (month < 1 || month > 12) return '';
	return new Date(Date.UTC(year, month - 1, 1, 12)).toLocaleDateString(
		intlLocales(locale),
		{ month: 'long', year: 'numeric', timeZone: 'UTC' },
	);
}

/**
 * Month name from a 1-based month number: `January`, `enero`, `janvier`.
 *
 * @remarks
 * Two components carried a byte-identical array of twelve English month names, which is both a duplicated table and a table of something the platform already knows in every language. Anchored to a UTC noon so no timezone can roll the date into the neighbouring month.
 */
export function monthName(locale: string | undefined, month: unknown): string {
	if (typeof month !== 'number' || !Number.isInteger(month)) return '';
	if (month < 1 || month > 12) return '';
	return new Date(Date.UTC(2000, month - 1, 1, 12)).toLocaleDateString(
		intlLocales(locale),
		{ month: 'long', timeZone: 'UTC' },
	);
}

/**
 * A whole number with the page locale's digit grouping: `12,345` in English, `12.345` in Spanish.
 *
 * @remarks
 * Rounds rather than truncating, so a caller testing the magnitude (`Math.round(km) === 0`) and this label agree about which side of a boundary a value fell.
 */
export function formatInteger(
	locale: string | undefined,
	value: unknown,
): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '';
	return value.toLocaleString(intlLocales(locale), {
		maximumFractionDigits: 0,
	});
}

/**
 * A number to at most `dp` decimals in the reader's notation: `2.5` in English, `2,5` in German.
 *
 * @remarks Trailing zeros drop on the fractional side only, so `100` at `dp = 0` stays `100`.
 *
 * @example
 * ```ts
 * formatNumber('en', 2.5, 1); // '2.5'
 * formatNumber('de', 2.5, 1); // '2,5'
 * ```
 */
export function formatNumber(
	locale: string | undefined,
	value: unknown,
	dp = 1,
): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '';
	return value.toLocaleString(intlLocales(locale), {
		maximumFractionDigits: dp,
	});
}

/**
 * A 0-to-100 value as a percentage in the reader's notation, which places the sign: `82.5%` in English, `%82,5` in Turkish.
 *
 * @remarks `style: 'percent'` takes a fraction, so the value is divided first.
 */
export function formatPercent(
	locale: string | undefined,
	value: unknown,
	dp = 1,
): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) return '';
	return (value / 100).toLocaleString(intlLocales(locale), {
		style: 'percent',
		maximumFractionDigits: dp,
	});
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
 * The raw values are API enums, and every one of them needs a human form that {@link humanize} cannot derive: KP is an initialism that must stay uppercase, and `raman` is a person, B.V. Raman, not a word. Anything unmapped degrades to a humanized slug rather than rendering the enum. That fallback is a safety net, not a licence to skip the map, since a humanized slug reads as a bare surname where a full name belongs. A test fails if the committed spec gains a frame this map lacks.
 */
export const AYANAMSA_LABEL: Record<string, string> = {
	'kp-newcomb': 'KP Newcomb',
	'kp-old': 'KP Old',
	lahiri: 'Lahiri',
	raman: 'B.V. Raman',

	custom: 'Custom',
};

export function formatAyanamsa(
	locale: string | undefined,
	type: unknown,
	degrees?: unknown,
): string {
	const label =
		typeof type === 'string' ? (AYANAMSA_LABEL[type] ?? humanize(type)) : '';
	const deg =
		typeof degrees === 'number'
			? `${formatNumber(locale, degrees, 2)}\u00b0`
			: '';
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
 * formatDateTime('en', '1990-01-15T14:30:00');    // 'Jan 15, 1990, 2:30 PM'
 * formatDateTime('en', '1990-01-15', '14:30:00'); // 'Jan 15, 1990, 2:30 PM'
 * formatDateTime('de', '1990-01-15T14:30:00');    // '15. Jan. 1990, 14:30'
 * formatDateTime('en', '1990-01-15');             // 'Jan 15, 1990'
 * ```
 */
export function formatDateTime(
	locale: string | undefined,
	input: unknown,
	time?: unknown,
): string {
	const merged =
		typeof input === 'string' &&
		DATE_ONLY.test(input) &&
		typeof time === 'string' &&
		BARE_TIME.test(time)
			? `${input}T${time}`
			: input;
	const date = formatDate(locale, merged);
	const clock = formatTime(locale, merged);
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
