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
var PLANET_GLYPH = {
  Sun: "\u2609",
  Moon: "\u263D",
  Mercury: "\u263F",
  Venus: "\u2640",
  Earth: "\u2641",
  Mars: "\u2642",
  Jupiter: "\u2643",
  Saturn: "\u2644",
  Uranus: "\u2645",
  Neptune: "\u2646",
  Pluto: "\u2647",
  Rahu: "\u260A",
  Ketu: "\u260B",
  Ascendant: "Asc",
  Lagna: "La",
  NorthNode: "\u260A",
  SouthNode: "\u260B",
  "North node": "\u260A",
  "South node": "\u260B",
  Chiron: "\u26B7",
  Lilith: "\u26B8",
  "Black moon lilith": "\u26B8"
};
var PLANET_ABBR = {
  Sun: "Su",
  Moon: "Mo",
  Mercury: "Me",
  Venus: "Ve",
  Mars: "Ma",
  Jupiter: "Ju",
  Saturn: "Sa",
  Uranus: "Ur",
  Neptune: "Ne",
  Pluto: "Pl",
  Rahu: "Ra",
  Ketu: "Ke",
  Ascendant: "Asc",
  Lagna: "La"
};
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
var SIGN_ABBR = {
  Aries: "Ar",
  Taurus: "Ta",
  Gemini: "Ge",
  Cancer: "Cn",
  Leo: "Le",
  Virgo: "Vi",
  Libra: "Li",
  Scorpio: "Sc",
  Sagittarius: "Sg",
  Capricorn: "Cp",
  Aquarius: "Aq",
  Pisces: "Pi"
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
var TRIGRAM_GLYPH = {
  heaven: "\u2630",
  lake: "\u2631",
  fire: "\u2632",
  thunder: "\u2633",
  wind: "\u2634",
  water: "\u2635",
  mountain: "\u2636",
  earth: "\u2637",
  Heaven: "\u2630",
  Lake: "\u2631",
  Fire: "\u2632",
  Thunder: "\u2633",
  Wind: "\u2634",
  Water: "\u2635",
  Mountain: "\u2636",
  Earth: "\u2637"
};
var MOON_PHASE_EMOJI = {
  "new moon": "\u{1F311}",
  "waxing crescent": "\u{1F312}",
  "first quarter": "\u{1F313}",
  "waxing gibbous": "\u{1F314}",
  "full moon": "\u{1F315}",
  "waning gibbous": "\u{1F316}",
  "last quarter": "\u{1F317}",
  "waning crescent": "\u{1F318}"
};

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

// packages/ui/src/components/biorhythm-chart.ts
import { css as css3, html as html2, LitElement as LitElement2, nothing as nothing2, svg } from "lit";
import { customElement as customElement2, property as property2 } from "lit/decorators.js";
var CYCLE_COLOR = {
  physical: "#dc2626",
  emotional: "#0284c7",
  intellectual: "#16a34a",
  intuitive: "#a855f7",
  aesthetic: "#f59e0b",
  awareness: "#ec4899",
  spiritual: "#14b8a6",
  passion: "#ef4444",
  mastery: "#6366f1",
  wisdom: "#475569"
};
var RoxyBiorhythmChart = class extends LitElement2 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "daily";
  }
  render() {
    const d = this.data;
    if (!d)
      return html2`<div class="roxy-empty" role="status">No biorhythm data</div>`;
    if (this.mode === "critical-days" && "criticalDays" in d) {
      return this.renderCritical(d);
    }
    if (this.mode === "forecast" && "days" in d) {
      return this.renderForecast(d);
    }
    return this.renderDaily(d);
  }
  renderDaily(d) {
    const raw = d.quickRead ?? {};
    const entries = Object.entries(raw).map(([cycle, value]) => {
      const v = typeof value === "number" ? value : 0;
      const normalized = Math.abs(v) > 1 ? v / 100 : v;
      return [cycle, normalized];
    });
    return html2`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${typeof d.energyRating === "number" ? html2`<span class="energy">Energy ${d.energyRating}/10</span>` : nothing2}
			</header>
			<div class="bars" role="list">
				${entries.map(([cycle, v]) => {
      const pct = (v + 1) / 2 * 100;
      const color = CYCLE_COLOR[cycle] ?? "var(--roxy-accent, #f59e0b)";
      return html2`<div class="bar" role="listitem">
						<span style="text-transform: capitalize">${cycle}</span>
						<span class="track">
							<span
								class="fill"
								style="width: ${pct}%; background: ${color}"
							></span>
						</span>
						<span class="value">${Math.round(v * 100)}%</span>
					</div>`;
    })}
			</div>
			${d.dailyMessage ? html2`<p class="advice">${d.dailyMessage}</p>` : nothing2}
			${d.advice ? html2`<p class="advice">${d.advice}</p>` : nothing2}
		</section>`;
  }
  renderForecast(d) {
    const days = d.days ?? [];
    if (days.length === 0)
      return html2`<div class="roxy-empty" role="status">No forecast</div>`;
    const w = 600;
    const h = 160;
    const xStep = w / Math.max(days.length - 1, 1);
    const cycleKeys = [
      "physical",
      "emotional",
      "intellectual",
      "intuitive"
    ];
    return html2`<section class="wrap" aria-label="Biorhythm forecast">
			<header class="head">
				<h2 class="title">Forecast</h2>
				<span class="energy">${d.startDate} - ${d.endDate}</span>
			</header>
			<svg
				viewBox="0 0 ${w} ${h}"
				role="img"
				aria-label="Biorhythm cycle lines across the forecast window"
			>
				<title>Biorhythm forecast</title>
				<line
					x1="0"
					y1=${h / 2}
					x2=${w}
					y2=${h / 2}
					stroke="var(--roxy-border, #e4e4e7)"
					stroke-width="1"
				/>
				${cycleKeys.map((cycle) => {
      const points = days.map((day, i) => {
        const v = day[cycle] ?? 0;
        const x = i * xStep;
        const y = h / 2 - v / 100 * (h / 2 - 8);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      }).join(" ");
      const color = CYCLE_COLOR[cycle] ?? "#475569";
      return svg`<polyline points=${points} fill="none" stroke=${color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`;
    })}
			</svg>
			${d.summary?.periodAdvice ? html2`<p class="advice">${d.summary.periodAdvice}</p>` : nothing2}
		</section>`;
  }
  renderCritical(d) {
    return html2`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${d.totalCriticalDays} total</span>
			</header>
			<div>
				${d.criticalDays.map(
      (day) => html2`<span class="crit"
						>${day.date} · ${day.cycle} ${day.severity}</span
					>`
    )}
			</div>
		</section>`;
  }
};
RoxyBiorhythmChart.styles = [
  baseStyles,
  css3`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.energy {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-fg, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.bars {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.bar {
				display: grid;
				grid-template-columns: 8rem 1fr 3.5rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.track {
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				position: relative;
			}
			.fill {
				display: block;
				height: 100%;
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.value {
				font-variant-numeric: tabular-nums;
				text-align: right;
				color: var(--roxy-muted, #71717a);
			}
			.advice {
				color: var(--roxy-fg, #0a0a0a);
			}
			.alert {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				height: auto;
			}
			.crit {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				border-radius: var(--roxy-radius-sm, 4px);
				padding: 4px 8px;
				font-size: var(--roxy-text-xs, 0.75rem);
				display: inline-block;
				margin: 2px;
			}
		`
];
__decorateClass([
  property2({ attribute: false })
], RoxyBiorhythmChart.prototype, "data", 2);
__decorateClass([
  property2({ type: String, reflect: true })
], RoxyBiorhythmChart.prototype, "mode", 2);
RoxyBiorhythmChart = __decorateClass([
  customElement2("roxy-biorhythm-chart")
], RoxyBiorhythmChart);

// packages/ui/src/components/choghadiya-grid.ts
import { css as css4, html as html3, LitElement as LitElement3, nothing as nothing3 } from "lit";
import { customElement as customElement3, property as property3 } from "lit/decorators.js";

// packages/ui/src/utils/string.ts
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function humanize(s) {
  return s.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
}

// packages/ui/src/components/choghadiya-grid.ts
function fmtTime(iso) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}
var RoxyChoghadiyaGrid = class extends LitElement3 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  renderTile(period) {
    const effectClass = period.effect === "Good" ? "good" : period.effect === "Bad" ? "bad" : "neutral";
    const lordGlyph = PLANET_GLYPH[capitalize(period.lord)] ?? "";
    const timeRange = `${fmtTime(period.start)} - ${fmtTime(period.end)}`;
    return html3`<div class="cho-tile ${effectClass}" role="listitem">
			<span class="tile-name">${period.name}</span>
			<span class="tile-time" aria-label="Time range">${timeRange}</span>
			<span class="tile-lord">
				${lordGlyph ? html3`<span aria-hidden="true">${lordGlyph}</span>` : nothing3}
				${period.lord}
			</span>
		</div>`;
  }
  render() {
    if (!this.data)
      return html3`<div class="roxy-empty" role="status">No choghadiya data</div>`;
    const { date, dayChoghadiya, nightChoghadiya } = this.data;
    return html3`<div class="wrap">
			<div class="header">
				<h2 class="title">Choghadiya</h2>
				${date ? html3`<p class="subtitle">${date}</p>` : nothing3}
			</div>

			<div class="cho-grid">
				<section class="period-col" aria-label="Day muhurta periods">
					<h3 class="period-heading">Day</h3>
					<div role="list" aria-label="Daytime choghadiya">
						${dayChoghadiya && dayChoghadiya.length > 0 ? dayChoghadiya.map((p) => this.renderTile(p)) : html3`<p class="roxy-empty" role="status">No daytime periods</p>`}
					</div>
				</section>

				<section class="period-col" aria-label="Night muhurta periods">
					<h3 class="period-heading">Night</h3>
					<div role="list" aria-label="Nighttime choghadiya">
						${nightChoghadiya && nightChoghadiya.length > 0 ? nightChoghadiya.map((p) => this.renderTile(p)) : html3`<p class="roxy-empty" role="status">No nighttime periods</p>`}
					</div>
				</section>
			</div>
		</div>`;
  }
};
RoxyChoghadiyaGrid.styles = [
  baseStyles,
  css4`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.header {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.subtitle {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
			}
			.cho-grid {
				display: grid;
				grid-template-columns: 1fr;
				gap: var(--roxy-space-md, 1rem);
			}
			@media (min-width: 720px) {
				.cho-grid {
					grid-template-columns: 1fr 1fr;
				}
			}
			.period-col {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.period-heading {
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile {
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: 0.25em 0.75em;
				padding: 0.55em 0.85em;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
			}
			.cho-tile.good {
				background: color-mix(in srgb, var(--roxy-success, #22c55e) 18%, transparent);
				border-color: color-mix(in srgb, var(--roxy-success, #22c55e) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile.bad {
				background: color-mix(in srgb, var(--roxy-danger, #ef4444) 18%, transparent);
				border-color: color-mix(in srgb, var(--roxy-danger, #ef4444) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.cho-tile.neutral {
				background: transparent;
				color: var(--roxy-fg, #0a0a0a);
			}
			.tile-name {
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				grid-column: 1;
			}
			.tile-time {
				font-size: var(--roxy-text-xs, 0.75rem);
				opacity: 0.8;
				white-space: nowrap;
				grid-column: 2;
				grid-row: 1 / 3;
				text-align: right;
				align-self: center;
			}
			.tile-lord {
				font-size: var(--roxy-text-sm, 0.875rem);
				opacity: 0.85;
				grid-column: 1;
				display: flex;
				align-items: center;
				gap: 0.25em;
			}
		`
];
__decorateClass([
  property3({ attribute: false })
], RoxyChoghadiyaGrid.prototype, "data", 2);
RoxyChoghadiyaGrid = __decorateClass([
  customElement3("roxy-choghadiya-grid")
], RoxyChoghadiyaGrid);

// packages/ui/src/components/compatibility-card.ts
import { css as css5, html as html4, LitElement as LitElement4, nothing as nothing4 } from "lit";
import { customElement as customElement4, property as property4 } from "lit/decorators.js";

// packages/ui/src/utils/format.ts
function formatTime(input) {
  if (typeof input !== "string" || input.length === 0) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return "";
  const bareTime = /^\d{2}:\d{2}(:\d{2})?$/.test(input);
  const iso = bareTime ? `1970-01-01T${input}` : input;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleTimeString(void 0, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}
function formatDate(input) {
  if (typeof input !== "string" || input.length === 0) return "";
  const d = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(input) ? `${input}T00:00:00` : input
  );
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatTimeRange(t) {
  if (!t) return "";
  const start = formatTime(t.start);
  const end = formatTime(t.end);
  if (start && end) return `${start} - ${end}`;
  return start || end || "";
}
function formatNumber(value, dp = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  return value.toFixed(dp).replace(/\.?0+$/, "");
}
function formatPercent(value, dp = 1) {
  const n = formatNumber(value, dp);
  return n ? `${n}%` : "";
}
var ASPECT_CLASS = {
  conjunction: "aspect-conjunction",
  sextile: "aspect-sextile",
  square: "aspect-square",
  trine: "aspect-trine",
  opposition: "aspect-opposition"
};
function normalizeAspect(a) {
  return (a.type ?? "").toLowerCase().replace(/_/g, "-");
}

// packages/ui/src/components/compatibility-card.ts
var RoxyCompatibilityCard = class extends LitElement4 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "astrology";
  }
  getBreakdown() {
    const d = this.data;
    if (!d) return {};
    if ("categories" in d && d.categories) {
      const out = {};
      for (const [k, v] of Object.entries(d.categories)) {
        if (typeof v === "number" && Number.isFinite(v)) out[k] = v;
      }
      return out;
    }
    return {};
  }
  render() {
    const d = this.data;
    if (!d)
      return html4`<div class="roxy-empty" role="status">No compatibility data</div>`;
    const score = d.overallScore;
    const breakdown = this.getBreakdown();
    const rating = "rating" in d ? d.rating : void 0;
    const archetype = "archetype" in d ? d.archetype : void 0;
    const advice = "advice" in d ? d.advice : void 0;
    const summary = "summary" in d ? d.summary : void 0;
    const interpretation = "interpretation" in d ? d.interpretation : void 0;
    const strengths = "strengths" in d ? d.strengths : void 0;
    const challenges = "challenges" in d ? d.challenges : void 0;
    const keyAspects = "keyAspects" in d ? d.keyAspects : void 0;
    return html4`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${typeof score === "number" ? html4`<div class="score">${formatNumber(score, 0)}</div>` : nothing4}
					${rating ? html4`<div class="rating">${rating}</div>` : nothing4}
				</div>
			</div>

			${Object.keys(breakdown).length > 0 ? html4`<div role="list">
						${Object.entries(breakdown).map(
      ([k, v]) => html4`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${k}</span>
								<span class="bar"
									><span style="width: ${Math.max(0, Math.min(100, v))}%"></span
								></span>
								<span>${formatNumber(v, 0)}</span>
							</div>`
    )}
					</div>` : nothing4}
			${archetype ? html4`<p>
						<span class="archetype">${archetype.label}</span>
						${archetype.description ? html4` · ${archetype.description}` : nothing4}
					</p>` : nothing4}
			${summary ? html4`<p>${summary}</p>` : nothing4}
			${interpretation && !summary ? html4`<p>${interpretation}</p>` : nothing4}
			${advice ? html4`<p>${advice}</p>` : nothing4}
			${(strengths?.length ?? 0) > 0 || (challenges?.length ?? 0) > 0 ? html4`<div class="lists">
						${strengths?.length ? html4`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => html4`<li>${s}</li>`)}
									</ul>
								</div>` : nothing4}
						${challenges?.length ? html4`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => html4`<li>${s}</li>`)}
									</ul>
								</div>` : nothing4}
					</div>` : nothing4}
			${keyAspects?.length ? html4`<div>
						<h3 style="margin: 0 0 0.25rem; font-size: var(--roxy-text-xs); color: var(--roxy-muted); text-transform: uppercase; letter-spacing: 0.06em;">Key aspects</h3>
						<ul style="margin: 0; padding-left: 1rem; font-size: var(--roxy-text-sm);">
							${keyAspects.slice(0, 6).map((a) => html4`<li>${formatAspect(a)}</li>`)}
						</ul>
					</div>` : nothing4}
		</article>`;
  }
};
RoxyCompatibilityCard.styles = [
  baseStyles,
  css5`
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
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.head h2 {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}

			.score {
				font-variant-numeric: tabular-nums;
				font-size: 2rem;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				line-height: 1;
			}
			.rating {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.bar-row {
				display: grid;
				grid-template-columns: 8rem 1fr 3.5rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bar {
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.bar-row > span:last-child {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				text-align: right;
			}

			.archetype {
				color: var(--roxy-accent-fg, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
			}
		`
];
__decorateClass([
  property4({ attribute: false })
], RoxyCompatibilityCard.prototype, "data", 2);
__decorateClass([
  property4({ type: String, reflect: true })
], RoxyCompatibilityCard.prototype, "mode", 2);
RoxyCompatibilityCard = __decorateClass([
  customElement4("roxy-compatibility-card")
], RoxyCompatibilityCard);
function formatAspect(a) {
  const aspect = a.type.toLowerCase().replace(/_/g, "-");
  const orb = typeof a.orb === "number" ? ` (orb ${formatNumber(a.orb, 1)}\xB0)` : "";
  const head = [a.planet1, aspect, a.planet2].filter(Boolean).join(" ");
  return a.description ? `${head}${orb} \xB7 ${a.description}` : `${head}${orb}`;
}

