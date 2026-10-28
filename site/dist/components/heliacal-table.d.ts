import type { HeliacalResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Heliacal rising and setting (udaya and asta) for the six grahas that rise and set.
 *
 * @remarks
 * This is the muhurta surface: Guru Asta and Shukra Asta are the periods classical muhurta withholds marriage, so what a practitioner opens this for is a WINDOW, not a status. The window is therefore the headline of every row and the present verdict is the supporting line, because "invisible until 12 August" answers the question and "invisible" alone does not.
 *
 * Three things here are easy to render wrongly, and each is deliberate:
 *
 * `lastEvent` and `nextEvent` are genuinely NULLABLE, not merely optional. A graha far from conjunction can have no event inside the search horizon at all, which is normal for Mars, so a missing event is reported as its own state rather than as a blank date.
 *
 * The `kalamsa` limit on an EVENT can differ from the graha's CURRENT `kalamsa`, because the Surya Siddhanta gives Mercury and Venus a tighter limit while retrograde. Rendering one and labelling it the other would be a quiet lie, so each is shown against the event it belongs to.
 *
 * `horizon` is a real distinction a reader needs, not an internal detail: east means the graha is read before sunrise and is a morning object, west means after sunset and an evening one. A graha crosses to the other horizon as it passes the Sun, which is why an asta and the udaya after it usually sit on opposite horizons.
 */
export declare class RoxyHeliacalTable extends RoxyDataElement<HeliacalResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: HeliacalResponse): unknown;
    private renderGraha;
    /**
     * The headline: what a reader came for. Leads with the NEXT event, since that is the date a muhurta decision turns on, and falls back to the last one when nothing lies ahead inside the search horizon.
     */
    private windowLine;
    /**
     * The supporting line: the measured separation against the limit it is judged by, plus which horizon the graha belongs to.
     *
     * Both numbers are degrees of TIME in oblique ascension rather than a plain longitude gap, which is the measure the Surya Siddhanta defines these limits in and the reason the verdict depends on latitude at all.
     *
     * @remarks
     * The differing-limit note is derived by COMPARING the two numbers the response carries, never by naming which grahas have a retrograde variant. Only Mercury and Venus do: ix.7-8 gives them 12 or 14 and 8 or 10, while Jupiter, Saturn, Mars and the Moon each have one limit whatever their motion. Tying the note to retrograde motion instead would claim a variant limit for a retrograde Jupiter, which does not exist, and a practitioner reads that as the component not knowing the rule. Comparing the data cannot make that mistake and needs no copy of the table.
     */
    private metaLine;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-heliacal-table': RoxyHeliacalTable;
    }
}
