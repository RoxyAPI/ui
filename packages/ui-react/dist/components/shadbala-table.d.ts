import * as React from 'react';
import type { ShadbalaResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyShadbalaTableProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: ShadbalaResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyShadbalaTable: React.ForwardRefExoticComponent<RoxyShadbalaTableProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=shadbala-table.d.ts.map