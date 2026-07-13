import type { TemplateResult } from 'lit';
import { css, html, nothing } from 'lit';

/** A single tab in a {@link renderTablist} strip. */
export interface TablistItem<T extends string = string> {
	id: T;
	label: string;
}

/**
 * Shared styling for every horizontal tab strip in the library (natal chart
 * views, transits, kundli styles). Keeping one rule set means the tabs look
 * identical everywhere and theme through the same --roxy-* tokens.
 */
export const tablistStyles = css`
	/* Scroll, do not overflow. Four long labels (ashtakavarga ships
	 * "Sarvashtakavarga", "Bhinnashtakavarga", "Reduced", "Shodhya Pinda") are wider
	 * than a narrow card, and without this the last tab was clipped by the card edge.
	 * min-width: 0 is what lets a flex or grid item shrink below its min-content and
	 * therefore actually scroll. */
	.roxy-tablist {
		display: flex;
		gap: 2px;
		border-bottom: 2px solid var(--roxy-border, #e4e4e7);
		overflow-x: auto;
		min-width: 0;
		scrollbar-width: thin;
	}
	.roxy-tab {
		/* Never squash a label to fit: a tab that reads "Sarvashtak..." is worse than
		 * one the reader scrolls to. */
		flex-shrink: 0;
		padding: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
		font-size: var(--roxy-text-sm, 0.875rem);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -2px;
		cursor: pointer;
		color: var(--roxy-muted, #71717a);
		font-family: inherit;
		transition: color var(--roxy-motion-duration, 200ms)
			var(--roxy-motion-easing, ease);
	}
	.roxy-tab[aria-selected='true'] {
		color: var(--roxy-accent-ink, #b45309);
		border-bottom-color: var(--roxy-accent, #f59e0b);
		font-weight: var(--roxy-weight-bold, 600);
	}
	.roxy-tab:hover:not([aria-selected='true']) {
		color: var(--roxy-fg, #0a0a0a);
	}
	.roxy-tab:focus-visible {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
		border-radius: 4px;
	}
`;

/**
 * Render a WAI-ARIA tablist. The host component owns the active-tab state; this
 * helper draws the buttons, wires click plus Left/Right arrow navigation with a
 * roving tabindex, and moves focus to the newly selected tab. Pair with
 * {@link tablistStyles}.
 *
 * Pass `controls: true` when each tab governs a sibling
 * `<div role="tabpanel" id="${idPrefix}-panel-${id}">` so the buttons advertise
 * `aria-controls`. Omit it for tablists that swap a single rendered view in
 * place with no separate panel element (the kundli style switch).
 *
 * @example
 * ```ts
 * renderTablist({
 *   items: [{ id: 'wheel', label: 'Wheel' }, { id: 'grid', label: 'Aspect grid' }],
 *   active: this.view,
 *   onSelect: (v) => { this.view = v; },
 *   label: 'Natal chart views',
 *   idPrefix: 'natal',
 *   controls: true,
 * })
 * ```
 */
export function renderTablist<T extends string>(opts: {
	items: ReadonlyArray<TablistItem<T>>;
	active: T;
	onSelect: (id: T) => void;
	label: string;
	idPrefix: string;
	controls?: boolean;
}): TemplateResult {
	const { items, active, onSelect, label, idPrefix, controls = false } = opts;
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		e.preventDefault();
		const idx = items.findIndex((it) => it.id === active);
		if (idx === -1) return;
		const delta = e.key === 'ArrowRight' ? 1 : -1;
		const next = items[(idx + delta + items.length) % items.length];
		if (!next) return;
		onSelect(next.id);
		const root = (e.currentTarget as HTMLElement).getRootNode() as
			| ShadowRoot
			| Document;
		requestAnimationFrame(() => {
			root
				.querySelector<HTMLButtonElement>(`#${idPrefix}-tab-${next.id}`)
				?.focus();
		});
	};
	return html`<div
		class="roxy-tablist"
		role="tablist"
		aria-label=${label}
		@keydown=${onKeyDown}
	>
		${items.map(
			(it) => html`<button
				type="button"
				class="roxy-tab"
				role="tab"
				id="${idPrefix}-tab-${it.id}"
				aria-selected=${active === it.id ? 'true' : 'false'}
				aria-controls=${
					// Only the active panel is rendered, so only the active tab points
					// at a live element; otherwise aria-controls would dangle.
					controls && active === it.id ? `${idPrefix}-panel-${it.id}` : nothing
				}
				tabindex=${active === it.id ? '0' : '-1'}
				@click=${() => onSelect(it.id)}
			>
				${it.label}
			</button>`,
		)}
	</div>`;
}
