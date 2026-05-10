import * as React from 'react';
import type { GetCurrentDashaResponse, GetMajorDashasResponse, GetSubDashasResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyDashaTimelineProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetCurrentDashaResponse | GetMajorDashasResponse | GetSubDashasResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyDashaTimeline: React.ForwardRefExoticComponent<RoxyDashaTimelineProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=dasha-timeline.d.ts.map