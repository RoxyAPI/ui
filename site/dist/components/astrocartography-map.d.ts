import type { AstrocartographyResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Astrocartography (relocation) world map. Plots the four planetary lines for
 * every body from a /astrology/astrocartography response over a labeled
 * graticule: MC and IC as straight meridians, the Ascendant and Descendant as
 * latitude-sampled curves. Color is per body and theme-token driven; solid
 * lines are the Ascendant and Midheaven, dashed are the Descendant and IC.
 */
export declare class RoxyAstrocartographyMap extends RoxyDataElement<AstrocartographyResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly chartViewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Fits the measured map ink without moving geographic coordinates. */
    protected updated(): void;
    protected renderData(data: AstrocartographyResponse): import("lit").TemplateResult<1>;
    private renderMap;
    private renderGraticule;
    /**
     * Every body's four lines, with the glyph that names each line fanned along
     * its edge so two bodies within a few degrees of longitude never print one
     * glyph over the other. Longitude wraps like a wheel, so the same fan the
     * wheels use spaces the glyphs; the LINE stays at its true longitude and the
     * colour ties a displaced glyph back to it.
     */
    private renderBodyLines;
    private renderMeridian;
    private renderCurve;
    private renderLegend;
    /**
     * The written read of each planetary line. Prose end to end, and the lines it
     * describes are already drawn and keyed on the map above, so `hide-readings`
     * takes the section whole.
     */
    private renderInterpretations;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-astrocartography-map': RoxyAstrocartographyMap;
    }
}
