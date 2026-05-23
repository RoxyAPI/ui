import type { NatalChartResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyNatalChartProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: NatalChartResponse;
	className?: string;
	style?: React.CSSProperties;
	/** House system the chart was cast with. Labels the house cusps; does not recompute positions. */
	houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch';

}

export const RoxyNatalChart = React.forwardRef<HTMLElement | null, RoxyNatalChartProps>(
	function RoxyNatalChart({ data, className, style, houseSystem, ...rest }, ref) {
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
			if (el && houseSystem !== undefined) {
				(el as unknown as { houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch' }).houseSystem = houseSystem;
			}
		}, [houseSystem, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-natal-chart', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
