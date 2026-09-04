import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	CalculateKuaNumberResponse,
	GenerateEightMansionsResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate } from '../utils/format.js';
import {
	frameCaptionStyles,
	renderConventionsCaption,
} from '../utils/frame.js';
import { GRID_ORDER } from '../utils/nine-palaces.js';

type KuaData = CalculateKuaNumberResponse | GenerateEightMansionsResponse;

/** Compass label per sector, keyed by the name the response gives it. */
const SECTOR_LABEL: Record<string, string> = {
	North: 'North',
	Northeast: 'Northeast',
	East: 'East',
	Southeast: 'Southeast',
	South: 'South',
	Southwest: 'Southwest',
	West: 'West',
	Northwest: 'Northwest',
};

/**
 * Kua number and the Eight Mansions. Pass `data` from POST /feng-shui/kua, or set
 * `mode="mansions"` and pass POST /feng-shui/eight-mansions.
 *
 * @remarks
 * The eight sectors are drawn on the same nine-palace grid as the flying-star plate, south at the
 * top, with the person's own Kua number and trigram in the centre where the plate puts the period
 * star. That is not decoration: a reader who has both cards open is looking at one building, and
 * two grids that disagree about which way is up cannot be laid over each other. The geometry is
 * shared rather than copied ({@link GRID_ORDER}), so the two cannot drift apart.
 *
 * **Four sectors are favourable and four are not, always, and the card shows all eight.** Ba Zhai
 * divides the compass in half for every Kua number, so a card that showed only the good directions
 * would be advice rather than the map, and a reader could not tell a missing sector from an
 * unfavourable one. Rank is printed beside each, because the four favourable sectors are ordered
 * and the first of them is the one a household gets right first.
 *
 * `hide-readings` keeps the whole map: every sector, its star, its nature, its rank and its domain,
 * the Kua number, the group, the trigram and the boundary date. The per-sector reading goes.
 *
 * **This card is English end to end, by decision, on the same grounds as the other
 * Chinese-metaphysics cards**, with the conventions caption as the one shared-helper line that is
 * translated.
 */
