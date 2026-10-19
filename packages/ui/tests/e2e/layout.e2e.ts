import { expect, test } from '@playwright/test';
import nakshatras from '../../../../specs/fixtures/nakshatras.json' with {
	type: 'json',
};
import { demosRendered, localeLoaded } from './helpers';

/**
 * Layout audit across every demo section: no card may overflow its own host, and no
 * box may clip its own content.
 *
 * @remarks
 * This exists because `roxy-hd-connection` shipped a card that blew 315px past its
 * own border, clipping the fact tiles, the lead paragraph, the centers and the last
 * table column, and NOTHING else caught it: the content audit passed (no
 * `[object Object]`), the e2e passed, and axe passed in both themes. A card can be
 * perfectly correct and perfectly unreadable.
 *
 * The cause is worth knowing, because it is a whole class of bug: a `display: grid`
 * card gets an implicit `auto` column, an `auto` column takes its MINIMUM from
 * min-content, and the min-content of a `white-space: nowrap` table is far wider
 * than the card. The column blows out and drags every sibling with it. The fix is
 * `grid-template-columns: minmax(0, 1fr)` plus `min-width: 0` on the scroll box.
 *
 * Run at every WIDTH, not just the default. The first version of this spec only
 * ever ran at the Playwright desktop default, and the three configured projects
 * are all desktop, so the whole class simply moved to phone width: `guna-milan`
 * clipped its Score column off the card and `local-space-compass` put its header,
 * dial, summary and table 170px past the edge, both invisible to a green run. A
 * card that is only correct at 1280px is not shippable for an embed library.
 */
const WIDTHS = [
	{ label: 'phone', width: 375, height: 900 },
	{ label: 'tablet', width: 768, height: 1024 },
	{ label: 'desktop', width: 1280, height: 900 },
];

for (const vp of WIDTHS) {
	test(`no section overflows its host or clips its content at ${vp.label} (${vp.width}px)`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: vp.width, height: vp.height });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await demosRendered(page);

		const issues = await page.evaluate(() => {
			/** Self-fetching widgets render only an input until the user acts. They are legitimately short. */
			const ALLOW_SHORT = new Set(['loc', 'form']);
			const demos =
				(window as unknown as { ROXY_UI_DEMOS?: { id: string }[] })
					.ROXY_UI_DEMOS ?? [];
			const found: string[] = [];

			for (const d of demos) {
				const host = document.getElementById(d.id);
				if (!host) {
					found.push(`${d.id}: host missing`);
					continue;
				}
				const sr = (host as HTMLElement & { shadowRoot?: ShadowRoot | null })
					.shadowRoot;
				if (!sr) continue;

				const hostRect = host.getBoundingClientRect();
				if (hostRect.height < 40 && !ALLOW_SHORT.has(d.id)) {
					found.push(
						`${d.id}: renders almost nothing (${Math.round(hostRect.height)}px tall)`,
					);
				}

				// Every element in the host's shadow root AND in the shadow roots nested
				// inside it: a component in self-fetch mode draws its form in a second
				// root, and a walk that stops at the first cannot see the form overflow.
				const deep = (root: ShadowRoot): HTMLElement[] =>
					[...root.querySelectorAll('*')].flatMap((el) => [
						el as HTMLElement,
						...((el as HTMLElement).shadowRoot
							? deep((el as HTMLElement).shadowRoot as ShadowRoot)
							: []),
					]);
				for (const e of deep(sr)) {
					const r = e.getBoundingClientRect();
					if (r.width === 0) continue;
					// 2px of tolerance for sub-pixel rounding.
					if (r.right <= hostRect.right + 2) continue;

					// An ancestor that scrolls horizontally is doing its job, not overflowing.
					let p: HTMLElement | null =
						e.parentElement ??
						((e.getRootNode() as ShadowRoot).host as HTMLElement);
					let scrollable = false;
					while (p && p !== host) {
						const ox = getComputedStyle(p).overflowX;
						if (ox === 'auto' || ox === 'scroll') {
							scrollable = true;
							break;
						}
						// Step out of a nested shadow root to its host and keep climbing.
						p =
							p.parentElement ??
							((p.getRootNode() as ShadowRoot).host as HTMLElement | null);
						if (p === host) break;
					}
					if (!scrollable) {
						found.push(
							`${d.id}: ${e.tagName.toLowerCase()}.${e.className || '?'} overflows the card by ${Math.round(r.right - hostRect.right)}px`,
						);
						break;
					}
				}
			}
			return found;
		});

		expect(issues, `${vp.label}: ${issues.join('\n')}`).toEqual([]);
	});
}

