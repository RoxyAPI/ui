import * as React from 'react';
import type { GetDailyHoroscopeResponse, GetMonthlyHoroscopeResponse, GetWeeklyHoroscopeResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyHoroscopeCardProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetDailyHoroscopeResponse | GetWeeklyHoroscopeResponse | GetMonthlyHoroscopeResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyHoroscopeCard: React.ForwardRefExoticComponent<RoxyHoroscopeCardProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=horoscope-card.d.ts.map