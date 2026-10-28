import { type CSSResultGroup, type PropertyValues } from 'lit';
import type { SelfFetchEndpoint } from '../generated/endpoint-defaults.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { RoxyLocalizedElement } from '../i18n/localized-element.js';
import { type ApiIssue, type RoxyRequest } from './fetch-controller.js';
import { type InterpSection } from './interp-accordion.js';
/**
 * Shared base for every data-driven Roxy component. Carries once what every component needs, rather than per component, and adds the self-contained, drop-in behavior: controlled-mode hydration, an opt-in self-fetch (form, request, loading, error, empty), the typed `data` slot, and the render switch. A subclass implements one method, {@link RoxyDataElement.renderData}.
 *
 * @remarks
 * Two render modes, one component, which is the whole drop-in contract:
 *
 * - Controlled: a server (WordPress, JSX SSR, static HTML) fetches the response and injects it as a direct-child `<script type="application/json" class="roxy-data">`. {@link MarkupDataController} hydrates `data` from it on connect. No key reaches the browser. This is the path the WordPress plugin drives, and it is unchanged by the base class.
 * - Uncontrolled: no data is injected, but a `pk_` `publishable-key` or a `submit-url` is set, with or without a `data-endpoint` (absent, the endpoint its config attributes select is used). The component renders its own `<roxy-endpoint-form>` (an internal detail, never placed by the consumer), and on submit fetches through {@link FetchController}, which refuses any non-publishable key. The result populates `data` and the component renders it.
 *
 * The JavaScript `data` property always wins over markup, so a host that assigns `el.data = …` after upgrade is authoritative.
 *
 * A list component can open one of its rows in place: it declares {@link RoxyDataElement.rowDetail} (the element that draws one row and the path that fetches it) and calls {@link RoxyDataElement.openRow} on a pick. In self-fetch mode the base creates that element, hands it the key and the settings this element already holds, and {@link RoxyDataElement.load}s the row into it, so a hosted embed completes the flow with no host code. In controlled mode nothing is created and the pick reaches the host as the same `roxy-symbol-select` event it always sent, because the host holds the key and owns the navigation.
 *
 * Self-fetch needs `<roxy-endpoint-form>` (and `<roxy-location-search>`) registered. The CDN bundle and the full `@roxyapi/ui` entry register everything; per-component ESM consumers that want self-fetch import the form component too.
 *
 * Two things every subclass inherits for the host page to shape the render from outside the shadow root, with no JavaScript: the `hide-readings` attribute ({@link RoxyDataElement.hideReadings}), and the `part` names on the base's own branches (`form`, `loading`, `error`, `empty`, `edit-bar`, `attribution`). A component adds `part` to its own structural blocks, drawn from the published part vocabulary.
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
 * }
 * ```
 */
