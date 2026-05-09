import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

interface PanchangTime {
	start?: string;
	end?: string;
}

interface PanchangData {
	date?: string;
	location?: { name?: string; latitude?: number; longitude?: number };
	vara?: string;
	sunrise?: string;
	sunset?: string;
	moonrise?: string;
	moonset?: string;
	sunSign?: string;
	moonSign?: string;
	sunNakshatra?: string;
	tithi?: string | { name?: string; phase?: string; end?: string };
	nakshatra?: string | { name?: string; lord?: string; end?: string };
	yoga?: string | { name?: string; end?: string };
	karana?: string | { name?: string; end?: string };
	hora?: string;
	rahuKaal?: PanchangTime;
	yamaganda?: PanchangTime;
	gulika?: PanchangTime;
	abhijitMuhurta?: PanchangTime;
	brahmaMuhurta?: PanchangTime;
	vijayaMuhurta?: PanchangTime;
	nishitaMuhurta?: PanchangTime;
	godhuliMuhurta?: PanchangTime;
	pratahSandhya?: PanchangTime;
	sayahnaSandhya?: PanchangTime;
	durMuhurta?: PanchangTime[];
	varjyam?: PanchangTime[];
	amritKalam?: PanchangTime[];
	chandrabalam?: string | string[];
	tarabalam?: string;
	panchaka?: string;
	bhadra?: string;
	sunLongitude?: number;
	moonLongitude?: number;
}

/**
 * Panchang table for /vedic-astrology/panchang/{basic,detailed}. Detailed mode
 * renders 15+ muhurtas. Basic mode renders the five elements only.
 */
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

		const fivefold = [
			['Tithi', this.formatPart(d.tithi)],
			['Nakshatra', this.formatPart(d.nakshatra)],
			['Yoga', this.formatPart(d.yoga)],
			['Karana', this.formatPart(d.karana)],
			['Vara', d.vara ?? ''],
		];

		const muhurtas: Array<[string, PanchangTime | undefined]> = [
			['Brahma Muhurta', d.brahmaMuhurta],
			['Abhijit Muhurta', d.abhijitMuhurta],
			['Vijaya Muhurta', d.vijayaMuhurta],
			['Godhuli Muhurta', d.godhuliMuhurta],
			['Nishita Muhurta', d.nishitaMuhurta],
			['Pratah Sandhya', d.pratahSandhya],
			['Sayahna Sandhya', d.sayahnaSandhya],
		];

		const inauspicious: Array<[string, PanchangTime | undefined]> = [
			['Rahu Kaal', d.rahuKaal],
			['Yamaganda', d.yamaganda],
			['Gulika', d.gulika],
		];

		return html`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${d.date ?? ''}</span>
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
						d.sunrise
							? html`<tr>
								<th>Sunrise</th>
								<td>${d.sunrise}</td>
							</tr>`
							: nothing
					}
					${
						d.sunset
							? html`<tr>
								<th>Sunset</th>
								<td>${d.sunset}</td>
							</tr>`
							: nothing
					}
					${
						d.moonrise
							? html`<tr>
								<th>Moonrise</th>
								<td>${d.moonrise}</td>
							</tr>`
							: nothing
					}
					${
						d.moonset
							? html`<tr>
								<th>Moonset</th>
								<td>${d.moonset}</td>
							</tr>`
							: nothing
					}
				</tbody>
			</table>
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
											<td>${formatRange(v)}</td>
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
											<td>${formatRange(v)}</td>
										</tr>`,
									)}
							</tbody>
						</table>
					`
					: nothing
			}
		</div>`;
	}

	private formatPart(v: unknown): string {
		if (!v) return '';
		if (typeof v === 'string') return v;
		if (typeof v === 'object') {
			const obj = v as {
				name?: string;
				lord?: string;
				phase?: string;
				end?: string;
			};
			const parts = [
				obj.name,
				obj.lord ? `(${obj.lord})` : '',
				obj.phase,
			].filter(Boolean);
			return parts.join(' ');
		}
		return String(v);
	}
}

function formatRange(t: PanchangTime | undefined): string {
	if (!t) return '';
	if (t.start && t.end) return `${t.start} - ${t.end}`;
	return t.start ?? t.end ?? '';
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-panchang-table': RoxyPanchangTable;
	}
}
