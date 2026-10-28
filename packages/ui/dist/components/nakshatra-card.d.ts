import type { NakshatraResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Nakshatra reference card. Renders /vedic-astrology/nakshatras/{id}: the
 * lunar mansion number, longitude range, ruling planet, presiding deity,
 * symbol, native characteristics, and traditional remedies.
 *
 * @remarks
 * The classical attribution table is the card and it survives `hide-readings`
 * whole: the name, which of the twenty-seven it is, the longitude range it spans,
 * and its lord, deity and symbol. Those are what a practitioner reads a placement
 * against. The characteristics paragraph and the remedies are the reading, and
 * each carries its own heading, so each section goes whole.
 */
export declare class RoxyNakshatraCard extends RoxyDataElement<NakshatraResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(n: NakshatraResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-nakshatra-card': RoxyNakshatraCard;
    }
}
