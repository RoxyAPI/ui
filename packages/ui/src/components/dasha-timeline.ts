import { css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
	GetCurrentDashaResponse,
	GetMajorDashasResponse,
	GetPranaDashasResponse,
	GetPratyantardashasResponse,
	GetSookshmaDashasResponse,
	GetSubDashasResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import {
	formatAyanamsa,
	formatDate,
	formatDateTime,
	formatNumber,
	resolveDisplayDate,
} from '../utils/format.js';
import { type HouseThemes, houseWords } from '../utils/house-themes.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderInterpAccordion,
} from '../utils/interp-accordion.js';
import { renderTablist, tablistStyles } from '../utils/tablist.js';

type DashaData =
	| GetCurrentDashaResponse
	| GetMajorDashasResponse
	| GetSubDashasResponse
	| GetPratyantardashasResponse
	| GetSookshmaDashasResponse
	| GetPranaDashasResponse;

type DashaPeriod = GetMajorDashasResponse['mahadashas'][number];
type Remaining = GetCurrentDashaResponse['remainingInMahadasha'];

/**
 * The Vimshottari level a listed period sits at, so no view ever labels an
 * antardasha a mahadasha.
 *
 * Read from the RESPONSE, not from the `period` attribute: all three drill-down
 * routes are `period="sub"`, and only the payload says whether the list is
 * antardashas, pratyantardashas or sookshma dashas.
 */
function levelOf(d: DashaData): string {
	// Deepest level first, matching parentOf. No response carries two of these
	// keys today, so the order is not yet load-bearing; it is the order that stays
	// correct when a level is added, since a shallower key that a deeper payload
	// also carried would otherwise win the chain and mislabel it.
	if ('pranaDashas' in d) return 'Prana';
	if ('sookshmaDashas' in d) return 'Sookshma';
	if ('pratyantardashas' in d) return 'Pratyantardasha';
	if ('antardashas' in d) return 'Antardasha';
	return 'Mahadasha';
}

/** The parent period a drill-down response hangs off, with the level it sits at. */
function parentOf(
	d: DashaData,
): { label: string; period: DashaPeriod } | undefined {
	if ('sookshmaPeriod' in d && d.sookshmaPeriod)
		return { label: 'Sookshma', period: d.sookshmaPeriod };
	if ('pratyantardashaPeriod' in d && d.pratyantardashaPeriod)
		return { label: 'Pratyantardasha', period: d.pratyantardashaPeriod };
	if ('antardashaPeriod' in d && d.antardashaPeriod)
		return { label: 'Antardasha', period: d.antardashaPeriod };
	if ('mahadashaPeriod' in d && d.mahadashaPeriod)
		return { label: 'Mahadasha', period: d.mahadashaPeriod };
	return undefined;
}

/** "8y 11m 5d", the form a dasha reader expects for a remaining balance. */
function formatBalance(b: Remaining | undefined): string {
	if (!b) return '';
	const parts: string[] = [];
	if (b.years) parts.push(`${b.years}y`);
	if (b.months) parts.push(`${b.months}m`);
	if (b.days) parts.push(`${b.days}d`);
	return parts.length ? parts.join(' ') : '0d';
}

/**
 * The houses a period lord acts on, as words: `[2, 7, 8]` reads "wealth, marriage, longevity".
 *
 * `strongHouses` is preferred over `signifiedHouses`: it is the grade A and B subset a KP reading acts on, two or three houses rather than up to eight, which is what keeps this to one line beside a bar. Empty unless the request asked for significators, since both the map and the house lists are absent otherwise.
 */
function periodHouseWords(
	sig: DashaPeriod['significators'],
	themes: HouseThemes,
): string {
	return houseWords(
		sig?.strongHouses?.length ? sig.strongHouses : sig?.signifiedHouses,
		themes,
	);
}

/**
 * "Jun 17, 2018 to Jun 17, 2035" for the accordion aside.
 *
 * @remarks
 * A prana period, and a deep sookshma, opens and closes on the same calendar day, so the date alone printed "Aug 8, 2026 to Aug 8, 2026" and named no span at all. The clock is added only when the two ends collapse, so every longer period keeps the shorter form.
 */
