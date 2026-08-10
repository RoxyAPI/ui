import { afterEach, beforeEach, describe, expect, test } from 'bun:test';

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
import { CENTER_GEOMETRY } from '../src/utils/bodygraph-render.js';
import { lookupKey } from '../src/utils/string.js';
// Side effect: registers the Spanish catalogue for the translate() assertions
// below. The per-catalogue tests load every locale from the directory instead.
import '../src/locales/es.js';

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
		const IDENTICAL_BY_DESIGN: Record<string, string[]> = {
			// `Neutral` is the German word too; `Total` is `Gesamt`. German takes
			// `Radix` for the natal ring label, so it is NOT on this list. `Fix` is
			// the full German quality, which is why the abbreviation needs none.
			// `Definition`, `Aura`, `Design` and `Motor` are the German Human Design
			// terms as the German schools print them (`Motorenzentren`,
			// `Persönlichkeitsseite`/`Designseite`); `Bodygraph` is the loanword the
			// API's own German prose uses sixteen times inside this same card, which
			// is why `Körpergrafik` was passed over.
			de: [
				'Aura',
				'Bodygraph',
				'Definition',
				'Design',
				'Fix',
				'Motor',
				'Neutral',
			],
			// `Natal` is a Spanish word (`carta natal`, `planetas natales`), not an
			// untranslated fallthrough. Same in French, Portuguese and Turkish, where
			// it is the naturalised modifier a chart writes in front of a body.
			// `Cardinal`, `Mutable` and `Mut` are Spanish words that coincide with
			// the English; `No` is the same word in both. `Aura`, `Motor`, `Color`,
			// `Base` and `Variables` are the Spanish Human Design words, and
			// `Bodygraph` is the loanword the API's Spanish prose prints.
			es: [
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
				'Activations ({{count}})',
				'Air',
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
			],
			hi: [],
			// The three Portuguese abbreviations truncate `Cardinal`, `Fixo` and
			// `Mutável` at three characters, which lands on the English set;
			// `Cardinal` is the full Portuguese word. `Aura`, `Bodygraph` and `Motor`
			// are what Brazilian Human Design writing prints (`Centro Motor`), `Base`
			// is the cognate for the PHS layer, and `Design` is the chart side, which
			// Brazilian usage keeps English precisely to hold it apart from
			// `Desenho`.
			pt: [
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
			],
			ru: [],
			// Turkish astrology borrows `orb`, `apex` and `natal` unchanged; `Total`
			// is `Toplam`. Turkish Human Design borrows `Aura`, `Bodygraph` and
			// `Motor` the same way (`Motor merkezler`).
			tr: ['orb', 'apex', 'Natal', 'Aura', 'Bodygraph', 'Motor'],
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
		for (const [lang, catalog] of await shippedCatalogues()) {
			const script = SCRIPT[lang];
			if (!script) continue;
			const wrongScript = Object.entries(catalog)
				.filter(([, translated]) => !script.test(translated))
				.map(([source]) => source);
			expect(
				wrongScript,
				`${lang}.ts entries with no ${lang === 'hi' ? 'Devanagari' : 'Cyrillic'} character (transliterated, or left in English)`,
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
		const CALL = /\bt\('((?:[^'\\]|\\.)*)'/g;
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

	/** Every `.ts` under `src`, minus the generated types tree and this utility's own file. */
	async function sourceFiles(): Promise<string[]> {
		const base = 'packages/ui/src';
		const entries = await readdir(base, { recursive: true });
		return entries
			.filter((f) => f.endsWith('.ts') && !f.startsWith('types/'))
			.map((f) => `${base}/${f}`)
			.sort();
	}

	/** Source with block comments dropped and comment lines skipped, so prose naming a call is never mistaken for one. */
	function codeLines(src: string): Array<[number, string]> {
		return src
			.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
			.split('\n')
			.map((line, i) => [i + 1, line] as [number, string])
			.filter(([, line]) => {
				const t = line.trim();
				return !t.startsWith('//') && !t.startsWith('*');
			});
	}

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
		expect(text(el)).toContain('Sin datos de la carta');
	});

	test('the same component with no page language stays English', async () => {
		const el = document.createElement('roxy-natal-chart');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('No chart data');
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
		expect(text(el)).toContain('No chart data');
	});

	/**
	 * `<roxy-data>`, which shipped with ZERO `t()` calls while `docs/todo.md` and the main repo both recorded its chrome as done.
	 *
	 * @remarks
	 * It is the generic fallback every unbound endpoint renders through, so it is the component a Spanish site is most likely to be looking at, and it was the WORST case rather than a missing nicety: `foldLocalized` already runs inside its `suppress()` funnel, so it was printing `Sol` and `Piscis` under `Yes`, `No` and `31 rows` in English. Spanish values under English chrome is the state `docs/authoring.md` says is worse than all-English, and this component had been in it since the fold landed.
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
	 * The transit wheel, which is the second half of the practitioner card and shipped with ZERO `t()` calls while the natal chart beside it had 32. A Spanish agency selling a Spanish natal card over an English transit wheel is the exact half-translated state this whole feature exists to remove.
	 */
	test('the transit wheel reads Spanish from the page language alone', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-transit-wheel');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('Sin datos de tránsitos');
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
	 * The 4x3 grid is the component's own construction, so six of its seven headers have no field in the response to defer to and the seventh, the dominant pair, would have been the only translated word in the table. They were left English for that reason and a Spanish customer circled the grid and wrote TRANSLATE on it.
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
	 * Captured live from `/astrology/natal-chart?lang=` on 2026-08-09, one chart per dominant pair, plus `/astrology/signs?lang=` for the elements. A hardcoded table rather than a live call, for the reason the oracles cross into `gold-standard`: the NUMBERS travel, the dependency does not. Re-run those two endpoints if a value here is ever disputed.
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
 * All eleven Human Design operations stopped translating their machine identifiers in place on 2026-08-09 and began echoing the display copy beside them instead. That fixed two real defects here: `PLANET_GLYPH` is keyed on the canonical English body, so an activation row used to print the bare word where the glyph belongs on every translated page, and the bodygraph SVG paints its own centre labels, so the chart said `Head` while the accordion under it said `Cabeza`. It also left this card reading English vocabulary until the components were told which copy is which, which is what these tests pin.
 *
 * Asserted per SITE, never once per card: a body draws its glyph in the chart tooltip and in its activation row, and a centre name appears in the chart margin, in the colour legend and in its disclosure, so a single whole-card `toContain` is satisfied by any one of them (lesson 31).
 *
 * The vocabulary below is what `/human-design/bodygraph?lang=es` and `?lang=ru` returned on 2026-08-09, captured live rather than invented, so a fixture cannot drift into asserting a translation the API does not serve.
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
		// Spanish only, which is exactly the defect the API change repaired.
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
		const gateTitle = [...shadow(el).querySelectorAll('.bg-gate title')].map(
			(n) => n.textContent ?? '',
		);
		expect(
			gateTitle.some((t) => t.includes('Misterio') && t.includes('☉')),
		).toBe(true);
		el.remove();
	});

	test('the chart margin, the colour legend and the accordion name a centre the same way', async () => {
		// The defect that made this necessary: the SVG paints its own labels, so a
		// Spanish card read `Head` on the chart against `Cabeza` in the disclosure
		// directly below it. Asserted at all three sites.
		const el = await mount('roxy-bodygraph', HD_BOTH, 'es-AR');
		const root = shadow(el);
		expect(textsAt(root, '.bg-center-label')).toEqual(chartOrder(2));
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

	test('a centre name too long for the margin is compressed, never clipped', async () => {
		// `Солнечное сплетение` is what the API returns for ru, 19 characters against
		// the 12 of `Solar Plexus`, and the outermost `<svg>` clips at the viewport,
		// so an overrun reads as a truncated word and no layout gate can see it
		// (`layout.e2e.ts` skips every node inside an SVG).
		const long = {
			...HD_BOTH,
			centers: HD_BOTH.centers.map((c) =>
				c.id === 'solar-plexus'
					? { ...c, nameLocalized: 'Солнечное сплетение' }
					: c,
			),
		};
		const el = await mount('roxy-bodygraph', long, 'ru');
		const labels = [...shadow(el).querySelectorAll('.bg-center-label')];
		const squeezed = labels.filter((n) => n.hasAttribute('textLength'));
		expect(squeezed.map((n) => n.textContent?.trim())).toEqual([
			'Солнечное сплетение',
		]);
		expect(squeezed[0]?.getAttribute('lengthAdjust')).toBe('spacingAndGlyphs');
		el.remove();
	});

	test('an English bodygraph, which carries no localized field, is unchanged', async () => {
		const el = await mount('roxy-bodygraph', HD_ENGLISH);
		const root = shadow(el);
		const rendered = text(el);
		expect(rendered).toContain('Generator');
		expect(rendered).toContain('Rhythm');
		expect(rendered).toContain('Mystery');
		expect(textsAt(root, '.bg-center-label')).toEqual(chartOrder(1));
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
	 * A component that prints `nameLocalized` under headings it never translated renders Spanish data under English chrome, which `docs/authoring.md` calls worse than consistent English. That is a judgement no type can carry, so it is a source scan: reading `utils/localized.js` obliges a component to have chrome of its own. It is why `roxy-hd-connection` and `roxy-hd-penta` are untouched, and why touching them means translating their chrome in the same change.
	 */
	test('no component reads the localized vocabulary without chrome of its own', async () => {
		const base = 'packages/ui/src/components';
		const offenders: string[] = [];
		for (const file of await readdir(base)) {
			if (!file.endsWith('.ts') || file.endsWith('.test.ts')) continue;
			const src = await Bun.file(`${base}/${file}`).text();
			if (!src.includes('utils/localized.js')) continue;
			if (!/this\.t\(|this\.translator/.test(src)) offenders.push(file);
		}
		expect(
			offenders,
			`These read the API display vocabulary but translate none of their own words, so they render localized values under English headings:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});
});
