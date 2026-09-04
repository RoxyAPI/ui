import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import type {
	CalculateTzolkinResponse,
	GenerateMayanChartResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatInteger } from '../utils/format.js';
import type { InterpSection } from '../utils/interp-accordion.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';
import { displayOption } from '../utils/localized.js';
import { stackedTableStyles } from '../utils/stacked-table.js';
import { humanize } from '../utils/string.js';

type MayanData = CalculateTzolkinResponse | GenerateMayanChartResponse;
type Tzolkin = CalculateTzolkinResponse;
type MayanChart = GenerateMayanChartResponse;

/**
 * What the recorded character of a coefficient is called.
 *
 * @remarks
 * A closed three-member set of machine identifiers with no localized partner on the response, so the
 * words are the component's own and go through the catalogue. Typed `ChromeString`, which is what
 * keeps a dynamic lookup inside it.
 *
 * **The word names the CHARACTER the tradition records for the number, not the number.** Only nine of
 * the thirteen coefficients carry one, which is why an unbanded day prints no such fact at all rather
 * than a blank, and the fact is labelled for what it is: a bare adjective under a heading naming the
 * coefficient reads as the coefficient itself, which is the numeral in the hero.
 */
const BAND_LABEL: Record<string, ChromeString> = {
	gentle: 'Gentle',
	indifferent: 'Indifferent',
	violent: 'Violent',
};

/**
 * What each arm of the four-fold cross is called.
 *
 * @remarks
 * Five machine identifiers, closed, with no localized partner on the response, so the words are the
 * component's own. Same reason and same typing as {@link BAND_LABEL}.
 */
const CROSS_LABEL: Record<string, ChromeString> = {
	center: 'Center',
	conception: 'Conception arm',
	destiny: 'Destiny arm',
	left: 'Left arm',
	right: 'Right arm',
};

/** A trecena is thirteen days by definition, which is what makes the coefficient and the day inside it the same number. */
const TRECENA_DAYS = 13;

/** True for the fuller payload, which nests the day sign under a Calendar Round. */
function isChart(d: MayanData): d is MayanChart {
	return 'tzolkin' in d;
}

/**
 * Mayan day sign. Pass `data` from POST /mesoamerican-astrology/mayan/tzolkin, or set
 * `mode="chart"` and pass POST /mesoamerican-astrology/mayan/chart.
 *
 * @remarks
 * **The sign is printed in all three of the orthographies the response carries, because a reader
 * arrives holding one of them.** The standard Maya spelling is the headline, the sixteenth century
 * Yucatec form is what printed reference tables use, and the highland form is the vocabulary a
 * daykeeper works in. Showing one and dropping the others makes the card unreconcilable with
 * whichever book or teacher the reader already has.
 *
 * **The coefficient is drawn beside the sign and never underneath it.** A Tzolkin day is a number
 * and a sign together, and neither half names the day on its own, so the pair reads as one unit and
 * the trecena that contains it sits in the facts below.
 *
 * **The attribute says which read was asked for and the shape check narrows under it.** The Calendar
 * Round payload adds the Haab date, the Long Count, the Lord of the Night, the year bearer and the
 * four-fold cross, and `mode="chart"` is what draws them, so a page that asked for the day sign
 * alone never grows a second calendar its endpoint did not return. The day sign half reads the
 * SHAPE either way, so the fuller payload still renders correctly in day mode.
 *
 * `hide-readings` keeps every calculated value: both calendar dates, the coefficient, the trecena,
 * the Long Count, the Calendar Round, the correlation and the four positions of the cross. The
 * keynote, the coefficient reading, the guidance, the strengths and challenges and every per
 * position reading go.
 */