/**
 * The same three widths, asked of the DOCUMENT rather than of each host.
 *
 * @remarks
 * The check above measures a card against its own host, which is the shape it was
 * written for and is structurally blind to the one an embedder hits first: a page
 * that scrolls sideways passes it as long as every card is individually contained.
 * The showcase constrains its demo cards, so a component that blows out a BARE
 * consumer page (a WordPress post, a plain HTML embed) is exactly the case the
 * per-host walk cannot see, and that is the most common way these components ship.
 *
 * `scrollWidth === clientWidth` on the root element is the whole assertion, but on THIS
 * page it is worth nothing until the showcase stops clipping: `article.demo-card` is
 * `overflow: hidden`, so a 900px node injected into a card's shadow root moves that
 * card's `scrollWidth` to 920 and the document's not at all. Measured, all three
 * widths. A gate that cannot fail for the case it was written for is worse than no
 * gate, so every LIGHT-DOM ancestor of a demo host is unclipped first, which is what a
 * bare consumer page looks like. Nothing inside a shadow root is touched, and a code
 * block or a scroll box that clips on its own keeps clipping, so the only thing that
 * can reach the document is a component pushing past the viewport.
 *
 * Unclip BOTH axes. `overflow-x: visible` beside a non-visible `overflow-y` computes
 * to `auto`, so the box turns into a scroller and swallows the overflow exactly as the
 * `hidden` did, which is how the first version of this test measured clean against an
 * injected 900px div.
 *
 * The walk that follows a failure is diagnostics only: it names the widest nodes past
 * the viewport, worst first, so the message names a component rather than leaving the
 * reader to bisect the page by hand. It skips a node an ancestor still contains either
 * way, scrolled OR clipped, since neither can be what moved the document. Read the list
 * as suspects rather than as findings: the assertion is the number in front of it.
 */
for (const vp of WIDTHS) {
	test(`the page itself does not scroll sideways at ${vp.label} (${vp.width}px)`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: vp.width, height: vp.height });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await demosRendered(page);

		const issues = await page.evaluate(async () => {
			const demos =
				(window as unknown as { ROXY_UI_DEMOS?: { id: string }[] })
					.ROXY_UI_DEMOS ?? [];
			for (const d of demos) {
				let p = document.getElementById(d.id)?.parentElement ?? null;
				while (p) {
					if (getComputedStyle(p).overflowX !== 'visible')
						p.style.overflow = 'visible';
					p = p.parentElement;
				}
			}
			await new Promise((r) => setTimeout(r, 300));

			const root = document.documentElement;
			const overflow = root.scrollWidth - root.clientWidth;
			if (overflow <= 0) return [];

			const limit = root.clientWidth;
			const widest: { label: string; over: number }[] = [];
			const walk = (node: ParentNode, owner: string) => {
				for (const el of node.querySelectorAll('*')) {
					const e = el as HTMLElement & { shadowRoot?: ShadowRoot | null };
					const tag = e.tagName.toLowerCase();
					const label = tag.startsWith('roxy-') ? tag : owner;
					if (e.shadowRoot) walk(e.shadowRoot, label);
					const r = e.getBoundingClientRect();
					if (r.width === 0 || r.right <= limit + 2) continue;
					let p: HTMLElement | null = e.parentElement;
					let contained = false;
					while (p && p !== (node as unknown as HTMLElement)) {
						if (getComputedStyle(p).overflowX !== 'visible') {
							contained = true;
							break;
						}
						p = p.parentElement;
					}
					if (!contained) {
						widest.push({
							label: `${label} ${tag}.${e.className || '?'}`,
							over: Math.round(r.right - limit),
						});
					}
				}
			};
			walk(document.body, 'document');

			const named = widest
				.sort((a, b) => b.over - a.over)
				.slice(0, 5)
				.map((w) => `${w.label} (+${w.over}px)`);
			return [
				`page scrolls ${overflow}px sideways (scrollWidth ${root.scrollWidth} vs clientWidth ${limit}); widest: ${named.join(', ') || 'no uncontained node found, check a margin or a transform'}`,
			];
		});

		expect(issues, `${vp.label}: ${issues.join('\n')}`).toEqual([]);
	});
}

/**
 * The same overflow check, but against LONG content rather than the demo fixtures.
 *
 * @remarks
 * The fixtures are whatever a sample call happened to return, so a field can be short in the capture and long in production. `roxy-angel-number-card` shipped a hero that overhung its card by 5px for number 1111, whose live title is "Spiritual Awakening, Manifestation, and Alignment", while the shorter captured title fit and the gate stayed green. It only surfaced on a real WordPress page.
 *
 * Rewriting every fixture is not the fix. Inflating the title-ish fields in place covers the whole library in one pass and keeps the fixtures honest about what the API actually returned.
 */
