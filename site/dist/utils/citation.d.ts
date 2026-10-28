/**
 * Where one claim in a response comes from: a work, a place inside it, and the edition it was read in.
 *
 * @remarks
 * Structural rather than imported from one response type, because several schemas carry the same
 * object and a component should not have to name whichever one it happens to render. Every field is
 * optional here so a caller can pass what its own endpoint echoes.
 */
export interface SourceCitation {
    text?: string;
    chapter?: string | number;
    verse?: string;
    translation?: string | null;
    year?: number | null;
    publicDomain?: boolean;
    basis?: string;
}
/**
 * One citation as a line: the work, the place inside it, and the edition where one is named.
 *
 * @remarks
 * **A verse is not always a number, so the two halves are never joined blindly.** A chapter and a
 * numbered verse read as `53.72`, which is how every printed edition is cited and how a reader finds
 * the passage. A verse that is a SENTENCE, because the claim sits in an appended note or a
 * commentary rather than in a numbered verse, reads as its own clause instead: joining it with a
 * point would manufacture a reference no edition contains.
 *
 * **A citation with no named translator is a reference, not a quotation, and it stays one.** The
 * translator and the year are printed only where the response carries them; a work with no
 * public-domain English is cited by work and verse and nothing more, so dropping the pair silently
 * would make a referenced-only claim look like a quoted one.
 *
 * The work title is humanized because the same field carries the literal value `convention` where no
 * verse states the rule, and that reads as a word rather than as an identifier.
 */
export declare function citationLine(c: SourceCitation): string;
