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

// packages/ui/src/components/biorhythm-chart.ts
import { css as css2, html, LitElement, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

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
var RoxyBiorhythmChart = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "daily";
  }
  render() {
    const d = this.data;
    if (!d)
      return html`<div class="roxy-empty" role="status">No biorhythm data</div>`;
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
    return html`<section class="wrap" aria-label="Daily biorhythm">
			<header class="head">
				<h2 class="title">Biorhythm</h2>
				${typeof d.energyRating === "number" ? html`<span class="energy">Energy ${d.energyRating}/10</span>` : nothing}
			</header>
			<div class="bars" role="list">
				${entries.map(([cycle, v]) => {
      const pct = (v + 1) / 2 * 100;
      const color = CYCLE_COLOR[cycle] ?? "var(--roxy-accent, #f59e0b)";
      return html`<div class="bar" role="listitem">
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
			${d.dailyMessage ? html`<p class="advice">${d.dailyMessage}</p>` : nothing}
			${d.advice ? html`<p class="advice">${d.advice}</p>` : nothing}
		</section>`;
  }
  renderForecast(d) {
    const days = d.days ?? [];
    if (days.length === 0)
      return html`<div class="roxy-empty" role="status">No forecast</div>`;
    const w = 600;
    const h = 160;
    const xStep = w / Math.max(days.length - 1, 1);
    const cycleKeys = [
      "physical",
      "emotional",
      "intellectual",
      "intuitive"
    ];
    return html`<section class="wrap" aria-label="Biorhythm forecast">
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
			${d.summary?.periodAdvice ? html`<p class="advice">${d.summary.periodAdvice}</p>` : nothing}
		</section>`;
  }
  renderCritical(d) {
    return html`<section class="wrap" aria-label="Critical days">
			<header class="head">
				<h2 class="title">Critical days</h2>
				<span class="energy">${d.totalCriticalDays} total</span>
			</header>
			<div>
				${d.criticalDays.map(
      (day) => html`<span class="crit"
						>${day.date} · ${day.cycle} ${day.severity}</span
					>`
    )}
			</div>
		</section>`;
  }
};
RoxyBiorhythmChart.styles = [
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
  property({ attribute: false })
], RoxyBiorhythmChart.prototype, "data", 2);
__decorateClass([
  property({ type: String, reflect: true })
], RoxyBiorhythmChart.prototype, "mode", 2);
RoxyBiorhythmChart = __decorateClass([
  customElement("roxy-biorhythm-chart")
], RoxyBiorhythmChart);

// packages/ui/src/components/compatibility-card.ts
import { css as css3, html as html2, LitElement as LitElement2, nothing as nothing2 } from "lit";
import { customElement as customElement2, property as property2 } from "lit/decorators.js";

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
var RoxyCompatibilityCard = class extends LitElement2 {
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
      return html2`<div class="roxy-empty" role="status">No compatibility data</div>`;
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
    return html2`<article
			class="card"
			aria-label=${`Compatibility (${this.mode})`}
		>
			<div class="head">
				<h2>${this.mode} compatibility</h2>
				<div>
					${typeof score === "number" ? html2`<div class="score">${formatNumber(score, 0)}</div>` : nothing2}
					${rating ? html2`<div class="rating">${rating}</div>` : nothing2}
				</div>
			</div>

			${Object.keys(breakdown).length > 0 ? html2`<div role="list">
						${Object.entries(breakdown).map(
      ([k, v]) => html2`<div class="bar-row" role="listitem">
								<span style="text-transform: capitalize">${k}</span>
								<span class="bar"
									><span style="width: ${Math.max(0, Math.min(100, v))}%"></span
								></span>
								<span>${formatNumber(v, 0)}</span>
							</div>`
    )}
					</div>` : nothing2}
			${archetype ? html2`<p>
						<span class="archetype">${archetype.label}</span>
						${archetype.description ? html2` · ${archetype.description}` : nothing2}
					</p>` : nothing2}
			${summary ? html2`<p>${summary}</p>` : nothing2}
			${interpretation && !summary ? html2`<p>${interpretation}</p>` : nothing2}
			${advice ? html2`<p>${advice}</p>` : nothing2}
			${(strengths?.length ?? 0) > 0 || (challenges?.length ?? 0) > 0 ? html2`<div class="lists">
						${strengths?.length ? html2`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => html2`<li>${s}</li>`)}
									</ul>
								</div>` : nothing2}
						${challenges?.length ? html2`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => html2`<li>${s}</li>`)}
									</ul>
								</div>` : nothing2}
					</div>` : nothing2}
			${keyAspects?.length ? html2`<div>
						<h3 style="margin: 0 0 0.25rem; font-size: var(--roxy-text-xs); color: var(--roxy-muted); text-transform: uppercase; letter-spacing: 0.06em;">Key aspects</h3>
						<ul style="margin: 0; padding-left: 1rem; font-size: var(--roxy-text-sm);">
							${keyAspects.slice(0, 6).map((a) => html2`<li>${formatAspect(a)}</li>`)}
						</ul>
					</div>` : nothing2}
		</article>`;
  }
};
RoxyCompatibilityCard.styles = [
  baseStyles,
  css3`
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
  property2({ attribute: false })
], RoxyCompatibilityCard.prototype, "data", 2);
__decorateClass([
  property2({ type: String, reflect: true })
], RoxyCompatibilityCard.prototype, "mode", 2);
RoxyCompatibilityCard = __decorateClass([
  customElement2("roxy-compatibility-card")
], RoxyCompatibilityCard);
function formatAspect(a) {
  const aspect = a.type.toLowerCase().replace(/_/g, "-");
  const orb = typeof a.orb === "number" ? ` (orb ${formatNumber(a.orb, 1)}\xB0)` : "";
  const head = [a.planet1, aspect, a.planet2].filter(Boolean).join(" ");
  return a.description ? `${head}${orb} \xB7 ${a.description}` : `${head}${orb}`;
}

