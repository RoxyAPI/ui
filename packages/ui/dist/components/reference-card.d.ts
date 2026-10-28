import type { GetAvasthaResponse, GetCenterResponse, GetCompoundNumberResponse, GetGateResponse, GetNumberMeaningResponse, GetPlanetMeaningResponse, GetRashiResponse, GetTrigramResponse, GetZodiacSignResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Every reference / glossary lookup this card renders. They do NOT share field names (a zodiac sign has 17 fields, a number meaning has 3), so the card renders heuristically rather than by fixed keys: a symbol + title hero, the prose fields as labelled paragraphs, keyword and string-list fields as chips, and every remaining scalar as an attribute grid. One card replaces eight near-identical bespoke ones.
 *
 * It is the second GENERIC renderer in the library, and it shares `<roxy-data>`'s two consequences. Its field labels come from the wire name through `humanize()`, so they are derived rather than literal and no catalogue keyed on English source text can reach them: `Reference` and the empty state are the only two words the card writes itself. And because it enumerates `Object.keys`, an additive API field is not automatically backwards compatible for it, which is why every level that reads a key runs through `foldLocalized` first.
 *
 * `hide-readings` needs no second classification here, because the bucketing IS the line: what `collect` calls prose is the reading and what it calls a fact is the data. So the labelled paragraphs go, the keyword chips go, and a list whose items run to sentence length (a sign's `strengths`) goes with them, while the attribute grid and the short-item lists (`famous`, `compatibleSigns`, chakras) stay. On a lookup that is almost entirely prose the card keeps its symbol, title and whatever facts the response carries, which is the same flat shape it already renders for a response that had no prose to begin with.
 */
type ReferenceData = GetZodiacSignResponse | GetPlanetMeaningResponse | GetRashiResponse | GetTrigramResponse | GetGateResponse | GetCenterResponse | GetNumberMeaningResponse | GetCompoundNumberResponse | GetAvasthaResponse;
export declare class RoxyReferenceCard extends RoxyDataElement<ReferenceData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: ReferenceData): import("lit").TemplateResult<1>;
    private deriveTitle;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-reference-card': RoxyReferenceCard;
    }
}
export {};
