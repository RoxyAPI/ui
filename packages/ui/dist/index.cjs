"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// packages/ui/src/index.ts
var src_exports = {};
__export(src_exports, {
  ROXY_COMPONENTS: () => ROXY_COMPONENTS,
  ROXY_UI_COMPONENTS: () => ROXY_UI_COMPONENTS,
  ROXY_UI_VERSION: () => ROXY_UI_VERSION,
  RoxyBiorhythmChart: () => RoxyBiorhythmChart,
  RoxyCompatibilityCard: () => RoxyCompatibilityCard,
  RoxyDashaTimeline: () => RoxyDashaTimeline,
  RoxyData: () => RoxyData,
  RoxyDoshaCard: () => RoxyDoshaCard,
  RoxyEndpointForm: () => RoxyEndpointForm,
  RoxyGunaMilan: () => RoxyGunaMilan,
  RoxyHexagram: () => RoxyHexagram,
  RoxyHoroscopeCard: () => RoxyHoroscopeCard,
  RoxyKpPlanetsTable: () => RoxyKpPlanetsTable,
  RoxyLocationSearch: () => RoxyLocationSearch,
  RoxyMoonPhase: () => RoxyMoonPhase,
  RoxyNatalChart: () => RoxyNatalChart,
  RoxyNumerologyCard: () => RoxyNumerologyCard,
  RoxyPanchangTable: () => RoxyPanchangTable,
  RoxySynastryChart: () => RoxySynastryChart,
  RoxyTarotCard: () => RoxyTarotCard,
  RoxyTarotSpread: () => RoxyTarotSpread,
  RoxyVedicKundli: () => RoxyVedicKundli
});
module.exports = __toCommonJS(src_exports);

// packages/ui/src/components/biorhythm-chart.ts
var import_lit2 = require("lit");
var import_decorators = require("lit/decorators.js");

// packages/ui/src/utils/base-styles.ts
var import_lit = require("lit");
var baseStyles = import_lit.css`
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

// packages/ui/src/components/biorhythm-chart.ts
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
var RoxyBiorhythmChart = class extends import_lit2.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "daily";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit2.html`<div class="roxy-empty" role="status">No biorhythm data</div>`;
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
    return import_lit2.html`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${typeof d.energyRating === "number" ? import_lit2.html`<span class="energy">Energy ${d.energyRating}/10</span>` : import_lit2.nothing}
			</header>
			<div class="bars" role="list">
				${entries.map(([cycle, v]) => {
      const pct = (v + 1) / 2 * 100;
      const color = CYCLE_COLOR[cycle] ?? "var(--roxy-accent, #f59e0b)";
      return import_lit2.html`<div class="bar" role="listitem">
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
			${d.dailyMessage ? import_lit2.html`<p class="advice">${d.dailyMessage}</p>` : import_lit2.nothing}
			${d.advice ? import_lit2.html`<p class="advice">${d.advice}</p>` : import_lit2.nothing}
		</section>`;
  }
  renderForecast(d) {
    const days = d.days ?? [];
    if (days.length === 0)
      return import_lit2.html`<div class="roxy-empty" role="status">No forecast</div>`;
    const w = 600;
    const h = 160;
    const xStep = w / Math.max(days.length - 1, 1);
    const cycleKeys = [
      "physical",
      "emotional",
      "intellectual",
      "intuitive"
    ];
    return import_lit2.html`<section class="wrap" aria-label="Biorhythm forecast">
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
      return import_lit2.svg`<polyline points=${points} fill="none" stroke=${color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`;
    })}
			</svg>
			${d.summary?.periodAdvice ? import_lit2.html`<p class="advice">${d.summary.periodAdvice}</p>` : import_lit2.nothing}
		</section>`;
  }
  renderCritical(d) {
    return import_lit2.html`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${d.totalCriticalDays} total</span>
			</header>
			<div>
				${d.criticalDays.map(
      (day) => import_lit2.html`<span class="crit"
						>${day.date} · ${day.cycle} ${day.severity}</span
					>`
    )}
			</div>
		</section>`;
  }
};
RoxyBiorhythmChart.styles = [
  baseStyles,
  import_lit2.css`
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
  (0, import_decorators.property)({ attribute: false })
], RoxyBiorhythmChart.prototype, "data", 2);
__decorateClass([
  (0, import_decorators.property)({ type: String, reflect: true })
], RoxyBiorhythmChart.prototype, "mode", 2);
RoxyBiorhythmChart = __decorateClass([
  (0, import_decorators.customElement)("roxy-biorhythm-chart")
], RoxyBiorhythmChart);

// packages/ui/src/components/compatibility-card.ts
var import_lit3 = require("lit");
var import_decorators2 = require("lit/decorators.js");

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

// packages/ui/src/components/compatibility-card.ts
var RoxyCompatibilityCard = class extends import_lit3.LitElement {
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
      return import_lit3.html`<div class="roxy-empty" role="status">No compatibility data</div>`;
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
    return import_lit3.html`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${typeof score === "number" ? import_lit3.html`<div class="score">${formatNumber(score, 0)}</div>` : import_lit3.nothing}
					${rating ? import_lit3.html`<div class="rating">${rating}</div>` : import_lit3.nothing}
				</div>
			</div>

			${Object.keys(breakdown).length > 0 ? import_lit3.html`<div role="list">
						${Object.entries(breakdown).map(
      ([k, v]) => import_lit3.html`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${k}</span>
								<span class="bar"
									><span style="width: ${Math.max(0, Math.min(100, v))}%"></span
								></span>
								<span>${formatNumber(v, 0)}</span>
							</div>`
    )}
					</div>` : import_lit3.nothing}
			${archetype ? import_lit3.html`<p>
						<span class="archetype">${archetype.label}</span>
						${archetype.description ? import_lit3.html` · ${archetype.description}` : import_lit3.nothing}
					</p>` : import_lit3.nothing}
			${summary ? import_lit3.html`<p>${summary}</p>` : import_lit3.nothing}
			${interpretation && !summary ? import_lit3.html`<p>${interpretation}</p>` : import_lit3.nothing}
			${advice ? import_lit3.html`<p>${advice}</p>` : import_lit3.nothing}
			${(strengths?.length ?? 0) > 0 || (challenges?.length ?? 0) > 0 ? import_lit3.html`<div class="lists">
						${strengths?.length ? import_lit3.html`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => import_lit3.html`<li>${s}</li>`)}
									</ul>
								</div>` : import_lit3.nothing}
						${challenges?.length ? import_lit3.html`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => import_lit3.html`<li>${s}</li>`)}
									</ul>
								</div>` : import_lit3.nothing}
					</div>` : import_lit3.nothing}
			${keyAspects?.length ? import_lit3.html`<div>
						<h3 style="margin: 0 0 0.25rem; font-size: var(--roxy-text-xs); color: var(--roxy-muted); text-transform: uppercase; letter-spacing: 0.06em;">Key aspects</h3>
						<ul style="margin: 0; padding-left: 1rem; font-size: var(--roxy-text-sm);">
							${keyAspects.slice(0, 6).map((a) => import_lit3.html`<li>${formatAspect(a)}</li>`)}
						</ul>
					</div>` : import_lit3.nothing}
		</article>`;
  }
};
RoxyCompatibilityCard.styles = [
  baseStyles,
  import_lit3.css`
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
  (0, import_decorators2.property)({ attribute: false })
], RoxyCompatibilityCard.prototype, "data", 2);
__decorateClass([
  (0, import_decorators2.property)({ type: String, reflect: true })
], RoxyCompatibilityCard.prototype, "mode", 2);
RoxyCompatibilityCard = __decorateClass([
  (0, import_decorators2.customElement)("roxy-compatibility-card")
], RoxyCompatibilityCard);
function formatAspect(a) {
  const aspect = a.type.toLowerCase().replace(/_/g, "-");
  const orb = typeof a.orb === "number" ? ` (orb ${formatNumber(a.orb, 1)}\xB0)` : "";
  const head = [a.planet1, aspect, a.planet2].filter(Boolean).join(" ");
  return a.description ? `${head}${orb} \xB7 ${a.description}` : `${head}${orb}`;
}

