/**
 * The stylesheet for anything `renderBodygraphSvg` draws, so a second chart on the same geometry cannot fork the first one's appearance.
 *
 * @remarks
 * The renderer marks each gate and channel half `src-left` or `src-right` and names neither, so a card supplies the meaning by declaring those two colours on its own root and nothing else, plus `--src-ink` when the number knocked out of a source disc needs an ink other than the card surface. Each source must clear 4.5:1 against that ink and 3:1 against the card surface, in both themes. A card still owns its layout and its legend copy.
 */
export declare const bodygraphChartStyles: import("lit").CSSResult;
