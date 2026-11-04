import type { CalculateSynastryResponse } from '../types/index.js';
import type { WheelTypeSize } from './natal-wheel.js';
import { type ChartOptions } from './svg-string.js';
/** The in-wheel type sizes at a wide host, in user units, as the stylesheet declares them: what the fan spaces the marks by when no measured size is given. */
export declare const SYNASTRY_TYPE_SIZES: {
    readonly glyph: 18;
    readonly degree: 10;
};
/** What a synastry wheel drawing takes beside the response. */
export interface SynastryWheelOptions extends ChartOptions {
    /** The type sizes the marks are spaced by, the wide-host sizes when absent; a phone breakpoint passes the larger sizes its stylesheet applies. */
    typeSize?: WheelTypeSize;
}
/** The dual wheel for a `/astrology/synastry` response as one `<svg>` string, person 1 inside the zodiac and person 2 outside it, painted by class so a page themes it through the `--roxy-*` custom properties. */
export declare function synastryWheelSvg(data: CalculateSynastryResponse, options?: SynastryWheelOptions): string;
