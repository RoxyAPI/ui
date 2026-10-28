import { type TemplateResult } from 'lit';
import type { GetBasicPanchangResponse, GetDetailedPanchangResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type PanchangData = GetBasicPanchangResponse | GetDetailedPanchangResponse;
/**
 * Panchang table for /vedic-astrology/panchang/{basic,detailed}.
 *
 * @remarks
 * The main grid lists the five limbs (tithi, nakshatra, yoga, karana, vara),
 * each with the reading that comes with it: the tithi ruling planet, deity,
 * element and how far it has elapsed; the nakshatra lord, deity and symbol; the
 * yoga and karana characteristics. Detailed mode adds the sunrise placements a
 * reader scans first (Moon rashi, Sun rashi, Sun nakshatra, current hora), the
 * exact transition times including the Moon sign change, and groups every timed
 * window into auspicious (fixed muhurtas plus each Amrit Kalam) and
 * inauspicious (Rahu Kaal, Yamaganda, Gulika, each Dur Muhurta and Varjyam,
 * plus Bhadra and Panchaka). Chandrabalam and Tarabalam close the card: which
 * birth rashis and birth nakshatras this day favors, the surface a muhurta is
 * actually chosen on.
 */
export declare class RoxyPanchangTable extends RoxyDataElement<PanchangData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    detail: 'basic' | 'detailed';
    protected renderData(d: PanchangData): TemplateResult<1>;
    /**
     * The five limbs, each with its own reading. Basic and detailed carry the
     * same limb shapes; only detailed carries the vara.
     */
    private limbs;
    private renderLimbRow;
    /** One label/value row, skipped when the value is empty. */
    private renderRow;
    private renderTransitions;
    /** Renders one row per [label, period] pair, dropping any with no range. */
    private renderPeriodRows;
    /** Expands an array of periods into labeled rows, numbering when more than one. */
    private expandWindows;
    /**
     * Bhadra (Vishti karana) is avoided for every auspicious act, so "none today"
     * is as much of an answer as a window and is stated rather than left blank.
     */
    private renderBhadraRow;
    /**
     * Panchaka runs about five days, so the window commonly starts before or ends
     * after this date; the dosha type names which of the five it is.
     */
    private renderPanchakaRow;
    /**
     * Chandrabalam and Tarabalam are read against the querent's own birth rashi
     * and birth nakshatra, so both lists are shown in full rather than summarized.
     */
    private renderBalams;
    private renderChips;
    /** The observer the sunrise and every window were computed for, as the response echoes it. */
    private renderLocation;
    /** A transition after midnight carries its date, so a time past the end of the panchang day cannot be misread as today. */
    private clock;
    private renderTransitionRow;
    private renderMoonSignRow;
    /** A window that may end on the following day carries that date so it cannot be misread. */
    private formatSpan;
    /** "English (Sanskrit)" label for the Moon or Sun rashi at sunrise. */
    private formatRashi;
    /** Sun nakshatra with pada and lord, the form a panchang reader expects. */
    private formatSunNakshatra;
    /** Current planetary hora with its active window. */
    private formatHora;
    /** Basic mode returns raw sidereal longitudes rather than named placements. */
    private formatLongitude;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-panchang-table': RoxyPanchangTable;
    }
}
export {};
