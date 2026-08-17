import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { signGlyph } from '../tokens/index.js';
import type { AshtakavargaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';
import {
	renderTablist,
	type TablistItem,
	tablistStyles,
} from '../utils/tablist.js';

type Tab = 'sarva' | 'bhinna' | 'reduced' | 'pinda';

/** Tab order, each id beside the English SOURCE its label is looked up by. */
const TABS: ReadonlyArray<{ id: Tab; source: ChromeString }> = [
	{ id: 'sarva', source: 'Sarvashtakavarga' },
	{ id: 'bhinna', source: 'Bhinnashtakavarga' },
	{ id: 'reduced', source: 'Reduced' },
	{ id: 'pinda', source: 'Shodhya Pinda' },
];

type Signs = AshtakavargaResponse['signs'];
type BhinnaRow = AshtakavargaResponse['bhinnashtakavarga'][number];
type SarvaRow = AshtakavargaResponse['sarvashtakavarga'];

/**
 * Ashtakavarga grid: Sarvashtakavarga, Bhinnashtakavarga, the Shodhana-reduced
 * grid, and Shodhya Pinda. Pass `data` from /vedic-astrology/ashtakavarga.
 *
 * @remarks
 * Bindus are benefic points, so MORE is better in every view here. The colour
 * ramp is therefore diverging, not a single hot hue: a weak count tints toward
 * --roxy-heat (which resolves to the danger token), the classical average stays
 * neutral, a strong count tints toward --roxy-success, and each tab states its
 * own scale in a legend. The previous single-hue ramp painted the best signs the
 * most alarming shade, the exact opposite of what the numbers mean.
 */
@customElement('roxy-ashtakavarga-grid')
export class RoxyAshtakavargaGrid extends RoxyDataElement<AshtakavargaResponse> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		tablistStyles,
		css`
			.wrap {
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

			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}

			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}

			/* Tables */
			/* min-width: 0, or a grid/flex item with overflow still grows to fit its
			 * content instead of scrolling. Same trap as hd-connection. */
			.overflow-scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
			}

			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				text-align: center;
			}

			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}

			td:first-child,
			th:first-child {
				text-align: left;
			}

			.glyph {
				font-size: 1.1em;
				margin-right: 3px;
				line-height: 1;
			}

			.planet-cell {
				display: flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.total-row td {
				font-weight: var(--roxy-weight-bold, 600);
				border-top: 2px solid var(--roxy-border, #e4e4e7);
				border-bottom: none;
			}

			/* Diverging bindu scale. Tiers 1-3 tint toward the danger token (fewer
			 * bindus than the classical average), tier 4 is the neutral mid, tiers
			 * 5-7 tint toward success (more bindus, more benefic support). Text stays
			 * var(--roxy-fg) so it inverts with the host theme without per-tier
			 * overrides. */
			.bindu-cell {
				border-radius: var(--roxy-radius-sm, 4px);
				font-weight: var(--roxy-weight-bold, 600);
				min-width: 2rem;
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, currentColor);
			}

			.tier-1 { background: color-mix(in srgb, var(--roxy-heat, #ef4444) 30%, transparent); }
			.tier-2 { background: color-mix(in srgb, var(--roxy-heat, #ef4444) 17%, transparent); }
			.tier-3 { background: color-mix(in srgb, var(--roxy-heat, #ef4444) 7%, transparent); }
			.tier-4 { background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 45%, transparent); }
			.tier-5 { background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent); }
			.tier-6 { background: color-mix(in srgb, var(--roxy-success, #16a34a) 32%, transparent); }
			.tier-7 { background: color-mix(in srgb, var(--roxy-success, #16a34a) 50%, transparent); }

			/* Legend */
			.legend {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.legend-scale {
				display: flex;
				gap: 2px;
			}
			.legend-swatch {
				width: 16px;
				height: 10px;
				border-radius: 2px;
			}
			.legend-note {
				flex: 1 1 12rem;
			}

			/* Bhinna grid: planet header column narrower */
			.bhinna-table th:first-child,
			.bhinna-table td:first-child {
				min-width: 5rem;
			}

			/* Tight cells below 480px so the 14-column bhinna grid stops
			 * overflowing the viewport. The wrapper keeps overflow-x:auto as
			 * a fallback for very long content. */
			@container (max-width: 480px) {
				.bhinna-table th,
				.bhinna-table td {
					padding: 0.3rem 0.35rem;
					font-size: var(--roxy-text-xs, 0.75rem);
				}
				.bhinna-table th:first-child,
				.bhinna-table td:first-child {
					min-width: 3.5rem;
				}
				.bindu-cell {
					min-width: 1.5rem;
				}
			}
			/* Visual cue that the bhinna table is scrollable below the breakpoint:
			 * a soft gradient at the right edge so users see there is more to scroll. */
			.overflow-scroll {
				mask-image: linear-gradient(
					to right,
					transparent 0,
					black 0.5rem,
					black calc(100% - 1rem),
					transparent 100%
				);
				-webkit-mask-image: linear-gradient(
					to right,
					transparent 0,
					black 0.5rem,
					black calc(100% - 1rem),
					transparent 100%
				);
			}
		`,
	];

	@state()
	activeTab: Tab = 'sarva';

	protected renderData(d: AshtakavargaResponse) {
		const signs = d.signs ?? [];

		return html`<div class="wrap" part="card" aria-label=${this.t('Ashtakavarga grid')}>
			<div class="head" part="header">
				<h2 class="title">${this.t('Ashtakavarga')}</h2>
				${
					signs.length
						? html`<p class="subtitle">${this.t('{{count}} signs', { count: signs.length })}</p>`
						: nothing
				}
				${renderFrameCaption(this.effectiveLang(), d.frame, this.translator)}
			</div>

			${renderTablist({
				items: TABS.map(({ id, source }) => ({ id, label: this.t(source) })),
				active: this.activeTab,
				onSelect: (id) => {
					this.activeTab = id;
				},
				label: this.t('Ashtakavarga views'),
				idPrefix: 'ashtakavarga',
				controls: true,
			})}

			<div
				id="ashtakavarga-panel-${this.activeTab}"
				part="panel"
				role="tabpanel"
				aria-labelledby="ashtakavarga-tab-${this.activeTab}"
			>
				${
					this.activeTab === 'sarva'
						? this.renderSarva(signs)
						: this.activeTab === 'bhinna'
							? this.renderBhinna(signs)
							: this.activeTab === 'reduced'
								? this.renderReduced(signs)
								: this.renderPinda()
				}
			</div>
		</div>`;
	}

	/**
	 * Bhinna bindus per planet per sign run 0..8 (one 0/1 contribution from each
	 * of the 8 reference points). 4 is the mid, so it holds the neutral tier and
	 * anything above it reads as support. The reduced grid uses the same 0..8
	 * units, so it shares this scale.
	 */
	private bhinnaTier(count: number): string {
		if (count <= 1) return 'tier-1';
		if (count <= 2) return 'tier-2';
		if (count <= 3) return 'tier-3';
		if (count <= 4) return 'tier-4';
		if (count <= 5) return 'tier-5';
		if (count <= 6) return 'tier-6';
		return 'tier-7';
	}

	/**
	 * Sarva bindus per sign are the column total across the 7 planets. The grand
	 * total is always 337, so the classical average is 337/12 = 28.08 and the
	 * bands used by readers are: under 25 weak, 25 to 29 average, 30 and above
	 * strong, with the highest signs carrying transits best. The tiers follow
	 * those bands rather than an even split, so 28 sits on the neutral tier.
	 */
	private sarvaTier(count: number): string {
		if (count <= 20) return 'tier-1';
		if (count <= 24) return 'tier-2';
		if (count <= 27) return 'tier-3';
		if (count <= 29) return 'tier-4';
		if (count <= 32) return 'tier-5';
		if (count <= 36) return 'tier-6';
		return 'tier-7';
	}

	/**
	 * The scale, stated. Without this a reader has to guess whether a saturated
	 * cell is good or bad, and in a bindu grid the answer is always "good".
	 */
	private renderLegend(note: string) {
		return html`<div class="legend" part="legend">
			<span>${this.t('Fewer bindus')}</span>
			<span class="legend-scale" aria-hidden="true">
				${[1, 2, 3, 4, 5, 6, 7].map(
					(t) => html`<span class="legend-swatch tier-${t}"></span>`,
				)}
			</span>
			<span>${this.t('More bindus')}</span>
			<span class="legend-note">${note}</span>
		</div>`;
	}

	private renderSarva(signs: Signs) {
		const sav = this.data?.sarvashtakavarga;
		if (!sav)
			return html`<p class="roxy-empty">${this.t('No sarvashtakavarga data')}</p>`;

		return html`<div class="overflow-scroll" part="table">
				<table>
					<caption class="roxy-sr-only">
						${this.t(
							'Sarvashtakavarga: each of the twelve signs and the bindus all planets contribute to it, with a grand total.',
						)}
					</caption>
					<thead>
						<tr>
							<th scope="col">${this.t('Sign')}</th>
							<th scope="col">${this.t('Bindus')}</th>
						</tr>
					</thead>
					<tbody>
						${signs.map((sign, i) => {
							const count = sav.bindus[i] ?? 0;
							return html`<tr>
								<td>
									<div class="planet-cell">
										<span class="glyph" aria-hidden="true">${signGlyph(sign) ?? ''}</span>
										${sign}
									</div>
								</td>
								<td class="${`bindu-cell ${this.sarvaTier(count)}`}">${count}</td>
							</tr>`;
						})}
					</tbody>
					<tfoot>
						<tr class="total-row">
							<td>${this.t('Total')}</td>
							<td>${sav.total}</td>
						</tr>
					</tfoot>
				</table>
			</div>
			${this.renderLegend(
				'Under 25 is a weak sign, 25 to 29 average, 30 and above strong. The 12 signs always total 337.',
			)}`;
	}

	private renderBhinna(signs: Signs) {
		const bhinna = this.data?.bhinnashtakavarga;
		if (!bhinna?.length)
			return html`<p class="roxy-empty">${this.t('No bhinnashtakavarga data')}</p>`;

		return html`${this.renderBinduGrid(
			signs,
			bhinna,
			'Bhinnashtakavarga: the bindus each planet scores in every one of the twelve signs, with a row total.',
		)}
		${this.renderLegend(
			'Each planet scores 0 to 8 bindus per sign. 4 is the mid, 5 and above is strong support for that planet in that sign.',
		)}`;
	}

	/**
	 * The Shodhana-purified grid (Trikona then Ekadipati), which is what Shodhya
	 * Pinda is computed from. The column totals are the Reduced Sarvashtakavarga,
	 * so they are shown as the total row rather than as a second table.
	 */
	private renderReduced(signs: Signs) {
		const reduced = this.data?.reducedBhinnashtakavarga;
		const rsav = this.data?.reducedSarvashtakavarga;
		if (!reduced?.length && !rsav)
			return html`<p class="roxy-empty">${this.t('No reduced ashtakavarga data')}</p>`;

		return html`${this.renderBinduGrid(
			signs,
			reduced ?? [],
			'Reduced Bhinnashtakavarga after Shodhana: the bindus each planet keeps in every one of the twelve signs, with a row total and a Reduced Sarvashtakavarga totals row.',
			rsav,
		)}
		${this.renderLegend(
			'Bindus left after Trikona and Ekadipati Shodhana, the input to Shodhya Pinda. The Reduced SAV row totals the seven planets only, so it does not include the Lagna row above it.',
		)}`;
	}

	/**
	 * The planet-by-sign grid both the bhinna and the reduced tabs draw. The rows
	 * are the 7 planets plus Lagna, but a Sarva total counts the 7 planets only
	 * (which is why the classical SAV grand total is 337), so the totals row is
	 * named for what it is rather than left to read as a column sum.
	 */
	private renderBinduGrid(
		signs: Signs,
		rows: BhinnaRow[],
		caption: string,
		totals?: SarvaRow,
	) {
		if (!rows.length)
			return html`<p class="roxy-empty">${this.t('No bindu data')}</p>`;
		return html`<div class="overflow-scroll" part="table">
			<table class="bhinna-table">
				<caption class="roxy-sr-only">${caption}</caption>
				<thead>
					<tr>
						<th scope="col">${this.t('Planet')}</th>
						${signs.map(
							(s) => html`<th scope="col" title=${s}>${signGlyph(s) ?? s}</th>`,
						)}
						<th scope="col">${this.t('Total')}</th>
					</tr>
				</thead>
				<tbody>
					${rows.map(
						(row) => html`<tr>
						<td>${row.planet}</td>
						${row.bindus.map(
							(count) =>
								html`<td class="${`bindu-cell ${this.bhinnaTier(count)}`}">${count}</td>`,
						)}
						<td>${row.total}</td>
					</tr>`,
					)}
				</tbody>
				${
					totals
						? html`<tfoot>
							<tr class="total-row">
								<td>${this.t('Reduced SAV')}</td>
								${signs.map((_, i) => html`<td>${totals.bindus[i] ?? 0}</td>`)}
								<td>${totals.total}</td>
							</tr>
						</tfoot>`
						: nothing
				}
			</table>
		</div>`;
	}

	private renderPinda() {
		const pinda = this.data?.shodhyaPinda;
		if (!pinda?.length)
			return html`<p class="roxy-empty">${this.t('No shodhya pinda data')}</p>`;

		return html`<div class="overflow-scroll" part="table">
			<table>
				<caption class="roxy-sr-only">
					${this.t(
						'Shodhya Pinda: each planet with its Rashi Pinda, Graha Pinda and Shodhya Pinda strength scores.',
					)}
				</caption>
				<thead>
					<tr>
						<th scope="col">${this.t('Planet')}</th>
						<th scope="col">${this.t('Rashi Pinda')}</th>
						<th scope="col">${this.t('Graha Pinda')}</th>
						<th scope="col">${this.t('Shodhya Pinda')}</th>
					</tr>
				</thead>
				<tbody>
					${pinda.map(
						(row) => html`<tr>
							<td>${row.planet}</td>
							<td>${row.rashiPinda}</td>
							<td>${row.grahaPinda}</td>
							<td>${row.shodhyaPinda}</td>
						</tr>`,
					)}
				</tbody>
			</table>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-ashtakavarga-grid': RoxyAshtakavargaGrid;
	}
}
