/**
 * THE canonical copy-paste snippets for an endpoint-bound component, generated once and read by every surface that shows them.
 *
 * @remarks
 * There used to be two implementations of this: `embedSnippet()` in the demo's `components-manifest.js` and a second one in the roxyapi.com `/widgets` page. Same job, same inputs, and they drifted. The demo shipped the practitioner theme commented out and labelled optional; `/widgets` emitted the `<link>` live, so a site owner copying from the marketing page silently got a restyle they never asked for and nothing on the page said it was a choice.
 *
 * The fix is that the snippet is DATA, produced here and carried in `components-catalog.json`, which is already the cross-repo contract. Consumers render the string; they do not rebuild it. A change to the snippet form therefore reaches the demo, `/widgets` and any future consumer from one edit.
 *
 * Keep this dependency-free and string-only: it is imported by build scripts and its output is serialized into a published JSON artifact.
 */

/** The token a consumer swaps for the visitor's real key. Consumers that offer a live key input (the `/widgets` page) search for this exact string, so changing it is a breaking change for them. */
export const PK_PLACEHOLDER = 'pk_live_YOUR_KEY';

/** One component's ready-to-paste snippets. Mirrored into `components-catalog.json` per component and into `window.ROXY_WIDGET_SNIPPETS` for the demo. */
export interface WidgetSnippets {
	/** Full bundle plus an explicit element. Gives the caller every attribute to edit. */
	script: string;
	/** The one-tag auto-mount form: a script and a `data-roxy-widget` div. */
	oneTag: string;
}

export interface SnippetInput {
	tag: string;
	slug: string;
	/** The component's DEFAULT binding (`endpoints[0]`), already resolved by the caller. */
	method: string;
	path: string;
	/** The default binding's selector attrs, if the component has variants. */
	attrs?: Record<string, string>;
	cdnBase: string;
	themeUrl: string;
}

/**
 * Build both snippets for one component.
 *
 * The practitioner theme ships COMMENTED OUT on purpose. It is an opt-in restyle, so emitting it live would hand every copy-paste user the warm serif preset as though it were the default. The comment above it is what tells them the choice exists.
 *
 * No `lang` attribute for the same reason. A component with none resolves its language from the element, then the nearest ancestor carrying `lang`, then `<html lang>`, so a snippet pasted into a Spanish CMS speaks Spanish with no edit. Emitting `lang="en"` won that chain at the first link and pinned every embedder to English, including the ones whose page already said otherwise.
 */
export function widgetSnippets(i: SnippetInput): WidgetSnippets {
	const endpoint = i.path.replace(/^\//, '');
	// POST is the element default, so only a GET binding needs an explicit method.
	const methodAttr = i.method === 'POST' ? '' : ` method="${i.method}"`;
	const configAttr = Object.entries(i.attrs ?? {})
		.map(([k, v]) => ` ${k}="${v}"`)
		.join('');

	const script = `<!-- Optional: warm practitioner theme (drop this line for the default look) -->
<!-- <link rel="stylesheet" href="${i.themeUrl}"> -->
<script src="${i.cdnBase}/roxy-ui.js" defer></script>
<${i.tag}${configAttr} data-endpoint="${endpoint}"${methodAttr} publishable-key="${PK_PLACEHOLDER}"></${i.tag}>`;

	const oneTag = `<script src="${i.cdnBase}/widgets.js" defer></script>
<div data-roxy-widget="${i.slug}" data-publishable-key="${PK_PLACEHOLDER}"></div>`;

	return { script, oneTag };
}
