import * as React from 'react';
import type { GetBasicPanchangResponse, GetDetailedPanchangResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyPanchangTableProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetBasicPanchangResponse | GetDetailedPanchangResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyPanchangTable: React.ForwardRefExoticComponent<RoxyPanchangTableProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=panchang-table.d.ts.map