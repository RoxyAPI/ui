import * as React from 'react';
import type { AshtakavargaResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyAshtakavargaGridProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: AshtakavargaResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyAshtakavargaGrid: React.ForwardRefExoticComponent<RoxyAshtakavargaGridProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=ashtakavarga-grid.d.ts.map