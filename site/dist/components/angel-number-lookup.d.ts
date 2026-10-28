import type { AnalyzeNumberSequenceResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/**
 * Angel number lookup card. Renders /angel-numbers/lookup: the analysed sequence with its pattern classification (type, digit count, unique digits, palindrome, repeating), the context note when the caller said where the number was seen, the known angel-number meaning when the sequence is in the database, and the foundational digit-root meaning that interprets any sequence. Built for synchronicity trackers where users enter arbitrary numbers.
 */
export declare class RoxyAngelNumberLookup extends RoxyDataElement<AnalyzeNumberSequenceResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    protected renderData(d: AnalyzeNumberSequenceResponse): import("lit").TemplateResult<1>;
    private renderMeaning;
    /**
     * Render the foundational digit-root reading for an unknown sequence: keyword chips, the full life-area accordion (including money), and the affirmation. The digit-root meaning carries no biblical or shadow field, so only the life areas are passed through.
     */
    private renderRootMeaning;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-angel-number-lookup': RoxyAngelNumberLookup;
    }
}
