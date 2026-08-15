/**
 * The chrome-string catalogue: one resolver reading one registry, so a translation can arrive from anywhere without a component changing.
 *
 * @remarks
 * **The key IS the canonical English string**, folded through {@link lookupKey}. There is no invented key vocabulary to keep in sync with the copy, which is the same rule the glyph tables in `tokens/index.ts` follow (they key off the exact value the API returns). Two consequences that are the whole point:
 *
 * - **English costs zero bytes.** A miss returns the source string, so the English build ships no catalogue at all, and a site that never loads a locale payload is byte-identical to one built before this file existed.
 * - **A missing translation degrades to English, never to a key.** The failure mode of a keyed catalogue is a raw `natal.tabs.wheel` on the page; here the worst case is the English word.
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
	/**
	 * Language tag (lower case) to the API's field-label map: `fields` keyed by wire name,
	 * `enums` keyed `{fieldName}.{value}`.
	 *
	 * A SEPARATE key space from `catalogs` on purpose. A chrome string is keyed by the English
	 * text a component writes, which is a constant in our source; a field label is keyed by a
	 * name that only the OpenAPI spec knows, computed per operation, so no catalogue keyed on
	 * English source text can ever reach it. Same registry because the delivery problem is
	 * identical (a payload that may land after first paint), so it reuses one global object and
	 * one listener set rather than growing a second of each.
	 */
	fieldLabels: Record<string, FieldLabels>;
	/** Language tags whose fetch is in flight or done, so N forms on a page cost ONE request. */
	requested: Set<string>;
	/** Elements waiting to re-render when a catalogue arrives. */
	listeners: Set<() => void>;
}

/** The `/languages/field-labels` payload, minus the echoed `lang`. */
export interface FieldLabels {
	fields: Record<string, string>;
	enums: Record<string, string>;
}

const GLOBAL_KEY = '__ROXY_UI_I18N__';

function registry(): LocaleRegistry {
	const holder = globalThis as unknown as Record<string, LocaleRegistry>;
	const existing = holder[GLOBAL_KEY];
	if (existing) return existing;
	const created: LocaleRegistry = {
		catalogs: {},
		fieldLabels: {},
		requested: new Set(),
		listeners: new Set(),
	};
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

/**
 * Publish a field-label map for a language tag and wake every mounted element.
 *
 * @remarks
 * Exported so a host that already has the payload (a server-rendered page, a test, a WordPress
 * plugin inlining it) can supply it without a network call, exactly as {@link registerLocale}
 * allows for chrome strings.
 */
export function registerFieldLabels(lang: string, labels: FieldLabels): void {
	const reg = registry();
	reg.fieldLabels[lang.toLowerCase()] = labels;
	for (const listener of reg.listeners) listener();
}

/** The field-label map for `lang`, resolving a regional tag against its base language. */
function labelsFor(lang: string | undefined): FieldLabels | undefined {
	if (!lang) return undefined;
	const { fieldLabels } = registry();
	const tag = lang.toLowerCase();
	return fieldLabels[tag] ?? fieldLabels[tag.split('-')[0] as string];
}

/**
 * The label for a request field name, or `undefined` when nothing has been published.
 *
 * @remarks
 * Returning `undefined` rather than the name is deliberate: the caller owns the fallback, which is
 * `humanize()`, and that keeps this resolver honest about what it actually knows. A form renders
 * identically to before until a payload arrives.
 */
export function fieldLabel(
	lang: string | undefined,
	name: string,
): string | undefined {
	return labelsFor(lang)?.fields[name];
}

/** The label for one selectable option, keyed `{fieldName}.{value}` as the API publishes it. */
export function optionLabel(
	lang: string | undefined,
	field: string,
	value: string,
): string | undefined {
	return labelsFor(lang)?.enums[`${field}.${value}`];
}

/** Subscribe to catalogue arrivals. Returns the unsubscribe, so an element can drop it on disconnect. */
export function onLocaleChange(listener: () => void): () => void {
	const { listeners } = registry();
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
