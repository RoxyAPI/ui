import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import type {
	GenerateFlyingStarChartResponse,
	GetAnnualFlyingStarsResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatInteger } from '../utils/format.js';
import { display, displayOption } from '../utils/localized.js';
import { GRID_ORDER } from '../utils/nine-palaces.js';
import { plateHeadingStyles } from '../utils/plate-heading.js';

type FlyingStarData =
	| GenerateFlyingStarChartResponse
	| GetAnnualFlyingStarsResponse;

/**
 * Which way a plate flew, always English on the wire. `reverse` reuses the `Backward` catalogue
 * entry `roxy-luck-pillars` already carries for its own forward/backward sequence, since both name
 * the same idea: the opposite of the forward direction.
 */
const FLIGHT_LABEL: Record<string, ChromeString> = {
	forward: 'Forward',
	reverse: 'Backward',
};

/** True for the natal plate, which carries a mountain and a water star per palace. */
function isNatal(d: FlyingStarData): d is GenerateFlyingStarChartResponse {
	return 'mountainCenterStar' in d;
}

/**
 * Flying Star (Xuan Kong) plate. Pass `data` from POST /feng-shui/flying-stars/natal, or set
 * `mode="annual"` and pass GET /feng-shui/flying-stars/annual/{year}.
 *
 * @remarks
 * Nine palaces on the Chinese compass, south at the top, each cell carrying the numbers that
 * palace holds: the mountain star upper left, the water star upper right and the period star large
 * in the middle. **Three numbers, never four.** Published plates draw exactly these three, and the
 * Lo Shu number underneath them is the fixed position of the palace rather than a star that flew
 * there, so it decides where a cell is DRAWN and is not printed as a number of its own. It also has
 * no name of its own in any language a reader might want this card in. An annual plate carries one
 * star per palace, so the cell holds that number alone.
 *
 * **The card heading and every fact label are now catalogued; the mountain and star names the
 * response gives no display form for stay English.** `structure.name` is translated in place by the
 * API under `lang` (switch on `structure.id`, the stable machine value), so it needs no lookup here.
 * The facing and sitting mountains are read through the same published `facing` option a Vastu
 * facing field already publishes (`displayOption(lang, 'facing', ...)`), because the 24 compass
 * labels (`S2`, `NE1`, ...) are one enum shared across both domains.
 *
 * **The facing and the sitting are the chart.** Two plates built for the same period differ
 * entirely on which mountain a building faces, so the header names the facing mountain, the sitting
 * mountain, the measured degrees and whether the reading straddles a boundary, and the structure
 * the pair produces. A plate printed without them cannot be checked against another consultant.
 *
 * `hide-readings` keeps every number, the flight directions and the structure name, and drops the
 * written meaning of the structure and the per-palace readings.
 */
