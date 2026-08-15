/**
 * Where a component's language comes from, and what is safe to send to the API.
 *
 * @remarks
 * Two different answers, and conflating them is the whole reason this file is separate from the catalogue:
 *
 * - {@link resolveLang} answers "what language is this PAGE in", and keeps the full tag, because `es-AR` is a legitimate thing for a catalogue to want to differ on.
 * - {@link apiLang} answers "what may go on the query string", which is a narrower question with a hard edge: `?lang=es-AR` is a 400, `?lang=es` is a 200.
 *
 * The full tag is not a nicety the catalogue happens to tolerate: `utils/format.ts` hands it to `Intl`, which reads the region and writes `15 de ene de 1990` for `es-AR` where it writes `15 ene 1990` for `es`. Passing the API answer to a formatter demotes every regional visitor to the base language and nothing fails, so the two values are never interchangeable.
 */

import { API_LANGUAGES } from '../generated/api-languages.js';

/**
 * The site-owner language for an element, resolved through the four-link chain the revamp design specifies.
 *
 * @remarks
 * 1. the element's own `lang` attribute (the explicit per-embed override),
 * 2. the nearest ancestor carrying `lang`, so one wrapper localizes a whole section,
 * 3. `document.documentElement.lang`, which is what makes this work on a real CMS with no markup change at all: WordPress emits `<html lang="es-AR">` on every page of a Spanish site,
 * 4. nothing, which the callers read as English.
 *
 * All four links matter: with only the first, a component on a fully Spanish page renders English chrome and the only remedy is hand-editing every embed.
 *
 * `navigator.language` is deliberately NOT in the chain. It is the VISITOR's preference, not the site's: it fragments the API cache across every locale a visitor might carry and silently serves two people different content from the same URL.
 *
 * Link 2 uses `closest`, which stops at a shadow boundary. A component composed INSIDE another component's shadow root therefore cannot see the host page, which is why every composing component forwards `lang` to its children explicitly.
 */
export function resolveLang(el: HTMLElement): string | undefined {
	// Native accessor, never a Lit @property: declaring one would shadow
	// HTMLElement.lang and break the platform attribute for every consumer.
	if (el.lang) return el.lang;
	if (typeof document === 'undefined') return undefined;
	const inherited = el.closest?.('[lang]')?.getAttribute('lang');
	if (inherited) return inherited;
	return document.documentElement.lang || undefined;
}

/**
 * The value safe to put on `?lang=`, or `undefined` to leave the request on the API default.
 *
 * @remarks
 * Two narrowings, both of which are load-bearing the moment {@link resolveLang} starts reading `<html lang>`:
 *
 * - **The region is dropped.** A regional tag is a 400, so a Spanish WordPress site would go from English-but-working to broken the day the language chain was completed. `es-AR`, `es-419` and `ES` all send `es`.
 * - **An unsupported language is omitted, not sent.** The chain now surfaces whatever the host page carries, including languages the API does not translate, and an unlisted tag is the same 400. Omitting it degrades to English, which is the behaviour those pages already had.
 */
export function apiLang(el: HTMLElement): string | undefined {
	const tag = resolveLang(el);
	if (!tag) return undefined;
	const base = tag.toLowerCase().split('-')[0] as string;
	return API_LANGUAGES.includes(base) ? base : undefined;
}
