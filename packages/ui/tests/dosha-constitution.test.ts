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
	const el = document.createElement('roxy-dosha-constitution');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';
const segments = (el: HTMLElement): Element[] => [
	...root(el).querySelectorAll('.bar .seg'),
];
/** The flex-grow the segment was given, which is the share it is drawn from. */
const grow = (seg: Element): number =>
	Number(
		/flex:\s*([\d.]+)/.exec(seg.getAttribute('style') ?? '')?.[1] ?? Number.NaN,
	);

const ranked = (
	graha: string,
	totalVirupas: number,
	rank: number,
	strong: boolean,
) => ({
	graha,
	totalVirupas,
	rank,
	strong,
});

/**
 * A live reading whose composite is a DUAL type built from two strong grahas, and whose first
 * citation sits in an appended note rather than in a numbered verse. Both are the shapes that a
 * simpler chart would never produce: a single humour hides the hyphen the type label carries, and a
 * numbered verse hides the branch that must not join a chapter to a sentence with a point.
 */
const CONSTITUTION = {
	frame: { ayanamsa: 'lahiri', ayanamsaDegrees: 23.71 },
	lagnaSign: 'gemini',
	moonSign: 'aries',
	factors: [
		{
			id: 'lagna-sign',
			input: 'gemini',
			doshas: ['vata'],
			weight: 2,
			source: {
				text: 'Brihat Jataka',
				chapter: '18',
				verse: 'note to 20, the Satyacharya extract',
				translation: 'N. Chidambaram Iyer',
				year: 1885,
				publicDomain: true,
				note: 'ZZFACTORNOTE',
			},
		},
		{
			id: 'moon-sign',
			input: 'aries',
			doshas: ['pitta'],
			weight: 1,
			source: {
				text: 'Brihat Jataka',
				chapter: '18',
				verse: '20',
				translation: 'N. Chidambaram Iyer',
				year: 1885,
				publicDomain: true,
			},
		},
		{
			id: 'strongest-planet',
			input: 'Mercury Jupiter',
			doshas: ['pitta', 'kapha'],
			weight: 2,
			// No public-domain English exists for this work, so the response names the
			// verse and no edition. The line must not grow one.
			source: {
				text: 'Saravali',
				chapter: '38',
				verse: '5',
				translation: null,
				year: null,
				publicDomain: false,
			},
		},
	],
	composite: {
		vata: 20,
		pitta: 40,
		kapha: 40,
		dominant: 'pitta',
		secondary: 'kapha',
		type: 'pitta-kapha',
		convention: 'roxyapi/v1',
		weighting: {
			lagnaSign: 2,
			moonSign: 1,
			strongestPlanet: 2,
			strongPlanetThreshold: 0.9,
			dualTypeMargin: 10,
		},
	},
	strengthRanking: [
		ranked('Mercury', 486.19, 1, true),
		ranked('Jupiter', 461.85, 2, true),
		ranked('Sun', 301.84, 3, false),
	],
	planetDoshas: [
		{
			graha: 'Sun',
			sanskritName: 'sūrya',
			doshas: ['pitta'],
			dhatu: 'bone',
			dhatuSanskrit: 'asthi',
			doshaSource: {
				text: 'Brihat Jataka',
				chapter: '2',
				verse: '8 to 11',
				translation: 'N. Chidambaram Iyer',
				year: 1885,
				publicDomain: true,
			},
			dhatuSource: {
				text: 'Brihat Jataka',
				chapter: '2',
				verse: '11',
				translation: 'N. Chidambaram Iyer',
				year: 1885,
				publicDomain: true,
			},
		},
		{
			graha: 'Moon',
			sanskritName: 'candra',
			doshas: ['vata', 'kapha'],
			dhatu: 'blood',
			dhatuSanskrit: 'rakta',
			doshaSource: {
				text: 'Brihat Jataka',
				chapter: '2',
				verse: '8 to 11',
				translation: 'N. Chidambaram Iyer',
				year: 1885,
				publicDomain: true,
			},
			dhatuSource: {
				text: 'Brihat Jataka',
				chapter: '2',
				verse: '11',
				translation: 'N. Chidambaram Iyer',
				year: 1885,
				publicDomain: true,
			},
		},
	],
	summary: 'ZZSUMMARY',
	conventions: { signDoshaScheme: 'satyacharya', ayanamsa: 'lahiri' },
	meta: {
		disclaimer:
			'For general wellness and cultural interest only. This is not medical advice.',
	},
};

