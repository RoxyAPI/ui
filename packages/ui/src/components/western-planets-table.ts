import { css, html, nothing } from 'lit';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { planetGlyph, signGlyph } from '../tokens/index.js';
import type { NatalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { customElement } from '../utils/define.js';
import { formatSignPosition } from '../utils/degree.js';
import { factListStyles } from '../utils/fact-list.js';
import { formatDateTime, formatNumber } from '../utils/format.js';
import { display, displayField } from '../utils/localized.js';
import { capitalize } from '../utils/string.js';

type WesternPositions = Pick<NatalChartResponse, 'planets'> &
	Partial<
		Pick<
			NatalChartResponse,
			| 'birthDetails'
			| 'houses'
			| 'ascendant'
			| 'midheaven'
			| 'partOfFortune'
			| 'vertex'
		>
	>;

/** A body or point row, normalized so planets and the four angles share a table. */
interface BodyRow {
	/** Canonical English name. Keyed on by the glyph table, so it never localizes. */
	name: string;
	/** The name a reader sees. Same as {@link BodyRow.name} until the response carries a translation. */
	label: string;
	sign?: string;
	/** The sign a reader sees, for the same reason. */
	signLabel?: string;
	longitude?: number;
	latitude?: number;
	sect?: NatalChartResponse['partOfFortune']['sect'];
	house?: number;
	speed?: number;
	isRetrograde?: boolean;
	/** Essential dignity by sign. Absent for the nodes, Chiron and Lilith, which rule no sign, and an absent value is a different answer from `peregrine`, so the cell stays blank rather than reading as the neutral state. */
	dignity?: string;
	/** True for the chart angles (ASC, MC, Part of Fortune, Vertex). */
	isPoint?: boolean;
}

/**
 * Western planetary positions table. Renders a /astrology/natal-chart response
 * as the reference-grade positions grid astrologers read alongside the wheel:
 * every body with its sign, exact degree, house, and daily motion, followed by
 * the four chart points (Ascendant, Midheaven, Part of Fortune, Vertex).
 */
@customElement('roxy-western-planets-table')
export class RoxyWesternPlanetsTable extends RoxyDataElement<WesternPositions> {
	static styles = [
		baseStyles,
		factListStyles,
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
			}
			.title {
				overflow-wrap: anywhere;
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.birth-date { margin: var(--roxy-space-sm, .5rem) 0 0; font-size: var(--roxy-text-sm, .875rem); color: var(--roxy-secondary, #475569); }
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				min-width: 460px;
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
			tbody tr.point {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
			}
			td.body {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.glyph {
				margin-right: 0.4em;
				color: var(--roxy-muted, #71717a);
			}
			.retro {
				color: var(--roxy-danger, #dc2626);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.num {
				font-variant-numeric: tabular-nums;
			}
		`,
	];

	/** Build the ordered row list: the planets array, then the four chart points. */
	private rows(): BodyRow[] {
		const d = this.data;
		if (!d) return [];
		const rows: BodyRow[] = (d.planets ?? []).map((p) => ({
			name: p.name,
			label: display(p, 'name'),
			sign: p.sign,
			signLabel: display(p, 'sign'),
			longitude: p.longitude,
			latitude: p.latitude,
			house: p.house,
			speed: p.speed,
			isRetrograde: p.isRetrograde,
			dignity: p.dignity,
		}));
		// The four chart points are copy this component writes rather than values the
		// response names, so each is typed to its catalogue source and the compiler
		// rejects one no catalogue carries.
		const points: ReadonlyArray<
			readonly [
				ChromeString,
				(
					| NatalChartResponse[
							| 'ascendant'
							| 'midheaven'
							| 'partOfFortune'
							| 'vertex']
					| undefined
				),
			]
		> = [
			['Ascendant', d.ascendant],
			['Midheaven', d.midheaven],
			['Part of Fortune', d.partOfFortune],
			['Vertex', d.vertex],
		];
		for (const [name, point] of points) {
			if (point) {
				rows.push({
					name,
					label: this.t(name),
					sign: point.sign,
					signLabel: display(point, 'sign'),
					longitude: point.longitude,
					house: 'house' in point ? point.house : undefined,
					sect: 'sect' in point ? point.sect : undefined,
					isPoint: true,
				});
			}
		}
		return rows;
	}

	protected renderData(d: WesternPositions) {
		if (!d.planets) return this.renderEmpty();
		const rows = this.rows();
		const birthDetails = d.birthDetails;
		const latitude = rows.some((r) => Number.isFinite(r.latitude));
		const sect = rows.some((r) => r.sect);
		const coordinateKeys = ['latitude', 'longitude', 'timezone'] as const;

		return html`<div class="wrap" part="card" aria-label=${this.t('Western planetary positions')} tabindex="0">
			<header class="head" part="header">
				<h2 class="title">${this.t('Planetary positions')}</h2>
				${
					birthDetails
						? html`<div part="details">
					<p class="birth-date">${formatDateTime(this.effectiveLang(), birthDetails.date, birthDetails.time, true)}</p>
					<dl class="roxy-facts">${coordinateKeys.map((key) => html`<div><dt>${displayField(this.effectiveLang(), key)}</dt><dd>${formatNumber(this.effectiveLang(), birthDetails[key], 5)}</dd></div>`)}</dl>
				</div>`
						: nothing
				}
			</header>
			<table role="table" part="table">
				<caption class="roxy-sr-only">
					${this.t('Western planetary positions: each body with its sign, degree, house, essential dignity and motion. The dignity cell is blank for the lunar nodes, Chiron and Lilith, which rule no sign and therefore hold no dignity at all.')}
				</caption>
				<thead>
					<tr>
						<th scope="col">${this.t('Body')}</th>
						<th scope="col">${this.t('Sign')}</th>
						<th scope="col">${this.t('Degree')}</th>
						<th scope="col">${this.t('Longitude')}</th>
						${latitude ? html`<th scope="col">${displayField(this.effectiveLang(), 'latitude')}</th>` : nothing}
						<th scope="col">${this.t('House')}</th>
						<th scope="col">${this.t('Dignity')}</th>
						<th scope="col">${this.t('Motion')}</th>
						${sect ? html`<th scope="col">${this.t('Sect')}</th>` : nothing}
					</tr>
				</thead>
				<tbody>
					${rows.map((r) => {
						const glyph = planetGlyph(r.name) ?? '';
						const sectLabel =
							r.sect === 'day'
								? this.t('Daytime')
								: r.sect === 'night'
									? this.t('Night')
									: '';
						const sGlyph = signGlyph(r.sign) ?? '';
						const speed =
							typeof r.speed === 'number'
								? formatNumber(this.effectiveLang(), r.speed, 6)
								: '';
						return html`<tr class=${r.isPoint ? 'point' : ''}>
							<td class="body">
								${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${r.label}
							</td>
							<td>
								${sGlyph ? html`<span class="glyph">${sGlyph}</span>` : nothing}${r.signLabel ?? ''}
							</td>
							<td class="num">
								${typeof r.longitude === 'number' ? formatSignPosition(r.longitude, r.signLabel) : ''}
							</td>
							<td class="num">${typeof r.longitude === 'number' ? `${formatNumber(this.effectiveLang(), r.longitude, 5)}°` : nothing}</td>
							${latitude ? html`<td class="num">${typeof r.latitude === 'number' ? `${formatNumber(this.effectiveLang(), r.latitude, 5)}°` : nothing}</td>` : nothing}
							<td class="num">${typeof r.house === 'number' ? r.house : ''}</td>
							<td class="dignity">${r.dignity ? capitalize(r.dignity) : ''}</td>
							<td class="num">
								${speed ? html`${speed}${this.t('°/day')}` : nothing}
								${r.isRetrograde ? html`<span class="retro"> ℞</span>` : nothing}
							</td>
							${sect ? html`<td>${sectLabel}</td>` : nothing}
						</tr>`;
					})}
				</tbody>
			</table>
			${
				d.houses?.length
					? html`<details class="head" part="section houses">
				<summary>${this.t('Houses')}</summary>
				<table part="table">
					<thead><tr><th scope="col">${this.t('House')}</th><th scope="col">${this.t('Sign')}</th><th scope="col">${this.t('Degree')}</th><th scope="col">${this.t('Longitude')}</th></tr></thead>
					<tbody>${d.houses.map((house) => html`<tr><th scope="row">${formatNumber(this.effectiveLang(), house.number, 0)}</th><td>${display(house, 'sign')}</td><td>${formatSignPosition(house.longitude, display(house, 'sign'))}</td><td>${formatNumber(this.effectiveLang(), house.longitude, 5)}°</td></tr>`)}</tbody>
				</table>
			</details>`
					: nothing
			}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-western-planets-table': RoxyWesternPlanetsTable;
	}
}