test('no section overflows when its text fields are long', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 900 });
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	await demosRendered(page);

	const issues = await page.evaluate(async () => {
		const LONG =
			'Spiritual Awakening, Manifestation, and Alignment With Higher Purpose';
		const TEXTY = /^(title|name|phase|label|heading)$/i;
		const bloat = (v: unknown, depth = 0): unknown => {
			if (depth > 3 || v === null || typeof v !== 'object') return v;
			if (Array.isArray(v)) return v.map((x) => bloat(x, depth + 1));
			const out: Record<string, unknown> = {};
			for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
				out[k] =
					typeof val === 'string' && TEXTY.test(k) && val.length < 30
						? LONG
						: bloat(val, depth + 1);
			}
			return out;
		};

		type Host = HTMLElement & {
			shadowRoot?: ShadowRoot | null;
			data?: unknown;
		};
		const hosts = ([...document.querySelectorAll('*')] as Host[]).filter(
			(e) => e.tagName.startsWith('ROXY-') && e.shadowRoot && e.data,
		);
		for (const h of hosts) {
			try {
				h.data = bloat(structuredClone(h.data));
			} catch {
				// A fixture holding something structuredClone cannot copy stays as-is.
			}
		}
		await new Promise((r) => setTimeout(r, 1200));

		const found: string[] = [];
		for (const h of hosts) {
			const hostRect = h.getBoundingClientRect();
			if (hostRect.width === 0) continue;
			const walk = (root: ParentNode) => {
				for (const el of root.querySelectorAll('*')) {
					const e = el as HTMLElement & {
						shadowRoot?: ShadowRoot | null;
						ownerSVGElement?: SVGSVGElement | null;
					};
					if (e.shadowRoot) walk(e.shadowRoot);
					// Nodes INSIDE a chart are skipped, and the `<svg>` itself is not
					// (ownerSVGElement is null on the root), so a chart overhanging its
					// card is still caught. A label slot is sized for a glyph, and a 68
					// character planet name is not a case the API can produce. It is
					// exactly what this harness manufactures, though: a body with no
					// glyph deliberately renders its FULL name so a lookup miss is
					// visibly wrong instead of a plausible two-letter code, and bloating
					// every `name` field turns every body into a miss.
					if (e.ownerSVGElement) continue;
					const r = e.getBoundingClientRect();
					if (r.width === 0) continue;
					if (r.right <= hostRect.right + 2) continue;
					let p: HTMLElement | null =
						e.parentElement ??
						((e.getRootNode() as ShadowRoot).host as HTMLElement);
					let scrollable = false;
					while (p && p !== h) {
						const ox = getComputedStyle(p).overflowX;
						if (ox === 'auto' || ox === 'scroll') {
							scrollable = true;
							break;
						}
						p =
							p.parentElement ??
							((p.getRootNode() as ShadowRoot).host as HTMLElement);
					}
					if (!scrollable) {
						found.push(
							`${h.tagName.toLowerCase()}: ${e.tagName.toLowerCase()}.${e.className || '?'} overflows by ${Math.round(r.right - hostRect.right)}px`,
						);
						break;
					}
				}
			};
			walk(h.shadowRoot as ShadowRoot);
		}
		return found;
	});

	// Chart internals are excluded inside the walk, not filtered out here, so an
	// excluded node cannot mask a real offender further down the same subtree.
	expect(issues, issues.join('\n')).toEqual([]);
});

/**
 * A grid plate is as wide as the card it sits in, at every width.
 *
 * @remarks
 * The checks above ask whether a box overflows. A plate that stops SHORT of its card passes all of
 * them and is the other half of the same contract: a component is `display: block` and fills its
 * host, so the consumer sizes the host, and the figure a card is read off spans the card rather than
 * a width this library picked. A rem cap on a nine-palace plate is invisible to an overflow gate,
 * to axe and to the preview check, because a smaller box is never a broken box.
 *
 * `part="plate"` is the marker, published in `components-catalog.json` like every other part name, so
 * the walk finds the plates rather than guessing which grids qualify: `part="chart"` also names an
 * image, a hexagram figure and a score meter, none of which fill anything. The tag list is asserted
 * in both directions for the same reason `hide-readings` asserts its own: a marker that can be
 * dropped silently makes the measurement below vacuous, and a new plate joins the rule deliberately.
 *
 * Measured against the card CONTENT box, since the card owns the padding the plate sits inside.
 */
const PLATE_TAGS = ['roxy-flying-star-chart', 'roxy-kua-card'];

