import { displayOption } from './localized.js';
import { capitalize } from './string.js';

/** The published name of an arcana in the page language (`Major Arcana`, `Große Arkana`), read from the API option labels. */
export function arcanaText(locale: string | undefined, arcana: string): string {
	return displayOption(
		locale,
		'arcana',
		arcana,
		`${capitalize(arcana)} Arcana`,
	);
}

/** The published name of a suit in the page language (`Cups`, `Kelche`), read from the API option labels. */
export function suitText(locale: string | undefined, suit: string): string {
	return displayOption(locale, 'suit', suit, capitalize(suit));
}