const HUMOURS = ['vata', 'pitta', 'kapha'] as const;

describe('the three shares are one bar', () => {
	/**
	 * The composite is a split of one whole and the API guarantees the three sum to exactly 100, so
	 * the bar is one track. Each segment is asserted against ITS OWN share rather than against a
	 * width written here, which is what makes a segment drawn from the wrong humour fail.
	 */
	test('every segment is sized by the share it carries', async () => {
		const el = await mount(CONSTITUTION);
		const segs = segments(el);
		const nonZero = HUMOURS.filter((h) => CONSTITUTION.composite[h] > 0);
		expect(segs.length).toBe(nonZero.length);
		nonZero.forEach((h, i) => {
			const seg = segs[i] as Element;
			expect(seg.classList.contains(`seg-${h}`), h).toBe(true);
			expect(grow(seg), h).toBeCloseTo(CONSTITUTION.composite[h], 5);
		});
	});

	test('the shares the bar is drawn from sum to the whole', () => {
		const total = HUMOURS.reduce((n, h) => n + CONSTITUTION.composite[h], 0);
		expect(total).toBe(100);
	});

	/** The dominant humour the response names has to be the widest segment on the drawing. */
	test('the widest segment is the humour the response calls dominant', async () => {
		const el = await mount(CONSTITUTION);
		const widest = segments(el).reduce((a, b) => (grow(a) >= grow(b) ? a : b));
		expect(
			widest.classList.contains(`seg-${CONSTITUTION.composite.dominant}`),
		).toBe(true);
	});

	/** A dual type is two humours joined by a hyphen, and the hyphen is the part that says so. */
	test('a dual type keeps the hyphen the API joins it with', async () => {
		const el = await mount(CONSTITUTION);
		expect(root(el).querySelector('.type')?.textContent?.trim()).toBe(
			'Pitta-Kapha',
		);
	});
});

describe('the factors carry their citations', () => {
	test('each factor names what it read, its humours and its weight', async () => {
		const el = await mount(CONSTITUTION);
		const rows = [...root(el).querySelectorAll('[part~="factors"] .row')];
		expect(rows.length).toBe(CONSTITUTION.factors.length);
		const body = text(el);
		expect(body).toContain('Mercury');
		expect(body).toContain('Jupiter');
		expect(body).toContain('Kapha');
	});

	/**
	 * The strongest-graha factor packs its grahas into ONE space separated string, so printing it as
	 * it arrives reads as a typo rather than as a list. The conjunction is a fact about the reader's
	 * language, which is why it is asserted in two of them: the space form must appear in neither.
	 */
	test('a factor that read several grahas joins them the way the language joins a list', async () => {
		const en = await mount(CONSTITUTION);
		expect(text(en)).toContain('Mercury and Jupiter');
		expect(text(en)).not.toContain('Mercury Jupiter');

		const de = await mount(CONSTITUTION, { lang: 'de' });
		expect(text(de)).toContain('Mercury und Jupiter');
		expect(text(de)).not.toContain('Mercury Jupiter');
	});

	/**
	 * A source note is a recorded conflict between editions or a stated limit on the citation: an
	 * editor consults it, a practitioner does not, and three of them under three factors is most of
	 * the card. The citation LINE is what makes the value checkable, so it stays on screen and the
	 * paragraph opens on demand. `hide-readings` keeps both, because provenance is not a reading.
	 */
	test('the citation line is on screen and its note is behind a disclosure', async () => {
		const cases: Record<string, string>[] = [{}, { 'hide-readings': '' }];
		for (const attrs of cases) {
			const el = await mount(CONSTITUTION, attrs);
			const cite = root(el).querySelector('[part~="factors"] .cite');
			expect(cite?.querySelector('p')?.textContent).toContain('Brihat Jataka');
			const note = cite?.querySelector('details');
			expect(note, 'the note is not behind a disclosure').not.toBeNull();
			expect(note?.querySelector('summary')?.textContent).toContain(
				'Note on the source',
			);
			expect(note?.querySelector('p')?.textContent).toContain('ZZFACTORNOTE');
			// A disclosure that ships open is the paragraph again, with a control on it.
			expect(note?.hasAttribute('open')).toBe(false);
		}
	});

	/**
	 * A chapter and a NUMBERED verse read as `18.20`, which is how every printed edition is cited. A
	 * verse that is a sentence gets its own clause instead, because joining it with a point would
	 * manufacture a reference no edition contains.
	 */
	test('a numbered verse joins with a point and a prose one does not', async () => {
		const el = await mount(CONSTITUTION);
		const body = text(el);
		expect(body).toContain('Brihat Jataka 18.20');
		expect(body).toContain(
			'Brihat Jataka 18, note to 20, the Satyacharya extract',
		);
		expect(body).not.toContain('18.note to 20');
	});

	/** A work with no public-domain English is cited by verse and names no edition; inventing one would read as a quotation. */
	test('a referenced-only work names no translator or year', async () => {
		const el = await mount(CONSTITUTION);
		const cites = [...root(el).querySelectorAll('[part~="factors"] .cite')].map(
			(c) => c.textContent ?? '',
		);
		const saravali = cites.find((c) => c.includes('Saravali'));
		expect(saravali).toBeDefined();
		expect(saravali).not.toContain('1885');
		expect(saravali).not.toContain('Chidambaram');
	});

	/** Every row of the reference table cites the same two works, so they are printed once. */
	test('the reference table states its sources once rather than per row', async () => {
		const el = await mount(CONSTITUTION);
		const cites = [
			...root(el).querySelectorAll('[part~="planet-humours"] .cite'),
		];
		expect(cites.length).toBe(1);
	});
});

