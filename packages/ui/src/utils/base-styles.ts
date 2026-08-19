import { css } from 'lit';

/**
 * Shared host styles every component pulls in. Sets default font, color,
 * container query support, and the entry fade-in.
 */
export const baseStyles = css`
	:host {
		display: block;
		container-type: inline-size;
		font-family: var(
			--roxy-font-sans,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif
		);
		color: var(--roxy-fg, #0a0a0a);
		background: transparent;
		font-size: var(--roxy-text-base, 1rem);
		line-height: var(--roxy-leading-normal, 1.5);
		animation: roxy-fade-in var(--roxy-motion-duration, 200ms)
			var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
	}

	/**
	 * Opt out of the component's own card surface. When the embedder already
	 * wraps the component in their own card, set the \`bare\` attribute to drop
	 * the painted background + shadow so there is no nested card chrome. The
	 * inner border stays a hairline; override --roxy-border to remove it too.
	 */
	:host([bare]) {
		--roxy-surface: transparent;
		--roxy-shadow-sm: none;
		--roxy-shadow-md: none;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	/* Every component result heading and the self-fetch form title read the
	 * display-font token. It defaults to --roxy-font-sans, so this is a no-op for
	 * existing consumers; a preset that sets --roxy-font-display (the practitioner
	 * theme ships a serif) restyles every heading in one token with no per-component
	 * markup change. */
	h1,
	h2,
	h3,
	h4 {
		font-family: var(
			--roxy-font-display,
			var(
				--roxy-font-sans,
				system-ui,
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				sans-serif
			)
		);
	}

	@keyframes roxy-fade-in {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:host {
			animation: none;
		}
	}

	.roxy-skeleton {
		background: linear-gradient(
			90deg,
			var(--roxy-border, #e4e4e7) 0%,
			color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent) 50%,
			var(--roxy-border, #e4e4e7) 100%
		);
		background-size: 200% 100%;
		animation: roxy-shimmer 1.4s ease-in-out infinite;
		border-radius: var(--roxy-radius-md, 8px);
	}

	@keyframes roxy-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.roxy-skeleton {
			animation: none;
		}
	}

	/* Removed from the visual layout but kept in the accessibility tree. The data
	 * tables use it on their <caption> so a screen-reader user hears what the
	 * table holds before the first cell, while the rendered card is unchanged.
	 * Out of flow, 1px and clipped, so it can never shift or widen its parent. */
	.roxy-sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: 0;
		padding: 0;
		border: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.roxy-empty {
		padding: var(--roxy-space-lg, 1.5rem);
		color: var(--roxy-muted, #71717a);
		text-align: center;
		font-size: var(--roxy-text-sm, 0.875rem);
	}

	.roxy-error {
		display: grid;
		gap: var(--roxy-space-sm, 0.5rem);
		justify-items: start;
		padding: var(--roxy-space-lg, 1.5rem);
		background: var(--roxy-surface, #fff);
		border: 1px solid var(--roxy-danger, #dc2626);
		border-radius: var(--roxy-radius-md, 8px);
		color: var(--roxy-danger-fg, #991b1b);
		font-size: var(--roxy-text-sm, 0.875rem);
	}

	:host(:focus-within) .roxy-card {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
	}

	/* Credit line under a self-fetch or auto-mount result (never controlled mode). */
	.roxy-attribution {
		margin-top: var(--roxy-space-sm, 0.5rem);
		font-size: var(--roxy-text-xs, 0.75rem);
		color: var(--roxy-muted, #71717a);
		text-align: right;
	}
	.roxy-attribution a {
		color: inherit;
		text-decoration: none;
	}
	.roxy-attribution a:hover {
		color: var(--roxy-accent-ink, #b45309);
		text-decoration: underline;
	}
	.roxy-attribution a:focus-visible {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
	}

	/* Re-query affordance above a self-fetch result (uncontrolled mode only). */
	.roxy-edit-bar {
		display: flex;
		justify-content: flex-end;
		margin-bottom: var(--roxy-space-sm, 0.5rem);
	}
	.roxy-edit {
		padding: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
		background: none;
		border: 1px solid var(--roxy-border, #e4e4e7);
		border-radius: var(--roxy-radius-md, 8px);
		color: var(--roxy-fg, #0a0a0a);
		font-family: inherit;
		font-size: var(--roxy-text-sm, 0.875rem);
		cursor: pointer;
	}
	.roxy-edit:hover {
		border-color: var(--roxy-accent, #f59e0b);
		color: var(--roxy-accent-ink, #b45309);
	}
	.roxy-edit:focus-visible {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
	}

	/* Force the text-style variant on every Unicode glyph in the component.
	 * macOS and iOS substitute coloured emoji glyphs for the planetary and
	 * gender Unicode code points (Mars, Venus, Mercury, etc.) when the
	 * system colour-emoji font wins font selection. The text-style variant
	 * keeps glyphs monochrome so they inherit the surrounding fill colour
	 * and match the brand palette consistently across platforms.
	 *
	 * font-variant-emoji is part of CSS Fonts 4 (Safari 17+, Chrome 134+,
	 * Firefox 139+). On older browsers the rule is silently ignored.
	 */
	:host {
		font-variant-emoji: text;
	}
`;
