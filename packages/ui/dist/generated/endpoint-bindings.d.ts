/**
 * One endpoint a component can render. `path` is the full spec path (leading
 * slash); the self-fetch `data-endpoint` value is that path without the
 * leading slash. `toolName` is the name this endpoint answers to as an MCP
 * tool, so a tool result can be routed to the component that draws it.
 * `attrs` are the config attributes that select this variant on a
 * multi-endpoint component.
 */
export interface EndpointBinding {
    operationId: string;
    method: string;
    path: string;
    toolName: string;
    attrs?: Record<string, string>;
}
/** Component tag -> every endpoint whose response it renders. */
export declare const ENDPOINT_BINDINGS: Record<string, EndpointBinding[]>;
