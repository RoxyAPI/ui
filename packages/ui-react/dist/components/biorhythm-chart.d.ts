import * as React from 'react';
import type { GetCriticalDaysResponse, GetDailyBiorhythmResponse, GetForecastResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyBiorhythmChartProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetDailyBiorhythmResponse | GetForecastResponse | GetCriticalDaysResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyBiorhythmChart: React.ForwardRefExoticComponent<RoxyBiorhythmChartProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=biorhythm-chart.d.ts.map