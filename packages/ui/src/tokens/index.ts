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
export const ASPECT_SYMBOL: Record<string, string> = {
	conjunction: '☌',
	opposition: '☍',
	trine: '△',
	square: '□',
	sextile: '✱',
	quincunx: '⊻',
	semisextile: '⊼',
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