// packages/ui/src/components/dasha-timeline.ts
var import_lit4 = require("lit");
var import_decorators3 = require("lit/decorators.js");
var RoxyDashaTimeline = class extends import_lit4.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.period = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit4.html`<div class="roxy-empty" role="status">No dasha data</div>`;
    const periods = this.collectPeriods(d);
    const maxYears = periods.length ? Math.max(...periods.map((p) => p.durationYears)) : 0;
    return import_lit4.html`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period === "major" ? "Vimshottari Mahadasha" : this.period === "sub" ? "Antardasha" : "Active dashas"}
				</h2>
				${"nakshatraName" in d && d.nakshatraName ? import_lit4.html`<div class="nakshatra">
						Moon nakshatra: ${d.nakshatraName}
						${"nakshatraLord" in d && d.nakshatraLord ? import_lit4.html`(lord ${d.nakshatraLord})` : import_lit4.nothing}
					</div>` : import_lit4.nothing}
			</header>

			${this.period === "current" ? this.renderCurrent(d) : import_lit4.nothing}
			${periods.length > 0 ? import_lit4.html`<div class="timeline" role="list">
						${periods.map((p) => this.renderBar(p, maxYears))}
					</div>` : import_lit4.nothing}
		</div>`;
  }
  renderCurrent(d) {
    if (!("mahadasha" in d)) return import_lit4.nothing;
    return import_lit4.html`<div class="current">
			${"mahadasha" in d && d.mahadasha ? import_lit4.html`<div>
					<span>Mahadasha</span>
					<strong>${d.mahadasha.planet}</strong>
					${"remainingInMahadasha" in d && d.remainingInMahadasha ? import_lit4.html`<small>${formatNumber(d.remainingInMahadasha.years + d.remainingInMahadasha.months / 12, 1)} years left</small>` : import_lit4.nothing}
				</div>` : import_lit4.nothing}
			${"antardasha" in d && d.antardasha ? import_lit4.html`<div>
					<span>Antardasha</span>
					<strong>${d.antardasha.planet}</strong>
					${"remainingInAntardasha" in d && d.remainingInAntardasha ? import_lit4.html`<small>${formatNumber(d.remainingInAntardasha.years + d.remainingInAntardasha.months / 12, 1)} years left</small>` : import_lit4.nothing}
				</div>` : import_lit4.nothing}
			${"pratyantardasha" in d && d.pratyantardasha ? import_lit4.html`<div>
					<span>Pratyantardasha</span>
					<strong>${d.pratyantardasha.planet}</strong>
					${"remainingInPratyantardasha" in d && d.remainingInPratyantardasha ? import_lit4.html`<small>${formatNumber(d.remainingInPratyantardasha.years + d.remainingInPratyantardasha.months / 12, 1)} years left</small>` : import_lit4.nothing}
				</div>` : import_lit4.nothing}
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
    return import_lit4.html`<div class="bar" role="listitem">
			<span>${p.planet}</span>
			<span class="bar-track"><span style="width: ${width}%"></span></span>
			<span class="dates">
				${p.startDate ? formatYear(p.startDate) : ""}
				${p.endDate ? import_lit4.html`- ${formatYear(p.endDate)}` : ""}
			</span>
		</div>`;
  }
};
RoxyDashaTimeline.styles = [
  baseStyles,
  import_lit4.css`
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
  (0, import_decorators3.property)({ attribute: false })
], RoxyDashaTimeline.prototype, "data", 2);
__decorateClass([
  (0, import_decorators3.property)({ type: String, reflect: true })
], RoxyDashaTimeline.prototype, "period", 2);
RoxyDashaTimeline = __decorateClass([
  (0, import_decorators3.customElement)("roxy-dasha-timeline")
], RoxyDashaTimeline);
function formatYear(s) {
  const m = s.match(/^(\d{4})/);
  return m ? m[1] : s;
}

