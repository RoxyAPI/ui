#!/usr/bin/env bun
/**
 * Captures one live response per component into apps/docs/sample-data.js via
 * @roxyapi/sdk. The SDK is itself spec-derived, so request and response
 * shapes track the OpenAPI spec.
 *
 *   ROXY_API_KEY="..." bun run scripts/refresh-samples.ts
 *
 * Reads the key from env. Never writes it to disk.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRoxy } from '@roxyapi/sdk';

const API_KEY = process.env.ROXY_API_KEY;
if (!API_KEY) {
	console.error('Set ROXY_API_KEY before running. Aborting.');
	process.exit(1);
}

const roxy = createRoxy(API_KEY);

const API_BASE = 'https://roxyapi.com/api/v2';

/**
 * Raw POST against prod for endpoints the pinned @roxyapi/sdk does not yet
 * expose (Human Design, Forecast). Mirrors the SDK envelope so {@link run} can
 * consume it identically. Drop this in favor of the typed SDK method once the
 * SDK version that ships those namespaces clears the install age window.
 */
async function rawPost<T>(
	path: string,
	body: unknown,
): Promise<{ data?: T; error?: { code?: string; error?: string } }> {
	const res = await fetch(`${API_BASE}/${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY! },
		body: JSON.stringify(body),
	});
	const json = (await res.json()) as Record<string, unknown>;
	if (!res.ok) {
		return {
			error: {
				code: String(json.code ?? res.status),
				error: String(json.error ?? res.statusText),
			},
		};
	}
	return { data: json as T };
}

async function geocode(query: string) {
	const { data, error } = await roxy.location.searchCities({
		query: { q: query },
	});
	if (error)
		throw new Error(`geocode ${query} failed: ${error.code} ${error.error}`);
	const city = data?.cities?.[0];
	if (!city) throw new Error(`no city for ${query}`);
	return {
		latitude: city.latitude,
		longitude: city.longitude,
		timezone: city.timezone,
	};
}

interface Result {
	name: string;
	data?: unknown;
	error?: string;
}

async function run<T>(
	name: string,
	fn: () => Promise<{ data?: T; error?: { code?: string; error?: string } }>,
): Promise<Result> {
	try {
		const { data, error } = await fn();
		if (error) {
			return { name, error: `${error.code ?? '?'}: ${error.error ?? '?'}` };
		}
		return { name, data };
	} catch (e) {
		return { name, error: e instanceof Error ? e.message : String(e) };
	}
}

async function main() {
	console.log('Geocoding canonical cities...');
	const mumbai = await geocode('Mumbai');
	const delhi = await geocode('Delhi');
	console.log(
		`  Mumbai → ${mumbai.latitude}, ${mumbai.longitude}, ${mumbai.timezone}`,
	);
	console.log(
		`  Delhi  → ${delhi.latitude}, ${delhi.longitude}, ${delhi.timezone}`,
	);

	const PERSON1 = { date: '1990-01-15', time: '14:30:00', ...mumbai };
	const PERSON2 = { date: '1992-06-20', time: '09:15:00', ...delhi };

	console.log('\nFetching live samples via @roxyapi/sdk...');

	const calls: Array<Promise<Result>> = [
		run('natal', () =>
			roxy.astrology.generateNatalChart({
				body: { ...PERSON1, houseSystem: 'placidus' },
			}),
		),
		run('western-planets', () =>
			roxy.astrology.generateNatalChart({
				body: { ...PERSON1, houseSystem: 'placidus' },
			}),
		),
		run('horoscope', () =>
			roxy.astrology.getDailyHoroscope({ path: { sign: 'aries' } }),
		),
		run('synastry', () =>
			roxy.astrology.calculateSynastry({
				body: { person1: PERSON1, person2: PERSON2 },
			}),
		),
		run('compat', () =>
			roxy.astrology.calculateCompatibility({
				body: { person1: PERSON1, person2: PERSON2 },
			}),
		),
		run('moon', () => roxy.astrology.getCurrentMoonPhase()),
		run('kundli', () =>
			roxy.vedicAstrology.generateBirthChart({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('vedic-planets', () =>
			roxy.vedicAstrology.generateBirthChart({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('panchang', () =>
			roxy.vedicAstrology.getDetailedPanchang({
				body: {
					date: '2026-05-09',
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('dasha', () =>
			roxy.vedicAstrology.getMajorDashas({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('dosha', () =>
			roxy.vedicAstrology.checkManglikDosha({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('guna', () =>
			roxy.vedicAstrology.calculateGunMilan({
				body: { person1: PERSON1, person2: PERSON2 },
			}),
		),
		run('kp', () =>
			roxy.vedicAstrology.getKpPlanets({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('kp-chart', () =>
			roxy.vedicAstrology.generateKpChart({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('kp-ruling', () =>
			roxy.vedicAstrology.getKpRulingPlanets({
				body: {
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
					timezone: PERSON1.timezone,
					datetime: `${PERSON1.date}T${PERSON1.time}`,
					birthDate: PERSON1.date,
					birthTime: PERSON1.time,
				},
			}),
		),
		run('nakshatra', () =>
			roxy.vedicAstrology.getNakshatra({ path: { id: 'ashwini' } }),
		),
		run('num', () =>
			roxy.numerology.calculateLifePath({
				body: { year: 1990, month: 1, day: 15 },
			}),
		),
		run('tarot', () =>
			roxy.tarot.getDailyCard({ body: { seed: 'roxy-ui-demo' } }),
		),
		run('spread', () =>
			roxy.tarot.castThreeCard({
				body: { question: 'What does my next chapter look like?' },
			}),
		),
		run('tarot-catalog', () => roxy.tarot.listCards({ query: { limit: 12 } })),
		run('bodygraph', () =>
			rawPost('human-design/bodygraph', {
				date: PERSON1.date,
				time: PERSON1.time,
				timezone: PERSON1.timezone,
				latitude: PERSON1.latitude,
				longitude: PERSON1.longitude,
			}),
		),
		run('forecast-timeline', () =>
			rawPost('forecast/timeline', {
				birthData: {
					date: PERSON1.date,
					time: PERSON1.time,
					timezone: PERSON1.timezone,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
				startDate: '2026-06-01',
				endDate: '2026-06-21',
			}),
		),
		run('bio', () =>
			roxy.biorhythm.getDailyBiorhythm({ body: { seed: 'roxy-ui-demo' } }),
		),
		run('hex', () => roxy.iching.getRandomHexagram()),
		run('transits', () =>
			roxy.astrology.calculateTransits({
				body: {
					date: '2026-05-11',
					time: '12:00:00',
					natalChart: PERSON1,
				},
			}),
		),
		run('ashtakavarga', () =>
			roxy.vedicAstrology.calculateAshtakavarga({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('shadbala', () =>
			roxy.vedicAstrology.calculateShadbala({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('divisional', () =>
			roxy.vedicAstrology.generateDivisionalChart({
				body: {
					date: PERSON1.date,
					time: PERSON1.time,
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
					division: 9,
				},
			}),
		),
		run('yoga', () => roxy.vedicAstrology.listYogas()),
		run('dream', () => roxy.dreams.getDreamSymbol({ path: { id: 'water' } })),
		run('angel-card', () =>
			roxy.angelNumbers.getAngelNumber({ path: { number: '111' } }),
		),
		run('angel-lookup', () =>
			roxy.angelNumbers.analyzeNumberSequence({ query: { number: '1212' } }),
		),
		run('angel-lookup-unknown', () =>
			roxy.angelNumbers.analyzeNumberSequence({ query: { number: '7841' } }),
		),
		run('crystals', () =>
			roxy.crystals.getCrystalsByChakra({
				path: { chakra: 'Heart' },
				query: { limit: 8 },
			}),
		),
		run('choghadiya', () =>
			roxy.vedicAstrology.getChoghadiya({
				body: {
					date: '2026-05-11',
					latitude: PERSON1.latitude,
					longitude: PERSON1.longitude,
				},
			}),
		),
		run('__natal2', () =>
			roxy.astrology.generateNatalChart({
				body: { ...PERSON2, houseSystem: 'placidus' },
			}),
		),
	];

	const results = await Promise.all(calls);

	for (const r of results) {
		if (r.name.startsWith('__')) continue;
		const status = r.error ? `err: ${r.error}` : 'ok';
		console.log(`  ${r.name.padEnd(10)}  →  ${status}`);
	}

	const failed = results.filter((r) => r.error);
	if (failed.length > 0) {
		console.warn(`\n${failed.length} of ${results.length} endpoints failed:`);
		for (const f of failed) console.warn(`  ${f.name}: ${f.error}`);
	}

	const samples: Record<string, unknown> = {};
	for (const r of results) {
		if (r.error || r.name.startsWith('__')) continue;
		samples[r.name] = r.data;
	}

	const natal1 = results.find((r) => r.name === 'natal')?.data as
		| { planets?: unknown[] }
		| undefined;
	const natal2 = results.find((r) => r.name === '__natal2')?.data as
		| { planets?: unknown[] }
		| undefined;
	const syn = samples.synastry as
		| { person1?: Record<string, unknown>; person2?: Record<string, unknown> }
		| undefined;
	if (syn && natal1?.planets)
		syn.person1 = { ...(syn.person1 ?? {}), planets: natal1.planets };
	if (syn && natal2?.planets)
		syn.person2 = { ...(syn.person2 ?? {}), planets: natal2.planets };

	// The /vedic-astrology/yoga catalog returns 300+ entries. The demo page
	// only needs enough to prove the search filter and chip grid render, so
	// slice to the first 20. Real-world consumers pass the full response.
	const yogaSample = samples.yoga as { yogas?: unknown[] } | undefined;
	if (yogaSample?.yogas && yogaSample.yogas.length > 20) {
		yogaSample.yogas = yogaSample.yogas.slice(0, 20);
	}

	console.log('\nMirroring inline image URLs locally...');
	for (const key of Object.keys(samples)) {
		samples[key] = await mirrorImages(samples[key]);
	}

	samples.data = {
		title: 'Compatibility breakdown',
		summary:
			'A typical RoxyAPI response shaped for the generic fallback renderer.',
		score: 87,
		ranges: ['low', 'medium', 'high'],
		breakdown: [
			{ name: 'Communication', score: 88 },
			{ name: 'Trust', score: 84 },
			{ name: 'Shared values', score: 92 },
		],
	};

	const out = `/**
 * Sample data for every component, captured from live RoxyAPI responses by
 * scripts/refresh-samples.ts via @roxyapi/sdk. Used by the preview server,
 * Playwright e2e, and screenshots. Do not hand-edit; rerun the script to
 * refresh.
 */

const samples = ${jsObjectLiteral(samples)};

for (const id of Object.keys(samples)) {
\tconst el = document.getElementById(id);
\tif (el && samples[id] !== null) {
\t\tel.data = samples[id];
\t}
}

const loc = document.getElementById('loc');
if (loc) {
\tloc.addEventListener('roxy-location-select', (e) => {
\t\tconsole.log('Selected city:', e.detail);
\t});
}
`;

	const target = resolve('apps/docs/sample-data.js');
	writeFileSync(target, out);
	console.log(`\nWrote ${Object.keys(samples).length} samples to ${target}`);
}

const LOCAL_IMG_BASE = resolve('apps/docs');
const IMG_HOST = 'https://roxyapi.com/img/';

async function mirrorImages(value: unknown): Promise<unknown> {
	if (typeof value === 'string' && value.startsWith(IMG_HOST)) {
		const relPath = value.slice('https://roxyapi.com'.length);
		const localPath = resolve(LOCAL_IMG_BASE, `.${relPath}`);
		if (!existsSync(localPath)) {
			mkdirSync(dirname(localPath), { recursive: true });
			const res = await fetch(value, {
				headers: { 'User-Agent': 'Roxy-UI-Docs/1.0' },
			});
			if (res.ok) {
				const buf = Buffer.from(await res.arrayBuffer());
				writeFileSync(localPath, buf);
				console.log(
					`  mirrored ${relPath} (${(buf.length / 1024).toFixed(1)} KB)`,
				);
			} else {
				console.warn(`  FAILED to mirror ${relPath}: HTTP ${res.status}`);
				return value;
			}
		}
		return `.${relPath}`;
	}
	if (Array.isArray(value)) {
		const out: unknown[] = [];
		for (const v of value) out.push(await mirrorImages(v));
		return out;
	}
	if (value && typeof value === 'object') {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
			out[k] = await mirrorImages(v);
		}
		return out;
	}
	return value;
}

function jsObjectLiteral(value: unknown, indent = '\t'): string {
	return format(value, indent, '');
}

function format(value: unknown, indent: string, current: string): string {
	if (value === null) return 'null';
	if (value === undefined) return 'undefined';
	if (typeof value === 'string') return JSON.stringify(value);
	if (typeof value === 'number' || typeof value === 'boolean')
		return String(value);
	if (Array.isArray(value)) {
		if (value.length === 0) return '[]';
		const next = current + indent;
		return `[\n${value.map((v) => `${next}${format(v, indent, next)}`).join(',\n')},\n${current}]`;
	}
	if (typeof value === 'object') {
		const obj = value as Record<string, unknown>;
		const keys = Object.keys(obj);
		if (keys.length === 0) return '{}';
		const next = current + indent;
		return `{\n${keys
			.map((k) => `${next}${safeKey(k)}: ${format(obj[k], indent, next)}`)
			.join(',\n')},\n${current}}`;
	}
	return JSON.stringify(value);
}

function safeKey(key: string): string {
	if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) return key;
	return JSON.stringify(key);
}

await main();
