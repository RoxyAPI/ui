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

// packages/ui/src/components/divisional-chart.ts
import { css as css2, html, LitElement, nothing as nothing2 } from "lit";
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

// packages/ui/src/utils/kundli-render.ts
import { nothing, svg } from "lit";

// packages/ui/src/utils/string.ts
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// packages/ui/src/utils/kundli-render.ts
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
  if (!center || !signPos) return nothing;
  const signAbbr = SIGN_ABBR[h.sign] ?? "";
  const planets = h.planets;
  return svg`
		<g>
			${h.isLagna ? svg`<rect
							class="lagna-bg"
							x=${center.x - 30} y=${center.y - 28}
							width="60" height="56" rx="6"
						/>` : nothing}
			${signAbbr ? svg`<text class="sign-text" x=${signPos.x} y=${signPos.y} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>` : nothing}
			${h.isLagna ? svg`<text class="lagna-marker" x=${center.x} y=${center.y - 18} text-anchor="middle" dominant-baseline="central">LAGNA</text>` : nothing}
			${planets.map((planet, j) => {
    const abbr = PLANET_ABBR[capitalize(planet)] ?? planet.slice(0, 2);
    const lineHeight = 13;
    const baseY = h.isLagna ? center.y + 8 : center.y;
    const startY = baseY - (planets.length - 1) * lineHeight / 2;
    const yPos = startY + j * lineHeight;
    return svg`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
  })}
		</g>
	`;
}
function renderNorthFrame() {
  return svg`
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
  if (!center) return nothing;
  const signAbbr = SIGN_ABBR[h.sign] ?? "";
  const planets = h.planets;
  return svg`
		<g>
			${h.isLagna ? svg`<circle class="lagna-bg" cx=${center.x} cy=${center.y} r="22" />` : nothing}
			${signAbbr ? svg`<text class="sign-text" x=${center.x} y=${center.y - 10} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>` : nothing}
			<text class="house-num" x=${center.x} y=${center.y + 2} text-anchor="middle" dominant-baseline="central">${h.number}</text>
			${planets.map((planet, j) => {
    const abbr = PLANET_ABBR[capitalize(planet)] ?? planet.slice(0, 2);
    const lineHeight = 11;
    const startY = center.y + 14 - (planets.length - 1) * lineHeight / 2;
    const yPos = startY + j * lineHeight;
    return svg`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
  })}
		</g>
	`;
}
function renderSouthFrame() {
  return svg`
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
var RoxyDivisionalChart = class extends LitElement {
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
      return html`<div class="roxy-empty" role="status">No divisional chart data</div>`;
    const { division, vargottama } = this.data;
    const houses = this.buildHouses();
    const isNorth = this.chartStyle === "north";
    return html`<div class="wrap">
			<div class="header">
				<h2 class="title">
					D${division.number} ${division.name}
					${division.sanskritName && division.sanskritName !== division.name ? html`<span class="division-meta"> · ${division.sanskritName}</span>` : nothing2}
				</h2>
				${division.significance ? html`<p class="significance">${division.significance}</p>` : nothing2}
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

			${vargottama && vargottama.length > 0 ? html`<div class="vargottama-row" role="list" aria-label="Vargottama planets">
						<span class="vargottama-label">Vargottama:</span>
						${vargottama.map(
      (planet) => html`<span class="vargottama-pill" role="listitem">
									${PLANET_GLYPH[planet] ?? ""} ${planet}
								</span>`
    )}
					</div>` : nothing2}
		</div>`;
  }
};
RoxyDivisionalChart.styles = [
  baseStyles,
  css2`
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
  property({ attribute: false })
], RoxyDivisionalChart.prototype, "data", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "chart-style" })
], RoxyDivisionalChart.prototype, "chartStyle", 2);
RoxyDivisionalChart = __decorateClass([
  customElement("roxy-divisional-chart")
], RoxyDivisionalChart);
export {
  RoxyDivisionalChart
};
//# sourceMappingURL=divisional-chart.js.map
