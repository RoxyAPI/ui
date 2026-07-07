import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatNumber, formatTime } from '../utils/format.js';
import { humanize } from '../utils/string.js';

/**
 * Generic fallback renderer. Accepts ANY OpenAPI response shape and renders
 * it via field-name heuristics so future spec additions render reasonably
 * without hand-wired components.
 *
 * Heuristic order:
 *   1. Primitive (string, number, boolean) -> single line.
 *   2. Array of primitives -> chip list.
 *   3. Array of objects with shared keys -> table.
 *   4. Object with title-like field -> card with key/value rows; object and
 *      object-array values promote to full-width sections below the rows so
 *      nested tables keep the whole container width.
 *   5. Otherwise -> definition list of all keys.
 *
 * Scalar display rules (shared by rows, chips, and table cells): numbers
 * round to 2 decimals, booleans read Yes/No, ISO dates and datetimes format
 * for the locale, SCREAMING_SNAKE enums humanize, http(s) strings link out.
 *
 * When a schema declares an `x-roxy-ui` hint, a future dispatcher can opt
 * into a hand-tuned component instead of this fallback.
 */

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Scalar = string | number | boolean;

const TITLE_KEYS = ['title', 'name', 'label', 'heading', 'overview', 'summary'];
const IMAGE_KEYS = ['imageUrl', 'image', 'icon', 'symbol'];
const SKIP_KEYS = ['imageUrl', 'image']; // rendered separately, not in body rows

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;
const ENUM_STRING = /^[A-Z0-9]+(_[A-Z0-9]+)+$/;
const LINK_STRING = /^https?:\/\//;

// Hard cap on recursion. Real RoxyAPI responses nest at most 5-6 deep; anything
// deeper is either a circular reference (which would otherwise infinite-loop)
// or a payload too rich for the generic fallback to render usefully. The
// recursion is otherwise safe: <roxy-data> is registered globally by its
// `@customElement` decorator on import, so the nested template resolves to
// this same class without a separate import.
const MAX_DEPTH = 6;

function isPrimitive(value: Json | undefined): value is Scalar | null {
	return (
		value === null || ['string', 'number', 'boolean'].includes(typeof value)
	);
}

/** Object or object-bearing array: needs full width, never fits a dl value cell. */
function isComplex(value: Json): boolean {
	return (
		value !== null &&
		typeof value === 'object' &&
		!(Array.isArray(value) && value.every(isPrimitive))
	);
}

