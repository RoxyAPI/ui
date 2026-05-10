import * as React from 'react';
import type { SearchCitiesResponse } from '@roxyapi/ui/types';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyLocationSearchProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: unknown;
    className?: string;
    style?: React.CSSProperties;
    /** Fires when the underlying <roxy-location-search> dispatches `roxy-location-select`. */
    onRoxyLocationSelect?: (event: CustomEvent<NonNullable<SearchCitiesResponse['cities']>[number] | {
        latitude?: number;
        longitude?: number;
        timezone?: string;
        utcOffset?: number;
        city?: string;
        province?: string;
        country?: string;
    }>) => void;
    /** Fires when the underlying <roxy-location-search> dispatches `roxy-validation-error`. */
    onRoxyValidationError?: (event: CustomEvent<{
        reason: string;
        message: string;
    }>) => void;
}
export declare const RoxyLocationSearch: React.ForwardRefExoticComponent<RoxyLocationSearchProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=location-search.d.ts.map