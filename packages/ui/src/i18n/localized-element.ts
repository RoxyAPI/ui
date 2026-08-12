import { LitElement } from 'lit';
import { resolveLang } from './lang.js';
import { LocaleController } from './locale-controller.js';
import { translate } from './registry.js';

/**
 * The base every element that writes WORDS extends: it resolves the page language and translates its own chrome.
 *
 * @remarks
 * This is deliberately smaller than {@link RoxyDataElement}, and the split is what makes the widgets translatable at all. `<roxy-endpoint-form>` and `<roxy-location-search>` are the two declared widgets: they fetch, they hold state, and they are NOT data components, so they cannot inherit the data base without dragging its controlled-mode hydration, its self-fetch controller and its own form rendering (which renders the form, so the form inheriting it would compose itself). They extended `LitElement` directly instead, which meant they had no `t()` and no {@link LocaleController}, so a Spanish page rendered a Spanish result card over an English form and neither widget re-rendered when a deferred locale payload landed.
 *
 * So the mechanism lives here ONCE and all three inherit it. There is no second translator, no second registry and no second way to resolve a language: adding one is how a catalogue entry and a call site drift apart.
 *
 * Two costs are why this is its own module rather than a second export of `utils/base-element.ts`. Every `dist/cdn/components/*.js` is a self-contained IIFE, so importing the data base into the city search would compile `FetchController`, `MarkupDataController` and the interpretation accordion into a bundle that uses none of them. And `utils/base-element.ts` imports THIS file, so putting the class there would close a cycle the moment a widget imported it.
 */
export abstract class RoxyLocalizedElement extends LitElement {
	constructor() {
		super();
		// Re-render if a chrome-string catalogue lands after this element upgraded.
		// A host page loads the payload as its own script tag, so it can arrive
		// after first paint and there is nothing the site owner could do about it.
		new LocaleController(this);
	}

	/**
	 * The chrome string for this element's language, keyed by its own English source text.
	 *
	 * @remarks
	 * Pass the English copy, never a key. With no catalogue registered the source string is returned unchanged, so an English page pays nothing and a language we do not ship degrades to English rather than to a visible key.
	 *
	 * Chrome only. A value the API returned (a planet, a sign, an aspect, a house system) is NOT translated here: it is rendered as the response carries it, so the words on the chart and the words in the response can never disagree. The same holds for a label derived from a spec field NAME through `humanize()`: a catalogue keyed on English source text cannot reach a string computed per response. A derived name is catalogued only where the set it comes from is CLOSED and small enough to enumerate against the spec, which is true of the nine form group names and of nothing else so far.
	 *
	 * @example
	 * ```ts
	 * this.t('Aspect grid');                        // 'Cuadricula de aspectos' under lang="es"
	 * this.t('{{count}} planets', { count: 12 });   // '12 planetas'
	 * ```
	 */
	protected t(source: string, vars?: Record<string, string | number>): string {
		return translate(this.effectiveLang(), source, vars);
	}

	/** {@link RoxyLocalizedElement.t} as a value, bound once, for a shared render helper that has no host of its own and therefore cannot resolve a page language (`utils/hd-reading.ts`). Named `translator` and not `translate` because `HTMLElement.translate` is a real DOM property and shadowing it with a protected member makes every `@customElement` decorator in the library fail to typecheck. */
	protected readonly translator = (
		source: string,
		vars?: Record<string, string | number>,
	): string => this.t(source, vars);

	/**
	 * Site-owner language for this element: the `lang` attribute, the nearest ancestor carrying one, or the document. Protected so a component that composes another can forward it (a child inside this shadow root cannot reach the host page on its own).
	 *
	 * Full tag, region included. The truncation to what `?lang=` accepts happens where the request is built, in `<roxy-endpoint-form>`.
	 */
	protected effectiveLang(): string | undefined {
		return resolveLang(this);
	}
}
