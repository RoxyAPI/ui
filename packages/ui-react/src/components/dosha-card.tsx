import type { KalsarpaResponse, ManglikResponse, SadhesatiResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyDoshaCardProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: ManglikResponse | KalsarpaResponse | SadhesatiResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Which dosha to title and theme. The three dosha responses share a shape, so the card cannot infer this. Defaults to manglik, so set it explicitly per card. */
	type?: 'manglik' | 'kalsarpa' | 'sadhesati';

}

export const RoxyDoshaCard = React.forwardRef<HTMLElement | null, RoxyDoshaCardProps>(
	function RoxyDoshaCard({ data, className, style, type, ...rest }, ref) {
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
				(el as unknown as { type: 'manglik' | 'kalsarpa' | 'sadhesati' }).type = type;
			}
		}, [type, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-dosha-card', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
