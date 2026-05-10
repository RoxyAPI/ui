#!/usr/bin/env bun
/**
 * Emit shadcn registry JSON entries. Output to registry/{name}.json. Each
 * entry ships a small React wrapper (.tsx) that re-exports the component
 * from @roxyapi/ui-react so the customer ends up with a starter file they
 * own and can customize.
 *
 * Install path:
 *   npx shadcn@latest add https://cdn.jsdelivr.net/gh/RoxyAPI/ui@v{VERSION}/registry/{slug}.json
 *
 * The shadcn CLI 3.x accepts any URL pointing at registry-item JSON.
 *
 * Versioning: registryDependencies pin to the exact `v${VERSION}` git tag
 * (read from packages/ui/package.json) so each install resolves to a stable,
 * cache-friendly artifact. The version bump propagates automatically into
 * each regen.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import {
	ROXY_COMPONENTS,
	type RoxyComponent,
} from '../packages/ui/src/manifest.js';

const OUT_DIR = 'registry';
const PKG_PATH = 'packages/ui/package.json';

const pkg = JSON.parse(await readFile(PKG_PATH, 'utf8')) as { version: string };
if (typeof pkg.version !== 'string' || !/^\d+\.\d+\.\d+/.test(pkg.version)) {
	throw new Error(`Invalid version in ${PKG_PATH}: ${pkg.version}`);
}
const VERSION = pkg.version;
const THEME_URL = `https://cdn.jsdelivr.net/gh/RoxyAPI/ui@v${VERSION}/registry/theme.json`;

// Defaults + shadcn-token bridge in one block. We deliberately do not use the
// shadcn registry `cssVars` field because Tailwind v4 mints `--color-{name}`
// utilities for every var inside `@theme inline { ... }` (that block is where
// shadcn writes cssVars) and produces malformed `var(----roxy-...)` references
// for any var name that already starts with `--roxy-`. Putting our vars under
// `@layer base { :root }` via the `css` field bypasses Tailwind's @theme
// processing while still cascading into Shadow DOM normally.
//
// Status `-fg` bridges fall back to sensible darker shades so light surfaces
// hit WCAG AA contrast for status text. shadcn does not have foreground tokens
// for chart-* slots, so we fall through to a hardcoded dark variant.
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
			'--roxy-success-fg': '#166534',
			'--roxy-warning': 'var(--chart-3, #f59e0b)',
			'--roxy-warning-fg': '#9a3412',
			'--roxy-danger': 'var(--destructive, #dc2626)',
			'--roxy-danger-fg': 'var(--destructive-foreground, #991b1b)',
			'--roxy-info': 'var(--chart-1, #2563eb)',
			'--roxy-info-fg': '#075985',
			'--roxy-radius-md': 'var(--radius, 12px)',
			'--roxy-shadow-md': '0 4px 12px rgba(0,0,0,0.08)',
			'--roxy-motion-duration': '200ms',
		},
		'.dark': {
			'--roxy-success-fg': '#86efac',
			'--roxy-warning-fg': '#fdba74',
			'--roxy-danger-fg': '#fca5a5',
			'--roxy-info-fg': '#7dd3fc',
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

/**
 * Doc-body emitter. Returns the JSDoc block (without the surrounding
 * comment markers) that goes above the React wrapper. Branches on the
 * manifest's `selfFetching` flag because three components do not consume
 * a typed server response and must not document a fake server route.
 */
function docBody(component: RoxyComponent): string {
	const { pascal, slug, description, selfFetching } = component;
	const header = `<${pascal} data={...} />: ${description}.

You own this file. Customize freely. The component is re-exported from
@roxyapi/ui-react and stays in sync with the published package.`;

	const theme =
		'Theme via --roxy-* CSS custom properties on :root (see globals.css).';

	if (selfFetching) {
		const wiring = SELF_FETCHING_WIRING[slug] ?? GENERIC_SELF_FETCHING_WIRING;
		return `${header}\n\n${wiring}\n\n${theme}`;
	}

	const sdkExample = SDK_USAGE_HINT[slug] ?? GENERIC_SDK_HINT;
	const wiring = `Typical wiring (server-side fetch, client-side render):

\`\`\`ts
// app/api/${slug}/route.ts
import { createRoxy } from '@roxyapi/sdk';
const roxy = createRoxy(process.env.ROXY_API_KEY!);
export async function POST(req: Request) {
  ${sdkExample}
  return Response.json(data);
}
\`\`\``;

	return `${header}\n\n${wiring}\n\n${theme}`;
}