@customElement('roxy-data')
export class RoxyData extends RoxyDataElement<Json> {
	static styles = [
		baseStyles,
		css`
			.roxy-card {
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}

			.roxy-card a {
				color: var(--roxy-accent-ink, #b45309);
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

			.roxy-table-wrap {
				overflow-x: auto;
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
				word-break: normal;
				overflow-wrap: normal;
			}
			table.roxy-table th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
				white-space: nowrap;
			}

			.roxy-image {
				max-width: 100%;
				height: auto;
				border-radius: var(--roxy-radius-md, 8px);
				margin-bottom: var(--roxy-space-md, 1rem);
			}

			.roxy-section {
				margin-top: var(--roxy-space-md, 1rem);
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

	/**
	 * Internal recursion depth. Nested <roxy-data> instances inherit this from the parent and increment to guard against circular references in the input. Not part of the public API; do not set from consumer code.
	 */
	@property({ attribute: false })
	depth = 0;

	protected renderData(data: Json) {
		if (this.depth >= MAX_DEPTH) {
			return html`<div class="roxy-empty" role="status">
				Nested data omitted
			</div>`;
		}
		return html`<div class="roxy-card" aria-label="Generic data display">
			${this.renderValue(data)}
		</div>`;
	}

	private renderValue(value: Json): TemplateResult | typeof nothing {
		if (value === null || value === undefined) return nothing;
		if (isPrimitive(value)) return html`<p>${this.scalarTemplate(value)}</p>`;
		if (Array.isArray(value)) return this.renderArray(value);
		return this.renderObject(value as Record<string, Json>);
	}

	private renderArray(arr: Json[]): TemplateResult {
		if (arr.length === 0) {
			return html`<div class="roxy-empty" role="status">Empty list</div>`;
		}
		if (arr.every(isPrimitive)) {
			return this.renderChips(arr as (Scalar | null)[]);
		}
		const allObjects = arr.every(
			(v) => v !== null && typeof v === 'object' && !Array.isArray(v),
		);
		if (allObjects) return this.renderTable(arr as Record<string, Json>[]);
		return html`<ol>
			${arr.map((v) => html`<li>${this.renderValue(v)}</li>`)}
		</ol>`;
	}

	private renderChips(arr: (Scalar | null)[]): TemplateResult {
		return html`<ul class="roxy-chips">
			${arr
				.filter((v): v is Scalar => v !== null)
				.map((v) => html`<li>${this.formatScalar(v)}</li>`)}
		</ul>`;
	}

	private renderTable(rows: Record<string, Json>[]): TemplateResult {
		const keys = this.collectKeys(rows);
		return html`<div
			class="roxy-table-wrap"
			role="group"
			aria-label="Data table"
			tabindex="0"
		>
			<table class="roxy-table" role="table">
				<thead>
					<tr>
						${keys.map((k) => html`<th>${humanize(k)}</th>`)}
					</tr>
				</thead>
				<tbody>
					${rows.map(
						(row) => html`<tr>
							${keys.map((k) => html`<td>${this.renderCell(row[k])}</td>`)}
						</tr>`,
					)}
				</tbody>
			</table>
		</div>`;
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
		const entries = Object.entries(obj).filter(
			([k, v]) =>
				k !== titleKey &&
				k !== summaryKey &&
				!SKIP_KEYS.includes(k) &&
				v !== null &&
				v !== undefined,
		);
		// Scalars and primitive arrays fit the two-column rows; objects and
		// object arrays promote to full-width sections so nested tables are
		// not squeezed into the value column.
		const rows = entries.filter(([, v]) => !isComplex(v));
		const sections = entries.filter(([, v]) => isComplex(v));

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
								<dt>${humanize(k)}</dt>
								<dd>${this.renderField(v)}</dd>
							`,
						)}
					</dl>`
					: nothing
			}
			${sections.map(
				([k, v]) => html`<div class="roxy-section">
					<h4>${humanize(k)}</h4>
					${this.renderField(v)}
				</div>`,
			)}
		`;
	}

	private renderField(value: Json): TemplateResult | string {
		if (value === null || value === undefined) return '';
		if (isPrimitive(value)) return html`${this.scalarTemplate(value)}`;
		if (Array.isArray(value) && value.every(isPrimitive)) {
			return this.renderChips(value as (Scalar | null)[]);
		}
		return html`<roxy-data .data=${value} .depth=${this.depth + 1}></roxy-data>`;
	}

	private renderCell(value: Json | undefined): TemplateResult | string {
		if (value === null || value === undefined) return '';
		if (isPrimitive(value)) return this.scalarTemplate(value);
		if (Array.isArray(value) && value.every(isPrimitive)) {
			return (value as (Scalar | null)[])
				.filter((v): v is Scalar => v !== null)
				.map((v) => this.formatScalar(v))
				.join(', ');
		}
		// Nested object or object array inside a row: recurse instead of
		// stringifying to [object Object]. `bare` drops the card surface so
		// the cell does not paint a card inside a cell.
		return html`<roxy-data
			bare
			.data=${value}
			.depth=${this.depth + 1}
		></roxy-data>`;
	}

	private scalarTemplate(value: Scalar): TemplateResult | string {
		if (typeof value === 'string' && LINK_STRING.test(value)) {
			return html`<a href=${value} target="_blank" rel="noopener noreferrer"
				>${value}</a
			>`;
		}
		return this.formatScalar(value);
	}

	private formatScalar(value: Scalar): string {
		if (typeof value === 'number') {
			return formatNumber(value, 2) || String(value);
		}
		if (typeof value === 'boolean') return value ? 'Yes' : 'No';
		if (ISO_DATE.test(value)) {
			const time = formatTime(value);
			const date = formatDate(value);
			return time ? `${date}, ${time}` : date;
		}
		if (ENUM_STRING.test(value)) return humanize(value.toLowerCase());
		return value;
	}

	private collectKeys(rows: Record<string, Json>[]): string[] {
		const seen = new Set<string>();
		for (const row of rows) {
			for (const k of Object.keys(row)) seen.add(k);
		}
		return Array.from(seen);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-data': RoxyData;
	}
}
