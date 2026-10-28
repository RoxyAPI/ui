import { type ReactiveController, type ReactiveControllerHost } from 'lit';
import type { Translate } from './hd-reading.js';
type ChartHost = ReactiveControllerHost & {
    renderRoot: ParentNode;
};
/** An enlarged, scrollable chart with native modal focus and keyboard handling. */
export declare class ChartViewport implements ReactiveController {
    private readonly host;
    private state;
    private zoom;
    private position?;
    constructor(host: ChartHost);
    hostUpdated(): void;
    hostDisconnected(): void;
    private open;
    /** The pointer that pressed the drawing, read on press because some engines report a click that follows a tap as a mouse. */
    private pressedBy;
    private press;
    /** A mouse click on the drawing opens it too; a touch or pen tap, a keyboard press, a text selection or a click on a link or button inside it keeps its own meaning. */
    private openOnMouse;
    private reset;
    private resize;
    renderChartViewport(chart: unknown, label: string, t: Translate): unknown;
}
/** The enlarge control and its dialog; button focus rings and the scroll region ring come from the recipes. */
export declare const chartViewportStyles: import("lit").CSSResult;
export {};
