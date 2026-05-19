import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Marker class on the inline JSON script a server emits inside a component.
 *
 * @example
 * ```html
 * <roxy-natal-chart>
 *   <script type="application/json" class="roxy-data">{ ...response... }</script>
 * </roxy-natal-chart>
 * ```
 */
const ROXY_DATA_CLASS = 'roxy-data';

/**
 * True when the element is a `<script type="application/json">`. Uses tag name and attribute rather than `instanceof HTMLScriptElement` so the check holds in every DOM implementation, including server-rendered and hydration runtimes where the constructor global may be absent.
 */
function isJsonScript(el: Element): boolean {
	return (
		el.nodeName === 'SCRIPT' && el.getAttribute('type') === 'application/json'
	);
}

/**
 * Host shape the controller drives: any reactive element that exposes a public `data` slot. The controller only writes `data` when the host left it unset, so the JavaScript property path always wins.
 */
interface DataHost extends ReactiveControllerHost, HTMLElement {
	data?: unknown;
}

/**
 * Reactive controller that lets a component hydrate its `data` from embedded markup when no `data` property was assigned in JavaScript.
 *
 * @remarks
 * The server-side and cached-render model: a backend renders the RoxyAPI response into a direct-child `<script type="application/json" class="roxy-data">` element, ships static HTML, and never runs per-element JavaScript to assign a property. On connect this controller reads that script, parses it, and feeds the result to the host. The JavaScript property path is untouched and authoritative: if `host.data` already holds a value when the host connects, the controller does nothing and the markup is ignored.
 *
 * Source resolution order on connect, first hit wins:
 *
 * 1. `host.data` already set in JavaScript -> leave it, read nothing.
 * 2. A direct-child `<script type="application/json" class="roxy-data">` -> parse and use. Direct-child only, so a nested component's own script is never read by an ancestor.
 *
 * Fetching from a URL is intentionally unsupported: that would require a browser-visible key and breaks the server-rendered, cached model these consumers rely on.
 *
 * Timing: {@link hostConnected} runs inside the host `connectedCallback`. For an element parsed from server HTML, its direct children are present by the time the custom element upgrades and connects, so the script is readable here. For an element created with `document.createElement` and connected before any child is appended, there is nothing to read and the property path is the only source, which is exactly the existing behavior.
 *
 * Failure is safe: malformed JSON or a missing script leaves `host.data` untouched, so the host renders its normal empty state.
 *
 * Reading the script never mutates it, and only the marked script is touched, so any sibling fallback markup a server nested inside the element (for no-JavaScript, AMP, or crawler rendering) is left in place.
 *
 * @example
 * ```ts
 * import { MarkupDataController } from '../utils/markup-data.js';
 *
 * export class RoxyExample extends LitElement {
 *   constructor() {
 *     super();
 *     new MarkupDataController(this);
 *   }
 *
 *   @property({ attribute: false })
 *   data: ExampleResponse | null = null;
 * }
 * ```
 */
export class MarkupDataController<T = unknown> implements ReactiveController {
	private readonly host: DataHost;

	constructor(host: DataHost) {
		this.host = host;
		host.addController(this);
	}

	hostConnected() {
		// Property path wins. If the consumer (React, vanilla `.data =`, the
		// widgets script, an MCP agent) already set data, never look at markup.
		if (this.host.data != null) return;

		const parsed = this.read();
		if (parsed === undefined) return;

		this.host.data = parsed as T;
		this.host.requestUpdate();
	}

	/**
	 * Resolve the embedded payload. Returns `undefined` when there is nothing valid to read so the caller can leave `host.data` untouched.
	 */
	private read(): T | undefined {
		const inline = this.findInlineScript();
		return inline ? this.parse(inline.textContent) : undefined;
	}

	/**
	 * Direct-child `<script type="application/json" class="roxy-data">`. Scoped to immediate children so a nested data-driven component never has its script read by an ancestor, and so sibling fallback markup is ignored.
	 */
	private findInlineScript(): Element | null {
		for (const child of Array.from(this.host.children)) {
			if (isJsonScript(child) && child.classList.contains(ROXY_DATA_CLASS)) {
				return child;
			}
		}
		return null;
	}

	private parse(text: string | null): T | undefined {
		if (!text?.trim()) return undefined;
		try {
			return JSON.parse(text) as T;
		} catch {
			// Malformed embedded JSON: fail safe, leave the host empty state in
			// place rather than throwing during connect.
			return undefined;
		}
	}
}
