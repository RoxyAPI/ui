/**
 * Symbol constants used across components. Single source of truth so chart
 * wheels, card headers, hexagram displays, and panchang tables stay visually
 * consistent.
 *
 * @remarks
 * **Every table here is keyed by {@link lookupKey} and read ONLY through the accessor beside it.** The raw records are deliberately not exported: a component that indexes a record directly has to guess the key convention, and a guessed spelling is what shipped `No North Node R`, `So South Node R` and `Bl Black Moon Lilith` into a live customer's natal chart. The API returns `North Node` with a space; the table was keyed `North node`, the spelling {@link capitalize} happens to produce, so every call site that forgot to call `capitalize` first missed the table.
 *
 * **A miss returns `undefined`, never a manufactured abbreviation.** The old `?? name.slice(0, 2)` fallback is what made the defect survive review: a failed lookup renders as a plausible two-letter code that reads exactly like an intentional abbreviation, so nothing about the output says "this is broken". A caller that can omit the glyph should omit it (`?? ''`); a caller that must show something falls back to the FULL name, which is visibly wrong at the size these slots are drawn.
 *
 * `tests/tokens.test.ts` resolves every body, sign and aspect name the committed spec can emit against these tables, so a vocabulary the API gains cannot ship unglyphed.
 */

import { lookupKey } from '../utils/string.js';

/** Look one name up in a normalized table. The single read path for every map in this file. */
const resolve = (
	table: Record<string, string>,
	name: string | undefined | null,
): string | undefined => (name ? table[lookupKey(name)] : undefined);

const PLANET_GLYPH: Record<string, string> = {
	sun: '☉',
	moon: '☽',
	mercury: '☿',
	venus: '♀',
	earth: '♁',
	mars: '♂',
	jupiter: '♃',
	saturn: '♄',
	uranus: '♅',
	neptune: '♆',
	pluto: '♇',
	rahu: '☊',
	ketu: '☋',
	ascendant: 'Asc',
	lagna: 'La',
	'north node': '☊',
	'south node': '☋',
	chiron: '⚷',
	lilith: '⚸',
	'black moon lilith': '⚸',
};

/** Astrological glyph for a planet or point, or `undefined` when the library has none for it. */
export const planetGlyph = (
	name: string | undefined | null,
): string | undefined => resolve(PLANET_GLYPH, name);

const PLANET_ABBR: Record<string, string> = {
	sun: 'Su',
	moon: 'Mo',
	mercury: 'Me',
	venus: 'Ve',
	mars: 'Ma',
	jupiter: 'Ju',
	saturn: 'Sa',
	uranus: 'Ur',
	neptune: 'Ne',
	pluto: 'Pl',
	rahu: 'Ra',
	ketu: 'Ke',
	ascendant: 'Asc',
	lagna: 'La',
};

/** Two-letter graha code for the tight cells of a North/South Indian kundli, or `undefined`. */
export const planetAbbr = (
	name: string | undefined | null,
): string | undefined => resolve(PLANET_ABBR, name);

const SIGN_GLYPH: Record<string, string> = {
	aries: '♈',
	taurus: '♉',
	gemini: '♊',
	cancer: '♋',
	leo: '♌',
	virgo: '♍',
	libra: '♎',
	scorpio: '♏',
	sagittarius: '♐',
	capricorn: '♑',
	aquarius: '♒',
	pisces: '♓',
};

/** Zodiac glyph for a sign name in any case, or `undefined`. */
export const signGlyph = (
	name: string | undefined | null,
): string | undefined => resolve(SIGN_GLYPH, name);

const SIGN_ABBR: Record<string, string> = {
	aries: 'Ar',
	taurus: 'Ta',
	gemini: 'Ge',
	cancer: 'Cn',
	leo: 'Le',
	virgo: 'Vi',
	libra: 'Li',
	scorpio: 'Sc',
	sagittarius: 'Sg',
	capricorn: 'Cp',
	aquarius: 'Aq',
	pisces: 'Pi',
};