for (const vp of WIDTHS) {
	test(`every grid plate fills its card at ${vp.label} (${vp.width}px)`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: vp.width, height: vp.height });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await demosRendered(page);

		const found = await page.evaluate(() => {
			const demos =
				(window as unknown as { ROXY_UI_DEMOS?: { id: string }[] })
					.ROXY_UI_DEMOS ?? [];
			const out: { id: string; tag: string; short: number }[] = [];
			for (const d of demos) {
				const host = document.getElementById(d.id);
				const sr = (host as HTMLElement & { shadowRoot?: ShadowRoot | null })
					?.shadowRoot;
				if (!sr) continue;
				for (const el of sr.querySelectorAll('[part~="plate"]')) {
					const plate = el as HTMLElement;
					const card = plate.closest('[part~="card"]') as HTMLElement | null;
					if (!card) {
						out.push({ id: d.id, tag: 'no card', short: 0 });
						continue;
					}
					const cs = getComputedStyle(card);
					const inner =
						card.getBoundingClientRect().width -
						Number.parseFloat(cs.paddingLeft) -
						Number.parseFloat(cs.paddingRight) -
						Number.parseFloat(cs.borderLeftWidth) -
						Number.parseFloat(cs.borderRightWidth);
					out.push({
						id: d.id,
						tag: (host as HTMLElement).tagName.toLowerCase(),
						// 1px of tolerance for sub-pixel rounding.
						short: Math.round(inner - plate.getBoundingClientRect().width),
					});
				}
			}
			return out;
		});

		expect(
			[...new Set(found.map((f) => f.tag))].sort(),
			`${vp.label}: the set of components publishing part="plate" moved`,
		).toEqual([...PLATE_TAGS].sort());

		const narrow = found
			.filter((f) => f.short > 1)
			.map((f) => `${f.id} (${f.tag}) plate is ${f.short}px short of its card`);
		expect(narrow, `${vp.label}: ${narrow.join('\n')}`).toEqual([]);
	});
}

/**
 * Every element inside a plate cell fits the cell, in the two languages that spell it longest.
 *
 * @remarks
 * The plate-fill check above asks whether the PLATE fills its card; this asks the opposite question
 * one level in, whether the CONTENTS of one of the plate's own cells stay inside it. Neither test
 * can stand in for the other: a cell's children can overflow it while the plate itself still sits
 * flush with the card, because a grid cell's own box does not grow past its track just because the
 * text inside it wants to. That is exactly what shipped twice over: `roxy-kua-card` and
 * `roxy-flying-star-chart` first clipped `SOUTHWEST` and `NORTHWEST` at phone width, and once that
 * heading was fixed, the same cell was still cropping the domain phrase and the rank underneath it,
 * because a heading fitting its cell says nothing about the sibling elements below it.
 *
 * So this reads every element the cell actually has, not one name of it: `scrollWidth` against
 * `clientWidth` catches an element wider than its OWN box (the heading case), and the bounding-rect
 * comparison against the CELL catches one that fits itself but still spills past the cell it sits
 * in (a wide child centered or absolutely offset inside a narrower parent, which the first check
 * alone cannot see). A "cell" is a direct child of the `part="plate"` element, which is exactly the
 * `roxy-flying-star-chart` 3x3 grid cell and the `roxy-kua-card` row it stacks into below 30rem;
 * the walk does not care which shape produced it.
 *
 * German and Hindi are both under test because they are this catalogue's longest compass spellings
 * on two different scripts and two different wrapping rules (Latin with no break at all, Devanagari
 * with a hyphen); a check run in only one script could pass on an accident of that script's own
 * average glyph width. Sabotage-verified by reinstating a fixed, narrow cell width: re-narrowing
 * turns this from a pass to a fail without touching any text, which is what proves the assertion
 * reads the box rather than the word.
 */
const PLATE_LANGS = ['de', 'hi'];

for (const lang of PLATE_LANGS) {
	test(`every element inside a plate cell stays inside it at phone width (375px), in ${lang}`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: 375, height: 900 });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.selectOption('#lang-select', lang);
		await expect
			.poll(() => page.evaluate(() => document.documentElement.lang))
			.toBe(lang);
		await localeLoaded(page, lang);
		await demosRendered(page);

		const found = await page.evaluate(() => {
			const demos =
				(window as unknown as { ROXY_UI_DEMOS?: { id: string }[] })
					.ROXY_UI_DEMOS ?? [];
			const out: string[] = [];
			const tags = new Set<string>();
			// 1px of tolerance for sub-pixel rounding, the same margin the plate-fill
			// check above gives itself.
			const TOLERANCE = 1;
			for (const d of demos) {
				const host = document.getElementById(d.id);
				const sr = (host as HTMLElement & { shadowRoot?: ShadowRoot | null })
					?.shadowRoot;
				if (!sr) continue;
				const tag = (host as HTMLElement).tagName.toLowerCase();
				for (const plate of sr.querySelectorAll('[part~="plate"]')) {
					tags.add(tag);
					// A cell is a direct child of the plate: one grid cell in the 3x3
					// shape, one row once a plate stacks. Cells hidden by their own
					// container query (display: none, the kua centre below 30rem) carry
					// a zero rect and are skipped rather than measured as a false empty.
					for (const cell of Array.from(plate.children)) {
						const cellEl = cell as HTMLElement;
						const cellRect = cellEl.getBoundingClientRect();
						if (cellRect.width === 0 && cellRect.height === 0) continue;
						const walk = (node: Element) => {
							for (const child of Array.from(node.children)) {
								const el = child as HTMLElement;
								const label = `${d.id} (${tag}): "${el.textContent?.trim()}"`;
								const selfOverflow = el.scrollWidth - el.clientWidth;
								if (selfOverflow > TOLERANCE) {
									out.push(
										`${label} is ${selfOverflow}px wider than its own box`,
									);
								}
								const elRect = el.getBoundingClientRect();
								const leftSpill = cellRect.left - elRect.left;
								const rightSpill = elRect.right - cellRect.right;
								if (leftSpill > TOLERANCE) {
									out.push(
										`${label} sits ${Math.round(leftSpill)}px left of its cell`,
									);
								}
								if (rightSpill > TOLERANCE) {
									out.push(
										`${label} sits ${Math.round(rightSpill)}px right of its cell`,
									);
								}
								walk(el);
							}
						};
						walk(cellEl);
					}
				}
			}
			return { out, tags: [...tags].sort() };
		});

		// Not vacuous: the walk actually found plates to measure on both plate
		// components, so an empty result means every one of them fit rather than
		// meaning the selector matched nothing.
		expect(
			found.tags,
			'the set of components this walk actually measured',
		).toEqual([...PLATE_TAGS].sort());
		expect(found.out, found.out.join('\n')).toEqual([]);
	});
}

