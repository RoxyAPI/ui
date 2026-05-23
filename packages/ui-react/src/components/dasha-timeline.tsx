import type { GetCurrentDashaResponse, GetMajorDashasResponse, GetSubDashasResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyDashaTimelineProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetCurrentDashaResponse | GetMajorDashasResponse | GetSubDashasResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Which dasha response shape to render: the current running periods, the major mahadashas, or the sub-period breakdown. */
	period?: 'current' | 'major' | 'sub';

}

export const RoxyDashaTimeline = React.forwardRef<HTMLElement | null, RoxyDashaTimelineProps>(
	function RoxyDashaTimeline({ data, className, style, period, ...rest }, ref) {
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
			if (el && period !== undefined) {
				(el as unknown as { period: 'current' | 'major' | 'sub' }).period = period;
			}
		}, [period, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-dasha-timeline', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
