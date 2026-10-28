import type { CalculateZodiacAnimalResponse, GetDailyZodiacReadingResponse, GetZodiacAnimalResponse, GetZodiacCompatibilityResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
type ZodiacData = CalculateZodiacAnimalResponse | GetZodiacAnimalResponse | GetDailyZodiacReadingResponse | GetZodiacCompatibilityResponse;
/**
 * Chinese zodiac card. Pass `data` from POST /chinese-astrology/zodiac/sign,
 * GET /chinese-astrology/zodiac/animals/{id}, GET /chinese-astrology/zodiac/{id}/daily, or
 * GET /chinese-astrology/zodiac/compatibility/{sign1}/{sign2}, and set `mode` to match.
 *
 * @remarks
 * Four questions about the same twelve animals, so one card with four layouts rather than four
 * cards that would each redraw the identity block: the animal in hanzi, its romanisation, its
 * element and its polarity. **The hanzi is the identity**, identical in every language the API
 * serves, so it leads and the name sits under it.
 *
 * The animal a date falls in is NOT the animal of the calendar year it falls in, and the card says
 * so by printing the year boundary the response was computed under. A birth in late January is the
 * case that separates the two rules, and a card that hides which one produced its answer cannot be
 * reconciled against the almanac a reader already owns.
 *
 * `hide-readings` keeps every structural fact and drops the prose: the animal, the pillar, the
 * element and polarity, the hours the branch governs, the trine and the three partner animals, the
 * compatibility score and its named relationship all stay. The interpretation, the daily overview
 * and its three topic paragraphs, the traits, strengths and weaknesses lists, the summaries and the
 * advice go.
 *
 * **Every heading, fact label and closed-enum badge is now catalogued; the response vocabulary this
 * card cannot get a display form for stays English.** The identity name, the trine's element, every
 * partner animal and the compatibility pairing's relationship name all echo a `nameLocalized` or
 * `elementLocalized` sibling and are read through {@link display}. The six-value relationship type a
 * daily reading names (`secret-friend`, `trine`, `same`, `neutral`, `harm`, `clash`) and the
 * five-band compatibility verdict carry no such sibling, so the component looks them up itself
 * through {@link RELATIONSHIP_LABEL} and {@link VERDICT_LABEL}.
 */
export declare class RoxyZodiacCard extends RoxyDataElement<ZodiacData> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** Which of the four zodiac reads the response is. */
    mode: 'sign' | 'animal' | 'daily' | 'compatibility';
    protected renderData(d: ZodiacData): import("lit").TemplateResult<1>;
    /** The facts that identify the animal itself: its element and polarity, its branch, and the pillar it came from. */
    private renderIdentity;
    /** A double hour printed as a 24-hour clock, which is how an almanac prints it in every language. */
    private hourLabel;
    /** The daily reading: what the day's pillar does to this animal, and the year it sits inside. */
    private renderDaily;
    /** The reference read of one animal: its trine, its three partner animals, and the lists that describe it. */
    private renderReference;
    /**
     * The three animals the tradition pairs this one with, and it names all three roles.
     *
     * @remarks
     * The secret friend and the clash are opposite verdicts on the same axis, so a card that shows
     * one and not the other reads as advice rather than as the structure it is. All three or none.
     */
    private renderPartners;
    /** A named list of sentences laid out as bullets, which is a reading rather than a fact. */
    private bullets;
    /** Two animals and the named relationship between them, scored. */
    private renderCompatibility;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-zodiac-card': RoxyZodiacCard;
    }
}
export {};
