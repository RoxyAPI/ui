import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { BirthChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import { capitalize } from '../utils/string.js';

/**
 * Fixed display order: Lagna pinned first as the chart frame, then the nine
 * grahas in classical sequence. Any graha not in this list is appended.
 */
const GRAHA_ORDER = [
	'Lagna',
	'Sun',
	'Moon',
	'Mars',
	'Mercury',
	'Jupiter',
	'Venus',
	'Saturn',
	'Rahu',
	'Ketu',
];

type MetaEntry = BirthChartResponse['meta'][string];

/**
 * Vedic planetary positions table. Renders /vedic-astrology/birth-chart `meta`
 * as the full reference-grade positions grid a practitioner reads alongside
 * the kundli wheel: graha, rashi, exact degree, nakshatra and pada, nakshatra
 * lord, bhava (house), Baladi avastha, and retrograde.
 */
@customElement('roxy-vedic-planets-table')
export class RoxyVedicPlanetsTable extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
				overflow: auto;
				box-shadow: var(--roxy-shadow-sm);
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
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				min-width: 620px;
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
			tbody tr.lagna {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
			}
			td.graha {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.glyph {
				margin-right: 0.4em;
				color: var(--roxy-muted, #71717a);
			}
			/* On the tinted Lagna row the muted glyph drops below the WCAG AA
			   contrast floor, so use the accent foreground there instead. */
			tbody tr.lagna .glyph {
				color: var(--roxy-accent-fg, #b45309);
			}
			.retro {
				color: var(--roxy-warning-fg, #9a3412);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.num {
				font-variant-numeric: tabular-nums;
			}
		`,
	];

	@property({ attribute: false })
	data: BirthChartResponse | null = null;

	/** Ordered [name, entry] pairs: GRAHA_ORDER first, then any extras. */
	private orderedRows(): Array<[string, MetaEntry]> {
		const meta = this.data?.meta ?? {};
		const seen = new Set<string>();
		const rows: Array<[string, MetaEntry]> = [];
		for (const name of GRAHA_ORDER) {
			const entry = meta[name];
			if (entry) {
				rows.push([name, entry]);
				seen.add(name);
			}
		}
		for (const [name, entry] of Object.entries(meta)) {
			if (!seen.has(name)) rows.push([name, entry]);
		}
		return rows;
	}

	render() {
		if (!this.data?.meta)
			return html`<div class="roxy-empty" role="status">No chart data</div>`;
		const rows = this.orderedRows();

		return html`<div class="wrap" aria-label="Vedic planetary positions" tabindex="0">
			<header class="head">
				<h2 class="title">Planetary positions</h2>
			</header>
			<table role="table">
				<thead>
					<tr>
						<th scope="col">Graha</th>
						<th scope="col">Rashi</th>
						<th scope="col">Degree</th>
						<th scope="col">Nakshatra</th>
						<th scope="col">Pada</th>
						<th scope="col">Nak. lord</th>
						<th scope="col">House</th>
						<th scope="col">Avastha</th>
						<th scope="col">Retro</th>
					</tr>
				</thead>
				<tbody>
					${rows.map(([name, p]) => {
						const isLagna = (p.graha ?? name) === 'Lagna';
						const glyph = PLANET_GLYPH[capitalize(p.graha ?? name)] ?? '';
						const signGlyph = SIGN_GLYPH[capitalize(p.rashi ?? '')] ?? '';
						return html`<tr class=${isLagna ? 'lagna' : ''}>
							<td class="graha">
								${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${p.graha ?? name}
							</td>
							<td>
								${signGlyph ? html`<span class="glyph">${signGlyph}</span>` : nothing}${p.rashi ?? ''}
							</td>
							<td class="num">
								${typeof p.longitude === 'number' ? formatSignPosition(p.longitude) : ''}
							</td>
							<td>${p.nakshatra?.name ?? ''}</td>
							<td class="num">${p.nakshatra?.pada ?? ''}</td>
							<td>${p.nakshatra?.lord ?? ''}</td>
							<td class="num">${typeof p.house === 'number' ? p.house : ''}</td>
							<td>${p.awastha ?? ''}</td>
							<td>${p.isRetrograde ? html`<span class="retro">R</span>` : nothing}</td>
						</tr>`;
					})}
				</tbody>
			</table>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-planets-table': RoxyVedicPlanetsTable;
	}
}
