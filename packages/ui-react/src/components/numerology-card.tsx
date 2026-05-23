import type { CalculateExpressionResponse, CalculateLifePathResponse, CalculatePersonalYearResponse, GenerateNumerologyChartResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyNumerologyCardProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: CalculateLifePathResponse | CalculateExpressionResponse | CalculatePersonalYearResponse | GenerateNumerologyChartResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Which numerology response the card is showing. Selects the heading and which fields are surfaced. */
	type?: 'life-path' | 'expression' | 'personal-year' | 'chart';

}

export const RoxyNumerologyCard = React.forwardRef<HTMLElement | null, RoxyNumerologyCardProps>(
	function RoxyNumerologyCard({ data, className, style, type, ...rest }, ref) {
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
			if (el && type !== undefined) {
				(el as unknown as { type: 'life-path' | 'expression' | 'personal-year' | 'chart' }).type = type;
			}
		}, [type, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-numerology-card', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
