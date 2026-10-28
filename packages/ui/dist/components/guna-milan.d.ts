import type { CompatibilityResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * 36-point Ashtakoota score card. Renders /vedic-astrology/compatibility.
 *
 * @remarks
 * Each koota row carries what it actually evaluates and how each person
 * classifies under it (Varna: Shudra against Shudra, Yoni: Sheep against Horse),
 * because the point total alone tells a couple nothing about WHY a koota scored
 * as it did.
 *
 * `hide-readings` drops exactly one block, the recommendation line. The koota
 * descriptions stay: each states what its category evaluates and reads the same
 * for every couple, so it is a column gloss on the table rather than a reading of
 * this match, the same way `houseThemes` labels a house list. The score, the
 * ring, the compatible verdict, the eight-row breakdown and the dosha and
 * cancellation chips are all data and all survive.
 */
export declare class RoxyGunaMilan extends RoxyDataElement<CompatibilityResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: CompatibilityResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-guna-milan': RoxyGunaMilan;
    }
}
