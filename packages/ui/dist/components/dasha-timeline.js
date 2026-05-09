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

// packages/ui/src/components/dasha-timeline.ts
import { css as css2, html, LitElement, nothing } from "lit";
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

// packages/ui/src/components/dasha-timeline.ts
var RoxyDashaTimeline = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.period = "current";
  }
  render() {
    const d = this.data;
    if (!d)
      return html`<div class="roxy-empty" role="status">No dasha data</div>`;
    const periods = this.collectPeriods(d);
    const maxYears = periods.length ? Math.max(...periods.map((p) => p.durationYears ?? p.years ?? 1)) : 0;
    return html`<div class="wrap" aria-label="Dasha timeline">
			<header class="head">
				<h2 class="title">
					${this.period === "major" ? "Vimshottari Mahadasha" : this.period === "sub" ? "Antardasha" : "Active dashas"}
				</h2>
				${d.nakshatraName || d.moonNakshatra ? html`<div class="nakshatra">
							Moon nakshatra: ${d.nakshatraName ?? d.moonNakshatra}
							${d.nakshatraLord ? html`(lord ${d.nakshatraLord})` : nothing}
						</div>` : nothing}
			</header>

			${this.period === "current" ? this.renderCurrent(d) : nothing}
			${periods.length > 0 ? html`<div class="timeline" role="list">
						${periods.map((p) => this.renderBar(p, maxYears))}
					</div>` : nothing}
		</div>`;
  }
  renderCurrent(d) {
    return html`<div class="current">
			${d.mahadasha ? html`<div>
						<span>Mahadasha</span>
						<strong>${d.mahadasha.lord ?? d.mahadasha.mahadashaLord}</strong>
						${typeof d.remainingInMahadasha === "number" ? html`<small>${d.remainingInMahadasha.toFixed(1)} years left</small>` : nothing}
					</div>` : nothing}
			${d.antardasha ? html`<div>
						<span>Antardasha</span>
						<strong>${d.antardasha.lord ?? d.antardasha.antardashaLord}</strong>
						${typeof d.remainingInAntardasha === "number" ? html`<small>${d.remainingInAntardasha.toFixed(1)} years left</small>` : nothing}
					</div>` : nothing}
			${d.pratyantardasha ? html`<div>
						<span>Pratyantardasha</span>
						<strong
							>${d.pratyantardasha.lord ?? d.pratyantardasha.pratyantardashaLord}</strong
						>
						${typeof d.remainingInPratyantardasha === "number" ? html`<small
									>${d.remainingInPratyantardasha.toFixed(2)} years left</small
								>` : nothing}
					</div>` : nothing}
		</div>`;
  }
  collectPeriods(d) {
    if (this.period === "major" && d.mahadashas?.length) return d.mahadashas;
    if (this.period === "sub" && d.antardashas?.length) return d.antardashas;
    return d.mahadashas ?? d.antardashas ?? [];
  }
  renderBar(p, max) {
    const lord = p.lord ?? p.mahadashaLord ?? p.antardashaLord ?? p.planet ?? "";
    const years = p.durationYears ?? p.years ?? 0;
    const width = max > 0 ? years / max * 100 : 0;
    return html`<div class="bar" role="listitem">
			<span>${lord}</span>
			<span class="bar-track"><span style="width: ${width}%"></span></span>
			<span class="dates">
				${p.startDate ? formatYear(p.startDate) : ""}
				${p.endDate ? html`- ${formatYear(p.endDate)}` : ""}
			</span>
		</div>`;
  }
};
RoxyDashaTimeline.styles = [
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
  property({ attribute: false })
], RoxyDashaTimeline.prototype, "data", 2);
__decorateClass([
  property({ type: String, reflect: true })
], RoxyDashaTimeline.prototype, "period", 2);
RoxyDashaTimeline = __decorateClass([
  customElement("roxy-dasha-timeline")
], RoxyDashaTimeline);
function formatYear(s) {
  const m = s.match(/^(\d{4})/);
  return m ? m[1] : s;
}
export {
  RoxyDashaTimeline
};
//# sourceMappingURL=dasha-timeline.js.map
