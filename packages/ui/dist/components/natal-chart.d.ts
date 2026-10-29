import './aspects-table.js';
import './western-planets-table.js';
import type { NatalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * The in-wheel type sizes at a wide host, in user units, as the stylesheet
 * declares them: what the fan spaces the marks by until the rendered text has
 * been measured, and what a unit test draws on. The phone sizes live in the
 * stylesheet alone and are read back off the rendered text, never assumed.
 */
export declare const NATAL_TYPE_SIZES: {
    readonly glyph: 14;
    readonly degree: 7;
};
/**
 * The chart shape the wheel actually renders.
 *
 * @remarks
 * `RelocationChartResponse` carries the same planets, houses, angles and birth details as `NatalChartResponse` (`RelocationPlanet` is field-for-field identical to the natal planet item), and differs only by having no `aspects`, `aspectsInterpretation`, `patterns`, `partOfFortune` or `summary`. The wheel already renders without them, so those five are simply optional here.
 *
 * Typing that contract is what lets {@link RoxyRelocationWheel} compose this component honestly: it hands over a response the type actually describes, rather than a double cast asserting fields the payload may not carry.
 */
type ChartExtras = 'aspects' | 'aspectsInterpretation' | 'patterns' | 'partOfFortune' | 'summary';
export type WheelChart = Omit<NatalChartResponse, ChartExtras> & Partial<Pick<NatalChartResponse, ChartExtras>>;
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
    private getAscendant;
    private getMidheaven;
    /**
     * True when the response carried all twelve house cusps, so every house on the
     * wheel is a longitude the API sent rather than a 30 degree sector this
     * component invented. Read by the spokes, the numbers, the cusp degrees, the
     * accessible name and the legend, so the drawing and the words about it cannot
     * disagree about which chart is on screen.
     */
    private get hasCusps();
    private toAngle;
    protected renderData(data: WheelChart): import("lit").TemplateResult<1>;
    private renderWheel;
    /**
     * Planet-by-planet aspect grid: the lower-triangular matrix astrologers read
     * alongside the wheel. Each filled cell shows the aspect glyph colored by
     * nature, with the exact orb in the SVG-free `<title>` tooltip.
     */
    private renderAspectGrid;
    /**
     * The angle marks, fanned so two of them never print over each other.
     *
     * @remarks
     * Part of Fortune and the Vertex land wherever the chart puts them, and either
     * can fall within a couple of degrees of an axis, which is close enough for two
     * three-letter labels on one ring to become a single unreadable mash. They go
     * through the same {@link fanOut} the bodies do, so a crowded label steps
     * aside while its TICK stays at the true longitude and a leader joins the two.
     * The ring has about fourteen user units of margin left inside the viewBox, so
     * a crowded label cannot be pushed outward; it moves along the ring instead.
     */
    private renderAngles;
    private renderAngleMark;
    private renderSpokes;
    private renderSigns;
    private renderHouseNumbers;
    /**
     * Degree ticks on the outer zodiac band: a short mark every 5 degrees and a
     * longer one on each 30-degree sign cusp, so the wheel reads like a
     * reference-grade chart rather than a bare ring of glyphs.
     */
    private renderTicks;
    /**
     * Degree-and-minute label printed next to each house cusp on the wheel, so
     * the exact cusp position is readable without leaving the chart.
     */
    private renderCuspDegrees;
    /**
     * The bodies, fanned so a stellium stays readable.
     *
     * @remarks
     * Conjunctions inside a few degrees are the norm rather than the exception, so
     * every glyph is pushed forward only as far as it takes to clear its neighbour
     * and a leader runs back to the body's TRUE longitude on the rim. The
     * separation is derived from the radius each mark is drawn at rather than
     * fixed. The degree label is about twice as wide as the glyph, so it takes
     * two rows: a label that would touch the one before it drops to the inner
     * row, which is what lets the fan clear the GLYPHS and no more, so a stellium
     * stays near its houses with every degree still readable.
     *
     * Below the phone breakpoint the label is the whole degree, the rule the
     * transit wheel applies at every width: fourteen `dd°mm'` labels at the
     * compact size ask for more arc than the ring has, so fanning them would
     * carry every body away from its position to fit them. The minute stays in
     * the tooltip.
     */
    private renderPlanets;
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
    private renderAspects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-natal-chart': RoxyNatalChart;
    }
}
export {};
