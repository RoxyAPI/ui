import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { ProfectionsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { capitalize } from '../utils/string.js';

/**
 * Annual profection card. Renders a /astrology/profections response: the year's
 * profected whole-sign house and sign, the lord of the year and where it sits in
 * the natal chart, and the reading. A single focal card, not a table.
 */
@customElement('roxy-profection-card')
export class RoxyProfectionCard extends RoxyDataElement<ProfectionsResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				width: 100%;
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			header {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				justify-content: space-between;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}
			.badge {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.badge b {
				color: var(--roxy-accent-ink, #b45309);
				font-weight: 600;
			}
			.focus {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
				padding: var(--roxy-space-md, 1rem);
				border-radius: var(--roxy-radius-md, 8px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 9%, transparent);
			}
			.age {
				display: grid;
				justify-items: center;
				min-width: 4.5rem;
			}
			.age .n {
				font-size: 2rem;
				font-weight: 700;
				line-height: 1;
				color: var(--roxy-accent-ink, #b45309);
				font-variant-numeric: tabular-nums;
			}
			.age .l {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.arrow {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.house {
				display: grid;
				gap: 2px;
			}
			.house .h {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: 600;
				color: var(--roxy-fg, #0a0a0a);
			}
			.house .sign {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.house .sign .sg {
				margin-right: 0.3rem;
			}
			.lord {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: 0.4rem 0.75rem;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.lord .label {
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.lord .value {
				font-weight: 600;
				color: var(--roxy-fg, #0a0a0a);
			}
			.lord .sub {
				color: var(--roxy-muted, #71717a);
			}
			.interp {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
				line-height: var(--roxy-leading-normal, 1.5);
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No profection data</div>`;
	}

	protected renderData(data: ProfectionsResponse) {
		const signGlyph = SIGN_GLYPH[capitalize(data.profectedSign ?? '')];
		const lordGlyph = PLANET_GLYPH[capitalize(data.lordOfYear ?? '')];
		const lordNatalGlyph =
			SIGN_GLYPH[capitalize(data.lordNatalPosition?.sign ?? '')];
		return html`<div class="wrap">
			<header>
				<h2 class="title">Annual profection</h2>
				${data.targetDate ? html`<span class="badge"><b>For</b> ${data.targetDate}</span>` : nothing}
			</header>
			<div class="focus">
				<div class="age">
					<span class="n">${data.age}</span>
					<span class="l">Age</span>
				</div>
				<span class="arrow">activates</span>
				<div class="house">
					<span class="h">House ${data.profectedHouse}</span>
					<span class="sign">${signGlyph ? html`<span class="sg">${signGlyph}</span>` : nothing}${data.profectedSign}</span>
				</div>
			</div>
			<div class="lord">
				<span class="label">Lord of the year</span>
				<span class="value">${lordGlyph ? html`${lordGlyph} ` : nothing}${data.lordOfYear}</span>
				${
					data.lordNatalPosition
						? html`<span class="sub">natal ${lordNatalGlyph ? html`<span>${lordNatalGlyph}</span> ` : nothing}${data.lordNatalPosition.sign} · house ${data.lordNatalPosition.house}</span>`
						: nothing
				}
			</div>
			${data.interpretation ? html`<p class="interp">${data.interpretation}</p>` : nothing}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-profection-card': RoxyProfectionCard;
	}
}
