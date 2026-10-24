import { css, html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement } from '../utils/define.js';
// Registers <roxy-natal-chart>, reused below as the wheel renderer. The
// relocation response is structurally a natal chart (same planets, houses, and
// angles), so the wheel is shared rather than duplicated.
import './natal-chart.js';
import { planetGlyph } from '../tokens/index.js';
import type { RelocationChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { factListStyles } from '../utils/fact-list.js';
import { formatInteger, formatNumber } from '../utils/format.js';
import {
	display,
	displayField,
	displayList,
	displayOption,
} from '../utils/localized.js';
import { capitalize } from '../utils/string.js';

type HouseChange =
	RelocationChartResponse['changes']['planetsChangedHouse'][number];

const glyphFor = (name: string): string => planetGlyph(name) ?? '';

/**
 * Relocation chart. The birth instant is unchanged, so every planet keeps its
 * natal sign and degree while the houses and angles are recomputed for a new
 * place. Reuses {@link RoxyNatalChart} for the wheel (identical data shape) and
 * adds the relocation read: the move geometry, the planets that change house,
 * and the bodies pulled onto a relocated angle.
 *
 * @remarks
 * Composing another component means two things have to be forwarded or they stop
 * at the boundary: `hide-readings` is passed down, so suppressing prose here also
 * suppresses the wheel's planet readings; and the wheel's parts are re-exported,
 * because a part is only addressable one shadow root deep.
 */
@customElement('roxy-relocation-wheel')
export class RoxyRelocationWheel extends RoxyDataElement<RelocationChartResponse> {
	static styles = [
		baseStyles,
		factListStyles,
		css`
			.stack {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.changes {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}
			.move {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}
			.summary {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
			}
			.block-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.06em;
				color: var(--roxy-muted, #71717a);
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chip {
				padding: 2px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.moves-list {
				list-style: none;
				margin: 0;
				padding: 0;
				display: grid;
				gap: 2px;
			}
			.moves-list li {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.moves-list .arrow {
				color: var(--roxy-muted, #71717a);
			}
			.empty-note {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
			}
		`,
	];

	protected renderData(data: RelocationChartResponse) {
		const c = data.changes;
		const coordinateKeys = ['latitude', 'longitude'] as const;
		return html`<div class="stack" part="stack">
			<roxy-natal-chart
				heading="Relocation chart"
				lang=${ifDefined(this.effectiveLang())}
				exportparts="chart-controls, chart-dialog, card, header, tablist, tab, panel, chart, table, aspects, aspect-grid, element-modality, legend, details, section, patterns, pattern, readings, reading, positions, distribution, houses, strongest"
				?hide-readings=${this.hideReadings}
				.data=${data}
			></roxy-natal-chart>
			<section class="changes" part="card changes">
				<h3 class="title">${this.t('What changes at this location')}</h3>
				${data.relocation ? html`<dl class="roxy-facts" part="details">${coordinateKeys.map((key) => html`<div><dt>${displayField(this.effectiveLang(), key === 'latitude' ? 'relocationLatitude' : 'relocationLongitude')}</dt><dd>${formatNumber(this.effectiveLang(), data.relocation[key], 5)}</dd></div>`)}</dl>` : nothing}
				<div class="move" part="details">
					${
						typeof c?.distanceKm === 'number'
							? html`<span>
								${
									// Under a kilometre the bearing is noise: "0 km south of
									// birthplace" reads as a broken calculation, not a same-place
									// relocation.
									Math.round(c.distanceKm) === 0
										? this.t('Same location as birth')
										: this.t('{{distance}} km {{direction}} of birthplace', {
												distance: formatInteger(
													this.effectiveLang(),
													c.distanceKm,
												),
												direction: c.direction
													? displayOption(
															this.effectiveLang(),
															'direction',
															capitalize(c.direction),
															c.direction,
														)
													: '',
											})
								}
							</span>`
							: nothing
					}
					${
						c
							? html`<span>
								${
									// Name the sign in BOTH branches. Reporting only the boolean
									// put "Ascendant keeps its sign" directly above a summary
									// reading "The Ascendant moves to Gemini", and a reader
									// cannot tell which one is wrong. Neither was: the sign is
									// Gemini either way. Stating it reconciles the two.
									data.ascendant?.sign
										? c.ascendantSignChanged
											? this.t('Ascendant moves to {{sign}}', {
													sign: display(data.ascendant, 'sign'),
												})
											: this.t('Ascendant stays in {{sign}}', {
													sign: display(data.ascendant, 'sign'),
												})
										: c.ascendantSignChanged
											? this.t('Ascendant changes sign')
											: this.t('Ascendant keeps its sign')
								}
							</span>`
							: nothing
					}
				</div>
				${
					// The only prose here. The move geometry, the angular planets and the
					// house changes below it are all data and survive hide-readings.
					data.interpretation?.summary && !this.hideReadings
						? html`<p class="summary">${data.interpretation.summary}</p>`
						: nothing
				}
				${
					c?.angularPlanets?.length
						? html`<div part="section angular-planets">
							<p class="block-label">${this.t('Angular planets here')}</p>
							<div class="chips">
								${displayList(c, 'angularPlanets').map(({ value, label }) => html`<span class="chip">${glyphFor(value)} ${label}</span>`)}
							</div>
						</div>`
						: nothing
				}
				<div part="section house-changes">
					<p class="block-label">${this.t('Planets that change house')}</p>
					${
						c?.planetsChangedHouse?.length
							? html`<ul class="moves-list">
								${c.planetsChangedHouse.map(
									(m: HouseChange) =>
										html`<li>${glyphFor(m.planet)} ${this.t('{{planet}}: house {{from}} to {{to}}', { planet: display(m, 'planet'), from: m.natalHouse, to: m.relocatedHouse })}</li>`,
								)}
							</ul>`
							: html`<p class="empty-note">${this.t('No planet changes house at this location.')}</p>`
					}
				</div>
			</section>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-relocation-wheel': RoxyRelocationWheel;
	}
}
