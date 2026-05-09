import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

interface TarotPosition {
	number?: number;
	label?: string;
	name?: string;
	position?: string;
	card?: {
		name?: string;
		imageUrl?: string;
		reversed?: boolean;
		keywords?: string[];
		arcana?: string;
	};
	interpretation?: string;
}

interface TarotSpreadData {
	spread?: string;
	positions?: TarotPosition[];
	cards?: TarotPosition[];
	reading?: string;
	question?: string;
	answer?: 'Yes' | 'No' | 'Maybe' | string;
	strength?: string;
	interpretation?: string;
}

/**
 * Tarot spread card. Renders /tarot/spreads/{three-card,celtic-cross,love},
 * /tarot/yes-no, /tarot/draw responses.
 */
@customElement('roxy-tarot-spread')
export class RoxyTarotSpread extends LitElement {
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
				color: var(--roxy-success, #16a34a);
			}
			.answer.no {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger, #dc2626);
			}
			.answer.maybe {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 16%, transparent);
				color: var(--roxy-warning, #ea580c);
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
				background: var(--roxy-bg, #fff);
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

	@property({ attribute: false })
	data: TarotSpreadData | null = null;

	@property({ type: String, reflect: true })
	spread: 'three-card' | 'celtic-cross' | 'love' | 'yes-no' | 'draw' =
		'three-card';

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No tarot spread</div>`;

		const positions = d.positions ?? d.cards ?? [];
		const isYesNo = !!d.answer;
		const answerClass = isYesNo
			? (d.answer ?? '').toLowerCase().replace(/[^a-z]/g, '')
			: '';

		return html`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${d.spread ?? this.spread.replace(/-/g, ' ')}</h2>
				${d.question ? html`<span class="question">"${d.question}"</span>` : nothing}
			</header>
			${
				isYesNo
					? html`<div>
						<span class=${`answer ${answerClass}`}>${d.answer}</span>
						${d.strength ? html`<small> · ${d.strength}</small>` : nothing}
					</div>`
					: nothing
			}
			${
				positions.length > 0
					? html`<div class="grid">
						${positions.map(
							(p) => html`<div class="card">
								<p class="label">${p.label ?? p.name ?? p.position ?? ''}</p>
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
								${
									p.interpretation
										? html`<p class="interp">${p.interpretation}</p>`
										: nothing
								}
							</div>`,
						)}
					</div>`
					: nothing
			}
			${d.reading ? html`<p class="reading">${d.reading}</p>` : nothing}
			${
				d.interpretation && !d.reading
					? html`<p class="reading">${d.interpretation}</p>`
					: nothing
			}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-tarot-spread': RoxyTarotSpread;
	}
}
