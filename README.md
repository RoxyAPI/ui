<p align="center">
	<a href="https://roxyapi.com/ui">
		<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/banner.png" alt="Roxy UI: complete UI library for astrology, vedic, tarot, and more" width="100%">
	</a>
</p>

# @roxyapi/ui

[![npm](https://img.shields.io/npm/v/@roxyapi/ui)](https://www.npmjs.com/package/@roxyapi/ui)
[![Live preview](https://img.shields.io/badge/live%20preview-roxyapi.github.io%2Fui-7c3aed?logo=github)](https://roxyapi.github.io/ui/)
[![Docs](https://img.shields.io/badge/docs-roxyapi.com-blue)](https://roxyapi.com/ui)
[![API Reference](https://img.shields.io/badge/api%20reference-roxyapi.com-blue)](https://roxyapi.com/api-reference)
[![Pricing](https://img.shields.io/badge/pricing-roxyapi.com-blue)](https://roxyapi.com/pricing)
[![License](https://img.shields.io/npm/l/@roxyapi/ui)](LICENSE)

> Live demo: **<https://roxyapi.github.io/ui/>**. Every component rendered against real API responses, light + dark, with the React/shadcn install command per card.

UI component library for the RoxyAPI catalog. Drop astrology, tarot, numerology, and every other RoxyAPI domain into any framework with one script tag or one npm install. Stateless components, typed responses, theme-agnostic. Beautiful defaults out of the box; the look is yours after that.

## Theme-agnostic, every component

Light, dark, your brand. Set `--roxy-accent` on `:root` and every component follows: the text-safe accent and the focus ring are derived from it, so one line rebrands the whole library. If you theme dark differently, set it in your dark block too, exactly as you would for any design-token system. No class overrides, no rebuild, no Tailwind required. Customize live at <https://roxyapi.github.io/ui/> using the **Customize** dialog (every token, colour picker, copy-paste snippet).

<table>
<tr>
<th width="50%" align="center">Light</th>
<th width="50%" align="center">Dark</th>
</tr>
<tr>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/natal-chart-light.png" alt="Natal chart, light mode">
</td>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/natal-chart-dark.png" alt="Natal chart, dark mode">
</td>
</tr>
<tr>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/vedic-kundli-light.png" alt="Vedic kundli, light mode">
</td>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/vedic-kundli-dark.png" alt="Vedic kundli, dark mode">
</td>
</tr>
<tr>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/bodygraph-light.png" alt="Human Design bodygraph, light mode">
</td>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/bodygraph-dark.png" alt="Human Design bodygraph, dark mode">
</td>
</tr>
</table>

```css
:root {
  /* Surface */
  --roxy-bg: #ffffff;
  --roxy-fg: #0a0a0a;
  --roxy-muted: #71717a;
  --roxy-border: #e4e4e7;

  /* Brand. Set the accent; the text-safe shade (--roxy-accent-ink) and the focus
     ring (--roxy-ring) are derived from it, so one line rebrands everything. */
  --roxy-accent: #f59e0b;

  /* Status (each has a -fg variant for WCAG-AA text contrast) */
  --roxy-success: #16a34a;
  --roxy-warning: #ea580c;
  --roxy-danger: #dc2626;
  --roxy-info: #0284c7;

  /* Shape + motion */
  --roxy-radius-md: 8px;
  --roxy-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06);
  --roxy-motion-duration: 200ms; /* 0ms when prefers-reduced-motion */
}

[data-theme="dark"] {
  --roxy-bg: #0a0a0a;
  --roxy-fg: #fafafa;
  --roxy-muted: #a1a1aa;
  --roxy-border: #27272a;
  /* Only if you want a different accent in dark. Omit it to keep the default. */
  --roxy-accent: #fbbf24;
}
```

Pick a tone, set the vars, every chart and card follows. Full token reference at [THEMING.md](https://github.com/RoxyAPI/ui/blob/main/packages/ui/THEMING.md). Live tweaker on the [demo site](https://roxyapi.github.io/ui/). See the [FAQ](#faq) for switching between light and dark at runtime.

## Gallery

Every chart, table, and card adapts to light and dark automatically. Hover any image on GitHub to inspect tooltips.

### Western astrology

<table>
<tr>
<td width="50%"><strong>Natal chart</strong> · <code>&lt;roxy-natal-chart&gt;</code><br><sub>POST /astrology/natal-chart</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/natal-chart-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/natal-chart-light.png" alt="Natal chart wheel with 14 planets, real house cusps, IC DC Part of Fortune Vertex, aspect lines">
</picture>
</td>
<td width="50%"><strong>Synastry</strong> · <code>&lt;roxy-synastry-chart&gt;</code><br><sub>POST /astrology/synastry</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/synastry-chart-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/synastry-chart-light.png" alt="Synastry dual-wheel with inter-aspects table">
</picture>
</td>
</tr>
</table>

### Vedic astrology

<table>
<tr>
<td width="50%"><strong>Vedic kundli</strong> · <code>&lt;roxy-vedic-kundli&gt;</code><br><sub>POST /vedic-astrology/birth-chart</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/vedic-kundli-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/vedic-kundli-light.png" alt="Vedic kundli D1 rashi chart, South Indian style with Lagna marker">
</picture>
</td>
<td width="50%"><strong>KP chart</strong> · <code>&lt;roxy-kp-chart&gt;</code><br><sub>POST /vedic-astrology/kp/chart</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/kp-chart-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/kp-chart-light.png" alt="KP chart with cusps and sub-lord stellar hierarchy">
</picture>
</td>
</tr>
<tr>
<td width="50%"><strong>Divisional chart</strong> · <code>&lt;roxy-divisional-chart&gt;</code><br><sub>POST /vedic-astrology/divisional-chart</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/divisional-chart-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/divisional-chart-light.png" alt="D2 to D60 varga chart, D9 navamsa shown">
</picture>
</td>
<td width="50%"><strong>Ashtakavarga grid</strong> · <code>&lt;roxy-ashtakavarga-grid&gt;</code><br><sub>POST /vedic-astrology/ashtakavarga</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/ashtakavarga-grid-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/ashtakavarga-grid-light.png" alt="Ashtakavarga sarva and bhinna bindu heatmap">
</picture>
</td>
</tr>
<tr>
<td width="50%"><strong>Dasha timeline</strong> · <code>&lt;roxy-dasha-timeline&gt;</code><br><sub>POST /vedic-astrology/dasha/&lbrace;current,major,sub/...&rbrace;</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/dasha-timeline-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/dasha-timeline-light.png" alt="Vimshottari dasha timeline with the active period highlighted and progress bars">
</picture>
</td>
<td width="50%"><strong>Shadbala table</strong> · <code>&lt;roxy-shadbala-table&gt;</code><br><sub>POST /vedic-astrology/shadbala</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/shadbala-table-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/shadbala-table-light.png" alt="Six-fold planetary strength bars with rupas and adequacy badges">
</picture>
</td>
</tr>
</table>

### Human Design and forecast

<table>
<tr>
<td width="50%"><strong>Bodygraph</strong> · <code>&lt;roxy-bodygraph&gt;</code><br><sub>POST /human-design/bodygraph</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/bodygraph-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/bodygraph-light.png" alt="Human Design bodygraph with nine centers defined and open, channels between activated gates, plus type, authority, and profile summary">
</picture>
</td>
<td width="50%"><strong>Forecast timeline</strong> · <code>&lt;roxy-forecast-timeline&gt;</code><br><sub>POST /forecast/timeline</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/forecast-timeline-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/forecast-timeline-light.png" alt="Cross-domain forecast timeline of transits, ingresses, retrograde stations, and biorhythm critical days grouped by date and weighted by significance">
</picture>
</td>
</tr>
</table>

### Other domains

<table>
<tr>
<td width="50%"><strong>Tarot spread</strong> · <code>&lt;roxy-tarot-spread&gt;</code><br><sub>POST /tarot/spreads/&lbrace;three-card,celtic-cross,love&rbrace;</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/tarot-spread-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/tarot-spread-light.png" alt="Three-card tarot spread with position labels and reading">
</picture>
</td>
<td width="50%"><strong>Biorhythm</strong> · <code>&lt;roxy-biorhythm-chart&gt;</code><br><sub>POST /biorhythm/&lbrace;daily,forecast,critical-days&rbrace;</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/biorhythm-chart-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/biorhythm-chart-light.png" alt="Physical, emotional, intellectual cycle bars">
</picture>
</td>
</tr>
<tr>
<td width="50%"><strong>I Ching hexagram</strong> · <code>&lt;roxy-hexagram&gt;</code><br><sub>GET /iching/hexagrams/&lbrace;number&rbrace;, /iching/cast</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/hexagram-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/hexagram-light.png" alt="Hexagram figure with trigrams, judgment, image, and a reading for every line">
</picture>
</td>
<td width="50%"><strong>Numerology</strong> · <code>&lt;roxy-numerology-card&gt;</code><br><sub>POST /numerology/&lbrace;life-path,expression,personal-year,chart&rbrace;</sub><br>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/numerology-card-dark.png">
  <img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/screenshots/numerology-card-light.png" alt="Life path number card with archetype, keywords, and interpretation">
</picture>
</td>
</tr>
</table>

Tables, cards, forms, and helper components in the [live demo](https://roxyapi.github.io/ui/).

## Why developers use Roxy UI

- One API key. Charts, tables, cards, forms for every domain in the catalog.
- Works in React, Vue, Svelte, Angular, Solid, vanilla HTML, WordPress.
- Stateless. Caller fetches via `@roxyapi/sdk`, passes the response as `data`.
- Theming via CSS custom properties. No Tailwind required, no class-name overrides.
- A11y zero violations under axe-core. Keyboard navigation. Reduced-motion honored.
- Tree-shake friendly. Tight bundle budget enforced in CI.

## Start with one component

Fetch with the typed SDK, pass `data` to the component. No glue code.

```tsx
import { createRoxy } from '@roxyapi/sdk';
import { RoxyHoroscopeCard } from '@roxyapi/ui-react';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

const { data } = await roxy.astrology.getDailyHoroscope({ path: { sign: 'aries' } });

return <RoxyHoroscopeCard data={data} />;
```

Then expand into natal charts, kundli, dasha, tarot, and every other domain. The SDK returns `data`, the component renders it; the same pairing holds for every component in the catalog.

> **Pass `data`, not the envelope.** The SDK returns `{ data, error, request, response }`. Pass `data`, or the component renders `[object Object]`. This is the most common integration bug.

The key stays on your server. Vanilla HTML or a server-rendered page fetches the same way, then [inlines the JSON into the component](#server-rendered-no-javascript-wiring): no build step, no key in the browser. Try every component in the [live demo](https://roxyapi.github.io/ui/), each with Preview, Code, and shadcn tabs and a live color customizer.

## Install

```bash
npm install @roxyapi/ui
# or
bun add @roxyapi/ui
```

```ts
import '@roxyapi/ui';
// or per component
import '@roxyapi/ui/components/natal-chart';
```

React users get a typed package with the same components.

```bash
npm install @roxyapi/ui-react
```

```tsx
import { RoxyNatalChart } from '@roxyapi/ui-react';

export function Chart({ data }: { data: NatalChart }) {
	return <RoxyNatalChart data={data} />;
}
```

Vue users get the same typed surface.

```bash
npm install @roxyapi/ui-vue
```

```vue
<script setup lang="ts">
import { RoxyNatalChart } from '@roxyapi/ui-vue';

defineProps<{ data: NatalChart }>();
</script>

<template>
	<RoxyNatalChart :data="data" />
</template>
```

## Quick start

```ts
import { createRoxy } from '@roxyapi/sdk';
import '@roxyapi/ui';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

const { data: cities } = await roxy.location.searchCities({ query: { q: 'Mumbai' } });
const { latitude, longitude, timezone } = cities.cities[0];

const { data: kundli } = await roxy.vedicAstrology.generateBirthChart({
	body: { date: '1990-01-15', time: '14:30:00', latitude, longitude, timezone },
});

document.querySelector('roxy-vedic-kundli')!.data = kundli;
```

Always call `/location/search` first. Every chart endpoint expects latitude, longitude, and timezone.

> **Timezone format.** RoxyAPI accepts both forms: a decimal-hour offset (`5.5` for IST, `-5` for EST) or an IANA name (`'Asia/Kolkata'`, `'America/New_York'`). Pick one and stay consistent. The decimal form is shorter and what `/location/search` returns; examples on this page use it. The IANA form is correct over DST boundaries when historical accuracy matters.

## Server-rendered, no JavaScript wiring

Server-rendered and cached pages (WordPress, JSX SSR, static HTML) cannot always run JavaScript to set the `data` property per element. Render the response into a child `<script type="application/json" class="roxy-data">` on the server instead. The component reads it on load. No per-element script, no API key in the browser.

Serialize with the shipped helper, never a bare `JSON.stringify`. `@roxyapi/ui` exports `roxyDataScript(data)` (the full `<script class="roxy-data">…</script>` element) and `serializeRoxyData(data)` (just the escaped JSON). They escape `<`, `>`, and `&` so a string field containing `</script>` cannot break out of the block and corrupt the page.

Load the bundle once anywhere on the page. It registers every `roxy-*` element and loads the design tokens, so every component on the page renders themed, in light or dark, from that single tag. Nothing else to add.

### No-JavaScript fallback

The two modes degrade differently, and only one of them can be rescued.

**Controlled mode** (the `<script class="roxy-data">` island above) already holds the reading in the page. Render it server-side as ordinary HTML alongside the island and put that markup *inside* the element. Components render into a shadow root and none of them expose a `<slot>`, so light-DOM children are painted only while the element is un-upgraded, and disappear the moment the bundle registers it. You get the server HTML without JavaScript and the live component with it, from the same markup, with no flash of both.

**Form mode** (`data-endpoint` + a `pk_` key) is a self-fetch widget: it cannot work without JavaScript, because there is nothing to render until the visitor submits the form. Give it a light-DOM fallback that says so and links out.

```html
<roxy-natal-chart data-endpoint="astrology/natal-chart" publishable-key="pk_live_…">
  <!-- Painted only when JavaScript is off. Replaced by the component otherwise. -->
  <p>JavaScript is required to generate this chart.
     <a href="https://roxyapi.com/products/astrology">Open it on roxyapi.com</a>.</p>
</roxy-natal-chart>
```

A `<noscript>` block works too, and is the safer choice if you also need to hide the fallback from screen readers once the component takes over.

```ts
import { roxyDataScript } from '@roxyapi/ui';

const { data } = await roxy.astrology.generateNatalChart({ body });
const html = `
  <script src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js" crossorigin="anonymous" defer></script>
  <roxy-natal-chart>${roxyDataScript(data)}</roxy-natal-chart>
`;
```

The emitted markup:

```html
<roxy-natal-chart>
	<script type="application/json" class="roxy-data">{ "planets": [ ... ], "houses": [ ... ], "aspects": [ ... ] }</script>
</roxy-natal-chart>
```

The component picks up the embedded JSON when no `data` property has been set. The JavaScript property always wins: assign `element.data` and the markup is ignored, so dynamic pages and server-rendered pages share one component with no branching. You can nest a server-rendered HTML fallback inside the same element for no-JavaScript and crawler views; the component leaves it untouched and reads only the marked script.

This is how the WordPress plugin renders: PHP fetches the response server-side, caches it, and embeds it in the page. The same shape works in any framework that emits HTML.

## Most-used components per domain

The highest-demand components by domain, in the order you are most likely to ship them. Each pairing shows the SDK call that returns the response shape the component renders. Spec change in the API translates to typed change at the component boundary; the pairing below is derived from the live OpenAPI spec, not invented. Full catalog in the [Components](#components) table.

### 1. Western astrology (natal chart, daily horoscope, synastry)

The global astrology app market is $6.27B and almost entirely Western. Zodiac dating apps, Co-Star-style natal chart products, daily horoscope features, and lunar-cycle wellness apps all ship these first.

```tsx
import { createRoxy } from '@roxyapi/sdk';
import { RoxyNatalChart, RoxyHoroscopeCard, RoxySynastryChart } from '@roxyapi/ui-react';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

// 1. Natal chart. The #1 Western query, called on every onboarding.
const { data: natal } = await roxy.astrology.generateNatalChart({
  body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
});
<RoxyNatalChart data={natal} />

// 2. Daily horoscope. Highest per-user call frequency in the catalog, drives DAUs and push.
const { data: horoscope } = await roxy.astrology.getDailyHoroscope({ path: { sign: 'aries' } });
<RoxyHoroscopeCard data={horoscope} />

// 3. Synastry. The dating-app pro-tier feature, full inter-aspect analysis between two charts.
const { data: synastry } = await roxy.astrology.calculateSynastry({
  body: {
    person1: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
    person2: { date: '1992-07-22', time: '09:00:00', latitude: 19.07, longitude: 72.87, timezone: 5.5 },
  },
});
<RoxySynastryChart data={synastry} />
```

### 2. Vedic astrology (kundli, panchang, dasha, dosha, KP, ashtakavarga, divisional)

The depth moat. India astrology market: $163M in 2024, projected $1.8B by 2030 (49% CAGR). Kundli, panchang, dasha, dosha, KP horary, and divisional charts (D9 Navamsa, D10 Dasamsa) are the highest-traffic Vedic queries for every matrimonial platform, kundli generator, muhurat app, and professional reader.

```tsx
import {
  RoxyVedicKundli, RoxyVedicPlanetsTable, RoxyPanchangTable,
  RoxyDashaTimeline, RoxyDoshaCard, RoxyKpChart, RoxyAshtakavargaGrid,
  RoxyDivisionalChart,
} from '@roxyapi/ui-react';

// Kundli + positions table share a single API call (the same response renders both).
const { data: kundli } = await roxy.vedicAstrology.generateBirthChart({
  body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
});
<RoxyVedicKundli data={kundli} chart-style="south" />
<RoxyVedicPlanetsTable data={kundli} />

// Panchang. Tithi, nakshatra, yoga, karana, rahu kaal, abhijit muhurta in one call.
const { data: panchang } = await roxy.vedicAstrology.getDetailedPanchang({
  body: { date: '2026-04-22', latitude: 19.07, longitude: 72.88 },
});
<RoxyPanchangTable data={panchang} />

// Vimshottari dasha. The 120-year planetary period timeline.
const { data: dasha } = await roxy.vedicAstrology.getMajorDashas({
  body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
});
<RoxyDashaTimeline data={dasha} period="major" />

// Mangal Dosha. Most-asked matrimonial question in India.
const { data: dosha } = await roxy.vedicAstrology.checkManglikDosha({
  body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
});
<RoxyDoshaCard data={dosha} />

// KP chart. The horary timing tool, sub-lord stellar hierarchy on every cusp.
const { data: kp } = await roxy.vedicAstrology.generateKpChart({
  body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
});
<RoxyKpChart data={kp} />

// Ashtakavarga. Bindu strength heatmap with Sarva, Bhinna, Shodhya Pinda views.
const { data: ashtaka } = await roxy.vedicAstrology.calculateAshtakavarga({
  body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
});
<RoxyAshtakavargaGrid data={ashtaka} />

// Divisional chart (D9 Navamsa shown). `division` is the integer 9 — not "D9".
// Supported: 2, 3, 4, 7, 9, 10, 12, 16, 20, 24, 27, 30, 40, 45, 60.
const { data: d9 } = await roxy.vedicAstrology.generateDivisionalChart({
  body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5, division: 9 },
});
<RoxyDivisionalChart data={d9} />
```

### 3. Numerology (life path, full chart, personal year)

Commodity content with durable demand. `life path number calculator` is among the highest-volume spiritual searches globally. Works without birth time. Easiest domain to integrate.

```tsx
import { RoxyNumerologyCard } from '@roxyapi/ui-react';

// Life Path. The #1 numerology keyword, every calculator page starts here.
const { data: lp } = await roxy.numerology.calculateLifePath({
  body: { year: 1990, month: 1, day: 15 },
});
<RoxyNumerologyCard data={lp} type="life-path" />

// Full numerology chart. Premium one-shot: all six core numbers plus karmic, personal year.
const { data: chart } = await roxy.numerology.generateNumerologyChart({
  body: { fullName: 'Jane Smith', year: 1990, month: 1, day: 15 },
});
<RoxyNumerologyCard data={chart} type="chart" />

// Personal Year. Annual forecast, drives January traffic spikes.
const { data: pyear } = await roxy.numerology.calculatePersonalYear({
  body: { month: 1, day: 15, year: 2026 },
});
<RoxyNumerologyCard data={pyear} type="personal-year" />
```

### 4. Tarot (daily card, three-card, Celtic Cross)

High search volume, evergreen. The tarot card database is the highest per-endpoint call count in the catalog because apps fetch once and cache.

```tsx
import { RoxyTarotCard, RoxyTarotSpread } from '@roxyapi/ui-react';

// Daily card. Stickiest tarot feature. Seed per user for deterministic once-per-day behavior.
const { data: daily } = await roxy.tarot.getDailyCard({ body: { seed: 'user-42' } });
<RoxyTarotCard data={daily} />

// Three-card past-present-future. Most-drawn spread on every tarot platform.
const { data: three } = await roxy.tarot.castThreeCard({
  body: { question: 'My next quarter', seed: 'user-42' },
});
<RoxyTarotSpread data={three} />

// Celtic Cross. Professional-reader spread. Premium-tier, ten positions.
const { data: cc } = await roxy.tarot.castCelticCross({
  body: { question: 'What should I focus on?', seed: 'user-42' },
});
<RoxyTarotSpread data={cc} />
```

### 5. Human Design (bodygraph)

The breakout 2026 self-knowledge category, computed from the same ephemeris as Western astrology plus the I Ching gate wheel and chakra-style centers. Self-discovery apps, dating and compatibility products, and AI coaching bots ship the full bodygraph first. No coordinates needed; Human Design uses the birth instant, not the observer location.

The response is a reading, not a set of labels: the type, strategy, authority, profile, and definition each arrive with the text that explains them, every defined channel and every center carry their own interpretation, and each of the activations carries a gate meaning and the meaning of its line. `<RoxyBodygraph>` lays that out for you. The chart and the identity read at a glance, and every body of prose sits behind a disclosure, so one component renders a complete reading without becoming a wall of text.

```tsx
import { RoxyBodygraph } from '@roxyapi/ui-react';

// Full bodygraph. The head term every Human Design app leads with ("human design chart").
// Type, strategy, authority, profile, the nine centers, channels, and every gate
// activation in one call. Pass the birth instant only, no latitude or longitude.
const { data: bodygraph } = await roxy.humanDesign.generateBodygraph({
  body: { date: '1990-01-15', time: '14:30:00', timezone: 5.5 },
});
<RoxyBodygraph data={bodygraph} />
```

Every interpretation is localized. Ask for the language on the request and the component renders it, because the component prints the prose the API returned and holds no copy of its own.

```tsx
const { data: bodygraph } = await roxy.humanDesign.generateBodygraph({
  body: { date: '1990-01-15', time: '14:30:00', timezone: 5.5 },
  query: { lang: 'de' },
});
```

### 6. Forecast (transits, cross-domain timeline)

The first cross-domain, stateless forecast in the catalog: one call merges Western transits, Vedic Vimshottari dasha boundaries, and biorhythm critical days into a single significance-scored, time-ordered timeline. Forecast feeds, transit alerts, and timing tools are the buyers. Acquire on the high-volume `astrology transits` search, convert on the cross-domain timeline no competitor ships. No coordinates needed.

```tsx
import { RoxyForecastTimeline } from '@roxyapi/ui-react';

// Transit forecast. The demand leader. Western transit-to-natal aspects, sign
// ingresses, and retrograde stations over the window.
const { data: transits } = await roxy.forecast.forecastTransits({
  body: { birthData: { date: '1990-01-15', time: '14:30:00', timezone: 5.5 } },
});
<RoxyForecastTimeline data={transits} />

// Cross-domain timeline. The same window merged with Vedic dasha boundaries and
// biorhythm critical days into one significance-scored timeline.
const { data: timeline } = await roxy.forecast.generateTimeline({
  body: {
    birthData: { date: '1990-01-15', time: '14:30:00', timezone: 5.5 },
    domains: ['western', 'vedic', 'biorhythm'],
  },
});
<RoxyForecastTimeline data={timeline} />
```

### 7. Biorhythm (daily, forecast)

Zero competition domain. Steady search volume with the top Google result being a static calculator page. Pure land-grab for wellness, productivity, sports, and couples apps.

```tsx
import { RoxyBiorhythmChart } from '@roxyapi/ui-react';

// Daily biorhythm. Physical, emotional, intellectual, intuitive, plus seven extended cycles.
// Seeded for stable "biorhythm of the day" features; pass a userId for per-user determinism.
const { data: bio } = await roxy.biorhythm.getDailyBiorhythm({
  body: { seed: 'user-42', date: '2026-04-23' },
});
<RoxyBiorhythmChart data={bio} />

// Multi-day forecast. Best-day / worst-day planner for calendar and coaching products.
const { data: forecast } = await roxy.biorhythm.getForecast({
  body: { birthDate: '1990-01-15', startDate: '2026-04-01', endDate: '2026-04-30' },
});
<RoxyBiorhythmChart data={forecast} mode="forecast" />
```

### 8. I Ching (cast a reading, hexagram lookup)

Meditation apps, decision-making tools, and wisdom chatbots. `i ching API` and `hexagram API` are the keywords.

```tsx
import { RoxyHexagram } from '@roxyapi/ui-react';

// Cast a reading. Active divination, primary hexagram plus changing lines and transformed hexagram.
const { data: reading } = await roxy.iching.castReading({ query: { seed: 'user-42' } });
<RoxyHexagram data={reading} />

// Random hexagram. One-shot daily-hexagram surface for ambient apps.
const { data: random } = await roxy.iching.getRandomHexagram();
<RoxyHexagram data={random} />
```

> **Pairing rule.** The SDK return value already matches the `data` prop on every component. No field renames, no glue code. When a new endpoint ships in the spec, the SDK and the component types regenerate together; the same pattern keeps working.

## API keys

Get a key at <https://roxyapi.com/account>.

Two key types. **Secret keys** (`sk_*`) grant full account access: use them server side only (Node, Bun, Hono, Next.js route handlers, Workers). Never commit one, never ship one in a client bundle. **Publishable keys** (`pk_live_*` / `pk_test_*`) are browser-safe: mint one, register the origins you embed on, and any other origin gets a 403 at the gateway.

Two ways to feed a component, and the key rule for each:

- **Controlled (recommended for production).** Your server fetches with the secret key and passes the response in via the `data` property or a `roxy-data` JSON island. No key of any kind reaches the browser. This is what the WordPress plugin and the server-rendered patterns do.
- **Self-fetch (no backend).** Give the component a `data-endpoint` and a `publishable-key` and it renders its own form and fetches in the browser. Only publishable keys work here: a secret key is refused client-side, so the component sends nothing and raises a validation error. A secret key cannot leak through self-fetch.

Set `ROXY_API_KEY` to your secret key in your server env for the server-side SDK examples on this page. For self-fetch embedding with no backend, use a publishable key (see the fully client-side pattern in [`AGENTS.md`](AGENTS.md)).

The self-fetch form renders spec-driven inputs (a zodiac tile picker, a boolean toggle, native date and time, a city search), collapses optional fields under one Advanced disclosure, and reads a `lang` attribute for localized responses. For the simplest embed, load `dist/cdn/widgets.js` and drop one `<div data-roxy-widget="{slug}" data-publishable-key="pk_live_...">`: with the required attributes present it fetches on mount, otherwise it renders the form. A single `<link>` to the [practitioner theme preset](https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/practitioner.css) restyles every widget on the page.

## Distribution

| Surface | URL |
|---|---|
| npm `@roxyapi/ui` | `npmjs.com/package/@roxyapi/ui` |
| npm `@roxyapi/ui-react` | `npmjs.com/package/@roxyapi/ui-react` |
| npm `@roxyapi/ui-vue` | `npmjs.com/package/@roxyapi/ui-vue` |
| jsDelivr CDN (full bundle) | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js` |
| jsDelivr CDN (per component) | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/components/{name}.js` |
| Widgets auto-mount (one tag, browser keys) | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/widgets.js` |
| Practitioner theme preset (one link, warm rosewater) | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/practitioner.css` |
| shadcn registry | `npx shadcn@latest add https://cdn.jsdelivr.net/gh/RoxyAPI/ui@latest/registry/{name}.json` |
| Components catalog (JSON: every component, domain, and endpoint) | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/components-catalog.json` |

## Components

<!-- BEGIN:COMPONENTS -->
| Element | Domain | Endpoint(s) | What it renders |
|---|---|---|---|
| `<roxy-natal-chart>` | Western | POST /astrology/natal-chart | Natal chart wheel with planet glyphs and aspect lines |
| `<roxy-synastry-chart>` | Western | POST /astrology/synastry | Dual-wheel synastry with inter-aspects table |
| `<roxy-western-planets-table>` | Western | POST /astrology/natal-chart | Sign, degree, house, motion columns plus ASC, MC, PoF, Vertex |
| `<roxy-transits-table>` | Western | POST /astrology/transits | Transit planet positions plus optional aspects to a natal chart |
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

## What you can build

- Astrology dating apps with synastry charts and compatibility scores.
- Kundli matching platforms with Guna Milan and Mangal Dosha checks.
- Daily horoscope embeds for wellness, news, and lifestyle apps.
- Tarot reading apps with daily pulls, three-card spreads, and Celtic Cross.
- Numerology calculators with full-chart breakdowns and personal year forecasts.
- Biorhythm dashboards with critical-day alerts.
- I Ching apps with hexagram lookup and three-coin casting.

## Theming

Every component reads from `--roxy-*` CSS custom properties. Override globally on `:root` or per element. Light + dark defaults, container queries for responsive layouts at 320px and up. The CDN bundle auto-loads these tokens; your `:root { --roxy-* }` overrides always win over the defaults. See [THEMING.md](https://github.com/RoxyAPI/ui/blob/main/packages/ui/THEMING.md) for the full token reference.

```css
:root {
	--roxy-accent: #6d28d9;
	--roxy-radius-md: 12px;
}

roxy-natal-chart {
	--roxy-accent: #ec4899;
}
```

## Reliability

- Verified astronomical calculations from Roxy Ephemeris, verified against NASA JPL Horizons.
- Stable, versioned API. New endpoints regenerate component types automatically.
- Consistent response formats across every domain in the catalog.
- A11y zero violations enforced in CI.
- Tight per-component bundle budget enforced in CI.
- Coverage of the highest-demand endpoints across Western astrology, Vedic astrology, numerology, tarot, Human Design, forecast, biorhythm, I Ching, plus helpers for location search and schema-driven forms.

## Built for AI agents

[`AGENTS.md`](AGENTS.md) is bundled inside every npm package. Once installed, agents can read it from `node_modules/@roxyapi/ui/AGENTS.md` (or `@roxyapi/ui-react/AGENTS.md`, `@roxyapi/ui-vue/AGENTS.md`) for the component decision tree, integration patterns, and rules.

- Works with Claude Code, Cursor, Copilot, Codex, Gemini CLI, and any MCP-compatible client.
- Component decision tree maps each RoxyAPI endpoint to the component that renders its response.
- Typed prop shapes derive from the OpenAPI spec. The SDK at `@roxyapi/sdk` returns shapes that flow straight into `data`. No field renames, no glue code.
- Remote MCP servers per domain at `roxyapi.com/mcp/{domain}`. No local setup. JSON tool-call responses feed straight into the matching component.
- Use cases agents handle in one prompt: birth chart from city + DOB, daily tarot embed, Vedic kundli matching, numerology life-path card, biorhythm dashboard, daily horoscope by sign, panchang for the day, I Ching three-coin cast.

## Build anything, fast

```bash
git clone https://github.com/RoxyAPI/ui.git
cd ui
bun install
bun run build
bun run preview
# http://localhost:3001
```

Local preview serves `apps/docs/` on port 3001. Same directory and same paths the live demo at <https://roxyapi.github.io/ui/> serves. See [examples](examples/) for vanilla HTML, React, Vue, and WordPress.

## Stack and integrations

Roxy UI runs in any framework that supports the DOM: **React, Next.js, Vue, Svelte, Angular, Solid, Astro, Qwik, Hono, Remix, Nuxt, SvelteKit, Lit, plain HTML, WordPress, Shopify themes that allow custom code, and any MCP-compatible AI agent**. Distribution paths: npm, jsDelivr CDN, shadcn registry. Use cases: astrology widgets, kundli matching, daily horoscope, tarot reader, numerology calculator, biorhythm dashboard, I Ching cast, panchang almanac, dasha timeline, moon phase tracker, synastry compatibility, dosha checker.

## FAQ

<details>
<summary><strong>How do I switch between light and dark mode?</strong></summary>

No events. No JavaScript bridge. Components read three CSS signals in priority order:

1. **`prefers-color-scheme`**: follows the operating system by default. Ship nothing, get correct behaviour.
2. **`data-theme="dark"` or `data-theme="light"`** on any ancestor (typically `<html>` or `<body>`). Wins over system preference.
3. **`.dark` class** on any ancestor. Equivalent to `data-theme="dark"`. Useful when the host stack already toggles a `.dark` class (Tailwind, shadcn).

```ts
// Toggle on click. No imports from this library needed.
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

```ts
// React: bind theme to component state.
useEffect(() => {
  document.documentElement.dataset.theme = theme;
}, [theme]);
```

Persist the choice in `localStorage` from your own code; the components do not own user preferences. Per-element overrides also work, so one chart can run in dark on an otherwise light page:

```html
<roxy-natal-chart data-theme="dark" .data=${chart}></roxy-natal-chart>
```
</details>

<details>
<summary><strong>How big is each component? What is the bundle cost?</strong></summary>

Per-component bundles run 13-26 KB gzipped, capped at 30 KB by CI. The full bundle (every component, helpers, base styles, and the inlined design tokens) stays well under the 150 KB CI cap, around 108 KB gzipped today. The React and Vue packages load the runtime on mount, so a route that renders one chart pays for one component, not the whole catalog. Pin a concrete version in production for byte-stable cache hits.
</details>

<details>
<summary><strong>How tall does each component render on mobile?</strong></summary>

Charts stay square: every wheel and grid component honours `aspect-ratio: 1 / 1` capped at `max-width: 560px`, so at a 390px phone width the chart itself is around 390px tall.

What can grow vertically is the data card around it. `<roxy-natal-chart>` stacks the wheel above the aspect-grid tab, the dignity table, and the planet-reading accordion; the host article on the demo page measures roughly 2100px tall at 390px width because the accordion is fully expanded server-side. Production embeds usually drop the accordion or wrap the chart in a sized container, and the wheel alone fits the fold. Same applies to the synastry chart and the dasha timeline.

Rule of thumb: chart-only components (`<roxy-vedic-kundli>`, `<roxy-divisional-chart>`, `<roxy-ashtakavarga-grid>`, `<roxy-tarot-card>`) stay within their aspect ratio. Components that bundle a wheel plus interpretation copy (`<roxy-natal-chart>`, `<roxy-synastry-chart>`, `<roxy-dasha-timeline>`) grow tall to fit their content. Pick the level of detail by component choice.
</details>

<details>
<summary><strong>Does this work with Next.js App Router, Remix, Nuxt, SvelteKit, and Astro?</strong></summary>

Yes. The components are standard custom elements; any framework that touches the DOM can mount them. For SSR/RSC frameworks, fetch on the server, pass the response to a client island. Next.js App Router pattern:

```tsx
// app/page.tsx (Server Component)
import { createRoxy } from '@roxyapi/sdk';
import ChartView from './chart-view';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

export default async function Page() {
  const { data } = await roxy.astrology.generateNatalChart({
    body: { date: '1990-01-15', time: '14:30:00', latitude: 19.07, longitude: 72.88, timezone: 5.5 },
  });
  return <ChartView data={data} />;
}
```

```tsx
// app/chart-view.tsx (Client Component)
'use client';
import { RoxyNatalChart } from '@roxyapi/ui-react';

export default function ChartView({ data }: { data: unknown }) {
  return <RoxyNatalChart data={data} />;
}
```

The server component fetches, the client component renders. The API key never crosses the network. Same shape works in Remix loaders, Nuxt server routes, SvelteKit `+page.server.ts`, and Astro server endpoints.
</details>

<details>
<summary><strong>Tailwind v3 vs v4 compatibility?</strong></summary>

Both work. Components do not consume Tailwind utilities. Tailwind utilities apply outside the components on parent layout elements and containers; inside the Shadow DOM, components read `--roxy-*` CSS custom properties only.

For Tailwind v4 users, the shadcn registry installs a CSS bridge that maps your existing v4 design tokens onto `--roxy-*`. For Tailwind v3 users, set `--roxy-*` directly on `:root`, or write a tiny bridge:

```css
:root {
  --roxy-bg: theme(colors.background);
  --roxy-fg: theme(colors.foreground);
  --roxy-accent: theme(colors.primary.DEFAULT);
  --roxy-border: theme(colors.border);
}
```
</details>

<details>
<summary><strong>How do React 17/18 vs 19 differ for custom-event handling?</strong></summary>

React 19 routes hyphenated DOM events through camelCase props or lowercase attributes correctly, so `<RoxyLocationSearch onroxy-location-select={...}>` works as expected.

For React 17 and 18, use a ref plus `addEventListener` in `useEffect`:

```tsx
const ref = useRef<HTMLElement>(null);
useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const handler = (e: Event) => console.log((e as CustomEvent).detail);
  el.addEventListener('roxy-location-select', handler);
  return () => el.removeEventListener('roxy-location-select', handler);
}, []);

return <roxy-location-search ref={ref} />;
```

Upgrade to React 19 when you can; the React components route everything cleanly.
</details>

<details>
<summary><strong>Browser support matrix?</strong></summary>

Chrome 120+, Firefox 120+, Safari 17+, Edge 120+. The floor is set by ES modules, Custom Elements v1, Shadow DOM v1, container queries, and `color-mix()`. No polyfills shipped; older browsers fail loud rather than degrade silently. This covers ~95% of global traffic per Can I Use.
</details>

<details>
<summary><strong>Are the TypeScript types reliable?</strong></summary>

Yes. Component prop types are regenerated from the OpenAPI spec on every release via `@hey-api/openapi-ts`. Spec change in the API translates to typed change at the component boundary. There are no hand-written response shapes inside components, so types cannot drift from what the API returns. The SDK at `@roxyapi/sdk` shares the same type pipeline.
</details>

<details>
<summary><strong>What is the accessibility story?</strong></summary>

WAI-ARIA 1.2 throughout. Keyboard navigation on every interactive surface. Focus rings honor `--roxy-ring`. `prefers-reduced-motion: reduce` pins `--roxy-motion-duration` to `0ms` and disables entry animations. Color contrast hits WCAG AA at the defaults; verify any custom palette before shipping. CI runs axe-core against every component; zero blocking violations is a build gate.
</details>

<details>
<summary><strong>Why can my Tailwind classes not reach the chart inside the component?</strong></summary>

Components ship in Shadow DOM for style isolation; Tailwind utilities are scoped to the page tree and stop at the shadow boundary. This is by design: customer styles cannot accidentally bleed into a chart, and component styles cannot leak out. Theme through `--roxy-*` custom properties (they pierce the shadow boundary) on `:root` or per element.
</details>

<details>
<summary><strong>What is the security model for API keys?</strong></summary>

Two key types. Secret keys (`sk_*`) live server side only and grant full access, so never ship one in a client bundle: fetch on your server and pass the rendered response, not the key, to the browser. Publishable keys (`pk_live_*` / `pk_test_*`) are browser-safe for direct client-side embedding: they carry an origin allowlist, so a key leaked to any other origin returns 403 instead of working. Mint either at `roxyapi.com/account`.

For CSP, allow `script-src https://cdn.jsdelivr.net` if loading the bundle from the CDN. Subresource Integrity hashes are available via the jsDelivr SRI API for any pinned version.
</details>

<details>
<summary><strong>How does versioning work?</strong></summary>

Semver. Pre-1.0, minor bumps may include breaking changes (we will note them in the changelog). Patch bumps are always backwards-compatible. Pin a concrete version in production code:

```bash
npm install @roxyapi/ui@0.15.x
```

```html
<script src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@0.15.0/dist/cdn/roxy-ui.js"></script>
```

The `@latest` URL on this page is for paste-friendly marketing; production code should pin.
</details>

<details>
<summary><strong>How do I test components in my app?</strong></summary>

Mock `@roxyapi/sdk` at the network boundary so unit tests do not hit the live API. Snapshot the Shadow DOM output for visual stability. End-to-end with Playwright works well; the components emit semantic ARIA roles, so locators are stable across releases.
</details>

<details>
<summary><strong>What if I want to fork or own a component?</strong></summary>

Use the shadcn registry. The registry drops the React component source and a CSS theme bridge into your repo. Edit anything; the source is yours from that point.

```bash
npx shadcn@latest add https://cdn.jsdelivr.net/gh/RoxyAPI/ui@latest/registry/natal-chart.json
```
</details>

<details>
<summary><strong>What if I need an endpoint that has no dedicated component?</strong></summary>

Use `<roxy-data>`. It is the generic fallback renderer; pass any RoxyAPI response and it produces a structured layout (scrollable tables, chip lists, nested sections, formatted numbers and dates, links) without bespoke logic. New endpoints render automatically; bespoke components ship only when a novel pattern emerges.
</details>

<details>
<summary><strong>Does this integrate with MCP-aware AI agents?</strong></summary>

Yes. RoxyAPI hosts a remote MCP server per domain at `roxyapi.com/mcp/{domain}`. Configure once, render anywhere:

```json
{
  "mcpServers": {
    "roxy-astrology": {
      "url": "https://roxyapi.com/mcp/astrology",
      "headers": { "Authorization": "Bearer <your-secret-key>" }
    }
  }
}
```

Tool-call JSON has the same shape as the SDK response. Pass it straight into the matching component.
</details>

<details>
<summary><strong>License and contribution?</strong></summary>

MIT. Source on [GitHub](https://github.com/RoxyAPI/ui). Open an issue or pull request for bugs and ideas. The component manifest is data-driven, so most additions are spec changes upstream rather than UI repo edits.
</details>

## License

MIT. See [LICENSE](LICENSE).

## Links

- [Documentation](https://roxyapi.com/ui)
- [API reference](https://roxyapi.com/api-reference)
- [Methodology](https://roxyapi.com/methodology)
- [Pricing](https://roxyapi.com/pricing)
- [Support](https://roxyapi.com/contact)
