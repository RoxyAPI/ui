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

// packages/ui/src/components/natal-chart.ts
import { css as css2, html, LitElement, nothing, svg } from "lit";
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
  SouthNode: "\u260B"
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

// packages/ui/src/utils/degree.ts
function normalizeLongitude(lon) {
  const wrapped = lon % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}
function longitudeToSignPosition(longitude) {
  const lon = normalizeLongitude(longitude);
  const signIndex = Math.floor(lon / 30) % 12;
  const within = lon % 30;
  const degree = Math.floor(within);
  const minuteFloat = (within - degree) * 60;
  const minute = Math.floor(minuteFloat);
  const second = Math.round((minuteFloat - minute) * 60);
  return {
    sign: SIGNS_ORDER[signIndex] ?? "Aries",
    signIndex,
    degree,
    minute,
    second
  };
}
function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = angleDeg * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad)
  };
}

// packages/ui/src/components/natal-chart.ts
var SIZE = 320;
var CENTER = SIZE / 2;
var OUTER_R = 150;
var SIGN_R = 134;
var HOUSE_R = 110;
var PLANET_R = 88;
var RoxyNatalChart = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.houseSystem = "placidus";
  }
  getPlanets() {
    const p = this.data?.planets;
    if (!p) return [];
    if (Array.isArray(p)) return p;
    return Object.entries(p).map(([name, entry]) => ({ ...entry, name }));
  }
  render() {
    if (!this.data)
      return html`<div class="roxy-empty" role="status">No chart data</div>`;
    const planets = this.getPlanets();
    const aspects = this.data.aspects ?? [];
    return html`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails ? html`<div class="meta">
							${[
      this.data.birthDetails.date,
      this.data.birthDetails.time,
      this.data.birthDetails.location
    ].filter(Boolean).join(" \xB7 ")}
						</div>` : nothing}
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
			</svg>
			<div class="legend">
				<span>${planets.length} planets</span>
				<span>${aspects.length} aspects</span>
				<span>House system: ${this.houseSystem}</span>
			</div>
		</div>`;
  }
  renderSpokes() {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = i * 30 - 90;
      const start = polarToCartesian(CENTER, CENTER, HOUSE_R, angle);
      const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
      return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.8" />`;
    });
  }
  renderSigns() {
    const order = [
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
    return order.map((sign, i) => {
      const angle = i * 30 + 15 - 90;
      const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
      return svg`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[sign]}</text>`;
    });
  }
  renderHouseNumbers() {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = i * 30 + 15 - 90;
      const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
      return svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${i + 1}</text>`;
    });
  }
  renderPlanets(planets) {
    return planets.map((p) => {
      const lon = typeof p.longitude === "number" ? p.longitude : typeof p.degree === "number" ? p.degree : NaN;
      if (!Number.isFinite(lon)) return nothing;
      const angle = lon - 90;
      const pos = polarToCartesian(CENTER, CENTER, PLANET_R, angle);
      const name = p.name ?? p.planet ?? "";
      const glyph = PLANET_GLYPH[capitalize(name)] ?? name.slice(0, 2);
      const retro = p.retrograde || p.isRetrograde ? " R" : "";
      return svg`<text class="planet-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${name}${retro}</title>${glyph}</text>`;
    });
  }
  renderAspects(planets, aspects) {
    const planetMap = /* @__PURE__ */ new Map();
    for (const p of planets) {
      const lon = typeof p.longitude === "number" ? p.longitude : typeof p.degree === "number" ? p.degree : null;
      if (lon === null) continue;
      const name = capitalize(p.name ?? p.planet ?? "");
      if (name) planetMap.set(name, lon);
    }
    return aspects.map((a) => {
      const l1 = planetMap.get(capitalize(a.planet1 ?? ""));
      const l2 = planetMap.get(capitalize(a.planet2 ?? ""));
      if (l1 === void 0 || l2 === void 0) return nothing;
      const p1 = polarToCartesian(CENTER, CENTER, PLANET_R - 18, l1 - 90);
      const p2 = polarToCartesian(CENTER, CENTER, PLANET_R - 18, l2 - 90);
      return svg`<line class="aspect" x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y} />`;
    });
  }
};
RoxyNatalChart.styles = [
  baseStyles,
  css2`
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
				stroke: color-mix(in srgb, var(--roxy-accent, #f59e0b) 32%, transparent);
				stroke-width: 0.6;
				fill: none;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
		`
];
__decorateClass([
  property({ attribute: false })
], RoxyNatalChart.prototype, "data", 2);
__decorateClass([
  property({ type: String, attribute: "house-system", reflect: true })
], RoxyNatalChart.prototype, "houseSystem", 2);
RoxyNatalChart = __decorateClass([
  customElement("roxy-natal-chart")
], RoxyNatalChart);
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
export {
  RoxyNatalChart,
  longitudeToSignPosition
};
//# sourceMappingURL=natal-chart.js.map
