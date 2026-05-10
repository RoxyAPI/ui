import * as React from 'react';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyEndpointFormProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: unknown;
    className?: string;
    style?: React.CSSProperties;
    /** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-submit`. */
    onRoxySubmit?: (event: CustomEvent<{
        endpoint: string;
        values: Record<string, unknown>;
    }>) => void;
    /** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-validation-error`. */
    onRoxyValidationError?: (event: CustomEvent<{
        missing: string[];
    }>) => void;
    /** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-spec-error`. */
    onRoxySpecError?: (event: CustomEvent<{
        url: string;
        message: string;
    }>) => void;
}
export declare const RoxyEndpointForm: React.ForwardRefExoticComponent<RoxyEndpointFormProps & React.RefAttributes<HTMLElement | null>>;
export {};
//# sourceMappingURL=endpoint-form.d.ts.map