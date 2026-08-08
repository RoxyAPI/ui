/**
 * The chrome-string catalogue: one resolver reading one registry, so a translation can arrive from anywhere without a component changing.
 *
 * @remarks
 * **The key IS the canonical English string**, folded through {@link lookupKey}. There is no invented key vocabulary to keep in sync with the copy, which is the same rule the glyph tables in `tokens/index.ts` follow (they key off the exact value the API returns). Two consequences that are the whole point:
 *
 * - **English costs zero bytes.** A miss returns the source string, so the English build ships no catalogue at all, and a site that never loads a locale payload is byte-identical to one built before this file existed.
 * - **A missing translation degrades to English, never to a key.** The failure mode of a keyed catalogue is a raw `natal.tabs.wheel` rendered at a customer; here the worst case is the English word.
 *
 * **The registry lives on `globalThis`, not in module scope, because it has to.** Every `dist/cdn/components/*.js` is a self-contained IIFE with its own copy of this module, so a `Map` here would be invisible to the second component on the page. One global object, written by the locale payload and read by every bundle, is what makes `dist/cdn/locales/es.js` a single download that translates all of them.
 *
 * Load order is not guaranteed on a real host (WordPress enqueues scripts in an order the plugin does not fully control, and a payload may be deferred), so {@link onLocaleChange} lets an element that has already rendered in English re-render when its catalogue lands.
 */

import { lookupKey } from '../utils/string.js';

/** Shared mutable state, addressed by a name rather than a module binding so every bundle on the page reaches the same object. */
interface LocaleRegistry {
	/** Language tag (lower case) to catalogue, keyed by {@link lookupKey} of the English source string. */
	catalogs: Record<string, Record<string, string>>;
	/** Elements waiting to re-render when a catalogue arrives. */
	listeners: Set<() => void>;
}

const GLOBAL_KEY = '__ROXY_UI_I18N__';

function registry(): LocaleRegistry {
	const holder = globalThis as unknown as Record<string, LocaleRegistry>;
	const existing = holder[GLOBAL_KEY];
	if (existing) return existing;
	const created: LocaleRegistry = { catalogs: {}, listeners: new Set() };
	holder[GLOBAL_KEY] = created;
	return created;
}

/**
 * Publish a catalogue for a language tag and wake every mounted element.
 *
 * @remarks
 * The catalogue is authored keyed by the English source string, exactly as it appears at the call site, and normalized here. That keeps the source file readable and diffable against the component that renders it, while the runtime lookup stays a single property read.
 *
 * This is the ONLY way into the registry, so a catalogue can later come from a static file, a server response, or a host page inlining a script tag, without a component knowing the difference.
 */
export function registerLocale(
	lang: string,
	catalog: Record<string, string>,
): void {
	const reg = registry();
	const normalized: Record<string, string> = {};
	for (const [source, translated] of Object.entries(catalog)) {
		normalized[lookupKey(source)] = translated;
	}
	reg.catalogs[lang.toLowerCase()] = normalized;
	for (const listener of reg.listeners) listener();
}

/**
 * Replace `{{name}}` placeholders. Copied from the API-side translator so both sides of the product interpolate identically; an unknown placeholder is left verbatim rather than blanked, so a typo in a catalogue is visible instead of silently eating the value.
 */
export function interpolate(
	template: string,
	vars?: Record<string, string | number>,
): string {
	if (!vars) return template;
	return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
		key in vars ? String(vars[key] ?? '') : match,
	);
}

/**
 * The chrome string for `lang`, falling back to the English `source` it is keyed by.
 *
 * @remarks
 * A regional tag resolves against its base language, so `es-AR` and `es-419` both read the `es` catalogue and a site does not have to know which tags we happen to ship. An exact regional catalogue still wins if one is ever registered.
 */
export function translate(
	lang: string | undefined,
	source: string,
	vars?: Record<string, string | number>,
): string {
	if (!lang) return interpolate(source, vars);
	const { catalogs } = registry();
	const tag = lang.toLowerCase();
	const catalog = catalogs[tag] ?? catalogs[tag.split('-')[0] as string];
	return interpolate(catalog?.[lookupKey(source)] ?? source, vars);
}

/** Subscribe to catalogue arrivals. Returns the unsubscribe, so an element can drop it on disconnect. */
export function onLocaleChange(listener: () => void): () => void {
	const { listeners } = registry();
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
