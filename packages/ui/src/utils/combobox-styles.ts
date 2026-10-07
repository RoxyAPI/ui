import { css } from 'lit';

/** The dropdown of a search-as-you-type box (its spinner, listbox, options and empty row), shared by the city search and the identifier picker so the two read as one family. */
export const comboboxStyles = css`
	.spinner {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		width: 14px;
		height: 14px;
		border: 2px solid var(--roxy-muted, #71717a);
		border-top-color: transparent;
		border-radius: 50%;
		animation: roxy-spin 700ms linear infinite;
	}
	@keyframes roxy-spin {
		to {
			transform: translateY(-50%) rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation: none;
		}
	}

	.results {
		position: absolute;
		z-index: 50;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		/* Reset the UA <ul> defaults, or the listbox shows disc bullets and a
		 * ~40px inline indent. Small even inset so rounded rows never clip the
		 * container corners. */
		margin: 0;
		padding: var(--roxy-space-xs, 0.25rem);
		list-style: none;
		background: var(--roxy-bg, #fff);
		border: 1px solid var(--roxy-border, #e4e4e7);
		border-radius: var(--roxy-radius-md, 8px);
		box-shadow: var(--roxy-shadow-md);
		max-height: 22rem;
		overflow-y: auto;
		animation: roxy-fade-in var(--roxy-motion-duration, 200ms)
			var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
	}
	.option {
		display: flex;
		align-items: center;
		gap: var(--roxy-space-sm, 0.5rem);
		width: 100%;
		padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
		background: transparent;
		border: 0;
		border-radius: var(--roxy-radius-sm, 6px);
		text-align: left;
		font-family: inherit;
		font-size: var(--roxy-text-sm, 0.875rem);
		color: var(--roxy-fg, #0a0a0a);
		cursor: pointer;
		transition: background-color var(--roxy-motion-duration, 200ms);
	}
	.option:hover,
	.option[aria-selected='true'] {
		background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
	}
	.empty {
		padding: var(--roxy-space-md, 1rem);
		color: var(--roxy-muted, #71717a);
		font-size: var(--roxy-text-sm, 0.875rem);
	}
`;
