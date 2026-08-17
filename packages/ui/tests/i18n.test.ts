import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';

// Registers every element. happy-dom is loaded by preload (bunfig.toml), and
// Lit reads document and customElements at module load, so setup -> import.
import '../src/index.js';
import { readdir } from 'node:fs/promises';
import { API_LANGUAGES } from '../src/generated/api-languages.js';
import { CHROME_STRINGS } from '../src/i18n/chrome-strings.js';
import { apiLang, resolveLang } from '../src/i18n/lang.js';
import {
	interpolate,
	registerLocale,
	translate,
} from '../src/i18n/registry.js';
// Side effect: registers the Spanish catalogue for the translate() assertions
// below. The per-catalogue tests load every locale from the directory instead.
// The named export is read by the one end-to-end form assertion, so that test
// cannot drift from the file it is proving.
import { es } from '../src/locales/es.js';
import { CENTER_GEOMETRY } from '../src/utils/bodygraph-render.js';
import {
	buildFormModel,
	deriveSubmitLabel,
	type SpecDoc,
} from '../src/utils/field-schema.js';
import { KEY_REFUSED_MESSAGE } from '../src/utils/key-guard.js';
import { humanize, lookupKey } from '../src/utils/string.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

/** Rendered text with the `<style>` nodes excluded: `shadowRoot.textContent` concatenates the stylesheet, so an assertion can otherwise pass on a class name that never rendered (lesson 21). */
function text(el: Element): string {
	const root = (el as unknown as { shadowRoot: ShadowRoot | null }).shadowRoot;
	if (!root) return '';
	return [...root.childNodes]
		.filter((n) => (n as Element).tagName !== 'STYLE')
		.map((n) => n.textContent ?? '')
		.join(' ');
}

beforeEach(() => {
	document.documentElement.removeAttribute('lang');
	document.body.innerHTML = '';
});

// And again on the way out. `bun test` shares one happy-dom document across
// files, so a page language left standing here is inherited by whichever file
// runs next: every `t()` call site in the library resolves through
// `document.documentElement.lang`, so an unrelated English assertion two files
// later fails in Spanish.
afterEach(() => {
	document.documentElement.removeAttribute('lang');
	document.body.innerHTML = '';
});

/** Everything this library ships as source. The generated types tree is excluded because nobody writes it. */
const SRC = 'packages/ui/src';

/** Every `.ts` under `src`, full path, sorted. Shared by every source scan below. */
async function sourceFiles(): Promise<string[]> {
	const entries = await readdir(SRC, { recursive: true });
	return entries
		.filter((f) => f.endsWith('.ts') && !f.startsWith('types/'))
		.map((f) => `${SRC}/${f}`)
		.sort();
}

/** Source with block comments and whole-line comments blanked, so prose ABOUT a construct is never read as one. Line count survives, because a scan reports a site. */
function code(src: string): string {
	return src
		.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
		.split('\n')
		.map((line) => {
			const t = line.trim();
			return t.startsWith('//') || t.startsWith('*') ? '' : line;
		})
		.join('\n');
}

/** {@link code} as numbered lines, blanks dropped, for the scans that report `path:line`. */
function codeLines(src: string): Array<[number, string]> {
	return code(src)
		.split('\n')
		.map((line, i) => [i + 1, line] as [number, string])
		.filter(([, line]) => line.trim() !== '');
}

/* ------------------------------------------------------------------------- *
 * The markup scanner. ONE detector, read by the library-wide ratchet and by
 * the form-path guard at the bottom of this file, so the two can never
 * disagree about what a visitor reads.
 * ------------------------------------------------------------------------- */

/** Attributes a visitor or a screen reader READS. `class`, `role` and `id` are machine values and are not on it. */
const VISIBLE_ATTRS =
	/\b(?:placeholder|aria-label|aria-placeholder|aria-description|title|alt)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

/**
 * Text allowed to sit in a template as a literal, with the reason. Keep it SHORT: an entry here is copy no visitor will ever read in their own language.
 *
 * `UTC` is a unit symbol, identical in all seven languages and printed immediately in front of a signed number, so a catalogue entry would be seven copies of the same three letters plus a way to get the sign onto the wrong side of it.

 *
 * The nine centre names are the FALLBACK half of a value the response already localizes: the bodygraph reads each centre's name from the payload and drops back to the geometry table only when it is absent. Cataloguing them would be a second translation of a fact the API already owns, which is the one thing the chrome list refuses to do, and it is why they are declared once beside the shape rather than per call site.
 */
const LITERAL_BY_DESIGN = new Set([
	'UTC',
	'Head',
	'Ajna',
	'Throat',
	'Heart',
	'Spleen',
	'Sacral',
	'Solar Plexus',
	'Root',
]);

/** Stands in for one `${...}`, so an interpolated slot can never be mistaken for copy. */
const EXPR = ' ';

/** A named character reference. Stripped before the prose test, because `&deg;` and `&middot;` are symbols spelled in ASCII, not words. */
const ENTITY = /&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/g;

/** The tagged templates that paint something a visitor sees. `svg` is on the list because a chart draws its own labels: three of them were leaking English from inside `<title>` and `<text>` nodes no `html` scan could reach. */
const MARKUP_TAGS = ['html', 'svg'];

function skipString(src: string, i: number): number {
	const quote = src[i] as string;
	i++;
	while (i < src.length) {
		if (src[i] === '\\') i += 2;
		else if (src[i] === quote) return i + 1;
		else i++;
	}
	return i;
}

/** Whether the backtick at `i` opens a markup template, i.e. is preceded by a WHOLE {@link MARKUP_TAGS} tag rather than the tail of some other identifier or a property access. */
function isMarkupTag(src: string, i: number): boolean {
	for (const tag of MARKUP_TAGS) {
		const start = i - tag.length;
		if (start < 0 || src.slice(start, i) !== tag) continue;
		if (start === 0 || !/[A-Za-z0-9_$.]/.test(src[start - 1] as string))
			return true;
	}
	return false;
}

/** Read a template literal body. `keep` decides whether its own text is collected; a nested markup template is collected either way. */
function scanTemplate(
	src: string,
	start: number,
	out: string[],
	keep: boolean,
): number {
	let text = '';
	let i = start;
	while (i < src.length) {
		const c = src[i] as string;
		if (c === '\\') {
			i += 2;
			continue;
		}
		if (c === '`') {
			if (keep) out.push(text);
			return i + 1;
		}
		if (c === '$' && src[i + 1] === '{') {
			text += EXPR;
			i = scanExpr(src, i + 2, out);
			continue;
		}
		text += c;
		i++;
	}
	if (keep) out.push(text);
	return i;
}

/** Skip one `${...}`, recursing into any markup template inside it so a mapped row is scanned too. */
function scanExpr(src: string, start: number, out: string[]): number {
	let depth = 1;
	let i = start;
	while (i < src.length) {
		const c = src[i] as string;
		if (c === "'" || c === '"') {
			i = skipString(src, i);
			continue;
		}
		if (c === '`') {
			i = scanTemplate(src, i + 1, out, isMarkupTag(src, i));
			continue;
		}
		if (c === '{') depth++;
		else if (c === '}') {
			depth--;
			if (depth === 0) return i + 1;
		}
		i++;
	}
	return i;
}

/** Every markup template in a file, at any nesting depth, interpolations replaced by {@link EXPR}. One tag test for both the outer walk and the nested one, so they cannot disagree about what opens a template. */
function markupTemplates(src: string): string[] {
	const out: string[] = [];
	for (let i = 0; i < src.length; i++) {
		if (src[i] === '`' && isMarkupTag(src, i))
			i = scanTemplate(src, i + 1, out, true) - 1;
	}
	return out;
}

/** The raw source of every markup template, concatenated. The ternary scan reads THIS rather than the whole file, because that shape is only INVISIBLE inside an interpolation: the same ternary as a plain function argument is an ordinary expression, and where it feeds a `ChromeString` parameter the compiler already checks it. */
function markupSource(src: string): string {
	const spans: string[] = [];
	for (let i = 0; i < src.length; i++) {
		if (src[i] === '`' && isMarkupTag(src, i)) {
			const end = scanTemplate(src, i + 1, [], false);
			spans.push(src.slice(i + 1, end));
			i = end - 1;
		}
	}
	return spans.join('\n');
}

/** An element whose text content is a machine language rather than copy. */
const OPAQUE_TAG = /^\s*(?:style|script)\b/i;

/** The words a visitor reads out of one template: its text nodes plus its human-facing attribute values. */
function visibleStrings(template: string): string[] {
	const found: string[] = [];
	let inTag = false;
	let opaque = false;
	let buf = '';
	for (const c of template) {
		if (c === '<' && !inTag) {
			if (!opaque) found.push(buf);
			buf = '';
			inTag = true;
		} else if (c === '>' && inTag) {
			for (const m of buf.matchAll(VISIBLE_ATTRS))
				found.push(m[1] ?? m[2] ?? '');
			opaque = OPAQUE_TAG.test(buf);
			buf = '';
			inTag = false;
		} else {
			buf += c;
		}
	}
	if (!inTag && !opaque) found.push(buf);
	return found;
}

/**
 * Every user-visible literal one source file writes into its own markup: the whole pipeline, comments stripped, in the order they appear.
 *
 * A string that IS translated is invisible here for free, because `${this.t('...')}` is an interpolation and collapses to {@link EXPR} before anything reads it. What survives is copy that reaches a reader in English on all seven translated sites.
 */
/** A prose string handed to one of the component's own helpers, e.g. `this.attr('Hardness', ...)`. */
const HELPER_ARG = /\bthis\.([a-zA-Z][a-zA-Z0-9]*)\(\s*'([A-Z][^']{1,48})'/g;

/**
 * A copy-bearing property of an options or lookup record, e.g. `{ label: 'Transit views' }` or the `note` on a section descriptor.
 *
 * These property NAMES are copy by definition, which is what makes the rule precise where a blanket scan of string literals is not: a selector, an id or a lookup key is never called a label, a note or a caption, so the shape carries no machine values to filter out. `heading` is deliberately absent because `manifest.ts` uses it for build metadata that no visitor reads.
 */
const RECORD_COPY =
	/(?:^|[\s{,(])(?:label|title|note|caption|summary|placeholder|hint)\s*:\s*'([A-Z][^']+)'/g;

/**
 * A two-state label picked by a ternary, e.g. `${below ? 'Below' : 'Above'}`.
 *
 * @remarks
 * The markup scanner cannot reach these: an interpolation collapses to one placeholder before its text is read, so both branches are invisible however plainly they are copy. Measured across the library the shape is unambiguous, with no machine values in it, because a class name or an id is chosen by a ternary on the CLASS attribute rather than in a text node.
 *
 * The translated form is `cond ? t('A') : t('B')`, one call per branch, which this pattern no longer matches. Writing it as `t(cond ? 'A' : 'B')` instead would satisfy a reader and still be wrong: the forward scan matches `t('` literally, so a ternary INSIDE the call hides both strings from the check that they are catalogued at all.
 */
