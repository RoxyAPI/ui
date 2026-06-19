import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { KpRulingPlanetsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

/**
 * KP ruling planets card. Renders /vedic-astrology/kp/ruling-planets: the day
 * lord, the Moon and Lagna stellar hierarchies (sign lord, star lord, sub
 * lord, sub-sub lord), the consolidated ruling-planet list ordered by
 * strength, and, when birth data is supplied, the house significators per
 * planet. The primary horary timing tool in KP astrology.
 */
@customElement('roxy-kp-ruling-planets')
export class RoxyKpRulingPlanets extends RoxyDataElement<KpRulingPlanetsResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				padding: var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.day-lord {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.day-lord strong {
				color: var(--roxy-fg, #0a0a0a);
			}
			.groups {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.group h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.group dl {
				margin: 0;
				display: grid;
				grid-template-columns: auto 1fr;
				gap: 2px var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.group dt {
				color: var(--roxy-muted, #71717a);
			}
			.group dd {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.rp-list {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				align-items: center;
			}
			.rp-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
				margin-right: var(--roxy-space-xs, 0.25rem);
			}
			.rp {
				display: inline-flex;
				align-items: center;
				gap: 0.3em;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				padding: 0.15em 0.6em;
				border-radius: 999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.rp .rank {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-accent-ink, #b45309);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			th,
			td {
				padding: var(--roxy-space-xs, 0.25rem) var(--roxy-space-sm, 0.5rem);
				text-align: left;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No ruling planets data</div>`;
	}

	protected renderData(d: KpRulingPlanetsResponse) {
		const significators = d.significators ?? [];

		return html`<div class="wrap" aria-label="KP ruling planets">
			<header>
				<h2 class="title">KP ruling planets</h2>
				${
					d.dayLord
						? html`<div class="day-lord">Day lord: <strong>${d.dayLord}</strong></div>`
						: nothing
				}
			</header>

			<div class="groups">
				<div class="group">
					<h3>Moon</h3>
					<dl>
						<dt>Sign lord</dt><dd>${d.moonSignLord ?? ''}</dd>
						<dt>Star lord</dt><dd>${d.moonStarLord ?? ''}</dd>
						<dt>Sub lord</dt><dd>${d.moonSublord ?? ''}</dd>
						<dt>Sub-sub lord</dt><dd>${d.moonSubSublord ?? ''}</dd>
					</dl>
				</div>
				<div class="group">
					<h3>Lagna</h3>
					<dl>
						<dt>Sign lord</dt><dd>${d.lagnaSignLord ?? ''}</dd>
						<dt>Star lord</dt><dd>${d.lagnaStarLord ?? ''}</dd>
						<dt>Sub lord</dt><dd>${d.lagnaSublord ?? ''}</dd>
						<dt>Sub-sub lord</dt><dd>${d.lagnaSubSublord ?? ''}</dd>
					</dl>
				</div>
			</div>

			${
				d.rulingPlanets?.length
					? html`<div class="rp-list" role="list" aria-label="Ruling planets by strength">
						<span class="rp-label">Ruling planets</span>
						${d.rulingPlanets.map(
							(p, i) =>
								html`<span class="rp" role="listitem"><span class="rank">${i + 1}</span> ${p}</span>`,
						)}
					</div>`
					: nothing
			}

			${
				significators.length
					? html`<table aria-label="House significators">
						<thead>
							<tr>
								<th scope="col">Planet</th>
								<th scope="col">Signifies houses</th>
							</tr>
						</thead>
						<tbody>
							${significators.map(
								(s) => html`<tr>
									<td>${s.planet}</td>
									<td>${(s.signifies ?? []).join(', ')}</td>
								</tr>`,
							)}
						</tbody>
					</table>`
					: nothing
			}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-kp-ruling-planets': RoxyKpRulingPlanets;
	}
}
