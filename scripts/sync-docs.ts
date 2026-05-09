#!/usr/bin/env bun
/**
 * Sync the auto-generated component table block in README.md and AGENTS.md.
 * Looks for <!-- BEGIN:COMPONENTS --> ... <!-- END:COMPONENTS --> markers and
 * replaces the contents with the live table from the spec + manifest.
 */
import { readFile, writeFile } from 'node:fs/promises';

const COMPONENTS = [
	[
		'natal-chart',
		'Western',
		'POST /astrology/natal-chart',
		'Natal chart wheel with planet glyphs and aspect lines',
	],
	[
		'horoscope-card',
		'Western',
		'GET /astrology/horoscope/{sign}/{daily,weekly,monthly}',
		'Daily, weekly, or monthly horoscope card',
	],
	[
		'synastry-chart',
		'Western',
		'POST /astrology/synastry',
		'Dual-wheel synastry with inter-aspects table',
	],
	[
		'compatibility-card',
		'Cross',
		'POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility',
		'Score card with category breakdown',
	],
	[
		'moon-phase',
		'Western',
		'GET /astrology/moon-phase/{current,upcoming,calendar/...}',
		'Moon phase card and calendar',
	],
	[
		'vedic-kundli',
		'Vedic',
		'POST /vedic-astrology/birth-chart',
		'South or North Indian kundli',
	],
	[
		'panchang-table',
		'Vedic',
		'POST /vedic-astrology/panchang/{basic,detailed}',
		'15+ muhurtas in detailed mode',
	],
	[
		'dasha-timeline',
		'Vedic',
		'POST /vedic-astrology/dasha/{current,major,sub/...}',
		'Vimshottari mahadasha + antardasha + pratyantardasha',
	],
	[
		'dosha-card',
		'Vedic',
		'POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati}',
		'Presence, severity, remedies, scoped effects',
	],
	[
		'guna-milan',
		'Vedic',
		'POST /vedic-astrology/compatibility',
		'36-point Ashtakoota with eight sub-scores',
	],
	[
		'kp-planets-table',
		'Vedic (KP)',
		'POST /vedic-astrology/kp/planets',
		'Sub-lord and sub-sub-lord columns',
	],
	[
		'numerology-card',
		'Numerology',
		'POST /numerology/{life-path,expression,personal-year,chart}',
		'Life path, expression, personal year, full chart',
	],
	[
		'tarot-card',
		'Tarot',
		'GET /tarot/cards/{id}, POST /tarot/daily',
		'Single card with upright and reversed flip',
	],
	[
		'tarot-spread',
		'Tarot',
		'POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw',
		'Spreads with positions and reading',
	],
	[
		'biorhythm-chart',
		'Biorhythm',
		'POST /biorhythm/{daily,forecast,critical-days}',
		'Daily bars, forecast cycle lines, critical days',
	],
	[
		'hexagram',
		'I Ching',
		'GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast',
		'Hexagram with trigrams, judgment, image, changing lines',
	],
	[
		'endpoint-form',
		'Helper',
		'Any endpoint via x-roxy-ui hints',
		'Schema-driven form, emits roxy-submit',
	],
	[
		'location-search',
		'Helper',
		'GET /location/search',
		'Debounced city search input, emits roxy-location-select',
	],
	[
		'data',
		'Helper',
		'Any response shape',
		'Generic fallback renderer for unknown shapes',
	],
];

const TABLE = [
	'| Element | Domain | Endpoint(s) | What it renders |',
	'|---|---|---|---|',
	...COMPONENTS.map(
		([slug, domain, endpoint, summary]) =>
			`| \`<roxy-${slug}>\` | ${domain} | ${endpoint} | ${summary} |`,
	),
].join('\n');

const MARKER_BEGIN = '<!-- BEGIN:COMPONENTS -->';
const MARKER_END = '<!-- END:COMPONENTS -->';

async function syncFile(path: string) {
	let text: string;
	try {
		text = await readFile(path, 'utf8');
	} catch {
		return;
	}
	const start = text.indexOf(MARKER_BEGIN);
	const end = text.indexOf(MARKER_END);
	if (start === -1 || end === -1) return;
	const before = text.slice(0, start + MARKER_BEGIN.length);
	const after = text.slice(end);
	const next = `${before}\n${TABLE}\n${after}`;
	if (next !== text) {
		await writeFile(path, next);
		console.log(`Updated component table in ${path}`);
	}
}

async function main() {
	for (const path of ['README.md', 'AGENTS.md', 'packages/ui/AGENTS.md']) {
		await syncFile(path);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
