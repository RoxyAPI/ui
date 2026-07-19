#!/usr/bin/env bun
/**
 * Gate the committed catalog preview composites in assets/previews: every manifest slug must have both a {slug}-light.webp and {slug}-dark.webp, no orphan webp may linger from a removed component, and every file must be exactly 1200x800 (read from sharp metadata, so a mis-sized capture cannot slip through). Wired into lefthook pre-push and ci.yml, NOT into build/catalog:sync (a build must exist to serve shot.html before previews can be shot). Fix any failure with `bun run previews [slug...]`.
 */
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';

const DIR = resolve('assets/previews');
const WIDTH = 1200;
const HEIGHT = 800;

async function main() {
	if (!existsSync(DIR)) {
		console.error(
			`check-previews FAILED: ${DIR} does not exist. Run 'bun run previews'.`,
		);
		process.exit(1);
	}

	const slugs = ROXY_COMPONENTS.map((c) => c.slug);
	const expected = new Set<string>();
	for (const slug of slugs) {
		expected.add(`${slug}-light.webp`);
		expected.add(`${slug}-dark.webp`);
	}

	const present = readdirSync(DIR).filter((f) => f.endsWith('.webp'));
	const presentSet = new Set(present);
	const errors: string[] = [];

	for (const f of expected) {
		if (!presentSet.has(f)) errors.push(`missing ${f}`);
	}
	for (const f of present) {
		if (!expected.has(f))
			errors.push(`orphan ${f} (no matching manifest slug)`);
	}
	for (const f of present) {
		const { width, height } = await sharp(resolve(DIR, f)).metadata();
		if (width !== WIDTH || height !== HEIGHT) {
			errors.push(`${f} is ${width}x${height}, expected ${WIDTH}x${HEIGHT}`);
		}
	}

	if (errors.length) {
		console.error(`check-previews FAILED (${errors.length}):`);
		for (const e of errors) console.error(`  - ${e}`);
		process.exit(1);
	}
	console.log(
		`check-previews OK: ${slugs.length} components, ${present.length} webp, all ${WIDTH}x${HEIGHT}.`,
	);
}

await main();