/**
 * A label column, library-wide, never takes more than roughly a quarter of the row it labels.
 *
 * @remarks
 * `--roxy-label-col` (`utils/base-styles.ts`) is the one place this ratio is stated, and every
 * label-plus-value row in the library reads it instead of a bespoke rem or an unconstrained `auto`
 * or `max-content` track: `roxy-kua-card` and `roxy-flying-star-chart`'s per-sector reading,
 * `roxy-dosha-constitution`'s per-factor weight, `roxy-horoscope-card`'s dated events (both its
 * topic rows and its key-dates `dl`), `roxy-dasha-timeline`'s per-planet bar, `roxy-bazi-chart`'s
 * per-element bar, `roxy-almanac-day`'s per-day row, `roxy-forecast-digest`'s per-event date, and
 * `roxy-kp-ruling-planets`'s lord table. A translated direction or a year-qualified date ran wider
 * in German than in Hindi and pushed the value column toward half the row at phone width before this
 * cap existed; `part="label-track"` is the marker every one of those rows carries so the walk finds
 * them rather than guessing which grids qualify, the same contract `part="plate"` gives the check
 * above.
 *
 * Not every two-column row in the library is a label-plus-value row, and capping one that is not
 * would be the same class of bug as the one this guards against: `roxy-compatibility-card`'s
 * breakdown key, `roxy-biorhythm-chart`'s cycle name and `roxy-shadbala-table`'s planet-plus-badge
 * label are fixed, untranslated, English-only strings that already fit their historical rem width
 * in every locale tested, and capping them to a quarter clipped "intellectual" and the rank badge
 * instead of fixing anything, since nothing there grows with translation. They deliberately do NOT
 * carry `part="label-track"` and are absent from `LABEL_TRACK_TAGS` below on purpose.
 *
 * `roxy-data`'s generic `dl.roxy-rows` also carries the part (its own `minmax(8ch, min(25%,
 * max-content))` track, tightened from 30% to the same 25% ceiling here) but is excluded from the
 * ratio measurement itself: Chromium does not reliably resolve a `min()`-of-`max-content` track back
 * into a second numeric `gridTemplateColumns` value, so `getComputedStyle` cannot be read the same
 * way for it. The existing overflow checks above still cover it end to end.
 *
 * Measured in Hindi, this catalogue's longest translated vocabulary, at all three widths: the ratio
 * itself does not change much across widths (a percentage track), but a component that only stacks
 * below 30rem (kua, flying-star, dosha) drops out of the two-column shape entirely at 375px, which
 * is why the tag list below is asserted per width rather than once. ~0.26 rather than exactly 0.25
 * is the accepted ceiling: a percentage grid track resolves against the row's full available space
 * INCLUDING its gap, while this check's ratio divides by the two tracks' own pixel widths only
 * (excluding the gap), so `minmax(0, 25%)` measures a few points over 0.25 by construction; verified
 * unchanging between German and Hindi, which is what proves it is that arithmetic and not a
 * translation-driven regression.
 *
 * Sabotage-verified by reverting one row's track to its old unbounded `auto`: the ratio for that tag
 * alone jumped past the ceiling and the assertion failed, confirming the check reads the live layout
 * rather than passing on an empty selector.
 */
/**
 * Tags this walk actually measures a ratio for, not every tag the catalog lists
 * against "label-track": `roxy-data` carries the part (see the doc comment above)
 * but is skipped before `tags.add` runs, since its track never resolves to a
 * second numeric value here, so it is deliberately absent from this list too.
 */
const LABEL_TRACK_TAGS = [
	'roxy-almanac-day',
	'roxy-bazi-chart',
	'roxy-dasha-timeline',
	'roxy-dosha-constitution',
	'roxy-flying-star-chart',
	'roxy-forecast-digest',
	'roxy-horoscope-card',
	'roxy-kp-ruling-planets',
	'roxy-kua-card',
];

const LABEL_TRACK_RATIO_CEILING = 0.3;

