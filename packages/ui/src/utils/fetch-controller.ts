import type { ReactiveController, ReactiveControllerHost } from 'lit';
import {
	dispatchKeyRefusal,
	KEY_REFUSED_MESSAGE,
	keyIsRefused,
} from './key-guard.js';

/**
 * Host slots the controller drives. {@link RoxyDataElement} satisfies this, so the form mixin can attach a controller without the component wiring state by hand.
 *
 * @remarks
 * Intersected with `HTMLElement` because the controller dispatches events on the host. Lit's `ReactiveControllerHost` is the update-lifecycle contract only (`addController`, `requestUpdate`, `updateComplete`) and carries no DOM surface, even though every real host is a `LitElement` and therefore an `HTMLElement`. Declaring the DOM half is what the controller actually needs; it used to reach it through a `this.host as unknown as EventTarget` double cast instead, which asserted a capability the type never promised.
 */
type FetchHost<T> = ReactiveControllerHost &
	HTMLElement & {
		data: T | null;
		loading: boolean;
		error: string | null;
	};

/** Default RoxyAPI v2 origin. A component overrides it per instance via its `base-url` attribute. */
const DEFAULT_BASE_URL = 'https://roxyapi.com/api/v2';

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
 * Client-side fetch for uncontrolled (self-fetching) components: drives `host.data` / `host.loading` / `host.error` and cancels a stale request when a newer one starts or the host disconnects.
 *
 * @remarks
 * Security boundary. The only credential this ever sends is a `pk_` publishable key, which carries a server-side origin allowlist. A secret (`sk_`) or legacy unprefixed key is refused before any network call and surfaced as an error, so a server secret cannot leak into a browser request. This centralizes the guard that originated in `<roxy-location-search>` so every self-fetching component enforces it identically.
 *
 * Controlled-mode components never construct this. When a server injects the response as a `<script class="roxy-data">` island, there is no key and no fetch, which is the path server-rendered consumers (WordPress, JSX SSR, static HTML) rely on.
 */
export class FetchController<T = unknown> implements ReactiveController {
	private readonly host: FetchHost<T>;
	private abort?: AbortController;

	/** Browser-safe publishable key. Set by the host from its `publishable-key` attribute. */
	publishableKey?: string;
	/** API origin, overridable for self-hosted or proxied deployments. */
	baseUrl = DEFAULT_BASE_URL;
	/**
	 * Consumer backend route that holds the secret key. When set, the request is POSTed here as `{ path, method, body, query }` instead of called against RoxyAPI directly, so no key (publishable or secret) is sent from the browser. This is the canonical path for server-rendered hosts (WordPress); the backend proxies the request with its own `sk_` key and returns the JSON response.
	 */
	submitUrl?: string;

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
	 * (failure) is set. A no-op return when a non-publishable key is present:
	 * the error is already surfaced and nothing is sent.
	 */
	async run(req: RoxyRequest): Promise<void> {
		// submit-url proxy: no key leaves the browser; the consumer's backend holds it.
		if (!this.submitUrl && this.secretKeyRefused()) return;
		this.abort?.abort();
		const controller = new AbortController();
		this.abort = controller;
		this.host.loading = true;
		this.host.error = null;
		try {
			const res = this.submitUrl
				? await fetch(this.submitUrl, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(req),
						signal: controller.signal,
					})
				: await this.callApi(req, controller.signal);
			if (!res.ok) throw new Error(await this.readError(res));
			const json = (await res.json()) as T;
			if (controller.signal.aborted) return;
			this.host.data = json;
		} catch (err) {
			if ((err as { name?: string })?.name === 'AbortError') return;
			this.host.error = err instanceof Error ? err.message : String(err);
		} finally {
			if (this.abort === controller) this.abort = undefined;
			if (!controller.signal.aborted) this.host.loading = false;
		}
	}

	/** Direct call against RoxyAPI with the publishable key (the no-backend path). */
	private callApi(req: RoxyRequest, signal: AbortSignal): Promise<Response> {
		const url = new URL(`${this.baseUrl}${req.path}`);
		for (const [k, v] of Object.entries(req.query ?? {})) {
			if (v != null) url.searchParams.set(k, String(v));
		}
		const headers: Record<string, string> = { Accept: 'application/json' };
		if (this.publishableKey) headers['X-API-Key'] = this.publishableKey;
		if (req.body != null) headers['Content-Type'] = 'application/json';
		return fetch(url, {
			method: req.method ?? 'GET',
			headers,
			body: req.body != null ? JSON.stringify(req.body) : undefined,
			signal,
		});
	}

	/** True when a key is set and it is not a browser-safe `pk_` publishable key. Surfaces the error and refuses to send, via the shared {@link keyIsRefused} guard so every fetch boundary fail-closes identically. */
	private secretKeyRefused(): boolean {
		if (!keyIsRefused(this.publishableKey)) return false;
		this.host.error = KEY_REFUSED_MESSAGE;
		dispatchKeyRefusal(this.host);
		return true;
	}

	/** Surface the `{ error, code }` message the API returns on failure, falling back to the status code. */
	private async readError(res: Response): Promise<string> {
		try {
			const body = (await res.json()) as { error?: string };
			if (body?.error) return body.error;
		} catch {
			// Non-JSON error body: fall through to the status line.
		}
		return `Request failed (${res.status})`;
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
