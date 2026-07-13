/**
 * Resolve a crystal colour keyword to a paintable CSS colour.
 *
 * @remarks
 * Two thirds of the 92 colour values the crystals API serves are COMPOUNDS ("blue-green", "pale brass-yellow", "deep brownish red"), and a compound is never a valid CSS colour, so painting the raw string leaves the swatch blank. Both crystal components used to carry their own copy that merely lowercased and stripped spaces, which turns "apple green" into `applegreen` and blanks just the same. One resolver now serves both.
 */

/**
 * Colour words the crystals API returns that CSS cannot resolve, mapped to their closest CSS value. Also collapses the `-ish` and plural forms onto their base word, so "bluish" and "browns" resolve like "blue" and "brown".
 */
const COLOR_WORDS: Record<string, string> = {
	apple: '#8db600',
	azure: '#007fff',
	blackish: 'black',
	bluish: 'blue',
	bottle: '#006a4e',
	brass: '#b5a642',
	brick: '#b22222',
	brownish: 'brown',
	browns: 'brown',
	burgundy: '#800020',
	clear: '#eef2f6',
	colorless: '#eef2f6',
	colourless: '#eef2f6',
	cream: '#fffdd0',
	creamy: '#fffdd0',
	emerald: '#50c878',
	golden: 'gold',
	greenish: 'green',
	lilac: '#c8a2c8',
	mauve: '#e0b0ff',
	peach: 'peachpuff',
	pinkish: 'pink',
	reddish: 'red',
	rose: '#f4a6b7',
	royal: 'royalblue',
	silvery: 'silver',
	sky: 'skyblue',
	yellowish: 'yellow',
};

/** CSS named colours the crystals vocabulary uses verbatim. A word outside this set and {@link COLOR_WORDS} is not a colour, so it is dropped rather than passed through: one unresolvable token would otherwise invalidate the whole color-mix and blank the swatch. */
const CSS_COLORS = new Set([
	'beige',
	'black',
	'blue',
	'brown',
	'crimson',
	'cyan',
	'gold',
	'gray',
	'green',
	'grey',
	'indigo',
	'lavender',
	'magenta',
	'maroon',
	'navy',
	'olive',
	'orange',
	'pink',
	'purple',
	'red',
	'salmon',
	'silver',
	'tan',
	'teal',
	'turquoise',
	'violet',
	'white',
	'yellow',
]);

/** Qualifiers that shade a base colour instead of naming one: the mix partner, and how much of the base survives the mix. */
const COLOR_QUALIFIERS: Record<string, [partner: string, keepPct: number]> = {
	bright: ['white', 85],
	dark: ['black', 60],
	deep: ['black', 70],
	faintly: ['white', 30],
	light: ['white', 55],
	pale: ['white', 45],
	rich: ['black', 80],
};

/**
 * Resolve a crystal colour keyword to a paintable CSS colour.
 *
 * @remarks
 * Two thirds of the 92 colour values the crystals API serves are compounds ("blue-green", "pale brass-yellow", "deep brownish red"), and a compound is never a CSS colour, so painting the raw string leaves the swatch blank. Split on spaces and hyphens instead: qualifiers ({@link COLOR_QUALIFIERS}) shade, the first two colour words mix, and anything unrecognised is dropped. A value with no colour word at all ("banded") falls back to the border token rather than painting nothing.
 *
 *
 * @example
 * ```ts
 * cssColor('blue-green');   // color-mix(in srgb, blue, green)
 * cssColor('pale yellow');  // color-mix(in srgb, yellow 45%, white)
 * ```
 */
export function cssColor(name: string): string {
	const bases: string[] = [];
	const qualifiers: Array<[string, number]> = [];
	for (const word of name.toLowerCase().split(/[\s-]+/)) {
		const qualifier = COLOR_QUALIFIERS[word];
		if (qualifier) {
			qualifiers.push(qualifier);
			continue;
		}
		const base = COLOR_WORDS[word] ?? (CSS_COLORS.has(word) ? word : '');
		if (base) bases.push(base);
	}

	const [first, second] = bases;
	if (!first) return 'var(--roxy-border, #e4e4e7)';
	let color = second ? `color-mix(in srgb, ${first}, ${second})` : first;
	for (const [partner, keepPct] of qualifiers) {
		color = `color-mix(in srgb, ${color} ${keepPct}%, ${partner})`;
	}
	return color;
}
