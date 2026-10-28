import type { GenerateBodygraphResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Bodygraph = GenerateBodygraphResponse;
/**
 * Human Design bodygraph. Pass `data` from /human-design/bodygraph. Renders the nine centers in their canonical positions and shapes, filled when defined and surface-filled and outlined when open, the 36 channels as wiring between gates, and ALL 64 gates: outlined where nothing landed, filled where an activation did, and split down the middle where both sides did.
 *
 * @remarks
 * The response carries a full interpretation, not just labels, so the card is laid out in four passes from identity down to detail. The chart takes the full card width at every size and identity sits under it, never beside it, because a bodygraph is half again taller than it is wide and is read as a whole. Identity is always visible: the type, strategy, authority, profile, and definition facts, the type description as the lead paragraph, the incarnation cross, and the signature and not-self themes. Everything below is progressive disclosure through the shared exclusive-accordion pattern, so only one body of prose is ever open at a time and the card never becomes a wall of text: the reading (strategy, authority, profile, definition, aura, cross), the defined channels grouped by circuit, the nine centers, and the 26 gate activations split by chart side.
 *
 * A center returns `notSelfQuestion` whatever its state, but the question describes the conditioning of an OPEN center, so it is rendered only when the center is open. `theme` already tracks the defined or open state and is always shown.
 *
 * **Every name on this card is read twice.** A translated response echoes the display value beside the canonical one (`nameLocalized` next to `name`, `planetLocalized` next to `planet`) and keeps the canonical one English in every language, so the reader gets `display(...)` and the machine keeps the English: `planetGlyph` is keyed on `planet`, the defined-center Set and the channel groups are keyed on `id` and `circuit`, and the tab state is the wire value `personality` or `design`. Two fields have no localized partner and print as sent, each with a note at its site: `incarnationCross.name` and `ichingHexagram.english`.
 *
 * **Personality is the dark half of a bodygraph and Design the red half, and the binary the reading rests on is drawn, not just labelled.** It comes from `gates[].side`, so nothing extra is requested: a gate circle takes the colour of the side or sides that activated it, and each half of a channel takes the colour of the gate at its own end, which is why a channel joining a Personality gate to a Design gate is half dark and half red. Literal black cannot survive a dark theme, so Personality follows `--roxy-fg` and inverts with it.
 *
 * The chart is theme-driven through `--roxy-*` custom properties on `:host`, so it adopts the host palette in light and dark without runtime color probing.
 *
 * `hide-readings` leaves the chart, the facts, the incarnation cross, the themes and the legend, and drops the reading accordion together with the channels, centers and activations sections. Those three exist to hold the prose behind each disclosure, and the wiring they describe is already drawn in the chart above them: the gate circles, the lit channels, and the filled centers.
 *
 * Centre names live in each shape's `<title>`, which is the hover tooltip and the accessible name. No margin labels: they need leader lines across the drawing and no printed bodygraph carries either.
 */
export declare class RoxyBodygraph extends RoxyDataElement<Bodygraph> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly viewport;
    /** Which chart side the activations panel is showing. View state, not configuration: the response always carries both sides. */
    private side;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: Bodygraph): import("lit").TemplateResult<1>;
    /** The hover and accessible text for one gate circle, naming every activation on it rather than one. */
    private buildGateTitles;
    /** Monochrome planet glyph for an activation, or its body name when the wheel has no glyph for it. The lookup is keyed on the canonical English name, which the API keeps English in every language for exactly this; the fallback TEXT is the reader's. */
    private gateGlyph;
    private renderSummary;
    /**
     * The chart key: what an activation colour means, then what a centre colour means.
     *
     * @remarks
     * The centre rows are built from the chart geometry and named with the response
     * vocabulary, so they can never claim a colour the chart does not draw and never
     * name a centre in a different language from the accordion. The activation row
     * leads because it is the half a reader cannot guess.
     */
    private renderLegend;
    /**
     * The mechanics of the design, in the order a reader needs them: how to engage (strategy), how to decide (authority), the role played (profile), how the definition hangs together, the aura, and the life theme of the incarnation cross. The cross name and gates already sit beside the chart, so only its description is repeated here.
     */
    private renderReading;
    /**
     * Defined channels, grouped by circuit. The circuit description is the same
     * text for every channel that belongs to it, so it is lifted to the group
     * intro instead of repeating inside each row. Groups keep response order, which
     * is gate order; no circuit ranking is invented.
     *
     * @remarks
     * The two centres a channel joins are what it DOES, so each row names them as
     * chips beside its gates. They read the same names the chart and the centres
     * section use, and being names rather than a sentence they need no wording of
     * their own in any language.
     */
    private renderChannels;
    /**
     * The nine centers. `theme` already reflects whether the center came back
     * defined or open, so it always shows. `notSelfQuestion` is written for the
     * OPEN state ("the open Spleen clings to..."), so showing it on a defined
     * center would state the opposite of the chart; it is rendered for open
     * centers only.
     */
    private renderCenters;
    /**
     * The 26 activations, split by chart side. Personality is the conscious side
     * printed in black, design the unconscious side printed in red, and the
     * response describes each once at the top level, so the side description
     * becomes the panel intro rather than an orphan glossary entry. Splitting the
     * list in two also halves what a reader scans: 13 rows per side, in the
     * canonical planet order the response returns.
     */
    private renderActivations;
    private renderGate;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-bodygraph': RoxyBodygraph;
    }
}
export {};
