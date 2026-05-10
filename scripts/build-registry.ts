#!/usr/bin/env bun
/**
 * Emit shadcn registry JSON entries. Output to registry/{name}.json. Each
 * entry inlines the TypeScript source so devs can install with:
 *
 *   npx shadcn@latest add https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry/{name}.json
 *
 * The shadcn CLI 3.0 accepts any URL pointing at registry-item JSON.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';

const SRC_DIR = 'packages/ui/src/components';
const OUT_DIR = 'registry';

async function main() {
	await mkdir(OUT_DIR, { recursive: true });

	for (const { slug, pascal, description } of ROXY_COMPONENTS) {
		const sourcePath = `${SRC_DIR}/${slug}.ts`;
		const source = await readFile(sourcePath, 'utf8');
		const entry = {
			$schema: 'https://ui.shadcn.com/schema/registry-item.json',
			name: `roxy-${slug}`,
			type: 'registry:ui',
			title: pascal,
			description,
			dependencies: ['lit'],
			files: [
				{
					path: `components/roxy-${slug}.ts`,
					content: source,
					type: 'registry:ui',
					target: `~/components/roxy-ui/${slug}.ts`,
				},
			],
		};
		await writeFile(`${OUT_DIR}/${slug}.json`, JSON.stringify(entry, null, 2));
	}

	const indexEntry = {
		$schema: 'https://ui.shadcn.com/schema/registry.json',
		name: 'roxy-ui',
		homepage: 'https://roxyapi.com/ui',
		items: ROXY_COMPONENTS.map(({ slug, description }) => ({
			name: `roxy-${slug}`,
			description,
		})),
	};
	await writeFile(`${OUT_DIR}/index.json`, JSON.stringify(indexEntry, null, 2));

	console.log(
		`Wrote ${ROXY_COMPONENTS.length} registry entries to ${OUT_DIR}/.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
