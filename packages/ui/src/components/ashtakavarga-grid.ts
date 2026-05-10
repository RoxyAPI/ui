import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SIGN_GLYPH } from '../tokens/index.js';
import type { AshtakavargaResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';

type Tab = 'sarva' | 'bhinna' | 'pinda';

const TAB_LABELS: Record<Tab, string> = {
	sarva: 'Sarvashtakavarga',
	bhinna: 'Bhinnashtakavarga',
	pinda: 'Shodhya Pinda',
};

const TABS: Tab[] = ['sarva', 'bhinna', 'pinda'];

/**
 * Ashtakavarga grid with three tabbed views: Sarvashtakavarga, Bhinnashtakavarga,
 * and Shodhya Pinda. Pass `data` from /vedic-astrology/ashtakavarga.
 */
@customElement('roxy-ashtakavarga-grid')
export class RoxyAshtakavargaGrid extends LitElement {
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
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}

			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}

			/* Tabs */
			.tablist {
				display: flex;
				gap: 2px;
				border-bottom: 2px solid var(--roxy-border, #e4e4e7);
			}

			.tab {
				padding: var(--roxy-space-xs, 0.25rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				background: none;
				border: none;
				border-bottom: 2px solid transparent;
				margin-bottom: -2px;
				cursor: pointer;
				color: var(--roxy-muted, #71717a);
				font-family: inherit;
				transition: color var(--roxy-motion-duration, 200ms) var(--roxy-motion-easing, ease);
			}

			.tab[aria-selected='true'] {
				color: var(--roxy-accent-fg, #b45309);
				border-bottom-color: var(--roxy-accent, #f59e0b);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.tab:hover:not([aria-selected='true']) {
				color: var(--roxy-fg, #0a0a0a);
			}

			/* Tables */
			.overflow-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}

			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				text-align: center;
			}

			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}

			td:first-child,
			th:first-child {
				text-align: left;
			}

			.glyph {
				font-size: 1.1em;
				margin-right: 3px;
				line-height: 1;
			}

			.planet-cell {
				display: flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.total-row td {
				font-weight: var(--roxy-weight-bold, 600);
				border-top: 2px solid var(--roxy-border, #e4e4e7);
				border-bottom: none;
			}

			/* Heat cells */
			.heat-cell {
				border-radius: var(--roxy-radius-sm, 4px);
				font-weight: var(--roxy-weight-bold, 600);
				min-width: 2rem;
				font-variant-numeric: tabular-nums;
			}

			.heat-1 { background: var(--roxy-heat-1, #f0fdf4); color: var(--roxy-fg, #0a0a0a); }
			.heat-2 { background: var(--roxy-heat-2, #d1fae5); color: var(--roxy-fg, #0a0a0a); }
			.heat-3 { background: var(--roxy-heat-3, #a7f3d0); color: var(--roxy-fg, #0a0a0a); }
			.heat-4 { background: var(--roxy-heat-4, #fde68a); color: var(--roxy-fg, #0a0a0a); }
			.heat-5 { background: var(--roxy-heat-5, #fdba74); color: var(--roxy-fg, #0a0a0a); }
			.heat-6 { background: var(--roxy-heat-6, #fb923c); color: var(--roxy-fg, #0a0a0a); }
			.heat-7 { background: var(--roxy-heat-7, #ef4444); color: var(--roxy-fg, #0a0a0a); }

			/* Bhinna grid: planet header column narrower */
			.bhinna-table th:first-child,
			.bhinna-table td:first-child {
				min-width: 5rem;
			}
		`,
	];

	@property({ attribute: false })
	data: AshtakavargaResponse | null = null;

	@state()
	activeTab: Tab = 'sarva';

	render() {
		if (!this.data) {
			return html`<div class="roxy-empty" role="status">No ashtakavarga data</div>`;
		}

		const signs = this.data.signs ?? [];

		return html`<div class="wrap" aria-label="Ashtakavarga grid">
			<div class="head">
				<h2 class="title">Ashtakavarga</h2>
				${
					signs.length
						? html`<p class="subtitle">${signs.length} signs</p>`
						: nothing
				}
			</div>

			<div
				class="tablist"
				role="tablist"
				aria-label="Ashtakavarga views"
				@keydown=${this.onTabKeyDown}
			>
				${TABS.map(
					(tab) => html`<button
						class="tab"
						role="tab"
						id="tab-${tab}"
						aria-selected=${this.activeTab === tab ? 'true' : 'false'}
						aria-controls="panel-${tab}"
						tabindex=${this.activeTab === tab ? '0' : '-1'}
						@click=${() => {
							this.activeTab = tab;
						}}
					>
						${TAB_LABELS[tab]}
					</button>`,
				)}
			</div>

			<div
				id="panel-${this.activeTab}"
				role="tabpanel"
				aria-labelledby="tab-${this.activeTab}"
			>
				${
					this.activeTab === 'sarva'
						? this.renderSarva(signs)
						: this.activeTab === 'bhinna'
							? this.renderBhinna(signs)
							: this.renderPinda()
				}
			</div>
		</div>`;
	}

	private onTabKeyDown(e: KeyboardEvent) {
		const idx = TABS.indexOf(this.activeTab);
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			this.activeTab = TABS[(idx + 1) % TABS.length];
			this.focusActiveTab();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			this.activeTab = TABS[(idx - 1 + TABS.length) % TABS.length];
			this.focusActiveTab();
		}
	}

	private focusActiveTab() {
		requestAnimationFrame(() => {
			const btn = this.shadowRoot?.querySelector<HTMLButtonElement>(
				`#tab-${this.activeTab}`,
			);
			btn?.focus();
		});
	}

	private heatClass(count: number): string {
		if (count <= 1) return 'heat-1';
		if (count <= 2) return 'heat-2';
		if (count <= 3) return 'heat-3';
		if (count <= 4) return 'heat-4';
		if (count <= 5) return 'heat-5';
		if (count <= 6) return 'heat-6';
		return 'heat-7';
	}

	private renderSarva(signs: AshtakavargaResponse['signs']) {
		const sav = this.data!.sarvashtakavarga;
		if (!sav) return html`<p class="roxy-empty">No sarvashtakavarga data</p>`;

		return html`<div class="overflow-scroll">
			<table aria-label="Sarvashtakavarga bindu counts per sign">
				<thead>
					<tr>
						<th scope="col">Sign</th>
						<th scope="col">Bindus</th>
					</tr>
				</thead>
				<tbody>
					${signs.map((sign, i) => {
						const count = sav.bindus[i] ?? 0;
						const hc = this.heatClass(count);
						return html`<tr>
							<td>
								<div class="planet-cell">
									<span class="glyph" aria-hidden="true">${SIGN_GLYPH[sign] ?? ''}</span>
									${sign}
								</div>
							</td>
							<td class="${`heat-cell ${hc}`}">${count}</td>
						</tr>`;
					})}
				</tbody>
				<tfoot>
					<tr class="total-row">
						<td>Total</td>
						<td>${sav.total}</td>
					</tr>
				</tfoot>
			</table>
		</div>`;
	}

	private renderBhinna(signs: AshtakavargaResponse['signs']) {
		const bhinna = this.data!.bhinnashtakavarga;
		if (!bhinna?.length)
			return html`<p class="roxy-empty">No bhinnashtakavarga data</p>`;

		return html`<div class="overflow-scroll">
			<table class="bhinna-table" aria-label="Bhinnashtakavarga planet-by-sign grid">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						${signs.map(
							(s) =>
								html`<th scope="col" title=${s}>${SIGN_GLYPH[s] ?? s.slice(0, 2)}</th>`,
						)}
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					${bhinna.map(
						(row) => html`<tr>
						<td>${row.planet}</td>
						${row.bindus.map((count) => {
							const hc = this.heatClass(count);
							return html`<td class="${`heat-cell ${hc}`}">${count}</td>`;
						})}
						<td>${row.total}</td>
					</tr>`,
					)}
				</tbody>
			</table>
		</div>`;
	}

	private renderPinda() {
		const pinda = this.data!.shodhyaPinda;
		if (!pinda?.length)
			return html`<p class="roxy-empty">No shodhya pinda data</p>`;

		return html`<div class="overflow-scroll">
			<table aria-label="Shodhya Pinda planet strength scores">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						<th scope="col">Rashi Pinda</th>
						<th scope="col">Graha Pinda</th>
						<th scope="col">Shodhya Pinda</th>
					</tr>
				</thead>
				<tbody>
					${pinda.map(
						(row) => html`<tr>
							<td>${row.planet}</td>
							<td>${row.rashiPinda}</td>
							<td>${row.grahaPinda}</td>
							<td>${row.shodhyaPinda}</td>
						</tr>`,
					)}
				</tbody>
			</table>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-ashtakavarga-grid': RoxyAshtakavargaGrid;
	}
}
