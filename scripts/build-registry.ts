#!/usr/bin/env bun
/**
 * Emit shadcn registry JSON entries. Output to registry/{name}.json. Each
 * entry inlines the TypeScript source so devs can install with:
 *
 *   bunx shadcn add https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry/{name}.json
 *
 * The shadcn CLI 3.0 accepts any URL pointing at registry-item JSON.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const SRC_DIR = 'packages/ui/src/components';
const OUT_DIR = 'registry';

const COMPONENT_DESCRIPTIONS: Record<string, string> = {
	'natal-chart':
		'Western natal chart wheel for /astrology/natal-chart responses',
	'horoscope-card':
		'Daily, weekly, or monthly horoscope card for /astrology/horoscope/...',
	'synastry-chart': 'Dual-wheel synastry chart with inter-aspects table',
	'compatibility-card': 'Cross-domain compatibility score card',
	'moon-phase': 'Moon phase card and calendar',
	'vedic-kundli':
		'South or North Indian Vedic kundli for /vedic-astrology/birth-chart',
	'panchang-table':
		'Panchang muhurta table with auspicious and inauspicious periods',
	'dasha-timeline':
		'Vimshottari dasha timeline with active mahadasha highlighted',
	'dosha-card': 'Manglik, Kaal Sarp, or Sade Sati presence card',
	'guna-milan': '36-point Ashtakoota matrimonial compatibility breakdown',
	'kp-planets-table': 'KP planets table with sub-lord and sub-sub-lord columns',
	'numerology-card':
		'Numerology card for life path, expression, personal year, or full chart',
	'tarot-card': 'Single tarot card with upright/reversed flip animation',
	'tarot-spread':
		'Tarot spread renderer for three-card, Celtic Cross, love, or yes/no',
	'biorhythm-chart': 'Daily biorhythm bars or multi-day forecast cycle lines',
	hexagram:
		'I Ching hexagram with trigram glyphs, judgment, image, and changing lines',
	'endpoint-form':
		'Schema-driven form that emits roxy-submit with a validated payload',
	'location-search': 'City search input with debounced /location/search calls',
	data: 'Generic fallback renderer for any OpenAPI response shape',
};

async function readComponentList(): Promise<string[]> {
	const text = await readFile('packages/ui/src/index.ts', 'utf8');
	const match = text.match(/ROXY_UI_COMPONENTS\s*=\s*\[([\s\S]*?)\]/);
	if (!match) throw new Error('Could not parse ROXY_UI_COMPONENTS');
	return match[1]
		.split(',')
		.map((s) => s.trim().replace(/['"]/g, ''))
		.filter(Boolean);
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	const components = await readComponentList();

	for (const name of components) {
		const sourcePath = `${SRC_DIR}/${name}.ts`;
		const source = await readFile(sourcePath, 'utf8');
		const pascal = name
			.split('-')
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join('');
		const entry = {
			$schema: 'https://ui.shadcn.com/schema/registry-item.json',
			name: `roxy-${name}`,
			type: 'registry:ui',
			title: `Roxy${pascal}`,
			description:
				COMPONENT_DESCRIPTIONS[name] ??
				`Roxy UI component for the ${name} surface`,
			dependencies: ['lit'],
			files: [
				{
					path: `components/roxy-${name}.ts`,
					content: source,
					type: 'registry:ui',
					target: `~/components/roxy-ui/${name}.ts`,
				},
			],
		};
		await writeFile(`${OUT_DIR}/${name}.json`, JSON.stringify(entry, null, 2));
	}

	const indexEntry = {
		$schema: 'https://ui.shadcn.com/schema/registry.json',
		name: 'roxy-ui',
		homepage: 'https://roxyapi.com/ui',
		items: components.map((name) => ({
			name: `roxy-${name}`,
			description:
				COMPONENT_DESCRIPTIONS[name] ??
				`Roxy UI component for the ${name} surface`,
		})),
	};
	await writeFile(`${OUT_DIR}/index.json`, JSON.stringify(indexEntry, null, 2));

	console.log(`Wrote ${components.length} registry entries to ${OUT_DIR}/.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