for (const vp of WIDTHS) {
	test(`no label track exceeds a quarter of its row at ${vp.label} (${vp.width}px), in hi`, async ({
		page,
	}) => {
		await page.setViewportSize({ width: vp.width, height: vp.height });
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		await page.selectOption('#lang-select', 'hi');
		await expect
			.poll(() => page.evaluate(() => document.documentElement.lang))
			.toBe('hi');
		await localeLoaded(page, 'hi');
		await demosRendered(page);

		const found = await page.evaluate((ceiling) => {
			const demos =
				(window as unknown as { ROXY_UI_DEMOS?: { id: string }[] })
					.ROXY_UI_DEMOS ?? [];
			const out: string[] = [];
			const tags = new Set<string>();
			for (const d of demos) {
				const host = document.getElementById(d.id);
				const sr = (host as HTMLElement & { shadowRoot?: ShadowRoot | null })
					?.shadowRoot;
				if (!sr) continue;
				const tag = (host as HTMLElement).tagName.toLowerCase();
				for (const track of sr.querySelectorAll('[part~="label-track"]')) {
					const el = track as HTMLElement;
					// roxy-data's dl carries the part but its min()-of-max-content track
					// does not resolve to a second numeric value here; see the doc comment.
					if (tag === 'roxy-data') continue;
					const cs = getComputedStyle(el);
					if (cs.display !== 'grid') continue;
					const cols = cs.gridTemplateColumns
						.split(/\s+/)
						.map(Number.parseFloat)
						.filter((v) => !Number.isNaN(v));
					// Stacked to a single column below the component's own breakpoint: no
					// label track to measure, and correctly so.
					if (cols.length < 2) continue;
					tags.add(tag);
					const total = cols.reduce((a, b) => a + b, 0);
					const ratio = cols[0] / total;
					if (ratio > ceiling) {
						out.push(
							`${d.id} (${tag}): label track is ${Math.round(ratio * 100)}% of its row (${Math.round(cols[0])}px of ${Math.round(total)}px)`,
						);
					}
				}
			}
			return { out, tags: [...tags].sort() };
		}, LABEL_TRACK_RATIO_CEILING);

		// Not vacuous: a component that stacks below 30rem drops out of this walk at
		// phone width, so the expected tag set is narrower there than at tablet/desktop.
		const expectedTags = (
			vp.width <= 480
				? LABEL_TRACK_TAGS.filter(
						(t) =>
							![
								'roxy-kua-card',
								'roxy-flying-star-chart',
								'roxy-dosha-constitution',
							].includes(t),
					)
				: LABEL_TRACK_TAGS
		).sort();
		expect(
			found.tags,
			'the set of components this walk actually measured',
		).toEqual(expectedTags);
		expect(found.out, found.out.join('\n')).toEqual([]);
	});
}

for (const width of [375, 1280]) {
	for (const shape of ['mixed', 'wide', 'nested', 'short'] as const) {
		test(`generic ${shape} table retains readable cells at ${width}px`, async ({
			page,
		}) => {
			await page.setViewportSize({ width, height: 900 });
			await page.goto('/');
			await page.evaluate(async (shape) => {
				await customElements.whenDefined('roxy-data');
				const el = document.createElement('roxy-data') as HTMLElement & {
					data: unknown;
					updateComplete: Promise<boolean>;
				};
				el.id = 'prose-table';
				el.style.width = '100%';
				el.data = [
					{
						name: 'Example',
						characteristics:
							'A detailed description with several sentences gives the reader useful context. The paragraph stays readable beside the other information.',
						remedies: {
							mantras: 'A regular practice offers time to pause and reflect.',
							gemstones: 'Choose a meaningful stone for a personal reminder.',
							rituals: 'Set aside a quiet moment each morning.',
						},
					},
				];
				const rows = el.data as Record<string, unknown>[];
				if (shape === 'wide') el.data = rows.map(({ name, ...rest }) => rest);
				if (shape === 'nested')
					el.data = [
						{
							date: '2026-01-15',
							positions: Array.from({ length: 9 }, (_, i) => ({
								planet: 'Moon',
								longitude: i,
							})),
						},
					];
				if (shape === 'short') el.data = [{ name: 'Example', score: 87 }];
				document.body.replaceChildren(el);
				await el.updateComplete;
			}, shape);
			const measurements = await page
				.locator('#prose-table')
				.evaluate((el, shape) => {
					const cells =
						el.shadowRoot!.querySelectorAll<HTMLTableCellElement>(
							'tbody > tr > td',
						);
					return {
						proseWidth:
							cells[
								shape === 'mixed' ? 1 : shape === 'nested' ? 1 : 0
							].getBoundingClientRect().width,
						nestedWidth:
							cells[shape === 'mixed' ? 2 : 1].getBoundingClientRect().width,
						compactWidth: cells[0].getBoundingClientRect().width,
						rowHeight: cells[0].parentElement!.getBoundingClientRect().height,
						whiteSpace: getComputedStyle(
							cells[shape === 'mixed' ? 1 : shape === 'nested' ? 1 : 0],
						).whiteSpace,
						stacked: el
							.shadowRoot!.querySelector('table')!
							.classList.contains('stacked'),
						layout: getComputedStyle(cells[0]).display,
						scrollWidth:
							el.shadowRoot!.querySelector<HTMLElement>('.roxy-collection')!
								.scrollWidth,
						wrapperWidth:
							el.shadowRoot!.querySelector<HTMLElement>('.roxy-collection')!
								.clientWidth,
						cardWidth: el
							.shadowRoot!.querySelector('[part=card]')!
							.getBoundingClientRect().width,
						hostWidth: el.getBoundingClientRect().width,
						documentWidth: document.documentElement.scrollWidth,
						viewportWidth: document.documentElement.clientWidth,
					};
				}, shape);
			expect(measurements.cardWidth).toBeLessThanOrEqual(
				measurements.hostWidth,
			);
			expect(measurements.documentWidth).toBe(measurements.viewportWidth);
			expect(measurements.stacked).toBe(shape !== 'short');
			if (shape !== 'short') {
				expect(measurements.whiteSpace).toBe('normal');
				expect(measurements.proseWidth).toBeGreaterThan(150);
				expect(measurements.nestedWidth).toBeGreaterThan(150);
				if (width === 375) {
					expect(measurements.layout).toBe('block');
					expect(measurements.scrollWidth).toBeLessThanOrEqual(
						measurements.wrapperWidth + 1,
					);
					expect(measurements.proseWidth).toBeCloseTo(
						measurements.wrapperWidth,
						0,
					);
					expect(measurements.nestedWidth).toBeCloseTo(
						measurements.wrapperWidth,
						0,
					);
				} else if (shape === 'nested')
					expect(measurements.compactWidth).toBeLessThan(150);
				else expect(measurements.rowHeight).toBeLessThan(300);
			} else expect(measurements.layout).toBe('table-cell');
		});
	}
}

