import { css } from 'lit';

/** Compact fact pairs that wrap to the available card width. */
export const factListStyles = css`
	.roxy-facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--roxy-space-sm, .5rem) var(--roxy-space-lg, 1.5rem);
		margin: var(--roxy-space-sm, .5rem) 0 0;
		font-size: var(--roxy-text-sm, .875rem);
		font-variant-numeric: tabular-nums;
	}
	.roxy-facts > div { min-width: 0; }
	.roxy-facts dt { color: var(--roxy-secondary, #475569); font-size: var(--roxy-text-xs, .75rem); }
	.roxy-facts dd { margin: 0; overflow-wrap: anywhere; }
`;
