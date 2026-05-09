import * as React from 'react';
type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxySynastryChartProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
    data?: unknown;
    [attr: string]: unknown;
}
export declare const RoxySynastryChart: React.ForwardRefExoticComponent<Omit<RoxySynastryChartProps, "ref"> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=synastry-chart.d.ts.map