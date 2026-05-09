import * as React from 'react';
type DivAttrs = React.HTMLAttributes<HTMLElement>;
export interface RoxyTarotSpreadProps extends Omit<DivAttrs, 'children' | 'onSelect'> {
    data?: unknown;
    [attr: string]: unknown;
}
export declare const RoxyTarotSpread: React.ForwardRefExoticComponent<Omit<RoxyTarotSpreadProps, "ref"> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=tarot-spread.d.ts.map