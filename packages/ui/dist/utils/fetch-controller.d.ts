import type { ComplexAttributeConverter, ReactiveController, ReactiveControllerHost } from 'lit';
import { type KeyRefusal } from './key-guard.js';
/**
 * Host slots the controller drives. {@link RoxyDataElement} satisfies this, so the form mixin can attach a controller without the component wiring state by hand.
 *
 * @remarks
 * Intersected with `HTMLElement` because the controller dispatches events on the host. Lit's `ReactiveControllerHost` is the update-lifecycle contract only (`addController`, `requestUpdate`, `updateComplete`) and carries no DOM surface, even though every real host is a `LitElement` and therefore an `HTMLElement`. Declaring the DOM half is what the controller actually needs, and it is declared rather than reached through a `this.host as unknown as EventTarget` double cast, which would assert a capability the type never promised.
 */
type FetchHost<T> = ReactiveControllerHost & HTMLElement & {
    data: T | null;
    loading: boolean;
    error: string | null;
    /** The field-level issues of a rejected request, or null when the failure was not about the request body. */
    issues: ApiIssue[] | null;
};
/** One field the API rejected, as the API reports it: the wire path of the field (`year`, `person1.date`, `members.0.date`) and the reason. */
export interface ApiIssue {
    path: string;
    message: string;
}
/** The public API root, which a component overrides per instance through its `base-url` attribute; exported so every request names one origin. */
export declare const DEFAULT_BASE_URL = "https://roxyapi.com/api/v2";
/**
 * Turn a failed `Response` into the message to show: the API's own `{ error }` string when the body carries one, else the status line.
 *
 * @remarks
 * Exported so every client-side fetch boundary renders the same words for the same failure, the way {@link keyRefusal} centralizes the key refusal. A boundary that discards the response body cannot tell a rejected request from an empty result, and renders the two identically.
 */
export declare function readApiError(res: Response): Promise<string>;
/** A single request the controller issues on the component's behalf. */
export interface RoxyRequest {
    /** Path under the API base, e.g. "/dreams/symbols/water" or "/astrology/natal-chart". */
    path: string;
    method?: 'GET' | 'POST';
    /** JSON body for POST endpoints. */
    body?: unknown;
    /** Query string parameters; nullish values are dropped. */
    query?: Record<string, string | number | undefined>;
}
/**
 * Where an element sends its requests: the key it may present, the API origin, and the host route that proxies them.
 *
 * @remarks
 * Every element that fetches holds these four, and {@link apiFetch} is the one function that turns them into a request, so a list that loads its next page, a form that loads its choices and a component that loads its result reach the API, or the host route standing in for it, the same way.
 */
export interface ApiRoute {
    /** Browser-safe publishable key; anything else is refused before a request is made. */
    publishableKey?: string;
    /** API origin, absolute or relative to the page; {@link DEFAULT_BASE_URL} when unset. */
    baseUrl?: string;
    /** Host route that holds the secret key. When set, the request is POSTed there as `{ path, method, body, query }` and no key leaves the browser. */
    submitUrl?: string;
    /** Object the host page attaches to a proxied request as `context`, passed through unread. */
    submitContext?: Record<string, unknown>;
}
/**
 * Read the `submit-context` attribute into the object a proxied submit carries.
 *
 * @remarks
 * Hand-written rather than `type: Object`, which resolves malformed JSON to `null` in silence: a page whose context never left has nothing to look at, and the route it was meant for reports only that the value it expected is not there. One warning covers both refusals (unparseable, or parsed to something that is not an object) because both leave the request without a context, which is the fact worth reading.
 */
export declare const submitContextConverter: ComplexAttributeConverter<Record<string, unknown> | undefined>;
/** A request the API answered with a failure: its own message, plus the fields it named when it rejected the request, and whether the message is a sentence it wrote rather than the status line. */
export declare class ApiError extends Error {
    readonly issues: ApiIssue[] | null;
    readonly worded: boolean;
    constructor(message: string, issues?: ApiIssue[] | null, worded?: boolean);
}
/** The key refusal that applies to a route, or undefined when it may send; a proxy route holds its own key, so none applies there. */
export declare function routeRefusal(route: ApiRoute): KeyRefusal | undefined;
/** True when a route can reach the API at all: it carries a publishable key it may send, or a proxy route that holds one. */
export declare function canFetch(route: ApiRoute): boolean;
/**
 * Send one request through a route and resolve to the JSON it answered.
 *
 * @remarks
 * The one place a request is built, so the key refusal, the proxy body and the failure reading cannot drift between the elements that fetch. A refused key throws before anything is sent; a failed response throws an {@link ApiError} carrying the API message and, for a rejected body, the fields it named.
 */
export declare function apiFetch<T>(route: ApiRoute, req: RoxyRequest, signal?: AbortSignal): Promise<T>;
/**
 * Client-side fetch for uncontrolled (self-fetching) components: drives `host.data` / `host.loading` / `host.error` and cancels a stale request when a newer one starts or the host disconnects.
 *
 * @remarks
 * Security boundary. The only credential this ever sends is a `pk_` publishable key, which carries a server-side origin allowlist. A secret (`sk_`), legacy unprefixed or sample key is refused before any network call and surfaced as an error, so a server secret cannot leak into a browser request. The request itself goes through {@link apiFetch}, which every other fetch on an element shares.
 *
 * Controlled-mode components never construct this. When a server injects the response as a `<script class="roxy-data">` island, there is no key and no fetch, which is the path server-rendered consumers (WordPress, JSX SSR, static HTML) rely on.
 */
export declare class FetchController<T = unknown> implements ReactiveController, ApiRoute {
    private readonly host;
    private abort?;
    /** Browser-safe publishable key. Set by the host from its `publishable-key` attribute. */
    publishableKey?: string;
    /** API origin, overridable for self-hosted or proxied deployments. */
    baseUrl: string;
    /** Consumer backend route that holds the secret key, set from the host `submit-url` attribute; see {@link ApiRoute.submitUrl}. */
    submitUrl?: string;
    /** Object the host page attaches to the proxied request, set from its `submit-context` attribute; see {@link ApiRoute.submitContext}. */
    submitContext?: Record<string, unknown>;
    /** False when the last failure carried no sentence of its own: a dropped connection, or a body with no `error`. */
    worded: boolean;
    constructor(host: FetchHost<T>);
    hostDisconnected(): void;
    /**
     * Issue the request and resolve once `host.data` (success) or `host.error`
     * (failure) is set. A no-op return when the key is refused: the error is
     * already surfaced and nothing is sent.
     */
    run(req: RoxyRequest): Promise<void>;
}
/**
 * Translate flat form values into a {@link RoxyRequest} for an endpoint. The `{name}` segments in the endpoint template are substituted from the values and removed; the rest become the JSON body for POST or query parameters for GET. This is the spec-light request builder the base element uses to turn a `<roxy-endpoint-form>` submission into a self-fetch, so a component needs no per-endpoint glue.
 *
 * @param queryKeys - Names the spec declares as `in: query` for this operation, which `<roxy-endpoint-form>` reports on its `roxy-submit` event. A POST operation can still take query parameters (every localized endpoint takes `?lang=`), and sending one in the JSON body silently drops it, so those names are routed to the query string on POST as well as GET.
 */
export declare function buildRequest(endpoint: string, method: 'GET' | 'POST', values: Record<string, unknown>, queryKeys?: readonly string[]): RoxyRequest;
export {};
