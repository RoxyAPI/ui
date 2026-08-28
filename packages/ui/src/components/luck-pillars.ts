import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculateLuckPillarsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatInteger } from '../utils/format.js';
import {
	frameCaptionStyles,
	renderConventionsCaption,
} from '../utils/frame.js';

/**
 * Luck pillars (Da Yun). Pass `data` from POST /chinese-astrology/bazi/luck-pillars.
 *
 * @remarks
 * The ten-year stretches a BaZi chart is read through, drawn as a strip in the order they are
 * lived, each carrying the stem over the branch, the Ten God the stem holds to the Day Master, and
 * the ages and years it spans. The strip scrolls rather than reflowing, because the sequence IS the
 * reading: a run of pillars in one element is the thing a practitioner looks for, and wrapping the
 * row into a grid destroys it.
 *
 * **The direction and the starting age are not trivia.** Pillars run forward or backward depending
 * on the polarity of the year stem and the sex of the person, and the start age is counted from the
 * birth to the nearest solar term, so two people born days apart can enter their first pillar years
 * apart. The header prints the direction, the starting age to the month, and the term the count was
 * measured to, because a strip that hides them cannot be independently verified.
 *
 * `hide-readings` keeps the whole strip, the annual pillars and the header facts, and drops the
 * summary paragraph and the per-pillar keynote.
 *
 * **This card is English end to end, by decision, on the same grounds as the other
 * Chinese-metaphysics cards**, with the conventions caption as the one shared-helper line that is
 * translated.
 */
@customElement('roxy-luck-pillars')
export class RoxyLuckPillars extends RoxyDataElement<CalculateLuckPillarsResponse> {
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

			/* The strip scrolls rather than wrapping: the sequence is the reading, and a
			 * row broken into a grid stops being one. */
			.strip-wrap {
				overflow-x: auto;
			}
			.strip {
				display: flex;
				gap: var(--roxy-space-sm, 0.5rem);
				min-width: min-content;
			}
			.pillar {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				display: grid;
				gap: 0.2rem;
				align-content: start;
				text-align: center;
				min-width: 6rem;
				flex: 0 0 auto;
			}
			.ages {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				font-variant-numeric: tabular-nums;
			}
			.god {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				min-height: 1.2em;
			}
			.hanzi {
				font-size: 1.75rem;
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
			.years {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}

			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.annuals {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.annual {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: 2px 8px;
				font-size: var(--roxy-text-xs, 0.75rem);
				display: flex;
				gap: 0.35rem;
				align-items: baseline;
			}
			.annual .yr {
				font-variant-numeric: tabular-nums;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.summary {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				line-height: 1.7;
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	protected renderData(d: CalculateLuckPillarsResponse) {
		const locale = this.effectiveLang();
		return html`<article class="card" part="card" aria-labelledby="luck-title">
			<header class="head" part="header">
				<h2 class="title" id="luck-title">Luck pillars</h2>
			</header>

			<div class="facts" part="details">
				${
					d.direction
						? html`<span><span class="lbl">Direction</span><b>${d.direction}</b></span>`
						: nothing
				}
				${
					typeof d.startAge === 'number'
						? html`<span
							><span class="lbl">Starts</span
							><b>${this.ageLabel(locale, d.startAge, d.startAgeMonths)}</b></span
						>`
						: nothing
				}
				${
					d.boundaryTerm
						? html`<span><span class="lbl">Counted to</span>${d.boundaryTerm}</span>`
						: nothing
				}
				${
					typeof d.daysToTerm === 'number'
						? html`<span
							><span class="lbl">Days</span>${formatInteger(locale, d.daysToTerm)}</span
						>`
						: nothing
				}
				${d.gender ? html`<span><span class="lbl">Formula</span>${d.gender}</span>` : nothing}
			</div>

			${this.renderStrip(d, locale)}
			${this.renderAnnuals(d)}

			${
				d.summary && !this.hideReadings
					? html`<p class="summary" part="section summary">${d.summary}</p>`
					: nothing
			}
			${renderConventionsCaption(d.conventions, this.translator)}
		</article>`;
	}

	/** An age given to the month, because the start of the first pillar rarely lands on a birthday. */
	private ageLabel(
		locale: string | undefined,
		years: number,
		months: unknown,
	): string {
		const y = formatInteger(locale, years);
		return typeof months === 'number' && months > 0
			? `${y}y ${formatInteger(locale, months)}m`
			: `${y}y`;
	}

	/** The pillars themselves, in the order they are lived. */
	private renderStrip(
		d: CalculateLuckPillarsResponse,
		locale: string | undefined,
	) {
		const pillars = d.luckPillars ?? [];
		if (pillars.length === 0) return nothing;
		return html`<div class="strip-wrap" part="chart" role="group" tabindex="0" aria-label="Luck pillars">
			<div class="strip">
				${pillars.map(
					(p) => html`<div class="pillar" part="pillar">
						<span class="ages"
							>${formatInteger(locale, p.startAge ?? 0)} to
							${formatInteger(locale, p.endAge ?? 0)}</span
						>
						<span class="god">${p.tenGod?.name ?? ''}</span>
						<span class="hanzi" lang="zh">${p.stem?.chinese ?? ''}</span>
						<span class="romanised"
							>${p.stem?.pinyin ?? ''} ${p.stem?.element ?? ''}</span
						>
						<span class="hanzi hanzi-branch" lang="zh">${p.branch?.chinese ?? ''}</span>
						<span class="romanised"
							>${p.branch?.pinyin ?? ''} ${p.branch?.animal ?? ''}</span
						>
						<span class="years">${p.startYear ?? ''} to ${p.endYear ?? ''}</span>
					</div>`,
				)}
			</div>
		</div>`;
	}

	/** The year-by-year pillars inside the stretch, which is what a reader checks a date against. */
	private renderAnnuals(d: CalculateLuckPillarsResponse) {
		const annuals = d.annualPillars ?? [];
		if (annuals.length === 0) return nothing;
		return html`<section part="section annual-pillars">
			<h3 class="block-title">Annual pillars</h3>
			<div class="annuals">
				${annuals.map(
					(a) => html`<span class="annual">
						<span class="yr">${a.year ?? ''}</span>
						<span lang="zh">${a.tenGod?.chinese ?? ''}</span>
						<span>${a.tenGod?.name ?? ''}</span>
					</span>`,
				)}
			</div>
		</section>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-luck-pillars': RoxyLuckPillars;
	}
}
