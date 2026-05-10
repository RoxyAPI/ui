import * as React from 'react';
import type { GetChoghadiyaResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyChoghadiyaGridProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetChoghadiyaResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyChoghadiyaGrid: React.ForwardRefExoticComponent<RoxyChoghadiyaGridProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=choghadiya-grid.d.ts.map