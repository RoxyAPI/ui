import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ListCardsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { arcanaText, suitText } from '../utils/tarot.js';

/** A single card row from the catalog response. Kept spec-derived so the tile never reads a field the API does not return. */
type CatalogCard = ListCardsResponse['cards'][number];

/**
 * Tarot catalog. Renders GET /tarot/cards as a responsive gallery of the deck: each tile carries the Rider-Waite-Smith artwork, the card name, and an arcana and suit caption. A picked tile emits `roxy-symbol-select` ({ id, name }) for a host that pairs its own `<roxy-tarot-card>`, and in self-fetch mode the deck opens on load under its arcana and suit filters, pages on with Show more, and opens the picked card under the gallery itself.
 */
@customElement('roxy-tarot-catalog')
export class RoxyTarotCatalog extends RoxyDataElement<ListCardsResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
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
				width: 100%;
				text-align: left;
				font: inherit;
				color: inherit;
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				box-shadow: var(--roxy-shadow-sm);
				cursor: pointer;
				transition: border-color 0.12s ease;
			}
			.tile[aria-pressed='true'],
			.tile:hover,
			.tile:focus-visible {
				border-color: var(--roxy-accent, #f59e0b);
				outline: none;
			}
			.detail {
				margin-top: var(--roxy-space-md, 1rem);
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

	/**
	 * Override the auto-derived gallery heading. Empty by default, in which case the heading is "Tarot deck".
	 */
	@property({ type: String, reflect: true })
	heading = '';

	protected rowDetail = { tag: 'roxy-tarot-card', path: 'tarot/cards/{id}' };

	protected listKey = 'cards';

	protected renderData(d: ListCardsResponse) {
		const cards = d.cards ?? [];
		if (cards.length === 0) return this.renderEmpty();

		const title = this.heading || this.t('Tarot deck');
		const total = typeof d.total === 'number' ? d.total : cards.length;
		const locale = this.effectiveLang();

		return html`<section class="wrap" part="card" aria-label=${title}>
			<header class="head" part="header">
				<h2 class="title">${title}</h2>
				<span class="count">${total === 1 ? this.t('1 card') : this.t('{{count}} cards', { count: total })}</span>
			</header>
			<ul class="grid" part="section cards">
				${cards.map(
					(c) => html`<li>
						<button
							type="button"
							class="tile"
							aria-pressed=${this.openedRowId === c.id ? 'true' : 'false'}
							@click=${() => this.pickRow({ id: c.id, name: c.name })}
						>
							${
								c.imageUrl
									? html`<img class="art" src=${c.imageUrl} alt=${c.name ?? this.t('Tarot card')} loading="lazy" />`
									: html`<div class="art" aria-hidden="true"></div>`
							}
							<p class="name">${c.name}</p>
							<p class="meta">${cardMeta(locale, c)}</p>
						</button>
					</li>`,
				)}
			</ul>
			${this.renderMore()}
			${this.openedRow ? html`<div class="detail" part="detail">${this.openedRow}</div>` : nothing}
		</section>`;
	}
}

/** Caption line for a catalog tile: the published arcana name, and the suit for a minor card. */
function cardMeta(locale: string | undefined, c: CatalogCard): string {
	const arcana = arcanaText(locale, c.arcana);
	return c.suit ? `${arcana} · ${suitText(locale, c.suit)}` : arcana;
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-tarot-catalog': RoxyTarotCatalog;
	}
}