export declare abstract class RoxyDataElement<T = unknown> extends RoxyLocalizedElement {
    static styles: CSSResultGroup;
    /** The endpoints this component renders, in binding order; each component assigns its own generated row, so its bundle carries no other. */
    static endpoints: readonly SelfFetchEndpoint[];
    /** Typed RoxyAPI response. Assigned in JavaScript, hydrated from the roxy-data island, or set by a self-fetch. */
    data: T | null;
    /** Endpoint path for self-fetch, e.g. "astrology/natal-chart" or "dreams/symbols/{id}". Empty uses the endpoint the config attributes select once a key or a `submit-url` is set. */
    endpoint: string;
    /** HTTP method for self-fetch: POST beside an explicit `data-endpoint`, else the method of the endpoint in use. */
    method?: 'GET' | 'POST';
    /** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side. */
    publishableKey?: string;
    /** Override the API origin for self-hosted or proxied deployments. Absolute, or relative to the page for a same-origin route. */
    baseUrl?: string;
    /** Override the OpenAPI spec URL the self-fetch form introspects. */
    specUrl?: string;
    /** Consumer backend route that proxies the request (holds the secret key). When set, self-fetch POSTs the request here instead of calling RoxyAPI directly, so no key reaches the browser. The server-rendered (WordPress) path. */
    submitUrl?: string;
    /**
     * Data the host page chooses, as a JSON object, sent to the {@link RoxyDataElement.submitUrl} route as `context` beside the request. The place a page attaches its own verification data to a proxied submission.
     *
     * @remarks
     * Shapeless by design and never read here: the component parses the attribute, hands the object to the request, and leaves every key of it to the page and the route that answers it. Nothing is sent when it is unset, when the JSON does not parse, and when it parses to anything but an object, so a route written before this existed goes on receiving exactly the request it always did.
     *
     * It rides the proxy path only. A direct call with a `publishable-key` sends what the endpoint declares, so setting this without a `submit-url` does nothing.
     *
     * @example
     * ```html
     * <roxy-natal-chart
     *   submit-url="/api/roxy/proxy"
     *   submit-context='{"token":"..."}'
     * ></roxy-natal-chart>
     * ```
     */
    submitContext?: Record<string, unknown>;
    /**
     * Where the self-fetch form's city search sends its GET, absolute or relative to the page.
     *
     * @remarks
     * Optional beside {@link RoxyDataElement.submitUrl}: unset, the city search is POSTed to that route as `{ path: '/location/search', method: 'GET', query }` like every other request, so one route serves the whole widget. Set it to send the city search somewhere else. It is forwarded to the internal form, which forwards it to the search.
     */
    locationUrl?: string;
    /** Persist the last self-fetch form values in sessionStorage (keyed by endpoint) and prefill the form on reload. */
    remember: boolean;
    /**
     * Render the chart and the data, and omit the written interpretation. Off by default, so a component that does not set it is byte-identical to before.
     *
     * @remarks
     * The suppressed content is the prose an endpoint returns ABOUT the result: the interpretation accordion, the interpretive paragraphs, and the keyword chips that belong to them. Everything a practitioner reads the numbers off stays: wheels, tables, grids, legends, pills, counts and dates. The reading is dropped from the DOM rather than hidden with CSS, so a page that publishes the chart alone never ships the prose it is not showing.
     *
     * Set it when the page supplies its own words, which is the common case for a practitioner site that wants the graphic under its own writing.
     */
    hideReadings: boolean;
    /**
     * Remove named structural blocks from this component, as a comma-separated list of `part` names.
     *
     * @remarks
     * The sibling of {@link RoxyDataElement.hideReadings} and deliberately a different tool. `hide-readings` drops the PROSE an endpoint returns about a result; this drops a whole block whatever it contains, which is what a page wants when the block is measurement rather than writing. Hiding the chart-pattern list on a teaching page is the case it exists for: a T-square is data, so `hide-readings` leaves it standing on purpose.
     *
     * Any name in `components-catalog.json` works, on any component that publishes it, because the rule is generated from the name rather than from a list of components that opted in. A name no block carries costs nothing and hides nothing.
     *
     * **This hides with CSS, it does not remove from the DOM, and the difference is the reason both exist.** A part name is a rendering concern the base can act on generically; whether a block is prose is a question only the component can answer. So a page that must not SHIP the words uses `hide-readings`, and a page that just should not SHOW a block uses this.
     *
     * @example
     * ```html
     * <roxy-natal-chart hide-sections="patterns"></roxy-natal-chart>
     * <roxy-natal-chart hide-sections="patterns, aspects"></roxy-natal-chart>
     * <roxy-natal-chart publishable-key="pk_live_..." hide-sections="hint"></roxy-natal-chart>
     * ```
     */
    hideSections: string;
    /** Override the self-fetch form's submit-button label. Empty derives one from the endpoint. */
    submitLabel?: string;
    /** The host page's own words for a failed self-fetch the API did not word (a dropped connection, a body with no message); a failure the API explains reads as the API worded it. */
    errorMessage?: string;
    /** Render a small "Spiritual data by RoxyAPI" credit under a self-fetch or auto-mount result. Off by default; any value except "off"/"false" enables it. The one-tag widgets script forwards data-attribution as this attribute. Never shown in controlled mode. */
    attribution?: string;
    /** True while an uncontrolled self-fetch is in flight. Public so {@link FetchController} can drive it. */
    loading: boolean;
    /** Message from a failed self-fetch, or null. Public so {@link FetchController} can drive it. */
    error: string | null;
    /** The fields a rejected self-fetch named, or null. Public so {@link FetchController} can drive it; the form prints each under its input. */
    issues: ApiIssue[] | null;
    /**
     * True once a self-fetch (not a consumer-assigned or island-hydrated `data`) produced the current result. It gates the interactive result affordances, so controlled mode never shows an Edit control or a sticky picker.
     */
    private selfFetched;
    /** True when the visitor asked to edit a self-fetch result, so the form is restored over the result. */
    private editing;
    /** True when the last self-fetch form stays above its result (a sole choice, or a form that opened on load), so a change refetches under it. */
    private sticky;
    /** Last submitted form values (nested per group), kept in memory to restore the form on Edit and to prefill the sticky picker. */
    private lastValues?;
    private fetcher;
    /** The element that draws one row of this list and the path that fetches it, `{id}` standing for the picked row. Declared by a list component; absent on everything else, so {@link openRow} is a no-op there. */
    protected rowDetail?: {
        tag: string;
        path: string;
    };
    /** The opened row, or undefined until a pick. A list component renders it under its rows, inside its own `part="detail"` block, so the name is scanned onto that component and not onto every card the base draws. */
    protected openedRow?: RoxyDataElement;
    /** The id of the opened row, so a list can mark the picked tile. */
    protected openedRowId?: string;
    /** The response key a list draws its rows from (`symbols`, `crystals`, `cards`); declared by a list component so the base can page it with {@link renderMore}. */
    protected listKey?: string;
    /** True once a host handed this element a request through {@link load}, which then renders that result alone, never a form. */
    private hostLoaded;
    /** The request behind the data this element fetched for itself, kept so a list can ask for the page after it. */
    private lastRequest?;
    /** True while the next page of a list is in flight. */
    private moreLoading;
    /** Message from a failed next-page read, printed under the button that asked for it. */
    private moreError;
    constructor();
    protected willUpdate(changed: PropertyValues): void;
    /** Hand the request settings to the controller. Called on any change of them, and by {@link load} before it runs, because a host that sets the properties and loads in the same tick has not been through an update yet. */
    private syncFetcher;
    /** The endpoint and method this element self-fetches, or undefined in controlled mode: an explicit `data-endpoint` as given, else, once it holds a key or a proxy route, the endpoint its config attributes select. */
    protected selfFetch(): SelfFetchEndpoint | undefined;
    render(): unknown;
    /**
     * A bespoke card that throws while drawing a response degrades to the generic renderer instead of a dead skeleton.
     *
     * @remarks
     * A response the card was not written for (a sibling endpoint's shape, a field the spec grew) reaches `renderData` as data the type system cannot check at runtime, and a render that throws leaves whatever was on screen before it, which for a self-fetch is the loading placeholder, forever. The library already promises that an endpoint nothing draws falls back to `<roxy-data>`, so a card that cannot draw falls back the same way: the visitor reads the response as a table, the page hears `roxy-render-error` with the exception, and the console names the element. When the generic renderer is not registered (a per-component import), the empty state stands in.
     */
    private drawn;
    /**
     * The one rule set that acts on {@link RoxyDataElement.hideSections}, generated from the names rather than from a list of components.
     *
     * @remarks
     * `[part~="name"]` is the selector because `part` is a space-separated list: the natal chart's aspect grid carries `section aspects table aspect-grid`, so a `~=` match reaches it by any one of its names while `=` would reach it by none. It is emitted INSIDE the shadow root, which is the only place a rule can see a `part` attribute on the element that declares it.
     *
     * Names are filtered to the same `[a-z][a-z0-9-]*` shape the catalog and the WordPress setting both use, so nothing a page passes can close the rule or inject a second one. An unknown name compiles to a selector that matches nothing, which is why there is no validation error and no list of legal names to keep in sync.
     *
     * A `<style>` element in the template rather than a static stylesheet, because static styles are evaluated once and shared across every instance, so two charts on one page could not hide different blocks. Lit supports per-instance style elements; the documented cost is a re-parse when the expression changes, which is irrelevant here because the value is set once from a page attribute and effectively never changes after that.
     *
     * **`!important` is load-bearing and is not a shortcut around specificity.** Lit puts static `styles` in `adoptedStyleSheets`, and the scoping spec applies those AFTER any `<style>` element inside the same shadow root, so an in-tree rule loses to the component's own stylesheet at equal specificity no matter how it is written. Measured: `patterns` is a bare `section` with no declared display and hid correctly without it, while `legend` carries `display:flex` from the static sheet and stayed visible. The WordPress site-wide rule needs no `!important` for the opposite reason, that an outer-tree `::part()` rule already outranks anything inside.
     */
    private hiddenSectionsStyle;
    /** The state machine every render goes through, split out so {@link render} can pair it with the per-instance rules above. */
    private renderState;
    /** Render the populated response. The single method every component implements. */
    protected abstract renderData(data: T): unknown;
    /**
     * The interpretation accordion, gated by {@link RoxyDataElement.hideReadings}. Every component that shows a written reading routes through here instead of calling {@link renderInterpAccordion} directly.
     *
     * @remarks
     * The gate lives on the base rather than in each component because the property does, and a plain render function cannot read component state. One call site per accordion, one place that decides whether prose renders, and the section it emits carries the same `readings` part in every component.
     *
     * Prose that is NOT in an accordion (a summary paragraph, a per-item interpretation) is still the component's own to gate, since only the component knows which of its blocks are readings.
     *
     * @param heading - English source copy, translated here. Typed as {@link ChromeString} so the compiler, not a reviewer, rejects a heading no catalogue carries.
     */
    protected renderInterpretation(sections: InterpSection[], name: string, heading?: ChromeString): unknown;
    /** A self-fetch result under a compact Edit control that restores the form with the previous values. */
    protected renderResult(data: T): unknown;
    /** The form with what stands under it, from ONE call site, so the form element and the choices it read survive every refetch of a form that stays above its result. */
    private renderWithForm;
    /** What a form that stays above its result shows under it: the skeleton while a refetch is in flight, the failure, or the result. */
    private stickyBody;
    /**
     * The next page of a list this element fetched for itself, appended under its rows: a list component places it after its rows, and it draws nothing in controlled mode, once every row is in, or for a response that reports no total.
     */
    protected renderMore(): unknown;
    /** The rows of a list response, or undefined when this element is not a list or the response has none. */
    private listRows;
    private onMore;
    /** Start a request that REPLACES the data: the row a previous list opened and the page state it reached belong to the old data, so they go with it. */
    private fetchFresh;
    private onEdit;
    /**
     * Fetch one request into this element from a host that already holds the key. The result renders as assigned data (no form, no edit bar), which is what a list component needs when it opens one of its rows in place, and the key guard is the same one every self-fetch passes through: a secret key is refused before anything is sent.
     */
    load(req: RoxyRequest): Promise<void>;
    /** A visitor picked a row of this list: emit `roxy-symbol-select` with it for a host that pairs its own detail, then open it here when this element can fetch. */
    protected pickRow(detail: {
        id: string;
    } & Record<string, unknown>): void;
    /**
     * Open one row of this list in place. Only when this element can fetch for itself, a publishable key or a proxy route; a controlled host receives the select event and owns the navigation, so the DOM it was given stays byte-identical. The detail element is created once and reused across picks, carries the key, origin, proxy, section and reading switches and language of this element, and asks the API for the row in the language of the page.
     */
    protected openRow(id: string): void;
    /** True when the attribution credit renders: the attribute is present and not explicitly disabled. */
    private showAttribution;
    /** Small muted credit under a self-fetch or auto-mount result. Reached only from the result path, so controlled mode never renders it. */
    protected renderAttribution(): unknown;
    /** The data-absent branch: the self-fetch form when an endpoint is set, otherwise the empty state. */
    protected renderNoData(): unknown;
    /**
     * Internal self-fetch form. Reuses the introspecting `<roxy-endpoint-form>`; the consumer never places it.
     *
     * @remarks
     * `exportparts` forwards exactly one inner name, `hint`, so the same `::part(hint)` rule works whether the page places the form itself or runs a component in self-fetch mode. The rest of the form parts stay inside: this element is an internal detail, and a name is forwarded only when hiding or restyling that block is a decision a host page makes about ITS page rather than about our form. Field help is that case, because the text is API reference prose and a page written for a client wants its own words or none.
     */
    protected renderForm(): unknown;
    /** Prefill source for the form: the last submission (Edit / sticky refetch) wins over remembered storage. */
    private formInitialValues;
    private onFormSubmit;
    /** sessionStorage key for this component's remembered form values, scoped by endpoint. */
    private rememberKey;
    private readRemembered;
    private writeRemembered;
    /** Terminal empty state: one translated message for every component, addressable as `::part(empty)`. Override only where an empty state must DO something a message cannot. */
    protected renderEmpty(): unknown;
    /** Loading placeholder shown during a self-fetch. */
    protected renderLoading(): unknown;
    /**
     * Error state shown when a self-fetch fails. Keeps the form in view so the request can be retried.
     *
     * The message goes through `t()` because the key refusal messages that reach here are ours: `KEY_REFUSALS` (`utils/key-guard.ts`), which {@link FetchController} assigns when a site owner leaves a secret or sample key in a browser page, and which `<roxy-location-search>` and the form render in their own shadow roots from the same constants. Translating it in one place and not the other would put two languages on one page. Everything else that lands here is a wire fact (an HTTP status, a browser network error), misses the catalogue and renders unchanged.
     */
    protected renderError(message: string): unknown;
    /** The failure line: the message the request failed with, or the host page's own {@link errorMessage} in place of a failure the API did not word. */
    private renderErrorBanner;
}
