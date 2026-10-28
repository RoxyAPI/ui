import type { ListCardsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Tarot catalog. Renders GET /tarot/cards as a responsive gallery of the deck: each tile carries the Rider-Waite-Smith artwork, the card name, and an arcana and suit caption. A picked tile emits `roxy-symbol-select` ({ id, name }) for a host that pairs its own `<roxy-tarot-card>`, and in self-fetch mode the deck opens on load under its arcana and suit filters, pages on with Show more, and opens the picked card under the gallery itself.
 */
export declare class RoxyTarotCatalog extends RoxyDataElement<ListCardsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /**
     * Override the auto-derived gallery heading. Empty by default, in which case the heading is "Tarot deck".
     */
    heading: string;
    protected rowDetail: {
        tag: string;
        path: string;
    };
    protected listKey: string;
    protected renderData(d: ListCardsResponse): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-tarot-catalog': RoxyTarotCatalog;
    }
}
