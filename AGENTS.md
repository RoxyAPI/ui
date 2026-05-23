# AGENTS.md

This file teaches AI coding agents (Claude Code, Cursor, Copilot, Codex, Gemini CLI, and any MCP-compatible client) how to use Roxy UI when integrating RoxyAPI into a project.

This file ships inside both `@roxyapi/ui` and `@roxyapi/ui-react` on npm. After install, read it at `node_modules/@roxyapi/ui/AGENTS.md`.

Live preview: <https://roxyapi.github.io/ui/>. Source of truth for component types: the combined OpenAPI spec at `https://roxyapi.com/api/v2/openapi.json`, regenerated into `packages/ui/src/types/types.gen.ts`. Per-product specs live at `https://roxyapi.com/api/v2/{slug}/openapi.json`.

## Identity

Roxy UI is the official web component library for the RoxyAPI catalog. Components and helpers cover Western astrology, Vedic astrology, numerology, tarot, biorhythm, I Ching, crystals, dreams, angel numbers, with the location helper for geocoding. New endpoints regenerate component types automatically.

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
| "dasha", "mahadasha", "current planetary period", "Vimshottari" | `<roxy-dasha-timeline>` |
| "manglik", "kalsarpa", "sadhesati", "any doshas in my chart" | `<roxy-dosha-card>` |
| "KP planets", "sub-lord", "Krishnamurti" | `<roxy-kp-planets-table>` |
| "life path number", "expression number", "personal year", "numerology chart" | `<roxy-numerology-card>` |
| "draw a tarot card", "card of the day", "card meaning" | `<roxy-tarot-card>` |
| "tarot reading", "three-card spread", "Celtic Cross", "yes or no tarot" | `<roxy-tarot-spread>` |
| "biorhythm", "physical/emotional/intellectual cycle", "critical days" | `<roxy-biorhythm-chart>` |
| "I Ching", "hexagram", "cast the coins", "Book of Changes" | `<roxy-hexagram>` |
| "moon phase", "moon calendar", "next full moon", "current moon" | `<roxy-moon-phase>` |
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
| `<roxy-moon-phase>` | Western | GET /astrology/moon-phase/{current,upcoming,calendar/...} | Moon phase card and calendar |
| `<roxy-horoscope-card>` | Western | GET /astrology/horoscope/{sign}/{daily,weekly,monthly} | Daily, weekly, or monthly horoscope card |
| `<roxy-compatibility-card>` | Cross | POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility | Score card with category breakdown |
| `<roxy-vedic-kundli>` | Vedic | POST /vedic-astrology/birth-chart | South, North, or East Indian kundli with degree detail |
| `<roxy-divisional-chart>` | Vedic | POST /vedic-astrology/divisional-chart | Generic divisional varga wheel from D2 Hora to D60 Shashtiamsa |
| `<roxy-kp-chart>` | Vedic (KP) | POST /vedic-astrology/kp/chart | Ascendant, cusps, and planets with KP stellar hierarchy |
| `<roxy-vedic-planets-table>` | Vedic | POST /vedic-astrology/birth-chart | Degree, nakshatra, pada, lord, bhava, avastha columns |
| `<roxy-kp-planets-table>` | Vedic (KP) | POST /vedic-astrology/kp/planets | Sub-lord and sub-sub-lord columns |
| `<roxy-kp-ruling-planets>` | Vedic (KP) | POST /vedic-astrology/kp/ruling-planets | Day lord, Moon/Lagna hierarchies, ruling planets, significators |
| `<roxy-ashtakavarga-grid>` | Vedic | POST /vedic-astrology/ashtakavarga | Sarva, Bhinna, and Shodhya Pinda views in a tabbed heatmap |
| `<roxy-shadbala-table>` | Vedic | POST /vedic-astrology/shadbala | Six-fold planetary strength bar plus rupas and adequacy badge |
| `<roxy-dasha-timeline>` | Vedic | POST /vedic-astrology/dasha/{current,major,sub/...} | Vimshottari mahadasha + antardasha + pratyantardasha |
| `<roxy-guna-milan>` | Vedic | POST /vedic-astrology/compatibility | 36-point Ashtakoota with eight sub-scores |
| `<roxy-panchang-table>` | Vedic | POST /vedic-astrology/panchang/{basic,detailed} | 15+ muhurtas in detailed mode |
| `<roxy-choghadiya-grid>` | Vedic | POST /vedic-astrology/panchang/choghadiya | Day and night Choghadiya muhurta tiles colored by effect |
| `<roxy-yoga-list>` | Vedic | GET /vedic-astrology/yoga, /yoga/{id} | Filterable yoga cards from the 300 plus yoga catalog |
| `<roxy-nakshatra-card>` | Vedic | GET /vedic-astrology/nakshatras/{id} | Lord, deity, symbol, characteristics, remedies |
| `<roxy-dosha-card>` | Vedic | POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati} | Presence, severity, remedies, scoped effects |
| `<roxy-numerology-card>` | Numerology | POST /numerology/{life-path,expression,personal-year,chart} | Life path, expression, personal year, full chart |
| `<roxy-tarot-card>` | Tarot | GET /tarot/cards/{id}, POST /tarot/daily | Single card with upright and reversed flip |
| `<roxy-tarot-spread>` | Tarot | POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw | Spreads with positions and reading |
| `<roxy-biorhythm-chart>` | Biorhythm | POST /biorhythm/{daily,forecast,critical-days} | Daily bars, forecast cycle lines, critical days |
| `<roxy-hexagram>` | I Ching | GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast | Hexagram with trigrams, judgment, image, changing lines |
| `<roxy-endpoint-form>` | Helper | Any endpoint via x-roxy-ui hints | Schema-driven form, emits roxy-submit |
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

