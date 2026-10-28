import './aspects-table.js';
import './western-planets-table.js';
import type { CalculateTransitAspectsResponse, NatalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * The in-wheel type sizes at a wide host, in user units, as the stylesheet
 * declares them: what the fan spaces the marks by until the rendered text has
 * been measured, and what a unit test draws on. The phone sizes live in the
 * stylesheet alone and are read back off the rendered text, never assumed.
 */
export declare const TRANSIT_TYPE_SIZES: {
    readonly glyph: 18;
    readonly degree: 10;
};
/**
 * Natal and transit bi-wheel: the natal chart on the inner ring, the transiting
 * bodies on the outer ring, and a line for every major transit-to-natal aspect the
 * response returns. Pass `data` from /astrology/transit-aspects.
 *
 * @remarks
 * **Nothing astrological is computed here.** Every aspect line is drawn from an
 * entry in the response `aspects` array; the only arithmetic is placing a
 * longitude on a circle. `planet1` is the TRANSITING body and `planet2` the
 * NATAL one, which was settled empirically rather than from the field
 * description because reading them the other way round still draws a
 * plausible-looking wheel: against a live response every one of the 70 returned
 * orbs reconciles with the transit-to-natal separation, and only 4 with the
 * reverse.
 *
 * **The response carries real houses, and it did not always.** Every body comes
 * back with a `house` read against the NATAL cusps (a transiting body reports the
 * natal house it is currently passing through) plus a top-level `houseSystem`.
 * The fourteen natal house numbers reconcile body
 * for body with /astrology/natal-chart for the same birth data, and requesting
 * `whole-sign` moves them. An earlier revision of the API did return `1` for
 * every body, and the comment saying so outlived the fix and went on justifying a
 * missing House column for months. The numbers are rendered, in their own
 * columns, labelled with the system the response names.
 *
 * **The GEOMETRY arrived next, and the wheel now draws itself.** The response also
 * carries the twelve natal cusps as `houses` and the natal `ascendant`, the same
 * twelve the house numbers above were read against, so the sector ring and the
 * real horizon come out of the one call the page already made. That closed the
 * house-less bi-wheel every embed drew through WordPress, /embed and the CDN
 * widgets, none of which can compose a second call. {@link RoxyTransitWheel.houses}
 * and {@link RoxyTransitWheel.ascendant} remain as OVERRIDES and keep winning
 * where a page sets them, which is what a stored response predating the fields,
 * or a trimming proxy, needs.
 *
 * **Nothing is ever derived, whichever source it came from.** A payload with
 * neither field still fixes 0 degrees Aries on the left horizon, says so in the
 * legend and in the SVG description rather than leaving a reader to discover it,
 * and draws no house divisions at all. Equal sectors derived from an Ascendant
 * and labelled with a quadrant system would replace one false statement with a
 * worse one. Every cusp on this wheel is a longitude some source stated, placed
 * on a circle, never one this component worked out.
 */
export declare class RoxyTransitWheel extends RoxyDataElement<CalculateTransitAspectsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly viewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Heading above the wheel. The default is translated; a heading the page sets is passed through the catalogue too, so a host that supplies its own English wording still gets it localized when one is registered for it. */
    heading: string;
    /**
     * Natal Ascendant as an ecliptic longitude in degrees (0-360), to override the
     * one the response carries.
     *
     * @remarks
     * Leave it unset on a live /astrology/transit-aspects response: that endpoint
     * returns the natal `ascendant` and the wheel reads it, so the horizon is
     * right with no page wiring at all. Set it only to orient the wheel on a
     * DIFFERENT horizon than the response describes, or to give one to a payload
     * that carries none. Either way it ROTATES the wheel so the given longitude
     * falls on the left horizon and draws the ASC/DSC axis. It draws no house
     * divisions, because a rotation is not a cusp; that is what
     * {@link RoxyTransitWheel.houses} is for. With neither the prop nor a payload
     * ascendant the wheel falls back to the honest default: 0 degrees Aries on
     * the left.
     */
    ascendant?: number;
    /**
     * The twelve natal house cusps, to override the ones the response carries.
     * Takes the /astrology/natal-chart `houses` array verbatim, or twelve bare
     * cusp longitudes in house order.
     *
     * @remarks
     * Leave it unset on a live /astrology/transit-aspects response: that endpoint
     * returns the same twelve natal cusps its house numbers are read against, so
     * the sector ring draws itself. Set it to draw a different cusp set than the
     * response carries, or to give one to a payload that carries none (a stored
     * response predating the field, or a proxy that trims it). Supplying either
     * source draws the twelve cusp lines and their numbers and, unless an
     * ascendant is also available, rotates the first cusp onto the left horizon.
     *
     * Both accepted shapes exist because the natural source is a natal-chart
     * response a host already holds, and passing `chart.houses` straight through
     * has to work; twelve numbers is the terser form for a host that stored only
     * the longitudes. Anything that does not resolve to houses 1 to 12 with finite
     * longitudes is ignored outright rather than half drawn, which is the same
     * degrade-honestly rule the rest of this component follows: a partial house
     * ring is a claim about placements the wheel cannot support.
     */
    houses?: NatalChartResponse['houses'] | number[];
    /** The in-wheel type sizes the stylesheet actually applied, read back after each render, because the fan spaces the marks by the width of their text and that width follows the container query. */
    private readonly type;
    /**
     * The Ascendant longitude the wheel orients on, or undefined.
     *
     * @remarks
     * The PROP wins over the payload wherever both exist: a page that passes one
     * has said something the response cannot know, and silently preferring the
     * response would make the prop dead on exactly the responses that carry the
     * field.
     */
    private get effectiveAscendant();
    /** True when an ascendant is available at all, so the ASC/DSC axis is a real horizon rather than one derived from a cusp. */
    private get ascendantGiven();
    /** True when the sector ring came from the page rather than from the response, so the legend can say which. */
    private get cuspsFromPage();
    /**
     * The cusps to draw, normalized to houses 1 to 12 in order, or null. The prop
     * first, then the ones the response carries, on the same precedence rule as
     * {@link RoxyTransitWheel.effectiveAscendant}.
     *
     * @remarks
     * Sorted by house number rather than trusted in array order, and rejected
     * whole unless the twelve numbers are exactly 1 to 12 with finite longitudes.
     * A cusp set that fails either check is not a house division, and drawing part
     * of one would put a sector boundary where the host never claimed there was
     * one. A malformed PROP is rejected outright rather than falling through to
     * the payload: the page overrode the response on purpose, and quietly drawing
     * the response cusps under a bad override would be a different chart than
     * either source asked for.
     */
    private get cusps();
    /**
     * Ecliptic longitude to SVG angle. 0 degrees is at 3 o'clock and positive
     * angles run clockwise on screen, so subtracting the longitude makes the
     * zodiac run counterclockwise, which is how a chart wheel is read. The 180
     * offset puts the reference point on the left horizon: the supplied Ascendant
     * first, else the supplied first house cusp, else 0 Aries.
     *
     * The Ascendant wins because the two are not the same longitude under every
     * system: whole-sign puts cusp 1 at 0 degrees of the rising sign, which can be
     * most of a sign away from the Ascendant itself.
     */
    private toAngle;
    protected renderData(d: CalculateTransitAspectsResponse): import("lit").TemplateResult<1>;
    /**
     * What sits on the left horizon, in words. Rendered as a legend chip AND as a
     * sentence of the SVG description, from this one getter, so the drawing and
     * its accessible text cannot end up claiming different orientations.
     */
    private get orientationCaption();
    /**
     * Whether the twelve sectors on the wheel are real cusps, in words, and where
     * they came from. Same dual use as {@link RoxyTransitWheel.orientationCaption}.
     *
     * @remarks
     * The source is named because the caption is provenance: a reader
     * reconciling this wheel against another calculator needs to know whether the
     * cusps are the ones the endpoint computed the house numbers against, or a set
     * the page substituted for them.
     */
    private get cuspCaption();
    private renderWheel;
    /** A short mark every 5 degrees and a longer one on each sign cusp, so the band reads as a degree scale rather than a bare ring. */
    private renderTicks;
    /** Twelve sign boundaries, drawn from the inner ring outward. Solid, and always exactly 30 degrees apart: house cusps are the dashed lines from {@link RoxyTransitWheel.renderHouses} and only exist when a cusp set is available. */
    private renderSpokes;
    /**
     * The twelve house sectors, drawn ONLY from cusps some source stated: the ones
     * the response carries, or the {@link RoxyTransitWheel.houses} override.
     *
     * @remarks
     * Dashed and inset to the sign band, because the solid spokes beside them are
     * sign boundaries and a reader who cannot tell the two apart cannot reconcile
     * the chart against another calculator. Each number sits at the arc midpoint
     * of its own sector, so an unequal house carries its label inside itself; the
     * hub is the one band on this wheel with nothing else in it.
     *
     * Nothing here is derived. With no cusps available this renders nothing at all
     * rather than twelve equal sectors from the Ascendant, which would be a
     * different chart wearing the same label.
     *
     * **Known and accepted: a fanned glyph can sit one sector off.** {@link fanOut}
     * displaces a crowded glyph in ANGLE, so a body a degree inside a cusp can be
     * drawn just past it; measured on a real Capricorn stellium, the natal Sun
     * glyph landed in the ninth sector while the body is in the eighth. The leader
     * runs back to a tick at the true longitude and the House column is the
     * authoritative number, which is the same trade professional chart software
     * makes. Do not "fix" it by clamping a glyph to its sector: that would move the
     * mark AND still not be the position.
     */
    private renderHouses;
    private renderSigns;
    /**
     * One ring of bodies, fanned apart only as far as legibility demands.
     *
     * @remarks
     * A real transit chart stacks four bodies inside a couple of degrees often
     * enough that drawing every glyph at its exact angle makes the inner ring
     * unreadable, degree labels printed over each other included. {@link fanOut}
     * pushes a crowded member forward and a thin leader line runs from the glyph
     * back to a tick at its TRUE longitude, so the drawing never claims a position
     * the response did not give. The separation is derived from the radius, so the
     * inner ring automatically asks for more degrees of arc than the outer one for
     * the same glyph.
     *
     * `leaderSign` points that tick outward from the natal ring and inward from
     * the transit ring, i.e. always into the gap between the two, so a leader is
     * never mistaken for one of the aspect lines crossing the middle, and
     * `labelRadius` is where a degree label sits along its glyph's ray.
     */
    private renderRing;
    /** One line per returned major aspect, from the transiting body on the outer ring to the natal body on the inner one; the minors stay in the aspect list. */
    private renderAspectLines;
    /**
     * ASC and DSC ticks, drawn ONLY when an ascendant is available, from the prop
     * or from the response. Nothing is derived: the descendant is the exact
     * opposite point of that value.
     *
     * Gated on the ascendant alone, never on the cusps. Under whole-sign the first
     * cusp is 0 degrees of the rising sign rather than the Ascendant, so labelling
     * it ASC would be wrong on exactly the charts a traditional reader casts.
     */
    private renderAxis;
    /**
     * The key to the wheel, and the one place the orientation is stated in words.
     * A reader who cannot tell whether the divisions are signs or houses cannot
     * reconcile the chart against another calculator, so the caption is
     * provenance rather than decoration.
     *
     * `houseSystem` labels the house NUMBERS in the table, which is the only thing
     * the response can vouch for, and the cusp chip separately says where the
     * drawn sectors came from. Two statements, each true on its own, rather than
     * one chip implying the ring and the numbers share a source.
     */
    private renderLegend;
    /** Transit weather: the counts and the tightest contact. All of it is data, so all of it survives hide-readings. */
    private renderSummary;
    /** The tightest transit by orb: the one contact most likely to be felt, lifted out so it is not buried among seventy others. */
    private renderStrongest;
    /**
     * Both rings as exact positions, so every degree the wheel abbreviates to a
     * glyph stays readable and nothing the response carries is dropped.
     *
     * @remarks
     * The House columns are where the response's house numbers land, because the
     * wheel has no sectors to put them in unless a cusp set is available. Both
     * columns are read against the NATAL cusps: the transiting one is the natal
     * house that body is currently passing through, which is the whole point of a
     * transit report and is why the two are not the same fact under one heading.
     * `showHouses` comes from the payload rather than the type, so a response
     * without them loses the columns instead of printing a column of blanks.
     */
    private renderPositions;
    private renderPositionDetails;
    private renderAspectDetails;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-transit-wheel': RoxyTransitWheel;
    }
}
