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
					const e = el as HTMLElement & { shadowRoot?: ShadowRoot | null };
					if (e.shadowRoot) walk(e.shadowRoot);
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

	// SVG chart labels are excluded: a chart cell is sized for a planet name, and
	// a 68 character string in that field is not a case the API can produce.
	const real = issues.filter((i) => !i.includes(': text.'));
	expect(real, real.join('\n')).toEqual([]);
});
