import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyVedicKundliProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyVedicKundli: React.ForwardRefExoticComponent<
	Omit<RoxyVedicKundliProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=vedic-kundli.d.ts.map
