import type { GetVedicDailyReadingResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Daily = GetVedicDailyReadingResponse;
/**
 * Vedic daily reading. Renders POST /vedic-astrology/daily: one native, one day, one call.
 *
 * @remarks
 * **The score is a rare-high scale and is deliberately not drawn as a gauge.** It is the share of evaluated grahas that support the native, and the classical rules behind it cancel far more often than they deliver, so an ordinary day sits low. A ring, a bar or a percentage badge would read every ordinary day as a bad one, so the verdict band is the headline and the number supports it.
 *
 * **Every window is an ARRAY because the Moon can change nakshatra or rashi inside the panchanga day.** Tara and Chandrabala are rendered as one chip per window with its own validity, never as a single current value, and `ashtamaChandra` stays its own mark rather than folding into the favourable flag.
 *
 * **Three frames, not one.** The response is computed across a natal, a transit and a KP frame, two ayanamsas over three instants, and each names the sections it governs. All three are printed for the same reason one is printed on every other Vedic card: a chart that does not say which sky produced it cannot be reconciled against any other.
 *
 * House wording comes from `houseThemes` on the response, never from a table here, so the words a reader sees match the lens the call was made with.
 */
export declare class RoxyVedicDaily extends RoxyDataElement<Daily> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: Daily): unknown;
    /** Verdict band, the count behind it, and the per-state tally. */
    private renderHead;
    /** The five limbs, each with the instant it gives way to the next. */
    private renderPanchanga;
    /** The words this response gives a house. Read from `houseThemes` rather than from a table here, so the wording follows the lens the call was made with, and joined for display because it arrives as a list. */
    private theme;
    /** The nine grahas, one row each, with the classical rule that produced the state. */
    private renderGrahas;
    /**
     * The kaksha a graha currently occupies, as its position within the sign.
     *
     * @remarks
     * `bindu` has three states and the third is not a negative: `null` means the graha has no Bhinnashtakavarga to read, which is Rahu and Ketu, so it takes the neutral mark and the sentence stops rather than reporting an unfavourable stretch nobody calculated.
     */
    private renderKaksha;
    /** Tara and Chandrabala, one chip per validity window. */
    private renderWindows;
    /** The finance area, when the day could be scored for it. */
    private renderFinance;
    /**
     * The mean of the day, this area and the natal chart, with each term printed under it.
     *
     * @remarks
     * The band leads and the terms follow, the same order the card reads the day in, so the answer is a word and the numbers are the evidence for it. Nothing is drawn when the object is absent: the running lords reaching none of the six houses, and a latitude where the cusps this area is read from have no solution, are both questions that do not apply rather than a score of zero.
     */
    private renderComposite;
    /** The dasha ladder running under the day. */
    private renderDasha;
    /** All three frames, each naming what it governs. */
    private renderProvenance;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vedic-daily': RoxyVedicDaily;
    }
}
export {};