// packages/ui/src/components/dasha-timeline.ts
import { css as css6, html as html5, LitElement as LitElement5, nothing as nothing5 } from "lit";
import { customElement as customElement5, property as property5 } from "lit/decorators.js";
var RoxyDashaTimeline = class extends LitElement5 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.period = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return html5`<div class="roxy-empty" role="status">No dasha data</div>`;
    const periods = this.collectPeriods(d);
    const maxYears = periods.length ? Math.max(...periods.map((p) => p.durationYears)) : 0;
    return html5`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period === "major" ? "Vimshottari Mahadasha" : this.period === "sub" ? "Antardasha" : "Active dashas"}
				</h2>
				${"nakshatraName" in d && d.nakshatraName ? html5`<div class="nakshatra">
						Moon nakshatra: ${d.nakshatraName}
						${"nakshatraLord" in d && d.nakshatraLord ? html5`(lord ${d.nakshatraLord})` : nothing5}
					</div>` : nothing5}
			</header>

			${this.period === "current" ? this.renderCurrent(d) : nothing5}
			${periods.length > 0 ? html5`<div class="timeline" role="list">
						${periods.map((p) => this.renderBar(p, maxYears))}
					</div>` : nothing5}
		</div>`;
  }
  renderCurrent(d) {
    if (!("mahadasha" in d)) return nothing5;
    return html5`<div class="current">
			${"mahadasha" in d && d.mahadasha ? html5`<div>
					<span>Mahadasha</span>
					<strong>${d.mahadasha.planet}</strong>
					${"remainingInMahadasha" in d && d.remainingInMahadasha ? html5`<small>${formatNumber(d.remainingInMahadasha.years + d.remainingInMahadasha.months / 12, 1)} years left</small>` : nothing5}
				</div>` : nothing5}
			${"antardasha" in d && d.antardasha ? html5`<div>
					<span>Antardasha</span>
					<strong>${d.antardasha.planet}</strong>
					${"remainingInAntardasha" in d && d.remainingInAntardasha ? html5`<small>${formatNumber(d.remainingInAntardasha.years + d.remainingInAntardasha.months / 12, 1)} years left</small>` : nothing5}
				</div>` : nothing5}
			${"pratyantardasha" in d && d.pratyantardasha ? html5`<div>
					<span>Pratyantardasha</span>
					<strong>${d.pratyantardasha.planet}</strong>
					${"remainingInPratyantardasha" in d && d.remainingInPratyantardasha ? html5`<small>${formatNumber(d.remainingInPratyantardasha.years + d.remainingInPratyantardasha.months / 12, 1)} years left</small>` : nothing5}
				</div>` : nothing5}
		</div>`;
  }
  collectPeriods(d) {
    if ("mahadashas" in d && d.mahadashas?.length) return d.mahadashas;
    if ("antardashas" in d && d.antardashas?.length) return d.antardashas;
    return [];
  }
  renderBar(p, max) {
    const years = p.durationYears;
    const width = max > 0 ? years / max * 100 : 0;
    return html5`<div class="bar" role="listitem">
			<span>${p.planet}</span>
			<span class="bar-track"><span style="width: ${width}%"></span></span>
			<span class="dates">
				${p.startDate ? formatYear(p.startDate) : ""}
				${p.endDate ? html5`- ${formatYear(p.endDate)}` : ""}
			</span>
		</div>`;
  }
};
RoxyDashaTimeline.styles = [
  baseStyles,
  css6`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.nakshatra {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.current {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.current div span:first-child {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.current div strong {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.timeline {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.bar {
				display: grid;
				grid-template-columns: 5rem 1fr 8rem;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.bar-track {
				height: 14px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.bar-track > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.dates {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				text-align: right;
			}
		`
];
__decorateClass([
  property5({ attribute: false })
], RoxyDashaTimeline.prototype, "data", 2);
__decorateClass([
  property5({ type: String, reflect: true })
], RoxyDashaTimeline.prototype, "period", 2);
RoxyDashaTimeline = __decorateClass([
  customElement5("roxy-dasha-timeline")
], RoxyDashaTimeline);
function formatYear(s) {
  const m = s.match(/^(\d{4})/);
  return m ? m[1] : s;
}

