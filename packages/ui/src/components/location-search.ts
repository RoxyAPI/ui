import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';
import { debounce } from '../utils/debounce.js';

export interface CityResult {
	city: string;
	province?: string;
	country: string;
	iso2?: string;
	latitude: number;
	longitude: number;
	timezone: string;
	utcOffset: number;
	population?: number;
}

interface CitySearchResponse {
	total?: number;
	cities?: CityResult[];
}

/**
 * Stateful location search input. Calls /location/search and emits
 * `roxy-location-select` CustomEvent with the chosen city. Required for any
 * chart endpoint.
 *
 * Lifted from jyotish-vedic-astrology-app/src/components/city-search.tsx,
 * keeping the 300ms debounce and click-outside behavior, replacing React
 * state with Lit reactive properties and using direct fetch to RoxyAPI.
 *
 * Attributes:
 *   api-key            optional. Direct call to roxyapi.com when set.
 *   publishable-key    optional. Browser-safe pk_* key with allowed_origins.
 *   endpoint           optional. Override URL (default https://roxyapi.com/api/v2/location/search).
 *   placeholder        optional. Input placeholder.
 *   default-value      optional. Pre-filled query.
 */
@customElement('roxy-location-search')
export class RoxyLocationSearch extends LitElement {
	static styles = [
		baseStyles,
		css`
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
		`,
	];

	@property({ type: String, attribute: 'api-key' })
	apiKey?: string;

	@property({ type: String, attribute: 'publishable-key' })
	publishableKey?: string;

	@property({ type: String })
	endpoint = 'https://roxyapi.com/api/v2/location/search';

	@property({ type: String })
	placeholder = 'Search city';

	@property({ type: String, attribute: 'default-value' })
	defaultValue = '';

	@state()
	private query = '';

	@state()
	private results: CityResult[] = [];

	@state()
	private isOpen = false;

	@state()
	private isLoading = false;

	@state()
	private highlight = -1;

	private clickOutsideHandler?: (e: MouseEvent) => void;
	private debouncedFetch = debounce((q: string) => {
		void this.fetchResults(q);
	}, 300);

	connectedCallback(): void {
		super.connectedCallback();
		this.query = this.defaultValue;
		this.clickOutsideHandler = (e: MouseEvent) => {
			const path = e.composedPath();
			if (!path.includes(this)) this.isOpen = false;
		};
		document.addEventListener('mousedown', this.clickOutsideHandler);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this.clickOutsideHandler) {
			document.removeEventListener('mousedown', this.clickOutsideHandler);
		}
	}

	private async fetchResults(q: string) {
		this.isLoading = true;
		try {
			const url = new URL(this.endpoint);
			url.searchParams.set('q', q);
			url.searchParams.set('limit', '8');
			const headers: Record<string, string> = {
				Accept: 'application/json',
			};
			if (this.apiKey) headers['X-API-Key'] = this.apiKey;
			if (this.publishableKey) headers['X-API-Key'] = this.publishableKey;
			const res = await fetch(url, { headers });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const json = (await res.json()) as CitySearchResponse;
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

	private onInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		this.query = value;
		if (value.length < 2) {
			this.results = [];
			this.isOpen = false;
			this.highlight = -1;
			return;
		}
		this.debouncedFetch(value);
	};

	private select(city: CityResult) {
		this.query = `${city.city}${city.province ? `, ${city.province}` : ''}, ${city.country}`;
		this.isOpen = false;
		this.results = [];
		this.dispatchEvent(
			new CustomEvent('roxy-location-select', {
				detail: city,
				bubbles: true,
				composed: true,
			}),
		);
	}

	private onKeyDown = (e: KeyboardEvent) => {
		if (!this.isOpen || this.results.length === 0) {
			if (e.key === 'ArrowDown' && this.query.length >= 2) {
				void this.fetchResults(this.query);
				e.preventDefault();
			}
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			this.highlight = (this.highlight + 1) % this.results.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			this.highlight =
				(this.highlight - 1 + this.results.length) % this.results.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const target = this.results[this.highlight] ?? this.results[0];
			if (target) this.select(target);
		} else if (e.key === 'Escape') {
			this.isOpen = false;
		}
	};

	render() {
		return html`<div class="field">
			<input
				type="text"
				role="combobox"
				aria-expanded=${this.isOpen ? 'true' : 'false'}
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
			${
				this.isOpen
					? html`<ul
						id="roxy-location-listbox"
						class="results"
						role="listbox"
					>
						${
							this.results.length === 0
								? html`<li class="empty" role="status">No cities found</li>`
								: this.results.map(
										(city, idx) => html`<li role="presentation">
										<button
											type="button"
											class="option"
											role="option"
											aria-selected=${this.highlight === idx ? 'true' : 'false'}
											@click=${() => this.select(city)}
											@mouseenter=${() => {
												this.highlight = idx;
											}}
										>
											<span class="city">${city.city}</span>
											<span class="where"
												>${city.province ? html`${city.province}, ` : ''}${city.country}</span
											>
											<span class="tz"
												>UTC${city.utcOffset >= 0 ? '+' : ''}${city.utcOffset}</span
											>
										</button>
									</li>`,
									)
						}
					</ul>`
					: nothing
			}
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-location-search': RoxyLocationSearch;
	}
}
