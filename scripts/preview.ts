#!/usr/bin/env bun
/**
 * Bun built-in HTTP server. Serves apps/docs/ + packages/ui/dist/ so every
 * component renders in a single page for manual eyeballing and Playwright.
 *
 * URL: http://localhost:3001
 */
import { existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const PORT = Number(process.env.PORT ?? 3001);
const ROOT = resolve('apps/docs');
const DIST = resolve('packages/ui/dist');

const MIME: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.cjs': 'application/javascript; charset=utf-8',
	'.mjs': 'application/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.map': 'application/json; charset=utf-8',
};

async function resolvePath(pathname: string): Promise<string | null> {
	const tries = [
		`${ROOT}${pathname}`,
		`${ROOT}${pathname}/index.html`,
		`${ROOT}${pathname.replace(/^\/dist/, '/__dist__')}`,
		pathname.startsWith('/dist/')
			? `${DIST}${pathname.slice('/dist'.length)}`
			: null,
	].filter(Boolean) as string[];
	for (const candidate of tries) {
		if (!candidate) continue;
		if (existsSync(candidate)) {
			const s = await stat(candidate);
			if (s.isFile()) return candidate;
		}
	}
	return null;
}

const server = Bun.serve({
	port: PORT,
	async fetch(req: Request): Promise<Response> {
		const url = new URL(req.url);
		const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
		const filepath = await resolvePath(pathname);
		if (!filepath) {
			return new Response(`Not found: ${pathname}`, { status: 404 });
		}
		const ext = extname(filepath);
		const mime = MIME[ext] ?? 'application/octet-stream';
		const file = Bun.file(filepath);
		return new Response(file, {
			headers: {
				'Content-Type': mime,
				'Cache-Control': 'no-cache, no-store, must-revalidate',
			},
		});
	},
});

console.log(`Roxy UI preview at http://localhost:${server.port}`);
console.log(`Serving apps/docs/ and packages/ui/dist/ (via /dist/...)`);
