import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyTarotCardProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyTarotCard: React.ForwardRefExoticComponent<
	Omit<RoxyTarotCardProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=tarot-card.d.ts.map
