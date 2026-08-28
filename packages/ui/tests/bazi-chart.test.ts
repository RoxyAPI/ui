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
	const el = document.createElement('roxy-bazi-chart');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string =>
	root(el).querySelector('[part~="card"]')?.textContent ?? '';

const stem = (id: string, chinese: string, element: string) => ({
	id,
	chinese,
	pinyin: id,
	element,
	polarity: 'yang',
});

const god = (id: string, name: string, chinese: string) => ({
	id,
	name,
	chinese,
	pinyin: id,
	category: 'resource',
	keynote: 'ZZREADINGKEYNOTE',
});

const pillar = (
	position: string,
	stemChar: string,
	branchChar: string,
	animal: string,
	tenGod: string,
) => ({
	position,
	id: `${position}-id`,
	number: 6,
	stem: stem(position, stemChar, 'Earth'),
	branch: { ...stem(position, branchChar, 'Fire'), animal },
	tenGod: god('direct-resource', tenGod, '正印'),
	hiddenStems: [
		{
			stem: stem('bing', '丙', 'Fire'),
			role: 'principal',
			tenGod: god('seven-killings', 'Seven Killings', '七殺'),
		},
		{
			stem: stem('geng', '庚', 'Metal'),
			role: 'middle',
			tenGod: god('friend', 'Friend', '比肩'),
		},
		{
			stem: stem('wu', '戊', 'Earth'),
			role: 'residual',
			tenGod: god('indirect-resource', 'Indirect Resource', '偏印'),
		},
	],
	naYin: 'Wood of the Great Forest',
	naYinChinese: '大林木',
	naYinElement: 'Wood',
});

/** A live chart, trimmed: four pillars, the element split that reads off them, and two interactions. */
const CHART = {
	birthData: {
		date: '1990-01-15',
		time: '14:30:00',
		timezone: -5,
		latitude: 0,
		longitude: 0,
	},
	conventions: {
		dayBoundary: 'split-zi',
		yearBoundary: 'li-chun',
		hourClock: 'clock',
	},
	pillars: [
		pillar('year', '己', '巳', 'snake', 'Direct Resource'),
		pillar('month', '丁', '丑', 'ox', 'Direct Officer'),
		pillar('day', '庚', '辰', 'dragon', 'Day Master'),
		pillar('hour', '癸', '未', 'goat', 'Hurting Officer'),
	],
	dayMaster: {
		stem: 'geng',
		chinese: '庚',
		pinyin: 'geng',
		element: 'Metal',
		polarity: 'yang',
		nature: 'ZZREADINGNATURE',
	},
	zodiacAnimal: 'snake',
	// The eight characters: four stems and four branch elements, one point each.
	fiveElements: [
		{ element: 'Wood', count: 0, level: 'deficient', reading: 'ZZREADINGWOOD' },
		{ element: 'Fire', count: 2, level: 'balanced', reading: 'ZZREADINGFIRE' },
		{ element: 'Earth', count: 4, level: 'excess', reading: 'ZZREADINGEARTH' },
		{
			element: 'Metal',
			count: 1,
			level: 'balanced',
			reading: 'ZZREADINGMETAL',
		},
		{
			element: 'Water',
			count: 1,
			level: 'balanced',
			reading: 'ZZREADINGWATER',
		},
	],
	interactions: [
		{
			type: 'stem-clash',
			id: 'ding-gui',
			chinese: '丁癸沖',
			pinyin: 'ding gui chong',
			quality: 'challenging',
			positions: ['month', 'hour'],
			members: ['ding', 'gui'],
			complete: true,
			meaning: 'ZZREADINGCLASH',
		},
		{
			type: 'six-combination',
			id: 'zi-chou',
			chinese: '子丑合',
			pinyin: 'zi chou he',
			quality: 'harmonious',
			positions: ['year', 'day'],
			members: ['zi', 'chou'],
			complete: true,
			meaning: 'ZZREADINGCOMBINATION',
		},
	],
	summary: 'ZZREADINGSUMMARY',
};

