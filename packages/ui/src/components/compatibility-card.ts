import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

interface CompatibilityData {
	overallScore?: number;
	score?: number;
	rating?: string;
	relationshipArchetype?: string;
	advice?: string;
	summary?: string;
	categoryScores?: Record<string, number>;
	categoryBreakdown?: Record<string, number>;
	emotional?: number;
	communication?: number;
	romance?: number;
	strengths?: string[];
	challenges?: string[];
	keyAspects?: string[];
	elementBalance?: Record<string, number>;
	person1?: { name?: string; sign?: string; lifePath?: number };
	person2?: { name?: string; sign?: string; lifePath?: number };
}

/**
 * Cross-domain compatibility card. Renders /astrology/compatibility-score,
 * /numerology/compatibility, or /biorhythm/compatibility responses.
 */
@customElement('roxy-compatibility-card')
export class RoxyCompatibilityCard extends LitElement {
	static styles = [
		baseStyles,
		css`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
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
				color: var(--roxy-accent-fg, #b45309);
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
				color: var(--roxy-info, #0284c7);
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
		`,
	];

	@property({ attribute: false })
	data: CompatibilityData | null = null;

	@property({ type: String, reflect: true })
	mode: 'astrology' | 'numerology' | 'biorhythm' = 'astrology';

	private getBreakdown(): Record<string, number> {
		const d = this.data;
		if (!d) return {};
		if (d.categoryScores) return d.categoryScores;
		if (d.categoryBreakdown) return d.categoryBreakdown;
		const inferred: Record<string, number> = {};
		if (typeof d.emotional === 'number') inferred.emotional = d.emotional;
		if (typeof d.communication === 'number')
			inferred.communication = d.communication;
		if (typeof d.romance === 'number') inferred.romance = d.romance;
		if (d.elementBalance) Object.assign(inferred, d.elementBalance);
		return inferred;
	}

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No compatibility data</div>`;
		const score = d.overallScore ?? d.score;
		const breakdown = this.getBreakdown();

		return html`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${
						typeof score === 'number'
							? html`<div class="score">${score}</div>`
							: nothing
					}
					${d.rating ? html`<div class="rating">${d.rating}</div>` : nothing}
				</div>
			</div>

			${
				Object.keys(breakdown).length > 0
					? html`<div role="list">
						${Object.entries(breakdown).map(
							([k, v]) => html`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${k}</span>
								<span class="bar"
									><span style="width: ${Math.max(0, Math.min(100, v))}%"></span
								></span>
								<span>${v}</span>
							</div>`,
						)}
					</div>`
					: nothing
			}
			${
				d.relationshipArchetype
					? html`<p>
						<span class="archetype">${d.relationshipArchetype}</span>
					</p>`
					: nothing
			}
			${d.summary ? html`<p>${d.summary}</p>` : nothing}
			${d.advice ? html`<p>${d.advice}</p>` : nothing}
			${
				(d.strengths?.length ?? 0) > 0 || (d.challenges?.length ?? 0) > 0
					? html`<div class="lists">
						${
							d.strengths?.length
								? html`<div>
									<h3>Strengths</h3>
									<ul>
										${d.strengths.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
						${
							d.challenges?.length
								? html`<div>
									<h3>Challenges</h3>
									<ul>
										${d.challenges.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
						${
							d.keyAspects?.length
								? html`<div>
									<h3>Key aspects</h3>
									<ul>
										${d.keyAspects.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
					</div>`
					: nothing
			}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-compatibility-card': RoxyCompatibilityCard;
	}
}