// packages/ui/src/components/dasha-timeline.ts
import { css as css4, html as html3, LitElement as LitElement3, nothing as nothing3 } from "lit";
import { customElement as customElement3, property as property3 } from "lit/decorators.js";
var RoxyDashaTimeline = class extends LitElement3 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.period = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return html3`<div class="roxy-empty" role="status">No dasha data</div>`;
    const periods = this.collectPeriods(d);
    const maxYears = periods.length ? Math.max(...periods.map((p) => p.durationYears)) : 0;
    return html3`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period === "major" ? "Vimshottari Mahadasha" : this.period === "sub" ? "Antardasha" : "Active dashas"}
				</h2>
				${"nakshatraName" in d && d.nakshatraName ? html3`<div class="nakshatra">
						Moon nakshatra: ${d.nakshatraName}
						${"nakshatraLord" in d && d.nakshatraLord ? html3`(lord ${d.nakshatraLord})` : nothing3}
					</div>` : nothing3}
			</header>

			${this.period === "current" ? this.renderCurrent(d) : nothing3}
			${periods.length > 0 ? html3`<div class="timeline" role="list">
						${periods.map((p) => this.renderBar(p, maxYears))}
					</div>` : nothing3}
		</div>`;
  }
  renderCurrent(d) {
    if (!("mahadasha" in d)) return nothing3;
    return html3`<div class="current">
			${"mahadasha" in d && d.mahadasha ? html3`<div>
					<span>Mahadasha</span>
					<strong>${d.mahadasha.planet}</strong>
					${"remainingInMahadasha" in d && d.remainingInMahadasha ? html3`<small>${formatNumber(d.remainingInMahadasha.years + d.remainingInMahadasha.months / 12, 1)} years left</small>` : nothing3}
				</div>` : nothing3}
			${"antardasha" in d && d.antardasha ? html3`<div>
					<span>Antardasha</span>
					<strong>${d.antardasha.planet}</strong>
					${"remainingInAntardasha" in d && d.remainingInAntardasha ? html3`<small>${formatNumber(d.remainingInAntardasha.years + d.remainingInAntardasha.months / 12, 1)} years left</small>` : nothing3}
				</div>` : nothing3}
			${"pratyantardasha" in d && d.pratyantardasha ? html3`<div>
					<span>Pratyantardasha</span>
					<strong>${d.pratyantardasha.planet}</strong>
					${"remainingInPratyantardasha" in d && d.remainingInPratyantardasha ? html3`<small>${formatNumber(d.remainingInPratyantardasha.years + d.remainingInPratyantardasha.months / 12, 1)} years left</small>` : nothing3}
				</div>` : nothing3}
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
    return html3`<div class="bar" role="listitem">
			<span>${p.planet}</span>
			<span class="bar-track"><span style="width: ${width}%"></span></span>
			<span class="dates">
				${p.startDate ? formatYear(p.startDate) : ""}
				${p.endDate ? html3`- ${formatYear(p.endDate)}` : ""}
			</span>
		</div>`;
  }
};
RoxyDashaTimeline.styles = [
  baseStyles,
  css4`
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
  property3({ attribute: false })
], RoxyDashaTimeline.prototype, "data", 2);
__decorateClass([
  property3({ type: String, reflect: true })
], RoxyDashaTimeline.prototype, "period", 2);
RoxyDashaTimeline = __decorateClass([
  customElement3("roxy-dasha-timeline")
], RoxyDashaTimeline);
function formatYear(s) {
  const m = s.match(/^(\d{4})/);
  return m ? m[1] : s;
}

// packages/ui/src/components/data.ts
import { css as css5, html as html4, LitElement as LitElement4, nothing as nothing4 } from "lit";
import { customElement as customElement4, property as property4 } from "lit/decorators.js";
var TITLE_KEYS = ["title", "name", "label", "heading", "overview", "summary"];
var IMAGE_KEYS = ["imageUrl", "image", "icon", "symbol"];
var SKIP_KEYS = ["imageUrl", "image"];
var RoxyData = class extends LitElement4 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (this.data == null) {
      return html4`<div class="roxy-empty" role="status">No data</div>`;
    }
    return html4`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`;
  }
  renderValue(value) {
    if (value === null || value === void 0) return nothing4;
    if (typeof value === "string") return html4`<p>${value}</p>`;
    if (typeof value === "number" || typeof value === "boolean") {
      return html4`<p>${String(value)}</p>`;
    }
    if (Array.isArray(value)) return this.renderArray(value);
    return this.renderObject(value);
  }
  renderArray(arr) {
    if (arr.length === 0) {
      return html4`<div class="roxy-empty" role="status">Empty list</div>`;
    }
    const allPrimitive = arr.every(
      (v) => v === null || ["string", "number", "boolean"].includes(typeof v)
    );
    if (allPrimitive) {
      return html4`<ul class="roxy-chips">
				${arr.map((v) => html4`<li>${String(v)}</li>`)}
			</ul>`;
    }
    const allObjects = arr.every(
      (v) => v !== null && typeof v === "object" && !Array.isArray(v)
    );
    if (allObjects) return this.renderTable(arr);
    return html4`<ol>
			${arr.map((v) => html4`<li>${this.renderValue(v)}</li>`)}
		</ol>`;
  }
  renderTable(rows) {
    const keys = this.collectKeys(rows);
    return html4`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${keys.map((k) => html4`<th>${this.humanize(k)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${rows.map(
      (row) => html4`<tr>
						${keys.map((k) => html4`<td>${this.formatPrimitive(row[k])}</td>`)}
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
    return html4`
			${imageKey ? html4`<img
						class="roxy-image"
						src=${String(obj[imageKey])}
						alt=${titleKey ? String(obj[titleKey]) : "illustration"}
						loading="lazy"
					/>` : nothing4}
			${titleKey ? html4`<h3 class="roxy-title">${obj[titleKey]}</h3>` : nothing4}
			${summaryKey ? html4`<p class="roxy-summary">${obj[summaryKey]}</p>` : nothing4}
			${rows.length > 0 ? html4`<dl class="roxy-rows">
						${rows.map(
      ([k, v]) => html4`
								<dt>${this.humanize(k)}</dt>
								<dd>${this.renderField(v)}</dd>
							`
    )}
					</dl>` : nothing4}
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
        return html4`<ul class="roxy-chips">
					${value.map((v) => html4`<li>${String(v)}</li>`)}
				</ul>`;
      }
    }
    return html4`<roxy-data .data=${value}></roxy-data>`;
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
  css5`
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
  property4({ attribute: false })
], RoxyData.prototype, "data", 2);
RoxyData = __decorateClass([
  customElement4("roxy-data")
], RoxyData);

// packages/ui/src/components/dosha-card.ts
import { css as css6, html as html5, LitElement as LitElement5, nothing as nothing5 } from "lit";
import { customElement as customElement5, property as property5 } from "lit/decorators.js";
var DOSHA_LABELS = {
  manglik: "Mangal Dosha",
  kalsarpa: "Kaal Sarp Dosha",
  sadhesati: "Sade Sati"
};
var RoxyDoshaCard = class extends LitElement5 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.type = "manglik";
  }
  render() {
    const d = this.data;
    if (!d)
      return html5`<div class="roxy-empty" role="status">No dosha data</div>`;
    const present = !!d.present;
    const label = DOSHA_LABELS[this.type] ?? this.type;
    const sevClass = (d.severity ?? "").toLowerCase();
    return html5`<article
			class="card"
			aria-label=${label}
		>
			<header class="head">
				<h2 class="title">${label}</h2>
				<div style="display:flex; gap:0.5rem; align-items:center;">
					<span class=${`badge ${present ? "present" : "absent"}`}>
						${present ? "Present" : "Absent"}
					</span>
					${d.severity ? html5`<span
								class=${`severity ${sevClass}`}
								role="img"
								aria-label=${`Severity ${d.severity}`}
							>
								<span></span><span></span><span></span>
							</span>` : nothing5}
				</div>
			</header>
			${d.description ? html5`<p class="description">${d.description}</p>` : nothing5}
			${this.renderEffects(d)}
			${d.remedies && d.remedies.length > 0 ? html5`<div>
						<h3>Remedies</h3>
						<ul>
							${d.remedies.map((r) => html5`<li>${r}</li>`)}
						</ul>
					</div>` : nothing5}
			${"exceptions" in d && d.exceptions && d.exceptions.length > 0 ? html5`<div>
					<h3>Exceptions</h3>
					<ul>
						${d.exceptions.map((r) => html5`<li>${r}</li>`)}
					</ul>
				</div>` : nothing5}
		</article>`;
  }
  renderEffects(d) {
    if (!d.effects) return nothing5;
    const entries = Object.entries(d.effects).filter(
      ([, v]) => typeof v === "string" && v.length > 0
    );
    if (entries.length === 0) return nothing5;
    return html5`<div class="effects">
			${entries.map(
      ([k, v]) => html5`<div>
					<h3>${k}</h3>
					<p>${v}</p>
				</div>`
    )}
		</div>`;
  }
};
RoxyDoshaCard.styles = [
  baseStyles,
  css6`
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
  property5({ attribute: false })
], RoxyDoshaCard.prototype, "data", 2);
__decorateClass([
  property5({ type: String, reflect: true })
], RoxyDoshaCard.prototype, "type", 2);
RoxyDoshaCard = __decorateClass([
  customElement5("roxy-dosha-card")
], RoxyDoshaCard);

