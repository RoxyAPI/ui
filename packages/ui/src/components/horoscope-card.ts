import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { aspectSymbol, planetGlyph, signGlyph } from '../tokens/index.js';
import type {
	GetDailyHoroscopeResponse,
	GetMonthlyHoroscopeResponse,
	GetWeeklyHoroscopeResponse,
	GetYearlyHoroscopeResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	ASPECT_CLASS,
	formatDate,
	formatDateGrain,
	formatDateRange,
	normalizeAspect,
} from '../utils/format.js';
import { labelRowStyles } from '../utils/label-row.js';
import { capitalize } from '../utils/string.js';

type HoroscopeData =
	| GetDailyHoroscopeResponse
	| GetWeeklyHoroscopeResponse
	| GetMonthlyHoroscopeResponse
	| GetYearlyHoroscopeResponse;

type HoroscopePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

/** The dated sky event every period carries, and the closed set of kinds it can be. */
type SkyEvent = GetDailyHoroscopeResponse['events'][number];
type SkyEventType = SkyEvent['type'];

/**
 * Period name for the card title, keyed by the attribute value.
 *
 * @remarks
 * Typed {@link ChromeString} because the lookup is dynamic and therefore invisible to the
 * translation scan: the compiler is what proves each label is catalogued. A period name taken
 * straight from the attribute value would be the only English word in a translated title.
 */
const PERIOD_LABEL: Record<HoroscopePeriod, ChromeString> = {
	daily: 'Daily',
	weekly: 'Weekly',
	monthly: 'Monthly',
	yearly: 'Yearly',
};

/**
 * What each kind of sky event is called. Keyed by the spec enum, so a kind added upstream
 * fails to compile here rather than printing its wire token.
 */
const EVENT_TYPE_LABEL: Record<SkyEventType, ChromeString> = {
	aspect: 'Aspect',
	'sign-ingress': 'Sign ingress',
	'retrograde-station': 'Retrograde station',
	'lunar-phase': 'Lunar phase',
	eclipse: 'Eclipse',
	'solar-season': 'Solar season',
};

/** The four life areas `bestPeriods` names a month for, in the order the sections above use. */
const BEST_AREAS = [
	['love', 'Love'],
	['career', 'Career'],
	['health', 'Health'],
	['finance', 'Finance'],
] as const satisfies ReadonlyArray<
	readonly [keyof GetYearlyHoroscopeResponse['bestPeriods'], ChromeString]
>;

/**
 * Daily, weekly, monthly, or yearly horoscope card. Pass `data` from
 * /astrology/horoscope/{sign}/{daily|weekly|monthly|yearly}.
 *
 * @remarks
 * A horoscope reads as prose end to end, but it is not one: the card has a real
 * data spine and `hide-readings` keeps all of it. The sign and its glyph, the
 * period and date, the energy meter, the sky strip (Moon sign, Moon phase and the
 * transits this reading was derived from), the dated events behind the reading,
 * the yearly themes, key periods, eclipses, retrogrades and best months, the
 * lucky number, colour, days and compatible signs, and the monthly key dates all
 * stay. The reading itself goes, in whichever shape it was rendered, along with
 * the week-by-week focus and advice. Each prose block carries its own heading, so
 * each goes whole rather than leaving one over nothing.
 *
 * The reading arrives in two shapes and the endpoint serves both: `column` is the
 * whole piece ready to run, and the six topic fields are that same reading split
 * by subject. Rendering both would print it twice, so {@link RoxyHoroscopeCard.layout}
 * picks one.
 *
 * Two values on an event are canonical English in every language, by contract, so
 * they stay safe to switch on: the bodies and the aspect. Both are drawn as glyphs
 * here, which reads the same in every language, with the name beside the glyph.
 */
@customElement('roxy-horoscope-card')
export class RoxyHoroscopeCard extends RoxyDataElement<HoroscopeData> {
	static styles = [
		baseStyles,
		labelRowStyles,
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
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}

