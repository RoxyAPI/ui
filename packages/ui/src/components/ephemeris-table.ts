import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { planetGlyph, SIGNS_ORDER, signGlyph } from '../tokens/index.js';
import type {
	GetMonthlyEphemerisResponse,
	GetMonthlyTropicalEphemerisResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { splitDegreeInSign } from '../utils/degree.js';
import {
	formatMonthDay,
	formatMonthYear,
	formatWeekdayDay,
} from '../utils/format.js';
import { display } from '../utils/localized.js';

/**
 * The sample instant every position in both responses is calculated for, printed as a literal rather than a translated phrase.
 *
 * @remarks
 * An ephemeris is unusable without its time basis, which is why every published one declares it in the header: the Astrodienst and Sirius tables print `Time Zone: EDT (04:00 East)`, Astro-Seek prints `00:00 [UT/GMT]` and repeats that literal unchanged in all seven of its localized builds. A clock literal is the same in every language, so this needs no catalogue entry and cannot drift from one.
 *
 * Verified against a published midnight-EDT ephemeris for the same month on 2026-08-10: at 04:00 UTC on 2026-08-01 the Sun reads 8°56'55" Leo (128.949°) and this API returns 129.2669° for that date, a difference of 0.318° against the Sun's 0.955°/day, which is exactly the eight hours from 04:00 to 12:00 UTC. Both endpoint descriptions state noon UTC and the arithmetic agrees with them.
 */
const SAMPLE_INSTANT = '12:00 UTC';

/**
 * The two monthly-ephemeris responses this table renders. Structurally
 * identical: the Western one carries fourteen tropical bodies, the Vedic one
 * the nine sidereal Navagraha, and neither says which frame it is in, so the
 * component never claims one (see the class docblock).
 */
type EphemerisResponse =
	| GetMonthlyTropicalEphemerisResponse
	| GetMonthlyEphemerisResponse;

/** One body on one day, straight off the response. */
type Position = EphemerisResponse['days'][number]['positions'][number];

/** A contiguous stretch of sampled days on which a body is retrograde, clipped to the month. */
interface RetrogradeRun {
	start: string;
	end: string;
}

/** A body crossing into a new sign, dated by the first day the sample shows it there. */
interface Ingress {
	date: string;
	/** Canonical English sign: the glyph lookup keys on this. */
	sign: string;
	/** The sign name a reader sees. */
	signLabel: string;
}

/** One body read along the whole month: where it began, where it ended, and everything that changed in between. */
interface BodyTrack {
	/** Canonical English body name. Every glyph lookup and every column key uses this. */
	name: string;
	/** The body name a reader sees. */
	label: string;
	first: Position;
	last: Position;
	ingresses: Ingress[];
	retrogrades: RetrogradeRun[];
	/** Dates on which this body changed sign, so the daily grid can mark the same cells the chips name. */
	ingressDates: Set<string>;
	/** Dates on which this body was seen to change direction, which a printed ephemeris marks in the column rather than only listing below it. */
	stationDates: Set<string>;
}

/** One day of the grid: the date plus one cell per body, aligned to {@link ViewModel.bodies}. */
interface DayRow {
	date: string;
	cells: Array<Position | undefined>;
}

/** One line of the sign key: the glyph the table prints and the name it stands for. */
interface SignKeyEntry {
	/** Canonical English sign, the glyph lookup key. */
	sign: string;
	/** The sign name a reader sees, in the response language. */
	label: string;
	glyph: string;
}

interface ViewModel {
	year: number;
	month: number;
	bodies: BodyTrack[];
	rows: DayRow[];
	signs: SignKeyEntry[];
}

/**
 * Monthly ephemeris: every body read across a whole month, as the reference
 * table a practitioner works from plus the two things a month view exists to
 * answer.
 *
 * @remarks
 * Renders `POST /astrology/planets/monthly` (fourteen tropical Western bodies)
 * and `POST /vedic-astrology/planetary-positions/monthly` (the nine sidereal
 * Navagraha). One response shape, so one component; nothing selects between
 * them, because the payload is the only honest discriminator and the layout is
 * the same either way.
 *
 * **The grid follows the published ephemeris, which is one of the most
 * convention-bound artifacts in astrology and where a deviation reads as
 * amateurish on sight.** Checked on 2026-08-10 against the Sirius-generated
 * ephemeris for this same month published by Cafe Astrology, and against the
 * Astro-Seek monthly ephemeris: days run DOWN the rows with the weekday beside
 * the day number, bodies run ACROSS the columns headed by their glyphs, a cell
 * is `9♌16` with the sign glyph BETWEEN the degree and the minutes rather than a
 * decimal longitude, retrograde is marked in the cell, and the sign changes and
 * direction changes are listed separately beside the grid, which is what those
 * publications call Ingresses and Stations. One deliberate deviation, and it is
 * additive: a printed ephemeris prints the sign glyph only on the row where it
 * changes, because a reader has the whole page in view. A scrolling table has no
 * such anchor, so every cell carries its glyph and the ingress cell is tinted
 * instead, which makes the same day easier to find rather than harder.
 *
 * **Two blocks, both always in the page, and the order is the reading order.**
 * A month of daily positions is 31 rows by up to 14 bodies, and dumping that
 * alone answers "where was Mars on the 12th" while burying the questions a
 * practitioner actually opens an ephemeris for: when did a body change sign,
 * and when did it turn retrograde. So the derived answer leads. Each body gets
 * one row carrying its position on the first and last sampled day, a chip per
 * sign it entered with the date, and a chip per retrograde stretch. This is also
 * how the published tables separate the Moon, which changes sign every two or
 * three days and would otherwise swamp a single date-ordered ingress list: one
 * row per body puts its thirteen crossings on their own line. Below it, the full
 * daily grid, so every chip can be checked against the day it came from. Neither
 * block is behind a tab or a disclosure, and the grid scrolls inside its own box
 * so a phone never scrolls the page sideways.
 *
 * **Ingresses and retrograde windows are DERIVED from consecutive days, and the
 * grain of the answer is the grain of the sample.** The API returns one
 * position per day at noon UTC, so an ingress is dated to the first day the
 * body is shown in the new sign and a retrograde run to the first and last days
 * it is shown retrograde. The true crossing and the true station fall somewhere
 * in the preceding 24 hours; a month page cannot say where, and pretending to a
 * time the response does not carry would be the worse error. A run that reaches
 * either edge of the month is clipped there rather than extrapolated, so
 * `Retrograde Aug 1 - Aug 31` means what it says: retrograde on every day this
 * month.
 *
 * **No coordinate-system badge, deliberately.** The Western endpoint is always
 * tropical, but the Vedic one takes `coordinateSystem` as a REQUEST parameter
 * (`sidereal` by default, `tropical` on request) and echoes nothing about it in
 * the response, and neither response carries a `frame`. A card cannot label a
 * zodiac it was not told, and a wrong frame label on an ephemeris is worse than
 * none, so the roster of bodies is left to say what it says.
 *
 * `hide-readings` is a no-op here: neither endpoint returns a word of
 * interpretation, so there is nothing to take away.
 */
@customElement('roxy-ephemeris-table')
export class RoxyEphemerisTable extends RoxyDataElement<EphemerisResponse> {
	static styles = [
		baseStyles,
		css`
			/* The daily grid is far wider than any phone, and the scroll box
			 * already contains it: measured in a real theme at 390px that box is
			 * 280px wide around a 970px table and scrolls correctly. The host
			 * still reported a scrollWidth of 955 and handed that to the page, so
			 * the document itself became draggable 595px sideways over empty
			 * space while nothing visible was out of place.
			 *
			 * clip rather than hidden, because clip does not create a scroll
			 * container: the inner box keeps its own scrolling and its focus
			 * ring. Only the inline axis is clipped, so nothing overflowing
			 * downward is affected. Verified on the live page, document
			 * scrollWidth 985 to 390, page no longer scrolls, table still does.
			 *
			 * Deliberately here rather than in the shared base styles. All 63
			 * components would inherit it, and one that paints outside its own
			 * inline box on purpose would be silently cropped. */
			:host {
				overflow-x: clip;
			}
			.wrap {
				width: 100%;
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so a nowrap table wider than the card blows
				 * the column out and drags every sibling with it, clipped on the right. This
				 * is what lets the scroll container inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			header {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				justify-content: space-between;
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}
			.month {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-sm, 0.5rem);
			}
			.basis {
				font-variant-numeric: tabular-nums;
			}
			/* Every direct child of the card is a grid item, and a grid item defaults to
			 * min-width: auto, which is min-content: the section wrapping the scroll box
			 * would take its minimum from the nowrap table inside it and blow straight
			 * past the minmax(0, 1fr) track. Capping the track is not enough on its own,
			 * and this is what makes the scroll container inside actually scroll. */
			.wrap > * {
				min-width: 0;
			}
			h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				color: var(--roxy-muted, #71717a);
			}
			/* Wraps rather than scrolls: it is a reference a reader scans, and a
			 * key hidden behind a horizontal scrollbar helps nobody. */
			.signkey {
				display: flex;
				flex-wrap: wrap;
				gap: 1px 0;
				margin: 0;
				padding: 0;
				list-style: none;
			}
			.signkey-item {
				display: inline-flex;
				align-items: baseline;
				gap: 0.3rem;
				padding: 2px 10px 2px 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				white-space: nowrap;
			}
			.signkey-glyph {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.tracks {
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				gap: 1px;
				background: var(--roxy-border, #e4e4e7);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				overflow: hidden;
			}
			.track {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-sm, 0.5rem);
				padding: 6px var(--roxy-space-sm, 0.5rem);
				background: var(--roxy-surface, #fff);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.body-name {
				display: inline-flex;
				align-items: baseline;
				gap: 0.35rem;
				font-weight: 500;
				min-width: 8.5rem;
			}
			.body-name .glyph {
				color: var(--roxy-accent-ink, #b45309);
				font-size: 1.1em;
			}
			.span {
				display: inline-flex;
				align-items: baseline;
				gap: 0.3rem;
				color: var(--roxy-secondary, #475569);
				font-variant-numeric: tabular-nums;
				white-space: nowrap;
			}
			.arrow {
				color: var(--roxy-muted, #71717a);
			}
			/* The date inside a tinted chip, and NOT --roxy-muted: muted on a
			 * color-mix tint measures 4.33 against the 4.5 AA floor. On a tint the text
			 * takes --roxy-fg or --roxy-secondary and the tint carries the accent. */
			.chip-date {
				color: var(--roxy-secondary, #475569);
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-left: auto;
			}
			.chip {
				display: inline-flex;
				align-items: baseline;
				gap: 0.25rem;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				white-space: nowrap;
			}
			.chip--ingress {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.chip--retro {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
				font-weight: var(--roxy-weight-bold, 600);
			}
			/* A box that scrolls has to be reachable from the keyboard, which is why it
			 * takes a tabindex and therefore needs a visible focus ring of its own. */
			.scroll:focus-visible {
				outline: 2px solid var(--roxy-ring, #f59e0b);
				outline-offset: 2px;
			}
			.scroll {
				overflow-x: auto;
				min-width: 0;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				-webkit-overflow-scrolling: touch;
			}
			table {
				border-collapse: collapse;
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			th,
			td {
				text-align: left;
				padding: 4px 8px;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				white-space: nowrap;
			}
			thead th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 20%, transparent);
			}
			thead th .glyph {
				font-size: 1.15em;
				color: var(--roxy-fg, #0a0a0a);
			}
			/* The date column stays put while the bodies scroll under it, so a row read
			 * halfway across a fourteen-body month still names its own day. It needs an
			 * opaque background or the scrolling cells show through. */
			th.day {
				position: sticky;
				left: 0;
				z-index: 1;
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				font-weight: 500;
				font-variant-numeric: tabular-nums;
				border-right: 1px solid var(--roxy-border, #e4e4e7);
			}
			thead th.day {
				z-index: 2;
				background: var(--roxy-surface, #fff);
			}
			td {
				font-variant-numeric: tabular-nums;
			}
			/* The published-ephemeris form puts the glyph BETWEEN the degree and the
			 * minutes, so it needs a hair of room on both sides and none of the
			 * tabular alignment. */
			.sg {
				color: var(--roxy-secondary, #475569);
				margin: 0 0.15em;
				font-variant-numeric: normal;
			}
			.retro-mark {
				margin-left: 0.25em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			/* Retrograde days carry the mark AND the colour, because a retrograde
			 * stretch is read as a band down a column rather than cell by cell. */
			td.retro {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			td.retro .sg {
				color: inherit;
			}
			/* The two events a month view exists to show are marked on different edges
			 * of the cell on purpose, so a day that is both an ingress and a station can
			 * carry both marks instead of one overwriting the other. */
			td.ingress {
				box-shadow: inset 3px 0 var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			td.station {
				border-top: 2px solid var(--roxy-danger-fg, #991b1b);
				font-weight: var(--roxy-weight-bold, 600);
			}
		`,
	];

	/** Override the card heading. Empty keeps the default, which is translated like every other chrome string. */
	@property({ type: String })
	heading = 'Ephemeris';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">${this.t('No ephemeris data')}</div>`;
	}

	protected renderData(data: EphemerisResponse) {
		if (!data.days?.length) return this.renderEmpty();
		const vm = this.toViewModel(data);
		const locale = this.effectiveLang();
		return html`<div class="wrap" part="card">
			<header part="header">
				<h2 class="title">${this.t(this.heading)}</h2>
				<p class="month">
					<span>${formatMonthYear(locale, vm.year, vm.month)}</span
					><span class="basis">${SAMPLE_INSTANT}</span>
				</p>
			</header>
			${this.renderSignKey(vm.signs)}
			<section part="section changes">
				<h3>${this.t('Sign changes and retrograde periods')}</h3>
				<div class="tracks" role="list">
					${vm.bodies.map((b) => this.renderTrack(b))}
				</div>
			</section>
			<section part="section daily">
				<h3>${this.t('Daily positions')}</h3>
				<!-- No role: two of these on one page would be two landmarks sharing a
				name. A focusable box needs a name and keyboard reach, not a landmark. -->
				<div
					class="scroll"
					part="table"
					aria-label=${this.t('Daily positions')}
					tabindex="0"
				>
					${this.renderGrid(vm)}
				</div>
			</section>
		</div>`;
	}

	/**
	 * The glyph-to-name key, above the table it explains.
	 *
	 * @remarks
	 * Every position in this component prints its sign as a glyph, which is how a
	 * printed ephemeris prints one and is unreadable to somebody still learning
	 * them. The name rides on each cell's `title`, and a title is a hover: it does
	 * not exist on touch and it cannot be read down a column. A key that names all
	 * of them once is the form the page actually needed.
	 *
	 * `part="section legend"` rather than a name of its own, because a page hiding
	 * legends should hide this one too and the vocabulary is shared across every
	 * component.
	 */
	private renderSignKey(signs: SignKeyEntry[]) {
		if (signs.length === 0) return nothing;
		return html`<section part="section legend">
			<h3>${this.t('Signs in this month')}</h3>
			<ul class="signkey" role="list">
				${signs.map(
					(s) => html`<li class="signkey-item">
						<span class="signkey-glyph" aria-hidden="true">${s.glyph}</span>${s.label}
					</li>`,
				)}
			</ul>
		</section>`;
	}

	/** One body across the month: where it started, where it ended, and every change in between. */
	private renderTrack(b: BodyTrack) {
		const glyph = planetGlyph(b.name);
		return html`<div class="track" role="listitem">
			<span class="body-name">
				${glyph ? html`<span class="glyph" aria-hidden="true">${glyph}</span>` : nothing}${b.label}
			</span>
			<span class="span">
				${this.renderPosition(b.first)}<span class="arrow" aria-hidden="true">&rarr;</span>${this.renderPosition(b.last)}
			</span>
			${
				b.ingresses.length || b.retrogrades.length
					? html`<span class="chips">
						${b.ingresses.map((i) => this.renderIngressChip(i))}
						${b.retrogrades.map((r) => this.renderRetrogradeChip(r))}
					</span>`
					: nothing
			}
		</div>`;
	}

	/**
	 * A longitude the way a published ephemeris prints one: `9♌16`, degree then
	 * sign then minutes. The sign name rides on the `title` for a reader who does
	 * not read glyphs, and it is the localized half.
	 */
	private renderPosition(p: Position) {
		const { degree, minute } = splitDegreeInSign(p.degreeInSign);
		const g = signGlyph(p.sign);
		const label = display(p, 'sign');
		return html`<span class="pos" title=${label}
			>${degree}${
				g
					? html`<span class="sg" aria-hidden="true">${g}</span>`
					: html`<span class="sg">${label}</span>`
			}${String(minute).padStart(2, '0')}</span
		>`;
	}

	private renderIngressChip(i: Ingress) {
		const g = signGlyph(i.sign);
		const date = formatMonthDay(this.effectiveLang(), i.date);
		return html`<span
			class="chip chip--ingress"
			aria-label=${this.t('Enters {{sign}} on {{date}}', { sign: i.signLabel, date })}
			><span aria-hidden="true">&rarr;</span>${g ? html`<span aria-hidden="true">${g}</span>` : nothing}${i.signLabel}
			<span class="chip-date">${date}</span></span
		>`;
	}

	private renderRetrogradeChip(r: RetrogradeRun) {
		const locale = this.effectiveLang();
		const start = formatMonthDay(locale, r.start);
		const end = formatMonthDay(locale, r.end);
		const range = start === end ? start : `${start} - ${end}`;
		return html`<span class="chip chip--retro"
			><span aria-hidden="true">&#8478;</span>${this.t('Retrograde {{range}}', { range })}</span
		>`;
	}

	/** The reference ephemeris: one row per day, one column per body, in the order the response lists them. */
	private renderGrid(vm: ViewModel) {
		const locale = this.effectiveLang();
		return html`<table>
			<caption class="roxy-sr-only">
				${this.t('Every body with its position on each day of the month, as a zodiac sign and a degree.')}
			</caption>
			<thead>
				<tr>
					<th scope="col" class="day">${this.t('Date')}</th>
					${vm.bodies.map((b) => {
						const glyph = planetGlyph(b.name);
						return html`<th scope="col" title=${b.label}>
							${
								glyph
									? html`<span class="glyph" aria-hidden="true">${glyph}</span
											><span class="roxy-sr-only">${b.label}</span>`
									: b.label
							}
						</th>`;
					})}
				</tr>
			</thead>
			<tbody>
				${vm.rows.map(
					(row) => html`<tr>
						<th scope="row" class="day">${formatWeekdayDay(locale, row.date)}</th>
						${row.cells.map((cell, i) => this.renderCell(cell, vm.bodies[i], row.date))}
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	private renderCell(
		cell: Position | undefined,
		body: BodyTrack | undefined,
		date: string,
	) {
		if (!cell) return html`<td>&mdash;</td>`;
		const classes = [
			cell.isRetrograde ? 'retro' : '',
			body?.ingressDates.has(date) ? 'ingress' : '',
			body?.stationDates.has(date) ? 'station' : '',
		]
			.filter(Boolean)
			.join(' ');
		return html`<td class=${classes}>
			${this.renderPosition(cell)}${
				cell.isRetrograde
					? html`<span class="retro-mark" aria-label=${this.t('retrograde')}>&#8478;</span>`
					: nothing
			}
		</td>`;
	}

	/**
	 * Walk the month once, keying every body on its canonical English name.
	 *
	 * @remarks
	 * The column order is the order the response lists bodies on its first day,
	 * which is the order each domain reads them in (Sun through Pluto then the
	 * nodes, Chiron and Black Moon Lilith for the Western set; the Navagraha in
	 * vara order for the Vedic one). A body that only appears on a later day is
	 * appended rather than dropped, and a body missing from a given day leaves
	 * that one cell empty instead of shifting the row.
	 */
	private toViewModel(data: EphemerisResponse): ViewModel {
		const order: string[] = [];
		const series = new Map<string, Array<{ date: string; p: Position }>>();
		for (const day of data.days) {
			for (const p of day.positions) {
				let samples = series.get(p.planet);
				if (!samples) {
					samples = [];
					series.set(p.planet, samples);
					order.push(p.planet);
				}
				samples.push({ date: day.date, p });
			}
		}

		const bodies: BodyTrack[] = [];
		for (const name of order) {
			const samples = series.get(name);
			const first = samples?.[0];
			const last = samples?.[samples.length - 1];
			if (!samples || !first || !last) continue;
			const ingresses: Ingress[] = [];
			const retrogrades: RetrogradeRun[] = [];
			const ingressDates = new Set<string>();
			const stationDates = new Set<string>();
			for (let i = 0; i < samples.length; i++) {
				const cur = samples[i];
				const prev = samples[i - 1];
				if (!cur) continue;
				if (prev && cur.p.sign !== prev.p.sign) {
					ingresses.push({
						date: cur.date,
						sign: cur.p.sign,
						signLabel: display(cur.p, 'sign'),
					});
					ingressDates.add(cur.date);
				}
				// A direction change is only observable against a previous day, so a
				// body that is already retrograde on the first of the month stationed
				// before this page begins and is not marked as stationing on it.
				if (prev && cur.p.isRetrograde !== prev.p.isRetrograde)
					stationDates.add(cur.date);
				if (!cur.p.isRetrograde) continue;
				// Extend the run in progress only when yesterday was retrograde too, so
				// a body that stations twice in one month gets two chips rather than one
				// spanning the direct stretch between them.
				const open = retrogrades[retrogrades.length - 1];
				if (open && prev?.p.isRetrograde) open.end = cur.date;
				else retrogrades.push({ start: cur.date, end: cur.date });
			}
			bodies.push({
				name,
				label: display(last.p, 'planet'),
				first: first.p,
				last: last.p,
				ingresses,
				retrogrades,
				ingressDates,
				stationDates,
			});
		}

		const rows: DayRow[] = data.days.map((day) => {
			const byName = new Map(day.positions.map((p) => [p.planet, p]));
			return { date: day.date, cells: bodies.map((b) => byName.get(b.name)) };
		});
		return {
			year: data.year,
			month: data.month,
			bodies,
			rows,
			signs: this.toSignKey(data),
		};
	}

	/**
	 * The signs this month's table actually prints, in zodiacal order.
	 *
	 * @remarks
	 * Read from the response rather than from the twelve-sign constant, so the key
	 * explains the glyphs ON THIS PAGE and nothing else. In practice the Moon
	 * crosses every sign in a month, so a full month lists all twelve anyway; a
	 * partial range lists only what it contains, which is the point.
	 *
	 * The label is the API's own localized sign name, taken the same way every
	 * other sign name in this component is taken. Translating it here instead
	 * would put a second vocabulary on the page and let the key disagree with the
	 * cells it explains.
	 *
	 * Ordered by {@link SIGNS_ORDER} because first-seen order is the order the
	 * bodies happen to sit in on the first of the month, which is meaningless to a
	 * reader learning the glyphs.
	 */
	private toSignKey(data: EphemerisResponse): SignKeyEntry[] {
		const labels = new Map<string, string>();
		for (const day of data.days) {
			for (const p of day.positions) {
				const key = String(p.sign ?? '').toLowerCase();
				if (key && !labels.has(key)) labels.set(key, display(p, 'sign'));
			}
		}
		const out: SignKeyEntry[] = [];
		for (const sign of SIGNS_ORDER) {
			const label = labels.get(sign.toLowerCase());
			const glyph = signGlyph(sign);
			if (label && glyph) out.push({ sign, label, glyph });
		}
		return out;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-ephemeris-table': RoxyEphemerisTable;
	}
}