// packages/ui/src/components/data.ts
import { css as css7, html as html6, LitElement as LitElement6, nothing as nothing6 } from "lit";
import { customElement as customElement6, property as property6 } from "lit/decorators.js";
var TITLE_KEYS = ["title", "name", "label", "heading", "overview", "summary"];
var IMAGE_KEYS = ["imageUrl", "image", "icon", "symbol"];
var SKIP_KEYS = ["imageUrl", "image"];
var MAX_DEPTH = 6;
var RoxyData = class extends LitElement6 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.depth = 0;
  }
  render() {
    if (this.data == null) {
      return html6`<div class="roxy-empty" role="status">No data</div>`;
    }
    if (this.depth >= MAX_DEPTH) {
      return html6`<div class="roxy-empty" role="status">…</div>`;
    }
    return html6`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`;
  }
  renderValue(value) {
    if (value === null || value === void 0) return nothing6;
    if (typeof value === "string") return html6`<p>${value}</p>`;
    if (typeof value === "number" || typeof value === "boolean") {
      return html6`<p>${String(value)}</p>`;
    }
    if (Array.isArray(value)) return this.renderArray(value);
    return this.renderObject(value);
  }
  renderArray(arr) {
    if (arr.length === 0) {
      return html6`<div class="roxy-empty" role="status">Empty list</div>`;
    }
    const allPrimitive = arr.every(
      (v) => v === null || ["string", "number", "boolean"].includes(typeof v)
    );
    if (allPrimitive) {
      return html6`<ul class="roxy-chips">
				${arr.map((v) => html6`<li>${String(v)}</li>`)}
			</ul>`;
    }
    const allObjects = arr.every(
      (v) => v !== null && typeof v === "object" && !Array.isArray(v)
    );
    if (allObjects) return this.renderTable(arr);
    return html6`<ol>
			${arr.map((v) => html6`<li>${this.renderValue(v)}</li>`)}
		</ol>`;
  }
  renderTable(rows) {
    const keys = this.collectKeys(rows);
    return html6`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${keys.map((k) => html6`<th>${humanize(k)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${rows.map(
      (row) => html6`<tr>
						${keys.map((k) => html6`<td>${this.formatPrimitive(row[k])}</td>`)}
					</tr>`
    )}
			</tbody>
		</table>`;
  }
  renderObject(obj) {
    const titleKey = TITLE_KEYS.find((k) => typeof obj[k] === "string");
    const imageKey = IMAGE_KEYS.find(
      (k) => typeof obj[k] === "string" && obj[k].startsWith("http")
    );
    const summaryKey = titleKey !== "summary" && typeof obj.summary === "string" ? "summary" : null;
    const rows = Object.entries(obj).filter(
      ([k, v]) => k !== titleKey && k !== summaryKey && !SKIP_KEYS.includes(k) && v !== null && v !== void 0
    );
    return html6`
			${imageKey ? html6`<img
						class="roxy-image"
						src=${String(obj[imageKey])}
						alt=${titleKey ? String(obj[titleKey]) : "illustration"}
						loading="lazy"
					/>` : nothing6}
			${titleKey ? html6`<h3 class="roxy-title">${obj[titleKey]}</h3>` : nothing6}
			${summaryKey ? html6`<p class="roxy-summary">${obj[summaryKey]}</p>` : nothing6}
			${rows.length > 0 ? html6`<dl class="roxy-rows">
						${rows.map(
      ([k, v]) => html6`
								<dt>${humanize(k)}</dt>
								<dd>${this.renderField(v)}</dd>
							`
    )}
					</dl>` : nothing6}
		`;
  }
  renderField(value) {
    if (value === null || value === void 0) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean")
      return String(value);
    if (Array.isArray(value)) {
      const allPrimitive = value.every(
        (v) => ["string", "number", "boolean"].includes(typeof v)
      );
      if (allPrimitive) {
        return html6`<ul class="roxy-chips">
					${value.map((v) => html6`<li>${String(v)}</li>`)}
				</ul>`;
      }
    }
    return html6`<roxy-data .data=${value} .depth=${this.depth + 1}></roxy-data>`;
  }
  formatPrimitive(value) {
    if (value === null || value === void 0) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean")
      return String(value);
    if (Array.isArray(value)) return value.map(String).join(", ");
    return JSON.stringify(value);
  }
  collectKeys(rows) {
    const seen = /* @__PURE__ */ new Set();
    for (const row of rows) {
      for (const k of Object.keys(row)) seen.add(k);
    }
    return Array.from(seen);
  }
};
RoxyData.styles = [
  baseStyles,
  css7`
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
		`
];
__decorateClass([
  property6({ attribute: false })
], RoxyData.prototype, "data", 2);
__decorateClass([
  property6({ attribute: false })
], RoxyData.prototype, "depth", 2);
RoxyData = __decorateClass([
  customElement6("roxy-data")
], RoxyData);

// packages/ui/src/components/divisional-chart.ts
import { css as css8, html as html7, LitElement as LitElement7, nothing as nothing8 } from "lit";
import { customElement as customElement7, property as property7 } from "lit/decorators.js";

// packages/ui/src/utils/kundli-render.ts
import { nothing as nothing7, svg as svg2 } from "lit";
var RASHI_TO_SIGN = Object.fromEntries(
  SIGNS_ORDER.map((s) => [s.toLowerCase(), s])
);
var SOUTH_HOUSE_CENTERS = {
  1: { x: 150, y: 58 },
  2: { x: 205, y: 52 },
  3: { x: 253, y: 112 },
  4: { x: 243, y: 150 },
  5: { x: 253, y: 188 },
  6: { x: 205, y: 248 },
  7: { x: 150, y: 242 },
  8: { x: 95, y: 248 },
  9: { x: 47, y: 188 },
  10: { x: 57, y: 150 },
  11: { x: 47, y: 112 },
  12: { x: 95, y: 52 }
};
var SOUTH_SIGN_POSITIONS = {
  1: { x: 150, y: 35 },
  2: { x: 222, y: 40 },
  3: { x: 265, y: 100 },
  4: { x: 265, y: 150 },
  5: { x: 265, y: 200 },
  6: { x: 222, y: 260 },
  7: { x: 150, y: 265 },
  8: { x: 78, y: 260 },
  9: { x: 35, y: 200 },
  10: { x: 35, y: 150 },
  11: { x: 35, y: 100 },
  12: { x: 78, y: 40 }
};
var NORTH_HOUSE_CENTERS = {
  1: { x: 150, y: 60 },
  2: { x: 225, y: 100 },
  3: { x: 255, y: 150 },
  4: { x: 225, y: 200 },
  5: { x: 150, y: 240 },
  6: { x: 75, y: 200 },
  7: { x: 45, y: 150 },
  8: { x: 75, y: 100 },
  9: { x: 100, y: 80 },
  10: { x: 150, y: 108 },
  11: { x: 200, y: 80 },
  12: { x: 200, y: 220 }
};
function renderSouthHouseGroup(h) {
  const center = SOUTH_HOUSE_CENTERS[h.number];
  const signPos = SOUTH_SIGN_POSITIONS[h.number];
  if (!center || !signPos) return nothing7;
  const signAbbr = SIGN_ABBR[h.sign] ?? "";
  const planets = h.planets;
  return svg2`
		<g>
			${h.isLagna ? svg2`<rect
							class="lagna-bg"
							x=${center.x - 30} y=${center.y - 28}
							width="60" height="56" rx="6"
						/>` : nothing7}
			${signAbbr ? svg2`<text class="sign-text" x=${signPos.x} y=${signPos.y} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>` : nothing7}
			${h.isLagna ? svg2`<text class="lagna-marker" x=${center.x} y=${center.y - 18} text-anchor="middle" dominant-baseline="central">LAGNA</text>` : nothing7}
			${planets.map((planet, j) => {
    const abbr = PLANET_ABBR[capitalize(planet)] ?? planet.slice(0, 2);
    const lineHeight = 13;
    const baseY = h.isLagna ? center.y + 8 : center.y;
    const startY = baseY - (planets.length - 1) * lineHeight / 2;
    const yPos = startY + j * lineHeight;
    return svg2`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
  })}
		</g>
	`;
}
function renderNorthFrame() {
  return svg2`
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
		<line class="line" x1="150" y1="10" x2="150" y2="290" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="290" y2="150" stroke-width="1" />
		<line class="line" x1="150" y1="10" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="10" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
	`;
}
function renderNorthHouseGroup(h) {
  const center = NORTH_HOUSE_CENTERS[h.number];
  if (!center) return nothing7;
  const signAbbr = SIGN_ABBR[h.sign] ?? "";
  const planets = h.planets;
  return svg2`
		<g>
			${h.isLagna ? svg2`<circle class="lagna-bg" cx=${center.x} cy=${center.y} r="22" />` : nothing7}
			${signAbbr ? svg2`<text class="sign-text" x=${center.x} y=${center.y - 10} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>` : nothing7}
			<text class="house-num" x=${center.x} y=${center.y + 2} text-anchor="middle" dominant-baseline="central">${h.number}</text>
			${planets.map((planet, j) => {
    const abbr = PLANET_ABBR[capitalize(planet)] ?? planet.slice(0, 2);
    const lineHeight = 11;
    const startY = center.y + 14 - (planets.length - 1) * lineHeight / 2;
    const yPos = startY + j * lineHeight;
    return svg2`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
  })}
		</g>
	`;
}
function renderSouthFrame() {
  return svg2`
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
		<polygon class="line" points="220,80 220,220 80,220 80,80" stroke-width="1" fill="none" />
		<line class="line" x1="150" y1="10" x2="80" y2="80" stroke-width="1" />
		<line class="line" x1="150" y1="10" x2="220" y2="80" stroke-width="1" />
		<line class="line" x1="290" y1="150" x2="220" y2="80" stroke-width="1" />
		<line class="line" x1="290" y1="150" x2="220" y2="220" stroke-width="1" />
		<line class="line" x1="150" y1="290" x2="220" y2="220" stroke-width="1" />
		<line class="line" x1="150" y1="290" x2="80" y2="220" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="80" y2="220" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="80" y2="80" stroke-width="1" />
	`;
}

// packages/ui/src/components/divisional-chart.ts
var RoxyDivisionalChart = class extends LitElement7 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.chartStyle = "south";
  }
  buildHouses() {
    if (!this.data) return [];
    const chart = this.data.chart;
    const meta = this.data.chart.meta ?? {};
    const lagnaSign = meta.Lagna?.rashi ?? "";
    const houses = [];
    for (let i = 0; i < 12; i++) {
      const key = RASHI_KEYS[i];
      const bucket = chart[key];
      const planets = (bucket?.signs ?? []).map((p) => p.graha).filter(Boolean);
      const sign = RASHI_TO_SIGN[key] ?? "";
      houses.push({
        number: i + 1,
        sign,
        planets,
        isLagna: lagnaSign ? lagnaSign.toLowerCase() === sign.toLowerCase() : false
      });
    }
    return houses;
  }
  render() {
    if (!this.data)
      return html7`<div class="roxy-empty" role="status">No divisional chart data</div>`;
    const { division, vargottama } = this.data;
    const houses = this.buildHouses();
    const isNorth = this.chartStyle === "north";
    return html7`<div class="wrap">
			<div class="header">
				<h2 class="title">
					D${division.number} ${division.name}
					${division.sanskritName && division.sanskritName !== division.name ? html7`<span class="division-meta"> · ${division.sanskritName}</span>` : nothing8}
				</h2>
				${division.significance ? html7`<p class="significance">${division.significance}</p>` : nothing8}
			</div>

			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="D${division.number} ${division.name} divisional chart with twelve sign houses"
			>
				<title>D${division.number} ${division.name}</title>
				${isNorth ? renderNorthFrame() : renderSouthFrame()}
				${isNorth ? houses.map((h) => renderNorthHouseGroup(h)) : houses.map((h) => renderSouthHouseGroup(h))}
			</svg>

			${vargottama && vargottama.length > 0 ? html7`<div class="vargottama-row" role="list" aria-label="Vargottama planets">
						<span class="vargottama-label">Vargottama:</span>
						${vargottama.map(
      (planet) => html7`<span class="vargottama-pill" role="listitem">
									${PLANET_GLYPH[planet] ?? ""} ${planet}
								</span>`
    )}
					</div>` : nothing8}
		</div>`;
  }
};
RoxyDivisionalChart.styles = [
  baseStyles,
  css8`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.header {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.division-meta {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				margin: 0;
			}
			.significance {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				border-left: 2px solid var(--roxy-border, #e4e4e7);
				padding-left: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				margin: 0 auto;
			}
			.line {
				fill: transparent;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.sign-text {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 500;
				font-family: var(--roxy-font-sans);
			}
			.planet-text {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 11px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 400;
				font-family: var(--roxy-font-sans);
			}
			.lagna-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 8px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.05em;
			}
			.lagna-bg {
				fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
				stroke-width: 0.8;
			}
			.vargottama-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				align-items: center;
			}
			.vargottama-label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
				font-weight: 500;
				margin-right: var(--roxy-space-xs, 0.25rem);
			}
			.vargottama-pill {
				display: inline-flex;
				align-items: center;
				gap: 0.2em;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 600;
				padding: 0.15em 0.6em;
				border-radius: 999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 22%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
			}
		`
];
__decorateClass([
  property7({ attribute: false })
], RoxyDivisionalChart.prototype, "data", 2);
__decorateClass([
  property7({ type: String, reflect: true, attribute: "chart-style" })
], RoxyDivisionalChart.prototype, "chartStyle", 2);
RoxyDivisionalChart = __decorateClass([
  customElement7("roxy-divisional-chart")
], RoxyDivisionalChart);

// packages/ui/src/components/dosha-card.ts
import { css as css9, html as html8, LitElement as LitElement8, nothing as nothing9 } from "lit";
import { customElement as customElement8, property as property8 } from "lit/decorators.js";
var DOSHA_LABELS = {
  manglik: "Mangal Dosha",
  kalsarpa: "Kaal Sarp Dosha",
  sadhesati: "Sade Sati"
};
var RoxyDoshaCard = class extends LitElement8 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.type = "manglik";
  }
  render() {
    const d = this.data;
    if (!d)
      return html8`<div class="roxy-empty" role="status">No dosha data</div>`;
    const present = !!d.present;
    const label = DOSHA_LABELS[this.type] ?? this.type;
    const sevLower = (d.severity ?? "").toLowerCase();
    const tier = sevLower === "severe" ? 3 : sevLower === "moderate" ? 2 : sevLower === "mild" ? 1 : 0;
    const pct = tier * 33;
    const barColor = tier === 3 ? "var(--roxy-danger)" : tier === 2 ? "var(--roxy-warning)" : tier === 1 ? "var(--roxy-success)" : "transparent";
    return html8`<article
			class="card"
			aria-label=${label}
		>
			<header class="head">
				<h2 class="title">${label}</h2>
				<span class=${`badge ${present ? "present" : "absent"}`}>
					${present ? "Present" : "Absent"}
				</span>
			</header>
			${d.severity ? html8`<div
						class="severity-bar"
						role="meter"
						aria-valuemin="0"
						aria-valuemax="3"
						aria-valuenow="${tier}"
						aria-label="Severity ${d.severity}"
					>
						<span class="severity-fill" style="width: ${pct}%; background: ${barColor};"></span>
					</div>` : nothing9}
			${d.description ? html8`<p class="description">${d.description}</p>` : nothing9}
			${this.renderEffects(d)}
			${d.remedies && d.remedies.length > 0 ? html8`<div>
						<h3>Remedies</h3>
						<ul>
							${d.remedies.map((r) => html8`<li>${r}</li>`)}
						</ul>
					</div>` : nothing9}
			${"exceptions" in d && d.exceptions && d.exceptions.length > 0 ? html8`<div>
					<h3>Exceptions</h3>
					<ul>
						${d.exceptions.map((r) => html8`<li>${r}</li>`)}
					</ul>
				</div>` : nothing9}
		</article>`;
  }
  renderEffects(d) {
    if (!d.effects) return nothing9;
    const entries = Object.entries(d.effects).filter(
      ([, v]) => typeof v === "string" && v.length > 0
    );
    if (entries.length === 0) return nothing9;
    return html8`<div class="effects">
			${entries.map(
      ([k, v]) => html8`<div>
					<h3>${k}</h3>
					<p>${v}</p>
				</div>`
    )}
		</div>`;
  }
};
RoxyDoshaCard.styles = [
  baseStyles,
  css9`
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
		`
];
__decorateClass([
  property8({ attribute: false })
], RoxyDoshaCard.prototype, "data", 2);
__decorateClass([
  property8({ type: String, reflect: true })
], RoxyDoshaCard.prototype, "type", 2);
RoxyDoshaCard = __decorateClass([
  customElement8("roxy-dosha-card")
], RoxyDoshaCard);

// packages/ui/src/components/endpoint-form.ts
import { css as css10, html as html9, LitElement as LitElement9, nothing as nothing10 } from "lit";
import { customElement as customElement9, property as property9, state as state2 } from "lit/decorators.js";
var specCache = /* @__PURE__ */ new Map();
async function loadSpec(url) {
  let pending = specCache.get(url);
  if (!pending) {
    pending = fetch(url).then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    }).catch((err) => {
      specCache.delete(url);
      throw err;
    });
    specCache.set(url, pending);
  }
  return pending;
}
var RoxyEndpointForm = class extends LitElement9 {
  constructor() {
    super(...arguments);
    this.endpoint = "vedic-astrology/birth-chart";
    this.method = "POST";
    this.specUrl = "https://roxyapi.com/api/v2/openapi.json";
    this.submitLabel = "Submit";
    this.fields = [];
    this.values = {};
    this.hasLocation = false;
    this.loaded = false;
    this.specError = null;
    this.retryLoadSchema = () => {
      this.loaded = false;
      this.specError = null;
      void this.loadSchema();
    };
    this.onLocation = (e) => {
      const detail = e.detail;
      if (detail) {
        this.values = {
          ...this.values,
          latitude: detail.latitude,
          longitude: detail.longitude,
          timezone: detail.timezone ?? detail.utcOffset
        };
      }
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      const missing = this.fields.filter((f) => f.required).filter(
        (f) => this.values[f.name] === void 0 || this.values[f.name] === ""
      );
      if (missing.length > 0) {
        this.dispatchEvent(
          new CustomEvent("roxy-validation-error", {
            detail: { missing: missing.map((m) => m.name) },
            bubbles: true,
            composed: true
          })
        );
        return;
      }
      this.dispatchEvent(
        new CustomEvent("roxy-submit", {
          detail: { endpoint: this.endpoint, values: this.values },
          bubbles: true,
          composed: true
        })
      );
    };
  }
  connectedCallback() {
    super.connectedCallback();
    void this.loadSchema();
  }
  async loadSchema() {
    this.specError = null;
    try {
      const spec = await loadSpec(this.specUrl);
      const path = `/${this.endpoint.replace(/^\//, "")}`;
      const op = spec.paths?.[path]?.[this.method.toLowerCase()];
      if (!op) {
        throw new Error(
          `Endpoint ${this.method} ${path} not found in OpenAPI spec`
        );
      }
      const schemas = spec.components?.schemas ?? {};
      const fields = [];
      let bodySchema;
      if (op.requestBody) {
        const ref = op.requestBody.content?.["application/json"]?.schema;
        bodySchema = this.resolve(ref, schemas);
      }
      if (bodySchema?.properties) {
        const required = new Set(bodySchema.required ?? []);
        for (const [name, sub] of Object.entries(bodySchema.properties)) {
          const resolved = this.resolve(sub, schemas) ?? {};
          fields.push({
            name,
            type: this.fieldType(resolved),
            required: required.has(name),
            description: resolved.description,
            enum: resolved.enum,
            min: resolved.minimum,
            max: resolved.maximum,
            default: resolved.default
          });
        }
      }
      for (const param of op.parameters ?? []) {
        if (param.in === "path" || param.in === "query") {
          const resolved = this.resolve(param.schema, schemas) ?? {};
          fields.push({
            name: param.name,
            type: this.fieldType(resolved),
            required: !!param.required,
            description: resolved.description,
            enum: resolved.enum,
            default: resolved.default
          });
        }
      }
      this.fields = fields;
      this.hasLocation = fields.some((f) => f.name === "latitude") && fields.some((f) => f.name === "longitude") && fields.some((f) => f.name === "timezone");
      const init = {};
      for (const f of fields) {
        if (f.default !== void 0) init[f.name] = f.default;
      }
      this.values = init;
      this.loaded = true;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.specError = message;
      this.loaded = true;
      this.dispatchEvent(
        new CustomEvent("roxy-spec-error", {
          detail: { url: this.specUrl, message },
          bubbles: true,
          composed: true
        })
      );
    }
  }
  resolve(schema, all) {
    if (!schema) return void 0;
    if ("$ref" in schema && schema.$ref) {
      const name = schema.$ref.split("/").pop();
      return name ? all[name] : void 0;
    }
    return schema;
  }
  fieldType(s) {
    if (s.enum) return "enum";
    if (s.format === "date") return "date";
    if (s.format === "time") return "time";
    if (s.format === "date-time") return "datetime";
    if (s.type === "integer" || s.type === "number") return "number";
    return "text";
  }
  setValue(name, value) {
    this.values = { ...this.values, [name]: value };
  }
  render() {
    if (!this.loaded) {
      return html9`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;
    }
    if (this.specError) {
      return html9`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;
    }
    const renderField = (f) => {
      if (this.hasLocation && (f.name === "latitude" || f.name === "longitude" || f.name === "timezone")) {
        return nothing10;
      }
      const inputId = `roxy-form-${f.name}`;
      return html9`<div class="field">
				<label for=${inputId}>
					${humanize(f.name)}${f.required ? html9`<span class="req" aria-hidden="true">*</span>` : nothing10}
				</label>
				${f.enum ? html9`<select
							id=${inputId}
							?required=${f.required}
							@change=${(e) => this.setValue(f.name, e.target.value)}
						>
							<option value="">Choose</option>
							${f.enum.map(
        (opt) => html9`<option value=${opt} ?selected=${this.values[f.name] === opt}>
									${opt}
								</option>`
      )}
						</select>` : html9`<input
							id=${inputId}
							type=${this.htmlType(f.type)}
							?required=${f.required}
							min=${f.min ?? ""}
							max=${f.max ?? ""}
							step=${f.type === "number" ? "any" : ""}
							.value=${this.values[f.name] ?? ""}
							@input=${(e) => this.setValue(
        f.name,
        this.coerce(f.type, e.target.value)
      )}
						/>`}
				${f.description ? html9`<small class="help">${f.description}</small>` : nothing10}
			</div>`;
    };
    return html9`<form @submit=${this.onSubmit}>
			<h2 class="title">${humanize(this.endpoint.split("/").pop() ?? "")}</h2>
			${this.hasLocation ? html9`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>` : nothing10}
			<div class="fields">
				${this.fields.map((f) => renderField(f))}
			</div>
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`;
  }
  htmlType(t) {
    switch (t) {
      case "date":
        return "date";
      case "time":
        return "time";
      case "datetime":
        return "datetime-local";
      case "number":
        return "number";
      default:
        return "text";
    }
  }
  coerce(t, v) {
    if (v === "") return void 0;
    if (t === "number") {
      const n = Number(v);
      return Number.isFinite(n) ? n : void 0;
    }
    return v;
  }
};
RoxyEndpointForm.styles = [
  baseStyles,
  css10`
			form {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.fields {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				align-items: start;
				gap: var(--roxy-space-md, 1rem);
			}
			.field {
				display: flex;
				flex-direction: column;
				gap: var(--roxy-space-xs, 0.25rem);
				min-width: 0;
			}
			label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			label .req {
				color: var(--roxy-danger-fg, #991b1b);
				margin-left: 4px;
			}
			input,
			select {
				width: 100%;
				box-sizing: border-box;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-base, 1rem);
				font-family: inherit;
				color: var(--roxy-fg, #0a0a0a);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
			}
			input:focus,
			select:focus {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
				border-color: var(--roxy-accent-fg, #b45309);
			}
			.help {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.location-block {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				grid-column: 1 / -1;
			}
			.coords {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.coords input {
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			button.submit {
				justify-self: start;
				background: var(--roxy-accent-fg, #b45309);
				color: var(--roxy-bg, #fff);
				border: 0;
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-lg, 1.5rem);
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				cursor: pointer;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			button.submit:hover {
				transform: scale(1.02);
			}
			button.submit:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}
			.spec-error {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: start;
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-danger, #dc2626);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				color: var(--roxy-danger-fg, #991b1b);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`
];
__decorateClass([
  property9({ type: String, attribute: "data-endpoint" })
], RoxyEndpointForm.prototype, "endpoint", 2);
__decorateClass([
  property9({ type: String })
], RoxyEndpointForm.prototype, "method", 2);
__decorateClass([
  property9({ type: String, attribute: "spec-url" })
], RoxyEndpointForm.prototype, "specUrl", 2);
__decorateClass([
  property9({ type: String, attribute: "submit-label" })
], RoxyEndpointForm.prototype, "submitLabel", 2);
__decorateClass([
  state2()
], RoxyEndpointForm.prototype, "fields", 2);
__decorateClass([
  state2()
], RoxyEndpointForm.prototype, "values", 2);
__decorateClass([
  state2()
], RoxyEndpointForm.prototype, "hasLocation", 2);
__decorateClass([
  state2()
], RoxyEndpointForm.prototype, "loaded", 2);
__decorateClass([
  state2()
], RoxyEndpointForm.prototype, "specError", 2);
RoxyEndpointForm = __decorateClass([
  customElement9("roxy-endpoint-form")
], RoxyEndpointForm);

// packages/ui/src/components/guna-milan.ts
import { css as css11, html as html10, LitElement as LitElement10, nothing as nothing11 } from "lit";
import { customElement as customElement10, property as property10 } from "lit/decorators.js";
var RoxyGunaMilan = class extends LitElement10 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    const d = this.data;
    if (!d)
      return html10`<div class="roxy-empty" role="status">No Guna Milan data</div>`;
    const breakdown = (d.breakdown ?? []).filter(
      (b) => b?.category !== void 0
    );
    const score = d.total ?? 0;
    const max = d.maxScore ?? 36;
    const pct = score / max * 100;
    const trackColor = "color-mix(in srgb, var(--roxy-border) 50%, transparent)";
    const fillColor = pct >= 70 ? "var(--roxy-success)" : pct >= 50 ? "var(--roxy-warning)" : "var(--roxy-danger)";
    const dashFill = pct * 2.827;
    const dashGap = (100 - pct) * 2.827;
    return html10`<article class="card" aria-label="Guna Milan score">
			<div class="score-header">
				<div class="score-info">
					<div class="score-bar">
						<div>
							<span class="total">${formatNumber(d.total, 1)}</span>
							<span class="over"> / ${d.maxScore}</span>
							${typeof d.percentage === "number" ? html10`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
										${formatPercent(d.percentage, 1)}
									</small>` : nothing11}
						</div>
						${d.recommendation ? html10`<span class="recommendation">${d.recommendation}</span>` : nothing11}
					</div>
				</div>
				<div class="score-ring" role="meter" aria-label="Guna milan score" aria-valuemin="0" aria-valuemax="36" aria-valuenow="${score}">
					<svg viewBox="0 0 100 100" aria-hidden="true">
						<circle class="ring-track" cx="50" cy="50" r="45" fill="none" stroke="${trackColor}" stroke-width="8"/>
						<circle class="ring-fill" cx="50" cy="50" r="45" fill="none" stroke="${fillColor}" stroke-width="8"
								stroke-dasharray="${dashFill},${dashGap}" stroke-linecap="round"
								transform="rotate(-90 50 50)"/>
						<text x="50" y="50" text-anchor="middle" dominant-baseline="central" class="ring-text">${score}</text>
						<text x="50" y="64" text-anchor="middle" dominant-baseline="central" class="ring-max">/${max}</text>
					</svg>
				</div>
			</div>

			${breakdown.length > 0 ? html10`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${breakdown.map((b) => {
      const score2 = b.score ?? 0;
      const maxScore = b.maxScore ?? defaultMax(b.category);
      const pct2 = maxScore ? score2 / maxScore * 100 : 0;
      return html10`<tr>
									<td>${b.category}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${pct2}%"></span>
										</div>
									</td>
									<td class="score">${formatNumber(score2, 1)} / ${maxScore}</td>
								</tr>`;
    })}
						</tbody>
					</table>` : nothing11}
			${(d.doshas?.length ?? 0) > 0 || (d.doshaCancellations?.length ?? 0) > 0 ? html10`<div class="tags">
						${d.doshas?.map((x) => html10`<span class="dosha">${x}</span>`)}
						${d.doshaCancellations?.map(
      (x) => html10`<span class="cancel" title=${x.reason}>${x.dosha} cancelled</span>`
    )}
					</div>` : nothing11}
		</article>`;
  }
};
RoxyGunaMilan.styles = [
  baseStyles,
  css11`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.score-header {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
			.score-info {
				flex: 1;
			}
			.score-bar {
				display: grid;
				grid-template-columns: 1fr auto;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.total {
				font-size: 2.25rem;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
				line-height: 1;
			}
			.over {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-base, 1rem);
			}
			.recommendation {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.score-ring {
				width: 120px;
				height: 120px;
				flex-shrink: 0;
			}
			.score-ring svg {
				width: 100%;
				height: 100%;
			}
			.score-ring .ring-text {
				font-size: 22px;
				font-weight: 700;
				fill: var(--roxy-fg, #0a0a0a);
				font-family: var(--roxy-font-sans);
			}
			.score-ring .ring-max {
				font-size: 10px;
				fill: var(--roxy-muted, #71717a);
				font-family: var(--roxy-font-sans);
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
				text-align: left;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}
			td.score {
				text-align: right;
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			td.bar-cell {
				width: 30%;
			}
			.mini-bar {
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.mini-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.tags {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.tags span {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.tags .dosha {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.tags .cancel {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 18%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
		`
];
__decorateClass([
  property10({ attribute: false })
], RoxyGunaMilan.prototype, "data", 2);
RoxyGunaMilan = __decorateClass([
  customElement10("roxy-guna-milan")
], RoxyGunaMilan);
function defaultMax(name) {
  if (!name) return 1;
  switch (name.toLowerCase()) {
    case "varna":
      return 1;
    case "vasya":
      return 2;
    case "tara":
      return 3;
    case "yoni":
      return 4;
    case "maitri":
      return 5;
    case "gana":
      return 6;
    case "bhakoot":
      return 7;
    case "nadi":
      return 8;
    default:
      return 1;
  }
}

