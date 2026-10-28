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
/**
 * The clock, in the page locale: `2:30 PM` in English, `14:30` in German.
 *
 * @remarks
 * The hour cycle is the locale's, never ours. Pinning `hour12: true` puts an AM/PM clock on every page in Europe and Latin America while the embedded form beside it labels its own input "formato de 24 horas". CLDR already knows which convention each locale reads, including the ones that surprise you (`es` is 24-hour, `es-AR` is 12-hour with `p. m.`), so asserting a cycle here is asserting we know better than the locale data.
 */
export declare function formatTime(locale: string | undefined, input: unknown): string;
export declare function formatDate(locale: string | undefined, input: unknown): string;
export declare function formatTimeRange(locale: string | undefined, t: {
    start?: string;
    end?: string;
} | undefined): string;
/** Two dates as one label: `Jan 1, 2026 - Jan 7, 2026`. Falls back to whichever end parses when the other is absent. */
export declare function formatDateRange(locale: string | undefined, start: unknown, end: unknown): string;
/** How much of a timestamp a label shows. `time` is the whole date plus the clock. */
export type DateGrain = 'year' | 'month' | 'day' | 'time';
/**
 * A timestamp at a chosen granularity, for an axis or a bar end where the full date would not fit.
 *
 * @remarks
 * Every grain below `year` carries the year, because a period routinely straddles new year and a label reading `28 Dec - 3 Jan` says nothing about which side moved. `year` is sliced off the string rather than formatted, since a bare four-digit year is the same in every locale this library ships and running it through Intl would introduce era and numbering-system differences into an axis tick.
 */
export declare function formatDateGrain(locale: string | undefined, input: unknown, grain: DateGrain): string;
/** Two timestamps at one granularity, as one range. */
export declare function formatDateGrainRange(locale: string | undefined, start: unknown, end: unknown, grain: DateGrain): string;
/**
 * A day inside a month already named elsewhere: `Aug 3`, `3 ago`, `3. Aug.`.
 *
 * @remarks
 * Deliberately WITHOUT the year, which is the one thing {@link formatDateGrain} will not do at any grain below `year`, and for a good reason there: a period can straddle new year and `28 Dec - 3 Jan` says nothing about which side moved. This shape exists for the opposite case, a payload whose own fields pin the month (a monthly ephemeris carries `year` and `month` at the top level and prints them in its header), where repeating the year on thirty-one rows and a dozen chips is noise rather than safety. Do not reach for it where the month is not already on screen.
 *
 * A date-only string is pinned to UTC like every other naive value, so the digits read the same for every viewer instead of rolling back a day west of Greenwich.
 */
export declare function formatMonthDay(locale: string | undefined, input: unknown): string;
/** Two days inside a month the card already names, as one range; a one-day range prints once. */
export declare function formatMonthDayRange(locale: string | undefined, start: unknown, end: unknown): string;
/**
 * A day of the month with its weekday: `1 Sat`, `sáb 1`, `Sa., 1.`.
 *
 * @remarks
 * The row label a printed ephemeris uses (`01 Sa`, `02 Su`), and it carries neither the month nor the year because the page header already names both. The weekday is not decoration: half of what a practitioner asks a monthly ephemeris is which DAY of the week a placement falls on, and deriving it from a bare number is exactly the arithmetic a table exists to save. Order and separator belong to the locale, which is why this is one Intl call rather than a join.
 *
 * A date-only string is pinned to UTC like every other naive value, so the weekday cannot roll backwards west of Greenwich.
 */
export declare function formatWeekdayDay(locale: string | undefined, input: unknown): string;
/**
 * A calendar month and its year: `August 2026`, `agosto de 2026`, `August 2026`.
 *
 * @remarks
 * Takes the two NUMBERS an endpoint returns rather than a timestamp, because that is the shape a monthly payload echoes, and anchors them at UTC noon for the same reason {@link monthName} does: no timezone can roll the anchor into the neighbouring month. The connective belongs to the locale (`de` in Spanish, nothing in English), which is why this is one Intl call rather than a join of {@link monthName} and the year.
 */
export declare function formatMonthYear(locale: string | undefined, year: unknown, month: unknown): string;
/**
 * Month name from a 1-based month number: `January`, `enero`, `janvier`.
 *
 * @remarks
 * Two components carried a byte-identical array of twelve English month names, which is both a duplicated table and a table of something the platform already knows in every language. Anchored to a UTC noon so no timezone can roll the date into the neighbouring month.
 */
export declare function monthName(locale: string | undefined, month: unknown): string;
/**
 * A whole number with the page locale's digit grouping: `12,345` in English, `12.345` in Spanish.
 *
 * @remarks
 * Rounds rather than truncating, so a caller testing the magnitude (`Math.round(km) === 0`) and this label agree about which side of a boundary a value fell.
 */
