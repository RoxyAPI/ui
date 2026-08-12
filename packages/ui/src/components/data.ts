import { css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatNumber, formatTime } from '../utils/format.js';
import { foldLocalized } from '../utils/localized.js';
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
 * Every word this component writes goes through `this.t()`, which is not
 * optional politeness: `suppress()` already folds the API's localized values
 * into their canonical columns, so before the catalogue landed a Spanish page
 * read `Sol` and `Piscis` under `Yes`, `No` and `31 rows` in English. What a
 * catalogue CANNOT reach is the column headings, which come from the wire field
 * name through `humanize()` and are therefore computed per response; those stay
 * English on both this path and the PHP one, which at least keeps them
 * consistent with each other. The PHP twin has none of these strings yet, so
 * the JS and no-JS paths currently disagree on the chrome as well as the fold
 * (see lesson 6 for why that matters).
 *
 * When a schema declares an `x-roxy-ui` hint, a future dispatcher can opt
 * into a hand-tuned component instead of this fallback.
 */

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Scalar = string | number | boolean;

const TITLE_KEYS = ['title', 'name', 'label', 'heading', 'overview', 'summary'];
/** A title is a label, not a paragraph. `overview`/`summary` are only title candidates when a response carries no real name, and a whole paragraph promoted to an <h3> is worse than no title at all. */
const MAX_TITLE_LEN = 80;
const IMAGE_KEYS = ['imageUrl', 'image', 'icon', 'symbol'];
const SKIP_KEYS = ['imageUrl', 'image']; // rendered separately, not in body rows
const QUOTE_KEYS = ['affirmation', 'mantra', 'motto', 'quote'];

/**
 * Response fields that are engineer-facing noise on a reading card, and the rules for hiding them.
 *
 * @remarks
 * This mirrors `SUPPRESS_*` in the WordPress plugin's `src/Support/GenericRenderer.php`. Both render the SAME API responses for the same visitor: `roxy-data` when JavaScript runs, the PHP renderer when it does not. If the two disagree the page visibly changes content on hydration, so they must be kept in sync.
 *
 * Without this, a real `/numerology/life-path` card printed "Calculation: Month: 6, Day: 15 -> 1+5 = 6, Year: 1990 -> ...", "Type: Single", and a list endpoint printed "Total: 78, Limit: 3, Offset: 0". That is how the number was derived and how the API paginates: it is not the reading the visitor asked for.
 */
const SUPPRESS_ALWAYS = new Set(['seed']);
/** Suppressed only when the object carries a title: an untitled record still needs its identifier. */
const SUPPRESS_NAMED = new Set(['id', 'slug', 'key']);
const SUPPRESS_NOISE = new Set([
	'calculation',
	'calculations',
	'type', // schema discriminator ("single", "general"): indexes a polymorphic shape, means nothing on a card
	'position', // pinnacle/challenge index: already carried by the row order
	'count',
	'totalcount',
	'total',
	'limit',
	'offset',
	'page',
	'pagesize',
	'perpage',
]);

/** Sections with more keys than this, and tables with more rows than this, collapse into `<details>`. */
const DETAILS_KEYS = 8;
/** Depth at which a section folds shut by default rather than rendering open. */
const DEEP_DEPTH = 1;
const DETAILS_ROWS = 12;

const normKey = (k: string): string => k.toLowerCase().replace(/[_-]/g, '');

/**
 * `hasKarmicDebt` / `is_master`: a true reads better as a badge than as the row "Has karmic debt: Yes".
 *
 * @remarks
 * Presentation only. The PHP twin also DROPS the false case as "silence, not data", and this deliberately does not follow it there: a generic renderer must never lose a fact the response carries, and `isRetrograde: false` (a planet in direct motion) is a real reading, not an absence. Suppression is reserved for fields that are provably not part of the reading at all, which is what {@link SUPPRESS_NOISE} enumerates.
 *
 * Matching on the camel boundary rejects `island` / `issue` / `history`, which a bare `startsWith('is')` would swallow. The PHP twin tests `strpos($key, 'has_')` against a camelCase key, so its badge branch never actually fires; it hard-suppresses the three keys it knew about instead.
 */
const isBadgeKey = (k: string): boolean => /^(has|is)([A-Z_]|$)/.test(k);

const ISO_DATE =
	/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$/;
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

/**
 * True when a value would render as nothing: `[]`, `{}`, or an object whose every value is itself empty.
 *
 * @remarks
 * An empty object still counts as {@link isComplex}, so it is promoted to a full-width section and draws a heading over a blank body. This is the generic fallback renderer for endpoints with no bespoke component, so it receives whatever shape the API returns and a heading with nothing under it is the most visible way it can look broken.
 *
 * Recursive because emptiness nests: `{ breakdown: { western: [], vedic: [] } }` has keys at the top level and still renders as nothing.
 */
