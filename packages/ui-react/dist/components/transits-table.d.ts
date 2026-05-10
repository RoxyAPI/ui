import * as React from 'react';
import type { TransitsResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyTransitsTableProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: TransitsResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyTransitsTable: React.ForwardRefExoticComponent<RoxyTransitsTableProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=transits-table.d.ts.map