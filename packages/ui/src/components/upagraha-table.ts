import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { signGlyph } from '../tokens/index.js';
import type { UpagrahaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import { formatNumber } from '../utils/format.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';

type Upagraha = UpagrahaResponse['timeBased'][number];

/**
 * The two groups the response ships, each with the line a reader needs to know what it is looking at. Time-based positions depend on birth time, place and weekday; the Dhuma group is pure arithmetic from the Sun.
 */
const GROUPS = [
	{
		key: 'timeBased',
		title: 'Time based',
		note: 'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.',
	},
	{
		key: 'sunBased',
		title: 'Sun based',
		note: 'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.',
	},
] as const;

/**
 * Upagraha positions. Renders /vedic-astrology/upagraha: the eleven upagrahas (shadowy sub-planets) in the two groups the tradition separates them into, each with its sidereal longitude, rashi, degree in sign, and nakshatra with pada.
 *
 * @remarks
 * Gulika and Mandi are rendered as the two SEPARATE points they are. Several implementations treat the names as synonyms and print one row; the two are computed from different moments of the Saturn segment and sit a few degrees apart, which is exactly the difference a practitioner is checking when they open this table.
 *
 * Row order is the response order and is not re-sorted: the API returns each group in its classical derivation order, which is the order the positions are computed and taught in.
 */
@customElement('roxy-upagraha-table')
export class RoxyUpagrahaTable extends RoxyDataElement<UpagrahaResponse> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				box-shadow: var(--roxy-shadow-sm);
				overflow: hidden;
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.group-head {
				padding: var(--roxy-space-md, 1rem) var(--roxy-space-md, 1rem) 0;
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.group-title {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.group-note {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.scroll {
				overflow-x: auto;
				min-width: 0;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				min-width: 520px;
			}
			thead {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 20%, transparent);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				text-align: left;
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}
			tbody tr {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			td.name {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.glyph {
				margin-right: 0.4em;
				color: var(--roxy-muted, #71717a);
			}
			.num {
				font-variant-numeric: tabular-nums;
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No upagraha data</div>`;
	}

	protected renderData(d: UpagrahaResponse) {
		const groups = GROUPS.filter((g) => d[g.key]?.length);
		if (!groups.length) return this.renderEmpty();

		return html`<div class="wrap" part="card" aria-label="Upagraha positions">
			<header class="head" part="header">
				<h2 class="title">Upagrahas</h2>
				${renderFrameCaption(d.frame)}
			</header>
			${groups.map((g) => this.renderGroup(g, d[g.key]))}
		</div>`;
	}

	private renderGroup(group: (typeof GROUPS)[number], rows: Upagraha[]) {
		// The part name distinguishes the two groups, so it must be a static
		// literal per branch rather than interpolated: a computed `part=${...}`
		// is invisible to the catalog scanner.
		const body = html`
			<div class="group-head">
				<h3 class="group-title">${group.title}</h3>
				<p class="group-note">${group.note}</p>
			</div>
			<div class="scroll" part="table" tabindex="0">
				<table role="table">
					<caption class="roxy-sr-only">
						${group.title} upagrahas: each sub-planet with its rashi, degree in sign,
						sidereal longitude, and nakshatra with pada.
					</caption>
					<thead>
						<tr>
							<th scope="col">Upagraha</th>
							<th scope="col">Rashi</th>
							<th scope="col">Degree</th>
							<th scope="col">Longitude</th>
							<th scope="col">Nakshatra</th>
							<th scope="col">Pada</th>
						</tr>
					</thead>
					<tbody>
						${rows.map((u) => {
							const sGlyph = signGlyph(u.rashi) ?? '';
							return html`<tr>
								<td class="name">${u.name}</td>
								<td>
									${sGlyph ? html`<span class="glyph">${sGlyph}</span>` : nothing}${u.rashi ?? ''}
								</td>
								<td class="num">
									${typeof u.longitude === 'number' ? formatSignPosition(u.longitude) : ''}
								</td>
								<td class="num">${formatNumber(u.longitude, 2)}</td>
								<td>${u.nakshatra ?? ''}</td>
								<td class="num">${u.nakshatraPada ?? ''}</td>
							</tr>`;
						})}
					</tbody>
				</table>
			</div>
		`;
		return group.key === 'timeBased'
			? html`<section part="section time-based">${body}</section>`
			: html`<section part="section sun-based">${body}</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-upagraha-table': RoxyUpagrahaTable;
	}
}
