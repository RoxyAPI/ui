# AGENTS.md

This file teaches AI coding agents (Claude Code, Cursor, Copilot, Codex, Gemini CLI, and any MCP-compatible client) how to use Roxy UI when integrating RoxyAPI into a project.

This file ships inside both `@roxyapi/ui` and `@roxyapi/ui-react` on npm. After install, read it at `node_modules/@roxyapi/ui/AGENTS.md`.

Live preview: <https://roxyapi.github.io/ui/>. Source of truth for component types: the OpenAPI spec at `roxyapi.com/openapi.json`, regenerated into `packages/ui/src/types/types.gen.ts`.

## Identity

Roxy UI is the official web component library for the RoxyAPI catalog. Components and helpers cover Western astrology, Vedic astrology, numerology, tarot, biorhythm, I Ching, crystals, dreams, angel numbers, with the location helper for geocoding. New endpoints regenerate component types automatically.

## Decision tree for picking a component

### Pick by user phrase

Map the user's natural-language request to a component first; fall back to the table below if the request names a specific endpoint.

| If the user says... | Render |
|---|---|
| "daily horoscope for `{sign}`", "weekly horoscope", "monthly horoscope" | `<roxy-horoscope-card>` |
| "birth chart", "natal chart", "Western chart", "show me my planets" | `<roxy-natal-chart>` |
| "match two birth charts", "compare us in Western astrology", "synastry" | `<roxy-synastry-chart>` |
| "kundli", "Vedic chart", "rashi chart", "South/North Indian chart" | `<roxy-vedic-kundli>` |
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
| `<roxy-horoscope-card>` | Western | GET /astrology/horoscope/{sign}/{daily,weekly,monthly} | Daily, weekly, or monthly horoscope card |
| `<roxy-synastry-chart>` | Western | POST /astrology/synastry | Dual-wheel synastry with inter-aspects table |
| `<roxy-compatibility-card>` | Cross | POST /astrology/compatibility-score, /numerology/compatibility, /biorhythm/compatibility | Score card with category breakdown |
| `<roxy-moon-phase>` | Western | GET /astrology/moon-phase/{current,upcoming,calendar/...} | Moon phase card and calendar |
| `<roxy-vedic-kundli>` | Vedic | POST /vedic-astrology/birth-chart | South or North Indian kundli |
| `<roxy-panchang-table>` | Vedic | POST /vedic-astrology/panchang/{basic,detailed} | 15+ muhurtas in detailed mode |
| `<roxy-dasha-timeline>` | Vedic | POST /vedic-astrology/dasha/{current,major,sub/...} | Vimshottari mahadasha + antardasha + pratyantardasha |
| `<roxy-dosha-card>` | Vedic | POST /vedic-astrology/dosha/{manglik,kalsarpa,sadhesati} | Presence, severity, remedies, scoped effects |
| `<roxy-guna-milan>` | Vedic | POST /vedic-astrology/compatibility | 36-point Ashtakoota with eight sub-scores |
| `<roxy-kp-planets-table>` | Vedic (KP) | POST /vedic-astrology/kp/planets | Sub-lord and sub-sub-lord columns |
| `<roxy-transits-table>` | Western | POST /astrology/transits | Transit planet positions plus optional aspects to a natal chart |
| `<roxy-divisional-chart>` | Vedic | POST /vedic-astrology/divisional-chart | Generic divisional varga wheel from D2 Hora to D60 Shashtiamsa |
| `<roxy-ashtakavarga-grid>` | Vedic | POST /vedic-astrology/ashtakavarga | Sarva, Bhinna, and Shodhya Pinda views in a tabbed heatmap |
| `<roxy-shadbala-table>` | Vedic | POST /vedic-astrology/shadbala | Six-fold planetary strength bar plus rupas and adequacy badge |
| `<roxy-yoga-list>` | Vedic | GET /vedic-astrology/yoga, /yoga/{id} | Filterable yoga cards from the 300 plus yoga catalog |
| `<roxy-choghadiya-grid>` | Vedic | POST /vedic-astrology/panchang/choghadiya | Day and night Choghadiya muhurta tiles colored by effect |
| `<roxy-numerology-card>` | Numerology | POST /numerology/{life-path,expression,personal-year,chart} | Life path, expression, personal year, full chart |
| `<roxy-tarot-card>` | Tarot | GET /tarot/cards/{id}, POST /tarot/daily | Single card with upright and reversed flip |
| `<roxy-tarot-spread>` | Tarot | POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw | Spreads with positions and reading |
| `<roxy-biorhythm-chart>` | Biorhythm | POST /biorhythm/{daily,forecast,critical-days} | Daily bars, forecast cycle lines, critical days |
| `<roxy-hexagram>` | I Ching | GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast | Hexagram with trigrams, judgment, image, changing lines |
| `<roxy-endpoint-form>` | Helper | Any endpoint via x-roxy-ui hints | Schema-driven form, emits roxy-submit |
| `<roxy-location-search>` | Helper | GET /location/search | Debounced city search input, emits roxy-location-select |
| `<roxy-data>` | Helper | Any response shape | Generic fallback renderer for unknown shapes |
<!-- END:COMPONENTS -->

