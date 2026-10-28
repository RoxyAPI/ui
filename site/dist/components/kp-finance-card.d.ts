import type { GetKpDailyFinanceResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Finance = GetKpDailyFinanceResponse;
/**
 * KP daily finance. Renders POST /vedic-astrology/kp/daily-finance: one native, one civil day, four sub lord layers weighed into one score for money.
 *
 * @remarks
 * **The band is the answer and every number under it is the evidence.** The score is a weight-sum of four layers, each the mean of the rows printed in its own table, so a reader can redo the arithmetic from the card: the cusp sub lords of the gain and loss houses, the running Vimshottari lords at the reading moment, the ruling planets of that moment, and the sub lord windows the Moon passes through across the day. No meter, bar or percentage badge, for the same reason the Vedic daily card draws none: the scale is a weighed classification and not a share of anything, so a filled gauge would read an ordinary day as a bad one.
 *
 * **Every planet is judged against the two significator sets, and the sets come first.** A row is favourable when its planet signifies a gain house and no loss house, mixed when both, unfavourable when a loss house alone, neutral when neither, so the card prints the gain and loss houses the reading used, the planets that signify each, and the per-house evidence behind those two lists before any layer table, because that is what every verdict below is read against. A loss cusp inverts its verdict score and is marked as a loss house on its row.
 *
 * **Every clock time is the request timezone's wall clock, never the viewer's.** `readingAt` and the Moon windows arrive as naive local datetimes, so the shared formatters pin them and a reader in another zone sees the native's day, not a shifted one. The dasha boundaries are instants and follow the viewer.
 *
 * The card is data end to end and carries no written interpretation, so `hide-readings` leaves it whole.
 */
export declare class RoxyKpFinanceCard extends RoxyDataElement<Finance> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: Finance): unknown;
    /** The band, the score behind it, the day and the moment it was read at, and the two house sets. */
    private renderHead;
    /**
     * The two planet sets every verdict is judged against, and the per-house evidence they were built from.
     *
     * @remarks
     * A house lists its four tier significators strongest tier first, and a planet that qualifies at more than one tier is listed once per tier. It is named once here, at its strongest, because the row answers which planets signify the house and the two sets above are built from exactly that.
     */
    private renderSignificators;
    /** One layer: its name, the weight it carries and the score it contributed, over the rows it was scored from. */
    private renderLayer;
    private renderCuspRows;
    private renderDashaRows;
    private renderRulingRows;
    private renderWindowRows;
    /**
     * The favourable window of the day and every unfavourable one, lifted out of the Moon table so a reader planning the day finds them without reading nine rows.
     *
     * @remarks
     * `bestWindow` is null on a day with no favourable window, which is a fact about the day and not a missing value, so the block prints the worst windows alone rather than an empty slot.
     */
    private renderWindows;
    /**
     * A planet with its glyph in front, and the retrograde mark after it where the row says so.
     *
     * @remarks
     * The mark is the symbol the ephemeris and transit tables draw, with the catalogued word as its accessible name rather than printed: printed after a name, an adjective has to agree with that name in the languages that inflect it, and a symbol does not.
     */
    private glyphName;
    private verdictChip;
    /** Which of the two sets a house belongs to, beside its number. */
    private groupChip;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-kp-finance-card': RoxyKpFinanceCard;
    }
}
export {};
