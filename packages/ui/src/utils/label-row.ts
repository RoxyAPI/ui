import { css } from 'lit';

/**
 * A label beside a value or a written reading, one per row: the shape `roxy-kua-card`'s per-sector
 * reading, `roxy-flying-star-chart`'s per-palace reading, `roxy-dosha-constitution`'s per-factor
 * weight and `roxy-horoscope-card`'s dated events share, each keeping its own border, padding and
 * font-size on `.row` and taking the column rule from here.
 *
 * @remarks
 * **The label column never takes half the card.** `minmax(5rem, 9rem)` let the label grow with its
 * own content, and a translated direction or a factor name in the longer catalogue languages pushed
 * it toward half the row at 375px, the width a reading or a value most needs. `--roxy-label-col`
 * (`utils/base-styles.ts`, `minmax(0, 25%)`) caps it at a quarter regardless of how long the word
 * is; the label wraps inside that quarter rather than pushing the column wider, the same rule
 * `utils/stacked-table.ts` already applies to a table header cell. Read from the shared token
 * rather than repeating the ratio here so a non-prose label-plus-value component (a planet name
 * beside a bar, a Bazi element beside its count) can cap the same track without stacking.
 *
 * **Below 30rem the row stacks, label above body, the same breakpoint `roxy-kua-card` gives up its
 * plate grid at.** A capped label column is still a squeeze once the card itself is narrow: a
 * quarter of 260px is 65px, not enough for a word AND its reading beside it. Stacking removes the
 * column split entirely rather than shrinking it further, which is what `utils/stacked-table.ts`
 * already does for a table's own narrow prose column; this is the same fix for a row that is a
 * `<li>` rather than a `<tr>`.
 *
 * Import beside the component's own styles; keep `class="row"` on the row and do not redeclare
 * `display` or `grid-template-columns` on it locally, or the two rules race on source order and
 * the later one wins regardless of which is right.
 */
export const labelRowStyles = css`
	.row {
		display: grid;
		grid-template-columns: var(--roxy-label-col) minmax(0, 1fr);
	}
	@container (max-width: 30rem) {
		.row {
			grid-template-columns: minmax(0, 1fr);
		}
	}
`;
