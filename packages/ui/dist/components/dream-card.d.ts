import type { GetDreamSymbolResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Dream symbol card. Renders /dreams/symbols/{id}: the symbol name as a heading, the full psychological interpretation as the body, and the dictionary letter as a chip for alphabetical context.
 *
 * @remarks
 * **`hide-readings` is a deliberate no-op here, and it is the only card in the library that is.** The response is `{id, name, letter, meaning}`: three of those four fields are the lookup key itself, and `meaning` is the entire card. Honouring the attribute would leave a dictionary heading with nothing under it, which is not a chart without a report, it is an empty card. Rendering nothing at all was the other option and is worse, because a site-wide `hide-readings` would then delete the component from the page rather than trim it. Documented in README.md and AGENTS.md so an integrator learns this without testing for it, and pinned by `components.test.ts`.
 */
export declare class RoxyDreamCard extends RoxyDataElement<GetDreamSymbolResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: GetDreamSymbolResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-dream-card': RoxyDreamCard;
    }
}