// packages/ui/src/components/hexagram.ts
import { css as css12, html as html11, LitElement as LitElement11, nothing as nothing12, svg as svg3 } from "lit";
import { customElement as customElement11, property as property11 } from "lit/decorators.js";
var RoxyHexagram = class extends LitElement11 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "lookup";
  }
  resolveHexagram() {
    const d = this.data;
    if (!d) return null;
    if ("hexagram" in d && d.hexagram) {
      if ("lines" in d) {
        const cast = d;
        return {
          hex: cast.hexagram,
          lines: cast.lines,
          changingLinePositions: cast.changingLinePositions,
          resultingHexagram: cast.resultingHexagram
        };
      }
      const daily = d;
      return {
        hex: daily.hexagram,
        dailyMessage: daily.dailyMessage
      };
    }
    return { hex: d };
  }
  render() {
    const resolved = this.resolveHexagram();
    if (!resolved)
      return html11`<div class="roxy-empty" role="status">No hexagram data</div>`;
    const {
      hex: h,
      lines: castLines,
      changingLinePositions,
      dailyMessage,
      resultingHexagram
    } = resolved;
    const lines = castLines ?? this.derivedLines(h);
    const changing = new Set(changingLinePositions ?? []);
    return html11`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${h.symbol ? html11`<div class="symbol">${h.symbol}</div>` : nothing12}
				<div class="lines" aria-hidden="true">
					${lines.slice().reverse().map((l, idx) => {
      const realIdx = lines.length - 1 - idx + 1;
      const isChanging = changing.has(realIdx);
      const broken = l === 6 || l === 8;
      const cls = `${broken ? "broken" : "solid"}${isChanging ? " changing" : ""}`;
      return html11`<div class="line ${cls}">
								${broken ? svg3`<span class="seg"></span><span class="seg"></span>` : svg3`<span class="seg"></span>`}
							</div>`;
    })}
				</div>
			</div>
			<div>
				<h2 class="title">
					${h.number ? html11`${h.number}. ` : nothing12}${h.english ?? h.chinese ?? "Hexagram"}
				</h2>
				<p class="subtitle">
					${h.chinese ? html11`${h.chinese}` : nothing12}
					${h.pinyin ? html11` · ${h.pinyin}` : nothing12}
				</p>
				<div class="trigrams">
					${h.upperTrigram ? html11`<div>
								Upper
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.upperTrigram] ?? ""}</span
								>${h.upperTrigram}
							</div>` : nothing12}
					${h.lowerTrigram ? html11`<div>
								Lower
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.lowerTrigram] ?? ""}</span
								>${h.lowerTrigram}
							</div>` : nothing12}
				</div>
				${h.judgment ? html11`<p class="judgment">${h.judgment}</p>` : nothing12}
				${h.image ? html11`<p class="image">${h.image}</p>` : nothing12}
				${dailyMessage ? html11`<p class="message">${dailyMessage}</p>` : nothing12}
				${h.interpretation?.general ? html11`<p>${h.interpretation.general}</p>` : nothing12}
				${changing.size > 0 ? html11`<div class="changing">
							Changing lines: ${Array.from(changing).sort((a, b) => a - b).join(", ")}.
							${resultingHexagram?.english ? html11` Becomes hexagram ${resultingHexagram.number}
										${resultingHexagram.english}.` : nothing12}
						</div>` : nothing12}
			</div>
		</article>`;
  }
  /** When the API only ships symbol+number with no line array, render six solid yang. */
  derivedLines(h) {
    const cp = h.symbol.codePointAt(0) ?? 0;
    if (cp >= 19904 && cp <= 19967) {
      const offset = cp - 19904;
      const lines = [];
      for (let i = 0; i < 6; i++) {
        const broken = offset >> i & 1;
        lines.push(broken ? 8 : 7);
      }
      return lines;
    }
    return Array.from({ length: 6 }, () => 7);
  }
};
RoxyHexagram.styles = [
  baseStyles,
  css12`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: 6rem 1fr;
				gap: var(--roxy-space-lg, 1.5rem);
			}

			@container (max-width: 480px) {
				.card {
					grid-template-columns: 1fr;
				}
			}

			.glyphs {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: center;
			}
			.symbol {
				font-size: 3rem;
				line-height: 1;
				color: var(--roxy-accent-fg, #b45309);
			}
			.lines {
				display: grid;
				gap: 4px;
				width: 4rem;
			}
			.line {
				display: flex;
				gap: 4px;
				justify-content: center;
				align-items: center;
				height: 8px;
			}
			.seg {
				display: block;
				height: 6px;
				background: var(--roxy-fg, #0a0a0a);
				border-radius: 1px;
			}
			.line.broken .seg {
				width: 1.4rem;
			}
			.line.solid .seg {
				width: 3rem;
			}
			.line.changing .seg {
				background: var(--roxy-accent, #f59e0b);
			}

			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
			}
			.trigrams {
				display: flex;
				gap: var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-sm, 0.5rem);
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.tri-glyph {
				font-size: var(--roxy-text-xl, 1.5rem);
				color: var(--roxy-accent-fg, #b45309);
				margin-right: 4px;
				vertical-align: middle;
			}
			.judgment,
			.image,
			.message {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.judgment::before {
				content: 'Judgment. ';
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
			}
			.image::before {
				content: 'Image. ';
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
			}

			.changing {
				margin-top: var(--roxy-space-md, 1rem);
				padding-top: var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`
];
__decorateClass([
  property11({ attribute: false })
], RoxyHexagram.prototype, "data", 2);
__decorateClass([
  property11({ type: String, reflect: true })
], RoxyHexagram.prototype, "mode", 2);
RoxyHexagram = __decorateClass([
  customElement11("roxy-hexagram")
], RoxyHexagram);

// packages/ui/src/components/horoscope-card.ts
import { css as css13, html as html12, LitElement as LitElement12, nothing as nothing13 } from "lit";
import { customElement as customElement12, property as property12 } from "lit/decorators.js";
var RoxyHoroscopeCard = class extends LitElement12 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.period = "daily";
  }
  render() {
    const d = this.data;
    if (!d)
      return html12`<div class="roxy-empty" role="status">No horoscope data</div>`;
    const sign = d.sign ?? "";
    const glyph = sign ? SIGN_GLYPH[capitalize(sign)] ?? "" : "";
    const energy = "energyRating" in d && typeof d.energyRating === "number" ? d.energyRating : null;
    const dateLabel = "date" in d && d.date || "week" in d && d.week || "month" in d && d.month || "";
    return html12`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${sign}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				<div>
					<h2 class="title">${sign} ${this.period}</h2>
					${dateLabel ? html12`<div class="date">${dateLabel}</div>` : nothing13}
				</div>
				${energy !== null ? html12`<span class="energy" aria-label=${`Energy ${energy} of 10`}>
							Energy ${energy}/10
							<span class="energy-bar"
								><span style="width: ${energy / 10 * 100}%"></span
							></span>
						</span>` : nothing13}
			</header>

			${d.overview ? html12`<p class="overview">${d.overview}</p>` : nothing13}

			<div class="sections">
				${d.love ? html12`<div class="section">
							<h3>Love</h3>
							<p>${d.love}</p>
						</div>` : nothing13}
				${d.career ? html12`<div class="section">
							<h3>Career</h3>
							<p>${d.career}</p>
						</div>` : nothing13}
				${d.health ? html12`<div class="section">
							<h3>Health</h3>
							<p>${d.health}</p>
						</div>` : nothing13}
				${d.finance ? html12`<div class="section">
							<h3>Finance</h3>
							<p>${d.finance}</p>
						</div>` : nothing13}
				${"advice" in d && d.advice ? html12`<div class="section">
							<h3>Advice</h3>
							<p>${d.advice}</p>
						</div>` : nothing13}
			</div>

			${(() => {
      const luckyNumber = "luckyNumber" in d && d.luckyNumber !== void 0 ? d.luckyNumber : void 0;
      const luckyColor = "luckyColor" in d && d.luckyColor ? d.luckyColor : "";
      const luckyNumbers = "luckyNumbers" in d && d.luckyNumbers ? d.luckyNumbers : [];
      const luckyDays = "luckyDays" in d && d.luckyDays ? d.luckyDays : [];
      const compatibleSigns = d.compatibleSigns ?? [];
      if (luckyNumber === void 0 && !luckyColor && luckyNumbers.length === 0 && luckyDays.length === 0 && compatibleSigns.length === 0)
        return nothing13;
      return html12`<div class="lucky">
						${luckyNumber !== void 0 ? html12`<span>Lucky number <strong>${luckyNumber}</strong></span>` : nothing13}
						${luckyColor ? html12`<span>Lucky color <strong>${luckyColor}</strong></span>` : nothing13}
						${luckyNumbers.length ? html12`<span
									>Lucky numbers
									<strong>${luckyNumbers.join(", ")}</strong></span
								>` : nothing13}
						${luckyDays.length ? html12`<span
									>Lucky days <strong>${luckyDays.join(", ")}</strong></span
								>` : nothing13}
						${compatibleSigns.length ? html12`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${compatibleSigns.map(
        (s) => html12`<span>${s}</span>`
      )}</span
									>
								</span>` : nothing13}
					</div>`;
    })()}
		</article>`;
  }
};
RoxyHoroscopeCard.styles = [
  baseStyles,
  css13`
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
				gap: var(--roxy-space-md, 1rem);
			}

			.glyph {
				font-size: 2.25rem;
				color: var(--roxy-accent-fg, #b45309);
				line-height: 1;
			}

			.title {
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				letter-spacing: var(--roxy-tracking-tight);
				text-transform: capitalize;
			}

			.date {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}

			.energy {
				margin-left: auto;
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.energy-bar {
				display: inline-block;
				width: 6rem;
				height: 6px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				margin-left: 6px;
				vertical-align: middle;
			}
			.energy-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				transition:
					width var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.overview {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
				margin: 0;
			}

			.sections {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}

			.section h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.section p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.lucky {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}

			.lucky strong {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.compat-wrap {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.compat span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: capitalize;
			}
		`
];
__decorateClass([
  property12({ attribute: false })
], RoxyHoroscopeCard.prototype, "data", 2);
__decorateClass([
  property12({ type: String, reflect: true })
], RoxyHoroscopeCard.prototype, "period", 2);
RoxyHoroscopeCard = __decorateClass([
  customElement12("roxy-horoscope-card")
], RoxyHoroscopeCard);

// packages/ui/src/components/kp-planets-table.ts
import { css as css14, html as html13, LitElement as LitElement13, nothing as nothing14 } from "lit";
import { customElement as customElement13, property as property13 } from "lit/decorators.js";
var RoxyKpPlanetsTable = class extends LitElement13 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data)
      return html13`<div class="roxy-empty" role="status">No KP data</div>`;
    const planets = this.data.planets ?? [];
    return html13`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${typeof this.data.ayanamsa === "number" ? html13`<span class="ayanamsa">Ayanamsa: ${formatNumber(this.data.ayanamsa, 2)}°</span>` : nothing14}
			</header>
			<table role="table">
				<thead>
					<tr>
						<th scope="col">Planet</th>
						<th scope="col">Sign</th>
						<th scope="col">Sign lord</th>
						<th scope="col">Nakshatra</th>
						<th scope="col">Star lord</th>
						<th scope="col">Sub lord</th>
						<th scope="col">Sub sub lord</th>
						<th scope="col">KP no.</th>
					</tr>
				</thead>
				<tbody>
					${planets.map(
      (p) => html13`<tr>
							<td class="planet">
								${p.planet}
								${p.retrograde ? html13`<span class="retro">R</span>` : nothing14}
							</td>
							<td>${p.sign ?? ""}</td>
							<td>${p.signLord ?? ""}</td>
							<td>${p.nakshatra ?? ""}</td>
							<td>${p.nakshatraLord ?? ""}</td>
							<td>${p.subLord ?? ""}</td>
							<td>${p.subSubLord ?? ""}</td>
							<td>${p.kpNumber ?? ""}</td>
						</tr>`
    )}
				</tbody>
			</table>
		</div>`;
  }
};
RoxyKpPlanetsTable.styles = [
  baseStyles,
  css14`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
				overflow: auto;
				box-shadow: var(--roxy-shadow-sm);
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.ayanamsa {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				min-width: 560px;
			}
			thead {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 20%, transparent);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				text-align: left;
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}
			tbody tr {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			td.planet {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.retro {
				color: var(--roxy-warning-fg, #9a3412);
				font-size: var(--roxy-text-xs, 0.75rem);
				margin-left: 4px;
			}
		`
];
__decorateClass([
  property13({ attribute: false })
], RoxyKpPlanetsTable.prototype, "data", 2);
RoxyKpPlanetsTable = __decorateClass([
  customElement13("roxy-kp-planets-table")
], RoxyKpPlanetsTable);

// packages/ui/src/components/location-search.ts
import { css as css15, html as html14, LitElement as LitElement14, nothing as nothing15 } from "lit";
import { customElement as customElement14, property as property14, state as state3 } from "lit/decorators.js";

// packages/ui/src/utils/debounce.ts
function debounce(fn, wait) {
  let timer;
  const debounced = ((...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = void 0;
      fn(...args);
    }, wait);
  });
  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
  };
  return debounced;
}

// packages/ui/src/components/location-search.ts
var RoxyLocationSearch = class extends LitElement14 {
  constructor() {
    super(...arguments);
    this.endpoint = "https://roxyapi.com/api/v2/location/search";
    this.placeholder = "Search city";
    this.defaultValue = "";
    this.query = "";
    this.results = [];
    this.isOpen = false;
    this.isLoading = false;
    this.highlight = -1;
    this.secretKeyWarned = false;
    this.debouncedFetch = debounce((q) => {
      void this.fetchResults(q);
    }, 300);
    this.onInput = (e) => {
      const value = e.target.value;
      this.query = value;
      if (value.length < 2) {
        this.results = [];
        this.isOpen = false;
        this.highlight = -1;
        return;
      }
      this.debouncedFetch(value);
    };
    this.onKeyDown = (e) => {
      if (!this.isOpen || this.results.length === 0) {
        if (e.key === "ArrowDown" && this.query.length >= 2) {
          void this.fetchResults(this.query);
          e.preventDefault();
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.highlight = (this.highlight + 1) % this.results.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.highlight = (this.highlight - 1 + this.results.length) % this.results.length;
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = this.results[this.highlight] ?? this.results[0];
        if (target) this.select(target);
      } else if (e.key === "Escape") {
        this.isOpen = false;
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.query = this.defaultValue;
    this.clickOutsideHandler = (e) => {
      const path = e.composedPath();
      if (!path.includes(this)) this.isOpen = false;
    };
    document.addEventListener("mousedown", this.clickOutsideHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.clickOutsideHandler) {
      document.removeEventListener("mousedown", this.clickOutsideHandler);
    }
    this.debouncedFetch.cancel();
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = void 0;
    }
  }
  warnIfSecretKey() {
    if (this.secretKeyWarned) return;
    if (!this.apiKey) return;
    if (this.apiKey.startsWith("pk_")) return;
    this.secretKeyWarned = true;
    const message = "Possible secret key in client-side <roxy-location-search>; use a `pk_` publishable key with origin allowlist instead.";
    console.warn(message);
    this.dispatchEvent(
      new CustomEvent("roxy-validation-error", {
        detail: { reason: "possible-secret-key", message },
        bubbles: true,
        composed: true
      })
    );
  }
  async fetchResults(q) {
    this.warnIfSecretKey();
    if (this.abortController) this.abortController.abort();
    const controller = new AbortController();
    this.abortController = controller;
    this.isLoading = true;
    try {
      const url = new URL(this.endpoint);
      url.searchParams.set("q", q);
      url.searchParams.set("limit", "8");
      const headers = {
        Accept: "application/json"
      };
      if (this.apiKey) headers["X-API-Key"] = this.apiKey;
      if (this.publishableKey) headers["X-API-Key"] = this.publishableKey;
      const res = await fetch(url, { headers, signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (controller.signal.aborted) return;
      this.results = json.cities ?? [];
      this.isOpen = this.results.length > 0;
      this.highlight = this.results.length > 0 ? 0 : -1;
    } catch (err) {
      if (err?.name === "AbortError") return;
      this.results = [];
      this.isOpen = false;
    } finally {
      if (this.abortController === controller) {
        this.abortController = void 0;
      }
      if (!controller.signal.aborted) this.isLoading = false;
    }
  }
  select(city) {
    this.query = `${city.city}${city.province ? `, ${city.province}` : ""}, ${city.country}`;
    this.isOpen = false;
    this.results = [];
    this.dispatchEvent(
      new CustomEvent("roxy-location-select", {
        detail: city,
        bubbles: true,
        composed: true
      })
    );
  }
  render() {
    return html14`<div class="field">
			<input
				type="text"
				role="combobox"
				aria-expanded=${this.isOpen ? "true" : "false"}
				aria-controls="roxy-location-listbox"
				aria-autocomplete="list"
				autocomplete="off"
				placeholder=${this.placeholder}
				.value=${this.query}
				@input=${this.onInput}
				@keydown=${this.onKeyDown}
				@focus=${() => {
      if (this.results.length > 0) this.isOpen = true;
    }}
			/>
			${this.isLoading ? html14`<span class="spinner" role="status" aria-label="Loading"></span>` : nothing15}
			${this.isOpen ? html14`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${this.results.length === 0 ? html14`<li class="empty" role="status">No cities found</li>` : this.results.map(
      (city, idx) => html14`<li role="presentation">
										<button
											type="button"
											class="option"
											role="option"
											aria-selected=${this.highlight === idx ? "true" : "false"}
											@click=${() => this.select(city)}
											@mouseenter=${() => {
        this.highlight = idx;
      }}
										>
											<span class="city">${city.city}</span>
											<span class="where"
												>${city.province ? html14`${city.province}, ` : ""}${city.country}</span
											>
											<span class="tz"
												>UTC${city.utcOffset >= 0 ? "+" : ""}${city.utcOffset}</span
											>
										</button>
									</li>`
    )}
					</ul>` : nothing15}
		</div>`;
  }
};
RoxyLocationSearch.styles = [
  baseStyles,
  css15`
			:host {
				display: block;
				position: relative;
			}
			.field {
				position: relative;
			}
			input {
				width: 100%;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-base, 1rem);
				font-family: inherit;
				color: var(--roxy-fg, #0a0a0a);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				transition:
					border-color var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
				box-sizing: border-box;
			}
			input:focus {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
				border-color: var(--roxy-accent-fg, #b45309);
			}
			.spinner {
				position: absolute;
				right: 12px;
				top: 50%;
				transform: translateY(-50%);
				width: 14px;
				height: 14px;
				border: 2px solid var(--roxy-muted, #71717a);
				border-top-color: transparent;
				border-radius: 50%;
				animation: roxy-spin 700ms linear infinite;
			}
			@keyframes roxy-spin {
				to {
					transform: translateY(-50%) rotate(360deg);
				}
			}
			@media (prefers-reduced-motion: reduce) {
				.spinner {
					animation: none;
				}
			}

			.results {
				position: absolute;
				z-index: 50;
				top: calc(100% + 4px);
				left: 0;
				right: 0;
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				box-shadow: var(--roxy-shadow-md);
				max-height: 22rem;
				overflow-y: auto;
				animation: roxy-fade-in var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.option {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				width: 100%;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				background: transparent;
				border: 0;
				text-align: left;
				font-family: inherit;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				cursor: pointer;
				transition: background-color var(--roxy-motion-duration, 200ms);
			}
			.option:hover,
			.option[aria-selected='true'] {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
			}
			.option .city {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.option .where {
				color: var(--roxy-muted, #71717a);
				flex-grow: 1;
			}
			.option .tz {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.empty {
				padding: var(--roxy-space-md, 1rem);
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`
];
__decorateClass([
  property14({ type: String, attribute: "api-key" })
], RoxyLocationSearch.prototype, "apiKey", 2);
__decorateClass([
  property14({ type: String, attribute: "publishable-key" })
], RoxyLocationSearch.prototype, "publishableKey", 2);
__decorateClass([
  property14({ type: String })
], RoxyLocationSearch.prototype, "endpoint", 2);
__decorateClass([
  property14({ type: String })
], RoxyLocationSearch.prototype, "placeholder", 2);
__decorateClass([
  property14({ type: String, attribute: "default-value" })
], RoxyLocationSearch.prototype, "defaultValue", 2);
__decorateClass([
  state3()
], RoxyLocationSearch.prototype, "query", 2);
__decorateClass([
  state3()
], RoxyLocationSearch.prototype, "results", 2);
__decorateClass([
  state3()
], RoxyLocationSearch.prototype, "isOpen", 2);
__decorateClass([
  state3()
], RoxyLocationSearch.prototype, "isLoading", 2);
__decorateClass([
  state3()
], RoxyLocationSearch.prototype, "highlight", 2);
RoxyLocationSearch = __decorateClass([
  customElement14("roxy-location-search")
], RoxyLocationSearch);

// packages/ui/src/components/moon-phase.ts
import { css as css16, html as html15, LitElement as LitElement15, nothing as nothing16 } from "lit";
import { customElement as customElement15, property as property15 } from "lit/decorators.js";
var RoxyMoonPhase = class extends LitElement15 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return html15`<div class="roxy-empty" role="status">No moon phase data</div>`;
    const list = "phases" in d ? d.phases : "calendar" in d ? d.calendar : [];
    if (this.mode !== "current" && list.length > 0) {
      const month = "month" in d ? d.month : void 0;
      const year = "year" in d ? d.year : void 0;
      return html15`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${month ?? "Moon phases"} ${year ?? ""}</h2>
				<div class="list" role="list">
					${list.map((phase) => this.renderListItem(phase))}
				</div>
			</article>`;
    }
    if (!("phase" in d)) return nothing16;
    return this.renderSingle(d);
  }
  renderSingle(d) {
    const emoji = phaseEmoji(d.phase);
    return html15`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${emoji}</span>
				<div>
					<h2 class="label">${d.phase ?? "Moon"}</h2>
					${d.date ? html15`<div class="date">${d.date}</div>` : nothing16}
				</div>
			</div>
			<div class="stats">
				${typeof d.illumination === "number" ? html15`<div>
							<span>Illumination</span>
							<strong>${formatIllumination(d.illumination)}</strong>
						</div>` : nothing16}
				${typeof d.age === "number" ? html15`<div>
							<span>Age</span>
							<strong>${formatNumber(d.age, 1)} days</strong>
						</div>` : nothing16}
				${d.sign ? html15`<div>
							<span>Sign</span>
							<strong>${d.sign}</strong>
						</div>` : nothing16}
				${typeof d.distance === "number" ? html15`<div>
							<span>Distance</span>
							<strong>${(d.distance / 1e3).toFixed(0)}k km</strong>
						</div>` : nothing16}
			</div>
			${d.meaning?.description ? html15`<p class="meaning">${d.meaning.description}</p>` : nothing16}
			${d.meaning?.keywords?.length ? html15`<div class="keywords">
						${d.meaning.keywords.map((k) => html15`<span>${k}</span>`)}
					</div>` : nothing16}
		</article>`;
  }
  renderListItem(p) {
    const emoji = phaseEmoji(p.phase);
    return html15`<div class="list-item" role="listitem">
			<span aria-hidden="true">${emoji}</span>
			<span>${p.phase}</span>
			<span>${p.date ?? ""}</span>
		</div>`;
  }
};
RoxyMoonPhase.styles = [
  baseStyles,
  css16`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.emoji {
				font-size: 3rem;
				line-height: 1;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.stats {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.stats div span:first-child {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.stats strong {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}

			.meaning {
				color: var(--roxy-fg, #0a0a0a);
			}
			.keywords {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			.keywords span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.list {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.list-item {
				display: grid;
				grid-template-columns: 2.5rem 1fr auto;
				gap: var(--roxy-space-sm, 0.5rem);
				align-items: center;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem) 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.list-item:last-child {
				border-bottom: none;
			}
		`
];
__decorateClass([
  property15({ attribute: false })
], RoxyMoonPhase.prototype, "data", 2);
__decorateClass([
  property15({ type: String, reflect: true })
], RoxyMoonPhase.prototype, "mode", 2);
RoxyMoonPhase = __decorateClass([
  customElement15("roxy-moon-phase")
], RoxyMoonPhase);
function phaseEmoji(phase) {
  if (!phase) return "\u{1F319}";
  return MOON_PHASE_EMOJI[phase.toLowerCase()] ?? "\u{1F319}";
}
function formatIllumination(v) {
  const pct = v <= 1 ? v * 100 : v;
  return `${Math.round(pct)}%`;
}

// packages/ui/src/components/natal-chart.ts
import { css as css17, html as html16, LitElement as LitElement16, nothing as nothing17, svg as svg4 } from "lit";
import { customElement as customElement16, property as property16 } from "lit/decorators.js";

// packages/ui/src/utils/degree.ts
function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = angleDeg * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad)
  };
}

