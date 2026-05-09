import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyDoshaCardProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyDoshaCard: React.ForwardRefExoticComponent<
	Omit<RoxyDoshaCardProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=dosha-card.d.ts.map
