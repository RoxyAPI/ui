import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyDataProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyData: React.ForwardRefExoticComponent<
	Omit<RoxyDataProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=data.d.ts.map
