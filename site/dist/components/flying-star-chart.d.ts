import type { GenerateFlyingStarChartResponse, GetAnnualFlyingStarsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type FlyingStarData = GenerateFlyingStarChartResponse | GetAnnualFlyingStarsResponse;
/**
 * Flying Star (Xuan Kong) plate. Pass `data` from POST /feng-shui/flying-stars/natal, or set
 * `mode="annual"` and pass GET /feng-shui/flying-stars/annual/{year}.
 *
 * @remarks
 * Nine palaces on the Chinese compass, south at the top, each cell carrying the numbers that
 * palace holds: the mountain star upper left, the water star upper right and the period star large
 * in the middle. **Three numbers, never four.** Published plates draw exactly these three, and the
 * Lo Shu number underneath them is the fixed position of the palace rather than a star that flew
 * there, so it decides where a cell is DRAWN and is not printed as a number of its own. It also has
 * no name of its own in any language a reader might want this card in. An annual plate carries one
 * star per palace, so the cell holds that number alone.
 *
 * **The card heading and every fact label are now catalogued; the mountain and star names the
 * response gives no display form for stay English.** `structure.name` is translated in place by the
 * API under `lang` (switch on `structure.id`, the stable machine value), so it needs no lookup here.
 * The facing and sitting mountains are read through the same published `facing` option a Vastu
 * facing field already publishes (`displayOption(lang, 'facing', ...)`), because the 24 compass
 * labels (`S2`, `NE1`, ...) are one enum shared across both domains.
 *
 * **The facing and the sitting are the chart.** Two plates built for the same period differ
 * entirely on which mountain a building faces, so the header names the facing mountain, the sitting
 * mountain, the measured degrees and whether the reading straddles a boundary, and the structure
 * the pair produces. A plate printed without them cannot be checked against another consultant.
 *
 * `hide-readings` keeps every number, the flight directions and the structure name, and drops the
 * written meaning of the structure and the per-palace readings.
 */
export declare class RoxyFlyingStarChart extends RoxyDataElement<FlyingStarData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which plate the response is: the natal chart of a building, or one year of stars over it. */
    mode: 'natal' | 'annual';
    protected renderData(d: FlyingStarData): import("lit").TemplateResult<1>;
    /** What decides a natal plate: the mountain it faces, the one it sits on, and the measured degrees. */
    private renderNatalFacts;
    /** An annual plate turns on a date rather than on a compass reading. */
    private renderAnnualFacts;
    /**
     * The compass heading for a grid position, read off the same published `facing` option a Vastu
     * form field already publishes. The centre reads the shared `Center` word instead.
     */
    private paletteHeading;
    /** One cell of the plate, found by palace name so the drawing order is this component's and not the response's. */
    private renderPalace;
    /** The structure the facing and sitting stars produce, which is the verdict on the plate. */
    private renderStructure;
    /** Every palace again as a list, which is where the words that will not fit in a cell live. */
    private renderPalaceRows;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-flying-star-chart': RoxyFlyingStarChart;
    }
}
export {};
