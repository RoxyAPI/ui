import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GetCardResponse, GetDailyCardResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

type TarotData = GetCardResponse | GetDailyCardResponse;

/**
 * Tarot card. Renders /tarot/cards/{id} or /tarot/daily. Click to flip
 * between upright and reversed where the data shape supports it.
 */
@customElement('roxy-tarot-card')
export class RoxyTarotCard extends RoxyDataElement<TarotData> {
	static styles = [
		baseStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: minmax(0, 9rem) 1fr;
				gap: var(--roxy-space-lg, 1.5rem);
				align-items: start;
			}

			@container (max-width: 480px) {
				.card {
					grid-template-columns: 1fr;
				}
			}

			.image-wrap {
				perspective: 800px;
			}
			.image {
				display: block;
				width: 100%;
				height: auto;
				border-radius: var(--roxy-radius-md, 8px);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
				cursor: pointer;
			}
			.image.reversed {
				transform: rotate(180deg);
			}
			.image:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}

			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.meta {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: var(--roxy-space-sm, 0.5rem);
			}

			.message {
				color: var(--roxy-fg, #0a0a0a);
				margin: var(--roxy-space-sm, 0.5rem) 0 var(--roxy-space-md, 1rem);
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.flip {
				margin-top: var(--roxy-space-sm, 0.5rem);
				background: transparent;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: 4px 12px;
				font-family: inherit;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				cursor: pointer;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.flip:hover {
				transform: scale(1.02);
			}
		`,
	];

	@state()
	private flipped = false;

	private toggleFlip = () => {
		this.flipped = !this.flipped;
	};

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No tarot data</div>`;
	}

	protected renderData(d: TarotData) {
		if ('card' in d) return this.renderDailyCard(d);
		return this.renderFullCard(d);
	}

	private renderDailyCard(d: GetDailyCardResponse) {
		const card = d.card;
		const isReversed = this.flipped !== Boolean(card.reversed);
		const keywords = card.keywords ?? [];

		return html`<article class="card" aria-label=${card.name ?? 'Tarot card'}>
			<div class="image-wrap">
				${
					card.imageUrl
						? html`<img
							class=${`image ${isReversed ? 'reversed' : ''}`}
							src=${card.imageUrl}
							alt=${card.name ?? 'Tarot card'}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${(e: KeyboardEvent) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									this.toggleFlip();
								}
							}}
						/>`
						: html`<div
							class=${`image ${isReversed ? 'reversed' : ''}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${card.name ?? '?'}
						</div>`
				}
			</div>
			<div>
				<div class="meta">
					${card.arcana ? html`${card.arcana} arcana` : nothing}
					${isReversed ? html` · reversed` : nothing}
				</div>
				<h2 class="title">${card.name ?? 'Tarot card'}</h2>
				${d.dailyMessage ? html`<p class="message">${d.dailyMessage}</p>` : nothing}
				${card.meaning ? html`<p>${card.meaning}</p>` : nothing}
				${
					keywords.length > 0
						? html`<div class="chips">
							${keywords.map((k) => html`<span>${k}</span>`)}
						</div>`
						: nothing
				}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped ? 'true' : 'false'}
				>
					Flip card
				</button>
			</div>
		</article>`;
	}

	private renderFullCard(d: GetCardResponse) {
		const isReversed = this.flipped;
		const orientedMeaning = isReversed ? d.reversed : d.upright;
		const keywords = isReversed
			? (d.keywords?.reversed ?? [])
			: (d.keywords?.upright ?? []);

		return html`<article class="card" aria-label=${d.name ?? 'Tarot card'}>
			<div class="image-wrap">
				${
					d.imageUrl
						? html`<img
							class=${`image ${isReversed ? 'reversed' : ''}`}
							src=${d.imageUrl}
							alt=${d.name ?? 'Tarot card'}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${(e: KeyboardEvent) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									this.toggleFlip();
								}
							}}
						/>`
						: html`<div
							class=${`image ${isReversed ? 'reversed' : ''}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${d.name ?? '?'}
						</div>`
				}
			</div>
			<div>
				<div class="meta">
					${d.arcana ? html`${d.arcana} arcana` : nothing}
					${d.number !== undefined && d.number !== null ? html` · ${d.number}` : nothing}
					${isReversed ? html` · reversed` : nothing}
				</div>
				<h2 class="title">${d.name ?? 'Tarot card'}</h2>
				${orientedMeaning?.description ? html`<p>${orientedMeaning.description}</p>` : nothing}
				${
					keywords.length > 0
						? html`<div class="chips">
							${keywords.map((k) => html`<span>${k}</span>`)}
						</div>`
						: nothing
				}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped ? 'true' : 'false'}
				>
					Flip card
				</button>
			</div>
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-tarot-card': RoxyTarotCard;
	}
}
