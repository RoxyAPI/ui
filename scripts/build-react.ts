#!/usr/bin/env bun
/**
 * Codegen for @roxyapi/ui-react. For every Lit element in the manifest,
 * emit a typed React component file that:
 *   - accepts a `data` prop typed against the spec-derived response type
 *     (mirrors the union aliases used in the matching Lit component);
 *   - bridges the documented widget CustomEvents (`roxy-submit`,
 *     `roxy-location-select`, `roxy-validation-error`, `roxy-spec-error`)
 *     to typed React handler props with proper cleanup;
 *   - forwards `className`, `style`, and arbitrary HTML attributes;
 *   - renders a role="alert" element if the bundle fails to load.
 *
 * Helper widgets that do not consume a typed RoxyAPI response (the
 * generic renderer, location search, and endpoint form) skip the `data`
 * prop entirely so the wrapper surface matches the underlying element.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';

const OUT_DIR = 'packages/ui-react/src';

const ROXY_UI_VERSION = (
	JSON.parse(await readFile('packages/ui/package.json', 'utf8')) as {
		version: string;
	}
).version;
// Use @latest while pre-1.0 so the loader resolves to the most recent
// published bundle. At 1.0 cutover, swap to
// `@${ROXY_UI_VERSION.split('.')[0]}` so consumers opt into majors explicitly.
const CDN_BASE_LATEST =
	'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn';
const CDN_BASE_PREFIX = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@';
const CDN_BASE_SUFFIX = '/dist/cdn';

/**
 * Slug → spec response type. Multi-endpoint components carry a union, exactly
 * mirroring the local type aliases in the matching Lit component file.
 * Synastry adds an inline person1.planets / person2.planets refinement
 * because the spec response itself does not yet expose them.
 */
