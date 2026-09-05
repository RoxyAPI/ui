import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import type {
	GetAlmanacDayResponse,
	GetMonthlyAlmanacResponse,
	LookupAuspiciousDaysResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	formatDate,
	formatDateRange,
	formatInteger,
	formatMonthDay,
} from '../utils/format.js';
import { display, displayOption } from '../utils/localized.js';
import { humanize } from '../utils/string.js';

type AlmanacData =
	| GetAlmanacDayResponse
	| GetMonthlyAlmanacResponse
	| LookupAuspiciousDaysResponse;

/** One day of the almanac, the shape all three endpoints agree on. */
type AlmanacDay = GetAlmanacDayResponse;

/** True for the single-day read, which IS a day rather than carrying a list of them. */
function isSingleDay(d: AlmanacData): d is GetAlmanacDayResponse {
	return !('days' in d);
}

/**
 * Chinese almanac (Tong Shu). Pass `data` from GET /chinese-astrology/calendar/day/{date}, or set
 * `mode` and pass the monthly read or an auspicious-day search.
 *
 * @remarks
 * What a date-selection almanac is actually consulted for: the day officer, what the day favours,
 * what it avoids, and the animal it clashes with. A single day renders as a card; a month or a
 * search renders the same day as a row, so a reader scanning thirty of them reads the same fields
 * in the same order they read one.
 *
 * **`favours` and `avoids` are the answer, not a footnote.** Almanac users pick a date by reading
 * exactly those two lists, so they lead the body of the card rather than sitting under the pillars,
 * and they survive `hide-readings` because a list of activities is a lookup result rather than a
 * written interpretation. What goes is the day officer's meaning, which is the one paragraph on the
 * card that reads as prose.
 *
 * **The clash animal is a warning and it is never omitted.** The tradition holds that a day clashes
 * with one of the twelve animals outright, and a card that showed the favourable half without it
 * would be the half a reader needs least.
 *
 * **The chrome is now fully catalogued, and the activity lists read the published option, not the
 * wire id.** `favours` and `avoids` arrive as English kebab-case identifiers with no localized
 * sibling, so each item is read through `displayOption(lang, 'activity', ...)` against the same
 * `/languages/field-labels` payload the request field publishes, rather than printed as
 * `moving-house`. The day officer, the clashing animal and the lunar mansion all echo a
 * `nameLocalized`/`animalLocalized` sibling and are read through {@link display} for the same
 * reason.
 */
