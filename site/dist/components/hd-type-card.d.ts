import type { CalculateProfileResponse, CalculateTypeResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type HdIdentity = CalculateTypeResponse | CalculateProfileResponse;
/**
 * The Human Design identity read on its own, without the chart. Pass `data` from `/human-design/type` or `/human-design/profile`.
 *
 * @remarks
 * Both endpoints answer "who is this person" rather than "how is the chart wired", so one card serves both and detects which it was given: the type response leads with the type and carries the strategy, authority, and aura readings; the profile response carries the two lines and their keynotes. This is the same shape-detecting pattern `roxy-positions-table` uses across the five Western point-list endpoints.
 *
 * The interpretation surface (facts, lead paragraph, signature and not-self chips, the exclusive reading accordion, the line keynotes) is shared with `roxy-bodygraph` through `utils/hd-reading.ts`, because `/human-design/type` returns a strict subset of the bodygraph interpretation fields. Reach for `roxy-bodygraph` when the chart itself is wanted; reach for this when only the reading is.
 *
 * The type, strategy, authority, signature and not-self values are read through `display()`, so a translated response prints the display half and the canonical English stays available to anything that compares. `/human-design/profile` carries no vocabulary at all: its profile is `5/1` and its two keynotes are prose the API translates in place.
 */
export declare class RoxyHdTypeCard extends RoxyDataElement<HdIdentity> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: HdIdentity): import("lit").TemplateResult<1>;
    /**
     * The type read. The facts answer it at a glance, the lead paragraph grounds the type label in what the aura actually does, and the accordion carries the three interpretations that make the chart actionable: how to engage (strategy), how to decide (authority), and how the field is felt by others (aura).
     */
    private renderType;
    /**
     * The profile read. Two keynote sentences, so they render open as a definition list rather than behind a disclosure: putting a single sentence behind a click costs the reader more than it saves.
     */
    private renderProfile;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-hd-type-card': RoxyHdTypeCard;
    }
}
export {};
