import type { CalculateLuckPillarsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Luck pillars (Da Yun). Pass `data` from POST /chinese-astrology/bazi/luck-pillars.
 *
 * @remarks
 * The ten-year stretches a BaZi chart is read through, drawn as a strip in the order they are
 * lived, each carrying the stem over the branch, the Ten God the stem holds to the Day Master, and
 * the ages and years it spans. The strip scrolls rather than reflowing, because the sequence IS the
 * reading: a run of pillars in one element is the thing a practitioner looks for, and wrapping the
 * row into a grid destroys it.
 *
 * **The direction and the starting age are not trivia.** Pillars run forward or backward depending
 * on the polarity of the year stem and the sex of the person, and the start age is counted from the
 * birth to the nearest solar term, so two people born days apart can enter their first pillar years
 * apart. The header prints the direction, the starting age to the month, and the term the count was
 * measured to, because a strip that hides them cannot be independently verified.
 *
 * `hide-readings` keeps the whole strip, the annual pillars and the header facts, and drops the
 * summary paragraph and the per-pillar keynote.
 *
 * **The vocabulary stays English end to end, by decision; the chrome does not.** The Ten God names
 * are still unsourced in most catalogue languages, so they print exactly as the response sends
 * them, but the card heading, its header facts and every value the response DOES localize
 * (`elementLocalized`, `animalLocalized`, `tenGod.nameLocalized`, plus `gender` and the boundary
 * term through the published option payload) now go through the catalogue.
 */
export declare class RoxyLuckPillars extends RoxyDataElement<CalculateLuckPillarsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: CalculateLuckPillarsResponse): import("lit").TemplateResult<1>;
    /** An age given to the month, because the start of the first pillar rarely lands on a birthday. */
    private ageLabel;
    /** The pillars themselves, in the order they are lived. */
    private renderStrip;
    /** The year-by-year pillars inside the stretch, which is what a reader checks a date against. */
    private renderAnnuals;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-luck-pillars': RoxyLuckPillars;
    }
}
