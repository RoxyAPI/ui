import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	KalsarpaResponse,
	ManglikResponse,
	SadhesatiResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { frameCaptionStyles, renderFrameCaption } from '../utils/frame.js';

type DoshaData = ManglikResponse | KalsarpaResponse | SadhesatiResponse;

const DOSHA_LABELS: Record<string, string> = {
	manglik: 'Mangal Dosha',
	kalsarpa: 'Kaal Sarp Dosha',
	sadhesati: 'Sade Sati',
};

/**
 * Dosha presence card. Renders /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}.
 * Visual severity indicator + remedies + scoped effects.
 *
 * @remarks
 * The verdict is the data and the counsel is the reading. `hide-readings` keeps the present/absent badge, the subtype (which for Sade Sati is the phase, the whole answer), the severity meter and the frame caption, and drops the description, the scoped effects, the remedies and the exceptions. Each of those three sections is prose end to end, so it goes whole rather than leaving a heading over nothing.
 */
@customElement('roxy-dosha-card')
export class RoxyDoshaCard extends RoxyDataElement<DoshaData> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
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
				align-items: center;
				justify-content: space-between;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.subtype {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.subtype .subtype-label {
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-right: 0.4rem;
			}
			.badge {
				display: inline-flex;
				align-items: center;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: 4px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.badge.absent {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.badge.present {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.severity-bar {
				position: relative;
				width: 100%;
				height: 8px;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 30%, transparent);
				border-radius: 4px;
				overflow: hidden;
			}
			.severity-fill {
				display: block;
				height: 100%;
				transition: width var(--roxy-motion-duration, 200ms) ease-out;
				border-radius: 4px;
			}
			@media (prefers-reduced-motion: reduce) {
				.severity-fill {
					transition: none;
				}
			}

			.description {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}

			h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.effects {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.effects p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`,
	];

	@property({ type: String, reflect: true })
	type: 'manglik' | 'kalsarpa' | 'sadhesati' | string = 'manglik';

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No dosha data</div>`;
	}

	protected renderData(d: DoshaData) {
		const present = !!d.present;
		const label = DOSHA_LABELS[this.type] ?? this.type;
		const sevLower = (d.severity ?? '').toLowerCase();
		const tier =
			sevLower === 'severe'
				? 3
				: sevLower === 'moderate'
					? 2
					: sevLower === 'mild'
						? 1
						: 0;
		const pct = tier * 33;
		// A present dosha is never "good news": keep the ramp in the warning/danger
		// family so a Mild severity does not paint green and read as benign. The bar
		// width already conveys the tier.
		const barColor =
			tier === 3
				? 'var(--roxy-danger)'
				: tier >= 1
					? 'var(--roxy-warning)'
					: 'transparent';

		return html`<article
			class="card"
			part="card"
			aria-label=${label}
		>
			<header class="head" part="header">
				<h2 class="title">${label}</h2>
				<span class=${`badge ${present ? 'present' : 'absent'}`}>
					${present ? 'Present' : 'Absent'}
				</span>
				${renderFrameCaption(d.frame)}
			</header>
			${
				'type' in d && d.type
					? html`<p class="subtype">
						<span class="subtype-label">${this.type === 'sadhesati' ? 'Current phase' : 'Type'}</span>${d.type}
					</p>`
					: nothing
			}
			${
				d.severity
					? html`<div
						class="severity-bar"
						part="details"
						role="meter"
						aria-valuemin="0"
						aria-valuemax="3"
						aria-valuenow="${tier}"
						aria-label="Severity ${d.severity}"
					>
						<span class="severity-fill" style="width: ${pct}%; background: ${barColor};"></span>
					</div>`
					: nothing
			}
			${
				// The badge above states the verdict; this paragraph is the read of it.
				d.description && !this.hideReadings
					? html`<p class="description">${d.description}</p>`
					: nothing
			}
			${this.renderEffects(d)}
			${
				// Remedies and exceptions are prescriptive sentences laid out as bullets,
				// so each list goes with its own heading rather than leaving one behind.
				d.remedies && d.remedies.length > 0 && !this.hideReadings
					? html`<div part="section remedies">
						<h3>Remedies</h3>
						<ul>
							${d.remedies.map((r) => html`<li>${r}</li>`)}
						</ul>
					</div>`
					: nothing
			}
			${
				'exceptions' in d &&
				d.exceptions &&
				d.exceptions.length > 0 &&
				!this.hideReadings
					? html`<div part="section exceptions">
					<h3>Exceptions</h3>
					<ul>
						${d.exceptions.map((r) => html`<li>${r}</li>`)}
					</ul>
				</div>`
					: nothing
			}
		</article>`;
	}

	private renderEffects(d: DoshaData) {
		// Every effect is a paragraph about a life area, so the block is prose end to
		// end and goes whole under hide-readings.
		if (!d.effects || this.hideReadings) return nothing;
		// Effects mix flat string fields (marriage, career...) with a nested map
		// (Sadhesati effects.phases: { Rising, Peak, Setting }). Render both; the
		// old string-only filter silently dropped the phase-specific effects, which
		// are the substance of a Sade Sati reading.
		const sections: unknown[] = [];
		for (const [key, value] of Object.entries(
			d.effects as Record<string, unknown>,
		)) {
			if (typeof value === 'string' && value.length > 0) {
				sections.push(html`<div><h3>${key}</h3><p>${value}</p></div>`);
			} else if (value && typeof value === 'object') {
				for (const [nestedKey, nestedValue] of Object.entries(
					value as Record<string, unknown>,
				)) {
					if (typeof nestedValue === 'string' && nestedValue.length > 0) {
						sections.push(
							html`<div><h3>${nestedKey}</h3><p>${nestedValue}</p></div>`,
						);
					}
				}
			}
		}
		if (sections.length === 0) return nothing;
		return html`<div class="effects" part="section effects">${sections}</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-dosha-card': RoxyDoshaCard;
	}
}
