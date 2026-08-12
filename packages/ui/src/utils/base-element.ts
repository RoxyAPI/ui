import { type CSSResultGroup, html, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { RoxyLocalizedElement } from '../i18n/localized-element.js';
import { baseStyles } from './base-styles.js';
import { buildRequest, FetchController } from './fetch-controller.js';
import {
	type InterpSection,
	renderInterpAccordion,
} from './interp-accordion.js';
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
 * Two things every subclass inherits for the host page to shape the render from outside the shadow root, with no JavaScript: the `hide-readings` attribute ({@link RoxyDataElement.hideReadings}), and the `part` names on the base's own branches (`form`, `loading`, `error`, `edit-bar`, `attribution`). A component adds `part` to its own structural blocks; the vocabulary is in `docs/authoring.md`.
 *
 * Translation is inherited rather than defined here: `t()`, `translator` and `effectiveLang()` live on {@link RoxyLocalizedElement}, which the two declared widgets extend as well, so the form a visitor fills and the card it produces read the same catalogue.
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
export abstract class RoxyDataElement<
	T = unknown,
> extends RoxyLocalizedElement {
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

	/**
	 * Render the chart and the data, and omit the written interpretation. Off by default, so a component that does not set it is byte-identical to before.
	 *
	 * @remarks
	 * The suppressed content is the prose an endpoint returns ABOUT the result: the interpretation accordion, the interpretive paragraphs, and the keyword chips that belong to them. Everything a practitioner reads the numbers off stays: wheels, tables, grids, legends, pills, counts and dates. The reading is dropped from the DOM rather than hidden with CSS, so a page that publishes the chart alone never ships the prose it is not showing.
	 *
	 * Set it when the page supplies its own words, which is the common case for a practitioner site that wants the graphic under its own writing.
	 */
	@property({ type: Boolean, attribute: 'hide-readings', reflect: true })
	hideReadings = false;

	/** Override the self-fetch form's submit-button label. Empty derives one from the endpoint. */
	@property({ type: String, attribute: 'submit-label' })
	submitLabel?: string;

	/** Render a small "Spiritual data by RoxyAPI" credit under a self-fetch or auto-mount result. Off by default; any value except "off"/"false" enables it. The one-tag widgets script turns it on unless data-attribution="off". Never shown in controlled mode. */
	@property({ type: String })
	attribution?: string;

	/** True while an uncontrolled self-fetch is in flight. Public so {@link FetchController} can drive it. */
	@state()
	loading = false;

	/** Message from a failed self-fetch, or null. Public so {@link FetchController} can drive it. */
	@state()
	error: string | null = null;

	/**
	 * True once a self-fetch (not a consumer-assigned or island-hydrated `data`) produced the current result. It gates the interactive result affordances, so controlled mode never shows an Edit control or a sticky picker.
	 */
	@state()
	private selfFetched = false;

	/** True when the visitor asked to edit a self-fetch result, so the form is restored over the result. */
	@state()
	private editing = false;

	/** True when the last self-fetch form was a single-enum picker, so it stays visible above the result and a change refetches. */
	@state()
	private sticky = false;

	/** Last submitted form values (nested per group), kept in memory to restore the form on Edit and to prefill the sticky picker. */
	private lastValues?: Record<string, unknown>;

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
		if (this.data != null) {
			// Controlled mode (consumer-assigned or island-hydrated data) renders the
			// result alone, byte-identical to before: no picker, no Edit. The one
			// exception is the widgets auto-mount attrs-complete path, which assigns
			// data directly AND sets `attribution`; a real controlled consumer never
			// sets the attribute, so this stays byte-identical for them.
			if (!this.selfFetched) {
				return this.showAttribution()
					? html`${this.renderData(this.data)}${this.renderAttribution()}`
					: this.renderData(this.data);
			}
			if (this.editing) return this.renderForm();
			return this.renderResult(this.data);
		}
		return this.renderNoData();
	}

	/** Render the populated response. The single method every component implements. */
	protected abstract renderData(data: T): unknown;

	/**
	 * The interpretation accordion, gated by {@link RoxyDataElement.hideReadings}. Every component that shows a written reading routes through here instead of calling {@link renderInterpAccordion} directly.
	 *
	 * @remarks
	 * The gate lives on the base rather than in each component because the property does, and a plain render function cannot read component state. One call site per accordion, one place that decides whether prose renders, and the section it emits carries the same `readings` part in every component.
	 *
	 * Prose that is NOT in an accordion (a summary paragraph, a per-item interpretation) is still the component's own to gate, since only the component knows which of its blocks are readings.
	 */
	protected renderInterpretation(
		sections: InterpSection[],
		name: string,
		heading?: string,
	): unknown {
		if (this.hideReadings) return nothing;
		// The default heading is localized HERE rather than in the accordion:
		// that is a plain render function with no host, so it cannot read a
		// language, and this is the one call site every component routes through.
		return renderInterpAccordion(sections, name, heading ?? this.t('Reading'));
	}

	/**
	 * A self-fetch result plus its re-query affordance. A single-enum form keeps its picker above the result so a new selection refetches (a sign switch is a new reading); any other form gets a compact Edit control that restores the form with the previous values.
	 */
	protected renderResult(data: T): unknown {
		const body = this.sticky
			? html`${this.renderForm()}${this.renderData(data)}`
			: html`<div class="roxy-edit-bar" part="edit-bar">
					<button type="button" class="roxy-edit" @click=${this.onEdit}>${this.t('Edit query')}</button>
				</div>
				${this.renderData(data)}`;
		return this.showAttribution()
			? html`${body}${this.renderAttribution()}`
			: body;
	}

	private onEdit = () => {
		this.editing = true;
	};

	/** True when the attribution credit renders: the attribute is present and not explicitly disabled. */
	private showAttribution(): boolean {
		return (
			this.attribution != null &&
			this.attribution !== 'off' &&
			this.attribution !== 'false'
		);
	}

	/** Small muted credit under a self-fetch or auto-mount result. Reached only from the result path, so controlled mode never renders it. */
	protected renderAttribution(): unknown {
		return html`<div class="roxy-attribution" part="attribution">
			<a
				href="https://roxyapi.com/?utm_source=widget&utm_medium=embed"
				target="_blank"
				rel="noopener"
				>${this.t('Spiritual data by RoxyAPI')}</a
			>
		</div>`;
	}

	/** The data-absent branch: the self-fetch form when an endpoint is set, otherwise the empty state. */
	protected renderNoData(): unknown {
		return this.endpoint ? this.renderForm() : this.renderEmpty();
	}

	/** Internal self-fetch form. Reuses the introspecting `<roxy-endpoint-form>`; the consumer never places it. */
	protected renderForm(): unknown {
		return html`<roxy-endpoint-form
			part="form"
			data-endpoint=${this.endpoint}
			method=${this.method}
			spec-url=${ifDefined(this.specUrl)}
			publishable-key=${ifDefined(this.publishableKey)}
			submit-label=${ifDefined(this.submitLabel)}
			lang=${ifDefined(this.effectiveLang())}
			.initialValues=${this.formInitialValues()}
			@roxy-submit=${this.onFormSubmit}
		></roxy-endpoint-form>`;
	}

	/** Prefill source for the form: the last submission (Edit / sticky refetch) wins over remembered storage. */
	private formInitialValues(): Record<string, unknown> | undefined {
		return (
			this.lastValues ?? (this.remember ? this.readRemembered() : undefined)
		);
	}

	private onFormSubmit = (e: Event) => {
		const detail = (e as CustomEvent).detail as {
			values: Record<string, unknown>;
			queryKeys?: string[];
			sticky?: boolean;
		};
		this.lastValues = detail.values;
		this.sticky = !!detail.sticky;
		this.selfFetched = true;
		this.editing = false;
		if (this.remember) this.writeRemembered(detail.values);
		void this.fetcher.run(
			buildRequest(
				this.endpoint,
				this.method,
				detail.values,
				detail.queryKeys ?? [],
			),
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
		return html`<div class="roxy-empty" role="status">${this.t('No data')}</div>`;
	}

	/** Loading placeholder shown during a self-fetch. */
	protected renderLoading(): unknown {
		return html`<div
			class="roxy-skeleton"
			style="height: 8rem"
			role="status"
			aria-label=${this.t('Loading')}
			part="loading"
		></div>`;
	}

	/**
	 * Error state shown when a self-fetch fails. Keeps the form in view so the request can be retried.
	 *
	 * The message goes through `t()` because ONE of the messages that reaches here is ours: `KEY_REFUSED_MESSAGE` (`utils/key-guard.ts`), which {@link FetchController} assigns when a site owner pastes a secret key into a browser page, and which `<roxy-location-search>` renders in its own shadow root from the same constant. Translating it in one place and not the other would put two languages on one page. Everything else that lands here is a wire fact (an HTTP status, a browser network error), misses the catalogue and renders unchanged.
	 */
	protected renderError(message: string): unknown {
		const banner = html`<div class="roxy-error" role="alert" part="error">${this.t(message)}</div>`;
		return this.endpoint ? html`${banner}${this.renderForm()}` : banner;
	}
}
