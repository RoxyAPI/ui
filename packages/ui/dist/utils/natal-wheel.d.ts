import type { NatalChartResponse } from '../types/index.js';
import { type ChartOptions } from './svg-string.js';
/** The in-wheel type sizes at a wide host, in user units, as the stylesheet declares them: what the fan spaces the marks by when no measured size is given. */
export declare const NATAL_TYPE_SIZES: {
    readonly glyph: 14;
    readonly degree: 7;
};
/**
 * The chart shape the wheel actually renders.
 *
 * @remarks
 * `RelocationChartResponse` carries the same planets, houses, angles and birth details as `NatalChartResponse` (`RelocationPlanet` is field-for-field identical to the natal planet item), and differs only by having no `aspects`, `aspectsInterpretation`, `patterns`, `partOfFortune` or `summary`. The wheel already renders without them, so those five are simply optional here.
 *
 * Typing that contract is what lets the relocation wheel compose the natal chart honestly: it hands over a response the type actually describes, rather than a double cast asserting fields the payload may not carry.
 */
type ChartExtras = 'aspects' | 'aspectsInterpretation' | 'patterns' | 'partOfFortune' | 'summary';
export type WheelChart = Omit<NatalChartResponse, ChartExtras> & Partial<Pick<NatalChartResponse, ChartExtras>>;
/** The in-wheel type size in play, in user units, for the glyphs and the degree labels. */
export interface WheelTypeSize {
    glyph: number;
    degree: number;
}
/** What a natal wheel drawing takes beside the response. */
export interface NatalWheelOptions extends ChartOptions {
    /** The type sizes the marks are spaced by, the wide-host sizes when absent; a phone breakpoint passes the larger sizes its stylesheet applies. */
    typeSize?: WheelTypeSize;
}
/** True when the response carried all twelve house cusps, so every house on the wheel is a longitude the API sent rather than a 30 degree sector the wheel constructed. */
export declare function hasCusps(data: WheelChart): boolean;
/** The natal wheel for a `/astrology/natal-chart` or `/astrology/relocation-chart` response as one `<svg>` string, painted by class so a page themes it through the `--roxy-*` custom properties. */
export declare function natalWheelSvg(data: WheelChart, options?: NatalWheelOptions): string;
export {};
