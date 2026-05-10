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

// packages/ui/src/utils/format.ts
function formatNumber(value, dp = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  return value.toFixed(dp).replace(/\.?0+$/, "");
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
      return html`<div
				class="wrap"
				aria-label="Synastry compatibility chart"
			>
				<div class="head">
					<h2 class="title">Synastry</h2>
					${typeof score === "number" ? html`<span class="score" aria-label=${`Score ${score} of 100`}
								>${score} / 100</span
							>` : nothing}
				</div>
				<div class="missing-planets" role="status">
					Synastry response missing planet positions. Pass
					<code>data</code> with <code>person1.planets</code> and
					<code>person2.planets</code> arrays from the natal-chart endpoint, or
					use the <code>&lt;roxy-data&gt;</code> fallback.
				</div>
				${summaryText ? html`<p class="summary">${summaryText}</p>` : nothing}
				${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing}
				${strengths.length > 0 || challenges.length > 0 ? html`<div class="lists">
							${strengths.length ? html`<div>
										<h3>Strengths</h3>
										<ul>
											${strengths.map((s) => html`<li>${s}</li>`)}
										</ul>
									</div>` : nothing}
							${challenges.length ? html`<div>
										<h3>Challenges</h3>
										<ul>
											${challenges.map((s) => html`<li>${s}</li>`)}
										</ul>
									</div>` : nothing}
						</div>` : nothing}
			</div>`;
    }
    return html`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof score === "number" ? html`<span class="score" aria-label=${`Score ${score} of 100`}
							>${score} / 100</span
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
				${this.renderInterAspectLines(p1Planets, p2Planets, interAspects)}
				${this.renderRing(p1Planets, P1_R, "p1")} ${this.renderRing(p2Planets, P2_R, "p2")}
			</svg>
			<div class="legend-row">
				<span><span class="swatch" style="background: var(--roxy-accent)"></span>Person 1</span>
				<span><span class="swatch" style="background: var(--roxy-info)"></span>Person 2</span>
				<span><span class="swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${summaryText ? html`<p class="summary">${summaryText}</p>` : nothing}
			${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing}
			${strengths.length > 0 || challenges.length > 0 ? html`<div class="lists">
						${strengths.length ? html`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>` : nothing}
						${challenges.length ? html`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>` : nothing}
					</div>` : nothing}
		</div>`;
  }
  toAngle(longitude) {
    return 180 - longitude;
  }
  renderSpokes() {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = this.toAngle(i * 30);
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
      const angle = this.toAngle(i * 30 + 15);
      const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
      return svg`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[s]}</text>`;
    });
  }
  renderRing(planets, radius, cls) {
    return planets.map((p) => {
      if (!Number.isFinite(p.longitude)) return nothing;
      const pos = polarToCartesian(
        CENTER,
        CENTER,
        radius,
        this.toAngle(p.longitude)
      );
      const glyph = PLANET_GLYPH[capitalize(p.name)] ?? p.name.slice(0, 2);
      return svg`<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}</title>${glyph}</text>`;
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
      if (l1 === void 0 || l2 === void 0) return nothing;
      const out = polarToCartesian(CENTER, CENTER, P1_R - 12, this.toAngle(l1));
      const inn = polarToCartesian(CENTER, CENTER, P2_R + 8, this.toAngle(l2));
      const aspectName = normalizeAspect(a);
      const cls = ASPECT_CLASS[aspectName] ?? "aspect-other";
      const orbLabel = formatNumber(a.orb, 1);
      return svg`<line class=${`aspect ${cls}`} x1=${out.x} y1=${out.y} x2=${inn.x} y2=${inn.y}><title>${a.planet1} ${aspectName} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}\xB0)` : ""}</title></line>`;
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
				${aspects.slice(0, 12).map(
      (a) => html`<tr>
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
  property({ attribute: false })
], RoxySynastryChart.prototype, "data", 2);
RoxySynastryChart = __decorateClass([
  customElement("roxy-synastry-chart")
], RoxySynastryChart);
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
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
function formatStrength(s) {
  if (typeof s === "number") return Math.round(s).toString();
  return "";
}
export {
  RoxySynastryChart
};
//# sourceMappingURL=synastry-chart.js.map
