import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type {
	DetectYogasResponse,
	GetYogaResponse,
	ListYogasResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

type YogaListData =
	| ListYogasResponse
	| GetYogaResponse
	| DetectYogasResponse
	| { yogas: Array<GetYogaResponse> };

type DetectedYoga = DetectYogasResponse['yogas'][number];

/**
 * True when a yoga matched its own rule but a stronger family silenced it under the classical precedence norms, rather than failing the rule outright. The response states which in its `evidence`.
 *
 * The two are genuinely different to a reader: a failed rule says nothing about the chart, while "Kedara would apply but Pasa outranks it" is a real feature of it.
 */
function isOutranked(y: DetectedYoga): boolean {
	return /classically (outranks|suppresses)/i.test(y.evidence ?? '');
}

/** The three detect verdicts in reading order, each with the note that explains the group. Ordered by what a reader wants first: what fired, what nearly fired, then the rest as reference. */
const VERDICTS = [
	{
		id: 'present',
		label: 'Present',
		open: true,
		note: 'Every classical condition is satisfied by this chart.',
	},
	{
		id: 'outranked',
		label: 'Outranked',
		open: true,
		note: 'The rule matched, but a stronger family silences it under the classical precedence norms.',
	},
	{
		id: 'absent',
		label: 'Not present',
		open: false,
		note: 'At least one classical condition fails. Read the evidence for which.',
	},
] as const;

type Verdict = (typeof VERDICTS)[number]['id'];

/**
 * Yoga catalog and detail renderer. Accepts four data modes:
 *   - Catalog: ListYogasResponse (yogas array of {id, name} + total)
 *   - Detail: GetYogaResponse (single yoga with description, result, quality)
 *   - Detail array: { yogas: Array<GetYogaResponse> } for pre-filtered sets
 *   - Detect: DetectYogasResponse (each yoga carries a present verdict + evidence); grouped by verdict, each badged present, outranked or not present, with its classical evidence
 *
 * All multi-item modes include a live search filter.
 *
 * @remarks
 * Detect returns a verdict for every yoga in the detected set on every chart, of which a real chart fires low single digits, so a flat list buries the handful a reader came for. They are grouped by verdict, in reading order: what fired, what would have fired but was outranked, then everything that failed its rule, collapsed because it is reference rather than result. Every grouping and every label is read from the response, so this component holds no table of yoga data of its own.
 */
@customElement('roxy-yoga-list')
export class RoxyYogaList extends RoxyDataElement<YogaListData> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.count {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}
			.search-wrap {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.search {
				width: 100%;
				max-width: 280px;
				padding: 0.35em 0.75em;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-family: var(--roxy-font-sans);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				outline: none;
			}
			.search::placeholder {
				color: var(--roxy-fg, #0a0a0a);
				opacity: 0.65;
			}
			.search:focus {
				border-color: var(--roxy-accent, #f59e0b);
				box-shadow: 0 0 0 2px color-mix(in srgb, var(--roxy-accent, #f59e0b) 30%, transparent);
			}
			.grid {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
				grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
			}
			.yoga-chip {
				padding: 0.4em 0.8em;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				word-break: break-word;
			}
			.yoga-chip .yoga-id {
				display: block;
				font-size: 0.7em;
				color: var(--roxy-fg, #0a0a0a);
				opacity: 0.75;
				margin-top: 0.15em;
			}
			.detail-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				background: var(--roxy-surface, #fff);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.detail-name {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.quality-chip {
				display: inline-block;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
				padding: 0.15em 0.6em;
				border-radius: 999px;
			}
			.quality-Positive {
				background: color-mix(in srgb, var(--roxy-success, #22c55e) 18%, transparent);
				color: var(--roxy-success-fg, #15803d);
				border: 1px solid color-mix(in srgb, var(--roxy-success, #22c55e) 40%, transparent);
			}
			.quality-Negative {
				background: color-mix(in srgb, var(--roxy-danger, #ef4444) 18%, transparent);
				color: var(--roxy-danger-fg, #b91c1c);
				border: 1px solid color-mix(in srgb, var(--roxy-danger, #ef4444) 40%, transparent);
			}
			.quality-Both {
				background: color-mix(in srgb, var(--roxy-warning, #f59e0b) 18%, transparent);
				color: var(--roxy-warning-fg, #b45309);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #f59e0b) 40%, transparent);
			}
			.present-badge {
				display: inline-block;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
				padding: 0.15em 0.6em;
				border-radius: 999px;
			}
			.present-badge.is-present {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.present-badge.is-absent {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.present-badge.is-outranked {
				background: color-mix(in srgb, var(--roxy-warning, #f59e0b) 16%, transparent);
				color: var(--roxy-warning-fg, #b45309);
			}
			.detail-card.absent {
				opacity: 0.72;
			}
			/* An outranked yoga DID match its own rule, so it stays more legible than
			 * one that simply failed: it is a real feature of the chart that a
			 * stronger family silenced. */
			.detail-card.outranked {
				opacity: 0.88;
			}
			.group-stack {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.group {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.group-summary {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				cursor: pointer;
				list-style: none;
				color: var(--roxy-muted, #71717a);
			}
			.group-summary::before {
				content: '+';
				font-size: 1.1em;
				line-height: 1;
				color: var(--roxy-accent-ink, #b45309);
			}
			.group[open] > .group-summary::before {
				content: '-';
			}
			.group-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.group-count {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.group-note {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.evidence {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.description {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
				line-height: var(--roxy-leading-normal, 1.5);
			}
			/* Scoped to the card, never a bare details summary rule: a verdict group
			 * is itself a details element, so an unscoped details[open] summary rule
			 * would flip every card's Effects marker the moment its group opened. */
			.detail-card details {
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.detail-card details > summary {
				cursor: pointer;
				color: var(--roxy-accent-ink, #b45309);
				font-weight: 500;
				padding: 0.25em 0;
				list-style: none;
				display: flex;
				align-items: center;
				gap: 0.4em;
			}
			.detail-card details > summary::before {
				content: '+';
				font-size: 1.1em;
				line-height: 1;
			}
			.detail-card details[open] > summary::before {
				content: '-';
			}
			.detail-card details .result-body {
				padding-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.no-results {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				padding: var(--roxy-space-md, 1rem) 0;
				text-align: center;
			}
			.detail-grid {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
		`,
	];

	@state()
	private filter = '';

	private readonly handleInput = (e: Event) => {
		this.filter = (e.target as HTMLInputElement).value;
	};

	/** The verdict a detected yoga falls under. The one grouping the response itself supports, so nothing about the classical scheme is duplicated here. */
	private verdictOf(y: DetectedYoga): Verdict {
		return y.present ? 'present' : isOutranked(y) ? 'outranked' : 'absent';
	}

	/**
	 * One verdict group, or nothing when no yoga fell under it (a chart with no outranked yoga shows no Outranked heading).
	 *
	 * A `<details>` rather than a plain section: the rule-failed group is thirty-odd cards of reference on a real chart, and collapsing keeps it in the DOM, searchable and indexed, while the result stays at the top. A group forces itself open while a filter is active, so a match can never hide inside a collapsed heading.
	 */
	private renderVerdictGroup(
		verdict: (typeof VERDICTS)[number],
		yogas: DetectedYoga[],
	) {
		if (!yogas.length) return nothing;
		return html`<details class="group" ?open=${verdict.open || !!this.filter}>
			<summary class="group-summary">
				<span class="group-label">${verdict.label}</span>
				<span class="group-count">${yogas.length}</span>
			</summary>
			<p class="group-note">${verdict.note}</p>
			<div class="detail-grid">${yogas.map((y) => this.renderDetectCard(y))}</div>
		</details>`;
	}

	private renderQualityChip(quality: string) {
		const cls = `quality-chip quality-${quality}`;
		return html`<span class=${cls}>${quality}</span>`;
	}

	private renderDetailCard(yoga: GetYogaResponse) {
		return html`<div class="detail-card">
			<p class="detail-name">
				${yoga.name}
				${yoga.quality ? this.renderQualityChip(yoga.quality) : nothing}
			</p>
			${
				yoga.description
					? html`<p class="description">${yoga.description}</p>`
					: nothing
			}
			${
				yoga.result
					? html`<details>
						<summary>Effects</summary>
						<div class="result-body">${yoga.result}</div>
					</details>`
					: nothing
			}
		</div>`;
	}

	/** Detect-mode card: shows the three-way verdict (present, outranked, not present) and the classical evidence behind it. */
	private renderDetectCard(y: DetectedYoga) {
		const outranked = !y.present && isOutranked(y);
		const [cls, label] = y.present
			? ['is-present', 'Present']
			: outranked
				? ['is-outranked', 'Outranked']
				: ['is-absent', 'Not present'];
		return html`<div class="detail-card ${y.present ? '' : outranked ? 'outranked' : 'absent'}">
			<p class="detail-name">
				${y.name}
				${y.quality ? this.renderQualityChip(y.quality) : nothing}
				<span class="present-badge ${cls}">${label}</span>
			</p>
			${y.description ? html`<p class="description">${y.description}</p>` : nothing}
			${
				y.present && y.result
					? html`<details>
						<summary>Effects</summary>
						<div class="result-body">${y.result}</div>
					</details>`
					: nothing
			}
			${y.evidence ? html`<p class="evidence">${y.evidence}</p>` : nothing}
		</div>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No yoga data</div>`;
	}

	protected renderData(d: YogaListData) {
		const lc = this.filter.toLowerCase();

		// Detail mode: single GetYogaResponse
		if (
			'description' in d &&
			typeof (d as GetYogaResponse).description === 'string'
		) {
			const yoga = d as GetYogaResponse;
			return html`<div class="wrap">${this.renderDetailCard(yoga)}</div>`;
		}

		// Detail-array mode: { yogas: Array<GetYogaResponse> } where items have description
		if ('yogas' in d && Array.isArray((d as { yogas: unknown[] }).yogas)) {
			const allYogas = (
				d as { yogas: Array<GetYogaResponse | { id: string; name: string }> }
			).yogas;

			// Detect mode: every entry carries a `present` verdict. Group by verdict,
			// badge each present, outranked or not present, and surface the classical
			// evidence. Must precede the detail-array check because detect entries
			// also carry `description`.
			if (allYogas.length > 0 && 'present' in allYogas[0]) {
				const detected = allYogas as DetectedYoga[];
				const filtered = lc
					? detected.filter((y) => y.name.toLowerCase().includes(lc))
					: detected;
				const presentCount =
					(d as DetectYogasResponse).total ??
					detected.filter((y) => y.present).length;
				return html`<div class="wrap">
					<div class="head">
						<h2 class="title">Detected yogas</h2>
						<span class="count">${presentCount} of ${detected.length} present</span>
					</div>
					<div class="search-wrap">
						<input
							class="search"
							type="search"
							placeholder="Filter yogas..."
							aria-label="Filter detected yogas by name"
							.value=${this.filter}
							@input=${this.handleInput}
						/>
					</div>
					<div
						class="group-stack"
						role="region"
						aria-live="polite"
						aria-label="Detected yogas"
					>
						${
							filtered.length > 0
								? VERDICTS.map((v) =>
										this.renderVerdictGroup(
											v,
											filtered.filter((y) => this.verdictOf(y) === v.id),
										),
									)
								: html`<p class="no-results">No yogas match your search.</p>`
						}
					</div>
				</div>`;
			}

			const isDetailArray = allYogas.length > 0 && 'description' in allYogas[0];

			if (isDetailArray) {
				const detailYogas = allYogas as GetYogaResponse[];
				const filtered = lc
					? detailYogas.filter((y) => y.name.toLowerCase().includes(lc))
					: detailYogas;
				const total = (d as ListYogasResponse).total;
				return html`<div class="wrap">
					<div class="head">
						<h2 class="title">Yoga catalog</h2>
						${
							total !== undefined
								? html`<span class="count">${total} total</span>`
								: nothing
						}
					</div>
					<div class="search-wrap">
						<input
							class="search"
							type="search"
							placeholder="Filter yogas..."
							aria-label="Filter yoga list by name"
							.value=${this.filter}
							@input=${this.handleInput}
						/>
					</div>
					<div
						class="detail-grid"
						role="region"
						aria-live="polite"
						aria-label="Yoga results"
					>
						${
							filtered.length > 0
								? filtered.map((y) => this.renderDetailCard(y))
								: html`<p class="no-results">No yogas match your search.</p>`
						}
					</div>
				</div>`;
			}

			// Catalog mode: ListYogasResponse with {id, name} items
			const catalogYogas = allYogas as Array<{ id: string; name: string }>;
			const filtered = lc
				? catalogYogas.filter((y) => y.name.toLowerCase().includes(lc))
				: catalogYogas;
			const total = (d as ListYogasResponse).total;
			return html`<div class="wrap">
				<div class="head">
					<h2 class="title">Yoga catalog</h2>
					${
						total !== undefined
							? html`<span class="count">${total} total</span>`
							: nothing
					}
				</div>
				<div class="search-wrap">
					<input
						class="search"
						type="search"
						placeholder="Filter yogas..."
						aria-label="Filter yoga list by name"
						.value=${this.filter}
						@input=${this.handleInput}
					/>
				</div>
				<div
					class="grid"
					role="region"
					aria-live="polite"
					aria-label="Yoga results"
				>
					${
						filtered.length > 0
							? filtered.map(
									(y) => html`<div class="yoga-chip">
									${y.name}
								</div>`,
								)
							: html`<p class="no-results">No yogas match your search.</p>`
					}
				</div>
			</div>`;
		}

		return html`<div class="roxy-empty" role="status">No yoga data</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-yoga-list': RoxyYogaList;
	}
}
