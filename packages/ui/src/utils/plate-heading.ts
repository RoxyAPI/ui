import { css } from 'lit';

/**
 * The heading a nine-palace plate cell reads off first: the compass sector or the palace name atop
 * `roxy-kua-card` and `roxy-flying-star-chart`.
 *
 * @remarks
 * **A compass word never breaks inside itself.** `overflow-wrap: anywhere` fixes an overflow by
 * letting the browser split a word at an arbitrary glyph, which for a heading a reader identifies a
 * SECTOR by (`SOUTHWEST`, `Südwesten`) trades a clipped word for a word broken in two, neither of
 * which a practitioner can read at a glance. `hyphens: manual` is declared instead, which changes
 * nothing about the CSS default but states outright that only a hyphen the CATALOGUE wrote is a
 * legal break: French, Russian and Hindi already write their diagonal directions with one (`Nord-
 * Ouest`, `Северо-запад`, `दक्षिण-पश्चिम`), so those wrap there for free, and nothing here inserts a
 * soft hyphen or an automatic one.
 *
 * **The size is picked from a measurement, not a guess.** `Nordwesten` (German, ten Latin letters,
 * no hyphen) is the longest compass word across the seven shipped catalogues; every other
 * unhyphenated one (Turkish, Spanish, Portuguese) is shorter, and the three hyphenated ones above
 * can fall back to their own break point if they ever needed to. Measured against this library's
 * OWN tightest column, a three-column plate at 375px width (roughly 66px of cell room once the
 * cell's own padding is subtracted), `Nordwesten` set in this heading's bold weight fits at
 * `font-size: 0.5rem` with `letter-spacing: 0`, with a few pixels to spare; the unreduced size
 * overflows it by nearly 40px. A future eighth catalogue changes this measurement and this comment
 * both.
 *
 * The container query is what applies the reduced size, at the same width `roxy-kua-card` gives up
 * its grid for a stacked list (see that component), so a plate that is still a grid at this width
 * (`roxy-flying-star-chart`, always) is exactly the one still tight enough to need it.
 *
 * Both components already declare a `part="plate"` on this grid (`layout.e2e.ts` "every grid plate
 * fills its card"), so this heading is the one place inside it a text node could still overflow its
 * own cell without the card itself overflowing, and that gate does not look inside a cell; a second
 * gate there measures every element in a cell, not just this one.
 *
 * Add class="plate-heading" alongside the component's own name class (`sector-name`, `palace-name`,
 * ...) and drop that class's own font rules, since this is now their only source; a card's own rule
 * keeps only what is genuinely its own (position, a tinted-state color override) or the two would
 * disagree about which one wins. Import this beside the component's own styles.
 */
export const plateHeadingStyles = css`
	.plate-heading {
		font-size: var(--roxy-text-xs, 0.75rem);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--roxy-muted, #71717a);
		font-weight: var(--roxy-weight-bold, 600);
		hyphens: manual;
	}
	@container (max-width: 30rem) {
		.plate-heading {
			font-size: 0.5rem;
			letter-spacing: 0;
		}
	}
`;