// packages/ui/src/components/data.ts
var import_lit5 = require("lit");
var import_decorators4 = require("lit/decorators.js");
var TITLE_KEYS = ["title", "name", "label", "heading", "overview", "summary"];
var IMAGE_KEYS = ["imageUrl", "image", "icon", "symbol"];
var SKIP_KEYS = ["imageUrl", "image"];
var MAX_DEPTH = 6;
var RoxyData = class extends import_lit5.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.depth = 0;
  }
  render() {
    if (this.data == null) {
      return import_lit5.html`<div class="roxy-empty" role="status">No data</div>`;
    }
    if (this.depth >= MAX_DEPTH) {
      return import_lit5.html`<div class="roxy-empty" role="status">…</div>`;
    }
    return import_lit5.html`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`;
  }
  renderValue(value) {
    if (value === null || value === void 0) return import_lit5.nothing;
    if (typeof value === "string") return import_lit5.html`<p>${value}</p>`;
    if (typeof value === "number" || typeof value === "boolean") {
      return import_lit5.html`<p>${String(value)}</p>`;
    }
    if (Array.isArray(value)) return this.renderArray(value);
    return this.renderObject(value);
  }
  renderArray(arr) {
    if (arr.length === 0) {
      return import_lit5.html`<div class="roxy-empty" role="status">Empty list</div>`;
    }
    const allPrimitive = arr.every(
      (v) => v === null || ["string", "number", "boolean"].includes(typeof v)
    );
    if (allPrimitive) {
      return import_lit5.html`<ul class="roxy-chips">
				${arr.map((v) => import_lit5.html`<li>${String(v)}</li>`)}
			</ul>`;
    }
    const allObjects = arr.every(
      (v) => v !== null && typeof v === "object" && !Array.isArray(v)
    );
    if (allObjects) return this.renderTable(arr);
    return import_lit5.html`<ol>
			${arr.map((v) => import_lit5.html`<li>${this.renderValue(v)}</li>`)}
		</ol>`;
  }
  renderTable(rows) {
    const keys = this.collectKeys(rows);
    return import_lit5.html`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${keys.map((k) => import_lit5.html`<th>${this.humanize(k)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${rows.map(
      (row) => import_lit5.html`<tr>
						${keys.map((k) => import_lit5.html`<td>${this.formatPrimitive(row[k])}</td>`)}
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
    return import_lit5.html`
			${imageKey ? import_lit5.html`<img
						class="roxy-image"
						src=${String(obj[imageKey])}
						alt=${titleKey ? String(obj[titleKey]) : "illustration"}
						loading="lazy"
					/>` : import_lit5.nothing}
			${titleKey ? import_lit5.html`<h3 class="roxy-title">${obj[titleKey]}</h3>` : import_lit5.nothing}
			${summaryKey ? import_lit5.html`<p class="roxy-summary">${obj[summaryKey]}</p>` : import_lit5.nothing}
			${rows.length > 0 ? import_lit5.html`<dl class="roxy-rows">
						${rows.map(
      ([k, v]) => import_lit5.html`
								<dt>${this.humanize(k)}</dt>
								<dd>${this.renderField(v)}</dd>
							`
    )}
					</dl>` : import_lit5.nothing}
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
        return import_lit5.html`<ul class="roxy-chips">
					${value.map((v) => import_lit5.html`<li>${String(v)}</li>`)}
				</ul>`;
      }
    }
    return import_lit5.html`<roxy-data .data=${value} .depth=${this.depth + 1}></roxy-data>`;
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
  humanize(key) {
    return key.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
  }
};
RoxyData.styles = [
  baseStyles,
  import_lit5.css`
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
  (0, import_decorators4.property)({ attribute: false })
], RoxyData.prototype, "data", 2);
__decorateClass([
  (0, import_decorators4.property)({ attribute: false })
], RoxyData.prototype, "depth", 2);
RoxyData = __decorateClass([
  (0, import_decorators4.customElement)("roxy-data")
], RoxyData);

// packages/ui/src/components/dosha-card.ts
var import_lit6 = require("lit");
var import_decorators5 = require("lit/decorators.js");
var DOSHA_LABELS = {
  manglik: "Mangal Dosha",
  kalsarpa: "Kaal Sarp Dosha",
  sadhesati: "Sade Sati"
};
var RoxyDoshaCard = class extends import_lit6.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.type = "manglik";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit6.html`<div class="roxy-empty" role="status">No dosha data</div>`;
    const present = !!d.present;
    const label = DOSHA_LABELS[this.type] ?? this.type;
    const sevClass = (d.severity ?? "").toLowerCase();
    return import_lit6.html`<article
			class="card"
			aria-label=${label}
		>
			<header class="head">
				<h2 class="title">${label}</h2>
				<div style="display:flex; gap:0.5rem; align-items:center;">
					<span class=${`badge ${present ? "present" : "absent"}`}>
						${present ? "Present" : "Absent"}
					</span>
					${d.severity ? import_lit6.html`<span
								class=${`severity ${sevClass}`}
								role="img"
								aria-label=${`Severity ${d.severity}`}
							>
								<span></span><span></span><span></span>
							</span>` : import_lit6.nothing}
				</div>
			</header>
			${d.description ? import_lit6.html`<p class="description">${d.description}</p>` : import_lit6.nothing}
			${this.renderEffects(d)}
			${d.remedies && d.remedies.length > 0 ? import_lit6.html`<div>
						<h3>Remedies</h3>
						<ul>
							${d.remedies.map((r) => import_lit6.html`<li>${r}</li>`)}
						</ul>
					</div>` : import_lit6.nothing}
			${"exceptions" in d && d.exceptions && d.exceptions.length > 0 ? import_lit6.html`<div>
					<h3>Exceptions</h3>
					<ul>
						${d.exceptions.map((r) => import_lit6.html`<li>${r}</li>`)}
					</ul>
				</div>` : import_lit6.nothing}
		</article>`;
  }
  renderEffects(d) {
    if (!d.effects) return import_lit6.nothing;
    const entries = Object.entries(d.effects).filter(
      ([, v]) => typeof v === "string" && v.length > 0
    );
    if (entries.length === 0) return import_lit6.nothing;
    return import_lit6.html`<div class="effects">
			${entries.map(
      ([k, v]) => import_lit6.html`<div>
					<h3>${k}</h3>
					<p>${v}</p>
				</div>`
    )}
		</div>`;
  }
};
RoxyDoshaCard.styles = [
  baseStyles,
  import_lit6.css`
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
			.severity {
				display: flex;
				align-items: center;
				gap: 4px;
			}
			.severity span {
				width: 14px;
				height: 4px;
				border-radius: 2px;
				background: var(--roxy-border, #e4e4e7);
			}
			.severity.mild span:nth-child(1) {
				background: var(--roxy-warning, #ea580c);
			}
			.severity.moderate span:nth-child(-n + 2) {
				background: var(--roxy-warning, #ea580c);
			}
			.severity.severe span {
				background: var(--roxy-danger, #dc2626);
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
  (0, import_decorators5.property)({ attribute: false })
], RoxyDoshaCard.prototype, "data", 2);
__decorateClass([
  (0, import_decorators5.property)({ type: String, reflect: true })
], RoxyDoshaCard.prototype, "type", 2);
RoxyDoshaCard = __decorateClass([
  (0, import_decorators5.customElement)("roxy-dosha-card")
], RoxyDoshaCard);

// packages/ui/src/components/endpoint-form.ts
var import_lit7 = require("lit");
var import_decorators6 = require("lit/decorators.js");
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
var RoxyEndpointForm = class extends import_lit7.LitElement {
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
      return import_lit7.html`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;
    }
    if (this.specError) {
      return import_lit7.html`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;
    }
    const renderField = (f) => {
      if (this.hasLocation && (f.name === "latitude" || f.name === "longitude" || f.name === "timezone")) {
        return import_lit7.nothing;
      }
      const inputId = `roxy-form-${f.name}`;
      return import_lit7.html`<div class="field">
				<label for=${inputId}>
					${humanize(f.name)}${f.required ? import_lit7.html`<span class="req" aria-hidden="true">*</span>` : import_lit7.nothing}
				</label>
				${f.enum ? import_lit7.html`<select
							id=${inputId}
							?required=${f.required}
							@change=${(e) => this.setValue(f.name, e.target.value)}
						>
							<option value="">Choose</option>
							${f.enum.map(
        (opt) => import_lit7.html`<option value=${opt} ?selected=${this.values[f.name] === opt}>
									${opt}
								</option>`
      )}
						</select>` : import_lit7.html`<input
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
				${f.description ? import_lit7.html`<small class="help">${f.description}</small>` : import_lit7.nothing}
			</div>`;
    };
    return import_lit7.html`<form @submit=${this.onSubmit}>
			<h2 class="title">${humanize(this.endpoint.split("/").pop() ?? "")}</h2>
			${this.hasLocation ? import_lit7.html`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>` : import_lit7.nothing}
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
  import_lit7.css`
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
  (0, import_decorators6.property)({ type: String, attribute: "data-endpoint" })
], RoxyEndpointForm.prototype, "endpoint", 2);
__decorateClass([
  (0, import_decorators6.property)({ type: String })
], RoxyEndpointForm.prototype, "method", 2);
__decorateClass([
  (0, import_decorators6.property)({ type: String, attribute: "spec-url" })
], RoxyEndpointForm.prototype, "specUrl", 2);
__decorateClass([
  (0, import_decorators6.property)({ type: String, attribute: "submit-label" })
], RoxyEndpointForm.prototype, "submitLabel", 2);
__decorateClass([
  (0, import_decorators6.state)()
], RoxyEndpointForm.prototype, "fields", 2);
__decorateClass([
  (0, import_decorators6.state)()
], RoxyEndpointForm.prototype, "values", 2);
__decorateClass([
  (0, import_decorators6.state)()
], RoxyEndpointForm.prototype, "hasLocation", 2);
__decorateClass([
  (0, import_decorators6.state)()
], RoxyEndpointForm.prototype, "loaded", 2);
__decorateClass([
  (0, import_decorators6.state)()
], RoxyEndpointForm.prototype, "specError", 2);
RoxyEndpointForm = __decorateClass([
  (0, import_decorators6.customElement)("roxy-endpoint-form")
], RoxyEndpointForm);
function humanize(s) {
  return s.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
}

// packages/ui/src/components/guna-milan.ts
var import_lit8 = require("lit");
var import_decorators7 = require("lit/decorators.js");
var RoxyGunaMilan = class extends import_lit8.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit8.html`<div class="roxy-empty" role="status">No Guna Milan data</div>`;
    const breakdown = (d.breakdown ?? []).filter(
      (b) => b?.category !== void 0
    );
    return import_lit8.html`<article class="card" aria-label="Guna Milan score">
			<div class="score-bar">
				<div>
					<span class="total">${formatNumber(d.total, 1)}</span>
					<span class="over"> / ${d.maxScore}</span>
					${typeof d.percentage === "number" ? import_lit8.html`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
								${formatPercent(d.percentage, 1)}
							</small>` : import_lit8.nothing}
				</div>
				${d.recommendation ? import_lit8.html`<span class="recommendation">${d.recommendation}</span>` : import_lit8.nothing}
			</div>

			${breakdown.length > 0 ? import_lit8.html`<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Progress</th>
								<th class="score">Score</th>
							</tr>
						</thead>
						<tbody>
							${breakdown.map((b) => {
      const score = b.score ?? 0;
      const maxScore = b.maxScore ?? defaultMax(b.category);
      const pct = maxScore ? score / maxScore * 100 : 0;
      return import_lit8.html`<tr>
									<td>${b.category}</td>
									<td class="bar-cell">
										<div class="mini-bar">
											<span style="width: ${pct}%"></span>
										</div>
									</td>
									<td class="score">${formatNumber(score, 1)} / ${maxScore}</td>
								</tr>`;
    })}
						</tbody>
					</table>` : import_lit8.nothing}
			${(d.doshas?.length ?? 0) > 0 || (d.doshaCancellations?.length ?? 0) > 0 ? import_lit8.html`<div class="tags">
						${d.doshas?.map((x) => import_lit8.html`<span class="dosha">${x}</span>`)}
						${d.doshaCancellations?.map(
      (x) => import_lit8.html`<span class="cancel" title=${x.reason}>${x.dosha} cancelled</span>`
    )}
					</div>` : import_lit8.nothing}
		</article>`;
  }
};
RoxyGunaMilan.styles = [
  baseStyles,
  import_lit8.css`
			.card {
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
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
  (0, import_decorators7.property)({ attribute: false })
], RoxyGunaMilan.prototype, "data", 2);
RoxyGunaMilan = __decorateClass([
  (0, import_decorators7.customElement)("roxy-guna-milan")
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
var import_lit9 = require("lit");
var import_decorators8 = require("lit/decorators.js");

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

// packages/ui/src/components/hexagram.ts
var RoxyHexagram = class extends import_lit9.LitElement {
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
      return import_lit9.html`<div class="roxy-empty" role="status">No hexagram data</div>`;
    const {
      hex: h,
      lines: castLines,
      changingLinePositions,
      dailyMessage,
      resultingHexagram
    } = resolved;
    const lines = castLines ?? this.derivedLines(h);
    const changing = new Set(changingLinePositions ?? []);
    return import_lit9.html`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${h.symbol ? import_lit9.html`<div class="symbol">${h.symbol}</div>` : import_lit9.nothing}
				<div class="lines" aria-hidden="true">
					${lines.slice().reverse().map((l, idx) => {
      const realIdx = lines.length - 1 - idx + 1;
      const isChanging = changing.has(realIdx);
      const broken = l === 6 || l === 8;
      const cls = `${broken ? "broken" : "solid"}${isChanging ? " changing" : ""}`;
      return import_lit9.html`<div class="line ${cls}">
								${broken ? import_lit9.svg`<span class="seg"></span><span class="seg"></span>` : import_lit9.svg`<span class="seg"></span>`}
							</div>`;
    })}
				</div>
			</div>
			<div>
				<h2 class="title">
					${h.number ? import_lit9.html`${h.number}. ` : import_lit9.nothing}${h.english ?? h.chinese ?? "Hexagram"}
				</h2>
				<p class="subtitle">
					${h.chinese ? import_lit9.html`${h.chinese}` : import_lit9.nothing}
					${h.pinyin ? import_lit9.html` · ${h.pinyin}` : import_lit9.nothing}
				</p>
				<div class="trigrams">
					${h.upperTrigram ? import_lit9.html`<div>
								Upper
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.upperTrigram] ?? ""}</span
								>${h.upperTrigram}
							</div>` : import_lit9.nothing}
					${h.lowerTrigram ? import_lit9.html`<div>
								Lower
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.lowerTrigram] ?? ""}</span
								>${h.lowerTrigram}
							</div>` : import_lit9.nothing}
				</div>
				${h.judgment ? import_lit9.html`<p class="judgment">${h.judgment}</p>` : import_lit9.nothing}
				${h.image ? import_lit9.html`<p class="image">${h.image}</p>` : import_lit9.nothing}
				${dailyMessage ? import_lit9.html`<p class="message">${dailyMessage}</p>` : import_lit9.nothing}
				${h.interpretation?.general ? import_lit9.html`<p>${h.interpretation.general}</p>` : import_lit9.nothing}
				${changing.size > 0 ? import_lit9.html`<div class="changing">
							Changing lines: ${Array.from(changing).sort((a, b) => a - b).join(", ")}.
							${resultingHexagram?.english ? import_lit9.html` Becomes hexagram ${resultingHexagram.number}
										${resultingHexagram.english}.` : import_lit9.nothing}
						</div>` : import_lit9.nothing}
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
  import_lit9.css`
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
  (0, import_decorators8.property)({ attribute: false })
], RoxyHexagram.prototype, "data", 2);
__decorateClass([
  (0, import_decorators8.property)({ type: String, reflect: true })
], RoxyHexagram.prototype, "mode", 2);
RoxyHexagram = __decorateClass([
  (0, import_decorators8.customElement)("roxy-hexagram")
], RoxyHexagram);

// packages/ui/src/components/horoscope-card.ts
var import_lit10 = require("lit");
var import_decorators9 = require("lit/decorators.js");
var RoxyHoroscopeCard = class extends import_lit10.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.period = "daily";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit10.html`<div class="roxy-empty" role="status">No horoscope data</div>`;
    const sign = d.sign ?? "";
    const glyph = sign ? SIGN_GLYPH[capitalize(sign)] ?? "" : "";
    const energy = "energyRating" in d && typeof d.energyRating === "number" ? d.energyRating : null;
    const dateLabel = "date" in d && d.date || "week" in d && d.week || "month" in d && d.month || "";
    return import_lit10.html`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${sign}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				<div>
					<h2 class="title">${sign} ${this.period}</h2>
					${dateLabel ? import_lit10.html`<div class="date">${dateLabel}</div>` : import_lit10.nothing}
				</div>
				${energy !== null ? import_lit10.html`<span class="energy" aria-label=${`Energy ${energy} of 10`}>
							Energy ${energy}/10
							<span class="energy-bar"
								><span style="width: ${energy / 10 * 100}%"></span
							></span>
						</span>` : import_lit10.nothing}
			</header>

			${d.overview ? import_lit10.html`<p class="overview">${d.overview}</p>` : import_lit10.nothing}

			<div class="sections">
				${d.love ? import_lit10.html`<div class="section">
							<h3>Love</h3>
							<p>${d.love}</p>
						</div>` : import_lit10.nothing}
				${d.career ? import_lit10.html`<div class="section">
							<h3>Career</h3>
							<p>${d.career}</p>
						</div>` : import_lit10.nothing}
				${d.health ? import_lit10.html`<div class="section">
							<h3>Health</h3>
							<p>${d.health}</p>
						</div>` : import_lit10.nothing}
				${d.finance ? import_lit10.html`<div class="section">
							<h3>Finance</h3>
							<p>${d.finance}</p>
						</div>` : import_lit10.nothing}
				${"advice" in d && d.advice ? import_lit10.html`<div class="section">
							<h3>Advice</h3>
							<p>${d.advice}</p>
						</div>` : import_lit10.nothing}
			</div>

			${(() => {
      const luckyNumber = "luckyNumber" in d && d.luckyNumber !== void 0 ? d.luckyNumber : void 0;
      const luckyColor = "luckyColor" in d && d.luckyColor ? d.luckyColor : "";
      const luckyNumbers = "luckyNumbers" in d && d.luckyNumbers ? d.luckyNumbers : [];
      const luckyDays = "luckyDays" in d && d.luckyDays ? d.luckyDays : [];
      const compatibleSigns = d.compatibleSigns ?? [];
      if (luckyNumber === void 0 && !luckyColor && luckyNumbers.length === 0 && luckyDays.length === 0 && compatibleSigns.length === 0)
        return import_lit10.nothing;
      return import_lit10.html`<div class="lucky">
						${luckyNumber !== void 0 ? import_lit10.html`<span>Lucky number <strong>${luckyNumber}</strong></span>` : import_lit10.nothing}
						${luckyColor ? import_lit10.html`<span>Lucky color <strong>${luckyColor}</strong></span>` : import_lit10.nothing}
						${luckyNumbers.length ? import_lit10.html`<span
									>Lucky numbers
									<strong>${luckyNumbers.join(", ")}</strong></span
								>` : import_lit10.nothing}
						${luckyDays.length ? import_lit10.html`<span
									>Lucky days <strong>${luckyDays.join(", ")}</strong></span
								>` : import_lit10.nothing}
						${compatibleSigns.length ? import_lit10.html`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${compatibleSigns.map(
        (s) => import_lit10.html`<span>${s}</span>`
      )}</span
									>
								</span>` : import_lit10.nothing}
					</div>`;
    })()}
		</article>`;
  }
};
RoxyHoroscopeCard.styles = [
  baseStyles,
  import_lit10.css`
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
  (0, import_decorators9.property)({ attribute: false })
], RoxyHoroscopeCard.prototype, "data", 2);
__decorateClass([
  (0, import_decorators9.property)({ type: String, reflect: true })
], RoxyHoroscopeCard.prototype, "period", 2);
RoxyHoroscopeCard = __decorateClass([
  (0, import_decorators9.customElement)("roxy-horoscope-card")
], RoxyHoroscopeCard);
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// packages/ui/src/components/kp-planets-table.ts
var import_lit11 = require("lit");
var import_decorators10 = require("lit/decorators.js");
var RoxyKpPlanetsTable = class extends import_lit11.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data)
      return import_lit11.html`<div class="roxy-empty" role="status">No KP data</div>`;
    const planets = this.data.planets ?? [];
    return import_lit11.html`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${typeof this.data.ayanamsa === "number" ? import_lit11.html`<span class="ayanamsa">Ayanamsa: ${formatNumber(this.data.ayanamsa, 2)}°</span>` : import_lit11.nothing}
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
      (p) => import_lit11.html`<tr>
							<td class="planet">
								${p.planet}
								${p.retrograde ? import_lit11.html`<span class="retro">R</span>` : import_lit11.nothing}
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
  import_lit11.css`
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
  (0, import_decorators10.property)({ attribute: false })
], RoxyKpPlanetsTable.prototype, "data", 2);
RoxyKpPlanetsTable = __decorateClass([
  (0, import_decorators10.customElement)("roxy-kp-planets-table")
], RoxyKpPlanetsTable);

