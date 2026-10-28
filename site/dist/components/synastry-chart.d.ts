import type { CalculateSynastryResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * The in-wheel type sizes at a wide host, in user units, as the stylesheet
 * declares them: what the fan spaces the marks by until the rendered text has
 * been measured, and what a unit test draws on. The phone sizes live in the
 * stylesheet alone and are read back off the rendered text, never assumed.
 */
export declare const SYNASTRY_TYPE_SIZES: {
    readonly glyph: 18;
    readonly degree: 10;
};
/**
 * Dual-wheel synastry chart with inter-aspects table. Pass `data` from
 * /astrology/synastry.
 */
export declare class RoxySynastryChart extends RoxyDataElement<CalculateSynastryResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly viewport;
    /** The in-wheel type sizes the stylesheet actually applied, read back after each render, because the fan spaces the marks by the width of their text and that width follows the container query. */
    private readonly type;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: CalculateSynastryResponse): import("lit").TemplateResult<1>;
    /** Chart highlights for both people: the Sun, Moon, and Ascendant a reader checks before any aspect. Colour-dotted to match each person ring on the wheel. */
    private renderPeople;
    /**
     * The house overlay, both directions: which of the other person's houses each planet falls into.
     *
     * @remarks
     * **This is the half of synastry the inter-aspects do not cover.** An aspect says two bodies are
     * in relationship; an overlay says which area of the other person's life a body lands in, which
     * is the reading a practitioner gives as "your Venus falls in their seventh". The response
     * carries it per planet for both people, so both directions render: they are different readings,
     * not one fact seen twice, and showing one would be half the answer.
     *
     * Each row also keeps the planet's OWN house, because the two are easy to confuse and the
     * response is explicit that they are different numbers. Printing the overlay alone would leave a
     * reader unable to tell which chart a house number belongs to.
     *
     * Data, not reading, so `hide-readings` leaves all of it standing.
     *
     * **The wheel does not draw this and cannot yet**: a synastry response carries each person's
     * ascendant but no house cusps, so the ring the overlay is counted against is not in the
     * payload, and deriving it would mean assuming a house system the API did not use.
     */
    private renderOverlay;
    /** One direction of the overlay: every planet of `from`, read against the houses of `to`. */
    private renderOverlayTable;
    /** Contact balance for the pair, as plain counts. `byType` is a map, so its pairs are rendered, never the object. */
    private renderSummaryCounts;
    /**
     * One inter-chart contact as a reading. The header is the scannable line (both bodies, the aspect in its family colour, as on the wheel, orb and strength); the body leads with `meaning.relationshipContext`, which is the whole point of a synastry aspect: not what a trine means, but what THIS trine does to THESE two people.
     */
    private renderAspectCard;
    private renderAspectMeaning;
    /** Every remaining contact, so nothing the endpoint returned is dropped. */
    private renderCatalog;
    /** Person 1's Ascendant sits at nine o'clock and the zodiac runs anticlockwise from it, as on a natal wheel; with no Ascendant, 0 Aries takes that place. */
    private toAngle;
    private renderSpokes;
    private renderSigns;
    /**
     * One person's ring, fanned apart only as far as legibility demands.
     *
     * @remarks
     * A stellium is ordinary in a real chart and drawing every glyph at its
     * exact angle prints the cluster as one mark. {@link fanOut} pushes a
     * crowded member forward and a thin leader runs from the glyph outward to a
     * tick at its TRUE longitude, into the gap above the ring, so the drawing
     * never claims a position the response did not give. The separation is
     * settled per pair from the measured width of each mark at its own radius,
     * and `labelRadius` is where a degree label sits along its glyph's ray.
     */
    private renderRing;
    /**
     * Ascendant markers for both people. Drawn as short ticks outside the rim
     * with the label beyond them, the way the natal wheel marks its angles, so
     * the two rising signs are immediately scannable without depending on
     * tooltips.
     */
    private renderAscendants;
    private renderInterAspectLines;
    private renderAspects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-synastry-chart': RoxySynastryChart;
    }
}
