import type { CalculateVariablesResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Variables = CalculateVariablesResponse;
/**
 * Human Design variables (the four arrows / PHS). Renders /human-design/variables: the four transformation arrows laid out as they sit on the bodygraph head (top-left/right Determination + Motivation, bottom-left/right Environment + Perspective), each showing its left/right direction, the digestion/environment/awareness/perspective labels, and its color/tone/base.
 *
 * @remarks
 * The quadrant grid stays the primary read: it is the arrow map as it appears on the chart, and it is what a reader scans first. The interpretation sits below it in an exclusive accordion, grouped by the two layers the arrows belong to (the body-side Primary Health System, the mind-side Rave Psychology), because the layer description is one text shared by the two arrows in it and belongs to the group rather than to each arrow. Only one arrow reading is ever open, so the card grows by one paragraph at most.
 *
 * `cognition` rides only on the determination arrow and is rendered when present. A low-confidence calculation (a birth time near a color or tone boundary) is flagged per arrow and for the chart as a whole.
 *
 * **Seven of the fields on an arrow come back twice**, canonical English plus a `*Localized` display copy (`name`, `layer`, `position`, `colorLabel`, `directionLabel`, `baseName` and the cognition `label`), so each is printed through `display()`. Everything the card COMPUTES with stays on the canonical half: `quadrantOrder` sorts on `position`, the layer grouping keys on `layer`, and the arrow glyph is chosen on `direction`, which is the wire enum `left` or `right` rather than a word. The activating body is the only vocabulary here with no localized partner and prints as sent.
 */
export declare class RoxyHdVariables extends RoxyDataElement<Variables> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: Variables): import("lit").TemplateResult<1>;
    private renderArrow;
    /**
     * The four readings, grouped by the layer each arrow belongs to. The layer
     * description is one text shared by both arrows of a layer, so it is lifted to
     * the group intro rather than repeated in each body. Group order follows the
     * already quadrant-sorted arrows, which puts the body layer before the mind
     * layer without naming either.
     *
     * Prose end to end, and the arrows themselves are already laid out above with
     * their direction, color, tone and base, so `hide-readings` takes the section
     * whole.
     */
    private renderReading;
    private renderArrowReading;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-hd-variables': RoxyHdVariables;
    }
}
export {};
