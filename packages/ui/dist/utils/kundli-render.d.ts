import type { TemplateResult } from 'lit';
import { nothing } from 'lit';
export declare const KUNDLI_SIZE = 300;
export declare const KUNDLI_CENTER = 150;
/**
 * Maps a lowercase rashi key (e.g. "aries") back to its canonical sign name
 * (e.g. "Aries"). Used by every kundli consumer to bridge spec lowercase
 * rashi keys to the title-cased SIGNS_ORDER tokens.
 */
export declare const RASHI_TO_SIGN: Record<string, string>;
/**
 * South Indian fixed-house square grid: house centers for planet text labels.
 * House 1 is fixed top-center; positions are in the 300x300 viewBox.
 */
export declare const SOUTH_HOUSE_CENTERS: Record<number, {
    x: number;
    y: number;
}>;
/**
 * South Indian sign abbreviation positions (slightly outward from center).
 */
export declare const SOUTH_SIGN_POSITIONS: Record<number, {
    x: number;
    y: number;
}>;
/**
 * North Indian style: 12 triangular house positions.
 * Lagna (house 1) is the top diamond, numbered clockwise.
 * Centers represent the visual midpoint of each triangular cell.
 */
export declare const NORTH_HOUSE_CENTERS: Record<number, {
    x: number;
    y: number;
}>;
export interface HouseDef {
    /** 1-based house number. */
    number: number;
    /** Sign name (TitleCase, e.g. "Aries"). */
    sign: string;
    /** Planet abbreviation strings to display. */
    planets: string[];
    /** Whether this house is the ascendant (Lagna). */
    isLagna: boolean;
}
/**
 * Render a single house group: lagna highlight, sign abbreviation, planet labels.
 * Returns an SVG fragment for use inside an `<svg>` element.
 */
export declare function renderSouthHouseGroup(h: HouseDef): TemplateResult | typeof nothing;
/**
 * Render a north-Indian-style kundli wheel frame (grid lines only).
 * Returns the SVG structural lines; call `renderNorthHouseGroup` for content.
 */
export declare function renderNorthFrame(): TemplateResult;
/**
 * Render a north-Indian house group (sign abbr + house number + planets).
 */
export declare function renderNorthHouseGroup(h: HouseDef): TemplateResult | typeof nothing;
/**
 * Render the south-Indian square frame (border diamond + inner square + radial lines).
 */
export declare function renderSouthFrame(): TemplateResult;
//# sourceMappingURL=kundli-render.d.ts.map