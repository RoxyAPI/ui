/** The `./charts` subpath: each function turns a response into the `<svg>` string its component draws, with no DOM and no rendering library, painted by class through the `--roxy-*` custom properties and worded in the `lang` a loaded locale catalogue covers; the published font pairs ride beside them as data. */
export { type FontKey, fontFaces, ROXY_FONTS, type RoxyFont, type SelfHostedFontFace, } from './styles/fonts.js';
export { type PaletteName, ROXY_PALETTES, themeChrome, } from './styles/palettes.js';
export { bodygraphSvg } from './utils/bodygraph-render.js';
export { type ChartStyle, type KundliOptions, type KundliViewModel, kundliSvg, toKundliViewModel, } from './utils/kundli-render.js';
export { type NatalWheelOptions, natalWheelSvg, type WheelChart, type WheelTypeSize, } from './utils/natal-wheel.js';
export type { ChartOptions } from './utils/svg-string.js';
export { type SynastryWheelOptions, synastryWheelSvg, } from './utils/synastry-wheel.js';
