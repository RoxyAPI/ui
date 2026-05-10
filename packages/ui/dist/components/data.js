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

// packages/ui/src/components/data.ts
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

// packages/ui/src/utils/string.ts
function humanize(s) {
  return s.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
}

// packages/ui/src/components/data.ts
var TITLE_KEYS = ["title", "name", "label", "heading", "overview", "summary"];
var IMAGE_KEYS = ["imageUrl", "image", "icon", "symbol"];
var SKIP_KEYS = ["imageUrl", "image"];
var MAX_DEPTH = 6;
var RoxyData = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.depth = 0;
  }
  render() {
    if (this.data == null) {
      return html`<div class="roxy-empty" role="status">No data</div>`;
    }
    if (this.depth >= MAX_DEPTH) {
      return html`<div class="roxy-empty" role="status">…</div>`;
    }
    return html`<div
			class="roxy-card"
			aria-label="Generic data display"
		>
			${this.renderValue(this.data)}
		</div>`;
  }
  renderValue(value) {
    if (value === null || value === void 0) return nothing;
    if (typeof value === "string") return html`<p>${value}</p>`;
    if (typeof value === "number" || typeof value === "boolean") {
      return html`<p>${String(value)}</p>`;
    }
    if (Array.isArray(value)) return this.renderArray(value);
    return this.renderObject(value);
  }
  renderArray(arr) {
    if (arr.length === 0) {
      return html`<div class="roxy-empty" role="status">Empty list</div>`;
    }
    const allPrimitive = arr.every(
      (v) => v === null || ["string", "number", "boolean"].includes(typeof v)
    );
    if (allPrimitive) {
      return html`<ul class="roxy-chips">
				${arr.map((v) => html`<li>${String(v)}</li>`)}
			</ul>`;
    }
    const allObjects = arr.every(
      (v) => v !== null && typeof v === "object" && !Array.isArray(v)
    );
    if (allObjects) return this.renderTable(arr);
    return html`<ol>
			${arr.map((v) => html`<li>${this.renderValue(v)}</li>`)}
		</ol>`;
  }
  renderTable(rows) {
    const keys = this.collectKeys(rows);
    return html`<table class="roxy-table" role="table">
			<thead>
				<tr>
					${keys.map((k) => html`<th>${humanize(k)}</th>`)}
				</tr>
			</thead>
			<tbody>
				${rows.map(
      (row) => html`<tr>
						${keys.map((k) => html`<td>${this.formatPrimitive(row[k])}</td>`)}
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
    return html`
			${imageKey ? html`<img
						class="roxy-image"
						src=${String(obj[imageKey])}
						alt=${titleKey ? String(obj[titleKey]) : "illustration"}
						loading="lazy"
					/>` : nothing}
			${titleKey ? html`<h3 class="roxy-title">${obj[titleKey]}</h3>` : nothing}
			${summaryKey ? html`<p class="roxy-summary">${obj[summaryKey]}</p>` : nothing}
			${rows.length > 0 ? html`<dl class="roxy-rows">
						${rows.map(
      ([k, v]) => html`
								<dt>${humanize(k)}</dt>
								<dd>${this.renderField(v)}</dd>
							`
    )}
					</dl>` : nothing}
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
        return html`<ul class="roxy-chips">
					${value.map((v) => html`<li>${String(v)}</li>`)}
				</ul>`;
      }
    }
    return html`<roxy-data .data=${value} .depth=${this.depth + 1}></roxy-data>`;
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
};
RoxyData.styles = [
  baseStyles,
  css2`
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
  property({ attribute: false })
], RoxyData.prototype, "data", 2);
__decorateClass([
  property({ attribute: false })
], RoxyData.prototype, "depth", 2);
RoxyData = __decorateClass([
  customElement("roxy-data")
], RoxyData);
export {
  RoxyData
};
//# sourceMappingURL=data.js.map
