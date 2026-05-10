#!/usr/bin/env bun
/**
 * Emit shadcn registry JSON entries. Output to registry/{name}.json. Each
 * entry ships a small React wrapper (.tsx) that re-exports the component
 * from @roxyapi/ui-react so the customer ends up with a starter file they
 * own and can customize, while the heavy Lit element still loads from
 * jsDelivr at runtime via the npm thin-shell wrapper.
 *
 * Install path:
 *   npx shadcn@latest add https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry/{slug}.json
 *
 * The shadcn CLI 3.x accepts any URL pointing at registry-item JSON.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';

const OUT_DIR = 'registry';
const THEME_URL =
	'https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry/theme.json';

// Defaults + shadcn-token bridge in one block. We deliberately do not use the
// shadcn registry `cssVars` field because Tailwind v4 mints `--color-{name}`
// utilities for every var inside `@theme inline { ... }` — that block is where
// shadcn writes cssVars — and produces malformed `var(----roxy-...)` references
// for any var name that already starts with `--roxy-`. Putting our vars under
// `@layer base { :root }` via the `css` field bypasses Tailwind's @theme
// processing while still cascading into Shadow DOM normally.
const SHADCN_THEME_CSS = {
	'@layer base': {
		':root': {
			'--roxy-bg': 'var(--background, #fafafa)',
			'--roxy-fg': 'var(--foreground, #0a0a0a)',
			'--roxy-muted': 'var(--muted-foreground, #71717a)',
			'--roxy-border': 'var(--border, #e4e4e7)',
			'--roxy-accent': 'var(--primary, #f59e0b)',
			'--roxy-accent-fg': 'var(--primary-foreground, #b45309)',
			'--roxy-success': 'var(--chart-2, #16a34a)',
			'--roxy-warning': 'var(--chart-3, #f59e0b)',
			'--roxy-danger': 'var(--destructive, #dc2626)',
			'--roxy-info': 'var(--chart-1, #2563eb)',
			'--roxy-radius-md': 'var(--radius, 12px)',
			'--roxy-shadow-md': '0 4px 12px rgba(0,0,0,0.08)',
			'--roxy-motion-duration': '200ms',
		},
		'.dark': {
			'--roxy-shadow-md': '0 4px 12px rgba(0,0,0,0.4)',
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
			"CSS variables driving every Roxy UI component. Maps the customer's existing shadcn tokens (--background, --primary, --border, --radius) onto --roxy-* via CSS fallback chain. Override any --roxy-* directly to lock a specific surface.",
		css: SHADCN_THEME_CSS,
	};
	await writeFile(`${OUT_DIR}/theme.json`, JSON.stringify(entry, null, 2));
}

function reactWrapperSource(pascal: string, slug: string, description: string) {
	const sdkExample = SDK_USAGE_HINT[slug] ?? GENERIC_SDK_HINT;
	return `'use client';

/**
 * <${pascal} data={...} /> — ${description}.
 *
 * You own this file. Customize freely. The underlying Lit element loads
 * from jsDelivr at runtime via @roxyapi/ui-react, so updates ship without
 * a re-install.
 *
 * Typical wiring (server-side fetch, client-side render):
 *
 * \`\`\`ts
 * // app/api/${slug}/route.ts
 * import { createRoxy } from '@roxyapi/sdk';
 * const roxy = createRoxy(process.env.ROXY_API_KEY!);
 * export async function POST(req: Request) {
 *   ${sdkExample}
 *   return Response.json(data);
 * }
 * \`\`\`
 *
 * Theme via --roxy-* CSS custom properties on :root (see globals.css).
 */
import { ${pascal} as Element } from '@roxyapi/ui-react';
import type { ComponentProps } from 'react';

export type ${pascal}Props = ComponentProps<typeof Element>;

export function ${pascal}(props: ${pascal}Props) {
\treturn <Element {...props} />;
}

export default ${pascal};
`;
}

const GENERIC_SDK_HINT =
	'const { data } = await roxy.someDomain.someMethod({ body: await req.json() });';

const SDK_USAGE_HINT: Record<string, string> = {
	'natal-chart':
		'const { data } = await roxy.astrology.generateNatalChart({ body: await req.json() });',
	'horoscope-card':
		'const { sign } = await req.json();\n *   const { data } = await roxy.astrology.getDailyHoroscope({ path: { sign } });',
	'synastry-chart':
		'const { data } = await roxy.astrology.calculateSynastry({ body: await req.json() });',
	'compatibility-card':
		'const { data } = await roxy.astrology.calculateCompatibility({ body: await req.json() });',
	'moon-phase': 'const { data } = await roxy.astrology.getCurrentMoonPhase();',
	'vedic-kundli':
		'const { data } = await roxy.vedicAstrology.generateBirthChart({ body: await req.json() });',
	'panchang-table':
		'const { data } = await roxy.vedicAstrology.getDetailedPanchang({ body: await req.json() });',
	'dasha-timeline':
		'const { data } = await roxy.vedicAstrology.getMajorDashas({ body: await req.json() });',
	'dosha-card':
		'const { data } = await roxy.vedicAstrology.getManglik({ body: await req.json() });',
	'guna-milan':
		'const { data } = await roxy.vedicAstrology.calculateGunMilan({ body: await req.json() });',
	'kp-planets-table':
		'const { data } = await roxy.vedicAstrology.getKpPlanets({ body: await req.json() });',
	'numerology-card':
		'const { data } = await roxy.numerology.calculateLifePath({ body: await req.json() });',
	'tarot-card': 'const { data } = await roxy.tarot.getDailyCard();',
	'tarot-spread':
		'const { data } = await roxy.tarot.castThreeCard({ body: await req.json() });',
	'biorhythm-chart':
		'const { data } = await roxy.biorhythm.getDailyBiorhythm({ body: await req.json() });',
	hexagram: 'const { data } = await roxy.iching.castReading();',
	'endpoint-form':
		'// <RoxyEndpointForm> introspects the OpenAPI spec at runtime — no\n   *   // server route needed unless you want to proxy the form submission.\n   *   const values = await req.json();\n   *   const { data } = await fetch(\\`https://roxyapi.com/api/v2/\\${endpoint}\\`, { ...values });',
	'location-search':
		'// <RoxyLocationSearch> calls /location/search directly. No server route\n   *   // needed unless you want to proxy.',
	data: '// <RoxyData> is the generic fallback renderer. Pass any response shape.',
};

async function main() {
	await mkdir(OUT_DIR, { recursive: true });

	await emitTheme();

	for (const { slug, pascal, description } of ROXY_COMPONENTS) {
		const wrapper = reactWrapperSource(pascal, slug, description);
		const entry = {
			$schema: 'https://ui.shadcn.com/schema/registry-item.json',
			name: `roxy-${slug}`,
			type: 'registry:ui',
			title: pascal,
			description,
			dependencies: ['@roxyapi/ui-react', '@roxyapi/sdk'],
			registryDependencies: [THEME_URL],
			files: [
				{
					path: `components/roxy-${slug}.tsx`,
					content: wrapper,
					type: 'registry:ui',
					target: `~/components/roxy-ui/${slug}.tsx`,
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
