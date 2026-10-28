/**
 * Ordered angel-number interpretation sections, shared by the angel-number card and lookup components so the field list, labels, and display order live in one place instead of being duplicated per component.
 *
 * @remarks The life-area keys (`spiritual`, `love`, `career`, `money`, `twinFlame`) mirror the `meaning` object in the angel-numbers OpenAPI response; `biblical` and `shadow` are top-level siblings present only on a known meaning, not on the digit-root fallback. Any absent field is skipped, so the one builder serves a full known meaning and the leaner digit-root reading alike.
 */
import type { Translate } from './hd-reading.js';
export interface MeaningSection {
    label: string;
    body: string;
}
/**
 * Build the present-only interpretation sections in canonical order: the life areas first, then the optional `biblical` and `shadow` readings. An empty or missing field is omitted so the caller can render whatever the response actually carries.
 */
export declare function buildMeaningSections(t: Translate, meaning: Record<string, string> | undefined, biblical?: string, shadow?: string): MeaningSection[];
