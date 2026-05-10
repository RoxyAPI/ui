import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { GetYogaResponse, ListYogasResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';

type YogaListData =
	| ListYogasResponse
	| GetYogaResponse
	| { yogas: Array<GetYogaResponse> };

/**
 * Yoga catalog and detail renderer. Accepts three data modes:
 *   - Catalog: ListYogasResponse (yogas array of {id, name} + total)
 *   - Detail: GetYogaResponse (single yoga with description, result, quality)
 *   - Detail array: { yogas: Array<GetYogaResponse> } for pre-filtered sets
 *
 * Catalog and detail-array modes include a live search filter.
 */
@customElement('roxy-yoga-list')
export class RoxyYogaList extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
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
				background: var(--roxy-bg, #fff);
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
				background: var(--roxy-bg, #fff);
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
				background: var(--roxy-bg, #fff);
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
			.description {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
				line-height: var(--roxy-leading-normal, 1.5);
			}
			details {
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			details summary {
				cursor: pointer;
				color: var(--roxy-accent-fg, #b45309);
				font-weight: 500;
				padding: 0.25em 0;
				list-style: none;
				display: flex;
				align-items: center;
				gap: 0.4em;
			}
			details summary::before {
				content: '+';
				font-size: 1.1em;
				line-height: 1;
			}
			details[open] summary::before {
				content: '-';
			}
			details .result-body {
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

	@property({ attribute: false })
	data: YogaListData | null = null;

	@state()
	private filter = '';

	private readonly handleInput = (e: Event) => {
		this.filter = (e.target as HTMLInputElement).value;
	};

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

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No yoga data</div>`;

		const d = this.data;
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
									<span class="yoga-id">${y.id}</span>
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
