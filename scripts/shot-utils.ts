#!/usr/bin/env bun
/**
 * Shared Playwright capture harness for the render pipelines that shoot the local preview server: {@link file://./screenshots.ts | screenshots.ts} (per-component README assets) and {@link file://./component-previews.ts | component-previews.ts} (catalog preview composites). Both start the same `scripts/preview.ts` server on :3001 and toggle the same `data-theme` light/dark signal, so those two helpers live here instead of being copied per script.
 */
import type { Page } from '@playwright/test';

export const PREVIEW_PORT = 3001;
export const PREVIEW_BASE_URL = `http://localhost:${PREVIEW_PORT}`;

/**
 * Reuse an already-running preview server or spawn one, returning a `stop()` that only kills a server this call started (a reused one is left alone). Mirrors `bun run preview` so both capture scripts serve `apps/docs/` identically to GitHub Pages.
 */
export async function ensureServer(
	baseUrl: string = PREVIEW_BASE_URL,
): Promise<{ stop: () => Promise<void> }> {
	const probe = await fetch(baseUrl).catch(() => null);
	if (probe?.ok) {
		console.log(`Reusing preview server at ${baseUrl}`);
		return { stop: async () => {} };
	}
	console.log(`Starting preview server on ${baseUrl}...`);
	const proc = Bun.spawn(['bun', 'run', 'preview'], {
		stdout: 'ignore',
		stderr: 'ignore',
	});
	for (let i = 0; i < 30; i++) {
		await new Promise((r) => setTimeout(r, 500));
		const res = await fetch(baseUrl).catch(() => null);
		if (res?.ok) return { stop: async () => proc.kill() };
	}
	throw new Error('Preview server failed to start within 15s');
}

/**
 * Flip the page (and every shadow-DOM component under it) between the light and dark token sets by setting `data-theme` on both the root and body, then settle briefly for the repaint.
 */
export async function setTheme(page: Page, theme: 'light' | 'dark') {
	await page.evaluate((t: string) => {
		document.documentElement.dataset.theme = t;
		document.body.dataset.theme = t;
	}, theme);
	await page.waitForTimeout(120);
}
