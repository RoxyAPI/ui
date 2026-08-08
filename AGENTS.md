# AGENTS.md

This file teaches AI coding agents (Claude Code, Cursor, Copilot, Codex, Gemini CLI, and any MCP-compatible client) how to use Roxy UI when integrating RoxyAPI into a project.

This file ships inside `@roxyapi/ui`, `@roxyapi/ui-react`, and `@roxyapi/ui-vue` on npm. After install, read it at `node_modules/@roxyapi/ui/AGENTS.md`.

Live preview: <https://roxyapi.github.io/ui/>. Source of truth for component types: the combined OpenAPI spec at `https://roxyapi.com/api/v2/openapi.json`, regenerated into `packages/ui/src/types/types.gen.ts`. Per-product specs live at `https://roxyapi.com/api/v2/{slug}/openapi.json`.

## Identity

Roxy UI is the official web component library for the RoxyAPI catalog. Components and helpers cover Western astrology, Vedic astrology, numerology, tarot, Human Design, forecast, biorhythm, I Ching, crystals, dreams, angel numbers, with the location helper for geocoding. New endpoints regenerate component types automatically.

## Decision tree for picking a component

### Pick by user phrase

Map the natural-language request to a component first; fall back to the table below if the request names a specific endpoint.

| If the user says... | Render |
|---|---|
| "daily horoscope for `{sign}`", "weekly horoscope", "monthly horoscope" | `<roxy-horoscope-card>` |
| "birth chart", "natal chart", "Western chart", "show me my planets" | `<roxy-natal-chart>` |
| "match two birth charts", "compare us in Western astrology", "synastry" | `<roxy-synastry-chart>` |
| "kundli", "Vedic chart", "rashi chart", "South/North Indian chart" | `<roxy-vedic-kundli>` |
| "D9", "navamsa", "varga chart", "divisional chart", "D10 dasamsa", "D60 shashtiamsa" | `<roxy-divisional-chart>` (request body needs `division: integer`, supported 2,3,4,7,9,10,12,16,20,24,27,30,40,45,60) |
| "kundli matching", "Guna Milan", "match for marriage", "36-point compatibility" | `<roxy-guna-milan>` |
| "are we compatible", "compatibility score", "love score" (cross-domain) | `<roxy-compatibility-card>` |
| "panchang for today", "tithi", "nakshatra", "muhurta", "auspicious times" | `<roxy-panchang-table>` |
| "dasha", "mahadasha", "current planetary period", "Vimshottari" | `<roxy-dasha-timeline>` (`period="current"`, or `"major"` for the 120-year timeline). Send `significators: true` in the request body and every period also names the houses its lord acts on, in the language of the response |
| "antardasha", "bhukti", "pratyantardasha", "antara", "sookshma", "prana", "drill into my dasha" | `<roxy-dasha-timeline>` with `period="sub"`, `"antara"`, `"sookshma"` or `"prana"`, one per drill-down level |
| "manglik", "kalsarpa", "sadhesati", "any doshas in my chart" | `<roxy-dosha-card>` |
| "KP planets", "sub-lord", "Krishnamurti" | `<roxy-kp-planets-table>` |
| "life path number", "expression number", "personal year", "numerology chart" | `<roxy-numerology-card>` |
| "draw a tarot card", "card of the day", "card meaning" | `<roxy-tarot-card>` |
| "tarot reading", "three-card spread", "Celtic Cross", "yes or no tarot" | `<roxy-tarot-spread>` |
| "Human Design chart", "bodygraph", "my type and authority", "defined centers", "channels and gates", "what does my profile mean", "what does gate 61 line 5 mean" | `<roxy-bodygraph>` |
| "forecast", "what is coming up", "upcoming transits and events", "timeline of my year" | `<roxy-forecast-timeline>` |
| "biorhythm", "physical/emotional/intellectual cycle", "critical days" | `<roxy-biorhythm-chart>` |
| "I Ching", "hexagram", "cast the coins", "Book of Changes" | `<roxy-hexagram>` |
| "moon phase", "moon calendar", "next full moon", "current moon" | `<roxy-moon-phase>` |
| "what does my dream mean", "dream symbol", "dream dictionary", "I dreamt of {symbol}" | `<roxy-dream-card>` |
| "angel number {n}", "meaning of 111 / 222 / 1111", "I keep seeing this number" | `<roxy-angel-number-card>` |
| "what does {any number} mean", "analyze this number", "is 1234 an angel number" | `<roxy-angel-number-lookup>` |
| "crystals for {chakra}", "healing stones", "birthstone for {month}", "crystals for {sign}" | `<roxy-crystal-grid>` |
| "search a city", "geocode", "lat/long for a place" | `<roxy-location-search>` |
| "build a form for endpoint X" | `<roxy-endpoint-form>` |

**Fallback rule.** If the response shape does not match any component above, render with `<roxy-data>`. It accepts any RoxyAPI response and produces a structured layout from the JSON.

### Endpoint reference

Use the table below for the formal endpoint to component mapping.

