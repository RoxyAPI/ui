import { css } from 'lit';

/**
 * The heading a nine-palace plate cell reads off first: the compass sector or the palace name atop
 * `roxy-kua-card` and `roxy-flying-star-chart`.
 *
 * @remarks
 * **Six of the seven catalogue languages write a longer word than English here**, and the plate has
 * no width cap of its own (`part="plate"` fills whatever the host gives it, per the layout rule that
 * a chart card is read off), so a host narrow enough to give a nine-palace grid three columns under
 * 375px hands each cell a fixed few characters of room. `SOUTHWEST` already crowds that; `Südwesten`,
 * `Sud-ouest` and `Nordwesten` crowd it further. A hard truncation or an abbreviation would hide the
 * one word this plate is read by, so the heading wraps instead: `overflow-wrap: anywhere` is the
 * specific value that matters here rather than `break-word`, because only `anywhere` is counted by
 * the grid track-sizing algorithm's own minimum-size calculation, which is what lets a `minmax(0,
 * 1fr)` column actually shrink to the cell width instead of stopping at the word's unbroken
 * min-content size. The container query beneath it is a second line of defense once the cell is
 * narrow enough that the tracked, uppercase form no longer earns its width: it drops the tracking
 * and steps the size down one notch, which is what keeps most cells to their one line rather than
 * making every cell wrap by default.
 *
 * Both components already declare a `part="plate"` on this grid (`layout.e2e.ts` "every grid plate
 * fills its card"), so this heading is the one place inside it a text node can still overflow its
 * own cell without the card itself overflowing, and that gate does not look inside a cell.
 *
 * Add class="plate-heading" alongside the component's own name class (`sector-name`, `palace-name`,
 * ...), which keeps its per-card color and position rules; import this beside the component's own
 * styles.
 */
export const plateHeadingStyles = css`
	.plate-heading {
		overflow-wrap: anywhere;
		line-height: 1.2;
	}
	@container (max-width: 26rem) {
		.plate-heading {
			font-size: 0.6875rem;
			letter-spacing: 0.01em;
		}
	}
`;
