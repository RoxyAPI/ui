import * as React from 'react';
import type { CalculateBioCompatibilityResponse, CalculateCompatibilityResponse, CalculateNumCompatibilityResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyCompatibilityCardProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: CalculateCompatibilityResponse | CalculateNumCompatibilityResponse | CalculateBioCompatibilityResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyCompatibilityCard: React.ForwardRefExoticComponent<RoxyCompatibilityCardProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=compatibility-card.d.ts.map