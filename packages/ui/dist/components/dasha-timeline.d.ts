import type { GetCurrentDashaResponse, GetMajorDashasResponse, GetPranaDashasResponse, GetPratyantardashasResponse, GetSookshmaDashasResponse, GetSubDashasResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type DashaData = GetCurrentDashaResponse | GetMajorDashasResponse | GetSubDashasResponse | GetPratyantardashasResponse | GetSookshmaDashasResponse | GetPranaDashasResponse;
/**
 * Dasha timeline. Renders /vedic-astrology/dasha/{current,major,sub/{...}}.
 *
 * @remarks
 * Default mode shows all five active levels, mahadasha through prana, with the
 * reading each one carries. `period="major"` draws the full 120-year
 * Vimshottari timeline; `period="sub"` draws the antardashas inside one
 * mahadasha and states which mahadasha they sit in, since an antardasha means
 * nothing without its parent lord.
 *
 * When the request asked for significators, each period also names the houses
 * its lord acts on, in words taken from the response rather than from any table
 * held here, so the words arrive in the language the caller requested.
 */
export declare class RoxyDashaTimeline extends RoxyDataElement<DashaData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /**
     * Which dasha endpoint fed this element. `sub`, `antara`, `sookshma` and
     * `prana` are the four drill-down levels and render identically; they stay
     * distinct because each maps one-to-one onto its endpoint binding, which is
     * what lets a widget pick a level. The heading and the level LABELS come from
     * the payload, not from here, so a host that cannot set attributes still
     * renders correctly.
     */
    period: 'current' | 'major' | 'sub' | 'antara' | 'sookshma' | 'prana';
    /** Which panel is showing. Reset guarded in renderData when the data changes shape. */
    private view;
    protected renderData(d: DashaData): import("lit").TemplateResult<1>;
    /**
     * The full lord chain a drill-down sits under, e.g. Saturn > Venus > Rahu.
     *
     * The response carries every ancestor lord on each period, and naming only the
     * immediate parent leaves a reader at the sookshma level unable to tell which
     * branch of the chart they are looking at.
     */
    private renderLordChain;
    /**
     * Provenance rows: the chart every date in this response was derived from.
     *
     * These are the fields that let a reader reconcile our dates against another
     * calculator. The sidereal frame is the one that actually explains a
     * disagreement, since Lahiri and the KP variants move every boundary by weeks,
     * so it is shown rather than left in the JSON.
     */
    private frameRows;
    private renderFrame;
    /**
     * Heading, decided by the PAYLOAD first and the `period` attribute only as a
     * tie-break.
     *
     * Not every host can set the attribute. The WordPress plugin maps an
     * operationId to a bare component tag with no attrs, so every dasha shortcode
     * arrives with the default `period="current"`; keying off the attribute alone
     * titled an antardasha list "Active dashas" there. A drill-down response is
     * self-identifying (it carries a parent period), so the markup does not need
     * to be told.
     */
    /** The accordion for this view. Singular or plural by count, decided here rather than inside the template so the two sources are ordinary arguments the compiler checks. */
    private renderReadings;
    private heading;
    /**
     * Drill-down modes list sub-periods inside one parent, so name the parent and
     * its span. A sub-period means nothing without its parent lord.
     *
     * `nominalStartDate` is present only when birth cut the parent short, which is
     * also why such a list can hold fewer than nine rows: the sub-periods that
     * finished before the native was born are not part of the chart. Saying so
     * turns a surprising short list into an explained one.
     */
    private renderParentMahadasha;
    /**
     * Every reading the response carries, behind one exclusive accordion. Current
     * mode has five (mahadasha, antardasha, pratyantardasha, sookshma, prana);
     * drill-down modes lead with the parent period reading, then the sub-period
     * running now; major mode shows the mahadasha running now.
     */
    private readings;
    private renderCurrent;
    private collectPeriods;
    /** True when the current wall-clock time falls between the period's start and end. */
    private isCurrent;
    /**
     * Fractional progress (0..1) through a period at the current time, which places
     * the vertical "now" marker inside the active bar. Returns -1 outside the period
     * so the caller can skip the marker.
     */
    private progressIn;
    private renderBar;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-dasha-timeline': RoxyDashaTimeline;
    }
}
export {};