<!-- BEGIN:COMPONENTS -->
| Element | Domain | Endpoint(s) | What it renders |
|---|---|---|---|
| `<roxy-natal-chart>` | Western | POST /astrology/natal-chart | Natal chart wheel with planet glyphs and aspect lines |
| `<roxy-synastry-chart>` | Western | POST /astrology/synastry | Dual-wheel synastry with inter-aspects table |
| `<roxy-western-planets-table>` | Western | POST /astrology/natal-chart | Sign, degree, house, motion columns plus ASC, MC, PoF, Vertex |
| `<roxy-transits-table>` | Western | POST /astrology/transits | Transit planet positions plus optional aspects to a natal chart |
| `<roxy-transit-wheel>` | Western | POST /astrology/transit-aspects | Natal chart on the inner ring, transiting bodies on the outer ring, aspect lines between them |
| `<roxy-aspects-table>` | Western | POST /astrology/aspects, /astrology/transit-aspects, /astrology/aspect-patterns | Aspect rows coloured by nature with orb and strength, plus detected chart patterns |
| `<roxy-moon-phase>` | Western | GET /astrology/moon-phase/{current,upcoming,calendar/...} | Moon phase card and calendar |
| `<roxy-horoscope-card>` | Western | GET /astrology/horoscope/{sign}/{daily,weekly,monthly} | Daily, weekly, or monthly horoscope card |
| `<roxy-astrocartography-map>` | Western | POST /astrology/astrocartography | World map of planetary MC, IC, Ascendant, and Descendant lines with per-line interpretations |
| `<roxy-local-space-compass>` | Western | POST /astrology/local-space | Compass dial of planetary azimuth lines from the birthplace, dimmed below the horizon |
| `<roxy-relocation-wheel>` | Western | POST /astrology/relocation-chart | Relocated chart wheel plus the move geometry, angular planets, and planets that change house |
| `<roxy-positions-table>` | Western | POST /astrology/asteroids, /astrology/lilith, /astrology/progressions, /astrology/solar-arc, /astrology/arabic-lots | Body, sign, degree, and per-shape columns (house, motion, formula, or natal arc) plus each reading |
| `<roxy-fixed-stars>` | Western | POST /astrology/fixed-stars | Star to natal point conjunctions with readings, plus a catalog of position, magnitude, nature, and keywords |
| `<roxy-profection-card>` | Western | POST /astrology/profections | Profected house and sign for the year, the lord of the year, its natal placement, and the reading |
| `<roxy-compatibility-card>` | Cross | POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility | Score card with category breakdown |
| `<roxy-vedic-kundli>` | Vedic | POST /vedic-astrology/birth-chart | South, North, or East Indian kundli with degree detail and optional Chandra Lagna view |
| `<roxy-divisional-chart>` | Vedic | POST /vedic-astrology/{divisional-chart,navamsa} | Generic divisional varga wheel from D2 Hora to D60 Shashtiamsa |
| `<roxy-kp-chart>` | Vedic (KP) | POST /vedic-astrology/kp/chart | Ascendant, cusps, planets and nodes with KP stellar hierarchy and house meanings |
| `<roxy-vedic-planets-table>` | Vedic | POST /vedic-astrology/birth-chart | Degree, nakshatra, pada, lord, bhava, Baladi, Jagradadi and Deeptadi columns |
| `<roxy-kp-planets-table>` | Vedic (KP) | POST /vedic-astrology/kp/planets | Sub-lord and sub-sub-lord columns |
| `<roxy-kp-ruling-planets>` | Vedic (KP) | POST /vedic-astrology/kp/ruling-planets | Day lord, Moon/Lagna hierarchies, ruling planets, significators with house meanings |
| `<roxy-ashtakavarga-grid>` | Vedic | POST /vedic-astrology/ashtakavarga | Sarva, Bhinna, and Shodhya Pinda views in a tabbed heatmap |
| `<roxy-shadbala-table>` | Vedic | POST /vedic-astrology/shadbala | Six-fold planetary strength bar plus rupas and adequacy badge |
| `<roxy-dasha-timeline>` | Vedic | POST /vedic-astrology/dasha/{current,major,sub/...} | Vimshottari mahadasha, antardasha, pratyantardasha, sookshma and prana, drill-down at every level |
| `<roxy-guna-milan>` | Vedic | POST /vedic-astrology/compatibility | 36-point Ashtakoota with eight sub-scores |
| `<roxy-panchang-table>` | Vedic | POST /vedic-astrology/panchang/{basic,detailed} | 15+ muhurtas in detailed mode |
| `<roxy-vedic-aspects>` | Vedic | POST /vedic-astrology/aspects | Graha drishti rows with aspect type, strength, and orb, plus mutual aspects |
| `<roxy-hora-table>` | Vedic | POST /vedic-astrology/panchang/hora | Day and night planetary hours with ruling planet and window |
| `<roxy-choghadiya-grid>` | Vedic | POST /vedic-astrology/panchang/choghadiya | Day and night Choghadiya muhurta tiles colored by effect |
| `<roxy-heliacal-table>` | Vedic | POST /vedic-astrology/heliacal | Udaya and asta windows for the six visible grahas, the calculation behind Guru Asta and Shukra Asta |
| `<roxy-gochara-table>` | Vedic | POST /vedic-astrology/transit | Vedic gochara with aspects to the natal chart and the Gochara Kaksha reading drawn as a position within the sign |
| `<roxy-bhava-bala-table>` | Vedic | POST /vedic-astrology/bhava-bala | House strength in rupas and virupas, ranked, with Bhavadhipati, Dig and Drishti Bala shown as proportions of the total |
| `<roxy-bhav-chalit-table>` | Vedic | POST /vedic-astrology/bhav-chalit | The Chalit chart against the Rashi chart, leading with how many grahas move and which, plus the unequal bhava spans |
| `<roxy-upagraha-table>` | Vedic | POST /vedic-astrology/upagraha | Time-based and Sun-based upagrahas with rashi, degree, longitude and nakshatra |
| `<roxy-chara-karakas>` | Vedic | POST /vedic-astrology/chara-karakas | Karaka offices in rank order with graha, degree, scheme, and what each is read for |
| `<roxy-arudha-padas>` | Vedic | POST /vedic-astrology/arudha | Twelve padas with bhava, lord, pada rashi, house from Lagna, and the classical exception marked |
| `<roxy-yoga-list>` | Vedic | GET /vedic-astrology/yoga, POST /vedic-astrology/yoga/detect | Filterable yoga cards from the 300 plus yoga catalog, grouped by verdict in detect mode |
| `<roxy-nakshatra-card>` | Vedic | GET /vedic-astrology/nakshatras/{id} | Lord, deity, symbol, characteristics, remedies |
| `<roxy-dosha-card>` | Vedic | POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati} | Presence, severity, remedies, scoped effects |
| `<roxy-numerology-card>` | Numerology | POST /numerology/{life-path,expression,soul-urge,personality,birth-day,maturity,daily,personal-day,personal-month,personal-year,chart} | Life path, expression, soul urge, personality, personal year, full chart |
| `<roxy-tarot-card>` | Tarot | GET /tarot/cards/{id}, POST /tarot/daily | Single card with upright and reversed flip |
| `<roxy-tarot-catalog>` | Tarot | GET /tarot/cards | Deck gallery tiles with card art, name, and arcana and suit |
| `<roxy-tarot-spread>` | Tarot | POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw | Spreads with positions and reading |
| `<roxy-bodygraph>` | Human Design | POST /human-design/bodygraph | Nine-center chart with defined and open centers, active channels, and gates, plus the type, strategy, authority, profile, and definition readings, the channels by circuit, the centers, and every activation with its gate and line meaning |
| `<roxy-hd-type-card>` | Human Design | POST /human-design/type, /human-design/profile | Type, strategy, authority, and profile tiles with the aura, signature, and not-self themes, plus the reading behind each label and the profile line keynotes |
| `<roxy-hd-connection>` | Human Design | POST /human-design/connection | Electromagnetic, compromise, and dominance channels between two charts |
| `<roxy-hd-penta>` | Human Design | POST /human-design/penta | Group penta channels split into upper and lower triangles |
| `<roxy-hd-variables>` | Human Design | POST /human-design/variables | The four transformation arrows with direction, color, tone, and base, plus a reading per arrow grouped by layer and the cognition |
| `<roxy-forecast-timeline>` | Forecast | POST /forecast/{timeline,significant-dates,transits} | Date-grouped events across Western, Vedic, and biorhythm domains, weighted by significance |
| `<roxy-forecast-digest>` | Forecast | POST /forecast/digest | Per-window event counts, domain breakdown, and the highest-significance events |
| `<roxy-biorhythm-chart>` | Biorhythm | POST /biorhythm/{daily,forecast,critical-days} | Daily bars, forecast cycle lines, critical days |
| `<roxy-hexagram>` | I Ching | GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast | Hexagram figure with trigrams, judgment, image, and a reading per line (statement plus meaning); a cast highlights the moving lines and the resulting hexagram |
| `<roxy-crystal-card>` | Crystals | GET /crystals/{id} | Photo, meaning sections, chakra, zodiac, element, hardness, keywords, and pairings |
| `<roxy-crystal-grid>` | Crystals | GET /crystals, /crystals/chakra/{chakra}, /crystals/element/{element}, /crystals/zodiac/{sign}, /crystals/birthstone/{month}, /crystals/search | Crystal gallery tiles with photo, name, and colour swatches |
| `<roxy-dream-card>` | Dreams | GET /dreams/symbols/{id} | Symbol name, interpretation body, and letter chip |
| `<roxy-dream-search>` | Dreams | GET /dreams/symbols | Matched dream symbols as selectable tiles with a letter chip |
| `<roxy-angel-number-card>` | Angel Numbers | GET /angel-numbers/numbers/{number} | Number meaning with spiritual, love, career, money, twin flame, biblical, and shadow sections |
| `<roxy-angel-number-lookup>` | Angel Numbers | GET /angel-numbers/lookup | Pattern analysis plus known meaning and digit-root fallback |
| `<roxy-reference-card>` | Reference | GET /astrology/{signs,planet-meanings}/{id}, /vedic-astrology/rashis/{id}, /iching/trigrams/{id}, /human-design/{gates,centers}/{id}, /numerology/{meanings,compound-number}/{number} | Symbol, name, description, keyword chips, and an attribute grid for any glossary lookup |
| `<roxy-endpoint-form>` | Helper | Any endpoint, from the spec | Schema-driven form, emits roxy-submit |
| `<roxy-location-search>` | Helper | GET /location/search | Debounced city search input, emits roxy-location-select |
| `<roxy-data>` | Helper | Any response shape | Generic fallback renderer for unknown shapes |
<!-- END:COMPONENTS -->

