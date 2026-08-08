import { beforeEach, describe, expect, test } from 'bun:test';

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
		const IDENTICAL_BY_DESIGN: Record<string, string[]> = {
			// `Neutral` is the German word too; `Total` is `Gesamt`. German takes
			// `Radix` for the natal ring label, so it is NOT on this list.
			de: ['Neutral'],
			// `Natal` is a Spanish word (`carta natal`, `planetas natales`), not an
			// untranslated fallthrough. Same in French, Portuguese and Turkish, where
			// it is the naturalised modifier a chart writes in front of a body.
			es: ['Total', 'Natal'],
			// French borrows `apex` for the focal planet of a figure, and `aspects`
			// and `transits` are spelled the same; the German pair is a false friend
			// and is NOT.
			fr: ['Total', 'apex', '{{count}} aspects', 'Transits', 'Natal'],
			hi: [],
			pt: ['Total', 'Natal'],
			ru: [],
			// Turkish astrology borrows `orb`, `apex` and `natal` unchanged; `Total`
			// is `Toplam`.
			tr: ['orb', 'apex', 'Natal'],
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
			dominantModalityLocalized: 'Fijo',
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
		expect(rendered).toContain('Fijo');
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

	test('the element and modality headers stay English, which the response forces', async () => {
		// The API localizes the DOMINANT element and modality and nothing else, so
		// the cross-tab has a translation for one row and one column out of seven.
		// Two Spanish headers among five English ones reads as a bug; the tint is
		// what ties the localized pill to its cell. Pinned so it stays a decision.
		const el = await mountNatal(NATAL_BOTH, 'es-AR');
		const rendered = text(el);
		for (const header of ['Fire', 'Earth', 'Air', 'Water', 'Car', 'Fix', 'Mut'])
			expect(rendered).toContain(header);
		el.remove();
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

		const heads = [...root.querySelectorAll('th[title]')];
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
