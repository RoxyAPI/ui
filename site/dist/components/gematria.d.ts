import type { CalculateGematriaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Gematria = CalculateGematriaResponse;
/**
 * Gematria calculator. Pass `data` from POST /kabbalah/gematria.
 *
 * @remarks
 * **Hebrew is written right to left and the letter strip has to be laid out that way, or the
 * breakdown contradicts the word above it.** The response lists letters in string order, so the
 * strip carries `dir="rtl"` and the first letter takes the RIGHTMOST tile. Each tile is `dir="ltr"`
 * inside, because the letter name and its number are Latin and read the other way, and `lang="he"`
 * marks the GLYPH rather than the strip, so a host page picks a Hebrew face for the letter and not
 * for the transliteration beside it. A final form scores differently under the finals reading, so it
 * is tinted AND keyed under the strip: a tint with a hover title is no marker on a touch screen.
 *
 * **Every candidate spelling is shown, because that is the whole answer.** A Latin name has more
 * than one defensible Hebrew spelling, one is chosen for the totals, and a calculator that hides the
 * others is asking to be trusted rather than checked. The chosen one is marked and the rule that
 * chose it is printed beside it.
 *
 * **A cipher with no computed value is left out of the table rather than shown as a zero or a blank.**
 * One catalogued cipher carries a null value on every response, and an absent number and the number
 * zero are different answers: printing it as either would publish a total nobody calculated, and
 * printing a placeholder on every response would be a row that never says anything.
 *
 * `hide-readings` keeps the spellings, every cipher value, the per letter breakdown, the
 * substitutions, the Latin ciphers and the equal-value words with their meanings. Only what the
 * tradition SAYS about an equality goes, which is the one interpretive sentence on the card.
 */
export declare class RoxyGematria extends RoxyDataElement<Gematria> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: Gematria): import("lit").TemplateResult<1>;
    /** The spelling the totals were taken from, matched back to the form that carries its letters. */
    private chosenForm;
    /**
     * The per letter breakdown of the chosen spelling.
     *
     * @remarks
     * `dir="rtl"` on the strip is the correctness half: the response lists letters in string order and
     * Hebrew reads right to left, so without it the first letter would sit where a reader looks for
     * the last. Each tile is `dir="ltr"` so its Latin name and number are not reordered with it.
     */
    private renderLetters;
    /** Every cipher applied to one spelling, with the provenance the whole block shares beneath it. */
    private renderValues;
    /** The distinct tradition and source behind a block of ciphers, once rather than on every row. */
    private renderProvenance;
    /**
     * Every Hebrew spelling the input can be written as.
     *
     * @remarks
     * Rendered only when there is a choice to show. One spelling is not a set of candidates, and a
     * heading over a single row that repeats the word already at the top of the card reads as a bug.
     */
    private renderForms;
    /** The standard reading of one candidate spelling, which is what a reader compares the spellings on. */
    private renderFormTotals;
    /** AtBash and Albam: the substituted word and what it scores. */
    private renderTransformations;
    /**
     * The Latin alphabet ciphers.
     *
     * @remarks
     * Each carries its own lineage sentence and it is kept: it says where the cipher comes from, which
     * is what stops a Renaissance Christian or modern cipher being read as a rabbinic one. That is a
     * fact about the column rather than a claim about the word, so it is data.
     */
    private renderLatin;
    /** Curated words whose standard value equals the chosen spelling. */
    private renderMatches;
    /**
     * The switches this answer was computed under.
     *
     * @remarks
     * Provenance rather than decoration, the same reason a Vedic chart names its frame: the name
     * mispar gadol is used for two different methods, and a total printed without saying which one
     * produced it cannot be reconciled against any other calculator.
     */
    private renderConventions;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-gematria': RoxyGematria;
    }
}
export {};
