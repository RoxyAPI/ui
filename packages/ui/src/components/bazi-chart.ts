import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import type { GenerateBaziChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDateTime, formatInteger } from '../utils/format.js';
import {
	frameCaptionStyles,
	renderConventionsCaption,
} from '../utils/frame.js';
import { display } from '../utils/localized.js';
import { humanize } from '../utils/string.js';

type BaziPillar = GenerateBaziChartResponse['pillars'][number];
type BaziInteraction = NonNullable<
	GenerateBaziChartResponse['interactions']
>[number];

/** Column heading per pillar, keyed by the position the response gives it. The response names a
 * pillar's stem, branch and animal but never the POSITION itself, so this is the component's own. */
const PILLAR_LABEL: Record<string, ChromeString> = {
	year: 'Year',
	month: 'Month',
	day: 'Day',
	hour: 'Hour',
};

/**
 * Whether an interaction binds or breaks. Always English on the wire (the spec says so outright),
 * and a closed two-value set the natal chart already names for its own aspect patterns, so this
 * reuses that vocabulary rather than adding a second word for the same idea.
 */
const QUALITY_LABEL: Record<string, ChromeString> = {
	harmonious: 'Harmonious',
	challenging: 'Challenging',
};

/**
 * The seven BaZi interaction categories, always English on the wire (the spec says so outright:
 * "Always English, whatever the lang parameter says"). A closed set the component turns into a
 * word, same shape as {@link QUALITY_LABEL}.
 */
const TYPE_LABEL: Record<string, ChromeString> = {
	'stem-combination': 'Stem combination',
	'six-combination': 'Six combination',
	trine: 'Trine',
	clash: 'Clash',
	harm: 'Harm',
	punishment: 'Punishment',
	'stem-clash': 'Stem clash',
};

/**
 * How represented a phase is across the eight BaZi characters, always English on the wire (the spec
 * says so outright). A closed three-value set, same shape as {@link QUALITY_LABEL}.
 */
const LEVEL_LABEL: Record<string, ChromeString> = {
	deficient: 'Deficient',
	balanced: 'Balanced',
	excess: 'Excess',
};

/**
 * Four Pillars (BaZi) chart. Pass `data` from POST /chinese-astrology/bazi/chart.
 *
 * @remarks
 * Four columns, one per pillar, each carrying the Heavenly Stem over the Earthly Branch it is
 * read with, the Ten God relation that stem holds to the Day Master, the stems the branch stores,
 * and the Na Yin of the pair. The day column is marked, because the day stem IS the Day Master and
 * every relation in the chart is measured from it.
 *
 * **The hanzi is the chart.** A stem and a branch are single characters, identical in every
 * language the API serves, so they are drawn large and the romanisation and the element sit under
 * them. That is what makes this card read the same for a practitioner in any language.
 *
 * **The conventions caption is provenance, not decoration.** Three school splits decide a chart
 * for a birth near a boundary, the response echoes which one produced this one, and a chart
 * printed without them cannot be independently verified by the person reading it.
 *
 * `hide-readings` drops the prose and keeps the chart: every character, every element count, every
 * interaction and its members, and the conventions all stay. The Day Master paragraph, the summary,
 * the per-element reading and the per-interaction meaning go.
 *
 * **The vocabulary stays English end to end, by decision; the chrome does not.** A sourcing pass
 * across all seven catalogue languages found that most of the VOCABULARY (the Ten Gods, the hidden
 * stems, the Na Yin sound elements) cannot be written honestly in any of them, so every pillar value
 * still prints exactly as the response sends it. The card's own headings are a separate question:
 * `Four pillars`, `Day Master`, the four pillar-position headers and every localizable value
 * (`zodiacAnimalLocalized`, `elementLocalized`, `animalLocalized`, `tenGod.nameLocalized`) are
 * catalogued and read through {@link display}, so the chrome and the vocabulary each follow their
 * own rule instead of one covering for the other.
 */
