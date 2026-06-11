import type { ListCardsResponse } from '@roxyapi/ui/types';
import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type ElementAttrs = Omit<
	React.HTMLAttributes<HTMLElement>,
	'children' | 'data'
>;

export interface RoxyTarotCatalogProps extends ElementAttrs {
	/** Spec-derived response payload. Pass the raw RoxyAPI response. */
	data?: ListCardsResponse;
	className?: string;
	style?: React.CSSProperties;
	/** Override the auto-derived gallery heading. Empty by default, in which case the heading is "Tarot deck". */
	heading?: string;

}

export const RoxyTarotCatalog = React.forwardRef<HTMLElement | null, RoxyTarotCatalogProps>(
	function RoxyTarotCatalog({ data, className, style, heading, ...rest }, ref) {
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
			if (el && heading !== undefined) {
				(el as unknown as { heading: string }).heading = heading;
			}
		}, [heading, loaded]);

		if (error) {
			return React.createElement(
				'div',
				{ role: 'alert', className, style },
				`Roxy UI script load failed: ${error.message}`,
			);
		}

		return React.createElement('roxy-tarot-catalog', {
			ref: internal,
			className,
			style,
			...rest,
		});
	},
);
