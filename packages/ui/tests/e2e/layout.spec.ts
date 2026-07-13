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
 */
test('no section overflows its host or clips its content', async ({ page }) => {
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

	expect(issues, issues.join('\n')).toEqual([]);
});