@customElement('roxy-kua-card')
export class RoxyKuaCard extends RoxyDataElement<KuaData> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
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
			.group {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
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
			.sector {
				background: var(--roxy-surface, #fff);
				padding: var(--roxy-space-sm, 0.5rem);
				display: grid;
				gap: 0.1rem;
				align-content: start;
				min-height: 5.5rem;
				text-align: center;
			}
			/* Muted ink reads at roughly 3:1 over a status tint, so a tinted cell takes
			 * the darker neutral. The same trap as painting a tint and drawing its ink
			 * from the base token rather than its -fg partner. */
			.sector-good .sector-name,
			.sector-bad .sector-name,
			.sector-self .sector-name,
			.sector-good .rank,
			.sector-bad .rank {
				color: var(--roxy-secondary, #475569);
			}
			.sector-good .star-hanzi,
			.sector-bad .star-hanzi {
				color: var(--roxy-fg, #0a0a0a);
			}
			.sector-good {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 10%, var(--roxy-surface, #fff));
			}
			.sector-bad {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, var(--roxy-surface, #fff));
			}
			.sector-self {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, var(--roxy-surface, #fff));
			}
			.sector-name {
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.star-name {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.star-hanzi {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-accent-ink, #b45309);
			}
			.domain {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}
			.rank {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}
			.centre {
				display: grid;
				gap: 0.1rem;
				align-content: center;
			}
			.kua-number {
				font-size: 2rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				font-variant-numeric: tabular-nums;
			}
			.trigram-symbol {
				font-size: 1.5rem;
				line-height: 1.1;
				color: var(--roxy-accent-ink, #b45309);
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
			.swatch-good {
				background: var(--roxy-success, #16a34a);
			}
			.swatch-bad {
				background: var(--roxy-danger, #dc2626);
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
		`,
	];

	/** Which read the response is: the Kua number alone, or the full Eight Mansions map. */
	@property({ type: String, reflect: true })
	mode: 'kua' | 'mansions' = 'kua';

	protected renderData(d: KuaData) {
		const locale = this.effectiveLang();
		const trigram = d.trigram;
		return html`<article class="card" part="card" aria-labelledby="kua-title">
			<header class="head" part="header">
				<h2 class="title" id="kua-title">Kua ${d.kua ?? ''}</h2>
				${d.group ? html`<span class="group">${d.group} group</span>` : nothing}
			</header>

			<div class="facts" part="details">
				${
					trigram
						? html`<span
							><span class="lbl">Trigram</span>
							<span lang="zh">${trigram.chinese ?? ''}</span> ${trigram.symbol ?? ''}
							<b>${trigram.english ?? ''}</b> ${trigram.element ?? ''}</span
						>`
						: nothing
				}
				${
					trigram?.familyMember
						? html`<span><span class="lbl">Role</span>${trigram.familyMember}</span>`
						: nothing
				}
				${
					// The formula reads the Chinese year, which turns in early February, so
					// the boundary is what a reader born in January has to check.
					'boundaryDate' in d && d.boundaryDate
						? html`<span
							><span class="lbl">Year from</span>${formatDate(locale, d.boundaryDate)}</span
						>`
						: nothing
				}
				${
					'reassigned' in d && d.reassigned
						? html`<span
							><span class="lbl">Reassigned</span>from ${'rawKua' in d ? d.rawKua : ''}</span
						>`
						: nothing
				}
				${this.renderBestWorst(d)}
			</div>

			<div class="plate" part="chart plate" role="group" aria-label="Eight mansions">
				${GRID_ORDER.map((name) => this.renderSector(d, name))}
			</div>

			<div class="legend" part="legend">
				<span><span class="swatch swatch-good"></span>Favourable</span>
				<span><span class="swatch swatch-bad"></span>Unfavourable</span>
			</div>

			${this.renderSectorRows(d)}
			${
				'conventions' in d
					? renderConventionsCaption(d.conventions, this.translator)
					: nothing
			}
		</article>`;
	}

	/** The single best and worst sector, which the mansions response names outright. */
	private renderBestWorst(d: KuaData) {
		// The attribute decides whether the fuller read is drawn and the shape check
		// narrows the type under it, so a page that asked for the Kua number alone
		// never grows a verdict its endpoint did not return.
		if (this.mode !== 'mansions' || !('bestSector' in d)) return nothing;
		return html`${
			d.bestSector
				? html`<span><span class="lbl">Best</span><b>${d.bestSector}</b></span>`
				: nothing
		}
		${
			d.worstSector
				? html`<span><span class="lbl">Worst</span><b>${d.worstSector}</b></span>`
				: nothing
		}`;
	}

	/**
	 * One cell of the map, found by sector name so the drawing order is this component's.
	 *
	 * @remarks
	 * The centre is not a sector. Ba Zhai divides the eight compass directions and says nothing
	 * about the middle of a building, so that cell carries the person the map is FOR: their Kua
	 * number and the trigram it resolves to. Filling it with a ninth direction would invent a
	 * reading the system does not have.
	 */
	private renderSector(d: KuaData, name: string) {
		const heading = SECTOR_LABEL[name] ?? name;
		if (name === 'Center') {
			return html`<div class="sector sector-self centre">
				<span class="kua-number">${d.kua ?? ''}</span>
				<span class="trigram-symbol">${d.trigram?.symbol ?? ''}</span>
				<span class="sector-name">${d.trigram?.english ?? ''}</span>
			</div>`;
		}
		const sector = (d.sectors ?? []).find(
			(s: { direction?: string }) => s.direction === name,
		);
		if (!sector) {
			return html`<div class="sector">
				<span class="sector-name">${heading}</span>
			</div>`;
		}
		const good = sector.nature === 'auspicious';
		return html`<div class="sector ${good ? 'sector-good' : 'sector-bad'}">
			<span class="sector-name">${heading}</span>
			<span class="star-name">${sector.starName ?? ''}</span>
			${
				'chinese' in sector && sector.chinese
					? html`<span class="star-hanzi" lang="zh">${sector.chinese}</span>`
					: nothing
			}
			<span class="domain">${sector.domain ?? ''}</span>
			${
				typeof sector.rank === 'number'
					? html`<span class="rank">${good ? 'Rank' : 'Severity'} ${sector.rank}</span>`
					: nothing
			}
		</div>`;
	}

	/** Every sector again as a list, which is where the per-sector reading lives. */
	private renderSectorRows(d: KuaData) {
		const rows = d.sectors ?? [];
		if (rows.length === 0) return nothing;
		const bodies = rows.map((s) => {
			const reading =
				this.mode === 'mansions' && 'reading' in s ? s.reading : undefined;
			if (!reading || this.hideReadings) return nothing;
			return html`<li class="row">
				<span class="row-name">${SECTOR_LABEL[s.direction ?? ''] ?? s.direction}</span>
				<div class="row-body">
					<span>${s.starName ?? ''}</span>
					<p part="reading">${reading}</p>
				</div>
			</li>`;
		});
		if (bodies.every((b) => b === nothing)) return nothing;
		return html`<section part="section sectors">
			<h3 class="block-title">Sectors</h3>
			<ul class="rows">
				${bodies}
			</ul>
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-kua-card': RoxyKuaCard;
	}
}
