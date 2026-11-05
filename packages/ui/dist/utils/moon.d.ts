import { type ChartOptions } from './svg-string.js';
/** The hemispheres a reader sees the Moon from; the Southern Hemisphere sees it turned half a circle. */
export declare const HEMISPHERES: readonly ['north', 'south'];
export type Hemisphere = (typeof HEMISPHERES)[number];
/** The two eclipses a drawing marks: the Moon in Earth's shadow, or the Moon across the Sun. */
export type Eclipse = 'lunar' | 'solar';
/** The Moon a drawing shows: how much of the disc is lit, and which side. */
export interface MoonState {
    /** Lit fraction of the disc, from 0 to 100. */
    illumination: number;
    /** True while the lit fraction grows, from new moon to full. */
    waxing: boolean;
}
/** The options {@link moonSvg} takes. */
export interface MoonOptions extends ChartOptions, MoonState {
    /** Absent reads as north. */
    hemisphere?: Hemisphere;
    eclipse?: Eclipse;
    /** Width and height in CSS pixels; below {@link DETAIL_MIN} the drawing keeps the silhouette and drops the surface. */
    size: number;
}
/** The smallest size, in CSS pixels, that still draws the maria. */
export declare const DETAIL_MIN = 24;
/** Mean length of a lunation in days. */
export declare const SYNODIC_MONTH = 29.530588853;
/** Lit fraction, 0 to 100, at a Sun-Moon elongation in degrees. */
export declare const illuminationAt: (elongation: number) => number;
/** The Moon in the middle of lunar day `n` from 1 to 30, each day twelve degrees of elongation: a tithi, or a day of a lunar month. */
export declare function lunarDayMoon(n: number | undefined): MoonState | undefined;
/** True when the Moon waxes on a `YYYY-MM-DD` date; the mean lunation is off by under a day, which only moves a disc within a sliver of new or full. */
export declare function waxingOn(date: string | undefined): boolean | undefined;
/** The principal phase falling on a `YYYY-MM-DD` date (new, first quarter, full or last quarter), from the quarter of the lunation nearest the mean elongation. */
export declare function principalPhaseOn(date: string | undefined): MoonState | undefined;
/** The lit part of a unit disc at lit fraction `k` (0 to 1): the lit half closed by the terminator, a half ellipse of x radius |1 - 2k|; waxing lights the right side. */
export declare function litPath(k: number, waxing: boolean): string;
/** The Moon as an `<svg>` string: the lit fraction, its side, an eclipse and the hemisphere it is seen from, painted by class through the `--roxy-moon-*` custom properties. */
export declare function moonSvg(o: MoonOptions): string;
