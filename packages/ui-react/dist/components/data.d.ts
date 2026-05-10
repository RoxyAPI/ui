import * as React from 'react';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyDataProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: unknown;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyData: React.ForwardRefExoticComponent<RoxyDataProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=data.d.ts.map