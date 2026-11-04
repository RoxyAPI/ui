import './aspects-table.js';
import './western-planets-table.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { type WheelChart } from '../utils/natal-wheel.js';
/** Kept exported from here for consumers that import them from the component subpath. */
export { NATAL_TYPE_SIZES, type WheelChart, } from '../utils/natal-wheel.js';
/**
 * Western natal chart wheel. Renders the 12 zodiac signs, 12 houses, planet
 * markers, and aspect lines from a /astrology/natal-chart response.
 *
 * @remarks
 * **There is deliberately no `house-system` input, and re-adding one would be a
 * lie in the types.** The house system is a REQUEST parameter: /astrology/natal-chart
 * and /astrology/relocation-chart both take it and both echo the system they
 * actually used as a required `houseSystem` field, which is what the legend
 * chip reads. This component computes nothing astrological, so an attribute
 * could never move a cusp; all it could do is print a label contradicting the
 * cusps drawn beside it. One shipped anyway, declared and typed and wired
 * through both framework packages, and nothing ever read it, so a consumer who
 * followed our own generated types set it and got silence. Change the system in
 * the REQUEST (the self-fetch form already offers it, straight off the spec) and
 * the response relabels itself.
 *
 * **The equal-sector fallback is visible, on purpose.** With fewer than twelve
 * cusps in the response the wheel draws twelve equal 30 degree sectors from the
 * Ascendant, which is a different chart from a Placidus one; it says so in the
 * accessible name and in a legend chip rather than numbering the sectors 1 to 12
 * and letting a reader assume the response carried them.
 */
export declare class RoxyNatalChart extends RoxyDataElement<WheelChart> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly viewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Heading above the wheel. Defaults to "Natal chart"; reuse (e.g. the relocation wheel) sets its own. */
    heading: string;
    /** Which view is showing: the wheel or the planet-by-planet aspect grid. */
    private view;
    /** The in-wheel type sizes the stylesheet actually applied, read back after each render, because the fan spaces the marks by the width of their text and that width follows the container query. */
    private readonly type;
    private getPlanets;
    protected renderData(data: WheelChart): import("lit").TemplateResult<1>;
    private renderWheel;
    /**
     * Planet-by-planet aspect grid: the lower-triangular matrix astrologers read
     * alongside the wheel. Each filled cell shows the aspect glyph colored by
     * nature, with the exact orb in the SVG-free `<title>` tooltip.
     */
    private renderAspectGrid;
    private renderPositionDetails;
    private renderDetails;
    /** The all-body cross-tab and the API planet-only distributions keep their populations separate. */
    private renderElementModalityGrid;
    /**
     * Detected multi-planet configurations. Each card names the figure, tags the element or modality it pivots on, flags a dissociate (out-of-sign) figure, and puts the apex planet first with its own chip, because the apex is the point the whole configuration discharges through.
     *
     * @remarks
     * A pattern carries no localized partner for its `name`, `element`, `modality` or its `planets` list, so all four render English on every page. Do NOT translate the chips by looking each body up in `planets[].nameLocalized`: the response is the authority for its own vocabulary, and a second translation of the same fact assembled here is exactly what can end up disagreeing with the wheel beside it.
     *
     * **This block is DATA, so `hide-readings` thins it rather than removing it, and that split is deliberate.** A T-Square is a geometric fact about where the bodies sit, exactly like the aspect rows and the house cusps: the figure, its element and modality, its tightness and its planets are all measurements, and the only reading in the card is the paragraph, which {@link RoxyNatalChart.renderPattern} already drops. The line is the one the library states everywhere else and the one the docs promise: "wheels, maps, tables, grids, legends, badges and every number stay, the interpretive prose goes". `<roxy-aspects-table>` renders this identical `patterns` payload and makes the identical cut, so gating the whole block here would make the same figure appear and disappear depending on which component a page reached for.
     *
     * **A page that wants the block gone entirely has a lever, and it is not this flag.** The section carries `part="section patterns"`, so `roxy-natal-chart::part(patterns) { display: none }` removes it. That is the documented answer for dropping a block of DATA, the same way `::part(readings)` styles the interpretation; `hide-readings` is the answer for prose, and stretching it to cover measurements would leave a practitioner with no way to publish the figures without the words.
     */
    private renderPatterns;
    private renderPattern;
    private renderAspectDetails;
    private renderInterpretations;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-natal-chart': RoxyNatalChart;
    }
}
