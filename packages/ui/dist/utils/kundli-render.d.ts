import type { TemplateResult } from 'lit';
import type { Translate } from './hd-reading.js';
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
/** True when the chart carries an ascendant the house-fixed north layout can be anchored to. The one place that question is answered, so the renderer and the caller showing {@link renderMissingLagnaNote} can never disagree about it. */
export declare function hasLagna(vm: KundliViewModel): boolean;
/**
 * Every caption that belongs under a kundli: why the layout changed when no ascendant arrived, and the key to the state marks the cells carry.
 *
 * @remarks
 * One entry point rather than two, because both callers need the identical set and a caller that rendered only one of them would explain the marks on a chart whose layout had silently changed, or the reverse. Uses the shared frame-caption class, so a component already showing the sidereal frame needs no extra styles.
 */
export declare function renderKundliCaptions(vm: KundliViewModel, t: Translate): TemplateResult[];
/**
 * Render the kundli body for the requested style. Returns the SVG inner
 * content; the caller wraps it in an `<svg>` element with the canonical
 * viewBox `0 0 400 400` and applies its own theming CSS.
 */
export declare function renderKundliSvg(vm: KundliViewModel, style: ChartStyle, t: Translate): TemplateResult;
/**
 * Render a WAI-ARIA-compliant tablist that lets the end user switch between
 * South / North / East kundli styles at runtime. The hosting component owns
 * the `chartStyle` state; this helper renders the buttons and wires the
 * arrow-key navigation plus click handler.
 *
 * @param active - The currently selected style.
 * @param setStyle - Callback the host component uses to update its state.
 */
export declare function renderKundliStyleTablist(active: ChartStyle, setStyle: (next: ChartStyle) => void, t: Translate): TemplateResult;
/** Divisional placements stay distinct from the natal position and nakshatra returned beside them. */
export declare function renderVargaReferenceTable(meta: Parameters<typeof toKundliViewModel>[0], division: number, locale: string | undefined, t: Translate): TemplateResult;
