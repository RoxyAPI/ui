import * as React from 'react';
import type { CalculateExpressionResponse, CalculateLifePathResponse, CalculatePersonalYearResponse, GenerateNumerologyChartResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyNumerologyCardProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: CalculateLifePathResponse | CalculateExpressionResponse | CalculatePersonalYearResponse | GenerateNumerologyChartResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyNumerologyCard: React.ForwardRefExoticComponent<RoxyNumerologyCardProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=numerology-card.d.ts.map