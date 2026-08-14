import { afterEach, beforeEach, describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml), and Lit reads document and customElements at module
// load, so the order matters: setup -> import.
import '../src/index.js';
// Side effect: registers the Spanish catalogue for the chrome assertions below.
import '../src/locales/es.js';
import { SIGNS_ORDER } from '../src/tokens/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

const root = (el: Element): ShadowRoot =>
	(el as unknown as { shadowRoot: ShadowRoot }).shadowRoot;

/** Rendered text with the `<style>` nodes excluded: `shadowRoot.textContent` concatenates the stylesheet, so an assertion can otherwise pass on a class name that never rendered (lesson 21). */
function text(el: Element): string {
	return [...root(el).childNodes]
		.filter((n) => (n as Element).tagName !== 'STYLE')
		.map((n) => n.textContent ?? '')
		.join(' ');
}

/** Rendered text per matched node, whitespace collapsed: Lit templates carry the source indentation into the DOM, so a raw `textContent` compares against tabs rather than against what a reader sees. */
const textsAt = (el: Element, selector: string): string[] =>
	[...root(el).querySelectorAll(selector)].map((n) =>
		(n.textContent ?? '').replace(/\s+/g, ' ').trim(),
	);

/** One body's month, written as the per-day series the assertions reason about. */
interface BodySpec {
	planet: string;
	planetLocalized?: string;
	/** The sign it occupies on each day, one entry per day. */
	signs: string[];
	/** Whether it is retrograde on each day. Absent means direct all month. */
	retro?: boolean[];
	/** Canonical sign name to its localized partner, for the translated fixtures. */
	signsLocalized?: Record<string, string>;
}

/**
 * Build a response from per-body series.
 *
 * @remarks
 * The longitude is derived from the sign index so a fixture cannot claim a sign
 * its own longitude contradicts, and the degree walks forward a day at a time so
 * the first and last positions a track prints are visibly different values.
 */
