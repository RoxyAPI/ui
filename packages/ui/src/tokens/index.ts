/**
 * Symbol constants used across components. Single source of truth so chart
 * wheels, card headers, hexagram displays, and panchang tables stay visually
 * consistent.
 */

export const PLANET_GLYPH: Record<string, string> = {
	Sun: '☉',
	Moon: '☽',
	Mercury: '☿',
	Venus: '♀',
	Earth: '♁',
	Mars: '♂',
	Jupiter: '♃',
	Saturn: '♄',
	Uranus: '♅',
	Neptune: '♆',
	Pluto: '♇',
	Rahu: '☊',
	Ketu: '☋',
	Ascendant: 'Asc',
	Lagna: 'La',
	NorthNode: '☊',
	SouthNode: '☋',
	'North node': '☊',
	'South node': '☋',
	Chiron: '⚷',
	Lilith: '⚸',
	'Black moon lilith': '⚸',
};

export const PLANET_ABBR: Record<string, string> = {
	Sun: 'Su',
	Moon: 'Mo',
	Mercury: 'Me',
	Venus: 'Ve',
	Mars: 'Ma',
	Jupiter: 'Ju',
	Saturn: 'Sa',
	Uranus: 'Ur',
	Neptune: 'Ne',
	Pluto: 'Pl',
	Rahu: 'Ra',
	Ketu: 'Ke',
	Ascendant: 'Asc',
	Lagna: 'La',
};

export const SIGN_GLYPH: Record<string, string> = {
	Aries: '♈',
	Taurus: '♉',
	Gemini: '♊',
	Cancer: '♋',
	Leo: '♌',
	Virgo: '♍',
	Libra: '♎',
	Scorpio: '♏',
	Sagittarius: '♐',
	Capricorn: '♑',
	Aquarius: '♒',
	Pisces: '♓',
};

export const SIGN_ABBR: Record<string, string> = {
	Aries: 'Ar',
	Taurus: 'Ta',
	Gemini: 'Ge',
	Cancer: 'Cn',
	Leo: 'Le',
	Virgo: 'Vi',
	Libra: 'Li',
	Scorpio: 'Sc',
	Sagittarius: 'Sg',
	Capricorn: 'Cp',
	Aquarius: 'Aq',
	Pisces: 'Pi',
};

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

/** Aspect symbols. Used by synastry and natal chart aspect tables. */
/**
 * Glyph per aspect, keyed by the hyphen-free canonical name.
 *
 * @remarks
 * These are the nine aspects Unicode itself defines as a set, in its Miscellaneous Symbols block note: `260C, 26BA, 2220, 26B9, 25A1, 25B3, 26BC, 26BB, 260D` for 0, 30, 45, 60, 90, 120, 135, 150 and 180 degrees. That is exactly the vocabulary the API returns, so every aspect resolves to a real glyph and none falls through to a truncated slug.
 *
 * Do not substitute the visually similar maths operators. Unicode lists `⊻` XOR and `⊼` NAND as cross-references FROM the real quincunx and semisextile glyphs, so they look like safe stand-ins and are easy to pair the wrong way round, which renders a 150 degree quincunx with the 30 degree semisextile symbol. An astrologer reads the glyph, not the tooltip.
 */
export const ASPECT_SYMBOL: Record<string, string> = {
	conjunction: '☌',
	semisextile: '⚺',
	semisquare: '∠',
	sextile: '⚹',
	square: '□',
	trine: '△',
	sesquiquadrate: '⚼',
	quincunx: '⚻',
	opposition: '☍',
};

/** Trigrams used by I Ching hexagrams. Eight trigrams compose 64 hexagrams. */
export const TRIGRAM_GLYPH: Record<string, string> = {
	heaven: '☰',
	lake: '☱',
	fire: '☲',
	thunder: '☳',
	wind: '☴',
	water: '☵',
	mountain: '☶',
	earth: '☷',
	Heaven: '☰',
	Lake: '☱',
	Fire: '☲',
	Thunder: '☳',
	Wind: '☴',
	Water: '☵',
	Mountain: '☶',
	Earth: '☷',
};

/** Moon phase emoji set. Used by moon phase card. */
export const MOON_PHASE_EMOJI: Record<string, string> = {
	'new moon': '🌑',
	'waxing crescent': '🌒',
	'first quarter': '🌓',
	'waxing gibbous': '🌔',
	'full moon': '🌕',
	'waning gibbous': '🌖',
	'last quarter': '🌗',
	'waning crescent': '🌘',
};
