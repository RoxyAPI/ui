import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ListCardsResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { MarkupDataController } from '../utils/markup-data.js';
import { capitalize } from '../utils/string.js';

/** A single card row from the catalog response. Kept spec-derived so the tile never reads a field the API does not return. */
type CatalogCard = ListCardsResponse['cards'][number];

/**
 * Tarot catalog. Renders GET /tarot/cards as a responsive gallery of the deck: each tile carries the Rider-Waite-Smith artwork, the card name, and an arcana/suit caption. Filter the deck server-side (arcana, suit, number, paging) and pass the page response; the component renders whatever cards it carries. Pairs with `<roxy-tarot-card>` for a single-card detail view and `<roxy-tarot-spread>` for readings.
 */
@customElement('roxy-tarot-catalog')
export class RoxyTarotCatalog extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.count {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				margin: 0;
				padding: 0;
				list-style: none;
			}
			.tile {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.art {
				aspect-ratio: 2 / 3;
				width: 100%;
				border-radius: var(--roxy-radius-sm, 4px);
				object-fit: cover;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 35%, transparent);
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.meta {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
		`,
	];

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: ListCardsResponse | null = null;

	/**
	 * Override the auto-derived gallery heading. Empty by default, in which case the heading is "Tarot deck".
	 */
	@property({ type: String, reflect: true })
	heading = '';

	render() {
		const d = this.data;
		const cards = d?.cards ?? [];
		if (!d || cards.length === 0)
			return html`<div class="roxy-empty" role="status">No cards</div>`;

		const title = this.heading || 'Tarot deck';
		const total = typeof d.total === 'number' ? d.total : cards.length;

		return html`<section class="wrap" aria-label=${title}>
			<header class="head">
				<h2 class="title">${title}</h2>
				<span class="count">${total} ${total === 1 ? 'card' : 'cards'}</span>
			</header>
			<ul class="grid">
				${cards.map(
					(c) => html`<li class="tile">
						${
							c.imageUrl
								? html`<img class="art" src=${c.imageUrl} alt=${c.name ?? 'Tarot card'} loading="lazy" />`
								: html`<div class="art" aria-hidden="true"></div>`
						}
						<p class="name">${c.name}</p>
						<p class="meta">${cardMeta(c)}</p>
					</li>`,
				)}
			</ul>
		</section>`;
	}
}

/**
 * Caption line for a catalog tile. Minor Arcana cards name their suit (`Minor · Cups`); Major Arcana cards read `Major Arcana`. Both derive only from the spec `arcana` and `suit` fields.
 */
function cardMeta(c: CatalogCard): string {
	if (c.suit) return `${capitalize(c.arcana)} · ${capitalize(c.suit)}`;
	return `${capitalize(c.arcana)} Arcana`;
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-tarot-catalog': RoxyTarotCatalog;
	}
}