## Common integration bugs (read this first)

These are the bugs that come up over and over. Read this section before writing the first line of integration code.

### 1. Envelope not unwrapped

The `@roxyapi/sdk` returns `{ data, error, request, response }`. **Always destructure `data` before passing to a component.** Passing the full envelope renders `[object Object]`. This is the single most common integration bug.

```ts
// Wrong: passes the envelope
const response = await roxy.astrology.generateNatalChart({ body });
element.data = response;  // → renders [object Object]

// Right: unwrap data
const { data } = await roxy.astrology.generateNatalChart({ body });
element.data = data;
```

Every snippet below follows this rule.

### 2. Hardcoded coordinates

Every chart endpoint (Western, Vedic, KP, synastry, transits, dasha, dosha, panchang) needs `latitude`, `longitude`, and `timezone`. Never ask the user to type coordinates. Call `/location/search` first, then feed the result into the chart endpoint.

Two endpoints take TWO locations, and they name them differently. `POST /astrology/synastry`, `/astrology/composite-chart`, `/vedic-astrology/compatibility` and `/human-design/connection` nest a full location per person (`person1` / `person2`, or `personA` / `personB`). `POST /astrology/relocation-chart` instead takes `birthLatitude`, `birthLongitude`, `relocationLatitude`, `relocationLongitude` at the top level with a single `timezone`, which is the BIRTH timezone: relocating does not move the birth moment. `<roxy-endpoint-form>` renders a separate city search for each location automatically, so self-fetch mode needs no extra work.