for (const vp of WIDTHS) {
	for (const lang of ['en', 'es']) {
		test(`generic collections show rows and support keyboard scrolling at ${vp.label} in ${lang}`, async ({
			page,
		}) => {
			await page.setViewportSize(vp);
			await page.goto(`/preview.html?c=data&lang=${lang}`);
			await page.evaluate(() => customElements.whenDefined('roxy-data'));
			if (lang !== 'en') await localeLoaded(page, lang);
			await page.evaluate(async () => {
				document.body.replaceChildren();
				const rows = Array.from({ length: 39 }, (_, i) => ({
					planet: 'Moon',
					date: '2026-01-07',
					time: '11:23',
					datetime: '2026-01-07T11:23:00',
					direction: 'ascending',
					longitude: i,
					sign: 'Leo',
				}));
				for (const [id, data] of Object.entries({
					named: { events: rows },
					plain: rows,
					short: rows.slice(0, 3),
					prose: rows.map((row) => ({
						...row,
						description:
							'A detailed description with several sentences gives the reader useful context. The paragraph stays readable beside the other information.',
					})),
					deep: { chart: { events: rows } },
				})) {
					const el = document.createElement('roxy-data') as HTMLElement & {
						data: unknown;
						updateComplete: Promise<unknown>;
					};
					el.id = id;
					el.style.maxWidth = '600px';
					el.data = data;
					document.body.append(el);
					await el.updateComplete;
				}
			});
			const named = page.locator('#named');
			await expect(named.locator('tbody > tr')).toHaveCount(39);
			await expect(named.locator('summary')).toHaveCount(1);
			await expect(named.locator('details')).toHaveAttribute('open', '');
			await expect(named.locator('tbody > tr').first()).toBeVisible();
			const scroll = named.locator('.roxy-collection');
			expect(
				await scroll.evaluate((el) => {
					const range = document.createRange();
					range.selectNodeContents(el.querySelector('caption')!);
					const text = range.getBoundingClientRect();
					const box = el.getBoundingClientRect();
					return text.left >= box.left && text.right <= box.right;
				}),
			).toBe(true);
			expect(
				await scroll.evaluate((el) => el.scrollHeight > el.clientHeight),
			).toBe(true);
			expect(
				await scroll.evaluate((el) => el.clientHeight),
			).toBeLessThanOrEqual(512);
			await scroll.focus();
			await page.keyboard.press('End');
			await expect
				.poll(() => scroll.evaluate((el) => el.scrollTop))
				.toBeGreaterThan(0);
			await expect(named.locator('tbody > tr').last()).toBeInViewport();
			await expect(page.locator('#plain details')).toHaveCount(0);
			await expect(page.locator('#plain tbody > tr')).toHaveCount(39);
			await expect(page.locator('#short .roxy-collection.long')).toHaveCount(0);
			await expect(page.locator('#short tbody > tr')).toHaveCount(3);
			const records = page.locator('#prose .roxy-collection').first();
			await expect(records).toHaveAttribute('role', 'list');
			await expect(records).toHaveAttribute(
				'aria-label',
				lang === 'es' ? '39 filas' : '39 rows',
			);
			await expect(records).not.toHaveAttribute('tabindex');
			await expect(records).toHaveCSS('overflow-y', 'visible');
			expect(
				await records.evaluate((el) => {
					el.scrollTop = 100;
					return el.scrollTop;
				}),
			).toBe(0);
			const lastRecord = records.locator('[role="listitem"]').last();
			await lastRecord.scrollIntoViewIfNeeded();
			await expect(lastRecord).toBeInViewport();
			expect(await records.evaluate((el) => el.scrollTop)).toBe(0);
			const count = page.locator('#prose .roxy-collection > p').first();
			await expect(count).toHaveText(lang === 'es' ? '39 filas' : '39 rows');
			if (vp.label === 'phone') {
				const caption = count;
				await expect(caption).toHaveCSS('display', 'block');
				expect(await caption.evaluate((el) => el.clientWidth)).toBeGreaterThan(
					200,
				);
			}
			await expect(page.locator('#deep details')).not.toHaveAttribute(
				'open',
				'',
			);
			await expect(named.locator('caption')).toHaveText(
				lang === 'es' ? '39 filas' : '39 rows',
			);
			expect(
				await page.evaluate(() => {
					window.scrollTo(10000, 0);
					return window.scrollX;
				}),
			).toBe(0);
		});
	}
}

