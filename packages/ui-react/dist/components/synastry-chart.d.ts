import * as React from 'react';
import type { CalculateSynastryResponse, NatalChartResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxySynastryChartProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: CalculateSynastryResponse & {
        person1?: {
            planets?: NatalChartResponse['planets'];
        };
        person2?: {
            planets?: NatalChartResponse['planets'];
        };
    };
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxySynastryChart: React.ForwardRefExoticComponent<RoxySynastryChartProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=synastry-chart.d.ts.map