@customElement('roxy-bazi-chart')
export class RoxyBaziChart extends RoxyDataElement<GenerateBaziChartResponse> {
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
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.born {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-variant-numeric: tabular-nums;
			}
			.animal {
				margin-left: auto;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			/* The four columns keep a readable width and the box scrolls rather than
			 * squeezing them, which is what a chart wants: four pillars side by side is
			 * the reading order, and reflowing them into two rows breaks it. */
			.pillars-wrap {
				overflow-x: auto;
			}
			.pillars {
				display: grid;
				grid-template-columns: repeat(4, minmax(6.5rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				min-width: 27rem;
			}
			.pillar {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				display: grid;
				gap: 0.35rem;
				align-content: start;
				text-align: center;
			}
			.pillar-self {
				border-color: var(--roxy-accent, #f59e0b);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 7%, transparent);
			}
			.pos {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.god {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				min-height: 1.2em;
			}
			.hanzi {
				font-size: 2rem;
				line-height: 1.15;
				color: var(--roxy-fg, #0a0a0a);
			}
			.hanzi-branch {
				color: var(--roxy-accent-ink, #b45309);
			}
			.romanised {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.rule {
				border: 0;
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				margin: 0.15rem 0;
				width: 100%;
			}
			.hidden {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
				gap: 0.15rem;
				text-align: start;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}
			.hidden .role {
				color: var(--roxy-muted, #71717a);
			}
			.nayin {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-align: start;
			}

			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}

			.master {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.master .hanzi {
				font-size: 1.5rem;
			}
			.master b {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.master p {
				margin: 0;
				flex-basis: 100%;
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.elements {
				display: grid;
				gap: 0.35rem;
			}
			.element {
				display: grid;
				grid-template-columns: minmax(4rem, max-content) minmax(0, 1fr) max-content;
				align-items: center;
				gap: 0.15rem var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.element-track {
				height: 6px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.element-fill {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
			}
			.element-count {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.element-reading {
				grid-column: 1 / -1;
				margin: 0;
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.interactions {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
			}
			.interaction {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-block: var(--roxy-space-sm, 0.5rem);
				display: grid;
				gap: 0.15rem;
			}
			.interaction:first-child {
				border-top: 0;
				padding-top: 0;
			}
			.interaction-line {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: 0.35rem var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.tag {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.tag-harmonious {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.tag-challenging {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.interaction-meaning {
				margin: 0;
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.summary {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				line-height: 1.7;
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	protected renderData(d: GenerateBaziChartResponse) {
		const locale = this.effectiveLang();
		const born = formatDateTime(locale, d.birthData?.date, d.birthData?.time);
		return html`<article class="card" part="card" aria-labelledby="bazi-title">
			<header class="head" part="header">
				<h2 class="title" id="bazi-title">${this.t('Four pillars')}</h2>
				${born ? html`<span class="born">${born}</span>` : nothing}
				${
					d.zodiacAnimal
						? html`<span class="animal">${display(d, 'zodiacAnimal')}</span>`
						: nothing
				}
			</header>

			<div class="pillars-wrap" part="chart" role="group" tabindex="0" aria-label=${this.t('Four pillars')}>
				<div class="pillars">
					${(d.pillars ?? []).map((p) => this.renderPillar(p))}
				</div>
			</div>

			${this.renderDayMaster(d)}
			${this.renderElements(d)}
			${this.renderInteractions(d)}

			${
				d.summary && !this.hideReadings
					? html`<p class="summary" part="section summary">${d.summary}</p>`
					: nothing
			}
			${renderConventionsCaption(d.conventions, this.translator)}
		</article>`;
	}

	/** One pillar: the Ten God over the stem, the branch under it, the stems the branch stores, and the Na Yin. */
	private renderPillar(p: BaziPillar) {
		const heading = PILLAR_LABEL[p.position];
		const isSelf = p.position === 'day';
		return html`<div
			class="pillar ${isSelf ? 'pillar-self' : ''}"
			part="pillar"
		>
			<span class="pos">${heading ? this.t(heading) : humanize(p.position)}</span>
			<span class="god">${display(p.tenGod, 'name')}</span>
			<span class="hanzi" lang="zh">${p.stem?.chinese ?? ''}</span>
			<span class="romanised"
				>${p.stem?.pinyin ?? ''} ${display(p.stem, 'element')}</span
			>
			<span class="hanzi hanzi-branch" lang="zh">${p.branch?.chinese ?? ''}</span>
			<span class="romanised"
				>${p.branch?.pinyin ?? ''}
				${display(p.branch, 'animal')}</span
			>
			${
				p.hiddenStems?.length
					? html`<hr class="rule" />
						<ul class="hidden" aria-label=${this.t('Hidden stems')}>
							${p.hiddenStems.map(
								(h) => html`<li>
									<span lang="zh">${h.stem?.chinese ?? ''}</span>
									<span class="role">${h.role}</span>
									${display(h.tenGod, 'name')}
								</li>`,
							)}
						</ul>`
					: nothing
			}
			${
				p.naYin
					? html`<hr class="rule" />
						<span class="nayin" title=${this.t('Na Yin')}>${p.naYin}</span>`
					: nothing
			}
		</div>`;
	}

	/** The day stem the whole chart is measured from, with the imagery the tradition reads it by. */
	private renderDayMaster(d: GenerateBaziChartResponse) {
		const m = d.dayMaster;
		if (!m) return nothing;
		return html`<section part="section day-master">
			<h3 class="block-title">${this.t('Day Master')}</h3>
			<div class="master">
				<span class="hanzi" lang="zh">${m.chinese ?? ''}</span>
				<span
					><b>${display(m, 'element')}</b> ${m.polarity ?? ''} ${m.pinyin ?? ''}</span
				>
				${
					m.nature && !this.hideReadings
						? html`<p part="reading">${m.nature}</p>`
						: nothing
				}
			</div>
		</section>`;
	}

	/** How the eight characters divide across the five phases, and what each level means. */
	private renderElements(d: GenerateBaziChartResponse) {
		const rows = d.fiveElements ?? [];
		if (rows.length === 0) return nothing;
		const locale = this.effectiveLang();
		// The eight characters, so a bar is a share of the whole chart rather than a
		// share of whichever element happens to lead it.
		const total = rows.reduce((n, r) => n + (r.count ?? 0), 0) || 1;
		return html`<section part="section elements">
			<h3 class="block-title">${this.t('Elements')}</h3>
			<div class="elements">
				${rows.map(
					(r) => html`<div class="element">
						<span>${display(r, 'element')}</span>
						<span class="element-track"
							><span
								class="element-fill"
								style="width: ${((r.count ?? 0) / total) * 100}%"
							></span
						></span>
						<span class="element-count"
							>${formatInteger(locale, r.count ?? 0)}
							${r.level && LEVEL_LABEL[r.level] ? this.t(LEVEL_LABEL[r.level] as ChromeString) : (r.level ?? '')}</span
						>
						${
							r.reading && !this.hideReadings
								? html`<p class="element-reading" part="reading">${r.reading}</p>`
								: nothing
						}
					</div>`,
				)}
			</div>
		</section>`;
	}

	/** Every combination, clash, harm and punishment the four pillars form, and which positions each binds. */
	private renderInteractions(d: GenerateBaziChartResponse) {
		const rows = d.interactions ?? [];
		if (rows.length === 0) return nothing;
		return html`<section part="section interactions">
			<h3 class="block-title">${this.t('Interactions')}</h3>
			<ul class="interactions">
				${rows.map(
					(i: BaziInteraction) => html`<li class="interaction">
						<div class="interaction-line">
							<span lang="zh">${i.chinese ?? ''}</span>
							<b>${i.type && TYPE_LABEL[i.type] ? this.t(TYPE_LABEL[i.type] as ChromeString) : humanize(i.type ?? '')}</b>
							${
								i.quality
									? html`<span class="tag tag-${i.quality}">${i.quality && QUALITY_LABEL[i.quality] ? this.t(QUALITY_LABEL[i.quality] as ChromeString) : i.quality}</span>`
									: nothing
							}
							<span>${(i.positions ?? []).join(' ')}</span>
							${i.transformsTo ? html`<span>${i.transformsTo}</span>` : nothing}
							${i.variety ? html`<span>${i.variety}</span>` : nothing}
						</div>
						${
							i.meaning && !this.hideReadings
								? html`<p class="interaction-meaning" part="reading">${i.meaning}</p>`
								: nothing
						}
					</li>`,
				)}
			</ul>
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-bazi-chart': RoxyBaziChart;
	}
}
