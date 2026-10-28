import { type PropType } from 'vue';
export interface RoxyEndpointFormProps {
    /** Endpoint path the form is built for and submits to, e.g. "astrology/natal-chart". The fields are derived from the spec for that operation. */
    endpoint?: string;
    /** HTTP method of the operation. Defaults to POST. */
    method?: 'GET' | 'POST';
    /** Explicit OpenAPI spec URL to build the form from. Empty resolves a version-pinned slice first, then the production spec. */
    specUrl?: string;
    /** Override the submit-button label. Empty derives an outcome-first label from the endpoint. */
    submitLabel?: string;
    /** Browser-safe publishable key (pk_) forwarded to the slotted city search so a natal or synastry form can geocode. */
    publishableKey?: string;
    /** Where the slotted city search sends its request, absolute or page-relative. Set it when the page routes its API traffic through its own server. Unset, the search keeps its own default. */
    locationUrl?: string;
    /** Prefill values keyed by field name, nested per group. Used to restore a previous submission. Property only, never an attribute. */
    initialValues?: Record<string, unknown>;
    /** Fires when the underlying <roxy-endpoint-form> dispatches `roxy-submit`. */
    onRoxySubmit?: (event: CustomEvent<{
        endpoint: string;
        values: Record<string, unknown>;
        queryKeys: string[];
        sticky: boolean;
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
export declare const RoxyEndpointForm: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    endpoint: {
        type: PropType<RoxyEndpointFormProps['endpoint']>;
    };
    method: {
        type: PropType<RoxyEndpointFormProps['method']>;
    };
    specUrl: {
        type: PropType<RoxyEndpointFormProps['specUrl']>;
    };
    submitLabel: {
        type: PropType<RoxyEndpointFormProps['submitLabel']>;
    };
    publishableKey: {
        type: PropType<RoxyEndpointFormProps['publishableKey']>;
    };
    locationUrl: {
        type: PropType<RoxyEndpointFormProps['locationUrl']>;
    };
    initialValues: {
        type: PropType<RoxyEndpointFormProps['initialValues']>;
    };
    onRoxySubmit: {
        type: PropType<RoxyEndpointFormProps['onRoxySubmit']>;
    };
    onRoxyValidationError: {
        type: PropType<RoxyEndpointFormProps['onRoxyValidationError']>;
    };
    onRoxySpecError: {
        type: PropType<RoxyEndpointFormProps['onRoxySpecError']>;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    endpoint: {
        type: PropType<RoxyEndpointFormProps['endpoint']>;
    };
    method: {
        type: PropType<RoxyEndpointFormProps['method']>;
    };
    specUrl: {
        type: PropType<RoxyEndpointFormProps['specUrl']>;
    };
    submitLabel: {
        type: PropType<RoxyEndpointFormProps['submitLabel']>;
    };
    publishableKey: {
        type: PropType<RoxyEndpointFormProps['publishableKey']>;
    };
    locationUrl: {
        type: PropType<RoxyEndpointFormProps['locationUrl']>;
    };
    initialValues: {
        type: PropType<RoxyEndpointFormProps['initialValues']>;
    };
    onRoxySubmit: {
        type: PropType<RoxyEndpointFormProps['onRoxySubmit']>;
    };
    onRoxyValidationError: {
        type: PropType<RoxyEndpointFormProps['onRoxyValidationError']>;
    };
    onRoxySpecError: {
        type: PropType<RoxyEndpointFormProps['onRoxySpecError']>;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
