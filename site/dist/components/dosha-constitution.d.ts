import type { CalculateAyurvedicConstitutionResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Constitution = CalculateAyurvedicConstitutionResponse;
/**
 * Ayurvedic constitution from a birth chart. Pass `data` from POST /ayurveda/constitution.
 *
 * @remarks
 * **The three shares are one bar, and the bar is the card.** They sum to exactly 100 by largest
 * remainder, so a stacked bar is the honest drawing rather than three separate meters: the reading
 * is a split of one whole, and three bars invite a reader to compare each against a full width that
 * does not exist. Every segment carries its own percentage beside the humour, so the picture and the
 * numbers cannot disagree.
 *
 * **The humour identifiers are printed as the response sends them, in every language.** Vata, pitta
 * and kapha are Sanskrit identifiers the API states outright are never translated, so they are
 * vocabulary rather than chrome and nothing here catalogues them.
 *
 * **`composite.convention` is a version identifier and is not printed.** It names the release of the
 * blending rule so a caller comparing two readings months apart can tell whether the rule moved, and
 * the field-label payload publishes no reader-facing name for it, so a card printing it shows a
 * developer string with no label a visitor can act on. What the convention IS reaches the reader as
 * numbers instead: every factor prints the weight it was given, and the summary says the weighting is
 * ours rather than classical.
 *
 * **`meta.disclaimer` is rendered verbatim and `hide-readings` does not touch it.** It states the
 * scope of everything above it, which is a fact about the response rather than an interpretation of
 * a chart, and a page that drops the reading has more need of it rather than less.
 *
 * The factors are the part a practitioner checks: each names what it read, the humours it carries,
 * the weight it was given and the verse it rests on. The weighting is ours rather than classical,
 * which is why the weights are on the card rather than behind it.
 */
export declare class RoxyDoshaConstitution extends RoxyDataElement<Constitution> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: Constitution): import("lit").TemplateResult<1>;
    /** The composite as one stacked bar plus the three shares written out beside it. */
    private renderBar;
    /** The three scored factors: what each read, the humours it carries, its weight and its verse. */
    private renderFactors;
    /** The heading for one factor, falling back to the wire id for a fourth the API might add. */
    private factorLabel;
    /**
     * One citation, plus any disagreement the response records against it.
     *
     * @remarks
     * A `note` here is a recorded conflict between two editions or a stated limit on what the
     * citation covers. It is provenance rather than interpretation, so `hide-readings` keeps it: a
     * page showing the calculation without the report still has to say what the calculation rests on.
     *
     * **It is also editorial rather than practical, and it is a paragraph.** Three of them under three
     * factors is most of the card, above the reading, for a fact a reader consults once and an editor
     * consults often. So the citation LINE stays on screen, which is what makes the value checkable,
     * and the paragraph behind it opens on demand.
     */
    private renderCitation;
    /** The seven grahas by shadbala, with the ones that reached the cutoff marked. */
    private renderRanking;
    /** The graha to humour and graha to constituent table the response ships as reference. */
    private renderPlanetDoshas;
    /**
     * The works behind the reference table, listed once.
     *
     * @remarks
     * Every row carries the same two citations, so printing them per row would repeat one fact seven
     * times. They are collected by their rendered line, which is what makes the set distinct without
     * this component having to know which fields identify an edition.
     */
    private renderTableSources;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-dosha-constitution': RoxyDoshaConstitution;
    }
}
export {};
