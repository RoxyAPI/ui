import * as React from 'react';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children'>;
export interface RoxyDataProps extends ElementAttrs {
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyData: React.ForwardRefExoticComponent<RoxyDataProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=data.d.ts.map