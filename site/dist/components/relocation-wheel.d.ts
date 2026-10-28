import './natal-chart.js';
import type { RelocationChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Relocation chart. The birth instant is unchanged, so every planet keeps its
 * natal sign and degree while the houses and angles are recomputed for a new
 * place. Reuses {@link RoxyNatalChart} for the wheel (identical data shape) and
 * adds the relocation read: the move geometry, the planets that change house,
 * and the bodies pulled onto a relocated angle.
 *
 * @remarks
 * Composing another component means two things have to be forwarded or they stop
 * at the boundary: `hide-readings` is passed down, so suppressing prose here also
 * suppresses the wheel's planet readings; and the wheel's parts are re-exported,
 * because a part is only addressable one shadow root deep.
 */
export declare class RoxyRelocationWheel extends RoxyDataElement<RelocationChartResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(data: RelocationChartResponse): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-relocation-wheel': RoxyRelocationWheel;
    }
}
