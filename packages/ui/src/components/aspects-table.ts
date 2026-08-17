import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { planetGlyph } from '../tokens/index.js';
import type {
	CalculateAspectsResponse,
	CalculateTransitAspectsResponse,
	DetectAspectPatternsResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import {
	formatAspectName,
	formatDate,
	formatNumber,
	formatPercent,
} from '../utils/format.js';
import {
	interpAccordionStyles,
	renderReadingDetail,
} from '../utils/interp-accordion.js';

/**
 * Natal + transit aspect grid with chart-pattern detection. Renders three endpoints that share an aspects/patterns shape: /astrology/aspects (natal aspects + patterns + a harmonious/challenging summary), /astrology/transit-aspects (transiting-to-natal aspects with timing guidance), and /astrology/aspect-patterns (patterns only: grand trines, t-squares, stelliums, yods, kites). Each aspect row shows the two bodies, the aspect type coloured by nature, its orb and strength, and an expandable interpretation; patterns render as labelled cards listing the planets they bind, apex first.
 */
type AspectsData =
	| CalculateAspectsResponse
	| CalculateTransitAspectsResponse
	| DetectAspectPatternsResponse;

type PatternEntry = NonNullable<
	DetectAspectPatternsResponse['patterns']
>[number];

/**
 * One line naming the orb budget and the body set a pattern run used, so a reader can reproduce the detection. Built as a string, not a template: interpolating the clauses in markup leaves a space before the comma.
 */
function provenance(o: NonNullable<DetectAspectPatternsResponse['options']>) {
	const orbs = o.strictOrbs ? 'strict' : 'industry-standard';
	const bodies = o.include?.length
		? `including ${o.include.join(' and ')}`
		: 'classical bodies only';
	return `Detected with ${orbs} orbs, ${bodies}.`;
}

/** Reading order for detected configurations: the rare, chart-defining figures first, then by tightness. Mirrors `roxy-natal-chart`, which renders the same `patterns` shape. */
const PATTERN_ORDER: Record<string, number> = {
	GRAND_CROSS: 0,
	GRAND_TRINE: 1,
	KITE: 2,
	T_SQUARE: 3,
	YOD: 4,
	MYSTIC_RECTANGLE: 5,
	STELLIUM: 6,
};

@customElement('roxy-aspects-table')
export class RoxyAspectsTable extends RoxyDataElement<AspectsData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
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
			.summary-pills {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.pill {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				padding: 2px var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				border: 1px solid currentColor;
			}
			.pill--muted {
				color: var(--roxy-fg, #0a0a0a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
			}
			.pill--success {
				color: var(--roxy-success-fg, #166534);
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 10%, transparent);
			}
			.pill--danger {
				color: var(--roxy-danger-fg, #991b1b);
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
			}
			.section-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
			}
			/* The aspect header is glyphs, a nature badge, and a numeric meta rail,
			 * not the label/aside pair that interp-lead assumes, so the summary wraps
			 * as a row and the meta claims the free space with margin-left: auto.
			 * Everything else (card frame, body, chevron order) is the shared rule. */
			.interp-card summary {
				flex-wrap: wrap;
				gap: 0.5em;
			}
			.interp-card summary .meta {
				color: var(--roxy-muted, #71717a);
				font-weight: 400;
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: auto;
				font-variant-numeric: tabular-nums;
			}
			.static-head {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0.5em;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 500;
			}
			.glyph {
				font-size: 1.1em;
				line-height: 1;
			}
			.nature-badge {
				display: inline-block;
				padding: 1px 8px;
				border-radius: 9999px;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
				text-transform: capitalize;
			}
			.nature-badge.harmonious {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.nature-badge.challenging {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.nature-badge.neutral {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.pattern {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
				display: grid;
				gap: 0.35rem;
			}
			.pattern-head {
				display: flex;
				align-items: baseline;
				gap: 0.5rem;
				flex-wrap: wrap;
			}
			.pattern-name {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.pattern-tag {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				text-transform: capitalize;
			}
			.pattern-planets {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
			}
			.planet-chip {
				display: inline-flex;
				align-items: baseline;
				gap: 0.3rem;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			/* The apex is where the configuration discharges, so it leads the chip
			 * row and carries the accent tint. Text stays --roxy-fg: accent-ink on a
			 * tinted chip fails AA. */
			.planet-chip.apex {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 20%, transparent);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.planet-chip .apex-tag {
				font-size: 0.85em;
				font-weight: 400;
				text-transform: uppercase;
				letter-spacing: 0.04em;
			}
			.pattern-tight {
				margin-left: auto;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.pattern-interp {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.45;
				margin: 0;
			}
			.strongest {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: 0.4rem;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.strongest .label {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.strongest .meta {
				margin-left: auto;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.provenance {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				margin: 0;
			}
		`,
	];

	protected renderData(d: AspectsData) {
		const aspects = 'aspects' in d ? (d.aspects ?? []) : [];
		const patterns = 'patterns' in d ? (d.patterns ?? []) : [];
		const summary = 'summary' in d ? d.summary : undefined;
		if (aspects.length === 0 && patterns.length === 0)
			return this.renderEmpty();

		// Natal aspects date the chart, transits date the sky.
		const date = formatDate(
			this.effectiveLang(),
			'transitDate' in d ? d.transitDate : 'date' in d ? d.date : '',
		);
		const options = 'options' in d ? d.options : undefined;

		return html`<div class="wrap" part="card" aria-label=${this.t('Aspects')}>
			<div class="head" part="header">
				<h2 class="title">${aspects.length === 0 ? this.t('Chart patterns') : this.t('Aspects')}</h2>
				${
					aspects.length > 0 || date
						? html`<p class="subtitle">
							${[
								aspects.length > 0
									? `${aspects.length} aspect${aspects.length === 1 ? '' : 's'}`
									: '',
								date,
							]
								.filter(Boolean)
								.join(' · ')}
						</p>`
						: nothing
				}
			</div>
			${summary ? this.renderSummary(summary) : nothing}
			${summary && 'strongest' in summary && summary.strongest ? this.renderStrongest(summary.strongest) : nothing}
			${
				aspects.length > 0
					? html`<div role="list" part="section aspects" aria-label=${this.t('Aspect list')}>
						${aspects.map((a, i) => this.renderAspect(a, i))}
					</div>`
					: nothing
			}
			${
				patterns.length > 0
					? html`<div part="section patterns">
						<p class="section-label">${this.t('Patterns')}</p>
						${[...patterns]
							.sort(
								(a, b) =>
									(PATTERN_ORDER[a.kind] ?? 9) - (PATTERN_ORDER[b.kind] ?? 9) ||
									(b.tightness ?? 0) - (a.tightness ?? 0),
							)
							.map((p) => this.renderPattern(p))}
					</div>`
					: nothing
			}
			${options ? html`<p class="provenance">${provenance(options)}</p>` : nothing}
		</div>`;
	}

	private renderSummary(
		s:
			| NonNullable<CalculateAspectsResponse['summary']>
			| NonNullable<CalculateTransitAspectsResponse['summary']>,
	) {
		const total = 'totalAspects' in s ? s.totalAspects : s.total;
		// byType is a map, not a list: render the pairs, never the object.
		const byType = Object.entries(s.byType ?? {}).sort((a, b) => b[1] - a[1]);
		return html`<div class="summary-pills" part="details" role="region" aria-label=${this.t('Aspect summary')}>
			${typeof total === 'number' ? html`<span class="pill pill--muted">${this.t('Total')}: ${total}</span>` : nothing}
			<span class="pill pill--success">${this.t('Harmonious')}: ${s.harmonious}</span>
			<span class="pill pill--danger">${this.t('Challenging')}: ${s.challenging}</span>
			<span class="pill pill--muted">${this.t('Neutral')}: ${s.neutral}</span>
			${byType.map(
				([type, count]) =>
					html`<span class="pill pill--muted">${formatAspectName({ type })}: ${count}</span>`,
			)}
		</div>`;
	}

	/**
	 * The tightest transit by orb: the one aspect the client is most likely to
	 * feel today. Lifted out of the list so it is not buried among the rest.
	 */
	private renderStrongest(
		s: NonNullable<
			NonNullable<CalculateTransitAspectsResponse['summary']>['strongest']
		>,
	) {
		const g1 = planetGlyph(s.planet1) ?? '';
		const g2 = planetGlyph(s.planet2) ?? '';
		const nature = (s.interpretation ?? 'neutral').toLowerCase();
		return html`<div class="strongest" part="details strongest">
			<span class="label">${this.t('Strongest')}</span>
			<span aria-hidden="true" class="glyph">${g1}</span>${s.planet1}
			<span class="nature-badge ${nature}">${formatAspectName(s)}</span>
			<span aria-hidden="true" class="glyph">${g2}</span>${s.planet2}
			<span class="meta">${this.t(
				'{{status}} · orb {{orb}}° · str {{strength}}',
				{
					status: s.isApplying ? this.t('Applying') : this.t('Separating'),
					orb: formatNumber(this.effectiveLang(), s.orb, 2),
					strength: formatNumber(this.effectiveLang(), s.strength, 0),
				},
			)}</span>
		</div>`;
	}

	private renderAspect(
		a:
			| NonNullable<CalculateAspectsResponse['aspects']>[number]
			| NonNullable<CalculateTransitAspectsResponse['aspects']>[number],
		idx: number,
	) {
		const g1 = planetGlyph(a.planet1) ?? '';
		const g2 = planetGlyph(a.planet2) ?? '';
		const nature = (a.interpretation ?? 'neutral').toLowerCase();
		const type = formatAspectName(a);
		const status = a.isApplying ? this.t('Applying') : this.t('Separating');
		// Natal aspects carry `meaning` (static aspect lore); transits carry `transitInterpretation` (timed guidance).
		const meaning = 'meaning' in a ? a.meaning : undefined;
		const transit =
			'transitInterpretation' in a ? a.transitInterpretation : undefined;
		const hasBody = Boolean(meaning || transit);
		const header = html`<span aria-hidden="true" class="glyph">${g1}</span>${a.planet1}
			<span class="nature-badge ${nature}">${type}</span>
			<span aria-hidden="true" class="glyph">${g2}</span>${a.planet2}
			<span class="meta">${this.t(
				'{{status}} · orb {{orb}}° · str {{strength}}',
				{
					status,
					orb: formatNumber(this.effectiveLang(), a.orb, 2),
					strength: formatNumber(this.effectiveLang(), a.strength, 0),
				},
			)}</span>`;
		// The header is the aspect itself (both bodies, the type, applying or
		// separating, orb and strength) and is never a reading, so an aspect the
		// API sent no meaning for already renders flat. Hiding the readings reuses
		// that shape rather than dropping the row.
		if (!hasBody || this.hideReadings) {
			return html`<div class="interp-card" part="reading" role="listitem">
				<div class="static-head">${header}</div>
			</div>`;
		}
		return html`<details class="interp-card" part="reading" role="listitem" name="aspects" ?open=${idx === 0}>
			<summary>${header}${chevron()}</summary>
			<div class="interp-body">
				${meaning ? this.renderMeaning(meaning) : nothing}
				${transit ? this.renderTransit(transit) : nothing}
			</div>
		</details>`;
	}

	private renderMeaning(
		m: NonNullable<
			NonNullable<CalculateAspectsResponse['aspects']>[number]['meaning']
		>,
	) {
		const text = m.description?.short ?? m.description?.long;
		return renderReadingDetail(
			{ summary: text, keywords: m.keywords },
			this.translator,
		);
	}

	private renderTransit(
		t: NonNullable<
			NonNullable<
				CalculateTransitAspectsResponse['aspects']
			>[number]['transitInterpretation']
		>,
	) {
		return renderReadingDetail(t, this.translator);
	}

	/**
	 * One detected configuration. The apex (the focal planet a Kite, T-Square, or Yod discharges through) leads the chip row and is called out, since a T-Square read without its apex is not a reading. `element` and `modality` only appear on the kinds whose meaning pivots on them, so they are tags rather than columns.
	 */
	private renderPattern(p: PatternEntry) {
		const planets = p.planets ?? [];
		const ordered = p.apex
			? [...planets].sort((a, b) => Number(b === p.apex) - Number(a === p.apex))
			: planets;
		return html`<div class="pattern" part="pattern">
			<div class="pattern-head">
				<span class="pattern-name">${p.name ?? p.kind ?? 'Pattern'}</span>
				${p.element ? html`<span class="pattern-tag">${p.element}</span>` : nothing}
				${p.modality ? html`<span class="pattern-tag">${p.modality}</span>` : nothing}
				${
					p.dissociate
						? html`<span class="pattern-tag" title=${this.t('Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.')}>${this.t('Dissociate')}</span>`
						: nothing
				}
				${typeof p.tightness === 'number' ? html`<span class="pattern-tight">${this.t('{{percent}} tight', { percent: formatPercent(this.effectiveLang(), p.tightness, 0) })}</span>` : nothing}
			</div>
			${
				ordered.length
					? html`<div class="pattern-planets">
						${ordered.map((name) => {
							const glyph = planetGlyph(name);
							const isApex = Boolean(p.apex) && name === p.apex;
							return html`<span class=${isApex ? 'planet-chip apex' : 'planet-chip'}>
								${glyph ? html`<span aria-hidden="true">${glyph}</span>` : nothing}${name}${isApex ? html`<span class="apex-tag">${this.t('apex')}</span>` : nothing}
							</span>`;
						})}
					</div>`
					: nothing
			}
			${
				// The figure, its planets and its tightness are the finding; the
				// paragraph is the reading of it. Same split as roxy-natal-chart, which
				// renders the same `patterns` shape.
				p.interpretation && !this.hideReadings
					? html`<p class="pattern-interp">${p.interpretation}</p>`
					: nothing
			}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-aspects-table': RoxyAspectsTable;
	}
}
