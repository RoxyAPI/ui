import type { LocalSpaceResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
export declare const COMPASS_TYPE_SIZES: {
    readonly glyph: 11;
};
/**
 * Local space compass. Plots each body from a /astrology/local-space response as
 * a directional line radiating from the birthplace at its azimuth (0 = north,
 * clockwise), with a 16-point ring. Bodies below the horizon are dimmed. Color
 * is per body and theme-token driven.
 */
export declare class RoxyLocalSpaceCompass extends RoxyDataElement<LocalSpaceResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    private readonly chartViewport;
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(data: LocalSpaceResponse): import("lit").TemplateResult<1>;
    private renderDial;
    private renderCompassRing;
    /**
     * One spoke per body at its true azimuth, and its glyph on the ring outside
     * the rim, fanned along that ring so several bodies in one quarter of the
     * sky never print one glyph over another. The spoke never moves; the colour
     * ties a displaced glyph back to it.
     */
    private renderSpokes;
    private renderList;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-local-space-compass': RoxyLocalSpaceCompass;
    }
}
