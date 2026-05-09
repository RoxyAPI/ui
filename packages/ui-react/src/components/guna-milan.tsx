import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type DivAttrs = React.HTMLAttributes<HTMLElement>;

export interface RoxyGunaMilanProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}

export const RoxyGunaMilan = React.forwardRef<HTMLElement, RoxyGunaMilanProps>(
	function RoxyGunaMilan({ data, ...rest }, ref) {
		const internal = React.useRef<HTMLElement | null>(null);
		React.useImperativeHandle(ref, () => internal.current as HTMLElement);
		const [loaded, setLoaded] = React.useState(false);

		React.useEffect(() => {
			let active = true;
			ensureScriptLoaded().then(() => {
				if (active) setLoaded(true);
			});
			return () => {
				active = false;
			};
		}, []);

		React.useEffect(() => {
			if (internal.current && data !== undefined) {
				(internal.current as unknown as { data: unknown }).data = data;
			}
		}, [data, loaded]);

		return React.createElement('roxy-guna-milan', { ref: internal, ...rest });
	},
);