There are two key classes. **Secret keys are unprefixed** and grant full access; they belong server-side only (Node, Bun, Hono, Next.js route handlers, Workers, Edge functions). **Publishable keys** are prefixed `pk_live_*` or `pk_test_*` and are safe in the browser; they are locked to an origin allowlist at the API gateway. For widgets, embeds, vanilla HTML, and `data-publishable-key` use the publishable key. For the typed SDK on a server, use the secret key.

```ts
// Server (Next.js route handler, Workers, Bun): secret key
const roxy = createRoxy(process.env.ROXY_API_KEY!);

// Browser (widgets auto-mount): publishable key
<div data-roxy-widget="natal-chart" data-publishable-key="pk_live_xxx" ...></div>
```

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

The full set: `RoxyNatalChart` `houseSystem`, `RoxyHoroscopeCard` `period`, `RoxyMoonPhase` `mode`, `RoxyCompatibilityCard` `mode`, `RoxyVedicKundli` and `RoxyDivisionalChart` `chartStyle`, `RoxyPanchangTable` `detail`, `RoxyDashaTimeline` `period`, `RoxyDoshaCard` `type`, `RoxyNumerologyCard` `type`, `RoxyTarotSpread` `spread`, `RoxyBiorhythmChart` `mode`, `RoxyHexagram` `mode`. Outside React, set the same value as a kebab-case attribute or a JS property on the element (for example `chart-style="south"` or `el.chartStyle = 'south'`).

### 7. Local response interface drift

Do not declare `interface XyzData { ... }` for a RoxyAPI response. Import the spec-derived type from `@roxyapi/sdk` (or let the SDK return type flow through inference). Local interfaces drift the moment the spec changes; the component will keep compiling while rendering nothing.

```ts
// Wrong
interface NatalChart { planets: ...; houses: ...; }

// Right
import type { NatalChartResponse } from '@roxyapi/sdk';
```

## Integration patterns

### Pattern 1: vanilla HTML, no build step

```html
<script
	src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js"
	crossorigin="anonymous"
></script>

<roxy-natal-chart id="chart"></roxy-natal-chart>

<script type="module">
	import { createRoxy } from 'https://cdn.jsdelivr.net/npm/@roxyapi/sdk@latest/dist/factory.js';
	const roxy = createRoxy('pk_live_xxx');
	const { data } = await roxy.astrology.generateNatalChart({
		body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
	});
	document.getElementById('chart').data = data;
</script>
```

### Pattern 2: React, with the typed SDK

```tsx
'use client';

import { createRoxy } from '@roxyapi/sdk';
import {
	RoxyNatalChart,
	RoxyLocationSearch,
	type RoxyNatalChartProps,
} from '@roxyapi/ui-react';
import { useState } from 'react';

const roxy = createRoxy(process.env.NEXT_PUBLIC_ROXY_API_KEY!);

export function BirthChartView() {
	const [chart, setChart] = useState<RoxyNatalChartProps['data']>(undefined);

	const onLocationSelect = async (e: CustomEvent<{ latitude?: number; longitude?: number; timezone?: number | string }>) => {
		const { latitude, longitude, timezone } = e.detail;
		if (latitude == null || longitude == null) return;
		const { data } = await roxy.astrology.generateNatalChart({
			body: { date: '1990-01-15', time: '14:30:00', latitude, longitude, timezone },
		});
		setChart(data);
	};

	return (
		<div>
			<RoxyLocationSearch onRoxyLocationSelect={onLocationSelect} />
			{chart && <RoxyNatalChart data={chart} />}
		</div>
	);
}
```

### Pattern 3: schema-driven form

`<roxy-endpoint-form>` reads the OpenAPI spec and renders the inputs for any endpoint. Listen for the `roxy-submit` event with the validated payload.

```html
<roxy-endpoint-form
	data-endpoint="vedic-astrology/birth-chart"
	method="POST"
	submit-label="Generate kundli"
></roxy-endpoint-form>

<script type="module">
	import { createRoxy } from 'https://cdn.jsdelivr.net/npm/@roxyapi/sdk@latest/dist/factory.js';
	const roxy = createRoxy('pk_live_xxx');
	const form = document.querySelector('roxy-endpoint-form');
	form.addEventListener('roxy-submit', async (e) => {
		const { values } = e.detail;
		const { data: kundli } = await roxy.vedicAstrology.generateBirthChart({ body: values });
		document.querySelector('roxy-vedic-kundli').data = kundli;
	});
</script>
```

