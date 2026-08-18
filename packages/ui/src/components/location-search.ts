import { css, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { RoxyLocalizedElement } from '../i18n/localized-element.js';
import type { SearchCitiesResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { debounce } from '../utils/debounce.js';
import { DEFAULT_BASE_URL, readApiError } from '../utils/fetch-controller.js';
import {
	dispatchKeyRefusal,
	KEY_REFUSED_MESSAGE,
	keyIsRefused,
} from '../utils/key-guard.js';

type CityResult = SearchCitiesResponse['cities'][number];

/**
 * Stateful location search input. Calls /location/search and emits
 * `roxy-location-select` CustomEvent with the chosen city. Required for any
 * chart endpoint.
 *
 * Behavior: 300ms input debounce, click-outside dismiss, keyboard navigation
 * with arrow keys / Enter / Escape, AbortController on stale requests. A search
 * that fails prints the reason under the field and keeps it there until the
 * query changes, so a key or quota fault is legible where it happens instead of
 * surfacing later as a missing field on submit.
 *
 * Attributes:
 *   api-key            optional. Direct call to roxyapi.com when set.
 *   publishable-key    optional. Browser-safe pk_* key with allowed_origins.
 *   endpoint           optional. Where the search sends its request. Absolute, or relative to the
 *                      page, so a site that routes API traffic through its own server names that
 *                      route here. Defaults to the public location endpoint.
 *   placeholder        optional. Input placeholder. Translated when it is the default (see below).
 *   default-value      optional. Pre-filled query.
 *   lang               optional. Display language. Resolves from the page when absent, EXCEPT
 *                      inside another component shadow root, which is why the form forwards it.
 *
 * The words this box writes (its placeholder, its empty state, its busy label, its refusal
 * message) read the page language. The CITY NAMES do not: they are the values the location API
 * returned and are printed as they came back, so the box and the response can never disagree.
 */
@customElement('roxy-location-search')
export class RoxyLocationSearch extends RoxyLocalizedElement {
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
				border-color: var(--roxy-accent-ink, #b45309);
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
				/* Reset the UA <ul> defaults, or the listbox shows disc bullets and a
				 * ~40px inline indent. Small even inset so rounded rows never clip the
				 * container corners. */
				margin: 0;
				padding: var(--roxy-space-xs, 0.25rem);
				list-style: none;
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
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				width: 100%;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				background: transparent;
				border: 0;
				border-radius: var(--roxy-radius-sm, 6px);
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
			.search-error {
				margin: var(--roxy-space-xs, 0.25rem) 0 0;
				color: var(--roxy-danger-fg, #991b1b);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`,
	];

	@property({ type: String, attribute: 'api-key' })
	apiKey?: string;

	@property({ type: String, attribute: 'publishable-key' })
	publishableKey?: string;

	/** Where the search sends its request. Built from {@link DEFAULT_BASE_URL} rather than written out again, so this box and every data request name one origin. */
	@property({ type: String })
	endpoint = `${DEFAULT_BASE_URL}/location/search`;

	/** Input placeholder. The default is a catalogue entry and renders in the page language; a caller-supplied one is printed as given, because a miss returns the source string unchanged. */
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

	/** True when a non-publishable key is present, so the search fail-closes: no network call, a visible error, matching {@link FetchController}. */
	@state()
	private keyBlocked = false;

	/** Message from the last failed search, or null. Rendered under the field and outliving the dropdown, so a failed request reads as a failure rather than as a city that does not exist. */
	@state()
	private error: string | null = null;

	private clickOutsideHandler?: (e: MouseEvent) => void;
	private abortController?: AbortController;
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

	protected willUpdate(changed: PropertyValues): void {
		if (changed.has('publishableKey') || changed.has('apiKey')) {
			// Effective key mirrors fetchResults: publishable-key wins, api-key is the
			// legacy fallback. A set-but-non-pk_ key fail-closes here, warning once.
			const refused = keyIsRefused(this.publishableKey ?? this.apiKey);
			if (refused && !this.keyBlocked) dispatchKeyRefusal(this, { warn: true });
			this.keyBlocked = refused;
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this.clickOutsideHandler) {
			document.removeEventListener('mousedown', this.clickOutsideHandler);
		}
		this.debouncedFetch.cancel();
		if (this.abortController) {
			this.abortController.abort();
			this.abortController = undefined;
		}
	}

	private async fetchResults(q: string) {
		// Fail closed: never send a non-pk_ key. willUpdate has already flipped
		// keyBlocked and surfaced the error; this guards the direct-call paths.
		if (this.keyBlocked) return;
		// Abort any in-flight request so a stale response cannot overwrite a
		// fresher one (debounced typing) or land after disconnect.
		if (this.abortController) this.abortController.abort();
		const controller = new AbortController();
		this.abortController = controller;
		this.isLoading = true;
		try {
			// Resolved against the page, so a same-origin route ("/api/roxy/location/search")
			// is as valid an endpoint as an absolute URL. A site that proxies its API traffic
			// writes the first shape, and a bare `new URL()` accepts only the second.
			const url = new URL(this.endpoint, document.baseURI);
			url.searchParams.set('q', q);
			url.searchParams.set('limit', '8');
			const headers: Record<string, string> = {
				Accept: 'application/json',
			};
			// publishable-key wins when both are set. Surfacing the conflict at the
			// console (not as a thrown error) avoids breaking widgets that legitimately
			// have a stale secret key around while migrating to publishable.
			if (this.apiKey && this.publishableKey) {
				console.warn(
					'[roxy-location-search] both api-key and publishable-key set; using publishable-key. Remove api-key from your widget markup.',
				);
			}
			const key = this.publishableKey ?? this.apiKey;
			if (key) headers['X-API-Key'] = key;
			const res = await fetch(url, { headers, signal: controller.signal });
			if (!res.ok) throw new Error(await readApiError(res));
			const json = (await res.json()) as SearchCitiesResponse;
			if (controller.signal.aborted) return;
			this.error = null;
			this.results = json.cities ?? [];
			// Open even on zero matches, or the empty state can never render: gating this
			// on `length > 0` closed the box on an empty result and said nothing at all.
			this.isOpen = true;
			this.highlight = this.results.length > 0 ? 0 : -1;
		} catch (err) {
			if ((err as { name?: string })?.name === 'AbortError') return;
			this.results = [];
			this.isOpen = false;
			this.highlight = -1;
			this.error = err instanceof Error ? err.message : String(err);
		} finally {
			if (this.abortController === controller) {
				this.abortController = undefined;
			}
			if (!controller.signal.aborted) this.isLoading = false;
		}
	}

	private onInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		this.query = value;
		if (value.length < 2) {
			this.results = [];
			this.isOpen = false;
			this.highlight = -1;
			this.error = null;
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
		if (this.keyBlocked) {
			return html`<div class="roxy-error" role="alert">
				${this.t(KEY_REFUSED_MESSAGE)}
			</div>`;
		}
		return html`<div class="field">
			<input
				part="input"
				type="text"
				role="combobox"
				aria-expanded=${this.isOpen ? 'true' : 'false'}
				aria-controls="roxy-location-listbox"
				aria-activedescendant=${
					this.isOpen && this.highlight >= 0
						? `roxy-location-option-${this.highlight}`
						: ''
				}
				aria-autocomplete="list"
				autocomplete="off"
				placeholder=${this.t(this.placeholder)}
				.value=${this.query}
				@input=${this.onInput}
				@keydown=${this.onKeyDown}
				@focus=${() => {
					if (this.results.length > 0) this.isOpen = true;
				}}
			/>
			${
				this.isLoading
					? html`<span class="spinner" role="status" aria-label=${this.t('Loading')}></span>`
					: nothing
			}
			${
				this.isOpen
					? html`<ul
						id="roxy-location-listbox"
						part="results"
						class="results"
						role="listbox"
					>
						${
							this.results.length === 0
								? html`<li class="empty" role="status">${this.t('No cities found')}</li>`
								: this.results.map(
										(city, idx) => html`<li role="presentation">
										<button
											type="button"
											part="option"
											class="option"
											role="option"
											id=${`roxy-location-option-${idx}`}
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
		</div>
		${
			/*
			 * Outside `.field` on purpose, so it is not part of the dropdown and does not
			 * close with it. The click that submits the surrounding form also dismisses
			 * the dropdown through the click-outside handler, and that is the same moment
			 * the form reports the field as unfilled, so a reason rendered inside the
			 * popup would disappear exactly when it becomes worth reading.
			 *
			 * Through `t()` for the same reason {@link RoxyDataElement.renderError} does
			 * it: most of what lands here is a wire fact that misses the catalogue and
			 * renders unchanged, but one of them is ours, and translating a message on
			 * one surface and not the other puts two languages on one page.
			 */
			this.error
				? html`<p class="search-error" role="alert">${this.t(this.error)}</p>`
				: nothing
		}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-location-search': RoxyLocationSearch;
	}
}