@customElement('roxy-mayan-day-sign')
export class RoxyMayanDaySign extends RoxyDataElement<MayanData> {
	static styles = [
		baseStyles,
		interpAccordionStyles,
		stackedTableStyles,
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

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			/* Only the text column may shrink: a flex item keeps min-width auto, so a
			 * long sign name would otherwise push the numeral out of the card. */
			.coefficient {
				flex-shrink: 0;
				font-size: 2.75rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-ink, #b45309);
			}
			.hero > div:not(.coefficient) {
				min-width: 0;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.25rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.spellings {
				margin: 0.15rem 0 0;
				display: flex;
				flex-wrap: wrap;
				gap: 0.15rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
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
			.band {
				display: inline-block;
				padding: 0.1rem 0.4rem;
				border-radius: var(--roxy-radius-sm, 4px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, var(--roxy-surface, #fff));
				color: var(--roxy-fg, #0a0a0a);
			}

			.keynote {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				line-height: var(--roxy-leading-relaxed, 1.65);
			}
			.summary {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-relaxed, 1.65);
				color: var(--roxy-secondary, #475569);
			}

			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			ul.plain {
				margin: 0;
				padding-left: 1.1rem;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-relaxed, 1.65);
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
				vertical-align: top;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				white-space: nowrap;
			}
			td.num {
				font-variant-numeric: tabular-nums;
				white-space: nowrap;
			}
			td p {
				margin: 0.15rem 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}
		`,
	];

	/** Which read the response is: the day sign alone, or the full Calendar Round chart. */
	@property({ type: String, reflect: true })
	mode: 'day' | 'chart' = 'day';

	protected renderData(d: MayanData) {
		const locale = this.effectiveLang();
		const chart = this.mode === 'chart' && isChart(d) ? d : undefined;
		const tz = isChart(d) ? d.tzolkin : d;
		const reading = tz?.reading;
		const band = reading?.numberBand
			? BAND_LABEL[reading.numberBand]
			: undefined;
		return html`<article class="card" part="card" aria-labelledby="mayan-title">
			<header class="hero" part="header">
				${
					typeof tz?.number === 'number'
						? html`<div class="coefficient">${formatInteger(locale, tz.number)}</div>`
						: nothing
				}
				<div>
					<p class="lbl">${this.t('Mayan day sign')}</p>
					<h2 class="title" id="mayan-title">${tz?.daySignName ?? ''}</h2>
					<p class="spellings">
						${
							tz?.daySignClassic
								? html`<span><span class="lbl">${this.t('Classic spelling')}</span>${tz.daySignClassic}</span>`
								: nothing
						}
						${
							tz?.daySignKiche
								? html`<span><span class="lbl">${this.t('Highland spelling')}</span>${tz.daySignKiche}</span>`
								: nothing
						}
					</p>
				</div>
			</header>

			<div class="facts" part="details">
				${
					d.date
						? html`<span><span class="lbl">${this.t('Date')}</span><b>${formatDate(locale, d.date)}</b></span>`
						: nothing
				}
				${this.renderTrecena(locale, tz?.trecena)}
				${chart ? this.renderHaabFact(locale, chart.haab) : nothing}
				${
					chart?.longCount?.formatted
						? html`<span><span class="lbl">${this.t('Long Count')}</span><b>${chart.longCount.formatted}</b></span>`
						: nothing
				}
				${
					chart?.calendarRound
						? html`<span><span class="lbl">${this.t('Calendar Round')}</span><b>${chart.calendarRound}</b></span>`
						: nothing
				}
				${
					chart?.yearBearer?.daySignName
						? html`<span
							><span class="lbl">${this.t('Year Bearer')}</span
							><b>${formatInteger(locale, chart.yearBearer.number)} ${chart.yearBearer.daySignName}</b></span
						>`
						: nothing
				}
				${
					chart?.lordOfNight?.label
						? html`<span><span class="lbl">${this.t('Lord of the Night')}</span><b>${chart.lordOfNight.label}</b></span>`
						: nothing
				}
				${
					band
						? html`<span
							><span class="lbl">${this.t('Character of the number')}</span
							><span class="band">${this.t(band)}</span></span
						>`
						: nothing
				}
				${
					// The constant is a request enum, so the published field-label payload
					// already names it in the reader's language. The identifier is what a
					// caller stores and what a printed table is checked against, so it
					// rides in the title and is what an unlabelled language prints.
					d.conventions?.correlation
						? html`<span
							><span class="lbl">${this.t('Correlation')}</span
							><span title=${d.conventions.correlation}
								>${displayOption(locale, 'correlation', d.conventions.correlation, d.conventions.correlation)}</span
							></span
						>`
						: nothing
				}
			</div>

			${
				reading?.keynote && !this.hideReadings
					? html`<p class="keynote" part="reading">${reading.keynote}</p>`
					: nothing
			}
			${this.renderLists(reading)}
			${this.renderInterpretation(this.sections(chart, reading), 'mayan-day')}
			${this.renderCross(locale, chart?.cross)}
			${
				chart?.summary && !this.hideReadings
					? html`<p class="summary" part="reading">${chart.summary}</p>`
					: nothing
			}
		</article>`;
	}

	/** The thirteen day period the day sits in, and where in it. */
	private renderTrecena(
		locale: string | undefined,
		trecena: Tzolkin['trecena'] | undefined,
	) {
		if (!trecena) return nothing;
		return html`<span
			><span class="lbl">${this.t('Trecena')}</span
			><b>${formatInteger(locale, trecena.number)}</b>
			${
				typeof trecena.dayOfTrecena === 'number'
					? this.t('Day {{n}} of {{total}}', {
							n: formatInteger(locale, trecena.dayOfTrecena),
							total: formatInteger(locale, TRECENA_DAYS),
						})
					: nothing
			}
			${
				trecena.rulingSignName
					? html`· <span class="lbl">${this.t('Ruling sign')}</span>${trecena.rulingSignName}`
					: nothing
			}</span
		>`;
	}

	/** The Haab date: the month name, the day inside it, and where the day falls in the 365 day year. */
	private renderHaabFact(
		locale: string | undefined,
		haab: MayanChart['haab'] | undefined,
	) {
		if (!haab?.monthName) return nothing;
		return html`<span
			><span class="lbl">${this.t('Haab')}</span
			><b>${formatInteger(locale, haab.day)} ${haab.monthName}</b>
			${haab.monthClassic ? html`(${haab.monthClassic})` : nothing}
			${
				typeof haab.dayOfYear === 'number'
					? html`· <span class="lbl">${this.t('Day of year')}</span>${formatInteger(locale, haab.dayOfYear)}`
					: nothing
			}</span
		>`;
	}

	/** What the sign does well and where the same temperament costs it something. */
	private renderLists(reading: Tzolkin['reading'] | undefined) {
		const strengths = reading?.strengths ?? [];
		const challenges = reading?.challenges ?? [];
		if (
			this.hideReadings ||
			(strengths.length === 0 && challenges.length === 0)
		)
			return nothing;
		return html`<div class="lists" part="section readings">
			${
				strengths.length > 0
					? html`<div>
						<h3 class="block-title">${this.t('Strengths')}</h3>
						<ul class="plain">
							${strengths.map((s) => html`<li>${s}</li>`)}
						</ul>
					</div>`
					: nothing
			}
			${
				challenges.length > 0
					? html`<div>
						<h3 class="block-title">${this.t('Challenges')}</h3>
						<ul class="plain">
							${challenges.map((s) => html`<li>${s}</li>`)}
						</ul>
					</div>`
					: nothing
			}
		</div>`;
	}

	/** The prose that belongs behind a disclosure: what the coefficient contributes, and what to do about it. */
	private sections(
		chart: MayanChart | undefined,
		reading: Tzolkin['reading'] | undefined,
	): InterpSection[] {
		const sections: InterpSection[] = [];
		if (reading?.numberReading)
			sections.push({
				label: this.t('Coefficient'),
				body: reading.numberReading,
			});
		if (reading?.guidance)
			sections.push({ label: this.t('Guidance'), body: reading.guidance });
		if (chart?.haab?.reading)
			sections.push({ label: this.t('Haab'), body: chart.haab.reading });
		if (chart?.lordOfNight?.reading)
			sections.push({
				label: this.t('Lord of the Night'),
				body: chart.lordOfNight.reading,
			});
		if (chart?.yearBearer?.reading)
			sections.push({
				label: this.t('Year Bearer'),
				body: chart.yearBearer.reading,
			});
		return sections;
	}

	/** The name of one arm, falling back to the wire id for a position the API might add. */
	private crossLabel(position: string | undefined): string {
		const source = CROSS_LABEL[position ?? ''];
		return source ? this.t(source) : humanize(position ?? '');
	}

	/**
	 * The four-fold cross: the day sign standing at each quarter around this one.
	 *
	 * @remarks
	 * The positions and their day offsets are calculated values and stay under `hide-readings`, so a
	 * page showing the map without the report keeps the whole cross and loses only the sentences.
	 */
	private renderCross(
		locale: string | undefined,
		cross: MayanChart['cross'] | undefined,
	) {
		const rows = cross ?? [];
		if (rows.length === 0) return nothing;
		return html`<section part="section cross">
			<h3 class="block-title">${this.t('Mayan cross')}</h3>
			<div class="scroll">
				<table class="stacked">
					<thead>
						<tr>
							<th>${this.t('Position')}</th>
							<th>${this.t('Offset in days')}</th>
							<th>${this.t('Day sign')}</th>
						</tr>
					</thead>
					<tbody>
						${rows.map(
							(r) => html`<tr>
								<td data-label=${this.t('Position')}>${this.crossLabel(r.position)}</td>
								<td class="num" data-label=${this.t('Offset in days')}>${formatInteger(locale, r.offsetDays)}</td>
								<td data-label=${this.t('Day sign')}>
									${formatInteger(locale, r.number)} ${r.daySignName ?? ''}
									${r.daySignKiche ? html`(${r.daySignKiche})` : nothing}
									${
										r.reading && !this.hideReadings
											? html`<p part="reading">${r.reading}</p>`
											: nothing
									}
								</td>
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-mayan-day-sign': RoxyMayanDaySign;
	}
}
