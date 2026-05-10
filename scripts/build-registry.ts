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
