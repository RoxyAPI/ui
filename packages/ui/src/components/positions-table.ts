import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type {
	ArabicLotsResponse,
	AsteroidsResponse,
	LilithResponse,
	ProgressionsResponse,
	SolarArcResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	formatDegreeInSign,
	longitudeToSignPosition,
} from '../utils/degree.js';
import { disclosureStyles } from '../utils/disclosure.js';
import { formatNumber } from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderInterpAccordion,
} from '../utils/interp-accordion.js';
import { capitalize } from '../utils/string.js';

/**
 * Union of the position-list Western responses this one editorial table renders.
 * Each carries an array of bodies in zodiac signs plus a per-body
 * interpretation; the table discriminates on which array key is present.
 */
type PositionsResponse =
	| AsteroidsResponse
	| LilithResponse
	| ProgressionsResponse
	| SolarArcResponse
	| ArabicLotsResponse;

interface Row {
	label: string;
	sign: string;
	degree: number;
	house?: number;
	speed?: number;
	isRetrograde?: boolean;
	formula?: string;
	natalLongitude?: number;
	interpretation?: string;
	isAngle?: boolean;
}

interface ViewModel {
	title: string;
	badges: Array<{ label: string; value: string }>;
	summary?: string;
	rows: Row[];
	cols: { house: boolean; motion: boolean; formula: boolean; natal: boolean };
}

/**
 * Editorial positions table for the Western point-list endpoints: asteroids,
 * Black Moon Lilith, secondary progressions, solar arc directions, and the
 * Arabic lots. One component, five shapes: it detects the response by its array
 * key and shows only the columns that response carries (house, motion, formula,
 * or a natal-to-directed comparison), then lists each body reading below.
 */