/**
 * Wrap a multi-line body in a JSDoc block. Indents every line with ` * ` so
 * the rendered .tsx file has clean, conventional comment formatting.
 */
function asJsDoc(body: string): string {
	const lines = body.split('\n').map((line) => (line ? ` * ${line}` : ' *'));
	return `/**\n${lines.join('\n')}\n */`;
}

function reactWrapperSource(component: RoxyComponent) {
	const { pascal } = component;
	const jsdoc = asJsDoc(docBody(component));
	return `'use client';

${jsdoc}
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

// SDK method names verified against @roxyapi/sdk v1.x sdk.gen.d.ts on
// 2026-05-10. Update when the SDK renames a method.
const SDK_USAGE_HINT: Record<string, string> = {
	'natal-chart':
		'const { data } = await roxy.astrology.generateNatalChart({ body: await req.json() });',
	'horoscope-card':
		'const { sign } = await req.json();\n  const { data } = await roxy.astrology.getDailyHoroscope({ path: { sign } });',
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
		'const { data } = await roxy.vedicAstrology.checkManglikDosha({ body: await req.json() });',
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
};

const GENERIC_SELF_FETCHING_WIRING = `This component handles its own data flow. No server route is required.`;

// Wiring docs for the three self-fetching components. Customer integration
// path is different for each: data is a pure renderer, location-search calls
// /location/search directly with a publishable key, endpoint-form emits a
// roxy-submit event the consumer handles.
const SELF_FETCHING_WIRING: Record<string, string> = {
	data: `Wiring:

\`\`\`tsx
// <RoxyData> is a pure renderer. No fetch, no server route.
// Pass any RoxyAPI response directly:
<RoxyData data={response} />
\`\`\`

Use this as a fallback for response shapes that do not yet have a
dedicated component, or for prototyping a new endpoint.`,
	'location-search': `Wiring:

\`\`\`tsx
// <RoxyLocationSearch> calls /location/search itself. No server route
// needed. Set publishable-key on the element so the call carries auth:
<RoxyLocationSearch
  publishable-key={process.env.NEXT_PUBLIC_ROXY_PUBLISHABLE_KEY}
  onRoxyLocationSelect={(e) => console.log(e.detail)}
/>
\`\`\`

The element debounces input and emits roxy-location-select with the
selected location. Validate the publishable key in your RoxyAPI dashboard.`,
	'endpoint-form': `Wiring:

\`\`\`tsx
// <RoxyEndpointForm> introspects the OpenAPI spec at runtime and emits
// roxy-submit with a validated payload. Listen for the event and call
// any endpoint server-side:
<RoxyEndpointForm
  endpoint="/astrology/natal-chart"
  onRoxySubmit={async (e) => {
    const res = await fetch('/api/natal-chart', {
      method: 'POST',
      body: JSON.stringify(e.detail),
    });
    setData(await res.json());
  }}
/>
\`\`\`

The form derives field types, validation, and helper labels from the
spec. Override per-field via the x-roxy-ui spec extension.`,
};

async function main() {
	await mkdir(OUT_DIR, { recursive: true });

	await emitTheme();

	for (const component of ROXY_COMPONENTS) {
		const { slug, pascal, description } = component;
		const wrapper = reactWrapperSource(component);
		const entry = {
			$schema: 'https://ui.shadcn.com/schema/registry-item.json',
			name: `roxy-${slug}`,
			type: 'registry:ui',
			title: pascal,
			description,
			// @roxyapi/sdk is referenced in the JSDoc only, not imported by the
			// wrapper file. Customers add it themselves when they implement the
			// route handler. Listing it here would force the SDK install once
			// per component (npm dedupes, but the package.json gets noisy).
			dependencies: ['@roxyapi/ui-react'],
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
		`Wrote ${ROXY_COMPONENTS.length} component entries + theme to ${OUT_DIR}/ (registryDependencies pinned to v${VERSION}).`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
