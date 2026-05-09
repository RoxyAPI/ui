import * as React from 'react';
type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyGunaMilanProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
    data?: unknown;
    [attr: string]: unknown;
}
export declare const RoxyGunaMilan: React.ForwardRefExoticComponent<Omit<RoxyGunaMilanProps, "ref"> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=guna-milan.d.ts.map