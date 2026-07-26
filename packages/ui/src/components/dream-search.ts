import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { SearchDreamSymbolsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

type DreamSymbol = NonNullable<SearchDreamSymbolsResponse['symbols']>[number];

/**
 * Dream-symbol search results. Renders /dreams/symbols (the `q` search): the matched symbols as selectable tiles. In self-fetch mode the base renders the search input and this lists the matches. Selecting a result emits a `roxy-symbol-select` CustomEvent ({ id, name, letter }) that bubbles and is composed, so a host pairs it with a roxy-dream-card to show the full meaning. This is the dreams form-mode analog of roxy-location-search.
 */
@customElement('roxy-dream-search')
export class RoxyDreamSearch extends RoxyDataElement<SearchDreamSymbolsResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.count {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.grid {
				list-style: none;
				margin: 0;
				padding: 0;
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.result {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				width: 100%;
				text-align: left;
				font: inherit;
				color: var(--roxy-fg, #0a0a0a);
				background: transparent;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				cursor: pointer;
				transition: border-color 0.12s ease, background 0.12s ease;
			}
			.result:hover,
			.result:focus-visible {
				border-color: var(--roxy-accent, #f59e0b);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
				outline: none;
			}
			.letter {
				flex: none;
				width: 1.6rem;
				height: 1.6rem;
				display: grid;
				place-items: center;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
			}
			.name {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 500;
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No symbols match</div>`;
	}

	protected renderData(d: SearchDreamSymbolsResponse) {
		const symbols = d.symbols ?? [];
		if (symbols.length === 0) return this.renderEmpty();
		const total = typeof d.total === 'number' ? d.total : symbols.length;

		return html`<section class="wrap" aria-label="Dream symbols">
			<header class="head">
				<h2 class="title">Dream symbols</h2>
				<span class="count">${total} match${total === 1 ? '' : 'es'}</span>
			</header>
			<ul class="grid">
				${symbols.map(
					(s) => html`<li>
						<button type="button" class="result" @click=${() => this.select(s)}>
							${s.letter ? html`<span class="letter" aria-hidden="true">${s.letter}</span>` : nothing}
							<span class="name">${s.name}</span>
						</button>
					</li>`,
				)}
			</ul>
		</section>`;
	}

	/** Emit the chosen symbol so a host can load its detail (e.g. into a roxy-dream-card). */
	private select(s: DreamSymbol) {
		this.dispatchEvent(
			new CustomEvent('roxy-symbol-select', {
				detail: { id: s.id, name: s.name, letter: s.letter },
				bubbles: true,
				composed: true,
			}),
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-dream-search': RoxyDreamSearch;
	}
}
