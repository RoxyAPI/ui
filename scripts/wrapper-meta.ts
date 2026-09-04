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
import { API_LANGUAGES } from '../packages/ui/src/generated/api-languages.js';

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
 * The languages a catalogue payload exists for, derived from the spec-generated {@link API_LANGUAGES} rather than listed.
 *
 * @remarks
 * English is absent BY DESIGN and `dist/cdn/locales/en.js` is a deliberate 404: the catalogue key is the English source string, so an English page downloads nothing. Requesting a language we do not ship would append a script tag that 404s, so the wrapper loader checks membership first and resolves to a no-op instead. Same guard the `/embed` route applies before a tag reaches a `<script src>`.
 */
const WRAPPER_LOCALES = API_LANGUAGES.filter((l) => l !== 'en');

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
	'ephemeris-table':
		'GetMonthlyTropicalEphemerisResponse | GetMonthlyEphemerisResponse',
	'fixed-stars': 'FixedStarsResponse',
	'profection-card': 'ProfectionsResponse',
	'western-planets-table': 'NatalChartResponse',
	'horoscope-card':
		'GetDailyHoroscopeResponse | GetWeeklyHoroscopeResponse | GetMonthlyHoroscopeResponse | GetYearlyHoroscopeResponse',
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
	'bazi-chart': 'GenerateBaziChartResponse',
	'luck-pillars': 'CalculateLuckPillarsResponse',
	'zodiac-card':
		'CalculateZodiacAnimalResponse | GetZodiacAnimalResponse | GetDailyZodiacReadingResponse | GetZodiacCompatibilityResponse',
	'kua-card': 'CalculateKuaNumberResponse | GenerateEightMansionsResponse',
	'mayan-day-sign': 'CalculateTzolkinResponse | GenerateMayanChartResponse',
	'vastu-mandala': 'GenerateMandalaResponse | CalculateEntrancePadaResponse',
	gematria: 'CalculateGematriaResponse',
	'dosha-constitution': 'CalculateAyurvedicConstitutionResponse',
	'almanac-day':
		'GetAlmanacDayResponse | GetMonthlyAlmanacResponse | LookupAuspiciousDaysResponse',
	'flying-star-chart':
		'GenerateFlyingStarChartResponse | GetAnnualFlyingStarsResponse',
	'crystal-card': 'GetCrystalResponse',
	'dream-search': 'SearchDreamSymbolsResponse',
	'divisional-chart': 'DivisionalChartResponse',
	'ashtakavarga-grid': 'AshtakavargaResponse',
	'shadbala-table': 'ShadbalaResponse',
	'heliacal-table': 'HeliacalResponse',
	'vedic-daily': 'GetVedicDailyReadingResponse',
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
		comment:
			'Override the API origin for self-hosted or proxied deployments. Absolute, or relative to the page for a same-origin route.',
	},
	{
		prop: 'submitUrl',
		type: 'string',
		comment:
			'Your own backend route, which holds the secret key. Self-fetch POSTs `{ path, method, body, query }` there instead of calling RoxyAPI directly and renders the JSON your route returns, so no key of any kind reaches the browser.',
	},
	{
		prop: 'submitContext',
		type: 'Record<string, unknown>',
		comment:
			'An object of your own, sent to your submitUrl route as `context` beside the request, so a page can attach its own verification data to a proxied submission. Passed through untouched and never read by the component: what it holds is for your page and your route to agree on. Unset, nothing is added and the route receives the request exactly as before. Rides the submitUrl path only; a direct call sends what the endpoint declares.',
	},
	{
		prop: 'locationUrl',
		type: 'string',
		comment:
			'Where the self-fetch form city search sends its request, absolute or relative to the page. The companion of submitUrl: the city search is a GET the form issues on its own while a visitor types, so a page that routes its API traffic through its own server names that route here as well. Unset, the search calls the public location endpoint.',
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
		prop: 'remember',
		type: 'boolean',
		comment:
			'Persist the last self-fetch form values in sessionStorage, keyed by endpoint, and prefill the form when the visitor returns. Off by default.',
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
	{
		prop: 'hideSections',
		type: 'string',
		comment:
			'Comma-separated list of `part` names to take off this component, for example "patterns" or "patterns, legend". Per element rather than per site, so the same component can drop a block on one page and keep it on another with no CSS. Sibling of hideReadings and a different tool: this hides a whole block whatever it contains, where hideReadings drops interpretive prose out of the markup. Names come from the `parts` array in components-catalog.json; a name the component does not carry hides nothing and is not an error.',
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
	'ephemeris-table': [
		{
			prop: 'heading',
			type: 'string',
			comment:
				'Card heading above the month. Defaults to "Ephemeris", translated into the page language like every other label the component writes.',
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
	// `natal-chart` deliberately has NO entry. It carried a `houseSystem` prop
	// that nothing in the element ever read: the system is a REQUEST parameter and
	// both bound responses echo the one they used, so an attribute could only ever
	// print a label contradicting the cusps drawn beside it. See the element
	// docblock before adding it back.
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
				'Natal Ascendant as an ecliptic longitude in degrees (0-360), supplied by the page from a chart endpoint that returns one. Rotates the wheel so that longitude falls on the left horizon and draws the ASC/DSC axis. Leave it unset and the wheel keeps a fixed zodiacal orientation with 0 degrees Aries on the left.',
		},
		{
			prop: 'houses',
			type: 'Array<{ number: number; longitude: number }> | number[]',
			comment:
				'The twelve natal house cusps, supplied by the page: the /astrology/natal-chart `houses` array verbatim, or twelve bare cusp longitudes in house order. The transit-aspects response numbers every body by house but returns no cusp longitudes, so this is the only way the wheel can draw the sectors those numbers refer to. Supplying it draws the twelve cusps and their numbers, and rotates the first cusp onto the left horizon unless an ascendant is also given. Anything that does not resolve to houses 1 to 12 with finite longitudes is ignored rather than half drawn.',
		},
	],
	'horoscope-card': [
		{
			prop: 'period',
			type: "'daily' | 'weekly' | 'monthly' | 'yearly'",
			comment:
				'Which horoscope cadence the response is for. Selects the heading and date framing.',
		},
		{
			prop: 'layout',
			type: "'auto' | 'column' | 'sections'",
			comment:
				'Which shape the written reading takes. The endpoint returns the same reading twice, once whole as the column and once split into six topic sections, so exactly one is rendered. Defaults to auto, which prefers the column and falls back to the sections for a response that carries none.',
		},
	],
	'zodiac-card': [
		{
			prop: 'mode',
			type: "'sign' | 'animal' | 'daily' | 'compatibility'",
			comment:
				'Which of the four zodiac reads the response is: the animal a date falls in, the reference read of one animal, a daily reading, or the compatibility of a pair.',
		},
	],
	'kua-card': [
		{
			prop: 'mode',
			type: "'kua' | 'mansions'",
			comment:
				'Which read the response is: the Kua number alone, or the full Eight Mansions map, which adds a reading per sector and names the best and worst of them.',
		},
	],
	'mayan-day-sign': [
		{
			prop: 'mode',
			type: "'day' | 'chart'",
			comment:
				'Which read the response is: the Tzolkin day sign alone, or the full Calendar Round chart, which adds the Haab date, the Long Count, the year bearer and the four-fold cross.',
		},
	],
	'vastu-mandala': [
		{
			prop: 'mode',
			type: "'mandala' | 'entrance'",
			comment:
				'Which read the response is: the projected pada grid with a devata on every square, or the entrance read, which lights the square the main door falls on.',
		},
	],
	'almanac-day': [
		{
			prop: 'mode',
			type: "'day' | 'month' | 'auspicious'",
			comment:
				'Which read the response is: one almanac day as a card, a whole month of them as rows, or the days a search returned for one activity.',
		},
	],
	'flying-star-chart': [
		{
			prop: 'mode',
			type: "'natal' | 'annual'",
			comment:
				'Which plate the response is: the natal chart of a building, which carries a mountain and a water star per palace, or one year of stars over it, which carries one.',
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
	// `hexagram` deliberately has NO entry, for the same reason `natal-chart` has
	// none: it carried a `mode` prop nothing read, because the component
	// shape-detects which of its four responses arrived. See its element docblock.
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

/**
 * The framework-free modules a wrapper package needs to render an AI tool result, copied in at the same relative paths they hold in `packages/ui/src`.
 *
 * @remarks
 * Same reasoning as {@link emitTypes}: a wrapper carries what it needs rather than depending on `@roxyapi/ui`, so one install is fully typed and fully working. The layout is mirrored rather than flattened so each file is a byte copy and no import specifier has to be rewritten on the way in.
 *
 * Three files and nothing else. The lookup table is resolved at build time, so neither the endpoint map nor the component manifest is carried here, and the rule that derives a tool name runs in the generator rather than in anything a consumer downloads. Each of these is rewritten on every build, so the wrapper drift gate fails on a hand edit to any of them.
 */
const TOOL_HELPERS = [
	'utils/compact.ts',
	'utils/tool-component.ts',
	'generated/tool-components.ts',
];

/** The index exports {@link TOOL_HELPERS} provides, identical in every package that carries them. */
export const TOOL_HELPER_EXPORTS = `
/**
 * Render the result of an AI tool call: \`componentForTool\` maps the tool name a
 * model hands back to the component that draws that response, and
 * \`expandCompact\` decodes a compact result.
 */
export { expandCompact } from './utils/compact.js';
export {
\tcomponentForTool,
\ttype ToolComponent,
} from './utils/tool-component.js';
`;

/** Copy {@link TOOL_HELPERS} into a wrapper package. */
export async function emitToolHelpers(outDir: string): Promise<void> {
	const { cp, mkdir } = await import('node:fs/promises');
	await mkdir(`${outDir}/utils`, { recursive: true });
	await mkdir(`${outDir}/generated`, { recursive: true });
	for (const file of TOOL_HELPERS) {
		await cp(`packages/ui/src/${file}`, `${outDir}/${file}`);
	}
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
 * {@link ensureLocaleLoaded} is the other half and is OPT-IN: it loads the label
 * catalogue for one language from the same release, so a non-English app calls
 * both. There is one catalogue, shipped by \`@roxyapi/ui\` and read by every
 * wrapper, so nothing is restated here.
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

/** Every language a label catalogue ships for. English is absent on purpose: the catalogue key IS the English string, so an English page downloads nothing. */
export const ROXY_UI_LOCALES = ${JSON.stringify(WRAPPER_LOCALES)} as const;

const localesLoaded = new Map<string, Promise<void>>();

/**
 * Load the label catalogue for one language, so the components write their own
 * headings, buttons, empty states and form labels in it.
 *
 * Call it once at app entry, beside \`ensureScriptLoaded\`. The components read the
 * language from the page (their own \`lang\` attribute, the nearest ancestor
 * carrying one, or \`<html lang>\`), so this call supplies the WORDS and the page
 * supplies the CHOICE. Loading a catalogue a page never asks for is harmless.
 *
 * \`es-AR\`, \`es-MX\` and \`es-419\` all resolve to the \`es\` catalogue, so pass the
 * page tag as it stands. English resolves to nothing at all and is not an error:
 * the catalogue is keyed by the English text, so an English page needs no payload.
 * A language outside \`ROXY_UI_LOCALES\` resolves the same way rather than appending
 * a script tag that 404s.
 *
 * \`version\` and \`baseUrl\` behave exactly as they do for {@link ensureScriptLoaded},
 * and passing the same \`baseUrl\` to both is what an air-gapped or strict-CSP host
 * needs: copy \`node_modules/@roxyapi/ui/dist/cdn/\` onto your own origin, which
 * carries \`locales/\` beside \`roxy-ui.js\`.
 *
 * @example
 * \`\`\`ts
 * import { ensureScriptLoaded, ensureLocaleLoaded } from '${opts.packageName}';
 *
 * ensureScriptLoaded();
 * ensureLocaleLoaded(document.documentElement.lang);
 * \`\`\`
 */
export function ensureLocaleLoaded(
	lang: string,
	version: string = ROXY_UI_VERSION,
	baseUrl?: string,
): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	const base = (lang || '').toLowerCase().split('-')[0] ?? '';
	if (!(ROXY_UI_LOCALES as readonly string[]).includes(base)) {
		return Promise.resolve();
	}
	const existing = localesLoaded.get(base);
	if (existing) return existing;

	const pending = new Promise<void>((resolve, reject) => {
		const id = \`\${SCRIPT_ID}-locale-\${base}\`;
		let el = document.getElementById(id) as HTMLScriptElement | null;
		if (el) {
			if (el.dataset.loaded === 'true') resolve();
			else {
				el.addEventListener('load', () => resolve());
				el.addEventListener('error', () => reject(new Error(\`roxy-ui locale \${base} load failed\`)));
			}
			return;
		}
		el = document.createElement('script');
		el.id = id;
		el.src = \`\${baseUrl ?? buildBase(version)}/locales/\${base}.js\`;
		el.async = true;
		el.crossOrigin = 'anonymous';
		el.addEventListener('load', () => {
			el!.dataset.loaded = 'true';
			resolve();
		});
		el.addEventListener('error', () => reject(new Error(\`roxy-ui locale \${base} load failed\`)));
		document.head.appendChild(el);
	});
	localesLoaded.set(base, pending);
	return pending;
}

// Default export retained for convenience; matches the named export.
export default ensureScriptLoaded;
// Surfaces the embedded @roxyapi/ui version this build of ${opts.packageName}
// was generated against. Useful for diagnostics; not load-bearing.
`;
}
