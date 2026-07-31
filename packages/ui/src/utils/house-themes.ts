import type { GetCurrentDashaResponse } from '../types/index.js';

/**
 * The `houseThemes` map every themed Vedic response carries: house number as a string key, significations ordered primary first. Present on the six Vimshottari dasha routes, `kp/chart`, `kp/cusps`, `kp/ruling-planets` (only when birth data was sent, hence the `undefined` arm) and `kp/ruling-planets-interval` (once at the response root, never per interval).
 *
 * @remarks
 * The `focus` query parameter chooses which vocabulary the API fills this map with (`general` significations, or the `finance` reading of the same twelve bhavas) and `lang` translates it, so the caller has already chosen both by the time a component sees the response. A component therefore reads this map and holds no table of house meanings of its own.
 */
export type HouseThemes = GetCurrentDashaResponse['houseThemes'] | undefined;

/**
 * One primary keyword per house, "gains, enemies" for houses 11 and 6. Turns a bare house list (a dasha period's significators, a KP planet's `signifies`) into a phrase that fits on one line beside it.
 *
 * The words come from the response map and nowhere else, so a Hindi response renders Hindi houses and a `focus=finance` request renders the money reading. Only the FIRST theme per house is used: these call sites carry up to eight houses, and a full list per house would wrap past its row.
 *
 * Returns an empty string when the map is absent (the request did not ask for it) or no house is signified, so a caller can render nothing without a second guard.
 */
export function houseWords(
	houses: readonly number[] | undefined,
	themes: HouseThemes,
): string {
	if (!themes || !houses?.length) return '';
	return houses
		.map((h) => themes[String(h)]?.[0])
		.filter(Boolean)
		.join(', ');
}

/** Every keyword for ONE house, "self, body, vitality". For a per-house row (a KP cusp, a house-wise significator) where the row IS the house and there is room for the whole set. */
export function houseThemeLine(
	house: number | undefined,
	themes: HouseThemes,
): string {
	if (!themes || typeof house !== 'number') return '';
	return (themes[String(house)] ?? []).join(', ');
}
