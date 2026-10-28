/**
 * The heading a nine-palace plate cell reads off first: the compass sector or the palace name atop
 * `roxy-kua-card` and `roxy-flying-star-chart`, in sentence case like every other label.
 *
 * @remarks
 * **A compass word never breaks inside itself.** `hyphens: manual` allows a break only at a hyphen
 * the catalogue wrote (French, Russian and Hindi write their diagonals with one), never inside a word
 * a reader identifies a sector by.
 *
 * **The narrow size is measured.** `Nordwesten` is the longest unhyphenated compass word across the
 * shipped catalogues; in this heading's bold weight it fits the tightest three-column plate cell two
 * text steps below the extra-small size, which the container query applies at the width
 * `roxy-kua-card` gives up its grid. An eighth catalogue changes this measurement and this comment.
 *
 * Add `class="plate-heading"` beside the component's own name class and keep only position or a state
 * colour in that class, since this is the one source of the heading's type.
 */
export declare const plateHeadingStyles: import("lit").CSSResult;
