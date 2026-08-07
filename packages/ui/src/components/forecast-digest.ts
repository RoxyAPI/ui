import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { GenerateDigestResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatNumber } from '../utils/format.js';
import { humanize } from '../utils/string.js';

type DigestWindow = NonNullable<GenerateDigestResponse['windows']>[number];
type DigestEvent = NonNullable<DigestWindow['top']>[number];

/**
 * Forecast digest: the rolled-up reading across the next 24 hours, 7, 30, and 90 days. Renders /forecast/digest. Each window shows how many events fall in it, a per-domain breakdown (western, vedic, biorhythm), and the few highest-significance events with a significance bar coloured by domain. Use it as the at-a-glance period summary that pairs with the day-by-day roxy-forecast-timeline.
 *
 * @remarks
 * What a digest is for survives `hide-readings` intact: the windows, their event counts, the per-domain breakdown, every event date and the significance ranking. Only the written `description` goes, and each row falls back to the component's existing type label rather than emptying out. This is the one accepted cost here, and it is deliberate: unlike the timeline, a digest row carries no structured headline beside the sentence, so hiding the prose costs the bodies involved. The counts above it, which is what the card is read for, do not move.
 */
@customElement('roxy-forecast-digest')
export class RoxyForecastDigest extends RoxyDataElement<GenerateDigestResponse> {
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
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			.window {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
				padding-top: var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			.window:first-of-type {
				border-top: none;
				padding-top: 0;
			}
			.window-head {
				display: flex;
				align-items: baseline;
				gap: 0.5rem;
				flex-wrap: wrap;
			}
			.window-label {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.window-count {
				margin-left: auto;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.domains {
				display: flex;
				flex-wrap: wrap;
				gap: 0.4rem;
			}
			.domain-chip {
				display: inline-flex;
				align-items: center;
				gap: 0.35rem;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.swatch {
				width: 0.65rem;
				height: 0.65rem;
				border-radius: 2px;
				display: inline-block;
			}
			.sw-western {
				background: var(--roxy-accent, #f59e0b);
			}
			.sw-vedic {
				background: var(--roxy-info, #2563eb);
			}
			.sw-biorhythm {
				background: var(--roxy-success, #16a34a);
			}
			.event {
				display: grid;
				grid-template-columns: auto 1fr;
				gap: 0.25rem 0.6rem;
				align-items: baseline;
			}
			.event-date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				white-space: nowrap;
			}
			.event-desc {
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.4;
			}
			.sig {
				grid-column: 2;
				height: 4px;
				border-radius: 2px;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				overflow: hidden;
			}
			.sig-fill {
				display: block;
				height: 100%;
				border-radius: 2px;
			}
			.sig-fill.western {
				background: var(--roxy-accent, #f59e0b);
			}
			.sig-fill.vedic {
				background: var(--roxy-info, #2563eb);
			}
			.sig-fill.biorhythm {
				background: var(--roxy-success, #16a34a);
			}
			.quiet {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-style: italic;
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No digest data</div>`;
	}

	protected renderData(d: GenerateDigestResponse) {
		const windows = d.windows ?? [];
		if (windows.length === 0) return this.renderEmpty();
		const range = [formatDate(d.startDate), formatDate(d.endDate)]
			.filter(Boolean)
			.join(' – ');

		return html`<div class="wrap" part="card" aria-label="Forecast digest">
			<div class="head" part="header">
				<h2 class="title">Forecast digest</h2>
				${range ? html`<p class="subtitle">${range}</p>` : nothing}
			</div>
			${windows.map((w) => this.renderWindow(w))}
		</div>`;
	}

	private windowLabel(days: number | undefined): string {
		if (days === 1) return 'Next 24 hours';
		return typeof days === 'number' ? `Next ${days} days` : 'Window';
	}

	private renderWindow(w: DigestWindow) {
		// The window is a ranked summary, so the strongest event must lead. The
		// payload order is by domain and then by date within it, which put a
		// significance 30 event above a significance 90 one and made the bars
		// read as noise. Sorted copy: never mutate the array we were handed.
		const top = [...(w.top ?? [])].sort(
			(a, b) => (b.significance ?? 0) - (a.significance ?? 0),
		);
		const byDomain = w.byDomain ?? {};
		const domains = Object.entries(byDomain) as Array<[string, number]>;
		return html`<section class="window" part="section window">
			<div class="window-head" part="details">
				<span class="window-label">${this.windowLabel(w.days)}</span>
				<span class="window-count">${w.count ?? 0} event${w.count === 1 ? '' : 's'}</span>
			</div>
			${
				domains.length > 0
					? html`<div class="domains" part="legend">
						${domains.map(
							([dom, n]) => html`<span class="domain-chip">
								<span class="swatch sw-${dom}"></span>${humanize(dom)} ${n}
							</span>`,
						)}
					</div>`
					: nothing
			}
			${
				top.length > 0
					? html`<div role="list">${top.map((e) => this.renderEvent(e))}</div>`
					: html`<p class="quiet">No notable events.</p>`
			}
		</section>`;
	}

	private renderEvent(e: DigestEvent) {
		const sig = typeof e.significance === 'number' ? e.significance : 0;
		// Hiding the readings reuses the shape a description-less event already
		// renders in, rather than inventing a second headline builder or leaving the
		// row blank.
		const label =
			this.hideReadings || e.description == null
				? humanize(e.type ?? '')
				: e.description;
		return html`<div class="event" role="listitem">
			<span class="event-date">${formatDate(e.date)}</span>
			<span class="event-desc">${label}</span>
			<span class="sig" role="img" aria-label="significance ${formatNumber(sig, 0)} of 100">
				<span class="sig-fill ${e.domain}" style="width:${Math.max(0, Math.min(100, sig))}%"></span>
			</span>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-forecast-digest': RoxyForecastDigest;
	}
}
