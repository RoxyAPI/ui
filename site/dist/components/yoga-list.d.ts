import type { DetectYogasResponse, GetYogaResponse, ListYogasResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type YogaListData = ListYogasResponse | GetYogaResponse | DetectYogasResponse | {
    yogas: Array<GetYogaResponse>;
};
/**
 * The four Nabhasa families in the order the tradition arranges them, with the single-combination yogas first.
 *
 * @remarks
 * ORDER only, never membership. Every verdict carries its own `family`, so no yoga-to-family table belongs in this component; one would be a second source of truth that a rule change upstream could silently invalidate. A test binds this list to the response schema so a new family cannot arrive unordered.
 */
export declare const FAMILY_ORDER: readonly ['classical', 'asraya', 'dala', 'akriti', 'sankhya'];
/**
 * Yoga catalog and detail renderer. Accepts four data modes:
 *   - Catalog: ListYogasResponse (yogas array of {id, name} + total)
 *   - Detail: GetYogaResponse (single yoga with description, result, quality)
 *   - Detail array: { yogas: Array<GetYogaResponse> } for pre-filtered sets
 *   - Detect: DetectYogasResponse (each yoga carries a present verdict + evidence); grouped by verdict, each badged present, outranked or not present, with its classical evidence
 *
 * All multi-item modes include a live search filter.
 *
 * @remarks
 * Detect returns a verdict for every yoga in the detected set on every chart, of which a real chart fires low single digits, so a flat list buries the handful a reader came for. They are grouped by verdict, in reading order: what fired, what would have fired but was outranked, then everything that failed its rule, collapsed because it is reference rather than result. Every grouping and every label is read from the response, so this component holds no table of yoga data of its own.
 *
 * Verdict is the primary grouping and `family` the secondary sort within it, rather than grouping by family outright. A reader opens a detection result to learn what a chart has; the Nabhasa arrangement is how the set is catalogued, not what a chart says. Sorting inside each verdict gives the classical order where it is readable and keeps the answer at the top.
 *
 * The compact catalog mode shows no family chip: only part of the glossary is Nabhasa, so a chip on some rows and a gap on the rest reads as missing data. Filter the catalog with the `family` query parameter instead.
 *
 * `hide-readings` leaves the detection intact and takes the prose off each card: the `description` and the Effects disclosure go, and the name, quality chip, family chip and verdict badge stay, so a card with nothing to disclose renders in the flat shape it already uses. `evidence` stays with them, because it is the classical condition trace behind the verdict rather than a reading of it, the same provenance role the frame caption plays. The verdict group notes are this component's own copy explaining how to read the grouping, not something the endpoint returned, so they stay too.
 */
export declare class RoxyYogaList extends RoxyDataElement<YogaListData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    private filter;
    private readonly handleInput;
    /** The verdict a detected yoga falls under. Both signals come from the response, so nothing about the classical scheme is duplicated here. */
    private verdictOf;
    /**
     * One verdict group, or nothing when no yoga fell under it (a chart with no outranked yoga shows no Outranked heading).
     *
     * A `<details>` rather than a plain section: the rule-failed group is thirty-odd cards of reference on a real chart, and collapsing keeps it in the DOM, searchable and indexed, while the result stays at the top. A group forces itself open while a filter is active, so a match can never hide inside a collapsed heading.
     */
    private renderVerdictGroup;
    private renderQualityChip;
    /**
     * The classical family as a neutral chip. Rendered in all three modes because all three carry the field, and left out entirely when absent, which is the correct reading for a catalog row that is not Nabhasa.
     *
     * Capitalized rather than mapped: every value is already a Sanskrit proper noun, so a label table would be a second source of truth for five strings that need no translation.
     */
    private renderFamilyChip;
    private renderDetailCard;
    /**
     * The Effects disclosure, the one written reading a yoga card carries.
     *
     * @remarks
     * Deliberately NOT the shared `renderInterpAccordion`: that helper emits a titled `<section>` per accordion, and a detect response puts thirty-odd of these inside verdict groups, so each card would grow a Reading heading of its own. It is the same compact expander the verdict group above it uses, and it carries `part="reading"` so one `::part(reading)` rule still reaches it.
     */
    private renderEffects;
    /**
     * Detect-mode card: the three-way verdict, the classical family, and the evidence behind it.
     *
     * An outranked card names the family that silenced it (`Outranked by Akriti`) rather than saying only that something did. It is exact rather than parsed out of prose, and it reads the same under any `lang`.
     */
    private renderDetectCard;
    protected renderData(d: YogaListData): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-yoga-list': RoxyYogaList;
    }
}
export {};
