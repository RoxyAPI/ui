import * as React from 'react';
import type { GetCurrentMoonPhaseResponse, GetMoonCalendarResponse, GetUpcomingMoonPhasesResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyMoonPhaseProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetCurrentMoonPhaseResponse | GetUpcomingMoonPhasesResponse | GetMoonCalendarResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyMoonPhase: React.ForwardRefExoticComponent<RoxyMoonPhaseProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=moon-phase.d.ts.map