function month(bodies: BodySpec[], year = 2026, monthNumber = 8) {
	const dayCount = bodies[0]?.signs.length ?? 0;
	const days = Array.from({ length: dayCount }, (_, i) => ({
		date: `${year}-${String(monthNumber).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
		positions: bodies.flatMap((b) => {
			const sign = b.signs[i];
			if (!sign) return [];
			const localized = b.signsLocalized?.[sign];
			return [
				{
					planet: b.planet,
					...(b.planetLocalized ? { planetLocalized: b.planetLocalized } : {}),
					longitude: SIGNS_ORDER.indexOf(sign as never) * 30 + 10 + i,
					sign,
					...(localized ? { signLocalized: localized } : {}),
					degreeInSign: 10 + i,
					isRetrograde: b.retro?.[i] ?? false,
				},
			];
		}),
	}));
	return { year, month: monthNumber, days };
}

async function mount(data: unknown, lang?: string): Promise<HTMLElement> {
	if (lang) document.documentElement.lang = lang;
	const el = document.createElement('roxy-ephemeris-table');
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

/** Every cell in one body's column, found by its column index rather than by text. */
function column(el: Element, index: number): HTMLTableCellElement[] {
	return [...root(el).querySelectorAll('tbody tr')].map(
		(row) => row.querySelectorAll('td')[index] as HTMLTableCellElement,
	);
}

const fill = <T>(n: number, value: T): T[] => Array(n).fill(value);

beforeEach(() => {
	document.documentElement.removeAttribute('lang');
	document.body.innerHTML = '';
});

// `bun test` shares one happy-dom document across files, so a page language left
// standing here is inherited by whichever file runs next and an unrelated
// English assertion two files later fails in Spanish.
afterEach(() => {
	document.documentElement.removeAttribute('lang');
	document.body.innerHTML = '';
});

describe('the daily grid is the response, cell for cell', () => {
	test('one row per day and one column per body, plus the date column', async () => {
		const el = await mount(
			month([
				{ planet: 'Sun', signs: fill(31, 'Leo') },
				{ planet: 'Moon', signs: fill(31, 'Pisces') },
				{ planet: 'Mars', signs: fill(31, 'Gemini') },
			]),
		);
		expect(root(el).querySelectorAll('tbody tr').length).toBe(31);
		// Three bodies plus the sticky date column.
		expect(root(el).querySelectorAll('thead th').length).toBe(4);
		// Every row carries a cell for every body, so nothing shifts left.
		for (const row of root(el).querySelectorAll('tbody tr')) {
			expect(row.querySelectorAll('td').length).toBe(3);
		}
		el.remove();
	});

	test('the column order is the order the response lists bodies on its first day', async () => {
		// Not alphabetical and not the order they happen to hash into: the Western
		// set reads Sun through Pluto then the nodes, and the Navagraha read in vara
		// order, and both arrive that way from the API.
		const el = await mount(
			month([
				{ planet: 'Sun', signs: fill(2, 'Leo') },
				{ planet: 'Moon', signs: fill(2, 'Pisces') },
				{ planet: 'Mercury', signs: fill(2, 'Cancer') },
			]),
		);
		expect(
			[...root(el).querySelectorAll('thead th')].map((th) =>
				th.getAttribute('title'),
			),
		).toEqual([null, 'Sun', 'Moon', 'Mercury']);
		el.remove();
	});

	test('a body absent from one day leaves that cell empty instead of shifting the row', async () => {
		const data = month([
			{ planet: 'Sun', signs: fill(3, 'Leo') },
			{ planet: 'Chiron', signs: fill(3, 'Taurus') },
		]);
		// Drop Chiron from the middle day only.
		data.days[1].positions = data.days[1].positions.filter(
			(p) => p.planet !== 'Chiron',
		);
		const el = await mount(data);
		const chiron = column(el, 1);
		expect(chiron.length).toBe(3);
		expect(chiron[1]?.textContent?.trim()).toBe('—');
		// The Sun column is untouched by its neighbour going missing.
		expect(column(el, 0)[1]?.textContent).toContain('♌');
		expect(column(el, 0)[1]?.textContent).not.toContain('♉');
		el.remove();
	});

	test('a cell reads degree, sign, minutes, the way every published ephemeris prints one', async () => {
		// 10 degrees 0 minutes into Leo on day one, by construction of the fixture.
		// The glyph sits BETWEEN the two numbers; a decimal longitude, or the sign
		// pushed out to one end, is what a practitioner reads as developer output.
		const el = await mount(month([{ planet: 'Sun', signs: ['Leo'] }]));
		expect(textsAt(el, 'tbody td')).toEqual(['10♌00']);
		expect(root(el).querySelector('tbody td .pos')?.getAttribute('title')).toBe(
			'Leo',
		);
		el.remove();
	});
});

describe('retrograde stretches are visible, in the chip and in the column', () => {
	test('one chip names the window and every retrograde day in the column is marked', async () => {
		const el = await mount(
			month([
				{
					planet: 'Mercury',
					signs: fill(6, 'Leo'),
					retro: [false, true, true, true, false, false],
				},
			]),
		);
		expect(textsAt(el, '.chip--retro')).toEqual(['℞Retrograde Aug 2 - Aug 4']);
		expect(column(el, 0).map((c) => c.classList.contains('retro'))).toEqual([
			false,
			true,
			true,
			true,
			false,
			false,
		]);
		el.remove();
	});

	test('two stations in one month are two chips, never one spanning the direct days between', async () => {
		const el = await mount(
			month([
				{
					planet: 'Mercury',
					signs: fill(6, 'Leo'),
					retro: [true, false, false, true, true, false],
				},
			]),
		);
		expect(textsAt(el, '.chip--retro')).toEqual([
			'℞Retrograde Aug 1',
			'℞Retrograde Aug 4 - Aug 5',
		]);
		el.remove();
	});

	test('a body retrograde on every sampled day is clipped to the month, not extrapolated', async () => {
		const el = await mount(
			month([
				{
					planet: 'Saturn',
					signs: fill(31, 'Aries'),
					retro: fill(31, true),
				},
			]),
		);
		expect(textsAt(el, '.chip--retro')).toEqual(['℞Retrograde Aug 1 - Aug 31']);
		el.remove();
	});

	test('a direct body gets no retrograde chip and no marked cell', async () => {
		const el = await mount(
			month([{ planet: 'Venus', signs: fill(4, 'Virgo') }]),
		);
		expect(textsAt(el, '.chip--retro')).toEqual([]);
		expect(column(el, 0).some((c) => c.classList.contains('retro'))).toBe(
			false,
		);
		el.remove();
	});
});

describe('sign changes are detected from consecutive days', () => {
	test('a crossing is chipped with the sign it entered and dated to the first day it shows there', async () => {
		const el = await mount(
			month([
				{
					planet: 'Sun',
					signs: [...fill(3, 'Leo'), ...fill(3, 'Virgo')],
				},
			]),
		);
		expect(textsAt(el, '.chip--ingress')).toEqual(['→♍Virgo Aug 4']);
		// Exactly the crossing day is marked in the grid, so the chip and the table
		// name the same day.
		expect(column(el, 0).map((c) => c.classList.contains('ingress'))).toEqual([
			false,
			false,
			false,
			true,
			false,
			false,
		]);
		el.remove();
	});

	test('a body that stays in one sign all month gets no chip', async () => {
		const el = await mount(
			month([{ planet: 'Jupiter', signs: fill(31, 'Leo') }]),
		);
		expect(textsAt(el, '.chip--ingress')).toEqual([]);
		el.remove();
	});

	test('every crossing is chipped, so a fast body gets one per sign it passes through', async () => {
		// The Moon changes sign every two or three days, which is the case the
		// summary block exists for and the one a single-ingress assumption breaks on.
		const el = await mount(
			month([
				{
					planet: 'Moon',
					signs: ['Pisces', 'Pisces', 'Aries', 'Aries', 'Taurus', 'Gemini'],
				},
			]),
		);
		expect(textsAt(el, '.chip--ingress')).toEqual([
			'→♈Aries Aug 3',
			'→♉Taurus Aug 5',
			'→♊Gemini Aug 6',
		]);
		el.remove();
	});

	test('the ingress chip names the crossing in its accessible name, not only in a glyph', async () => {
		const el = await mount(month([{ planet: 'Sun', signs: ['Leo', 'Virgo'] }]));
		expect(
			root(el).querySelector('.chip--ingress')?.getAttribute('aria-label'),
		).toBe('Enters Virgo on Aug 2');
		el.remove();
	});
});

describe('the track row summarizes the month before the grid repeats it', () => {
	test('one row per body, showing where it began and where it ended', async () => {
		const el = await mount(
			month([
				{ planet: 'Sun', signs: ['Leo', 'Leo', 'Virgo'] },
				{ planet: 'Moon', signs: fill(3, 'Pisces') },
			]),
		);
		expect(root(el).querySelectorAll('.track').length).toBe(2);
		// 10 degrees Leo on day one, 12 degrees Virgo on day three.
		expect(textsAt(el, '.track .span')[0]).toBe('10♌00→12♍00');
		el.remove();
	});

	test('the body glyph comes from the canonical name, including the Navagraha nodes', async () => {
		// The Vedic response names the nodes Rahu and Ketu where the Western one
		// says North Node and South Node; both resolve, and a fixture of nine bodies
		// is the second shape this one component has to render.
		const el = await mount(
			month([
				{ planet: 'Sun', signs: ['Cancer'] },
				{ planet: 'Moon', signs: ['Aquarius'] },
				{ planet: 'Mars', signs: ['Taurus'] },
				{ planet: 'Mercury', signs: ['Gemini'] },
				{ planet: 'Jupiter', signs: ['Cancer'] },
				{ planet: 'Venus', signs: ['Virgo'] },
				{ planet: 'Saturn', signs: ['Pisces'] },
				{ planet: 'Rahu', signs: ['Aquarius'], retro: [true] },
				{ planet: 'Ketu', signs: ['Leo'], retro: [true] },
			]),
		);
		expect(textsAt(el, '.track .glyph')).toEqual([
			'☉',
			'☽',
			'♂',
			'☿',
			'♃',
			'♀',
			'♄',
			'☊',
			'☋',
		]);
		el.remove();
	});
});

describe('the localized half is what a reader sees and the English half is what the code keys on', () => {
	const SPANISH = month([
		{
			planet: 'Sun',
			planetLocalized: 'Sol',
			signs: ['Leo', 'Virgo'],
			signsLocalized: { Leo: 'Leo', Virgo: 'Virgo' },
		},
		{
			planet: 'Moon',
			planetLocalized: 'Luna',
			signs: ['Pisces', 'Pisces'],
			signsLocalized: { Pisces: 'Piscis' },
		},
	]);

	/** The same month as an ENGLISH response, which carries no localized field at all. */
	const ENGLISH = JSON.parse(
		JSON.stringify(SPANISH, (key, value) =>
			key.endsWith('Localized') ? undefined : value,
		),
	);

	test('the body names print in Spanish and the English ones are gone', async () => {
		const el = await mount(SPANISH, 'es-AR');
		const rendered = text(el);
		expect(rendered).toContain('Sol');
		expect(rendered).toContain('Luna');
		expect(rendered).not.toContain('Sun');
		expect(rendered).not.toContain('Moon');
		// The sign name reaches a reader through the ingress chip and the cell
		// title, and both take the localized half.
		expect(rendered).toContain('Virgo');
		expect(column(el, 1)[0]?.querySelector('.pos')?.getAttribute('title')).toBe(
			'Piscis',
		);
		el.remove();
	});

	test('and every glyph still resolves, because the lookup stayed on the English name', async () => {
		// The load-bearing assertion. `planetGlyph` and `signGlyph` are keyed on the
		// canonical value, so a later simplification that reads the localized field
		// instead draws a table with no glyphs on it, in Spanish only.
		const el = await mount(SPANISH, 'es-AR');
		// Asserted per SITE: the track row, the grid header and the cell each draw
		// their own glyph, so one of them regressing cannot hide behind the others.
		expect(textsAt(el, '.track .glyph')).toEqual(['☉', '☽']);
		expect(textsAt(el, 'thead th .glyph')).toEqual(['☉', '☽']);
		expect(column(el, 1)[0]?.textContent).toContain('♓');
		expect(column(el, 1)[0]?.querySelector('.pos')?.getAttribute('title')).toBe(
			'Piscis',
		);
		el.remove();
	});

	test('the grid column header is the Spanish body name, in the title and for a screen reader', async () => {
		const el = await mount(SPANISH, 'es-AR');
		expect(
			[...root(el).querySelectorAll('thead th')].map((th) =>
				th.getAttribute('title'),
			),
		).toEqual([null, 'Sol', 'Luna']);
		expect(textsAt(el, 'thead th .roxy-sr-only')).toEqual(['Sol', 'Luna']);
		el.remove();
	});

	test('the ingress chip names the Spanish sign and dates it the Spanish way', async () => {
		// The chip is both halves of localization in one node: the sign comes off
		// the wire through `display`, the date through Intl on the DISPLAY locale,
		// so `Virgo Aug 2` here would mean one of the two was never wired.
		const el = await mount(SPANISH, 'es-AR');
		expect(textsAt(el, '.chip--ingress')).toEqual(['→♍Virgo 2 ago']);
		el.remove();
	});

	test('an English response, which carries no localized field, is unchanged', async () => {
		const el = await mount(ENGLISH);
		expect(text(el)).toContain('Sun');
		expect(textsAt(el, '.chip--ingress')).toEqual(['→♍Virgo Aug 2']);
		expect(column(el, 1)[0]?.querySelector('.pos')?.getAttribute('title')).toBe(
			'Pisces',
		);
		expect(textsAt(el, '.track .glyph')).toEqual(['☉', '☽']);
		el.remove();
	});
});

describe('the chrome reads in the page language', () => {
	test('the empty state translates', async () => {
		document.documentElement.lang = 'es-AR';
		const el = document.createElement('roxy-ephemeris-table');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('Sin datos de efemérides');
		el.remove();
	});

	test('the same component with no page language stays English', async () => {
		const el = document.createElement('roxy-ephemeris-table');
		document.body.appendChild(el);
		await settled(el);
		expect(text(el)).toContain('No ephemeris data');
		el.remove();
	});

	test('the default heading translates, which no static scan can prove', async () => {
		// `this.t(this.heading)` is a dynamic call, so the `t(...)` literal scan in
		// i18n.test.ts cannot see the default. Render it instead.
		const el = await mount(month([{ planet: 'Sun', signs: ['Leo'] }]), 'es-AR');
		expect(text(el)).toContain('Efemérides');
		expect(text(el)).not.toContain('Ephemeris');
		el.remove();
	});

	test('a days array the response sent empty falls back to the empty state', async () => {
		const el = await mount({ year: 2026, month: 8, days: [] });
		expect(text(el)).toContain('No ephemeris data');
		el.remove();
	});
});

describe('the month, the dates and the parts', () => {
	test('the header names the month in the page language, not the viewer one', async () => {
		const en = await mount(month([{ planet: 'Sun', signs: ['Leo'] }]));
		expect(text(en)).toContain('August 2026');
		en.remove();
		const es = await mount(month([{ planet: 'Sun', signs: ['Leo'] }]), 'es-AR');
		expect(text(es)).toContain('agosto de 2026');
		expect(text(es)).not.toContain('August');
		es.remove();
	});

	test('the date column carries the weekday with the day, the way a printed ephemeris does', async () => {
		// A published ephemeris labels its rows `01 Sa`, because half of what a
		// reader asks a monthly table is which day of the week a placement falls on.
		// The month and year are in the header, so neither is repeated here.
		const el = await mount(month([{ planet: 'Sun', signs: fill(3, 'Leo') }]));
		expect(textsAt(el, 'tbody th.day')).toEqual(['1 Sat', '2 Sun', '3 Mon']);
		el.remove();
	});

	test('the header declares the instant every position is sampled at', async () => {
		// An ephemeris with no time basis cannot be reconciled against any other,
		// which is why every published one prints its own in the header. A clock
		// literal reads the same in every language, so it is not a chrome string.
		const el = await mount(month([{ planet: 'Sun', signs: ['Leo'] }]), 'es-AR');
		expect(text(el)).toContain('12:00 UTC');
		el.remove();
	});

	test('the day a body changes direction is marked in the grid, not only in the chip', async () => {
		// A published ephemeris marks the station in the column and lists it below.
		// A body already retrograde on the first has no previous day to change
		// against, so it is not marked as stationing on a day it did not.
		const el = await mount(
			month([
				{
					planet: 'Chiron',
					signs: fill(4, 'Taurus'),
					retro: [false, true, true, true],
				},
				{ planet: 'Saturn', signs: fill(4, 'Aries'), retro: fill(4, true) },
			]),
		);
		expect(column(el, 0).map((c) => c.classList.contains('station'))).toEqual([
			false,
			true,
			false,
			false,
		]);
		expect(column(el, 1).some((c) => c.classList.contains('station'))).toBe(
			false,
		);
		el.remove();
	});

	test('the structural parts a host page styles from outside are exposed', async () => {
		const el = await mount(month([{ planet: 'Sun', signs: ['Leo'] }]));
		const parts = [...root(el).querySelectorAll('[part]')].flatMap((n) =>
			(n.getAttribute('part') ?? '').split(/\s+/).filter(Boolean),
		);
		for (const name of [
			'card',
			'header',
			'section',
			'changes',
			'daily',
			'table',
		]) {
			expect(parts, `ephemeris table should expose part ${name}`).toContain(
				name,
			);
		}
		el.remove();
	});

	test('hide-readings is a no-op, because neither endpoint returns a word of prose', async () => {
		const data = month([{ planet: 'Sun', signs: ['Leo', 'Virgo'] }]);
		const plain = await mount(data);
		const before = text(plain);
		plain.remove();
		const hidden = document.createElement('roxy-ephemeris-table');
		hidden.setAttribute('hide-readings', '');
		(hidden as HTMLElement & { data: unknown }).data = data;
		document.body.appendChild(hidden);
		await settled(hidden);
		expect(text(hidden)).toBe(before);
		hidden.remove();
	});
});

/** The sign key as glyph/label pairs. The two are separate flex items with no text node between them, so reading the row's concatenated text would assert on `♌Leo` and hide which half was wrong. */
const signKey = (el: Element): Array<{ glyph: string; label: string }> =>
	[...root(el).querySelectorAll('.signkey-item')].map((li) => {
		const glyph = (
			li.querySelector('.signkey-glyph')?.textContent ?? ''
		).trim();
		const whole = (li.textContent ?? '').replace(/\s+/g, ' ').trim();
		return {
			glyph,
			// Lit leaves marker nodes around an interpolation, so the label is not
			// reachable as a named child. Taking the row text minus the glyph reads
			// exactly what a visitor sees.
			label: whole.startsWith(glyph) ? whole.slice(glyph.length).trim() : whole,
		};
	});

describe('the sign key names the glyphs the table prints', () => {
	test('one entry per sign present, in zodiacal order rather than first-seen order', async () => {
		// Mars is listed first and sits in Gemini, which is EARLIER in the zodiac
		// than the Sun's Leo, so first-seen order and zodiacal order disagree here
		// and the assertion can tell them apart.
		const el = await mount(
			month([
				{ planet: 'Mars', signs: fill(3, 'Leo') },
				{ planet: 'Sun', signs: fill(3, 'Gemini') },
				{ planet: 'Moon', signs: ['Pisces', 'Aries', 'Aries'] },
			]),
		);
		expect(signKey(el)).toEqual([
			{ glyph: '♈', label: 'Aries' },
			{ glyph: '♊', label: 'Gemini' },
			{ glyph: '♌', label: 'Leo' },
			{ glyph: '♓', label: 'Pisces' },
		]);
	});

	test('a sign occupied by several bodies on many days is listed once', async () => {
		const el = await mount(
			month([
				{ planet: 'Sun', signs: fill(10, 'Leo') },
				{ planet: 'Venus', signs: fill(10, 'Leo') },
			]),
		);
		expect(signKey(el)).toEqual([{ glyph: '♌', label: 'Leo' }]);
	});

	test('the name is the localized one the response carries, not a second vocabulary', async () => {
		const el = await mount(
			month([
				{
					planet: 'Sun',
					signs: ['Leo', 'Leo', 'Virgo'],
					signsLocalized: { Leo: 'Leo', Virgo: 'Virgo' },
				},
				{
					planet: 'Moon',
					signs: fill(3, 'Taurus'),
					signsLocalized: { Taurus: 'Tauro' },
				},
			]),
			'es',
		);
		// Spanish renames Taurus and leaves Leo spelled the same, so a fixture that
		// only checked Leo could pass on an untranslated build.
		expect(signKey(el)).toEqual([
			{ glyph: '♉', label: 'Tauro' },
			{ glyph: '♌', label: 'Leo' },
			{ glyph: '♍', label: 'Virgo' },
		]);
		// The heading comes from the chrome catalogue, not from the response.
		expect(text(el)).toContain('Signos de este mes');
	});

	test('it is a legend part, so a page can hide or restyle it', async () => {
		const el = await mount(month([{ planet: 'Sun', signs: fill(2, 'Leo') }]));
		const section = root(el).querySelector('[part~="legend"]');
		expect(section).not.toBeNull();
		expect(section?.querySelectorAll('.signkey-item').length).toBe(1);
	});

	test('the glyph is hidden from assistive tech, so the name is read once', async () => {
		const el = await mount(month([{ planet: 'Sun', signs: fill(2, 'Leo') }]));
		const glyph = root(el).querySelector('.signkey-glyph');
		expect(glyph?.getAttribute('aria-hidden')).toBe('true');
	});

	test('a response whose positions carry no sign renders no key at all', async () => {
		const data = month([{ planet: 'Sun', signs: fill(2, 'Leo') }]) as {
			days: Array<{ positions: Array<Record<string, unknown>> }>;
		};
		for (const day of data.days) {
			for (const p of day.positions) delete p.sign;
		}
		const el = await mount(data);
		expect(root(el).querySelector('.signkey')).toBeNull();
		// The rest of the card still renders, so this is an absent key and not a
		// component that failed to draw.
		expect(root(el).querySelector('[part~="daily"]')).not.toBeNull();
	});
});
