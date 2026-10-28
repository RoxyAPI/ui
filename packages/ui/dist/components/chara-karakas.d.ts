import type { CharaKarakaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Chara Karakas. Renders /vedic-astrology/chara-karakas: the movable significators of Jaimini astrology, the offices ranked by how far each graha has advanced into its sign, Atmakaraka first.
 *
 * @remarks
 * The scheme is shown, never hidden. The seven and eight karaka schemes name a DIFFERENT Atmakaraka on the same chart, so a reader who follows one school has to be able to see at a glance which one produced the ranking in front of them. The value is the one the response echoes, so the label can never disagree with the ranking beside it.
 *
 * Rahu is flagged where it appears. It advances backward through a sign, so it is ranked on thirty degrees minus its position, and the response carries both figures: the degree a chart displays and the degree that earned the office. Showing only one of them makes the order look wrong.
 */
export declare class RoxyCharaKarakas extends RoxyDataElement<CharaKarakaResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: CharaKarakaResponse): unknown;
    private renderRow;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-chara-karakas': RoxyCharaKarakas;
    }
}
