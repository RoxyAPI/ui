import { css, html, LitElement, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

/**
 * Generic fallback renderer. Accepts ANY OpenAPI response shape and renders it
 * via field-name heuristics so future spec additions render reasonably without
 * hand-wired components. Mirrors the WordPress GenericRenderer pattern.
 *
 * Heuristic order:
 *   1. Primitive (string, number, boolean) -> single line.
 *   2. Array of primitives -> chip list.
 *   3. Array of objects with shared keys -> table.
 *   4. Object with title-like field -> card with key/value rows.
 *   5. Otherwise -> definition list of all keys.
 *
 * Future spec hint: when the server emits `x-roxy-ui` on a schema, the
 * dispatcher in tool-call (Phase 2.5) will select a hand-tuned component
 * instead of this fallback.
 */

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const TITLE_KEYS = ['title', 'name', 'label', 'heading', 'overview', 'summary'];
const IMAGE_KEYS = ['imageUrl', 'image', 'icon', 'symbol'];
const SKIP_KEYS = ['imageUrl', 'image']; // rendered separately, not in body rows

// Hard cap on recursion. Real RoxyAPI responses nest at most 5-6 deep; anything
// deeper is either a circular reference (which would otherwise infinite-loop)
// or a payload too rich for the generic fallback to render usefully. The
// recursion is otherwise safe: <roxy-data> is registered globally by its
// `@customElement` decorator on import, so the nested template resolves to
// this same class without a separate import.
const MAX_DEPTH = 6;

@customElement('roxy-data')
export class RoxyData extends LitElement {
	static styles = [
		baseStyles,
		css`
			.roxy-card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}

			.roxy-title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-sm, 0.5rem) 0;
				color: var(--roxy-primary, #0f172a);
				letter-spacing: var(--roxy-tracking-tight);
			}

			.roxy-summary {
				color: var(--roxy-secondary, #475569);
				margin: 0 0 var(--roxy-space-md, 1rem) 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			dl.roxy-rows {
				margin: 0;
				display: grid;
				grid-template-columns: minmax(8ch, max-content) 1fr;
				gap: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
			}
			dl.roxy-rows dt {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				text-transform: capitalize;
			}
			dl.roxy-rows dd {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				word-break: break-word;
			}

			ul.roxy-chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: 0;
				margin: 0;
				list-style: none;
			}
			ul.roxy-chips li {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			table.roxy-table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table.roxy-table th,
			table.roxy-table td {
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem);
				text-align: left;
				text-transform: none;
			}
			table.roxy-table th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}

			.roxy-image {
				max-width: 100%;
				height: auto;
				border-radius: var(--roxy-radius-md, 8px);
				margin-bottom: var(--roxy-space-md, 1rem);
			}

			.roxy-section {
				margin-bottom: var(--roxy-space-md, 1rem);
			}
			.roxy-section h4 {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				text-transform: capitalize;
			}
		`,
	];

	@property({ attribute: false })
	data: Json = null;

	/**
	 * Internal recursion depth. Nested <roxy-data> instances inherit this from
	 * the parent and increment to guard against circular references in the
	 * input. Not part of the public API; do not set from consumer code.
	 */
	@property({ attribute: false })
	depth = 0;

	render() {
		if (this.data == null) {
			return html`<div class="roxy-empty" role="status">No data</div>`;
		}
		if (this.depth >= MAX_DEPTH) {
			return html`<div class="roxy-empty" role="status">…</div>`;
		}
		return html`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`;
	}

	private renderValue(value: Json): TemplateResult | typeof nothing {
		if (value === null || value === undefined) return nothing;
		if (typeof value === 'string') return html`<p>${value}</p>`;
		if (typeof value === 'number' || typeof value === 'boolean') {
			return html`<p>${String(value)}</p>`;
		}
		if (Array.isArray(value)) return this.renderArray(value);
		return this.renderObject(value as Record<string, Json>);
	}

	private renderArray(arr: Json[]): TemplateResult {
		if (arr.length === 0) {
			return html`<div class="roxy-empty" role="status">Empty list</div>`;
		}
		const allPrimitive = arr.every(
			(v) => v === null || ['string', 'number', 'boolean'].includes(typeof v),
		);
		if (allPrimitive) {
			return html`<ul class="roxy-chips">
				${arr.map((v) => html`<li>${String(v)}</li>`)}
			</ul>`;
		}
		const allObjects = arr.every(
			(v) => v !== null && typeof v === 'object' && !Array.isArray(v),
		);
		if (allObjects) return this.renderTable(arr as Record<string, Json>[]);
		return html`<ol>
			${arr.map((v) => html`<li>${this.renderValue(v)}</li>`)}
		</ol>`;
	}

	private renderTable(rows: Record<string, Json>[]): TemplateResult {
		const keys = this.collectKeys(rows);
		return html`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${keys.map((k) => html`<th>${this.humanize(k)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${rows.map(
					(row) => html`<tr>
						${keys.map((k) => html`<td>${this.formatPrimitive(row[k])}</td>`)}
					</tr>`,
				)}
			</tbody>
		</table>`;
	}

	private renderObject(obj: Record<string, Json>): TemplateResult {
		const titleKey = TITLE_KEYS.find((k) => typeof obj[k] === 'string');
		const imageKey = IMAGE_KEYS.find(
			(k) =>
				typeof obj[k] === 'string' && (obj[k] as string).startsWith('http'),
		);
		const summaryKey =
			titleKey !== 'summary' && typeof obj.summary === 'string'
				? 'summary'
				: null;
		const rows = Object.entries(obj).filter(
			([k, v]) =>
				k !== titleKey &&
				k !== summaryKey &&
				!SKIP_KEYS.includes(k) &&
				v !== null &&
				v !== undefined,
		);

		return html`
			${
				imageKey
					? html`<img
						class="roxy-image"
						src=${String(obj[imageKey])}
						alt=${titleKey ? String(obj[titleKey]) : 'illustration'}
						loading="lazy"
					/>`
					: nothing
			}
			${titleKey ? html`<h3 class="roxy-title">${obj[titleKey]}</h3>` : nothing}
			${summaryKey ? html`<p class="roxy-summary">${obj[summaryKey]}</p>` : nothing}
			${
				rows.length > 0
					? html`<dl class="roxy-rows">
						${rows.map(
							([k, v]) => html`
								<dt>${this.humanize(k)}</dt>
								<dd>${this.renderField(v)}</dd>
							`,
						)}
					</dl>`
					: nothing
			}
		`;
	}

	private renderField(value: Json): TemplateResult | string {
		if (value === null || value === undefined) return '';
		if (typeof value === 'string') return value;
		if (typeof value === 'number' || typeof value === 'boolean')
			return String(value);
		if (Array.isArray(value)) {
			const allPrimitive = value.every((v) =>
				['string', 'number', 'boolean'].includes(typeof v),
			);
			if (allPrimitive) {
				return html`<ul class="roxy-chips">
					${value.map((v) => html`<li>${String(v)}</li>`)}
				</ul>`;
			}
		}
		return html`<roxy-data .data=${value} .depth=${this.depth + 1}></roxy-data>`;
	}

	private formatPrimitive(value: Json | undefined): string {
		if (value === null || value === undefined) return '';
		if (typeof value === 'string') return value;
		if (typeof value === 'number' || typeof value === 'boolean')
			return String(value);
		if (Array.isArray(value)) return value.map(String).join(', ');
		return JSON.stringify(value);
	}

	private collectKeys(rows: Record<string, Json>[]): string[] {
		const seen = new Set<string>();
		for (const row of rows) {
			for (const k of Object.keys(row)) seen.add(k);
		}
		return Array.from(seen);
	}

	private humanize(key: string): string {
		return key
			.replace(/[_-]+/g, ' ')
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/^\w/, (c) => c.toUpperCase());
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-data': RoxyData;
	}
}
