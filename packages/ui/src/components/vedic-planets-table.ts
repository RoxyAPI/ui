import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { planetGlyph, signGlyph } from '../tokens/index.js';
import type { BirthChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import { formatNumber, formatWithSanskrit } from '../utils/format.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';

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
 * lord, bhava (house), all three avastha systems, and retrograde.
 *
 * @remarks
 * The three avastha systems each get their own column rather than one merged
 * state, because they answer different questions and a reader looks up exactly
 * one of them at a time: Baladi is the age state read from the degree, Jagradadi
 * the waking state and Deeptadi the dispositional state, both read from sign
 * dignity. Dignity is a relationship to a sign lord, which Rahu, Ketu and the
 * Lagna do not have, so the API returns only `awastha` for those three and their
 * last two cells are deliberately EMPTY. They are not rendered as a dash or a
 * placeholder: both read as data that failed to arrive.
 *
 * The positions grid is the default view. The same birth-chart response also
 * carries chart-wide conditions and readings, surfaced as collapsed accordions
 * below the grid so they never crowd the table: combust grahas (astangata),
 * planetary wars (graha yuddha), per-graha rashi and nakshatra interpretations,
 * the active classical yogas (present === true), and the twelve bhava
 * significations. Each accordion renders only when its source array or map is
 * non-empty.
 */
@customElement('roxy-vedic-planets-table')
export class RoxyVedicPlanetsTable extends RoxyDataElement<BirthChartResponse> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		disclosureStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
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
				min-width: 0;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				/* Three avastha columns rather than one, so the grid needs the room
				 * before the scroll container takes over. */
				min-width: 760px;
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
			/* The moderns are separated from the nine grahas by a RULE, never a tint. A tint
			   would read as emphasis the tradition does not give them, and a tinted row is
			   exactly where this library has measured muted text below the AA floor before. */
			tbody tr.modern-first {
				border-top-width: 2px;
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
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so a nowrap table wider than the card blows
				 * the column out and drags every sibling with it, clipped on the right. This
				 * is what lets the scroll container inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
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

	protected renderData(d: BirthChartResponse) {
		if (!d.meta) return this.renderEmpty();
		const rows = this.orderedRows();

		return html`<div class="wrap" part="card" aria-label="Vedic planetary positions">
			<header class="head" part="header">
				<h2 class="title">Planetary positions</h2>
				${renderFrameCaption(d.frame)}
			</header>
			<div class="scroll" part="table" tabindex="0">
			<table role="table">
				<caption class="roxy-sr-only">
					Vedic planetary positions: each graha with its rashi, degree, nakshatra, pada,
					nakshatra lord, house, its state in all three avastha systems, and retrograde
					state. Jagradadi and Deeptadi are read from sign dignity, which the nodes and
					the Lagna do not have, so those two cells are blank on the Rahu, Ketu and
					Lagna rows. Uranus, Neptune and Pluto appear only when asked for and rule no
					sign, so every avastha and house cell is blank on their rows too.
				</caption>
				<thead>
					<tr>
						<th scope="col">Graha</th>
						<th scope="col">Rashi</th>
						<th scope="col">Degree</th>
						<th scope="col">Nakshatra</th>
						<th scope="col">Pada</th>
						<th scope="col">Nak. lord</th>
						<th scope="col">House</th>
						<th scope="col" title="Baladi: the five age states, set by degree within the sign">
							Baladi
						</th>
						<th
							scope="col"
							title="Jagradadi: the three waking states, set by sign dignity. The seven classical grahas only"
						>
							Jagradadi
						</th>
						<th
							scope="col"
							title="Deeptadi: the nine dispositional states, set by sign dignity. The seven classical grahas only"
						>
							Deeptadi
						</th>
						<th scope="col">Retro</th>
					</tr>
				</thead>
				<tbody>
					${rows.map(([name, p]) => {
						const isLagna = (p.graha ?? name) === 'Lagna';
						const glyph = planetGlyph(p.graha ?? name) ?? '';
						const sGlyph = signGlyph(p.rashi) ?? '';
						return html`<tr class=${isLagna ? 'lagna' : ''}>
							<td class="graha">
								${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${p.graha ?? name}
							</td>
							<td>
								${sGlyph ? html`<span class="glyph">${sGlyph}</span>` : nothing}${p.rashi ?? ''}
							</td>
							<td class="num">
								${typeof p.longitude === 'number' ? formatSignPosition(p.longitude) : ''}
							</td>
							<td>${p.nakshatra?.name ?? ''}</td>
							<td class="num">${p.nakshatra?.pada ?? ''}</td>
							<td>${p.nakshatra?.lord ?? ''}</td>
							<td class="num">${typeof p.house === 'number' ? p.house : ''}</td>
							<td>${p.awastha ?? ''}</td>
							<td>${p.jagradadi ?? ''}</td>
							<td>${p.deeptadi ?? ''}</td>
							<td>${p.isRetrograde ? html`<span class="retro">R</span>` : nothing}</td>
						</tr>`;
					})}
					${this.renderModernRows()}
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

	/**
	 * Uranus, Neptune and Pluto, present only when the caller sent `modernPlanets: true`.
	 *
	 * @remarks
	 * They arrive in their OWN array rather than inside `meta`, which is deliberate on the API side and load-bearing here: a component iterating `meta` must not pick them up by accident, because classical Jyotish is defined over nine grahas. The moderns rule no sign, so they have no dignity and therefore no Baladi, Jagradadi or Deeptadi state and no house lordship.
	 *
	 * Those cells are left BLANK rather than filled with a zero or a dash, matching what the nodes and the Lagna already do two columns over. A zero would read as a measured state of zero strength, which is a different and false claim from "this system does not apply here".
	 */
	private renderModernRows() {
		const moderns = this.data?.modernPlanets ?? [];
		if (moderns.length === 0) return nothing;
		return moderns.map((m, i) => {
			const sGlyph = signGlyph(m.rashi) ?? '';
			return html`<tr class="modern ${i === 0 ? 'modern-first' : ''}">
				<td class="graha">${formatWithSanskrit(m.planet, m.sanskritName)}</td>
				<td>
					${sGlyph ? html`<span class="glyph">${sGlyph}</span>` : nothing}${m.rashi ?? ''}
				</td>
				<td class="num">
					${typeof m.longitude === 'number' ? formatSignPosition(m.longitude) : ''}
				</td>
				<td>${m.nakshatra?.name ?? ''}</td>
				<td class="num">${m.nakshatra?.pada ?? ''}</td>
				<td>${m.nakshatra?.lord ?? ''}</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td>${m.isRetrograde ? html`<span class="retro">R</span>` : nothing}</td>
			</tr>`;
		});
	}

	private renderCombustion() {
		const combust = this.data?.combustion ?? [];
		if (combust.length === 0) return nothing;
		return html`<details class="panel" part="section combustion">
			<summary>
				Combust grahas<span class="summary-count">${combust.length}</span>${chevron()}
			</summary>
			<div class="panel-body">
				${combust.map((c) => {
					const glyph = planetGlyph(c.planet) ?? '';
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
		return html`<details class="panel" part="section planetary-war">
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
		// The one block on this table that is prose about the result rather than a
		// measurement of it, which is the line `hide-readings` is drawn on. The
		// columns, the combustion and planetary-war panels and the yoga list are
		// all facts and stay. Without this the component rendered a `readings` part
		// that the attribute did not touch, against a README that promises every
		// component with a written interpretation acts on it.
		if (this.hideReadings) return nothing;
		const interp = this.data?.interpretations ?? {};
		const entries = this.orderedRows()
			.map(([name, p]) => [p.graha ?? name, interp[p.graha ?? name]] as const)
			.filter(([, v]) => v != null);
		if (entries.length === 0) return nothing;
		return html`<details class="panel" part="section readings">
			<summary>
				Interpretations<span class="summary-count">${entries.length}</span>${chevron()}
			</summary>
			<div class="panel-body">
				${entries.map(([name, v]) => {
					const glyph = planetGlyph(name) ?? '';
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
		return html`<details class="panel" part="section bhava-significations">
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
		return html`<details class="panel" part="section yogas">
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
