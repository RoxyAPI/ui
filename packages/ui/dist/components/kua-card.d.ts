import type { CalculateKuaNumberResponse, GenerateEightMansionsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type KuaData = CalculateKuaNumberResponse | GenerateEightMansionsResponse;
/**
 * Kua number and the Eight Mansions. Pass `data` from POST /feng-shui/kua, or set
 * `mode="mansions"` and pass POST /feng-shui/eight-mansions.
 *
 * @remarks
 * The eight sectors are drawn on the same nine-palace grid as the flying-star plate, south at the
 * top, with the person's own Kua number and trigram in the centre where the plate puts the period
 * star. That is not decoration: a reader who has both cards open is looking at one building, and
 * two grids that disagree about which way is up cannot be laid over each other. The geometry is
 * shared rather than copied ({@link GRID_ORDER}), so the two cannot drift apart.
 *
 * **Four sectors are favourable and four are not, always, and the card shows all eight.** Ba Zhai
 * divides the compass in half for every Kua number, so a card that showed only the good directions
 * would be advice rather than the map, and a reader could not tell a missing sector from an
 * unfavourable one. Rank is printed beside each, because the four favourable sectors are ordered
 * and the first of them is the one a household gets right first.
 *
 * `hide-readings` keeps the whole map: every sector, its star, its nature, its rank and its domain,
 * the Kua number, the group, the trigram and the boundary date. The per-sector reading goes.
 *
 * **Every heading and fact label is now catalogued, and the compass grid reads the same published
 * option a Vastu facing field already publishes** (`displayOption(lang, 'facing', ...)`), so this
 * grid cannot disagree with that form field about what a compass direction is called. `sector.star`
 * has a localized display name (`starNameLocalized`); the trigram's own English name and the group
 * (east/west) it names carry no such sibling and stay exactly as the response sends them.
 */
export declare class RoxyKuaCard extends RoxyDataElement<KuaData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which read the response is: the Kua number alone, or the full Eight Mansions map. */
    mode: 'kua' | 'mansions';
    protected renderData(d: KuaData): import("lit").TemplateResult<1>;
    /** The single best and worst sector, which the mansions response names outright. */
    private renderBestWorst;
    /**
     * The compass heading for a grid position, read off the same published `facing` option a Vastu
     * form field already publishes so this grid cannot disagree with that field about what a
     * direction is called. The centre is not a compass sector and reads the shared `Center` word
     * instead.
     */
    private sectorHeading;
    /**
     * One cell of the map, found by sector name so the drawing order is this component's.
     *
     * @remarks
     * The centre is not a sector. Ba Zhai divides the eight compass directions and says nothing
     * about the middle of a building, so that cell carries the person the map is FOR: their Kua
     * number and the trigram it resolves to. Filling it with a ninth direction would invent a
     * reading the system does not have.
     */
    private renderSector;
    /** Every sector again as a list, which is where the per-sector reading lives. */
    private renderSectorRows;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-kua-card': RoxyKuaCard;
    }
}
export {};
