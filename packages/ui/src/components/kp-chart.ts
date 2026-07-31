import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { KpChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import { formatAyanamsa } from '../utils/format.js';
import { houseThemeLine, houseWords } from '../utils/house-themes.js';
import {
	renderTablist,
	type TablistItem,
	tablistStyles,
} from '../utils/tablist.js';

type Tab = 'planets' | 'cusps' | 'significators';

const TABS: ReadonlyArray<TablistItem<Tab>> = [
	{ id: 'planets', label: 'Planets' },
	{ id: 'cusps', label: 'Cusps' },
	{ id: 'significators', label: 'Significators' },
];

/** The four KP significator strength levels, strongest (1) to weakest (4). */
const LEVELS = [1, 2, 3, 4] as const;

type Significators = KpChartResponse['significators'];
type HouseSignificator = Significators['houseWise'][number];
type PlanetSignificator = Significators['planetWise'][number];

/** A planet or node row, normalized so planets and Rahu/Ketu share a table. */
interface KpBody {
	name: string;
	longitude?: number;
	house?: number;
	nakshatra?: string;
	pada?: number;
	starLord?: string;
	subLord?: string;
	subSubLord?: string;
	kpNumber?: number;
	retrograde?: boolean;
}

/** "Chitra 3" when the pada is known, otherwise the bare nakshatra. */
function nakshatraPada(nakshatra?: string, pada?: number): string {
	if (!nakshatra) return '';
	return typeof pada === 'number' ? `${nakshatra} ${pada}` : nakshatra;
}

/**
 * A strength-ordered chain, "Venus > Mars > Jupiter". The API repeats a body in
 * `all` / `allHouses` when it signifies at more than one level (Venus as both
 * star-of-owner and owner), which reads as a stutter, so the first occurrence
 * wins and the rest are folded away. The grouped level columns still show every
 * level that body appears at.
 */
function chain(values: ReadonlyArray<string | number>): string {
	return [...new Set(values.map(String))].join(' > ');
}

/** The same first-occurrence-wins fold {@link chain} applies, for the house wording beneath it, so the numbers and the words never disagree about how many houses there are. */
function dedupe(houses: readonly number[] | undefined): number[] {
	return [...new Set(houses ?? [])];
}

/**
 * KP (Krishnamurti Paddhati) chart. Renders /vedic-astrology/kp/chart: an
 * Ascendant summary, a planets-and-nodes table, a Placidus cusps table, and the
 * significator tables. The Ascendant is cusp 1, so its full four-lord chain is
 * already the first row of the cusps table and the header stays a summary.
 *
 * @remarks
 * The cusp and planet sub lords are the primary predictive surface in KP, so
 * every row carries star lord, sub lord, sub-sub lord, and KP number (1-249).
 * The significators tab is the event-timing surface: house-wise (which planets
 * signify each house) and planet-wise (which houses each planet signifies),
 * both graded L1 to L4 with the API's own level labels shown as the legend.
 *
 * Every bare house number is captioned from the response `houseThemes` map, so
 * "11, 6" reads "gains, enemies" and a cusp row says what that cusp is for. The
 * words are the requested language and the requested `focus` lens, which is why
 * they are read from the payload and never from a table held here.
 */
@customElement('roxy-kp-chart')
export class RoxyKpChart extends RoxyDataElement<KpChartResponse> {
	static styles = [
		baseStyles,
		tablistStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				overflow: auto;
				box-shadow: var(--roxy-shadow-sm);
				width: 100%;
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
			/* The tab strip is inset to the header gutter so it lines up with the
			 * card title rather than the table cells beneath it. */
			.roxy-tablist {
				padding: 0 var(--roxy-space-md, 1rem);
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
			.sig-head {
				padding: var(--roxy-space-md, 1rem) var(--roxy-space-md, 1rem) 0;
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.sig-title {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.sig-note {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				padding: var(--roxy-space-md, 1rem) var(--roxy-space-md, 1rem) 0;
				margin: 0;
				list-style: none;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.legend b {
				color: var(--roxy-accent-ink, #b45309);
				margin-right: 4px;
			}
			.chain {
				color: var(--roxy-muted, #71717a);
			}
			.empty-cell {
				color: var(--roxy-muted, #71717a);
			}
			/* House wording sits under its number, never beside it: these cells are
			 * nowrap, and a house list plus its words on one line would push the
			 * table well past the card. */
			.themes {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-normal, 400);
				text-transform: none;
				letter-spacing: normal;
			}
		`,
	];

	@state()
	private activeTab: Tab = 'planets';

	/** Merge the 7 planets and the two nodes into one ordered body list. */
	private bodies(): KpBody[] {
		const d = this.data;
		if (!d) return [];
		const rows: KpBody[] = (d.planets ?? []).map((p) => ({
			name: p.planet,
			longitude: p.longitude,
			house: p.house,
			nakshatra: p.nakshatra,
			pada: p.pada,
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
					longitude: node.longitude,
					house: node.house,
					nakshatra: node.nakshatra,
					starLord: node.starLord,
					subLord: node.subLord,
					subSubLord: node.subSubLord,
					kpNumber: node.kpNumber,
					retrograde: true,
				});
			}
		}
		return rows;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No KP chart data</div>`;
	}

	protected renderData(d: KpChartResponse) {
		const asc = d.ascendant;

		return html`<div class="wrap" aria-label="KP chart" tabindex="0">
			<header class="head">
				<h2 class="title">KP chart</h2>
				${
					asc
						? html`<div class="asc">
							Ascendant:
							<strong>
								${typeof asc.longitude === 'number' ? formatSignPosition(asc.longitude) : (asc.sign ?? '')}
							</strong>
							${asc.nakshatra ? html`· ${nakshatraPada(asc.nakshatra, asc.pada)}` : nothing}
							${asc.subLord ? html`· sub lord ${asc.subLord}` : nothing}
							${typeof asc.kpNumber === 'number' ? html`· KP ${asc.kpNumber}` : nothing}
						</div>`
						: nothing
				}
				${
					typeof d.meta?.ayanamsa === 'number'
						? html`<div class="ayan">
							Ayanamsa: ${formatAyanamsa(d.meta.ayanamsaType, d.meta.ayanamsa)}
							${d.meta.houseSystem ? html`· ${d.meta.houseSystem} houses` : nothing}
						</div>`
						: nothing
				}
			</header>

			${renderTablist({
				items: TABS,
				active: this.activeTab,
				onSelect: (id) => {
					this.activeTab = id;
				},
				label: 'KP chart views',
				idPrefix: 'kp',
				controls: true,
			})}

			<div id="kp-panel-${this.activeTab}" role="tabpanel" aria-labelledby="kp-tab-${this.activeTab}">
				${
					this.activeTab === 'planets'
						? this.renderPlanets()
						: this.activeTab === 'cusps'
							? this.renderCusps()
							: this.renderSignificators()
				}
			</div>
		</div>`;
	}

	private renderPlanets() {
		const bodies = this.bodies();
		if (!bodies.length)
			return html`<p class="roxy-empty" role="status">No planets</p>`;
		return html`<table role="table">
			<caption class="roxy-sr-only">
				KP planets and nodes: each body with its position, house, nakshatra and pada,
				star lord, sub lord, sub sub lord and KP number.
			</caption>
			<thead>
				<tr>
					<th scope="col">Body</th>
					<th scope="col">Position</th>
					<th scope="col">House</th>
					<th scope="col">Nakshatra, pada</th>
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
						<td class="num">
							${typeof b.longitude === 'number' ? formatSignPosition(b.longitude) : ''}
						</td>
						<td class="num">${typeof b.house === 'number' ? b.house : ''}</td>
						<td>${nakshatraPada(b.nakshatra, b.pada)}</td>
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
		const themes = this.data?.houseThemes;
		if (!cusps.length)
			return html`<p class="roxy-empty" role="status">No cusps</p>`;
		return html`<table role="table">
			<caption class="roxy-sr-only">
				KP Placidus cusps: each house cusp with what it signifies, its position, sign
				lord, nakshatra and pada, star lord, sub lord, sub sub lord and KP number.
			</caption>
			<thead>
				<tr>
					<th scope="col">House</th>
					<th scope="col">Position</th>
					<th scope="col">Sign lord</th>
					<th scope="col">Nakshatra, pada</th>
					<th scope="col">Star lord</th>
					<th scope="col">Sub lord</th>
					<th scope="col">Sub sub lord</th>
					<th scope="col">KP no.</th>
				</tr>
			</thead>
			<tbody>
				${cusps.map(
					(c) => html`<tr>
						<td class="body num">
							${c.house}${this.renderThemes(houseThemeLine(c.house, themes))}
						</td>
						<td class="num">
							${typeof c.longitude === 'number' ? formatSignPosition(c.longitude) : (c.sign ?? '')}
						</td>
						<td>${c.signLord ?? ''}</td>
						<td>${nakshatraPada(c.nakshatra, c.pada)}</td>
						<td>${c.starLord ?? ''}</td>
						<td>${c.subLord ?? ''}</td>
						<td>${c.subSubLord ?? ''}</td>
						<td class="num">${typeof c.kpNumber === 'number' ? c.kpNumber : ''}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	/**
	 * The KP event-timing surface. House-wise answers "which planets can deliver
	 * this house", planet-wise answers "what will this planet deliver in its
	 * dasha". The L1-L4 legend text is the API's own level description, so the
	 * grading a reader sees is the grading the engine applied.
	 */
	private renderSignificators() {
		const sig = this.data?.significators;
		const themes = this.data?.houseThemes;
		const houseWise = sig?.houseWise ?? [];
		const planetWise = sig?.planetWise ?? [];
		if (!houseWise.length && !planetWise.length)
			return html`<p class="roxy-empty" role="status">No significators</p>`;

		return html`
			${this.renderLevelLegend(houseWise)}
			${
				houseWise.length
					? html`<div class="sig-head">
							<h3 class="sig-title">House-wise significators</h3>
							<p class="sig-note">Planets that signify each house, strongest level first.</p>
						</div>
						<table role="table">
							<caption class="roxy-sr-only">
								KP house-wise significators: each house, the planets that signify it at
								levels 1 to 4, and the full strength order.
							</caption>
							<thead>
								<tr>
									<th scope="col">House</th>
									${LEVELS.map((l) => html`<th scope="col">L${l}</th>`)}
									<th scope="col">Strength order</th>
								</tr>
							</thead>
							<tbody>
								${houseWise.map(
									(h) => html`<tr>
										<td class="body num">
											${h.house}${this.renderThemes(houseThemeLine(h.house, themes))}
										</td>
										${LEVELS.map((l) => this.renderCell(this.planetsAtLevel(h, l).join(', ')))}
										<td class="chain">${chain(h.all ?? [])}</td>
									</tr>`,
								)}
							</tbody>
						</table>`
					: nothing
			}
			${
				planetWise.length
					? html`<div class="sig-head">
							<h3 class="sig-title">Planet-wise significators</h3>
							<p class="sig-note">Houses each planet signifies, strongest level first.</p>
						</div>
						<table role="table">
							<caption class="roxy-sr-only">
								KP planet-wise significators: each planet, the houses it signifies at
								levels 1 to 4, and the full strength order.
							</caption>
							<thead>
								<tr>
									<th scope="col">Planet</th>
									${LEVELS.map((l) => html`<th scope="col">L${l}</th>`)}
									<th scope="col">Strength order</th>
								</tr>
							</thead>
							<tbody>
								${planetWise.map(
									(p) => html`<tr>
										<td class="body">${p.planet}</td>
										${LEVELS.map((l) => this.renderCell(this.housesAtLevel(p, l).join(', ')))}
										<td class="chain">
											${chain(p.allHouses ?? [])}${this.renderThemes(houseWords(dedupe(p.allHouses), themes))}
										</td>
									</tr>`,
								)}
							</tbody>
						</table>`
					: nothing
			}
		`;
	}

	/** The house wording under a number cell, or nothing when the request did not ask for themes. */
	private renderThemes(words: string) {
		return words ? html`<span class="themes">${words}</span>` : nothing;
	}

	/** An em-dash-free placeholder keeps an empty level cell from reading as missing data. */
	private renderCell(value: string) {
		return value
			? html`<td>${value}</td>`
			: html`<td class="empty-cell">none</td>`;
	}

	private planetsAtLevel(h: HouseSignificator, level: number): string[] {
		return (h.significators ?? [])
			.filter((s) => s.level === level)
			.flatMap((s) => s.planets ?? []);
	}

	private housesAtLevel(p: PlanetSignificator, level: number): number[] {
		return (p.signifies ?? [])
			.filter((s) => s.level === level)
			.flatMap((s) => s.houses ?? []);
	}

	/** Level to the API's own label, taken from the first house that carries it. */
	private renderLevelLegend(houseWise: HouseSignificator[]) {
		const labels = new Map<number, string>();
		for (const h of houseWise) {
			for (const s of h.significators ?? []) {
				if (s.description && !labels.has(s.level))
					labels.set(s.level, s.description);
			}
		}
		if (labels.size === 0) return nothing;
		return html`<ul class="legend" aria-label="Significator levels">
			${[...labels.entries()]
				.sort((a, b) => a[0] - b[0])
				.map(([level, label]) => html`<li><b>L${level}</b>${label}</li>`)}
		</ul>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-kp-chart': RoxyKpChart;
	}
}