describe('the four pillars', () => {
	test('four columns render, in the order the response sent them', async () => {
		const el = await mount(CHART);
		const cols = root(el).querySelectorAll('[part~="pillar"]');
		expect(cols.length).toBe(4);
		const headings = [...cols].map((c) =>
			c.querySelector('.pos')?.textContent?.trim(),
		);
		expect(headings).toEqual(['Year', 'Month', 'Day', 'Hour']);
	});

	/**
	 * The stem sits ABOVE the branch it is read with, in every published chart. This is the one
	 * structural fact a practitioner reads first, and getting it upside down would pass every
	 * count and every text assertion.
	 */
	test('the stem is drawn above the branch in every column', async () => {
		const el = await mount(CHART);
		for (const col of root(el).querySelectorAll('[part~="pillar"]')) {
			const chars = [...col.querySelectorAll('.hanzi')];
			expect(chars.length).toBe(2);
			const [stemEl, branchEl] = chars;
			expect(
				stemEl?.compareDocumentPosition(branchEl as Node) &
					Node.DOCUMENT_POSITION_FOLLOWING,
			).toBeTruthy();
			expect(branchEl?.classList.contains('hanzi-branch')).toBe(true);
		}
	});

	/** The day stem IS the Day Master, so the day column is the one that carries the mark. */
	test('only the day column is marked as the self', async () => {
		const el = await mount(CHART);
		const marked = [...root(el).querySelectorAll('[part~="pillar"]')].filter(
			(c) => c.classList.contains('pillar-self'),
		);
		expect(marked.length).toBe(1);
		expect(marked[0]?.querySelector('.pos')?.textContent?.trim()).toBe('Day');
	});

	test('the stems a branch stores render in rank order with their rank', async () => {
		const el = await mount(CHART);
		const rows = [
			...(root(el)
				.querySelector('[part~="pillar"]')
				?.querySelectorAll('.hidden li') ?? []),
		];
		expect(rows.length).toBe(3);
		expect(
			rows.map((r) => r.querySelector('.role')?.textContent?.trim()),
		).toEqual(['principal', 'middle', 'residual']);
		expect(rows[0]?.textContent).toContain('丙');
	});
});

describe('the chart reads against itself the way a practitioner checks it', () => {
	/**
	 * The five counts divide the EIGHT characters of the chart, four stems and four branch
	 * elements, one point each. A bar set that does not add to eight is drawing a different
	 * quantity from the one the response named, which no per-row assertion can see.
	 */
	test('the element counts account for all eight characters', async () => {
		const total = CHART.fiveElements.reduce((n, r) => n + r.count, 0);
		expect(total).toBe(CHART.pillars.length * 2);
		const el = await mount(CHART);
		const rows = root(el).querySelectorAll('[part~="elements"] .element');
		expect(rows.length).toBe(5);
		// Every bar is a share of the whole chart, so the widths add to 100%.
		const widths = [...rows].map((r) => {
			const style =
				r.querySelector('.element-fill')?.getAttribute('style') ?? '';
			return Number.parseFloat(style.replace(/[^\d.]/g, '')) || 0;
		});
		expect(Math.round(widths.reduce((a, b) => a + b, 0))).toBe(100);
	});

	test('an interaction is tinted by the quality the response gave it', async () => {
		const el = await mount(CHART);
		const tags = root(el).querySelectorAll('[part~="interactions"] .tag');
		expect(tags.length).toBe(2);
		expect(tags[0]?.classList.contains('tag-challenging')).toBe(true);
		expect(tags[1]?.classList.contains('tag-harmonious')).toBe(true);
	});

	/**
	 * Three school rules decide a chart outright for a birth near a boundary, and a chart that
	 * does not name them cannot be independently verified.
	 */
	test('the conventions the chart was cast under all print', async () => {
		const el = await mount(CHART);
		const caption = root(el).querySelector('.roxy-frame')?.textContent ?? '';
		expect(caption).toContain('li-chun');
		expect(caption).toContain('split-zi');
		expect(caption).toContain('clock');
	});
});

describe('hide-readings', () => {
	test('every character, count, interaction and convention stays', async () => {
		const el = await mount(CHART, { 'hide-readings': '' });
		const body = text(el);
		for (const kept of [
			'己',
			'巳',
			'庚',
			'Wood',
			'Earth',
			'丁癸沖',
			'li-chun',
		]) {
			expect(
				body,
				`hide-readings removed ${kept}, which is chart data`,
			).toContain(kept);
		}
		expect(root(el).querySelectorAll('[part~="pillar"]').length).toBe(4);
	});

	test('every written reading goes', async () => {
		const el = await mount(CHART, { 'hide-readings': '' });
		const body = text(el);
		for (const gone of [
			'ZZREADINGSUMMARY',
			'ZZREADINGNATURE',
			'ZZREADINGWOOD',
			'ZZREADINGCLASH',
		]) {
			expect(body).not.toContain(gone);
		}
	});

	test('all of it renders by default', async () => {
		const el = await mount(CHART);
		const body = text(el);
		for (const shown of [
			'ZZREADINGSUMMARY',
			'ZZREADINGNATURE',
			'ZZREADINGWOOD',
			'ZZREADINGCLASH',
		]) {
			expect(body).toContain(shown);
		}
	});
});
