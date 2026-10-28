import type { GetDailyHoroscopeResponse, GetMonthlyHoroscopeResponse, GetWeeklyHoroscopeResponse, GetYearlyHoroscopeResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type HoroscopeData = GetDailyHoroscopeResponse | GetWeeklyHoroscopeResponse | GetMonthlyHoroscopeResponse | GetYearlyHoroscopeResponse;
type HoroscopePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';
/**
 * Daily, weekly, monthly, or yearly horoscope card. Pass `data` from
 * /astrology/horoscope/{sign}/{daily|weekly|monthly|yearly}.
 *
 * @remarks
 * A horoscope reads as prose end to end, but it is not one: the card has a real
 * data spine and `hide-readings` keeps all of it. The sign and its glyph, the
 * period and date, the energy meter, the sky strip (Moon sign, Moon phase and the
 * transits this reading was derived from), the dated events behind the reading,
 * the yearly themes, key periods, eclipses, retrogrades and best months, the
 * lucky number, colour, days and compatible signs, and the monthly key dates all
 * stay. The reading itself goes, in whichever shape it was rendered, along with
 * the week-by-week focus and advice. Each prose block carries its own heading, so
 * each goes whole rather than leaving one over nothing.
 *
 * The reading arrives in two shapes and the endpoint serves both: `column` is the
 * whole piece ready to run, and the six topic fields are that same reading split
 * by subject. Rendering both would print it twice, so {@link RoxyHoroscopeCard.layout}
 * picks one.
 *
 * Two values on an event are canonical English in every language, by contract, so
 * they stay safe to switch on: the bodies and the aspect. Both are drawn as glyphs
 * here, which reads the same in every language, with the name beside the glyph.
 */
export declare class RoxyHoroscopeCard extends RoxyDataElement<HoroscopeData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    period: HoroscopePeriod;
    /**
     * Which shape the written reading takes: the whole `column`, or the six topic sections.
     *
     * @remarks
     * The endpoint returns both and they are the SAME reading split two ways, so rendering both
     * would print it twice. `auto` prefers the column and falls back to the sections for a
     * response that carries none, which is what keeps an older payload rendering exactly what it
     * always did. Pin `column` or `sections` where the page wants one shape whatever arrives.
     *
     * `hide-readings` outranks this: both shapes are the reading, and both go.
     */
    layout: 'auto' | 'column' | 'sections';
    protected renderData(d: HoroscopeData): import("lit").TemplateResult<1>;
    /**
     * The written reading, in exactly one of its two shapes.
     *
     * @remarks
     * `overview` belongs to the sections rather than standing above them: it is one of the six
     * topic fields the column is the undivided form of, so rendering it beside the column would
     * print its opening twice.
     */
    private renderReading;
    /** The column as the API set it: one paragraph per blank-line break, never one wall of text. */
    private renderColumn;
    /**
     * A written field as the paragraphs the API set in it.
     *
     * @remarks
     * Every long field separates its paragraphs with a blank line, and a blank line inside a text
     * node collapses to a single space, so a field rendered as one node loses every break the
     * editor made. The column and each topic section are the same reading split two ways, so both
     * go through here rather than the column alone.
     */
    private paragraphs;
    /**
     * The dated sky events the reading was built from: what happened, when to the second, and
     * which house it lands in for this sign.
     *
     * @remarks
     * This is the auditable half of a horoscope and it survives `hide-readings`: every row is a
     * dated instant rather than a claim about one. The visible time is written in the reader's own
     * zone and locale, while the `datetime` attribute carries the exact UTC instant the response
     * gave, to the second and unrounded, which is the value anyone verifying the reading needs.
     */
    private renderEvents;
    /**
     * The bodies an event involves, with the aspect symbol between them where there are two.
     *
     * @remarks
     * `bodies` and `aspect` are canonical English in every language by contract, so a caller can
     * switch on them. That makes the glyph the part a non-English reader recognises, and the name
     * beside it is the English the response sent rather than a translation this card invented.
     */
    private renderEventBodies;
    /**
     * The four dated yearly lists and the best-month tiles.
     *
     * @remarks
     * All five are data and none is gated: a theme is a body in a house between two dates, a key
     * period is a date range, and a best month carries the aspect count it was chosen on. The
     * `theme` and `focus` strings say what a house governs and read the same for every response,
     * so they are the gloss a row is read through rather than a claim about this reader.
     */
    private renderYear;
    /** The easiest month of the year per life area, with the harmonious-aspect count it was picked on. */
    private renderBestPeriods;
    /**
     * One row of a dated list: when it happens, what happens, and the qualifiers under it.
     *
     * @remarks
     * Shared by the events trail and all four yearly lists so they read as one table rather than
     * five layouts. `when` is a plain string for a date or a range and an element where the row
     * needs a machine-readable instant, which is why the caller says which it passed.
     */
    private renderRow;
    /** A glyph and the name it stands for. The glyph is decorative because the name is right beside it. */
    private glyphName;
    /**
     * The sky behind the reading (daily only): where the Moon is, what phase it is in, and the transits the forecast was derived from. A daily horoscope that hides its transits is a fortune cookie; showing them is what makes this one auditable.
     */
    private renderSky;
    /** Monthly arc: the week-by-week focus and the dated events (lunations, retrogrades, ingresses) the month turns on. */
    private renderMonth;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-horoscope-card': RoxyHoroscopeCard;
    }
}
export {};
