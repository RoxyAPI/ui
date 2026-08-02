import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	GetBasicPanchangResponse,
	GetDetailedPanchangResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import {
	formatDate,
	formatTime,
	formatTimeRange,
	formatWithSanskrit,
} from '../utils/format.js';

type PanchangData = GetBasicPanchangResponse | GetDetailedPanchangResponse;
type Detailed = GetDetailedPanchangResponse;
type PanchangTime = Detailed['rahuKaal'];
type RashiPlacement = Detailed['moonSign'];
type SunNakshatra = Detailed['sunNakshatra'];
type Hora = Detailed['hora'];
type Panchaka = Detailed['panchaka'];
type Bhadra = Detailed['bhadra'];
type Chandrabalam = Detailed['chandrabalam'];
type Tarabalam = Detailed['tarabalam'];
type MoonSignTransition = Detailed['transitions']['moonSign'];

/** One limb of the panchang: the headline value plus the muted detail line under it. */
interface Limb {
	label: string;
	value: string;
	meta: string;
}

/** Joins the parts of a detail line, dropping anything the response omitted. */
function meta(...parts: Array<string | number | undefined | null>): string {
	return parts.filter(Boolean).join(' · ');
}

/** The headline value of a limb: its name plus the one qualifier that belongs on the same line. */
function name(...parts: Array<string | undefined>): string {
	return parts.filter(Boolean).join(', ');
}

/**
 * Panchang table for /vedic-astrology/panchang/{basic,detailed}.
 *
 * @remarks
 * The main grid lists the five limbs (tithi, nakshatra, yoga, karana, vara),
 * each with the reading that comes with it: the tithi ruling planet, deity,
 * element and how far it has elapsed; the nakshatra lord, deity and symbol; the
 * yoga and karana characteristics. Detailed mode adds the sunrise placements a
 * reader scans first (Moon rashi, Sun rashi, Sun nakshatra, current hora), the
 * exact transition times including the Moon sign change, and groups every timed
 * window into auspicious (fixed muhurtas plus each Amrit Kalam) and
 * inauspicious (Rahu Kaal, Yamaganda, Gulika, each Dur Muhurta and Varjyam,
 * plus Bhadra and Panchaka). Chandrabalam and Tarabalam close the card: which
 * birth rashis and birth nakshatras this day favors, the surface a muhurta is
 * actually chosen on.
 */
