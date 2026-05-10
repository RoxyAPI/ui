/**
 * Shared string helpers used across components. Single source of truth so the
 * same formatting rules apply to every key/label/title that surfaces in the
 * shadow tree.
 *
 *  - `capitalize`: title-cases the first character, lowercases the rest. Used
 *    when matching API-supplied planet/sign names against the glyph maps in
 *    `tokens/index.ts`, which use canonical TitleCase keys.
 *  - `humanize`: turns an API key (`birth_date`, `birthDate`, `mahadasha-end`)
 *    into a label suitable for display ("Birth date", "Mahadasha end").
 */

export function capitalize(s: string): string {
	if (!s) return '';
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function humanize(s: string): string {
	return s
		.replace(/[_-]+/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^\w/, (c) => c.toUpperCase());
}
