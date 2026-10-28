/** The component that renders one MCP tool result. `toolName` is the key it is found under. */
export interface ToolComponentEntry {
    /** Custom-element tag to create, query, or render. */
    tag: string;
    /** Export name in the React and Vue packages. */
    pascal: string;
    /** OpenAPI operation the tool calls. */
    operationId: string;
    /** Config attributes that select this endpoint on a component that renders several. Set them beside `data`. */
    attrs?: Record<string, string>;
}
/** MCP tool name -> the component that draws its result. */
export declare const TOOL_COMPONENTS: Record<string, ToolComponentEntry>;
