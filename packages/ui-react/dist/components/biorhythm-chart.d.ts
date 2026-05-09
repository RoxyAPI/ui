import * as React from 'react';
type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyBiorhythmChartProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
    data?: unknown;
    [attr: string]: unknown;
}
export declare const RoxyBiorhythmChart: React.ForwardRefExoticComponent<Omit<RoxyBiorhythmChartProps, "ref"> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=biorhythm-chart.d.ts.map