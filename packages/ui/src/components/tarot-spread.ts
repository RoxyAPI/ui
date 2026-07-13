import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	CastCareerSpreadResponse,
	CastCelticCrossResponse,
	CastCustomSpreadResponse,
	CastLoveSpreadResponse,
	CastReadingResponse,
	CastThreeCardResponse,
	CastYesNoResponse,
	DrawCardsResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

type TarotSpreadData =
	| CastThreeCardResponse
	| CastCelticCrossResponse
	| CastLoveSpreadResponse
	| CastYesNoResponse
	| CastReadingResponse
	| CastCareerSpreadResponse
	| CastCustomSpreadResponse
	| DrawCardsResponse;

/**
 * Tarot spread card. Renders /tarot/spreads/{three-card,celtic-cross,love},
 * /tarot/yes-no, /tarot/draw responses.
 */
@customElement('roxy-tarot-spread')
export class RoxyTarotSpread extends RoxyDataElement<TarotSpreadData> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				justify-content: space-between;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
				align-items: baseline;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.question {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-style: italic;
			}

			.answer {
				display: inline-block;
				padding: 4px 14px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-base, 1rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.answer.yes {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.answer.no {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.answer.maybe {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 16%, transparent);
				color: var(--roxy-warning-fg, #9a3412);
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.verdict {
				display: grid;
				grid-template-columns: minmax(0, 8rem) 1fr;
				gap: var(--roxy-space-md, 1rem);
				align-items: start;
			}
			@container (max-width: 26rem) {
				.verdict {
					grid-template-columns: 1fr;
				}
			}
			.verdict .meta {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
				justify-items: start;
			}
			.arcana {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}

			.card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				background: var(--roxy-surface, #fff);
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin: 0;
			}
			.image {
				width: 100%;
				aspect-ratio: 0.6;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				border-radius: var(--roxy-radius-sm, 4px);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				overflow: hidden;
			}
			.image img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.image img.reversed {
				transform: rotate(180deg);
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.interp {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}

			.reading {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	@property({ type: String, reflect: true })
	spread:
		| 'three-card'
		| 'celtic-cross'
		| 'love'
		| 'career'
		| 'custom'
		| 'yes-no'
		| 'draw' = 'three-card';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No tarot spread</div>`;
	}

	protected renderData(d: TarotSpreadData) {
		const isYesNo = 'answer' in d;
		const isDrawn = 'cards' in d && !('spread' in d);
		const positions = isDrawn
			? []
			: 'positions' in d
				? (d.positions ?? [])
				: [];
		const cards = isDrawn && 'cards' in d ? (d as DrawCardsResponse).cards : [];
		const answer = isYesNo ? (d as CastYesNoResponse).answer : undefined;
		const strength = isYesNo ? (d as CastYesNoResponse).strength : undefined;
		const verdictCard = isYesNo ? (d as CastYesNoResponse).card : undefined;
		const spreadLabel =
			'spread' in d
				? (d as CastThreeCardResponse).spread
				: this.spread.replace(/-/g, ' ');
		const question =
			'question' in d ? (d as CastThreeCardResponse).question : undefined;
		const summary =
			'summary' in d ? (d as CastThreeCardResponse).summary : undefined;
		const yesNoInterp = isYesNo
			? (d as CastYesNoResponse).interpretation
			: undefined;
		const answerClass = answer
			? answer.toLowerCase().replace(/[^a-z]/g, '')
			: '';

		return html`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${spreadLabel}</h2>
				${question ? html`<span class="question">"${question}"</span>` : nothing}
			</header>
			${
				isYesNo
					? html`<div class="verdict">
						<div class="card">
							<div class="image">
								${
									verdictCard?.imageUrl
										? html`<img
											src=${verdictCard.imageUrl}
											alt=${verdictCard.name ?? 'tarot card'}
											class=${verdictCard.reversed ? 'reversed' : ''}
										/>`
										: html`${verdictCard?.name ?? '?'}`
								}
							</div>
							<p class="name">
								${verdictCard?.name ?? ''}
								${verdictCard?.reversed ? html`<small>(reversed)</small>` : nothing}
							</p>
							${verdictCard?.arcana ? html`<p class="arcana">${verdictCard.arcana} arcana</p>` : nothing}
						</div>
						<div class="meta">
							<div>
								<span class=${`answer ${answerClass}`}>${answer}</span>
								${strength ? html`<small> · ${strength}</small>` : nothing}
							</div>
							${
								verdictCard?.keywords && verdictCard.keywords.length > 0
									? html`<div class="chips">
										${verdictCard.keywords.map((k) => html`<span>${k}</span>`)}
									</div>`
									: nothing
							}
						</div>
					</div>`
					: nothing
			}
			${
				positions.length > 0
					? html`<div class="grid">
						${positions.map(
							(p) => html`<div class="card">
								<p class="label">${p.name ?? ''}</p>
								<div class="image">
									${
										p.card?.imageUrl
											? html`<img
												src=${p.card.imageUrl}
												alt=${p.card.name ?? 'tarot card'}
												class=${p.card.reversed ? 'reversed' : ''}
											/>`
											: html`${p.card?.name ?? '?'}`
									}
								</div>
								<p class="name">
									${p.card?.name ?? ''}
									${p.card?.reversed ? html`<small>(reversed)</small>` : nothing}
								</p>
								${p.interpretation ? html`<p class="interp">${p.interpretation}</p>` : nothing}
							</div>`,
						)}
					</div>`
					: nothing
			}
			${
				cards.length > 0
					? html`<div class="grid">
						${cards.map(
							(c) => html`<div class="card">
								<div class="image">
									${
										c.imageUrl
											? html`<img
												src=${c.imageUrl}
												alt=${c.name ?? 'tarot card'}
												class=${c.reversed ? 'reversed' : ''}
											/>`
											: html`${c.name ?? '?'}`
									}
								</div>
								<p class="name">
									${c.name ?? ''}
									${c.reversed ? html`<small>(reversed)</small>` : nothing}
								</p>
								${c.meaning ? html`<p class="interp">${c.meaning}</p>` : nothing}
							</div>`,
						)}
					</div>`
					: nothing
			}
			${summary ? html`<p class="reading">${summary}</p>` : nothing}
			${yesNoInterp ? html`<p class="reading">${yesNoInterp}</p>` : nothing}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-tarot-spread': RoxyTarotSpread;
	}
}