```ts
// Right
const { data: cities } = await roxy.location.searchCities({ query: { q: 'Mumbai' } });
const { latitude, longitude, timezone } = cities.cities[0];
const { data: chart } = await roxy.astrology.generateNatalChart({
  body: { date, time, latitude, longitude, timezone },
});
```

### 3. Timezone format inconsistency

Every chart endpoint accepts `timezone` as either a decimal-hour offset (`5.5` for IST, `-5` for EST) or an IANA name (`'Asia/Kolkata'`, `'America/New_York'`). The decimal form is what `/location/search` returns; the IANA form is correct over DST boundaries. Pick one and stay consistent in a single integration. Mixing them does not break the API but makes the bug surface area larger.

### 4. Secret key in the browser

Secret keys (`sk_*`) grant full account access and are server side only. Call `createRoxy(process.env.ROXY_API_KEY!)` on your server (Node, Bun, Hono, Next.js route handlers, Workers, Edge functions), then send the response, not the key, to the component. Never ship a secret key in a client bundle.

```ts
// Secret key: server side only
const roxy = createRoxy(process.env.ROXY_API_KEY!);
```

For direct client-side calls, use a **publishable key** (`pk_live_*` / `pk_test_*`) instead. Publishable keys are browser-safe: mint one at `roxyapi.com/account`, register the origins you embed on, and the API gateway returns 403 for any other origin. See the client-side pattern below.

### 5. Missing `'use client'` in Next.js App Router

The React components in `@roxyapi/ui-react` mount Custom Elements, which need the DOM. In the App Router, files that import them must declare `'use client'` at the top. Server Components can fetch with the SDK; the client component renders.

```tsx
// app/chart-view.tsx
'use client';
import { RoxyNatalChart } from '@roxyapi/ui-react';

export default function ChartView({ data }) {
  return <RoxyNatalChart data={data} />;
}
```

### 6. React 17 or 18 swallowing custom events

React 19 routes hyphenated DOM events through camelCase props correctly. React 17 and 18 do not. On 17/18, attach the listener with a ref:

```tsx
const ref = useRef<HTMLElement>(null);
useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const handler = (e: Event) => setData((e as CustomEvent).detail);
  el.addEventListener('roxy-location-select', handler);
  return () => el.removeEventListener('roxy-location-select', handler);
}, []);

return <roxy-location-search ref={ref} />;
```

The React 19 path is `<RoxyLocationSearch onRoxyLocationSelect={handler} />`.

### 6b. Configuration props on the React components

Several components select a view, mode, or chart layout in addition to `data`. The React components type these as literal-union props alongside `data`, so editors autocomplete the allowed values and the build flags a typo. Set them as camelCase props.

```tsx
<RoxyVedicKundli data={chart} chartStyle="south" />
<RoxyDoshaCard data={kalsarpa} type="kalsarpa" />
<RoxyHoroscopeCard data={weekly} period="weekly" />
<RoxyPanchangTable data={panchang} detail="detailed" />
```

The full set: `RoxyNatalChart` `houseSystem`, `RoxyHoroscopeCard` `period`, `RoxyMoonPhase` `mode`, `RoxyCompatibilityCard` `mode`, `RoxyVedicKundli` and `RoxyDivisionalChart` `chartStyle`, `RoxyPanchangTable` `detail`, `RoxyDashaTimeline` `period`, `RoxyDoshaCard` `type`, `RoxyNumerologyCard` `type`, `RoxyTarotSpread` `spread`, `RoxyBiorhythmChart` `mode`, `RoxyHexagram` `mode`. Outside React and Vue, set the same value as a kebab-case attribute or a JS property on the element (for example `chart-style="south"` or `el.chartStyle = 'south'`).

### 6d. Chart without the written report

Every component takes `hide-readings` (`hideReadings` in React and Vue). It renders the chart and the data and leaves the interpretation out of the page: wheels, maps, tables, grids, legends, badges and every number stay, the interpretive prose goes. Off by default, so a component that does not set it is unchanged.

```html
<roxy-natal-chart hide-readings></roxy-natal-chart>
```

```tsx
<RoxyNatalChart data={chart} hideReadings />
```

Reach for it when the page supplies its own words, which is the usual case for a practitioner site that writes its own commentary under the chart. The prose is left out of the markup rather than hidden with CSS, so the page never ships text it is not showing.

**Which components act on it.** Every component that renders a written interpretation, so there is no tag you have to test to find out. A pure chart or table has no interpretation to take away, so the attribute is a no-op on those by definition.

One component is a documented no-op despite being mostly prose:

| Component | Behaviour |
|---|---|
| `<roxy-dream-card>` | Ignores `hide-readings`. The dream symbol response is the symbol, its dictionary letter and the interpretation, so removing the interpretation would leave a heading over nothing. Style it with `::part(card)` or leave the card out of the page instead. |

What survives, by family: charts keep the drawing, legend, glyphs, degrees and tab strip; tables keep every row and every calculated column (kaksha bindus, koota scores, significance bars, orbs, strengths); cards keep the header, badges, meters and fact grids, so a dosha keeps its verdict, phase and severity, a crystal keeps its Mohs hardness and attribute grid, and a horoscope keeps its energy meter, Moon placement, active transits and key dates; every Vedic response keeps its sidereal frame caption. What goes: interpretation paragraphs, reading accordions, keyword chips attached to a reading, remedies, action steps and strengths lists, and any section whose only content was one of those, heading included.

### 6c. Vue and Nuxt

`@roxyapi/ui-vue` exposes the same components with the same prop names. Bind `data` and the config props normally; the package sets them as DOM properties for you, so an object payload never gets stringified into an attribute. Listen to widget events with the usual `@` syntax.

