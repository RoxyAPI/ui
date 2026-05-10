import * as React from 'react';
import type { GetYogaResponse, ListYogasResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyYogaListProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: ListYogasResponse | GetYogaResponse | {
        yogas: GetYogaResponse[];
    };
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyYogaList: React.ForwardRefExoticComponent<RoxyYogaListProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=yoga-list.d.ts.map