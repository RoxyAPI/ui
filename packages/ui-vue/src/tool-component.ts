/**
 * The tool-result entry, published as the `./tool-component` subpath of this package.
 *
 * @remarks
 * The same two names the package index carries, given their own module so that a file which only maps an AI tool result to a component imports the lookup and its table alone. Importing the package root brings in everything beside them, which is what a page that DRAWS a reading wants and what a module deciding WHICH component should draw it does not.
 *
 * Nothing here touches `document`, so it is safe in a server component, a route handler or a worker. The result of {@link componentForTool} is a tag name and its attributes: create the element, set `data`, and the component draws it.
 */
export { expandCompact } from './utils/compact.js';
export {
	componentForTool,
	type ToolComponent,
} from './utils/tool-component.js';
