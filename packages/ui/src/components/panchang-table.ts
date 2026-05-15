import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	GetBasicPanchangResponse,
	GetDetailedPanchangResponse,
} from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatTime, formatTimeRange } from '../utils/format.js';

type PanchangData = GetBasicPanchangResponse | GetDetailedPanchangResponse;
type PanchangTime = GetDetailedPanchangResponse['rahuKaal'];

/** Panchang table for /vedic-astrology/panchang/{basic,detailed}. */
@customElement('roxy-panchang-table')
export class RoxyPanchangTable extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
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

	@property({ attribute: false })
	data: PanchangData | null = null;

	@property({ type: String, reflect: true })
	detail: 'basic' | 'detailed' = 'detailed';

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No panchang data</div>`;
		const detailed = 'sunrise' in d ? d : null;

		const fivefold: Array<[string, string]> = [
			['Tithi', this.formatPart(d.tithi)],
			['Nakshatra', this.formatPart(d.nakshatra)],
			['Yoga', this.formatPart(d.yoga)],
			['Karana', this.formatPart(d.karana)],
		];
		if (detailed) fivefold.push(['Vara', this.formatPart(detailed.vara)]);

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

		const inauspicious: Array<[string, PanchangTime | undefined]> = detailed
			? [
					['Rahu Kaal', detailed.rahuKaal],
					['Yamaganda', detailed.yamaganda],
					['Gulika', detailed.gulika],
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
				(muhurtas.some((m) => !!m[1]) || inauspicious.some((m) => !!m[1]))
					? html`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${muhurtas
									.filter(([, v]) => !!v)
									.map(
										([k, v]) => html`<tr>
											<th>${k}</th>
											<td>${formatTimeRange(v)}</td>
										</tr>`,
									)}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${inauspicious
									.filter(([, v]) => !!v)
									.map(
										([k, v]) => html`<tr>
											<th>${k}</th>
											<td>${formatTimeRange(v)}</td>
										</tr>`,
									)}
							</tbody>
						</table>
					`
					: nothing
			}
		</div>`;
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
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-panchang-table': RoxyPanchangTable;
	}
}
