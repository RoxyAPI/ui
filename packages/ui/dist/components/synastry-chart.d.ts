import type { CalculateSynastryResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/** Kept exported from here for consumers that import it from the component subpath. */
export { SYNASTRY_TYPE_SIZES } from '../utils/synastry-wheel.js';
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
    private renderAspects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-synastry-chart': RoxySynastryChart;
    }
}
