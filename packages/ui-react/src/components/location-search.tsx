import type { SearchCitiesResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyLocationSearchProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: unknown;
	className?: string;
	style?: React.CSSProperties;
	/** Fires when the underlying <roxy-location-search> dispatches `roxy-location-select`. */
	onRoxyLocationSelect?: (event: CustomEvent<NonNullable<SearchCitiesResponse['cities']>[number] | { latitude?: number; longitude?: number; timezone?: string; utcOffset?: number; city?: string; province?: string; country?: string }>) => void;
	/** Fires when the underlying <roxy-location-search> dispatches `roxy-validation-error`. */
	onRoxyValidationError?: (event: CustomEvent<{ reason: string; message: string }>) => void;
}

export const RoxyLocationSearch = React.forwardRef<HTMLElement | null, RoxyLocationSearchProps>(
	function RoxyLocationSearch({ data, className, style, onRoxyLocationSelect, onRoxyValidationError, ...rest }, ref) {
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
			const handler = onRoxyLocationSelect;
			if (!el || !handler) return;
			const listener = (event: Event) => handler(event as CustomEvent<NonNullable<SearchCitiesResponse['cities']>[number] | { latitude?: number; longitude?: number; timezone?: string; utcOffset?: number; city?: string; province?: string; country?: string }>);
			el.addEventListener('roxy-location-select', listener);
			return () => el.removeEventListener('roxy-location-select', listener);
		}, [onRoxyLocationSelect, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			const handler = onRoxyValidationError;
			if (!el || !handler) return;
			const listener = (event: Event) => handler(event as CustomEvent<{ reason: string; message: string }>);
			el.addEventListener('roxy-validation-error', listener);
			return () => el.removeEventListener('roxy-validation-error', listener);
		}, [onRoxyValidationError, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-location-search', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
