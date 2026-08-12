import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

/**
 * The published part vocabulary, proved against a real cascade.
 *
 * @remarks
 * `catalog.test.ts` proves the catalog matches the SOURCE. It cannot prove the
 * names work, because happy-dom implements no `::part()` and no real cascade, so
 * a unit test can assert a `part` attribute exists and never that a rule written
 * outside the shadow root reaches the element inside it. That is the entire
 * value of the attribute, and the half a consumer depends on.
 *
 * Two directions are checked here, and they fail for different reasons:
 *
 * - One rule, every component. A consumer writes `::part(aspects)` once and
 *   expects it to reach every block that IS the aspects. This is the regression
 *   the vocabulary work was done for: the natal chart used to expose that block
 *   only as `aspect-grid`, so a rule written against the aspects table silently
 *   missed the chart on the same page.
 * - The catalog does not over-promise. Every part name a component actually
 *   renders must be one the catalog publishes, read out of the live shadow root
 *   rather than out of the source the catalog was scanned from.
 */

const CATALOG = JSON.parse(
	readFileSync('packages/ui/components-catalog.json', 'utf8'),
) as {
	components: Array<{ tag: string; slug: string; parts: string[] }>;
};

/**
 * The class the rule hangs off. The WordPress plugin puts it on every component
 * it renders and emits exactly one `.roxyapi-component::part(NAME){display:none}`
 * per hidden section, so this is that rule and not a test-shaped approximation
 * of it.
 */
const HOST_CLASS = 'roxyapi-component';

/** Wait for the showcase to populate. `page.js` assigns `data` after fetching the sample bundle, so a bare `goto` lands before the first render. */
async function showcase(page: import('@playwright/test').Page) {
	await page.goto('/');
	await page.waitForFunction(
		() =>
			[...document.querySelectorAll('*')].filter(
				(n) =>
					n.tagName.startsWith('ROXY-') &&
					(n as HTMLElement & { data?: unknown }).data != null,
			).length > 40,
	);
}

/**
 * Reveal a part that a component only draws in a non-default state, and find the
 * element carrying it however deep it sits.
 *
 * @remarks
 * Two components put their aspects behind a tab, and one does not own the block
 * at all: `roxy-relocation-wheel` nests `roxy-natal-chart` and re-exposes its
 * parts with `exportparts`. So the search opens every tab it finds and descends
 * through nested shadow roots. Tabs are clicked rather than state set through the
 * private field on purpose: a part a visitor cannot reach is not a part.
 */
async function reveal(
	page: import('@playwright/test').Page,
	tag: string,
	part: string,
): Promise<boolean> {
	return page.evaluate(
		async ([sel, name]) => {
			type El = HTMLElement & { updateComplete?: Promise<unknown> };
			const host = document.querySelector(sel) as El | null;
			if (!host) return false;
			const walk = async (el: El, depth: number): Promise<boolean> => {
				const root = el.shadowRoot;
				if (!root || depth > 3) return false;
				const hit = () => Boolean(root.querySelector(`[part~="${name}"]`));
				if (hit()) return true;
				for (const tab of root.querySelectorAll<HTMLElement>('[role="tab"]')) {
					tab.click();
					await el.updateComplete;
					if (hit()) return true;
				}
				for (const child of root.querySelectorAll<El>('*')) {
					if (!child.tagName.startsWith('ROXY-')) continue;
					await child.updateComplete;
					if (await walk(child, depth + 1)) return true;
				}
				return false;
			};
			return walk(host, 0);
		},
		[tag, part] as const,
	);
}

