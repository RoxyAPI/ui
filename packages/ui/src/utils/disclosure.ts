import type { TemplateResult } from 'lit';
import { css, html } from 'lit';

/**
 * Disclosure chevron for `<details>`/`<summary>` accordions. Replaces the
 * browser default triangle with a thin chevron that rotates when the host
 * `<details>` opens. Render it inside the `<summary>` and pair with
 * {@link disclosureStyles}.
 */
export function chevron(): TemplateResult {
	return html`<svg
		class="roxy-chevron"
		viewBox="0 0 16 16"
		width="14"
		height="14"
		aria-hidden="true"
	>
		<path
			d="M4 6l4 4 4-4"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>`;
}

/**
 * Shared `<details>` accordion styling: hides the native disclosure triangle
 * and rotates the {@link chevron} 180 degrees when the accordion is open.
 * Import into any component that renders disclosure accordions so the chevron
 * looks and behaves identically.
 */
export const disclosureStyles = css`
	summary {
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	/* Explicit size: components that draw a chart set a global svg { width: 100% }
	   rule, and an element selector beats the SVG width/height attributes. This
	   class selector wins back the 14px icon size. */
	.roxy-chevron {
		flex-shrink: 0;
		width: 14px;
		height: 14px;
		aspect-ratio: auto;
		color: var(--roxy-muted, #71717a);
		transition: transform var(--roxy-motion-duration, 200ms)
			var(--roxy-motion-easing, ease);
	}
	details[open] > summary .roxy-chevron {
		transform: rotate(180deg);
	}
	@media (prefers-reduced-motion: reduce) {
		.roxy-chevron {
			transition: none;
		}
	}
`;
