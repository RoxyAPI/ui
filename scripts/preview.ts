#!/usr/bin/env bun
/**
 * Local static server for apps/docs/. Mirrors GitHub Pages: same directory,
 * same relative paths, no rewrites.
 *
 * Run `bun run build` first so apps/docs/dist/ is populated. URL: localhost:3001.
 */
import { existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const PORT = Number(process.env.PORT ?? 3001);
const ROOT = resolve('apps/docs');

const MIME: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.cjs': 'application/javascript; charset=utf-8',
	'.mjs': 'application/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.map': 'application/json; charset=utf-8',
};

async function resolvePath(pathname: string): Promise<string | null> {
	const tries = [`${ROOT}${pathname}`, `${ROOT}${pathname}/index.html`];
	for (const candidate of tries) {
		if (!existsSync(candidate)) continue;
		const s = await stat(candidate);
		if (s.isFile()) return candidate;
	}
	return null;
}

if (!existsSync(`${ROOT}/dist/cdn/roxy-ui.js`)) {
	console.warn(
		'apps/docs/dist is empty. Run `bun run build` first so the site has the UMD bundle.',
	);
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
		return new Response(Bun.file(filepath), {
			headers: {
				'Content-Type': mime,
				'Cache-Control': 'no-cache, no-store, must-revalidate',
			},
		});
	},
});

console.log(`Roxy UI preview at http://localhost:${server.port}`);
console.log(`Serving apps/docs/ (single root, mirrors GitHub Pages layout)`);
