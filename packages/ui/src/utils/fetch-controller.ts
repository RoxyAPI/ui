import type { ReactiveController, ReactiveControllerHost } from 'lit';
import {
	dispatchKeyRefusal,
	type KeyRefusal,
	keyRefusal,
} from './key-guard.js';

/**
 * Host slots the controller drives. {@link RoxyDataElement} satisfies this, so the form mixin can attach a controller without the component wiring state by hand.
 *
 * @remarks
 * Intersected with `HTMLElement` because the controller dispatches events on the host. Lit's `ReactiveControllerHost` is the update-lifecycle contract only (`addController`, `requestUpdate`, `updateComplete`) and carries no DOM surface, even though every real host is a `LitElement` and therefore an `HTMLElement`. Declaring the DOM half is what the controller actually needs, and it is declared rather than reached through a `this.host as unknown as EventTarget` double cast, which would assert a capability the type never promised.
 */
type FetchHost<T> = ReactiveControllerHost &
	HTMLElement & {
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

/** A failed request, read once: the message every failure carries and the per-field issues a validation failure adds. */
interface ApiFailure {
	message: string;
	issues: ApiIssue[] | null;
	/** False when the body carried no `error` sentence and the message is the status line. */
	worded: boolean;
}

/** The public API root, which a component overrides per instance through its `base-url` attribute; exported so every request names one origin. */
export const DEFAULT_BASE_URL = 'https://roxyapi.com/api/v2';

/**
 * Turn a failed `Response` into the message to show: the API's own `{ error }` string when the body carries one, else the status line.
 *
 * @remarks
 * Exported so every client-side fetch boundary renders the same words for the same failure, the way {@link keyRefusal} centralizes the key refusal. A boundary that discards the response body cannot tell a rejected request from an empty result, and renders the two identically.
 */
export async function readApiError(res: Response): Promise<string> {
	return (await readApiFailure(res)).message;
}

/**
 * The failure a response carries.
 *
 * @remarks
 * A rejected request answers `{ error, code, issues }`, and `issues` is what makes the error actionable: each names the field by its wire path, which is the same identity the form keys its inputs by, so the message can sit under the input it is about instead of in a banner quoting a path. Only a `validation_error` carries them; every other failure keeps the message alone.
 */
async function readApiFailure(res: Response): Promise<ApiFailure> {
	try {
		const body = (await res.json()) as {
			error?: string;
			code?: string;
			issues?: Array<{ path?: unknown; message?: unknown }>;
		};
		if (body?.error) {
			const issues =
				body.code === 'validation_error' && Array.isArray(body.issues)
					? body.issues
							.filter(
								(i) =>
									typeof i.path === 'string' && typeof i.message === 'string',
							)
							.map((i) => ({
								path: i.path as string,
								message: i.message as string,
							}))
					: null;
			return {
				message: body.error,
				issues: issues?.length ? issues : null,
				worded: true,
			};
		}
	} catch {
		// Non-JSON error body: fall through to the status line.
	}
	return {
		message: `Request failed (${res.status})`,
		issues: null,
		worded: false,
	};
}

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

/** A request the API answered with a failure: its own message, plus the fields it named when it rejected the request, and whether the message is a sentence it wrote rather than the status line. */
export class ApiError extends Error {
	constructor(
		message: string,
		readonly issues: ApiIssue[] | null = null,
		readonly worded = true,
	) {
		super(message);
	}
}

/** The key refusal that applies to a route, or undefined when it may send; a proxy route holds its own key, so none applies there. */
export function routeRefusal(route: ApiRoute): KeyRefusal | undefined {
	return route.submitUrl ? undefined : keyRefusal(route.publishableKey);
}

/** True when a route can reach the API at all: it carries a publishable key it may send, or a proxy route that holds one. */
export function canFetch(route: ApiRoute): boolean {
	return !!(route.submitUrl || (route.publishableKey && !routeRefusal(route)));
}

/**
 * Send one request through a route and resolve to the JSON it answered.
 *
 * @remarks
 * The one place a request is built, so the key refusal, the proxy body and the failure reading cannot drift between the elements that fetch. A refused key throws before anything is sent; a failed response throws an {@link ApiError} carrying the API message and, for a rejected body, the fields it named.
 */
export async function apiFetch<T>(
	route: ApiRoute,
	req: RoxyRequest,
	signal?: AbortSignal,
): Promise<T> {
	const refusal = routeRefusal(route);
	if (refusal) throw new ApiError(refusal.message);
	const res = route.submitUrl
		? await fetch(route.submitUrl, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: proxyBody(req, route.submitContext),
				signal,
			})
		: await callApi(route, req, signal);
	if (!res.ok) {
		const failure = await readApiFailure(res);
		throw new ApiError(failure.message, failure.issues, failure.worded);
	}
	return (await res.json()) as T;
}

/**
 * The body of a proxied POST: the request, plus the host context under `context` when one is set.
 *
 * @remarks
 * The context is appended rather than declared on {@link RoxyRequest}, so with none set the payload is the request object itself and every route already written against it keeps receiving the same four keys in the same order. A `null` or an empty object would be a fifth key such a route never agreed to read.
 */
function proxyBody(
	req: RoxyRequest,
	context?: Record<string, unknown>,
): string {
	return JSON.stringify(context ? { ...req, context } : req);
}

