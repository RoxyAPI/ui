/**
 * Shared string helpers used across components. Single source of truth so the
 * same formatting rules apply to every key/label/title that surfaces in the
 * shadow tree.
 *
 *  - `lookupKey`: the ONE normalizer every lookup table in this library is keyed
 *    and read by (`tokens/index.ts` glyphs and abbreviations, `i18n/` chrome
 *    strings).
 *  - `capitalize`: title-cases the first character, lowercases the rest. A
 *    DISPLAY helper only; it is not a lookup key (see `lookupKey`).
 *  - `humanize`: turns an API key (`birth_date`, `birthDate`, `mahadasha-end`)
 *    into a label suitable for display ("Birth date", "Mahadasha end").
 */

/**
 * Fold a name to the canonical key its lookup table is stored under: lower case, every run of spaces, underscores and hyphens collapsed to one space, trimmed.
 *
 * @remarks
 * This exists because a GUESSED key spelling is a defect class this repo has now shipped twice. The glyph tables were keyed off whatever {@link capitalize} happened to produce (`North node`), while the API returns `North Node`, so every call site that reached the table without first calling `capitalize` missed and fell through to a fabricated abbreviation. Aspects hit the same wall from the other side: `/aspects` returns `SEMI SEXTILE` where synastry returns `SEMI_SEXTILE`.
 *
 * One normalizer, applied when a table is DEFINED and again when it is READ, removes the whole class: no call site has to remember a convention, and no table has to guess a spelling. Use it for every new table keyed by an API-supplied name.
 *
 * @example
 * ```ts
 * lookupKey('North Node');    // 'north node'
 * lookupKey('SEMI_SEXTILE');  // 'semi sextile'
 * lookupKey('semi-sextile');  // 'semi sextile'
 * ```
 */
export function lookupKey(s: string): string {
	return s
		.toLowerCase()
		.replace(/[\s_-]+/g, ' ')
		.trim();
}

export function capitalize(s: string): string {
	if (!s) return '';
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function humanize(s: string): string {
	return (
		s
			.replace(/[_-]+/g, ' ')
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			// Split a trailing/embedded digit off a word so "person1" reads "Person 1"
			// and every group legend and field label spaces its ordinal.
			.replace(/([a-z])([0-9])/g, '$1 $2')
			.replace(/^\w/, (c) => c.toUpperCase())
	);
}