// packages/ui/src/components/location-search.ts
var import_lit12 = require("lit");
var import_decorators11 = require("lit/decorators.js");

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
var RoxyLocationSearch = class extends import_lit12.LitElement {
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
    return import_lit12.html`<div class="field">
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
			${this.isLoading ? import_lit12.html`<span class="spinner" role="status" aria-label="Loading"></span>` : import_lit12.nothing}
			${this.isOpen ? import_lit12.html`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${this.results.length === 0 ? import_lit12.html`<li class="empty" role="status">No cities found</li>` : this.results.map(
      (city, idx) => import_lit12.html`<li role="presentation">
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
												>${city.province ? import_lit12.html`${city.province}, ` : ""}${city.country}</span
											>
											<span class="tz"
												>UTC${city.utcOffset >= 0 ? "+" : ""}${city.utcOffset}</span
											>
										</button>
									</li>`
    )}
					</ul>` : import_lit12.nothing}
		</div>`;
  }
};
RoxyLocationSearch.styles = [
  baseStyles,
  import_lit12.css`
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
  (0, import_decorators11.property)({ type: String, attribute: "api-key" })
], RoxyLocationSearch.prototype, "apiKey", 2);
__decorateClass([
  (0, import_decorators11.property)({ type: String, attribute: "publishable-key" })
], RoxyLocationSearch.prototype, "publishableKey", 2);
__decorateClass([
  (0, import_decorators11.property)({ type: String })
], RoxyLocationSearch.prototype, "endpoint", 2);
__decorateClass([
  (0, import_decorators11.property)({ type: String })
], RoxyLocationSearch.prototype, "placeholder", 2);
__decorateClass([
  (0, import_decorators11.property)({ type: String, attribute: "default-value" })
], RoxyLocationSearch.prototype, "defaultValue", 2);
__decorateClass([
  (0, import_decorators11.state)()
], RoxyLocationSearch.prototype, "query", 2);
__decorateClass([
  (0, import_decorators11.state)()
], RoxyLocationSearch.prototype, "results", 2);
__decorateClass([
  (0, import_decorators11.state)()
], RoxyLocationSearch.prototype, "isOpen", 2);
__decorateClass([
  (0, import_decorators11.state)()
], RoxyLocationSearch.prototype, "isLoading", 2);
__decorateClass([
  (0, import_decorators11.state)()
], RoxyLocationSearch.prototype, "highlight", 2);
RoxyLocationSearch = __decorateClass([
  (0, import_decorators11.customElement)("roxy-location-search")
], RoxyLocationSearch);

// packages/ui/src/components/moon-phase.ts
var import_lit13 = require("lit");
var import_decorators12 = require("lit/decorators.js");
var RoxyMoonPhase = class extends import_lit13.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit13.html`<div class="roxy-empty" role="status">No moon phase data</div>`;
    const list = "phases" in d ? d.phases : "calendar" in d ? d.calendar : [];
    if (this.mode !== "current" && list.length > 0) {
      const month = "month" in d ? d.month : void 0;
      const year = "year" in d ? d.year : void 0;
      return import_lit13.html`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${month ?? "Moon phases"} ${year ?? ""}</h2>
				<div class="list" role="list">
					${list.map((phase) => this.renderListItem(phase))}
				</div>
			</article>`;
    }
    if (!("phase" in d)) return import_lit13.nothing;
    return this.renderSingle(d);
  }
  renderSingle(d) {
    const emoji = phaseEmoji(d.phase);
    return import_lit13.html`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${emoji}</span>
				<div>
					<h2 class="label">${d.phase ?? "Moon"}</h2>
					${d.date ? import_lit13.html`<div class="date">${d.date}</div>` : import_lit13.nothing}
				</div>
			</div>
			<div class="stats">
				${typeof d.illumination === "number" ? import_lit13.html`<div>
							<span>Illumination</span>
							<strong>${formatIllumination(d.illumination)}</strong>
						</div>` : import_lit13.nothing}
				${typeof d.age === "number" ? import_lit13.html`<div>
							<span>Age</span>
							<strong>${formatNumber(d.age, 1)} days</strong>
						</div>` : import_lit13.nothing}
				${d.sign ? import_lit13.html`<div>
							<span>Sign</span>
							<strong>${d.sign}</strong>
						</div>` : import_lit13.nothing}
				${typeof d.distance === "number" ? import_lit13.html`<div>
							<span>Distance</span>
							<strong>${(d.distance / 1e3).toFixed(0)}k km</strong>
						</div>` : import_lit13.nothing}
			</div>
			${d.meaning?.description ? import_lit13.html`<p class="meaning">${d.meaning.description}</p>` : import_lit13.nothing}
			${d.meaning?.keywords?.length ? import_lit13.html`<div class="keywords">
						${d.meaning.keywords.map((k) => import_lit13.html`<span>${k}</span>`)}
					</div>` : import_lit13.nothing}
		</article>`;
  }
  renderListItem(p) {
    const emoji = phaseEmoji(p.phase);
    return import_lit13.html`<div class="list-item" role="listitem">
			<span aria-hidden="true">${emoji}</span>
			<span>${p.phase}</span>
			<span>${p.date ?? ""}</span>
		</div>`;
  }
};
RoxyMoonPhase.styles = [
  baseStyles,
  import_lit13.css`
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
  (0, import_decorators12.property)({ attribute: false })
], RoxyMoonPhase.prototype, "data", 2);
__decorateClass([
  (0, import_decorators12.property)({ type: String, reflect: true })
], RoxyMoonPhase.prototype, "mode", 2);
RoxyMoonPhase = __decorateClass([
  (0, import_decorators12.customElement)("roxy-moon-phase")
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
var import_lit14 = require("lit");
var import_decorators13 = require("lit/decorators.js");

// packages/ui/src/utils/degree.ts
function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = angleDeg * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad)
  };
}