const DATA_TYPES: Record<string, string> = {
	'natal-chart': 'NatalChartResponse',
	'astrocartography-map': 'AstrocartographyResponse',
	'local-space-compass': 'LocalSpaceResponse',
	'relocation-wheel': 'RelocationChartResponse',
	'positions-table':
		'AsteroidsResponse | LilithResponse | ProgressionsResponse | SolarArcResponse | ArabicLotsResponse',
	'fixed-stars': 'FixedStarsResponse',
	'profection-card': 'ProfectionsResponse',
	'western-planets-table': 'NatalChartResponse',
	'horoscope-card':
		'GetDailyHoroscopeResponse | GetWeeklyHoroscopeResponse | GetMonthlyHoroscopeResponse',
	'synastry-chart':
		"CalculateSynastryResponse & { person1?: { planets?: NatalChartResponse['planets'] }; person2?: { planets?: NatalChartResponse['planets'] } }",
	'compatibility-card':
		'CalculateCompatibilityResponse | CalculateNumCompatibilityResponse | CalculateBioCompatibilityResponse',
	'moon-phase':
		'GetCurrentMoonPhaseResponse | GetUpcomingMoonPhasesResponse | GetMoonCalendarResponse',
	'vedic-kundli': 'BirthChartResponse',
	'vedic-planets-table': 'BirthChartResponse',
	'panchang-table': 'GetBasicPanchangResponse | GetDetailedPanchangResponse',
	'dasha-timeline':
		'GetCurrentDashaResponse | GetMajorDashasResponse | GetSubDashasResponse',
	'dosha-card': 'ManglikResponse | KalsarpaResponse | SadhesatiResponse',
	'guna-milan': 'CompatibilityResponse',
	'kp-planets-table': 'KpPlanetsResponse',
	'kp-chart': 'KpChartResponse',
	'kp-ruling-planets': 'KpRulingPlanetsResponse',
	'nakshatra-card': 'NakshatraResponse',
	'numerology-card':
		'CalculateLifePathResponse | CalculateExpressionResponse | CalculateSoulUrgeResponse | CalculatePersonalityResponse | CalculateBirthDayResponse | CalculateMaturityResponse | GetDailyNumberResponse | CalculatePersonalDayResponse | CalculatePersonalMonthResponse | CalculatePersonalYearResponse | GenerateNumerologyChartResponse',
	'reference-card':
		'GetZodiacSignResponse | GetPlanetMeaningResponse | GetRashiResponse | GetTrigramResponse | GetGateResponse | GetCenterResponse | GetNumberMeaningResponse | GetCompoundNumberResponse',
	'tarot-card': 'GetCardResponse | GetDailyCardResponse',
	'tarot-catalog': 'ListCardsResponse',
	'tarot-spread':
		'CastThreeCardResponse | CastCelticCrossResponse | CastLoveSpreadResponse | CastYesNoResponse | CastReadingResponse | CastCareerSpreadResponse | CastCustomSpreadResponse | DrawCardsResponse',
	'forecast-timeline':
		'GenerateTimelineResponse | FindSignificantDatesResponse | ForecastTransitsResponse',
	'biorhythm-chart':
		'GetDailyBiorhythmResponse | GetForecastResponse | GetCriticalDaysResponse',
	bodygraph: 'GenerateBodygraphResponse',
	'hd-type-card': 'CalculateTypeResponse | CalculateProfileResponse',
	'hd-connection': 'CalculateConnectionResponse',
	'hd-penta': 'CalculatePentaResponse',
	'hd-variables': 'CalculateVariablesResponse',
	hexagram:
		'GetHexagramResponse | GetRandomHexagramResponse | LookupHexagramResponse | GetDailyHexagramResponse | CastReadingResponse',
	'transits-table': 'TransitsResponse',
	'aspects-table':
		'CalculateAspectsResponse | CalculateTransitAspectsResponse | DetectAspectPatternsResponse',
	'vedic-aspects': 'CalculateDrishtiResponse',
	'hora-table': 'GetHoraResponse',
	'forecast-digest': 'GenerateDigestResponse',
	'crystal-card': 'GetCrystalResponse',
	'dream-search': 'SearchDreamSymbolsResponse',
	'divisional-chart': 'DivisionalChartResponse',
	'ashtakavarga-grid': 'AshtakavargaResponse',
	'shadbala-table': 'ShadbalaResponse',
	'yoga-list':
		'ListYogasResponse | GetYogaResponse | DetectYogasResponse | { yogas: GetYogaResponse[] }',
	'choghadiya-grid': 'GetChoghadiyaResponse',
	'dream-card': 'GetDreamSymbolResponse',
	'angel-number-card': 'GetAngelNumberResponse',
	'angel-number-lookup': 'AnalyzeNumberSequenceResponse',
	'crystal-grid':
		'ListCrystalsResponse | GetCrystalsByChakraResponse | GetCrystalsByElementResponse | GetCrystalsByZodiacResponse | GetBirthstonesResponse | SearchCrystalsResponse',
	// helpers and the generic fallback have no fixed shape
	'endpoint-form': 'unknown',
	'location-search': 'unknown',
	data: 'unknown',
};

/**
 * Slug → typed configuration props. Each entry mirrors a reactive `@property`
 * on the matching Lit element that selects a view, mode, or chart layout (the
 * `data` payload is handled separately). Without these the consumer can still
 * pass the attribute through `...rest`, but loses the literal-union type and
 * the camelCase ergonomics. The wrapper sets each as a JS property on the
 * element after load, so Lit reflects it to its attribute and the value
 * survives the lazy bundle boundary the same way `data` does.
 *
 * `prop` is the Lit accessor name (camelCase). Keep these literal unions in
 * sync with the matching component's `@property` declaration.
 */
interface ConfigPropDef {
	prop: string;
	type: string;
	comment: string;
}

/**
 * Universal self-fetch props, present on every data-bound component because they live on the shared {@link RoxyDataElement} base. They are wired identically to {@link CONFIG_PROPS} (a useEffect sets the matching Lit accessor), so adding them here is enough to make uncontrolled mode a typed, first-class part of every React wrapper. Set `endpoint` + `publishableKey` to let the component render its own input form and fetch live; leave them unset for controlled mode (pass `data`).
 */