export declare function formatInteger(locale: string | undefined, value: unknown): string;
/**
 * A list of names joined the way the reader's language joins one: `Mercury and Jupiter`, `Mercury und Jupiter`, `Меркурий и Юпитер`.
 *
 * @remarks
 * Several responses pack a list into one space separated string, which reads as a typo once it is
 * printed beside other values. The conjunction, the serial comma and the spacing are all CLDR's, and
 * they differ per language, which is exactly why this cannot be a `join(', ')` at a call site.
 *
 * Empty entries are dropped, so a trailing separator in the wire value cannot produce a dangling
 * conjunction, and a single entry comes back as itself.
 *
 * @example
 * ```ts
 * formatList('en', ['Mercury', 'Jupiter']); // 'Mercury and Jupiter'
 * formatList('de', ['Mercury', 'Jupiter']); // 'Mercury und Jupiter'
 * ```
 */
export declare function formatList(locale: string | undefined, items: readonly string[]): string;
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
export declare function formatNumber(locale: string | undefined, value: unknown, dp?: number): string;
/**
 * A 0-to-100 value as a percentage in the reader's notation, which places the sign: `82.5%` in English, `%82,5` in Turkish.
 *
 * @remarks `style: 'percent'` takes a fraction, so the value is divided first.
 */
export declare function formatPercent(locale: string | undefined, value: unknown, dp?: number): string;
/**
 * Normalize the `type` field on an aspect entry to a lowercase, hyphen-separated canonical name (`SEMI_SEXTILE` and `SEMI SEXTILE` both become `semi-sextile`). Accepts any aspect-shaped object so both natal and synastry inter-aspect entries can share this.
 *
 * @remarks
 * Spaces are folded as well as underscores because the endpoints do not agree on the separator: aspects returns `SEMI SEXTILE` where synastry returns `SEMI_SEXTILE`. Every class and glyph lookup reads this one form.
 */
export declare function normalizeAspect(a: {
    type?: string;
}): string;
/**
 * Display label for an aspect: `SEMI_SEXTILE` -> `Semi-sextile`.
 *
 * The raw value is an API enum and the table column it lands in is read by practitioners, not parsers. {@link normalizeAspect} stays the lookup key for classes and glyphs; this is the human-facing form.
 */
export declare function formatAspectName(a: {
    type?: string;
}): string;
/**
 * Display label for an ayanamsa identifier. `kp-newcomb` -> `KP Newcomb`.
 *
 * The raw values are API enums, and every one of them needs a human form that {@link humanize} cannot derive: KP is an initialism that must stay uppercase, and `raman` is a person, B.V. Raman, not a word. Anything unmapped degrades to a humanized slug rather than rendering the enum. That fallback is a safety net, not a licence to skip the map, since a humanized slug reads as a bare surname where a full name belongs. A test fails if the committed spec gains a frame this map lacks.
 */
export declare const AYANAMSA_LABEL: Record<string, string>;
export declare function formatAyanamsa(locale: string | undefined, type: unknown, degrees?: unknown): string;
/** Localized date and clock, with optional seconds and a separate birth-time field. */
export declare function formatDateTime(locale: string | undefined, input: unknown, time?: unknown, includeSeconds?: boolean): string;
/** Two timestamps as one label, each through {@link formatDateTime}. */
export declare function formatDateTimeRange(locale: string | undefined, start: unknown, end: unknown): string;
/**
 * An instant on the UTC clock, with the zone named: `Apr 4, 2021, 1:24 PM UTC`.
 *
 * @remarks
 * {@link formatDateTime} converts an offset-bearing timestamp to the viewer's zone, which is right for an event the viewer is living through and wrong for a value that exists to be compared against a printed reference: the Design moment on a bodygraph is published to the minute in UTC, so a reader in Kolkata and one in Chicago must see the same digits. The zone name comes from Intl rather than a typed suffix, so it follows the locale like every other unit here.
 */
export declare function formatDateTimeUtc(locale: string | undefined, input: unknown): string;
/** The viewer's IANA zone, or undefined where the runtime names none; the zone is the same in every locale. */
export declare function viewerTimeZone(): string | undefined;
/**
 * The Sanskrit form of a name, but only when it actually differs from the English one.
 *
 * @remarks
 * Several endpoints pair an English `name` with a `sanskritName` that is sometimes the SAME string, because the tradition and the translation coincide (a nakshatra is `Ashwini` either way). Rendering the pair unconditionally then prints `Ashwini (Ashwini)`. That guard is the whole reason this exists: it is one comparison, it is easy to leave out, and leaving it out is invisible until a reader hits a name where the two agree.
 *
 * Presentation deliberately stays with the caller, since the same fact is drawn as a parenthetical in a table cell and as a middot-separated span on a chart heading.
 */
export declare function distinctSanskrit(name: unknown, sanskritName: unknown): string | undefined;
/**
 * `English (Sanskrit)` for a value that carries both, falling back to whichever one exists.
 *
 * @example
 * ```ts
 * formatWithSanskrit('Tuesday', 'Mangalavara'); // 'Tuesday (Mangalavara)'
 * formatWithSanskrit('Ashwini', 'Ashwini');     // 'Ashwini'
 * ```
 */
export declare function formatWithSanskrit(name: unknown, sanskritName: unknown): string;
