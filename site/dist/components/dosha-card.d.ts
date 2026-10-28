import type { KalsarpaResponse, ManglikResponse, SadhesatiResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type DoshaData = ManglikResponse | KalsarpaResponse | SadhesatiResponse;
/**
 * Dosha presence card. Renders /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}.
 * Visual severity indicator + remedies + scoped effects.
 *
 * @remarks
 * The verdict is the data and the counsel is the reading. `hide-readings` keeps the present/absent badge, the subtype (which for Sade Sati is the phase, the whole answer), the severity meter and the frame caption, and drops the description, the scoped effects, the remedies and the exceptions. Each of those three sections is prose end to end, so it goes whole rather than leaving a heading over nothing.
 */
export declare class RoxyDoshaCard extends RoxyDataElement<DoshaData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    type: 'manglik' | 'kalsarpa' | 'sadhesati' | string;
    protected renderData(d: DoshaData): import("lit").TemplateResult<1>;
    private renderEffects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-dosha-card': RoxyDoshaCard;
    }
}
export {};