const SELF_FETCH_PROPS: ConfigPropDef[] = [
	{
		prop: 'endpoint',
		type: 'string',
		comment:
			'Endpoint path for built-in self-fetch (uncontrolled mode), e.g. "astrology/natal-chart". The component renders its own input form, fetches with the publishable key, and displays the result. Leave unset for controlled mode (pass `data`).',
	},
	{
		prop: 'method',
		type: "'GET' | 'POST'",
		comment: 'HTTP method for the self-fetch request. Defaults to POST.',
	},
	{
		prop: 'publishableKey',
		type: 'string',
		comment:
			'Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side and never sent.',
	},
	{
		prop: 'baseUrl',
		type: 'string',
		comment: 'Override the API origin for self-hosted or proxied deployments.',
	},
	{
		prop: 'specUrl',
		type: 'string',
		comment: 'Override the OpenAPI spec URL the self-fetch form introspects.',
	},
];

const CONFIG_PROPS: Record<string, ConfigPropDef[]> = {
	'positions-table': [
		{
			prop: 'heading',
			type: 'string',
			comment:
				'Override the auto-derived heading. Empty by default, in which case it is derived from the response shape (Asteroids, Black Moon Lilith, Secondary progressions, Solar arc directions, or Arabic lots).',
		},
	],
	'tarot-catalog': [
		{
			prop: 'heading',
			type: 'string',
			comment:
				'Override the auto-derived gallery heading. Empty by default, in which case the heading is "Tarot deck".',
		},
	],
	'natal-chart': [
		{
			prop: 'houseSystem',
			type: "'placidus' | 'whole-sign' | 'equal' | 'koch'",
			comment:
				'House system the chart was cast with. Labels the house cusps; does not recompute positions.',
		},
	],
	'horoscope-card': [
		{
			prop: 'period',
			type: "'daily' | 'weekly' | 'monthly'",
			comment:
				'Which horoscope cadence the response is for. Selects the heading and date framing.',
		},
	],
	'moon-phase': [
		{
			prop: 'mode',
			type: "'current' | 'upcoming' | 'calendar'",
			comment:
				'Which moon-phase response shape to render: a single current phase, an upcoming list, or a calendar.',
		},
	],
	'compatibility-card': [
		{
			prop: 'mode',
			type: "'astrology' | 'numerology' | 'biorhythm'",
			comment:
				'Which compatibility domain the response is from. Themes the card and labels the category breakdown.',
		},
	],
	'vedic-kundli': [
		{
			prop: 'chartStyle',
			type: "'south' | 'north' | 'east'",
			comment:
				'Initial regional kundli layout. The end user can switch styles at runtime via the visible tablist.',
		},
		{
			prop: 'chartReference',
			type: "'lagna' | 'moon'",
			comment:
				'Ascendant reference point. "lagna" (default) uses the Janma Lagna; "moon" renders the Chandra Lagna (Moon as house 1) from the same response.',
		},
		{
			prop: 'lagnaOverride',
			type: 'string',
			comment:
				'Explicit rashi/sign name to pin as the ascendant, overriding both the Janma Lagna and chartReference. Empty by default. Use for Surya Lagna, Arudha Lagna, or any custom reference chart.',
		},
	],
	'divisional-chart': [
		{
			prop: 'chartStyle',
			type: "'south' | 'north' | 'east'",
			comment:
				'Initial regional varga layout. The end user can switch styles at runtime via the visible tablist.',
		},
	],
	'panchang-table': [
		{
			prop: 'detail',
			type: "'basic' | 'detailed'",
			comment:
				'Whether the response is the basic five-limb panchang or the detailed muhurta set. Detailed mode shows the auspicious and inauspicious period sections.',
		},
	],
	'dasha-timeline': [
		{
			prop: 'period',
			type: "'current' | 'major' | 'sub'",
			comment:
				'Which dasha response shape to render: the current running periods, the major mahadashas, or the sub-period breakdown.',
		},
	],
	'dosha-card': [
		{
			prop: 'type',
			type: "'manglik' | 'kalsarpa' | 'sadhesati'",
			comment:
				'Which dosha to title and theme. The three dosha responses share a shape, so the card cannot infer this. Defaults to manglik, so set it explicitly per card.',
		},
	],
	'numerology-card': [
		{
			prop: 'type',
			type: "'life-path' | 'expression' | 'soul-urge' | 'personality' | 'birth-day' | 'maturity' | 'daily' | 'personal-day' | 'personal-month' | 'personal-year' | 'chart'",
			comment:
				'Which numerology response the card is showing. Selects the heading and which fields are surfaced.',
		},
	],
	'tarot-spread': [
		{
			prop: 'spread',
			type: "'three-card' | 'celtic-cross' | 'love' | 'career' | 'custom' | 'yes-no' | 'draw'",
			comment:
				'Which spread layout the response is for. Positions the cards and selects the reading template.',
		},
	],
	'biorhythm-chart': [
		{
			prop: 'mode',
			type: "'daily' | 'forecast' | 'critical-days'",
			comment:
				'Which biorhythm response shape to render: a single day, a multi-day forecast, or the critical days list.',
		},
	],
	hexagram: [
		{
			prop: 'mode',
			type: "'lookup' | 'cast' | 'daily'",
			comment:
				'Which I Ching response shape to render: a static hexagram lookup, a cast with changing lines, or the daily hexagram.',
		},
	],
	'crystal-grid': [
		{
			prop: 'heading',
			type: 'string',
			comment:
				'Override the auto-derived grid heading. Empty by default, in which case the heading is derived from the response filter (chakra, element, zodiac sign, or birth month).',
		},
	],
};

