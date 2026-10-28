import type { NatalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type WesternPositions = Pick<NatalChartResponse, 'planets'> & Partial<Pick<NatalChartResponse, 'birthDetails' | 'houses' | 'ascendant' | 'midheaven' | 'partOfFortune' | 'vertex'>>;
/**
 * Western planetary positions table. Renders a /astrology/natal-chart response
 * as the reference-grade positions grid astrologers read alongside the wheel:
 * every body with its sign, exact degree, house, and daily motion, followed by
 * the four chart points (Ascendant, Midheaven, Part of Fortune, Vertex).
 */
export declare class RoxyWesternPlanetsTable extends RoxyDataElement<WesternPositions> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Build the ordered row list: the planets array, then the four chart points. */
    private rows;
    protected renderData(d: WesternPositions): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-western-planets-table': RoxyWesternPlanetsTable;
    }
}
export {};
