import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children'
>;

export interface RoxyEndpointFormProps extends ElementAttrs {
	className?: string;
	style?: React.CSSProperties;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-submit`. */
	onRoxySubmit?: (event: CustomEvent<{ endpoint: string; values: Record<string, unknown> }>) => void;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-validation-error`. */
	onRoxyValidationError?: (event: CustomEvent<{ missing: string[] }>) => void;
	/** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-spec-error`. */
	onRoxySpecError?: (event: CustomEvent<{ url: string; message: string }>) => void;
}

export const RoxyEndpointForm = React.forwardRef<HTMLElement | null, RoxyEndpointFormProps>(
	function RoxyEndpointForm({ className, style, onRoxySubmit, onRoxyValidationError, onRoxySpecError, ...rest }, ref) {
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
			const handler = onRoxySubmit;
			if (!el || !handler) return;
			const listener = (event: Event) => handler(event as CustomEvent<{ endpoint: string; values: Record<string, unknown> }>);
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
