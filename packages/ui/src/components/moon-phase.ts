import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { moonPhaseEmoji } from '../tokens/index.js';
import type {
	GetCurrentMoonPhaseResponse,
	GetMoonCalendarResponse,
	GetUpcomingMoonPhasesResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatNumber } from '../utils/format.js';

type MoonPhaseData =
	| GetCurrentMoonPhaseResponse
	| GetUpcomingMoonPhasesResponse
	| GetMoonCalendarResponse;
type MoonListEntry =
	| GetUpcomingMoonPhasesResponse['phases'][number]
	| GetMoonCalendarResponse['calendar'][number];

/**
 * Moon phase card. Renders /astrology/moon-phase/{current,upcoming,calendar/...}.
 *
 * @remarks
 * `hide-readings` keeps the whole ephemeris half: the phase glyph, the phase name, the date, and the illumination, age, sign and distance tiles, plus every row of the upcoming and calendar lists. Only `meaning.description` and its keyword chips go. The glyph is unaffected because it comes from `meaning.symbol`, which is the phase drawn rather than the phase interpreted.
 */
@customElement('roxy-moon-phase')
export class RoxyMoonPhase extends RoxyDataElement<MoonPhaseData> {
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
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.emoji {
				font-size: 3rem;
				line-height: 1;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.stats {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.stats div span:first-child {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.stats strong {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}

			.meaning {
				color: var(--roxy-fg, #0a0a0a);
			}
			.keywords {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			.keywords span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.list {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.list-item {
				display: grid;
				grid-template-columns: 2.5rem 1fr auto;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem) 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.list-item:last-child {
				border-bottom: none;
			}
		`,
	];

	@property({ type: String, reflect: true })
	mode: 'current' | 'upcoming' | 'calendar' = 'current';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No moon phase data</div>`;
	}

	protected renderData(d: MoonPhaseData) {
		const list: MoonListEntry[] =
			'phases' in d ? d.phases : 'calendar' in d ? d.calendar : [];
		if (this.mode !== 'current' && list.length > 0) {
			const month = 'month' in d ? d.month : undefined;
			const year = 'year' in d ? d.year : undefined;
			return html`<article
				class="card"
				part="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label" part="header">${month ?? 'Moon phases'} ${year ?? ''}</h2>
				<div class="list" part="table" role="list">
					${list.map((phase) => this.renderListItem(phase))}
				</div>
			</article>`;
		}
		if (!('phase' in d)) return nothing;
		return this.renderSingle(d);
	}

	private renderSingle(d: GetCurrentMoonPhaseResponse) {
		// The API ships the exact phase emoji in meaning.symbol; prefer it and fall
		// back to the name-derived glyph for the list endpoints that omit meaning.
		const emoji = d.meaning?.symbol || phaseEmoji(d.phase);
		return html`<article class="card" part="card" aria-label="Current moon phase">
			<div class="hero" part="header">
				<span class="emoji" aria-hidden="true">${emoji}</span>
				<div>
					<h2 class="label">${d.phase ?? 'Moon'}</h2>
					${d.date ? html`<div class="date">${formatDate(this.effectiveLang(), d.date)}</div>` : nothing}
				</div>
			</div>
			<div class="stats" part="details">
				${
					typeof d.illumination === 'number'
						? html`<div>
							<span>Illumination</span>
							<strong>${formatIllumination(d.illumination)}</strong>
						</div>`
						: nothing
				}
				${
					typeof d.age === 'number'
						? html`<div>
							<span>Age</span>
							<strong>${formatNumber(d.age, 1)} days</strong>
						</div>`
						: nothing
				}
				${
					d.sign
						? html`<div>
							<span>Sign</span>
							<strong>${d.sign}</strong>
						</div>`
						: nothing
				}
				${
					typeof d.distance === 'number'
						? html`<div>
							<span>Distance</span>
							<strong>${(d.distance / 1000).toFixed(0)}k km</strong>
						</div>`
						: nothing
				}
			</div>
			${
				// The tiles above are the ephemeris; the description and the chips that
				// belong to it are what the phase is taken to mean.
				d.meaning?.description && !this.hideReadings
					? html`<p class="meaning">${d.meaning.description}</p>`
					: nothing
			}
			${
				d.meaning?.keywords?.length && !this.hideReadings
					? html`<div class="keywords">
						${d.meaning.keywords.map((k) => html`<span>${k}</span>`)}
					</div>`
					: nothing
			}
		</article>`;
	}

	private renderListItem(p: MoonListEntry) {
		const emoji = phaseEmoji(p.phase);
		return html`<div class="list-item" role="listitem">
			<span aria-hidden="true">${emoji}</span>
			<span>${p.phase}</span>
			<span>${formatDate(this.effectiveLang(), p.date)}</span>
		</div>`;
	}
}

/**
 * Map a phase name to its emoji, tolerant of the live API naming. The
 * suffix-stripping and third/last quarter alias reconciliation now live in
 * {@link moonPhaseEmoji}, so every caller of the token resolves the same eight
 * phases from the same live API spellings.
 */
function phaseEmoji(phase: string | undefined): string {
	return moonPhaseEmoji(phase) ?? '🌙';
}

function formatIllumination(v: number): string {
	const pct = v <= 1 ? v * 100 : v;
	return `${Math.round(pct)}%`;
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-moon-phase': RoxyMoonPhase;
	}
}
