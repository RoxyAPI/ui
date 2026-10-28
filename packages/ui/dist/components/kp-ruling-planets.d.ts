import type { KpRulingPlanetsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * KP ruling planets card. Renders /vedic-astrology/kp/ruling-planets: the day
 * lord, the Moon and Lagna stellar hierarchies (sign lord, star lord, sub
 * lord, sub-sub lord), the consolidated ruling-planet list ordered by
 * strength, and, when birth data is supplied, the house significators per
 * planet. The primary horary timing tool in KP astrology.
 *
 * @remarks
 * `significators` and `houseThemes` both arrive only when the request carried
 * birth data, so the significator table and its house wording appear together
 * or not at all. The wording is read from the response, never from a table held
 * here, so it follows the requested language and the requested `focus` lens.
 */
export declare class RoxyKpRulingPlanets extends RoxyDataElement<KpRulingPlanetsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: KpRulingPlanetsResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-kp-ruling-planets': RoxyKpRulingPlanets;
    }
}
