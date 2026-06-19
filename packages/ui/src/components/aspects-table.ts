import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type {
	CalculateAspectsResponse,
	CalculateTransitAspectsResponse,
	DetectAspectPatternsResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import { formatNumber } from '../utils/format.js';
import { capitalize } from '../utils/string.js';

/**
 * Natal + transit aspect grid with chart-pattern detection. Renders three endpoints that share an aspects/patterns shape: /astrology/aspects (natal aspects + patterns + a harmonious/challenging summary), /astrology/transit-aspects (transiting-to-natal aspects with timing guidance), and /astrology/aspect-patterns (patterns only: grand trines, t-squares, stelliums, yods, kites). Each aspect row shows the two bodies, the aspect type coloured by nature, its orb and strength, and an expandable interpretation; patterns render as labelled cards listing the planets they bind.
 */
type AspectsData =
	| CalculateAspectsResponse
	| CalculateTransitAspectsResponse
	| DetectAspectPatternsResponse;

@customElement('roxy-aspects-table')
export class RoxyAspectsTable extends RoxyDataElement<AspectsData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
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
			.aspect-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}
			.aspect-card summary {
				cursor: pointer;
				font-weight: 500;
				color: var(--roxy-fg, #0a0a0a);
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0.5em;
			}
			.aspect-card summary .meta {
				color: var(--roxy-muted, #71717a);
				font-weight: 400;
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: auto;
				font-variant-numeric: tabular-nums;
			}
			.interp-body {
				margin-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.45;
			}
			.interp-body p {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
			}
			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
				margin-top: 0.5rem;
			}
			.kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
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
			.pattern-planets {
				color: var(--roxy-accent-ink, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
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
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No aspect data</div>`;
	}

	protected renderData(d: AspectsData) {
		const aspects = 'aspects' in d ? (d.aspects ?? []) : [];
		const patterns = 'patterns' in d ? (d.patterns ?? []) : [];
		const summary = 'summary' in d ? d.summary : undefined;
		if (aspects.length === 0 && patterns.length === 0)
			return this.renderEmpty();

		return html`<div class="wrap" aria-label="Aspects">
			<div class="head">
				<h2 class="title">Aspects</h2>
				${aspects.length > 0 ? html`<p class="subtitle">${aspects.length} aspects</p>` : nothing}
			</div>
			${summary ? this.renderSummary(summary) : nothing}
			${
				aspects.length > 0
					? html`<div role="list" aria-label="Aspect list">
						${aspects.map((a, i) => this.renderAspect(a, i))}
					</div>`
					: nothing
			}
			${
				patterns.length > 0
					? html`<div>
						<p class="section-label">Patterns</p>
						${patterns.map((p) => this.renderPattern(p))}
					</div>`
					: nothing
			}
		</div>`;
	}

	private renderSummary(
		s:
			| NonNullable<CalculateAspectsResponse['summary']>
			| NonNullable<CalculateTransitAspectsResponse['summary']>,
	) {
		const total = 'totalAspects' in s ? s.totalAspects : s.total;
		return html`<div class="summary-pills" role="region" aria-label="Aspect summary">
			${typeof total === 'number' ? html`<span class="pill pill--muted">Total: ${total}</span>` : nothing}
			<span class="pill pill--success">Harmonious: ${s.harmonious}</span>
			<span class="pill pill--danger">Challenging: ${s.challenging}</span>
			<span class="pill pill--muted">Neutral: ${s.neutral}</span>
		</div>`;
	}

	private renderAspect(
		a:
			| NonNullable<CalculateAspectsResponse['aspects']>[number]
			| NonNullable<CalculateTransitAspectsResponse['aspects']>[number],
		idx: number,
	) {
		const g1 = PLANET_GLYPH[capitalize(a.planet1)] ?? '';
		const g2 = PLANET_GLYPH[capitalize(a.planet2)] ?? '';
		const nature = (a.interpretation ?? 'neutral').toLowerCase();
		const type = (a.type ?? '').toLowerCase().replace(/_/g, ' ');
		const status = a.isApplying ? 'Applying' : 'Separating';
		// Natal aspects carry `meaning` (static aspect lore); transits carry `transitInterpretation` (timed guidance).
		const meaning = 'meaning' in a ? a.meaning : undefined;
		const transit =
			'transitInterpretation' in a ? a.transitInterpretation : undefined;
		const hasBody = Boolean(meaning || transit);
		const header = html`<span aria-hidden="true" class="glyph">${g1}</span>${a.planet1}
			<span class="nature-badge ${nature}">${type}</span>
			<span aria-hidden="true" class="glyph">${g2}</span>${a.planet2}
			<span class="meta">${status} · orb ${formatNumber(a.orb, 2)}° · str ${formatNumber(a.strength, 0)}</span>`;
		if (!hasBody) {
			return html`<div class="aspect-card" role="listitem">
				<div class="summary" style="cursor:default">${header}</div>
			</div>`;
		}
		return html`<details class="aspect-card" role="listitem" name="aspects" ?open=${idx === 0}>
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
		return html`${text ? html`<p>${text}</p>` : nothing}
			${
				m.keywords?.length
					? html`<div class="interp-keywords">${m.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
					: nothing
			}`;
	}

	private renderTransit(
		t: NonNullable<
			NonNullable<
				CalculateTransitAspectsResponse['aspects']
			>[number]['transitInterpretation']
		>,
	) {
		return html`${t.summary ? html`<p>${t.summary}</p>` : nothing}
			${t.impact ? html`<p><strong>Impact:</strong> ${t.impact}</p>` : nothing}
			${t.timing ? html`<p><strong>Timing:</strong> ${t.timing}</p>` : nothing}
			${t.guidance ? html`<p><strong>Guidance:</strong> ${t.guidance}</p>` : nothing}
			${
				t.keywords?.length
					? html`<div class="interp-keywords">${t.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
					: nothing
			}`;
	}

	private renderPattern(
		p: NonNullable<DetectAspectPatternsResponse['patterns']>[number],
	) {
		const planets = p.planets ?? [];
		return html`<div class="pattern">
			<div class="pattern-head">
				<span class="pattern-name">${p.name ?? p.kind ?? 'Pattern'}</span>
				${planets.length ? html`<span class="pattern-planets">${planets.join(', ')}</span>` : nothing}
				${typeof p.tightness === 'number' ? html`<span class="pattern-tight">${formatNumber(p.tightness, 0)}% tight</span>` : nothing}
			</div>
			${p.interpretation ? html`<p class="pattern-interp">${p.interpretation}</p>` : nothing}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-aspects-table': RoxyAspectsTable;
	}
}
