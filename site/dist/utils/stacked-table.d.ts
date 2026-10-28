/**
 * A data table that stacks into rows of label and value once its card is too narrow to hold its columns.
 *
 * @remarks
 * **The case it exists for is a table carrying a PROSE column.** Three columns share a card happily
 * until one of them holds a sentence: on a phone the sentence gets whatever is left after the other
 * two, which is around a third of 250 pixels, and a paragraph rendered five characters wide is a
 * column of one word lines. A horizontal scroll box does not answer it either, because the reader is
 * then scrolling a paragraph rather than reading it.
 *
 * Stacked, each cell takes the full width with its column heading in front of it, and the prose gets
 * the whole card. The heading comes from `data-label` on the cell, painted through `content`, so the
 * markup stays ONE table and there is no second render path to keep in step. Two consequences worth
 * knowing: the label is translated copy, so it goes through `t()` like any other string and the i18n
 * scan reads that attribute; and painted text is not selectable, which is why the value stays a real
 * text node and only the heading is painted.
 *
 * Opt in with `class="stacked"` on the table plus a `data-label` per cell, and import this beside the
 * component's own styles. Everything above the breakpoint is untouched, so a card that has room keeps
 * its table.
 */
export declare const stackedTableStyles: import("lit").CSSResult;
