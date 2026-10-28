import type { CalculateConnectionResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Connection = CalculateConnectionResponse;
/**
 * Human Design connection chart. Renders /human-design/connection: the composite of two charts as the electromagnetic / compromise / dominance channels they form together, plus the combined definition and a summary. The HD analog of synastry. Each channel row shows its two gates, name, circuit, the relationship dynamic, and which person carries which gate.
 *
 * @remarks
 * The chart answers one question: what exists between these two that does not exist in either of them alone. It leads with the combined bodygraph, drawn on the same geometry a single chart uses with each gate marked for whoever carries it, then the combined centers, then the channel list. `defined` is the state of the COMBINED bodygraph, `definedBy` names who already defines that center in their own chart, and the gap between the two is the reading: a center that comes back defined with an empty `definedBy` is defined by the connection itself, present when the two are together and absent when they are apart.
 *
 * The four dynamics are the taxonomy the summary counts, and a bare count of "Dominance: 2" means nothing to a reader who does not already know the system, so each one carries its definition behind the shared disclosure rather than shipping as a bare label.
 */
export declare class RoxyHdConnection extends RoxyDataElement<Connection> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly chartViewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /**
     * The combined bodygraph the two charts make together, on the same geometry a
     * single chart uses.
     *
     * @remarks
     * A gate is marked for whoever carries it, so a channel each person half owns
     * draws in two colours and a channel one person holds outright draws in one.
     * That is the electromagnetic and dominance distinction the summary counts,
     * shown rather than tallied. Centers take the COMBINED state, which is the
     * chart the two of them are when together; who defines one alone is named in
     * the centers section, where the chip can say it in words.
     */
    private renderChart;
    protected renderData(d: Connection): import("lit").TemplateResult<1>;
    /**
     * The four ways two charts can meet in a channel, in canonical order, each with what it means. The count is the aside, so the taxonomy and the tally read as one thing: a dynamic with no channels still shows, because its absence is as much a fact of the connection as its presence.
     */
    private renderDynamics;
    /**
     * The nine centers of the combined chart. `defined` is the combined state and `definedBy` is who carries it alone, so the two together say whether a center is brought to the connection or created by it.
     */
    private renderCenters;
    /**
     * Every connected channel. The centers a channel joins are named, not left as ids, because the row is what explains a defined center in the block above: this is the wiring that produced it.
     */
    private renderChannels;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-hd-connection': RoxyHdConnection;
    }
}
export {};
