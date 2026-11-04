/**
 * The Human Design reading surface: the facts, the lead paragraph, the signature and not-self chips, and the profile keynotes.
 *
 * @remarks
 * `/human-design/type` returns a strict subset of the `/human-design/bodygraph` interpretation fields (type, aura, strategy, authority, their descriptions, signature, not-self, profile), so `roxy-bodygraph` and `roxy-hd-type-card` would otherwise render the same markup and carry the same CSS twice. Both import from here instead: the bodygraph wraps the chart around it, the type card is the reading on its own.
 *
 * The disclosure accordion itself is NOT here. It lives in `utils/interp-accordion.ts`, because the same accordion serves any endpoint that returns a labelled reading (`roxy-hexagram` uses it for the changing lines), and both HD components draw it through `RoxyDataElement.renderInterpretation` so `hide-readings` is honoured. Import `interpAccordionStyles` alongside `hdReadingStyles`.
 */
import { nothing } from 'lit';
import type { Translate } from '../i18n/registry.js';
import type { InterpSection } from './interp-accordion.js';
/** One row of the reading accordion. Alias of the shared {@link InterpSection} so HD call sites keep reading naturally. */
export type ReadingSection = InterpSection;
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
