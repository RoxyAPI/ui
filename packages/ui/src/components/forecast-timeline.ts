import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { aspectSymbol } from '../tokens/index.js';
import type {
	FindSignificantDatesResponse,
	ForecastTransitsResponse,
	GenerateTimelineResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	ASPECT_CLASS,
	formatAspectName,
	formatDate,
	formatNumber,
	normalizeAspect,
} from '../utils/format.js';
import { capitalize, humanize } from '../utils/string.js';

/** Timeline, significant-dates, and forecast-transits all return the same `{ events, startDate, endDate, birthData, count }` shape. */
type ForecastTimelineData =
	| GenerateTimelineResponse
	| FindSignificantDatesResponse
	| ForecastTransitsResponse;

type ForecastEvent = GenerateTimelineResponse['events'][number];
type ForecastDomain = ForecastEvent['domain'];

/**
 * Display label per forecast domain. Keyed by the spec `domain` union so a new
 * domain in the spec surfaces as a typecheck failure here rather than an
 * unlabeled swatch.
 */
const DOMAIN_LABEL: Record<ForecastDomain, string> = {
	western: 'Western',
	vedic: 'Vedic',
	biorhythm: 'Biorhythm',
};

const DOMAIN_ORDER: readonly ForecastDomain[] = [
	'western',
	'vedic',
	'biorhythm',
];

/**
 * Cross-domain forecast timeline. Pass `data` from /forecast/timeline. Events
 * are grouped by calendar date down a vertical axis, each colored by its domain
 * and weighted by significance (0-100), showing the event type, body, target,
 * aspect, and description. The visual language matches the dasha timeline: a
 * left rail of dates, a significance bar per event, and a colored marker for
 * the domain.
 *
 * Theming flows through `--roxy-*` custom properties on `:host`.
 *
 * @remarks
 * `hide-readings` drops only `description`. Every event keeps its date, its domain marker, its significance bar and the headline built from the structured `body`, `aspect`, `target` and `orb`, so nothing factual is lost: the sentence restates that headline in prose, which is exactly the report a page supplying its own words does not want repeated under every row.
 */
@customElement('roxy-forecast-timeline')
export class RoxyForecastTimeline extends RoxyDataElement<ForecastTimelineData> {
	static styles = [
		baseStyles,
		css`
			.wrap {
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
				justify-content: space-between;
				align-items: baseline;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.range {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-variant-numeric: tabular-nums;
			}
			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.legend .swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}
			.swatch-western {
				background: var(--roxy-accent, #f59e0b);
			}
			.swatch-vedic {
				background: var(--roxy-info, #2563eb);
			}
			.swatch-biorhythm {
				background: var(--roxy-success, #16a34a);
			}

			.day {
				display: grid;
				grid-template-columns: 4.5rem 1fr;
				gap: var(--roxy-space-md, 1rem);
				padding-block: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			.day:first-of-type {
				border-top: none;
			}
			.day-date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				padding-top: 2px;
			}
			.events {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.event {
				display: grid;
				grid-template-columns: 0.6rem 1fr;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: start;
			}
			.dot {
				width: 0.6rem;
				height: 0.6rem;
				border-radius: 50%;
				margin-top: 4px;
			}
			.dot-western {
				background: var(--roxy-accent, #f59e0b);
			}
			.dot-vedic {
				background: var(--roxy-info, #2563eb);
			}
			.dot-biorhythm {
				background: var(--roxy-success, #16a34a);
			}
			.event-body {
				min-width: 0;
			}
			.event-line {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.event-line .aspect-trine,
			.event-line .aspect-sextile {
				color: var(--roxy-success-fg, #166534);
			}
			.event-line .aspect-square,
			.event-line .aspect-opposition {
				color: var(--roxy-danger-fg, #991b1b);
			}
			.event-line .aspect-conjunction {
				color: var(--roxy-accent-ink, #b45309);
			}
			.event-line .kind {
				margin-left: 0.35em;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.04em;
			}
			.event-desc {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				margin: 2px 0 0;
			}
			.sig {
				display: flex;
				align-items: center;
				gap: 0.4rem;
				margin-top: 4px;
			}
			.sig-track {
				flex: 1;
				max-width: 8rem;
				height: 4px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.sig-fill {
				display: block;
				height: 100%;
				border-radius: var(--roxy-radius-full, 9999px);
			}
			.sig-fill-western {
				background: var(--roxy-accent, #f59e0b);
			}
			.sig-fill-vedic {
				background: var(--roxy-info, #2563eb);
			}
			.sig-fill-biorhythm {
				background: var(--roxy-success, #16a34a);
			}
			.sig-val {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
		`,
	];