```vue
<script setup lang="ts">
import { RoxyVedicKundli, RoxyLocationSearch } from '@roxyapi/ui-vue';
</script>

<template>
	<RoxyVedicKundli :data="chart" chart-style="south" />
	<RoxyLocationSearch @roxy-location-select="onCity" />
</template>
```

In Nuxt, render these in a client context (`<ClientOnly>` or a `.client.vue` component): they mount Custom Elements and need the DOM, the same constraint as `'use client'` in the Next.js App Router.

### 7. Local response interface drift

Do not declare `interface XyzData { ... }` for a RoxyAPI response. Every response type is exported from the component package you already installed. Local interfaces drift the moment the spec changes, and the component keeps compiling while rendering nothing.

```ts
// Wrong
interface NatalChart { planets: ...; houses: ...; }

// Right, and no extra install
import type { NatalChartResponse } from '@roxyapi/ui-react';  // or '@roxyapi/ui-vue', or '@roxyapi/ui'
```

You do NOT need `@roxyapi/sdk` to render. The SDK is a convenience for CALLING the API; the component packages are self-contained and fully typed on their own.

### 8. Install exactly ONE package

`@roxyapi/ui-react` and `@roxyapi/ui-vue` have no dependency on `@roxyapi/ui` and no dependency on `@roxyapi/sdk`. They carry their own response types.

| You are building | Install | Import |
|---|---|---|
| React (Vite, Next.js, Remix) | `@roxyapi/ui-react` | `import { RoxyNatalChart } from '@roxyapi/ui-react'` |
| Vue, Nuxt | `@roxyapi/ui-vue` | `import { RoxyNatalChart } from '@roxyapi/ui-vue'` |
| Svelte, Angular, Solid, Qwik, Astro, vanilla HTML, WordPress | `@roxyapi/ui` | `<roxy-natal-chart>` directly |

No stylesheet to import, no Tailwind, no `components.json`, no path aliases, no Vue `compilerOptions.isCustomElement`. Adding any of those is a sign you are working around something that is not broken.

### 9. `tsc --noEmit` in a Vite scaffold checks NOTHING

The stock Vite React and Vue templates ship a root `tsconfig.json` of `{"files": [], "references": [...]}`. A bare `tsc --noEmit` (or `vue-tsc --noEmit`) against it exits 0 having checked zero files. If you validate an integration that way you will report success on code that does not compile.

Point at the real config:

```bash
tsc --noEmit -p tsconfig.app.json        # React
vue-tsc --noEmit -p tsconfig.app.json    # Vue
```

Sanity-check your own harness first: plant a deliberate type error and confirm it is reported. If it is not, you are checking nothing.

### 10. Importing a saved JSON fixture needs one cast

Response types use literal unions (`kind: 'T_SQUARE' | 'STELLIUM' | ...`). TypeScript widens an imported JSON literal to `string`, so a frozen fixture will not assign. This is TypeScript's behaviour, not a library defect. A runtime `await res.json()` is `any` and assigns fine.

```ts
import natal from './fixtures/natal.json';
import type { NatalChartResponse } from '@roxyapi/ui-react';

const data = natal as unknown as NatalChartResponse;
```

### 11. The components load from a CDN. Self-host if your CSP forbids that.

On first mount the components fetch their rendering bundle from the CDN, pinned to the exact `@roxyapi/ui` release the wrapper was built against, so a lockfile pins your runtime too. Behind a strict Content-Security-Policy, an air-gapped network, or offline development nothing will render, and every component shows a visible `Roxy UI script load failed` error rather than failing quietly.

Either allowlist `cdn.jsdelivr.net` in `script-src`, or serve the bundle yourself. Copy `node_modules/@roxyapi/ui/dist/cdn/` onto your own origin and call the loader ONCE at app entry, before any component mounts:

```ts
import { ensureScriptLoaded, ROXY_UI_VERSION } from '@roxyapi/ui-react';

ensureScriptLoaded(ROXY_UI_VERSION, '/assets/roxy-ui');  // your origin
```

The loader keeps a single shared promise, so the first call wins and every component reuses it.

### 12. Theming: set the accent, not the shades

Set `--roxy-accent` and you are done. The text-safe accent (`--roxy-accent-ink`) and the focus ring (`--roxy-ring`) are DERIVED from it, so one declaration rebrands every chart, table and card.

```css
:root { --roxy-accent: #8b5cf6; }
```

If you theme dark differently, set it in your dark block too, exactly as you would for any design-token system:

```css
[data-theme='dark'] { --roxy-accent: #a78bfa; }
```

Do not hardcode `--roxy-accent-ink`: you will pin it to one hue and it will stop tracking your brand. Dark mode already works with no wiring, via `prefers-color-scheme`, a `.dark` class, or `[data-theme='dark']` on any ancestor.

## Integration patterns

### Pattern 1: vanilla HTML, no build step

Fetch on your server with the secret key, then inline the response into the component as a child `<script type="application/json" class="roxy-data">`. The component reads it on load. No key in the browser.

```html
<script
	src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js"
	crossorigin="anonymous"
></script>

<roxy-natal-chart>
	<script type="application/json" class="roxy-data">
		{ "planets": [ ... ], "houses": [ ... ], "aspects": [ ... ] }
	</script>
</roxy-natal-chart>
```

Setting the JavaScript `data` property always wins over the inlined JSON, so the same element also drives dynamic pages.

### Pattern 2: React, interactive

`<RoxyLocationSearch>` runs in the browser. On select, call your own route, which holds the secret key, and set the returned data on the chart. The key never reaches the client.

