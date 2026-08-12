import { expect, test } from '@playwright/test';

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
		await page.waitForTimeout(800);

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

				for (const el of sr.querySelectorAll('*')) {
					const e = el as HTMLElement;
					const r = e.getBoundingClientRect();
					if (r.width === 0) continue;
					// 2px of tolerance for sub-pixel rounding.
					if (r.right <= hostRect.right + 2) continue;

					// An ancestor that scrolls horizontally is doing its job, not overflowing.
					let p: HTMLElement | null = e.parentElement;
					let scrollable = false;
					while (p && p !== (sr as unknown as HTMLElement)) {
						const ox = getComputedStyle(p).overflowX;
						if (ox === 'auto' || ox === 'scroll') {
							scrollable = true;
							break;
						}
						p = p.parentElement;
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
 * The check above measures a card against its own host, which is the defect it was
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
		await page.waitForTimeout(800);

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
	await page.waitForTimeout(800);

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
					let p: HTMLElement | null = e.parentElement;
					let scrollable = false;
					while (p && p !== (root as unknown as HTMLElement)) {
						const ox = getComputedStyle(p).overflowX;
						if (ox === 'auto' || ox === 'scroll') {
							scrollable = true;
							break;
						}
						p = p.parentElement;
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
