import * as React from 'react';
import type { CompatibilityResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyGunaMilanProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: CompatibilityResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyGunaMilan: React.ForwardRefExoticComponent<RoxyGunaMilanProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=guna-milan.d.ts.map