// packages/ui/src/components/endpoint-form.ts
import { css as css7, html as html6, LitElement as LitElement6, nothing as nothing6 } from "lit";
import { customElement as customElement6, property as property6, state } from "lit/decorators.js";
var RoxyEndpointForm = class extends LitElement6 {
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
    try {
      const res = await fetch(this.specUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const spec = await res.json();
      const path = `/${this.endpoint.replace(/^\//, "")}`;
      const op = spec.paths?.[path]?.[this.method.toLowerCase()];
      if (!op) return;
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
    } catch (_err) {
      this.loaded = true;
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
      return html6`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;
    }
    const renderField = (f) => {
      if (this.hasLocation && (f.name === "latitude" || f.name === "longitude" || f.name === "timezone")) {
        return nothing6;
      }
      const inputId = `roxy-form-${f.name}`;
      return html6`<div class="field">
				<label for=${inputId}>
					${humanize(f.name)}${f.required ? html6`<span class="req" aria-hidden="true">*</span>` : nothing6}
				</label>
				${f.enum ? html6`<select
							id=${inputId}
							?required=${f.required}
							@change=${(e) => this.setValue(f.name, e.target.value)}
						>
							<option value="">Choose</option>
							${f.enum.map(
        (opt) => html6`<option value=${opt} ?selected=${this.values[f.name] === opt}>
									${opt}
								</option>`
      )}
						</select>` : html6`<input
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
				${f.description ? html6`<small class="help">${f.description}</small>` : nothing6}
			</div>`;
    };
    return html6`<form @submit=${this.onSubmit}>
			<h2 class="title">${humanize(this.endpoint.split("/").pop() ?? "")}</h2>
			${this.hasLocation ? html6`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>` : nothing6}
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
  css7`
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
		`
];
__decorateClass([
  property6({ type: String, attribute: "data-endpoint" })
], RoxyEndpointForm.prototype, "endpoint", 2);
__decorateClass([
  property6({ type: String })
], RoxyEndpointForm.prototype, "method", 2);
__decorateClass([
  property6({ type: String, attribute: "spec-url" })
], RoxyEndpointForm.prototype, "specUrl", 2);
__decorateClass([
  property6({ type: String, attribute: "submit-label" })
], RoxyEndpointForm.prototype, "submitLabel", 2);
__decorateClass([
  state()
], RoxyEndpointForm.prototype, "fields", 2);
__decorateClass([
  state()
], RoxyEndpointForm.prototype, "values", 2);
__decorateClass([
  state()
], RoxyEndpointForm.prototype, "hasLocation", 2);
__decorateClass([
  state()
], RoxyEndpointForm.prototype, "loaded", 2);
RoxyEndpointForm = __decorateClass([
  customElement6("roxy-endpoint-form")
], RoxyEndpointForm);
function humanize(s) {
  return s.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
}

// packages/ui/src/components/guna-milan.ts
import { css as css8, html as html7, LitElement as LitElement7, nothing as nothing7 } from "lit";
import { customElement as customElement7, property as property7 } from "lit/decorators.js";
var RoxyGunaMilan = class extends LitElement7 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    const d = this.data;
    if (!d)
      return html7`<div class="roxy-empty" role="status">No Guna Milan data</div>`;
    const breakdown = (d.breakdown ?? []).filter(
      (b) => b?.category !== void 0
    );
    return html7`<article class="card" aria-label="Guna Milan score">
			<div class="score-bar">
				<div>
					<span class="total">${formatNumber(d.total, 1)}</span>
					<span class="over"> / ${d.maxScore}</span>
					${typeof d.percentage === "number" ? html7`<small style="margin-left: 0.5rem; color: var(--roxy-muted)">
								${formatPercent(d.percentage, 1)}
							</small>` : nothing7}
				</div>
				${d.recommendation ? html7`<span class="recommendation">${d.recommendation}</span>` : nothing7}
			</div>

			${breakdown.length > 0 ? html7`<table>
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
      return html7`<tr>
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
					</table>` : nothing7}
			${(d.doshas?.length ?? 0) > 0 || (d.doshaCancellations?.length ?? 0) > 0 ? html7`<div class="tags">
						${d.doshas?.map((x) => html7`<span class="dosha">${x}</span>`)}
						${d.doshaCancellations?.map(
      (x) => html7`<span class="cancel" title=${x.reason}>${x.dosha} cancelled</span>`
    )}
					</div>` : nothing7}
		</article>`;
  }
};
RoxyGunaMilan.styles = [
  baseStyles,
  css8`
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
  property7({ attribute: false })
], RoxyGunaMilan.prototype, "data", 2);
RoxyGunaMilan = __decorateClass([
  customElement7("roxy-guna-milan")
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
import { css as css9, html as html8, LitElement as LitElement8, nothing as nothing8, svg as svg2 } from "lit";
import { customElement as customElement8, property as property8 } from "lit/decorators.js";

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
var RoxyHexagram = class extends LitElement8 {
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
      return html8`<div class="roxy-empty" role="status">No hexagram data</div>`;
    const {
      hex: h,
      lines: castLines,
      changingLinePositions,
      dailyMessage,
      resultingHexagram
    } = resolved;
    const lines = castLines ?? this.derivedLines(h);
    const changing = new Set(changingLinePositions ?? []);
    return html8`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
				${h.symbol ? html8`<div class="symbol">${h.symbol}</div>` : nothing8}
				<div class="lines" aria-hidden="true">
					${lines.slice().reverse().map((l, idx) => {
      const realIdx = lines.length - 1 - idx + 1;
      const isChanging = changing.has(realIdx);
      const broken = l === 6 || l === 8;
      const cls = `${broken ? "broken" : "solid"}${isChanging ? " changing" : ""}`;
      return html8`<div class="line ${cls}">
								${broken ? svg2`<span class="seg"></span><span class="seg"></span>` : svg2`<span class="seg"></span>`}
							</div>`;
    })}
				</div>
			</div>
			<div>
				<h2 class="title">
					${h.number ? html8`${h.number}. ` : nothing8}${h.english ?? h.chinese ?? "Hexagram"}
				</h2>
				<p class="subtitle">
					${h.chinese ? html8`${h.chinese}` : nothing8}
					${h.pinyin ? html8` · ${h.pinyin}` : nothing8}
				</p>
				<div class="trigrams">
					${h.upperTrigram ? html8`<div>
								Upper
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.upperTrigram] ?? ""}</span
								>${h.upperTrigram}
							</div>` : nothing8}
					${h.lowerTrigram ? html8`<div>
								Lower
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.lowerTrigram] ?? ""}</span
								>${h.lowerTrigram}
							</div>` : nothing8}
				</div>
				${h.judgment ? html8`<p class="judgment">${h.judgment}</p>` : nothing8}
				${h.image ? html8`<p class="image">${h.image}</p>` : nothing8}
				${dailyMessage ? html8`<p class="message">${dailyMessage}</p>` : nothing8}
				${h.interpretation?.general ? html8`<p>${h.interpretation.general}</p>` : nothing8}
				${changing.size > 0 ? html8`<div class="changing">
							Changing lines: ${Array.from(changing).sort((a, b) => a - b).join(", ")}.
							${resultingHexagram?.english ? html8` Becomes hexagram ${resultingHexagram.number}
										${resultingHexagram.english}.` : nothing8}
						</div>` : nothing8}
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
  css9`
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
  property8({ attribute: false })
], RoxyHexagram.prototype, "data", 2);
__decorateClass([
  property8({ type: String, reflect: true })
], RoxyHexagram.prototype, "mode", 2);
RoxyHexagram = __decorateClass([
  customElement8("roxy-hexagram")
], RoxyHexagram);

// packages/ui/src/components/horoscope-card.ts
import { css as css10, html as html9, LitElement as LitElement9, nothing as nothing9 } from "lit";
import { customElement as customElement9, property as property9 } from "lit/decorators.js";
var RoxyHoroscopeCard = class extends LitElement9 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.period = "daily";
  }
  render() {
    const d = this.data;
    if (!d)
      return html9`<div class="roxy-empty" role="status">No horoscope data</div>`;
    const sign = d.sign ?? "";
    const glyph = sign ? SIGN_GLYPH[capitalize(sign)] ?? "" : "";
    const energy = "energyRating" in d && typeof d.energyRating === "number" ? d.energyRating : null;
    const dateLabel = "date" in d && d.date || "week" in d && d.week || "month" in d && d.month || "";
    return html9`<article
			class="card"
			aria-label=${`${this.period} horoscope for ${sign}`}
		>
			<header class="head">
				<span class="glyph" aria-hidden="true">${glyph}</span>
				<div>
					<h2 class="title">${sign} ${this.period}</h2>
					${dateLabel ? html9`<div class="date">${dateLabel}</div>` : nothing9}
				</div>
				${energy !== null ? html9`<span class="energy" aria-label=${`Energy ${energy} of 10`}>
							Energy ${energy}/10
							<span class="energy-bar"
								><span style="width: ${energy / 10 * 100}%"></span
							></span>
						</span>` : nothing9}
			</header>

			${d.overview ? html9`<p class="overview">${d.overview}</p>` : nothing9}

			<div class="sections">
				${d.love ? html9`<div class="section">
							<h3>Love</h3>
							<p>${d.love}</p>
						</div>` : nothing9}
				${d.career ? html9`<div class="section">
							<h3>Career</h3>
							<p>${d.career}</p>
						</div>` : nothing9}
				${d.health ? html9`<div class="section">
							<h3>Health</h3>
							<p>${d.health}</p>
						</div>` : nothing9}
				${d.finance ? html9`<div class="section">
							<h3>Finance</h3>
							<p>${d.finance}</p>
						</div>` : nothing9}
				${"advice" in d && d.advice ? html9`<div class="section">
							<h3>Advice</h3>
							<p>${d.advice}</p>
						</div>` : nothing9}
			</div>

			${(() => {
      const luckyNumber = "luckyNumber" in d && d.luckyNumber !== void 0 ? d.luckyNumber : void 0;
      const luckyColor = "luckyColor" in d && d.luckyColor ? d.luckyColor : "";
      const luckyNumbers = "luckyNumbers" in d && d.luckyNumbers ? d.luckyNumbers : [];
      const luckyDays = "luckyDays" in d && d.luckyDays ? d.luckyDays : [];
      const compatibleSigns = d.compatibleSigns ?? [];
      if (luckyNumber === void 0 && !luckyColor && luckyNumbers.length === 0 && luckyDays.length === 0 && compatibleSigns.length === 0)
        return nothing9;
      return html9`<div class="lucky">
						${luckyNumber !== void 0 ? html9`<span>Lucky number <strong>${luckyNumber}</strong></span>` : nothing9}
						${luckyColor ? html9`<span>Lucky color <strong>${luckyColor}</strong></span>` : nothing9}
						${luckyNumbers.length ? html9`<span
									>Lucky numbers
									<strong>${luckyNumbers.join(", ")}</strong></span
								>` : nothing9}
						${luckyDays.length ? html9`<span
									>Lucky days <strong>${luckyDays.join(", ")}</strong></span
								>` : nothing9}
						${compatibleSigns.length ? html9`<span class="compat-wrap">
									Best with
									<span class="compat"
										>${compatibleSigns.map(
        (s) => html9`<span>${s}</span>`
      )}</span
									>
								</span>` : nothing9}
					</div>`;
    })()}
		</article>`;
  }
};
RoxyHoroscopeCard.styles = [
  baseStyles,
  css10`
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
  property9({ attribute: false })
], RoxyHoroscopeCard.prototype, "data", 2);
__decorateClass([
  property9({ type: String, reflect: true })
], RoxyHoroscopeCard.prototype, "period", 2);
RoxyHoroscopeCard = __decorateClass([
  customElement9("roxy-horoscope-card")
], RoxyHoroscopeCard);
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// packages/ui/src/components/kp-planets-table.ts
import { css as css11, html as html10, LitElement as LitElement10, nothing as nothing10 } from "lit";
import { customElement as customElement10, property as property10 } from "lit/decorators.js";
var RoxyKpPlanetsTable = class extends LitElement10 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data)
      return html10`<div class="roxy-empty" role="status">No KP data</div>`;
    const planets = this.data.planets ?? [];
    return html10`<div
			class="wrap"
			aria-label="KP planets table"
			tabindex="0"
		>
			<header class="head">
				<h2 class="title">KP planets</h2>
				${typeof this.data.ayanamsa === "number" ? html10`<span class="ayanamsa">Ayanamsa: ${formatNumber(this.data.ayanamsa, 2)}°</span>` : nothing10}
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
      (p) => html10`<tr>
							<td class="planet">
								${p.planet}
								${p.retrograde ? html10`<span class="retro">R</span>` : nothing10}
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
  css11`
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
  property10({ attribute: false })
], RoxyKpPlanetsTable.prototype, "data", 2);
RoxyKpPlanetsTable = __decorateClass([
  customElement10("roxy-kp-planets-table")
], RoxyKpPlanetsTable);

// packages/ui/src/components/location-search.ts
import { css as css12, html as html11, LitElement as LitElement11, nothing as nothing11 } from "lit";
import { customElement as customElement11, property as property11, state as state2 } from "lit/decorators.js";

// packages/ui/src/utils/debounce.ts
function debounce(fn, wait) {
  let timer;
  return ((...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  });
}

// packages/ui/src/components/location-search.ts
var RoxyLocationSearch = class extends LitElement11 {
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
  }
  async fetchResults(q) {
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
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      this.results = json.cities ?? [];
      this.isOpen = this.results.length > 0;
      this.highlight = this.results.length > 0 ? 0 : -1;
    } catch (_err) {
      this.results = [];
      this.isOpen = false;
    } finally {
      this.isLoading = false;
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
    return html11`<div class="field">
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
			${this.isLoading ? html11`<span class="spinner" role="status" aria-label="Loading"></span>` : nothing11}
			${this.isOpen ? html11`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${this.results.length === 0 ? html11`<li class="empty" role="status">No cities found</li>` : this.results.map(
      (city, idx) => html11`<li role="presentation">
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
												>${city.province ? html11`${city.province}, ` : ""}${city.country}</span
											>
											<span class="tz"
												>UTC${city.utcOffset >= 0 ? "+" : ""}${city.utcOffset}</span
											>
										</button>
									</li>`
    )}
					</ul>` : nothing11}
		</div>`;
  }
};
RoxyLocationSearch.styles = [
  baseStyles,
  css12`
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
  property11({ type: String, attribute: "api-key" })
], RoxyLocationSearch.prototype, "apiKey", 2);
__decorateClass([
  property11({ type: String, attribute: "publishable-key" })
], RoxyLocationSearch.prototype, "publishableKey", 2);
__decorateClass([
  property11({ type: String })
], RoxyLocationSearch.prototype, "endpoint", 2);
__decorateClass([
  property11({ type: String })
], RoxyLocationSearch.prototype, "placeholder", 2);
__decorateClass([
  property11({ type: String, attribute: "default-value" })
], RoxyLocationSearch.prototype, "defaultValue", 2);
__decorateClass([
  state2()
], RoxyLocationSearch.prototype, "query", 2);
__decorateClass([
  state2()
], RoxyLocationSearch.prototype, "results", 2);
__decorateClass([
  state2()
], RoxyLocationSearch.prototype, "isOpen", 2);
__decorateClass([
  state2()
], RoxyLocationSearch.prototype, "isLoading", 2);
__decorateClass([
  state2()
], RoxyLocationSearch.prototype, "highlight", 2);
RoxyLocationSearch = __decorateClass([
  customElement11("roxy-location-search")
], RoxyLocationSearch);

