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

// packages/ui/src/components/moon-phase.ts
import { css as css2, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

// packages/ui/src/tokens/index.ts
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

// packages/ui/src/utils/format.ts
function formatNumber(value, dp = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  return value.toFixed(dp).replace(/\.?0+$/, "");
}

// packages/ui/src/components/moon-phase.ts
var RoxyMoonPhase = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return html`<div class="roxy-empty" role="status">No moon phase data</div>`;
    const list = "phases" in d ? d.phases : "calendar" in d ? d.calendar : [];
    if (this.mode !== "current" && list.length > 0) {
      const month = "month" in d ? d.month : void 0;
      const year = "year" in d ? d.year : void 0;
      return html`<article
				class="card"
				aria-label="Moon phase calendar"
			>
				<h2 class="label">${month ?? "Moon phases"} ${year ?? ""}</h2>
				<div class="list" role="list">
					${list.map((phase) => this.renderListItem(phase))}
				</div>
			</article>`;
    }
    if (!("phase" in d)) return nothing;
    return this.renderSingle(d);
  }
  renderSingle(d) {
    const emoji = phaseEmoji(d.phase);
    return html`<article class="card" aria-label="Current moon phase">
			<div class="hero">
				<span class="emoji" aria-hidden="true">${emoji}</span>
				<div>
					<h2 class="label">${d.phase ?? "Moon"}</h2>
					${d.date ? html`<div class="date">${d.date}</div>` : nothing}
				</div>
			</div>
			<div class="stats">
				${typeof d.illumination === "number" ? html`<div>
							<span>Illumination</span>
							<strong>${formatIllumination(d.illumination)}</strong>
						</div>` : nothing}
				${typeof d.age === "number" ? html`<div>
							<span>Age</span>
							<strong>${formatNumber(d.age, 1)} days</strong>
						</div>` : nothing}
				${d.sign ? html`<div>
							<span>Sign</span>
							<strong>${d.sign}</strong>
						</div>` : nothing}
				${typeof d.distance === "number" ? html`<div>
							<span>Distance</span>
							<strong>${(d.distance / 1e3).toFixed(0)}k km</strong>
						</div>` : nothing}
			</div>
			${d.meaning?.description ? html`<p class="meaning">${d.meaning.description}</p>` : nothing}
			${d.meaning?.keywords?.length ? html`<div class="keywords">
						${d.meaning.keywords.map((k) => html`<span>${k}</span>`)}
					</div>` : nothing}
		</article>`;
  }
  renderListItem(p) {
    const emoji = phaseEmoji(p.phase);
    return html`<div class="list-item" role="listitem">
			<span aria-hidden="true">${emoji}</span>
			<span>${p.phase}</span>
			<span>${p.date ?? ""}</span>
		</div>`;
  }
};
RoxyMoonPhase.styles = [
  baseStyles,
  css2`
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
  property({ attribute: false })
], RoxyMoonPhase.prototype, "data", 2);
__decorateClass([
  property({ type: String, reflect: true })
], RoxyMoonPhase.prototype, "mode", 2);
RoxyMoonPhase = __decorateClass([
  customElement("roxy-moon-phase")
], RoxyMoonPhase);
function phaseEmoji(phase) {
  if (!phase) return "\u{1F319}";
  return MOON_PHASE_EMOJI[phase.toLowerCase()] ?? "\u{1F319}";
}
function formatIllumination(v) {
  const pct = v <= 1 ? v * 100 : v;
  return `${Math.round(pct)}%`;
}
export {
  RoxyMoonPhase
};
//# sourceMappingURL=moon-phase.js.map
