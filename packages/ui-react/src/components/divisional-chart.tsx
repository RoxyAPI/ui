import type { DivisionalChartResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyDivisionalChartProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: DivisionalChartResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Initial regional varga layout. The end user can switch styles at runtime via the visible tablist. */
	chartStyle?: 'south' | 'north' | 'east';

}

export const RoxyDivisionalChart = React.forwardRef<HTMLElement | null, RoxyDivisionalChartProps>(
	function RoxyDivisionalChart({ data, className, style, chartStyle, ...rest }, ref) {
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
			if (el && chartStyle !== undefined) {
				(el as unknown as { chartStyle: 'south' | 'north' | 'east' }).chartStyle = chartStyle;
			}
		}, [chartStyle, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-divisional-chart', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
