import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type { GetChoghadiyaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatTimeRange } from '../utils/format.js';
import { capitalize } from '../utils/string.js';

type ChoghadiyaPeriod = GetChoghadiyaResponse['dayChoghadiya'][number];

/**
 * Choghadiya muhurta grid. Accepts a GetChoghadiyaResponse and renders
 * 8 daytime and 8 nighttime muhurta tiles in a two-column responsive layout.
 * Good periods are highlighted in green, Bad periods in red.
 */
@customElement('roxy-choghadiya-grid')
export class RoxyChoghadiyaGrid extends RoxyDataElement<GetChoghadiyaResponse> {
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
				gap: var(--roxy-space-md, 1rem);
			}
			.header {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.subtitle {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
			}
			.cho-grid {
				display: grid;
				grid-template-columns: 1fr;
				gap: var(--roxy-space-md, 1rem);
			}
			@media (min-width: 720px) {
				.cho-grid {
					grid-template-columns: 1fr 1fr;
				}
			}
			.period-col {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.period-heading {
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile {
				display: grid;
				/* minmax(0, 1fr), never a bare 1fr: a 1fr track keeps an automatic
				 * min-content floor, so a long muhurta name widened the tile past the
				 * card instead of wrapping, and pushed the time column out with it. */
				grid-template-columns: minmax(0, 1fr) auto;
				align-items: center;
				gap: 0.25em 0.75em;
				padding: 0.55em 0.85em;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
			}
			.cho-tile.good {
				background: color-mix(in srgb, var(--roxy-success, #22c55e) 18%, transparent);
				border-color: color-mix(in srgb, var(--roxy-success, #22c55e) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile.bad {
				background: color-mix(in srgb, var(--roxy-danger, #ef4444) 18%, transparent);
				border-color: color-mix(in srgb, var(--roxy-danger, #ef4444) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile.neutral {
				background: transparent;
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile.now {
				outline: 2px solid var(--roxy-accent, #f59e0b);
				outline-offset: 1px;
				box-shadow: 0 0 0 4px
					color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
			}
			.now-badge {
				display: inline-block;
				margin-left: 0.4em;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.tile-name {
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				grid-column: 1;
				min-width: 0;
				overflow-wrap: anywhere;
			}
			.tile-time {
				font-size: var(--roxy-text-xs, 0.75rem);
				opacity: 0.8;
				white-space: nowrap;
				grid-column: 2;
				grid-row: 1 / 3;
				text-align: right;
				align-self: center;
			}
			.tile-lord {
				font-size: var(--roxy-text-sm, 0.875rem);
				opacity: 0.85;
				grid-column: 1;
				display: flex;
				align-items: center;
				gap: 0.25em;
			}
		`,
	];

	/**
	 * True when the current wall-clock time falls inside this period. Both
	 * `start` and `end` are ISO 8601 with timezone, so the comparison is
	 * timezone-aware via the host's `Date` parsing.
	 */
	private isCurrent(period: ChoghadiyaPeriod): boolean {
		const now = Date.now();
		const start = Date.parse(period.start);
		const end = Date.parse(period.end);
		if (Number.isNaN(start) || Number.isNaN(end)) return false;
		return now >= start && now < end;
	}

	private renderTile(period: ChoghadiyaPeriod) {
		const effectClass =
			period.effect === 'Good'
				? 'good'
				: period.effect === 'Bad'
					? 'bad'
					: 'neutral';
		const current = this.isCurrent(period);
		const lordGlyph = PLANET_GLYPH[capitalize(period.lord)] ?? '';
		const timeRange = formatTimeRange(period);
		return html`<div
			class="cho-tile ${effectClass}${current ? ' now' : ''}"
			role="listitem"
			aria-current=${current ? 'time' : 'false'}
		>
			<span class="tile-name">
				${period.name}${current ? html`<span class="now-badge">Now</span>` : nothing}
			</span>
			<span class="tile-time" aria-label="Time range">${timeRange}</span>
			<span class="tile-lord">
				${lordGlyph ? html`<span aria-hidden="true">${lordGlyph}</span>` : nothing}
				${period.lord}
			</span>
		</div>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No choghadiya data</div>`;
	}

	protected renderData(d: GetChoghadiyaResponse) {
		const { date, dayChoghadiya, nightChoghadiya } = d;

		return html`<div class="wrap">
			<div class="header">
				<h2 class="title">Choghadiya</h2>
				${date ? html`<p class="subtitle">${formatDate(date)}</p>` : nothing}
			</div>

			<div class="cho-grid">
				<section class="period-col" aria-label="Day muhurta periods">
					<h3 class="period-heading">Day</h3>
					<div role="list" aria-label="Daytime choghadiya">
						${
							dayChoghadiya && dayChoghadiya.length > 0
								? dayChoghadiya.map((p) => this.renderTile(p))
								: html`<p class="roxy-empty" role="status">No daytime periods</p>`
						}
					</div>
				</section>

				<section class="period-col" aria-label="Night muhurta periods">
					<h3 class="period-heading">Night</h3>
					<div role="list" aria-label="Nighttime choghadiya">
						${
							nightChoghadiya && nightChoghadiya.length > 0
								? nightChoghadiya.map((p) => this.renderTile(p))
								: html`<p class="roxy-empty" role="status">No nighttime periods</p>`
						}
					</div>
				</section>
			</div>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-choghadiya-grid': RoxyChoghadiyaGrid;
	}
}