// packages/ui/src/components/natal-chart.ts
var SIZE = 384;
var CENTER = SIZE / 2;
var OUTER_R = 150;
var SIGN_R = 134;
var HOUSE_R = 110;
var PLANET_R = 88;
var ANGLE_TICK_R = 162;
var ANGLE_LABEL_R = 176;
var RoxyNatalChart = class extends import_lit14.LitElement {
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
      return import_lit14.html`<div class="roxy-empty" role="status">No chart data</div>`;
    const planets = this.getPlanets();
    const aspects = this.data.aspects ?? [];
    return import_lit14.html`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails ? import_lit14.html`<div class="meta">
							${[this.data.birthDetails.date, this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>` : import_lit14.nothing}
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
    return import_lit14.svg`
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
      return import_lit14.svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.8" />`;
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
      const angle = this.toAngle(i * 30 + 15);
      const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
      return import_lit14.svg`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[sign]}</text>`;
    });
  }
  renderHouseNumbers() {
    const ascSignIndex = Math.floor(this.getAscendant() / 30);
    return Array.from({ length: 12 }, (_, i) => {
      const angle = this.toAngle(i * 30 + 15);
      const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
      const houseNum = (i - ascSignIndex + 12) % 12 + 1;
      return import_lit14.svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${houseNum}</text>`;
    });
  }
  renderPlanets(planets) {
    return planets.map((p) => {
      if (!Number.isFinite(p.longitude)) return import_lit14.nothing;
      const angle = this.toAngle(p.longitude);
      const pos = polarToCartesian(CENTER, CENTER, PLANET_R, angle);
      const glyph = PLANET_GLYPH[capitalize2(p.name)] ?? p.name.slice(0, 2);
      const retro = p.isRetrograde ? " R" : "";
      const display = retro ? `${glyph}\u1D3F` : glyph;
      return import_lit14.svg`<text class="planet-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}${retro}</title>${display}</text>`;
    });
  }
  renderAspects(planets, aspects) {
    const planetMap = /* @__PURE__ */ new Map();
    for (const p of planets) {
      if (typeof p.longitude !== "number") continue;
      const name = capitalize2(p.name);
      if (name) planetMap.set(name, p.longitude);
    }
    return aspects.map((a) => {
      const l1 = planetMap.get(capitalize2(a.planet1));
      const l2 = planetMap.get(capitalize2(a.planet2));
      if (l1 === void 0 || l2 === void 0) return import_lit14.nothing;
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
      return import_lit14.svg`<line class=${`aspect ${aspectClass}`} x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y}><title>${a.planet1} ${aspectName || ""} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}\xB0)` : ""}</title></line>`;
    });
  }
};
RoxyNatalChart.styles = [
  baseStyles,
  import_lit14.css`
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
		`
];
__decorateClass([
  (0, import_decorators13.property)({ attribute: false })
], RoxyNatalChart.prototype, "data", 2);
__decorateClass([
  (0, import_decorators13.property)({ type: String, attribute: "house-system", reflect: true })
], RoxyNatalChart.prototype, "houseSystem", 2);
RoxyNatalChart = __decorateClass([
  (0, import_decorators13.customElement)("roxy-natal-chart")
], RoxyNatalChart);
function capitalize2(s) {
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

// packages/ui/src/components/numerology-card.ts
var import_lit15 = require("lit");
var import_decorators14 = require("lit/decorators.js");
var RoxyNumerologyCard = class extends import_lit15.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.type = "life-path";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit15.html`<div class="roxy-empty" role="status">No numerology data</div>`;
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
    return import_lit15.html`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.number === "number" ? import_lit15.html`<div class="numeral">${d.number}</div>` : import_lit15.nothing}
				<div>
					<p class="label">${headerLabel}</p>
					${d.meaning?.title ? import_lit15.html`<h2 class="title">${d.meaning.title}</h2>` : import_lit15.nothing}
				</div>
			</div>
			${d.meaning?.description ? import_lit15.html`<p class="meaning">${d.meaning.description}</p>` : import_lit15.nothing}
			${d.calculation ? import_lit15.html`<pre class="calc">${d.calculation}</pre>` : import_lit15.nothing}
			${keywords.length > 0 ? import_lit15.html`<div class="chips">
						${keywords.map((k) => import_lit15.html`<span>${k}</span>`)}
					</div>` : import_lit15.nothing}
			${d.hasKarmicDebt && d.karmicDebtNumber ? import_lit15.html`<div class="karmic">
						Karmic debt ${d.karmicDebtNumber}.
						${karmicDebtText(d.karmicDebtMeaning)}
					</div>` : import_lit15.nothing}
		</article>`;
  }
  renderPersonalYear(d, headerLabel) {
    return import_lit15.html`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.personalYear === "number" ? import_lit15.html`<div class="numeral">${d.personalYear}</div>` : import_lit15.nothing}
				<div>
					<p class="label">${headerLabel}</p>
					${d.theme ? import_lit15.html`<h2 class="title">${d.theme}</h2>` : import_lit15.nothing}
				</div>
			</div>
			${d.forecast ? import_lit15.html`<p class="meaning">${d.forecast}</p>` : import_lit15.nothing}
			${d.advice ? import_lit15.html`<p>${d.advice}</p>` : import_lit15.nothing}
		</article>`;
  }
  renderChart(d, headerLabel) {
    const cores = Object.entries(d.coreNumbers).filter(
      ([, v]) => v !== null && v !== void 0
    );
    return import_lit15.html`<article class="card" aria-label=${headerLabel}>
			<div>
				<p class="label">${headerLabel}</p>
				${d.profile?.name ? import_lit15.html`<h2 class="title">${d.profile.name}</h2>` : import_lit15.nothing}
			</div>
			${cores.length > 0 ? import_lit15.html`<div class="cores">
						${cores.map(
      ([k, v]) => import_lit15.html`<div class="item">
								<span>${humanize2(k)}</span>
								<strong>${v.number ?? ""}</strong>
							</div>`
    )}
					</div>` : import_lit15.nothing}
		</article>`;
  }
};
RoxyNumerologyCard.styles = [
  baseStyles,
  import_lit15.css`
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
  (0, import_decorators14.property)({ attribute: false })
], RoxyNumerologyCard.prototype, "data", 2);
__decorateClass([
  (0, import_decorators14.property)({ type: String, reflect: true })
], RoxyNumerologyCard.prototype, "type", 2);
RoxyNumerologyCard = __decorateClass([
  (0, import_decorators14.customElement)("roxy-numerology-card")
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
function humanize2(s) {
  return s.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
}

// packages/ui/src/components/panchang-table.ts
var import_lit16 = require("lit");
var import_decorators15 = require("lit/decorators.js");
var RoxyPanchangTable = class extends import_lit16.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.detail = "detailed";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit16.html`<div class="roxy-empty" role="status">No panchang data</div>`;
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
    return import_lit16.html`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${detailed ? formatDate(detailed.date) : ""}</span>
			</header>
			<table>
				<tbody>
					${fivefold.map(
      ([k, v]) => import_lit16.html`<tr>
							<th>${k}</th>
							<td>${v}</td>
						</tr>`
    )}
					${detailed?.sunrise ? import_lit16.html`<tr>
								<th>Sunrise</th>
								<td>${formatTime(detailed.sunrise)}</td>
							</tr>` : import_lit16.nothing}
					${detailed?.sunset ? import_lit16.html`<tr>
								<th>Sunset</th>
								<td>${formatTime(detailed.sunset)}</td>
							</tr>` : import_lit16.nothing}
					${detailed?.moonrise ? import_lit16.html`<tr>
								<th>Moonrise</th>
								<td>${formatTime(detailed.moonrise)}</td>
							</tr>` : import_lit16.nothing}
					${detailed?.moonset ? import_lit16.html`<tr>
								<th>Moonset</th>
								<td>${formatTime(detailed.moonset)}</td>
							</tr>` : import_lit16.nothing}
				</tbody>
			</table>
			${this.detail === "detailed" && (muhurtas.some((m) => !!m[1]) || inauspicious.some((m) => !!m[1])) ? import_lit16.html`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${muhurtas.filter(([, v]) => !!v).map(
      ([k, v]) => import_lit16.html`<tr>
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
      ([k, v]) => import_lit16.html`<tr>
											<th>${k}</th>
											<td>${formatTimeRange(v)}</td>
										</tr>`
    )}
							</tbody>
						</table>
					` : import_lit16.nothing}
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
  import_lit16.css`
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
  (0, import_decorators15.property)({ attribute: false })
], RoxyPanchangTable.prototype, "data", 2);
__decorateClass([
  (0, import_decorators15.property)({ type: String, reflect: true })
], RoxyPanchangTable.prototype, "detail", 2);
RoxyPanchangTable = __decorateClass([
  (0, import_decorators15.customElement)("roxy-panchang-table")
], RoxyPanchangTable);

// packages/ui/src/components/synastry-chart.ts
var import_lit17 = require("lit");
var import_decorators16 = require("lit/decorators.js");
var SIZE2 = 360;
var CENTER2 = SIZE2 / 2;
var OUTER_R2 = 170;
var SIGN_R2 = 154;
var P1_R = 124;
var P2_R = 96;
var RoxySynastryChart = class extends import_lit17.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data)
      return import_lit17.html`<div class="roxy-empty" role="status">No synastry data</div>`;
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
      return import_lit17.html`<div
				class="wrap"
				aria-label="Synastry compatibility chart"
			>
				<div class="head">
					<h2 class="title">Synastry</h2>
					${typeof score === "number" ? import_lit17.html`<span class="score" aria-label=${`Score ${score} of 100`}
								>${score} / 100</span
							>` : import_lit17.nothing}
				</div>
				<div class="missing-planets" role="status">
					Synastry response missing planet positions. Pass
					<code>data</code> with <code>person1.planets</code> and
					<code>person2.planets</code> arrays from the natal-chart endpoint, or
					use the <code>&lt;roxy-data&gt;</code> fallback.
				</div>
				${summaryText ? import_lit17.html`<p class="summary">${summaryText}</p>` : import_lit17.nothing}
				${interAspects.length > 0 ? this.renderAspects(interAspects) : import_lit17.nothing}
				${strengths.length > 0 || challenges.length > 0 ? import_lit17.html`<div class="lists">
							${strengths.length ? import_lit17.html`<div>
										<h3>Strengths</h3>
										<ul>
											${strengths.map((s) => import_lit17.html`<li>${s}</li>`)}
										</ul>
									</div>` : import_lit17.nothing}
							${challenges.length ? import_lit17.html`<div>
										<h3>Challenges</h3>
										<ul>
											${challenges.map((s) => import_lit17.html`<li>${s}</li>`)}
										</ul>
									</div>` : import_lit17.nothing}
						</div>` : import_lit17.nothing}
			</div>`;
    }
    return import_lit17.html`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof score === "number" ? import_lit17.html`<span class="score" aria-label=${`Score ${score} of 100`}
							>${score} / 100</span
						>` : import_lit17.nothing}
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
			${summaryText ? import_lit17.html`<p class="summary">${summaryText}</p>` : import_lit17.nothing}
			${interAspects.length > 0 ? this.renderAspects(interAspects) : import_lit17.nothing}
			${strengths.length > 0 || challenges.length > 0 ? import_lit17.html`<div class="lists">
						${strengths.length ? import_lit17.html`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => import_lit17.html`<li>${s}</li>`)}
									</ul>
								</div>` : import_lit17.nothing}
						${challenges.length ? import_lit17.html`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => import_lit17.html`<li>${s}</li>`)}
									</ul>
								</div>` : import_lit17.nothing}
					</div>` : import_lit17.nothing}
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
      return import_lit17.svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
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
      const pos = polarToCartesian(CENTER2, CENTER2, SIGN_R2, angle);
      return import_lit17.svg`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[s]}</text>`;
    });
  }
  renderRing(planets, radius, cls) {
    return planets.map((p) => {
      if (!Number.isFinite(p.longitude)) return import_lit17.nothing;
      const pos = polarToCartesian(
        CENTER2,
        CENTER2,
        radius,
        this.toAngle(p.longitude)
      );
      const glyph = PLANET_GLYPH[capitalize3(p.name)] ?? p.name.slice(0, 2);
      return import_lit17.svg`<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}</title>${glyph}</text>`;
    });
  }
  renderInterAspectLines(p1, p2, aspects) {
    const longitudeOf = (list, name) => {
      const target = capitalize3(name);
      for (const p of list) {
        if (capitalize3(p.name) !== target) continue;
        if (typeof p.longitude === "number") return p.longitude;
      }
      return void 0;
    };
    return aspects.map((a) => {
      const l1 = longitudeOf(p1, a.planet1);
      const l2 = longitudeOf(p2, a.planet2);
      if (l1 === void 0 || l2 === void 0) return import_lit17.nothing;
      const out = polarToCartesian(CENTER2, CENTER2, P1_R - 12, this.toAngle(l1));
      const inn = polarToCartesian(CENTER2, CENTER2, P2_R + 8, this.toAngle(l2));
      const aspectName = normalizeAspect2(a);
      const cls = ASPECT_CLASS2[aspectName] ?? "aspect-other";
      const orbLabel = formatNumber(a.orb, 1);
      return import_lit17.svg`<line class=${`aspect ${cls}`} x1=${out.x} y1=${out.y} x2=${inn.x} y2=${inn.y}><title>${a.planet1} ${aspectName} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}\xB0)` : ""}</title></line>`;
    });
  }
  renderAspects(aspects) {
    return import_lit17.html`<table>
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
      (a) => import_lit17.html`<tr>
						<td>${a.planet1}</td>
						<td>${a.planet2}</td>
						<td>${normalizeAspect2(a) || ""}</td>
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
  import_lit17.css`
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
  (0, import_decorators16.property)({ attribute: false })
], RoxySynastryChart.prototype, "data", 2);
RoxySynastryChart = __decorateClass([
  (0, import_decorators16.customElement)("roxy-synastry-chart")
], RoxySynastryChart);
function capitalize3(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
var ASPECT_CLASS2 = {
  conjunction: "aspect-conjunction",
  sextile: "aspect-sextile",
  square: "aspect-square",
  trine: "aspect-trine",
  opposition: "aspect-opposition"
};
function normalizeAspect2(a) {
  return (a.type ?? "").toLowerCase().replace(/_/g, "-");
}
function formatStrength(s) {
  if (typeof s === "number") return Math.round(s).toString();
  return "";
}

// packages/ui/src/components/tarot-card.ts
var import_lit18 = require("lit");
var import_decorators17 = require("lit/decorators.js");
var RoxyTarotCard = class extends import_lit18.LitElement {
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
      return import_lit18.html`<div class="roxy-empty" role="status">No tarot data</div>`;
    if ("card" in d) return this.renderDailyCard(d);
    return this.renderFullCard(d);
  }
  renderDailyCard(d) {
    const card = d.card;
    const isReversed = this.flipped !== Boolean(card.reversed);
    const keywords = card.keywords ?? [];
    return import_lit18.html`<article class="card" aria-label=${card.name ?? "Tarot card"}>
			<div class="image-wrap">
				${card.imageUrl ? import_lit18.html`<img
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
						/>` : import_lit18.html`<div
							class=${`image ${isReversed ? "reversed" : ""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${card.name ?? "?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${card.arcana ? import_lit18.html`${card.arcana} arcana` : import_lit18.nothing}
					${isReversed ? import_lit18.html` · reversed` : import_lit18.nothing}
				</div>
				<h2 class="title">${card.name ?? "Tarot card"}</h2>
				${d.dailyMessage ? import_lit18.html`<p class="message">${d.dailyMessage}</p>` : import_lit18.nothing}
				${card.meaning ? import_lit18.html`<p>${card.meaning}</p>` : import_lit18.nothing}
				${keywords.length > 0 ? import_lit18.html`<div class="chips">
							${keywords.map((k) => import_lit18.html`<span>${k}</span>`)}
						</div>` : import_lit18.nothing}
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
    return import_lit18.html`<article class="card" aria-label=${d.name ?? "Tarot card"}>
			<div class="image-wrap">
				${d.imageUrl ? import_lit18.html`<img
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
						/>` : import_lit18.html`<div
							class=${`image ${isReversed ? "reversed" : ""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${d.name ?? "?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${d.arcana ? import_lit18.html`${d.arcana} arcana` : import_lit18.nothing}
					${d.number !== void 0 && d.number !== null ? import_lit18.html` · ${d.number}` : import_lit18.nothing}
					${isReversed ? import_lit18.html` · reversed` : import_lit18.nothing}
				</div>
				<h2 class="title">${d.name ?? "Tarot card"}</h2>
				${orientedMeaning?.description ? import_lit18.html`<p>${orientedMeaning.description}</p>` : import_lit18.nothing}
				${keywords.length > 0 ? import_lit18.html`<div class="chips">
							${keywords.map((k) => import_lit18.html`<span>${k}</span>`)}
						</div>` : import_lit18.nothing}
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
  import_lit18.css`
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
  (0, import_decorators17.property)({ attribute: false })
], RoxyTarotCard.prototype, "data", 2);
__decorateClass([
  (0, import_decorators17.state)()
], RoxyTarotCard.prototype, "flipped", 2);
RoxyTarotCard = __decorateClass([
  (0, import_decorators17.customElement)("roxy-tarot-card")
], RoxyTarotCard);

// packages/ui/src/components/tarot-spread.ts
var import_lit19 = require("lit");
var import_decorators18 = require("lit/decorators.js");
var RoxyTarotSpread = class extends import_lit19.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.spread = "three-card";
  }
  render() {
    const d = this.data;
    if (!d)
      return import_lit19.html`<div class="roxy-empty" role="status">No tarot spread</div>`;
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
    return import_lit19.html`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${spreadLabel}</h2>
				${question ? import_lit19.html`<span class="question">"${question}"</span>` : import_lit19.nothing}
			</header>
			${isYesNo ? import_lit19.html`<div>
						<span class=${`answer ${answerClass}`}>${answer}</span>
						${strength ? import_lit19.html`<small> · ${strength}</small>` : import_lit19.nothing}
					</div>` : import_lit19.nothing}
			${positions.length > 0 ? import_lit19.html`<div class="grid">
						${positions.map(
      (p) => import_lit19.html`<div class="card">
								<p class="label">${p.name ?? ""}</p>
								<div class="image">
									${p.card?.imageUrl ? import_lit19.html`<img
												src=${p.card.imageUrl}
												alt=${p.card.name ?? "tarot card"}
												class=${p.card.reversed ? "reversed" : ""}
											/>` : import_lit19.html`${p.card?.name ?? "?"}`}
								</div>
								<p class="name">
									${p.card?.name ?? ""}
									${p.card?.reversed ? import_lit19.html`<small>(reversed)</small>` : import_lit19.nothing}
								</p>
								${p.interpretation ? import_lit19.html`<p class="interp">${p.interpretation}</p>` : import_lit19.nothing}
							</div>`
    )}
					</div>` : import_lit19.nothing}
			${cards.length > 0 ? import_lit19.html`<div class="grid">
						${cards.map(
      (c) => import_lit19.html`<div class="card">
								<div class="image">
									${c.imageUrl ? import_lit19.html`<img
												src=${c.imageUrl}
												alt=${c.name ?? "tarot card"}
												class=${c.reversed ? "reversed" : ""}
											/>` : import_lit19.html`${c.name ?? "?"}`}
								</div>
								<p class="name">
									${c.name ?? ""}
									${c.reversed ? import_lit19.html`<small>(reversed)</small>` : import_lit19.nothing}
								</p>
								${c.meaning ? import_lit19.html`<p class="interp">${c.meaning}</p>` : import_lit19.nothing}
							</div>`
    )}
					</div>` : import_lit19.nothing}
			${summary ? import_lit19.html`<p class="reading">${summary}</p>` : import_lit19.nothing}
			${yesNoInterp ? import_lit19.html`<p class="reading">${yesNoInterp}</p>` : import_lit19.nothing}
		</article>`;
  }
};
RoxyTarotSpread.styles = [
  baseStyles,
  import_lit19.css`
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
  (0, import_decorators18.property)({ attribute: false })
], RoxyTarotSpread.prototype, "data", 2);
__decorateClass([
  (0, import_decorators18.property)({ type: String, reflect: true })
], RoxyTarotSpread.prototype, "spread", 2);
RoxyTarotSpread = __decorateClass([
  (0, import_decorators18.customElement)("roxy-tarot-spread")
], RoxyTarotSpread);

// packages/ui/src/components/vedic-kundli.ts
var import_lit20 = require("lit");
var import_decorators19 = require("lit/decorators.js");
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
var RASHI_KEYS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces"
];
var RASHI_TO_SIGN = {
  aries: "Aries",
  taurus: "Taurus",
  gemini: "Gemini",
  cancer: "Cancer",
  leo: "Leo",
  virgo: "Virgo",
  libra: "Libra",
  scorpio: "Scorpio",
  sagittarius: "Sagittarius",
  capricorn: "Capricorn",
  aquarius: "Aquarius",
  pisces: "Pisces"
};
var RoxyVedicKundli = class extends import_lit20.LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.chartStyle = "south";
  }
  buildHouses() {
    if (!this.data) return [];
    const data = this.data;
    const houses = [];
    for (let i = 0; i < 12; i++) {
      const key = RASHI_KEYS[i];
      const bucket = data[key];
      const planets = (bucket?.signs ?? []).map((p) => p.graha).filter(Boolean);
      houses.push({
        house: i + 1,
        sign: RASHI_TO_SIGN[key] ?? "",
        planets
      });
    }
    return houses;
  }
  render() {
    if (!this.data)
      return import_lit20.html`<div class="roxy-empty" role="status">No kundli data</div>`;
    const houses = this.buildHouses();
    return import_lit20.html`<div class="wrap">
			<h2 class="title">Vedic kundli</h2>
			<svg
				viewBox="0 0 300 300"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
				<polygon
					class="line"
					points="220,80 220,220 80,220 80,80"
					stroke-width="1"
					fill="none"
				/>
				<line class="line" x1="150" y1="10" x2="80" y2="80" stroke-width="1" />
				<line class="line" x1="150" y1="10" x2="220" y2="80" stroke-width="1" />
				<line class="line" x1="290" y1="150" x2="220" y2="80" stroke-width="1" />
				<line class="line" x1="290" y1="150" x2="220" y2="220" stroke-width="1" />
				<line class="line" x1="150" y1="290" x2="220" y2="220" stroke-width="1" />
				<line class="line" x1="150" y1="290" x2="80" y2="220" stroke-width="1" />
				<line class="line" x1="10" y1="150" x2="80" y2="220" stroke-width="1" />
				<line class="line" x1="10" y1="150" x2="80" y2="80" stroke-width="1" />
				${houses.map((h) => this.renderHouseGroup(h))}
			</svg>
		</div>`;
  }
  isLagna(h) {
    const ascSign = this.data?.meta?.Lagna?.rashi;
    if (!ascSign) return false;
    return ascSign.toLowerCase() === h.sign.toLowerCase();
  }
  renderHouseGroup(h) {
    const center = SOUTH_HOUSE_CENTERS[h.house];
    const signPos = SOUTH_SIGN_POSITIONS[h.house];
    if (!center || !signPos) return import_lit20.nothing;
    const signAbbr = SIGN_ABBR[h.sign] ?? "";
    const planets = h.planets ?? [];
    const isLagna = this.isLagna(h);
    return import_lit20.svg`
			<g>
				${isLagna ? import_lit20.svg`<rect class="lagna-bg" x=${center.x - 30} y=${center.y - 28} width="60" height="56" rx="6" />` : import_lit20.nothing}
				${signAbbr ? import_lit20.svg`<text class="sign-text" x=${signPos.x} y=${signPos.y} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>` : import_lit20.nothing}
				${isLagna ? import_lit20.svg`<text class="lagna-marker" x=${center.x} y=${center.y - 18} text-anchor="middle" dominant-baseline="central">LAGNA</text>` : import_lit20.nothing}
				${planets.map((planet, j) => {
      const abbr = PLANET_ABBR[capitalize4(planet)] ?? planet.slice(0, 2);
      const lineHeight = 13;
      const baseY = isLagna ? center.y + 8 : center.y;
      const startY = baseY - (planets.length - 1) * lineHeight / 2;
      const yPos = startY + j * lineHeight;
      return import_lit20.svg`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
    })}
			</g>
		`;
  }
};
RoxyVedicKundli.styles = [
  baseStyles,
  import_lit20.css`
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
  (0, import_decorators19.property)({ attribute: false })
], RoxyVedicKundli.prototype, "data", 2);
__decorateClass([
  (0, import_decorators19.property)({ type: String, reflect: true, attribute: "chart-style" })
], RoxyVedicKundli.prototype, "chartStyle", 2);
RoxyVedicKundli = __decorateClass([
  (0, import_decorators19.customElement)("roxy-vedic-kundli")
], RoxyVedicKundli);
function capitalize4(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// packages/ui/src/manifest.ts
var ROXY_COMPONENTS = [
  {
    pascal: "RoxyNatalChart",
    tag: "roxy-natal-chart",
    slug: "natal-chart",
    domain: "astrology",
    heading: "Natal chart",
    endpoints: ["astrology.generateNatalChart"],
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
    domain: "astrology",
    heading: "Daily horoscope",
    endpoints: [
      "astrology.getDailyHoroscope",
      "astrology.getWeeklyHoroscope",
      "astrology.getMonthlyHoroscope"
    ],
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
    domain: "astrology",
    heading: "Synastry",
    endpoints: ["astrology.calculateSynastry"],
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
    domain: "astrology",
    heading: "Compatibility score",
    endpoints: [
      "astrology.calculateCompatibility",
      "numerology.calculateNumCompatibility",
      "biorhythm.calculateBioCompatibility"
    ],
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
    domain: "astrology",
    heading: "Moon phase",
    endpoints: [
      "astrology.getCurrentMoonPhase",
      "astrology.getUpcomingMoonPhases",
      "astrology.getMoonCalendar"
    ],
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
    domain: "vedic",
    heading: "Vedic kundli",
    endpoints: ["vedicAstrology.generateBirthChart"],
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
    domain: "vedic",
    heading: "Panchang",
    endpoints: [
      "vedicAstrology.getBasicPanchang",
      "vedicAstrology.getDetailedPanchang"
    ],
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
    domain: "vedic",
    heading: "Vimshottari dasha",
    endpoints: [
      "vedicAstrology.getCurrentDasha",
      "vedicAstrology.getMajorDashas",
      "vedicAstrology.getSubDashas"
    ],
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
    domain: "vedic",
    heading: "Manglik dosha",
    endpoints: [
      "vedicAstrology.checkManglikDosha",
      "vedicAstrology.checkKalsarpaDosha",
      "vedicAstrology.checkSadhesati"
    ],
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
    domain: "vedic",
    heading: "Guna milan",
    endpoints: ["vedicAstrology.calculateGunMilan"],
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
    domain: "vedic",
    heading: "KP planets",
    endpoints: ["vedicAstrology.getKpPlanets"],
    description: "KP planets table with sub-lord and sub-sub-lord columns",
    docsLabel: "Vedic (KP)",
    endpointLabel: "POST /vedic-astrology/kp/planets",
    docsSummary: "Sub-lord and sub-sub-lord columns",
    topic: "Vedic"
  },
  {
    pascal: "RoxyNumerologyCard",
    tag: "roxy-numerology-card",
    slug: "numerology-card",
    domain: "numerology",
    heading: "Life path number",
    endpoints: [
      "numerology.calculateLifePath",
      "numerology.calculateExpression",
      "numerology.calculatePersonalYear",
      "numerology.generateNumerologyChart"
    ],
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
    domain: "tarot",
    heading: "Daily tarot card",
    endpoints: ["tarot.getCard", "tarot.getDailyCard"],
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
    domain: "tarot",
    heading: "Three-card spread",
    endpoints: [
      "tarot.castThreeCard",
      "tarot.castCelticCross",
      "tarot.castLoveSpread",
      "tarot.castYesNo",
      "tarot.drawCards"
    ],
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
    domain: "biorhythm",
    heading: "Daily biorhythm",
    endpoints: [
      "biorhythm.getDailyBiorhythm",
      "biorhythm.getForecast",
      "biorhythm.getCriticalDays"
    ],
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
    domain: "iching",
    heading: "I Ching hexagram",
    endpoints: [
      "iching.getHexagram",
      "iching.castReading",
      "iching.getDailyHexagram",
      "iching.castDailyReading",
      "iching.getRandomHexagram"
    ],
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
    domain: "utility",
    heading: "Schema-driven form",
    endpoints: [],
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
    domain: "utility",
    heading: "City search",
    endpoints: ["location.searchCities"],
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
    domain: "utility",
    heading: "Generic renderer",
    endpoints: [],
    description: "Generic fallback renderer for any OpenAPI response shape",
    docsLabel: "Helper",
    endpointLabel: "Any response shape",
    docsSummary: "Generic fallback renderer for unknown shapes",
    topic: "Helpers",
    selfFetching: true
  }
];

// packages/ui/src/version.ts
var ROXY_UI_VERSION = "0.1.2";

// packages/ui/src/index.ts
var ROXY_UI_COMPONENTS = ROXY_COMPONENTS.map((c) => c.slug);
//# sourceMappingURL=index.cjs.map