/**
 * Slug → CustomEvent name → React handler prop name.
 * Only the documented widget events are exposed. Pure renderers fire no
 * events and therefore declare no handler props.
 */
interface EventDef {
	event: string;
	prop: string;
	detailType: string;
}

const EVENTS: Record<string, EventDef[]> = {
	'endpoint-form': [
		{
			event: 'roxy-submit',
			prop: 'onRoxySubmit',
			detailType: '{ endpoint: string; values: Record<string, unknown> }',
		},
		{
			event: 'roxy-validation-error',
			prop: 'onRoxyValidationError',
			detailType: '{ missing: string[] }',
		},
		{
			event: 'roxy-spec-error',
			prop: 'onRoxySpecError',
			detailType: '{ url: string; message: string }',
		},
	],
	'location-search': [
		{
			event: 'roxy-location-select',
			prop: 'onRoxyLocationSelect',
			detailType:
				"NonNullable<SearchCitiesResponse['cities']>[number] | { latitude?: number; longitude?: number; timezone?: string; utcOffset?: number; city?: string; province?: string; country?: string }",
		},
		{
			event: 'roxy-validation-error',
			prop: 'onRoxyValidationError',
			detailType: '{ reason: string; message: string }',
		},
	],
};

/**
 * Spec types referenced across the wrappers. We collect them once, sort them,
 * and emit a single `import type` from `@roxyapi/ui` per component file. This
 * keeps the codegen output deterministic and tree-shake friendly: each
 * `.tsx` only imports the types it uses.
 */
function collectTypeRefs(slug: string): string[] {
	const refs = new Set<string>();
	const dataType = DATA_TYPES[slug];
	if (dataType && dataType !== 'unknown') {
		for (const m of dataType.matchAll(/[A-Z][A-Za-z0-9]+Response/g)) {
			refs.add(m[0]);
		}
	}
	for (const ev of EVENTS[slug] ?? []) {
		for (const m of ev.detailType.matchAll(/[A-Z][A-Za-z0-9]+Response/g)) {
			refs.add(m[0]);
		}
	}
	return Array.from(refs).sort();
}

