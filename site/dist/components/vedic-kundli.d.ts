import type { BirthChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { type ChartStyle } from '../utils/kundli-render.js';
/**
 * Vedic kundli (D1 Rashi chart). Pass `data` from /vedic-astrology/birth-chart.
 * Three regional render styles are available; the visible tablist lets the
 * end user switch between South / North / East at any time. The same planet-
 * in-sign data feeds every style, so the toggle is purely a layout choice.
 *
 * Each planet shows its abbreviation and whole-degree-within-sign, with an
 * SVG tooltip carrying exact position, nakshatra, pada, and avastha. The host
 * page sets the initial style via `chart-style` attribute; from there the
 * user takes over.
 *
 * The ascendant (house 1) defaults to the Janma Lagna carried in the response
 * `meta`. Set `chart-reference="moon"` to render the Chandra Lagna (Moon as
 * ascendant) from the same response, or `lagna-override="<rashi>"` to pin the
 * reference to any sign (Surya Lagna, Arudha Lagna, a custom point). The same
 * planet-in-sign data feeds every reference; only the house numbering rotates.
 *
 * Theming flows through CSS custom properties on `:host`, so the chart
 * adopts the host page palette without runtime color probing.
 */
export declare class RoxyVedicKundli extends RoxyDataElement<BirthChartResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly chartViewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    chartStyle: ChartStyle;
    /**
     * Ascendant reference point. `'lagna'` (default) uses the Janma Lagna from the response; `'moon'` renders the Chandra Lagna (Moon sign as house 1) from the same response. An explicit {@link lagnaOverride} wins over this.
     */
    chartReference: 'lagna' | 'moon';
    /**
     * Explicit rashi/sign name (case-insensitive, e.g. `"cancer"`) to use as the ascendant, overriding both the Janma Lagna and {@link chartReference}. Empty by default (standard Janma Lagna). Use for Surya Lagna, Arudha Lagna, or any custom reference chart.
     */
    lagnaOverride: string;
    /**
     * Resolve the ascendant override fed to {@link toKundliViewModel}. An explicit `lagna-override` wins; otherwise `chart-reference="moon"` derives the Moon rashi from the response `meta`. Returns `undefined` for the default Janma Lagna path.
     */
    private resolveReference;
    private viewModel;
    private setStyle;
    protected renderData(d: BirthChartResponse): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-vedic-kundli': RoxyVedicKundli;
    }
}
