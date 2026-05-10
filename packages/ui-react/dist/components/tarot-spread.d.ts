import * as React from 'react';
import type { CastCelticCrossResponse, CastLoveSpreadResponse, CastReadingResponse, CastThreeCardResponse, CastYesNoResponse, DrawCardsResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyTarotSpreadProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: CastThreeCardResponse | CastCelticCrossResponse | CastLoveSpreadResponse | CastYesNoResponse | CastReadingResponse | DrawCardsResponse;
    className?: string;
    style?: React.CSSProperties;
}
export declare const RoxyTarotSpread: React.ForwardRefExoticComponent<RoxyTarotSpreadProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=tarot-spread.d.ts.map