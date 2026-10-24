import { readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';

/**
 * The language path, end to end, in the one place it can actually be exercised.
 *
 * @remarks
 * Every other check on the catalogues is static: the unit suite proves each locale holds exactly the English key set, that nothing is left sitting as its source string, and that a component writes no words of its own. None of that proves the payload BUILDS, resolves, and reaches a mounted component, which is a chain of four separate things (a per-language bundle, a global registry, the page language, and a re-render on late arrival) and every one of them can break without a single unit test noticing.
 *
 * So this drives the same switch a host page makes: set the page language, load the one payload, and read what the components render. The showcase control is the subject rather than a fixture, so the demo everybody looks at is also the thing under test.
 */

/** A card whose heading differs from its English source in EVERY shipped language, so each case can assert the change without a per-language table. A Sanskrit-titled card is the wrong subject here: several catalogues print those names as themselves by design, and a heading that is legitimately unchanged is indistinguishable from a payload that never arrived. */
const SUBJECT = 'roxy-natal-chart';

/** The payloads the build emits, read from the directory the build reads, so a new language is covered without this file being edited. Checked against what the page actually offers, so the two cannot drift apart. */
const SHIPPED = readdirSync('packages/ui/src/locales', { withFileTypes: true })
	.filter((e) => e.isFile() && e.name.endsWith('.ts'))
	.map((e) => e.name.replace(/\.ts$/, ''))
	.sort();

const headingOf = (tag: string) =>
	document
		.querySelector(tag)
		?.shadowRoot?.querySelector('h2')
		?.textContent?.trim() ?? '';

test('the control offers exactly the payloads the build emitted', async ({
	page,
}) => {
	await page.goto('/');
	const shipped = await page.evaluate(
		() => (window as unknown as { ROXY_LOCALES?: string[] }).ROXY_LOCALES ?? [],
	);
	expect(shipped.length).toBeGreaterThan(0);

	const values = await page.$$eval('#lang-select option', (o) =>
		o.map((x) => (x as HTMLOptionElement).value),
	);
	// English first and always, then one option per shipped payload. A hardcoded
	// list would drift the moment a language is added; this cannot.
	expect(values).toEqual(['en', ...shipped]);
	// And the payloads on disk are the ones the page knows about, so the list the
	// case below walks cannot drift from the list the control offers.
	expect(shipped).toEqual(SHIPPED);

	// Every option is named in its OWN language, which is what a reader picks by.
	const labels = await page.$$eval('#lang-select option', (o) =>
		o.map((x) => x.textContent?.trim() ?? ''),
	);
	expect(labels.every((l) => l.length > 0)).toBe(true);
	expect(new Set(labels).size).toBe(labels.length);
});

test('switching the control translates what the components write', async ({
	page,
}) => {
	// Seven payload fetches on one page load, budgeted explicitly because the work
	// is real. A case per language would name the failure by itself, but it also
	// reloads the whole showcase seven times per browser for the same coverage, so
	// the language is carried in the assertion message instead.
	test.setTimeout(120_000);
	await page.goto('/');
	const english = await page.evaluate(headingOf, SUBJECT);
	expect(english.length).toBeGreaterThan(0);

	for (const lang of SHIPPED) {
		await page.selectOption('#lang-select', lang);
		await expect
			.poll(() => page.evaluate(() => document.documentElement.lang))
			.toBe(lang);
		// The payload is a separate request, so the render lands after it does, and
		// a heading still reading English means it never arrived.
		await expect
			.poll(() => page.evaluate(headingOf, SUBJECT), {
				// A fetch and a re-render, which under a loaded machine takes longer
				// than the 5s this would otherwise default to. It still fails fast on a
				// payload that never arrives, since that never resolves at all.
				timeout: 15_000,
				message: `the ${lang} payload never replaced the English heading`,
			})
			.not.toBe(english);
	}
});
test('English loads no payload, because the key is the English source', async ({
	page,
}) => {
	const requested: string[] = [];
	page.on('request', (r) => {
		if (r.url().includes('/locales/')) requested.push(r.url());
	});

	await page.goto('/');
	await page.selectOption('#lang-select', 'en');
	await expect
		.poll(() => page.evaluate(() => document.documentElement.lang))
		.toBe('en');
	expect(requested).toEqual([]);
});

/** The two Human Design group cards keep their doctrine in English until a practitioner pass can source it, an exception `i18n.test.ts` names and counts; their prose also reflows with the drawing, so no frozen list of it is stable. */
const ENGLISH_DOCTRINE = new Set(['hd-connection', 'hd-penta']);

/** Words that read the same in every language because they name something, never chrome. */
const PROPER_NOUNS = new Set(['roxyapi', 'nasa', 'jpl', 'horizons', 'utc']);

/**
 * Every visible word a component writes, its result and its form, in the page language.
 *
 * @remarks
 * Runs in the page. A fresh element is mounted per language, because a language change re-renders nothing by itself, and every tab and disclosure is opened so the scan reads the whole card (text behind a closed tab is not in the DOM). Attributes a reader meets (`aria-label`, `title`, `placeholder`, `alt`, the painted `data-label`) count as words too.
 */
async function wordsIn(
	page: import('@playwright/test').Page,
	tag: string,
	lang: string,
): Promise<{
	result: string[];
	form: string[];
	data: string[];
	attested: string[];
}> {
	return page.evaluate(
		async ({ tag, lang }) => {
			const w = window as unknown as {
				ROXY_ENDPOINT_BINDINGS: Record<
					string,
					Array<{ method: string; path: string }>
				>;
				__ROXY_UI_I18N__?: { catalogs: Record<string, unknown> };
			};
			if (lang !== 'en' && !w.__ROXY_UI_I18N__?.catalogs[lang]) {
				const s = document.createElement('script');
				s.src = `dist/cdn/locales/${lang}.js`;
				await new Promise((r) => {
					s.onload = r;
					document.head.append(s);
				});
			}
			document.documentElement.lang = lang;
			const source = document.querySelector(tag) as HTMLElement & {
				data: unknown;
			};
			const attrs = [...source.attributes].filter((a) => a.name !== 'id');
			const frame = () => new Promise((r) => requestAnimationFrame(r));
			// Every Lit element under the card has finished the render a click or a disclosure asked for.
			const settle = async (el: Element) => {
				for (let pass = 0; pass < 3; pass++) {
					await Promise.all(
						roots(el.shadowRoot as ShadowRoot).flatMap((r) =>
							[...r.querySelectorAll('*')].map(
								(e) =>
									(e as { updateComplete?: Promise<unknown> }).updateComplete,
							),
						),
					);
					await frame();
				}
				// A drawing that measures its own type redraws once more after layout.
				await new Promise((r) => setTimeout(r, 100));
			};
			const mount = (extra: Record<string, string>, data?: unknown) => {
				const el = document.createElement(tag) as HTMLElement & {
					data: unknown;
				};
				for (const a of attrs) el.setAttribute(a.name, a.value);
				for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
				if (data !== undefined) el.data = data;
				document.body.append(el);
				return el;
			};
			// Three shadow levels reach every nested card; the generic renderer nests itself without end.
			const roots = (
				node: Element | ShadowRoot,
				depth = 3,
			): Array<Element | ShadowRoot> => [
				node,
				...(depth > 0
					? [...node.querySelectorAll('*')].flatMap((e) =>
							e.shadowRoot ? roots(e.shadowRoot, depth - 1) : [],
						)
					: []),
			];
			const read = (el: Element, into: Set<string>) => {
				for (const root of roots(el.shadowRoot as ShadowRoot)) {
					const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
					for (let n = walker.nextNode(); n; n = walker.nextNode()) {
						const parent = n.parentElement;
						if (parent?.closest('style, script')) continue;
						const text = n.textContent?.replace(/\s+/g, ' ').trim();
						if (text) into.add(text);
					}
					for (const e of root.querySelectorAll('*'))
						for (const name of [
							'aria-label',
							'title',
							'placeholder',
							'alt',
							'data-label',
						]) {
							const v = e.getAttribute(name)?.trim();
							if (v) into.add(v);
						}
				}
			};
			const expandAndRead = async (el: Element) => {
				const seen = new Set<string>();
				for (const root of roots(el.shadowRoot as ShadowRoot))
					for (const d of root.querySelectorAll('details')) d.open = true;
				await settle(el);
				read(el, seen);
				for (const root of roots(el.shadowRoot as ShadowRoot))
					for (const tab of root.querySelectorAll('[role="tab"]')) {
						(tab as HTMLElement).click();
						await settle(el);
						for (const r of roots(el.shadowRoot as ShadowRoot))
							for (const d of r.querySelectorAll('details')) d.open = true;
						await settle(el);
						read(el, seen);
					}
				return [...seen];
			};
			const result = mount({}, source.data);
			await settle(result);
			const resultWords = await expandAndRead(result);
			result.remove();
			const binding = w.ROXY_ENDPOINT_BINDINGS[tag]?.[0];
			let formWords: string[] = [];
			if (binding) {
				const form = mount({
					'data-endpoint': binding.path.slice(1),
					method: binding.method,
					'spec-url': './openapi.json',
				});
				const inner = () =>
					form.shadowRoot
						?.querySelector('roxy-endpoint-form')
						?.shadowRoot?.querySelector('form');
				for (let i = 0; i < 200 && !inner(); i++)
					await new Promise((r) => setTimeout(r, 25));
				formWords = await expandAndRead(form);
				form.remove();
			}
			const data = new Set<string>();
			const walk = (v: unknown) => {
				if (typeof v === 'string') {
					for (const word of v.toLowerCase().split(/[^\p{L}]+/u))
						if (word) data.add(word);
				} else if (Array.isArray(v)) v.forEach(walk);
				else if (v && typeof v === 'object') Object.values(v).forEach(walk);
			};
			walk(source.data);
			// The words this language's catalogues print as themselves on purpose: cognates, terms of art, abbreviations.
			const attested = new Set<string>();
			const reg = (
				window as unknown as {
					__ROXY_UI_I18N__?: {
						catalogs: Record<string, Record<string, string>>;
						fieldLabels: Record<
							string,
							{ fields: Record<string, string>; enums: Record<string, string> }
						>;
					};
				}
			).__ROXY_UI_I18N__;
			const labels = reg?.fieldLabels[lang];
			const months = Array.from({ length: 12 }, (_, m) =>
				new Intl.DateTimeFormat(lang, { month: 'long' }).format(
					new Date(2026, m, 1),
				),
			);
			for (const value of [
				...months,
				...Object.values(reg?.catalogs[lang] ?? {}),
				...Object.values(labels?.fields ?? {}),
				...Object.values(labels?.enums ?? {}),
			])
				for (const word of value.toLowerCase().split(/[^\p{L}]+/u))
					if (word) attested.add(word);
			return {
				result: resultWords,
				form: formWords,
				data: [...data],
				attested: [...attested],
			};
		},
		{ tag, lang },
	);
}

/** The strings a translated page still shows exactly as the English page does, with data values, numbers and proper nouns taken out. */
function untranslated(
	english: string[],
	translated: string[],
	excused: Set<string>,
): string[] {
	const en = new Set(english);
	return translated.filter(
		(s) =>
			en.has(s) &&
			(s.match(/\p{L}+/gu) ?? []).some(
				(word) =>
					/^[A-Za-z]{3,}$/.test(word) && !excused.has(word.toLowerCase()),
			),
	);
}

/**
 * English a translated page still shows today, per component and surface, frozen so it only shrinks.
 *
 * @remarks
 * Each group has one cause, and none is an oversight this test lets in. The KP cards are the frozen literal debt `i18n.test.ts` holds. The generic renderers (`data`, `reference-card`) head their rows with response keys, which have no published labels. Identifier pickers (nakshatra) and the zodiac sign tiles read option names the runtime label payload does not carry. The rest are captions and labels a component builds outside `t()`, waiting on sourced translations. A string that disappears fails the second assertion, so the entry is deleted with the fix that removed it.
 */
const KNOWN_ENGLISH: Record<string, string[]> = {
	'ashtakavarga-grid result': [
		'Bhinnashtakavarga: the bindus each planet scores in every one of the twelve signs, with a row total.',
		'Bindus left after Trikona and Ekadipati Shodhana, the input to Shodhya Pinda. The Reduced SAV row totals the seven planets only, so it does not include the Lagna row above it.',
		'Each planet scores 0 to 8 bindus per sign. 4 is the mid, 5 and above is strong support for that planet in that sign.',
		'Reduced Bhinnashtakavarga after Shodhana: the bindus each planet keeps in every one of the twelve signs, with a row total and a Reduced Sarvashtakavarga totals row.',
		'Under 25 is a weak sign, 25 to 29 average, 30 and above strong. The 12 signs always total 337.',
	],
	'chara-karakas result': [
		'Eight karaka scheme, Rahu included and ranked from the end of its sign.',
	],
	'compatibility-card result': [
		'intellectual',
		'physical',
		'romantic',
		'spiritual',
		'☉ Sun',
	],
	'dasha-timeline result': [
		'147.668° sidereal',
		'5y 6m 18d of the opening Sun mahadasha',
		'Ayanamsa',
		'Cycle length',
		'Moon longitude',
		'Rahu Mahadasha',
	],
	'data result': [
		'Computed At',
		'Days',
		'Degree In Sign',
		'Docs Url',
		'Exact',
		'Is Retrograde',
		'Ranges',
	],
	'dosha-card result': ['Mangal Dosha'],
	'forecast-digest result': ['Biorhythm', 'Vedic'],
	'kp-chart result': [
		'Ascendant:',
		'Ayanamsa:',
		'Cusps',
		'House-wise significators',
		'Houses each planet signifies, strongest level first.',
		'KP Placidus cusps: each house cusp with what it signifies, its position, sign lord, nakshatra and pada, star lord, sub lord, sub sub lord and KP number.',
		'KP chart views',
		'KP house-wise significators: each house, the planets that signify it at levels 1 to 4, and the full strength order.',
		'KP planet-wise significators: each planet, the houses it signifies at levels 1 to 4, and the full strength order.',
		'KP planets and nodes: each body with its position, house, nakshatra and pada, star lord, sub lord, sub sub lord and KP number.',
		'Planet-wise significators',
		'Planets that signify each house, strongest level first.',
		'Position',
		'Significator levels',
		'Significators',
		'Strength order',
		'Sub lord',
		'Sub-sub lord',
		'none',
		'· sub lord',
	],
	'kp-planets-table result': [
		'Ayanamsa:',
		'KP planets',
		'KP planets table',
		'KP planets: each planet with its sign, sign lord, nakshatra, star lord, sub lord, sub sub lord and KP number.',
		'Sub lord',
		'Sub-sub lord',
	],
	'kp-ruling-planets result': [
		'House significators: each ruling planet, the houses it signifies, and what those houses stand for.',
		'KP ruling planets',
		'Lagna',
		'Ruling planets',
		'Ruling planets by strength',
		'Signifies houses',
		'Sub lord',
		'Sub-sub lord',
	],
	'nakshatra-card form': [
		'Anuradha',
		'Ardra',
		'Ashlesha',
		'Bharani',
		'Chitra',
		'Dhanishta',
		'Hasta',
		'Jyeshtha',
		'Krittika',
		'Magha',
		'Moola',
		'Mrigashira',
		'Punarvasu',
		'Purva ashadha',
		'Purva bhadrapada',
		'Purva phalguni',
		'Pushya',
		'Revati',
		'Rohini',
		'Shatabhisha',
		'Shravana',
		'Swati',
		'Uttara ashadha',
		'Uttara bhadrapada',
		'Uttara phalguni',
		'Vishakha',
	],
	'natal-chart result': ['Asc'],
	'numerology-card result': ['Career', 'Spirituality'],
	'panchang-table result': [
		'Abhijit Muhurta',
		'Aṣṭamī, Krishna paksha',
		'Brahma Muhurta',
		'Godhuli Muhurta',
		'Gulika',
		'Lord Moon · Deity Vishnu · Symbol Ear · Shravana natives are wise, communicative, and observant. They often excel in teaching and mediation roles.',
		'Nishita Muhurta',
		'Pratah Sandhya',
		'Rahu Kaal',
		'Ruled by Rāhu · Deity Vasus · Ākāśa · 5% elapsed',
		'Sayahna Sandhya',
		'Vijaya Muhurta',
		'Yamaganda',
	],
	'reference-card result': [
		'Challenges',
		'Compatible Signs',
		'Description long',
		'Description short',
		'Famous',
		'Gifts',
		'Modality',
		'Motto',
		'Ruling Planet',
		'Strengths',
		'Symbol Name',
	],
	'relocation-wheel result': ['Asc'],
	'transit-wheel result': ['Asc'],
	'western-planets-table result': ['Asc'],
};

test('no component shows English chrome or reference prose on a translated page', async ({
	page,
	browserName,
}) => {
	test.skip(browserName !== 'chromium', 'a content sweep, read once');
	test.setTimeout(600_000);
	const tags = await (async () => {
		await page.goto('/preview.html?c=natal-chart');
		return page.evaluate(() =>
			(
				window as unknown as {
					ROXY_COMPONENTS: Array<{ slug: string; tag: string }>;
				}
			).ROXY_COMPONENTS.filter(
				(c) => !['roxy-endpoint-form', 'roxy-location-search'].includes(c.tag),
			).map((c) => [c.slug, c.tag] as const),
		);
	})();
	const found = new Map<string, Set<string>>();
	const where = new Map<string, string[]>();
	for (const [slug, tag] of tags) {
		await page.goto(`/preview.html?c=${slug}`);
		await page.waitForFunction(
			(t) =>
				(document.querySelector(t) as { data?: unknown } | null)?.data != null,
			tag,
		);
		const english = await wordsIn(page, tag, 'en');
		for (const lang of SHIPPED) {
			const words = await wordsIn(page, tag, lang);
			const excused = new Set([
				...english.data,
				...words.attested,
				...PROPER_NOUNS,
			]);
			for (const part of ['result', 'form'] as const) {
				if (part === 'result' && ENGLISH_DOCTRINE.has(slug)) continue;
				for (const s of untranslated(english[part], words[part], excused)) {
					const key = `${slug} ${part}`;
					found.set(key, (found.get(key) ?? new Set()).add(s));
					where.set(`${key}: ${s}`, [
						...(where.get(`${key}: ${s}`) ?? []),
						lang,
					]);
				}
			}
		}
	}
	const unlisted: string[] = [];
	for (const [key, strings] of found)
		for (const s of strings)
			if (!KNOWN_ENGLISH[key]?.includes(s))
				unlisted.push(`${key}: ${s} (${where.get(`${key}: ${s}`)?.join(' ')})`);
	const translatedSince = Object.entries(KNOWN_ENGLISH).flatMap(([key, list]) =>
		list.filter((s) => !found.get(key)?.has(s)).map((s) => `${key}: ${s}`),
	);
	expect(unlisted, unlisted.join('\n')).toEqual([]);
	expect(translatedSince, translatedSince.join('\n')).toEqual([]);
});