/** Two-letter rashi code for kundli cells and grid headers, or `undefined`. */
export const signAbbr = (name: string | undefined | null): string | undefined =>
	resolve(SIGN_ABBR, name);

/** The twelve signs in zodiacal order. Display values, not lookup keys: read them through {@link signGlyph} / {@link signAbbr}. */
export const SIGNS_ORDER = [
	'Aries',
	'Taurus',
	'Gemini',
	'Cancer',
	'Leo',
	'Virgo',
	'Libra',
	'Scorpio',
	'Sagittarius',
	'Capricorn',
	'Aquarius',
	'Pisces',
] as const;

/**
 * Glyph per aspect. Used by the natal, transit and synastry aspect tables.
 *
 * @remarks
 * These are the nine aspects Unicode itself defines as a set, in its Miscellaneous Symbols block note: `260C, 26BA, 2220, 26B9, 25A1, 25B3, 26BC, 26BB, 260D` for 0, 30, 45, 60, 90, 120, 135, 150 and 180 degrees. That is exactly the vocabulary the API returns, so every aspect resolves to a real glyph and none falls through to a truncated slug.
 *
 * Do not substitute the visually similar maths operators. Unicode lists `⊻` XOR and `⊼` NAND as cross-references FROM the real quincunx and semisextile glyphs, so they look like safe stand-ins and are easy to pair the wrong way round, which renders a 150 degree quincunx with the 30 degree semisextile symbol. An astrologer reads the glyph, not the tooltip.
 */
const ASPECT_SYMBOL: Record<string, string> = {
	conjunction: '☌',
	semisextile: '⚺',
	'semi sextile': '⚺',
	semisquare: '∠',
	'semi square': '∠',
	sextile: '⚹',
	square: '□',
	trine: '△',
	sesquiquadrate: '⚼',
	quincunx: '⚻',
	opposition: '☍',
};

/** Aspect glyph for any of the separator forms the endpoints use (`SEMI_SEXTILE`, `SEMI SEXTILE`, `semi-sextile`), or `undefined`. */
export const aspectSymbol = (
	name: string | undefined | null,
): string | undefined => resolve(ASPECT_SYMBOL, name);

/** Trigrams used by I Ching hexagrams. Eight trigrams compose 64 hexagrams. */
const TRIGRAM_GLYPH: Record<string, string> = {
	heaven: '☰',
	lake: '☱',
	fire: '☲',
	thunder: '☳',
	wind: '☴',
	water: '☵',
	mountain: '☶',
	earth: '☷',
};

/** Trigram glyph for a trigram name in any case, or `undefined`. */
export const trigramGlyph = (
	name: string | undefined | null,
): string | undefined => resolve(TRIGRAM_GLYPH, name);

/** Moon phase emoji set. Used by the moon phase card. */
const MOON_PHASE_EMOJI: Record<string, string> = {
	'new moon': '🌑',
	'waxing crescent': '🌒',
	'first quarter': '🌓',
	'waxing gibbous': '🌔',
	'full moon': '🌕',
	'waning gibbous': '🌖',
	'last quarter': '🌗',
	'waning crescent': '🌘',
};

/**
 * Emoji for a lunar phase, or `undefined`.
 *
 * @remarks
 * The live API suffixes most phase names (`Waxing Gibbous Moon`) and calls the third quarter `Third Quarter Moon`, while only new and full moon carry the suffix in the table. Both reconciliations live here rather than in the card, so any component reading a phase name resolves the same eight phases from the same four spellings.
 */
export const moonPhaseEmoji = (
	name: string | undefined | null,
): string | undefined => {
	if (!name) return undefined;
	const key = lookupKey(name);
	const bare = key.replace(/ moon$/, '');
	const alias = bare === 'third quarter' ? 'last quarter' : bare;
	return MOON_PHASE_EMOJI[key] ?? MOON_PHASE_EMOJI[alias];
};
