import * as React from 'react';
type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyLocationSearchProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
    data?: unknown;
    [attr: string]: unknown;
}
export declare const RoxyLocationSearch: React.ForwardRefExoticComponent<Omit<RoxyLocationSearchProps, "ref"> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=location-search.d.ts.map