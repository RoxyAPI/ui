import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { KpPlanetsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';

/**
 * KP planets table with sub-lord and sub-sub-lord columns. Renders
 * /vedic-astrology/kp/planets.
 */
@customElement('roxy-kp-planets-table')
export class RoxyKpPlanetsTable extends RoxyDataElement<KpPlanetsResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				overflow: auto;
				box-shadow: var(--roxy-shadow-sm);
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.ayanamsa {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				min-width: 560px;
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
			td.planet {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.retro {
				color: var(--roxy-warning-fg, #9a3412);
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: 4px;
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No KP data</div>`;
	}

	protected renderData(d: KpPlanetsResponse) {
		const planets = d.planets ?? [];

		return html`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${
					typeof d.ayanamsa === 'number'
						? html`<span class="ayanamsa">Ayanamsa: ${formatNumber(d.ayanamsa, 2)}°</span>`
						: nothing
				}
			</header>
			<table role="table">
				<caption class="roxy-sr-only">
					KP planets: each planet with its sign, sign lord, nakshatra, star lord, sub
					lord, sub sub lord and KP number.
				</caption>
				<thead>
					<tr>
						<th scope="col">Planet</th>
						<th scope="col">Sign</th>
						<th scope="col">Sign lord</th>
						<th scope="col">Nakshatra</th>
						<th scope="col">Star lord</th>
						<th scope="col">Sub lord</th>
						<th scope="col">Sub sub lord</th>
						<th scope="col">KP no.</th>
					</tr>
				</thead>
				<tbody>
					${planets.map(
						(p) => html`<tr>
							<td class="planet">
								${p.planet}
								${p.retrograde ? html`<span class="retro">R</span>` : nothing}
							</td>
							<td>${p.sign ?? ''}</td>
							<td>${p.signLord ?? ''}</td>
							<td>${p.nakshatra ?? ''}</td>
							<td>${p.nakshatraLord ?? ''}</td>
							<td>${p.subLord ?? ''}</td>
							<td>${p.subSubLord ?? ''}</td>
							<td>${p.kpNumber ?? ''}</td>
						</tr>`,
					)}
				</tbody>
			</table>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-kp-planets-table': RoxyKpPlanetsTable;
	}
}
