import * as React from 'react';
import type { CastReadingResponse, GetDailyHexagramResponse, GetHexagramResponse, GetRandomHexagramResponse, LookupHexagramResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyHexagramProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetHexagramResponse | GetRandomHexagramResponse | LookupHexagramResponse | GetDailyHexagramResponse | CastReadingResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyHexagram: React.ForwardRefExoticComponent<RoxyHexagramProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=hexagram.d.ts.map