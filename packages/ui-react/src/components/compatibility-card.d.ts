import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyCompatibilityCardProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyCompatibilityCard: React.ForwardRefExoticComponent<
	Omit<RoxyCompatibilityCardProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=compatibility-card.d.ts.map
