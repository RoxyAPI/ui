import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
// Registers <roxy-natal-chart>, reused below as the wheel renderer. The
// relocation response is structurally a natal chart (same planets, houses, and
// angles), so the wheel is shared rather than duplicated.
import './natal-chart.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type {
	NatalChartResponse,
	RelocationChartResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { capitalize } from '../utils/string.js';

type HouseChange =
	RelocationChartResponse['changes']['planetsChangedHouse'][number];

const glyphFor = (name: string): string =>
	PLANET_GLYPH[capitalize(name)] ?? PLANET_GLYPH[name] ?? '';

/**
 * Relocation chart. The birth instant is unchanged, so every planet keeps its
 * natal sign and degree while the houses and angles are recomputed for a new
 * place. Reuses {@link RoxyNatalChart} for the wheel (identical data shape) and
 * adds the relocation read: the move geometry, the planets that change house,
 * and the bodies pulled onto a relocated angle.
 */
@customElement('roxy-relocation-wheel')
export class RoxyRelocationWheel extends RoxyDataElement<RelocationChartResponse> {
	static styles = [
		baseStyles,
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

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No relocation data</div>`;
	}

	protected renderData(data: RelocationChartResponse) {
		const c = data.changes;
		return html`<div class="stack">
			<roxy-natal-chart
				heading="Relocation chart"
				.data=${data as unknown as NatalChartResponse}
			></roxy-natal-chart>
			<section class="changes">
				<h3 class="title">What changes at this location</h3>
				<div class="move">
					${
						typeof c?.distanceKm === 'number'
							? html`<span>${Math.round(c.distanceKm).toLocaleString()} km ${c.direction ?? ''} of birthplace</span>`
							: nothing
					}
					${
						c
							? html`<span>Ascendant ${c.ascendantSignChanged ? 'changes sign' : 'keeps its sign'}</span>`
							: nothing
					}
				</div>
				${
					data.interpretation?.summary
						? html`<p class="summary">${data.interpretation.summary}</p>`
						: nothing
				}
				${
					c?.angularPlanets?.length
						? html`<div>
							<p class="block-label">Angular planets here</p>
							<div class="chips">
								${c.angularPlanets.map((p) => html`<span class="chip">${glyphFor(p)} ${p}</span>`)}
							</div>
						</div>`
						: nothing
				}
				<div>
					<p class="block-label">Planets that change house</p>
					${
						c?.planetsChangedHouse?.length
							? html`<ul class="moves-list">
								${c.planetsChangedHouse.map(
									(m: HouseChange) =>
										html`<li>${glyphFor(m.planet)} ${m.planet}: house ${m.natalHouse} <span class="arrow">to</span> ${m.relocatedHouse}</li>`,
								)}
							</ul>`
							: html`<p class="empty-note">No planet changes house at this location.</p>`
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
