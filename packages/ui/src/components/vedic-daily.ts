import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { planetGlyph } from '../tokens/index.js';
import type { GetVedicDailyReadingResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDateTime, formatNumber } from '../utils/format.js';
import { frameCaptionStyles, renderFrameProvenance } from '../utils/frame.js';

type Daily = GetVedicDailyReadingResponse;
type Graha = Daily['grahas'][number];
type Limb = Daily['panchanga']['tithi'];
type Finance = NonNullable<Daily['areas']['finance']>;
type FinanceLink = NonNullable<Finance['drivers']>[number];

/**
 * The six graha states in the order a reader scans them, each beside the English source its label is looked up by.
 *
 * @remarks
 * A record keyed by the response enum rather than a string built at the call site: the key is checked against the catalogue by the compiler, and a state added upstream fails to typecheck here instead of rendering its raw wire value. The ORDER is fixed here too, so the summary strip reads the same on a day where one state has no grahas.
 */
const STATE_LABEL: Record<Graha['state'], ChromeString> = {
	favourable: 'Favourable',
	underdelivered: 'Underdelivered',
	obstructed: 'Obstructed',
	void: 'Void',
	aggravated: 'Aggravated',
	unfavourable: 'Unfavourable',
};
const STATES = Object.keys(STATE_LABEL) as Array<Graha['state']>;

/** Kakshas per sign. Fixed by the definition: each sign divides into eight stretches of 3 degrees 45 minutes. */
const KAKSHA_COUNT = 8;

/** The four verdict bands, shared by the day and by each area score. */
const BAND_LABEL: Record<NonNullable<Daily['verdict']>, ChromeString> = {
	'very-strong': 'Very strong',
	strong: 'Strong',
	moderate: 'Moderate',
	weak: 'Weak',
};

/** The three dasha levels the ladder can carry. */
const LEVEL_LABEL: Record<Daily['dasha'][number]['level'], ChromeString> = {
	mahadasha: 'Mahadasha',
	antardasha: 'Antardasha',
	pratyantardasha: 'Pratyantardasha',
};

/**
 * Vedic daily reading. Renders POST /vedic-astrology/daily: one native, one day, one call.
 *
 * @remarks
 * **The score is a rare-high scale and is deliberately not drawn as a gauge.** It is the share of evaluated grahas that support the native, and the classical rules behind it cancel far more often than they deliver, so an ordinary day sits low. A ring, a bar or a percentage badge would read every ordinary day as a bad one, so the verdict band is the headline and the number supports it.
 *
 * **Every window is an ARRAY because the Moon can change nakshatra or rashi inside the panchanga day.** Tara and Chandrabala are rendered as one chip per window with its own validity, never as a single current value, and `ashtamaChandra` stays its own mark rather than folding into the favourable flag.
 *
 * **Three frames, not one.** The response is computed across a natal, a transit and a KP frame, two ayanamsas over three instants, and each names the sections it governs. All three are printed for the same reason one is printed on every other Vedic card: a chart that does not say which sky produced it cannot be reconciled against any other.
 *
 * House wording comes from `houseThemes` on the response, never from a table here, so the words a reader sees match the lens the call was made with.
 */
