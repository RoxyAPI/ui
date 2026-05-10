import * as React from 'react';
import type { DivisionalChartResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyDivisionalChartProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: DivisionalChartResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyDivisionalChart: React.ForwardRefExoticComponent<RoxyDivisionalChartProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=divisional-chart.d.ts.map