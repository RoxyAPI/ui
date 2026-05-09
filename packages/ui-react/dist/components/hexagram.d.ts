import * as React from 'react';
type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyHexagramProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
    data?: unknown;
    [attr: string]: unknown;
}
export declare const RoxyHexagram: React.ForwardRefExoticComponent<Omit<RoxyHexagramProps, "ref"> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=hexagram.d.ts.map