/**
 * The value a READER sees, for a response field the API returns twice.
 *
 * @remarks
 * Several endpoints now echo a display translation beside the canonical value: `nameLocalized` next to `name`, `signLocalized` next to `sign`, `typeLocalized` next to `type`. **The canonical field is deliberately always English, whatever `?lang=` says, so it stays safe to compare against in code**, and the localized one is deliberately absent from an English response.
 *
 * That split is the whole contract, and inverting it breaks charts silently rather than loudly: `planetGlyph`, `signGlyph`, `aspectSymbol`, `ASPECT_CLASS`, `SIGNS_ORDER.indexOf`, every `Map` key and every CSS class fragment is keyed on the English name, so pointing one of them at `nameLocalized` resolves to nothing on a translated page and to the same value on an English one, which is exactly the shape of defect that passes every gate (lesson 24). **The lookup stays on the canonical value; only the printed text node, the `title` and the `aria-label` move.**
 *
 * These two helpers exist so that rule lives in one place rather than as a `??` at every call site, and so an English response, where the localized field simply is not there, degrades by construction instead of by remembering. Both take the KEY of the canonical field and derive its partner, so a mistyped key or a field that is not a display string is a compile error rather than a silent empty string.
 */

import { fieldLabel, optionLabel } from '../i18n/registry.js';
import { humanize } from './string.js';

/**
 * The label for a field NAME, which is a different problem from a field VALUE.
 *
 * @remarks
 * A catalogue keyed on English source text cannot reach a name computed per response, so these read the published field-label payload instead and fall back to {@link humanize}, which is exactly what every caller printed before one existed. A name the payload does not carry therefore renders as it always did rather than as a gap.
 *
 * Here rather than in each component because three of them need the identical pairing: the form that asks for a field, and the two generic renderers that label what came back.
 */
export function displayField(lang: string | undefined, name: string): string {
	return fieldLabel(lang, name) ?? humanize(name);
}

/**
 * The label for one selectable VALUE of a field, same fallback rule.
 *
 * @param fallback - What to print where the payload carries no label, INSTEAD of the humanized value.
 * The default suits a word (`81-pada` reads as `81 pada`) and not an identifier that carries a number
 * a reader checks against a published table: `humanize` turns `gmt-584283` into `Gmt 584283`, which
 * is neither the label nor the identifier. Pass the raw value for those, so an English page prints
 * what a caller stores and a translated one prints the published word.
 */
export function displayOption(
	lang: string | undefined,
	field: string,
	value: string,
	fallback?: string,
): string {
	return optionLabel(lang, field, value) ?? fallback ?? humanize(value);
}

/** The one naming convention every helper here derives from. Ratified by the API and spreading to more operations, so it is matched as a convention and never as a list of field names. */
const LOCALIZED = 'Localized';

/** A response row carrying a canonical English `K` plus the optional localized partner the API writes beside it. */
export type Localizable<K extends string> = Partial<
	Record<K | `${K}Localized`, string>
>;

/** The same pairing where the value is a LIST of names, e.g. `retrogradePlanets`. */
export type LocalizableList<K extends string> = Partial<
	Record<K | `${K}Localized`, string[]>
>;

/**
 * The text to print for `key`: the localized value when the response carried one, else the English one.
 *
 * @param english - What to print in the English case INSTEAD of the raw field, for a canonical value that is an API enum with a display form of its own (`type` is `SEMI_SEXTILE` on the wire and `Semi-sextile` on screen). Omit it wherever the canonical value is already the readable one.
 *
 * @example
 * ```ts
 * display(planet, 'name');                            // 'Sol' on ?lang=es, 'Sun' on English
 * planetGlyph(planet.name) ?? display(planet, 'name'); // the lookup stays English, the fallback TEXT does not
 * display(aspect, 'type', formatAspectName(aspect));   // 'Trígono', else 'Trine' and never 'TRINE'
 * ```
 */
export function display<
	T extends Localizable<K>,
	K extends Extract<keyof T, string>,
>(row: T | null | undefined, key: K, english?: string): string {
	const rec = row as Record<string, unknown> | null | undefined;
	const localized = rec?.[`${key}${LOCALIZED}`];
	if (typeof localized === 'string' && localized !== '') return localized;
	if (english !== undefined) return english;
	const canonical = rec?.[key];
	return typeof canonical === 'string' ? canonical : '';
}

/**
 * A list field as `{ value, label }` pairs: the English `value` every lookup is keyed on, and the `label` a reader sees.
 *
 * @remarks
 * The localized array is INDEX-ALIGNED with the canonical one, which is the only thing that makes the pairing possible, so it is zipped by position and neither side is ever sorted, filtered or deduped on its own. A list that is short or absent falls back per item, so a partial translation still resolves every glyph.
 */
export function displayList<
	T extends LocalizableList<K>,
	K extends Extract<keyof T, string>,
>(row: T | null | undefined, key: K): Array<{ value: string; label: string }> {
	const rec = row as Record<string, unknown> | null | undefined;
	const canonical = rec?.[key];
	if (!Array.isArray(canonical)) return [];
	const localized = rec?.[`${key}${LOCALIZED}`];
	const labels = Array.isArray(localized) ? localized : [];
	return canonical.map((value, i) => {
		const label = labels[i];
		return {
			value: String(value),
			label: typeof label === 'string' && label !== '' ? label : String(value),
		};
	});
}

/**
 * Fold every `XLocalized` field into its `X` partner: the reader's value under the canonical NAME, and the duplicate key gone.
 *
 * @remarks
 * For a renderer that has no idea what its fields MEAN and derives its columns from `Object.keys(row)`, which is how `<roxy-data>` started drawing `Planet | Planet Localized | Longitude | Sign | Sign Localized` the day the API began sending both. Two extra columns, headed in English, carrying the same fact twice, on a page whose owner changed nothing. That is a regression rather than a missing feature, so it is repaired at the key layer every render path already funnels through rather than at each of them.
 *
 * Three rules, and each has a way of going wrong:
 *
 * - **A `*Localized` key with no canonical partner stays put.** Suppressing on the name alone deletes data the response carries and nothing else is rendering.
 * - **The canonical key keeps its POSITION**, so a translated response and an English one lay out identically, column for column.
 * - **A row with nothing to fold is returned as the same object**, so the English path is not merely equivalent but untouched.
 *
 * The English value is dropped rather than shown beside its translation because the two are the same fact, and the caller here is generic: it cannot know that `sign` is the value a lookup would be keyed on. A component that needs both halves reads them itself with {@link display}.
 */
export function foldLocalized<V>(row: Record<string, V>): Record<string, V> {
	let folded: Record<string, V> | undefined;
	for (const key of Object.keys(row)) {
		if (!key.endsWith(LOCALIZED)) continue;
		const base = key.slice(0, -LOCALIZED.length);
		if (base === '' || !(base in row)) continue;
		folded ??= { ...row };
		const value = row[key];
		if (value !== undefined && value !== null && value !== '')
			folded[base] = value;
		delete folded[key];
	}
	return folded ?? row;
}
