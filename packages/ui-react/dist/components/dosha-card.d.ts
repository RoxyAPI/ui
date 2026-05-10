import * as React from 'react';
import type { KalsarpaResponse, ManglikResponse, SadhesatiResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyDoshaCardProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: ManglikResponse | KalsarpaResponse | SadhesatiResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyDoshaCard: React.ForwardRefExoticComponent<RoxyDoshaCardProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=dosha-card.d.ts.map