@customElement('roxy-vedic-daily')
export class RoxyVedicDaily extends RoxyDataElement<Daily> {
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
				overflow: hidden;
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
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
			/* The verdict word leads and the number follows it, which is the whole
			 * reading of this card: the band is the answer, the count is the evidence. */
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
			.verdict.very-strong,
			.verdict.strong {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #14532d);
			}
			.verdict.moderate {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
				color: var(--roxy-accent-ink, #b45309);
			}
			.verdict.weak {
				background: color-mix(in srgb, var(--roxy-muted, #71717a) 16%, transparent);
				color: var(--roxy-secondary, #475569);
			}
			.evidence {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-variant-numeric: tabular-nums;
			}
			.tally {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem;
			}
			.pill {
				font-size: var(--roxy-text-xs, 0.75rem);
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				border: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-secondary, #475569);
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
			.facts {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
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
			.fact .until {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
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
			.glyph {
				margin-right: 0.35em;
				color: var(--roxy-muted, #71717a);
			}
			/* One chip per state, tinted by what the state MEANS rather than by rank,
			 * so a reader learns three groups and not six colours. */
			.state {
				font-size: var(--roxy-text-xs, 0.75rem);
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-muted, #71717a) 14%, transparent);
				cursor: help;
			}
			.state.favourable {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #14532d);
			}
			.state.underdelivered,
			.state.obstructed,
			.state.void {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-accent-ink, #b45309);
			}
			.state.aggravated,
			.state.unfavourable {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 14%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.kaksha {
				display: inline-flex;
				align-items: center;
				gap: 0.35rem;
				cursor: help;
			}
			/* Neutral by default. The nodes have no Bhinnashtakavarga, so an absent
			 * verdict stays grey rather than borrowing the unfavourable tint. */
			.dot {
				width: 7px;
				height: 7px;
				border-radius: 50%;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 90%, transparent);
			}
			.dot.yes {
				background: var(--roxy-success, #16a34a);
			}
			.dot.no {
				background: var(--roxy-warning, #f59e0b);
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem;
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
			.window.yes {
				border-color: color-mix(in srgb, var(--roxy-success, #16a34a) 45%, transparent);
			}
			.window.no {
				border-color: color-mix(in srgb, var(--roxy-danger, #dc2626) 35%, transparent);
			}
			.mark {
				color: var(--roxy-danger-fg, #991b1b);
			}
			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists ul {
				margin: 0;
				padding-left: 1.1rem;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.note {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
		`,
	];

	protected renderData(d: Daily) {
		const grahas = d.grahas ?? [];
		if (!grahas.length) return this.renderEmpty();

		return html`<div class="wrap" part="card" aria-label=${this.t('Vedic daily reading')}>
			${this.renderHead(d)}
			${this.renderPanchanga(d)}
			${this.renderGrahas(grahas, d.houseThemes)}
			${this.renderWindows(d)}
			${this.renderFinance(d)}
			${this.renderDasha(d)}
			${this.renderProvenance(d)}
		</div>`;
	}

	/** Verdict band, the count behind it, and the per-state tally. */
	private renderHead(d: Daily) {
		const counts = new Map(
			(d.tally ?? []).map((t) => [t.state as string, t.count]),
		);
		const supportive = counts.get('favourable') ?? 0;
		return html`<header class="head" part="header">
			<div class="title-row">
				<h2 class="title">${this.t('Vedic daily')}</h2>
				<span class="when">
					${formatDateTime(this.effectiveLang(), d.dayStart)} — ${formatDateTime(this.effectiveLang(), d.dayEnd)}
				</span>
			</div>
			<div class="verdict-row">
				<span class="verdict ${d.verdict}">${this.t(BAND_LABEL[d.verdict])}</span>
				<span class="evidence">
					${this.t('{{supportive}} of {{evaluated}} grahas support this day', {
						supportive,
						evaluated: d.evaluated,
					})}
				</span>
			</div>
			${
				counts.size
					? html`<div class="tally" part="legend">
						${STATES.filter((s) => counts.get(s)).map(
							(s) =>
								html`<span class="pill">${this.t(STATE_LABEL[s])} ${counts.get(s)}</span>`,
						)}
					</div>`
					: nothing
			}
			${
				d.subject
					? html`<p class="note">
						${this.t(
							'Born with the Moon in {{rashi}}, nakshatra {{nakshatra}}',
							{
								rashi: d.subject.janmaRashi,
								nakshatra: d.subject.janmaNakshatra,
							},
						)}
					</p>`
					: nothing
			}
			${(d.degraded ?? []).map(
				(x) =>
					html`<p class="note">${this.t('{{component}} unavailable: {{reason}}', { component: x.component, reason: x.reason })}</p>`,
			)}
		</header>`;
	}

	/** The five limbs, each with the instant it gives way to the next. */
	private renderPanchanga(d: Daily) {
		const p = d.panchanga;
		if (!p) return nothing;
		const limb = (label: string, l: Limb | undefined) =>
			l
				? html`<div class="fact">
					<dt>${label}</dt>
					<dd>
						${l.number ? `${l.number}. ` : ''}${l.name}
						${l.validTo ? html`<span class="until">${this.t('until {{time}}', { time: formatDateTime(this.effectiveLang(), l.validTo) })}</span>` : nothing}
					</dd>
				</div>`
				: nothing;
		return html`<section class="block" part="section panchanga">
			<h3>${this.t('Panchang')}</h3>
			<dl class="facts" part="details">
				<div class="fact"><dt>${this.t('Vara')}</dt><dd>${p.vara}</dd></div>
				<div class="fact"><dt>${this.t('Paksha')}</dt><dd>${p.paksha}</dd></div>
				${limb(this.t('Tithi'), p.tithi)}
				${limb(this.t('Nakshatra'), p.nakshatra)}
				${limb(this.t('Yoga'), p.yoga)}
				${limb(this.t('Karana'), p.karana)}
			</dl>
		</section>`;
	}

	/** The words this response gives a house. Read from `houseThemes` rather than from a table here, so the wording follows the lens the call was made with, and joined for display because it arrives as a list. */
	private theme(themes: Daily['houseThemes'], house: number): string {
		return themes?.[String(house)]?.join(', ') ?? '';
	}

	/** The nine grahas, one row each, with the classical rule that produced the state. */
	private renderGrahas(grahas: Graha[], themes: Daily['houseThemes']) {
		return html`<section class="block" part="section grahas">
			<h3>${this.t('Grahas today')}</h3>
			<div class="scroll">
				<table part="table">
					<caption class="roxy-sr-only">
						${this.t('Each transiting graha with its sign, the house it occupies from the natal Moon, its bindus, its kaksha and the state the classical rules give it.')}
					</caption>
					<thead>
						<tr>
							<th scope="col">${this.t('Graha')}</th>
							<th scope="col">${this.t('Sign')}</th>
							<th scope="col">${this.t('House')}</th>
							<th scope="col">${this.t('Bindus')}</th>
							<th scope="col">${this.t('Kaksha')}</th>
							<th scope="col">${this.t('State')}</th>
						</tr>
					</thead>
					<tbody>
						${grahas.map((g) => {
							const glyph = planetGlyph(g.graha) ?? '';
							const theme = this.theme(themes, g.houseFromMoon);
							return html`<tr>
								<td>${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${g.graha}</td>
								<td>${g.sign}</td>
								<td class="num" title=${theme}>${g.houseFromMoon}</td>
								<td class="num">${typeof g.binduCount === 'number' ? g.binduCount : ''}</td>
								<td class="num">${this.renderKaksha(g.kaksha)}</td>
								<td>
									<span class="state ${g.state}" title=${g.stateSource ?? ''}>
										${this.t(STATE_LABEL[g.state])}
									</span>
								</td>
							</tr>`;
						})}
					</tbody>
				</table>
			</div>
		</section>`;
	}

	/**
	 * The kaksha a graha currently occupies, as its position within the sign.
	 *
	 * @remarks
	 * `bindu` has three states and the third is not a negative: `null` means the graha has no Bhinnashtakavarga to read, which is Rahu and Ketu, so it takes the neutral mark and the sentence stops rather than reporting an unfavourable stretch nobody calculated.
	 */
	private renderKaksha(k: Graha['kaksha']) {
		if (!k || typeof k.number !== 'number') return nothing;
		const verdict = k.bindu === true ? 'yes' : k.bindu === false ? 'no' : '';
		const gave =
			k.bindu === true
				? this.t('this kaksha lord gave bindu')
				: k.bindu === false
					? this.t('this kaksha lord gave no bindu')
					: '';
		const head = this.t(
			'Kaksha {{n}} of {{total}}, ruled by {{graha}}, spanning {{start}}° to {{end}}° of the sign',
			{
				n: k.number,
				total: KAKSHA_COUNT,
				graha: k.lord,
				start: formatNumber(this.effectiveLang(), k.startDegree, 2),
				end: formatNumber(this.effectiveLang(), k.endDegree, 2),
			},
		);
		return html`<span class="kaksha" title=${gave ? `${head} · ${gave}` : head}>
			${k.number}/${KAKSHA_COUNT}
			<span class="dot ${verdict}" aria-hidden="true"></span>
		</span>`;
	}

	/** Tara and Chandrabala, one chip per validity window. */
	private renderWindows(d: Daily) {
		const tara = d.tara ?? [];
		const bala = d.chandrabala ?? [];
		if (!tara.length && !bala.length) return nothing;
		const span = (from?: string, to?: string) =>
			html`<small>${formatDateTime(this.effectiveLang(), from)} — ${formatDateTime(this.effectiveLang(), to)}</small>`;
		return html`<section class="block" part="section windows">
			<h3>${this.t('Tara and Chandrabala')}</h3>
			${
				tara.length
					? html`<div class="chips">
						${tara.map(
							(t) => html`<span class="window">
								<span>${t.number}. ${t.name}${t.quality ? ` · ${t.quality}` : ''}</span>
								${span(t.validFrom, t.validTo)}
							</span>`,
						)}
					</div>`
					: nothing
			}
			${
				bala.length
					? html`<div class="chips">
						${bala.map(
							(b) => html`<span class="window ${b.favourable ? 'yes' : 'no'}">
								<span>
									${this.t('Moon in {{sign}}, house {{n}}', { sign: b.moonSign, n: b.houseFromMoon })}
									${b.ashtamaChandra ? html`<span class="mark"> · ${this.t('Ashtama Chandra')}</span>` : nothing}
								</span>
								${span(b.validFrom, b.validTo)}
							</span>`,
						)}
					</div>`
					: nothing
			}
		</section>`;
	}

	/** The finance area, when the day could be scored for it. */
	private renderFinance(d: Daily) {
		const f = d.areas?.finance;
		if (!f) return nothing;
		const themes = d.houseThemes;
		// A connection reads as the lord, the house it reaches in the words the
		// response supplied, how strong that reach is on the KP grading, and which
		// running levels the lord holds.
		const line = (c: FinanceLink) => {
			const theme = this.theme(themes, c.house);
			return html`<li>
				${c.graha} ·
				${this.t('House {{n}}', { n: c.house })}${theme ? ` (${theme})` : ''} ·
				${this.t('level {{level}} {{grade}}', { level: c.level, grade: c.grade })}
				${c.dashaLevels?.length ? html`<span class="note"> ${c.dashaLevels.map((l: NonNullable<FinanceLink['dashaLevels']>[number]) => this.t(LEVEL_LABEL[l])).join(', ')}</span>` : nothing}
			</li>`;
		};
		return html`<section class="block" part="section finance">
			<h3>${this.t('Finance')}</h3>
			<div class="verdict-row">
				<span class="verdict ${f.band ?? ''}">${f.band ? this.t(BAND_LABEL[f.band]) : ''}</span>
				${
					typeof f.positive === 'number' && typeof f.negative === 'number'
						? html`<span class="evidence">
							${this.t('{{positive}} positive against {{negative}} negative', {
								positive: f.positive,
								negative: f.negative,
							})}
						</span>`
						: nothing
				}
			</div>
			<div class="lists">
				${
					f.drivers?.length
						? html`<div>
							<h3>${this.t('Drivers')}</h3>
							<ul>${f.drivers.map(line)}</ul>
						</div>`
						: nothing
				}
				${
					f.cautions?.length
						? html`<div>
							<h3>${this.t('Cautions')}</h3>
							<ul>${f.cautions.map(line)}</ul>
						</div>`
						: nothing
				}
			</div>
		</section>`;
	}

	/** The dasha ladder running under the day. */
	private renderDasha(d: Daily) {
		const rows = d.dasha ?? [];
		if (!rows.length) return nothing;
		return html`<section class="block" part="section dasha">
			<h3>${this.t('Dasha')}</h3>
			<div class="chips">
				${rows.map(
					(r) => html`<span class="window">
						<span>${this.t(LEVEL_LABEL[r.level])} · ${r.lord}</span>
						<small>${formatDateTime(this.effectiveLang(), r.startDate)} — ${formatDateTime(this.effectiveLang(), r.endDate)}</small>
					</span>`,
				)}
			</div>
		</section>`;
	}

	/** All three frames, each naming what it governs. */
	private renderProvenance(d: Daily) {
		if (!d.frames) return nothing;
		return html`<section class="block" part="section frame">
			${renderFrameProvenance(this.effectiveLang(), d.frames, this.translator)}
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-daily': RoxyVedicDaily;
	}
}
