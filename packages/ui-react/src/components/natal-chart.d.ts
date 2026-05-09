import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyNatalChartProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyNatalChart: React.ForwardRefExoticComponent<
	Omit<RoxyNatalChartProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=natal-chart.d.ts.map
