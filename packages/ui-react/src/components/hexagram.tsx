import type { CastReadingResponse, GetDailyHexagramResponse, GetHexagramResponse, GetRandomHexagramResponse, LookupHexagramResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyHexagramProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: GetHexagramResponse | GetRandomHexagramResponse | LookupHexagramResponse | GetDailyHexagramResponse | CastReadingResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Which I Ching response shape to render: a static hexagram lookup, a cast with changing lines, or the daily hexagram. */
	mode?: 'lookup' | 'cast' | 'daily';

}

export const RoxyHexagram = React.forwardRef<HTMLElement | null, RoxyHexagramProps>(
	function RoxyHexagram({ data, className, style, mode, ...rest }, ref) {
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
				(el as unknown as { mode: 'lookup' | 'cast' | 'daily' }).mode = mode;
			}
		}, [mode, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-hexagram', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
