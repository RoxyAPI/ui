import type { GetAngelNumberResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
export declare class RoxyAngelNumberCard extends RoxyDataElement<GetAngelNumberResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: GetAngelNumberResponse): import("lit").TemplateResult<1>;
    private renderSections;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-angel-number-card': RoxyAngelNumberCard;
    }
}
