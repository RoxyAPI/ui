import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { planetGlyph, signGlyph } from '../tokens/index.js';
import type {
	CalculateBioCompatibilityResponse,
	CalculateCompatibilityResponse,
	CalculateNumCompatibilityResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import { formatNumber, normalizeAspect } from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
} from '../utils/interp-accordion.js';
import { capitalize, humanize } from '../utils/string.js';

type CompatibilityData =
	| CalculateCompatibilityResponse
	| CalculateNumCompatibilityResponse
	| CalculateBioCompatibilityResponse;

type AstroCompat = CalculateCompatibilityResponse;

/** The four relationship planets, in the order a synastry reading works them: identity, feeling, love, desire. */
const RELATIONSHIP_PLANETS = ['sun', 'moon', 'venus', 'mars'] as const;
const ELEMENTS = ['fire', 'earth', 'air', 'water'] as const;

/**
 * Cross-domain compatibility card. Renders /astrology/compatibility-score,
 * /numerology/compatibility, or /biorhythm/compatibility responses.
 */
@customElement('roxy-compatibility-card')
export class RoxyCompatibilityCard extends RoxyDataElement<CompatibilityData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
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
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.head h2 {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}

			.score {
				font-variant-numeric: tabular-nums;
				font-size: 2rem;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
				line-height: 1;
			}
			.rating {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.bar-row {
				display: grid;
				grid-template-columns: 8rem 1fr 3.5rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bar {
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.bar-row > span:last-child {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				text-align: right;
			}

			.archetype {
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
			}

			.lead {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-weight: 500;
			}
			p.body {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.6;
			}

			.pills {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.pill {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.pill--success {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.pill--danger {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}

			.elements {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.el-row {
				display: grid;
				grid-template-columns: 4rem 1fr 1fr;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.el-row .el-name {
				text-transform: capitalize;
				color: var(--roxy-fg, #0a0a0a);
			}
			.el-row.head span {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.el-row.head span:nth-child(2) {
				text-align: right;
			}
			/* Two mirrored bars per element: person 1 grows right, person 2 grows
			 * left, so a shared emphasis reads as a matched pair at the centre. */
			.el-bar {
				display: flex;
				align-items: center;
				gap: 0.4rem;
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.el-bar.p1 {
				flex-direction: row-reverse;
			}
			.el-bar .track {
				flex: 1 1 auto;
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				display: flex;
			}
			.el-bar.p1 .track {
				justify-content: flex-end;
			}
			.el-bar .track > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
			}
			.el-bar.p2 .track > span {
				background: var(--roxy-info, #0284c7);
			}
			.el-row.shared .el-name {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.shared-note {
				margin: var(--roxy-space-sm, 0.5rem) 0 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.key-aspects {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`,
	];

	@property({ type: String, reflect: true })
	mode: 'astrology' | 'numerology' | 'biorhythm' = 'astrology';

	private getBreakdown(): Record<string, number> {
		const d = this.data;
		if (!d) return {};
		if ('categories' in d && d.categories) {
			const out: Record<string, number> = {};
			for (const [k, v] of Object.entries(d.categories)) {
				if (typeof v === 'number' && Number.isFinite(v)) out[k] = v;
			}
			return out;
		}
		return {};
	}

	protected renderData(d: CompatibilityData) {
		const score = d.overallScore;
		const breakdown = this.getBreakdown();
		const rating =
			'rating' in d
				? (d as CalculateNumCompatibilityResponse).rating
				: undefined;
		const archetype =
			'archetype' in d
				? (d as CalculateCompatibilityResponse).archetype
				: undefined;
		const advice =
			'advice' in d
				? (d as CalculateNumCompatibilityResponse).advice
				: undefined;
		const summary =
			'summary' in d
				? (d as CalculateCompatibilityResponse).summary
				: undefined;
		const interpretation =
			'interpretation' in d
				? (d as CalculateCompatibilityResponse).interpretation
				: undefined;
		const strengths = 'strengths' in d ? d.strengths : undefined;
		const challenges = 'challenges' in d ? d.challenges : undefined;
		const keyAspects =
			'keyAspects' in d
				? (d as CalculateCompatibilityResponse).keyAspects
				: undefined;

		const readings = !this.hideReadings;

		return html`<article
			class="card"
			part="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head" part="header">
				<h2>${humanize(`${this.mode} compatibility`)}</h2>
				<div>
					${
						typeof score === 'number'
							? html`<div class="score">${Math.round(score)}</div>`
							: nothing
					}
					${rating ? html`<div class="rating">${rating}</div>` : nothing}
				</div>
			</div>

			${
				Object.keys(breakdown).length > 0
					? html`<div role="list" part="details breakdown">
						${Object.entries(breakdown).map(
							([k, v]) => html`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${k}</span>
								<span class="bar"
									><span style="width: ${Math.max(0, Math.min(100, v))}%"></span
								></span>
								<span>${Math.round(v)}</span>
							</div>`,
						)}
					</div>`
					: nothing
			}
			${
				// The archetype LABEL is the classification the score resolved to and
				// stays; only the sentence explaining it is a reading.
				archetype
					? html`<p>
						<span class="archetype">${archetype.label}</span>
						${archetype.description && readings ? html` · ${archetype.description}` : nothing}
					</p>`
					: nothing
			}
			${summary && readings ? html`<p class="lead">${summary}</p>` : nothing}
			${interpretation && readings ? html`<p class="body">${interpretation}</p>` : nothing}
			${advice && readings ? html`<p class="body">${advice}</p>` : nothing}
			${this.renderAspectBreakdown()}
			${this.renderSignCompatibility()}
			${this.renderElementBalance()}
			${this.renderSubScores()}
			${
				// Each entry is a sentence about the pair, so the two lists are prose
				// laid out as bullets rather than data.
				readings &&
				((strengths?.length ?? 0) > 0 || (challenges?.length ?? 0) > 0)
					? html`<div class="lists" part="section strengths-challenges">
						${
							strengths?.length
								? html`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
						${
							challenges?.length
								? html`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
					</div>`
					: nothing
			}
			${
				keyAspects?.length
					? html`<div class="lists" part="section key-aspects">
						<div>
							<h3>Key aspects</h3>
							<ul class="key-aspects">
								${keyAspects.slice(0, 6).map((a) => html`<li>${formatAspect(a, readings)}</li>`)}
							</ul>
						</div>
					</div>`
					: nothing
			}
		</article>`;
	}

	/** Contact balance behind the score. Astrology only. */
	private renderAspectBreakdown() {
		const b = this.astro()?.aspectBreakdown;
		if (!b) return nothing;
		return html`<div
			class="pills"
			part="details aspect-breakdown"
			role="region"
			aria-label="Aspect breakdown"
		>
			${typeof b.total === 'number' ? html`<span class="pill">Total: ${b.total}</span>` : nothing}
			<span class="pill pill--success">Harmonious: ${b.harmonious}</span>
			<span class="pill pill--danger">Challenging: ${b.challenging}</span>
			<span class="pill">Neutral: ${b.neutral}</span>
		</div>`;
	}

	/**
	 * Sign-by-sign reading for the four relationship planets. The aside pairs the two signs (with degrees from `persons`, which would otherwise be dropped) so the header answers "which signs" before the body answers "and so what".
	 */
	private renderSignCompatibility() {
		const d = this.astro();
		const sc = d?.signCompatibility;
		if (!sc) return nothing;
		const persons = d?.persons;
		const sections = RELATIONSHIP_PLANETS.map(
			(planet): InterpSection | null => {
				const pair = sc[planet];
				if (!pair) return null;
				const at = (p: 'person1' | 'person2'): string => {
					const sign = capitalize(
						(p === 'person1' ? pair.person1Sign : pair.person2Sign) ?? '',
					);
					const deg = persons?.[p]?.[planet]?.degree;
					const glyph = signGlyph(sign) ?? '';
					const degree = typeof deg === 'number' ? ` ${Math.round(deg)}°` : '';
					return `${glyph} ${sign}${degree}`.trim();
				};
				return {
					label: `${planetGlyph(planet) ?? ''} ${capitalize(planet)}`.trim(),
					aside: `${at('person1')} and ${at('person2')}`,
					body: pair.description ?? '',
				};
			},
		).filter((s): s is InterpSection => s !== null);
		return this.renderInterpretation(
			sections,
			'compat-signs',
			'Sign compatibility',
		);
	}

	/**
	 * Elemental weight of both charts, mirrored around the element name so a shared emphasis reads as a matched pair. The shared element (or its absence) is the headline the API computes, so it is stated rather than left for the reader to spot.
	 */
	private renderElementBalance() {
		const eb = this.astro()?.elementBalance;
		if (!eb) return nothing;
		const p1 = eb.person1;
		const p2 = eb.person2;
		const max = Math.max(
			1,
			...ELEMENTS.map((e) => Math.max(p1?.[e] ?? 0, p2?.[e] ?? 0)),
		);
		const shared = eb.sharedElement?.toLowerCase();
		return html`<section class="block" part="section element-balance">
			<h3>Element balance</h3>
			<div class="elements">
				<div class="el-row head">
					<span></span>
					<span>Person 1</span>
					<span>Person 2</span>
				</div>
				${ELEMENTS.map((el) => {
					const a = p1?.[el] ?? 0;
					const b = p2?.[el] ?? 0;
					return html`<div class=${el === shared ? 'el-row shared' : 'el-row'}>
						<span class="el-name">${el}</span>
						<span class="el-bar p1">
							<span>${a}</span>
							<span class="track"><span style="width: ${(a / max) * 100}%"></span></span>
						</span>
						<span class="el-bar p2">
							<span class="track"><span style="width: ${(b / max) * 100}%"></span></span>
							<span>${b}</span>
						</span>
					</div>`;
				})}
			</div>
			${
				// The mirrored bars are the balance; this sentence is what it means.
				eb.description && !this.hideReadings
					? html`<p class="shared-note">${eb.description}</p>`
					: nothing
			}
		</section>`;
	}

	/**
	 * Per-cycle readings the other two domains carry instead of astrology categories: the numerology core numbers (Life Path, Expression, Soul Urge) and the biorhythm cycle alignments. Both are labelled score-plus-prose, which is exactly what the interpretation accordion is for.
	 */
	private renderSubScores() {
		const d = this.data;
		if (!d) return nothing;
		const sections: InterpSection[] = [];
		if ('lifePath' in d) {
			const cores: Array<[string, typeof d.lifePath]> = [
				['Life Path', d.lifePath],
				['Expression', d.expression],
				['Soul Urge', d.soulUrge],
			];
			for (const [label, core] of cores) {
				if (!core) continue;
				sections.push({
					label,
					aside: `${core.person1} and ${core.person2} · ${formatNumber(core.compatibility, 0)}%`,
					body: core.description ?? '',
				});
			}
		}
		if ('cycles' in d && d.cycles) {
			for (const [name, cycle] of Object.entries(d.cycles)) {
				if (!cycle) continue;
				sections.push({
					label: capitalize(name),
					aside: `${formatNumber(cycle.alignment, 0)}% in step · ${humanize(cycle.phase ?? '')}`,
					body: cycle.description ?? '',
				});
			}
		}
		return this.renderInterpretation(
			sections,
			'compat-sub-scores',
			'Breakdown',
		);
	}

	/** The astrology response, or undefined when the card is showing another domain. `signCompatibility` is unique to it, so it is the discriminator. */
	private astro(): AstroCompat | undefined {
		const d = this.data;
		return d && 'signCompatibility' in d ? (d as AstroCompat) : undefined;
	}
}

type KeyAspect = CalculateCompatibilityResponse extends {
	keyAspects: Array<infer T>;
}
	? T
	: never;

/** "Sun trine Moon (orb 2.4°)", with the written reading of the contact appended unless the host asked for the data alone. */
function formatAspect(a: KeyAspect, withReading: boolean): string {
	// Lowercase on purpose: this lands mid-sentence as "Sun trine Moon".
	const aspect = normalizeAspect(a);
	const orb =
		typeof a.orb === 'number' ? ` (orb ${formatNumber(a.orb, 1)}°)` : '';
	const head = [a.planet1, aspect, a.planet2].filter(Boolean).join(' ');
	return a.description && withReading
		? `${head}${orb} · ${a.description}`
		: `${head}${orb}`;
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-compatibility-card': RoxyCompatibilityCard;
	}
}
