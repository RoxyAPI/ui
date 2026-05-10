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

// packages/ui/src/components/location-search.ts
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
var RoxyLocationSearch = class extends LitElement {
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
    return html`<div class="field">
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
			${this.isLoading ? html`<span class="spinner" role="status" aria-label="Loading"></span>` : nothing}
			${this.isOpen ? html`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${this.results.length === 0 ? html`<li class="empty" role="status">No cities found</li>` : this.results.map(
      (city, idx) => html`<li role="presentation">
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
												>${city.province ? html`${city.province}, ` : ""}${city.country}</span
											>
											<span class="tz"
												>UTC${city.utcOffset >= 0 ? "+" : ""}${city.utcOffset}</span
											>
										</button>
									</li>`
    )}
					</ul>` : nothing}
		</div>`;
  }
};
RoxyLocationSearch.styles = [
  baseStyles,
  css2`
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
  property({ type: String, attribute: "api-key" })
], RoxyLocationSearch.prototype, "apiKey", 2);
__decorateClass([
  property({ type: String, attribute: "publishable-key" })
], RoxyLocationSearch.prototype, "publishableKey", 2);
__decorateClass([
  property({ type: String })
], RoxyLocationSearch.prototype, "endpoint", 2);
__decorateClass([
  property({ type: String })
], RoxyLocationSearch.prototype, "placeholder", 2);
__decorateClass([
  property({ type: String, attribute: "default-value" })
], RoxyLocationSearch.prototype, "defaultValue", 2);
__decorateClass([
  state()
], RoxyLocationSearch.prototype, "query", 2);
__decorateClass([
  state()
], RoxyLocationSearch.prototype, "results", 2);
__decorateClass([
  state()
], RoxyLocationSearch.prototype, "isOpen", 2);
__decorateClass([
  state()
], RoxyLocationSearch.prototype, "isLoading", 2);
__decorateClass([
  state()
], RoxyLocationSearch.prototype, "highlight", 2);
RoxyLocationSearch = __decorateClass([
  customElement("roxy-location-search")
], RoxyLocationSearch);
export {
  RoxyLocationSearch
};
//# sourceMappingURL=location-search.js.map
