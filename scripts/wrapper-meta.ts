/**
 * Shared metadata for the typed framework wrapper packages (`@roxyapi/ui-react` via {@link ../scripts/build-react.ts}, `@roxyapi/ui-vue` via {@link ../scripts/build-vue.ts}).
 *
 * @remarks
 * `manifest.ts` owns the component list (pascal, tag, slug, domain, ...). It does NOT own the wrapper type surface, which is what lives here: which spec response each component's `data` prop takes, which typed config attributes it exposes, and which CustomEvents it fires.
 *
 * Every generator reads these maps. Do not re-declare them in a build script: a fork would drift silently, and the wrappers would disagree about the same element's public API. Adding a component means adding it to {@link DATA_TYPES} (always) and {@link CONFIG_PROPS} (only if the element has a view/mode/layout/heading `@property`); every wrapper package then picks it up on the next build.
 *
 * The lazy CDN loader ({@link LOAD_UI_TS}) is framework-agnostic, so it is emitted verbatim into each wrapper package from here rather than copied per generator.
 */
import { readFile } from 'node:fs/promises';

export const ROXY_UI_VERSION = (
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
export const DATA_TYPES: Record<string, string> = {
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
		'GetCurrentDashaResponse | GetMajorDashasResponse | GetSubDashasResponse | GetPratyantardashasResponse | GetSookshmaDashasResponse | GetPranaDashasResponse',
	'dosha-card': 'ManglikResponse | KalsarpaResponse | SadhesatiResponse',
	'guna-milan': 'CompatibilityResponse',
	'kp-planets-table': 'KpPlanetsResponse',
	'kp-chart': 'KpChartResponse',
	'kp-ruling-planets': 'KpRulingPlanetsResponse',
	'nakshatra-card': 'NakshatraResponse',
	'numerology-card':
		'CalculateLifePathResponse | CalculateExpressionResponse | CalculateSoulUrgeResponse | CalculatePersonalityResponse | CalculateBirthDayResponse | CalculateMaturityResponse | GetDailyNumberResponse | CalculatePersonalDayResponse | CalculatePersonalMonthResponse | CalculatePersonalYearResponse | GenerateNumerologyChartResponse',
	'reference-card':
		'GetZodiacSignResponse | GetPlanetMeaningResponse | GetRashiResponse | GetTrigramResponse | GetGateResponse | GetCenterResponse | GetNumberMeaningResponse | GetCompoundNumberResponse | GetAvasthaResponse',
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
	'transit-wheel': 'CalculateTransitAspectsResponse',
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
	'heliacal-table': 'HeliacalResponse',
	'gochara-table': 'CalculateTransitResponse',
	'bhava-bala-table': 'BhavaBalaResponse',
	'bhav-chalit-table': 'BhavChalitResponse',
	'upagraha-table': 'UpagrahaResponse',
	'chara-karakas': 'CharaKarakaResponse',
	'arudha-padas': 'ArudhaResponse',
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
 * pass the attribute through, but loses the literal-union type and the
 * camelCase ergonomics. Every wrapper sets these as JS properties on the
 * element, never as attributes, so Lit reflects them itself and the custom
 * attribute names (`chartStyle` → `chart-style`, `endpoint` → `data-endpoint`)
 * never have to be re-derived per framework.
 *
 * `prop` is the Lit accessor name (camelCase). Keep these literal unions in
 * sync with the matching component's `@property` declaration.
 */
export interface ConfigPropDef {
	prop: string;
	type: string;
	comment: string;
}

/**
 * Universal props, present on every data-bound component because they live on the shared `RoxyDataElement` base rather than on any one element. They are wired identically to {@link CONFIG_PROPS}, so adding one here is enough to make it a typed, first-class part of every wrapper, including components added later.
 *
 * @remarks
 * Most of these drive uncontrolled mode: set `endpoint` + `publishableKey` and the component renders its own input form and fetches live; leave them unset for controlled mode (pass `data`). `hideReadings` is the exception and is not about fetching at all, which is why this list is named for the base and not for self-fetch.
 */
export const BASE_PROPS: ConfigPropDef[] = [
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
	{
		prop: 'lang',
		type: 'string',
		comment:
			'Response language for self-fetch, forwarded to the API `lang` query parameter (en, tr, de, es, hi, pt, fr, ru). The form never shows a language field; the site owner sets it here. Defaults to English.',
	},
	{
		prop: 'submitLabel',
		type: 'string',
		comment:
			'Override the self-fetch form submit-button label. Empty derives an outcome-first label from the endpoint (Get reading, Generate, Compare, Cast).',
	},
	{
		prop: 'attribution',
		type: 'string',
		comment:
			'Render a small "Spiritual data by RoxyAPI" credit under a self-fetch result, linking back to RoxyAPI. Off by default; set any value to enable, or "off" to force it off. Never shown in controlled mode.',
	},
	{
		prop: 'hideReadings',
		type: 'boolean',
		comment:
			'Render the chart and the data and omit the written interpretation. Off by default. Use it when the page supplies its own words: the wheels, tables, grids, legends and numbers stay, and the interpretive prose is left out of the markup entirely.',
	},
];

export const CONFIG_PROPS: Record<string, ConfigPropDef[]> = {
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
	'transit-wheel': [
		{
			prop: 'heading',
			type: 'string',
			comment: 'Heading above the bi-wheel. Defaults to "Transits".',
		},
		{
			prop: 'ascendant',
			type: 'number',
			comment:
				'Natal Ascendant as an ecliptic longitude in degrees (0-360), supplied by the page from a chart endpoint that returns one. Rotates the wheel so that longitude falls on the left horizon and draws the ASC/DSC axis. Leave it unset and the wheel keeps a fixed zodiacal orientation with 0 degrees Aries on the left; no house cusps are drawn either way, because the transit-aspects response carries none.',
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
			type: "'current' | 'major' | 'sub' | 'antara' | 'sookshma' | 'prana'",
			comment:
				'Which dasha response shape to render: the running periods, the major mahadashas, or one of the four drill-down levels (antardashas, pratyantardashas, sookshma dashas, prana dashas).',
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
 * Slug → CustomEvent name → handler prop name.
 * Only the documented widget events are exposed. Pure renderers fire no
 * events and therefore declare no handler props.
 */
export interface EventDef {
	event: string;
	prop: string;
	detailType: string;
}

export const EVENTS: Record<string, EventDef[]> = {
	'endpoint-form': [
		{
			event: 'roxy-submit',
			prop: 'onRoxySubmit',
			detailType:
				'{ endpoint: string; values: Record<string, unknown>; queryKeys: string[]; sticky: boolean }',
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
 * generated file only imports the types it uses.
 */
export function collectTypeRefs(slug: string): string[] {
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

/** Everything a generator needs to emit one typed wrapper. */
export interface WrapperMeta {
	dataType: string;
	hasData: boolean;
	config: ConfigPropDef[];
	events: EventDef[];
	typeRefs: string[];
}

/**
 * Components that take no response at all. They are plain `LitElement`s driven by configuration (`RoxyLocationSearch`, `RoxyEndpointForm`), NOT `RoxyDataElement` subclasses, so they get no `data` prop and must not advertise {@link BASE_PROPS}.
 *
 * @remarks
 * Membership here, not the shape of the type, is what decides. Deriving it as `DATA_TYPES[slug] !== 'unknown'` instead would conflate "not a data component" with "a data component whose response type genuinely IS `unknown`", and `roxy-data` is the latter: it is a `RoxyDataElement<Json>` that renders ANY response, which is the whole point of the generic fallback. Such a component would lose its `data` prop in both wrapper packages and could only ever render its empty state.
 */
const NO_DATA_SLUGS = new Set(['location-search', 'endpoint-form']);

/**
 * Resolve the full wrapper surface for one component. Every generator goes through this so the React and Vue packages cannot disagree about the same element.
 *
 * @remarks
 * The base-class rule is the one derivation worth centralising: data-bound components extend `RoxyDataElement` and therefore ALL carry {@link BASE_PROPS} on top of their own config. See {@link NO_DATA_SLUGS} for the two that do not.
 */
export function wrapperMeta(slug: string): WrapperMeta {
	const dataType = DATA_TYPES[slug] ?? 'unknown';
	const hasData = !NO_DATA_SLUGS.has(slug);
	const own = CONFIG_PROPS[slug] ?? [];
	return {
		dataType,
		hasData,
		config: hasData ? [...own, ...BASE_PROPS] : own,
		events: EVENTS[slug] ?? [],
		typeRefs: collectTypeRefs(slug),
	};
}

/**
 * The lazy CDN loader, shared by every wrapper package. Its body touches no framework API, so each package emits the identical implementation rather than carrying a near-copy that can drift. Only the two prose lines that name the host framework are parameterised.
 */

/**
 * Response types are copied INTO each wrapper package rather than imported from `@roxyapi/ui`, so a wrapper is self-contained: installing `@roxyapi/ui-react` or `@roxyapi/ui-vue` alone gives you fully typed props with no second install.
 *
 * @remarks
 * Never replace this with `import type { ... } from '@roxyapi/ui/types'`. Neither wrapper declares `@roxyapi/ui` as a dependency, and a local `paths` mapping resolves such an import inside this repo, so the build stays green while the published `.d.ts` carries an import of a package the consumer never installs. Under the TypeScript default `skipLibCheck: true` that unresolved import is swallowed and every `data` prop degrades to `any`; under `skipLibCheck: false` it is a hard `TS2307`. Either way the typed wrapper would not actually be typed. Vendoring is what makes the guarantee real.
 */
export const TYPES_IMPORT = '../types/index.js';

/** Copy the generated response types into a wrapper package so it needs no dependency on `@roxyapi/ui`. See {@link TYPES_IMPORT}. */
export async function emitTypes(outDir: string): Promise<void> {
	const { cp, mkdir } = await import('node:fs/promises');
	await mkdir(`${outDir}/types`, { recursive: true });
	await cp('packages/ui/src/types', `${outDir}/types`, { recursive: true });
}

export function loadUiSource(opts: {
	/** Completes "Skips on the server (no document) so ..." in the file header. */
	ssrNote: string;
	/** The wrapper package this file is emitted into, e.g. `@roxyapi/ui-react`. */
	packageName: string;
}): string {
	return `/**
 * Loads the matching component bundle on first mount. Idempotent across
 * many components on the same page. Skips on the server (no document) so
 * ${opts.ssrNote}
 *
 * Defaults to the EXACT @roxyapi/ui release this wrapper was built against, so
 * \`@roxyapi/ui-vue@x.y.z\` always runs \`@roxyapi/ui@x.y.z\` and a lockfile actually
 * pins the runtime. It used to default to '@latest', which meant a pinned wrapper
 * silently picked up whatever the CDN was serving, and a new @roxyapi/ui release
 * changed the elements under every existing install with no lockfile change.
 *
 * Pass an explicit \`version\` to override, or 'latest' to opt back into floating.
 *
 * Pass \`baseUrl\` to serve the bundle from your own origin instead of the CDN, which is
 * what an air-gapped install or a strict Content-Security-Policy needs: copy
 * \`node_modules/@roxyapi/ui/dist/cdn/\` onto your host and call this once at app entry,
 * before any component mounts. The loader keeps a single shared promise, so the first
 * call wins and every component reuses it.
 */
/** The @roxyapi/ui release this wrapper was generated against. The loader defaults to it, so the wrapper version in your lockfile is the runtime you actually get. */
export const ROXY_UI_VERSION = ${JSON.stringify(ROXY_UI_VERSION)};

const SCRIPT_ID = 'roxyapi-ui-loader';
const CDN_BASE_LATEST = ${JSON.stringify(CDN_BASE_LATEST)};
const CDN_BASE_PREFIX = ${JSON.stringify(CDN_BASE_PREFIX)};
const CDN_BASE_SUFFIX = ${JSON.stringify(CDN_BASE_SUFFIX)};

let loaded: Promise<void> | null = null;

function buildBase(version: string): string {
	if (!version || version === 'latest') return CDN_BASE_LATEST;
	return \`\${CDN_BASE_PREFIX}\${version}\${CDN_BASE_SUFFIX}\`;
}

export function ensureScriptLoaded(
	version: string = ROXY_UI_VERSION,
	baseUrl?: string,
): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	if (loaded) return loaded;

	loaded = new Promise<void>((resolve, reject) => {
		const url = \`\${baseUrl ?? buildBase(version)}/roxy-ui.js\`;
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
// Surfaces the embedded @roxyapi/ui version this build of ${opts.packageName}
// was generated against. Useful for diagnostics; not load-bearing.
`;
}