function isEmptyValue(value: Json): boolean {
	if (value === null || value === undefined) return true;
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value !== 'object') return false;
	const values = Object.values(value as Record<string, Json>);
	return values.length === 0 || values.every(isEmptyValue);
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
				/* The label column is capped at 30%. A bare max-content lets ONE long key
				 * ("Additional Insights") set the width for every row and starve the values,
				 * and a bare 1fr floors at min-content so a long value cannot shrink. */
				grid-template-columns: minmax(8ch, min(30%, max-content)) minmax(0, 1fr);
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
				min-width: 0;
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
			/* Scalar column: as narrow as its content allows. A 1% width on an auto
			 * table is the standard way to say that, and the remaining auto column
			 * absorbs everything left. See renderTable for why. */
			table.roxy-table th.col-tight,
			table.roxy-table td.col-tight {
				width: 1%;
				white-space: nowrap;
			}
			/* Column holding nested data: take the width the scalars gave back. */
			table.roxy-table th.col-wide,
			table.roxy-table td.col-wide {
				width: auto;
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

			blockquote.roxy-quote {
				margin: var(--roxy-space-md, 1rem) 0;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-left: 3px solid var(--roxy-accent, #f59e0b);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-style: italic;
			}

			/* --roxy-fg on the tint, never --roxy-muted: muted on a tinted
			 * color-mix measures 4.24:1 and fails WCAG AA. The tint carries the
			 * accent, the text stays high-contrast. */
			.roxy-badge {
				display: inline-block;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			details.roxy-section,
			details.roxy-table-details {
				margin-top: var(--roxy-space-md, 1rem);
			}
			details.roxy-section > summary,
			details.roxy-table-details > summary {
				cursor: pointer;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
				text-transform: capitalize;
			}
			details.roxy-section > summary:focus-visible,
			details.roxy-table-details > summary:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
				border-radius: 4px;
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
				${this.t('Nested data omitted')}
			</div>`;
		}
		return html`<div class="roxy-card" part="card" aria-label=${this.t('Generic data display')}>
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
			return html`<div class="roxy-empty" role="status">${this.t('Empty list')}</div>`;
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
		const clean = rows.map((r) => this.suppress(r));
		const keys = this.collectKeys(clean);

		/**
		 * A column holding nested data needs the width; a column holding a short scalar does not.
		 *
		 * @remarks
		 * Browsers lay an auto table out by content, so a `date` column of ten characters and a `positions` column holding a whole nested table settle at roughly half the width each, and the nested one is the one that ends up cramped. Marking each column by what it actually CONTAINS lets the scalar columns collapse to their content (`width: 1%` is the standard way to say "as narrow as your content allows") and the nested column absorb everything left over. No fixed percentage: the split follows the data.
		 *
		 * Only worth doing when the row is mixed. If every column is scalar, or every column is nested, there is nothing to bias toward and the browser's own distribution is already right.
		 */
		const complex = new Set(
			keys.filter((k) => clean.some((r) => isComplex(r[k] ?? null))),
		);
		const mixed = complex.size > 0 && complex.size < keys.length;
		const colClass = (k: string) =>
			mixed ? (complex.has(k) ? 'col-wide' : 'col-tight') : '';

		const table = html`<div
			class="roxy-table-wrap"
			part="table"
			role="group"
			aria-label=${this.t('Data table')}
			tabindex="0"
		>
			<table class="roxy-table" role="table">
				<thead>
					<tr>
						${keys.map(
							(k) => html`<th class=${colClass(k)}>${humanize(k)}</th>`,
						)}
					</tr>
				</thead>
				<tbody>
					${clean.map(
						(row) => html`<tr>
							${keys.map(
								(k) =>
									html`<td class=${colClass(k)}>
										${this.renderCell(row[k], k)}
									</td>`,
							)}
						</tr>`,
					)}
				</tbody>
			</table>
		</div>`;
		// A 78-row angel-number list or a 27-row nakshatra table is a scroll trap
		// inline. Past the threshold it folds away behind its own row count.
		if (clean.length > DETAILS_ROWS) {
			return html`<details class="roxy-table-details">
				<summary>${this.t('{{count}} rows', { count: clean.length })}</summary>
				${table}
			</details>`;
		}
		return table;
	}

	/**
	 * Drop the fields that are noise on a reading card, and fold each localized twin into the field it translates. See {@link SUPPRESS_NOISE} and {@link foldLocalized}.
	 *
	 * @remarks
	 * The single funnel for BOTH render paths, the table and the object, which is why the fold belongs here: it is one call and no column-building or row-building code has to know the convention exists. Folding runs FIRST, so a field this then suppresses takes its translation with it rather than leaving `Type Localized` standing where `Type` was hidden.
	 */
	private suppress(obj: Record<string, Json>): Record<string, Json> {
		const folded = foldLocalized(obj);
		const titled = TITLE_KEYS.some((k) => typeof folded[k] === 'string');
		return Object.fromEntries(
			Object.entries(folded).filter(([k]) => {
				const n = normKey(k);
				if (SUPPRESS_ALWAYS.has(n)) return false;
				if (titled && SUPPRESS_NAMED.has(n)) return false;
				return !SUPPRESS_NOISE.has(n);
			}),
		);
	}

	private renderObject(input: Record<string, Json>): TemplateResult {
		const obj = this.suppress(input);
		const titleKey = TITLE_KEYS.find(
			(k) =>
				typeof obj[k] === 'string' &&
				(obj[k] as string).length <= MAX_TITLE_LEN,
		);
		const imageKey = IMAGE_KEYS.find(
			(k) =>
				typeof obj[k] === 'string' && (obj[k] as string).startsWith('http'),
		);
		const summaryKey =
			titleKey !== 'summary' && typeof obj.summary === 'string'
				? 'summary'
				: null;
		const quoteKey = QUOTE_KEYS.find((k) => typeof obj[k] === 'string');
		const entries = Object.entries(obj).filter(
			([k, v]) =>
				k !== titleKey &&
				k !== summaryKey &&
				k !== quoteKey &&
				!SKIP_KEYS.includes(k) &&
				!isEmptyValue(v),
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
						alt=${titleKey ? String(obj[titleKey]) : this.t('illustration')}
						loading="lazy"
					/>`
					: nothing
			}
			${titleKey ? html`<h3 class="roxy-title" part="header">${obj[titleKey]}</h3>` : nothing}
			${summaryKey ? html`<p class="roxy-summary">${obj[summaryKey]}</p>` : nothing}
			${quoteKey ? html`<blockquote class="roxy-quote">${obj[quoteKey]}</blockquote>` : nothing}
			${
				rows.length > 0
					? html`<dl class="roxy-rows" part="details">
						${rows.map(
							([k, v]) => html`
								<dt>${humanize(k)}</dt>
								<dd>${this.renderField(v, k)}</dd>
							`,
						)}
					</dl>`
					: nothing
			}
			${sections.map(([k, v]) => this.renderSection(k, v))}
		`;
	}

	/**
	 * A named block of nested data. Collapses into `<details>` once it carries more than {@link DETAILS_KEYS} keys, so one fat object (a 27-nakshatra map, a 12-house table) cannot bury the rest of the card under a wall of rows.
	 *
	 * @remarks
	 * Deliberately carries no `part`. The heading here IS a response key, so the only name this block could take is computed, and `roxy-reference-card` is the one component allowed to derive a part at runtime (`catalog.test.ts` pins it as the only one). A bare `part="section"` is the other tempting option and is worse: the vocabulary pairs `section` with a specific name precisely so `::part(section patterns)` addresses ONE block, and a token that lands identically on every key of every response addresses none of them.
	 */
	private renderSection(key: string, value: Json): TemplateResult {
		const size =
			value !== null && typeof value === 'object'
				? Array.isArray(value)
					? value.length
					: Object.keys(value).length
				: 0;
		const body = this.renderField(value, key);
		const heading = humanize(key);
		// Past depth 1 a section folds shut by default. A real /numerology/chart response
		// rendered every level open and grew to a 29,933px-tall element, about thirty
		// screens of correct but unusable output. The reader opens what they want.
		if (size > DETAILS_KEYS || this.depth >= DEEP_DEPTH) {
			return html`<details class="roxy-section" ?open=${this.depth < DEEP_DEPTH}>
				<summary>${heading}</summary>
				${body}
			</details>`;
		}
		return html`<div class="roxy-section">
			<h4>${heading}</h4>
			${body}
		</div>`;
	}

	private renderField(value: Json, key?: string): TemplateResult | string {
		if (value === null || value === undefined) return '';
		if (value === true && key !== undefined && isBadgeKey(key)) {
			return html`<span class="roxy-badge">${this.t('Yes')}</span>`;
		}
		if (isPrimitive(value)) return html`${this.scalarTemplate(value)}`;
		if (Array.isArray(value) && value.every(isPrimitive)) {
			return this.renderChips(value as (Scalar | null)[]);
		}
		// `bare`: a nested card inside a card compounds padding and border at every
		// level, and by depth 3 the innermost object was rendering into a fraction of the
		// width with prose wrapping to two words a line.
		return html`<roxy-data
			bare
			lang=${ifDefined(this.effectiveLang())}
			.data=${value}
			.depth=${this.depth + 1}
		></roxy-data>`;
	}

	private renderCell(
		value: Json | undefined,
		key?: string,
	): TemplateResult | string {
		if (value === null || value === undefined) return '';
		if (value === true && key !== undefined && isBadgeKey(key)) {
			return html`<span class="roxy-badge">${this.t('Yes')}</span>`;
		}
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
			lang=${ifDefined(this.effectiveLang())}
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
		if (typeof value === 'boolean') return value ? this.t('Yes') : this.t('No');
		if (ISO_DATE.test(value)) {
			const time = formatTime(this.effectiveLang(), value);
			const date = formatDate(this.effectiveLang(), value);
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
