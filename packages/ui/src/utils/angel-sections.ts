/**
 * Ordered angel-number interpretation sections, shared by the angel-number card and lookup components so the field list, labels, and display order live in one place instead of being duplicated per component.
 *
 * @remarks The life-area keys (`spiritual`, `love`, `career`, `money`, `twinFlame`) mirror the `meaning` object in the angel-numbers OpenAPI response; `biblical` and `shadow` are top-level siblings present only on a known meaning, not on the digit-root fallback. Any absent field is skipped, so the one builder serves a full known meaning and the leaner digit-root reading alike.
 */

export interface MeaningSection {
	label: string;
	body: string;
}

const LIFE_AREA_SECTIONS: ReadonlyArray<{ key: string; label: string }> = [
	{ key: 'spiritual', label: 'Spiritual' },
	{ key: 'love', label: 'Love' },
	{ key: 'career', label: 'Career' },
	{ key: 'money', label: 'Money' },
	{ key: 'twinFlame', label: 'Twin flame' },
];

/**
 * Build the present-only interpretation sections in canonical order: the life areas first, then the optional `biblical` and `shadow` readings. An empty or missing field is omitted so the caller can render whatever the response actually carries.
 */
export function buildMeaningSections(
	meaning: Record<string, string> | undefined,
	biblical?: string,
	shadow?: string,
): MeaningSection[] {
	const sections: MeaningSection[] = [];
	if (meaning) {
		for (const s of LIFE_AREA_SECTIONS) {
			const body = meaning[s.key];
			if (body) sections.push({ label: s.label, body });
		}
	}
	if (biblical) sections.push({ label: 'Biblical', body: biblical });
	if (shadow) sections.push({ label: 'Shadow', body: shadow });
	return sections;
}
