import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	GetBirthstonesResponse,
	GetCrystalsByChakraResponse,
	GetCrystalsByElementResponse,
	GetCrystalsByZodiacResponse,
	ListCrystalsResponse,
	SearchCrystalsResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { cssColor } from '../utils/css-color.js';
import { monthName } from '../utils/format.js';

/**
 * Any crystal list response that carries a `crystals` summary array. Every crystals endpoint that returns more than one stone shares the `{ name, id, imageUrl, colors }` item shape, so one grid renders them all.
 */
type CrystalGridData =
	| ListCrystalsResponse
	| GetCrystalsByChakraResponse
	| GetCrystalsByElementResponse
	| GetCrystalsByZodiacResponse
	| GetBirthstonesResponse
	| SearchCrystalsResponse;

/**
 * Crystal grid. Renders any crystals list response (/crystals, /crystals/chakra/{chakra}, /crystals/element/{element}, /crystals/zodiac/{sign}, /crystals/birthstone/{month}, /crystals/search) as a responsive gallery of crystal tiles with photo, name, and colour swatches. The heading is derived from the response filter (chakra, element, zodiac sign, or birth month) or set explicitly via the `heading` attribute.
 */
@customElement('roxy-crystal-grid')
export class RoxyCrystalGrid extends RoxyDataElement<CrystalGridData> {
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
				grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				margin: 0;
				padding: 0;
				list-style: none;
			}
			.tile {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.photo {
				aspect-ratio: 1 / 1;
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
			.colors {
				display: flex;
				flex-wrap: wrap;
				gap: 4px;
			}
			.swatch {
				width: 10px;
				height: 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				border: 1px solid color-mix(in srgb, var(--roxy-fg, #0a0a0a) 18%, transparent);
			}
		`,
	];

	/**
	 * Override the auto-derived grid heading. Empty by default, in which case the heading comes from the response filter (chakra, element, zodiac, or birth month) or falls back to "Crystals".
	 */
	@property({ type: String, reflect: true })
	heading = '';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No crystals</div>`;
	}

	protected renderData(d: CrystalGridData) {
		const crystals = d.crystals ?? [];
		if (crystals.length === 0) return this.renderEmpty();

		const title = this.heading || this.deriveHeading(d);
		const total =
			'total' in d && typeof d.total === 'number' ? d.total : crystals.length;

		return html`<section class="wrap" aria-label=${title}>
			<header class="head">
				<h2 class="title">${title}</h2>
				<span class="count">${total} ${total === 1 ? 'crystal' : 'crystals'}</span>
			</header>
			<ul class="grid">
				${crystals.map(
					(c) => html`<li class="tile">
						${
							c.imageUrl
								? html`<img class="photo" src=${c.imageUrl} alt=${c.name ?? 'Crystal'} loading="lazy" />`
								: html`<div class="photo" aria-hidden="true"></div>`
						}
						<p class="name">${c.name}</p>
						${
							c.colors && c.colors.length > 0
								? html`<div class="colors" aria-label=${`Colours: ${c.colors.join(', ')}`}>
									${c.colors.map((col) => html`<span class="swatch" style=${`background:${cssColor(col)}`} title=${col}></span>`)}
								</div>`
								: nothing
						}
					</li>`,
				)}
			</ul>
		</section>`;
	}

	private deriveHeading(d: CrystalGridData): string {
		if ('chakra' in d && d.chakra) return `${d.chakra} chakra crystals`;
		if ('element' in d && d.element) return `${d.element} element crystals`;
		if ('sign' in d && d.sign) return `Crystals for ${d.sign}`;
		if ('month' in d && typeof d.month === 'number')
			return `${monthName(this.effectiveLang(), d.month)} birthstones`.trim();
		return 'Crystals';
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-crystal-grid': RoxyCrystalGrid;
	}
}
