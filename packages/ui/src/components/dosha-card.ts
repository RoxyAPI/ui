import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

interface DoshaData {
	present?: boolean;
	severity?: 'Mild' | 'Moderate' | 'Severe' | string;
	type?: string;
	description?: string;
	remedies?: string[];
	exceptions?: string[];
	effects?:
		| string
		| {
				marriage?: string;
				personality?: string;
				timing?: string;
				relationships?: string;
				general?: string;
				phases?: Record<string, string>;
		  };
}

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
				color: var(--roxy-success, #16a34a);
			}
			.badge.present {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger, #dc2626);
			}
			.severity {
				display: flex;
				align-items: center;
				gap: 4px;
			}
			.severity span {
				width: 14px;
				height: 4px;
				border-radius: 2px;
				background: var(--roxy-border, #e4e4e7);
			}
			.severity.mild span:nth-child(1) {
				background: var(--roxy-warning, #ea580c);
			}
			.severity.moderate span:nth-child(-n + 2) {
				background: var(--roxy-warning, #ea580c);
			}
			.severity.severe span {
				background: var(--roxy-danger, #dc2626);
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
		const sevClass = (d.severity ?? '').toLowerCase();

		return html`<article
			class="card"
			aria-label=${label}
		>
			<header class="head">
				<h2 class="title">${label}</h2>
				<div style="display:flex; gap:0.5rem; align-items:center;">
					<span class=${`badge ${present ? 'present' : 'absent'}`}>
						${present ? 'Present' : 'Absent'}
					</span>
					${
						d.severity
							? html`<span
								class=${`severity ${sevClass}`}
								role="img"
								aria-label=${`Severity ${d.severity}`}
							>
								<span></span><span></span><span></span>
							</span>`
							: nothing
					}
				</div>
			</header>
			${d.description ? html`<p class="description">${d.description}</p>` : nothing}
			${this.renderEffects(d.effects)}
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
				d.exceptions && d.exceptions.length > 0
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

	private renderEffects(e: DoshaData['effects']) {
		if (!e) return nothing;
		if (typeof e === 'string') return html`<p>${e}</p>`;
		const entries = Object.entries(e).filter(
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
