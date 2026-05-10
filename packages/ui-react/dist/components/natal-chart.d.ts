import * as React from 'react';
import type { NatalChartResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyNatalChartProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: NatalChartResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyNatalChart: React.ForwardRefExoticComponent<RoxyNatalChartProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=natal-chart.d.ts.map