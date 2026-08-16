import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { planetGlyph } from '../tokens/index.js';
import type { BhavChalitResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';
import { houseWords } from '../utils/house-themes.js';

type Graha = BhavChalitResponse['grahas'][number];
type Bhava = BhavChalitResponse['bhavas'][number];

/**
 * Bhav Chalit: which house each graha actually falls in once the bhavas are cut at their real cusps rather than at sign boundaries.
 *
 * @remarks
 * **The reading is `moved`, and everything else is supporting detail.** A Bhav Chalit chart is opened to answer one question: does any graha change house between the whole-sign Rashi chart and the unequal Sripati cusps? So the count leads, the grahas that moved are called out with both placements, and the bhava spans sit underneath as the evidence.
 *
 * **Zero moved is a normal, meaningful result and must read as one.** It means the two charts agree, not that the request failed or that data is missing, so the empty case gets a sentence saying exactly that rather than an empty list.
 *
 * Bhava spans are rarely 30 degrees. The Ascendant and Midheaven are only 90 degrees apart at the equator and diverge sharply with latitude, so unequal spans are the expected result and the width is shown per bhava rather than assumed.
 *
 * House meanings come from `houseThemes` through the shared `houseWords` helper; this component holds no table of house significations.
 */
@customElement('roxy-bhav-chalit-table')
export class RoxyBhavChalitTable extends RoxyDataElement<BhavChalitResponse> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.lede {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.moved-list {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.moved-row {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
				font-size: var(--roxy-text-sm, 0.875rem);
				padding: var(--roxy-space-sm, 0.5rem);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-sm, 4px);
				background: color-mix(in srgb, var(--roxy-warning, #f59e0b) 8%, transparent);
			}
			.graha {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.glyph {
				margin-right: 0.35em;
				color: var(--roxy-muted, #71717a);
			}
			.shift {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, #0a0a0a);
			}
			/* --roxy-secondary, NOT --roxy-muted. This row carries a tinted background,
			 * and muted ink on a tint measures 4.39:1 against the AA floor of 4.5.
			 * The secondary token is the darker ink meant for exactly this case and
			 * keeps the theme word visibly subordinate to the graha name. */
			.themes {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				text-align: left;
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}
			td.num {
				font-variant-numeric: tabular-nums;
			}
			td.occupants {
				white-space: normal;
				color: var(--roxy-secondary, #475569);
			}
			summary {
				cursor: pointer;
				color: var(--roxy-accent-ink, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 500;
			}
		`,
	];

	protected renderData(d: BhavChalitResponse) {
		const grahas = d.grahas ?? [];
		const bhavas = d.bhavas ?? [];
		if (!grahas.length && !bhavas.length) return this.renderEmpty();

		const moved = grahas.filter((g) => g.moved);
		const count = d.movedCount ?? moved.length;

		return html`<div class="wrap" part="card" aria-label="Bhav Chalit">
			<header class="head" part="header">
				<h2 class="title">Bhav Chalit</h2>
				<p class="lede">
					${
						count === 0
							? html`No graha changes house. The Rashi chart and the Chalit chart
								agree, which is a normal result rather than a missing reading.`
							: html`<strong>${count}</strong> of ${grahas.length} grahas change
								house between the Rashi chart and the unequal Sripati cusps.`
					}
				</p>
				${renderFrameCaption(this.effectiveLang(), d.frame, this.translator)}
			</header>

			${
				moved.length
					? html`<div class="moved-list" part="table moved">
						${moved.map((g) => this.renderMoved(g, d.houseThemes))}
					</div>`
					: nothing
			}

			${
				bhavas.length
					? html`<details part="details">
						<summary>Bhava cusps and occupants</summary>
						<div class="scroll">
							<table part="table">
								<thead>
									<tr>
										<th>Bhava</th>
										<th>Rashi</th>
										<th>Start</th>
										<th>Madhya</th>
										<th>End</th>
										<th>Span</th>
										<th>Grahas</th>
									</tr>
								</thead>
								<tbody>
									${bhavas.map((b) => this.renderBhavaRow(b))}
								</tbody>
							</table>
						</div>
					</details>`
					: nothing
			}
		</div>`;
	}

	private renderMoved(g: Graha, themes: BhavChalitResponse['houseThemes']) {
		const glyph = planetGlyph(g.graha) ?? '';
		const words =
			typeof g.bhava === 'number' ? houseWords([g.bhava], themes) : '';
		return html`<div class="moved-row">
			<span class="graha">
				${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${g.graha}
			</span>
			<span class="shift">
				house ${g.rashiHouse} in the Rashi chart, house ${g.bhava} here
			</span>
			${words ? html`<span class="themes">${words}</span>` : nothing}
		</div>`;
	}

	private renderBhavaRow(b: Bhava) {
		const occupants = (b.grahas ?? []).join(', ');
		return html`<tr>
			<td class="num">${b.house}</td>
			<td>${b.rashi}</td>
			<td class="num">${formatNumber(this.effectiveLang(), b.start, 2)}&deg;</td>
			<td class="num">${formatNumber(this.effectiveLang(), b.madhya, 2)}&deg;</td>
			<td class="num">${formatNumber(this.effectiveLang(), b.end, 2)}&deg;</td>
			<td class="num">${formatNumber(this.effectiveLang(), b.span, 2)}&deg;</td>
			<td class="occupants">${occupants || '—'}</td>
		</tr>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-bhav-chalit-table': RoxyBhavChalitTable;
	}
}