## SDK response envelope (read this first)

The `@roxyapi/sdk` returns `{ data, error, request, response }`. **Always destructure `data` before passing to a component.** Passing the full envelope produces `[object Object]` in the rendered chart. This is the single most common integration bug.

```ts
// Wrong: passes the envelope
const response = await roxy.astrology.generateNatalChart({ body });
element.data = response;  // → renders [object Object]

// Right: unwrap data
const { data } = await roxy.astrology.generateNatalChart({ body });
element.data = data;
```

Every snippet below follows this rule.

## Timezone format

Every chart endpoint accepts `timezone` as either a decimal-hour offset (`5.5` for IST, `-5` for EST) or an IANA name (`'Asia/Kolkata'`, `'America/New_York'`). The decimal form is what `/location/search` returns; pick one and stay consistent within a single integration.

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
		body: { date: '1990-01-15', time: '14:30:00', latitude: 28.6139, longitude: 77.209, timezone: 5.5 },
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
		const { data: kundli } = await roxy.vedic.generateBirthChart({ body: values });
		document.querySelector('roxy-vedic-kundli').data = kundli;
	});
</script>
```

### Pattern 4: widgets auto-mount (no JavaScript wiring)

Use a publishable key (`pk_live_*` or `pk_test_*`) for client-side embeds. Get one at <https://roxyapi.com/account>. Publishable keys are origin-restricted at the API gateway. Register the customer's domain (e.g. `https://customer.com`) when creating the key, and the gateway will reject requests from any other origin. Never use a secret key in client-side code (secret keys are unprefixed and live server-side only).

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
	data-latitude="28.6139"
	data-longitude="77.209"
	data-timezone="5.5"
></div>
```

The auto-mount script reads `data-*` attributes, calls the matching endpoint, and renders the matching component.

### Pattern 5: MCP tool-call response

A remote MCP server at `roxyapi.com/mcp/{domain}` exposes each RoxyAPI endpoint as an MCP tool. The JSON returned by the tool call has the same shape as the SDK response. Pass it straight into the matching component.

```ts
// Pseudocode for any MCP-aware agent
const result = await mcp.call('roxyapi.astrology.generate_natal_chart', {
	date: '1990-01-15', time: '14:30:00', latitude: 28.6139, longitude: 77.209, timezone: 5.5,
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
		body: { date: '1990-01-15', time: '14:30:00', latitude: 28.6139, longitude: 77.209, timezone: 5.5 },
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

## Rules every agent must follow

- Always call `/location/search` first before any chart endpoint that takes latitude, longitude, or timezone. Use `<roxy-location-search>` for the input UI.
- Pass the response object directly. Components are stateless; they do not fetch internally except for `<roxy-location-search>`, `<roxy-endpoint-form>`, and the widgets auto-mount script.
- Use the typed SDK from `@roxyapi/sdk` so prop shapes match the spec automatically.
- Theming is CSS custom properties on `:root` or per element. Do not write Tailwind classes inside the components; the shadow DOM ignores them.
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
- Do not declare a local `interface XyzData` to describe a RoxyAPI response. Import the type from the spec-derived bundle: `import type { XyzResponse } from '@roxyapi/ui'` (or the SDK's typed methods). Local interfaces drift the moment the spec changes.
- Do not write Tailwind utility classes inside a component. The Shadow DOM boundary stops them at the door. Theme through `--roxy-*` CSS custom properties on `:root` or per element instead.
- Do not fetch inside chart, table, or card components. They are stateless: pass `data` as a prop. Documented exceptions are `<roxy-location-search>`, `<roxy-endpoint-form>`, and the widgets auto-mount script.
- Do not redefine theme tokens or invent your own naming. Override the existing `--roxy-*` custom properties; the full list is in `THEMING.md`.

## Where to look next

- Component source: `packages/ui/src/components/`
- Sample data for every component: `apps/docs/sample-data.js`
- Token reference: `packages/ui/THEMING.md`
- Live preview: `bun run preview` then open `http://localhost:3001`
- Endpoint reference: <https://roxyapi.com/api-reference>
