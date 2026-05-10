import * as React from 'react';
import type { GetCardResponse, GetDailyCardResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyTarotCardProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: GetCardResponse | GetDailyCardResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyTarotCard: React.ForwardRefExoticComponent<RoxyTarotCardProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=tarot-card.d.ts.map