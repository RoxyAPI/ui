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

// packages/ui/src/components/endpoint-form.ts
import { css as css2, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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

// packages/ui/src/components/endpoint-form.ts
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
var RoxyEndpointForm = class extends LitElement {
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
      return html`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;
    }
    if (this.specError) {
      return html`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;
    }
    const renderField = (f) => {
      if (this.hasLocation && (f.name === "latitude" || f.name === "longitude" || f.name === "timezone")) {
        return nothing;
      }
      const inputId = `roxy-form-${f.name}`;
      return html`<div class="field">
				<label for=${inputId}>
					${humanize(f.name)}${f.required ? html`<span class="req" aria-hidden="true">*</span>` : nothing}
				</label>
				${f.enum ? html`<select
							id=${inputId}
							?required=${f.required}
							@change=${(e) => this.setValue(f.name, e.target.value)}
						>
							<option value="">Choose</option>
							${f.enum.map(
        (opt) => html`<option value=${opt} ?selected=${this.values[f.name] === opt}>
									${opt}
								</option>`
      )}
						</select>` : html`<input
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
				${f.description ? html`<small class="help">${f.description}</small>` : nothing}
			</div>`;
    };
    return html`<form @submit=${this.onSubmit}>
			<h2 class="title">${humanize(this.endpoint.split("/").pop() ?? "")}</h2>
			${this.hasLocation ? html`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>` : nothing}
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
  css2`
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
  property({ type: String, attribute: "data-endpoint" })
], RoxyEndpointForm.prototype, "endpoint", 2);
__decorateClass([
  property({ type: String })
], RoxyEndpointForm.prototype, "method", 2);
__decorateClass([
  property({ type: String, attribute: "spec-url" })
], RoxyEndpointForm.prototype, "specUrl", 2);
__decorateClass([
  property({ type: String, attribute: "submit-label" })
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
__decorateClass([
  state()
], RoxyEndpointForm.prototype, "specError", 2);
RoxyEndpointForm = __decorateClass([
  customElement("roxy-endpoint-form")
], RoxyEndpointForm);
function humanize(s) {
  return s.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
}
export {
  RoxyEndpointForm
};
//# sourceMappingURL=endpoint-form.js.map
