import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { planetGlyph } from '../tokens/index.js';
import type { GetKpDailyFinanceResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	formatDateTime,
	formatList,
	formatNumber,
	formatPercent,
	formatTime,
	formatTimeRange,
} from '../utils/format.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';

type Finance = GetKpDailyFinanceResponse;
type Layers = Finance['layers'];
type LayerKey = keyof Layers;
type CuspRow = Layers['cusps']['rows'][number];
type DashaRow = Layers['dasha']['rows'][number];
type RulingRow = Layers['rulingPlanets']['rows'][number];
type WindowRow = Layers['moonWindows']['rows'][number];
type Verdict = CuspRow['verdict'];

/**
 * The five bands the day score lands in, each beside the English source its label is looked up by.
 *
 * @remarks
 * Keyed by the response enum rather than a string built at the call site, so a band added upstream fails to typecheck here instead of rendering its raw wire value.
 */
const BAND_LABEL: Record<Finance['band'], ChromeString> = {
	strong: 'Strong',
	favourable: 'Favourable',
	mixed: 'Mixed',
	caution: 'Caution',
	unfavourable: 'Unfavourable',
};

/** The one verdict every layer row carries, in the words the catalogue already holds for a planet state. */
const VERDICT_LABEL: Record<Verdict, ChromeString> = {
	favourable: 'Favourable',
	mixed: 'Mixed',
	unfavourable: 'Unfavourable',
	neutral: 'Neutral',
};

/** The four layers in the order the response publishes them, which is the order the score weighs them. */
const LAYER_LABEL: Record<LayerKey, ChromeString> = {
	cusps: 'Cusps',
	dasha: 'Dasha',
	rulingPlanets: 'Ruling planets',
	moonWindows: 'Moon windows',
};

/** Which of the two house sets a row belongs to. */
const GROUP_LABEL: Record<'gain' | 'loss', ChromeString> = {
	gain: 'Gain',
	loss: 'Loss',
};

/** The four Vimshottari levels the dasha layer can run. */
const LEVEL_LABEL: Record<DashaRow['level'], ChromeString> = {
	mahadasha: 'Mahadasha',
	antardasha: 'Antardasha',
	pratyantardasha: 'Pratyantardasha',
	sookshmaDasha: 'Sookshma',
};

/**
 * KP daily finance. Renders POST /vedic-astrology/kp/daily-finance: one native, one civil day, four sub lord layers weighed into one score for money.
 *
 * @remarks
 * **The band is the answer and every number under it is the evidence.** The score is a weight-sum of four layers, each the mean of the rows printed in its own table, so a reader can redo the arithmetic from the card: the cusp sub lords of the gain and loss houses, the running Vimshottari lords at the reading moment, the ruling planets of that moment, and the sub lord windows the Moon passes through across the day. No meter, bar or percentage badge, for the same reason the Vedic daily card draws none: the scale is a weighed classification and not a share of anything, so a filled gauge would read an ordinary day as a bad one.
 *
 * **Every planet is judged against the two significator sets, and the sets come first.** A row is favourable when its planet signifies a gain house and no loss house, mixed when both, unfavourable when a loss house alone, neutral when neither, so the card prints the gain and loss houses the reading used, the planets that signify each, and the per-house evidence behind those two lists before any layer table, because that is what every verdict below is read against. A loss cusp inverts its verdict score and is marked as a loss house on its row.
 *
 * **Every clock time is the request timezone's wall clock, never the viewer's.** `readingAt` and the Moon windows arrive as naive local datetimes, so the shared formatters pin them and a reader in another zone sees the native's day, not a shifted one. The dasha boundaries are instants and follow the viewer.
 *
 * The card is data end to end and carries no written interpretation, so `hide-readings` leaves it whole.
 */
