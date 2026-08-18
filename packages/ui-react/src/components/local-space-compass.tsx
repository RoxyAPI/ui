import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';
import type { LocalSpaceResponse } from '../types/index.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyLocalSpaceCompassProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: LocalSpaceResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Endpoint path for built-in self-fetch (uncontrolled mode), e.g. "astrology/natal-chart". The component renders its own input form, fetches with the publishable key, and displays the result. Leave unset for controlled mode (pass `data`). */
	endpoint?: string;
	/** HTTP method for the self-fetch request. Defaults to POST. */
	method?: 'GET' | 'POST';
	/** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side and never sent. */
	publishableKey?: string;
	/** Override the API origin for self-hosted or proxied deployments. Absolute, or relative to the page for a same-origin route. */
	baseUrl?: string;
	/** Your own backend route, which holds the secret key. Self-fetch POSTs `{ path, method, body, query }` there instead of calling RoxyAPI directly and renders the JSON your route returns, so no key of any kind reaches the browser. */
	submitUrl?: string;
	/** Where the self-fetch form city search sends its request, absolute or relative to the page. The companion of submitUrl: the city search is a GET the form issues on its own while a visitor types, so a page that routes its API traffic through its own server names that route here as well. Unset, the search calls the public location endpoint. */
	locationUrl?: string;
	/** Override the OpenAPI spec URL the self-fetch form introspects. */
	specUrl?: string;
	/** Response language for self-fetch, forwarded to the API `lang` query parameter (en, tr, de, es, hi, pt, fr, ru). The form never shows a language field; the site owner sets it here. Defaults to English. */
	lang?: string;
	/** Override the self-fetch form submit-button label. Empty derives an outcome-first label from the endpoint (Get reading, Generate, Compare, Cast). */
	submitLabel?: string;
	/** Persist the last self-fetch form values in sessionStorage, keyed by endpoint, and prefill the form when the visitor returns. Off by default. */
	remember?: boolean;
	/** Render a small "Spiritual data by RoxyAPI" credit under a self-fetch result, linking back to RoxyAPI. Off by default; set any value to enable, or "off" to force it off. Never shown in controlled mode. */
	attribution?: string;
	/** Render the chart and the data and omit the written interpretation. Off by default. Use it when the page supplies its own words: the wheels, tables, grids, legends and numbers stay, and the interpretive prose is left out of the markup entirely. */
	hideReadings?: boolean;
	/** Comma-separated list of `part` names to take off this component, for example "patterns" or "patterns, legend". Per element rather than per site, so the same component can drop a block on one page and keep it on another with no CSS. Sibling of hideReadings and a different tool: this hides a whole block whatever it contains, where hideReadings drops interpretive prose out of the markup. Names come from the `parts` array in components-catalog.json; a name the component does not carry hides nothing and is not an error. */
	hideSections?: string;

}

export const RoxyLocalSpaceCompass = React.forwardRef<HTMLElement | null, RoxyLocalSpaceCompassProps>(
	function RoxyLocalSpaceCompass({ data, className, style, endpoint, method, publishableKey, baseUrl, submitUrl, locationUrl, specUrl, lang, submitLabel, remember, attribution, hideReadings, hideSections, ...rest }, ref) {
		const internal = React.useRef<HTMLElement | null>(null);
		React.useImperativeHandle<HTMLElement | null, HTMLElement | null>(
			ref,
			() => internal.current,
			[],
		);
		const [loaded, setLoaded] = React.useState(false);
		const [error, setError] = React.useState<Error | null>(null);

		React.useEffect(() => {
			let active = true;
			ensureScriptLoaded()
				.then(() => {
					if (active) setLoaded(true);
				})
				.catch((err: unknown) => {
					if (!active) return;
					setError(err instanceof Error ? err : new Error(String(err)));
				});
			return () => {
				active = false;
			};
		}, []);

		React.useEffect(() => {
			const el = internal.current;
			if (el && data !== undefined) {
				(el as unknown as { data: unknown }).data = data;
			}
		}, [data, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && endpoint !== undefined) {
				(el as unknown as { endpoint: string }).endpoint = endpoint;
			}
		}, [endpoint, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && method !== undefined) {
				(el as unknown as { method: 'GET' | 'POST' }).method = method;
			}
		}, [method, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && publishableKey !== undefined) {
				(el as unknown as { publishableKey: string }).publishableKey = publishableKey;
			}
		}, [publishableKey, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && baseUrl !== undefined) {
				(el as unknown as { baseUrl: string }).baseUrl = baseUrl;
			}
		}, [baseUrl, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && submitUrl !== undefined) {
				(el as unknown as { submitUrl: string }).submitUrl = submitUrl;
			}
		}, [submitUrl, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && locationUrl !== undefined) {
				(el as unknown as { locationUrl: string }).locationUrl = locationUrl;
			}
		}, [locationUrl, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && specUrl !== undefined) {
				(el as unknown as { specUrl: string }).specUrl = specUrl;
			}
		}, [specUrl, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && lang !== undefined) {
				(el as unknown as { lang: string }).lang = lang;
			}
		}, [lang, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && submitLabel !== undefined) {
				(el as unknown as { submitLabel: string }).submitLabel = submitLabel;
			}
		}, [submitLabel, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && remember !== undefined) {
				(el as unknown as { remember: boolean }).remember = remember;
			}
		}, [remember, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && attribution !== undefined) {
				(el as unknown as { attribution: string }).attribution = attribution;
			}
		}, [attribution, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && hideReadings !== undefined) {
				(el as unknown as { hideReadings: boolean }).hideReadings = hideReadings;
			}
		}, [hideReadings, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && hideSections !== undefined) {
				(el as unknown as { hideSections: string }).hideSections = hideSections;
			}
		}, [hideSections, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-local-space-compass', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
