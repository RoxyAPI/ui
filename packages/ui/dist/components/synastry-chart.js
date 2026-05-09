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

// packages/ui/src/components/synastry-chart.ts
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
function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = angleDeg * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad)
  };
}

// packages/ui/src/components/synastry-chart.ts
var SIZE = 360;
var CENTER = SIZE / 2;
var OUTER_R = 170;
var SIGN_R = 154;
var P1_R = 124;
var P2_R = 96;
var RoxySynastryChart = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data)
      return html`<div class="roxy-empty" role="status">No synastry data</div>`;
    const {
      person1,
      person2,
      compatibilityScore,
      summary,
      interAspects = []
    } = this.data;
    const p1Planets = this.normalizePlanets(person1?.planets);
    const p2Planets = this.normalizePlanets(person2?.planets);
    return html`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof compatibilityScore === "number" ? html`<span class="score" aria-label=${`Score ${compatibilityScore} of 100`}
							>${compatibilityScore} / 100</span
						>` : nothing}
			</div>
			<svg
				viewBox="0 0 ${SIZE} ${SIZE}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
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
					r=${P2_R + 14}
					stroke-width="0.8"
				/>
				<circle
					class="wheel-line"
					cx=${CENTER}
					cy=${CENTER}
					r=${P2_R - 14}
					stroke-width="0.6"
				/>
				${this.renderSpokes()} ${this.renderSigns()}
				${this.renderRing(p1Planets, P1_R, "p1")} ${this.renderRing(p2Planets, P2_R, "p2")}
			</svg>
			${summary ? html`<p class="summary">${summary}</p>` : nothing}
			${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing}
			${(this.data.strengths?.length ?? 0) > 0 || (this.data.challenges?.length ?? 0) > 0 ? html`<div class="lists">
						${this.data.strengths?.length ? html`<div>
									<h3>Strengths</h3>
									<ul>
										${this.data.strengths.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>` : nothing}
						${this.data.challenges?.length ? html`<div>
									<h3>Challenges</h3>
									<ul>
										${this.data.challenges.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>` : nothing}
					</div>` : nothing}
		</div>`;
  }
  normalizePlanets(p) {
    if (!p) return [];
    if (Array.isArray(p)) return p;
    return Object.entries(p).map(([name, e]) => ({ ...e, name }));
  }
  renderSpokes() {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = i * 30 - 90;
      const start = polarToCartesian(CENTER, CENTER, P2_R - 14, angle);
      const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
      return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
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
    return order.map((s, i) => {
      const angle = i * 30 + 15 - 90;
      const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
      return svg`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[s]}</text>`;
    });
  }
  renderRing(planets, radius, cls) {
    return planets.map((p) => {
      const lon = typeof p.longitude === "number" ? p.longitude : typeof p.degree === "number" ? p.degree : NaN;
      if (!Number.isFinite(lon)) return nothing;
      const pos = polarToCartesian(CENTER, CENTER, radius, lon - 90);
      const name = p.name ?? p.planet ?? "";
      const glyph = PLANET_GLYPH[capitalize(name)] ?? name.slice(0, 2);
      return svg`<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${name}</title>${glyph}</text>`;
    });
  }
  renderAspects(aspects) {
    return html`<table>
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
				${aspects.slice(0, 16).map(
      (a) => html`<tr>
						<td>${a.planet1 ?? ""}</td>
						<td>${a.planet2 ?? ""}</td>
						<td>${a.aspect ?? ""}</td>
						<td class="orb">
							${typeof a.orb === "number" ? a.orb.toFixed(1) : ""}
						</td>
						<td>${a.strength ?? ""}</td>
					</tr>`
    )}
			</tbody>
		</table>`;
  }
};
RoxySynastryChart.styles = [
  baseStyles,
  css2`
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
		`
];
__decorateClass([
  property({ attribute: false })
], RoxySynastryChart.prototype, "data", 2);
RoxySynastryChart = __decorateClass([
  customElement("roxy-synastry-chart")
], RoxySynastryChart);
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
export {
  RoxySynastryChart
};
//# sourceMappingURL=synastry-chart.js.map
