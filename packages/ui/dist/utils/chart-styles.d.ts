/** The paint of each chart the `./charts` subpath draws, every selector scoped by a zero-specificity `:where()` to the class on the chart root, so one sheet colours the drawing in a component and a bare `<svg>` in any document, published as `dist/styles/charts/{name}.css`. */
/** The natal wheel, on `.natal-wheel`. */
export declare const natalWheelPaint: import("lit").CSSResult;
/** The synastry dual wheel, on `.synastry-wheel`; the card carries the class too, so its legend dots read the person colours. */
export declare const synastryWheelPaint: import("lit").CSSResult;
/** The kundli in every regional style, on `.kundli`. */
export declare const kundliPaint: import("lit").CSSResult;
/** The bodygraph, on `.bodygraph`; Design defaults to the danger colour and Personality to the body ink, open centres and unlit gates mask to the page colour, and a card may set `--src-left`, `--src-right` and `--src-ink`. The card carries the class too, so its legend swatches read the centre colours. */
export declare const bodygraphPaint: import("lit").CSSResult;
/** The Moon, on `.roxy-moon`: a lit disc on the shaded one, faint earthshine, soft terminator, limb darkening and the maria, all in the moon tokens and painted per element, never through a shared gradient. */
export declare const moonPaint: import("lit").CSSResult;
