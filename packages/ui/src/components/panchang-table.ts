import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	GetBasicPanchangResponse,
	GetDetailedPanchangResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatTime, formatTimeRange } from '../utils/format.js';

type PanchangData = GetBasicPanchangResponse | GetDetailedPanchangResponse;
type PanchangTime = GetDetailedPanchangResponse['rahuKaal'];

/**
 * Panchang table for /vedic-astrology/panchang/{basic,detailed}.
 *
 * @remarks
 * The main grid lists the five limbs (tithi, nakshatra, yoga, karana, vara),
 * sun and moon timings, and, in detailed mode, the sunrise placements a reader
 * scans first: Moon rashi, Sun rashi, Sun nakshatra, and the current hora. The
 * detailed mode then groups every timed window into two sections, auspicious
 * (the fixed muhurtas plus each Amrit Kalam) and inauspicious (Rahu Kaal,
 * Yamaganda, Gulika, plus each Dur Muhurta and Varjyam), so a consumer can act
 * on timing without parsing the raw response.
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
			.section {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
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

		const fivefold: Array<[string, string]> = [
			['Tithi', this.formatPart(d.tithi)],
			['Nakshatra', this.formatPart(d.nakshatra)],
			['Yoga', this.formatPart(d.yoga)],
			['Karana', this.formatPart(d.karana)],
		];
		if (detailed) fivefold.push(['Vara', this.formatPart(detailed.vara)]);

		const placements: Array<[string, string]> = detailed
			? [
					['Moon sign', this.formatRashi(detailed.moonSign)],
					['Sun sign', this.formatRashi(detailed.sunSign)],
					['Sun nakshatra', this.formatSunNakshatra(detailed.sunNakshatra)],
					['Hora', this.formatHora(detailed.hora)],
				].filter((row): row is [string, string] => Boolean(row[1]))
			: [];

		const muhurtas: Array<[string, PanchangTime | undefined]> = detailed
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

		const transitions =
			detailed && 'transitions' in detailed ? detailed.transitions : undefined;

		return html`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${detailed ? formatDate(detailed.date) : ''}</span>
			</header>
			<table>
				<tbody>
					${fivefold.map(
						([k, v]) => html`<tr>
							<th>${k}</th>
							<td>${v}</td>
						</tr>`,
					)}
					${
						detailed?.sunrise
							? html`<tr>
								<th>Sunrise</th>
								<td>${formatTime(detailed.sunrise)}</td>
							</tr>`
							: nothing
					}
					${
						detailed?.sunset
							? html`<tr>
								<th>Sunset</th>
								<td>${formatTime(detailed.sunset)}</td>
							</tr>`
							: nothing
					}
					${
						detailed?.moonrise
							? html`<tr>
								<th>Moonrise</th>
								<td>${formatTime(detailed.moonrise)}</td>
							</tr>`
							: nothing
					}
					${
						detailed?.moonset
							? html`<tr>
								<th>Moonset</th>
								<td>${formatTime(detailed.moonset)}</td>
							</tr>`
							: nothing
					}
					${placements.map(
						([k, v]) => html`<tr>
							<th>${k}</th>
							<td>${v}</td>
						</tr>`,
					)}
				</tbody>
			</table>
			${
				transitions
					? html`
						<div class="section">Next transitions</div>
						<table>
							<tbody>
								${this.renderTransitionRow('Tithi', transitions.tithi)}
								${this.renderTransitionRow('Nakshatra', transitions.nakshatra)}
								${this.renderTransitionRow('Yoga', transitions.yoga)}
								${this.renderTransitionRow('Karana', transitions.karana)}
							</tbody>
						</table>
					`
					: nothing
			}
			${
				this.detail === 'detailed' &&
				(
					muhurtas.some((m) => !!m[1]) ||
						auspiciousWindows.length > 0 ||
						inauspicious.some((m) => !!m[1]) ||
						inauspiciousWindows.length > 0
				)
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
							</tbody>
						</table>
					`
					: nothing
			}
		</div>`;
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

	private renderTransitionRow(
		label: string,
		t: { endsAt?: string; next?: string } | undefined,
	) {
		if (!t?.endsAt) return nothing;
		const when = formatTime(t.endsAt);
		const next = t.next ? ` → ${t.next}` : '';
		return html`<tr>
			<th>${label}</th>
			<td>ends ${when}${next}</td>
		</tr>`;
	}

	private formatPart(v: unknown): string {
		if (!v) return '';
		if (typeof v === 'string') return v;
		if (typeof v === 'object') {
			const obj = v as {
				name?: string;
				lord?: string;
				phase?: string;
				paksha?: string;
				end?: string;
			};
			const parts = [
				obj.name,
				obj.paksha ? `(${obj.paksha} paksha)` : '',
				obj.lord ? `· ${obj.lord}` : '',
				obj.phase,
			].filter(Boolean);
			return parts.join(' ');
		}
		return String(v);
	}

	/** "English (Sanskrit)" label for the Moon or Sun rashi at sunrise. */
	private formatRashi(r: RashiPlacement | undefined): string {
		if (!r?.name) return '';
		return r.sanskritName && r.sanskritName !== r.name
			? `${r.name} (${r.sanskritName})`
			: r.name;
	}

	/** Sun nakshatra with pada and lord, the form a panchang reader expects. */
	private formatSunNakshatra(n: SunNakshatra | undefined): string {
		if (!n?.name) return '';
		const parts = [
			n.name,
			typeof n.pada === 'number' ? `pada ${n.pada}` : '',
			n.lord ? `· ${n.lord}` : '',
		].filter(Boolean);
		return parts.join(' ');
	}

	/** Current planetary hora with its active window. */
	private formatHora(h: Hora | undefined): string {
		if (!h?.current) return '';
		const range = formatTimeRange(h);
		return range ? `${h.current} (${range})` : h.current;
	}
}

type PanchangPlacements = GetDetailedPanchangResponse;
type RashiPlacement = PanchangPlacements['moonSign'];
type SunNakshatra = PanchangPlacements['sunNakshatra'];
type Hora = PanchangPlacements['hora'];

declare global {
	interface HTMLElementTagNameMap {
		'roxy-panchang-table': RoxyPanchangTable;
	}
}