```tsx
'use client';

import {
	RoxyNatalChart,
	RoxyLocationSearch,
	type RoxyNatalChartProps,
} from '@roxyapi/ui-react';
import { useState } from 'react';

export function BirthChartView() {
	const [chart, setChart] = useState<RoxyNatalChartProps['data']>(undefined);

	const onLocationSelect = async (e: CustomEvent<{ latitude?: number; longitude?: number; timezone?: number | string }>) => {
		const { latitude, longitude, timezone } = e.detail;
		if (latitude == null || longitude == null) return;
		// Your route calls roxy.astrology.generateNatalChart with the secret key.
		const res = await fetch('/api/natal-chart', {
			method: 'POST',
			body: JSON.stringify({ date: '1990-01-15', time: '14:30:00', latitude, longitude, timezone }),
		});
		setChart(await res.json());
	};

	return (
		<div>
			<RoxyLocationSearch onRoxyLocationSelect={onLocationSelect} />
			{chart && <RoxyNatalChart data={chart} />}
		</div>
	);
}
```

For a static chart with no picker, fetch in a Server Component and pass `data` to a client component (Pattern 6).

### Pattern 3: schema-driven form

`<roxy-endpoint-form>` reads the OpenAPI spec and renders the inputs for any endpoint. On `roxy-submit`, POST the validated values to your own route, which calls the SDK with the secret key, then set the returned data on the target component. For an endpoint that needs coordinates, add `publishable-key="pk_live_..."` so the built-in city search can geocode.

```html
<roxy-endpoint-form
	data-endpoint="vedic-astrology/birth-chart"
	method="POST"
	submit-label="Generate kundli"
></roxy-endpoint-form>
<roxy-vedic-kundli chart-style="south"></roxy-vedic-kundli>

<script type="module">
	const form = document.querySelector('roxy-endpoint-form');
	form.addEventListener('roxy-submit', async (e) => {
		// Your route calls roxy.vedicAstrology.generateBirthChart with the secret key.
		const res = await fetch('/api/kundli', { method: 'POST', body: JSON.stringify(e.detail.values) });
		document.querySelector('roxy-vedic-kundli').data = await res.json();
	});
</script>
```

### Pattern 4: fully client-side with a publishable key (no server, no script)

When you do not want a backend at all, mint a **publishable key** (`pk_live_*` / `pk_test_*`) at `roxyapi.com/account`, register the origins you embed on, and let the component fetch itself. Every rendering component is self-fetching: give it a `data-endpoint` and a `publishable-key` and it renders its own input form, calls RoxyAPI on submit, and displays the result. No script, no separate location wiring, no envelope handling.

```html
<roxy-natal-chart
	data-endpoint="astrology/natal-chart"
	publishable-key="pk_live_..."
></roxy-natal-chart>
```

That single element renders a schema-driven form (a zodiac/enum tile picker, a boolean toggle, native date and time inputs, and a city search for endpoints that need coordinates), fetches on submit, and shows a loading then error-or-result state. Optional fields collapse under one Advanced disclosure, and a form whose only required field is an enum submits on selection (tap a sign, get a reading, no button). The result keeps a re-query affordance: a single-enum picker stays above the result and refetches when the selection changes, any other form gets a compact Edit query control that restores it with the previous values. `method` defaults to `POST`; set `method="GET"` for GET endpoints. Set `data-endpoint` to the spec path without the leading slash (`dreams/symbols/{id}`, `astrology/horoscope/{sign}/daily`).

**Key handling is the contract. The component enforces it, not you:**

- The publishable key is safe in client code: it is origin-restricted (any other origin gets 403) and cannot read your account.
- A **secret key never works here.** If `publishable-key` is not a `pk_` key the component refuses to fetch, sends nothing, and emits a `roxy-validation-error` event. A secret key cannot leak through self-fetch even by mistake.
- For production with a backend, prefer controlled mode (Patterns 1, 6, 7): the server fetches with the `sk_` key and injects the response, so no key of any kind reaches the browser.

In React, the same props are typed: `<RoxyNatalChart endpoint="astrology/natal-chart" publishableKey={process.env.NEXT_PUBLIC_ROXY_PK} />`.

**Three optional attributes on the self-fetch element.** `lang` sets the response language (`en`, `tr`, `de`, `es`, `hi`, `pt`, `fr`, `ru`): put it on the element (`<roxy-horoscope-card lang="de" ...>`) and the form routes it to the `?lang=` query on submit, so visitors never see a language field. `submit-label` overrides the derived button label. `attribution` renders a small "Spiritual data by RoxyAPI" credit under the result: off by default, and the one-tag script below turns it on unless you set `data-attribution="off"`. None of these apply in controlled mode.

**One tag, no element wiring.** For the simplest embed, load `dist/cdn/widgets.js` and drop a `<div data-roxy-widget="{slug}" data-publishable-key="pk_live_...">`. The script mounts the matching component from a generated slug map: with every path parameter supplied as a `data-*` attribute (`data-sign`, `data-id`) it fetches on mount, otherwise it renders the same input form. A second `data-*` attribute picks a variant (`data-period`, `data-mode`, `data-type`, `data-spread`).

**Theme every widget in one link.** Add `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/practitioner.css">` for a warm rosewater serif look, or set the `--roxy-font-display` token alone to swap result headings to a display face (it defaults to the body font, so nothing changes until you set it). See [THEMING.md](packages/ui/THEMING.md).

### Pattern 5: MCP tool-call response

A remote MCP server at `roxyapi.com/mcp/{domain}` exposes each RoxyAPI endpoint as an MCP tool. The JSON returned by the tool call has the same shape as the SDK response. Pass it straight into the matching component.

```ts
// Pseudocode for any MCP-aware agent
const result = await mcp.call('roxyapi.astrology.generate_natal_chart', {
	date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5,
});
document.querySelector('roxy-natal-chart').data = result;
```

No field renames. No glue code. Use the decision tree above to pick the component for any tool.

