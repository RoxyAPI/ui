import { type ChartOptions } from './svg-string.js';
/**
 * A graha placed inside a kundli cell. Render-only view model fed from a
 * `meta` map on the API response. Carries enough detail to draw a compact
 * in-cell label (abbreviation, whole degree, retrograde mark) and a rich SVG
 * `<title>` tooltip (exact position, nakshatra, pada, avastha).
 */
export interface PlacedGraha {
    graha: string;
    /** The supplied longitude and nakshatra belong to D1, while the cell belongs to a varga. */
    natalReference?: boolean;
    longitude?: number;
    nakshatra?: {
        name?: string;
        pada?: number;
        lord?: string;
    };
    isRetrograde?: boolean;
    awastha?: string;
    /** Deeptadi avastha, the nine dispositional states. Rendered as the response sends it, like {@link PlacedGraha.awastha}. */
    deeptadi?: string;
    /** Within its combustion orb of the Sun (astangata). */
    combust?: boolean;
    /** Graha yuddha: the opponent within one degree, and which of the pair won. */
    war?: {
        opponent: string;
        winner?: string;
    };
}
/** The two chart-wide state lists a D1 response carries beside `meta`. Divisional charts have neither, so both are optional. */
export interface GrahaStates {
    combustion?: ReadonlyArray<{
        planet?: string;
    }>;
    planetaryWar?: ReadonlyArray<{
        planet1?: string;
        planet2?: string;
        winner?: string;
    }>;
}
/**
 * Unified view model used by every kundli style. Caller passes a graha-keyed
 * `meta` map (from `/vedic-astrology/birth-chart`, `/divisional-chart`, or
 * `/navamsa`) through {@link toKundliViewModel} to produce this shape.
 *
 * `placements` is keyed by lowercase rashi name (`"aries"`, `"taurus"`, ...)
 * so the sign-fixed styles can index directly. The Lagna entry is not
 * counted as a planet; it only flags the ascendant cell.
 */
export interface KundliViewModel {
    lagnaSign: string;
    placements: Record<string, PlacedGraha[]>;
    divisionLabel?: string;
}
/**
 * Kundli regional styles. Sign-fixed (south, east) and house-fixed (north).
 * Exposed so consumers can type their own `chart-style` attribute reflection.
 */
export type ChartStyle = 'south' | 'north' | 'east';
/** Superscript state marks on a graha label. A cell is small, so each state that changes how a graha is READ gets one character and the tooltip carries the words. */
export declare const RETRO_MARK = "\u02B3";
export declare const COMBUST_MARK = "\u1D9C";
export declare const WAR_MARK = "\u02B7";
/**
 * Bucket a graha-keyed `meta` map (D1 birth chart or D2..D60 divisional
 * chart) into the unified {@link KundliViewModel} the renderer consumes. The
 * Lagna entry is recognised by `graha === 'Lagna'` (or key `"Lagna"`) and
 * sets `lagnaSign`; it is not bucketed as a placed planet.
 *
 * @param meta - Graha-keyed map; missing rashi entries are skipped.
 * @param options - `divisionLabel` titles the chart centre. `lagnaOverride` is a rashi/sign name (case-insensitive, e.g. `"cancer"`) replacing the `meta.Lagna`-derived ascendant, which drives the Chandra Lagna and other reference-point views: the `meta` of a `/birth-chart` response always carries the Janma Lagna as its `Lagna` key, so this is the only way to pivot the houses without a second request, and it is ignored when it does not resolve to a known sign. `states` folds the chart-wide combustion and graha-yuddha lists onto the grahas they name, because both arrive beside `meta` rather than inside it and a cell can only mark what its own entry carries.
 */
export declare function toKundliViewModel(meta: Record<string, {
    graha?: string;
    rashi?: string;
    longitude?: number;
    nakshatra?: {
        name?: string;
        pada?: number;
        lord?: string;
    };
    isRetrograde?: boolean;
    house?: number;
    awastha?: string;
    deeptadi?: string;
}>, options?: {
    divisionLabel?: string;
    lagnaOverride?: string;
    states?: GrahaStates;
    natalReference?: boolean;
}): KundliViewModel;
/** True when the chart carries an ascendant the house-fixed north layout can be anchored to. The one place that question is answered, so the drawing and the caption that explains a missing ascendant can never disagree about it. */
export declare function hasLagna(vm: KundliViewModel): boolean;
/** What a kundli drawing takes beside its view model. */
export interface KundliOptions extends ChartOptions {
    /** The regional layout; north when absent. */
    style?: ChartStyle;
    /** The accessible name; the birth chart wording when absent. */
    label?: string;
    /** The title a pointer shows; the birth chart title when absent. */
    title?: string;
}
/** A kundli as one `<svg>` string from the view model {@link toKundliViewModel} builds out of a response `meta` map, painted by class so a page themes it through the `--roxy-*` custom properties. */
export declare function kundliSvg(vm: KundliViewModel, options?: KundliOptions): string;
