import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { BirthChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import { formatNumber } from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';
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
 *
 * @remarks
 * The positions grid is the default view. The same birth-chart response also
 * carries chart-wide conditions and readings, surfaced as collapsed accordions
 * below the grid so they never crowd the table: combust grahas (astangata),
 * planetary wars (graha yuddha), per-graha rashi and nakshatra interpretations,
 * the active classical yogas (present === true), and the twelve bhava
 * significations. Each accordion renders only when its source array or map is
 * non-empty.
 */
@customElement('roxy-vedic-planets-table')
export class RoxyVedicPlanetsTable extends LitElement {
	static styles = [
		baseStyles,
		disclosureStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
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
			.scroll {
				overflow-x: auto;
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
				color: var(--roxy-accent-ink, #b45309);
			}
			.retro {
				color: var(--roxy-warning-fg, #9a3412);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.num {
				font-variant-numeric: tabular-nums;
			}
			details.panel {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			details.panel > summary {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--roxy-space-sm, 0.5rem);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				cursor: pointer;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			details.panel > summary:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: -2px;
			}
			.summary-count {
				margin-left: auto;
				margin-right: var(--roxy-space-xs, 0.25rem);
				font-weight: var(--roxy-weight-normal, 400);
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}
			.panel-body {
				padding: 0 var(--roxy-space-md, 1rem) var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.condition {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: 0.4em;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.condition .planet {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.condition .detail {
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}
			.condition .winner {
				color: var(--roxy-success-fg, #166534);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.interp {
				display: grid;
				gap: 0.15em;
			}
			.interp .planet {
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.interp p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.interp .label {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.bhava {
				display: grid;
				gap: 0.15em;
			}
			.bhava .name {
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bhava .desc {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.quality {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.04em;
			}
			.quality.positive {
				color: var(--roxy-success-fg, #166534);
			}
			.quality.negative {
				color: var(--roxy-danger-fg, #991b1b);
			}
			.quality.both {
				color: var(--roxy-muted, #71717a);
			}
		`,
	];

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

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

		return html`<div class="wrap" aria-label="Vedic planetary positions">
			<header class="head">
				<h2 class="title">Planetary positions</h2>
			</header>
			<div class="scroll" tabindex="0">
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
			</div>
			${this.renderCombustion()}
			${this.renderPlanetaryWar()}
			${this.renderInterpretations()}
			${this.renderYogas()}
			${this.renderHouses()}
		</div>`;
	}

	private renderCombustion() {
		const combust = this.data?.combustion ?? [];
		if (combust.length === 0) return nothing;
		return html`<details class="panel">
			<summary>
				Combust grahas<span class="summary-count">${combust.length}</span>${chevron()}
			</summary>
			<div class="panel-body">
				${combust.map((c) => {
					const glyph = PLANET_GLYPH[capitalize(c.planet)] ?? '';
					const dist = formatNumber(c.distanceFromSun, 2);
					const orb = formatNumber(c.orb, 1);
					return html`<div class="condition">
						<span class="planet">${glyph ? `${glyph} ` : ''}${c.planet}</span>
						<span class="detail">${dist} deg from Sun, within ${orb} deg orb</span>
					</div>`;
				})}
			</div>
		</details>`;
	}

	private renderPlanetaryWar() {
		const wars = this.data?.planetaryWar ?? [];
		if (wars.length === 0) return nothing;
		return html`<details class="panel">
			<summary>
				Planetary wars<span class="summary-count">${wars.length}</span>${chevron()}
			</summary>
			<div class="panel-body">
				${wars.map((w) => {
					const dist = formatNumber(w.distance, 2);
					return html`<div class="condition">
						<span class="planet">${w.planet1} vs ${w.planet2}</span>
						<span class="detail">${dist} deg apart</span>
						<span class="winner">${w.winner} wins</span>
					</div>`;
				})}
			</div>
		</details>`;
	}

	private renderInterpretations() {
		const interp = this.data?.interpretations ?? {};
		const entries = this.orderedRows()
			.map(([name, p]) => [p.graha ?? name, interp[p.graha ?? name]] as const)
			.filter(([, v]) => v != null);
		if (entries.length === 0) return nothing;
		return html`<details class="panel">
			<summary>
				Interpretations<span class="summary-count">${entries.length}</span>${chevron()}
			</summary>
			<div class="panel-body">
				${entries.map(([name, v]) => {
					const glyph = PLANET_GLYPH[capitalize(name)] ?? '';
					return html`<div class="interp">
						<span class="planet">${glyph ? `${glyph} ` : ''}${name}</span>
						${v.rashi ? html`<p><span class="label">Rashi.</span> ${v.rashi}</p>` : nothing}
						${v.nakshatra ? html`<p><span class="label">Nakshatra.</span> ${v.nakshatra}</p>` : nothing}
					</div>`;
				})}
			</div>
		</details>`;
	}

	private renderHouses() {
		const houses = (this.data?.houses ?? []).filter(
			(h) => h.name || h.description,
		);
		if (houses.length === 0) return nothing;
		return html`<details class="panel">
			<summary>
				Bhava significations<span class="summary-count">${houses.length}</span>${chevron()}
			</summary>
			<div class="panel-body">
				${houses.map(
					(h) => html`<div class="bhava">
						<span class="name">${h.number}. ${h.name ?? ''}</span>
						${h.description ? html`<p class="desc">${h.description}</p>` : nothing}
					</div>`,
				)}
			</div>
		</details>`;
	}

	private renderYogas() {
		const yogas = (this.data?.yogas ?? []).filter((y) => y.present);
		if (yogas.length === 0) return nothing;
		return html`<details class="panel">
			<summary>
				Yogas<span class="summary-count">${yogas.length}</span>${chevron()}
			</summary>
			<div class="panel-body">
				${yogas.map(
					(y) => html`<div class="bhava">
						<span class="name">${y.name} ${y.quality ? html`<span class="quality ${y.quality.toLowerCase()}">${y.quality}</span>` : nothing}</span>
						${y.result ? html`<p class="desc">${y.result}</p>` : nothing}
					</div>`,
				)}
			</div>
		</details>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-planets-table': RoxyVedicPlanetsTable;
	}
}