### Pattern 6: Next.js RSC streaming

Server fetches with the secret key, client renders with the React component. The API key never crosses the network.

```tsx
// app/page.tsx (Server Component)
import { createRoxy } from '@roxyapi/sdk';
import BirthChartView from './birth-chart-view';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

export default async function Page() {
	const { data } = await roxy.vedicAstrology.generateBirthChart({
		body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
	});
	return <BirthChartView data={data} />;
}
```

```tsx
// app/birth-chart-view.tsx (Client Component)
'use client';
import { RoxyVedicKundli } from '@roxyapi/ui-react';

export default function BirthChartView({ data }: { data: unknown }) {
	return <RoxyVedicKundli data={data} />;
}
```

### Pattern 7: server-rendered markup (WordPress, JSX SSR, static HTML)

When the page is rendered on the server or served from cache, there may be no JavaScript to set the `data` property per element. Render the response into a child `<script type="application/json" class="roxy-data">` instead. The component reads the embedded JSON on load. No per-element script, no API key in the browser.

**Always serialize with the shipped helper. Never hand-roll the escape and never use a bare `JSON.stringify`.** `@roxyapi/ui` exports `roxyDataScript(data)` (returns the full `<script class="roxy-data">…</script>` element) and `serializeRoxyData(data)` (returns just the escaped JSON string). They escape `<`, `>`, and `&` so a string field containing `</script>` cannot break out of the block. A raw `JSON.stringify` of a response with interpretation prose can contain `</script>` and corrupt the page or open an injection hole.

```ts
import { roxyDataScript } from '@roxyapi/ui';

const { data } = await roxy.astrology.generateNatalChart({ body });
const html = `<roxy-natal-chart>${roxyDataScript(data)}</roxy-natal-chart>`;
```

The emitted markup:

```html
<roxy-natal-chart>
	<script type="application/json" class="roxy-data">{ "planets": [ ], "houses": [ ], "aspects": [ ] }</script>
</roxy-natal-chart>
```

Rules for this pattern:

- The JSON must be the unwrapped RoxyAPI response, the same shape you would assign to `element.data`. Do not embed the SDK envelope (`{ data, error, request, response }`); embed `data`.
- The script must be a direct child of the component and carry both `type="application/json"` and `class="roxy-data"`. `roxyDataScript` emits both.
- The JavaScript property always wins. If you assign `element.data` in script, the markup is ignored. One component covers both server-rendered and dynamic pages with no branching.
- You can nest a server-rendered HTML fallback inside the same element for no-JavaScript and crawler views. The component reads only the marked script and leaves the fallback in place.
- In a language that cannot call the TS helper (PHP, Python, Go), mirror its rule exactly: escape `<`, `>`, and `&` to their `\u003c`, `\u003e`, `\u0026` JSON escapes. The WordPress example does this in PHP.

This is how the WordPress plugin renders: PHP fetches the response server-side, caches it, and writes the script into the page. The same shape works in any framework that emits HTML.

## Localized responses

Most RoxyAPI endpoints return their interpretation text in eight languages, selected with the `lang` query parameter (`en`, `tr`, `de`, `es`, `hi`, `pt`, `fr`, `ru`). Human Design, for example, returns the type, strategy, authority, profile, channel, center, gate, and line readings in the requested language.

The components hold no copy of their own; they print the prose the response carries. So the language of the response is the language of the render.

```ts
const { data } = await roxy.humanDesign.generateBodygraph({
	body: { date: '1990-01-15', time: '14:30:00', timezone: 5.5 },
	query: { lang: 'de' },
});
```

`lang` is a query parameter even on a POST endpoint. Put it in `query`, never in `body`; a `lang` key in the body is ignored and you get English back. In the self-fetch pattern you do not fill a language field: the component reads the page language and routes it to the `?lang=` query on submit.

## The labels the components write

Separate from the response, and set separately. The wording a component supplies itself (headings, tab labels, table captions, legends, empty states) comes from a catalogue you load for the language you serve.

```html
<html lang="es-AR">
  ...
  <script src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/locales/es.js"></script>
```

```ts
import '@roxyapi/ui';
import '@roxyapi/ui/locales/es';
```

The language comes from `lang` on the element, else the nearest ancestor carrying `lang`, else `<html>`. So a site that already declares its language needs no per-component attribute. A regional tag reads its base language, so `es-AR` and `es-419` both use `es`, and the request goes out as `?lang=es` because that is what the API accepts.

English is the default and needs no catalogue. Load only the languages your site serves; one catalogue covers every Roxy component on the page.

A catalogue ships for every language the API serves: `de`, `es`, `fr`, `hi`, `pt`, `ru`, `tr`. Each covers `<roxy-natal-chart>`, `<roxy-transit-wheel>` and the shared labels every component inherits; the remaining components write English labels until their entries land. **The values the API returns are never rewritten**: a planet, sign, aspect, element or house-system name renders exactly as the response carries it, so the words on the chart and the words in the response can never disagree. Ask for a language and the response carries the reader-facing name beside the English one, so the chart prints the translated name while the English one stays available to compare against in your own code.

Dates, times and numbers need no catalogue at all. They follow the same page language and are written the way that language writes them, hour cycle included, so a German page reads `15. Jan. 1990, 14:30` and an Argentine one `15 de ene de 1990, 2:30 p. m.`.

Ask for the response language AND load the matching catalogue, and the whole card reads in one language.

## Theming and dark mode

Components react to three signals in priority order. No events to dispatch. No JS bridge to write. The CDN bundle (`dist/cdn/roxy-ui.js`) auto-loads the design tokens, so a single script tag yields full theming and dark mode with nothing else to add. The npm and React paths inherit the same tokens through the components; only set up `tokens.css` yourself if you import per component without the full bundle.

