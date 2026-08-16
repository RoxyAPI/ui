import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { GetCrystalResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { cssColor } from '../utils/css-color.js';
import { monthName } from '../utils/format.js';

/**
 * Single-crystal detail card. Renders /crystals/{id}: the stone's photo, description, and full metaphysical profile (spiritual / emotional / physical meaning, governing chakras, zodiac signs, planet, elements, colours, Mohs hardness, numerical vibration, birthstone month), plus its affirmation and the crystals it pairs with. This is the detail view; roxy-crystal-grid is the gallery.
 *
 * @remarks
 * The card is half mineral record and half reading, and the split is clean.
 * `hide-readings` keeps the photo, the name, the whole attribute grid (planet,
 * Mohs hardness, numerical vibration, birthstone month, chakras, zodiac signs,
 * elements and the colour swatches) and the crystals it pairs with, which is a
 * catalogue relation rather than a claim about the stone. It drops the
 * description, the spiritual, emotional and physical meanings, the keyword chips
 * that belong to them, and the affirmation. The meaning block is three headed
 * paragraphs and nothing else, so it goes whole.
 */
@customElement('roxy-crystal-card')
export class RoxyCrystalCard extends RoxyDataElement<GetCrystalResponse> {
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
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.hero {
				display: flex;
				gap: var(--roxy-space-md, 1rem);
				align-items: flex-start;
			}
			.photo {
				width: 96px;
				height: 96px;
				flex: none;
				border-radius: var(--roxy-radius-md, 8px);
				object-fit: cover;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 35%, transparent);
			}
			.title {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.desc {
				margin: 0;
				line-height: 1.55;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.attrs {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.attr {
				display: grid;
				gap: 2px;
			}
			.attr dt {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.attr dd {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 500;
			}
			.colors {
				display: flex;
				flex-wrap: wrap;
				gap: 0.4rem;
			}
			.color {
				display: inline-flex;
				align-items: center;
				gap: 0.3rem;
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: capitalize;
			}
			.dot {
				width: 0.7rem;
				height: 0.7rem;
				border-radius: var(--roxy-radius-full, 9999px);
				border: 1px solid color-mix(in srgb, var(--roxy-fg, #0a0a0a) 18%, transparent);
			}
			.meaning h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.meaning p {
				margin: 0 0 var(--roxy-space-sm, 0.5rem) 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.55;
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: 0.3rem;
			}
			.chip {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: capitalize;
			}
			.section-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
			}
			.affirmation {
				margin: 0;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-left: 3px solid var(--roxy-accent, #f59e0b);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
				font-style: italic;
				font-size: var(--roxy-text-sm, 0.875rem);
				border-radius: 0 var(--roxy-radius-sm, 4px) var(--roxy-radius-sm, 4px) 0;
			}
		`,
	];

	protected renderData(d: GetCrystalResponse) {
		const colors = d.colors ?? [];
		const keywords = d.keywords ?? [];
		const pairs = d.pairsWith ?? [];
		const month = monthName(this.effectiveLang(), d.birthMonth) || undefined;

		return html`<article class="wrap" part="card" aria-label=${d.name ?? 'Crystal'}>
			<div class="hero" part="header">
				${d.imageUrl ? html`<img class="photo" part="chart" src=${d.imageUrl} alt=${d.name ?? 'Crystal'} loading="lazy" />` : nothing}
				<div>
					<h2 class="title">${d.name}</h2>
					${
						// The grid below is the stone; this paragraph is what it is said to do.
						d.description && !this.hideReadings
							? html`<p class="desc">${d.description}</p>`
							: nothing
					}
				</div>
			</div>

			<dl class="attrs" part="details">
				${this.attr('Planet', d.planet)}
				${this.attr('Hardness', typeof d.hardness === 'number' ? `${d.hardness} Mohs` : undefined)}
				${this.attr('Vibration', d.numericalVibration)}
				${this.attr('Birthstone', month)}
				${this.list('Chakras', d.chakras)}
				${this.list('Zodiac', d.zodiacSigns)}
				${this.list('Elements', d.elements)}
				${
					colors.length
						? html`<div class="attr">
							<dt>${this.t('Colors')}</dt>
							<dd>
								<div class="colors">
									${colors.map((c) => html`<span class="color"><span class="dot" style=${`background:${cssColor(c)}`}></span>${c}</span>`)}
								</div>
							</dd>
						</div>`
						: nothing
				}
			</dl>

			${this.renderMeaning(d.meaning)}

			${
				keywords.length && !this.hideReadings
					? html`<div part="section keywords">
						<p class="section-label">${this.t('Keywords')}</p>
						<div class="chips">${keywords.map((k) => html`<span class="chip">${k}</span>`)}</div>
					</div>`
					: nothing
			}

			${d.affirmation && !this.hideReadings ? html`<p class="affirmation">${d.affirmation}</p>` : nothing}

			${
				pairs.length
					? html`<div part="section pairs-with">
						<p class="section-label">${this.t('Pairs with')}</p>
						<div class="chips">${pairs.map((p) => html`<span class="chip">${String(p).replace(/-/g, ' ')}</span>`)}</div>
					</div>`
					: nothing
			}
		</article>`;
	}

	private attr(label: string, value: string | number | null | undefined) {
		if (value === undefined || value === null || value === '') return nothing;
		return html`<div class="attr"><dt>${label}</dt><dd>${value}</dd></div>`;
	}

	private list(label: string, values: readonly string[] | null | undefined) {
		if (!values?.length) return nothing;
		return html`<div class="attr"><dt>${label}</dt><dd>${values.join(', ')}</dd></div>`;
	}

	private renderMeaning(m: GetCrystalResponse['meaning'] | undefined) {
		// Three headed paragraphs and nothing else, so the block goes whole rather
		// than leaving Spiritual, Emotional and Physical over nothing.
		if (!m || this.hideReadings) return nothing;
		const rows: Array<[string, string | null | undefined]> = [
			['Spiritual', m.spiritual],
			['Emotional', m.emotional],
			['Physical', m.physical],
		];
		const present = rows.filter(([, v]) => Boolean(v));
		if (present.length === 0) return nothing;
		return html`<div class="meaning" part="section meaning">
			${present.map(([label, text]) => html`<h3>${label}</h3><p>${text}</p>`)}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-crystal-card': RoxyCrystalCard;
	}
}