// packages/ui/src/components/moon-phase.ts
import { css as css13, html as html12, LitElement as LitElement12, nothing as nothing12 } from "lit";
import { customElement as customElement12, property as property12 } from "lit/decorators.js";
var RoxyMoonPhase = class extends LitElement12 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return html12`<div class="roxy-empty" role="status">No moon phase data</div>`;
    const list = "phases" in d ? d.phases : "calendar" in d ? d.calendar : [];
    if (this.mode !== "current" && list.length > 0) {
      const month = "month" in d ? d.month : void 0;
      const year = "year" in d ? d.year : void 0;
      return html12`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${month ?? "Moon phases"} ${year ?? ""}</h2>
				<div class="list" role="list">
					${list.map((phase) => this.renderListItem(phase))}
				</div>
			</article>`;
    }
    if (!("phase" in d)) return nothing12;
    return this.renderSingle(d);
  }
  renderSingle(d) {
    const emoji = phaseEmoji(d.phase);
    return html12`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${emoji}</span>
				<div>
					<h2 class="label">${d.phase ?? "Moon"}</h2>
					${d.date ? html12`<div class="date">${d.date}</div>` : nothing12}
				</div>
			</div>
			<div class="stats">
				${typeof d.illumination === "number" ? html12`<div>
							<span>Illumination</span>
							<strong>${formatIllumination(d.illumination)}</strong>
						</div>` : nothing12}
				${typeof d.age === "number" ? html12`<div>
							<span>Age</span>
							<strong>${formatNumber(d.age, 1)} days</strong>
						</div>` : nothing12}
				${d.sign ? html12`<div>
							<span>Sign</span>
							<strong>${d.sign}</strong>
						</div>` : nothing12}
				${typeof d.distance === "number" ? html12`<div>
							<span>Distance</span>
							<strong>${(d.distance / 1e3).toFixed(0)}k km</strong>
						</div>` : nothing12}
			</div>
			${d.meaning?.description ? html12`<p class="meaning">${d.meaning.description}</p>` : nothing12}
			${d.meaning?.keywords?.length ? html12`<div class="keywords">
						${d.meaning.keywords.map((k) => html12`<span>${k}</span>`)}
					</div>` : nothing12}
		</article>`;
  }
  renderListItem(p) {
    const emoji = phaseEmoji(p.phase);
    return html12`<div class="list-item" role="listitem">
			<span aria-hidden="true">${emoji}</span>
			<span>${p.phase}</span>
			<span>${p.date ?? ""}</span>
		</div>`;
  }
};
RoxyMoonPhase.styles = [
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
  property12({ attribute: false })
], RoxyMoonPhase.prototype, "data", 2);
__decorateClass([
  property12({ type: String, reflect: true })
], RoxyMoonPhase.prototype, "mode", 2);
RoxyMoonPhase = __decorateClass([
  customElement12("roxy-moon-phase")
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
import { css as css14, html as html13, LitElement as LitElement13, nothing as nothing13, svg as svg3 } from "lit";
import { customElement as customElement13, property as property13 } from "lit/decorators.js";

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
var RoxyNatalChart = class extends LitElement13 {
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
      return html13`<div class="roxy-empty" role="status">No chart data</div>`;
    const planets = this.getPlanets();
    const aspects = this.data.aspects ?? [];
    return html13`<div class="wrap">
			<header>
				<h2 class="title">Natal chart</h2>
				${this.data.birthDetails ? html13`<div class="meta">
							${[this.data.birthDetails.date, this.data.birthDetails.time].filter(Boolean).join(" \xB7 ")}
						</div>` : nothing13}
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
    return svg3`
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
      return svg3`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.8" />`;
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
      return svg3`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[sign]}</text>`;
    });
  }
  renderHouseNumbers() {
    const ascSignIndex = Math.floor(this.getAscendant() / 30);
    return Array.from({ length: 12 }, (_, i) => {
      const angle = this.toAngle(i * 30 + 15);
      const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
      const houseNum = (i - ascSignIndex + 12) % 12 + 1;
      return svg3`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${houseNum}</text>`;
    });
  }
  renderPlanets(planets) {
    return planets.map((p) => {
      if (!Number.isFinite(p.longitude)) return nothing13;
      const angle = this.toAngle(p.longitude);
      const pos = polarToCartesian(CENTER, CENTER, PLANET_R, angle);
      const glyph = PLANET_GLYPH[capitalize2(p.name)] ?? p.name.slice(0, 2);
      const retro = p.isRetrograde ? " R" : "";
      const display = retro ? `${glyph}\u1D3F` : glyph;
      return svg3`<text class="planet-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}${retro}</title>${display}</text>`;
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
      if (l1 === void 0 || l2 === void 0) return nothing13;
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
      return svg3`<line class=${`aspect ${aspectClass}`} x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y}><title>${a.planet1} ${aspectName || ""} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}\xB0)` : ""}</title></line>`;
    });
  }
};
RoxyNatalChart.styles = [
  baseStyles,
  css14`
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
  property13({ attribute: false })
], RoxyNatalChart.prototype, "data", 2);
__decorateClass([
  property13({ type: String, attribute: "house-system", reflect: true })
], RoxyNatalChart.prototype, "houseSystem", 2);
RoxyNatalChart = __decorateClass([
  customElement13("roxy-natal-chart")
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
import { css as css15, html as html14, LitElement as LitElement14, nothing as nothing14 } from "lit";
import { customElement as customElement14, property as property14 } from "lit/decorators.js";
var RoxyNumerologyCard = class extends LitElement14 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.type = "life-path";
  }
  render() {
    const d = this.data;
    if (!d)
      return html14`<div class="roxy-empty" role="status">No numerology data</div>`;
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
    return html14`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.number === "number" ? html14`<div class="numeral">${d.number}</div>` : nothing14}
				<div>
					<p class="label">${headerLabel}</p>
					${d.meaning?.title ? html14`<h2 class="title">${d.meaning.title}</h2>` : nothing14}
				</div>
			</div>
			${d.meaning?.description ? html14`<p class="meaning">${d.meaning.description}</p>` : nothing14}
			${d.calculation ? html14`<pre class="calc">${d.calculation}</pre>` : nothing14}
			${keywords.length > 0 ? html14`<div class="chips">
						${keywords.map((k) => html14`<span>${k}</span>`)}
					</div>` : nothing14}
			${d.hasKarmicDebt && d.karmicDebtNumber ? html14`<div class="karmic">
						Karmic debt ${d.karmicDebtNumber}.
						${karmicDebtText(d.karmicDebtMeaning)}
					</div>` : nothing14}
		</article>`;
  }
  renderPersonalYear(d, headerLabel) {
    return html14`<article class="card" aria-label=${headerLabel}>
			<div class="hero">
				${typeof d.personalYear === "number" ? html14`<div class="numeral">${d.personalYear}</div>` : nothing14}
				<div>
					<p class="label">${headerLabel}</p>
					${d.theme ? html14`<h2 class="title">${d.theme}</h2>` : nothing14}
				</div>
			</div>
			${d.forecast ? html14`<p class="meaning">${d.forecast}</p>` : nothing14}
			${d.advice ? html14`<p>${d.advice}</p>` : nothing14}
		</article>`;
  }
  renderChart(d, headerLabel) {
    const cores = Object.entries(d.coreNumbers).filter(
      ([, v]) => v !== null && v !== void 0
    );
    return html14`<article class="card" aria-label=${headerLabel}>
			<div>
				<p class="label">${headerLabel}</p>
				${d.profile?.name ? html14`<h2 class="title">${d.profile.name}</h2>` : nothing14}
			</div>
			${cores.length > 0 ? html14`<div class="cores">
						${cores.map(
      ([k, v]) => html14`<div class="item">
								<span>${humanize2(k)}</span>
								<strong>${v.number ?? ""}</strong>
							</div>`
    )}
					</div>` : nothing14}
		</article>`;
  }
};
RoxyNumerologyCard.styles = [
  baseStyles,
  css15`
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
  property14({ attribute: false })
], RoxyNumerologyCard.prototype, "data", 2);
__decorateClass([
  property14({ type: String, reflect: true })
], RoxyNumerologyCard.prototype, "type", 2);
RoxyNumerologyCard = __decorateClass([
  customElement14("roxy-numerology-card")
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
import { css as css16, html as html15, LitElement as LitElement15, nothing as nothing15 } from "lit";
import { customElement as customElement15, property as property15 } from "lit/decorators.js";
var RoxyPanchangTable = class extends LitElement15 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.detail = "detailed";
  }
  render() {
    const d = this.data;
    if (!d)
      return html15`<div class="roxy-empty" role="status">No panchang data</div>`;
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
    return html15`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${detailed ? formatDate(detailed.date) : ""}</span>
			</header>
			<table>
				<tbody>
					${fivefold.map(
      ([k, v]) => html15`<tr>
							<th>${k}</th>
							<td>${v}</td>
						</tr>`
    )}
					${detailed?.sunrise ? html15`<tr>
								<th>Sunrise</th>
								<td>${formatTime(detailed.sunrise)}</td>
							</tr>` : nothing15}
					${detailed?.sunset ? html15`<tr>
								<th>Sunset</th>
								<td>${formatTime(detailed.sunset)}</td>
							</tr>` : nothing15}
					${detailed?.moonrise ? html15`<tr>
								<th>Moonrise</th>
								<td>${formatTime(detailed.moonrise)}</td>
							</tr>` : nothing15}
					${detailed?.moonset ? html15`<tr>
								<th>Moonset</th>
								<td>${formatTime(detailed.moonset)}</td>
							</tr>` : nothing15}
				</tbody>
			</table>
			${this.detail === "detailed" && (muhurtas.some((m) => !!m[1]) || inauspicious.some((m) => !!m[1])) ? html15`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${muhurtas.filter(([, v]) => !!v).map(
      ([k, v]) => html15`<tr>
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
      ([k, v]) => html15`<tr>
											<th>${k}</th>
											<td>${formatTimeRange(v)}</td>
										</tr>`
    )}
							</tbody>
						</table>
					` : nothing15}
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
  css16`
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
  property15({ attribute: false })
], RoxyPanchangTable.prototype, "data", 2);
__decorateClass([
  property15({ type: String, reflect: true })
], RoxyPanchangTable.prototype, "detail", 2);
RoxyPanchangTable = __decorateClass([
  customElement15("roxy-panchang-table")
], RoxyPanchangTable);

