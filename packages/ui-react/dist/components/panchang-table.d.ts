import * as React from 'react';
type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyPanchangTableProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
    data?: unknown;
    [attr: string]: unknown;
}
export declare const RoxyPanchangTable: React.ForwardRefExoticComponent<Omit<RoxyPanchangTableProps, "ref"> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=panchang-table.d.ts.map