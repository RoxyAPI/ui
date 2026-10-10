import type { ChromeString } from '../i18n/chrome-strings.js';
import { humanize } from './string.js';

/** The four biorhythm cycles in the order every chart and legend draws them. */
export const BIORHYTHM_CYCLES = [
	'physical',
	'emotional',
	'intellectual',
	'intuitive',
] as const;

/** A cycle key to the English SOURCE its name is looked up by; the key indexes the payload and stays lower case. */
export const CYCLE_LABEL: Record<
	(typeof BIORHYTHM_CYCLES)[number],
	ChromeString
> = {
	physical: 'Physical',
	emotional: 'Emotional',
	intellectual: 'Intellectual',
	intuitive: 'Intuitive',
};

/** A cycle key as a reader sees it: its name through `t` for the four, else the key humanized. */
export function cycleName(
	cycle: string,
	t: (source: ChromeString) => string,
): string {
	const label = CYCLE_LABEL[cycle as keyof typeof CYCLE_LABEL];
	return label ? t(label) : humanize(cycle);
}
