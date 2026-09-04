import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-gematria');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';

const letter = (
	glyph: string,
	name: string,
	value: number,
	isFinal = false,
) => ({
	glyph,
	letterId: name.toLowerCase(),
	name,
	isFinal,
	value,
});

const cipher = (id: string, value: number | null) => ({
	id,
	value,
	tradition: 'rabbinic',
	source: 'https://example.test/gematria',
});

/**
 * A live read of a Latin name that has TWO defensible Hebrew spellings and one lexicon match, which
 * is the only shape that exercises the candidate-spelling block, the equal-value table and the
 * cipher this API does not compute at once.
 */
const SHALOM = {
	input: { text: 'Shalom' },
	chosen: {
		hebrew: 'שאלעם',
		rule: 'Longest match first: every two letter group the table prints is read as one Hebrew letter before the single letters are tried.',
	},
	hebrewForms: [
		{
			hebrew: 'שאלעם',
			romanization: 'ShALOM',
			rule: 'Longest match first: every two letter group the table prints is read as one Hebrew letter before the single letters are tried.',
			values: [cipher('mispar-hechrachi', 441), cipher('mispar-mispari', null)],
			letters: [
				letter('ש', 'Shin', 300),
				letter('א', 'Alef', 1),
				letter('ל', 'Lamed', 30),
				letter('ע', 'Ayin', 70),
				letter('ם', 'Mem', 40, true),
			],
		},
		{
			hebrew: 'סהאלעם',
			romanization: 'SHALOM',
			rule: 'An alternative parse: at least one two letter group is read as two separate Hebrew letters instead of one.',
			values: [cipher('mispar-hechrachi', 176)],
			letters: [letter('ס', 'Samekh', 60)],
		},
	],
	values: [
		cipher('mispar-hechrachi', 441),
		cipher('mispar-gadol', 1041),
		// The one catalogued cipher this API does not compute. It carries a null on
		// every response, which is not a zero and not a blank.
		cipher('mispar-mispari', null),
	],
	transformations: [
		{
			id: 'atbash',
			output: 'בתכזי',
			outputRomanization: 'BThKZI',
			value: 439,
			tradition: 'rabbinic',
		},
	],
	latinValues: [
		{
			id: 'simple-ordinal',
			value: 68,
			tradition: 'renaissance-latin',
			lineage: 'ZZLINEAGE',
		},
	],
	matches: [
		{
			id: 'emet',
			hebrew: 'אמת',
			romanization: 'AMTh',
			meaning: 'truth',
			value: 441,
			note: 'ZZMATCHNOTE',
			sources: ['https://example.test/emet'],
		},
	],
	conventions: {
		transliteration: 'letter-map-mathers',
		misparGadol: 'finals-500-900',
		atbashOutput: 'both',
	},
};

describe('the letter breakdown reads the way Hebrew reads', () => {
	/**
	 * The response lists letters in string order and Hebrew is written right to left, so the strip
	 * has to lay them out that way or the breakdown contradicts the word printed above it. The
	 * direction is an attribute rather than a computed style, which is the only half of this a
	 * document with no cascade can be asked about.
	 */
	test('the strip is right to left and the letters stay in response order', async () => {
		const el = await mount(SHALOM);
		const strip = root(el).querySelector('.letters');
		expect(strip?.getAttribute('dir')).toBe('rtl');
		expect(strip?.getAttribute('lang')).toBe('he');
		const glyphs = [...root(el).querySelectorAll('.letter .glyph')].map((n) =>
			n.textContent?.trim(),
		);
		expect(glyphs).toEqual(
			SHALOM.hebrewForms[0]?.letters.map((l) => l.glyph) ?? [],
		);
	});

	/** Each tile carries Latin text that reads the other way, so it declares its own direction. */
	test('a tile reads left to right inside the right to left strip', async () => {
		const el = await mount(SHALOM);
		const tiles = [...root(el).querySelectorAll('.letter')];
		expect(tiles.length).toBeGreaterThan(0);
		for (const t of tiles) expect(t.getAttribute('dir')).toBe('ltr');
	});

	test('the word final form is marked', async () => {
		const el = await mount(SHALOM);
		const finals = [...root(el).querySelectorAll('.letter.is-final')];
		expect(finals.length).toBe(
			SHALOM.hebrewForms[0]?.letters.filter((l) => l.isFinal).length,
		);
	});
});

describe('the values table', () => {
	/**
	 * A cipher with no computed value is dropped rather than shown as a zero or a blank cell. An
	 * absent number and the number zero are different answers, and either placeholder would publish
	 * a total nobody calculated.
	 */
	test('a cipher the API does not compute is left out, never zeroed', async () => {
		const el = await mount(SHALOM);
		const rows = [...root(el).querySelectorAll('[part~="values"] tbody tr')];
		const computed = SHALOM.values.filter((v) => typeof v.value === 'number');
		expect(rows.length).toBe(computed.length);
		const body = text(el);
		expect(body).not.toContain('Mispar Mispari');
		expect(body).toContain('441');
	});

	test('the provenance is stated once for the block rather than on every row', async () => {
		const el = await mount(SHALOM);
		const links = [...root(el).querySelectorAll('[part~="values"] a')];
		expect(links.length).toBe(1);
	});
});

describe('every candidate spelling is shown', () => {
	test('both spellings render and the chosen one is marked', async () => {
		const el = await mount(SHALOM);
		const forms = [...root(el).querySelectorAll('[part~="spellings"] .form')];
		expect(forms.length).toBe(SHALOM.hebrewForms.length);
		const marked = forms.filter((f) => f.querySelector('.chosen'));
		expect(marked.length).toBe(1);
		expect(marked[0]?.textContent).toContain(SHALOM.chosen.hebrew);
	});

	/** One spelling is not a set of candidates, so the block would repeat the word already on the card. */
	test('a single spelling draws no candidate block', async () => {
		const el = await mount({
			...SHALOM,
			hebrewForms: SHALOM.hebrewForms.slice(0, 1),
		});
		expect(root(el).querySelector('[part~="spellings"]')).toBeNull();
	});
});

describe('the rest of the response', () => {
	test('the substitutions, the Latin ciphers and the equal-value words all render', async () => {
		const el = await mount(SHALOM);
		const body = text(el);
		expect(body).toContain('Atbash');
		expect(body).toContain('Simple ordinal');
		expect(body).toContain('ZZLINEAGE');
		expect(body).toContain('truth');
		expect(body).toContain('אמת');
	});

	/**
	 * The name mispar gadol is used for two methods, so a total is unreadable without the one
	 * applied. Both the field and its option come from the published field-label payload, and with
	 * none registered they fall back to the humanized wire value, which is what an English page
	 * renders and what this asserts.
	 */
	test('the conventions name the method the totals were taken under', async () => {
		const el = await mount(SHALOM);
		const body = text(el);
		expect(body).toContain('Mispar Gadol');
		expect(body).toContain('Finals 500 900');
	});
});

describe('hide-readings', () => {
	test('every number stays and only what the tradition says about a match goes', async () => {
		const el = await mount(SHALOM, { 'hide-readings': '' });
		const body = text(el);
		for (const kept of ['441', 'truth', 'אמת', 'ZZLINEAGE']) {
			expect(body, `hide-readings removed ${kept}, which is data`).toContain(
				kept,
			);
		}
		expect(body).not.toContain('ZZMATCHNOTE');
	});
});