@customElement('roxy-kp-finance-card')
export class RoxyKpFinanceCard extends RoxyDataElement<Finance> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				overflow: hidden;
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title-row {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.when {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			/* The band word leads and the number follows it: the band is the
			 * reading of the day and the score is the evidence for it. */
			.verdict-row {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.verdict {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				padding: 0.15rem 0.6rem;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-muted, #71717a) 14%, transparent);
			}
			.verdict.strong,
			.verdict.favourable {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #14532d);
			}
			.verdict.mixed,
			.verdict.caution {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
				color: var(--roxy-accent-ink, #b45309);
			}
			.verdict.unfavourable {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 14%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.evidence {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-variant-numeric: tabular-nums;
			}
			.block {
				padding: var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.block h3 {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				color: var(--roxy-muted, #71717a);
			}
			.block-head {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.facts {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.fact {
				display: grid;
				gap: 2px;
			}
			.fact dt {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.fact dd {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem;
			}
			.chip {
				font-size: var(--roxy-text-xs, 0.75rem);
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				border: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-secondary, #475569);
			}
			.scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
				min-width: 0;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			th,
			td {
				text-align: left;
				padding: 0.35rem 0.5rem;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.05em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			td.num {
				font-variant-numeric: tabular-nums;
			}
			/* A list of names wraps in place: the table has two columns, so a
			 * wrapped cell reads better than a scroll box on a phone. */
			td.names {
				white-space: normal;
			}
			.glyph {
				margin-right: 0.35em;
				color: var(--roxy-muted, #71717a);
			}
			.retro {
				margin-left: 0.3em;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			/* One chip per verdict, tinted by what it means, the same three tints
			 * the band above uses so a reader learns one scale for the card. */
			.state {
				font-size: var(--roxy-text-xs, 0.75rem);
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-muted, #71717a) 14%, transparent);
			}
			.state.favourable {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #14532d);
			}
			.state.mixed {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-accent-ink, #b45309);
			}
			.state.unfavourable {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 14%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.window {
				display: grid;
				gap: 1px;
				padding: 0.3rem 0.6rem;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.window small {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.window.best {
				border-color: color-mix(in srgb, var(--roxy-success, #16a34a) 45%, transparent);
			}
			.window.worst {
				border-color: color-mix(in srgb, var(--roxy-danger, #dc2626) 35%, transparent);
			}
		`,
	];

	protected renderData(d: Finance) {
		if (!d.layers) return this.renderEmpty();
		return html`<div class="wrap" part="card" aria-label=${this.t('KP daily finance')}>
			${this.renderHead(d)}
			${this.renderSignificators(d)}
			<section class="block" part="section cusps">
				${this.renderLayer('cusps', d.layers.cusps, this.renderCuspRows(d.layers.cusps.rows))}
			</section>
			<section class="block" part="section dasha">
				${this.renderLayer('dasha', d.layers.dasha, this.renderDashaRows(d.layers.dasha.rows))}
			</section>
			<section class="block" part="section ruling-planets">
				${this.renderLayer(
					'rulingPlanets',
					d.layers.rulingPlanets,
					this.renderRulingRows(d.layers.rulingPlanets.rows),
				)}
			</section>
			<section class="block" part="section moon-windows">
				${this.renderLayer(
					'moonWindows',
					d.layers.moonWindows,
					this.renderWindowRows(d.layers.moonWindows.rows),
				)}
			</section>
			${this.renderWindows(d)}
			<section class="block" part="section frame">
				${renderFrameCaption(
					this.effectiveLang(),
					{ ayanamsa: d.ayanamsa, ayanamsaDegrees: d.ayanamsaDegrees },
					this.translator,
				)}
			</section>
		</div>`;
	}

	/** The band, the score behind it, the day and the moment it was read at, and the two house sets. */
	private renderHead(d: Finance) {
		const locale = this.effectiveLang();
		return html`<header class="head" part="header">
			<div class="title-row">
				<h2 class="title">${this.t('KP daily finance')}</h2>
				<span class="when">${formatDateTime(locale, d.date)}</span>
			</div>
			<div class="verdict-row">
				<span class="verdict ${d.band}">${this.t(BAND_LABEL[d.band])}</span>
				<span class="evidence">${formatNumber(locale, d.score, 1)}</span>
			</div>
			<dl class="facts" part="details">
				<div class="fact">
					<dt>${this.t('Reading moment')}</dt>
					<dd>${formatDateTime(locale, d.readingAt)}</dd>
				</div>
				<div class="fact">
					<dt>${this.t('Gain houses')}</dt>
					<dd>${formatList(locale, d.houses.gain.map(String))}</dd>
				</div>
				<div class="fact">
					<dt>${this.t('Loss houses')}</dt>
					<dd>${formatList(locale, d.houses.loss.map(String))}</dd>
				</div>
			</dl>
		</header>`;
	}

	/**
	 * The two planet sets every verdict is judged against, and the per-house evidence they were built from.
	 *
	 * @remarks
	 * A house lists its four tier significators strongest tier first, and a planet that qualifies at more than one tier is listed once per tier. It is named once here, at its strongest, because the row answers which planets signify the house and the two sets above are built from exactly that.
	 */
	private renderSignificators(d: Finance) {
		const s = d.significators;
		const locale = this.effectiveLang();
		const chips = (planets: readonly string[]) =>
			html`<div class="chips">
				${planets.map((p) => html`<span class="chip">${this.glyphName(p)}</span>`)}
			</div>`;
		return html`<section class="block" part="section significators">
			<h3>${this.t('Significators')}</h3>
			<dl class="facts">
				<div class="fact">
					<dt>${this.t('Gain')}</dt>
					<dd>${chips(s.gain)}</dd>
				</div>
				<div class="fact">
					<dt>${this.t('Loss')}</dt>
					<dd>${chips(s.loss)}</dd>
				</div>
			</dl>
			${
				s.byHouse.length
					? html`<div class="scroll" part="table" tabindex="0">
						<table>
							<thead>
								<tr>
									<th scope="col">${this.t('House')}</th>
									<th scope="col">${this.t('Significators')}</th>
								</tr>
							</thead>
							<tbody>
								${s.byHouse.map(
									(h) => html`<tr>
										<td class="num">${h.house} ${this.groupChip(h.group)}</td>
										<td class="names">${formatList(locale, [...new Set(h.significators)])}</td>
									</tr>`,
								)}
							</tbody>
						</table>
					</div>`
					: nothing
			}
		</section>`;
	}

	/** One layer: its name, the weight it carries and the score it contributed, over the rows it was scored from. */
	private renderLayer(
		key: LayerKey,
		layer: Layers[LayerKey],
		rows: TemplateResult,
	) {
		const locale = this.effectiveLang();
		return html`<div class="block-head">
				<h3>${this.t(LAYER_LABEL[key])}</h3>
				<span class="evidence">
					${this.t('Weight')} ${formatPercent(locale, layer.weight, 0)} · ${this.t('Score')}
					${formatNumber(locale, layer.score, 1)}
				</span>
			</div>
			<div class="scroll" part="table" tabindex="0">${rows}</div>`;
	}

	private renderCuspRows(rows: readonly CuspRow[]) {
		return html`<table>
			<thead>
				<tr>
					<th scope="col">${this.t('House')}</th>
					<th scope="col">${this.t('Sub lord')}</th>
					<th scope="col">${this.t('Star lord')}</th>
					<th scope="col">${this.t('Sign lord')}</th>
					<th scope="col">${this.t('Verdict')}</th>
					<th scope="col">${this.t('Score')}</th>
				</tr>
			</thead>
			<tbody>
				${rows.map(
					(r) => html`<tr>
						<td class="num">${r.house} ${this.groupChip(r.inverted ? 'loss' : 'gain')}</td>
						<td>${this.glyphName(r.subLord)}</td>
						<td>${this.glyphName(r.starLord)}</td>
						<td>${this.glyphName(r.signLord)}</td>
						<td>${this.verdictChip(r.verdict)}</td>
						<td class="num">${formatNumber(this.effectiveLang(), r.score, 0)}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	private renderDashaRows(rows: readonly DashaRow[]) {
		const locale = this.effectiveLang();
		return html`<table>
			<thead>
				<tr>
					<th scope="col">${this.t('Level')}</th>
					<th scope="col">${this.t('Lord')}</th>
					<th scope="col">${this.t('Start')}</th>
					<th scope="col">${this.t('End')}</th>
					<th scope="col">${this.t('Verdict')}</th>
					<th scope="col">${this.t('Score')}</th>
					<th scope="col">${this.t('Weight')}</th>
				</tr>
			</thead>
			<tbody>
				${rows.map(
					(r) => html`<tr>
						<td>${this.t(LEVEL_LABEL[r.level])}</td>
						<td>${this.glyphName(r.lord, r.retrograde)}</td>
						<td>${formatDateTime(locale, r.startDate)}</td>
						<td>${formatDateTime(locale, r.endDate)}</td>
						<td>${this.verdictChip(r.verdict)}</td>
						<td class="num">${formatNumber(locale, r.score, 0)}</td>
						<td class="num">${formatPercent(locale, r.weight, 0)}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	private renderRulingRows(rows: readonly RulingRow[]) {
		return html`<table>
			<thead>
				<tr>
					<th scope="col">${this.t('Planet')}</th>
					<th scope="col">${this.t('Verdict')}</th>
					<th scope="col">${this.t('Score')}</th>
				</tr>
			</thead>
			<tbody>
				${rows.map(
					(r) => html`<tr>
						<td>${this.glyphName(r.planet, r.retrograde)}</td>
						<td>${this.verdictChip(r.verdict)}</td>
						<td class="num">${formatNumber(this.effectiveLang(), r.score, 0)}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	private renderWindowRows(rows: readonly WindowRow[]) {
		const locale = this.effectiveLang();
		return html`<table>
			<thead>
				<tr>
					<th scope="col">${this.t('Start')}</th>
					<th scope="col">${this.t('End')}</th>
					<th scope="col">${this.t('Sub lord')}</th>
					<th scope="col">${this.t('Verdict')}</th>
					<th scope="col">${this.t('Score')}</th>
				</tr>
			</thead>
			<tbody>
				${rows.map(
					(r) => html`<tr>
						<td>${formatTime(locale, r.from)}</td>
						<td>${formatTime(locale, r.to)}</td>
						<td>${this.glyphName(r.subLord)}</td>
						<td>${this.verdictChip(r.verdict)}</td>
						<td class="num">${formatNumber(locale, r.score, 0)}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	/**
	 * The favourable window of the day and every unfavourable one, lifted out of the Moon table so a reader planning the day finds them without reading nine rows.
	 *
	 * @remarks
	 * `bestWindow` is null on a day with no favourable window, which is a fact about the day and not a missing value, so the block prints the worst windows alone rather than an empty slot.
	 */
	private renderWindows(d: Finance) {
		const locale = this.effectiveLang();
		const best = d.bestWindow;
		const worst = d.worstWindows ?? [];
		if (!best && !worst.length) return nothing;
		const window = (w: WindowRow, kind: 'best' | 'worst') =>
			html`<span class="window ${kind}">
				<span>${this.glyphName(w.subLord)}</span>
				<small>${formatTimeRange(locale, { start: w.from, end: w.to })}</small>
			</span>`;
		return html`<section class="block" part="section windows">
			<dl class="facts">
				${
					best
						? html`<div class="fact">
							<dt>${this.t('Best window')}</dt>
							<dd><div class="chips">${window(best, 'best')}</div></dd>
						</div>`
						: nothing
				}
				${
					worst.length
						? html`<div class="fact">
							<dt>${this.t('Worst windows')}</dt>
							<dd><div class="chips">${worst.map((w) => window(w, 'worst'))}</div></dd>
						</div>`
						: nothing
				}
			</dl>
		</section>`;
	}

	/**
	 * A planet with its glyph in front, and the retrograde mark after it where the row says so.
	 *
	 * @remarks
	 * The mark is the symbol the ephemeris and transit tables draw, with the catalogued word as its accessible name rather than printed: printed after a name, an adjective has to agree with that name in the languages that inflect it, and a symbol does not.
	 */
	private glyphName(name: string, retrograde = false) {
		const glyph = planetGlyph(name);
		return html`${glyph ? html`<span class="glyph" aria-hidden="true">${glyph}</span>` : nothing}${name}${
			retrograde
				? html` <span class="retro" aria-label=${this.t('retrograde')}>&#8478;</span>`
				: nothing
		}`;
	}

	private verdictChip(verdict: Verdict) {
		return html`<span class="state ${verdict}">${this.t(VERDICT_LABEL[verdict])}</span>`;
	}

	/** Which of the two sets a house belongs to, beside its number. */
	private groupChip(group: 'gain' | 'loss') {
		return html`<span class="chip">${this.t(GROUP_LABEL[group])}</span>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-kp-finance-card': RoxyKpFinanceCard;
	}
}
