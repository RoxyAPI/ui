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
export declare function capitalize(s: string): string;
export declare function humanize(s: string): string;
//# sourceMappingURL=string.d.ts.map