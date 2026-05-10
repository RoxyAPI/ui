var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// packages/ui/src/components/ashtakavarga-grid.ts
import { css as css2, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// packages/ui/src/tokens/index.ts
var SIGN_GLYPH = {
  Aries: "\u2648",
  Taurus: "\u2649",
  Gemini: "\u264A",
  Cancer: "\u264B",
  Leo: "\u264C",
  Virgo: "\u264D",
  Libra: "\u264E",
  Scorpio: "\u264F",
  Sagittarius: "\u2650",
  Capricorn: "\u2651",
  Aquarius: "\u2652",
  Pisces: "\u2653"
};
var SIGNS_ORDER = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
];
var RASHI_KEYS = SIGNS_ORDER.map(
  (s) => s.toLowerCase()
);

// packages/ui/src/utils/base-styles.ts
import { css } from "lit";
var baseStyles = css`
	:host {
		display: block;
		container-type: inline-size;
		font-family: var(
			--roxy-font-sans,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif
		);
		color: var(--roxy-fg, #0a0a0a);
		background: transparent;
		font-size: var(--roxy-text-base, 1rem);
		line-height: var(--roxy-leading-normal, 1.5);
		animation: roxy-fade-in var(--roxy-motion-duration, 200ms)
			var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	@keyframes roxy-fade-in {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:host {
			animation: none;
		}
	}

	.roxy-skeleton {
		background: linear-gradient(
			90deg,
			var(--roxy-border, #e4e4e7) 0%,
			color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent) 50%,
			var(--roxy-border, #e4e4e7) 100%
		);
		background-size: 200% 100%;
		animation: roxy-shimmer 1.4s ease-in-out infinite;
		border-radius: var(--roxy-radius-md, 8px);
	}

	@keyframes roxy-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.roxy-skeleton {
			animation: none;
		}
	}

	.roxy-empty {
		padding: var(--roxy-space-lg, 1.5rem);
		color: var(--roxy-muted, #71717a);
		text-align: center;
		font-size: var(--roxy-text-sm, 0.875rem);
	}

	:host(:focus-within) .roxy-card {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
	}
`;

// packages/ui/src/components/ashtakavarga-grid.ts
var TAB_LABELS = {
  sarva: "Sarvashtakavarga",
  bhinna: "Bhinnashtakavarga",
  pinda: "Shodhya Pinda"
};
var TABS = ["sarva", "bhinna", "pinda"];
var RoxyAshtakavargaGrid = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.activeTab = "sarva";
  }
  render() {
    if (!this.data) {
      return html`<div class="roxy-empty" role="status">No ashtakavarga data</div>`;
    }
    const signs = this.data.signs ?? [];
    return html`<div class="wrap" aria-label="Ashtakavarga grid">
			<div class="head">
				<h2 class="title">Ashtakavarga</h2>
				${signs.length ? html`<p class="subtitle">${signs.length} signs</p>` : nothing}
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
						aria-selected=${this.activeTab === tab ? "true" : "false"}
						aria-controls="panel-${tab}"
						tabindex=${this.activeTab === tab ? "0" : "-1"}
						@click=${() => {
        this.activeTab = tab;
      }}
					>
						${TAB_LABELS[tab]}
					</button>`
    )}
			</div>

			<div
				id="panel-${this.activeTab}"
				role="tabpanel"
				aria-labelledby="tab-${this.activeTab}"
			>
				${this.activeTab === "sarva" ? this.renderSarva(signs) : this.activeTab === "bhinna" ? this.renderBhinna(signs) : this.renderPinda()}
			</div>
		</div>`;
  }
  onTabKeyDown(e) {
    const idx = TABS.indexOf(this.activeTab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      this.activeTab = TABS[(idx + 1) % TABS.length];
      this.focusActiveTab();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.activeTab = TABS[(idx - 1 + TABS.length) % TABS.length];
      this.focusActiveTab();
    }
  }
  focusActiveTab() {
    requestAnimationFrame(() => {
      const btn = this.shadowRoot?.querySelector(
        `#tab-${this.activeTab}`
      );
      btn?.focus();
    });
  }
  heatClass(count) {
    if (count <= 1) return "heat-1";
    if (count <= 2) return "heat-2";
    if (count <= 3) return "heat-3";
    if (count <= 4) return "heat-4";
    if (count <= 5) return "heat-5";
    if (count <= 6) return "heat-6";
    return "heat-7";
  }
  renderSarva(signs) {
    const sav = this.data.sarvashtakavarga;
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
									<span class="glyph" aria-hidden="true">${SIGN_GLYPH[sign] ?? ""}</span>
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
  renderBhinna(signs) {
    const bhinna = this.data.bhinnashtakavarga;
    if (!bhinna?.length)
      return html`<p class="roxy-empty">No bhinnashtakavarga data</p>`;
    return html`<div class="overflow-scroll">
			<table class="bhinna-table" aria-label="Bhinnashtakavarga planet-by-sign grid">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						${signs.map(
      (s) => html`<th scope="col" title=${s}>${SIGN_GLYPH[s] ?? s.slice(0, 2)}</th>`
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
					</tr>`
    )}
				</tbody>
			</table>
		</div>`;
  }
  renderPinda() {
    const pinda = this.data.shodhyaPinda;
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
						</tr>`
    )}
				</tbody>
			</table>
		</div>`;
  }
};
RoxyAshtakavargaGrid.styles = [
  baseStyles,
  css2`
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
		`
];
__decorateClass([
  property({ attribute: false })
], RoxyAshtakavargaGrid.prototype, "data", 2);
__decorateClass([
  state()
], RoxyAshtakavargaGrid.prototype, "activeTab", 2);
RoxyAshtakavargaGrid = __decorateClass([
  customElement("roxy-ashtakavarga-grid")
], RoxyAshtakavargaGrid);
export {
  RoxyAshtakavargaGrid
};
//# sourceMappingURL=ashtakavarga-grid.js.map
