import { nothing } from 'lit';
/** Every glyph draws in the symbol face: a `roxy-glyph` element in a card, and a `roxy-glyph` mark in a chart string. */
export declare const glyphStyles: import("lit").CSSResult;
/** A glyph in front of the name that says it, hidden from a screen reader; nothing when the glyph module has none. */
export declare function renderGlyph(glyph: string | undefined): typeof nothing | import("lit").TemplateResult<1>;
