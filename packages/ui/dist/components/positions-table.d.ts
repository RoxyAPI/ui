import type { ArabicLotsResponse, AsteroidsResponse, LilithResponse, ProgressionsResponse, SolarArcResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Union of the position-list Western responses this one editorial table renders.
 * Each carries an array of bodies in zodiac signs plus a per-body
 * interpretation; the table discriminates on which array key is present.
 */
type PositionsResponse = AsteroidsResponse | LilithResponse | ProgressionsResponse | SolarArcResponse | ArabicLotsResponse;
/**
 * Editorial positions table for the Western point-list endpoints: asteroids,
 * Black Moon Lilith, secondary progressions, solar arc directions, and the
 * Arabic lots. One component, five shapes: it detects the response by its array
 * key and shows only the columns that response carries (house, motion, formula,
 * or a natal-to-directed comparison), then lists each body reading below.
 */
export declare class RoxyPositionsTable extends RoxyDataElement<PositionsResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Override the auto-derived heading. Empty keeps the per-shape default (e.g. "Asteroids"). */
    heading: string;
    protected renderData(data: PositionsResponse): import("lit").TemplateResult<1>;
    private renderRow;
    private signCell;
    private signFromLongitude;
    private renderReadings;
    private toViewModel;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-positions-table': RoxyPositionsTable;
    }
}
export {};
