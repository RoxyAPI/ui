import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import type { GetCompoundNumberResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatInteger } from '../utils/format.js';
import { humanize } from '../utils/string.js';

type Nature = GetCompoundNumberResponse['nature'];

/** The badge word for each nature the response publishes; a value outside the enum prints humanized, never dropped. */
const NATURE_LABEL: Record<Nature, ChromeString> = {
	fortunate: 'Fortunate',
	unfortunate: 'Unfortunate',
	mixed: 'Mixed fortune',
};

/** The status tint each nature reads in. */
const NATURE_TONE: Record<Nature, string> = {
	fortunate: 'success',
	unfortunate: 'danger',
	mixed: 'warning',
};

/** Chaldean compound number card for /numerology/compound-number/{number}: the numeral, its symbolic name, root, nature, the lower number it repeats, and the meaning, which `hide-readings` drops. */
@customElement('roxy-compound-number')
export class RoxyCompoundNumber extends RoxyDataElement<GetCompoundNumberResponse> {
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
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.hero > div {
				min-width: 0;
			}
			.numeral {
				flex-shrink: 0;
				font-size: 3rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
				font-variant-numeric: tabular-nums;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.badges {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.badge {
				padding: 3px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 35%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}
			.badge.success {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--_success-fg);
			}
			.badge.danger {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--_danger-fg);
			}
			.badge.warning {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 16%, transparent);
				color: var(--_warning-fg);
			}
			.meaning {
				margin: 0;
				line-height: 1.6;
			}
		`,
	];

	protected renderData(d: GetCompoundNumberResponse) {
		const number = formatInteger(this.effectiveLang(), d.number);
		return html`<article class="card" part="card" aria-label=${`${this.t('Compound number')} ${number}`}>
			<header class="hero" part="header">
				<div class="numeral">${number}</div>
				<div>
					<p class="label">${this.t('Compound number')}</p>
					${d.name ? html`<h2 class="name">${d.name}</h2>` : nothing}
				</div>
			</header>
			<div class="badges" part="details">
				<span class="badge">${this.t('Root number {{n}}', { n: formatInteger(this.effectiveLang(), d.root) })}</span>
				<span class=${`badge ${NATURE_TONE[d.nature] ?? ''}`}>${NATURE_LABEL[d.nature] ? this.t(NATURE_LABEL[d.nature]) : humanize(d.nature)}</span>
				${
					typeof d.sameAs === 'number'
						? html`<span class="badge">${this.t('Same meaning as {{n}}', { n: formatInteger(this.effectiveLang(), d.sameAs) })}</span>`
						: nothing
				}
			</div>
			${d.meaning && !this.hideReadings ? html`<p class="meaning" part="section readings">${d.meaning}</p>` : nothing}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-compound-number': RoxyCompoundNumber;
	}
}
