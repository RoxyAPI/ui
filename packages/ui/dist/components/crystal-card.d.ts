import type { GetCrystalResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Single-crystal detail card. Renders /crystals/{id}: the stone's photo, description, and full metaphysical profile (spiritual / emotional / physical meaning, governing chakras, zodiac signs, planet, elements, colours, Mohs hardness, numerical vibration, birthstone month), plus its affirmation and the crystals it pairs with. This is the detail view; roxy-crystal-grid is the gallery.
 *
 * @remarks
 * The card is half mineral record and half reading, and the split is clean.
 * `hide-readings` keeps the photo, the name, the whole attribute grid (planet,
 * Mohs hardness, numerical vibration, birthstone month, chakras, zodiac signs,
 * elements and the colour swatches) and the crystals it pairs with, which is a
 * catalogue relation rather than a claim about the stone. It drops the
 * description, the spiritual, emotional and physical meanings, the keyword chips
 * that belong to them, and the affirmation. The meaning block is three headed
 * paragraphs and nothing else, so it goes whole.
 */
export declare class RoxyCrystalCard extends RoxyDataElement<GetCrystalResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: GetCrystalResponse): import("lit").TemplateResult<1>;
    private attr;
    private list;
    private renderMeaning;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-crystal-card': RoxyCrystalCard;
    }
}
