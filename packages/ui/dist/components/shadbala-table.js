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

// packages/ui/src/components/shadbala-table.ts
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
function formatNumber(value, dp = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  return value.toFixed(dp).replace(/\.?0+$/, "");
}

// packages/ui/src/utils/string.ts
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// packages/ui/src/components/shadbala-table.ts
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
var RoxyShadbalaTable = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data?.planets?.length) {
      return html`<div class="roxy-empty" role="status">No shadbala data</div>`;
    }
    const sorted = [...this.data.planets].sort(
      (a, b) => a.relativeRank - b.relativeRank
    );
    return html`<div class="wrap" aria-label="Shadbala planetary strength">
			<div class="head">
				<h2 class="title">Shadbala</h2>
				<p class="subtitle">${sorted.length} planets ranked by strength</p>
			</div>

			<div role="list" aria-label="Planet strength bars">
				${sorted.map((p) => this.renderPlanetRow(p))}
			</div>

			<div class="legend" aria-label="Strength component legend">
				${BALA_COMPONENTS.map(
      (b) => html`<div class="legend-row">
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
    return html`<div class="planet-row" role="listitem" aria-label="${p.planet} shadbala">
			<div class="planet-label">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				${p.planet}
				<span class="rank-badge" aria-label="rank ${p.relativeRank}">#${p.relativeRank}</span>
			</div>
			<div class="bar-wrap">
				<div class="bar" role="img" aria-label="Strength components for ${p.planet}">
					${total > 0 ? BALA_COMPONENTS.map((b, i) => {
      const v = values[i];
      if (v <= 0) return nothing;
      const grow = v / total * 100;
      return html`<div
									class="bar-segment"
									style="flex-grow: ${grow}; background: ${b.color};"
									title="${b.label}: ${formatNumber(v, 1)}"
								></div>`;
    }) : nothing}
				</div>
			</div>
			<div class="pills">
				${rupasStr ? html`<span class="rupas-label">${rupasStr}</span>` : nothing}
				<span class="${`adequacy-badge ${badgeClass}`}">${badgeLabel}</span>
			</div>
		</div>`;
  }
};
RoxyShadbalaTable.styles = [
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
  property({ attribute: false })
], RoxyShadbalaTable.prototype, "data", 2);
RoxyShadbalaTable = __decorateClass([
  customElement("roxy-shadbala-table")
], RoxyShadbalaTable);
export {
  RoxyShadbalaTable
};
//# sourceMappingURL=shadbala-table.js.map