describe('provenance and scope', () => {
	/** Changing the ayanamsa can move a graha into another rashi, so the frame is named or the reading cannot be reconciled. */
	test('the sidereal frame is named', async () => {
		const el = await mount(CONSTITUTION);
		expect(text(el)).toContain('Lahiri');
	});

	/**
	 * `composite.convention` versions the blending rule for a caller comparing two readings months
	 * apart, and the published field-label payload names neither the field nor its value, so on a card
	 * it is a developer identifier under a heading a visitor cannot act on. What the convention IS
	 * reaches the reader as numbers: every factor prints the weight it was given.
	 */
	test('the convention identifier is not on the card, and the weights it names are', async () => {
		const el = await mount(CONSTITUTION);
		expect(text(el)).not.toContain(CONSTITUTION.composite.convention);
		const rows = [...root(el).querySelectorAll('[part~="factors"] .row')];
		expect(rows.length).toBe(CONSTITUTION.factors.length);
		rows.forEach((row, i) => {
			const weight = CONSTITUTION.factors[i]?.weight;
			expect(row.textContent, `weight of factor ${i}`).toContain(
				String(weight),
			);
		});
	});

	test('the shadbala ranking marks the grahas that reached the cutoff', async () => {
		const el = await mount(CONSTITUTION);
		const rows = [...root(el).querySelectorAll('[part~="ranking"] tbody tr')];
		expect(rows.length).toBe(CONSTITUTION.strengthRanking.length);
		const strong = rows.filter((r) => r.classList.contains('is-strong'));
		expect(strong.length).toBe(
			CONSTITUTION.strengthRanking.filter((r) => r.strong).length,
		);
	});
});

describe('hide-readings', () => {
	/**
	 * The disclaimer states the scope of everything above it, which is a fact about the response
	 * rather than an interpretation of a chart. A page that drops the reading has more need of it,
	 * so it is the one block the attribute may never take.
	 */
	test('the disclaimer stays and only the composed summary goes', async () => {
		const el = await mount(CONSTITUTION, { 'hide-readings': '' });
		const body = text(el);
		expect(body).toContain(CONSTITUTION.meta.disclaimer);
		expect(root(el).querySelector('[part~="disclaimer"]')).not.toBeNull();
		for (const kept of ['Pitta-Kapha', 'Brihat Jataka 18.20', 'Mercury']) {
			expect(body, `hide-readings removed ${kept}, which is data`).toContain(
				kept,
			);
		}
		expect(body).not.toContain('ZZSUMMARY');
	});
});
