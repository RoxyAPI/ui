import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type { GetHoraResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatTimeRange } from '../utils/format.js';
import { capitalize } from '../utils/string.js';

type HoraPeriod = NonNullable<GetHoraResponse['dayHoras']>[number];

/**
 * Vedic Hora (planetary hours) table. Renders /vedic-astrology/panchang/hora: the 12 daytime and 12 nighttime horas, each ruled by one of the seven classical planets in the Chaldean order, used for electional timing (start a venture in the hora of the planet that favours it). Day horas run sunrise to sunset, night horas sunset to next sunrise; each tile shows the ruling planet and its wall-clock window.
 */
@customElement('roxy-hora-table')
export class RoxyHoraTable extends RoxyDataElement<GetHoraResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so the widest unbreakable tile below blows
				 * the column out and drags the card past its own host, clipped on the right. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			.cols {
				display: grid;
				/* A bare 1fr is minmax(auto, 1fr), so each column still floors at min-content
				 * and the day/night pair cannot shrink to fit a narrow card. */
				grid-template-columns: repeat(2, minmax(0, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.section-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
			}
			.row {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				padding: var(--roxy-space-xs, 0.25rem) 0;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.row:last-child {
				border-bottom: none;
			}
			.glyph {
				font-size: 1.15em;
				line-height: 1;
				color: var(--roxy-accent-ink, #b45309);
				width: 1.25em;
				text-align: center;
			}
			.planet {
				flex: 1;
				font-weight: 500;
			}
			.time {
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
				white-space: nowrap;
			}
			.num {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				width: 1.5em;
				text-align: right;
			}
			@container (max-width: 30rem) {
				.cols {
					grid-template-columns: 1fr;
				}
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No hora data</div>`;
	}

	protected renderData(d: GetHoraResponse) {
		const day = d.dayHoras ?? [];
		const night = d.nightHoras ?? [];
		if (day.length === 0 && night.length === 0) return this.renderEmpty();

		return html`<div class="wrap" aria-label="Hora periods">
			<div class="head">
				<h2 class="title">Hora</h2>
				${d.date ? html`<p class="subtitle">${formatDate(d.date)}</p>` : nothing}
			</div>
			<div class="cols">
				${this.renderColumn('Day', day)}
				${this.renderColumn('Night', night)}
			</div>
		</div>`;
	}

	private renderColumn(label: string, horas: HoraPeriod[]) {
		if (horas.length === 0) return nothing;
		return html`<div class="col">
			<p class="section-label">${label}</p>
			${horas.map(
				(h) => html`<div class="row">
					<span class="glyph" aria-hidden="true">${PLANET_GLYPH[capitalize(h.planet ?? '')] ?? '·'}</span>
					<span class="planet">${h.planet}</span>
					<span class="time">${formatTimeRange(h)}</span>
					${typeof h.number === 'number' ? html`<span class="num">${h.number}</span>` : nothing}
				</div>`,
			)}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hora-table': RoxyHoraTable;
	}
}
