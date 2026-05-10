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
const THEME_URL =
	'https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry/theme.json';

const THEME_LIGHT = {
	'--roxy-bg': '#fafafa',
	'--roxy-fg': '#0a0a0a',
	'--roxy-muted': '#71717a',
	'--roxy-border': '#e4e4e7',
	'--roxy-accent': '#f59e0b',
	'--roxy-accent-fg': '#b45309',
	'--roxy-success': '#16a34a',
	'--roxy-warning': '#f59e0b',
	'--roxy-danger': '#dc2626',
	'--roxy-info': '#2563eb',
	'--roxy-radius-md': '12px',
	'--roxy-shadow-md': '0 4px 12px rgba(0,0,0,0.08)',
	'--roxy-motion-duration': '200ms',
};

const THEME_DARK = {
	'--roxy-bg': '#0a0a0a',
	'--roxy-fg': '#fafafa',
	'--roxy-muted': '#a1a1aa',
	'--roxy-border': '#27272a',
	'--roxy-accent': '#fbbf24',
	'--roxy-accent-fg': '#fde68a',
	'--roxy-shadow-md': '0 4px 12px rgba(0,0,0,0.4)',
};

// Each --roxy-* falls back through the customer's existing shadcn token. A
// shadcn user inherits their theme automatically; a non-shadcn user gets the
// defaults from cssVars above. Customer can still override any --roxy-* directly.
const SHADCN_BRIDGE = {
	'@layer base': {
		':root': {
			'--roxy-bg': 'var(--background, #fafafa)',
			'--roxy-fg': 'var(--foreground, #0a0a0a)',
			'--roxy-muted': 'var(--muted-foreground, #71717a)',
			'--roxy-border': 'var(--border, #e4e4e7)',
			'--roxy-accent': 'var(--primary, #f59e0b)',
			'--roxy-accent-fg': 'var(--primary-foreground, #b45309)',
			'--roxy-success': 'var(--chart-2, #16a34a)',
			'--roxy-danger': 'var(--destructive, #dc2626)',
			'--roxy-radius-md': 'var(--radius, 12px)',
		},
	},
};

async function emitTheme() {
	const entry = {
		$schema: 'https://ui.shadcn.com/schema/registry-item.json',
		name: 'theme',
		type: 'registry:theme',
		title: 'Roxy UI theme',
		description:
			'CSS variables driving every Roxy UI component. Maps the customer existing shadcn tokens (--background, --primary, --border, --radius) onto --roxy-* via CSS fallback chain. Override any --roxy-* directly to lock a specific surface.',
		cssVars: { light: THEME_LIGHT, dark: THEME_DARK },
		css: SHADCN_BRIDGE,
	};
	await writeFile(`${OUT_DIR}/theme.json`, JSON.stringify(entry, null, 2));
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });

	await emitTheme();

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
			registryDependencies: [THEME_URL],
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
		items: [
			{
				name: 'theme',
				description: 'Roxy UI theme variables and shadcn bridge',
			},
			...ROXY_COMPONENTS.map(({ slug, description }) => ({
				name: `roxy-${slug}`,
				description,
			})),
		],
	};
	await writeFile(`${OUT_DIR}/index.json`, JSON.stringify(indexEntry, null, 2));

	console.log(
		`Wrote ${ROXY_COMPONENTS.length} component entries + theme to ${OUT_DIR}/.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
