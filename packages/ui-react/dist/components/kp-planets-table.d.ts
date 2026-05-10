import * as React from 'react';
import type { KpPlanetsResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyKpPlanetsTableProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: KpPlanetsResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyKpPlanetsTable: React.ForwardRefExoticComponent<RoxyKpPlanetsTableProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=kp-planets-table.d.ts.map