import { type PropertyValues } from 'lit';
import { RoxyLocalizedElement } from '../i18n/localized-element.js';
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
 *   endpoint           optional. Where the search sends its GET. Absolute, or relative to the
 *                      page. Set, it wins over submit-url; unset, the public location endpoint.
 *   submit-url         optional. A proxy route that holds the key. With no endpoint set, the search
 *                      is POSTed there as one request, the way every other request of a widget is.
 *   submit-context     optional. A JSON object sent to submit-url as `context` beside the request.
 *   placeholder        optional. Input placeholder. Translated when it is the default (see below).
 *   default-value      optional. Pre-filled query.
 *   lang               optional. Display language. Resolves from the page when absent, EXCEPT
 *                      inside another component shadow root, which is why the form forwards it.
 *
 * The words this box writes (its placeholder, its empty state, its busy label, its refusal
 * message) read the page language. The CITY NAMES do not: they are the values the location API
 * returned and are printed as they came back, so the box and the response can never disagree.
 */
export declare class RoxyLocationSearch extends RoxyLocalizedElement {
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    apiKey?: string;
    publishableKey?: string;
    /** Where the search sends its GET; unset, the search goes through {@link submitUrl} when one is set, else to the public location endpoint. */
    endpoint?: string;
    /** Proxy route that holds the key; the search is POSTed there when no {@link endpoint} is set. */
    submitUrl?: string;
    /** Object sent to {@link submitUrl} as `context` beside the search. */
    submitContext?: Record<string, unknown>;
    /** Input placeholder. The default is a catalogue entry and renders in the page language; a caller-supplied one is printed as given, because a miss returns the source string unchanged. */
    placeholder: string;
    defaultValue: string;
    private query;
    private results;
    private isOpen;
    private isLoading;
    private highlight;
    /** Why the key is refused, when it is, so the search fail-closes: no network call, a visible error, matching {@link FetchController}. */
    private refusal?;
    /** Message from the last failed search, or null. Rendered under the field and outliving the dropdown, so a failed request reads as a failure rather than as a city that does not exist. */
    private error;
    private clickOutsideHandler?;
    private abortController?;
    private debouncedFetch;
    connectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    disconnectedCallback(): void;
    private fetchResults;
    /** One search: through the proxy route when it is the only route set, else a GET to the endpoint with the key. */
    private search;
    private onInput;
    private select;
    private onKeyDown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-location-search': RoxyLocationSearch;
    }
}
