/**
 * Ordered angel-number interpretation sections, shared by the angel-number card and lookup components so the field list, labels, and display order live in one place instead of being duplicated per component.
 *
 * @remarks The life-area keys (`spiritual`, `love`, `career`, `money`, `twinFlame`) mirror the `meaning` object in the angel-numbers OpenAPI response; `biblical` and `shadow` are top-level siblings present only on a known meaning, not on the digit-root fallback. Any absent field is skipped, so the one builder serves a full known meaning and the leaner digit-root reading alike.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import type { Translate } from './hd-reading.js';

export interface MeaningSection {
	label: string;
	body: string;
}

/** Response field to the English SOURCE its heading is looked up by. `source`, not `label`, because nothing renders it directly: it is typed {@link ChromeString} so a heading no catalogue carries is a compile error rather than one English word inside translated chrome. */
const LIFE_AREA_SECTIONS: ReadonlyArray<{ key: string; source: ChromeString }> =
	[
		{ key: 'spiritual', source: 'Spiritual' },
		{ key: 'love', source: 'Love' },
		{ key: 'career', source: 'Career' },
		{ key: 'money', source: 'Money' },
		{ key: 'twinFlame', source: 'Twin flame' },
	];

/**
 * Build the present-only interpretation sections in canonical order: the life areas first, then the optional `biblical` and `shadow` readings. An empty or missing field is omitted so the caller can render whatever the response actually carries.
 */
export function buildMeaningSections(
	t: Translate,
	meaning: Record<string, string> | undefined,
	biblical?: string,
	shadow?: string,
): MeaningSection[] {
	const sections: MeaningSection[] = [];
	if (meaning) {
		for (const s of LIFE_AREA_SECTIONS) {
			const body = meaning[s.key];
			if (body) sections.push({ label: t(s.source), body });
		}
	}
	if (biblical) sections.push({ label: t('Biblical'), body: biblical });
	if (shadow) sections.push({ label: t('Shadow'), body: shadow });
	return sections;
}