const LOAD_UI_TS = `/**
 * Loads the matching component bundle on first mount. Idempotent across
 * many components on the same page. Skips on the server (no document) so
 * React server components and Next.js SSR work without a flash.
 *
 * Pass an explicit \`version\` (e.g. \`'0.1.5'\`) to pin the loaded bundle to a
 * specific @roxyapi/ui release; the default ('latest') resolves to whatever
 * the CDN currently serves for @latest.
 */
const SCRIPT_ID = 'roxyapi-ui-loader';
const CDN_BASE_LATEST = ${JSON.stringify(CDN_BASE_LATEST)};
const CDN_BASE_PREFIX = ${JSON.stringify(CDN_BASE_PREFIX)};
const CDN_BASE_SUFFIX = ${JSON.stringify(CDN_BASE_SUFFIX)};

let loaded: Promise<void> | null = null;

function buildBase(version: string): string {
	if (!version || version === 'latest') return CDN_BASE_LATEST;
	return \`\${CDN_BASE_PREFIX}\${version}\${CDN_BASE_SUFFIX}\`;
}

export function ensureScriptLoaded(version: string = 'latest'): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	if (loaded) return loaded;

	loaded = new Promise<void>((resolve, reject) => {
		const url = \`\${buildBase(version)}/roxy-ui.js\`;
		let existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
		if (existing) {
			if (existing.dataset.loaded === 'true') {
				resolve();
			} else {
				existing.addEventListener('load', () => resolve());
				existing.addEventListener('error', () => reject(new Error('roxy-ui load failed')));
			}
			return;
		}
		existing = document.createElement('script');
		existing.id = SCRIPT_ID;
		existing.src = url;
		existing.async = true;
		existing.crossOrigin = 'anonymous';
		existing.addEventListener('load', () => {
			existing!.dataset.loaded = 'true';
			resolve();
		});
		existing.addEventListener('error', () => reject(new Error('roxy-ui load failed')));
		document.head.appendChild(existing);
	});
	return loaded;
}

// Default export retained for convenience; matches the named export.
export default ensureScriptLoaded;
// Surfaces the embedded @roxyapi/ui version this build of @roxyapi/ui-react
// was generated against. Useful for diagnostics; not load-bearing.
export const ROXY_UI_VERSION = ${JSON.stringify(ROXY_UI_VERSION)};
`;

