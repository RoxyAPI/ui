import type { CalculateEntrancePadaResponse, GenerateMandalaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type VastuData = GenerateMandalaResponse | CalculateEntrancePadaResponse;
/**
 * Vastu Purusha Mandala. Pass `data` from POST /vastu/mandala, or set `mode="entrance"` and pass
 * POST /vastu/entrance.
 *
 * @remarks
 * **North is the top of the drawing and west is the left, and the four edges say so.** The response
 * numbers every square by its row from the north and its column from the west, so a drawing on any
 * other orientation would contradict the field names a developer reads beside it. The edge labels
 * are there because a reader arrives holding a plate drawn some other way round, and a grid that
 * does not name its own orientation cannot be laid over a site plan.
 *
 * **Everything drawn comes from the response, including the geometry.** The square centres, the
 * brahmasthan corners and the vamsa endpoints all arrive in plot coordinates, so the lattice is read
 * off the centres and the other two are mapped onto it. Recomputing any of them here would put a
 * second implementation of the projection in front of the one the verses were read into.
 *
 * **A square whose centre falls outside an irregular plot is drawn and marked, never dropped.** The
 * mandala is projected over the whole bounding box; a missing corner is a fact about the ground
 * rather than a gap in the grid, and deleting those squares would silently renumber nothing while
 * making the plate unreadable against the plan.
 *
 * **The entrance read draws the same grid with the door square lit, and nothing else on it.** That
 * response names the door square and no other, so the favourable padas it also returns are listed as
 * numbers rather than placed: siting them would mean reimplementing the pada to square mapping the
 * chapter fixes, and a second implementation of that is exactly what a reader is checking us against.
 * `mode` says which read was asked for and the shape check narrows under it, so a page that asked
 * for the projection never grows a door its endpoint did not return.
 *
 * `hide-readings` keeps the whole grid, the devatas, the brahmasthan, the vamsa lines, the crossing
 * points, the door square, its pada number and its citation. The verse effect and the composed
 * verdict sentence go.
 */
export declare class RoxyVastuMandala extends RoxyDataElement<VastuData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which read the response is: the projected grid, or the entrance pada on it. */
    mode: 'mandala' | 'entrance';
    protected renderData(d: VastuData): import("lit").TemplateResult<1>;
    /** The grid itself: every square, the brahmasthan, the vamsa lines and the door, north at the top. */
    private renderGrid;
    /** One square of the projection, placed by its own row and column. */
    private renderCell;
    /**
     * One square: its fill, its number and the devata holding it.
     *
     * @remarks
     * Shared by the projection and the entrance read so the two cannot draw the same square two
     * different ways, which is the whole reason a reader can lay one card over the other.
     */
    private renderPada;
    /** The bare lattice, for the entrance read, which names one square and no others. */
    private renderEmptyGrid;
    /** The square the main door falls on, lit and numbered with its pada. */
    private renderDoor;
    /** The six diagonals of 53.63, drawn from the endpoints the response gives in plot coordinates. */
    private renderVamsa;
    /** The central block, drawn from the corners the response returns rather than from the square list. */
    private renderBrahmasthan;
    /** Where the six diagonals cross, which the response names by square rather than by coordinate. */
    private renderAtimarma;
    /**
     * Every devata on the projection, with the squares it holds.
     *
     * @remarks
     * The names are the one thing a nine by nine plate cannot draw at a readable size on a phone, and a
     * square title is unreachable on a touch screen, so they are listed once here at the card's own text
     * size. Grouped by devata, because several hold more than one square and a reader looks a name up
     * rather than reading eighty one rows; the squares inside a group ascend, so a number read off the
     * plate is found here. The division that names no devatas renders no list.
     */
    private renderDevatas;
    /**
     * What the fills mean.
     *
     * @remarks
     * The outside-the-plot key is drawn only when a square actually falls outside one, because a
     * legend entry for a fill nothing on the drawing carries reads as a missing feature.
     */
    private renderLegend;
    /** The numbers a reader takes off the projection or the entrance read. */
    private renderFacts;
    /** Every verse the drawing rests on, or the convention where no verse states the rule. */
    private renderSources;
    /**
     * An area in the square of the plot unit: the number plus the standard symbol for the wire unit
     * the response echoed, with the catalogue's own word for that unit as the `title`, one hover
     * away and translated.
     *
     * @remarks
     * The symbol is fixed on the WIRE value, not read out of the field-label catalogue: `ft²` and
     * `m²` are what every practitioner writes whatever language the card is in, and hanging a
     * superscript off a translator's word is not that convention. `conventions.unit` is absent on a
     * payload from before the API started echoing it, and a default here would be a guess about
     * which unit the reader actually sent, so the bare number prints on its own with no title.
     */
    private areaLabel;
    /** The name of one ring, falling back to the wire id for a class the API might add. */
    private ringLabel;
    /** How the stated effect reads, falling back to the wire value. */
    private verdictLabel;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vastu-mandala': RoxyVastuMandala;
    }
}
export {};
