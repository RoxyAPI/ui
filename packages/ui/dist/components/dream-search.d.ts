import type { SearchDreamSymbolsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Dream-symbol search results. Renders /dreams/symbols: the dictionary, a letter of it or the matches for a `q` search, as selectable tiles. In self-fetch mode the list opens on the whole dictionary under a search box and an A to Z bar, pages on with Show more, and a picked tile opens its roxy-dream-card under the list with the full meaning, so a hosted embed completes the flow on its own. Every pick also emits a `roxy-symbol-select` CustomEvent ({ id, name, letter }) that bubbles and is composed, which is how a controlled host, the one holding the key, pairs the list with a card of its own. This is the dreams form-mode analog of roxy-location-search.
 */
export declare class RoxyDreamSearch extends RoxyDataElement<SearchDreamSymbolsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected rowDetail: {
        tag: string;
        path: string;
    };
    protected listKey: string;
    protected renderData(d: SearchDreamSymbolsResponse): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-dream-search': RoxyDreamSearch;
    }
}
