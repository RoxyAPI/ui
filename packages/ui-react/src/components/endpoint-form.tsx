import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children'
>;

export interface RoxyEndpointFormProps extends ElementAttrs {
	className?: string;
	style?: React.CSSProperties;
	/** Endpoint path the form is built for and submits to, e.g. "astrology/natal-chart". The fields are derived from the spec for that operation. */
	endpoint?: string;
	/** HTTP method of the operation. Defaults to POST. */
	method?: 'GET' | 'POST';
	/** Explicit OpenAPI spec URL to build the form from. Empty resolves a version-pinned slice first, then the production spec. */
	specUrl?: string;
	/** Override the submit-button label. Empty derives an outcome-first label from the endpoint. */
	submitLabel?: string;
	/** Browser-safe publishable key (pk_) forwarded to the slotted city search so a natal or synastry form can geocode. */
	publishableKey?: string;
	/** Where the slotted city search sends its request, absolute or page-relative. Set it when the page routes its API traffic through its own server. Unset, the search keeps its own default. */
	locationUrl?: string;
	/** Prefill values keyed by field name, nested per group. Used to restore a previous submission. Property only, never an attribute. */
	initialValues?: Record<string, unknown>;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-submit`. */
	onRoxySubmit?: (event: CustomEvent<{ endpoint: string; values: Record<string, unknown>; queryKeys: string[]; sticky: boolean }>) => void;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-validation-error`. */
	onRoxyValidationError?: (event: CustomEvent<{ missing: string[] }>) => void;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-spec-error`. */
	onRoxySpecError?: (event: CustomEvent<{ url: string; message: string }>) => void;
}

export const RoxyEndpointForm = React.forwardRef<HTMLElement | null, RoxyEndpointFormProps>(
	function RoxyEndpointForm({ className, style, endpoint, method, specUrl, submitLabel, publishableKey, locationUrl, initialValues, onRoxySubmit, onRoxyValidationError, onRoxySpecError, ...rest }, ref) {
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
			if (el && specUrl !== undefined) {
				(el as unknown as { specUrl: string }).specUrl = specUrl;
			}
		}, [specUrl, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && submitLabel !== undefined) {
				(el as unknown as { submitLabel: string }).submitLabel = submitLabel;
			}
		}, [submitLabel, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && publishableKey !== undefined) {
				(el as unknown as { publishableKey: string }).publishableKey = publishableKey;
			}
		}, [publishableKey, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && locationUrl !== undefined) {
				(el as unknown as { locationUrl: string }).locationUrl = locationUrl;
			}
		}, [locationUrl, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && initialValues !== undefined) {
				(el as unknown as { initialValues: Record<string, unknown> }).initialValues = initialValues;
			}
		}, [initialValues, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			const handler = onRoxySubmit;
			if (!el || !handler) return;
			const listener = (event: Event) => handler(event as CustomEvent<{ endpoint: string; values: Record<string, unknown>; queryKeys: string[]; sticky: boolean }>);
			el.addEventListener('roxy-submit', listener);
			return () => el.removeEventListener('roxy-submit', listener);
		}, [onRoxySubmit, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			const handler = onRoxyValidationError;
			if (!el || !handler) return;
			const listener = (event: Event) => handler(event as CustomEvent<{ missing: string[] }>);
			el.addEventListener('roxy-validation-error', listener);
			return () => el.removeEventListener('roxy-validation-error', listener);
		}, [onRoxyValidationError, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			const handler = onRoxySpecError;
			if (!el || !handler) return;
			const listener = (event: Event) => handler(event as CustomEvent<{ url: string; message: string }>);
			el.addEventListener('roxy-spec-error', listener);
			return () => el.removeEventListener('roxy-spec-error', listener);
		}, [onRoxySpecError, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-endpoint-form', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