@customElement('roxy-panchang-table')
export class RoxyPanchangTable extends RoxyDataElement<PanchangData> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				overflow: hidden;
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
			.date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			tbody tr:nth-child(odd) {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 24%, transparent);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				text-align: left;
				vertical-align: top;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				width: 38%;
				text-transform: capitalize;
			}
			td {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}
			td small {
				display: block;
				margin-top: 2px;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: normal;
				line-height: 1.5;
			}
			.section {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.quiet {
				color: var(--roxy-muted, #71717a);
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: 4px;
			}
			.chip {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
			}
			.chip.good {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 14%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.chip.bad {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 14%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
		`,
	];

	@property({ type: String, reflect: true })
	detail: 'basic' | 'detailed' = 'detailed';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No panchang data</div>`;
	}

	protected renderData(d: PanchangData) {
		const detailed = 'sunrise' in d ? d : null;
		const basic = 'sunLongitude' in d ? d : null;

		const muhurtas: Array<[string, PanchangTime | null | undefined]> = detailed
			? [
					['Brahma Muhurta', detailed.brahmaMuhurta],
					['Abhijit Muhurta', detailed.abhijitMuhurta],
					['Vijaya Muhurta', detailed.vijayaMuhurta],
					['Godhuli Muhurta', detailed.godhuliMuhurta],
					['Nishita Muhurta', detailed.nishitaMuhurta],
					['Pratah Sandhya', detailed.pratahSandhya],
					['Sayahna Sandhya', detailed.sayahnaSandhya],
				]
			: [];

		const auspiciousWindows: Array<[string, PanchangTime]> = detailed
			? this.expandWindows('Amrit Kalam', detailed.amritKalam)
			: [];

		const inauspicious: Array<[string, PanchangTime | undefined]> = detailed
			? [
					['Rahu Kaal', detailed.rahuKaal],
					['Yamaganda', detailed.yamaganda],
					['Gulika', detailed.gulika],
				]
			: [];

		const inauspiciousWindows: Array<[string, PanchangTime]> = detailed
			? [
					...this.expandWindows('Dur Muhurta', detailed.durMuhurta),
					...this.expandWindows('Varjyam', detailed.varjyam),
				]
			: [];

		const showTimings = this.detail === 'detailed' && detailed !== null;

		return html`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${detailed ? formatDate(detailed.date) : ''}</span>
			</header>
			<table>
				<tbody>
					${this.limbs(d, detailed).map((l) => this.renderLimbRow(l))}
					${
						detailed
							? html`
								${this.renderRow('Sunrise', formatTime(detailed.sunrise))}
								${this.renderRow('Sunset', formatTime(detailed.sunset))}
								${this.renderRow('Moonrise', formatTime(detailed.moonrise))}
								${this.renderRow('Moonset', formatTime(detailed.moonset))}
								${this.renderRow('Moon sign', this.formatRashi(detailed.moonSign))}
								${this.renderRow('Sun sign', this.formatRashi(detailed.sunSign))}
								${this.renderRow('Sun nakshatra', this.formatSunNakshatra(detailed.sunNakshatra))}
								${this.renderRow('Hora', this.formatHora(detailed.hora))}
							`
							: basic
								? html`
									${this.renderRow('Sun', this.formatLongitude(basic.sunLongitude))}
									${this.renderRow('Moon', this.formatLongitude(basic.moonLongitude))}
								`
								: nothing
					}
				</tbody>
			</table>
			${detailed ? this.renderTransitions(detailed.transitions) : nothing}
			${
				showTimings
					? html`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${this.renderPeriodRows([
									...muhurtas.filter(
										(m): m is [string, PanchangTime] => !!m[1],
									),
									...auspiciousWindows,
								])}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${this.renderPeriodRows([
									...inauspicious.filter(
										(m): m is [string, PanchangTime] => !!m[1],
									),
									...inauspiciousWindows,
								])}
								${this.renderBhadraRow(detailed.bhadra)}
								${this.renderPanchakaRow(detailed.panchaka)}
							</tbody>
						</table>
						${this.renderBalams(detailed.chandrabalam, detailed.tarabalam)}
					`
					: nothing
			}
		</div>`;
	}

	/**
	 * The five limbs, each with its own reading. Basic and detailed carry the
	 * same limb shapes; only detailed carries the vara.
	 */
	private limbs(d: PanchangData, detailed: Detailed | null): Limb[] {
		const t = d.tithi;
		const n = d.nakshatra;
		const y = d.yoga;
		const k = d.karana;
		const rows: Limb[] = [
			{
				label: 'Tithi',
				value: name(t?.name, t?.paksha ? `${t.paksha} paksha` : undefined),
				meta: meta(
					t?.rulingPlanet ? `Ruled by ${t.rulingPlanet}` : undefined,
					t?.deity ? `Deity ${t.deity}` : undefined,
					t?.element,
					typeof t?.percent === 'number'
						? `${Math.round(t.percent)}% elapsed`
						: undefined,
				),
			},
			{
				label: 'Nakshatra',
				value: name(
					n?.name,
					typeof n?.pada === 'number' ? `pada ${n.pada}` : undefined,
				),
				meta: meta(
					n?.lord ? `Lord ${n.lord}` : undefined,
					n?.deity ? `Deity ${n.deity}` : undefined,
					n?.symbol ? `Symbol ${n.symbol}` : undefined,
					n?.characteristics,
				),
			},
			{
				label: 'Yoga',
				value: y?.name ?? '',
				meta: y?.characteristics ?? '',
			},
			{
				label: 'Karana',
				value: name(k?.name, k?.type),
				meta: k?.characteristics ?? '',
			},
		];
		if (detailed?.vara) {
			rows.push({
				label: 'Vara',
				value: formatWithSanskrit(
					detailed.vara.name,
					detailed.vara.sanskritName,
				),
				meta: detailed.vara.lord ? `Lord ${detailed.vara.lord}` : '',
			});
		}
		return rows.filter((l) => Boolean(l.value));
	}

	private renderLimbRow(l: Limb) {
		return html`<tr>
			<th>${l.label}</th>
			<td>${l.value}${l.meta ? html`<small>${l.meta}</small>` : nothing}</td>
		</tr>`;
	}

	/** One label/value row, skipped when the value is empty. */
	private renderRow(
		label: string,
		value: string,
	): TemplateResult | typeof nothing {
		if (!value) return nothing;
		return html`<tr>
			<th>${label}</th>
			<td>${value}</td>
		</tr>`;
	}

	private renderTransitions(t: Detailed['transitions'] | undefined) {
		if (!t) return nothing;
		return html`
			<div class="section">Next transitions</div>
			<table>
				<tbody>
					${this.renderTransitionRow('Tithi', t.tithi)}
					${this.renderTransitionRow('Nakshatra', t.nakshatra)}
					${this.renderTransitionRow('Yoga', t.yoga)}
					${this.renderTransitionRow('Karana', t.karana)}
					${this.renderMoonSignRow(t.moonSign)}
				</tbody>
			</table>
		`;
	}

	/** Renders one row per [label, period] pair, dropping any with no range. */
	private renderPeriodRows(rows: Array<[string, PanchangTime]>) {
		return rows.map(([k, v]) => {
			const range = formatTimeRange(v);
			return range
				? html`<tr>
						<th>${k}</th>
						<td>${range}</td>
					</tr>`
				: nothing;
		});
	}

	/** Expands an array of periods into labeled rows, numbering when more than one. */
	private expandWindows(
		label: string,
		windows: PanchangTime[] | undefined,
	): Array<[string, PanchangTime]> {
		if (!windows || windows.length === 0) return [];
		return windows.map((w, i) => [
			windows.length > 1 ? `${label} ${i + 1}` : label,
			w,
		]);
	}

	/**
	 * Bhadra (Vishti karana) is avoided for every auspicious act, so "none today"
	 * is as much of an answer as a window and is stated rather than left blank.
	 */
	private renderBhadraRow(b: Bhadra | undefined) {
		if (!b) return nothing;
		const span = this.formatSpan(b.startsAt, b.endsAt);
		return html`<tr>
			<th>Bhadra (Vishti)</th>
			<td>
				${b.active && span ? span : html`<span class="quiet">None today</span>`}
			</td>
		</tr>`;
	}

	/**
	 * Panchaka runs about five days, so the window commonly starts before or ends
	 * after this date; the dosha type names which of the five it is.
	 */
	private renderPanchakaRow(p: Panchaka | undefined) {
		if (!p) return nothing;
		const span = this.formatSpan(p.startsAt, p.endsAt);
		return html`<tr>
			<th>Panchaka</th>
			<td>
				${
					p.active
						? html`${p.type ? `${p.type} Panchaka` : 'Panchaka'}${
								span ? html`<small>${span}</small>` : nothing
							}`
						: html`<span class="quiet">None today</span>`
				}
			</td>
		</tr>`;
	}

	/**
	 * Chandrabalam and Tarabalam are read against the querent's own birth rashi
	 * and birth nakshatra, so both lists are shown in full rather than summarized.
	 */
	private renderBalams(c: Chandrabalam | undefined, t: Tarabalam | undefined) {
		if (!c && !t) return nothing;
		return html`
			<div class="section">Chandrabalam and Tarabalam</div>
			<table>
				<tbody>
					${
						c
							? html`<tr>
									<th>Favorable Moon signs</th>
									<td>${this.renderChips(c.favorableRashis, 'good')}</td>
								</tr>
								${this.renderRow('Ashtama Chandra rashi', c.ashtamaChandraRashi ?? '')}`
							: nothing
					}
					${
						t
							? html`<tr>
									<th>Favorable birth nakshatras</th>
									<td>${this.renderChips(t.favorableNakshatras, 'good')}</td>
								</tr>
								<tr>
									<th>Unfavorable birth nakshatras</th>
									<td>${this.renderChips(t.unfavorableNakshatras, 'bad')}</td>
								</tr>`
							: nothing
					}
				</tbody>
			</table>
		`;
	}

	private renderChips(items: string[] | undefined, tone: 'good' | 'bad') {
		if (!items?.length) return html`<span class="quiet">None</span>`;
		return html`<div class="chips">
			${items.map((i) => html`<span class="chip ${tone}">${i}</span>`)}
		</div>`;
	}

	private renderTransitionRow(
		label: string,
		t: { endsAt?: string; next?: string; nextPada?: number } | undefined,
	) {
		if (!t?.endsAt) return nothing;
		const next = t.next
			? ` to ${t.next}${typeof t.nextPada === 'number' ? ` pada ${t.nextPada}` : ''}`
			: '';
		return html`<tr>
			<th>${label}</th>
			<td>ends ${formatTime(t.endsAt)}${next}</td>
		</tr>`;
	}

	private renderMoonSignRow(m: MoonSignTransition | undefined) {
		if (!m?.changesAt) return nothing;
		return html`<tr>
			<th>Moon sign</th>
			<td>
				${m.current ?? ''} until ${formatTime(m.changesAt)}${m.next ? `, then ${m.next}` : ''}
			</td>
		</tr>`;
	}

	/** A window that may end on the following day carries that date so it cannot be misread. */
	private formatSpan(
		start: string | null | undefined,
		end: string | null | undefined,
	): string {
		const range = formatTimeRange({
			start: start ?? undefined,
			end: end ?? undefined,
		});
		if (!range || !start || !end) return range;
		return start.slice(0, 10) === end.slice(0, 10)
			? range
			: `${range} (ends ${formatDate(end)})`;
	}

	/** "English (Sanskrit)" label for the Moon or Sun rashi at sunrise. */
	private formatRashi(r: RashiPlacement | undefined): string {
		return formatWithSanskrit(r?.name, r?.sanskritName);
	}

	/** Sun nakshatra with pada and lord, the form a panchang reader expects. */
	private formatSunNakshatra(n: SunNakshatra | undefined): string {
		if (!n?.name) return '';
		return meta(
			n.name,
			typeof n.pada === 'number' ? `pada ${n.pada}` : undefined,
			n.lord ? `lord ${n.lord}` : undefined,
		);
	}

	/** Current planetary hora with its active window. */
	private formatHora(h: Hora | undefined): string {
		if (!h?.current) return '';
		const range = formatTimeRange(h);
		return range ? `${h.current} (${range})` : h.current;
	}

	/** Basic mode returns raw sidereal longitudes rather than named placements. */
	private formatLongitude(lon: number | undefined): string {
		return typeof lon === 'number' ? formatSignPosition(lon) : '';
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-panchang-table': RoxyPanchangTable;
	}
}
