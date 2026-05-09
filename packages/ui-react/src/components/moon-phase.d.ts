import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyMoonPhaseProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyMoonPhase: React.ForwardRefExoticComponent<
	Omit<RoxyMoonPhaseProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=moon-phase.d.ts.map
