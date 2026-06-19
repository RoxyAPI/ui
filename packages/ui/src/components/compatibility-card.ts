import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	CalculateBioCompatibilityResponse,
	CalculateCompatibilityResponse,
	CalculateNumCompatibilityResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';

type CompatibilityData =
	| CalculateCompatibilityResponse
	| CalculateNumCompatibilityResponse
	| CalculateBioCompatibilityResponse;

/**
 * Cross-domain compatibility card. Renders /astrology/compatibility-score,
 * /numerology/compatibility, or /biorhythm/compatibility responses.
 */
@customElement('roxy-compatibility-card')
export class RoxyCompatibilityCard extends RoxyDataElement<CompatibilityData> {
	static styles = [
		baseStyles,
		css`
			.card {
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

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No compatibility data</div>`;
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

		return html`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${
						typeof score === 'number'
							? html`<div class="score">${formatNumber(score, 0)}</div>`
							: nothing
					}
					${rating ? html`<div class="rating">${rating}</div>` : nothing}
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
								<span>${formatNumber(v, 0)}</span>
							</div>`,
						)}
					</div>`
					: nothing
			}
			${
				archetype
					? html`<p>
						<span class="archetype">${archetype.label}</span>
						${archetype.description ? html` · ${archetype.description}` : nothing}
					</p>`
					: nothing
			}
			${summary ? html`<p>${summary}</p>` : nothing}
			${interpretation && !summary ? html`<p>${interpretation}</p>` : nothing}
			${advice ? html`<p>${advice}</p>` : nothing}
			${
				(strengths?.length ?? 0) > 0 || (challenges?.length ?? 0) > 0
					? html`<div class="lists">
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
					? html`<div>
						<h3 style="margin: 0 0 0.25rem; font-size: var(--roxy-text-xs); color: var(--roxy-muted); text-transform: uppercase; letter-spacing: 0.06em;">Key aspects</h3>
						<ul style="margin: 0; padding-left: 1rem; font-size: var(--roxy-text-sm);">
							${keyAspects.slice(0, 6).map((a) => html`<li>${formatAspect(a)}</li>`)}
						</ul>
					</div>`
					: nothing
			}
		</article>`;
	}
}

type KeyAspect = CalculateCompatibilityResponse extends {
	keyAspects: Array<infer T>;
}
	? T
	: never;

function formatAspect(a: KeyAspect): string {
	const aspect = a.type.toLowerCase().replace(/_/g, '-');
	const orb =
		typeof a.orb === 'number' ? ` (orb ${formatNumber(a.orb, 1)}°)` : '';
	const head = [a.planet1, aspect, a.planet2].filter(Boolean).join(' ');
	return a.description ? `${head}${orb} · ${a.description}` : `${head}${orb}`;
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-compatibility-card': RoxyCompatibilityCard;
	}
}
