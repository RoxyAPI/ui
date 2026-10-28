/**
 * Resolve a crystal colour keyword to a paintable CSS colour.
 *
 * @remarks
 * Two thirds of the 92 colour values the crystals API serves are COMPOUNDS ("blue-green", "pale brass-yellow", "deep brownish red"), and a compound is never a valid CSS colour, so painting the raw string leaves the swatch blank. Lowercasing and stripping spaces is not enough either, since that turns "apple green" into `applegreen` and blanks just the same. One resolver serves both crystal components.
 */
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
export declare function cssColor(name: string): string;
