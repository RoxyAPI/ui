import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyKpPlanetsTableProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyKpPlanetsTable: React.ForwardRefExoticComponent<
	Omit<RoxyKpPlanetsTableProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=kp-planets-table.d.ts.map
