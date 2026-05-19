import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	KalsarpaResponse,
	ManglikResponse,
	SadhesatiResponse,
} from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { MarkupDataController } from '../utils/markup-data.js';

type DoshaData = ManglikResponse | KalsarpaResponse | SadhesatiResponse;

const DOSHA_LABELS: Record<string, string> = {
	manglik: 'Mangal Dosha',
	kalsarpa: 'Kaal Sarp Dosha',
	sadhesati: 'Sade Sati',
};

/**
 * Dosha presence card. Renders /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}.
 * Visual severity indicator + remedies + scoped effects.
 */
@customElement('roxy-dosha-card')
export class RoxyDoshaCard extends LitElement {
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

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: DoshaData | null = null;

	@property({ type: String, reflect: true })
	type: 'manglik' | 'kalsarpa' | 'sadhesati' | string = 'manglik';

	render() {
		const d = this.data;
		if (!d)
			return html`<div class="roxy-empty" role="status">No dosha data</div>`;

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
		const barColor =
			tier === 3
				? 'var(--roxy-danger)'
				: tier === 2
					? 'var(--roxy-warning)'
					: tier === 1
						? 'var(--roxy-success)'
						: 'transparent';

		return html`<article
			class="card"
			aria-label=${label}
		>
			<header class="head">
				<h2 class="title">${label}</h2>
				<span class=${`badge ${present ? 'present' : 'absent'}`}>
					${present ? 'Present' : 'Absent'}
				</span>
			</header>
			${
				d.severity
					? html`<div
						class="severity-bar"
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
			${d.description ? html`<p class="description">${d.description}</p>` : nothing}
			${this.renderEffects(d)}
			${
				d.remedies && d.remedies.length > 0
					? html`<div>
						<h3>Remedies</h3>
						<ul>
							${d.remedies.map((r) => html`<li>${r}</li>`)}
						</ul>
					</div>`
					: nothing
			}
			${
				'exceptions' in d && d.exceptions && d.exceptions.length > 0
					? html`<div>
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
		if (!d.effects) return nothing;
		const entries = Object.entries(d.effects).filter(
			([, v]) => typeof v === 'string' && v.length > 0,
		);
		if (entries.length === 0) return nothing;
		return html`<div class="effects">
			${entries.map(
				([k, v]) => html`<div>
					<h3>${k}</h3>
					<p>${v}</p>
				</div>`,
			)}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-dosha-card': RoxyDoshaCard;
	}
}
