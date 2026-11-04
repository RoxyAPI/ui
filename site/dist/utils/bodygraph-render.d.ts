import type { Translate } from '../i18n/registry.js';
import type { GenerateBodygraphResponse } from '../types/index.js';
import { type ChartOptions, type SvgMarkup } from './svg-string.js';
/**
 * Fixed geometry and renderer for the Human Design bodygraph: nine centers, 36 channels, all 64 gates, over a front-facing silhouette. Only which centers are defined and which gates are activated changes per chart.
 *
 * @remarks
 * Points are authored in a 0 to 100 grid and mapped into {@link BODYGRAPH_VIEWBOX} by {@link g}, so the chart and the silhouette share one space. The window is tight to the drawing rather than square, because every unused grid unit costs gate-number size. `tests/bodygraph.test.ts` holds the layout to the canonical shapes, orientations and row order.
 */
export type BodygraphCenterId = 'head' | 'ajna' | 'throat' | 'g' | 'heart' | 'sacral' | 'solar-plexus' | 'spleen' | 'root';
interface Point {
    x: number;
    y: number;
}
/** Which of the two sources activated a gate; both splits the circle. The renderer names neither, so one card reads them as the two sides of a person and another as two people. */
export interface GateSources {
    left: boolean;
    right: boolean;
}
/** One center's drawable geometry, plus the English fallback name for its accessible title when the response carries none. */
interface CenterGeometry {
    id: BodygraphCenterId;
    label: string;
    color: CenterColor;
    points: Point[];
    /** Where the centre name sits and how wide it may run, for a centre whose gate circles leave no gap inside the shape: the three side triangles are solid with numbers, so their names sit just outside, below the shape. A centre without one prints its name at the centroid, as ground behind the numbers. */
    caption?: {
        at: Point;
        room: number;
    };
}
/** Traditional center color group: gold for Head and G, green for Ajna, red for the Heart and Sacral motors, brown for the rest. A defined center is filled with it; an open one takes the card surface so the wiring passes behind. */
export type CenterColor = 'gold' | 'green' | 'red' | 'brown';
/** Gate circle size, in grid units. Bounded by the closest pair on the chart (Throat 12 and 45, 2.3 apart) and by fitting two digits inside the circle. */
export declare const GATE_RADIUS: number;
/** The centre name behind the numbers. Smaller than a gate number so it reads as ground rather than as another value. */
export declare const CENTER_NAME_FONT_SIZE: number;
/**
 * The viewBox-space gate anchors ({@link GATE_POINTS}) and the gate to center
 * index ({@link GATE_CENTER}). Exported so the geometry tests can assert the
 * layout invariants (side-center mirror symmetry, central-column balance, gates
 * inside their centers, circles that never overlap) without rendering.
 */
export declare const GATE_POINTS: Record<number, Point>, GATE_CENTER: Record<number, BodygraphCenterId>;
/** Horizontal axis of symmetry in viewBox units, the reflection axis for geometry tests. */
export declare const CHART_AXIS_X: number;
/**
 * Center shapes in canonical orientation and color. Central-column centers are
 * built centered on {@link AXIS}; the Solar Plexus shape is the Spleen reflected
 * across the axis, so the side centers stay exact mirrors. The Heart is the
 * deliberate off-axis exception and points UP, not right.
 */
export declare const CENTER_GEOMETRY: readonly CenterGeometry[];
/**
 * The 36 channels as ordered gate pairs. This is the canonical Human Design
 * channel set; a channel is active only when both of its gates are activated,
 * which the live response reports in its `channels` array. The static list lets
 * the renderer draw every channel as an inactive connector and overlay the
 * activated halves, so an open bodygraph still shows its full wiring skeleton.
 */
export declare const CHANNEL_PAIRS: ReadonlyArray<readonly [number, number]>;
/** Advance width of one uppercase character at the label weight, as a fraction of the font size. Approximate on purpose: it only has to keep a name inside its own outline, and it is applied with room to spare. */
export declare const UPPERCASE_EM = 0.66;
export interface BodygraphRenderInput {
    definedCenters: Set<BodygraphCenterId>;
    /** Which source(s) activated each gate; absent means unactivated. The only wiring input, because a channel is defined exactly when both of its gates are. */
    gateSources: ReadonlyMap<number, GateSources>;
    gateTitles: ReadonlyMap<number, string>;
    /** What to name each center in its `<title>`, keyed by center id. The response is the authority for its own vocabulary, so this carries `centers[].nameLocalized` where the API sent one and `centers[].name` otherwise; an id with no entry keeps the chart's own English label. */
    centerNames?: ReadonlyMap<BodygraphCenterId, string>;
    /** The two words a center shape states its state with in its tooltip. Supplied by the caller because only a component can reach a chrome catalogue. */
    stateWords?: {
        defined: string;
        open: string;
    };
}
export declare const BODYGRAPH_VIEWBOX = "0 0 432 612";
/**
 * Render the full bodygraph SVG inner content for the given live state. The
 * caller wraps it in an `<svg>` with {@link BODYGRAPH_VIEWBOX} and applies its
 * own theming CSS. Draw order: body silhouette under channels under centers
 * under gates, so the body is the backdrop, the wiring runs behind the shapes,
 * and every gate circle sits on top of whatever it lands on.
 */
export declare function renderBodygraphSvg(input: BodygraphRenderInput): SvgMarkup;
/**
 * The chart side as a word a reader sees.
 *
 * @remarks
 * Personality is the conscious side calculated at birth, design the unconscious side 88 degrees of solar arc before it, and the wire carries them as the machine enum `personality` and `design` with no localized partner. The component is what turns an enum into a word, so this is chrome and comes from the catalogue: the same two words label the bodygraph activation tabs, name the side inside a chart tooltip, and sit under a Variables arrow. An unrecognized value is passed through rather than guessed at.
 */
export declare function sideWord(side: string | undefined, t: Translate): string;
type GateActivation = GenerateBodygraphResponse['gates'][number];
/** Monochrome planet glyph for an activation, or its body name when the chart has no glyph for it. The lookup is keyed on the canonical English name; the fallback TEXT is the reader's. */
export declare function gateGlyph(g: GateActivation): string;
/** The names a chart reads for its centres, the same words the reading under it prints. */
export declare function bodygraphCenterNames(centers: GenerateBodygraphResponse['centers']): Map<BodygraphCenterId, string>;
/** The bodygraph for a `/human-design/bodygraph` response as one `<svg>` string, Design on the left half of a split gate and Personality on the right, painted by class so a page themes it through the `--roxy-*` custom properties and `--src-left` and `--src-right`. */
export declare function bodygraphSvg(data: GenerateBodygraphResponse, options?: ChartOptions): string;
export {};
