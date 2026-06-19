import {
	type CSSResultGroup,
	html,
	LitElement,
	type PropertyValues,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { baseStyles } from './base-styles.js';
import { buildRequest, FetchController } from './fetch-controller.js';
import { MarkupDataController } from './markup-data.js';

/**
 * Shared base for every data-driven Roxy component. Consolidates the things every component used to repeat by hand and adds the self-contained, drop-in behavior: controlled-mode hydration, an opt-in self-fetch (form, request, loading, error, empty), the typed `data` slot, and the render switch. A subclass implements one method, {@link RoxyDataElement.renderData}.
 *
 * @remarks
 * Two render modes, one component, which is the whole drop-in contract:
 *
 * - Controlled: a server (WordPress, JSX SSR, static HTML) fetches the response and injects it as a direct-child `<script type="application/json" class="roxy-data">`. {@link MarkupDataController} hydrates `data` from it on connect. No key reaches the browser. This is the path the WordPress plugin drives, and it is unchanged by the base class.
 * - Uncontrolled: no data is injected, but a `data-endpoint` and a `pk_` `publishable-key` are set. The component renders its own `<roxy-endpoint-form>` (an internal detail, never placed by the consumer), and on submit fetches through {@link FetchController}, which refuses any non-publishable key. The result populates `data` and the component renders it.
 *
 * The JavaScript `data` property always wins over markup, so a host that assigns `el.data = …` after upgrade is authoritative.
 *
 * Self-fetch needs `<roxy-endpoint-form>` (and `<roxy-location-search>`) registered. The CDN bundle and the full `@roxyapi/ui` entry register everything; per-component ESM consumers that want self-fetch import the form component too.
 *
 * @example
 * ```ts
 * @customElement('roxy-dream-card')
 * export class RoxyDreamCard extends RoxyDataElement<GetDreamSymbolResponse> {
 *   static styles = [baseStyles, css`.card { … }`];
 *   protected renderData(d: GetDreamSymbolResponse) {
 *     return html`<article class="card">…</article>`;
 *   }
 *   protected renderEmpty() {
 *     return html`<div class="roxy-empty" role="status">No dream symbol</div>`;
 *   }
 * }
 * ```
 */
export abstract class RoxyDataElement<T = unknown> extends LitElement {
	static styles: CSSResultGroup = [baseStyles];

	/** Typed RoxyAPI response. Assigned in JavaScript, hydrated from the roxy-data island, or set by a self-fetch. */
	@property({ attribute: false })
	data: T | null = null;

	/** Endpoint path for self-fetch, e.g. "astrology/natal-chart" or "dreams/symbols/{id}". Empty disables self-fetch (controlled mode only). */
	@property({ type: String, attribute: 'data-endpoint' })
	endpoint = '';

	/** HTTP method for self-fetch. */
	@property({ type: String })
	method: 'GET' | 'POST' = 'POST';

	/** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side. */
	@property({ type: String, attribute: 'publishable-key' })
	publishableKey?: string;

	/** Override the API origin for self-hosted or proxied deployments. */
	@property({ type: String, attribute: 'base-url' })
	baseUrl?: string;

	/** Override the OpenAPI spec URL the self-fetch form introspects. */
	@property({ type: String, attribute: 'spec-url' })
	specUrl?: string;

	/** Consumer backend route that proxies the request (holds the secret key). When set, self-fetch POSTs the request here instead of calling RoxyAPI directly, so no key reaches the browser. The server-rendered (WordPress) path. */
	@property({ type: String, attribute: 'submit-url' })
	submitUrl?: string;

	/** Persist the last self-fetch form values in sessionStorage (keyed by endpoint) and prefill the form on reload. */
	@property({ type: Boolean })
	remember = false;

	/** True while an uncontrolled self-fetch is in flight. Public so {@link FetchController} can drive it. */
	@state()
	loading = false;

	/** Message from a failed self-fetch, or null. Public so {@link FetchController} can drive it. */
	@state()
	error: string | null = null;

	private fetcher: FetchController<T>;

	constructor() {
		super();
		// Controlled mode: hydrate `data` from a direct-child roxy-data island when
		// no JS property was assigned. Keyless; the server already fetched.
		new MarkupDataController<T>(this);
		this.fetcher = new FetchController<T>(this);
	}

	protected willUpdate(changed: PropertyValues): void {
		if (changed.has('publishableKey')) {
			this.fetcher.publishableKey = this.publishableKey;
		}
		if (changed.has('baseUrl') && this.baseUrl) {
			this.fetcher.baseUrl = this.baseUrl;
		}
		if (changed.has('submitUrl')) {
			this.fetcher.submitUrl = this.submitUrl;
		}
	}

	render(): unknown {
		if (this.loading) return this.renderLoading();
		if (this.error != null) return this.renderError(this.error);
		if (this.data != null) return this.renderData(this.data);
		return this.renderNoData();
	}

	/** Render the populated response. The single method every component implements. */
	protected abstract renderData(data: T): unknown;

	/** The data-absent branch: the self-fetch form when an endpoint is set, otherwise the empty state. */
	protected renderNoData(): unknown {
		return this.endpoint ? this.renderForm() : this.renderEmpty();
	}

	/** Internal self-fetch form. Reuses the introspecting `<roxy-endpoint-form>`; the consumer never places it. */
	protected renderForm(): unknown {
		return html`<roxy-endpoint-form
			data-endpoint=${this.endpoint}
			method=${this.method}
			spec-url=${ifDefined(this.specUrl)}
			.initialValues=${this.remember ? this.readRemembered() : undefined}
			@roxy-submit=${this.onFormSubmit}
		></roxy-endpoint-form>`;
	}

	private onFormSubmit = (e: Event) => {
		const detail = (e as CustomEvent).detail as {
			values: Record<string, unknown>;
		};
		if (this.remember) this.writeRemembered(detail.values);
		void this.fetcher.run(
			buildRequest(this.endpoint, this.method, detail.values),
		);
	};

	/** sessionStorage key for this component's remembered form values, scoped by endpoint. */
	private rememberKey(): string {
		return `roxy-ui:form:${this.endpoint}`;
	}

	private readRemembered(): Record<string, unknown> | undefined {
		try {
			const raw = sessionStorage.getItem(this.rememberKey());
			return raw ? (JSON.parse(raw) as Record<string, unknown>) : undefined;
		} catch {
			return undefined;
		}
	}

	private writeRemembered(values: Record<string, unknown>): void {
		try {
			sessionStorage.setItem(this.rememberKey(), JSON.stringify(values));
		} catch {
			// Private mode / disabled storage: remembering is best-effort, never fatal.
		}
	}

	/** Terminal empty state. Subclasses override for a domain-specific message. */
	protected renderEmpty(): unknown {
		return html`<div class="roxy-empty" role="status">No data</div>`;
	}

	/** Loading placeholder shown during a self-fetch. */
	protected renderLoading(): unknown {
		return html`<div
			class="roxy-skeleton"
			style="height: 8rem"
			role="status"
			aria-label="Loading"
		></div>`;
	}

	/** Error state shown when a self-fetch fails. Keeps the form in view so the request can be retried. */
	protected renderError(message: string): unknown {
		const banner = html`<div class="roxy-error" role="alert">${message}</div>`;
		return this.endpoint ? html`${banner}${this.renderForm()}` : banner;
	}
}
