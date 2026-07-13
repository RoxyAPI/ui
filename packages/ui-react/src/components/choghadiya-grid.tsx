import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';
import type { GetChoghadiyaResponse } from '../types/index.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyChoghadiyaGridProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetChoghadiyaResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Endpoint path for built-in self-fetch (uncontrolled mode), e.g. "astrology/natal-chart". The component renders its own input form, fetches with the publishable key, and displays the result. Leave unset for controlled mode (pass `data`). */
	endpoint?: string;
	/** HTTP method for the self-fetch request. Defaults to POST. */
	method?: 'GET' | 'POST';
	/** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side and never sent. */
	publishableKey?: string;
	/** Override the API origin for self-hosted or proxied deployments. */
	baseUrl?: string;
	/** Override the OpenAPI spec URL the self-fetch form introspects. */
	specUrl?: string;

}

export const RoxyChoghadiyaGrid = React.forwardRef<HTMLElement | null, RoxyChoghadiyaGridProps>(
	function RoxyChoghadiyaGrid({ data, className, style, endpoint, method, publishableKey, baseUrl, specUrl, ...rest }, ref) {
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
			if (el && specUrl !== undefined) {
				(el as unknown as { specUrl: string }).specUrl = specUrl;
			}
		}, [specUrl, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-choghadiya-grid', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