### Pattern 4: widgets auto-mount (no JavaScript wiring)

Use a publishable key (`pk_live_*` or `pk_test_*`) for client-side embeds. Get one at <https://roxyapi.com/account>. Publishable keys are origin-restricted at the API gateway. Register the customer domain (e.g. `https://customer.com`) when creating the key, and the gateway will reject requests from any other origin. Never use a secret key in client-side code (secret keys are unprefixed and live server-side only).

```html
<script
	src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/widgets.js"
	defer
></script>

<div
	data-roxy-widget="natal-chart"
	data-publishable-key="pk_live_xxx"
	data-date="1990-01-15"
	data-time="14:30:00"
	data-latitude="19.07"
	data-longitude="72.88"
	data-timezone="5.5"
></div>
```

The auto-mount script reads `data-*` attributes, calls the matching endpoint, and renders the matching component.

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

```html
<roxy-natal-chart>
	<script type="application/json" class="roxy-data">
		{ "planets": [ ], "houses": [ ], "aspects": [ ] }
	</script>
</roxy-natal-chart>
```

Rules for this pattern:

- The JSON must be the unwrapped RoxyAPI response, the same shape you would assign to `element.data`. Do not embed the SDK envelope (`{ data, error, request, response }`); embed `data`.
- The script must be a direct child of the component and carry both `type="application/json"` and `class="roxy-data"`.
- The JavaScript property always wins. If you assign `element.data` in script, the markup is ignored. One component covers both server-rendered and dynamic pages with no branching.
- You can nest a server-rendered HTML fallback inside the same element for no-JavaScript and crawler views. The component reads only the marked script and leaves the fallback in place.

This is how the WordPress plugin renders: PHP fetches the response server-side, caches it, and writes the script into the page. The same shape works in any framework that emits HTML.

## Theming and dark mode

Components react to three signals in priority order. No events to dispatch. No JS bridge to write.

| Signal | Where | Effect |
|---|---|---|
| `prefers-color-scheme: dark` | OS | Default. Follows user system setting. |
| `data-theme="light"` or `data-theme="dark"` | `<html>` / `<body>` / any ancestor / the component itself | Wins over OS. Per-element override scope works. |
| `.dark` class | Any ancestor | Equivalent to `data-theme="dark"`. Use when the host stack already ships a `.dark` toggle (Tailwind, shadcn). |

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

## Rules every agent must follow

- Always call `/location/search` first before any chart endpoint that takes latitude, longitude, or timezone. Use `<roxy-location-search>` for the input UI.
- Pass the response object directly. Components are stateless; they do not fetch internally except for `<roxy-location-search>`, `<roxy-endpoint-form>`, and the widgets auto-mount script.
- Use the typed SDK from `@roxyapi/sdk` so prop shapes match the spec automatically.
- Theming is CSS custom properties on `:root` or per element. Switch light and dark via `data-theme` on any ancestor (see the table above). Do not write Tailwind classes inside the components; the shadow DOM ignores them.
- Honor reduced motion. The library already respects `prefers-reduced-motion: reduce` and the `--roxy-motion-duration` variable.
- A11y violations are CI failures. Do not paste over `role` or `aria-*` attributes; the components emit them correctly already.
- Component types come from the OpenAPI spec via `@hey-api/openapi-ts`. Do not redefine response shapes locally; if a field is missing, fix the spec, regenerate, propagate.

## Domain ordering

When listing domains in user-visible copy, use the canonical order: Western astrology, Vedic astrology, numerology, tarot, biorhythm, I Ching, crystals, dreams, angel numbers. Location is utility, not a selling domain.

## What not to ship

- Do not bundle `@roxyapi/ui` and `@roxyapi/ui-react` together; they ship independently.
- Use `@roxyapi/ui-react` for React projects. Use `@roxyapi/ui` directly elsewhere.
- Do not write your own kundli component. The lifted layout in `<roxy-vedic-kundli>` is the canonical RoxyAPI render path.
- Do not call astrology endpoints with hardcoded coordinates. Always geocode first via `<roxy-location-search>` or `roxy.location.searchCities()`.
- Do not declare a local `interface XyzData` to describe a RoxyAPI response. Import the type from the spec-derived bundle: `import type { XyzResponse } from '@roxyapi/sdk'`. Local interfaces drift the moment the spec changes.
- Do not write Tailwind utility classes inside a component. The Shadow DOM boundary stops them at the door. Theme through `--roxy-*` CSS custom properties on `:root` or per element instead.
- Do not fetch inside chart, table, or card components. They are stateless: pass `data` as a prop. Documented exceptions are `<roxy-location-search>`, `<roxy-endpoint-form>`, and the widgets auto-mount script.
- Do not redefine theme tokens or invent your own naming. Override the existing `--roxy-*` custom properties; the full list is in `THEMING.md`.

## Where to look next

- Component source: `packages/ui/src/components/`
- Sample data for every component: `apps/docs/sample-data.js`
- Token reference: `packages/ui/THEMING.md`
- Live preview: `bun run preview` then open `http://localhost:3001`
- Endpoint reference: <https://roxyapi.com/api-reference>
