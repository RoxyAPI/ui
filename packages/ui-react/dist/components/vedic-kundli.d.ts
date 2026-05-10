import * as React from 'react';
import type { BirthChartResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyVedicKundliProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: BirthChartResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyVedicKundli: React.ForwardRefExoticComponent<RoxyVedicKundliProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=vedic-kundli.d.ts.map