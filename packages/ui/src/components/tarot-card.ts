import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GetCardResponse, GetDailyCardResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderInterpAccordion,
} from '../utils/interp-accordion.js';
import { renderTablist, tablistStyles } from '../utils/tablist.js';

type TarotData = GetCardResponse | GetDailyCardResponse;

/** The five life-area readings every tarot orientation carries. Both shapes the component renders supply them: the reference card carries a set per orientation, the drawn card carries one set for the orientation it landed in. */
type TarotGuidance = Pick<
	GetCardResponse['upright'],
	'love' | 'career' | 'finances' | 'health' | 'spirituality'
>;

const GUIDANCE_FIELDS: ReadonlyArray<[keyof TarotGuidance, string]> = [
	['love', 'Love'],
	['career', 'Career'],
	['finances', 'Finances'],
	['health', 'Health'],
	['spirituality', 'Spirituality'],
];

/**
 * Tarot card. Renders /tarot/cards/{id} and /tarot/daily.
 *
 * @remarks
 * The two endpoints are NOT the same card and must not be shown the same way. The reference card ships both orientations, so the reader chooses one and the whole reading (image, keywords, description, life areas) follows that choice. The daily card is DRAWN: the API ships exactly one orientation and one set of meanings for it, so there is nothing to switch to. It used to offer the same flip, which rotated the art and relabelled the card "reversed" while the text below it stayed the upright reading. The draw is now fixed and stated, never toggled.
 */
@customElement('roxy-tarot-card')
export class RoxyTarotCard extends RoxyDataElement<TarotData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		tablistStyles,
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

			.image {
				display: block;
				width: 100%;
				height: auto;
				border-radius: var(--roxy-radius-md, 8px);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.image.reversed {
				transform: rotate(180deg);
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
			.drawn {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.message {
				color: var(--roxy-fg, #0a0a0a);
				margin: var(--roxy-space-sm, 0.5rem) 0 var(--roxy-space-md, 1rem);
			}
			.reading {
				margin: 0 0 var(--roxy-space-md, 1rem);
				white-space: pre-line;
			}

			.roxy-tablist {
				margin: var(--roxy-space-sm, 0.5rem) 0;
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
		`,
	];

	/** Which orientation of the REFERENCE card is being read. The daily draw ignores this: its orientation is whatever was drawn. */
	@state()
	private orientation: 'upright' | 'reversed' = 'upright';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No tarot data</div>`;
	}

	protected renderData(d: TarotData) {
		if ('card' in d) return this.renderDailyCard(d);
		return this.renderFullCard(d);
	}

	private renderDailyCard(d: GetDailyCardResponse) {
		const card = d.card;
		const reversed = Boolean(card.reversed);
		const keywords = card.keywords ?? [];
		// One text node per span: the markup minifier collapses whitespace at an
		// expression boundary, so every separator is joined in JS, never in markup.
		const meta = [card.arcana ? `${card.arcana} arcana` : '', card.suit ?? '']
			.filter(Boolean)
			.join(' · ');

		return html`<article class="card" aria-label=${card.name ?? 'Tarot card'}>
			${this.renderImage(card.imageUrl, card.name, reversed)}
			<div>
				<div class="meta">
					${meta ? `${meta} · ` : ''}<span class="drawn"
						>${reversed ? 'drawn reversed' : 'drawn upright'}</span
					>
				</div>
				<h2 class="title">${card.name ?? 'Tarot card'}</h2>
				${d.dailyMessage ? html`<p class="message">${d.dailyMessage}</p>` : nothing}
				${card.meaning ? html`<p class="reading">${card.meaning}</p>` : nothing}
				${
					keywords.length > 0
						? html`<div class="chips">
							${keywords.map((k) => html`<span>${k}</span>`)}
						</div>`
						: nothing
				}
				${this.renderGuidance(card, 'tarot-daily-guidance')}
			</div>
		</article>`;
	}

	private renderFullCard(d: GetCardResponse) {
		const reversed = this.orientation === 'reversed';
		const oriented = reversed ? d.reversed : d.upright;
		const keywords =
			(reversed ? d.keywords?.reversed : d.keywords?.upright) ??
			oriented?.keywords ??
			[];

		return html`<article class="card" aria-label=${d.name ?? 'Tarot card'}>
			${this.renderImage(d.imageUrl, d.name, reversed)}
			<div>
				<div class="meta">
					${[
						d.arcana ? `${d.arcana} arcana` : '',
						d.suit ?? '',
						d.number !== undefined && d.number !== null
							? `no. ${d.number}`
							: '',
					]
						.filter(Boolean)
						.join(' · ')}
				</div>
				<h2 class="title">${d.name ?? 'Tarot card'}</h2>
				${renderTablist({
					items: [
						{ id: 'upright', label: 'Upright' },
						{ id: 'reversed', label: 'Reversed' },
					],
					active: this.orientation,
					onSelect: (id) => {
						this.orientation = id;
					},
					label: 'Card orientation',
					idPrefix: 'tarot',
					controls: true,
				})}
				<div
					id="tarot-panel-${this.orientation}"
					role="tabpanel"
					tabindex="0"
					aria-labelledby="tarot-tab-${this.orientation}"
				>
					${oriented?.description ? html`<p class="reading">${oriented.description}</p>` : nothing}
					${
						keywords.length > 0
							? html`<div class="chips">
								${keywords.map((k) => html`<span>${k}</span>`)}
							</div>`
							: nothing
					}
					${this.renderGuidance(oriented, `tarot-${this.orientation}-guidance`)}
				</div>
			</div>
		</article>`;
	}

	/** The artwork, rotated when the orientation being read is reversed. Decorative beyond its alt text: the orientation is stated in the meta line, so the image is never the only place it appears. */
	private renderImage(
		imageUrl: string | undefined,
		name: string | undefined,
		reversed: boolean,
	) {
		const cls = `image ${reversed ? 'reversed' : ''}`;
		if (!imageUrl) {
			return html`<div
				class=${cls}
				style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
			>
				${name ?? '?'}
			</div>`;
		}
		return html`<img class=${cls} src=${imageUrl} alt=${name ?? 'Tarot card'} />`;
	}

	/** The five life-area readings for the orientation on screen. Grouped per orientation so switching the reference card swaps the whole accordion rather than leaving a stale section open. */
	private renderGuidance(guidance: TarotGuidance | undefined, name: string) {
		if (!guidance) return nothing;
		const sections: InterpSection[] = GUIDANCE_FIELDS.map(([key, label]) => ({
			label,
			body: guidance[key] ?? '',
		}));
		return renderInterpAccordion(sections, name, 'Guidance');
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-tarot-card': RoxyTarotCard;
	}
}
