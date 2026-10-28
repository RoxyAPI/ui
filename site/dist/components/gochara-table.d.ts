import type { CalculateTransitResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Gochara: where each graha is transiting now, which natal house it falls in, and the Ashtakavarga-qualified verdict for the exact stretch it occupies.
 *
 * @remarks
 * This renders `POST /vedic-astrology/transit`, the SINGULAR Vedic operation, which is a different response from the Western `calculateTransits` that {@link RoxyTransitsTable} renders. The two are not interchangeable: the Western one carries `transitPlanets` with speed and retrograde flags, this one carries `natalHouse`, `aspectsToNatal` and `kaksha`.
 *
 * **Gochara is reckoned from the natal Moon: the house from Janma Rashi leads each row and the house from the Lagna sits beside it**, because a transit chart drawn over the birth chart shows the Lagna reading and a reader comparing the two has to see which number is which.
 *
 * **Drishti and the degree-based aspects are both listed and each is labelled**, since Parashari jyotish has no sextile, square or trine and a Vedic card printing only the Western vocabulary would teach a reading the tradition does not make.
 *
 * **Kaksha is drawn as a POSITION WITHIN THE SIGN, never as a verdict chip.** The sign says where a graha is; the kaksha says whether the sub-four-degree stretch it currently occupies is one its own Bhinnashtakavarga supports. What a practitioner reads off it is how long until the verdict turns, and a single chip throws that away: a graha two thirds through an unsupported kaksha is a different situation from one that just entered it. The eight-segment bar answers both at a glance.
 *
 * The eight kaksha lords run in a fixed order from the start of every sign, and this component deliberately holds NO copy of that order. Only the CURRENT kaksha is labelled, from the `lord` the response carries. A local table would be a second source of truth for data the API owns, and it would sit in a public repo.
 *
 * **`bindu` is null for Rahu and Ketu and must render blank, never as an unfavourable verdict.** The nodes have no Bhinnashtakavarga of their own, so there is no bindu to give; treating the absence as a negative would invent a reading the tradition does not make. Since the OpenAPI 3.1 nullability fix the type is `boolean | null`, so a `bindu ? a : b` no longer typechecks its way past the distinction.
 *
 * `hide-readings` takes the Key transits section and nothing else. Every graha row stays whole, including the kaksha line: that sentence is a readout of `number`, `lord`, `startDegree`, `endDegree` and `binduCount`, so it is the calculation written out rather than a reading of it. The Key transits section is the reverse, a list of `description` sentences whose one datum, the natal house, is already on the graha row above, so it goes whole rather than leaving its heading behind.
 */
export declare class RoxyGocharaTable extends RoxyDataElement<CalculateTransitResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: CalculateTransitResponse): unknown;
    private renderPlanet;
    /** One labelled contact list. Drishti and the degree-based aspects carry the same three fields, so both read through here and the label is what tells them apart. */
    private renderContacts;
    /**
     * The eight-segment kaksha bar plus its one-line reading.
     *
     * @remarks
     * `bindu` has three states and each renders differently: `true` supports the transit, `false` does not, and `null` means the graha has no Bhinnashtakavarga at all, which is Rahu and Ketu. The null case gets the neutral segment and NO verdict sentence, the same way the planets table leaves the avastha cells blank for the nodes rather than printing a zero.
     */
    private renderKaksha;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-gochara-table': RoxyGocharaTable;
    }
}