	protected renderData(d: ForecastTimelineData) {
		const events = d.events ?? [];
		const grouped = this.groupByDate(events);
		const present = DOMAIN_ORDER.filter((dom) =>
			events.some((e) => e.domain === dom),
		);

		return html`<div class="wrap" part="card" aria-label="Forecast timeline">
			<header class="head" part="header">
				<h2 class="title">Forecast timeline</h2>
				${
					d.startDate && d.endDate
						? html`<div class="range">
							${formatDate(this.effectiveLang(), d.startDate)} - ${formatDate(this.effectiveLang(), d.endDate)} · ${d.count ?? events.length} events
						</div>`
						: nothing
				}
			</header>
			${
				present.length
					? html`<div class="legend" part="legend">
						${present.map(
							(dom) =>
								html`<span><span class="swatch swatch-${dom}"></span>${DOMAIN_LABEL[dom]}</span>`,
						)}
					</div>`
					: nothing
			}
			${
				grouped.length
					? html`<div class="days" part="section events" role="list">
						${grouped.map(([date, dayEvents]) => this.renderDay(date, dayEvents))}
					</div>`
					: html`<p class="roxy-empty" role="status">No events in this window</p>`
			}
		</div>`;
	}

	/** Group events by their calendar date, preserving response order. */
	private groupByDate(
		events: ForecastEvent[],
	): Array<[string, ForecastEvent[]]> {
		const map = new Map<string, ForecastEvent[]>();
		for (const e of events) {
			const key = e.date ?? '';
			const list = map.get(key) ?? [];
			list.push(e);
			map.set(key, list);
		}
		return [...map.entries()];
	}

	private renderDay(date: string, events: ForecastEvent[]) {
		return html`<div class="day" role="listitem">
			<div class="day-date">${formatDate(this.effectiveLang(), date)}</div>
			<div class="events">
				${events.map((e) => this.renderEvent(e))}
			</div>
		</div>`;
	}

	private renderEvent(e: ForecastEvent) {
		const sig = typeof e.significance === 'number' ? e.significance : 0;
		const width = Math.max(0, Math.min(100, sig));
		return html`<div class="event">
			<span class="dot dot-${e.domain}" aria-hidden="true"></span>
			<div class="event-body">
				<div class="event-line">${this.renderHeadline(e)}</div>
				${
					// The headline above already carries the bodies, the aspect and the orb
					// from the structured fields, so this sentence is the written read of a
					// row that stays complete without it.
					e.description && !this.hideReadings
						? html`<p class="event-desc">${e.description}</p>`
						: nothing
				}
				<div class="sig" title="Significance ${width} of 100">
					<span class="sig-track">
						<span class="sig-fill sig-fill-${e.domain}" style="width: ${width}%"></span>
					</span>
					<span class="sig-val">${width}</span>
				</div>
			</div>
		</div>`;
	}

	/**
	 * Compact event headline built from the spec fields. Transit aspects read
	 * "body aspect target"; ingresses, stations, eclipses, dasha changes, and
	 * critical days fall back to "body" plus the qualifier the spec carries for
	 * that type (station direction, eclipse kind). The aspect symbol is colored
	 * by nature, matching the chart aspect encoding.
	 */
	private renderHeadline(e: ForecastEvent) {
		const body = e.body ? capitalize(e.body) : '';
		const target = e.target ? capitalize(e.target) : '';
		const aspect = normalizeAspect({ type: e.aspect });
		const aspectClass = ASPECT_CLASS[aspect] ?? '';
		const aspectSym = aspect
			? (aspectSymbol(e.aspect) ?? formatAspectName({ type: e.aspect }))
			: '';
		const orb =
			typeof e.orb === 'number'
				? formatNumber(this.effectiveLang(), e.orb, 1)
				: '';
		const qualifier = this.typeQualifier(e);

		if (aspect && target) {
			return html`<strong>${body}</strong>
				<span class=${aspectClass}>${aspectSym}</span>
				<strong>${target}</strong>${orb ? html` <span class="kind">orb ${orb}°</span>` : nothing}`;
		}
		return html`<strong>${body || humanize(e.type ?? '')}</strong>${
			qualifier ? html` <span class="kind">${qualifier}</span>` : nothing
		}`;
	}

	/** Type-specific qualifier text from the optional spec fields. */
	private typeQualifier(e: ForecastEvent): string {
		if (e.type === 'sign-ingress' && e.target)
			return `enters ${capitalize(e.target)}`;
		if (e.type === 'retrograde-station' && e.station) return e.station;
		if (e.type === 'eclipse')
			return [e.kind, 'eclipse'].filter(Boolean).join(' ');
		if (e.type === 'critical-day') return 'critical day';
		if (e.type === 'dasha-change' && e.target)
			return `dasha ${capitalize(e.target)}`;
		return humanize(e.type ?? '');
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-forecast-timeline': RoxyForecastTimeline;
	}
}
