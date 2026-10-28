import type { GetBirthstonesResponse, GetCrystalsByChakraResponse, GetCrystalsByElementResponse, GetCrystalsByZodiacResponse, ListCrystalsResponse, SearchCrystalsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Any crystal list response that carries a `crystals` summary array. Every crystals endpoint that returns more than one stone shares the `{ name, id, imageUrl, colors }` item shape, so one grid renders them all.
 */
type CrystalGridData = ListCrystalsResponse | GetCrystalsByChakraResponse | GetCrystalsByElementResponse | GetCrystalsByZodiacResponse | GetBirthstonesResponse | SearchCrystalsResponse;
/**
 * Crystal grid. Renders any crystals list response (/crystals, /crystals/chakra/{chakra}, /crystals/element/{element}, /crystals/zodiac/{sign}, /crystals/birthstone/{month}, /crystals/search) as a responsive gallery of crystal tiles with photo, name, and colour swatches. The heading is derived from the response filter (chakra, element, zodiac sign, or birth month) or set explicitly via the `heading` attribute. A picked tile emits `roxy-symbol-select` ({ id, name }) for a host that pairs its own roxy-crystal-card, and in self-fetch mode opens that card under the grid itself; the full list opens on every stone with its chakra, zodiac, element, colour and planet filters above it and pages on with Show more.
 */
export declare class RoxyCrystalGrid extends RoxyDataElement<CrystalGridData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /**
     * Override the auto-derived grid heading. Empty by default, in which case the heading comes from the response filter (chakra, element, zodiac, or birth month) or falls back to "Crystals".
     */
    heading: string;
    protected rowDetail: {
        tag: string;
        path: string;
    };
    protected listKey: string;
    protected renderData(d: CrystalGridData): unknown;
    private deriveHeading;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-crystal-grid': RoxyCrystalGrid;
    }
}
export {};
