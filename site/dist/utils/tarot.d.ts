/** The published name of an arcana in the page language (`Major Arcana`, `Große Arkana`), read from the API option labels. */
export declare function arcanaText(locale: string | undefined, arcana: string): string;
/** The published name of a suit in the page language (`Cups`, `Kelche`), read from the API option labels. */
export declare function suitText(locale: string | undefined, suit: string): string;
/** The five life-area readings every tarot card carries for the orientation it is read in, each with its heading. */
export declare const LIFE_AREAS: readonly [readonly ["love", "Love"], readonly ["career", "Career"], readonly ["finances", "Finance"], readonly ["health", "Health"], readonly ["spirituality", "Spiritual"]];
/** The proportion of every card image the API serves, so a box sized to it shows the whole card, numeral and title included. */
export declare const cardArtStyles: import("lit").CSSResult;
