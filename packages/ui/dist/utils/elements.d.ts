/** The class that colours one of the five phases, keyed on the canonical English element; empty on any other value. */
export declare function elementClass(element: string | undefined): string;
/**
 * The five phases on the status tokens: Wood success, Fire danger, Earth warning, Water info, and Metal the secondary neutral, since white cannot show on a light card.
 *
 * @remarks
 * A class sets `--_element` (the base, for a fill or a bar) and `--_element-ink` (the `-fg` ink, for text); an element-coloured text reads `color: var(--_element-ink)` and keeps its word beside the colour.
 */
export declare const elementStyles: import("lit").CSSResult;
