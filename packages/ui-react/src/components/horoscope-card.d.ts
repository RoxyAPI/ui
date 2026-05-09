import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyHoroscopeCardProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyHoroscopeCard: React.ForwardRefExoticComponent<
	Omit<RoxyHoroscopeCardProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=horoscope-card.d.ts.map
