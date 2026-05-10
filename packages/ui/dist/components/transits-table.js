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

// packages/ui/src/components/transits-table.ts
import { css as css2, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

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
function formatNumber(value, dp = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  return value.toFixed(dp).replace(/\.?0+$/, "");
}

// packages/ui/src/utils/string.ts
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// packages/ui/src/components/transits-table.ts
var RoxyTransitsTable = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data?.transitPlanets?.length) {
      return html`<div class="roxy-empty" role="status">No transits data</div>`;
    }
    const {
      transitDate,
      transitTime,
      transitPlanets,
      transitAspects,
      summary
    } = this.data;
    const dateStr = [formatDate(transitDate), formatTime(transitTime)].filter(Boolean).join(" ");
    return html`<div class="wrap" aria-label="Transit positions table">
			<div class="head">
				<h2 class="title">Transits</h2>
				${dateStr ? html`<p class="subtitle">${dateStr}</p>` : nothing}
			</div>

			${summary ? this.renderSummaryPills(summary) : nothing}

			<div>
				<p class="section-label">Planet positions</p>
				<div class="overflow-scroll">
					${this.renderPlanetsTable(transitPlanets)}
				</div>
			</div>

			${transitAspects?.length ? html`<div>
						<p class="section-label">Transit aspects</p>
						<div class="overflow-scroll">
							${this.renderAspectsTable(transitAspects)}
						</div>
					</div>` : nothing}
		</div>`;
  }
  renderSummaryPills(summary) {
    return html`<div class="summary-pills" role="region" aria-label="Aspect summary">
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
    return html`<table class="planets-table">
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
      return html`<tr>
						<td>
							<div class="planet-cell">
								<span class="glyph" aria-hidden="true">${pGlyph}</span>
								${p.name}
								${p.isRetrograde ? html`<span class="retro-badge" aria-label="retrograde">R</span>` : nothing}
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
    return html`<table class="aspects-table">
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
      return html`<tr class=${rowClass}>
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
						${summary ? html`<tr class="interp-row">
										<td colspan="6">${summary}</td>
									</tr>` : nothing}`;
    })}
			</tbody>
		</table>`;
  }
};
RoxyTransitsTable.styles = [
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
  property({ attribute: false })
], RoxyTransitsTable.prototype, "data", 2);
RoxyTransitsTable = __decorateClass([
  customElement("roxy-transits-table")
], RoxyTransitsTable);
export {
  RoxyTransitsTable
};
//# sourceMappingURL=transits-table.js.map
