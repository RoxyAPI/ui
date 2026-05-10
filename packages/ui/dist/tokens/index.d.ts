/**
 * Symbol constants used across components. Single source of truth so chart
 * wheels, card headers, hexagram displays, and panchang tables stay visually
 * consistent.
 */
export declare const PLANET_GLYPH: Record<string, string>;
export declare const PLANET_ABBR: Record<string, string>;
export declare const SIGN_GLYPH: Record<string, string>;
export declare const SIGN_ABBR: Record<string, string>;
export declare const SIGNS_ORDER: readonly ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
/**
 * Lowercase rashi keys in canonical zodiac order. Derived from `SIGNS_ORDER`
 * so the two stay in lockstep. The /vedic-astrology/birth-chart response
 * carries planet buckets keyed by these names.
 */
export declare const RASHI_KEYS: readonly Lowercase<(typeof SIGNS_ORDER)[number]>[];
/** Aspect symbols. Used by synastry and natal chart aspect tables. */
export declare const ASPECT_SYMBOL: Record<string, string>;
/** Trigrams used by I Ching hexagrams. Eight trigrams compose 64 hexagrams. */
export declare const TRIGRAM_GLYPH: Record<string, string>;
/** Moon phase emoji set. Used by moon phase card. */
export declare const MOON_PHASE_EMOJI: Record<string, string>;
//# sourceMappingURL=index.d.ts.map