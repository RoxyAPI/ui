import type { CalculateTzolkinResponse, GenerateMayanChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type MayanData = CalculateTzolkinResponse | GenerateMayanChartResponse;
/**
 * Mayan day sign. Pass `data` from POST /mesoamerican-astrology/mayan/tzolkin, or set
 * `mode="chart"` and pass POST /mesoamerican-astrology/mayan/chart.
 *
 * @remarks
 * **The sign is printed in all three of the orthographies the response carries, because a reader
 * arrives holding one of them.** The standard Maya spelling is the headline, the sixteenth century
 * Yucatec form is what printed reference tables use, and the highland form is the vocabulary a
 * daykeeper works in. Showing one and dropping the others makes the card unreconcilable with
 * whichever book or teacher the reader already has.
 *
 * **The coefficient is drawn beside the sign and never underneath it.** A Tzolkin day is a number
 * and a sign together, and neither half names the day on its own, so the pair reads as one unit and
 * the trecena that contains it sits in the facts below.
 *
 * **The attribute says which read was asked for and the shape check narrows under it.** The Calendar
 * Round payload adds the Haab date, the Long Count, the Lord of the Night, the year bearer and the
 * four-fold cross, and `mode="chart"` is what draws them, so a page that asked for the day sign
 * alone never grows a second calendar its endpoint did not return. The day sign half reads the
 * SHAPE either way, so the fuller payload still renders correctly in day mode.
 *
 * `hide-readings` keeps every calculated value: both calendar dates, the coefficient, the trecena,
 * the Long Count, the Calendar Round, the correlation and the four positions of the cross. The
 * keynote, the coefficient reading, the guidance, the strengths and challenges and every per
 * position reading go.
 */
export declare class RoxyMayanDaySign extends RoxyDataElement<MayanData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which read the response is: the day sign alone, or the full Calendar Round chart. */
    mode: 'day' | 'chart';
    protected renderData(d: MayanData): import("lit").TemplateResult<1>;
    /** The thirteen day period the day sits in, and where in it. */
    private renderTrecena;
    /** The Haab date: the month name, the day inside it, and where the day falls in the 365 day year. */
    private renderHaabFact;
    /** What the sign does well and where the same temperament costs it something. */
    private renderLists;
    /** The prose that belongs behind a disclosure: what the coefficient contributes, and what to do about it. */
    private sections;
    /** The name of one arm, falling back to the wire id for a position the API might add. */
    private crossLabel;
    /**
     * The four-fold cross: the day sign standing at each quarter around this one.
     *
     * @remarks
     * The positions and their day offsets are calculated values and stay under `hide-readings`, so a
     * page showing the map without the report keeps the whole cross and loses only the sentences.
     */
    private renderCross;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-mayan-day-sign': RoxyMayanDaySign;
    }
}
export {};