			.glyph {
				font-size: 2.25rem;
				color: var(--roxy-accent-ink, #b45309);
				line-height: 1;
			}

			.title {
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				letter-spacing: var(--roxy-tracking-tight);
				text-transform: capitalize;
			}

			.date {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}

			.energy {
				margin-left: auto;
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.energy-bar {
				display: inline-block;
				width: 6rem;
				height: 6px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				margin-left: 6px;
				vertical-align: middle;
			}
			.energy-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.overview {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
			}

			.sections {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}

			.section h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.section p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.lucky {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}

			.lucky strong {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.compat-wrap {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: capitalize;
			}

			/* The sky strip: the Moon placement and the live transits that produced
			 * this reading. It sits under the overview because it is the evidence
			 * for it, not decoration. */
			.sky {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
			}
			.moon-line {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.moon-line b {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.moon-line .lbl {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin-right: 0.35rem;
			}
			.transits {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
				gap: 0.25rem;
			}
			.transits li {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				padding-left: 0.9rem;
				position: relative;
			}
			.transits li::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0.5em;
				width: 5px;
				height: 5px;
				border-radius: 50%;
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
			.weeks {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.week {
				display: grid;
				grid-template-columns: 3.5rem 1fr;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: baseline;
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-sm, 0.5rem);
			}
			.week:first-child {
				border-top: 0;
				padding-top: 0;
			}
			.week-no {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.week-focus {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.week-advice {
				margin: 0.15rem 0 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			/* One grid for the whole list so every event starts on the same column.
			 * The row wrapper keeps the dt/dd pairing in the markup and drops out of
			 * the layout. --roxy-label-col caps the date at a quarter of the card
			 * instead of a max-content track shared by every row: a long-format date
			 * in German runs wider than the same date in Hindi, and an uncapped track
			 * pushes the event column past half the row at phone width. */
			.dates {
				margin: 0;
				display: grid;
				grid-template-columns: var(--roxy-label-col) minmax(0, 1fr);
				gap: 0.3rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.date-row {
				display: contents;
			}
			.date-row dt {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.date-row dd {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}

			/* The column: the same reading as the topic sections, run as one piece.
			 * Wider leading than the sections, because it is read start to finish
			 * rather than scanned. */
			.column {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.column p {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				line-height: 1.7;
				color: var(--roxy-fg, #0a0a0a);
			}

			/* One row shape for the events trail and the four yearly lists, so a
			 * reader learns the layout once: an instant or a span on the left rail,
			 * what happened beside it, and the qualifiers under that. */
			.rows {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
			}
			.row {
				gap: 0.15rem var(--roxy-space-md, 1rem);
				align-items: baseline;
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-block: var(--roxy-space-sm, 0.5rem);
			}
			.row:first-child {
				border-top: 0;
				padding-top: 0;
			}
			.row-when {
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.row-what {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.row-what .name {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.row-what .aspect-trine,
			.row-what .aspect-sextile {
				color: var(--roxy-success-fg, #166534);
			}
			.row-what .aspect-square,
			.row-what .aspect-opposition {
				color: var(--roxy-danger-fg, #991b1b);
			}
			.row-what .aspect-conjunction {
				color: var(--roxy-accent-ink, #b45309);
			}
			/* Second column of the second line, so the qualifiers sit under what they
			 * qualify rather than under the instant. */
			.row-meta {
				grid-column: 2;
				display: flex;
				flex-wrap: wrap;
				gap: 0.2rem var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.row-meta .kind {
				text-transform: uppercase;
				letter-spacing: 0.04em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			/* label-row.ts stacks .row to a single column below 30rem; .row-meta's own
			 * explicit grid-column: 2 would otherwise orphan it into a column that no longer
			 * exists, so it rejoins column 1 at the same breakpoint. */
			@container (max-width: 30rem) {
				.row-meta {
					grid-column: 1;
				}
			}

			.tiles {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.tile {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				display: grid;
				gap: 0.1rem;
			}
			.tile-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.tile-value {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
				font-variant-numeric: tabular-nums;
			}
			.tile-note {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}
		`,
	];

	@property({ type: String, reflect: true })
	period: HoroscopePeriod = 'daily';

	/**
	 * Which shape the written reading takes: the whole `column`, or the six topic sections.
	 *
	 * @remarks
	 * The endpoint returns both and they are the SAME reading split two ways, so rendering both
	 * would print it twice. `auto` prefers the column and falls back to the sections for a
	 * response that carries none, which is what keeps an older payload rendering exactly what it
	 * always did. Pin `column` or `sections` where the page wants one shape whatever arrives.
	 *
	 * `hide-readings` outranks this: both shapes are the reading, and both go.
	 */
	@property({ type: String, reflect: true })
	layout: 'auto' | 'column' | 'sections' = 'auto';

	protected renderData(d: HoroscopeData) {
		const sign = d.sign ?? '';
		const glyph = signGlyph(sign) ?? '';
		const energy =
			'energyRating' in d && typeof d.energyRating === 'number'
				? d.energyRating
				: null;
		// Each period names its span differently and three of the four are ISO, so each
		// goes through a formatter rather than to the page as it arrived: `date` is the
		// day, `week` the Monday it opens on, `month` a bare YYYY-MM. `year` is the
		// exception, four digits that read the same in every locale this library ships,
		// and it must NOT go through a number formatter that would group it as 2.026.
		const locale = this.effectiveLang();
		const dateLabel =
			('date' in d && d.date && formatDate(locale, d.date)) ||
			('week' in d && d.week && formatDate(locale, d.week)) ||
			('month' in d && d.month && formatDateGrain(locale, d.month, 'month')) ||
			('year' in d && d.year ? String(d.year) : '') ||
			'';

		return html`<article
			class="card"
			part="card"
			aria-labelledby="horoscope-title"
		>
			<header class="head" part="header">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				<div>
					<h2 class="title" id="horoscope-title">
						${sign} ${this.t(PERIOD_LABEL[this.period])}
					</h2>
					${dateLabel ? html`<div class="date">${dateLabel}</div>` : nothing}
				</div>
				${
					energy !== null
						? html`<span class="energy" part="details" aria-label=${this.t('Energy {{value}} of 10', { value: energy })}>
							${this.t('Energy {{value}}/10', { value: energy })}
							<span class="energy-bar"
								><span style="width: ${(energy / 10) * 100}%"></span
							></span>
						</span>`
						: nothing
				}
			</header>

			${this.renderReading(d)}
			${this.renderSky(d)}
			${this.renderEvents(d.events)}
			${this.renderYear(d)}
			${this.renderMonth(d)}

			${(() => {
				const luckyNumber =
					'luckyNumber' in d && d.luckyNumber !== undefined
						? d.luckyNumber
						: undefined;
				const luckyColor =
					'luckyColor' in d && d.luckyColor ? d.luckyColor : '';
				const luckyNumbers =
					'luckyNumbers' in d && d.luckyNumbers ? d.luckyNumbers : [];
				const luckyDays = 'luckyDays' in d && d.luckyDays ? d.luckyDays : [];
				const compatibleSigns = d.compatibleSigns ?? [];
				if (
					luckyNumber === undefined &&
					!luckyColor &&
					luckyNumbers.length === 0 &&
					luckyDays.length === 0 &&
					compatibleSigns.length === 0
				)
					return nothing;
				return html`<div class="lucky" part="details">
						${
							luckyNumber !== undefined
								? html`<span>${this.t('Lucky number')} <strong>${luckyNumber}</strong></span>`
								: nothing
						}
						${
							luckyColor
								? html`<span>${this.t('Lucky color')} <strong>${luckyColor}</strong></span>`
								: nothing
						}
						${
							luckyNumbers.length
								? html`<span
									>${this.t('Lucky numbers')}
									<strong>${luckyNumbers.join(', ')}</strong></span
								>`
								: nothing
						}
						${
							luckyDays.length
								? html`<span
									>${this.t('Lucky days')} <strong>${luckyDays.join(', ')}</strong></span
								>`
								: nothing
						}
						${
							compatibleSigns.length
								? html`<span class="compat-wrap">
									${this.t('Best with')}
									<span class="compat"
										>${compatibleSigns.map(
											(s) => html`<span>${s}</span>`,
										)}</span
									>
								</span>`
								: nothing
						}
					</div>`;
			})()}
		</article>`;
	}

	/**
	 * The written reading, in exactly one of its two shapes.
	 *
	 * @remarks
	 * `overview` belongs to the sections rather than standing above them: it is one of the six
	 * topic fields the column is the undivided form of, so rendering it beside the column would
	 * print its opening twice.
	 */
	private renderReading(d: HoroscopeData) {
		if (this.hideReadings) return nothing;
		const asColumn =
			this.layout === 'column' || (this.layout === 'auto' && !!d.column);
		if (asColumn) {
			return d.column ? this.renderColumn(d.column) : nothing;
		}
		return html`${
			d.overview
				? html`<p class="overview" part="section overview">${d.overview}</p>`
				: nothing
		}
		<div class="sections" part="section outlook">
			${
				d.love
					? html`<div class="section">
						<h3>${this.t('Love')}</h3>
						<p>${d.love}</p>
					</div>`
					: nothing
			}
			${
				d.career
					? html`<div class="section">
						<h3>${this.t('Career')}</h3>
						<p>${d.career}</p>
					</div>`
					: nothing
			}
			${
				d.health
					? html`<div class="section">
						<h3>${this.t('Health')}</h3>
						<p>${d.health}</p>
					</div>`
					: nothing
			}
			${
				d.finance
					? html`<div class="section">
						<h3>${this.t('Finance')}</h3>
						<p>${d.finance}</p>
					</div>`
					: nothing
			}
			${
				d.advice
					? html`<div class="section">
						<h3>${this.t('Advice')}</h3>
						<p>${d.advice}</p>
					</div>`
					: nothing
			}
		</div>`;
	}

	/** The column as the API set it: one paragraph per blank-line break, never one wall of text. */
	private renderColumn(column: string) {
		const paragraphs = column
			.split(/\n\s*\n/)
			.map((p) => p.trim())
			.filter(Boolean);
		if (paragraphs.length === 0) return nothing;
		return html`<div class="column" part="section column">
			${paragraphs.map((p) => html`<p>${p}</p>`)}
		</div>`;
	}

	/**
	 * The dated sky events the reading was built from: what happened, when to the second, and
	 * which house it lands in for this sign.
	 *
	 * @remarks
	 * This is the auditable half of a horoscope and it survives `hide-readings`: every row is a
	 * dated instant rather than a claim about one. The visible time is written in the reader's own
	 * zone and locale, while the `datetime` attribute carries the exact UTC instant the response
	 * gave, to the second and unrounded, which is the value anyone verifying the reading needs.
	 */
	private renderEvents(events: readonly SkyEvent[] | undefined) {
		if (!events?.length) return nothing;
		const locale = this.effectiveLang();
		return html`<section part="section events">
			<h3 class="block-title">${this.t('Events')}</h3>
			<ul class="rows" aria-label=${this.t('Events')}>
				${events.map((e) =>
					this.renderRow(
						html`<time class="row-when" datetime=${e.at}
							>${formatDateGrain(locale, e.at, 'time')}</time
						>`,
						this.renderEventBodies(e),
						html`<span class="kind">${this.t(EVENT_TYPE_LABEL[e.type])}</span>
						<span>${this.t('House')} ${e.house}</span>
						${e.sign ? html`<span>${this.glyphName(signGlyph(e.sign), capitalize(e.sign))}</span>` : nothing}
						${
							e.through
								? html`<span
									>${this.t('through {{date}}', { date: formatDate(locale, e.through) })}</span
								>`
								: nothing
						}`,
						{ when: 'element' },
					),
				)}
			</ul>
		</section>`;
	}

	/**
	 * The bodies an event involves, with the aspect symbol between them where there are two.
	 *
	 * @remarks
	 * `bodies` and `aspect` are canonical English in every language by contract, so a caller can
	 * switch on them. That makes the glyph the part a non-English reader recognises, and the name
	 * beside it is the English the response sent rather than a translation this card invented.
	 */
	private renderEventBodies(e: SkyEvent) {
		const bodies = (e.bodies ?? []).map((b) =>
			this.glyphName(planetGlyph(b), b),
		);
		if (bodies.length === 2 && e.aspect) {
			const aspect = normalizeAspect({ type: e.aspect });
			return html`${bodies[0]}
			<span class=${ASPECT_CLASS[aspect] ?? ''}
				>${aspectSymbol(e.aspect) ?? e.aspect}</span
			>
			${bodies[1]}`;
		}
		return html`${bodies}`;
	}

	/**
	 * The four dated yearly lists and the best-month tiles.
	 *
	 * @remarks
	 * All five are data and none is gated: a theme is a body in a house between two dates, a key
	 * period is a date range, and a best month carries the aspect count it was chosen on. The
	 * `theme` and `focus` strings say what a house governs and read the same for every response,
	 * so they are the gloss a row is read through rather than a claim about this reader.
	 */
	private renderYear(d: HoroscopeData) {
		if (!('themes' in d)) return nothing;
		const locale = this.effectiveLang();
		return html`${
			d.themes.length
				? html`<section part="section themes">
					<h3 class="block-title">${this.t('Themes')}</h3>
					<ul class="rows">
						${d.themes.map((t) =>
							this.renderRow(
								formatDateRange(locale, t.from, t.to),
								html`${this.glyphName(planetGlyph(t.body), t.body)}
								${this.glyphName(signGlyph(t.sign), capitalize(t.sign))}`,
								html`<span>${this.t('House')} ${t.house}</span><span>${t.theme}</span>`,
							),
						)}
					</ul>
				</section>`
				: nothing
		}
		${
			d.keyPeriods.length
				? html`<section part="section key-periods">
					<h3 class="block-title">${this.t('Key periods')}</h3>
					<ul class="rows">
						${d.keyPeriods.map((p) =>
							this.renderRow(
								formatDateRange(locale, p.from, p.to),
								this.glyphName(planetGlyph(p.body), p.body),
								html`<span>${this.t('House')} ${p.house}</span><span>${p.focus}</span>`,
							),
						)}
					</ul>
				</section>`
				: nothing
		}
		${
			d.eclipses.length
				? html`<section part="section eclipses">
					<h3 class="block-title">${this.t('Eclipses')}</h3>
					<ul class="rows">
						${d.eclipses.map((e) =>
							this.renderRow(
								formatDate(locale, e.date),
								// `kind` has no localized partner on this response, so it prints as
								// the API sent it rather than as a second translation of its own.
								html`<span class="name">${e.kind}</span>`,
								html`<span>${this.t('House')} ${e.house}</span><span>${e.theme}</span>`,
							),
						)}
					</ul>
				</section>`
				: nothing
		}
		${
			d.retrogrades.length
				? html`<section part="section retrogrades">
					<h3 class="block-title">${this.t('Retrogrades')}</h3>
					<ul class="rows">
						${d.retrogrades.map((r) =>
							this.renderRow(
								formatDate(locale, r.date),
								// Same as the eclipse kind above: `direction` is the word the
								// response chose for this station.
								html`${this.glyphName(planetGlyph(r.body), r.body)}
								<span>${r.direction}</span>`,
								html`<span>${this.t('House')} ${r.house}</span><span>${r.theme}</span>`,
							),
						)}
					</ul>
				</section>`
				: nothing
		}
		${this.renderBestPeriods(d.bestPeriods)}`;
	}

	/** The easiest month of the year per life area, with the harmonious-aspect count it was picked on. */
	private renderBestPeriods(
		best: GetYearlyHoroscopeResponse['bestPeriods'] | undefined,
	) {
		if (!best) return nothing;
		const locale = this.effectiveLang();
		const areas = BEST_AREAS.filter(([key]) => best[key]);
		if (areas.length === 0) return nothing;
		return html`<section part="section best-periods">
			<h3 class="block-title">${this.t('Best months')}</h3>
			<div class="tiles" part="details">
				${areas.map(([key, label]) => {
					const period = best[key];
					if (!period) return nothing;
					return html`<div class="tile">
						<span class="tile-label">${this.t(label)}</span>
						<span class="tile-value">${formatDateGrain(locale, period.from, 'month')}</span>
						<span class="tile-note"
							>${this.t('{{count}} harmonious aspects', { count: period.count })}</span
						>
					</div>`;
				})}
			</div>
		</section>`;
	}

	/**
	 * One row of a dated list: when it happens, what happens, and the qualifiers under it.
	 *
	 * @remarks
	 * Shared by the events trail and all four yearly lists so they read as one table rather than
	 * five layouts. `when` is a plain string for a date or a range and an element where the row
	 * needs a machine-readable instant, which is why the caller says which it passed.
	 */
	private renderRow(
		when: unknown,
		what: unknown,
		meta: unknown,
		opts?: { when: 'element' },
	) {
		return html`<li class="row" part="label-track">
			${opts?.when === 'element' ? when : html`<span class="row-when">${when}</span>`}
			<span class="row-what">${what}</span>
			<span class="row-meta">${meta}</span>
		</li>`;
	}

	/** A glyph and the name it stands for. The glyph is decorative because the name is right beside it. */
	private glyphName(glyph: string | undefined, name: string) {
		return html`<span aria-hidden="true">${glyph ?? ''}</span>
		<span class="name">${name}</span>`;
	}

	/**
	 * The sky behind the reading (daily only): where the Moon is, what phase it is in, and the transits the forecast was derived from. A daily horoscope that hides its transits is a fortune cookie; showing them is what makes this one auditable.
	 */
	private renderSky(d: HoroscopeData) {
		const moonSign = 'moonSign' in d ? d.moonSign : '';
		const moonPhase = 'moonPhase' in d ? d.moonPhase : '';
		const transits = ('activeTransits' in d ? d.activeTransits : []) ?? [];
		if (!moonSign && !moonPhase && transits.length === 0) return nothing;
		const glyph = signGlyph(moonSign) ?? '';
		return html`<div class="sky" part="section sky">
			${
				moonSign || moonPhase
					? html`<div class="moon-line">
						${
							moonSign
								? html`<span
									><span class="lbl">${this.t('Moon')}</span>
									<span aria-hidden="true">${glyph}</span> <b>${moonSign}</b></span
								>`
								: nothing
						}
						${
							moonPhase
								? html`<span><span class="lbl">${this.t('Phase')}</span> <b>${moonPhase}</b></span>`
								: nothing
						}
					</div>`
					: nothing
			}
			${
				transits.length
					? html`<ul class="transits" aria-label=${this.t('Active transits')}>
						${transits.map((t) => html`<li>${t}</li>`)}
					</ul>`
					: nothing
			}
		</div>`;
	}

	/** Monthly arc: the week-by-week focus and the dated events (lunations, retrogrades, ingresses) the month turns on. */
	private renderMonth(d: HoroscopeData) {
		const weeks = ('weekByWeek' in d ? d.weekByWeek : []) ?? [];
		const keyDates = ('keyDates' in d ? d.keyDates : []) ?? [];
		if (weeks.length === 0 && keyDates.length === 0) return nothing;
		return html`${
			// Each week is a focus phrase and a line of advice, so the block is prose
			// under its own heading and goes whole.
			weeks.length && !this.hideReadings
				? html`<section part="section week-by-week">
					<h3 class="block-title">${this.t('Week by week')}</h3>
					<div class="weeks">
						${weeks.map(
							(w) => html`<div class="week">
								<span class="week-no">${this.t('Week {{n}}', { n: w.week })}</span>
								<div>
									<div class="week-focus">${w.focus}</div>
									${w.advice ? html`<p class="week-advice">${w.advice}</p>` : nothing}
								</div>
							</div>`,
						)}
					</div>
				</section>`
				: nothing
		}
		${
			// Dated lunations, retrogrades and ingresses: the month's ephemeris, not a
			// read of it, so it stays.
			keyDates.length
				? html`<section part="section key-dates">
					<h3 class="block-title">${this.t('Key dates')}</h3>
					<dl class="dates" part="label-track">
						${keyDates.map(
							(k) => html`<div class="date-row">
								<dt>${formatDate(this.effectiveLang(), k.date) || k.date}</dt>
								<dd>${k.event}</dd>
							</div>`,
						)}
					</dl>
				</section>`
				: nothing
		}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-horoscope-card': RoxyHoroscopeCard;
	}
}