function buildComponent(slug: string, pascal: string, tag: string): string {
	const dataType = DATA_TYPES[slug] ?? 'unknown';
	const hasData = dataType !== 'unknown';
	const events = EVENTS[slug] ?? [];
	// Data-bound components extend RoxyDataElement, so they all carry the self-fetch
	// props in addition to their own config. The generic renderer, location search,
	// and endpoint form (hasData === false) are not RoxyDataElement subclasses.
	const config = hasData
		? [...(CONFIG_PROPS[slug] ?? []), ...SELF_FETCH_PROPS]
		: (CONFIG_PROPS[slug] ?? []);
	const typeRefs = collectTypeRefs(slug);

	const importLine =
		typeRefs.length > 0
			? `import type { ${typeRefs.join(', ')} } from '@roxyapi/ui/types';`
			: '';

	const configPropsBlock = config
		.map((c) => `\t/** ${c.comment} */\n\t${c.prop}?: ${c.type};`)
		.join('\n');

	const configEffectBlocks = config
		.map(
			(c) => `\t\tReact.useEffect(() => {
\t\t\tconst el = internal.current;
\t\t\tif (el && ${c.prop} !== undefined) {
\t\t\t\t(el as unknown as { ${c.prop}: ${c.type} }).${c.prop} = ${c.prop};
\t\t\t}
\t\t}, [${c.prop}, loaded]);`,
		)
		.join('\n\n');

	const eventPropsBlock = events
		.map(
			(e) =>
				`\t/** Fires when the underlying <${tag}> dispatches \`${e.event}\`. */\n\t${e.prop}?: (event: CustomEvent<${e.detailType}>) => void;`,
		)
		.join('\n');

	const eventEffectBlocks = events
		.map((e) => {
			return `\t\tReact.useEffect(() => {
\t\t\tconst el = internal.current;
\t\t\tconst handler = ${e.prop};
\t\t\tif (!el || !handler) return;
\t\t\tconst listener = (event: Event) => handler(event as CustomEvent<${e.detailType}>);
\t\t\tel.addEventListener('${e.event}', listener);
\t\t\treturn () => el.removeEventListener('${e.event}', listener);
\t\t}, [${e.prop}, loaded]);`;
		})
		.join('\n\n');

	const handlerDestructure =
		events.length > 0 ? `, ${events.map((e) => e.prop).join(', ')}` : '';

	const configDestructure =
		config.length > 0 ? `, ${config.map((c) => c.prop).join(', ')}` : '';

	const dataDestructure = hasData ? 'data, ' : '';
	const dataPropDecl = hasData
		? `\t/** Spec-derived response payload. Pass the raw RoxyAPI response. */
\tdata?: ${dataType};
\t`
		: '\t';
	const elementAttrsOmit = hasData ? `'children' | 'data'` : `'children'`;
	const dataEffectBlock = hasData
		? `\t\tReact.useEffect(() => {
\t\t\tconst el = internal.current;
\t\t\tif (el && data !== undefined) {
\t\t\t\t(el as unknown as { data: unknown }).data = data;
\t\t\t}
\t\t}, [data, loaded]);

`
		: '';

	return `import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';
${importLine ? `${importLine}\n` : ''}
type ElementAttrs = Omit<
\tReact.HTMLAttributes<HTMLElement>,
\t${elementAttrsOmit}
>;

export interface ${pascal}Props extends ElementAttrs {
${dataPropDecl}className?: string;
\tstyle?: React.CSSProperties;
${configPropsBlock ? `${configPropsBlock}\n` : ''}${eventPropsBlock}
}

export const ${pascal} = React.forwardRef<HTMLElement | null, ${pascal}Props>(
\tfunction ${pascal}({ ${dataDestructure}className, style${configDestructure}${handlerDestructure}, ...rest }, ref) {
\t\tconst internal = React.useRef<HTMLElement | null>(null);
\t\tReact.useImperativeHandle<HTMLElement | null, HTMLElement | null>(
\t\t\tref,
\t\t\t() => internal.current,
\t\t\t[],
\t\t);
\t\tconst [loaded, setLoaded] = React.useState(false);
\t\tconst [error, setError] = React.useState<Error | null>(null);

\t\tReact.useEffect(() => {
\t\t\tlet active = true;
\t\t\tensureScriptLoaded()
\t\t\t\t.then(() => {
\t\t\t\t\tif (active) setLoaded(true);
\t\t\t\t})
\t\t\t\t.catch((err: unknown) => {
\t\t\t\t\tif (!active) return;
\t\t\t\t\tsetError(err instanceof Error ? err : new Error(String(err)));
\t\t\t\t});
\t\t\treturn () => {
\t\t\t\tactive = false;
\t\t\t};
\t\t}, []);

${dataEffectBlock}${configEffectBlocks ? `${configEffectBlocks}\n\n` : ''}${eventEffectBlocks ? `${eventEffectBlocks}\n\n` : ''}\t\tif (error) {
\t\t\treturn React.createElement(
\t\t\t\t'div',
\t\t\t\t{ role: 'alert', className, style },
\t\t\t\t\`Roxy UI script load failed: \${error.message}\`,
\t\t\t);
\t\t}

\t\treturn React.createElement('${tag}', {
\t\t\tref: internal,
\t\t\tclassName,
\t\t\tstyle,
\t\t\t...rest,
\t\t});
\t},
);
`;
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	await mkdir(`${OUT_DIR}/components`, { recursive: true });

	await writeFile(`${OUT_DIR}/load-ui.ts`, LOAD_UI_TS);

	const exportLines: string[] = [
		`export { ensureScriptLoaded, ROXY_UI_VERSION } from './load-ui.js';`,
	];
	for (const { slug, pascal, tag } of ROXY_COMPONENTS) {
		await writeFile(
			`${OUT_DIR}/components/${slug}.tsx`,
			buildComponent(slug, pascal, tag),
		);
		exportLines.push(
			`export { ${pascal}, type ${pascal}Props } from './components/${slug}.js';`,
		);
	}

	await writeFile(`${OUT_DIR}/index.ts`, `${exportLines.join('\n')}\n`);
	console.log(
		`Generated React wrappers for ${ROXY_COMPONENTS.length} components.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