@customElement('roxy-flying-star-chart')
export class RoxyFlyingStarChart extends RoxyDataElement<FlyingStarData> {
	static styles = [
		baseStyles,
		plateHeadingStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				align-items: baseline;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.period {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-variant-numeric: tabular-nums;
			}

			.facts {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.facts .lbl {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin-right: 0.35rem;
			}
			.facts b {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}

			/* No width cap: the plate is the figure this card is read off, so it fills
			 * the host and the consumer sizes the host. The plate part is the name the
			 * layout gate measures against the card content box. */
			.plate {
				display: grid;
				grid-template-columns: repeat(3, minmax(0, 1fr));
				gap: 2px;
				background: var(--roxy-border, #e4e4e7);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				overflow: hidden;
			}
			.palace {
				background: var(--roxy-surface, #fff);
				padding: var(--roxy-space-sm, 0.5rem);
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 0.1rem;
				align-content: start;
				min-height: 5.5rem;
			}
			.palace-center {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, var(--roxy-surface, #fff));
			}
			.mountain,
			.water {
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.mountain {
				text-align: start;
				color: var(--roxy-info, #2563eb);
			}
			.water {
				text-align: end;
				color: var(--roxy-accent-ink, #b45309);
			}
			.star {
				grid-column: 1 / -1;
				text-align: center;
				font-size: 1.75rem;
				line-height: 1.1;
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, #0a0a0a);
			}
			.palace-name {
				grid-column: 1 / -1;
				text-align: center;
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.combo {
				grid-column: 1 / -1;
				text-align: center;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}

			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.legend .swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 2px;
				margin-right: 4px;
				vertical-align: middle;
			}
			.swatch-mountain {
				background: var(--roxy-info, #2563eb);
			}
			.swatch-water {
				background: var(--roxy-accent, #f59e0b);
			}

			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.rows {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
			}
			.row {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-block: var(--roxy-space-sm, 0.5rem);
				display: grid;
				grid-template-columns: minmax(5rem, 9rem) minmax(0, 1fr);
				gap: 0.15rem var(--roxy-space-md, 1rem);
				align-items: baseline;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.row:first-child {
				border-top: 0;
				padding-top: 0;
			}
			.row-name {
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				color: var(--roxy-muted, #71717a);
			}
			.row-body p {
				margin: 0.15rem 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}
			.structure {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
		`,
	];

	/** Which plate the response is: the natal chart of a building, or one year of stars over it. */
	@property({ type: String, reflect: true })
	mode: 'natal' | 'annual' = 'natal';

	protected renderData(d: FlyingStarData) {
		const locale = this.effectiveLang();
		// The attribute decides which plate is drawn and the shape check narrows the
		// type under it, so a page that asked for the annual plate never gets the
		// mountain and water halves of a natal one.
		const natal = this.mode !== 'annual' && isNatal(d);
		return html`<article
			class="card"
			part="card"
			aria-labelledby="flying-star-title"
		>
			<header class="head" part="header">
				<h2 class="title" id="flying-star-title">${this.t('Flying star chart')}</h2>
				${
					isNatal(d)
						? natal
							? html`<span class="period"
								>${this.t('Period {{n}}', { n: formatInteger(locale, d.period ?? 0) })}</span
							>`
							: nothing
						: html`<span class="period">${d.year ?? ''}</span>`
				}
			</header>

			${
				isNatal(d)
					? natal
						? this.renderNatalFacts(d, locale)
						: nothing
					: this.renderAnnualFacts(d, locale)
			}

			<div class="plate" part="chart plate" role="group" aria-label=${this.t('Flying star chart')}>
				${GRID_ORDER.map((name) => this.renderPalace(d, name))}
			</div>

			${
				natal
					? html`<div class="legend" part="legend">
						<span><span class="swatch swatch-mountain"></span>${this.t('Mountain star')}</span>
						<span><span class="swatch swatch-water"></span>${this.t('Water star')}</span>
						<span>${this.t('Period star')}</span>
					</div>`
					: nothing
			}

			${natal && isNatal(d) ? this.renderStructure(d) : nothing}
			${this.renderPalaceRows(d)}
		</article>`;
	}

	/** What decides a natal plate: the mountain it faces, the one it sits on, and the measured degrees. */
	private renderNatalFacts(
		d: GenerateFlyingStarChartResponse,
		locale: string | undefined,
	) {
		return html`<div class="facts" part="details">
			${
				d.facing
					? html`<span
						><span class="lbl">${this.t('Facing')}</span>
						<b>${displayOption(locale, 'facing', d.facing.label ?? '')}</b></span
					>`
					: nothing
			}
			${
				d.sitting
					? html`<span
						><span class="lbl">${this.t('Sitting')}</span>
						<b>${displayOption(locale, 'facing', d.sitting.label ?? '')}</b></span
					>`
					: nothing
			}
			${
				typeof d.facingDegrees === 'number'
					? html`<span>${formatInteger(locale, d.facingDegrees)}°</span>`
					: nothing
			}
			${
				// Which way each plate flew is the step that separates two charts that
				// otherwise look alike, so it is printed rather than left implied.
				d.mountainFlight
					? html`<span
						><span class="lbl">${this.t('Mountain star')}</span>
						${FLIGHT_LABEL[d.mountainFlight] ? this.t(FLIGHT_LABEL[d.mountainFlight] as ChromeString) : d.mountainFlight}</span
					>`
					: nothing
			}
			${
				d.waterFlight
					? html`<span
						><span class="lbl">${this.t('Water star')}</span>
						${FLIGHT_LABEL[d.waterFlight] ? this.t(FLIGHT_LABEL[d.waterFlight] as ChromeString) : d.waterFlight}</span
					>`
					: nothing
			}
			${d.straddling ? html`<span><b>${this.t('Straddling')}</b></span>` : nothing}
		</div>`;
	}

	/** An annual plate turns on a date rather than on a compass reading. */
	private renderAnnualFacts(
		d: GetAnnualFlyingStarsResponse,
		locale: string | undefined,
	) {
		if (!d.changeoverDate && typeof d.centerStar !== 'number') return nothing;
		return html`<div class="facts" part="details">
			${
				typeof d.centerStar === 'number'
					? html`<span
						><span class="lbl">${this.t('Center')}</span>
						<b>${formatInteger(locale, d.centerStar)}</b></span
					>`
					: nothing
			}
			${
				d.changeoverDate
					? html`<span>${formatDate(locale, d.changeoverDate)}</span>`
					: nothing
			}
		</div>`;
	}

	/**
	 * The compass heading for a grid position, read off the same published `facing` option a Vastu
	 * form field already publishes. The centre reads the shared `Center` word instead.
	 */
	private paletteHeading(locale: string | undefined, name: string): string {
		return name === 'Center'
			? this.t('Center')
			: displayOption(locale, 'facing', name);
	}

	/** One cell of the plate, found by palace name so the drawing order is this component's and not the response's. */
	private renderPalace(d: FlyingStarData, name: string) {
		const locale = this.effectiveLang();
		const heading = this.paletteHeading(locale, name);
		const cell = (d.palaces ?? []).find(
			(p: { palace?: string }) => p.palace === name,
		);
		const natal = this.mode !== 'annual' && isNatal(d);
		if (!cell) {
			return html`<div class="palace">
				<span class="palace-name plate-heading">${heading}</span>
			</div>`;
		}
		const isCenter = name === 'Center';
		if (natal && isNatal(d)) {
			const p = cell as GenerateFlyingStarChartResponse['palaces'][number];
			return html`<div class="palace ${isCenter ? 'palace-center' : ''}">
				<span class="mountain" title=${this.t('Mountain star')}>${p.mountain ?? ''}</span>
				<span class="water" title=${this.t('Water star')}>${p.water ?? ''}</span>
				<span class="star" title=${this.t('Period star')}>${p.period ?? ''}</span>
				<span class="palace-name plate-heading">${heading}</span>
				${
					p.combination
						? html`<span class="combo">${display(p.combination, 'name')}</span>`
						: nothing
				}
			</div>`;
		}
		const p = cell as GetAnnualFlyingStarsResponse['palaces'][number];
		return html`<div class="palace ${isCenter ? 'palace-center' : ''}">
			<span class="star">${p.star ?? ''}</span>
			<span class="palace-name plate-heading">${heading}</span>
			<span class="combo">${display(p, 'name')}</span>
		</div>`;
	}

	/** The structure the facing and sitting stars produce, which is the verdict on the plate. */
	private renderStructure(d: GenerateFlyingStarChartResponse) {
		const s = d.structure;
		if (!s?.name) return nothing;
		// `structure.name` is translated IN PLACE by the API under `lang` (unlike the
		// star and combination names beside it, it has no `nameLocalized` sibling),
		// so it needs no lookup here; switch on `structure.id` for the stable value.
		return html`<section part="section structure">
			<h3 class="block-title">${s.name}</h3>
			${
				s.meaning && !this.hideReadings
					? html`<p class="structure" part="reading">${s.meaning}</p>`
					: nothing
			}
		</section>`;
	}

	/** Every palace again as a list, which is where the words that will not fit in a cell live. */
	private renderPalaceRows(d: FlyingStarData) {
		const rows = d.palaces ?? [];
		if (rows.length === 0) return nothing;
		const locale = this.effectiveLang();
		const natal = this.mode !== 'annual' && isNatal(d);
		const bodies = rows.map((cell) => {
			const heading = this.paletteHeading(locale, cell.palace ?? '');
			if (natal) {
				const p = cell as GenerateFlyingStarChartResponse['palaces'][number];
				if (!p.reading && !p.combination) return nothing;
				return html`<li class="row">
					<span class="row-name">${heading}</span>
					<div class="row-body">
						${p.combination ? html`<span>${display(p.combination, 'name')}</span>` : nothing}
						${
							p.reading && !this.hideReadings
								? html`<p part="reading">${p.reading}</p>`
								: nothing
						}
					</div>
				</li>`;
			}
			const p = cell as GetAnnualFlyingStarsResponse['palaces'][number];
			return html`<li class="row">
				<span class="row-name">${heading}</span>
				<div class="row-body">
					<span>${display(p, 'name')}</span>
					${p.element ? html`<span> ${p.element}</span>` : nothing}
					${
						!this.hideReadings
							? html`${p.meaning ? html`<p part="reading">${p.meaning}</p>` : nothing}
							${p.remedy ? html`<p part="reading">${p.remedy}</p>` : nothing}`
							: nothing
					}
				</div>
			</li>`;
		});
		if (bodies.every((b) => b === nothing)) return nothing;
		return html`<section part="section palaces">
			<ul class="rows">
				${bodies}
			</ul>
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-flying-star-chart': RoxyFlyingStarChart;
	}
}
