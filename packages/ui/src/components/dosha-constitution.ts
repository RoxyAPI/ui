import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import type { CalculateAyurvedicConstitutionResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { citationLine } from '../utils/citation.js';
import { formatInteger, formatNumber, formatPercent } from '../utils/format.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';
import { capitalize, humanize } from '../utils/string.js';

type Constitution = CalculateAyurvedicConstitutionResponse;
type Factor = NonNullable<Constitution['factors']>[number];
type Citation = Factor['source'];

/** The three humours in the order the composite reports them, which is also the order the bar is read in. */
const HUMOURS = ['vata', 'pitta', 'kapha'] as const;

/**
 * What each scored factor READ, as a heading.
 *
 * @remarks
 * The three ids are a closed set the spec states outright, and none of them carries a localized
 * partner, so these are words the component writes rather than words the response sent. Two of the
 * three already have a catalogue entry that another Vedic card uses, so a reader meets the same term
 * on both. Typed `ChromeString`, which is what keeps a dynamic lookup inside the catalogue.
 */
const FACTOR_LABEL: Record<string, ChromeString> = {
	'lagna-sign': 'Lagna',
	'moon-sign': 'Moon sign',
	'strongest-planet': 'Strongest graha',
};

/** `Vata-pitta` from `vata-pitta`, keeping the hyphen the API uses for a dual type. */
function formatType(type: string): string {
	return type.split('-').map(capitalize).join('-');
}

/**
 * What a factor read: one sign id, or the space-separated grahas that reached the strength cutoff.
 *
 * @remarks
 * Both come back canonical English with no localized partner on this response, so they print as the
 * API sent them with the case a reader expects. A sign name has a translated form on other
 * operations and deliberately none here; looking it up in another response to close that would be a
 * second translation of the same fact.
 */
function formatInput(input: string | undefined): string {
	return (input ?? '').split(' ').filter(Boolean).map(capitalize).join(' ');
}

/**
 * Ayurvedic constitution from a birth chart. Pass `data` from POST /ayurveda/constitution.
 *
 * @remarks
 * **The three shares are one bar, and the bar is the card.** They sum to exactly 100 by largest
 * remainder, so a stacked bar is the honest drawing rather than three separate meters: the reading
 * is a split of one whole, and three bars invite a reader to compare each against a full width that
 * does not exist. Every segment carries its own percentage beside the humour, so the picture and the
 * numbers cannot disagree.
 *
 * **The humour identifiers are printed as the response sends them, in every language.** Vata, pitta
 * and kapha are Sanskrit identifiers the API states outright are never translated, so they are
 * vocabulary rather than chrome and nothing here catalogues them.
 *
 * **`meta.disclaimer` is rendered verbatim and `hide-readings` does not touch it.** It states the
 * scope of everything above it, which is a fact about the response rather than an interpretation of
 * a chart, and a page that drops the reading has more need of it rather than less.
 *
 * The factors are the part a practitioner checks: each names what it read, the humours it carries,
 * the weight it was given and the verse it rests on. The weighting is ours rather than classical,
 * so the composite names the convention it was built under instead of presenting the blend as
 * received doctrine.
 */
@customElement('roxy-dosha-constitution')
export class RoxyDoshaConstitution extends RoxyDataElement<Constitution> {
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
			.type {
				font-size: var(--roxy-text-xl, 1.25rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
			}

			.bar {
				display: flex;
				width: 100%;
				min-width: 0;
				height: 1.5rem;
				border-radius: var(--roxy-radius-sm, 4px);
				overflow: hidden;
				border: 1px solid var(--roxy-border, #e4e4e7);
			}
			.seg {
				min-width: 0;
			}
			.seg-vata {
				background: color-mix(in srgb, var(--roxy-info, #0284c7) 45%, var(--roxy-surface, #fff));
			}
			.seg-pitta {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 45%, var(--roxy-surface, #fff));
			}
			.seg-kapha {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 45%, var(--roxy-surface, #fff));
			}

			.shares {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 2px;
				margin-right: 4px;
				vertical-align: middle;
			}
			.shares b {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}

			.facts {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.lbl {
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
				grid-template-columns: minmax(6rem, 10rem) minmax(0, 1fr);
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
			.cite {
				margin: 0.15rem 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.cite .note {
				display: block;
			}

			.scroll {
				overflow-x: auto;
				min-width: 0;
			}
			table {
				border-collapse: collapse;
				width: 100%;
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
				letter-spacing: 0.06em;
			}
			td.num {
				font-variant-numeric: tabular-nums;
			}
			tr.is-strong td {
				font-weight: var(--roxy-weight-bold, 600);
			}

			.summary {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-relaxed, 1.65);
			}
			.disclaimer {
				margin: 0;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-left: 3px solid var(--roxy-border, #e4e4e7);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: var(--roxy-leading-normal, 1.5);
				color: var(--roxy-secondary, #475569);
			}
		`,
	];

	protected renderData(d: Constitution) {
		const locale = this.effectiveLang();
		const c = d.composite;
		return html`<article class="card" part="card" aria-labelledby="dosha-title">
			<header class="head" part="header">
				<h2 class="title" id="dosha-title">${this.t('Ayurvedic constitution')}</h2>
				${c?.type ? html`<span class="type">${formatType(c.type)}</span>` : nothing}
			</header>

			${this.renderBar(locale, d)}

			<div class="facts" part="details">
				${
					c?.dominant
						? html`<span><span class="lbl">${this.t('Dominant')}</span><b>${capitalize(c.dominant)}</b></span>`
						: nothing
				}
				${
					c?.secondary
						? html`<span><span class="lbl">${this.t('Secondary')}</span><b>${capitalize(c.secondary)}</b></span>`
						: nothing
				}
				${
					d.lagnaSign
						? html`<span><span class="lbl">${this.t('Lagna')}</span><b>${capitalize(d.lagnaSign)}</b></span>`
						: nothing
				}
				${
					d.moonSign
						? html`<span><span class="lbl">${this.t('Moon sign')}</span><b>${capitalize(d.moonSign)}</b></span>`
						: nothing
				}
				${
					c?.convention
						? html`<span><span class="lbl">${this.t('Convention')}</span>${c.convention}</span>`
						: nothing
				}
			</div>

			${this.renderFactors(locale, d.factors)}
			${this.renderRanking(locale, d.strengthRanking)}
			${this.renderPlanetDoshas(d.planetDoshas)}
			${
				d.summary && !this.hideReadings
					? html`<p class="summary" part="section readings">${d.summary}</p>`
					: nothing
			}
			${renderFrameCaption(locale, d.frame, this.translator)}
			${
				// The scope of everything above it, so it is never behind the readings
				// gate: a page showing only the chart needs it more, not less.
				d.meta?.disclaimer
					? html`<p class="disclaimer" part="disclaimer">${d.meta.disclaimer}</p>`
					: nothing
			}
		</article>`;
	}

	/** The composite as one stacked bar plus the three shares written out beside it. */
	private renderBar(locale: string | undefined, d: Constitution) {
		const c = d.composite;
		const shares = HUMOURS.map((h) => ({ humour: h, value: c?.[h] ?? 0 }));
		const total = shares.reduce((n, s) => n + s.value, 0);
		if (total <= 0) return nothing;
		return html`<div part="chart">
			<div
				class="bar"
				role="img"
				aria-label=${shares
					.map(
						(s) =>
							`${capitalize(s.humour)} ${formatPercent(locale, s.value, 0)}`,
					)
					.join(', ')}
			>
				${shares
					.filter((s) => s.value > 0)
					.map(
						(s) =>
							html`<div
								class=${`seg seg-${s.humour}`}
								style=${`flex: ${s.value} 0 0`}
							></div>`,
					)}
			</div>
			<p class="shares">
				${shares.map(
					(s) =>
						html`<span
							><span class=${`swatch seg-${s.humour}`}></span>${capitalize(
								s.humour,
							)}
							<b>${formatPercent(locale, s.value, 0)}</b></span
						>`,
				)}
			</p>
		</div>`;
	}

	/** The three scored factors: what each read, the humours it carries, its weight and its verse. */
	private renderFactors(
		locale: string | undefined,
		factors: Constitution['factors'],
	) {
		const rows = factors ?? [];
		if (rows.length === 0) return nothing;
		return html`<section part="section factors">
			<h3 class="block-title">${this.t('Factors')}</h3>
			<ul class="rows">
				${rows.map(
					(f) => html`<li class="row">
						<span class="row-name">${this.factorLabel(f.id)}</span>
						<div>
							<span>${formatInput(f.input)}</span>
							${
								f.doshas?.length
									? html` · ${f.doshas.map((h) => capitalize(h)).join(', ')}`
									: nothing
							}
							${
								typeof f.weight === 'number'
									? html` · <span class="lbl">${this.t('Weight')}</span>${formatNumber(locale, f.weight, 2)}`
									: nothing
							}
							${this.renderCitation(f.source)}
						</div>
					</li>`,
				)}
			</ul>
		</section>`;
	}

	/** The heading for one factor, falling back to the wire id for a fourth the API might add. */
	private factorLabel(id: string | undefined): string {
		const source = FACTOR_LABEL[id ?? ''];
		return source ? this.t(source) : humanize(id ?? '');
	}

	/**
	 * One citation, plus any disagreement the response records against it.
	 *
	 * @remarks
	 * A `note` here is a recorded conflict between two editions or a stated limit on what the
	 * citation covers. It is provenance rather than interpretation, so `hide-readings` keeps it: a
	 * page showing the calculation without the report still has to say what the calculation rests on.
	 */
	private renderCitation(source: Citation | undefined) {
		const line = citationLine(source ?? {});
		if (!line) return nothing;
		return html`<p class="cite">
			<span class="lbl">${this.t('Source')}</span>${line}
			${source?.note ? html`<span class="note">${source.note}</span>` : nothing}
		</p>`;
	}

	/** The seven grahas by shadbala, with the ones that reached the cutoff marked. */
	private renderRanking(
		locale: string | undefined,
		ranking: Constitution['strengthRanking'],
	) {
		const rows = ranking ?? [];
		if (rows.length === 0) return nothing;
		return html`<section part="section ranking">
			<h3 class="block-title">${this.t('Shadbala')}</h3>
			<div class="scroll">
				<table>
					<thead>
						<tr>
							<th>${this.t('Rank')}</th>
							<th>${this.t('Graha')}</th>
							<th>${this.t('Strength')}</th>
							<th>${this.t('Strong')}</th>
						</tr>
					</thead>
					<tbody>
						${rows.map(
							(r) => html`<tr class=${r.strong ? 'is-strong' : ''}>
								<td class="num">${formatInteger(locale, r.rank)}</td>
								<td>${r.graha ?? ''}</td>
								<td class="num">
									${this.t('{{value}} virupas', {
										value: formatNumber(locale, r.totalVirupas, 2),
									})}
								</td>
								<td>${r.strong ? this.t('Yes') : this.t('No')}</td>
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
		</section>`;
	}

	/** The graha to humour and graha to constituent table the response ships as reference. */
	private renderPlanetDoshas(rows: Constitution['planetDoshas']) {
		const table = rows ?? [];
		if (table.length === 0) return nothing;
		return html`<section part="section planet-humours">
			<h3 class="block-title">${this.t('Planetary humours')}</h3>
			<div class="scroll">
				<table>
					<thead>
						<tr>
							<th>${this.t('Graha')}</th>
							<th>${this.t('Humours')}</th>
							<th>${this.t('Dhatu')}</th>
						</tr>
					</thead>
					<tbody>
						${table.map(
							(r) => html`<tr>
								<td>${r.graha ?? ''}</td>
								<td>${(r.doshas ?? []).map((h) => capitalize(h)).join(', ')}</td>
								<td>${[r.dhatu, r.dhatuSanskrit].filter(Boolean).join(' · ')}</td>
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
			${this.renderTableSources(table)}
		</section>`;
	}

	/**
	 * The works behind the reference table, listed once.
	 *
	 * @remarks
	 * Every row carries the same two citations, so printing them per row would repeat one fact seven
	 * times. They are collected by their rendered line, which is what makes the set distinct without
	 * this component having to know which fields identify an edition.
	 */
	private renderTableSources(rows: NonNullable<Constitution['planetDoshas']>) {
		const lines = new Set<string>();
		for (const r of rows) {
			for (const source of [r.doshaSource, r.dhatuSource]) {
				const line = citationLine(source ?? {});
				if (line) lines.add(line);
			}
		}
		if (lines.size === 0) return nothing;
		return html`<p class="cite">
			<span class="lbl">${this.t('Source')}</span>${[...lines].join(' · ')}
		</p>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-dosha-constitution': RoxyDoshaConstitution;
	}
}
