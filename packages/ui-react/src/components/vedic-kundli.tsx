import type { BirthChartResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyVedicKundliProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: BirthChartResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Initial regional kundli layout. The end user can switch styles at runtime via the visible tablist. */
	chartStyle?: 'south' | 'north' | 'east';
	/** Ascendant reference point. "lagna" (default) uses the Janma Lagna; "moon" renders the Chandra Lagna (Moon as house 1) from the same response. */
	chartReference?: 'lagna' | 'moon';
	/** Explicit rashi/sign name to pin as the ascendant, overriding both the Janma Lagna and chartReference. Empty by default. Use for Surya Lagna, Arudha Lagna, or any custom reference chart. */
	lagnaOverride?: string;

}

export const RoxyVedicKundli = React.forwardRef<HTMLElement | null, RoxyVedicKundliProps>(
	function RoxyVedicKundli({ data, className, style, chartStyle, chartReference, lagnaOverride, ...rest }, ref) {
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

		React.useEffect(() => {
			const el = internal.current;
			if (el && chartReference !== undefined) {
				(el as unknown as { chartReference: 'lagna' | 'moon' }).chartReference = chartReference;
			}
		}, [chartReference, loaded]);

		React.useEffect(() => {
			const el = internal.current;
			if (el && lagnaOverride !== undefined) {
				(el as unknown as { lagnaOverride: string }).lagnaOverride = lagnaOverride;
			}
		}, [lagnaOverride, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-vedic-kundli', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
