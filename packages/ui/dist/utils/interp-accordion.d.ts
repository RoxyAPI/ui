/**
 * The interpretation accordion: the one way this library shows a label, a short value, and a body of prose behind a disclosure.
 *
 * @remarks
 * Exclusive by construction (`<details name>`), so a card grows by at most one open section and never becomes a wall of text. Callers pass their own group `name` so two accordions on one page do not fight over which section is open.
 *
 * This lives here rather than in a component because the same accordion is the right shape wherever an endpoint returns a labelled reading: the Human Design bodygraph and type card use it for strategy, authority, and aura; `roxy-hexagram` uses it for the changing lines. A card that draws its own disclosure, because its summary carries more than a label and an aside, still renders the shared body; its chips come from the recipes.
 *
 * **Call it through `RoxyDataElement.renderInterpretation`, never directly.** That method is where `hide-readings` is honoured, so a direct call renders prose a host asked to be left out. The section it emits carries `part="section readings"` and each row `part="reading"`, which is what makes the readings of EVERY component addressable under one name from outside the shadow root.
 */
import { nothing } from 'lit';
import type { Translate } from './hd-reading.js';
/** One row: the label, the short value shown as the aside, and the interpretation body. `extra` renders under the body for a section that carries more than prose. */
export interface InterpSection {
    label: string;
    aside?: string;
    body: string;
    extra?: unknown;
}
export declare const interpAccordionStyles: import("lit").CSSResult;
/** The keyword chips a reading carries, or nothing. One renderer because four components drew the identical row on the chip recipe. */
export declare function renderKeywordChips(keywords: readonly string[] | undefined): typeof nothing | import("lit").TemplateResult<1>;
/** The prose an endpoint returns ABOUT one contact: a summary, up to three labelled lines, and the keyword chips under them. Every field is optional, so a narrower response renders fewer rows rather than empty ones. */
export interface ReadingDetail {
    summary?: string;
    impact?: string;
    timing?: string;
    guidance?: string;
    keywords?: readonly string[];
}
/** Render one {@link ReadingDetail}. The three labels are copy, so this takes the translator, and they are typed {@link ChromeString} because the lookup is one indirection from the call: a scan of `t(...)` sites cannot follow that, and the compiler can. */
export declare function renderReadingDetail(d: ReadingDetail | undefined, t: Translate): typeof nothing | import("lit").TemplateResult<1>;
/**
 * Render the accordion. Sections with no body are dropped, so a caller can pass the full set and let a narrower response render only what it carries. `name` groups the `<details>` exclusively, so opening one closes the last.
 */
export declare function renderInterpAccordion(sections: InterpSection[], name: string, heading: string): typeof nothing | import("lit").TemplateResult<1>;
