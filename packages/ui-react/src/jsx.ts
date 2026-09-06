/**
 * Raw-tag typings for the Roxy custom elements, so `<roxy-natal-chart heading="Chart">` type-checks in a React file with no wrapper component and no client JavaScript.
 *
 * @remarks
 * GENERATED. Import it once anywhere in your project and every Roxy tag is typed everywhere:
 *
 * ```ts
 * import '@roxyapi/ui-react/jsx';
 * ```
 *
 * The wrapper components remain the path for a page that passes a response: they set `data` as a property, which markup cannot carry. This file is for the other case, a tag rendered on the server and left alone.
 *
 * Attribute names are the elements' own: several are renamed at the element and the rest are lowercased, so they are read from the source rather than derived from the prop names.
 */
import type * as React from 'react';

/** The standard HTML attribute surface every custom element accepts, plus its own attributes. */
type RoxyElement<A> = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
> &
	A;

/** The attributes every data component takes, from the shared base element. Referenced by the rows below, not exported: the public surface of this module is the tag typings themselves. */
interface RoxyBaseAttributes {
	/** Endpoint path for built-in self-fetch (uncontrolled mode), e.g. "astrology/natal-chart". The component renders its own input form, fetches with the publishable key, and displays the result. Leave unset for controlled mode (pass `data`). */
	'data-endpoint'?: string;
	/** HTTP method for the self-fetch request. Defaults to POST. */
	method?: 'GET' | 'POST';
	/** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side and never sent. */
	'publishable-key'?: string;
	/** Override the API origin for self-hosted or proxied deployments. Absolute, or relative to the page for a same-origin route. */
	'base-url'?: string;
	/** Override the OpenAPI spec URL the self-fetch form introspects. */
	'spec-url'?: string;
	/** Your own backend route, which holds the secret key. Self-fetch POSTs `{ path, method, body, query }` there instead of calling RoxyAPI directly and renders the JSON your route returns, so no key of any kind reaches the browser. */
	'submit-url'?: string;
	/** An object of your own, sent to your submitUrl route as `context` beside the request, so a page can attach its own verification data to a proxied submission. Passed through untouched and never read by the component: what it holds is for your page and your route to agree on. Unset, nothing is added and the route receives the request exactly as before. Rides the submitUrl path only; a direct call sends what the endpoint declares. */
	'submit-context'?: string;
	/** Where the self-fetch form city search sends its request, absolute or relative to the page. The companion of submitUrl: the city search is a GET the form issues on its own while a visitor types, so a page that routes its API traffic through its own server names that route here as well. Unset, the search calls the public location endpoint. */
	'location-url'?: string;
	/** Persist the last self-fetch form values in sessionStorage, keyed by endpoint, and prefill the form when the visitor returns. Off by default. */
	remember?: boolean;
	/** Render the chart and the data and omit the written interpretation. Off by default. Use it when the page supplies its own words: the wheels, tables, grids, legends and numbers stay, and the interpretive prose is left out of the markup entirely. */
	'hide-readings'?: boolean;
	/** Comma-separated list of `part` names to take off this component, for example "patterns" or "patterns, legend". Per element rather than per site, so the same component can drop a block on one page and keep it on another with no CSS. Sibling of hideReadings and a different tool: this hides a whole block whatever it contains, where hideReadings drops interpretive prose out of the markup. Names come from the `parts` array in components-catalog.json; a name the component does not carry hides nothing and is not an error. */
	'hide-sections'?: string;
	/** Override the self-fetch form submit-button label. Empty derives an outcome-first label from the endpoint (Get reading, Generate, Compare, Cast). */
	'submit-label'?: string;
	/** Render a small "Spiritual data by RoxyAPI" credit under a self-fetch result, linking back to RoxyAPI. Off by default; set any value to enable, or "off" to force it off. Never shown in controlled mode. */
	attribution?: string;
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			/** `<RoxyNatalChart>` as a tag. */
			'roxy-natal-chart': RoxyElement<
				RoxyBaseAttributes & {
					heading?: string;
				}
			>;
			/** `<RoxySynastryChart>` as a tag. */
			'roxy-synastry-chart': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyWesternPlanetsTable>` as a tag. */
			'roxy-western-planets-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyTransitsTable>` as a tag. */
			'roxy-transits-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyTransitWheel>` as a tag. */
			'roxy-transit-wheel': RoxyElement<
				RoxyBaseAttributes & {
					/** Heading above the bi-wheel. Defaults to "Transits". */
					heading?: string;
					/** Natal Ascendant as an ecliptic longitude in degrees (0-360), supplied by the page from a chart endpoint that returns one. Rotates the wheel so that longitude falls on the left horizon and draws the ASC/DSC axis. Leave it unset and the wheel keeps a fixed zodiacal orientation with 0 degrees Aries on the left. */
					ascendant?: number;
					/** The twelve natal house cusps, supplied by the page: the /astrology/natal-chart `houses` array verbatim, or twelve bare cusp longitudes in house order. The transit-aspects response numbers every body by house but returns no cusp longitudes, so this is the only way the wheel can draw the sectors those numbers refer to. Supplying it draws the twelve cusps and their numbers, and rotates the first cusp onto the left horizon unless an ascendant is also given. Anything that does not resolve to houses 1 to 12 with finite longitudes is ignored rather than half drawn. */
					houses?: string;
				}
			>;
			/** `<RoxyAspectsTable>` as a tag. */
			'roxy-aspects-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyMoonPhase>` as a tag. */
			'roxy-moon-phase': RoxyElement<
				RoxyBaseAttributes & {
					/** Which moon-phase response shape to render: a single current phase, an upcoming list, or a calendar. */
					mode?: 'current' | 'upcoming' | 'calendar';
				}
			>;
			/** `<RoxyHoroscopeCard>` as a tag. */
			'roxy-horoscope-card': RoxyElement<
				RoxyBaseAttributes & {
					/** Which horoscope cadence the response is for. Selects the heading and date framing. */
					period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
					/** Which shape the written reading takes. The endpoint returns the same reading twice, once whole as the column and once split into six topic sections, so exactly one is rendered. Defaults to auto, which prefers the column and falls back to the sections for a response that carries none. */
					layout?: 'auto' | 'column' | 'sections';
				}
			>;
			/** `<RoxyAstrocartographyMap>` as a tag. */
			'roxy-astrocartography-map': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyLocalSpaceCompass>` as a tag. */
			'roxy-local-space-compass': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyRelocationWheel>` as a tag. */
			'roxy-relocation-wheel': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyPositionsTable>` as a tag. */
			'roxy-positions-table': RoxyElement<
				RoxyBaseAttributes & {
					/** Override the auto-derived heading. Empty by default, in which case it is derived from the response shape (Asteroids, Black Moon Lilith, Secondary progressions, Solar arc directions, or Arabic lots). */
					heading?: string;
				}
			>;
			/** `<RoxyEphemerisTable>` as a tag. */
			'roxy-ephemeris-table': RoxyElement<
				RoxyBaseAttributes & {
					/** Card heading above the month. Defaults to "Ephemeris", translated into the page language like every other label the component writes. */
					heading?: string;
				}
			>;
			/** `<RoxyFixedStars>` as a tag. */
			'roxy-fixed-stars': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyProfectionCard>` as a tag. */
			'roxy-profection-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyCompatibilityCard>` as a tag. */
			'roxy-compatibility-card': RoxyElement<
				RoxyBaseAttributes & {
					/** Which compatibility domain the response is from. Themes the card and labels the category breakdown. */
					mode?: 'astrology' | 'numerology' | 'biorhythm';
				}
			>;
			/** `<RoxyVedicKundli>` as a tag. */
			'roxy-vedic-kundli': RoxyElement<
				RoxyBaseAttributes & {
					/** Initial regional kundli layout. The end user can switch styles at runtime via the visible tablist. */
					'chart-style'?: 'south' | 'north' | 'east';
					/** Ascendant reference point. "lagna" (default) uses the Janma Lagna; "moon" renders the Chandra Lagna (Moon as house 1) from the same response. */
					'chart-reference'?: 'lagna' | 'moon';
					/** Explicit rashi/sign name to pin as the ascendant, overriding both the Janma Lagna and chartReference. Empty by default. Use for Surya Lagna, Arudha Lagna, or any custom reference chart. */
					'lagna-override'?: string;
				}
			>;
			/** `<RoxyDivisionalChart>` as a tag. */
			'roxy-divisional-chart': RoxyElement<
				RoxyBaseAttributes & {
					/** Initial regional varga layout. The end user can switch styles at runtime via the visible tablist. */
					'chart-style'?: 'south' | 'north' | 'east';
				}
			>;
			/** `<RoxyKpChart>` as a tag. */
			'roxy-kp-chart': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyVedicPlanetsTable>` as a tag. */
			'roxy-vedic-planets-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyKpPlanetsTable>` as a tag. */
			'roxy-kp-planets-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyKpRulingPlanets>` as a tag. */
			'roxy-kp-ruling-planets': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyAshtakavargaGrid>` as a tag. */
			'roxy-ashtakavarga-grid': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyShadbalaTable>` as a tag. */
			'roxy-shadbala-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyDashaTimeline>` as a tag. */
			'roxy-dasha-timeline': RoxyElement<
				RoxyBaseAttributes & {
					/** Which dasha response shape to render: the running periods, the major mahadashas, or one of the four drill-down levels (antardashas, pratyantardashas, sookshma dashas, prana dashas). */
					period?:
						| 'current'
						| 'major'
						| 'sub'
						| 'antara'
						| 'sookshma'
						| 'prana';
				}
			>;
			/** `<RoxyGunaMilan>` as a tag. */
			'roxy-guna-milan': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyPanchangTable>` as a tag. */
			'roxy-panchang-table': RoxyElement<
				RoxyBaseAttributes & {
					/** Whether the response is the basic five-limb panchang or the detailed muhurta set. Detailed mode shows the auspicious and inauspicious period sections. */
					detail?: 'basic' | 'detailed';
				}
			>;
			/** `<RoxyVedicAspects>` as a tag. */
			'roxy-vedic-aspects': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyHoraTable>` as a tag. */
			'roxy-hora-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyChoghadiyaGrid>` as a tag. */
			'roxy-choghadiya-grid': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyHeliacalTable>` as a tag. */
			'roxy-heliacal-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyVedicDaily>` as a tag. */
			'roxy-vedic-daily': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyGocharaTable>` as a tag. */
			'roxy-gochara-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyBhavaBalaTable>` as a tag. */
			'roxy-bhava-bala-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyBhavChalitTable>` as a tag. */
			'roxy-bhav-chalit-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyUpagrahaTable>` as a tag. */
			'roxy-upagraha-table': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyCharaKarakas>` as a tag. */
			'roxy-chara-karakas': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyArudhaPadas>` as a tag. */
			'roxy-arudha-padas': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyYogaList>` as a tag. */
			'roxy-yoga-list': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyNakshatraCard>` as a tag. */
			'roxy-nakshatra-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyDoshaCard>` as a tag. */
			'roxy-dosha-card': RoxyElement<
				RoxyBaseAttributes & {
					/** Which dosha to title and theme. The three dosha responses share a shape, so the card cannot infer this. Defaults to manglik, so set it explicitly per card. */
					type?: 'manglik' | 'kalsarpa' | 'sadhesati';
				}
			>;
			/** `<RoxyNumerologyCard>` as a tag. */
			'roxy-numerology-card': RoxyElement<
				RoxyBaseAttributes & {
					/** Which numerology response the card is showing. Selects the heading and which fields are surfaced. */
					type?:
						| 'life-path'
						| 'expression'
						| 'soul-urge'
						| 'personality'
						| 'birth-day'
						| 'maturity'
						| 'daily'
						| 'personal-day'
						| 'personal-month'
						| 'personal-year'
						| 'chart';
				}
			>;
			/** `<RoxyGematria>` as a tag. */
			'roxy-gematria': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyTarotCard>` as a tag. */
			'roxy-tarot-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyTarotCatalog>` as a tag. */
			'roxy-tarot-catalog': RoxyElement<
				RoxyBaseAttributes & {
					/** Override the auto-derived gallery heading. Empty by default, in which case the heading is "Tarot deck". */
					heading?: string;
				}
			>;
			/** `<RoxyTarotSpread>` as a tag. */
			'roxy-tarot-spread': RoxyElement<
				RoxyBaseAttributes & {
					/** Which spread layout the response is for. Positions the cards and selects the reading template. */
					spread?:
						| 'three-card'
						| 'celtic-cross'
						| 'love'
						| 'career'
						| 'custom'
						| 'yes-no'
						| 'draw';
				}
			>;
			/** `<RoxyBodygraph>` as a tag. */
			'roxy-bodygraph': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyHdTypeCard>` as a tag. */
			'roxy-hd-type-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyHdConnection>` as a tag. */
			'roxy-hd-connection': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyHdPenta>` as a tag. */
			'roxy-hd-penta': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyHdVariables>` as a tag. */
			'roxy-hd-variables': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyForecastTimeline>` as a tag. */
			'roxy-forecast-timeline': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyForecastDigest>` as a tag. */
			'roxy-forecast-digest': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyBaziChart>` as a tag. */
			'roxy-bazi-chart': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyLuckPillars>` as a tag. */
			'roxy-luck-pillars': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyZodiacCard>` as a tag. */
			'roxy-zodiac-card': RoxyElement<
				RoxyBaseAttributes & {
					/** Which of the four zodiac reads the response is: the animal a date falls in, the reference read of one animal, a daily reading, or the compatibility of a pair. */
					mode?: 'sign' | 'animal' | 'daily' | 'compatibility';
				}
			>;
			/** `<RoxyAlmanacDay>` as a tag. */
			'roxy-almanac-day': RoxyElement<
				RoxyBaseAttributes & {
					/** Which read the response is: one almanac day as a card, a whole month of them as rows, or the days a search returned for one activity. */
					mode?: 'day' | 'month' | 'auspicious';
				}
			>;
			/** `<RoxyFlyingStarChart>` as a tag. */
			'roxy-flying-star-chart': RoxyElement<
				RoxyBaseAttributes & {
					/** Which plate the response is: the natal chart of a building, which carries a mountain and a water star per palace, or one year of stars over it, which carries one. */
					mode?: 'natal' | 'annual';
				}
			>;
			/** `<RoxyKuaCard>` as a tag. */
			'roxy-kua-card': RoxyElement<
				RoxyBaseAttributes & {
					/** Which read the response is: the Kua number alone, or the full Eight Mansions map, which adds a reading per sector and names the best and worst of them. */
					mode?: 'kua' | 'mansions';
				}
			>;
			/** `<RoxyMayanDaySign>` as a tag. */
			'roxy-mayan-day-sign': RoxyElement<
				RoxyBaseAttributes & {
					/** Which read the response is: the Tzolkin day sign alone, or the full Calendar Round chart, which adds the Haab date, the Long Count, the year bearer and the four-fold cross. */
					mode?: 'day' | 'chart';
				}
			>;
			/** `<RoxyVastuMandala>` as a tag. */
			'roxy-vastu-mandala': RoxyElement<
				RoxyBaseAttributes & {
					/** Which read the response is: the projected pada grid with a devata on every square, or the entrance read, which lights the square the main door falls on. */
					mode?: 'mandala' | 'entrance';
				}
			>;
			/** `<RoxyBiorhythmChart>` as a tag. */
			'roxy-biorhythm-chart': RoxyElement<
				RoxyBaseAttributes & {
					/** Which biorhythm response shape to render: a single day, a multi-day forecast, or the critical days list. */
					mode?: 'daily' | 'forecast' | 'critical-days';
				}
			>;
			/** `<RoxyDoshaConstitution>` as a tag. */
			'roxy-dosha-constitution': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyHexagram>` as a tag. */
			'roxy-hexagram': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyCrystalCard>` as a tag. */
			'roxy-crystal-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyCrystalGrid>` as a tag. */
			'roxy-crystal-grid': RoxyElement<
				RoxyBaseAttributes & {
					/** Override the auto-derived grid heading. Empty by default, in which case the heading is derived from the response filter (chakra, element, zodiac sign, or birth month). */
					heading?: string;
				}
			>;
			/** `<RoxyDreamCard>` as a tag. */
			'roxy-dream-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyDreamSearch>` as a tag. */
			'roxy-dream-search': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyAngelNumberCard>` as a tag. */
			'roxy-angel-number-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyAngelNumberLookup>` as a tag. */
			'roxy-angel-number-lookup': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyReferenceCard>` as a tag. */
			'roxy-reference-card': RoxyElement<RoxyBaseAttributes>;
			/** `<RoxyEndpointForm>` as a tag. */
			'roxy-endpoint-form': RoxyElement<{
				'data-endpoint'?: string;
				method?: string;
				'spec-url'?: string;
				'submit-label'?: string;
				'publishable-key'?: string;
				'location-url'?: string;
			}>;
			/** `<RoxyLocationSearch>` as a tag. */
			'roxy-location-search': RoxyElement<{
				'api-key'?: string;
				'publishable-key'?: string;
				endpoint?: string;
				placeholder?: string;
				'default-value'?: string;
			}>;
			/** `<RoxyData>` as a tag. */
			'roxy-data': RoxyElement<RoxyBaseAttributes>;
		}
	}
}
