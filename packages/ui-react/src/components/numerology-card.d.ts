import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyNumerologyCardProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyNumerologyCard: React.ForwardRefExoticComponent<
	Omit<RoxyNumerologyCardProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=numerology-card.d.ts.map
