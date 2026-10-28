import type { CalculatePentaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type Penta = CalculatePentaResponse;
/**
 * Human Design penta. Renders /human-design/penta: the group field (3 to 5 people) as the penta channels they form, split into the upper (direction) and lower (execution) triangles, with each channel marked defined or open and core or not, and which members hold each gate. The team/business chart.
 *
 * @remarks
 * The penta is the only Human Design chart whose subject is a group rather than a person, so every row answers "who supplies this" as well as "is it there". The response reports that as zero-based indices into the member list that was sent, which is the one thing a card must not print raw: members are lettered instead, A for the first member sent, and the footnote says so.
 *
 * The ladder above them is the same data drawn: three bars for the Throat, the G and the Sacral, the six channels as rungs between them, solid where the group completes one and dashed where it does not, with each gate lettered for whoever holds it.
 *
 * Read in two passes. The channels are the functions the group performs, and a channel is a defined Strength only when both of its gates are held somewhere in the group, so the attribution line under each one shows which member carries which end. The twelve gates below are the same data seen per role, and they are where a gap shows up as itself: a gate held by nobody, which the summary also counts.
 *
 * Every word of prose on this card is written here rather than returned by the endpoint, and that changes nothing about the line: the lead, the two triangle notes, the gates note and the Core footnote are the written report on the chart, so `hide-readings` takes them the same way `roxy-hd-connection` takes its own. What stays is the whole penta: the facts, both triangle headings, every channel with its gates, circuit, defined and core chips and its per-member attribution, and every gate row with its gap chip. The member-lettering footnote stays with them, because it is the legend those attributions are read through and the rows are undecodable without it.
 */
export declare class RoxyHdPenta extends RoxyDataElement<Penta> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly chartViewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** The ladder: the six rungs and who holds each gate, drawn from the same data the rows below read. */
    private renderChart;
    protected renderData(d: Penta): import("lit").TemplateResult<1>;
    /**
     * One triangle of the penta. The note is what the triangle does, so it sits with the heading rather than being repeated on each of its three channels.
     */
    private renderGroup;
    /**
     * The twelve penta gates, each with the role it brings and the members who carry it. A gate nobody holds is the gap the summary counts, so it is flagged rather than left as an empty attribution.
     */
    private renderGates;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-hd-penta': RoxyHdPenta;
    }
}
export {};
