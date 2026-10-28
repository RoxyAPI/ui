import type { GetMonthlyEphemerisResponse, GetMonthlyTropicalEphemerisResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * The two monthly-ephemeris responses this table renders. Structurally
 * identical: the Western one carries fourteen tropical bodies, the Vedic one
 * the nine sidereal Navagraha, and neither says which frame it is in, so the
 * component never claims one (see the class docblock).
 */
type EphemerisResponse = GetMonthlyTropicalEphemerisResponse | GetMonthlyEphemerisResponse;
/**
 * Monthly ephemeris: every body read across a whole month, as the reference
 * table a practitioner works from plus the two things a month view exists to
 * answer.
 *
 * @remarks
 * Renders `POST /astrology/planets/monthly` (fourteen tropical Western bodies)
 * and `POST /vedic-astrology/planetary-positions/monthly` (the nine sidereal
 * Navagraha). One response shape, so one component; nothing selects between
 * them, because the payload is the only honest discriminator and the layout is
 * the same either way.
 *
 * **The grid follows the published ephemeris, which is one of the most
 * convention-bound artifacts in astrology and where a deviation reads as
 * amateurish on sight.** Days run DOWN the rows with the weekday beside
 * the day number, bodies run ACROSS the columns headed by their glyphs, a cell
 * is `9♌16` with the sign glyph BETWEEN the degree and the minutes rather than a
 * decimal longitude, retrograde is marked in the cell, and the sign changes and
 * direction changes are listed separately beside the grid, which is what those
 * publications call Ingresses and Stations. One deliberate deviation, and it is
 * additive: a printed ephemeris prints the sign glyph only on the row where it
 * changes, because a reader has the whole page in view. A scrolling table has no
 * such anchor, so every cell carries its glyph and the ingress cell is marked by
 * an accent rule instead, which makes the same day easier to find rather than harder.
 *
 * **Two blocks, both always in the page, and the order is the reading order.**
 * A month of daily positions is 31 rows by up to 14 bodies, and dumping that
 * alone answers "where was Mars on the 12th" while burying the questions a
 * practitioner actually opens an ephemeris for: when did a body change sign,
 * and when did it turn retrograde. So the derived answer leads. Each body gets
 * one row carrying its position on the first and last sampled day, a chip per
 * sign it entered with the date, and a chip per retrograde stretch. This is also
 * how the published tables separate the Moon, which changes sign every two or
 * three days and would otherwise swamp a single date-ordered ingress list: one
 * row per body puts its thirteen crossings on their own line. Below it, the full
 * daily grid, so every chip can be checked against the day it came from. Neither
 * block is behind a tab or a disclosure, and the grid scrolls inside its own box
 * so a phone never scrolls the page sideways.
 *
 * **Ingresses and retrograde windows are DERIVED from consecutive days, and the
 * grain of the answer is the grain of the sample.** The API returns one
 * position per day at noon UTC, so an ingress is dated to the first day the
 * body is shown in the new sign and a retrograde run to the first and last days
 * it is shown retrograde. The true crossing and the true station fall somewhere
 * in the preceding 24 hours; a month page cannot say where, and pretending to a
 * time the response does not carry would be the worse error. A run that reaches
 * either edge of the month is clipped there rather than extrapolated, so
 * `Retrograde Aug 1 - Aug 31` means what it says: retrograde on every day this
 * month.
 *
 * **No coordinate-system badge, deliberately.** The Western endpoint is always
 * tropical, but the Vedic one takes `coordinateSystem` as a REQUEST parameter
 * (`sidereal` by default, `tropical` on request) and echoes nothing about it in
 * the response, and neither response carries a `frame`. A card cannot label a
 * zodiac it was not told, and a wrong frame label on an ephemeris is worse than
 * none, so the roster of bodies is left to say what it says.
 *
 * `hide-readings` is a no-op here: neither endpoint returns a word of
 * interpretation, so there is nothing to take away.
 */
export declare class RoxyEphemerisTable extends RoxyDataElement<EphemerisResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Override the card heading. Empty keeps the default, which is translated like every other chrome string. */
    heading: string;
    protected renderData(data: EphemerisResponse): unknown;
    /**
     * The glyph-to-name key, above the table it explains.
     *
     * @remarks
     * Every position in this component prints its sign as a glyph, which is how a
     * printed ephemeris prints one and is unreadable to somebody still learning
     * them. The name rides on each cell's `title`, and a title is a hover: it does
     * not exist on touch and it cannot be read down a column. A key that names all
     * of them once is the form the page actually needed.
     *
     * `part="section legend"` rather than a name of its own, because a page hiding
     * legends should hide this one too and the vocabulary is shared across every
     * component.
     */
    private renderSignKey;
    /** One body across the month: where it started, where it ended, and every change in between. */
    private renderTrack;
    /**
     * A longitude the way a published ephemeris prints one: `9♌16`, degree then
     * sign then minutes. The sign name rides on the `title` for a reader who does
     * not read glyphs, and it is the localized half.
     */
    private renderPosition;
    private renderIngressChip;
    private renderRetrogradeChip;
    /** The reference ephemeris: one row per day, one column per body, in the order the response lists them. */
    private renderGrid;
    private renderCell;
    /**
     * Walk the month once, keying every body on its canonical English name.
     *
     * @remarks
     * The column order is the order the response lists bodies on its first day,
     * which is the order each domain reads them in (Sun through Pluto then the
     * nodes, Chiron and Black Moon Lilith for the Western set; the Navagraha in
     * vara order for the Vedic one). A body that only appears on a later day is
     * appended rather than dropped, and a body missing from a given day leaves
     * that one cell empty instead of shifting the row.
     */
    private toViewModel;
    /**
     * The signs this month's table actually prints, in zodiacal order.
     *
     * @remarks
     * Read from the response rather than from the twelve-sign constant, so the key
     * explains the glyphs ON THIS PAGE and nothing else. In practice the Moon
     * crosses every sign in a month, so a full month lists all twelve anyway; a
     * partial range lists only what it contains, which is the point.
     *
     * The label is the API's own localized sign name, taken the same way every
     * other sign name in this component is taken. Translating it here instead
     * would put a second vocabulary on the page and let the key disagree with the
     * cells it explains.
     *
     * Ordered by {@link SIGNS_ORDER} because first-seen order is the order the
     * bodies happen to sit in on the first of the month, which is meaningless to a
     * reader learning the glyphs.
     */
    private toSignKey;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-ephemeris-table': RoxyEphemerisTable;
    }
}
export {};
