import type { GenerateDigestResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Forecast digest: the rolled-up reading across the next 24 hours, 7, 30, and 90 days. Renders /forecast/digest. Each window shows how many events fall in it, a per-domain breakdown (western, vedic, biorhythm), and the few highest-significance events with a significance bar coloured by domain. Use it as the at-a-glance period summary that pairs with the day-by-day roxy-forecast-timeline.
 *
 * @remarks
 * What a digest is for survives `hide-readings` intact: the windows, their event counts, the per-domain breakdown, every event date and the significance ranking. Only the written `description` goes, and each row falls back to the component's existing type label rather than emptying out. This is the one accepted cost here, and it is deliberate: unlike the timeline, a digest row carries no structured headline beside the sentence, so hiding the prose costs the bodies involved. The counts above it, which is what the card is read for, do not move.
 */
export declare class RoxyForecastDigest extends RoxyDataElement<GenerateDigestResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: GenerateDigestResponse): unknown;
    private windowLabel;
    private renderWindow;
    private renderEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-forecast-digest': RoxyForecastDigest;
    }
}