| Signal | Where | Effect |
|---|---|---|
| `prefers-color-scheme: dark` | OS | Default. Follows user system setting. |
| `data-theme="light"` or `data-theme="dark"` | `<html>` / `<body>` / any ancestor / the component itself | Wins over OS. Per-element override scope works. |
| `.dark` class | The component itself or any ancestor (typically `<html>`) | Same effect as `data-theme="dark"`. Use when the host stack already ships a `.dark` toggle (Tailwind, shadcn). |

To toggle at runtime:

```ts
document.documentElement.dataset.theme = 'dark'; // or 'light'
```

That single line re-themes every Roxy UI component on the page. Persist user choice in `localStorage` from your own code; the library does not own preferences.

Per-element scope is supported:

```html
<roxy-natal-chart data-theme="dark" .data=${chart}></roxy-natal-chart>
```

Every visible aspect of the chart is driven by `--roxy-*` CSS custom properties on `:host`. Override any token on `:root`, on `:host`, or per element. Do not write Tailwind utility classes inside the components; the Shadow DOM boundary stops them at the door.

## Restyling a block from outside the component

Tokens cover colour, spacing and type. When you need to reach a specific block, every chart and reading component names its structural pieces with `part`, so a stylesheet on the page can target them. The names are identical in every component, so one rule covers the library.

```css
roxy-natal-chart::part(readings) {
	display: none;
}
roxy-natal-chart::part(card) {
	border: 0;
	box-shadow: none;
}
```

| part | What it names |
|---|---|
| `card` | The component's own card or wrapper root |
| `header` | The heading row (title, meta, score) |
| `chart` | The graphic: wheel, map, bodygraph, bar set, hexagram figure, card art |
| `legend` | The key to the chart |
| `details` | The numeric summary: pills, badges, stat lists, fact tiles |
| `table` | A data table, or the scroll box around one |
| `tablist`, `tab`, `panel` | The view switch and the panel it governs |
| `section` | Any structural block, paired with a specific name (`section patterns`) |
| `readings` | The interpretation accordion |
| `reading` | One disclosure card inside it |
| `form`, `loading`, `error`, `attribution` | The built-in states |

Two notes. Parts reach exactly one shadow root deep, and a component that draws another one re-exports its parts, so `roxy-relocation-wheel::part(readings)` reaches the wheel it nests. And to remove a reading rather than hide it, use `hide-readings` (above): a `display: none` rule still ships the words in the page.

## Rules every agent must follow

- Always call `/location/search` first before any chart endpoint that takes latitude, longitude, or timezone. Use `<roxy-location-search>` for the input UI.
- Pass the response object directly. Components are stateless; they do not fetch internally except for `<roxy-location-search>`, `<roxy-endpoint-form>`, and the widgets auto-mount script.
- Use the typed SDK from `@roxyapi/sdk` so prop shapes match the spec automatically.
- Theming is CSS custom properties on `:root` or per element. Switch light and dark via `data-theme` on any ancestor (see the table above). Do not write Tailwind classes inside the components; the shadow DOM ignores them.
- Honor reduced motion. The library already respects `prefers-reduced-motion: reduce` and the `--roxy-motion-duration` variable.
- A11y violations are CI failures. Do not paste over `role` or `aria-*` attributes; the components emit them correctly already.
- Component types come from the OpenAPI spec via `@hey-api/openapi-ts`. Do not redefine response shapes locally; if a field is missing, fix the spec, regenerate, propagate.

## Domain ordering

When listing domains in user-visible copy, use the canonical order: Western astrology, Vedic astrology, numerology, tarot, human design, forecast, biorhythm, I Ching, crystals, dreams, angel numbers. Location is utility, not a selling domain.

## What not to ship

- Do not bundle `@roxyapi/ui` with `@roxyapi/ui-react` or `@roxyapi/ui-vue`; they ship independently.
- Use `@roxyapi/ui-react` for React projects and `@roxyapi/ui-vue` for Vue and Nuxt projects. Use `@roxyapi/ui` directly elsewhere.
- Do not write your own kundli component. The lifted layout in `<roxy-vedic-kundli>` is the canonical RoxyAPI render path.
- Do not call astrology endpoints with hardcoded coordinates. Always geocode first via `<roxy-location-search>` or `roxy.location.searchCities()`.
- Do not declare a local `interface XyzData` to describe a RoxyAPI response. Import the type from the component package you already installed: `import type { XyzResponse } from '@roxyapi/ui-react'` (or `@roxyapi/ui-vue`, or `@roxyapi/ui`). Local interfaces drift the moment the spec changes. You do not need `@roxyapi/sdk` for types.
- Do not write Tailwind utility classes inside a component. The Shadow DOM boundary stops them at the door. Theme through `--roxy-*` CSS custom properties on `:root` or per element instead.
- Two ways to feed a component, no third. Controlled (default, recommended for production): pass `data` as a prop or hydrate from a child `roxy-data` JSON island; your server holds the secret key. Self-fetch (no backend): set `data-endpoint` + a `pk_` `publishable-key` and the component renders its own form and fetches in the browser (a secret key is refused client-side). Do not wrap a component in your own fetch loop or call a chart/table/card's internals.
- Do not redefine theme tokens or invent your own naming. Override the existing `--roxy-*` custom properties; the full list is in `THEMING.md`.

## Where to look next

- Component source: `packages/ui/src/components/`
- Sample data for every component: `apps/docs/sample-data.js`
- Token reference: `packages/ui/THEMING.md`
- Live preview: `bun run preview` then open `http://localhost:3001`
- Endpoint reference: <https://roxyapi.com/api-reference>
- Machine-readable component catalog (every component, its domain, what it renders, and the endpoint(s) it consumes): <https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/components-catalog.json>. Fetch it to discover or map components programmatically instead of scraping this table.
