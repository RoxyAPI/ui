# AGENTS.md

This file teaches AI coding agents (Claude Code, Cursor, Copilot, Codex, Gemini CLI) how to use Roxy UI when integrating RoxyAPI into a project.

## Identity

Roxy UI is the official web component library for the RoxyAPI catalog. Eighteen Phase 1 components plus a generic fallback renderer cover ten domains: Western astrology, Vedic astrology, numerology, tarot, biorhythm, I Ching, crystals, dreams, angel numbers, plus the location helper.

## Decision tree for picking a component

Use the table below. Match the user request against the endpoint, render the matching component.

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
| `<roxy-numerology-card>` | Numerology | POST /numerology/{life-path,expression,personal-year,chart} | Life path, expression, personal year, full chart |
| `<roxy-tarot-card>` | Tarot | GET /tarot/cards/{id}, POST /tarot/daily | Single card with upright and reversed flip |
| `<roxy-tarot-spread>` | Tarot | POST /tarot/spreads/{three-card,celtic-cross,love}, /tarot/yes-no, /tarot/draw | Spreads with positions and reading |
| `<roxy-biorhythm-chart>` | Biorhythm | POST /biorhythm/{daily,forecast,critical-days} | Daily bars, forecast cycle lines, critical days |
| `<roxy-hexagram>` | I Ching | GET /iching/hexagrams/{number}, /iching/cast, POST /iching/daily, /iching/daily/cast | Hexagram with trigrams, judgment, image, changing lines |
| `<roxy-endpoint-form>` | Helper | Any endpoint via x-roxy-ui hints | Schema-driven form, emits roxy-submit |
| `<roxy-location-search>` | Helper | GET /location/search | Debounced city search input, emits roxy-location-select |
| `<roxy-data>` | Helper | Any response shape | Generic fallback renderer for unknown shapes |
<!-- END:COMPONENTS -->

## Integration patterns

### Pattern 1: vanilla HTML, no build step

```html
<script
	src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@1/dist/cdn/roxy-ui.js"
	crossorigin="anonymous"
></script>

<roxy-natal-chart id="chart"></roxy-natal-chart>

<script type="module">
	const res = await fetch('https://roxyapi.com/api/v2/astrology/natal-chart', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'X-API-Key': 'roxy_xxx' },
		body: JSON.stringify({
			date: '1990-01-15',
			time: '14:30:00',
			latitude: 28.6139,
			longitude: 77.209,
			timezone: 5.5,
		}),
	});
	const data = await res.json();
	document.getElementById('chart').data = data;
</script>
```

### Pattern 2: React, with the typed SDK

```tsx
import { createRoxy } from '@roxyapi/sdk';
import { RoxyNatalChart, RoxyLocationSearch } from '@roxyapi/ui-react';
import { useState } from 'react';

const roxy = createRoxy(process.env.NEXT_PUBLIC_ROXY_API_KEY!);

export function BirthChartView() {
	const [chart, setChart] = useState(null);

	const onLocationSelect = async (e: CustomEvent<{ latitude: number; longitude: number; timezone: string }>) => {
		const { data } = await roxy.astrology.generateNatalChart({
			body: { date: '1990-01-15', time: '14:30:00', ...e.detail },
		});
		setChart(data);
	};

	return (
		<div>
			<RoxyLocationSearch onroxy-location-select={onLocationSelect} />
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
	const form = document.querySelector('roxy-endpoint-form');
	form.addEventListener('roxy-submit', async (e) => {
		const { endpoint, values } = e.detail;
		const res = await fetch(`https://roxyapi.com/api/v2/${endpoint}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-API-Key': 'roxy_xxx' },
			body: JSON.stringify(values),
		});
		const kundli = await res.json();
		document.querySelector('roxy-vedic-kundli').data = kundli;
	});
</script>
```

### Pattern 4: widgets auto-mount (no JavaScript wiring)

Use the publishable key flow for vibecoder embeds.

```html
<script
	src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@1/dist/cdn/widgets.js"
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

## Rules every agent must follow

- Always call `/location/search` first before any chart endpoint that takes latitude, longitude, or timezone. Use `<roxy-location-search>` for the input UI.
- Pass the response object directly. Components are stateless; they do not fetch internally except for `<roxy-location-search>`, `<roxy-endpoint-form>`, and the widgets auto-mount script.
- Use the typed SDK from `@roxyapi/sdk` so prop shapes match the spec automatically.
- Theming is CSS custom properties on `:root` or per element. Do not write Tailwind classes inside the components; the shadow DOM ignores them.
- Honor reduced motion. The library already respects `prefers-reduced-motion: reduce` and the `--roxy-motion-duration` variable.
- A11y violations are CI failures. Do not paste over `role` or `aria-*` attributes; the components emit them correctly already.

## Domain ordering

When listing domains in user-visible copy, use the canonical order: Western astrology, Vedic astrology, numerology, tarot, biorhythm, I Ching, crystals, dreams, angel numbers. Location is utility, not a selling domain.

## What not to ship

- Do not bundle `@roxyapi/ui` and `@roxyapi/ui-react` together; they are decoupled by design.
- Do not import from `@roxyapi/ui` inside React projects; use `@roxyapi/ui-react` thin shells which lazy load the jsdelivr UMD.
- Do not write your own kundli component. The lifted layout in `<roxy-vedic-kundli>` is the canonical RoxyAPI render path.
- Do not call astrology endpoints with hardcoded coordinates. Always geocode first via `<roxy-location-search>` or `roxy.location.searchCities()`.

## Where to look next

- Component source: `packages/ui/src/components/`
- Sample data for every component: `apps/docs/sample-data.js`
- Token reference: `packages/ui/THEMING.md`
- Live preview: `bun run preview` then open `http://localhost:3001`
- Money endpoints reference: see the RoxyAPI methodology page at `roxyapi.com/methodology`