// packages/ui/src/components/natal-chart.ts
var SIZE = 420;
var CENTER = SIZE / 2;
var OUTER_R = 164;
var SIGN_R = 146;
var HOUSE_R = 120;
var PLANET_R = 96;
var ANGLE_TICK_R = 178;
var ANGLE_LABEL_R = 196;
var RoxyNatalChart = class extends LitElement16 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.houseSystem = "placidus";
  }
  getPlanets() {
    return this.data?.planets ?? [];
  }
  getAscendant() {
    return this.data?.ascendant?.longitude ?? 0;
  }
  getMidheaven() {
    const m = this.data?.midheaven?.longitude;
    return typeof m === "number" ? m : null;
  }
  toAngle(lon) {
    return 180 + this.getAscendant() - lon;
  }
  render() {
    if (!this.data)
      return html16`<div class="roxy-empty" role="status">No chart data</div>`;
    const planets = this.getPlanets();
    const aspects = this.data.aspects ?? [];
    return html16`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails ? html16`<div class="meta">
							${[this.data.birthDetails.date, this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>` : nothing17}
			</header>
			<svg
				viewBox="0 0 ${SIZE} ${SIZE}"
				role="img"
				aria-label="Natal chart wheel with twelve houses, planets, and aspects"
			>
				<title>Natal chart wheel</title>
				<desc>
					Twelve zodiac sign segments around a circular wheel. Planet glyphs are
					placed at their ecliptic longitudes. Aspect lines connect related planets.
				</desc>
				<circle
					class="wheel-line"
					cx=${CENTER}
					cy=${CENTER}
					r=${OUTER_R}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${CENTER}
					cy=${CENTER}
					r=${HOUSE_R}
					stroke-width="1"
				/>
				<circle
					class="wheel-line"
					cx=${CENTER}
					cy=${CENTER}
					r=${PLANET_R - 16}
					stroke-width="0.5"
				/>
				${this.renderSpokes()} ${this.renderSigns()} ${this.renderHouseNumbers()}
				${this.renderAspects(planets, aspects)} ${this.renderPlanets(planets)}
				${this.renderAngles()}
			</svg>
			<div class="legend">
				<span>${planets.length} planets</span>
				<span>${aspects.length} aspects</span>
				<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${this.renderDetails()}
			${this.renderInterpretations()}
		</div>`;
  }
  renderAngles() {
    const asc = this.getAscendant();
    const mc = this.getMidheaven();
    const items = [this.renderAngleMark(asc, "ASC")];
    if (mc !== null) items.push(this.renderAngleMark(mc, "MC"));
    return items;
  }
  renderAngleMark(longitude, label) {
    const angle = this.toAngle(longitude);
    const tickInner = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
    const tickOuter = polarToCartesian(CENTER, CENTER, ANGLE_TICK_R, angle);
    const labelPos = polarToCartesian(CENTER, CENTER, ANGLE_LABEL_R, angle);
    return svg4`
			<g>
				<line class="angle-tick" x1=${tickInner.x} y1=${tickInner.y} x2=${tickOuter.x} y2=${tickOuter.y} />
				<text class="angle-marker" x=${labelPos.x} y=${labelPos.y} text-anchor="middle" dominant-baseline="central">${label}</text>
			</g>
		`;
  }
  renderSpokes() {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = this.toAngle(i * 30);
      const start = polarToCartesian(CENTER, CENTER, HOUSE_R, angle);
      const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
      return svg4`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.8" />`;
    });
  }
  renderSigns() {
    return SIGNS_ORDER.map((sign, i) => {
      const angle = this.toAngle(i * 30 + 15);
      const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
      return svg4`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[sign]}</text>`;
    });
  }
  renderHouseNumbers() {
    const ascSignIndex = Math.floor(this.getAscendant() / 30);
    return Array.from({ length: 12 }, (_, i) => {
      const angle = this.toAngle(i * 30 + 15);
      const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
      const houseNum = (i - ascSignIndex + 12) % 12 + 1;
      return svg4`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${houseNum}</text>`;
    });
  }
  renderPlanets(planets) {
    return planets.map((p) => {
      if (!Number.isFinite(p.longitude)) return nothing17;
      const angle = this.toAngle(p.longitude);
      const pos = polarToCartesian(CENTER, CENTER, PLANET_R, angle);
      const glyph = PLANET_GLYPH[capitalize(p.name)] ?? p.name.slice(0, 2);
      const retro = p.isRetrograde ? " R" : "";
      const display = retro ? `${glyph}\u1D3F` : glyph;
      return svg4`<text class="planet-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}${retro}</title>${display}</text>`;
    });
  }
  renderDetails() {
    const summary = this.data?.summary;
    const ai = this.data?.aspectsInterpretation;
    if (!summary && !ai) return nothing17;
    const retrogrades = summary?.retrogradePlanets ?? [];
    const elementDist = summary?.elementDistribution ?? {};
    const modalityDist = summary?.modalityDistribution ?? {};
    const elementMax = Math.max(1, ...Object.values(elementDist));
    const modalityMax = Math.max(1, ...Object.values(modalityDist));
    return html16`<div class="details">
			${summary?.dominantElement || summary?.dominantModality ? html16`<div class="pill-row">
						${summary.dominantElement ? html16`<span class="pill">Dominant element: ${summary.dominantElement}</span>` : nothing17}
						${summary.dominantModality ? html16`<span class="pill">Dominant modality: ${summary.dominantModality}</span>` : nothing17}
					</div>` : nothing17}
			${ai ? html16`<div class="pill-row">
						<span class="pill pill--success">Harmonious ${ai.harmonious}</span>
						<span class="pill pill--danger">Challenging ${ai.challenging}</span>
						<span class="pill pill--muted">Neutral ${ai.neutral}</span>
					</div>` : nothing17}
			${retrogrades.length > 0 ? html16`<div class="pill-row">
						${retrogrades.map((p) => {
      const glyph = PLANET_GLYPH[p] ?? p.slice(0, 2);
      return html16`<span class="pill pill--muted">${glyph} ${p} R</span>`;
    })}
					</div>` : nothing17}
			${ai?.summary ? html16`<p class="summary">${ai.summary}</p>` : nothing17}
			${Object.keys(elementDist).length > 0 || Object.keys(modalityDist).length > 0 ? html16`<div class="dist-grid">
						${Object.keys(elementDist).length > 0 ? html16`<div class="dist-section">
									<h3>Elements</h3>
									${Object.entries(elementDist).map(
      ([label, count]) => html16`<div class="dist-row">
											<span>${label}</span>
											<div class="dist-bar"><span style="width: ${Math.round(count / elementMax * 100)}%"></span></div>
											<span>${count}</span>
										</div>`
    )}
								</div>` : nothing17}
						${Object.keys(modalityDist).length > 0 ? html16`<div class="dist-section">
									<h3>Modalities</h3>
									${Object.entries(modalityDist).map(
      ([label, count]) => html16`<div class="dist-row">
											<span>${label}</span>
											<div class="dist-bar"><span style="width: ${Math.round(count / modalityMax * 100)}%"></span></div>
											<span>${count}</span>
										</div>`
    )}
								</div>` : nothing17}
					</div>` : nothing17}
		</div>`;
  }
  renderInterpretations() {
    const planets = this.getPlanets().filter((p) => p.interpretation);
    if (planets.length === 0) return nothing17;
    return html16`<section class="interpretations">
			<h3>Planet readings</h3>
			${planets.map((p) => {
      const interp = p.interpretation;
      const glyph = PLANET_GLYPH[capitalize(p.name)] ?? "";
      const deg = formatNumber(p.degree ?? 0, 1);
      return html16`<details class="interp-card">
					<summary>${glyph} ${p.name} <small>${p.sign ?? ""} ${deg}</small></summary>
					<div class="interp-body">
						${interp.summary ? html16`<p class="interp-summary">${interp.summary}</p>` : nothing17}
						${interp.detailed ? html16`<p class="interp-detail">${interp.detailed}</p>` : nothing17}
						${interp.keywords?.length ? html16`<div class="interp-keywords">${interp.keywords.map((k) => html16`<span class="kw">${k}</span>`)}</div>` : nothing17}
					</div>
				</details>`;
    })}
		</section>`;
  }
  renderAspects(planets, aspects) {
    const planetMap = /* @__PURE__ */ new Map();
    for (const p of planets) {
      if (typeof p.longitude !== "number") continue;
      const name = capitalize(p.name);
      if (name) planetMap.set(name, p.longitude);
    }
    return aspects.map((a) => {
      const l1 = planetMap.get(capitalize(a.planet1));
      const l2 = planetMap.get(capitalize(a.planet2));
      if (l1 === void 0 || l2 === void 0) return nothing17;
      const p1 = polarToCartesian(
        CENTER,
        CENTER,
        PLANET_R - 18,
        this.toAngle(l1)
      );
      const p2 = polarToCartesian(
        CENTER,
        CENTER,
        PLANET_R - 18,
        this.toAngle(l2)
      );
      const aspectName = normalizeAspect(a);
      const aspectClass = ASPECT_CLASS[aspectName] ?? "aspect-other";
      const orbLabel = formatNumber(a.orb, 1);
      return svg4`<line class=${`aspect ${aspectClass}`} x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y}><title>${a.planet1} ${aspectName || ""} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}\xB0)` : ""}</title></line>`;
    });
  }
};
RoxyNatalChart.styles = [
  baseStyles,
  css17`
			.wrap {
				width: 100%;
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}

			.meta {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				height: auto;
				margin: 0 auto;
			}

			.wheel-line {
				fill: none;
				stroke: var(--roxy-border, #e4e4e7);
			}

			.sign-glyph {
				fill: var(--roxy-secondary, #475569);
				font-size: 14px;
				font-family: var(--roxy-font-sans);
			}

			.planet-glyph {
				fill: var(--roxy-accent, #f59e0b);
				font-size: 14px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}

			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-family: var(--roxy-font-sans);
			}

			.aspect {
				stroke-width: 0.8;
				fill: none;
				opacity: 0.55;
			}
			.aspect-trine,
			.aspect-sextile {
				stroke: var(--roxy-success, #16a34a);
			}
			.aspect-square,
			.aspect-opposition {
				stroke: var(--roxy-danger, #dc2626);
			}
			.aspect-conjunction {
				stroke: var(--roxy-accent-fg, #b45309);
			}
			.aspect-other {
				stroke: var(--roxy-muted, #71717a);
				opacity: 0.4;
			}

			.angle-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 10px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
			}
			.angle-tick {
				stroke: var(--roxy-accent-fg, #b45309);
				stroke-width: 1.5;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
			.legend-swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}

			.details {
				margin-top: var(--roxy-space-md, 1rem);
			}

			.pill-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}

			.pill {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-sm, 4px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-fg, #0f172a) 8%, transparent);
				color: var(--roxy-fg, #0f172a);
			}

			.pill--success {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 15%, transparent);
				color: var(--roxy-success, #16a34a);
			}

			.pill--danger {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 15%, transparent);
				color: var(--roxy-danger, #dc2626);
			}

			.pill--muted {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}

			.summary {
				color: var(--roxy-fg, #0f172a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: var(--roxy-space-md, 1rem) 0;
			}

			.dist-grid {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: var(--roxy-space-md, 1rem);
			}

			@container (max-width: 639px) {
				.dist-grid {
					grid-template-columns: 1fr;
				}
			}

			.dist-section h3 {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-muted, #71717a);
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.dist-row {
				display: grid;
				grid-template-columns: 4rem 1fr 1.5rem;
				align-items: center;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-fg, #0f172a);
				margin-bottom: 4px;
			}

			.dist-bar {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 20%, transparent);
				height: 6px;
				border-radius: 3px;
			}

			.dist-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
				border-radius: 3px;
			}

			.interpretations {
				margin-top: var(--roxy-space-md, 1rem);
			}
			.interpretations h3 {
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 600;
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
			}
			.interp-card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}
			.interp-card summary {
				cursor: pointer;
				font-weight: 500;
				color: var(--roxy-fg, #0f172a);
			}
			.interp-card summary small {
				color: var(--roxy-muted, #71717a);
				margin-left: 0.5em;
				font-weight: 400;
			}
			.interp-body {
				margin-top: var(--roxy-space-xs, 0.25rem);
				color: var(--roxy-fg, #0f172a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
				margin-top: 0.5rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
		`
];
__decorateClass([
  property16({ attribute: false })
], RoxyNatalChart.prototype, "data", 2);
__decorateClass([
  property16({ type: String, attribute: "house-system", reflect: true })
], RoxyNatalChart.prototype, "houseSystem", 2);
RoxyNatalChart = __decorateClass([
  customElement16("roxy-natal-chart")
], RoxyNatalChart);

// packages/ui/src/components/numerology-card.ts
import { css as css18, html as html17, LitElement as LitElement17, nothing as nothing18 } from "lit";
import { customElement as customElement17, property as property17 } from "lit/decorators.js";
var RoxyNumerologyCard = class extends LitElement17 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.type = "life-path";
  }
  render() {
    const d = this.data;
    if (!d)
      return html17`<div class="roxy-empty" role="status">No numerology data</div>`;
    const headerLabel = LABELS[this.type] ?? this.type;
    if ("coreNumbers" in d) return this.renderChart(d, headerLabel);
    if ("personalYear" in d) return this.renderPersonalYear(d, headerLabel);
    return this.renderNumberCard(
      d,
      headerLabel
    );
  }
  renderNumberCard(d, headerLabel) {
    const keywords = d.meaning?.keywords ?? [];
    return html17`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.number === "number" ? html17`<div class="numeral">${d.number}</div>` : nothing18}
				<div>
					<p class="label">${headerLabel}</p>
					${d.meaning?.title ? html17`<h2 class="title">${d.meaning.title}</h2>` : nothing18}
				</div>
			</div>
			${d.meaning?.description ? html17`<p class="meaning">${d.meaning.description}</p>` : nothing18}
			${d.calculation ? html17`<pre class="calc">${d.calculation}</pre>` : nothing18}
			${keywords.length > 0 ? html17`<div class="chips">
						${keywords.map((k) => html17`<span>${k}</span>`)}
					</div>` : nothing18}
			${d.hasKarmicDebt && d.karmicDebtNumber ? html17`<div class="karmic">
						Karmic debt ${d.karmicDebtNumber}.
						${karmicDebtText(d.karmicDebtMeaning)}
					</div>` : nothing18}
		</article>`;
  }
  renderPersonalYear(d, headerLabel) {
    return html17`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.personalYear === "number" ? html17`<div class="numeral">${d.personalYear}</div>` : nothing18}
				<div>
					<p class="label">${headerLabel}</p>
					${d.theme ? html17`<h2 class="title">${d.theme}</h2>` : nothing18}
				</div>
			</div>
			${d.forecast ? html17`<p class="meaning">${d.forecast}</p>` : nothing18}
			${d.advice ? html17`<p>${d.advice}</p>` : nothing18}
		</article>`;
  }
  renderChart(d, headerLabel) {
    const cores = Object.entries(d.coreNumbers).filter(
      ([, v]) => v !== null && v !== void 0
    );
    return html17`<article class="card" aria-label=${headerLabel}>
			<div>
				<p class="label">${headerLabel}</p>
				${d.profile?.name ? html17`<h2 class="title">${d.profile.name}</h2>` : nothing18}
			</div>
			${cores.length > 0 ? html17`<div class="cores">
						${cores.map(
      ([k, v]) => html17`<div class="item">
								<span>${humanize(k)}</span>
								<strong>${v.number ?? ""}</strong>
							</div>`
    )}
					</div>` : nothing18}
		</article>`;
  }
};
RoxyNumerologyCard.styles = [
  baseStyles,
  css18`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.numeral {
				font-size: 4rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.meaning {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}

			.calc {
				margin: 0;
				font-family: var(--roxy-font-mono);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 30%, transparent);
				padding: var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-sm, 4px);
				white-space: pre-wrap;
				overflow-wrap: anywhere;
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.cores {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			.cores .item {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.cores .item span:first-child {
				color: var(--roxy-muted, #71717a);
				text-transform: capitalize;
			}
			.cores .item strong {
				color: var(--roxy-accent-fg, #b45309);
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.karmic {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
		`
];
__decorateClass([
  property17({ attribute: false })
], RoxyNumerologyCard.prototype, "data", 2);
__decorateClass([
  property17({ type: String, reflect: true })
], RoxyNumerologyCard.prototype, "type", 2);
RoxyNumerologyCard = __decorateClass([
  customElement17("roxy-numerology-card")
], RoxyNumerologyCard);
var LABELS = {
  "life-path": "Life Path",
  expression: "Expression",
  "personal-year": "Personal Year",
  chart: "Numerology chart"
};
function karmicDebtText(value) {
  if (!value) return "";
  return [value.description, value.challenge, value.resolution].filter(Boolean).join(" ");
}

// packages/ui/src/components/panchang-table.ts
import { css as css19, html as html18, LitElement as LitElement18, nothing as nothing19 } from "lit";
import { customElement as customElement18, property as property18 } from "lit/decorators.js";
var RoxyPanchangTable = class extends LitElement18 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.detail = "detailed";
  }
  render() {
    const d = this.data;
    if (!d)
      return html18`<div class="roxy-empty" role="status">No panchang data</div>`;
    const detailed = "sunrise" in d ? d : null;
    const fivefold = [
      ["Tithi", this.formatPart(d.tithi)],
      ["Nakshatra", this.formatPart(d.nakshatra)],
      ["Yoga", this.formatPart(d.yoga)],
      ["Karana", this.formatPart(d.karana)]
    ];
    if (detailed) fivefold.push(["Vara", this.formatPart(detailed.vara)]);
    const muhurtas = detailed ? [
      ["Brahma Muhurta", detailed.brahmaMuhurta],
      ["Abhijit Muhurta", detailed.abhijitMuhurta],
      ["Vijaya Muhurta", detailed.vijayaMuhurta],
      ["Godhuli Muhurta", detailed.godhuliMuhurta],
      ["Nishita Muhurta", detailed.nishitaMuhurta],
      ["Pratah Sandhya", detailed.pratahSandhya],
      ["Sayahna Sandhya", detailed.sayahnaSandhya]
    ] : [];
    const inauspicious = detailed ? [
      ["Rahu Kaal", detailed.rahuKaal],
      ["Yamaganda", detailed.yamaganda],
      ["Gulika", detailed.gulika]
    ] : [];
    return html18`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${detailed ? formatDate(detailed.date) : ""}</span>
			</header>
			<table>
				<tbody>
					${fivefold.map(
      ([k, v]) => html18`<tr>
							<th>${k}</th>
							<td>${v}</td>
						</tr>`
    )}
					${detailed?.sunrise ? html18`<tr>
								<th>Sunrise</th>
								<td>${formatTime(detailed.sunrise)}</td>
							</tr>` : nothing19}
					${detailed?.sunset ? html18`<tr>
								<th>Sunset</th>
								<td>${formatTime(detailed.sunset)}</td>
							</tr>` : nothing19}
					${detailed?.moonrise ? html18`<tr>
								<th>Moonrise</th>
								<td>${formatTime(detailed.moonrise)}</td>
							</tr>` : nothing19}
					${detailed?.moonset ? html18`<tr>
								<th>Moonset</th>
								<td>${formatTime(detailed.moonset)}</td>
							</tr>` : nothing19}
				</tbody>
			</table>
			${this.detail === "detailed" && (muhurtas.some((m) => !!m[1]) || inauspicious.some((m) => !!m[1])) ? html18`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${muhurtas.filter(([, v]) => !!v).map(
      ([k, v]) => html18`<tr>
											<th>${k}</th>
											<td>${formatTimeRange(v)}</td>
										</tr>`
    )}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${inauspicious.filter(([, v]) => !!v).map(
      ([k, v]) => html18`<tr>
											<th>${k}</th>
											<td>${formatTimeRange(v)}</td>
										</tr>`
    )}
							</tbody>
						</table>
					` : nothing19}
		</div>`;
  }
  formatPart(v) {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      const obj = v;
      const parts = [
        obj.name,
        obj.lord ? `(${obj.lord})` : "",
        obj.phase
      ].filter(Boolean);
      return parts.join(" ");
    }
    return String(v);
  }
};
RoxyPanchangTable.styles = [
  baseStyles,
  css19`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-bg, #fff);
				overflow: hidden;
				box-shadow: var(--roxy-shadow-sm);
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.date {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			tbody tr:nth-child(odd) {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 24%, transparent);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				text-align: left;
				vertical-align: top;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				width: 38%;
				text-transform: capitalize;
			}
			td {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}
			.section {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
		`
];
__decorateClass([
  property18({ attribute: false })
], RoxyPanchangTable.prototype, "data", 2);
__decorateClass([
  property18({ type: String, reflect: true })
], RoxyPanchangTable.prototype, "detail", 2);
RoxyPanchangTable = __decorateClass([
  customElement18("roxy-panchang-table")
], RoxyPanchangTable);

// packages/ui/src/components/shadbala-table.ts
import { css as css20, html as html19, LitElement as LitElement19, nothing as nothing20 } from "lit";
import { customElement as customElement19, property as property19 } from "lit/decorators.js";
var BALA_COMPONENTS = [
  { key: "sthanaBala", label: "Sthana", color: "var(--roxy-info, #0284c7)" },
  { key: "digBala", label: "Dig", color: "var(--roxy-success, #16a34a)" },
  { key: "kalaBala", label: "Kala", color: "var(--roxy-warning, #ea580c)" },
  { key: "chestaBala", label: "Chesta", color: "var(--roxy-accent, #f59e0b)" },
  {
    key: "naisargikaBala",
    label: "Naisargika",
    color: "var(--roxy-secondary, #475569)"
  },
  { key: "drikBala", label: "Drik", color: "var(--roxy-danger, #dc2626)" }
];
var RoxyShadbalaTable = class extends LitElement19 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data?.planets?.length) {
      return html19`<div class="roxy-empty" role="status">No shadbala data</div>`;
    }
    const sorted = [...this.data.planets].sort(
      (a, b) => a.relativeRank - b.relativeRank
    );
    return html19`<div class="wrap" aria-label="Shadbala planetary strength">
			<div class="head">
				<h2 class="title">Shadbala</h2>
				<p class="subtitle">${sorted.length} planets ranked by strength</p>
			</div>

			<div role="list" aria-label="Planet strength bars">
				${sorted.map((p) => this.renderPlanetRow(p))}
			</div>

			<div class="legend" aria-label="Strength component legend">
				${BALA_COMPONENTS.map(
      (b) => html19`<div class="legend-row">
						<span
							class="legend-swatch"
							style="background: ${b.color}"
							aria-hidden="true"
						></span>
						${b.label}
					</div>`
    )}
			</div>
		</div>`;
  }
  renderPlanetRow(p) {
    const glyph = PLANET_GLYPH[capitalize(p.planet)] ?? "";
    const values = BALA_COMPONENTS.map((b) => Math.max(0, p[b.key]));
    const total = values.reduce((s, v) => s + v, 0);
    const isAdequate = typeof p.strengthRatio === "number" && p.strengthRatio >= 1;
    const badgeClass = isAdequate ? "adequacy-badge--adequate" : "adequacy-badge--weak";
    const badgeLabel = isAdequate ? "adequate" : "weak";
    const rupasStr = formatNumber(p.totalRupas, 2) && formatNumber(p.minRequired, 2) ? `${formatNumber(p.totalRupas, 2)} / ${formatNumber(p.minRequired, 2)} R` : "";
    return html19`<div class="planet-row" role="listitem" aria-label="${p.planet} shadbala">
			<div class="planet-label">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				${p.planet}
				<span class="rank-badge" aria-label="rank ${p.relativeRank}">#${p.relativeRank}</span>
			</div>
			<div class="bar-wrap">
				<div class="bar" role="img" aria-label="Strength components for ${p.planet}">
					${total > 0 ? BALA_COMPONENTS.map((b, i) => {
      const v = values[i];
      if (v <= 0) return nothing20;
      const grow = v / total * 100;
      return html19`<div
									class="bar-segment"
									style="flex-grow: ${grow}; background: ${b.color};"
									title="${b.label}: ${formatNumber(v, 1)}"
								></div>`;
    }) : nothing20}
				</div>
			</div>
			<div class="pills">
				${rupasStr ? html19`<span class="rupas-label">${rupasStr}</span>` : nothing20}
				<span class="${`adequacy-badge ${badgeClass}`}">${badgeLabel}</span>
			</div>
		</div>`;
  }
};
RoxyShadbalaTable.styles = [
  baseStyles,
  css20`
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

			.planet-row {
				display: grid;
				grid-template-columns: 8rem 1fr auto;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				padding: var(--roxy-space-sm, 0.5rem) 0;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
			}

			.planet-row:last-of-type {
				border-bottom: none;
			}

			.planet-label {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.glyph {
				font-size: 1.2em;
				line-height: 1;
			}

			.bar-wrap {
				display: flex;
				flex-direction: column;
				gap: 4px;
			}

			.bar {
				display: flex;
				height: 12px;
				border-radius: var(--roxy-radius-sm, 4px);
				overflow: hidden;
				background: var(--roxy-border, #e4e4e7);
			}

			.bar-segment {
				height: 100%;
				transition: flex-grow var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}

			.pills {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: 4px;
			}

			.rupas-label {
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				white-space: nowrap;
			}

			.adequacy-badge {
				display: inline-block;
				padding: 1px 6px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.adequacy-badge--adequate {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}

			.adequacy-badge--weak {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}

			.rank-badge {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-accent-fg, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-sm, 0.5rem);
			}

			.legend-row {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}

			.legend-swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: var(--roxy-radius-sm, 4px);
				flex-shrink: 0;
			}

			@container (max-width: 480px) {
				.planet-row {
					grid-template-columns: 6rem 1fr;
					grid-template-rows: auto auto;
				}
				.pills {
					grid-column: 1 / -1;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
				}
			}
		`
];
__decorateClass([
  property19({ attribute: false })
], RoxyShadbalaTable.prototype, "data", 2);
RoxyShadbalaTable = __decorateClass([
  customElement19("roxy-shadbala-table")
], RoxyShadbalaTable);

// packages/ui/src/components/synastry-chart.ts
import { css as css21, html as html20, LitElement as LitElement20, nothing as nothing21, svg as svg5 } from "lit";
import { customElement as customElement20, property as property20 } from "lit/decorators.js";
var SIZE2 = 360;
var CENTER2 = SIZE2 / 2;
var OUTER_R2 = 170;
var SIGN_R2 = 154;
var P1_R = 124;
var P2_R = 96;
var RoxySynastryChart = class extends LitElement20 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data)
      return html20`<div class="roxy-empty" role="status">No synastry data</div>`;
    const { person1, person2, compatibilityScore, analysis } = this.data;
    const interAspects = this.data.interAspects ?? [];
    const p1Planets = person1?.planets ?? [];
    const p2Planets = person2?.planets ?? [];
    const score = typeof compatibilityScore === "number" ? Math.round(compatibilityScore) : void 0;
    const summaryText = analysis?.overall;
    const strengths = analysis?.strengths ?? [];
    const challenges = analysis?.challenges ?? [];
    const hasPlanets = p1Planets.length > 0 && p2Planets.length > 0;
    if (!hasPlanets) {
      return html20`<div
				class="wrap"
				aria-label="Synastry compatibility chart"
			>
				<div class="head">
					<h2 class="title">Synastry</h2>
					${typeof score === "number" ? html20`<span class="score" aria-label=${`Score ${score} of 100`}
								>${score} / 100</span
							>` : nothing21}
				</div>
				<div class="missing-planets" role="status">
					Synastry response missing planet positions. Pass
					<code>data</code> with <code>person1.planets</code> and
					<code>person2.planets</code> arrays from the natal-chart endpoint, or
					use the <code>&lt;roxy-data&gt;</code> fallback.
				</div>
				${summaryText ? html20`<p class="summary">${summaryText}</p>` : nothing21}
				${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing21}
				${strengths.length > 0 || challenges.length > 0 ? html20`<div class="lists">
							${strengths.length ? html20`<div>
										<h3>Strengths</h3>
										<ul>
											${strengths.map((s) => html20`<li>${s}</li>`)}
										</ul>
									</div>` : nothing21}
							${challenges.length ? html20`<div>
										<h3>Challenges</h3>
										<ul>
											${challenges.map((s) => html20`<li>${s}</li>`)}
										</ul>
									</div>` : nothing21}
						</div>` : nothing21}
			</div>`;
    }
    return html20`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof score === "number" ? html20`<span class="score" aria-label=${`Score ${score} of 100`}
							>${score} / 100</span
						>` : nothing21}
			</div>
			<svg
				viewBox="0 0 ${SIZE2} ${SIZE2}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
				<circle
					class="wheel-line"
					cx=${CENTER2}
					cy=${CENTER2}
					r=${OUTER_R2}
					stroke-width="1.5"
				/>
				<circle
					class="wheel-line"
					cx=${CENTER2}
					cy=${CENTER2}
					r=${P2_R + 14}
					stroke-width="0.8"
				/>
				<circle
					class="wheel-line"
					cx=${CENTER2}
					cy=${CENTER2}
					r=${P2_R - 14}
					stroke-width="0.6"
				/>
				${this.renderSpokes()} ${this.renderSigns()}
				${this.renderInterAspectLines(p1Planets, p2Planets, interAspects)}
				${this.renderRing(p1Planets, P1_R, "p1")} ${this.renderRing(p2Planets, P2_R, "p2")}
			</svg>
			<div class="legend-row">
				<span><span class="swatch" style="background: var(--roxy-accent)"></span>Person 1</span>
				<span><span class="swatch" style="background: var(--roxy-info)"></span>Person 2</span>
				<span><span class="swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${summaryText ? html20`<p class="summary">${summaryText}</p>` : nothing21}
			${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing21}
			${strengths.length > 0 || challenges.length > 0 ? html20`<div class="lists">
						${strengths.length ? html20`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => html20`<li>${s}</li>`)}
									</ul>
								</div>` : nothing21}
						${challenges.length ? html20`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => html20`<li>${s}</li>`)}
									</ul>
								</div>` : nothing21}
					</div>` : nothing21}
		</div>`;
  }
  toAngle(longitude) {
    return 180 - longitude;
  }
  renderSpokes() {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = this.toAngle(i * 30);
      const start = polarToCartesian(CENTER2, CENTER2, P2_R - 14, angle);
      const end = polarToCartesian(CENTER2, CENTER2, OUTER_R2, angle);
      return svg5`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
    });
  }
  renderSigns() {
    return SIGNS_ORDER.map((s, i) => {
      const angle = this.toAngle(i * 30 + 15);
      const pos = polarToCartesian(CENTER2, CENTER2, SIGN_R2, angle);
      return svg5`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[s]}</text>`;
    });
  }
  renderRing(planets, radius, cls) {
    return planets.map((p) => {
      if (!Number.isFinite(p.longitude)) return nothing21;
      const pos = polarToCartesian(
        CENTER2,
        CENTER2,
        radius,
        this.toAngle(p.longitude)
      );
      const glyph = PLANET_GLYPH[capitalize(p.name)] ?? p.name.slice(0, 2);
      return svg5`<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}</title>${glyph}</text>`;
    });
  }
  renderInterAspectLines(p1, p2, aspects) {
    const longitudeOf = (list, name) => {
      const target = capitalize(name);
      for (const p of list) {
        if (capitalize(p.name) !== target) continue;
        if (typeof p.longitude === "number") return p.longitude;
      }
      return void 0;
    };
    return aspects.map((a) => {
      const l1 = longitudeOf(p1, a.planet1);
      const l2 = longitudeOf(p2, a.planet2);
      if (l1 === void 0 || l2 === void 0) return nothing21;
      const out = polarToCartesian(CENTER2, CENTER2, P1_R - 12, this.toAngle(l1));
      const inn = polarToCartesian(CENTER2, CENTER2, P2_R + 8, this.toAngle(l2));
      const aspectName = normalizeAspect(a);
      const cls = ASPECT_CLASS[aspectName] ?? "aspect-other";
      const orbLabel = formatNumber(a.orb, 1);
      return svg5`<line class=${`aspect ${cls}`} x1=${out.x} y1=${out.y} x2=${inn.x} y2=${inn.y}><title>${a.planet1} ${aspectName} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}\xB0)` : ""}</title></line>`;
    });
  }
  renderAspects(aspects) {
    return html20`<table>
			<thead>
				<tr>
					<th>Planet 1</th>
					<th>Planet 2</th>
					<th>Aspect</th>
					<th>Orb</th>
					<th>Strength</th>
				</tr>
			</thead>
			<tbody>
				${aspects.slice(0, 12).map(
      (a) => html20`<tr>
						<td>${a.planet1}</td>
						<td>${a.planet2}</td>
						<td>${normalizeAspect(a) || ""}</td>
						<td class="orb">${formatNumber(a.orb, 1)}</td>
						<td>${formatStrength(a.strength)}</td>
					</tr>`
    )}
			</tbody>
		</table>`;
  }
};
RoxySynastryChart.styles = [
  baseStyles,
  css21`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}

			.score {
				font-variant-numeric: tabular-nums;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xl, 1.5rem);
			}

			svg {
				display: block;
				width: 100%;
				max-width: 400px;
				margin: 0 auto;
			}

			.wheel-line {
				fill: none;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.sign {
				fill: var(--roxy-secondary, #475569);
				font-size: 14px;
			}
			.p1 {
				fill: var(--roxy-accent, #f59e0b);
				font-weight: 600;
				font-size: 13px;
			}
			.p2 {
				fill: var(--roxy-info, #0284c7);
				font-weight: 600;
				font-size: 13px;
			}
			.aspect {
				stroke-width: 0.8;
				fill: none;
				opacity: 0.5;
			}
			.aspect-trine,
			.aspect-sextile {
				stroke: var(--roxy-success, #16a34a);
			}
			.aspect-square,
			.aspect-opposition {
				stroke: var(--roxy-danger, #dc2626);
			}
			.aspect-conjunction {
				stroke: var(--roxy-accent-fg, #b45309);
			}
			.aspect-other {
				stroke: var(--roxy-muted, #71717a);
				opacity: 0.35;
			}
			.legend-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				margin-top: calc(var(--roxy-space-xs, 0.25rem) * -1);
			}
			.legend-row .swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}

			.summary {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-base, 1rem);
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
				text-align: left;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}
			td.orb {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.missing-planets {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.5;
			}
			.missing-planets code {
				font-family: var(--roxy-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
				font-size: 0.95em;
				background: color-mix(in srgb, var(--roxy-fg, #0a0a0a) 6%, transparent);
				padding: 0 4px;
				border-radius: 4px;
			}
		`
];
__decorateClass([
  property20({ attribute: false })
], RoxySynastryChart.prototype, "data", 2);
RoxySynastryChart = __decorateClass([
  customElement20("roxy-synastry-chart")
], RoxySynastryChart);
function formatStrength(s) {
  if (typeof s === "number") return Math.round(s).toString();
  return "";
}

// packages/ui/src/components/tarot-card.ts
import { css as css22, html as html21, LitElement as LitElement21, nothing as nothing22 } from "lit";
import { customElement as customElement21, property as property21, state as state4 } from "lit/decorators.js";
var RoxyTarotCard = class extends LitElement21 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.flipped = false;
    this.toggleFlip = () => {
      this.flipped = !this.flipped;
    };
  }
  render() {
    const d = this.data;
    if (!d)
      return html21`<div class="roxy-empty" role="status">No tarot data</div>`;
    if ("card" in d) return this.renderDailyCard(d);
    return this.renderFullCard(d);
  }
  renderDailyCard(d) {
    const card = d.card;
    const isReversed = this.flipped !== Boolean(card.reversed);
    const keywords = card.keywords ?? [];
    return html21`<article class="card" aria-label=${card.name ?? "Tarot card"}>
			<div class="image-wrap">
				${card.imageUrl ? html21`<img
							class=${`image ${isReversed ? "reversed" : ""}`}
							src=${card.imageUrl}
							alt=${card.name ?? "Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleFlip();
      }
    }}
						/>` : html21`<div
							class=${`image ${isReversed ? "reversed" : ""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${card.name ?? "?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${card.arcana ? html21`${card.arcana} arcana` : nothing22}
					${isReversed ? html21` · reversed` : nothing22}
				</div>
				<h2 class="title">${card.name ?? "Tarot card"}</h2>
				${d.dailyMessage ? html21`<p class="message">${d.dailyMessage}</p>` : nothing22}
				${card.meaning ? html21`<p>${card.meaning}</p>` : nothing22}
				${keywords.length > 0 ? html21`<div class="chips">
							${keywords.map((k) => html21`<span>${k}</span>`)}
						</div>` : nothing22}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped ? "true" : "false"}
				>
					Flip card
				</button>
			</div>
		</article>`;
  }
  renderFullCard(d) {
    const isReversed = this.flipped;
    const orientedMeaning = isReversed ? d.reversed : d.upright;
    const keywords = isReversed ? d.keywords?.reversed ?? [] : d.keywords?.upright ?? [];
    return html21`<article class="card" aria-label=${d.name ?? "Tarot card"}>
			<div class="image-wrap">
				${d.imageUrl ? html21`<img
							class=${`image ${isReversed ? "reversed" : ""}`}
							src=${d.imageUrl}
							alt=${d.name ?? "Tarot card"}
							tabindex="0"
							@click=${this.toggleFlip}
							@keydown=${(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleFlip();
      }
    }}
						/>` : html21`<div
							class=${`image ${isReversed ? "reversed" : ""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${d.name ?? "?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${d.arcana ? html21`${d.arcana} arcana` : nothing22}
					${d.number !== void 0 && d.number !== null ? html21` · ${d.number}` : nothing22}
					${isReversed ? html21` · reversed` : nothing22}
				</div>
				<h2 class="title">${d.name ?? "Tarot card"}</h2>
				${orientedMeaning?.description ? html21`<p>${orientedMeaning.description}</p>` : nothing22}
				${keywords.length > 0 ? html21`<div class="chips">
							${keywords.map((k) => html21`<span>${k}</span>`)}
						</div>` : nothing22}
				<button
					class="flip"
					type="button"
					@click=${this.toggleFlip}
					aria-pressed=${this.flipped ? "true" : "false"}
				>
					Flip card
				</button>
			</div>
		</article>`;
  }
};
RoxyTarotCard.styles = [
  baseStyles,
  css22`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: minmax(0, 9rem) 1fr;
				gap: var(--roxy-space-lg, 1.5rem);
				align-items: start;
			}

			@container (max-width: 480px) {
				.card {
					grid-template-columns: 1fr;
				}
			}

			.image-wrap {
				perspective: 800px;
			}
			.image {
				display: block;
				width: 100%;
				height: auto;
				border-radius: var(--roxy-radius-md, 8px);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
				cursor: pointer;
			}
			.image.reversed {
				transform: rotate(180deg);
			}
			.image:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}

			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.meta {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: var(--roxy-space-sm, 0.5rem);
			}

			.message {
				color: var(--roxy-fg, #0a0a0a);
				margin: var(--roxy-space-sm, 0.5rem) 0 var(--roxy-space-md, 1rem);
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-top: var(--roxy-space-sm, 0.5rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.flip {
				margin-top: var(--roxy-space-sm, 0.5rem);
				background: transparent;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: 4px 12px;
				font-family: inherit;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				cursor: pointer;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.flip:hover {
				transform: scale(1.02);
			}
		`
];
__decorateClass([
  property21({ attribute: false })
], RoxyTarotCard.prototype, "data", 2);
__decorateClass([
  state4()
], RoxyTarotCard.prototype, "flipped", 2);
RoxyTarotCard = __decorateClass([
  customElement21("roxy-tarot-card")
], RoxyTarotCard);

// packages/ui/src/components/tarot-spread.ts
import { css as css23, html as html22, LitElement as LitElement22, nothing as nothing23 } from "lit";
import { customElement as customElement22, property as property22 } from "lit/decorators.js";
var RoxyTarotSpread = class extends LitElement22 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.spread = "three-card";
  }
  render() {
    const d = this.data;
    if (!d)
      return html22`<div class="roxy-empty" role="status">No tarot spread</div>`;
    const isYesNo = "answer" in d;
    const isDrawn = "cards" in d && !("spread" in d);
    const positions = isDrawn ? [] : "positions" in d ? d.positions ?? [] : [];
    const cards = isDrawn && "cards" in d ? d.cards : [];
    const answer = isYesNo ? d.answer : void 0;
    const strength = isYesNo ? d.strength : void 0;
    const spreadLabel = "spread" in d ? d.spread : this.spread.replace(/-/g, " ");
    const question = "question" in d ? d.question : void 0;
    const summary = "summary" in d ? d.summary : void 0;
    const yesNoInterp = isYesNo ? d.interpretation : void 0;
    const answerClass = answer ? answer.toLowerCase().replace(/[^a-z]/g, "") : "";
    return html22`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${spreadLabel}</h2>
				${question ? html22`<span class="question">"${question}"</span>` : nothing23}
			</header>
			${isYesNo ? html22`<div>
						<span class=${`answer ${answerClass}`}>${answer}</span>
						${strength ? html22`<small> · ${strength}</small>` : nothing23}
					</div>` : nothing23}
			${positions.length > 0 ? html22`<div class="grid">
						${positions.map(
      (p) => html22`<div class="card">
								<p class="label">${p.name ?? ""}</p>
								<div class="image">
									${p.card?.imageUrl ? html22`<img
												src=${p.card.imageUrl}
												alt=${p.card.name ?? "tarot card"}
												class=${p.card.reversed ? "reversed" : ""}
											/>` : html22`${p.card?.name ?? "?"}`}
								</div>
								<p class="name">
									${p.card?.name ?? ""}
									${p.card?.reversed ? html22`<small>(reversed)</small>` : nothing23}
								</p>
								${p.interpretation ? html22`<p class="interp">${p.interpretation}</p>` : nothing23}
							</div>`
    )}
					</div>` : nothing23}
			${cards.length > 0 ? html22`<div class="grid">
						${cards.map(
      (c) => html22`<div class="card">
								<div class="image">
									${c.imageUrl ? html22`<img
												src=${c.imageUrl}
												alt=${c.name ?? "tarot card"}
												class=${c.reversed ? "reversed" : ""}
											/>` : html22`${c.name ?? "?"}`}
								</div>
								<p class="name">
									${c.name ?? ""}
									${c.reversed ? html22`<small>(reversed)</small>` : nothing23}
								</p>
								${c.meaning ? html22`<p class="interp">${c.meaning}</p>` : nothing23}
							</div>`
    )}
					</div>` : nothing23}
			${summary ? html22`<p class="reading">${summary}</p>` : nothing23}
			${yesNoInterp ? html22`<p class="reading">${yesNoInterp}</p>` : nothing23}
		</article>`;
  }
};
RoxyTarotSpread.styles = [
  baseStyles,
  css23`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				justify-content: space-between;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
				align-items: baseline;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.question {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-style: italic;
			}

			.answer {
				display: inline-block;
				padding: 4px 14px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-base, 1rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.answer.yes {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.answer.no {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.answer.maybe {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 16%, transparent);
				color: var(--roxy-warning-fg, #9a3412);
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}

			.card {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				background: var(--roxy-bg, #fff);
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin: 0;
			}
			.image {
				width: 100%;
				aspect-ratio: 0.6;
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				border-radius: var(--roxy-radius-sm, 4px);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				overflow: hidden;
			}
			.image img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			.image img.reversed {
				transform: rotate(180deg);
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.interp {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}

			.reading {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}
		`
];
__decorateClass([
  property22({ attribute: false })
], RoxyTarotSpread.prototype, "data", 2);
__decorateClass([
  property22({ type: String, reflect: true })
], RoxyTarotSpread.prototype, "spread", 2);
RoxyTarotSpread = __decorateClass([
  customElement22("roxy-tarot-spread")
], RoxyTarotSpread);

// packages/ui/src/components/transits-table.ts
import { css as css24, html as html23, LitElement as LitElement23, nothing as nothing24 } from "lit";
import { customElement as customElement23, property as property23 } from "lit/decorators.js";
var RoxyTransitsTable = class extends LitElement23 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data?.transitPlanets?.length) {
      return html23`<div class="roxy-empty" role="status">No transits data</div>`;
    }
    const {
      transitDate,
      transitTime,
      transitPlanets,
      transitAspects,
      summary
    } = this.data;
    const dateStr = [formatDate(transitDate), formatTime(transitTime)].filter(Boolean).join(" ");
    return html23`<div class="wrap" aria-label="Transit positions table">
			<div class="head">
				<h2 class="title">Transits</h2>
				${dateStr ? html23`<p class="subtitle">${dateStr}</p>` : nothing24}
			</div>

			${summary ? this.renderSummaryPills(summary) : nothing24}

			<div>
				<p class="section-label">Planet positions</p>
				<div class="overflow-scroll">
					${this.renderPlanetsTable(transitPlanets)}
				</div>
			</div>

			${transitAspects?.length ? html23`<div>
						<p class="section-label">Transit aspects</p>
						<div class="overflow-scroll">
							${this.renderAspectsTable(transitAspects)}
						</div>
					</div>` : nothing24}
		</div>`;
  }
  renderSummaryPills(summary) {
    return html23`<div class="summary-pills" role="region" aria-label="Aspect summary">
			<span class="pill pill--muted">
				Total: ${summary.totalAspects}
			</span>
			<span class="pill pill--success">
				Harmonious: ${summary.harmonious}
			</span>
			<span class="pill pill--danger">
				Challenging: ${summary.challenging}
			</span>
			<span class="pill pill--muted">
				Neutral: ${summary.neutral}
			</span>
		</div>`;
  }
  renderPlanetsTable(planets) {
    return html23`<table class="planets-table">
			<thead>
				<tr>
					<th scope="col">Planet</th>
					<th scope="col">Sign</th>
					<th scope="col">Degree</th>
					<th scope="col">Speed</th>
				</tr>
			</thead>
			<tbody>
				${planets.map((p) => {
      const pGlyph = PLANET_GLYPH[capitalize(p.name)] ?? "";
      const sGlyph = SIGN_GLYPH[capitalize(p.sign)] ?? "";
      const speedArrow = p.speed >= 0 ? "\u2191" : "\u2193";
      return html23`<tr>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${pGlyph}</span>
								${p.name}
								${p.isRetrograde ? html23`<span class="retro-badge" aria-label="retrograde">R</span>` : nothing24}
							</div>
						</td>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${sGlyph}</span>
								${p.sign}
							</div>
						</td>
						<td class="num">${formatNumber(p.degree, 2)}</td>
						<td class="speed">
							<span class="speed-arrow" aria-hidden="true">${speedArrow}</span>
							${formatNumber(Math.abs(p.speed), 4)}
						</td>
					</tr>`;
    })}
			</tbody>
		</table>`;
  }
  renderAspectsTable(aspects) {
    return html23`<table class="aspects-table">
			<thead>
				<tr>
					<th scope="col">Transit Planet</th>
					<th scope="col">Natal Planet</th>
					<th scope="col">Type</th>
					<th scope="col">Orb</th>
					<th scope="col">Status</th>
					<th scope="col">Strength</th>
				</tr>
			</thead>
			<tbody>
				${aspects.map((a) => {
      const tGlyph = PLANET_GLYPH[capitalize(a.transitPlanet)] ?? "";
      const nGlyph = PLANET_GLYPH[capitalize(a.natalPlanet)] ?? "";
      const natureClass = `nature-${(a.nature ?? "").toLowerCase()}`;
      const summary = a.interpretation?.summary ?? "";
      const rowClass = summary ? "aspect-row" : "aspect-row no-interp";
      return html23`<tr class=${rowClass}>
							<td>
								<div class="arrow-cell">
									<span class="glyph" aria-hidden="true">${tGlyph}</span>
									${a.transitPlanet}
								</div>
							</td>
							<td>
								<div class="arrow-cell">
									<span class="glyph" aria-hidden="true">${nGlyph}</span>
									${a.natalPlanet}
								</div>
							</td>
							<td class=${natureClass}>${(a.type ?? "").toLowerCase()}</td>
							<td class="num">${formatNumber(a.orb, 2)}</td>
							<td>${a.isApplying ? "Applying" : "Separating"}</td>
							<td class="num">${formatNumber(a.strength, 1)}</td>
						</tr>
						${summary ? html23`<tr class="interp-row">
										<td colspan="6">${summary}</td>
									</tr>` : nothing24}`;
    })}
			</tbody>
		</table>`;
  }
};
RoxyTransitsTable.styles = [
  baseStyles,
  css24`
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

			.summary-pills {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}

			.pill {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				padding: 2px var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				border: 1px solid currentColor;
			}

			.pill--muted {
				color: var(--roxy-fg, #0a0a0a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
			}

			.pill--success {
				color: var(--roxy-success-fg, #166534);
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 10%, transparent);
			}

			.pill--danger {
				color: var(--roxy-danger-fg, #991b1b);
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
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
				text-align: left;
			}

			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}

			.section-label {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
			}

			.glyph {
				font-size: 1.1em;
				margin-right: 2px;
				line-height: 1;
			}

			.planet-cell {
				display: flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.retro-badge {
				display: inline-block;
				font-size: 0.7em;
				padding: 1px 4px;
				border-radius: var(--roxy-radius-sm, 4px);
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				color: var(--roxy-warning-fg, #9a3412);
				font-weight: var(--roxy-weight-bold, 600);
				margin-left: 2px;
				vertical-align: middle;
			}

			.speed {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
				white-space: nowrap;
			}

			.speed-arrow {
				font-size: 0.85em;
			}

			td.num {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
			}

			.nature-harmonious {
				color: var(--roxy-success-fg, #166534);
			}

			.nature-challenging {
				color: var(--roxy-danger-fg, #991b1b);
			}

			.nature-neutral {
				color: var(--roxy-muted, #71717a);
			}

			.arrow-cell {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				white-space: nowrap;
			}

			.interp-row td {
				padding-top: 0;
				padding-bottom: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: 1.45;
			}

			.aspect-row td {
				border-bottom: none;
				padding-bottom: 4px;
			}

			.aspect-row.no-interp td {
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				padding-bottom: var(--roxy-space-sm, 0.5rem);
			}

			.overflow-scroll {
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
			}
		`
];
__decorateClass([
  property23({ attribute: false })
], RoxyTransitsTable.prototype, "data", 2);
RoxyTransitsTable = __decorateClass([
  customElement23("roxy-transits-table")
], RoxyTransitsTable);

// packages/ui/src/components/vedic-kundli.ts
import { css as css25, html as html24, LitElement as LitElement24 } from "lit";
import { customElement as customElement24, property as property24 } from "lit/decorators.js";
var RoxyVedicKundli = class extends LitElement24 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.chartStyle = "south";
  }
  buildHouses() {
    if (!this.data) return [];
    const data = this.data;
    const lagnaSign = this.data?.meta?.Lagna?.rashi ?? "";
    const houses = [];
    for (let i = 0; i < 12; i++) {
      const key = RASHI_KEYS[i];
      const bucket = data[key];
      const planets = (bucket?.signs ?? []).map((p) => p.graha).filter(Boolean);
      const sign = RASHI_TO_SIGN[key] ?? "";
      houses.push({
        number: i + 1,
        sign,
        planets,
        isLagna: lagnaSign ? lagnaSign.toLowerCase() === sign.toLowerCase() : false
      });
    }
    return houses;
  }
  render() {
    if (!this.data)
      return html24`<div class="roxy-empty" role="status">No kundli data</div>`;
    const houses = this.buildHouses();
    const isNorth = this.chartStyle === "north";
    return html24`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				${isNorth ? renderNorthFrame() : renderSouthFrame()}
				${isNorth ? houses.map((h) => renderNorthHouseGroup(h)) : houses.map((h) => renderSouthHouseGroup(h))}
			</svg>
		</div>`;
  }
};
RoxyVedicKundli.styles = [
  baseStyles,
  css25`
			.wrap {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			svg {
				display: block;
				width: 100%;
				max-width: 360px;
				margin: 0 auto;
			}
			.line {
				fill: transparent;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.sign-text {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 500;
				font-family: var(--roxy-font-sans);
			}
			.planet-text {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 11px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-weight: 400;
				font-family: var(--roxy-font-sans);
			}
			.lagna-marker {
				fill: var(--roxy-accent-fg, #b45309);
				font-size: 8px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.05em;
			}
			.lagna-bg {
				fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 45%, transparent);
				stroke-width: 0.8;
			}
		`
];
__decorateClass([
  property24({ attribute: false })
], RoxyVedicKundli.prototype, "data", 2);
__decorateClass([
  property24({ type: String, reflect: true, attribute: "chart-style" })
], RoxyVedicKundli.prototype, "chartStyle", 2);
RoxyVedicKundli = __decorateClass([
  customElement24("roxy-vedic-kundli")
], RoxyVedicKundli);

// packages/ui/src/components/yoga-list.ts
import { css as css26, html as html25, LitElement as LitElement25, nothing as nothing25 } from "lit";
import { customElement as customElement25, property as property25, state as state5 } from "lit/decorators.js";
var RoxyYogaList = class extends LitElement25 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.filter = "";
    this.handleInput = debounce((e) => {
      this.filter = e.target.value;
    }, 200);
  }
  renderQualityChip(quality) {
    const cls = `quality-chip quality-${quality}`;
    return html25`<span class=${cls}>${quality}</span>`;
  }
  renderDetailCard(yoga) {
    return html25`<div class="detail-card">
			<p class="detail-name">
				${yoga.name}
				${yoga.quality ? this.renderQualityChip(yoga.quality) : nothing25}
			</p>
			${yoga.description ? html25`<p class="description">${yoga.description}</p>` : nothing25}
			${yoga.result ? html25`<details>
						<summary>Effects</summary>
						<div class="result-body">${yoga.result}</div>
					</details>` : nothing25}
		</div>`;
  }
  render() {
    if (!this.data)
      return html25`<div class="roxy-empty" role="status">No yoga data</div>`;
    const d = this.data;
    const lc = this.filter.toLowerCase();
    if ("description" in d && typeof d.description === "string") {
      const yoga = d;
      return html25`<div class="wrap">${this.renderDetailCard(yoga)}</div>`;
    }
    if ("yogas" in d && Array.isArray(d.yogas)) {
      const allYogas = d.yogas;
      const isDetailArray = allYogas.length > 0 && "description" in allYogas[0];
      if (isDetailArray) {
        const detailYogas = allYogas;
        const filtered2 = lc ? detailYogas.filter((y) => y.name.toLowerCase().includes(lc)) : detailYogas;
        const total2 = d.total;
        return html25`<div class="wrap">
					<div class="head">
						<h2 class="title">Yoga catalog</h2>
						${total2 !== void 0 ? html25`<span class="count">${total2} total</span>` : nothing25}
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
						${filtered2.length > 0 ? filtered2.map((y) => this.renderDetailCard(y)) : html25`<p class="no-results">No yogas match your search.</p>`}
					</div>
				</div>`;
      }
      const catalogYogas = allYogas;
      const filtered = lc ? catalogYogas.filter((y) => y.name.toLowerCase().includes(lc)) : catalogYogas;
      const total = d.total;
      return html25`<div class="wrap">
				<div class="head">
					<h2 class="title">Yoga catalog</h2>
					${total !== void 0 ? html25`<span class="count">${total} total</span>` : nothing25}
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
					${filtered.length > 0 ? filtered.map(
        (y) => html25`<div class="yoga-chip">
									${y.name}
									<span class="yoga-id">${y.id}</span>
								</div>`
      ) : html25`<p class="no-results">No yogas match your search.</p>`}
				</div>
			</div>`;
    }
    return html25`<div class="roxy-empty" role="status">No yoga data</div>`;
  }
};
RoxyYogaList.styles = [
  baseStyles,
  css26`
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
		`
];
__decorateClass([
  property25({ attribute: false })
], RoxyYogaList.prototype, "data", 2);
__decorateClass([
  state5()
], RoxyYogaList.prototype, "filter", 2);
RoxyYogaList = __decorateClass([
  customElement25("roxy-yoga-list")
], RoxyYogaList);

// packages/ui/src/manifest.ts
var ROXY_COMPONENTS = [
  {
    pascal: "RoxyNatalChart",
    tag: "roxy-natal-chart",
    slug: "natal-chart",
    heading: "Natal chart",
    description: "Western natal chart wheel for /astrology/natal-chart responses",
    docsLabel: "Western",
    endpointLabel: "POST /astrology/natal-chart",
    docsSummary: "Natal chart wheel with planet glyphs and aspect lines",
    topic: "Astrology"
  },
  {
    pascal: "RoxyHoroscopeCard",
    tag: "roxy-horoscope-card",
    slug: "horoscope-card",
    heading: "Daily horoscope",
    description: "Daily, weekly, or monthly horoscope card for /astrology/horoscope/...",
    docsLabel: "Western",
    endpointLabel: "GET /astrology/horoscope/{sign}/{daily,weekly,monthly}",
    docsSummary: "Daily, weekly, or monthly horoscope card",
    topic: "Astrology"
  },
  {
    pascal: "RoxySynastryChart",
    tag: "roxy-synastry-chart",
    slug: "synastry-chart",
    heading: "Synastry",
    description: "Dual-wheel synastry chart with inter-aspects table",
    docsLabel: "Western",
    endpointLabel: "POST /astrology/synastry",
    docsSummary: "Dual-wheel synastry with inter-aspects table",
    topic: "Astrology"
  },
  {
    pascal: "RoxyCompatibilityCard",
    tag: "roxy-compatibility-card",
    slug: "compatibility-card",
    heading: "Compatibility score",
    description: "Cross-domain compatibility score card",
    docsLabel: "Cross",
    endpointLabel: "POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility",
    docsSummary: "Score card with category breakdown",
    topic: "Astrology"
  },
  {
    pascal: "RoxyMoonPhase",
    tag: "roxy-moon-phase",
    slug: "moon-phase",
    heading: "Moon phase",
    description: "Moon phase card and calendar",
    docsLabel: "Western",
    endpointLabel: "GET /astrology/moon-phase/{current,upcoming,calendar/...}",
    docsSummary: "Moon phase card and calendar",
    topic: "Astrology"
  },
  {
    pascal: "RoxyVedicKundli",
    tag: "roxy-vedic-kundli",
    slug: "vedic-kundli",
    heading: "Vedic kundli",
    description: "South or North Indian Vedic kundli for /vedic-astrology/birth-chart",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/birth-chart",
    docsSummary: "South or North Indian kundli",
    topic: "Vedic"
  },
  {
    pascal: "RoxyPanchangTable",
    tag: "roxy-panchang-table",
    slug: "panchang-table",
    heading: "Panchang",
    description: "Panchang muhurta table with auspicious and inauspicious periods",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/panchang/{basic,detailed}",
    docsSummary: "15+ muhurtas in detailed mode",
    topic: "Vedic"
  },
  {
    pascal: "RoxyDashaTimeline",
    tag: "roxy-dasha-timeline",
    slug: "dasha-timeline",
    heading: "Vimshottari dasha",
    description: "Vimshottari dasha timeline with active mahadasha highlighted",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/dasha/{current,major,sub/...}",
    docsSummary: "Vimshottari mahadasha + antardasha + pratyantardasha",
    topic: "Vedic"
  },
  {
    pascal: "RoxyDoshaCard",
    tag: "roxy-dosha-card",
    slug: "dosha-card",
    heading: "Manglik dosha",
    description: "Manglik, Kaal Sarp, or Sade Sati presence card",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}",
    docsSummary: "Presence, severity, remedies, scoped effects",
    topic: "Vedic"
  },
  {
    pascal: "RoxyGunaMilan",
    tag: "roxy-guna-milan",
    slug: "guna-milan",
    heading: "Guna milan",
    description: "36-point Ashtakoota matrimonial compatibility breakdown",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/compatibility",
    docsSummary: "36-point Ashtakoota with eight sub-scores",
    topic: "Vedic"
  },
  {
    pascal: "RoxyKpPlanetsTable",
    tag: "roxy-kp-planets-table",
    slug: "kp-planets-table",
    heading: "KP planets",
    description: "KP planets table with sub-lord and sub-sub-lord columns",
    docsLabel: "Vedic (KP)",
    endpointLabel: "POST /vedic-astrology/kp/planets",
    docsSummary: "Sub-lord and sub-sub-lord columns",
    topic: "Vedic"
  },
  {
    pascal: "RoxyTransitsTable",
    tag: "roxy-transits-table",
    slug: "transits-table",
    heading: "Transits",
    description: "Live planet positions plus aspects to a natal chart",
    docsLabel: "Western",
    endpointLabel: "POST /astrology/transits",
    docsSummary: "Transit planet positions plus optional aspects to a natal chart",
    topic: "Astrology"
  },
  {
    pascal: "RoxyDivisionalChart",
    tag: "roxy-divisional-chart",
    slug: "divisional-chart",
    heading: "Divisional chart",
    description: "D2 to D60 varga chart wheel with Vargottama markers",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/divisional-chart",
    docsSummary: "Generic divisional varga wheel from D2 Hora to D60 Shashtiamsa",
    topic: "Vedic"
  },
  {
    pascal: "RoxyAshtakavargaGrid",
    tag: "roxy-ashtakavarga-grid",
    slug: "ashtakavarga-grid",
    heading: "Ashtakavarga",
    description: "Sarva and Bhinna ashtakavarga heatmap with bindu scores",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/ashtakavarga",
    docsSummary: "Sarva, Bhinna, and Shodhya Pinda views in a tabbed heatmap",
    topic: "Vedic"
  },
  {
    pascal: "RoxyShadbalaTable",
    tag: "roxy-shadbala-table",
    slug: "shadbala-table",
    heading: "Shadbala",
    description: "Six-fold planetary strength with adequacy badge per planet",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/shadbala",
    docsSummary: "Six-fold planetary strength bar plus rupas and adequacy badge",
    topic: "Vedic"
  },
  {
    pascal: "RoxyYogaList",
    tag: "roxy-yoga-list",
    slug: "yoga-list",
    heading: "Yoga catalog",
    description: "Yoga reference cards from the catalog with optional detail mode",
    docsLabel: "Vedic",
    endpointLabel: "GET /vedic-astrology/yoga, /yoga/{id}",
    docsSummary: "Filterable yoga cards from the 300 plus yoga catalog",
    topic: "Vedic"
  },
  {
    pascal: "RoxyChoghadiyaGrid",
    tag: "roxy-choghadiya-grid",
    slug: "choghadiya-grid",
    heading: "Choghadiya",
    description: "Day and night Choghadiya muhurta tiles for activity timing",
    docsLabel: "Vedic",
    endpointLabel: "POST /vedic-astrology/panchang/choghadiya",
    docsSummary: "Day and night Choghadiya muhurta tiles colored by effect",
    topic: "Vedic"
  },
  {
    pascal: "RoxyNumerologyCard",
    tag: "roxy-numerology-card",
    slug: "numerology-card",
    heading: "Life path number",
    description: "Numerology card for life path, expression, personal year, or full chart",
    docsLabel: "Numerology",
    endpointLabel: "POST /numerology/{life-path,expression,personal-year,chart}",
    docsSummary: "Life path, expression, personal year, full chart",
    topic: "Numerology"
  },
  {
    pascal: "RoxyTarotCard",
    tag: "roxy-tarot-card",
    slug: "tarot-card",
    heading: "Daily tarot card",
    description: "Single tarot card with upright/reversed flip animation",
    docsLabel: "Tarot",
    endpointLabel: "GET /tarot/cards/{id}, POST /tarot/daily",
    docsSummary: "Single card with upright and reversed flip",
    topic: "Tarot"
  },
  {
    pascal: "RoxyTarotSpread",
    tag: "roxy-tarot-spread",
    slug: "tarot-spread",
    heading: "Three-card spread",
    description: "Tarot spread renderer for three-card, Celtic Cross, love, or yes/no",
    docsLabel: "Tarot",
    endpointLabel: "POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw",
    docsSummary: "Spreads with positions and reading",
    topic: "Tarot"
  },
  {
    pascal: "RoxyBiorhythmChart",
    tag: "roxy-biorhythm-chart",
    slug: "biorhythm-chart",
    heading: "Daily biorhythm",
    description: "Daily biorhythm bars or multi-day forecast cycle lines",
    docsLabel: "Biorhythm",
    endpointLabel: "POST /biorhythm/{daily,forecast,critical-days}",
    docsSummary: "Daily bars, forecast cycle lines, critical days",
    topic: "Biorhythm"
  },
  {
    pascal: "RoxyHexagram",
    tag: "roxy-hexagram",
    slug: "hexagram",
    heading: "I Ching hexagram",
    description: "I Ching hexagram with trigram glyphs, judgment, image, and changing lines",
    docsLabel: "I Ching",
    endpointLabel: "GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast",
    docsSummary: "Hexagram with trigrams, judgment, image, changing lines",
    topic: "I Ching"
  },
  {
    pascal: "RoxyEndpointForm",
    tag: "roxy-endpoint-form",
    slug: "endpoint-form",
    heading: "Schema-driven form",
    description: "Schema-driven form that emits roxy-submit with a validated payload",
    docsLabel: "Helper",
    endpointLabel: "Any endpoint via x-roxy-ui hints",
    docsSummary: "Schema-driven form, emits roxy-submit",
    topic: "Helpers",
    selfFetching: true
  },
  {
    pascal: "RoxyLocationSearch",
    tag: "roxy-location-search",
    slug: "location-search",
    heading: "City search",
    description: "City search input with debounced /location/search calls",
    docsLabel: "Helper",
    endpointLabel: "GET /location/search",
    docsSummary: "Debounced city search input, emits roxy-location-select",
    topic: "Helpers",
    selfFetching: true
  },
  {
    pascal: "RoxyData",
    tag: "roxy-data",
    slug: "data",
    heading: "Generic renderer",
    description: "Generic fallback renderer for any OpenAPI response shape",
    docsLabel: "Helper",
    endpointLabel: "Any response shape",
    docsSummary: "Generic fallback renderer for unknown shapes",
    topic: "Helpers",
    selfFetching: true
  }
];

// packages/ui/src/version.ts
var ROXY_UI_VERSION = "0.2.1";

// packages/ui/src/index.ts
var ROXY_UI_COMPONENTS = ROXY_COMPONENTS.map((c) => c.slug);
export {
  ROXY_COMPONENTS,
  ROXY_UI_COMPONENTS,
  ROXY_UI_VERSION,
  RoxyAshtakavargaGrid,
  RoxyBiorhythmChart,
  RoxyChoghadiyaGrid,
  RoxyCompatibilityCard,
  RoxyDashaTimeline,
  RoxyData,
  RoxyDivisionalChart,
  RoxyDoshaCard,
  RoxyEndpointForm,
  RoxyGunaMilan,
  RoxyHexagram,
  RoxyHoroscopeCard,
  RoxyKpPlanetsTable,
  RoxyLocationSearch,
  RoxyMoonPhase,
  RoxyNatalChart,
  RoxyNumerologyCard,
  RoxyPanchangTable,
  RoxyShadbalaTable,
  RoxySynastryChart,
  RoxyTarotCard,
  RoxyTarotSpread,
  RoxyTransitsTable,
  RoxyVedicKundli,
  RoxyYogaList
};
//# sourceMappingURL=index.js.map
