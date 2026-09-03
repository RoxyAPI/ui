import {
	TOOL_COMPONENTS,
	type ToolComponentEntry,
} from '../generated/tool-components.js';

/** The component that renders one MCP tool result, plus the name it was matched on. */
export interface ToolComponent extends ToolComponentEntry {
	/** The name the lookup resolved, with any server prefix removed. */
	toolName: string;
}

/**
 * The component that renders the result of one MCP tool call, or `undefined` when nothing in the library draws that shape.
 *
 * @remarks
 * The name is what every model vendor hands back beside a tool result, so it is the key this resolves on. A host is free to prefix it with the server the tool came from and a colon; ours never contain one, so everything up to the last colon is dropped before the lookup.
 *
 * The table is resolved at build time, so this is a property read rather than a scan and the browser carries only the four fields a caller acts on.
 *
 * The result is a `data` consumer like any other: parse the JSON out of the tool result, set it on the element, and set the `attrs` beside it.
 *
 * @example
 * ```ts
 * const found = componentForTool('post_tarot_spreads_three_card');
 * if (found) {
 *   const el = document.createElement(found.tag);
 *   for (const [name, value] of Object.entries(found.attrs ?? {})) el.setAttribute(name, value);
 *   el.data = JSON.parse(result.content[0].text);
 * }
 * ```
 */
export function componentForTool(name: string): ToolComponent | undefined {
	const prefix = name.lastIndexOf(':');
	const toolName = prefix === -1 ? name : name.slice(prefix + 1);
	const found = TOOL_COMPONENTS[toolName];
	return found ? { ...found, toolName } : undefined;
}
