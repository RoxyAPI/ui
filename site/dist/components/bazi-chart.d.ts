import type { GenerateBaziChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Four Pillars (BaZi) chart. Pass `data` from POST /chinese-astrology/bazi/chart.
 *
 * @remarks
 * Four columns, one per pillar, each carrying the Heavenly Stem over the Earthly Branch it is
 * read with, the Ten God relation that stem holds to the Day Master, the stems the branch stores,
 * and the Na Yin of the pair. The day column is marked, because the day stem IS the Day Master and
 * every relation in the chart is measured from it.
 *
 * **The hanzi is the chart.** A stem and a branch are single characters, identical in every
 * language the API serves, so they are drawn large and the romanisation and the element sit under
 * them. That is what makes this card read the same for a practitioner in any language.
 *
 * **The conventions caption is provenance, not decoration.** Three school splits decide a chart
 * for a birth near a boundary, the response echoes which one produced this one, and a chart
 * printed without them cannot be independently verified by the person reading it.
 *
 * `hide-readings` drops the prose and keeps the chart: every character, every element count, every
 * interaction and its members, and the conventions all stay. The Day Master paragraph, the summary,
 * the per-element reading and the per-interaction meaning go.
 *
 * **The vocabulary stays English end to end, by decision; the chrome does not.** A sourcing pass
 * across all seven catalogue languages found that most of the VOCABULARY (the Ten Gods, the hidden
 * stems, the Na Yin sound elements) cannot be written honestly in any of them, so every pillar value
 * still prints exactly as the response sends it. The card's own headings are a separate question:
 * `Four pillars`, `Day Master`, the four pillar-position headers and every localizable value
 * (`zodiacAnimalLocalized`, `elementLocalized`, `animalLocalized`, `tenGod.nameLocalized`) are
 * catalogued and read through {@link display}, so the chrome and the vocabulary each follow their
 * own rule instead of one covering for the other.
 */
export declare class RoxyBaziChart extends RoxyDataElement<GenerateBaziChartResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: GenerateBaziChartResponse): import("lit").TemplateResult<1>;
    /** One pillar: the Ten God over the stem, the branch under it, the stems the branch stores, and the Na Yin. */
    private renderPillar;
    /** The day stem the whole chart is measured from, with the imagery the tradition reads it by. */
    private renderDayMaster;
    /** How the eight characters divide across the five phases, and what each level means. */
    private renderElements;
    /** Every combination, clash, harm and punishment the four pillars form, and which positions each binds. */
    private renderInteractions;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-bazi-chart': RoxyBaziChart;
    }
}