for (const width of [1280, 768, 375]) {
	test(`wide reference collection retains readable records at ${width}px`, async ({
		page,
	}) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('/');
		await page.evaluate(async (data) => {
			await customElements.whenDefined('roxy-data');
			const el = document.createElement('roxy-data') as HTMLElement & {
				data: unknown;
				updateComplete: Promise<boolean>;
			};
			el.id = 'reference-records';
			el.data = data;
			document.body.replaceChildren(el);
			await el.updateComplete;
			await Promise.all(
				[...el.shadowRoot!.querySelectorAll('roxy-data')].map(
					(r) =>
						(r as unknown as { updateComplete: Promise<boolean> })
							.updateComplete,
				),
			);
		}, nakshatras);
		const measured = await page.locator('#reference-records').evaluate((el) => {
			const wrapper =
				el.shadowRoot!.querySelector<HTMLElement>('.roxy-collection')!;
			const records = [...el.shadowRoot!.querySelectorAll('.roxy-record')];
			const issues: string[] = [];
			let maxGap = 0;
			const names: string[] = [];
			for (const record of records) {
				const inner = record.querySelector('roxy-data')!;
				const root = inner.shadowRoot!;
				names.push(root.querySelector('h3')!.textContent!);
				const values = [...root.querySelectorAll<HTMLElement>('dd')];
				for (const value of values)
					if (value.scrollWidth > value.clientWidth + 1)
						issues.push(value.textContent!);
				const occupied = [...root.querySelectorAll('dt, dd')]
					.flatMap((field) => {
						const range = document.createRange();
						range.selectNodeContents(field);
						return [...range.getClientRects()];
					})
					.sort((a, b) => a.top - b.top);
				let bottom = occupied[0].bottom;
				for (const field of occupied.slice(1)) {
					maxGap = Math.max(maxGap, field.top - bottom);
					bottom = Math.max(bottom, field.bottom);
				}
			}
			return {
				names,
				issues,
				maxGap,
				scrollWidth: wrapper.scrollWidth,
				width: wrapper.clientWidth,
				tableCount: el.shadowRoot!.querySelectorAll('table').length,
				overflowY: getComputedStyle(wrapper).overflowY,
				scrollTop: (() => {
					wrapper.scrollTop = 100;
					return wrapper.scrollTop;
				})(),
				maxHeight: getComputedStyle(wrapper).maxBlockSize,
			};
		});
		expect(measured.names).toEqual(nakshatras.map((n) => n.name));
		expect(measured.tableCount).toBe(0);
		expect(measured.maxHeight).toBe('none');
		expect(measured.overflowY).toBe('visible');
		expect(measured.scrollTop).toBe(0);
		expect(measured.issues).toEqual([]);
		expect(measured.maxGap).toBeLessThan(24);
		expect(measured.scrollWidth).toBeLessThanOrEqual(measured.width + 1);
		const last = page.locator('#reference-records [role="listitem"]').last();
		await last.scrollIntoViewIfNeeded();
		await expect(
			last.getByRole('heading', { name: nakshatras.at(-1)!.name, exact: true }),
		).toBeInViewport();
		expect(
			await page
				.locator('#reference-records .roxy-collection')
				.first()
				.evaluate((el) => el.scrollTop),
		).toBe(0);
		await page.locator('#reference-records').locator('summary').first().click();
		await expect(
			page
				.locator('#reference-records')
				.getByText(nakshatras[0].remedies.mantras, { exact: true }),
		).toBeVisible();
	});
}
