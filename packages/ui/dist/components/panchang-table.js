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

// packages/ui/src/components/panchang-table.ts
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

// packages/ui/src/components/panchang-table.ts
var RoxyPanchangTable = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.detail = "detailed";
  }
  render() {
    const d = this.data;
    if (!d)
      return html`<div class="roxy-empty" role="status">No panchang data</div>`;
    const fivefold = [
      ["Tithi", this.formatPart(d.tithi)],
      ["Nakshatra", this.formatPart(d.nakshatra)],
      ["Yoga", this.formatPart(d.yoga)],
      ["Karana", this.formatPart(d.karana)],
      ["Vara", d.vara ?? ""]
    ];
    const muhurtas = [
      ["Brahma Muhurta", d.brahmaMuhurta],
      ["Abhijit Muhurta", d.abhijitMuhurta],
      ["Vijaya Muhurta", d.vijayaMuhurta],
      ["Godhuli Muhurta", d.godhuliMuhurta],
      ["Nishita Muhurta", d.nishitaMuhurta],
      ["Pratah Sandhya", d.pratahSandhya],
      ["Sayahna Sandhya", d.sayahnaSandhya]
    ];
    const inauspicious = [
      ["Rahu Kaal", d.rahuKaal],
      ["Yamaganda", d.yamaganda],
      ["Gulika", d.gulika]
    ];
    return html`<div class="wrap" aria-label="Panchang">
			<header class="head">
				<h2 class="title">Panchang</h2>
				<span class="date">${d.date ?? ""}</span>
			</header>
			<table>
				<tbody>
					${fivefold.map(
      ([k, v]) => html`<tr>
							<th>${k}</th>
							<td>${v}</td>
						</tr>`
    )}
					${d.sunrise ? html`<tr>
								<th>Sunrise</th>
								<td>${d.sunrise}</td>
							</tr>` : nothing}
					${d.sunset ? html`<tr>
								<th>Sunset</th>
								<td>${d.sunset}</td>
							</tr>` : nothing}
					${d.moonrise ? html`<tr>
								<th>Moonrise</th>
								<td>${d.moonrise}</td>
							</tr>` : nothing}
					${d.moonset ? html`<tr>
								<th>Moonset</th>
								<td>${d.moonset}</td>
							</tr>` : nothing}
				</tbody>
			</table>
			${this.detail === "detailed" && (muhurtas.some((m) => !!m[1]) || inauspicious.some((m) => !!m[1])) ? html`
						<div class="section">Auspicious muhurtas</div>
						<table>
							<tbody>
								${muhurtas.filter(([, v]) => !!v).map(
      ([k, v]) => html`<tr>
											<th>${k}</th>
											<td>${formatRange(v)}</td>
										</tr>`
    )}
							</tbody>
						</table>
						<div class="section">Inauspicious periods</div>
						<table>
							<tbody>
								${inauspicious.filter(([, v]) => !!v).map(
      ([k, v]) => html`<tr>
											<th>${k}</th>
											<td>${formatRange(v)}</td>
										</tr>`
    )}
							</tbody>
						</table>
					` : nothing}
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
  css2`
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
  property({ attribute: false })
], RoxyPanchangTable.prototype, "data", 2);
__decorateClass([
  property({ type: String, reflect: true })
], RoxyPanchangTable.prototype, "detail", 2);
RoxyPanchangTable = __decorateClass([
  customElement("roxy-panchang-table")
], RoxyPanchangTable);
function formatRange(t) {
  if (!t) return "";
  if (t.start && t.end) return `${t.start} - ${t.end}`;
  return t.start ?? t.end ?? "";
}
export {
  RoxyPanchangTable
};
//# sourceMappingURL=panchang-table.js.map
