import type { TemplateResult } from 'lit';
/**
 * Fixed geometry and renderer for the Human Design penta, the group figure.
 *
 * @remarks
 * The penta is a ladder rather than a bodygraph: three horizontal bars for the Throat, G and Sacral, with the six channels as evenly spaced rungs between them, three above the G and three below. Its channels do sit on bodygraph gates, so {@link GATE_CENTER} decides which end of a rung a gate takes and which row it belongs to, rather than the order a pair is listed in.
 */
/** One rung: its two gates, its name, and whether the group completes it. */
export interface PentaRung {
    gateA: number;
    gateB: number;
    name: string;
    defined: boolean;
    isCore: boolean;
}
/** Who holds a gate, as the member indices the response reports. */
export type PentaHolders = ReadonlyMap<number, readonly number[]>;
export declare const PENTA_VIEWBOX = "0 0 360 470";
export interface PentaRenderInput {
    rungs: readonly PentaRung[];
    holders: PentaHolders;
    /** How a member index is named on the chart, so the badge and the rows below read the same. */
    letterFor: (index: number) => string;
}
/**
 * Render the penta inner content. The caller wraps it in an `<svg>` with
 * {@link PENTA_VIEWBOX} and applies its own theming CSS.
 */
export declare function renderPentaSvg(input: PentaRenderInput): TemplateResult;
