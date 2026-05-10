import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';
import type { GetCurrentMoonPhaseResponse, GetMoonCalendarResponse, GetUpcomingMoonPhasesResponse } from '@roxyapi/ui/types';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyMoonPhaseProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetCurrentMoonPhaseResponse | GetUpcomingMoonPhasesResponse | GetMoonCalendarResponse;
	className?: string;
	style?: React.CSSProperties;

}

export const RoxyMoonPhase = React.forwardRef<HTMLElement | null, RoxyMoonPhaseProps>(
	function RoxyMoonPhase({ data, className, style, ...rest }, ref) {
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

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-moon-phase', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
