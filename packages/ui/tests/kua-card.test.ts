import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { GRID_ORDER, LO_SHU } from '../src/utils/nine-palaces.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<HTMLElement> {
	const el = document.createElement('roxy-kua-card');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';
const cells = (el: HTMLElement): Element[] => [
	...root(el).querySelectorAll('.plate .sector'),
];
const named = (el: HTMLElement): string[] =>
	cells(el).map(
		(c) => c.querySelector('.sector-name')?.textContent?.trim() ?? '',
	);

const sector = (
	direction: string,
	star: string,
	starName: string,
	nature: string,
	rank: number,
	domain: string,
) => ({ direction, star, starName, nature, rank, domain });

/** A live Kua 4 read, east group, with its sectors in the order the endpoint returned them. */
const KUA = {
	kua: 4,
	rawKua: 4,
	reassigned: false,
	gender: 'female',
	group: 'east',
	solarYear: 1989,
	boundaryDate: '1990-02-04',
	conventions: { yearBoundary: 'li-chun' },
	trigram: {
		number: 4,
		chinese: '巽',
		english: 'Wind',
		pinyin: 'Xun',
		symbol: '☴',
		binary: '011',
		element: 'Wood',
		direction: 'Southeast',
		familyMember: 'Eldest Daughter',
	},
	sectors: [
		sector(
			'North',
			'sheng-chi',
			'Sheng Chi',
			'auspicious',
			1,
			'Growth and income',
		),
		sector(
			'Northeast',
			'jue-ming',
			'Jue Ming',
			'inauspicious',
			4,
			'Total loss',
		),
		sector(
			'East',
			'yan-nian',
			'Yan Nian',
			'auspicious',
			3,
			'Relationships and longevity',
		),
		sector(
			'Southeast',
			'fu-wei',
			'Fu Wei',
			'auspicious',
			4,
			'Stability and clarity',
		),
		sector(
			'South',
			'tian-yi',
			'Tian Yi',
			'auspicious',
			2,
			'Health and support',
		),
		sector(
			'Southwest',
			'wu-gui',
			'Wu Gui',
			'inauspicious',
			2,
			'Betrayal and loss',
		),
		sector(
			'West',
			'liu-sha',
			'Liu Sha',
			'inauspicious',
			3,
			'Disputes and entanglement',
		),
		sector(
			'Northwest',
			'huo-hai',
			'Huo Hai',
			'inauspicious',
			1,
			'Mishaps and friction',
		),
	],
};

const MANSIONS = {
	...KUA,
	bestSector: 'North',
	worstSector: 'Northeast',
	sectors: KUA.sectors.map((s) => ({
		...s,
		chinese: '生氣',
		pinyin: 'Sheng Qi',
		reading: `ZZREADING${s.direction.toUpperCase()}`,
	})),
};

describe('the eight sectors sit on the same grid as the flying-star plate', () => {
	/**
	 * Two feng-shui cards describe one building, so a reader lays one over the other. A grid that
	 * agreed with itself but not with its sibling would pass every check here and still be unusable
	 * beside the plate, which is why this asserts against the SHARED order rather than a local copy.
	 */
	test('the nine cells are drawn in the shared nine-palace order', async () => {
		const el = await mount(KUA);
		expect(cells(el).length).toBe(9);
		const centreIndex = GRID_ORDER.indexOf('Center');
		expect(named(el).filter((_, i) => i !== centreIndex)).toEqual(
			GRID_ORDER.filter((p) => p !== 'Center') as unknown as string[],
		);
	});

	test('south is the top row and north the bottom', async () => {
		const el = await mount(KUA);
		const drawn = named(el);
		expect(drawn[1]).toBe('South');
		expect(drawn[7]).toBe('North');
		expect(drawn[3]).toBe('East');
		expect(drawn[5]).toBe('West');
	});

	/** The Lo Shu is what fixes those positions, and it is the same square the plate is built on. */
	test('the drawn order still satisfies the Lo Shu square', () => {
		const at = (r: number, c: number) => LO_SHU[r * 3 + c] as number;
		for (let r = 0; r < 3; r++) {
			expect(at(r, 0) + at(r, 1) + at(r, 2)).toBe(15);
			expect(at(0, r) + at(1, r) + at(2, r)).toBe(15);
		}
	});

	/**
	 * Ba Zhai divides the compass in half for every Kua number: four favourable sectors and four
	 * that are not. A card showing five of one is drawing something the system cannot produce.
	 */
	test('four sectors are favourable and four are not', async () => {
		const el = await mount(KUA);
		const good = cells(el).filter((c) => c.classList.contains('sector-good'));
		const bad = cells(el).filter((c) => c.classList.contains('sector-bad'));
		expect(good.length).toBe(4);
		expect(bad.length).toBe(4);
		expect(good.length + bad.length).toBe(KUA.sectors.length);
	});

	/**
	 * The centre is not a compass direction and Ba Zhai says nothing about it, so it carries the
	 * person the map is for. Filling it with a ninth sector would invent a reading.
	 */
	test('the centre holds the Kua number and its trigram, not a sector', async () => {
		const el = await mount(KUA);
		const centre = cells(el)[GRID_ORDER.indexOf('Center')];
		expect(centre?.classList.contains('sector-self')).toBe(true);
		expect(centre?.querySelector('.kua-number')?.textContent?.trim()).toBe('4');
		expect(centre?.querySelector('.trigram-symbol')?.textContent?.trim()).toBe(
			'☴',
		);
		expect(centre?.querySelector('.star-name')).toBeNull();
	});

	test('a cell is placed by its direction, not by its position in the response', async () => {
		const el = await mount(KUA);
		expect(named(el).filter(Boolean)).not.toEqual(
			KUA.sectors.map((s) => s.direction),
		);
		for (const s of KUA.sectors) {
			const cell = cells(el).find(
				(c) =>
					c.querySelector('.sector-name')?.textContent?.trim() === s.direction,
			);
			expect(cell, `no cell for ${s.direction}`).toBeDefined();
			expect(cell?.querySelector('.star-name')?.textContent?.trim()).toBe(
				s.starName,
			);
			expect(cell?.textContent).toContain(s.domain);
		}
	});
});

describe('the mode decides how much of the read is drawn', () => {
	test('the Kua read alone names no best or worst sector', async () => {
		const el = await mount(MANSIONS, { mode: 'kua' });
		const body = text(el);
		expect(body).not.toContain('Best');
		expect(body).not.toContain('ZZREADINGNORTH');
	});

	test('the mansions read names them and carries a reading per sector', async () => {
		const el = await mount(MANSIONS, { mode: 'mansions' });
		const body = text(el);
		expect(body).toContain('Best');
		expect(body).toContain('North');
		expect(root(el).querySelectorAll('[part~="sectors"] .row').length).toBe(8);
		expect(body).toContain('ZZREADINGNORTH');
	});
});

describe('hide-readings', () => {
	test('the whole map stays and only the per-sector reading goes', async () => {
		const el = await mount(MANSIONS, {
			mode: 'mansions',
			'hide-readings': '',
		});
		expect(cells(el).length).toBe(9);
		const body = text(el);
		for (const kept of ['Sheng Chi', 'Growth and income', 'Wind', 'li-chun']) {
			expect(body, `hide-readings removed ${kept}, which is the map`).toContain(
				kept,
			);
		}
		expect(body).not.toContain('ZZREADINGNORTH');
	});
});
