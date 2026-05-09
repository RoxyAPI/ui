import * as React from 'react';

type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyDashaTimelineProps
	extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}
export declare const RoxyDashaTimeline: React.ForwardRefExoticComponent<
	Omit<RoxyDashaTimelineProps, 'ref'> & React.RefAttributes<HTMLElement>
>;
//# sourceMappingURL=dasha-timeline.d.ts.map
