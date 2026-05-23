import type { GetCriticalDaysResponse, GetDailyBiorhythmResponse, GetForecastResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyBiorhythmChartProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetDailyBiorhythmResponse | GetForecastResponse | GetCriticalDaysResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Which biorhythm response shape to render: a single day, a multi-day forecast, or the critical days list. */
	mode?: 'daily' | 'forecast' | 'critical-days';

}

export const RoxyBiorhythmChart = React.forwardRef<HTMLElement | null, RoxyBiorhythmChartProps>(
	function RoxyBiorhythmChart({ data, className, style, mode, ...rest }, ref) {
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
			if (el && mode !== undefined) {
				(el as unknown as { mode: 'daily' | 'forecast' | 'critical-days' }).mode = mode;
			}
		}, [mode, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-biorhythm-chart', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
