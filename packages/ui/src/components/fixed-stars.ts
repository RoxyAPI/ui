import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SIGN_GLYPH } from '../tokens/index.js';
import type { FixedStarsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDegreeInSign } from '../utils/degree.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import { formatNumber } from '../utils/format.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';
import { capitalize } from '../utils/string.js';

type Star = FixedStarsResponse['stars'][number];

/**
 * Fixed stars table. Leads with the high-value view from a
 * /astrology/fixed-stars response: every star-to-natal-point conjunction sorted
 * tightest first, each with its reading. The full precessed star catalog
 * (position, magnitude, traditional nature, keywords) sits in a secondary
 * disclosure so the contacts stay front and center.
 */
@customElement('roxy-fixed-stars')
export class RoxyFixedStars extends RoxyDataElement<FixedStarsResponse> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
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
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so a nowrap table wider than the card blows
				 * the column out and drags every sibling with it, clipped on the right. This
				 * is what lets the scroll container inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			header {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
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
			.summary {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			.empty-note {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			.subhead {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 600;
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
			}
			/* The natal point a star touches is the subject of the line, so it leads
			 * in the accent ink. Plain surface, not a tinted chip, so accent-ink
			 * still clears AA here. */
			.interp-lead .point {
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.interp-aside small {
				font-variant-numeric: tabular-nums;
			}
			.catalog summary {
				cursor: pointer;
				font-weight: 600;
				color: var(--roxy-fg, #0a0a0a);
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
			.scroll {
				overflow-x: auto;
				min-width: 0;
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			th,
			td {
				text-align: left;
				padding: 6px 10px;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				white-space: nowrap;
				vertical-align: top;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.04em;
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			td.num {
				text-align: right;
				font-variant-numeric: tabular-nums;
			}
			.sg {
				color: var(--roxy-secondary, #475569);
				margin-right: 0.3rem;
			}
			.kw {
				display: flex;
				flex-wrap: wrap;
				gap: 0.2rem;
				white-space: normal;
				max-width: 18rem;
			}
			.kw span {
				padding: 0 6px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No fixed star data</div>`;
	}

	protected renderData(data: FixedStarsResponse) {
		const conjunctions = data.conjunctions ?? [];
		const stars = data.stars ?? [];
		return html`<div class="wrap">
			<header>
				<h2 class="title">Fixed stars</h2>
				${
					typeof data.orb === 'number'
						? html`<span class="badge"><b>Orb</b> ${formatNumber(data.orb, 1)}°</span>`
						: nothing
				}
			</header>
			${data.summary ? html`<p class="summary">${data.summary}</p>` : nothing}
			${
				conjunctions.length
					? html`<section>
						<p class="subhead">Conjunctions to the chart</p>
						${conjunctions.map(
							(
								c,
								i,
							) => html`<details class="interp-card" name="fixed-star-contacts" ?open=${i === 0}>
								<summary>
									<span class="interp-lead"><span class="point">${c.point}</span> conjunct ${c.star}</span>
									${chevron()}
									<span class="interp-aside">
										<small>orb ${formatNumber(c.orb, 2)}°</small>
									</span>
								</summary>
								${c.interpretation ? html`<div class="interp-body"><p>${c.interpretation}</p></div>` : nothing}
							</details>`,
						)}
					</section>`
					: html`<p class="empty-note">No star sits within the orb of a natal point.</p>`
			}
			${stars.length ? this.renderCatalog(stars) : nothing}
		</div>`;
	}

	private renderCatalog(stars: Star[]) {
		return html`<details class="catalog">
			<summary>${chevron()} Star catalog (${stars.length})</summary>
			<div class="scroll">
				<table>
					<caption class="subhead">Precessed positions for the chart date</caption>
					<thead>
						<tr>
							<th scope="col">Star</th>
							<th scope="col">Position</th>
							<th scope="col" class="num">Mag</th>
							<th scope="col">Nature</th>
							<th scope="col">Keywords</th>
						</tr>
					</thead>
					<tbody>
						${stars.map((s) => {
							const g = SIGN_GLYPH[capitalize(s.sign)];
							return html`<tr>
								<td>${s.name}</td>
								<td>${g ? html`<span class="sg">${g}</span>` : nothing}${formatDegreeInSign(s.degree)} ${s.sign}</td>
								<td class="num">${formatNumber(s.magnitude, 1)}</td>
								<td>${s.nature}</td>
								<td>
									<div class="kw">${(s.keywords ?? []).map((k) => html`<span>${k}</span>`)}</div>
								</td>
							</tr>`;
						})}
					</tbody>
				</table>
			</div>
		</details>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-fixed-stars': RoxyFixedStars;
	}
}