@customElement('roxy-almanac-day')
export class RoxyAlmanacDay extends RoxyDataElement<AlmanacData> {
	static styles = [
		baseStyles,
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
			.lunar {
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

			.tag {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.tag-auspicious {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.tag-inauspicious {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.tag-neutral {
				background: color-mix(in srgb, var(--roxy-info, #2563eb) 16%, transparent);
				color: var(--roxy-info-fg, #1e40af);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.list h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.chips-favour span {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.chips-avoid span {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}

			.meaning {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
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
			.days {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
			}
			.day {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-block: var(--roxy-space-sm, 0.5rem);
				display: grid;
				grid-template-columns: var(--roxy-label-col) minmax(0, 1fr);
				gap: 0.15rem var(--roxy-space-md, 1rem);
				align-items: baseline;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.day:first-child {
				border-top: 0;
				padding-top: 0;
			}
			.day-date {
				font-variant-numeric: tabular-nums;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
			}
			.day-body {
				display: flex;
				flex-wrap: wrap;
				gap: 0.2rem var(--roxy-space-sm, 0.5rem);
				align-items: baseline;
			}
			.terms {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}
		`,
	];

	/** Which read the response is: one day, a whole month, or a search for a date to act on. */
	@property({ type: String, reflect: true })
	mode: 'day' | 'month' | 'auspicious' = 'day';

	protected renderData(d: AlmanacData) {
		const locale = this.effectiveLang();
		if (this.mode === 'day' && isSingleDay(d)) {
			return html`<article class="card" part="card" aria-labelledby="almanac-title">
				${this.renderDayCard(d, locale)}
			</article>`;
		}
		if (isSingleDay(d)) return nothing;
		return html`<article class="card" part="card" aria-labelledby="almanac-title">
			<header class="head" part="header">
				<h2 class="title" id="almanac-title">
					${'activityLabel' in d && d.activityLabel ? d.activityLabel : this.t('Almanac')}
				</h2>
				${
					'startDate' in d && d.startDate
						? html`<span class="lunar"
							>${formatDateRange(locale, d.startDate, d.endDate)}</span
						>`
						: nothing
				}
				${
					'year' in d && typeof d.year === 'number'
						? html`<span class="lunar">${d.year} ${d.month ?? ''}</span>`
						: nothing
				}
				${
					typeof d.total === 'number'
						? html`<span class="lunar"
							>${this.t('{{count}} days', { count: formatInteger(locale, d.total) })}</span
						>`
						: nothing
				}
			</header>
			${
				'avoidAnimal' in d && d.avoidAnimal
					? html`<div class="facts" part="details">
						<span
							><span class="lbl">${this.t('Avoiding')}</span
							><b>${humanize(display(d, 'avoidAnimal'))}</b></span
						>
					</div>`
					: nothing
			}
			${this.renderSolarTerms(d, locale)}
			<section part="section days">
				<ul class="days">
					${(d.days ?? []).map((day) => this.renderDayRow(day as AlmanacDay, locale))}
				</ul>
			</section>
		</article>`;
	}

	/** The full card for one day. */
	private renderDayCard(d: AlmanacDay, locale: string | undefined) {
		const officer = d.dayOfficer;
		return html`<header class="head" part="header">
			<h2 class="title" id="almanac-title">${formatDate(locale, d.date)}</h2>
			${
				d.lunar
					? html`<span class="lunar"
						>${
							d.lunar.isLeapMonth
								? this.t('Lunar {{month}}/{{day}} (leap)', {
										month: String(d.lunar.month ?? ''),
										day: String(d.lunar.day ?? ''),
									})
								: this.t('Lunar {{month}}/{{day}}', {
										month: String(d.lunar.month ?? ''),
										day: String(d.lunar.day ?? ''),
									})
						}</span
					>`
					: nothing
			}
			${
				officer?.name
					? html`<span class="tag tag-${officer.quality ?? 'neutral'}"
						>${display(officer, 'name')} <span lang="zh">${officer.chinese ?? ''}</span></span
					>`
					: nothing
			}
		</header>

		${this.renderPillars(d)}
		${this.renderLists(d, locale)}
		${
			officer?.meaning && !this.hideReadings
				? html`<p class="meaning" part="reading">${officer.meaning}</p>`
				: nothing
		}
		${this.renderMansion(d)}`;
	}

	/** The three pillars of the day, and the animal it clashes with. */
	private renderPillars(d: AlmanacDay) {
		const rows: Array<[ChromeString, AlmanacDay['dayPillar'] | undefined]> = [
			['Year', d.yearPillar],
			['Month', d.monthPillar],
			['Day', d.dayPillar],
		];
		const present = rows.filter(([, p]) => p?.chinese || p?.stem);
		if (present.length === 0 && !d.clashAnimal) return nothing;
		return html`<div class="facts" part="details">
			${present.map(
				([label, p]) => html`<span
					><span class="lbl">${this.t(label)}</span>
					<b lang="zh">${p?.chinese ?? ''}</b> ${p?.naYin ?? ''}</span
				>`,
			)}
			${
				d.clashAnimal
					? html`<span
						><span class="lbl">${this.t('Clash')}</span><b>${display(d, 'clashAnimal')}</b></span
					>`
					: nothing
			}
		</div>`;
	}

	/** What the day favours and what it avoids, which is the whole reason an almanac is opened. */
	private renderLists(d: AlmanacDay, locale: string | undefined) {
		const favours = d.favours ?? [];
		const avoids = d.avoids ?? [];
		if (favours.length === 0 && avoids.length === 0) return nothing;
		return html`<div class="lists" part="section activities">
			${
				favours.length
					? html`<div class="list">
						<h3>${this.t('Favours')}</h3>
						<div class="chips chips-favour">
							${favours.map((f) => html`<span>${displayOption(locale, 'activity', f)}</span>`)}
						</div>
					</div>`
					: nothing
			}
			${
				avoids.length
					? html`<div class="list">
						<h3>${this.t('Avoids')}</h3>
						<div class="chips chips-avoid">
							${avoids.map((a) => html`<span>${displayOption(locale, 'activity', a)}</span>`)}
						</div>
					</div>`
					: nothing
			}
		</div>`;
	}

	/** The lunar mansion the day sits under, with the animal and planet it carries. */
	private renderMansion(d: AlmanacDay) {
		const m = d.mansion;
		if (!m?.name) return nothing;
		return html`<div class="facts" part="details">
			<span
				><span class="lbl">${this.t('Mansion')}</span><b>${display(m, 'name')}</b>
				<span lang="zh">${m.chinese ?? ''}</span></span
			>
			${m.palace ? html`<span>${humanize(m.palace)}</span>` : nothing}
			${m.planet ? html`<span>${m.planet}</span>` : nothing}
			${m.animal ? html`<span>${display(m, 'animal')}</span>` : nothing}
		</div>`;
	}

	/** The solar terms that fall inside a month, which are what the month pillar turns on. */
	private renderSolarTerms(d: AlmanacData, locale: string | undefined) {
		const terms = 'solarTerms' in d ? (d.solarTerms ?? []) : [];
		if (terms.length === 0) return nothing;
		return html`<div class="terms" part="details">
			${terms.map(
				(t) =>
					html`<span>${formatMonthDay(locale, t.date)} ${t.name ?? ''}</span>`,
			)}
		</div>`;
	}

	/** One day inside a month or a search result, carrying the same fields the card leads with. */
	private renderDayRow(day: AlmanacDay, locale: string | undefined) {
		const officer = day.dayOfficer;
		// Every activity, never the first few: the favours list IS the answer an
		// almanac is opened for, and a row that shows four of nine is a shorter row
		// that has quietly dropped the one a reader was looking for.
		const favours = day.favours ?? [];
		return html`<li class="day" part="label-track">
			<span class="day-date">${formatMonthDay(locale, day.date)}</span>
			<div class="day-body">
				<span lang="zh">${day.dayPillar?.chinese ?? ''}</span>
				${
					officer?.name
						? html`<span class="tag tag-${officer.quality ?? 'neutral'}"
							>${display(officer, 'name')}</span
						>`
						: nothing
				}
				${
					favours.length
						? html`<span class="chips chips-favour"
								>${favours.map((f) => html`<span>${displayOption(locale, 'activity', f)}</span>`)}</span
							>`
						: nothing
				}
				${
					day.clashAnimal
						? html`<span class="lbl">${this.t('Clash')} ${display(day, 'clashAnimal')}</span>`
						: nothing
				}
			</div>
		</li>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-almanac-day': RoxyAlmanacDay;
	}
}