/** Direct call against RoxyAPI with the publishable key (the no-backend path). */
function callApi(
	route: ApiRoute,
	req: RoxyRequest,
	signal?: AbortSignal,
): Promise<Response> {
	// Resolved against the page, so a same-origin base ("/api/roxy") is as valid as an
	// absolute one. Every route a host page can name resolves the same way, and a bare
	// `new URL()` would reject the relative shape with an opaque "Invalid URL".
	const url = new URL(
		`${route.baseUrl ?? DEFAULT_BASE_URL}${req.path}`,
		document.baseURI,
	);
	for (const [k, v] of Object.entries(req.query ?? {})) {
		if (v != null) url.searchParams.set(k, String(v));
	}
	const headers: Record<string, string> = { Accept: 'application/json' };
	if (route.publishableKey) headers['X-API-Key'] = route.publishableKey;
	if (req.body != null) headers['Content-Type'] = 'application/json';
	return fetch(url, {
		method: req.method ?? 'GET',
		headers,
		body: req.body != null ? JSON.stringify(req.body) : undefined,
		signal,
	});
}

/**
 * Client-side fetch for uncontrolled (self-fetching) components: drives `host.data` / `host.loading` / `host.error` and cancels a stale request when a newer one starts or the host disconnects.
 *
 * @remarks
 * Security boundary. The only credential this ever sends is a `pk_` publishable key, which carries a server-side origin allowlist. A secret (`sk_`), legacy unprefixed or sample key is refused before any network call and surfaced as an error, so a server secret cannot leak into a browser request. The request itself goes through {@link apiFetch}, which every other fetch on an element shares.
 *
 * Controlled-mode components never construct this. When a server injects the response as a `<script class="roxy-data">` island, there is no key and no fetch, which is the path server-rendered consumers (WordPress, JSX SSR, static HTML) rely on.
 */
export class FetchController<T = unknown>
	implements ReactiveController, ApiRoute
{
	private readonly host: FetchHost<T>;
	private abort?: AbortController;

	/** Browser-safe publishable key. Set by the host from its `publishable-key` attribute. */
	publishableKey?: string;
	/** API origin, overridable for self-hosted or proxied deployments. */
	baseUrl = DEFAULT_BASE_URL;
	/** Consumer backend route that holds the secret key, set from the host `submit-url` attribute; see {@link ApiRoute.submitUrl}. */
	submitUrl?: string;
	/** Object the host page attaches to the proxied request, set from its `submit-context` attribute; see {@link ApiRoute.submitContext}. */
	submitContext?: Record<string, unknown>;
	/** False when the last failure carried no sentence of its own: a dropped connection, or a body with no `error`. */
	worded = true;

	constructor(host: FetchHost<T>) {
		this.host = host;
		host.addController(this);
	}

	hostDisconnected() {
		this.abort?.abort();
		this.abort = undefined;
	}

	/**
	 * Issue the request and resolve once `host.data` (success) or `host.error`
	 * (failure) is set. A no-op return when the key is refused: the error is
	 * already surfaced and nothing is sent.
	 */
	async run(req: RoxyRequest): Promise<void> {
		this.worded = true;
		const refusal = routeRefusal(this);
		if (refusal) {
			this.host.error = refusal.message;
			dispatchKeyRefusal(this.host, refusal);
			return;
		}
		this.abort?.abort();
		const controller = new AbortController();
		this.abort = controller;
		this.host.loading = true;
		this.host.error = null;
		this.host.issues = null;
		try {
			const json = await apiFetch<T>(this, req, controller.signal);
			if (controller.signal.aborted) return;
			this.host.data = json;
		} catch (err) {
			if (controller.signal.aborted) return;
			if ((err as { name?: string })?.name === 'AbortError') return;
			if (err instanceof ApiError) this.host.issues = err.issues;
			this.worded = err instanceof ApiError && err.worded;
			this.host.error = err instanceof Error ? err.message : String(err);
		} finally {
			if (this.abort === controller) this.abort = undefined;
			if (!controller.signal.aborted) this.host.loading = false;
		}
	}
}

/**
 * Translate flat form values into a {@link RoxyRequest} for an endpoint. The `{name}` segments in the endpoint template are substituted from the values and removed; the rest become the JSON body for POST or query parameters for GET. This is the spec-light request builder the base element uses to turn a `<roxy-endpoint-form>` submission into a self-fetch, so a component needs no per-endpoint glue.
 *
 * @param queryKeys - Names the spec declares as `in: query` for this operation, which `<roxy-endpoint-form>` reports on its `roxy-submit` event. A POST operation can still take query parameters (every localized endpoint takes `?lang=`), and sending one in the JSON body silently drops it, so those names are routed to the query string on POST as well as GET.
 */
export function buildRequest(
	endpoint: string,
	method: 'GET' | 'POST',
	values: Record<string, unknown>,
	queryKeys: readonly string[] = [],
): RoxyRequest {
	const rest: Record<string, unknown> = { ...values };
	const path = `/${endpoint.replace(/^\//, '')}`.replace(
		/\{([^}]+)\}/g,
		(_match, name: string) => {
			const v = rest[name];
			delete rest[name];
			return encodeURIComponent(String(v ?? ''));
		},
	);
	const inQuery = new Set(queryKeys);
	const query: Record<string, string | number | undefined> = {};
	const body: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(rest)) {
		if (v === undefined || v === '') continue;
		if (method === 'GET' || inQuery.has(k)) query[k] = v as string | number;
		else body[k] = v;
	}
	return { path, method, query, body: method === 'POST' ? body : undefined };
}
