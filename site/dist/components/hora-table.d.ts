import type { GetHoraResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Vedic Hora (planetary hours) table. Renders /vedic-astrology/panchang/hora: the 12 daytime and 12 nighttime horas, each ruled by one of the seven classical planets in the Chaldean order, used for electional timing (start a venture in the hora of the planet that favours it). Day horas run sunrise to sunset, night horas sunset to next sunrise; each tile shows the ruling planet and its wall-clock window.
 */
export declare class RoxyHoraTable extends RoxyDataElement<GetHoraResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: GetHoraResponse): unknown;
    private renderColumn;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-hora-table': RoxyHoraTable;
    }
}