const TERNARY_COPY = /\?\s*'([A-Z][^']{1,60})'\s*:\s*'([^']{0,60})'/g;

/** Platform and framework calls whose first argument is a selector or a key, never copy. */
const NOT_COPY = new Set([
	'querySelector',
	'querySelectorAll',
	'getAttribute',
	'setAttribute',
	'removeAttribute',
	'hasAttribute',
	'toggleAttribute',
	'addEventListener',
	'removeEventListener',
	'closest',
	'matches',
	'dispatchEvent',
	'getElementById',
	'requestUpdate',
	't',
	'emit',
]);

function visibleLiterals(src: string): string[] {
	const found: string[] = [];
	for (const template of markupTemplates(code(src))) {
		for (const raw of visibleStrings(template)) {
			const literal = raw.replaceAll(EXPR, ' ').trim().replace(/\s+/g, ' ');
			// Two consecutive letters, entities removed first. Numbers, punctuation,
			// glyphs, units and single characters are not copy anybody translates.
			if (!/[A-Za-z]{2,}/.test(literal.replace(ENTITY, ''))) continue;
			if (LITERAL_BY_DESIGN.has(literal)) continue;
			found.push(literal);
		}
	}
	// Copy handed to a render helper as an argument never appears inside a markup
	// template here, so the sweep above cannot see it even though a reader can.
	for (const m of code(src).matchAll(HELPER_ARG)) {
		const fn = m[1] ?? '';
		const literal = (m[2] ?? '').trim();
		if (NOT_COPY.has(fn)) continue;
		// An all-caps token is an id or an enum key, not something anybody reads.
		if (!/[a-z]/.test(literal)) continue;
		if (LITERAL_BY_DESIGN.has(literal)) continue;
		found.push(literal);
	}
	// And copy declared in a record rather than written at the point of render,
	// which is the same blind spot one indirection further out: a tab label or a
	// section note sits in a module-level table that no markup scan ever reaches.
	for (const m of code(src).matchAll(RECORD_COPY)) {
		const literal = (m[1] ?? '').trim();
		if (LITERAL_BY_DESIGN.has(literal)) continue;
		found.push(literal);
	}
	// And both halves of a two-state label, which sit inside an interpolation and
	// so collapse before the markup scan reads any text.
	for (const m of markupSource(code(src)).matchAll(TERNARY_COPY)) {
		for (const literal of [m[1], m[2]]) {
			const value = (literal ?? '').trim();
			if (!value || LITERAL_BY_DESIGN.has(value)) continue;
			if (!/[A-Za-z]{2,}/.test(value)) continue;
			found.push(value);
		}
	}
	return found;
}

/**
 * The language chain. Only link 1 shipped, so a component on a fully Spanish page rendered English chrome and there was no way to fix it short of hand-editing every embed. Links 2 and 3 are what make a Spanish WordPress site work with ZERO plugin change, because WordPress already emits `<html lang="es-AR">`.
 */
describe('site language resolution', () => {
	test('link 1: the element own lang attribute wins', () => {
		document.documentElement.lang = 'de';
		const el = document.createElement('div');
		el.setAttribute('lang', 'fr');
		document.body.appendChild(el);
		expect(resolveLang(el)).toBe('fr');
	});

	test('link 2: the nearest ancestor carrying lang', () => {
		document.documentElement.lang = 'de';
		const section = document.createElement('section');
		section.setAttribute('lang', 'pt');
		const el = document.createElement('div');
		section.appendChild(el);
		document.body.appendChild(section);
		expect(resolveLang(el)).toBe('pt');
	});

	test('link 3: the document element, which is the WordPress path', () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('div');
		document.body.appendChild(el);
		expect(resolveLang(el)).toBe('es-AR');
	});

	test('link 4: nothing, which callers read as English', () => {
		const el = document.createElement('div');
		document.body.appendChild(el);
		expect(resolveLang(el)).toBeUndefined();
	});

	test('the full regional tag survives, because a catalogue may want it', () => {
		document.documentElement.lang = 'pt-BR';
		const el = document.createElement('div');
		document.body.appendChild(el);
		expect(resolveLang(el)).toBe('pt-BR');
	});
});

/**
 * What may reach `?lang=`. `?lang=es-AR` is a 400 and `?lang=es` is a 200, so completing the chain above without this turns every Spanish WordPress site from English-but-working into broken.
 */
describe('the language sent to the API', () => {
	const langOf = (tag?: string) => {
		if (tag) document.documentElement.lang = tag;
		const el = document.createElement('div');
		document.body.appendChild(el);
		return apiLang(el);
	};

	test('a regional tag is truncated to the two-letter code', () => {
		expect(langOf('es-AR')).toBe('es');
		expect(langOf('pt-BR')).toBe('pt');
		expect(langOf('de-CH')).toBe('de');
	});

	test('case and script subtags are folded too', () => {
		expect(langOf('ES')).toBe('es');
		expect(langOf('es-419')).toBe('es');
	});

	test('a language the API does not accept is OMITTED, not sent', () => {
		// The chain now surfaces whatever the host page carries. `?lang=ja` is the
		// same 400 as `?lang=es-AR`, so a Japanese page has to fall back to the
		// English default rather than fail every request.
		expect(langOf('ja')).toBeUndefined();
		expect(langOf('zh-Hans')).toBeUndefined();
		expect(langOf('en-US')).toBe('en');
	});

	test('every tag it can return is one the spec declares', () => {
		for (const lang of API_LANGUAGES) {
			expect(langOf(lang)).toBe(lang);
		}
		expect(API_LANGUAGES).toContain('es');
	});
});

describe('the chrome-string catalogue', () => {
	/**
	 * Two source strings that differ only by case are ONE key, and the second silently wins in every catalogue.
	 *
	 * @remarks
	 * The runtime key is `lookupKey(source)`, which lower-cases. `harmonious` and `Harmonious` both shipped, so `registerLocale` wrote one and then overwrote it, and the natal legend rendered `Armónicos` in Spanish where English rendered `harmonious`. Nothing could catch it: the key-parity test compares raw source strings and saw two distinct entries, the placeholder test passed, and the rendered word was a correct translation of the OTHER string. The lower-case pair is gone and only the capitalized form remains.
	 */
	test('no two source strings collide once folded to their lookup key', () => {
		const seen = new Map<string, string>();
		const collisions: string[] = [];
		for (const source of CHROME_STRINGS) {
			const key = lookupKey(source);
			const first = seen.get(key);
			if (first) collisions.push(`${first} vs ${source}`);
			else seen.set(key, source);
		}
		expect(
			collisions,
			`These share one runtime key, so one of each pair can never be translated:\n  ${collisions.join('\n  ')}`,
		).toEqual([]);
		expect(seen.size).toBe(CHROME_STRINGS.length);
	});

	test('a miss returns the English source, so English needs no catalogue', () => {
		expect(translate(undefined, 'Aspect grid')).toBe('Aspect grid');
		expect(translate('de', 'Aspect grid')).toBe('Aspect grid');
	});

	test('a registered catalogue translates, keyed by the English source', () => {
		expect(translate('es', 'Aspect grid')).toBe('Cuadrícula de aspectos');
	});

	test('a regional tag falls back to its base language', () => {
		// The page says es-AR, we ship es. Falling back here is what lets a site
		// carry an accurate regional tag without us shipping one catalogue per
		// country.
		expect(translate('es-AR', 'Natal chart')).toBe('Carta natal');
		expect(translate('ES-419', 'Natal chart')).toBe('Carta natal');
	});

	test('the key normalizes, so a call site cannot miss on spacing or case', () => {
		expect(translate('es', 'aspect  grid')).toBe('Cuadrícula de aspectos');
	});

	test('interpolation fills {{name}} and leaves an unknown placeholder visible', () => {
		expect(translate('es', '{{count}} planets', { count: 12 })).toBe(
			'12 planetas',
		);
		expect(interpolate('{{a}} and {{b}}', { a: 'x' })).toBe('x and {{b}}');
	});

	test('a catalogue can be registered at runtime with no component change', () => {
		// The registry is the seam: a static payload today, a server response or a
		// host-page inline script tomorrow, and no component knows the difference.
		registerLocale('xx', { 'Natal chart': 'Nn' });
		expect(translate('xx', 'Natal chart')).toBe('Nn');
	});
});

/**
 * Every shipped catalogue, discovered from the directory rather than named here.
 *
 * @remarks
 * A hand-kept list would be checked against itself: the seventh language is exactly the one somebody forgets to add to it (lesson 23). Reading the directory means a new file is under every assertion below from the moment it exists, and a language that is short a key cannot pass by being absent from a list.
 */
async function shippedCatalogues(): Promise<
	Array<[string, Record<string, string>]>
> {
	const files = (await readdir('packages/ui/src/locales')).filter((f) =>
		f.endsWith('.ts'),
	);
	const out: Array<[string, Record<string, string>]> = [];
	for (const file of files.sort()) {
		const lang = file.replace(/\.ts$/, '');
		const mod = (await import(`../src/locales/${lang}.js`)) as Record<
			string,
			Record<string, string>
		>;
		const catalog = mod[lang];
		if (!catalog) throw new Error(`${file} must export a const named ${lang}`);
		out.push([lang, catalog]);
	}
	return out;
}

describe('shipped locales', () => {
	test('the shipped set is exactly the languages the API serves content in', async () => {
		// Anything else is half-translated by construction: a catalogue with no API
		// language gives localized chrome over English prose, and an API language
		// with no catalogue gives translated prose under English chrome, which is
		// the state this whole feature exists to remove. English is the source, so
		// it needs no catalogue.
		const shipped = (await shippedCatalogues()).map(([lang]) => lang);
		expect(shipped).toEqual(
			API_LANGUAGES.filter((l) => l !== 'en')
				.slice()
				.sort(),
		);
	});

	test('every catalogue carries exactly the English key set', async () => {
		const expected = [...CHROME_STRINGS].sort();
		for (const [lang, catalog] of await shippedCatalogues()) {
			const keys = Object.keys(catalog).sort();
			const missing = expected.filter((k) => !keys.includes(k));
			const extra = keys.filter((k) => !expected.includes(k as never));
			expect(
				{ lang, missing, extra },
				`${lang}.ts is out of step with chrome-strings.ts`,
			).toEqual({ lang, missing: [], extra: [] });
		}
	});

	test('nothing is left sitting as the English source string', async () => {
		// A copied English value is the failure mode of a bulk translation pass, and
		// it renders as one English word inside otherwise translated chrome. The
		// exceptions are declared per language, so a genuine coincidence is a
		// decision somebody wrote down rather than a gap nobody noticed.
		// Human Design is where this list grew: the system is a 1987 Western one and
		// most languages print its vocabulary as a loanword, so `Aura`, `Bodygraph`
		// and `Motor` recur below with a source behind each rather than a shrug. Each
		// locale file names the source for its own entries.
		// Two families recur across every language below and are noted once here
		// rather than seven times: the chart-axis tokens (`ASC`, `MC`, `IC`, `Vtx`),
		// which stay Latin in the astrological writing of all seven, and the
		// Sanskrit panchang limbs, which print as themselves wherever the script
		// allows. A language that abbreviates an axis natively is simply absent
		// from that entry, which is why Russian carries `Асц` and German `AC`.
		// The avastha systems, the ashtakavarga views and the pinda scores are the
		// same Sanskrit family, and the two label prefixes keep their full stop.
		// The eight bala components and the two table names are Sanskrit and print as
		// themselves wherever the script is Latin, and the units they are measured in
		// (rupas, virupas) ride along with them in the Romance three.
		// A handful of Latin-script cognates genuinely coincide on top of those two
		// families: `Symbol` in German, `Aspect` in French, `Longitude` in French and
		// Portuguese, and `Mantras:` wherever the script is Latin.
		// `{{planet}} {{level}}` is every language: the entry exists to carry the
		// ORDER of two slots, so there is no word in it to translate.
		// The compass initials coincide wherever the direction starts with the same
		// letter, which is why each language keeps only the ones that DIVERGE:
		// German swaps E for `O` (Ost), the Romance three swap W for `O` (Oeste,
		// Ouest, Oeste), and Turkish redraws all eight from Kuzey, Doğu and Güney.
		const IDENTICAL_BY_DESIGN: Record<string, string[]> = {
			// `Neutral` is the German word too; `Total` is `Gesamt`. German takes
			// `Radix` for the natal ring label, so it is NOT on this list. `Fix` is
			// the full German quality, which is why the abbreviation needs none.
			// `Definition`, `Aura`, `Design` and `Motor` are the German Human Design
			// terms as the German schools print them (`Motorenzentren`,
			// `Persönlichkeitsseite`/`Designseite`); `Bodygraph` is the loanword the
			// API's own German prose uses sixteen times inside this same card, which
			// is why `Körpergrafik` was passed over.
			// The four `Person` group legends are German too: German synastry forms
			// label their two inputs `Geburtsdaten Person 1` and `Geburtsdaten
			// Person 2`, so the German here is the same string, not a gap. German is
			// the only one of the seven where that happens; the other six all
			// translate the head noun.
			de: [
				'Koota',
				// `Position` is the German word.
				'Position',
				// The panchang terms are Sanskrit and print as themselves; a panchang
				// in this language names its five limbs with these same words.
				'Amrit Kalam',
				'Bhadra (Vishti)',
				'Dur Muhurta',
				'Karana',
				'Nakshatra',
				'Panchaka',
				'Panchang',
				'Tithi',
				'Varjyam',
				'Yoga',
				// `Element` is the German word.
				'Element',
				// `Emotional` is the German word.
				'Emotional',
				// `Planet` is the German word.
				'Planet',
				// `Vargottama` is Sanskrit (varga, division; uttama, best) and every
				// language prints the term itself rather than translating it.
				'Vargottama',
				// `Hora` is the Sanskrit term for the planetary hour and every language
				// below prints it unchanged; the reading is the Vedic one, not the
				// ordinary word for an hour that Spanish and Portuguese also spell this way.
				'Hora',
				'Aura',
				'Bodygraph',
				'Definition',
				'Design',
				'Fix',
				'Motor',
				'Neutral',
				'Person 1',
				'Person 2',
				'Person A',
				'Person B',
				'IC',
				'MC',
				'Vara',
				'Vtx',
				'in {{sign}}',
				'Mantras:',
				'Nakshatra {{name}}',
				'Pada',
				'Rashi',
				'Symbol',
				'Upagraha',
				'Upagrahas',
				'Choghadiya',
				'N',
				'NW',
				'S',
				'SW',
				'W',
				'Atmakaraka',
				'Darakaraka',
				'Graha',
				'Bhav Chalit',
				'Bhava',
				'Grahas',
				'Mag',
				'Madhya',
				'Bhava Bala',
				'Bhavadhipati',
				'Chesta',
				'Dig',
				'Drik',
				'Drishti',
				'Ishta {{value}}',
				'Kala',
				'Kashta {{value}}',
				'Naisargika',
				'Shadbala',
				'Sthana',
				'{{component}} Bala',
				'{{planet}} Shadbala',
				'Gochara',
				'Arudha Lagna',
				'Lagna',
				'Phase',
				'Upapada',
				'Antardasha',
				'Mahadasha',
				'Prana',
				'Pratyantardasha',
				'Sookshma',
				'Vimshottari Mahadasha',
				'{{planet}} {{level}}',
				'Ashtakavarga',
				'Baladi',
				'Bhinnashtakavarga',
				'Bindus',
				'Deeptadi',
				'Graha Pinda',
				'Jagradadi',
				'Nakshatra.',
				'Rashi Pinda',
				'Rashi.',
				'Sarvashtakavarga',
				'Shodhya Pinda',
				'Yogas',
				'Person {{n}}',
				'Planet 1',
				'Planet 2',
			],
			// `Natal` is a Spanish word (`carta natal`, `planetas natales`), not an
			// untranslated fallthrough. Same in French, Portuguese and Turkish, where
			// it is the naturalised modifier a chart writes in front of a body.
			// `Cardinal`, `Mutable` and `Mut` are Spanish words that coincide with
			// the English; `No` is the same word in both. `Aura`, `Motor`, `Color`,
			// `Base` and `Variables` are the Spanish Human Design words, and
			// `Bodygraph` is the loanword the API's Spanish prose prints.
			es: [
				'Koota',
				// The panchang terms are Sanskrit and print as themselves; a panchang
				// in this language names its five limbs with these same words.
				'Amrit Kalam',
				'Bhadra (Vishti)',
				'Dur Muhurta',
				'Karana',
				'Nakshatra',
				'Panchaka',
				'Panchang',
				'Tithi',
				'Varjyam',
				'Yoga',
				'Ashtama Chandra rashi',
				// `Compatible` and `Incompatible` are the Spanish words unchanged.
				'Compatible',
				'Incompatible',
				// `Chakras` is the Spanish spelling of the Sanskrit term.
				'Chakras',
				// `Vargottama` is Sanskrit (varga, division; uttama, best) and every
				// language prints the term itself rather than translating it.
				'Vargottama',
				// `Hora` is the Sanskrit term for the planetary hour and every language
				// below prints it unchanged; the reading is the Vedic one, not the
				// ordinary word for an hour that Spanish and Portuguese also spell this way.
				'Hora',
				'Aura',
				'Base',
				'Bodygraph',
				'Cardinal',
				'Color',
				'Motor',
				'Mut',
				'Mutable',
				'Natal',
				'No',
				'Total',
				'Variables',
				'ASC',
				'DSC',
				'IC',
				'MC',
				'Vara',
				'Vtx',
				'pada {{n}}',
				'Mantras:',
				'Nakshatra {{name}}',
				'Pada',
				'Rashi',
				'Upagraha',
				'Upagrahas',
				'Choghadiya',
				'E',
				'N',
				'NE',
				'S',
				'SE',
				'Atmakaraka',
				'Chara karakas',
				'Darakaraka',
				'Graha',
				'Invisible',
				'Visible',
				'Bhav Chalit',
				'Bhava',
				'Grahas',
				'Mag',
				'Madhya',
				'Bhava Bala',
				'Bhava Bala {{value}} virupas',
				'Bhavadhipati',
				'Chesta',
				'Dig',
				'Drik',
				'Drishti',
				'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas',
				'Ishta {{value}}',
				'Kala',
				'Kashta {{value}}',
				'Naisargika',
				'Shadbala',
				'Sthana',
				'{{component}} Bala',
				'{{component}} {{value}} virupas',
				'{{planet}} Shadbala',
				'{{value}} rupas',
				'Gochara',
				'Arudha Lagna',
				'Arudha padas',
				'Lagna',
				'Upapada',
				'Antardasha',
				'Mahadasha',
				'Prana',
				'Pratyantardasha',
				'Sookshma',
				'{{planet}} {{level}}',
				'Ashtakavarga',
				'Baladi',
				'Bhinnashtakavarga',
				'Bindus',
				'Deeptadi',
				'Graha Pinda',
				'Jagradadi',
				'Nakshatra.',
				'Rashi Pinda',
				'Rashi.',
				'Retro',
				'Sarvashtakavarga',
				'Shodhya Pinda',
				'Yogas',
				'ASC{{n}}',
			],
			// French borrows `apex` for the focal planet of a figure, and `aspects`
			// and `transits` are spelled the same; the German pair is a false friend
			// and is NOT. `Air`, `Cardinal` and `Mutable` are the real French words
			// and coincide with the English; `Mut` truncates `Mutable` onto the same
			// three letters, and `illustration` is spelled identically in French.
			// French Human Design keeps `Type`, `Aura`, `Design`, `Bodygraph`,
			// `Direction`, `Base`, `Cognition` and `Variables` unchanged, and
			// `Activations` differs from the English only in a plural it already has.
			fr: [
				// `Distance` and `Illumination` are the French words unchanged.
				'Distance',
				'Illumination',
				'Koota',
				// `Position` is the French word.
				'Position',
				// `Expression` is the French word; the fuller phrase needs an elision
				// this register does not allow, so the bare label stands.
				'Expression',
				// The panchang terms are Sanskrit and print as themselves; a panchang
				// in this language names its five limbs with these same words.
				'Amrit Kalam',
				'Bhadra (Vishti)',
				'Dur Muhurta',
				'Karana',
				'Nakshatra',
				'Panchaka',
				'Panchang',
				'Tithi',
				'Varjyam',
				'Yoga',
				'Ashtama Chandra rashi',
				// `Compatible` and `Incompatible` are the French words unchanged.
				'Compatible',
				'Incompatible',
				// `Chakras` and `Vibration` are the French words unchanged.
				'Chakras',
				'Vibration',
				// `Vargottama` is Sanskrit (varga, division; uttama, best) and every
				// language prints the term itself rather than translating it.
				'Vargottama',
				// `Hora` is the Sanskrit term for the planetary hour and every language
				// below prints it unchanged; the reading is the Vedic one, not the
				// ordinary word for an hour that Spanish and Portuguese also spell this way.
				'Hora',
				'Activations ({{count}})',
				'Air',
				// `Exceptions` is the French word and the spelling is identical.
				// French Vedic sources head this section `Exceptions` beside
				// `Gravité` and `Remèdes`, which are the other two on this card.
				'Exceptions',
				// `Date` is the French word and the accent-free spelling is a
				// coincidence; every French table it was checked against pairs it with
				// `Heure`, never with `Temps`.
				'Date',
				'Aura',
				'Base',
				'Bodygraph',
				'Cardinal',
				'Cognition',
				'Design',
				'Direction',
				'Mut',
				'Mutable',
				'Natal',
				'Total',
				'Transits',
				'Type',
				'Variables',
				'apex',
				'illustration',
				'{{count}} aspects',
				'ASC',
				'Arc',
				'Ascendant',
				'MC',
				'Vara',
				'Vtx',
				'pada {{n}}',
				'Aspect',
				'Longitude',
				'Mantras:',
				'Nakshatra {{name}}',
				'Pada',
				'Rashi',
				'Upagraha',
				'Upagrahas',
				'Choghadiya',
				'E',
				'Horizon',
				'N',
				'NE',
				'S',
				'SE',
				'Impact:',
				'Atmakaraka',
				'Chara karakas',
				'Darakaraka',
				'Graha',
				'Invisible',
				'Visible',
				'Aspects',
				'Palindrome',
				'Absent',
				'Bhav Chalit',
				'Bhava',
				'Grahas',
				'Mag',
				'Madhya',
				'Nature',
				'Bhava Bala',
				'Bhava Bala {{value}} virupas',
				'Bhavadhipati',
				'Chesta',
				'Dig',
				'Drik',
				'Drishti',
				'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas',
				'Ishta {{value}}',
				'Kala',
				'Kashta {{value}}',
				'Naisargika',
				'Shadbala',
				'Sthana',
				'{{component}} Bala',
				'{{component}} {{value}} virupas',
				'{{planet}} Shadbala',
				'{{value}} rupas',
				'Aspects ({{count}})',
				'Gochara',
				'Positions',
				'Arudha Lagna',
				'Arudha padas',
				'Lagna',
				'Phase',
				'Upapada',
				'Antardasha',
				'Mahadasha',
				'Prana',
				'Pratyantardasha',
				'Sookshma',
				'{{planet}} {{level}}',
				'Ashtakavarga',
				'Baladi',
				'Bhinnashtakavarga',
				'Bindus',
				'Deeptadi',
				'Graha Pinda',
				'Jagradadi',
				'Nakshatra.',
				'Rashi Pinda',
				'Rashi.',
				'Sarvashtakavarga',
				'Shodhya Pinda',
				'Yogas',
				'ASC{{n}}',
			],
			hi: ['ASC', 'ASC{{n}}', 'DSC', 'IC', 'MC', 'Vtx', '{{planet}} {{level}}'],
			// The three Portuguese abbreviations truncate `Cardinal`, `Fixo` and
			// `Mutável` at three characters, which lands on the English set;
			// `Cardinal` is the full Portuguese word. `Aura`, `Bodygraph` and `Motor`
			// are what Brazilian Human Design writing prints (`Centro Motor`), `Base`
			// is the cognate for the PHS layer, and `Design` is the chart side, which
			// Brazilian usage keeps English precisely to hold it apart from
			// `Desenho`.
			pt: [
				'Koota',
				// The panchang terms are Sanskrit and print as themselves; a panchang
				// in this language names its five limbs with these same words.
				'Amrit Kalam',
				'Bhadra (Vishti)',
				'Dur Muhurta',
				'Karana',
				'Nakshatra',
				'Panchaka',
				'Panchang',
				'Tithi',
				'Varjyam',
				'Yoga',
				'Ashtama Chandra rashi',
				// `Chakras` is the Portuguese spelling of the Sanskrit term.
				'Chakras',
				// `Vargottama` is Sanskrit (varga, division; uttama, best) and every
				// language prints the term itself rather than translating it.
				'Vargottama',
				// `Hora` is the Sanskrit term for the planetary hour and every language
				// below prints it unchanged; the reading is the Vedic one, not the
				// ordinary word for an hour that Spanish and Portuguese also spell this way.
				'Hora',
				'Aura',
				'Base',
				'Bodygraph',
				'Car',
				'Cardinal',
				'Design',
				'Fix',
				'Motor',
				'Mut',
				'Natal',
				'Total',
				'ASC',
				'DSC',
				'IC',
				'MC',
				'Vara',
				'Vtx',
				'pada {{n}}',
				'Longitude',
				'Mantras:',
				'Nakshatra {{name}}',
				'Pada',
				'Rashi',
				'Upagraha',
				'Upagrahas',
				'Choghadiya',
				'E',
				'N',
				'NE',
				'S',
				'SE',
				'Atmakaraka',
				'Chara karakas',
				'Darakaraka',
				'Graha',
				'Bhav Chalit',
				'Bhava',
				'Grahas',
				'Mag',
				'Madhya',
				'Bhava Bala',
				'Bhava Bala {{value}} virupas',
				'Bhavadhipati',
				'Chesta',
				'Dig',
				'Drik',
				'Drishti',
				'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas',
				'Ishta {{value}}',
				'Kala',
				'Kashta {{value}}',
				'Naisargika',
				'Shadbala',
				'Sthana',
				'{{component}} Bala',
				'{{component}} {{value}} virupas',
				'{{planet}} Shadbala',
				'{{value}} rupas',
				'Gochara',
				'Arudha Lagna',
				'Arudha padas',
				'Lagna',
				'Upapada',
				'Antardasha',
				'Mahadasha',
				'Prana',
				'Pratyantardasha',
				'Sookshma',
				'{{planet}} {{level}}',
				'Ashtakavarga',
				'Baladi',
				'Bhinnashtakavarga',
				'Bindus',
				'Deeptadi',
				'Graha Pinda',
				'Jagradadi',
				'Nakshatra.',
				'Rashi Pinda',
				'Rashi.',
				'Retro',
				'Sarvashtakavarga',
				'Shodhya Pinda',
				'Yogas',
				'ASC{{n}}',
			],
			ru: ['IC', 'MC', 'Vtx', '{{planet}} {{level}}'],
			// Turkish astrology borrows `orb`, `apex` and `natal` unchanged; `Total`
			// is `Toplam`. Turkish Human Design borrows `Aura`, `Bodygraph` and
			// `Motor` the same way (`Motor merkezler`). `Relocation` is the same
			// borrowing and the reason the chart it names already ships as
			// `Relocation haritası`: `Relokasyon` appears in no Turkish astrology
			// source, while Turkish academies print the English word bare inside a
			// Turkish title.
			// `Hora` as above: the Sanskrit term, printed unchanged.
			tr: [
				'Koota',
				// The panchang terms are Sanskrit and print as themselves; a panchang
				// in this language names its five limbs with these same words.
				'Amrit Kalam',
				'Bhadra (Vishti)',
				'Dur Muhurta',
				'Karana',
				'Nakshatra',
				'Panchaka',
				'Panchang',
				'Tithi',
				'Varjyam',
				'Yoga',
				'Ashtama Chandra rashi',
				'Orb',
				'apex',
				'Natal',
				'Aura',
				'Bodygraph',
				'Motor',
				'Relocation',
				'Hora',
				'Vargottama',
				// Turkish already borrows `orb`; the interpolated form follows it.
				'orb {{value}}°',
				// `Element` is the Turkish word too.
				'Element',
				'ASC',
				'DSC',
				'IC',
				'MC',
				'Vara',
				'Vtx',
				'pada {{n}}',
				'Nakshatra {{name}}',
				'Pada',
				'Rashi',
				'Upagraha',
				'Choghadiya',
				'Atmakaraka',
				'Darakaraka',
				'Graha',
				'Bhav Chalit',
				'Bhava',
				'Madhya',
				'Bhava Bala',
				'Bhavadhipati',
				'Chesta',
				'Dig',
				'Drik',
				'Drishti',
				'Ishta {{value}}',
				'Kala',
				'Kashta {{value}}',
				'Naisargika',
				'Shadbala',
				'Sthana',
				'{{component}} Bala',
				'{{planet}} Shadbala',
				'Gochara',
				'Arudha Lagna',
				'Bhava rashi',
				'Lagna',
				'Pada rashi',
				'Upapada',
				'Antardasha',
				'Mahadasha',
				'Prana',
				'Pratyantardasha',
				'Sookshma',
				'Vimshottari Mahadasha',
				'{{planet}} {{level}}',
				'Ashtakavarga',
				'Baladi',
				'Bhinnashtakavarga',
				'Deeptadi',
				'Graha Pinda',
				'Jagradadi',
				'Nakshatra.',
				'Rashi Pinda',
				'Rashi.',
				'Sarvashtakavarga',
				'Shodhya Pinda',
				'ASC{{n}}',
			],
		};
		for (const [lang, catalog] of await shippedCatalogues()) {
			const untranslated = Object.entries(catalog)
				.filter(([source, translated]) => source === translated)
				.map(([source]) => source)
				.sort();
			expect(untranslated, `untranslated entries in ${lang}.ts`).toEqual(
				(IDENTICAL_BY_DESIGN[lang] ?? []).slice().sort(),
			);
		}
	});

	test('every {{placeholder}} survives translation', async () => {
		// A dropped placeholder is silent: the sentence still reads, and the number
		// it was supposed to carry is simply gone.
		const placeholders = (s: string) =>
			(s.match(/\{\{\w+\}\}/g) ?? []).sort().join(',');
		for (const [lang, catalog] of await shippedCatalogues()) {
			for (const [source, translated] of Object.entries(catalog)) {
				expect(
					placeholders(translated),
					`placeholders drift in ${lang}.ts: ${source}`,
				).toBe(placeholders(source));
			}
		}
	});

	test('a non-Latin catalogue is in its own script, never transliterated', async () => {
		// Devanagari and Cyrillic are the two that can pass every other check while
		// being wrong: `janma kundali` has the right key, the right placeholder and
		// the right meaning, and no Hindi reader would accept it.
		const SCRIPT: Record<string, RegExp> = {
			hi: /\p{Script=Devanagari}/u,
			ru: /\p{Script=Cyrillic}/u,
		};
		// One exemption, stated structurally rather than as a list of words: a source
		// of four bare letters or fewer is a chart-axis token (`ASC`, `MC`, `IC`,
		// `Vtx`), not prose. Those stay Latin in the astrological writing of all
		// seven languages, exactly as `UTC` does, so demanding Devanagari there
		// would force an abbreviation no reader uses. A language that DOES
		// abbreviate natively still may, and Russian carries `Асц` and `Дсц`.
		const AXIS_TOKEN = /^[A-Za-z]{2,4}$/;
		// A source that is only slots and separators has no letters to translate;
		// what it carries is the ORDER, so there is nothing for a script to be in.
		const ONLY_SLOTS = (source: string) =>
			!/[A-Za-z]/.test(source.replace(/\{\{\w+\}\}/g, ''));
		for (const [lang, catalog] of await shippedCatalogues()) {
			const script = SCRIPT[lang];
			if (!script) continue;
			const wrongScript = Object.entries(catalog)
				.filter(
					([source, translated]) =>
						!AXIS_TOKEN.test(source.replace(/\{\{\w+\}\}/g, '')) &&
						!ONLY_SLOTS(source) &&
						!script.test(translated),
				)
				.map(([source]) => source);
			expect(
				wrongScript,
				`${lang}.ts entries with no ${lang === 'hi' ? 'Devanagari' : 'Cyrillic'} character (transliterated, or left in English)`,
			).toEqual([]);
		}
	});

	test('the Cyrillic catalogue uses only Russian letters', async () => {
		// Cyrillic is written by more than one language, so a transliteration can
		// land on a letter that is perfectly good Ukrainian and simply not Russian.
		// Every other check passes: the script is Cyrillic, the key is right, and
		// no reader of the catalogue would spot it. The alphabet is a closed set of
		// 33 letters, so the rule needs nothing maintained.
		const RUSSIAN = /^[а-яёА-ЯЁ]+$/;
		const [ru] = (await shippedCatalogues()).filter(([lang]) => lang === 'ru');
		if (!ru) throw new Error('ru catalogue not found');
		const offenders = Object.entries(ru[1])
			.filter(([, translated]) =>
				(translated.match(/\p{Script=Cyrillic}+/gu) ?? []).some(
					(run) => !RUSSIAN.test(run),
				),
			)
			.map(([source, translated]) => `${source} -> ${translated}`);
		expect(
			offenders,
			'ru.ts values containing a Cyrillic letter outside the Russian alphabet',
		).toEqual([]);
	});

	test('a non-Latin catalogue carries no stray Latin word', async () => {
		// The script test above proves the native script is PRESENT. It cannot see a
		// value that is half-transliterated, which is what a scripted edit produces
		// when it rewrites only part of a word.
		//
		// The rule needs no allowlist: a Latin run is legitimate only where the
		// English source uses that same word, which covers a brand name and a
		// protocol acronym and nothing else. A half-rewritten word fails it, because
		// the leftover is a fragment of a source word rather than the word.
		const SCRIPT: Record<string, RegExp> = {
			hi: /\p{Script=Devanagari}/u,
			ru: /\p{Script=Cyrillic}/u,
		};
		for (const [lang, catalog] of await shippedCatalogues()) {
			const script = SCRIPT[lang];
			if (!script) continue;
			const offenders: string[] = [];
			for (const [source, translated] of Object.entries(catalog)) {
				const body = translated.replace(/\{\{\w+\}\}/g, '');
				if (!script.test(body)) continue;
				const allowed = new Set(source.match(/[A-Za-z]{3,}/g) ?? []);
				for (const run of body.match(/[A-Za-z]{3,}/g) ?? []) {
					if (!allowed.has(run)) offenders.push(`${source} -> ${translated}`);
				}
			}
			expect(
				offenders,
				`${lang}.ts values carrying a Latin word the English source does not use`,
			).toEqual([]);
		}
	});

	test('the register holds: no apostrophe, em dash or exclamation mark', async () => {
		// The brand rule the English copy follows. A translation pass is where it
		// slips, because the punctuation is idiomatic in most of these languages.
		for (const [lang, catalog] of await shippedCatalogues()) {
			const offenders = Object.entries(catalog)
				.filter(([, translated]) => /['’—!]|--/.test(translated))
				.map(([source, translated]) => `${source} -> ${translated}`);
			expect(offenders, `register violations in ${lang}.ts`).toEqual([]);
		}
	});
});

/**
 * The drift guard. A component that adds a `t('...')` string nobody translated renders one English word inside otherwise Spanish chrome, and no other gate can see it: the string is valid, the render is valid, and the catalogue is simply short.
 */
describe('every localized call site is a string the catalogues carry', () => {
	test('no t(...) literal is absent from CHROME_STRINGS', async () => {
		const known = new Set<string>(CHROME_STRINGS);
		// `t('...')` and `this.t('...')`, single-quoted, which is what biome enforces.
		// `\s*` after the paren, because the formatter puts a long string on its own
		// line and a pattern anchored to the quote silently skips every one of those.
		const CALL = /\bt\(\s*'((?:[^'\\]|\\.)*)'/g;
		const missing: string[] = [];
		for (const dir of ['components', 'utils']) {
			const base = `packages/ui/src/${dir}`;
			for (const file of await readdir(base)) {
				if (!file.endsWith('.ts') || file.endsWith('.test.ts')) continue;
				const src = await Bun.file(`${base}/${file}`).text();
				for (const m of src.matchAll(CALL)) {
					const literal = (m[1] as string).replace(/\\'/g, "'");
					if (!known.has(literal)) missing.push(`${dir}/${file}: ${literal}`);
				}
			}
		}
		expect(
			missing,
			`Localized strings with no catalogue entry (add to src/i18n/chrome-strings.ts and every src/locales/*.ts):\n  ${missing.join('\n  ')}`,
		).toEqual([]);
	});
});

/**
 * The hole under the guard above: NOTHING obliges an author to call `t()` in the first place.
 *
 * @remarks
 * The forward scan reads `t('...')` call sites, so a component that writes `<h2>Transits</h2>` straight into its template has zero findings and ships English in all seven languages. Every gate agreed it was fine: the literal is valid TypeScript, the render is correct, the catalogues are complete, and the component simply never asks for a translation. `transits-table` was the proof, measuring as fully English on a page whose natal chart beside it was fully Spanish.
 *
 * So this is the same inverted scan the form path carries, pointed at the whole library and read through a RATCHET rather than a gate. The measured total is a translation programme and not a commit. The budget freezes that debt where it stands and closes the door behind it, which is the part that matters: a component added tomorrow is not in the table, so its budget is zero and its first hardcoded word is a red test.
 *
 * @remarks The detector is `visibleLiterals`, shared with the form-path guard at the bottom of this file. It reads text nodes and human-facing attributes out of every `html` and `svg` template, and anything routed through `t()` is invisible to it for free, because an interpolation collapses before the text is read.
 *
 * @remarks Known blind spots, stated rather than implied. Copy passed to a helper as a plain argument is NOT seen: `renderTablist({ items: [{ label: 'Positions' }], label: 'Transit views' })` is an object literal, not markup, and every tab label in the library reaches a reader that way. Nor is a string assigned to a `@property` default, a `const` table of labels, or anything a component builds by concatenation. This guard closes the template door; it does not prove a file is localized.
 */
describe('a component may not write its own words, and the debt only shrinks', () => {
	/**
	 * Frozen debt. Path under `src` to the number of user-visible literals that component still writes itself.
	 *
	 * **A file absent from this table must have ZERO, and that is the whole point of the guard.** A number here may only go DOWN, and lowering it is the bookkeeping that puts the repair in the diff: paying a file off and leaving its row stale would let the debt creep back up under a budget nobody re-read. Delete the row when it reaches zero.
	 *
	 * **The correct response to a failure is `t()`, never a new row.**
	 *
	 * **One narrow exception, and it is named rather than inferred.** `hd-connection` and `hd-penta` are English end to end BY DECISION, because almost all of their chrome is doctrine the component wrote rather than a label, and a half-translated card reads worse than a consistent English one. A feature added to one of those two raises its number, in the same change that adds the feature and with the copy visible in the diff. Every other file ratchets down only; if a row that is not one of those two goes up, the answer is `t()`.
	 */
	// Eleven rows are a re-baseline rather than a regression: the scan now reads
	// copy declared in a record as well as copy written at the point of render, so
	// those numbers are what they always were. Copy reached through a DYNAMIC
	// lookup is invisible to any scan, so the record holding it is typed
	// `ChromeString` and the compiler owns that half.
	const UNTRANSLATED_DEBT: Record<string, number> = {
		'components/hd-connection.ts': 30,
		'components/hd-penta.ts': 27,
		'components/kp-chart.ts': 43,
		'components/kp-planets-table.ts': 12,
		'components/kp-ruling-planets.ts': 18,
	};

	/** Path to the literals it writes, keyed the way the budget is. */
	async function measure(): Promise<Map<string, string[]>> {
		const out = new Map<string, string[]>();
		for (const path of await sourceFiles()) {
			const found = visibleLiterals(await Bun.file(path).text());
			if (found.length) out.set(path.slice(SRC.length + 1), found);
		}
		return out;
	}

	/**
	 * One term, one spelling. Matching on hyphens and spaces alone keeps this to the
	 * drift a reader would call a typo, and leaves sentence-position casing (`Total`
	 * beside `total`) alone, which is legitimate and would drown it.
	 */
	test('no term is written two ways across components', async () => {
		const spellings = new Map<string, Set<string>>();
		for (const literals of (await measure()).values()) {
			for (const l of literals) {
				const key = l.replaceAll('-', '').replaceAll(' ', '');
				if (key.length < 4) continue;
				const seen = spellings.get(key) ?? new Set<string>();
				seen.add(l);
				spellings.set(key, seen);
			}
		}
		const clashes = [...spellings.values()]
			.filter((s) => s.size > 1)
			.map((s) => [...s].sort().join('  vs  '));
		expect(
			clashes,
			`The same term spelled two ways. Match the spelling the API uses:\n  ${clashes.join('\n  ')}`,
		).toEqual([]);
	});

	test('no file writes more untranslated copy than its frozen budget', async () => {
		const measured = await measure();
		// Not vacuous in the direction that matters: a detector that stopped
		// finding anything reports every budgeted file as improved and fails below.
		expect((await sourceFiles()).length).toBeGreaterThan(60);

		const regressions: string[] = [];
		for (const [file, literals] of measured) {
			const budget = UNTRANSLATED_DEBT[file] ?? 0;
			if (literals.length <= budget) continue;
			regressions.push(
				`${file}: ${literals.length} untranslated, budget ${budget}\n      ${literals.join('\n      ')}`,
			);
		}
		expect(
			regressions,
			`Copy a visitor reads, written straight into a template, so it renders English in all seven languages. Wrap each one in this.t(...) and add the English source to src/i18n/chrome-strings.ts and every src/locales/*.ts. A file absent from UNTRANSLATED_DEBT must carry NONE, which is what makes a new component start out localized:\n  ${regressions.join('\n  ')}`,
		).toEqual([]);
	});

	test('a file that improved has its budget lowered in the same change', async () => {
		const measured = await measure();
		const improved: string[] = [];
		for (const [file, budget] of Object.entries(UNTRANSLATED_DEBT)) {
			const found = measured.get(file)?.length ?? 0;
			if (found < budget)
				improved.push(`${file}: ${found} now, budget ${budget}`);
		}
		expect(
			improved,
			`These carry less untranslated copy than their budget allows, which is a failure with a one-line fix: lower the number (or delete the row at zero) so the debt cannot slip back in behind it:\n  ${improved.join('\n  ')}`,
		).toEqual([]);
	});

	test('the frozen budget covers only files that still exist', async () => {
		// A row for a deleted or renamed component is dead weight that hides real debt
		// behind a stale total, and it reads as coverage nobody has.
		const live = new Set(
			(await sourceFiles()).map((p) => p.slice(SRC.length + 1)),
		);
		expect(Object.keys(UNTRANSLATED_DEBT).filter((f) => !live.has(f))).toEqual(
			[],
		);
	});
});

/**
 * The second half of "the component does not know the locale". Chrome was localized first, which made the other half visible: `toLocaleDateString(undefined, ...)` means the locale of whoever is LOOKING, so a Spanish page rendered `Carta natal` over `Jan 15, 1990, 2:30 PM` and two visitors to one page saw two different strings.
 *
 * @remarks
 * TypeScript already makes an OMITTED locale a compile error, since every locale-sensitive formatter takes it as a required first parameter. It cannot see the other two ways back into the bug, and both had shipped: a component calling `Intl` itself (`dasha-timeline` hardcoded `toLocaleString('en', ...)`, pinning every dasha boundary to English while its siblings followed the viewer), and a call site passing a LITERAL locale instead of the resolved one. So the scan owns those.
 *
 * The formatter list is derived from `format.ts` rather than kept here, for the reason lesson 23 gives: a coverage requirement policed by a hand-maintained list misses the next member. A formatter added with a `locale` parameter is swept from the moment it exists.
 */
describe('locale formatting cannot escape the sanctioned utility', () => {
	const FORMAT = 'packages/ui/src/utils/format.ts';
	/** Every way into locale-aware formatting: the three `toLocale*` methods and any `Intl` constructor. */
	const RAW_INTL = /\.toLocale(?:Date|Time)?String\s*\(|\bIntl\.[A-Z]/;
	/** How a call site is allowed to name the locale. A string literal is not on the list: that IS the `'en'` bug. */
	const SANCTIONED = ['this.effectiveLang()', 'locale,', 'locale)'];

	test('no file outside utils/format.ts calls Intl or a toLocale method', async () => {
		const offenders: string[] = [];
		for (const path of await sourceFiles()) {
			if (path === FORMAT) continue;
			for (const [n, line] of codeLines(await Bun.file(path).text())) {
				if (RAW_INTL.test(line)) offenders.push(`${path}:${n} ${line.trim()}`);
			}
		}
		expect(
			offenders,
			`Locale formatting belongs in ${FORMAT}, which takes the page locale as an argument. A component reaching Intl directly formats for whoever is looking, or pins a literal language:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});

	test('every Intl call inside format.ts is handed the resolved locale', async () => {
		// The exemption above is only worth having if the exempt file cannot itself
		// pass `undefined` (the runtime default, i.e. the viewer) or a literal.
		const src = await Bun.file(FORMAT).text();
		const offenders: string[] = [];
		for (const [n, line] of codeLines(src)) {
			for (const m of line.matchAll(new RegExp(RAW_INTL, 'g'))) {
				const after = line.slice(m.index + m[0].length).trimStart();
				// A call broken across lines by the formatter puts the argument on the
				// next line, which is still the locale helper and nothing else.
				if (after === '' || after.startsWith('intlLocales(')) continue;
				offenders.push(`${FORMAT}:${n} ${line.trim()}`);
			}
		}
		expect(
			offenders,
			`Every Intl call here takes intlLocales(locale). Passing undefined is the original defect, and passing a literal is the dasha-timeline one:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});

	test('every formatter call passes the resolved locale, never a literal', async () => {
		const format = await Bun.file(FORMAT).text();
		const names = [
			...format.matchAll(
				/export function (\w+)\(\s*locale: string \| undefined/g,
			),
		].map((m) => m[1] as string);
		// Not vacuous: the derivation has to have found the real set.
		expect(names).toContain('formatDate');
		expect(names).toContain('formatTime');
		expect(names.length).toBeGreaterThanOrEqual(6);

		const CALL = new RegExp(`\\b(${names.join('|')})\\(`, 'g');
		const offenders: string[] = [];
		for (const path of await sourceFiles()) {
			if (path === FORMAT) continue;
			const src = await Bun.file(path).text();
			const lines = codeLines(src);
			const code = new Set(lines.map(([n]) => n));
			for (const m of src.matchAll(CALL)) {
				const line = src.slice(0, m.index).split('\n').length;
				if (!code.has(line)) continue;
				const arg = src.slice(m.index + m[0].length).trimStart();
				if (SANCTIONED.some((s) => arg.startsWith(s))) continue;
				offenders.push(`${path}:${line} ${m[1]}(${arg.slice(0, 24)}...`);
			}
		}
		expect(
			offenders,
			`A formatter takes the DISPLAY locale first: this.effectiveLang() in a component, a threaded \`locale\` parameter in a module-level helper. A literal pins the language; anything else is the missing argument:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});
});

describe('a component renders its chrome in the page language', () => {
	test('the natal chart reads Spanish from <html lang="es-AR"> alone', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-natal-chart');
		document.body.appendChild(el);
		await settled(el);
		// No data yet: the empty state is the first thing a fresh tag paints.
		expect(text(el)).toContain('Sin datos');
	});

	test('the same component with no page language stays English', async () => {
		const el = document.createElement('roxy-natal-chart');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('No data');
	});

	/** A source string reused by a second component has to READ correctly there, not merely resolve. */
	test('the aspect breakdown pills read in the page language', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-compatibility-card');
		(el as unknown as { data: unknown }).data = {
			overallScore: 72,
			signCompatibility: { rating: 'Strong' },
			aspectBreakdown: { total: 12, harmonious: 5, challenging: 4, neutral: 3 },
		};
		document.body.appendChild(el);
		await settled(el);
		const t = text(el);
		for (const word of ['Armónicos', 'Tensos', 'Neutros']) {
			expect(t, `${word} missing`).toContain(word);
		}
		expect(t).not.toContain('Harmonious');
		el.remove();
	});

	/** The count line used to build an English plural by appending `es`, which no other language does. */
	test('the dream search count reads in the page language', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-dream-search');
		(el as unknown as { data: unknown }).data = {
			symbols: [{ id: '1', name: 'Water', letter: 'W' }],
			total: 1,
		};
		document.body.appendChild(el);
		await settled(el);
		const t = text(el);
		expect(t).toContain('Símbolos oníricos');
		expect(t).toContain('1 coincidencias');
		expect(t).not.toContain('match');
		el.remove();
	});

	/** The divisional label is the one that interpolates, so the chart name has to survive translation. */
	test('the divisional chart keeps its chart name inside the translated label', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-divisional-chart');
		(el as unknown as { data: unknown }).data = {
			division: { number: 9, name: 'Navamsa', sanskritName: 'Navamsa' },
			chart: {
				meta: {
					Sun: { graha: 'Sun', rashi: 'Leo', longitude: 130.5 },
				},
			},
			vargottama: ['Sun'],
		};
		document.body.appendChild(el);
		await settled(el);
		const label =
			(el as unknown as { shadowRoot: ShadowRoot }).shadowRoot?.innerHTML ?? '';
		expect(label).toContain('Carta divisional D9 Navamsa');
		expect(label).not.toContain('divisional chart with twelve');
		el.remove();
	});

	test('the dosha card renders every heading it writes in the page language', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-dosha-card');
		(el as unknown as { data: unknown }).data = {
			dosha: 'Mangal',
			present: true,
			severity: 'High',
			remedies: ['Recite the Hanuman Chalisa on Tuesdays'],
			exceptions: ['Mars in Aries'],
		};
		document.body.appendChild(el);
		await settled(el);
		const t = text(el);
		expect(t).toContain('Remedios');
		expect(t).toContain('Excepciones');
		expect(t).not.toContain('Remedies');
		expect(t).not.toContain('Exceptions');
		el.remove();
	});

	test('a decimal a component renders reaches the reader localized', async () => {
		// The helper being locale-aware proves nothing on its own: the locale has to
		// travel from the page, through the component, into the call. Render it.
		document.documentElement.lang = 'de-DE';
		const el = document.createElement('roxy-moon-phase');
		(el as unknown as { data: unknown }).data = {
			phase: 'waxing_crescent',
			illumination: 42.5,
			age: 12.5,
			distance: 384400,
		};
		document.body.appendChild(el);
		await settled(el);
		const t = text(el);
		// The decimal separator is the reader's.
		expect(t).toContain('12,5');
		expect(t).not.toContain('12.5');
		// And German separates the number from the percent sign, which is the
		// locale's rule rather than a string this component holds.
		expect(t).toMatch(/43\s%/u);
		el.remove();
	});

	test('the default heading translates, which no static scan can prove', async () => {
		// `this.t(this.heading)` is a dynamic call, so the `t(...)` literal scan
		// above cannot see the default. Render it instead.
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-natal-chart');
		(el as unknown as { data: unknown }).data = { planets: [] };
		document.body.appendChild(el);
		await settled(el);
		const rendered = (el as unknown as { shadowRoot: ShadowRoot }).shadowRoot
			.textContent as string;
		expect(rendered).toContain('Carta natal');
		expect(rendered).toContain('0 planetas');
	});

	test('the birth date is formatted in that language too, not the viewer one', async () => {
		// The whole chain in one assertion: <html lang> -> resolveLang ->
		// effectiveLang -> formatDateTime -> Intl. Chrome and data have to agree,
		// because `Carta natal` over `Jan 15, 1990` is the half-finished state this
		// replaced. The region survives: `es-AR` writes `15 de ene de 1990` where
		// `es` writes `15 ene 1990`, and only the display locale carries it.
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-natal-chart');
		(el as unknown as { data: unknown }).data = {
			planets: [],
			birthDetails: { date: '1990-01-15', time: '14:30:00' },
		};
		document.body.appendChild(el);
		await settled(el);
		const rendered = text(el);
		expect(rendered).toContain('Carta natal');
		expect(rendered).toContain('15 de ene de 1990');
		expect(rendered).not.toContain('Jan 15');
	});

	test('an element lang attribute overrides the page', async () => {
		document.documentElement.lang = 'es';
		const el = document.createElement('roxy-natal-chart');
		el.setAttribute('lang', 'en');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('No data');
	});

	/**
	 * `<roxy-data>`, which is easy to record as done while it still holds zero `t()` calls.
	 *
	 * @remarks
	 * It is the generic fallback every unbound endpoint renders through, so it is the component a Spanish site is most likely to be looking at, and it was the WORST case rather than a missing nicety: `foldLocalized` already runs inside its `suppress()` funnel, so it can print `Sol` and `Piscis` under `Yes`, `No` and `31 rows` in English. Translated values under English chrome is the state that reads worse than all-English.
	 *
	 * What is NOT asserted here, because it cannot be fixed here: the column HEADINGS. They come from the wire field name through `humanize()`, so they are derived rather than literal and no catalogue keyed on English source text can reach them. That is the shared field-name-to-label artifact `<roxy-endpoint-form>` needs too.
	 */
	test('the generic fallback reads Spanish, chrome and values together', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-data');
		// Past the row threshold, so the count disclosure renders, and carrying a
		// boolean so the Yes/No pair does.
		(el as unknown as { data: unknown }).data = Array.from(
			{ length: 14 },
			(_, i) => ({
				planet: 'Sun',
				planetLocalized: 'Sol',
				degree: i,
				isRetrograde: i % 2 === 0,
			}),
		);
		document.body.appendChild(el);
		await settled(el);
		const root = (el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;
		const rendered = text(el);
		expect(rendered).toContain('14 filas');
		expect(rendered).not.toContain('14 rows');
		expect(
			root.querySelector('.roxy-table-wrap')?.getAttribute('aria-label'),
		).toBe('Tabla de datos');
		expect(root.querySelector('.roxy-card')?.getAttribute('aria-label')).toBe(
			'Visualización de datos genérica',
		);
		// The fold was already putting the Spanish value under the English column,
		// which is the half this catalogue completes.
		expect(rendered).toContain('Sol');
		expect(rendered).not.toContain('Planet Localized');
		el.remove();
	});

	test('its booleans and empty state translate too', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-data');
		(el as unknown as { data: unknown }).data = {
			name: 'Prueba',
			isRetrograde: false,
			items: [],
		};
		document.body.appendChild(el);
		await settled(el);
		const rendered = text(el);
		expect(rendered).toContain('No');
		expect(rendered).not.toContain('Yes');
		el.remove();
	});

	/**
	 * The transit wheel, the second half of the practitioner card. A Spanish natal card over an English transit wheel is the half-translated state this feature exists to remove.
	 */
	test('the transit wheel reads Spanish from the page language alone', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-transit-wheel');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('Sin datos');
		el.remove();
	});

	test('its default heading and its house chrome translate too', async () => {
		// `this.t(this.heading)` is a dynamic call the literal scan cannot see, and
		// the House columns are the new practitioner surface, so both are asserted
		// on a real render rather than trusted.
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-transit-wheel');
		(el as unknown as { data: unknown }).data = {
			transitDate: '2026-05-11 12:00:00',
			houseSystem: 'placidus',
			natalPlanets: [
				{
					name: 'Sun',
					longitude: 0,
					latitude: 0,
					sign: 'Aries',
					degree: 0,
					house: 8,
					speed: 1,
					isRetrograde: false,
				},
			],
			transitPlanets: [
				{
					name: 'Sun',
					longitude: 180,
					latitude: 0,
					sign: 'Libra',
					degree: 0,
					house: 3,
					speed: 1,
					isRetrograde: false,
				},
			],
			aspects: [],
		};
		document.body.appendChild(el);
		await settled(el);
		const rendered = text(el);
		expect(rendered).toContain('Tránsitos');
		expect(rendered).toContain('Casa natal');
		expect(rendered).toContain('Casa en tránsito');
		expect(rendered).toContain('casas placidus');
		expect(rendered).toContain('Sin cúspides de casas');
		// The English source words are gone, not merely joined by Spanish ones.
		expect(rendered).not.toContain('Natal house');
		expect(rendered).not.toContain('No house cusps');
		el.remove();
	});
});

/**
 * The half the chrome catalogue cannot reach: the words the API returned.
 *
 * @remarks
 * A translated response now carries the display value BESIDE the canonical one (`nameLocalized` next to `name`), and the canonical one stays English in every language on purpose, because it is what code compares against. Every glyph table, every `ASPECT_CLASS` key, every body `Map` and every CSS class fragment in this library is keyed on that English value.
 *
 * **So each field is read twice, from two different halves, and the split is what these tests pin.** Collapsing it in either direction is silent: keying a lookup on the localized value resolves nothing on a Spanish page and everything on an English one, so it survives every gate the way the `North node` glyph miss did, and printing the canonical value leaves a Spanish chart reading `Carta natal` over `Sun` and `Pisces`, which is the half-translated state the chrome work was supposed to end.
 *
 * Sabotage-verified: pointing `planetGlyph` at `nameLocalized` in `renderPlanets`, and `ASPECT_CLASS` at `typeLocalized` in `renderAspects`, each turn the glyph test below red while every other gate stays green.
 */
describe('the vocabulary a reader sees, and the English value the code keys on', () => {
	/** One chart carrying BOTH halves of every field the wheel prints, so a single render can be read from either side. */
	const NATAL_BOTH = {
		houseSystem: 'placidus',
		houses: [],
		planets: [
			{
				name: 'Sun',
				nameLocalized: 'Sol',
				longitude: 345.5,
				latitude: 0,
				sign: 'Pisces',
				signLocalized: 'Piscis',
				degree: 15.5,
				speed: 1,
				isRetrograde: false,
				interpretation: { summary: 'Lectura solar' },
			},
			{
				name: 'Mars',
				nameLocalized: 'Marte',
				longitude: 105.5,
				latitude: 0,
				sign: 'Cancer',
				signLocalized: 'Cáncer',
				degree: 15.5,
				speed: 0.5,
				isRetrograde: true,
			},
		],
		aspects: [
			{
				planet1: 'Sun',
				planet1Localized: 'Sol',
				planet2: 'Mars',
				planet2Localized: 'Marte',
				type: 'TRINE',
				typeLocalized: 'Trígono',
				orb: 1.2,
			},
		],
		summary: {
			dominantElement: 'Water',
			dominantElementLocalized: 'Agua',
			dominantModality: 'Fixed',
			dominantModalityLocalized: 'Fija',
			retrogradePlanets: ['Mars'],
			retrogradePlanetsLocalized: ['Marte'],
		},
	};

	/** The same chart as an ENGLISH response, which carries no localized field at all. */
	const NATAL_ENGLISH = JSON.parse(
		JSON.stringify(NATAL_BOTH, (key, value) =>
			key.endsWith('Localized') ? undefined : value,
		),
	);

	async function mountNatal(data: unknown, lang?: string): Promise<Element> {
		if (lang) document.documentElement.lang = lang;
		const el = document.createElement('roxy-natal-chart');
		(el as unknown as { data: unknown }).data = data;
		document.body.appendChild(el);
		await settled(el);
		return el;
	}

	const shadow = (el: Element): ShadowRoot =>
		(el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;

	const markup = (el: Element): string => shadow(el).innerHTML;

	/**
	 * The glyph each matched node ENDS with, per site.
	 *
	 * @remarks
	 * Per site rather than "does the glyph appear anywhere", because the same body draws a glyph in five places on one card and a single sloppy `toContain` is satisfied by any one of them: pointing the wheel lookup at `nameLocalized` left the grid, the pills and the reading label still printing the right glyph, and a whole-card assertion stayed green over a wheel that had lost every one of its own. The glyph is the LAST node because an SVG `<text>` carries its `<title>` tooltip as a child first.
	 */
	const glyphsAt = (root: ShadowRoot, selector: string): string[] =>
		[...root.querySelectorAll(selector)].map(
			(n) => n.lastChild?.textContent?.trim() ?? '',
		);

	test('the natal chart prints the localized body, sign and aspect names', async () => {
		const el = await mountNatal(NATAL_BOTH, 'es-AR');
		const rendered = text(el);
		// Wheel tooltips, the dominant pills, the retrograde pills and the reading
		// accordion, all off one render.
		expect(rendered).toContain('Sol');
		expect(rendered).toContain('Marte');
		expect(rendered).toContain('Piscis');
		expect(rendered).toContain('Cáncer');
		expect(rendered).toContain('Trígono');
		expect(rendered).toContain('Agua');
		expect(rendered).toContain('Fija');
		// The English vocabulary is GONE from the reader's half, not merely joined
		// by Spanish beside it.
		expect(rendered).not.toContain('Sun');
		expect(rendered).not.toContain('Mars');
		expect(rendered).not.toContain('Pisces');
		expect(rendered).not.toContain('TRINE');
		el.remove();
	});

	test('and every glyph still resolves, because the lookup stayed on the English name', async () => {
		// The load-bearing assertion of this whole change. `planetGlyph`,
		// `signGlyph`, `aspectSymbol` and `ASPECT_CLASS` are keyed on the canonical
		// value, so a later "simplification" that reads the localized field instead
		// draws a chart with no glyphs on it, in Spanish only.
		const el = await mountNatal(NATAL_BOTH, 'es-AR');
		const root = shadow(el);
		// The wheel, in longitude order: Mars at 105 before the Sun at 345.
		expect(glyphsAt(root, '.planet-glyph')).toEqual(['♂', '☉']);
		// The twelve zodiac glyphs, keyed off SIGNS_ORDER rather than the response.
		expect(glyphsAt(root, '.sign-glyph')).toContain('♓');
		const rendered = text(el);
		// The retrograde pill and the reading label, which each pair a glyph with
		// the localized name right beside it.
		expect(rendered).toContain('♂ Marte R');
		expect(rendered).toContain('☉ Sol');
		// The element-modality cross-tab places every body by its ENGLISH sign.
		expect(root.querySelector('.em-grid')?.textContent).toContain('♂');
		// The aspect line takes its colour from a CSS class fragment built out of
		// the English type, which no amount of rendered text can prove.
		expect(markup(el)).toContain('aspect aspect-trine');
		el.remove();
	});

	test('the retrograde list is zipped by index, so each glyph keeps its own label', async () => {
		// Two arrays, one canonical and one localized, and the pairing is position
		// alone. Sorting or filtering either side puts Saturn's glyph on Pluto.
		const el = await mountNatal(NATAL_BOTH, 'es-AR');
		expect(text(el)).toContain('♂ Marte R');
		el.remove();
	});

	test('a partial localized list still resolves every glyph', async () => {
		const el = await mountNatal(
			{
				...NATAL_BOTH,
				summary: {
					...NATAL_BOTH.summary,
					retrogradePlanets: ['Mars', 'Pluto'],
					retrogradePlanetsLocalized: ['Marte'],
				},
			},
			'es-AR',
		);
		const rendered = text(el);
		expect(rendered).toContain('♂ Marte R');
		// The item the catalogue ran out for falls back on its own, per index.
		expect(rendered).toContain('♇ Pluto R');
		el.remove();
	});

	/**
	 * The cross-tab axes are the one vocabulary the CATALOGUE owns, and this is the assertion that keeps that safe.
	 *
	 * @remarks
	 * The 4x3 grid is the component's own construction, so six of its seven headers have no field in the response to defer to and the seventh, the dominant pair, would have been the only translated word in the table. Left English, they are the one block on a translated card that still reads English.
	 *
	 * Translating them re-opens exactly one risk: the dominant element and modality DO come back localized, they are rendered as a pill directly above this grid, and the grid tints the matching row and column. So the catalogue and the API have to say the same word or one card reads `Elemento dominante: Agua` over a row headed something else. This test renders both and asserts they meet.
	 */
	test('the dominant pill and the row it tints read the same word', async () => {
		const el = await mountNatal(NATAL_BOTH, 'es-AR');
		const root = shadow(el);
		const rendered = text(el);
		// Straight off the response, through `display()`.
		expect(rendered).toContain('Elemento dominante: Agua');
		expect(rendered).toContain('Modalidad dominante: Fija');
		// Straight out of the catalogue, and the same two words.
		const rowHeads = [...root.querySelectorAll('.em-grid tbody th')].map((th) =>
			(th.textContent ?? '').trim(),
		);
		expect(rowHeads).toEqual(['Fuego', 'Tierra', 'Aire', 'Agua', 'Total']);
		const colHeads = [...root.querySelectorAll('.em-grid thead th')];
		expect(colHeads.map((th) => (th.textContent ?? '').trim())).toEqual([
			'',
			'Card',
			'Fija',
			'Mut',
			'Total',
		]);
		// The abbreviation is decodable: the full modality rides as the column
		// title, because `Card` and `Mut` say nothing on their own and a Cyrillic
		// or Devanagari abbreviation says less.
		expect(
			colHeads.map((th) => th.getAttribute('title')).filter(Boolean),
		).toEqual(['Cardinal', 'Fija', 'Mutable']);
		// The tint still lands on the dominant row and column, which is what makes
		// the pill and the grid one reading rather than two.
		expect(
			root.querySelector('.em-grid tbody tr:nth-child(4) th')?.className,
		).toContain('dominant');
		el.remove();
	});

	/**
	 * Every catalogue against the words the API itself returns, not just the Spanish one on a render.
	 *
	 * @remarks
	 * Captured live from `/astrology/natal-chart?lang=`, one chart per dominant pair, plus `/astrology/signs?lang=` for the elements. A hardcoded table rather than a live call, for the reason the oracles cross into `gold-standard`: the NUMBERS travel, the dependency does not. Re-run those two endpoints if a value here is ever disputed.
	 */
	test('every catalogue names the elements and modalities the way the API does', async () => {
		const API_VOCAB: Record<string, Record<string, string>> = {
			de: {
				Fire: 'Feuer',
				Earth: 'Erde',
				Air: 'Luft',
				Water: 'Wasser',
				Cardinal: 'Kardinal',
				Fixed: 'Fix',
				Mutable: 'Veränderlich',
			},
			es: {
				Fire: 'Fuego',
				Earth: 'Tierra',
				Air: 'Aire',
				Water: 'Agua',
				Cardinal: 'Cardinal',
				Fixed: 'Fija',
				Mutable: 'Mutable',
			},
			fr: {
				Fire: 'Feu',
				Earth: 'Terre',
				Air: 'Air',
				Water: 'Eau',
				Cardinal: 'Cardinal',
				Fixed: 'Fixe',
				Mutable: 'Mutable',
			},
			hi: {
				Fire: 'अग्नि',
				Earth: 'पृथ्वी',
				Air: 'वायु',
				Water: 'जल',
				Cardinal: 'चर',
				Fixed: 'स्थिर',
				Mutable: 'द्विस्वभाव',
			},
			pt: {
				Fire: 'Fogo',
				Earth: 'Terra',
				Air: 'Ar',
				Water: 'Água',
				Cardinal: 'Cardinal',
				Fixed: 'Fixo',
				Mutable: 'Mutável',
			},
			ru: {
				Fire: 'Огонь',
				Earth: 'Земля',
				Air: 'Воздух',
				Water: 'Вода',
				Cardinal: 'Кардинальный',
				Fixed: 'Фиксированный',
				Mutable: 'Мутабельный',
			},
			tr: {
				Fire: 'Ateş',
				Earth: 'Toprak',
				Air: 'Hava',
				Water: 'Su',
				Cardinal: 'Öncü',
				Fixed: 'Sabit',
				Mutable: 'Değişken',
			},
		};
		// `de` Mutable was exempted here until 2026-08-09, because the API served
		// `Veraenderlich` with the umlaut expanded while every other German string
		// it serves keeps one. The API was corrected the same day, so the pair is
		// back under the drift check below rather than carved out of it.

		const drift: string[] = [];
		for (const [lang, catalog] of await shippedCatalogues()) {
			for (const [source, apiWord] of Object.entries(API_VOCAB[lang] ?? {})) {
				if (catalog[source] !== apiWord)
					drift.push(`${lang}.ts ${source}: ${catalog[source]} vs ${apiWord}`);
			}
		}
		expect(
			drift,
			`A catalogue element or modality must be the word the API returns for the same concept, or the dominant pill and the grid row it tints read differently on one card:\n  ${drift.join('\n  ')}`,
		).toEqual([]);
	});

	test('the aspect grid pairs on the English name and labels in Spanish', async () => {
		const el = await mountNatal(NATAL_BOTH, 'es-AR');
		const root = shadow(el);
		const grid = [...root.querySelectorAll('.roxy-tab')].find(
			(t) => t.id === 'natal-tab-grid',
		) as HTMLElement | undefined;
		expect(grid).toBeTruthy();
		grid?.click();
		await settled(el);

		// Scoped to the aspect grid: the element-modality cross-tab beside it now
		// carries `title` on its own column headers too, and an unscoped query
		// reads both tables as one (lesson 31, assert per SITE).
		const heads = [...root.querySelectorAll('.aspect-grid th[title]')];
		expect(heads.map((th) => th.getAttribute('title'))).toEqual([
			'Sol',
			'Marte',
		]);
		// Localized in the tooltip, English in the glyph the header actually shows.
		expect(heads.map((th) => th.textContent?.trim())).toEqual(['☉', '♂']);
		const cell = root.querySelector('td.cell');
		expect(cell?.getAttribute('title')).toContain('Marte Trígono Sol');
		expect(cell?.className).toContain('aspect-trine');
		// The pairing found the aspect on its English key, so the cell drew a glyph.
		expect(cell?.textContent?.trim()).toBe('△');
		el.remove();
	});

	test('an English response, which carries no localized field, is unchanged', async () => {
		const el = await mountNatal(NATAL_ENGLISH);
		const rendered = text(el);
		expect(rendered).toContain('Sun');
		expect(rendered).toContain('Pisces');
		expect(rendered).toContain('☉ Sun');
		expect(rendered).toContain('♂ Mars R');
		expect(rendered).toContain('Water');
		// The cross-tab axes cost English nothing: the catalogue key IS the English
		// source, so a page with no language renders the same words it always did.
		expect(rendered).toContain('Fire');
		expect(rendered).toContain('Car');
		expect(markup(el)).toContain('aspect aspect-trine');
		el.remove();
	});

	test('the transit wheel localizes both rings, the table and the readings', async () => {
		document.documentElement.lang = 'es-AR';
		const body = (
			name: string,
			nameLocalized: string,
			sign: string,
			signLocalized: string,
			longitude: number,
		) => ({
			name,
			nameLocalized,
			longitude,
			latitude: 0,
			sign,
			signLocalized,
			degree: 15.5,
			house: 1,
			speed: 1,
			isRetrograde: false,
		});
		const el = document.createElement('roxy-transit-wheel');
		(el as unknown as { data: unknown }).data = {
			transitDate: '2026-05-11 12:00:00',
			houseSystem: 'placidus',
			natalPlanets: [
				body('Sun', 'Sol', 'Pisces', 'Piscis', 345.5),
				body('Mars', 'Marte', 'Cancer', 'Cáncer', 105.5),
			],
			transitPlanets: [
				body('Sun', 'Sol', 'Cancer', 'Cáncer', 105.5),
				body('Mars', 'Marte', 'Pisces', 'Piscis', 345.5),
			],
			aspects: [
				{
					planet1: 'Mars',
					planet1Localized: 'Marte',
					planet2: 'Sun',
					planet2Localized: 'Sol',
					type: 'TRINE',
					typeLocalized: 'Trígono',
					orb: 1.2,
					strength: 90,
					isApplying: true,
					transitInterpretation: { summary: 'Lectura de tránsito' },
				},
			],
			summary: {
				total: 1,
				harmonious: 1,
				challenging: 0,
				neutral: 0,
				byType: { TRINE: 1 },
				strongest: {
					planet1: 'Mars',
					planet1Localized: 'Marte',
					planet2: 'Sun',
					planet2Localized: 'Sol',
					type: 'TRINE',
					typeLocalized: 'Trígono',
					orb: 1.2,
					strength: 90,
					isApplying: true,
					interpretation: 'harmonious',
				},
			},
		};
		document.body.appendChild(el);
		await settled(el);
		const rendered = text(el);

		expect(rendered).toContain('Sol');
		expect(rendered).toContain('Marte');
		expect(rendered).toContain('Piscis');
		expect(rendered).toContain('Cáncer');
		expect(rendered).toContain('Trígono');
		expect(rendered).not.toContain('Sun');
		expect(rendered).not.toContain('Mars');
		expect(rendered).not.toContain('Pisces');
		// Both rings, the strongest contact, the positions-table row header and its
		// sign glyph: each site asserted where it draws, so one of them regressing
		// cannot hide behind the other four.
		const root = shadow(el);
		expect(glyphsAt(root, '.natal-glyph').sort()).toEqual(['☉', '♂']);
		expect(glyphsAt(root, '.transit-glyph').sort()).toEqual(['☉', '♂']);
		expect(glyphsAt(root, '.strongest .glyph')).toEqual(['♂', '☉']);
		expect(root.querySelector('tbody th .glyph')?.textContent?.trim()).toBe(
			'☉',
		);
		expect(root.querySelector('tbody td')?.textContent).toContain('♓');
		expect(markup(el)).toContain('aspect aspect-trine');
		// `byType` is an object KEYED by the canonical name, so the response carries
		// no localized partner for those pills and they stay English by necessity.
		expect(rendered).toContain('Trine');
		el.remove();
	});
});

/**
 * Human Design, the second domain to serve both halves, and the one where the change was a REPAIR rather than a feature.
 *
 * @remarks
 * All eleven Human Design operations keep their machine identifiers English and echo the display copy beside them. Two things depend on the components reading the right half: `PLANET_GLYPH` is keyed on the canonical English body, so a translated activation row prints the bare word where the glyph belongs if the lookup follows the display copy, and the bodygraph SVG paints its own centre names, so the chart and the accordion under it can name one centre two ways. These tests pin both.
 *
 * Asserted per SITE, never once per card: a body draws its glyph in the chart tooltip and in its activation row, and a centre name appears in the chart margin, in the colour legend and in its disclosure, so a single whole-card `toContain` is satisfied by any one of them (lesson 31).
 *
 * The vocabulary below is what `/human-design/bodygraph?lang=es` and `?lang=ru` return, captured live rather than invented, so a fixture cannot drift into asserting a translation the API does not serve.
 */
describe('the Human Design cards read the display half and key on the English one', () => {
	const CENTERS: ReadonlyArray<readonly [string, string, string, boolean]> = [
		['head', 'Head', 'Cabeza', false],
		['ajna', 'Ajna', 'Ajna', false],
		['throat', 'Throat', 'Garganta', false],
		['g', 'G Center', 'Centro G', true],
		['heart', 'Heart', 'Corazón', false],
		['sacral', 'Sacral', 'Sacral', true],
		['solar-plexus', 'Solar Plexus', 'Plexo Solar', false],
		['spleen', 'Spleen', 'Bazo', true],
		['root', 'Root', 'Raíz', true],
	];

	/** One bodygraph carrying BOTH halves of every field the card prints. */
	const HD_BOTH = {
		type: 'Generator',
		typeLocalized: 'Generador',
		typeDescription:
			'El aura envolvente responde a lo que la vida le presenta.',
		strategy: 'Wait to respond',
		strategyLocalized: 'Esperar para responder',
		strategyDescription: 'Esperar una senal externa antes de actuar.',
		authority: 'Sacral',
		authorityLocalized: 'Sacral',
		authorityDescription: 'La respuesta sacral llega en el momento.',
		definition: 'Single',
		definitionLocalized: 'Simple',
		definitionDescription: 'Todos los centros definidos forman una sola pieza.',
		aura: 'Abierta y envolvente.',
		signature: 'Satisfaction',
		signatureLocalized: 'Satisfacción',
		notSelf: 'Frustration',
		notSelfLocalized: 'Frustración',
		profile: '5/1',
		profileKeynotes: {
			personalityLine: 5,
			designLine: 1,
			personality: 'Hereje: una fuerza practica sobre la que otros proyectan.',
			design: 'Investigador: construye una base segura antes de actuar.',
		},
		profileDescription: 'Hereje sobre Investigador.',
		incarnationCross: {
			gates: [51, 57, 61, 62],
			angle: 'Left Angle',
			angleLocalized: 'Ángulo izquierdo',
			angleCode: 'LAX',
			// English in every language: the API localizes no part of this name.
			name: 'Left Angle Cross of the Clarion',
			description: 'El tema de vida de la cruz.',
		},
		sides: {
			personality: 'El lado consciente, impreso en negro.',
			design: 'El lado inconsciente, impreso en rojo.',
		},
		centers: CENTERS.map(([id, name, nameLocalized, defined]) => ({
			id,
			name,
			nameLocalized,
			defined,
			motor: id === 'sacral',
			awareness: id === 'spleen',
			theme: 'Tema del centro.',
			notSelfQuestion: 'Pregunta del no-ser.',
			biology: 'La glandula.',
			gates: [1, 2],
		})),
		channels: [
			{
				gateA: 5,
				gateB: 15,
				name: 'Rhythm',
				nameLocalized: 'Ritmo',
				circuit: 'Collective',
				circuitLocalized: 'Colectivo',
				centers: ['sacral', 'g'],
				description: 'Descripcion del canal.',
				circuitDescription: 'Descripcion del circuito.',
			},
		],
		gates: [
			{
				planet: 'Sun',
				planetLocalized: 'Sol',
				side: 'personality',
				gate: 51,
				line: 5,
				gateName: 'Mystery',
				gateNameLocalized: 'Misterio',
				gateDescription: 'Presion de cabeza por conocer.',
				lineMeaning: 'Significado de la linea.',
				planetDescription: 'La activacion dominante.',
				ichingHexagram: { number: 61, english: 'Inner Truth' },
			},
			{
				planet: 'Earth',
				planetLocalized: 'Tierra',
				side: 'design',
				gate: 57,
				line: 2,
				gateName: 'Intuition',
				gateNameLocalized: 'Intuición',
				gateDescription: 'La claridad del oido.',
				lineMeaning: 'Significado de la linea.',
				planetDescription: 'El equilibrio de la activacion solar.',
				ichingHexagram: { number: 57, english: 'The Gentle' },
			},
		],
	};

	/** The same chart as an ENGLISH response, which carries no localized field at all. */
	const HD_ENGLISH = JSON.parse(
		JSON.stringify(HD_BOTH, (key, value) =>
			key.endsWith('Localized') ? undefined : value,
		),
	);

	async function mount(
		tag: string,
		data: unknown,
		lang?: string,
	): Promise<Element> {
		if (lang) document.documentElement.lang = lang;
		const el = document.createElement(tag);
		(el as unknown as { data: unknown }).data = data;
		document.body.appendChild(el);
		await settled(el);
		return el;
	}

	const shadow = (el: Element): ShadowRoot =>
		(el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;

	const textsAt = (root: ShadowRoot, selector: string): string[] =>
		[...root.querySelectorAll(selector)].map((n) =>
			(n.textContent ?? '').trim(),
		);

	/** The nine names in the order the CHART paints them, which is the geometry order (crown down, Spleen before Sacral) rather than the order the response lists them in. */
	const chartOrder = (which: 1 | 2): string[] =>
		CENTER_GEOMETRY.map(
			(g) => CENTERS.find(([id]) => id === g.id)?.[which] ?? '',
		);

	/** What the chart calls each centre. The name lives in the shape's `<title>`, which reads `Name: State`, so the state word is trimmed off the end. */
	const chartCentreNames = (root: ShadowRoot): string[] =>
		textsAt(root, '.bg-center title').map((t) => t.replace(/: [^:]*$/, ''));

	test('the bodygraph prints the localized body, centre, channel and gate names', async () => {
		const el = await mount('roxy-bodygraph', HD_BOTH, 'es-AR');
		const rendered = text(el);
		expect(rendered).toContain('Generador');
		expect(rendered).toContain('Esperar para responder');
		expect(rendered).toContain('Simple');
		expect(rendered).toContain('Ángulo izquierdo');
		expect(rendered).toContain('Ritmo');
		expect(rendered).toContain('Colectivo');
		expect(rendered).toContain('Misterio');
		expect(rendered).toContain('Sol');
		// The English vocabulary is GONE from the reader's half.
		expect(rendered).not.toContain('Generator');
		expect(rendered).not.toContain('Wait to respond');
		expect(rendered).not.toContain('Rhythm');
		expect(rendered).not.toContain('Collective');
		expect(rendered).not.toContain('Mystery');
		expect(rendered).not.toContain('Intuition');
		el.remove();
	});

	test('and every glyph still resolves, because the lookup stayed on the English body', async () => {
		// The load-bearing assertion. `planetGlyph` is keyed on the canonical name,
		// so pointing it at `planetLocalized` draws a chart with no glyphs on it, in
		// Spanish only, which is exactly what keying on the canonical half prevents.
		const el = await mount('roxy-bodygraph', HD_BOTH, 'es-AR');
		const root = shadow(el);
		expect(textsAt(root, '.interp-card .glyph')).toEqual(['☉']);
		// Personality is the open tab, so the Earth row is behind the second one.
		const design = [...root.querySelectorAll('.roxy-tab')].find(
			(t) => t.id === 'hd-tab-design',
		) as HTMLElement | undefined;
		expect(design).toBeTruthy();
		design?.click();
		await settled(el);
		expect(textsAt(shadow(el), '.interp-card .glyph')).toEqual(['♁']);
		// The row behind the second tab is not in the DOM until it is clicked, so
		// its half of the vocabulary can only be asserted here (lesson 11).
		expect(text(el)).toContain('Tierra');
		expect(text(el)).not.toContain('Earth');
		// The chart tooltip pairs the glyph with the localized gate name.
		const gateTitle = [
			...shadow(el).querySelectorAll('.bg-gate-node title'),
		].map((n) => n.textContent ?? '');
		expect(
			gateTitle.some((t) => t.includes('Misterio') && t.includes('☉')),
		).toBe(true);
		el.remove();
	});

	test('the chart, the colour legend and the accordion name a centre the same way', async () => {
		// The SVG paints its own text, so a centre can be named two ways on one card.
		// Asserted at all three sites; the chart's is each shape's accessible name.
		const el = await mount('roxy-bodygraph', HD_BOTH, 'es-AR');
		const root = shadow(el);
		expect(chartCentreNames(root)).toEqual(chartOrder(2));
		expect(textsAt(root, '.legend span')).toContain('Cabeza, Centro G');
		expect(textsAt(root, '.legend span')).toContain(
			'Garganta, Bazo, Plexo Solar, Raíz',
		);
		expect(textsAt(root, 'details[name="hd-center"] .interp-lead')).toEqual(
			CENTERS.map(([, , localized]) => localized),
		);
		// The FILL still keys on `id`, which is the machine value and identical in
		// every language: four centres come back defined and four shapes are filled.
		expect(root.querySelectorAll('.bg-center.defined').length).toBe(4);
		el.remove();
	});

	// The chart paints no centre name, so no translated name can overrun it and there
	// is nothing to fit here. A translated name's width is the card's problem, which
	// `layout.e2e.ts` measures for every component.

	test('an English bodygraph, which carries no localized field, is unchanged', async () => {
		const el = await mount('roxy-bodygraph', HD_ENGLISH);
		const root = shadow(el);
		const rendered = text(el);
		expect(rendered).toContain('Generator');
		expect(rendered).toContain('Rhythm');
		expect(rendered).toContain('Mystery');
		expect(chartCentreNames(root)).toEqual(chartOrder(1));
		expect(textsAt(root, '.interp-card .glyph')).toEqual(['☉']);
		// The one name the API never localizes prints as sent in both languages.
		expect(rendered).toContain('Left Angle Cross of the Clarion');
		el.remove();
	});

	test('the type card reads the same identity vocabulary as the bodygraph', async () => {
		const el = await mount('roxy-hd-type-card', HD_BOTH, 'es-AR');
		const rendered = text(el);
		expect(rendered).toContain('Generador');
		expect(rendered).toContain('Satisfacción');
		expect(rendered).toContain('Frustración');
		expect(rendered).not.toContain('Generator');
		expect(rendered).not.toContain('Satisfaction');
		el.remove();
	});

	test('the variables card localizes all seven arrow fields and still sorts by quadrant', async () => {
		// The sort is `quadrantOrder(position)` on the CANONICAL position, so a
		// switch to `positionLocalized` sends every arrow to the unknown bucket and
		// the grid falls back to response order. The fixture is deliberately out of
		// order so that failure is visible.
		const arrow = (
			name: string,
			nameLocalized: string,
			layer: string,
			layerLocalized: string,
			position: string,
			positionLocalized: string,
		) => ({
			name,
			nameLocalized,
			layer,
			layerLocalized,
			position,
			positionLocalized,
			direction: 'right',
			directionLabel: 'Passive',
			directionLabelLocalized: 'Pasivo',
			color: 4,
			colorLabel: 'Touch',
			colorLabelLocalized: 'Tacto',
			tone: 5,
			base: 1,
			baseName: 'Reactive',
			baseNameLocalized: 'Reactivo',
			description: 'Lectura de la flecha.',
			colorMeaning: 'Significado del color.',
			activation: { planet: 'Sun', side: 'design' },
		});
		const el = await mount(
			'roxy-hd-variables',
			{
				confident: true,
				arrows: [
					arrow(
						'Perspective',
						'Perspectiva',
						'Rave Psychology',
						'Psicología Rave',
						'Bottom right',
						'Inferior derecha',
					),
					arrow(
						'Determination',
						'Determinación',
						'Primary Health System',
						'Sistema de Salud Primaria',
						'Top left',
						'Superior izquierda',
					),
				],
			},
			'es-AR',
		);
		const root = shadow(el);
		expect(textsAt(root, '.arrow .name')).toEqual([
			'Determinación',
			'Perspectiva',
		]);
		const rendered = text(el);
		expect(rendered).toContain('Pasivo');
		expect(rendered).toContain('Tacto');
		expect(rendered).toContain('Reactivo');
		expect(rendered).toContain('Inferior derecha');
		expect(rendered).toContain('Psicología Rave');
		expect(rendered).not.toContain('Determination');
		expect(rendered).not.toContain('Bottom right');
		expect(rendered).not.toContain('Touch');
		el.remove();
	});

	/**
	 * The generic half of the same change, and the one nobody deploys to see.
	 *
	 * @remarks
	 * `<roxy-reference-card>` builds its whole output from `Object.entries`, so the day `/human-design/gates/{number}` began echoing `nameLocalized` beside `name` it started drawing the same fact twice under two English headings, on a page whose owner changed nothing. That is `<roxy-data>`'s regression in the second generic renderer (lesson 31), and the fold repairs it at every level that reads a key, including one object inside an array.
	 */
	test('the reference card folds the localized twin instead of printing both', async () => {
		const el = await mount(
			'roxy-reference-card',
			{
				name: 'Head',
				nameLocalized: 'Cabeza',
				centerName: 'Head',
				centerNameLocalized: 'Cabeza',
				channelPartners: [
					{ gate: 12, channel: 'Openness', channelLocalized: 'Apertura' },
				],
			},
			'es-AR',
		);
		const rendered = text(el);
		expect(rendered).toContain('Cabeza');
		expect(rendered).toContain('Apertura');
		expect(rendered).not.toContain('Head');
		expect(rendered).not.toContain('Openness');
		// The duplicate heading the fold exists to remove.
		expect(rendered).not.toContain('Name Localized');
		expect(rendered).not.toContain('Center Name Localized');
		el.remove();
	});

	/**
	 * The rule that keeps the two halves of this feature from separating again.
	 *
	 * @remarks
	 * A component that prints `nameLocalized` under headings it never translated renders translated data under English chrome, which reads worse than consistent English. That is a judgement no type can carry, so it is a source scan: reading `utils/localized.js` obliges a component to translate ALL of its own words, not merely one of them. It is why `roxy-hd-connection` and `roxy-hd-penta` are untouched, and why touching them means translating their chrome in the same change.
	 */
	test('a component reading the localized vocabulary leaves no English behind', async () => {
		const base = 'packages/ui/src/components';
		const readers: string[] = [];
		const offenders: string[] = [];
		for (const file of await readdir(base)) {
			if (!file.endsWith('.ts') || file.endsWith('.test.ts')) continue;
			const src = await Bun.file(`${base}/${file}`).text();
			if (!src.includes('utils/localized.js')) continue;
			readers.push(file);
			const left = visibleLiterals(src);
			if (left.length) offenders.push(`${file}: ${left.join(' | ')}`);
		}
		// Not vacuous: components do read the vocabulary, and every one is held to zero.
		expect(readers.length).toBeGreaterThan(5);
		expect(
			offenders,
			`These read the API display vocabulary and still write English of their own, so a translated page renders localized values under English chrome:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});
});

/**
 * The FORM path, which had no i18n at all until this landed and no test pressure either.
 *
 * @remarks
 * Both widgets extended `LitElement` directly, so neither had a `t()` to call and neither re-rendered when a deferred catalogue arrived. Every widget that needs birth data mounts one of them, so a Spanish visitor filled an English form and only then reached a translated card. The drift guard above could not see it: it fails on a `t()` literal with no catalogue entry, and zero `t()` calls means zero findings.
 *
 * So the guard here is inverted. It reads the two form-path sources and fails on a user-visible string that is NOT translated, which is the failure this feature actually has. Sabotage-verified: restoring any one of the removed literals turns it red on its own.
 */
describe('the form path writes no untranslated words', () => {
	/** The files whose visible copy must be translated. A file joins this list by having its strings catalogued, never by being exempted from it. */
	const FORM_PATH = [
		'packages/ui/src/components/endpoint-form.ts',
		'packages/ui/src/components/location-search.ts',
	];

	test('the scan can see a literal at all', () => {
		// Not vacuous: both assertions below are empty-array checks, which pass just
		// as well when the scanner finds nothing. This is the sabotage case inline,
		// and it stands for the library-wide ratchet too: one detector, two readers.
		const sample = `render() { return html\`<p title="Hi there">Retry \${this.x} \${[1].map((n) => html\`<b>Hidden word</b>\`)}</p>\`; }`;
		// A nested template closes before its parent, so it is collected first. Both
		// guards read the whole set, so only membership matters.
		expect(visibleLiterals(sample).sort()).toEqual([
			'Hi there',
			'Hidden word',
			'Retry',
		]);
		// And a translated one is invisible, which is what makes the ratchet a
		// measure of untranslated copy rather than of copy.
		const translated = `html\`<p title=\${this.t('Hi there')}>\${this.t('Retry')}</p>\``;
		expect(visibleLiterals(translated)).toEqual([]);
	});

	/**
	 * The two form-path files are held at ZERO by name, on top of the library-wide ratchet.
	 *
	 * That is not a duplicate assertion: the ratchet's zero is the ABSENCE of a budget row, so a future agent could buy one of these files a budget and the ratchet would take it. This list cannot be bought off, and its failure reads as "the form is half translated" rather than as a number moving.
	 */
	test('no user-visible literal survives in a form-path template', async () => {
		const offenders: string[] = [];
		for (const path of FORM_PATH)
			for (const literal of visibleLiterals(await Bun.file(path).text()))
				offenders.push(`${path}: ${literal}`);
		expect(
			offenders,
			`Hardcoded copy in the form path. Wrap it in this.t(...) and add the English source to src/i18n/chrome-strings.ts and every src/locales/*.ts:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});

	/**
	 * The four submit verbs, which no literal scan can see.
	 *
	 * @remarks
	 * `deriveSubmitLabel` RETURNS the English verb and the form translates the result, because `utils/field-schema.ts` is request-context-free and has no element to resolve a page language from. So the coverage question is not "is this string wrapped" but "does every verb this function can produce have a catalogue entry", and the honest way to ask it is to run the function over the committed spec rather than to restate the four words here.
	 */
	test('every submit verb the spec can produce is a catalogue entry', async () => {
		const spec = (await Bun.file('specs/openapi.json').json()) as {
			paths: Record<string, unknown>;
		};
		const endpoints = Object.keys(spec.paths);
		expect(endpoints.length).toBeGreaterThan(100);
		const verbs = new Set(endpoints.map((p) => deriveSubmitLabel(p)));
		// Not vacuous: the spec has to exercise more than one branch of the map.
		expect(verbs.size).toBeGreaterThan(1);
		const missing = [...verbs].filter(
			(v) => !CHROME_STRINGS.includes(v as never),
		);
		expect(
			missing,
			`deriveSubmitLabel can return these and no catalogue carries them:\n  ${missing.join('\n  ')}`,
		).toEqual([]);
	});

	/**
	 * The group names, which no literal scan can see either, and which the SPEC decides.
	 *
	 * @remarks
	 * Interpolating a raw `humanize()` of the wire name into `{{group}}` gives a Portuguese form reading `Local de Natal Chart`. The set is closed, so it is catalogued, but "closed" is a fact about the spec rather than about this library: a tenth object-valued property or a new `xLatitude`/`xLongitude` prefix adds a group name with no catalogue entry, and the form would print it in English on seven translated sites. Deriving the list here rather than restating it is what makes that a red test instead of a live surprise.
	 */
	test('every group name the spec can produce is carried by all seven catalogues', async () => {
		const doc = (await Bun.file('specs/openapi.json').json()) as SpecDoc;
		const schemas = doc.components?.schemas ?? {};
		const names = new Set<string>();
		for (const [path, item] of Object.entries(doc.paths)) {
			for (const [method, op] of Object.entries(item)) {
				if (!['get', 'post', 'put', 'patch'].includes(method)) continue;
				for (const f of buildFormModel(op, schemas, path).fields)
					if (f.group) names.add(humanize(f.group));
			}
		}
		// Not vacuous, and pinned to BOTH shapes a group can come from: an
		// object-valued body property (`person1`) and a coordinate name PREFIX
		// (`birthLatitude`), which is the relocation form and is the one a
		// nesting-only derivation would have missed.
		expect(names.size).toBeGreaterThanOrEqual(9);
		expect([...names]).toContain('Person 1');
		expect([...names]).toContain('Birth');

		const gaps: string[] = [];
		for (const [lang, catalog] of await shippedCatalogues()) {
			// Folded, because the catalogue key is `lookupKey` of the English source and
			// `Natal Chart` is answered by the `Natal chart` heading it folds onto.
			const covered = new Set(Object.keys(catalog).map(lookupKey));
			for (const name of names)
				if (!covered.has(lookupKey(name)))
					gaps.push(`${lang}.ts has no word for the ${name} group`);
		}
		expect(gaps, gaps.join('\n  ')).toEqual([]);
	});

	/**
	 * The case fold, which is the whole reason `Natal Chart` is not an entry.
	 *
	 * @remarks
	 * `humanize('natalChart')` capitalises the C and the card heading does not, so the two differ only by case. That is ONE runtime key: the group reads the heading's translation for free, and adding the capitalized twin would not read as a duplicate in review, it would overwrite the heading in every catalogue. The parity test above passes either way, so this is what pins the decision.
	 */
	test('the natalChart group reuses the card heading, never a second entry', async () => {
		expect(CHROME_STRINGS).not.toContain('Natal Chart' as never);
		for (const [lang, catalog] of await shippedCatalogues()) {
			const heading = catalog['Natal chart'] as string;
			expect(translate(lang, 'Natal Chart'), `${lang}.ts`).toBe(heading);
			expect(
				translate(lang, 'Natal Chart'),
				`${lang}.ts fell through to English`,
			).not.toBe('Natal Chart');
		}
	});

	/**
	 * Key parity for the form path specifically, derived from the sources rather than restated.
	 *
	 * @remarks
	 * The catalogue-wide parity test above already fails on ANY key a locale is short of. This one names the form path, so a failure reads as "the form is half translated in Turkish" instead of "tr.ts is out of step", and it covers the strings that reach a reader with no `t('literal')` call site at all: the four submit verbs and the refusal message the key guard owns.
	 */
	test('every form-path string is carried by all seven catalogues', async () => {
		// `\s*` after the paren, because the formatter puts a long string on its own
		// line and a pattern anchored to the quote silently skips every one of those.
		const CALL = /\bt\(\s*'((?:[^'\\]|\\.)*)'/g;
		// Seeded, not scanned, because these three reach a reader without a `t('literal')` call site the
		// regex could find: the refusal message the key guard owns, the submit verbs `deriveSubmitLabel`
		// returns, and `Search city`, which is a `@property` DEFAULT translated at render as
		// `t(this.placeholder)` so a caller-supplied placeholder still prints as given.
		const keys = new Set<string>([KEY_REFUSED_MESSAGE, 'Search city']);
		for (const path of FORM_PATH) {
			const src = code(await Bun.file(path).text());
			for (const m of src.matchAll(CALL))
				keys.add((m[1] as string).replace(/\\'/g, "'"));
		}
		for (const verb of ['Compare', 'Cast', 'Get reading', 'Generate'])
			keys.add(verb);
		// The measured surface was 21 distinct literals; the guard is that it has not
		// quietly shrunk back.
		expect(keys.size).toBeGreaterThanOrEqual(21);

		const gaps: string[] = [];
		for (const [lang, catalog] of await shippedCatalogues()) {
			for (const key of keys) {
				if (!(key in catalog)) gaps.push(`${lang}.ts is missing: ${key}`);
			}
		}
		expect(gaps, gaps.join('\n  ')).toEqual([]);
	});
});

/**
 * The form path on a real render, because a source scan cannot prove the language reaches the element.
 *
 * @remarks
 * A synthetic catalogue rather than the shipped Spanish one, so these assertions pin the MECHANISM and never a translator's wording: the shipped catalogues are already checked for parity, register and script above, and a sourced rewording there must not turn this red. The one exception is the last test, which is the end-to-end proof that a shipped payload reaches a form.
 */
describe('a mounted form renders in the page language', () => {
	/** One operation carrying every branch the form can draw: a suppressed coordinate trio, a required input, an optional select and an optional array. */
	const MODEL = {
		title: 'Natal chart',
		hasLang: true,
		fields: [
			{ key: 'latitude', name: 'latitude', kind: 'number', required: true },
			{ key: 'longitude', name: 'longitude', kind: 'number', required: true },
			{ key: 'timezone', name: 'timezone', kind: 'text', required: true },
			{ key: 'birthDate', name: 'birthDate', kind: 'date', required: true },
			{
				key: 'houseSystem',
				name: 'houseSystem',
				kind: 'select',
				required: false,
				enum: ['placidus', 'koch'],
			},
			{ key: 'planets', name: 'planets', kind: 'array', required: false },
		],
	};

	/** Every form-path key this form can render, mapped to a sentinel no source string could be mistaken for. */
	const SENTINEL: Record<string, string> = {
		'Birth location': 'LOC',
		'City of birth': 'CITY',
		'Fills {{fields}}. Pick a city to autofill.': 'FILLS {{fields}}',
		Choose: 'PICK',
		'Comma separated': 'COMMAS',
		Advanced: 'MORE',
		'Please complete:': 'MISSING:',
		Generate: 'GO',
		'Search city': 'FINDCITY',
		'No cities found': 'NOCITIES',
		Retry: 'AGAIN',
		'{{group}} location': 'AT {{group}}',
		'{{group}} city': 'IN {{group}}',
		'Person 1': 'P1',
		'Schema load failed: {{message}}': 'BROKEN {{message}}',
		'HTTP error {{status}}': 'STATUS {{status}}',
	};

	/**
	 * The grouped shape, which is where a group name has somewhere to render: a fieldset legend, a location label and a city placeholder, three sites per group.
	 *
	 * `natalChart` is here to prove the case fold end to end against a SHIPPED catalogue, and `mysteryBlock` is the tenth group the spec does not have yet, which must degrade to its humanized English rather than to a blank or a key.
	 */
	const GROUPED = {
		title: 'Synastry',
		hasLang: true,
		fields: [
			...['person1', 'natalChart', 'mysteryBlock'].flatMap((group) => [
				{
					key: `${group}.latitude`,
					name: 'latitude',
					group,
					kind: 'number',
					required: true,
				},
				{
					key: `${group}.longitude`,
					name: 'longitude',
					group,
					kind: 'number',
					required: true,
				},
			]),
		],
	};

	const originalFetch = globalThis.fetch;

	async function mountForm(model: unknown = MODEL): Promise<Element> {
		globalThis.fetch = mock(async (url: string | URL) =>
			String(url).includes('/schemas/')
				? { ok: true, status: 200, json: async () => model }
				: { ok: false, status: 404, json: async () => ({}) },
		) as unknown as typeof fetch;
		const el = document.createElement('roxy-endpoint-form');
		el.setAttribute('data-endpoint', 'astrology/natal-chart');
		document.body.appendChild(el);
		// Drain the async schema load and the re-renders it triggers.
		for (let i = 0; i < 6; i++) {
			await settled(el);
			await new Promise((r) => setTimeout(r, 0));
		}
		return el;
	}

	beforeEach(() => {
		registerLocale('zz', SENTINEL);
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	test('every word the form writes comes from the catalogue', async () => {
		document.documentElement.lang = 'zz';
		const el = await mountForm();
		const root = (el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;
		const rendered = text(el);
		expect(rendered).toContain('LOC');
		expect(rendered).toContain('FILLS latitude, longitude, timezone');
		expect(rendered).toContain('MORE');
		expect(rendered).toContain('GO');
		expect(root.querySelector('option')?.textContent?.trim()).toBe('PICK');
		expect(
			root.querySelector('input[type="text"]')?.getAttribute('placeholder'),
		).toBe('COMMAS');
		// The English sources are GONE, not merely joined by the sentinels.
		expect(rendered).not.toContain('Birth location');
		expect(rendered).not.toContain('Advanced');
		expect(rendered).not.toContain('Generate');
		// And the spec-derived half is untouched, which is the documented boundary:
		// a field label is `humanize()` over a wire name and no catalogue reaches it.
		expect(rendered).toContain('Birth Date');
		el.remove();
	});

	test('the validation banner translates its lead-in and names the location once', async () => {
		document.documentElement.lang = 'zz';
		const el = await mountForm();
		const root = (el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;
		root.querySelector('form')?.dispatchEvent(new Event('submit'));
		await settled(el);
		const alert = root.querySelector('.validation-error')?.textContent ?? '';
		expect(alert).toContain('MISSING:');
		expect(alert).toContain('LOC');
		expect(alert).not.toContain('Please complete');
		el.remove();
	});

	/**
	 * The trap that would have made the catalogue look broken. The city search sits INSIDE the form shadow root, and `closest('[lang]')` stops at a shadow boundary, so it reads nothing from the page unless the form hands it the tag.
	 */
	test('the city search inside it is localized too, through the forwarded lang', async () => {
		document.documentElement.lang = 'zz';
		const el = await mountForm();
		const root = (el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;
		const search = root.querySelector('roxy-location-search');
		expect(search).not.toBeNull();
		await settled(search as Element);
		const input = (
			search as unknown as { shadowRoot: ShadowRoot }
		).shadowRoot.querySelector('input');
		expect(input?.getAttribute('placeholder')).toBe('CITY');
		el.remove();
	});

	test('a standalone city search reads its own placeholder, and a caller one is left alone', async () => {
		document.documentElement.lang = 'zz';
		const el = document.createElement('roxy-location-search');
		document.body.appendChild(el);
		await settled(el);
		const root = (el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;
		expect(root.querySelector('input')?.getAttribute('placeholder')).toBe(
			'FINDCITY',
		);
		// A caller-supplied placeholder is theirs: a catalogue miss returns it
		// unchanged rather than blanking it or rendering a key.
		el.setAttribute('placeholder', 'Where were you born');
		await settled(el);
		expect(root.querySelector('input')?.getAttribute('placeholder')).toBe(
			'Where were you born',
		);
		el.remove();
	});

	test('the schema-load failure and its retry button translate, and the event does not', async () => {
		document.documentElement.lang = 'zz';
		globalThis.fetch = mock(async () => ({
			ok: false,
			status: 404,
			json: async () => ({}),
		})) as unknown as typeof fetch;
		const el = document.createElement('roxy-endpoint-form');
		el.setAttribute('data-endpoint', 'astrology/natal-chart');
		let detail: { message?: string } | null = null;
		el.addEventListener('roxy-spec-error', (e) => {
			detail = (e as CustomEvent).detail as { message?: string };
		});
		document.body.appendChild(el);
		for (let i = 0; i < 6; i++) {
			await settled(el);
			await new Promise((r) => setTimeout(r, 0));
		}
		const rendered = text(el);
		expect(rendered).toContain('BROKEN');
		expect(rendered).toContain('STATUS 404');
		expect(rendered).toContain('AGAIN');
		expect(rendered).not.toContain('Schema load failed');
		// The EVENT keeps the canonical English: a listener is code, and a developer
		// console is not a localized surface.
		expect((detail as unknown as { message: string }).message).toBe('HTTP 404');
		el.remove();
	});

	test('a refused key is refused in the page language', async () => {
		document.documentElement.lang = 'zz';
		registerLocale('zz', { ...SENTINEL, [KEY_REFUSED_MESSAGE]: 'BADKEY' });
		const el = document.createElement('roxy-location-search');
		el.setAttribute('publishable-key', 'sk_live_not_publishable');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('BADKEY');
		el.remove();
	});

	test('a catalogue that lands after the form mounted still re-renders it', async () => {
		// Why both widgets needed a LocaleController and not just a t(): a host page
		// loads the payload as its own script tag, so it can arrive after first
		// paint, and nothing a site owner can do would fix an element that painted
		// English and stopped.
		document.documentElement.lang = 'late';
		const el = await mountForm();
		expect(text(el)).toContain('Generate');
		registerLocale('late', SENTINEL);
		await settled(el);
		expect(text(el)).toContain('GO');
		el.remove();
	});

	/**
	 * The group name in all three of its render sites, which is the half `{{group}}` left in English.
	 */
	test('a group names its fieldset, its location label and its city box', async () => {
		document.documentElement.lang = 'zz';
		const el = await mountForm(GROUPED);
		const root = (el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;
		const legends = [...root.querySelectorAll('legend')].map((l) =>
			l.textContent?.trim(),
		);
		expect(legends).toContain('P1');
		expect(legends).not.toContain('Person 1');
		expect(text(el)).toContain('AT P1');
		const placeholders = [...root.querySelectorAll('roxy-location-search')].map(
			(s) => s.getAttribute('placeholder'),
		);
		expect(placeholders).toContain('IN P1');
		el.remove();
	});

	test('a group the catalogue has no word for degrades to its English name', async () => {
		// The set is closed TODAY. A tenth group must render as readable English
		// rather than as a blank legend or a raw `mysteryBlock`, because the spec can
		// grow one between a release of this library and the next.
		document.documentElement.lang = 'zz';
		const el = await mountForm(GROUPED);
		const rendered = text(el);
		expect(rendered).toContain('Mystery Block');
		expect(rendered).toContain('AT Mystery Block');
		expect(rendered).not.toContain('mysteryBlock');
		el.remove();
	});

	test('the natalChart group prints the shipped heading, capital C and all', async () => {
		// End to end against the real Spanish payload: `humanize` produces
		// `Natal Chart`, the catalogue carries `Natal chart`, and the fold is what
		// makes the group read `Carta natal` instead of quietly staying English.
		document.documentElement.lang = 'es-AR';
		const el = await mountForm(GROUPED);
		const rendered = text(el);
		expect(rendered).toContain(es['Natal chart']);
		expect(rendered).not.toContain('Natal Chart');
		el.remove();
	});

	test('the shipped Spanish catalogue reaches a real form', async () => {
		// End to end, and the only assertion here that reads a translator decision:
		// <html lang> to resolveLang to the catalogue to a rendered button.
		document.documentElement.lang = 'es-AR';
		const el = await mountForm();
		const rendered = text(el);
		expect(rendered).toContain(es['Birth location']);
		expect(rendered).toContain(es.Generate);
		expect(rendered).not.toContain('Birth location');
		expect(rendered).not.toContain('Generate');
		el.remove();
	});
});