// packages/ui/src/components/synastry-chart.ts
import { css as css17, html as html16, LitElement as LitElement16, nothing as nothing16, svg as svg4 } from "lit";
import { customElement as customElement16, property as property16 } from "lit/decorators.js";
var SIZE2 = 360;
var CENTER2 = SIZE2 / 2;
var OUTER_R2 = 170;
var SIGN_R2 = 154;
var P1_R = 124;
var P2_R = 96;
var RoxySynastryChart = class extends LitElement16 {
  constructor() {
    super(...arguments);
    this.data = null;
  }
  render() {
    if (!this.data)
      return html16`<div class="roxy-empty" role="status">No synastry data</div>`;
    const { person1, person2, compatibilityScore, analysis } = this.data;
    const interAspects = this.data.interAspects ?? [];
    const p1Planets = person1?.planets ?? [];
    const p2Planets = person2?.planets ?? [];
    const score = typeof compatibilityScore === "number" ? Math.round(compatibilityScore) : void 0;
    const summaryText = analysis?.overall;
    const strengths = analysis?.strengths ?? [];
    const challenges = analysis?.challenges ?? [];
    return html16`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${typeof score === "number" ? html16`<span class="score" aria-label=${`Score ${score} of 100`}
							>${score} / 100</span
						>` : nothing16}
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
			${summaryText ? html16`<p class="summary">${summaryText}</p>` : nothing16}
			${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing16}
			${strengths.length > 0 || challenges.length > 0 ? html16`<div class="lists">
						${strengths.length ? html16`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => html16`<li>${s}</li>`)}
									</ul>
								</div>` : nothing16}
						${challenges.length ? html16`<div>
									<h3>Challenges</h3>
									<ul>
										${challenges.map((s) => html16`<li>${s}</li>`)}
									</ul>
								</div>` : nothing16}
					</div>` : nothing16}
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
      return svg4`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
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
      return svg4`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[s]}</text>`;
    });
  }
  renderRing(planets, radius, cls) {
    return planets.map((p) => {
      if (!Number.isFinite(p.longitude)) return nothing16;
      const pos = polarToCartesian(
        CENTER2,
        CENTER2,
        radius,
        this.toAngle(p.longitude)
      );
      const glyph = PLANET_GLYPH[capitalize3(p.name)] ?? p.name.slice(0, 2);
      return svg4`<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${p.name}</title>${glyph}</text>`;
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
      if (l1 === void 0 || l2 === void 0) return nothing16;
      const out = polarToCartesian(CENTER2, CENTER2, P1_R - 12, this.toAngle(l1));
      const inn = polarToCartesian(CENTER2, CENTER2, P2_R + 8, this.toAngle(l2));
      const aspectName = normalizeAspect2(a);
      const cls = ASPECT_CLASS2[aspectName] ?? "aspect-other";
      const orbLabel = formatNumber(a.orb, 1);
      return svg4`<line class=${`aspect ${cls}`} x1=${out.x} y1=${out.y} x2=${inn.x} y2=${inn.y}><title>${a.planet1} ${aspectName} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}\xB0)` : ""}</title></line>`;
    });
  }
  renderAspects(aspects) {
    return html16`<table>
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
      (a) => html16`<tr>
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
  css17`
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
		`
];
__decorateClass([
  property16({ attribute: false })
], RoxySynastryChart.prototype, "data", 2);
RoxySynastryChart = __decorateClass([
  customElement16("roxy-synastry-chart")
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
import { css as css18, html as html17, LitElement as LitElement17, nothing as nothing17 } from "lit";
import { customElement as customElement17, property as property17, state as state3 } from "lit/decorators.js";
var RoxyTarotCard = class extends LitElement17 {
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
      return html17`<div class="roxy-empty" role="status">No tarot data</div>`;
    if ("card" in d) return this.renderDailyCard(d);
    return this.renderFullCard(d);
  }
  renderDailyCard(d) {
    const card = d.card;
    const isReversed = this.flipped !== Boolean(card.reversed);
    const keywords = card.keywords ?? [];
    return html17`<article class="card" aria-label=${card.name ?? "Tarot card"}>
			<div class="image-wrap">
				${card.imageUrl ? html17`<img
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
						/>` : html17`<div
							class=${`image ${isReversed ? "reversed" : ""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${card.name ?? "?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${card.arcana ? html17`${card.arcana} arcana` : nothing17}
					${isReversed ? html17` · reversed` : nothing17}
				</div>
				<h2 class="title">${card.name ?? "Tarot card"}</h2>
				${d.dailyMessage ? html17`<p class="message">${d.dailyMessage}</p>` : nothing17}
				${card.meaning ? html17`<p>${card.meaning}</p>` : nothing17}
				${keywords.length > 0 ? html17`<div class="chips">
							${keywords.map((k) => html17`<span>${k}</span>`)}
						</div>` : nothing17}
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
    return html17`<article class="card" aria-label=${d.name ?? "Tarot card"}>
			<div class="image-wrap">
				${d.imageUrl ? html17`<img
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
						/>` : html17`<div
							class=${`image ${isReversed ? "reversed" : ""}`}
							style="aspect-ratio: 0.6; display: flex; align-items: center; justify-content: center; color: var(--roxy-muted)"
						>
							${d.name ?? "?"}
						</div>`}
			</div>
			<div>
				<div class="meta">
					${d.arcana ? html17`${d.arcana} arcana` : nothing17}
					${d.number !== void 0 && d.number !== null ? html17` · ${d.number}` : nothing17}
					${isReversed ? html17` · reversed` : nothing17}
				</div>
				<h2 class="title">${d.name ?? "Tarot card"}</h2>
				${orientedMeaning?.description ? html17`<p>${orientedMeaning.description}</p>` : nothing17}
				${keywords.length > 0 ? html17`<div class="chips">
							${keywords.map((k) => html17`<span>${k}</span>`)}
						</div>` : nothing17}
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
  css18`
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
  property17({ attribute: false })
], RoxyTarotCard.prototype, "data", 2);
__decorateClass([
  state3()
], RoxyTarotCard.prototype, "flipped", 2);
RoxyTarotCard = __decorateClass([
  customElement17("roxy-tarot-card")
], RoxyTarotCard);

// packages/ui/src/components/tarot-spread.ts
import { css as css19, html as html18, LitElement as LitElement18, nothing as nothing18 } from "lit";
import { customElement as customElement18, property as property18 } from "lit/decorators.js";
var RoxyTarotSpread = class extends LitElement18 {
  constructor() {
    super(...arguments);
    this.data = null;
    this.spread = "three-card";
  }
  render() {
    const d = this.data;
    if (!d)
      return html18`<div class="roxy-empty" role="status">No tarot spread</div>`;
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
    return html18`<article class="wrap" aria-label="Tarot spread">
			<header class="head">
				<h2 class="title">${spreadLabel}</h2>
				${question ? html18`<span class="question">"${question}"</span>` : nothing18}
			</header>
			${isYesNo ? html18`<div>
						<span class=${`answer ${answerClass}`}>${answer}</span>
						${strength ? html18`<small> · ${strength}</small>` : nothing18}
					</div>` : nothing18}
			${positions.length > 0 ? html18`<div class="grid">
						${positions.map(
      (p) => html18`<div class="card">
								<p class="label">${p.name ?? ""}</p>
								<div class="image">
									${p.card?.imageUrl ? html18`<img
												src=${p.card.imageUrl}
												alt=${p.card.name ?? "tarot card"}
												class=${p.card.reversed ? "reversed" : ""}
											/>` : html18`${p.card?.name ?? "?"}`}
								</div>
								<p class="name">
									${p.card?.name ?? ""}
									${p.card?.reversed ? html18`<small>(reversed)</small>` : nothing18}
								</p>
								${p.interpretation ? html18`<p class="interp">${p.interpretation}</p>` : nothing18}
							</div>`
    )}
					</div>` : nothing18}
			${cards.length > 0 ? html18`<div class="grid">
						${cards.map(
      (c) => html18`<div class="card">
								<div class="image">
									${c.imageUrl ? html18`<img
												src=${c.imageUrl}
												alt=${c.name ?? "tarot card"}
												class=${c.reversed ? "reversed" : ""}
											/>` : html18`${c.name ?? "?"}`}
								</div>
								<p class="name">
									${c.name ?? ""}
									${c.reversed ? html18`<small>(reversed)</small>` : nothing18}
								</p>
								${c.meaning ? html18`<p class="interp">${c.meaning}</p>` : nothing18}
							</div>`
    )}
					</div>` : nothing18}
			${summary ? html18`<p class="reading">${summary}</p>` : nothing18}
			${yesNoInterp ? html18`<p class="reading">${yesNoInterp}</p>` : nothing18}
		</article>`;
  }
};
RoxyTarotSpread.styles = [
  baseStyles,
  css19`
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
  property18({ attribute: false })
], RoxyTarotSpread.prototype, "data", 2);
__decorateClass([
  property18({ type: String, reflect: true })
], RoxyTarotSpread.prototype, "spread", 2);
RoxyTarotSpread = __decorateClass([
  customElement18("roxy-tarot-spread")
], RoxyTarotSpread);

// packages/ui/src/components/vedic-kundli.ts
import { css as css20, html as html19, LitElement as LitElement19, nothing as nothing19, svg as svg5 } from "lit";
import { customElement as customElement19, property as property19 } from "lit/decorators.js";
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
var RoxyVedicKundli = class extends LitElement19 {
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
      return html19`<div class="roxy-empty" role="status">No kundli data</div>`;
    const houses = this.buildHouses();
    return html19`<div class="wrap">
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
    if (!center || !signPos) return nothing19;
    const signAbbr = SIGN_ABBR[h.sign] ?? "";
    const planets = h.planets ?? [];
    const isLagna = this.isLagna(h);
    return svg5`
			<g>
				${isLagna ? svg5`<rect class="lagna-bg" x=${center.x - 30} y=${center.y - 28} width="60" height="56" rx="6" />` : nothing19}
				${signAbbr ? svg5`<text class="sign-text" x=${signPos.x} y=${signPos.y} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>` : nothing19}
				${isLagna ? svg5`<text class="lagna-marker" x=${center.x} y=${center.y - 18} text-anchor="middle" dominant-baseline="central">LAGNA</text>` : nothing19}
				${planets.map((planet, j) => {
      const abbr = PLANET_ABBR[capitalize4(planet)] ?? planet.slice(0, 2);
      const lineHeight = 13;
      const baseY = isLagna ? center.y + 8 : center.y;
      const startY = baseY - (planets.length - 1) * lineHeight / 2;
      const yPos = startY + j * lineHeight;
      return svg5`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
    })}
			</g>
		`;
  }
};
RoxyVedicKundli.styles = [
  baseStyles,
  css20`
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
  property19({ attribute: false })
], RoxyVedicKundli.prototype, "data", 2);
__decorateClass([
  property19({ type: String, reflect: true, attribute: "chart-style" })
], RoxyVedicKundli.prototype, "chartStyle", 2);
RoxyVedicKundli = __decorateClass([
  customElement19("roxy-vedic-kundli")
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
      "numerology.calculateCompatibility",
      "biorhythm.calculateCompatibility"
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
      "astrology.getMoonPhaseCalendar"
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
      "vedicAstrology.checkKalSarpaDosha",
      "vedicAstrology.checkSadeSati"
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
      "numerology.calculateChart"
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
      "tarot.castLove",
      "tarot.castYesNo",
      "tarot.draw"
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
      "iching.castHexagram",
      "iching.getDailyHexagram",
      "iching.castDailyHexagram",
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
    topic: "Helpers"
  },
  {
    pascal: "RoxyLocationSearch",
    tag: "roxy-location-search",
    slug: "location-search",
    domain: "utility",
    heading: "City search",
    endpoints: ["location.search"],
    description: "City search input with debounced /location/search calls",
    docsLabel: "Helper",
    endpointLabel: "GET /location/search",
    docsSummary: "Debounced city search input, emits roxy-location-select",
    topic: "Helpers"
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
    topic: "Helpers"
  }
];

// packages/ui/src/version.ts
var ROXY_UI_VERSION = "0.1.2";

// packages/ui/src/index.ts
var ROXY_UI_COMPONENTS = ROXY_COMPONENTS.map((c) => c.slug);
export {
  ROXY_COMPONENTS,
  ROXY_UI_COMPONENTS,
  ROXY_UI_VERSION,
  RoxyBiorhythmChart,
  RoxyCompatibilityCard,
  RoxyDashaTimeline,
  RoxyData,
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
  RoxySynastryChart,
  RoxyTarotCard,
  RoxyTarotSpread,
  RoxyVedicKundli
};
//# sourceMappingURL=index.js.map
