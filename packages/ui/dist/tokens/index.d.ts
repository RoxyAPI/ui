/**
 * Symbol constants used across components. Single source of truth so chart
 * wheels, card headers, hexagram displays, and panchang tables stay visually
 * consistent.
 *
 * @remarks
 * **Every table here is keyed by {@link lookupKey} and read ONLY through the accessor beside it.** The raw records are deliberately not exported: a component that indexes a record directly has to guess the key convention, and a guessed spelling renders `No North Node R`, `So South Node R` and `Bl Black Moon Lilith` on a live chart. The API returns `North Node` with a space, while {@link capitalize} produces `North node`, so a call site that indexes without normalising misses the table.
 *
 * **A miss returns `undefined`, never a manufactured abbreviation.** A `?? name.slice(0, 2)` fallback renders a failed lookup as a plausible two-letter code that reads exactly like an intentional abbreviation, so nothing about the output says it is broken. A caller that can omit the glyph should omit it (`?? ''`); a caller that must show something falls back to the FULL name, which is visibly wrong at the size these slots are drawn.
 *
 * `tests/tokens.test.ts` resolves every body, sign and aspect name the committed spec can emit against these tables, so a vocabulary the API gains cannot ship unglyphed.
 */
/** Astrological glyph for a planet or point, or `undefined` when the library has none for it. */
export declare const planetGlyph: (name: string | undefined | null) => string | undefined;
/** Two-letter graha code for the tight cells of a North/South Indian kundli, or `undefined`. */
export declare const planetAbbr: (name: string | undefined | null) => string | undefined;
/** Zodiac glyph for a sign name in any case, or `undefined`. */
export declare const signGlyph: (name: string | undefined | null) => string | undefined;
/** Two-letter rashi code for kundli cells and grid headers, or `undefined`. */
export declare const signAbbr: (name: string | undefined | null) => string | undefined;
/** The twelve signs in zodiacal order. Display values, not lookup keys: read them through {@link signGlyph} / {@link signAbbr}. */
export declare const SIGNS_ORDER: readonly ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
/** Aspect glyph for any of the separator forms the endpoints use (`SEMI_SEXTILE`, `SEMI SEXTILE`, `semi-sextile`), or `undefined`. */
export declare const aspectSymbol: (name: string | undefined | null) => string | undefined;
/** Trigram glyph for a trigram name in any case, or `undefined`. */
export declare const trigramGlyph: (name: string | undefined | null) => string | undefined;
/**
 * Emoji for a lunar phase, or `undefined`.
 *
 * @remarks
 * The live API suffixes most phase names (`Waxing Gibbous Moon`) and calls the third quarter `Third Quarter Moon`, while only new and full moon carry the suffix in the table. Both reconciliations live here rather than in the card, so any component reading a phase name resolves the same eight phases from the same four spellings.
 */
export declare const moonPhaseEmoji: (name: string | undefined | null) => string | undefined;
