import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { NatalChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatSignPosition } from '../utils/degree.js';
import { formatNumber } from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';
import { capitalize } from '../utils/string.js';

/** A body or point row, normalized so planets and the four angles share a table. */
interface BodyRow {
	name: string;
	sign?: string;
	longitude?: number;
	house?: number;
	speed?: number;
	isRetrograde?: boolean;
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
export class RoxyWesternPlanetsTable extends LitElement {
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
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
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

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: NatalChartResponse | null = null;

	/** Build the ordered row list: the planets array, then the four chart points. */
	private rows(): BodyRow[] {
		const d = this.data;
		if (!d) return [];
		const rows: BodyRow[] = (d.planets ?? []).map((p) => ({
			name: p.name,
			sign: p.sign,
			longitude: p.longitude,
			house: p.house,
			speed: p.speed,
			isRetrograde: p.isRetrograde,
		}));
		for (const [name, point] of [
			['Ascendant', d.ascendant],
			['Midheaven', d.midheaven],
			['Part of Fortune', d.partOfFortune],
			['Vertex', d.vertex],
		] as const) {
			if (point) {
				rows.push({
					name,
					sign: point.sign,
					longitude: point.longitude,
					isPoint: true,
				});
			}
		}
		return rows;
	}

	render() {
		if (!this.data?.planets)
			return html`<div class="roxy-empty" role="status">No chart data</div>`;
		const rows = this.rows();

		return html`<div class="wrap" aria-label="Western planetary positions" tabindex="0">
			<header class="head">
				<h2 class="title">Planetary positions</h2>
			</header>
			<table role="table">
				<thead>
					<tr>
						<th scope="col">Body</th>
						<th scope="col">Sign</th>
						<th scope="col">Degree</th>
						<th scope="col">House</th>
						<th scope="col">Motion</th>
					</tr>
				</thead>
				<tbody>
					${rows.map((r) => {
						const glyph = PLANET_GLYPH[capitalize(r.name)] ?? '';
						const signGlyph = SIGN_GLYPH[capitalize(r.sign ?? '')] ?? '';
						const speed =
							typeof r.speed === 'number' ? formatNumber(r.speed, 3) : '';
						return html`<tr class=${r.isPoint ? 'point' : ''}>
							<td class="body">
								${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${r.name}
							</td>
							<td>
								${signGlyph ? html`<span class="glyph">${signGlyph}</span>` : nothing}${r.sign ?? ''}
							</td>
							<td class="num">
								${typeof r.longitude === 'number' ? formatSignPosition(r.longitude) : ''}
							</td>
							<td class="num">${typeof r.house === 'number' ? r.house : ''}</td>
							<td class="num">
								${speed ? html`${speed}°/day` : nothing}
								${r.isRetrograde ? html`<span class="retro"> ℞</span>` : nothing}
							</td>
						</tr>`;
					})}
				</tbody>
			</table>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-western-planets-table': RoxyWesternPlanetsTable;
	}
}
