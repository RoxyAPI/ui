/** The `./charts` subpath: each function turns a response into the `<svg>` string its component draws, with no DOM and no rendering library, painted by class through the `--roxy-*` custom properties and worded in the `lang` a loaded locale catalogue covers; the Moon is drawn from its lit fraction, and the published font pairs and the symbol face ride beside them as data. */
export { type FontKey, fontFaces, ROXY_FONTS, type RoxyFont, type SelfHostedFontFace, SYMBOL_FAMILY, symbolFontFaces, } from './styles/fonts.js';
export { type PaletteName, ROXY_PALETTES, themeChrome, } from './styles/palettes.js';
export { bodygraphSvg } from './utils/bodygraph-render.js';
export { type ChartStyle, type KundliOptions, type KundliViewModel, kundliSvg, toKundliViewModel, } from './utils/kundli-render.js';
export { type Eclipse, type Hemisphere, illuminationAt, lunarDayMoon, type MoonOptions, type MoonState, moonSvg, principalPhaseOn, waxingOn, } from './utils/moon.js';
export { type NatalWheelOptions, natalWheelSvg, type WheelChart, type WheelTypeSize, } from './utils/natal-wheel.js';
export type { ChartOptions } from './utils/svg-string.js';
export { type SynastryWheelOptions, synastryWheelSvg, } from './utils/synastry-wheel.js';