@customElement('roxy-positions-table')
export class RoxyPositionsTable extends RoxyDataElement<PositionsResponse> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.wrap {
				width: 100%;
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
			header {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}
			.badges {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.badge {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.badge b {
				color: var(--roxy-accent-ink, #b45309);
				font-weight: 600;
			}
			.summary {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			.scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			caption {
				text-align: left;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				padding-bottom: var(--roxy-space-xs, 0.25rem);
			}
			th,
			td {
				text-align: left;
				padding: 6px 10px;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.04em;
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			td.num {
				text-align: right;
				font-variant-numeric: tabular-nums;
			}
			.body-cell {
				font-weight: 500;
				color: var(--roxy-fg, #0a0a0a);
			}
			.body-cell .glyph {
				color: var(--roxy-accent-ink, #b45309);
				margin-right: 0.35rem;
			}
			tr.angle td {
				color: var(--roxy-secondary, #475569);
			}
			.sign {
				display: inline-flex;
				align-items: baseline;
				gap: 0.3rem;
			}
			.sign .sg {
				color: var(--roxy-secondary, #475569);
			}
			.retro {
				color: var(--roxy-danger, #dc2626);
				font-weight: 600;
			}
			.formula {
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
				white-space: normal;
			}
		`,
	];

	/** Override the auto-derived heading. Empty keeps the per-shape default (e.g. "Asteroids"). */
	@property({ type: String })
	heading = '';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No positions data</div>`;
	}

	protected renderData(data: PositionsResponse) {
		const vm = this.toViewModel(data);
		const cols = vm.cols;
		return html`<div class="wrap">
			<header>
				<h2 class="title">${this.heading || vm.title}</h2>
				${
					vm.badges.length
						? html`<div class="badges">
							${vm.badges.map((b) => html`<span class="badge"><b>${b.label}</b> ${b.value}</span>`)}
						</div>`
						: nothing
				}
			</header>
			${vm.summary ? html`<p class="summary">${vm.summary}</p>` : nothing}
			<div class="scroll">
				<table>
					<caption>
						${vm.title}
					</caption>
					<thead>
						<tr>
							<th scope="col">Body</th>
							<th scope="col">Position</th>
							${cols.natal ? html`<th scope="col">Natal</th>` : nothing}
							${cols.house ? html`<th scope="col" class="num">House</th>` : nothing}
							${cols.motion ? html`<th scope="col">Motion</th>` : nothing}
							${cols.formula ? html`<th scope="col">Formula</th>` : nothing}
						</tr>
					</thead>
					<tbody>
						${vm.rows.map((r) => this.renderRow(r, cols))}
					</tbody>
				</table>
			</div>
			${this.renderReadings(vm.rows)}
		</div>`;
	}

	private renderRow(r: Row, cols: ViewModel['cols']) {
		const glyph = PLANET_GLYPH[capitalize(r.label)];
		return html`<tr class=${r.isAngle ? 'angle' : ''}>
			<td class="body-cell">${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${r.label}</td>
			<td>${this.signCell(r.sign, r.degree)}</td>
			${
				cols.natal
					? html`<td>${r.natalLongitude != null ? this.signFromLongitude(r.natalLongitude) : html`&mdash;`}</td>`
					: nothing
			}
			${
				cols.house
					? html`<td class="num">${r.house != null ? r.house : html`&mdash;`}</td>`
					: nothing
			}
			${
				cols.motion
					? html`<td>${
							r.speed != null
								? html`${formatNumber(r.speed, 3)}°/day${r.isRetrograde ? html` <span class="retro">℞</span>` : nothing}`
								: html`&mdash;`
						}</td>`
					: nothing
			}
			${cols.formula ? html`<td class="formula">${r.formula ?? html`&mdash;`}</td>` : nothing}
		</tr>`;
	}

	private signCell(sign: string, degree: number) {
		const g = SIGN_GLYPH[capitalize(sign)];
		return html`<span class="sign">${g ? html`<span class="sg">${g}</span>` : nothing}${formatDegreeInSign(degree)} ${sign}</span>`;
	}

	private signFromLongitude(longitude: number) {
		const p = longitudeToSignPosition(longitude);
		return this.signCell(p.sign, p.degree + p.minute / 60);
	}

	private renderReadings(rows: Row[]) {
		const sections: InterpSection[] = rows
			.filter((r) => r.interpretation)
			.map((r) => {
				const glyph = PLANET_GLYPH[capitalize(r.label)] ?? '';
				return {
					label: `${glyph} ${r.label}`.trim(),
					aside: `${r.sign} ${formatDegreeInSign(r.degree)}`.trim(),
					body: r.interpretation ?? '',
				};
			});
		return renderInterpAccordion(sections, 'positions-readings', 'Readings');
	}

	private toViewModel(data: PositionsResponse): ViewModel {
		if ('asteroids' in data) {
			return {
				title: 'Asteroids',
				badges: data.houseSystem
					? [{ label: 'Houses', value: data.houseSystem }]
					: [],
				summary: data.summary,
				cols: { house: true, motion: true, formula: false, natal: false },
				rows: data.asteroids.map((a) => ({
					label: a.name,
					sign: a.sign,
					degree: a.degree,
					house: a.house,
					speed: a.speed,
					isRetrograde: a.isRetrograde,
					interpretation: a.interpretation,
				})),
			};
		}
		if ('lilith' in data) {
			return {
				title: 'Black Moon Lilith',
				badges: data.houseSystem
					? [{ label: 'Houses', value: data.houseSystem }]
					: [],
				summary: data.summary,
				cols: { house: true, motion: true, formula: false, natal: false },
				rows: data.lilith.map((l) => ({
					label: `${capitalize(l.variant)} apogee`,
					sign: l.sign,
					degree: l.degree,
					house: l.house,
					speed: l.speed,
					isRetrograde: l.isRetrograde,
					interpretation: l.interpretation,
				})),
			};
		}
		if ('directed' in data) {
			return {
				title: 'Solar arc directions',
				badges: [
					{ label: 'Arc', value: `${formatNumber(data.solarArc, 2)}°` },
					{ label: 'Directed to', value: data.targetDate },
				],
				summary: data.summary,
				cols: { house: false, motion: false, formula: false, natal: true },
				rows: data.directed.map((d) => ({
					label: d.name,
					sign: d.sign,
					degree: d.degree,
					natalLongitude: d.natalLongitude,
					interpretation: d.interpretation,
				})),
			};
		}
		if ('lots' in data) {
			return {
				title: 'Arabic lots',
				badges: data.sect
					? [{ label: 'Sect', value: capitalize(data.sect) }]
					: [],
				summary: data.summary,
				cols: { house: false, motion: false, formula: true, natal: false },
				rows: data.lots.map((l) => ({
					label: l.name,
					sign: l.sign,
					degree: l.degree,
					formula: l.formula,
					interpretation: l.interpretation,
				})),
			};
		}
		// Secondary progressions: planets plus the progressed angles.
		const angleRows: Row[] = [];
		if (data.ascendant) {
			angleRows.push({
				label: 'Ascendant',
				sign: data.ascendant.sign,
				degree: data.ascendant.degree,
				isAngle: true,
			});
		}
		if (data.midheaven) {
			angleRows.push({
				label: 'Midheaven',
				sign: data.midheaven.sign,
				degree: data.midheaven.degree,
				isAngle: true,
			});
		}
		return {
			title: 'Secondary progressions',
			badges: [
				{ label: 'Progressed to', value: data.targetDate },
				{
					label: 'Elapsed',
					value: `${formatNumber(data.elapsedYears, 1)} yrs`,
				},
			],
			summary: data.summary,
			cols: { house: true, motion: true, formula: false, natal: false },
			rows: [
				...angleRows,
				...data.planets.map((p) => ({
					label: p.name,
					sign: p.sign,
					degree: p.degree,
					house: p.house,
					speed: p.speed,
					isRetrograde: p.isRetrograde,
					interpretation: p.interpretation,
				})),
			],
		};
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-positions-table': RoxyPositionsTable;
	}
}
