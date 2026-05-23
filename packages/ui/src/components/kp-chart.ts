import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { KpChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';

type Tab = 'planets' | 'cusps';

/** A planet or node row, normalized so planets and Rahu/Ketu share a table. */
interface KpBody {
	name: string;
	sign?: string;
	house?: number;
	nakshatra?: string;
	starLord?: string;
	subLord?: string;
	subSubLord?: string;
	kpNumber?: number;
	retrograde?: boolean;
}

/**
 * KP (Krishnamurti Paddhati) chart. Renders /vedic-astrology/kp/chart: the
 * Ascendant with its full stellar hierarchy, a planets-and-nodes table, and a
 * Placidus cusps table. The cusp and planet sub lords are the primary
 * predictive surface in KP astrology, so each row carries star lord, sub lord,
 * sub-sub lord, and KP number (1-249).
 */
@customElement('roxy-kp-chart')
export class RoxyKpChart extends LitElement {
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
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.asc,
			.ayan {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.asc strong {
				color: var(--roxy-fg, #0a0a0a);
			}
			.tablist {
				display: flex;
				gap: 2px;
				padding: 0 var(--roxy-space-md, 1rem);
				border-bottom: 2px solid var(--roxy-border, #e4e4e7);
			}
			.tab {
				padding: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				background: none;
				border: none;
				border-bottom: 2px solid transparent;
				margin-bottom: -2px;
				cursor: pointer;
				color: var(--roxy-muted, #71717a);
				font-family: inherit;
			}
			.tab[aria-selected='true'] {
				color: var(--roxy-accent-ink, #b45309);
				border-bottom-color: var(--roxy-accent, #f59e0b);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.tab:hover:not([aria-selected='true']) {
				color: var(--roxy-fg, #0a0a0a);
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
			td.body {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.retro {
				color: var(--roxy-warning-fg, #9a3412);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin-left: 4px;
			}
			.num {
				font-variant-numeric: tabular-nums;
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
	data: KpChartResponse | null = null;

	@state()
	private activeTab: Tab = 'planets';

	/** Merge the 7 planets and the two nodes into one ordered body list. */
	private bodies(): KpBody[] {
		const d = this.data;
		if (!d) return [];
		const rows: KpBody[] = (d.planets ?? []).map((p) => ({
			name: p.planet,
			sign: p.sign,
			house: p.house,
			nakshatra: p.nakshatra,
			starLord: p.starLord,
			subLord: p.subLord,
			subSubLord: p.subSubLord,
			kpNumber: p.kpNumber,
			retrograde: p.retrograde,
		}));
		const nodes = d.nodes;
		for (const [name, node] of [
			['Rahu', nodes?.rahu],
			['Ketu', nodes?.ketu],
		] as const) {
			if (node) {
				rows.push({
					name,
					sign: node.sign,
					house: node.house,
					nakshatra: node.nakshatra,
					starLord: node.starLord,
					subLord: node.subLord,
					subSubLord: node.subSubLord,
					retrograde: true,
				});
			}
		}
		return rows;
	}

	private onTabKeyDown(e: KeyboardEvent) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		e.preventDefault();
		this.activeTab = this.activeTab === 'planets' ? 'cusps' : 'planets';
		const next = this.activeTab;
		requestAnimationFrame(() => {
			this.shadowRoot
				?.querySelector<HTMLButtonElement>(`#tab-${next}`)
				?.focus();
		});
	}

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No KP chart data</div>`;
		const d = this.data;
		const asc = d.ascendant;

		return html`<div class="wrap" aria-label="KP chart" tabindex="0">
			<header class="head">
				<h2 class="title">KP chart</h2>
				${
					asc
						? html`<div class="asc">
							Ascendant: <strong>${asc.sign ?? ''}</strong>
							${asc.nakshatra ? html`· ${asc.nakshatra}` : nothing}
							${asc.subLord ? html`· sub lord ${asc.subLord}` : nothing}
							${typeof asc.kpNumber === 'number' ? html`· KP ${asc.kpNumber}` : nothing}
						</div>`
						: nothing
				}
				${
					typeof d.meta?.ayanamsa === 'number'
						? html`<div class="ayan">
							${d.meta.ayanamsaType ?? 'Ayanamsa'}: ${formatNumber(d.meta.ayanamsa, 4)}°
							${d.meta.houseSystem ? html`· ${d.meta.houseSystem} houses` : nothing}
						</div>`
						: nothing
				}
			</header>

			<div
				class="tablist"
				role="tablist"
				aria-label="KP chart views"
				@keydown=${this.onTabKeyDown}
			>
				${(['planets', 'cusps'] as const).map(
					(t) => html`<button
						class="tab"
						role="tab"
						id="tab-${t}"
						aria-selected=${this.activeTab === t ? 'true' : 'false'}
						aria-controls="panel-${t}"
						tabindex=${this.activeTab === t ? '0' : '-1'}
						@click=${() => {
							this.activeTab = t;
						}}
					>
						${t === 'planets' ? 'Planets' : 'Cusps'}
					</button>`,
				)}
			</div>

			<div id="panel-${this.activeTab}" role="tabpanel" aria-labelledby="tab-${this.activeTab}">
				${this.activeTab === 'planets' ? this.renderPlanets() : this.renderCusps()}
			</div>
		</div>`;
	}

	private renderPlanets() {
		const bodies = this.bodies();
		if (!bodies.length)
			return html`<p class="roxy-empty" role="status">No planets</p>`;
		return html`<table role="table" aria-label="KP planets and nodes">
			<thead>
				<tr>
					<th scope="col">Body</th>
					<th scope="col">Sign</th>
					<th scope="col">House</th>
					<th scope="col">Nakshatra</th>
					<th scope="col">Star lord</th>
					<th scope="col">Sub lord</th>
					<th scope="col">Sub sub lord</th>
					<th scope="col">KP no.</th>
				</tr>
			</thead>
			<tbody>
				${bodies.map(
					(b) => html`<tr>
						<td class="body">
							${b.name}${b.retrograde ? html`<span class="retro">R</span>` : nothing}
						</td>
						<td>${b.sign ?? ''}</td>
						<td class="num">${typeof b.house === 'number' ? b.house : ''}</td>
						<td>${b.nakshatra ?? ''}</td>
						<td>${b.starLord ?? ''}</td>
						<td>${b.subLord ?? ''}</td>
						<td>${b.subSubLord ?? ''}</td>
						<td class="num">${typeof b.kpNumber === 'number' ? b.kpNumber : ''}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	private renderCusps() {
		const cusps = this.data?.cusps ?? [];
		if (!cusps.length)
			return html`<p class="roxy-empty" role="status">No cusps</p>`;
		return html`<table role="table" aria-label="KP Placidus cusps">
			<thead>
				<tr>
					<th scope="col">House</th>
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
				${cusps.map(
					(c) => html`<tr>
						<td class="body num">${c.house}</td>
						<td>${c.sign ?? ''}</td>
						<td>${c.signLord ?? ''}</td>
						<td>${c.nakshatra ?? ''}</td>
						<td>${c.starLord ?? ''}</td>
						<td>${c.subLord ?? ''}</td>
						<td>${c.subSubLord ?? ''}</td>
						<td class="num">${typeof c.kpNumber === 'number' ? c.kpNumber : ''}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-kp-chart': RoxyKpChart;
	}
}
