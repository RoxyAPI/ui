/**
 * The Human Design reading surface: the facts, the lead paragraph, the signature and not-self chips, and the profile keynotes.
 *
 * @remarks
 * `/human-design/type` returns a strict subset of the `/human-design/bodygraph` interpretation fields (type, aura, strategy, authority, their descriptions, signature, not-self, profile), so `roxy-bodygraph` and `roxy-hd-type-card` would otherwise render the same markup and carry the same CSS twice. Both import from here instead: the bodygraph wraps the chart around it, the type card is the reading on its own.
 *
 * The disclosure accordion itself is NOT here. It lives in `utils/interp-accordion.ts`, because the same accordion serves any endpoint that returns a labelled reading (`roxy-hexagram` uses it for the changing lines), and both HD components draw it through `RoxyDataElement.renderInterpretation` so `hide-readings` is honoured. Import `interpAccordionStyles` alongside `hdReadingStyles`.
 */
import { nothing } from 'lit';
import type { InterpSection } from './interp-accordion.js';
/** One row of the reading accordion. Alias of the shared {@link InterpSection} so HD call sites keep reading naturally. */
export type ReadingSection = InterpSection;
/**
 * A component's own {@link RoxyDataElement.t}, threaded in so a shared render helper can name its rows.
 *
 * @remarks
 * These helpers are plain functions with no host, so they cannot resolve a page language on their own, and a label they hardcode is one English word inside otherwise translated chrome. Taking the translator as an argument keeps each English source literal in the file that renders it, which is what `tests/i18n.test.ts` scans (it walks `utils/` as well as `components/`), so a string added here still cannot ship without a catalogue entry. That scanner reads comments too, so do not write a sample call in one.
 */
export type Translate = (source: string, vars?: Record<string, string | number>) => string;
/** A labelled value. A fact with no value is dropped, so a narrower response renders fewer facts rather than empty ones. */
export interface Fact {
    label: string;
    value?: string;
}
/** The two profile lines with the keynote of each. Normalized: the bodygraph nests these under `profileKeynotes`, `/human-design/profile` returns them flat, and both map onto this. */
export interface ProfileKeynotes {
    personality?: string;
    personalityLine?: number;
    design?: string;
    designLine?: number;
}
/** The fact list, the lead paragraph and the keynotes; the facts and the theme chips read the shared recipes. */
export declare const hdReadingStyles: import("lit").CSSResult[];
/**
 * The chart side as a word a reader sees.
 *
 * @remarks
 * Personality is the conscious side calculated at birth, design the unconscious side 88 degrees of solar arc before it, and the wire carries them as the machine enum `personality` and `design` with no localized partner. The component is what turns an enum into a word, so this is chrome and comes from the catalogue: the same two words label the bodygraph activation tabs, name the side inside a chart tooltip, and sit under a Variables arrow. An unrecognized value is passed through rather than guessed at.
 */
export declare function sideWord(side: string | undefined, t: Translate): string;
/** The labelled values. Values the response does not carry are dropped rather than rendered empty. */
export declare function renderHdFacts(facts: Fact[]): typeof nothing | import("lit").TemplateResult<1>;
/**
 * The signature and not-self chips: the feeling of being in alignment, and the one that signals being out of it.
 *
 * @remarks
 * Both values arrive already resolved to what a reader should see, because the response carries `signatureLocalized` and `notSelfLocalized` beside the canonical English pair and only the caller knows which half it is holding. The two words around them are this card's own and go through `t`.
 */
export declare function renderHdThemes(signature: string | undefined, notSelf: string | undefined, t: Translate): typeof nothing | import("lit").TemplateResult<1>;
/** The two profile lines, each with the keynote of the line. Personality first: it is the conscious line and the one the profile is read from. */
export declare function renderHdKeynotes(k: ProfileKeynotes | undefined, t: Translate): typeof nothing | import("lit").TemplateResult<1>;
