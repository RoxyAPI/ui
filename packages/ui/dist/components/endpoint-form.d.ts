import { LitElement } from 'lit';
/**
 * Schema-driven form. Pass `endpoint` (e.g. "vedic-astrology/birth-chart").
 * The form introspects the cached OpenAPI spec, slots a roxy-location-search
 * when latitude+longitude+timezone fields are present, and emits a
 * `roxy-submit` CustomEvent with the validated payload on submit. The caller
 * decides what to do (call the SDK, render a chart, navigate).
 *
 * Build-time hints (x-roxy-ui formGroups) are read by scripts/build.ts and
 * baked into a static map. At runtime the component falls back to runtime
 * fetch of /api/v2/openapi.json when no map is provided.
 */
export declare class RoxyEndpointForm extends LitElement {
    static styles: import("lit").CSSResult[];
    endpoint: string;
    method: 'GET' | 'POST';
    specUrl: string;
    submitLabel: string;
    private fields;
    private values;
    private hasLocation;
    private loaded;
    connectedCallback(): void;
    private loadSchema;
    private resolve;
    private fieldType;
    private setValue;
    private onLocation;
    private onSubmit;
    render(): import("lit").TemplateResult<1>;
    private htmlType;
    private coerce;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-endpoint-form': RoxyEndpointForm;
    }
}
//# sourceMappingURL=endpoint-form.d.ts.map