function formatSpan(p: { startDate?: string; endDate?: string }): string {
	const start = p.startDate ? formatDate(p.startDate) : '';
	const end = p.endDate ? formatDate(p.endDate) : '';
	if (start && start === end) {
		return `${formatDateTime(p.startDate)} to ${formatDateTime(p.endDate)}`;
	}
	if (start && end) return `${start} to ${end}`;
	return start || end;
}

/**
 * Dasha timeline. Renders /vedic-astrology/dasha/{current,major,sub/{...}}.
 *
 * @remarks
 * Default mode shows all five active levels, mahadasha through prana, with the
 * reading each one carries. `period="major"` draws the full 120-year
 * Vimshottari timeline; `period="sub"` draws the antardashas inside one
 * mahadasha and states which mahadasha they sit in, since an antardasha means
 * nothing without its parent lord.
 *
 * When the request asked for significators, each period also names the houses
 * its lord acts on, in words taken from the response rather than from any table
 * held here, so the words arrive in the language the caller requested.
 */
@customElement('roxy-dasha-timeline')
export class RoxyDashaTimeline extends RoxyDataElement<DashaData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		tablistStyles,
		css`
			.wrap {
				display: grid;
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.nakshatra {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.current {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.current div span:first-child {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.current div strong {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.current div small {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.parent {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				border-left: 2px solid var(--roxy-border, #e4e4e7);
				padding-left: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.timeline {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.bar {
				display: grid;
				grid-template-columns: 5rem 1fr 8rem;
				gap: var(--roxy-space-sm, 0.5rem);
				/* Tighter than the gap between two bars, so a bar and its own house
				 * line read as one row rather than as two entries. */
				row-gap: 0.15rem;
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bar.now strong {
				color: var(--roxy-accent-ink, #b45309);
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
			.bar-track {
				position: relative;
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar-fill {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				opacity: 0.45;
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.bar-now .bar-fill {
				opacity: 1;
			}
			.bar-progress {
				position: absolute;
				top: -2px;
				bottom: -2px;
				width: 2px;
				background: var(--roxy-accent-ink, #b45309);
				border-radius: 2px;
				box-shadow: 0 0 0 2px
					color-mix(in srgb, var(--roxy-accent, #f59e0b) 35%, transparent);
			}
			.dates {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				text-align: right;
			}
			/* Time grain prints a clock as well as a date, and two of those do not fit
			 * a column sized for a bare date. Give the range its own full-width row
			 * rather than squeezing the track, which at phone width would leave the
			 * bar itself a few pixels wide. */
			.bar.fine {
				grid-template-columns: 5rem 1fr;
			}
			.bar.fine .dates {
				grid-column: 1 / -1;
				min-width: 0;
				text-align: left;
			}
			.bar .houses {
				/* Full width on a second row: the three tracks are sized for a planet,
				 * a bar and a date, and words belong in none of them. */
				grid-column: 1 / -1;
				/* A grid item floors at min-content, so the words wrap inside the row
				 * instead of widening the track past the card. */
				min-width: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			[role='tabpanel'] {
				padding-top: var(--roxy-space-md, 1rem);
			}
			.frame {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.frame dt {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.frame dd {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}
			.block {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				padding: var(--roxy-space-md, 1rem);
			}
		`,
	];

	/**
	 * Which dasha endpoint fed this element. `sub`, `antara`, `sookshma` and
	 * `prana` are the four drill-down levels and render identically; they stay
	 * distinct because each maps one-to-one onto its endpoint binding, which is
	 * what lets a widget pick a level. The heading and the level LABELS come from
	 * the payload, not from here, so a host that cannot set attributes still
	 * renders correctly.
	 */
	@property({ type: String, reflect: true })
	period: 'current' | 'major' | 'sub' | 'antara' | 'sookshma' | 'prana' =
		'current';

	/** Which panel is showing. Reset guarded in renderData when the data changes shape. */
	@state()
	private view: 'timeline' | 'readings' | 'frame' = 'timeline';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No dasha data</div>`;
	}

	protected renderData(d: DashaData) {
		const periods = this.collectPeriods(d);
		const maxYears = periods.length
			? Math.max(...periods.map((p) => p.durationYears))
			: 0;
		// Grain comes from the SHORTEST bar, not the longest: the column has to
		// resolve every row, and the set is never uniform. A sookshma set whose
		// longest member is 73 days picked month grain, and its 8 day members
		// then printed both ends as the same month: `Saturn Jan 1990 - Jan 1990`.
		const grain = grainFor(
			periods.length ? Math.min(...periods.map((p) => p.durationYears)) : 0,
		);
		const readings = this.readings(d, periods);
		const frame = this.frameRows(d);

		// One panel per kind of question a reader asks: when do the periods run,
		// what do they mean, and what chart produced them. Without the split the
		// card became a single column of periods, prose and provenance, and the
		// dates (the reason anyone opens it) were pushed below the fold.
		const tabs = [
			{ id: 'timeline' as const, label: 'Timeline' },
			...(readings.length
				? [{ id: 'readings' as const, label: `Readings (${readings.length})` }]
				: []),
			// "Chart details", never "Chart": this panel is the sidereal frame the
			// dates came from, not a wheel. A reader who clicks a tab labelled Chart
			// expects to see one drawn.
			...(frame.length
				? [{ id: 'frame' as const, label: 'Chart details' }]
				: []),
		];
		// A tab that no longer exists (data changed under a selection) must not
		// blank the card, so fall back to the first.
		const view = tabs.some((t) => t.id === this.view) ? this.view : 'timeline';

		return html`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">${this.heading(d)}</h2>
				${this.renderLordChain(d)}
			</header>

			${this.renderParentMahadasha(d)}
			${
				tabs.length > 1
					? renderTablist({
							items: tabs,
							active: view,
							onSelect: (v) => {
								this.view = v;
							},
							label: 'Dasha views',
							idPrefix: 'roxy-dasha',
							controls: true,
						})
					: nothing
			}
			<div
				id="roxy-dasha-panel-${view}"
				role="tabpanel"
				tabindex="0"
				aria-labelledby=${tabs.length > 1 ? `roxy-dasha-tab-${view}` : nothing}
			>
				${
					view === 'timeline'
						? html`
							${this.period === 'current' ? this.renderCurrent(d) : nothing}
							${
								periods.length > 0
									? html`<div class="timeline" role="list">
										${periods.map((p) => this.renderBar(p, maxYears, grain, d.houseThemes))}
									</div>`
									: nothing
							}`
						: nothing
				}
				${
					view === 'readings'
						? renderInterpAccordion(
								readings,
								'roxy-dasha',
								readings.length === 1 ? 'Reading' : 'Readings',
							)
						: nothing
				}
				${view === 'frame' ? this.renderFrame(frame) : nothing}
			</div>
		</div>`;
	}

	/**
	 * The full lord chain a drill-down sits under, e.g. Saturn > Venus > Rahu.
	 *
	 * The response carries every ancestor lord on each period, and naming only the
	 * immediate parent leaves a reader at the sookshma level unable to tell which
	 * branch of the chart they are looking at.
	 */
	private renderLordChain(d: DashaData) {
		const chain = [
			'mahadashaLord' in d ? d.mahadashaLord : undefined,
			'antardashaLord' in d ? d.antardashaLord : undefined,
			'pratyantardashaLord' in d ? d.pratyantardashaLord : undefined,
			'sookshmaLord' in d ? d.sookshmaLord : undefined,
		].filter(Boolean);
		if (chain.length > 1) {
			return html`<div class="nakshatra">${chain.join(' \u203a ')}</div>`;
		}
		if ('nakshatraName' in d && d.nakshatraName) {
			return html`<div class="nakshatra">
				Moon nakshatra: ${d.nakshatraName}
				${'nakshatraLord' in d && d.nakshatraLord ? html`(lord ${d.nakshatraLord})` : nothing}
			</div>`;
		}
		return nothing;
	}

	/**
	 * Provenance rows: the chart every date in this response was derived from.
	 *
	 * These are the fields that let a reader reconcile our dates against another
	 * calculator. The sidereal frame is the one that actually explains a
	 * disagreement, since Lahiri and the KP variants move every boundary by weeks,
	 * so it is shown rather than left in the JSON.
	 */
	private frameRows(d: DashaData): Array<[string, string]> {
		const rows: Array<[string, string]> = [];
		if ('nakshatraName' in d && d.nakshatraName) {
			const n =
				'moonNakshatra' in d && d.moonNakshatra
					? ` (${d.moonNakshatra} of 27)`
					: '';
			rows.push(['Moon nakshatra', `${d.nakshatraName}${n}`]);
		}
		if ('nakshatraLord' in d && d.nakshatraLord) {
			rows.push(['Nakshatra lord', d.nakshatraLord]);
		}
		if ('moonLongitude' in d && typeof d.moonLongitude === 'number') {
			rows.push([
				'Moon longitude',
				`${formatNumber(d.moonLongitude, 3)}\u00b0 sidereal`,
			]);
		}
		if ('ayanamsaType' in d && d.ayanamsaType) {
			rows.push([
				'Ayanamsa',
				formatAyanamsa(
					d.ayanamsaType,
					'ayanamsa' in d ? d.ayanamsa : undefined,
				),
			]);
		}
		if ('birthDashaBalance' in d && d.birthDashaBalance) {
			const lord =
				'nakshatraLord' in d && d.nakshatraLord ? `${d.nakshatraLord} ` : '';
			rows.push([
				'Balance at birth',
				`${formatBalance(d.birthDashaBalance)} of the opening ${lord}mahadasha`,
			]);
		}
		if ('totalYears' in d && typeof d.totalYears === 'number') {
			rows.push(['Cycle length', `${d.totalYears} years`]);
		}
		return rows;
	}

	private renderFrame(rows: Array<[string, string]>) {
		return html`<dl class="frame">
			${rows.map(([label, value]) => html`<div><dt>${label}</dt><dd>${value}</dd></div>`)}
		</dl>`;
	}

	/**
	 * Heading, decided by the PAYLOAD first and the `period` attribute only as a
	 * tie-break.
	 *
	 * Not every host can set the attribute. The WordPress plugin maps an
	 * operationId to a bare component tag with no attrs, so every dasha shortcode
	 * arrives with the default `period="current"`; keying off the attribute alone
	 * titled an antardasha list "Active dashas" there. A drill-down response is
	 * self-identifying (it carries a parent period), so the markup does not need
	 * to be told.
	 */
	private heading(d: DashaData): string {
		const parent = parentOf(d);
		if (parent) {
			return `${levelOf(d)}s in ${parent.period.planet} ${parent.label}`;
		}
		if ('mahadashas' in d) return 'Vimshottari Mahadasha';
		if ('mahadasha' in d) return 'Active dashas';
		return this.period === 'major' ? 'Vimshottari Mahadasha' : 'Active dashas';
	}

	/**
	 * Drill-down modes list sub-periods inside one parent, so name the parent and
	 * its span. A sub-period means nothing without its parent lord.
	 *
	 * `nominalStartDate` is present only when birth cut the parent short, which is
	 * also why such a list can hold fewer than nine rows: the sub-periods that
	 * finished before the native was born are not part of the chart. Saying so
	 * turns a surprising short list into an explained one.
	 */
	private renderParentMahadasha(d: DashaData) {
		const parent = parentOf(d);
		if (!parent) return nothing;
		const p = parent.period;
		const span = formatSpan(p);
		const began = p.nominalStartDate ? formatDate(p.nominalStartDate) : '';
		return html`<p class="parent">
			Inside the <strong>${p.planet}</strong> ${parent.label}${span ? `, ${span}` : ''}
			${typeof p.durationYears === 'number' ? `(${formatDuration(p.durationYears)})` : ''}.
			${
				began
					? html`<br />It began ${began}, before birth, so only the sub-periods running
						after the birth date are listed.`
					: nothing
			}
		</p>`;
	}

	/**
	 * Every reading the response carries, behind one exclusive accordion. Current
	 * mode has five (mahadasha, antardasha, pratyantardasha, sookshma, prana);
	 * drill-down modes lead with the parent period reading, then the sub-period
	 * running now; major mode shows the mahadasha running now.
	 */
	private readings(d: DashaData, periods: DashaPeriod[]): InterpSection[] {
		const sections: InterpSection[] = [];

		const parent = parentOf(d);
		if (parent?.period.interpretation) {
			sections.push({
				label: `${parent.period.planet} ${parent.label}`,
				aside: formatSpan(parent.period),
				body: parent.period.interpretation,
			});
		}

		if ('mahadasha' in d) {
			const levels = [
				['Mahadasha', d.mahadasha, d.remainingInMahadasha],
				['Antardasha', d.antardasha, d.remainingInAntardasha],
				['Pratyantardasha', d.pratyantardasha, d.remainingInPratyantardasha],
				['Sookshma', d.sookshmaDasha, d.remainingInSookshma],
				['Prana', d.pranaDasha, d.remainingInPrana],
			] as const;
			for (const [label, period, remaining] of levels) {
				if (!period?.interpretation) continue;
				const left = formatBalance(remaining);
				sections.push({
					label: `${period.planet} ${label}`,
					aside: left ? `${left} left` : formatSpan(period),
					body: period.interpretation,
				});
			}
		}

		const active = periods.find((p) => this.isCurrent(p));
		if (active?.interpretation) {
			sections.push({
				label: `${active.planet} ${levelOf(d)}`,
				aside: formatSpan(active),
				body: active.interpretation,
			});
		}

		return sections;
	}

	private renderCurrent(d: DashaData) {
		if (!('mahadasha' in d)) return nothing;
		const levels = [
			['Mahadasha', d.mahadasha, d.remainingInMahadasha],
			['Antardasha', d.antardasha, d.remainingInAntardasha],
			['Pratyantardasha', d.pratyantardasha, d.remainingInPratyantardasha],
			['Sookshma', d.sookshmaDasha, d.remainingInSookshma],
			['Prana', d.pranaDasha, d.remainingInPrana],
		] as const;
		return html`<div class="current">
			${levels.map(([label, period, remaining]) => {
				if (!period) return nothing;
				const left = formatBalance(remaining);
				const houses = periodHouseWords(period.significators, d.houseThemes);
				return html`<div>
					<span>${label}</span>
					<strong>${period.planet}</strong>
					${left ? html`<small>${left} left</small>` : nothing}
					${houses ? html`<small class="houses">Signifies ${houses}</small>` : nothing}
				</div>`;
			})}
		</div>`;
	}

	private collectPeriods(d: DashaData): DashaPeriod[] {
		if ('mahadashas' in d && d.mahadashas?.length) return d.mahadashas;
		if ('antardashas' in d && d.antardashas?.length) return d.antardashas;
		if ('pratyantardashas' in d && d.pratyantardashas?.length)
			return d.pratyantardashas;
		if ('sookshmaDashas' in d && d.sookshmaDashas?.length)
			return d.sookshmaDashas;
		if ('pranaDashas' in d && d.pranaDashas?.length) return d.pranaDashas;
		return [];
	}

	/** True when the current wall-clock time falls between the period's start and end. */
	private isCurrent(p: DashaPeriod): boolean {
		if (!p.startDate || !p.endDate) return false;
		const now = Date.now();
		const start = Date.parse(p.startDate);
		const end = Date.parse(p.endDate);
		if (Number.isNaN(start) || Number.isNaN(end)) return false;
		return now >= start && now < end;
	}

	/**
	 * Fractional progress (0..1) through a period at the current time. Used to
	 * draw a vertical "now" marker inside the active bar. Returns -1 outside the
	 * period so the caller can skip the marker.
	 */
	private progressIn(p: DashaPeriod): number {
		if (!p.startDate || !p.endDate) return -1;
		const start = Date.parse(p.startDate);
		const end = Date.parse(p.endDate);
		const now = Date.now();
		if (
			Number.isNaN(start) ||
			Number.isNaN(end) ||
			now < start ||
			now >= end ||
			end <= start
		) {
			return -1;
		}
		return (now - start) / (end - start);
	}

	private renderBar(
		p: DashaPeriod,
		max: number,
		grain: DateGrain,
		themes: HouseThemes,
	) {
		const years = p.durationYears;
		const width = max > 0 ? (years / max) * 100 : 0;
		const current = this.isCurrent(p);
		const progress = current ? this.progressIn(p) : -1;
		const trackClass = current ? 'bar-track bar-now' : 'bar-track';
		const houses = periodHouseWords(p.significators, themes);
		const cls = ['bar', current ? 'now' : '', grain === 'time' ? 'fine' : '']
			.filter(Boolean)
			.join(' ');
		return html`<div
			class=${cls}
			role="listitem"
			aria-current=${current ? 'time' : 'false'}
		>
			<span>
				<strong>${p.planet}</strong>${current ? html`<span class="now-badge">Now</span>` : nothing}
			</span>
			<span class=${trackClass}>
				<span class="bar-fill" style="width: ${width}%"></span>
				${
					progress >= 0
						? html`<span
							class="bar-progress"
							style="left: ${progress * width}%"
							aria-hidden="true"
						></span>`
						: nothing
				}
			</span>
			<span class="dates">
				${p.startDate ? formatBoundary(p.startDate, grain) : ''}
				${p.endDate ? html`- ${formatBoundary(p.endDate, grain)}` : ''}
			</span>
			${houses ? html`<span class="houses">Signifies ${houses}</span>` : nothing}
		</div>`;
	}
}

/**
 * How precise the bar date column has to be, chosen from the SHORTEST period in
 * the set.
 *
 * A Mahadasha spans years, so a bare year reads cleanly and keeps the column
 * narrow. A Sookshma spans days: printed as a year, every one of the nine rows
 * reads "1990 - 1990" and the column carries no information at exactly the level
 * a reader opened the drill-down to see. A Prana runs minutes to days, so it
 * needs the clock for the same reason: at day grain the deepest sets print both
 * ends of a row as the same date.
 */
type DateGrain = 'year' | 'month' | 'day' | 'time';

const DAYS_PER_YEAR = 365.25;

/**
 * A period length in the largest unit that still carries information.
 *
 * @remarks
 * Every level was printed in years, which is right for a mahadasha and useless below it: a sookshma read "0.5 years" where a reader wants days, and a prana read "0 years" because rounding a period shorter than seven hours to one decimal place of a year is zero. The unit has to follow the level.
 */
function formatDuration(years: number): string {
	if (years >= 1) return `${formatNumber(years, 1)} years`;
	const days = years * DAYS_PER_YEAR;
	if (days >= 1) return `${formatNumber(days, days >= 10 ? 0 : 1)} days`;
	const hours = days * 24;
	if (hours >= 1) return `${formatNumber(hours, 1)} hours`;
	return `${formatNumber(hours * 60, 0)} minutes`;
}

function grainFor(minYears: number): DateGrain {
	if (minYears >= 2) return 'year';
	if (minYears >= 60 / DAYS_PER_YEAR) return 'month';
	if (minYears >= 1 / DAYS_PER_YEAR) return 'day';
	return 'time';
}

/**
 * One end of a bar, at the chosen granularity.
 *
 * @remarks
 * Every grain carries the year. Day grain used to drop it on the grounds that the parent line states it, but a sookshma period routinely straddles new year, so a bar read `28 Dec - 3 Jan` with nothing saying which side moved. A dasha table is a date reference: a practitioner reads a boundary off it and writes it down. Time grain carries the whole date for the same reason, since a prana period straddles midnight as readily as a sookshma one straddles new year.
 *
 * The API returns naive datetimes (`1990-01-15T14:30:00`), which are wall clocks in the timezone of the CHART, not instants. {@link resolveDisplayDate} pins them to UTC so a boundary landing in the DST gap of the viewer cannot silently shift a day, and formatting in that same zone is what keeps a printed clock time equal to the chart clock time for every viewer.
 */
function formatBoundary(s: string, grain: DateGrain): string {
	if (grain === 'year') {
		const m = s.match(/^(\d{4})/);
		return m ? m[1] : s;
	}
	const { d, timeZone } = resolveDisplayDate(s);
	if (Number.isNaN(d.getTime())) return s;
	return d.toLocaleString('en', {
		day: grain === 'month' ? undefined : 'numeric',
		month: 'short',
		year: 'numeric',
		hour: grain === 'time' ? 'numeric' : undefined,
		minute: grain === 'time' ? '2-digit' : undefined,
		timeZone,
	});
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-dasha-timeline': RoxyDashaTimeline;
	}
}