test('one ::part(aspects) rule reaches every component that renders aspects', async ({
	page,
}) => {
	await showcase(page);

	const claimed = CATALOG.components
		.filter((c) => c.parts.includes('aspects'))
		.map((c) => c.tag)
		.sort();
	// Guards the test itself: if the vocabulary regressed to one component, the
	// assertions below would pass while proving nothing.
	expect(claimed.length).toBeGreaterThan(1);

	// `/relocation` returns no aspects, so the showcase sample cannot exercise the
	// one component that does not own the block: `roxy-relocation-wheel` nests the
	// natal chart and re-exposes its parts. Seeding the natal sample's aspects
	// onto it is the only way to prove the `exportparts` forward reaches a real
	// element, and that forward is the hand-written list that was already found
	// stale once, so it is worth proving rather than skipping.
	await page.evaluate(async () => {
		type El = HTMLElement & {
			data?: Record<string, unknown>;
			updateComplete?: Promise<unknown>;
		};
		const natal = document.querySelector('roxy-natal-chart') as El;
		const wheel = document.querySelector('roxy-relocation-wheel') as El;
		if (!natal?.data || !wheel?.data) return;
		wheel.data = { ...wheel.data, aspects: natal.data.aspects };
		await wheel.updateComplete;
	});

	const revealed: string[] = [];
	for (const tag of claimed) {
		if (await reveal(page, tag, 'aspects')) revealed.push(tag);
	}

	// Every component the catalog promises must be present on the showcase AND
	// have drawn the block. A claim nothing renders is the failure mode the
	// catalog exists to prevent, so it fails here rather than being skipped.
	expect(revealed).toEqual(claimed);

	await page.evaluate(
		([tags, cls]) => {
			for (const tag of tags)
				(document.querySelector(tag) as HTMLElement).classList.add(cls);
		},
		[claimed, HOST_CLASS] as const,
	);
	await page.addStyleTag({
		content: `.${HOST_CLASS}::part(aspects) { display: none; }`,
	});

	const measured = await page.evaluate((tags) => {
		const find = (el: HTMLElement, depth: number): HTMLElement | null => {
			const root = el.shadowRoot;
			if (!root || depth > 3) return null;
			const own = root.querySelector('[part~="aspects"]') as HTMLElement | null;
			if (own) return own;
			for (const child of root.querySelectorAll('*')) {
				if (!child.tagName.startsWith('ROXY-')) continue;
				const deeper = find(child as HTMLElement, depth + 1);
				if (deeper) return deeper;
			}
			return null;
		};
		return tags.map((tag) => {
			const host = document.querySelector(tag) as HTMLElement;
			const aspects = find(host, 0) as HTMLElement;
			// Control: every one of these also exposes a header, which the rule must
			// leave alone. Without it a stylesheet that hid everything would pass.
			const header = (host.shadowRoot as ShadowRoot).querySelector(
				'[part~="header"]',
			) as HTMLElement | null;
			return {
				tag,
				aspects: getComputedStyle(aspects).display,
				header: header ? getComputedStyle(header).display : 'absent',
			};
		});
	}, claimed);

	for (const row of measured) {
		expect({ tag: row.tag, aspects: row.aspects }).toEqual({
			tag: row.tag,
			aspects: 'none',
		});
		expect({ tag: row.tag, header: row.header }).not.toEqual({
			tag: row.tag,
			header: 'none',
		});
	}
});

/**
 * The one component whose part names are derived at runtime from the response
 * keys, so the scan cannot enumerate them and the catalog publishes only the
 * static ones. Documented in `component-parts.ts` and pinned as the sole
 * exception by `catalog.test.ts`; repeated here because this is the assertion it
 * would otherwise break.
 */
const DYNAMIC = new Set(['roxy-reference-card']);

test('a component renders no part name the catalog does not publish', async ({
	page,
}) => {
	await showcase(page);

	const published = Object.fromEntries(
		CATALOG.components.map((c) => [c.tag, c.parts]),
	);

	const surprises = await page.evaluate(
		([byTag, dynamic]) => {
			const rows: Array<{ tag: string; extra: string[] }> = [];
			for (const host of document.querySelectorAll('*')) {
				const tag = host.tagName.toLowerCase();
				const root = (host as HTMLElement).shadowRoot;
				if (!root || !(tag in (byTag as Record<string, string[]>))) continue;
				if ((dynamic as string[]).includes(tag)) continue;
				const known = new Set((byTag as Record<string, string[]>)[tag]);
				const seen = new Set<string>();
				for (const el of root.querySelectorAll('[part]')) {
					for (const name of (el.getAttribute('part') ?? '').split(/\s+/)) {
						if (name && !known.has(name)) seen.add(name);
					}
				}
				if (seen.size > 0) rows.push({ tag, extra: [...seen].sort() });
			}
			return rows;
		},
		[published, [...DYNAMIC]] as const,
	);

	expect(surprises).toEqual([]);
});
