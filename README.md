<p align="center">
	<a href="https://roxyapi.com/ui">
		<img src="https://raw.githubusercontent.com/RoxyAPI/ui/main/assets/banner.png" alt="Roxy UI. Beautiful spiritual components in 30 minutes." width="100%">
	</a>
</p>

# @roxyapi/ui

[![npm](https://img.shields.io/npm/v/@roxyapi/ui)](https://www.npmjs.com/package/@roxyapi/ui)
[![Docs](https://img.shields.io/badge/docs-roxyapi.com-blue)](https://roxyapi.com/ui)
[![API Reference](https://img.shields.io/badge/api%20reference-roxyapi.com-blue)](https://roxyapi.com/api-reference)
[![Pricing](https://img.shields.io/badge/pricing-roxyapi.com-blue)](https://roxyapi.com/pricing)

Web components for the RoxyAPI catalog. Drop astrology, tarot, numerology, and every other RoxyAPI domain into any framework with one script tag or one npm install. Stateless components, typed responses, beautiful defaults in 30 minutes.

## Why developers use Roxy UI

- One API key. Charts, tables, cards, forms for every domain in the catalog.
- Works in React, Vue, Svelte, Angular, Solid, vanilla HTML, WordPress.
- Stateless. Caller fetches via `@roxyapi/sdk`, passes the response as `data`.
- Theming via CSS custom properties. No Tailwind required, no class-name overrides.
- A11y zero violations under axe-core. Keyboard navigation. Reduced-motion honored.
- Tree-shake friendly. Tight bundle budget enforced in CI.

## Start with one component

Vanilla HTML. Three lines. No build step.

```html
<script
	src="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js"
	crossorigin="anonymous"
	defer
></script>
<roxy-natal-chart id="chart"></roxy-natal-chart>
<script type="module">
	import { createRoxy } from 'https://cdn.jsdelivr.net/npm/@roxyapi/sdk@1/dist/factory.js';
	const roxy = createRoxy(import.meta.env?.ROXY_API_KEY);
	const { data } = await roxy.astrology.generateNatalChart({
		body: { date: '1990-01-15', time: '14:30:00', latitude: 28.6139, longitude: 77.209, timezone: 5.5 },
	});
	document.getElementById('chart').data = data;
</script>
```

Then add the kundli, the panchang, the dasha timeline, the tarot spread.

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

## Distribution

| Surface | URL |
|---|---|
| npm `@roxyapi/ui` | `npmjs.com/package/@roxyapi/ui` |
| npm `@roxyapi/ui-react` | `npmjs.com/package/@roxyapi/ui-react` |
| jsdelivr full UMD | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js` |
| jsdelivr per-component UMD | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/components/{name}.js` |
| Widgets auto-mount | `cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/widgets.js` |
| shadcn registry | `bunx shadcn add https://cdn.jsdelivr.net/gh/RoxyAPI/ui@main/registry/{name}.json` |

## Phase 1 components

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

## What you can build

- Astrology dating apps with synastry charts and compatibility scores.
- Kundli matching platforms with Guna Milan and Mangal Dosha checks.
- Daily horoscope embeds for wellness, news, and lifestyle apps.
- Tarot reading apps with daily pulls, three-card spreads, and Celtic Cross.
- Numerology calculators with full-chart breakdowns and personal year forecasts.
- Biorhythm dashboards with critical-day alerts.
- I Ching apps with hexagram lookup and three-coin casting.
- Founder hosted-app surfaces consuming the same components under brand themes.

## Theming

Every component reads from `--roxy-*` CSS custom properties. Override globally on `:root` or per element. Light + dark defaults, container queries for responsive layouts at 320px and up. See [THEMING.md](packages/ui/THEMING.md) for the full token reference.

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
- Coverage of the highest-demand endpoints across Western astrology, Vedic astrology, numerology, tarot, biorhythm, I Ching, plus helpers for location search and schema-driven forms.

## Built for AI agents

- Works with Claude Code, Cursor, Copilot, Codex, Gemini CLI.
- Ships with `AGENTS.md` so agents know which component to render for which response.
- Combines with the `@roxyapi/sdk` for typed prop shapes that match the OpenAPI spec.
- Remote MCP servers per domain at `roxyapi.com/mcp/{domain}`. No local setup, runs in seconds.

## Build anything, fast

```bash
git clone https://github.com/RoxyAPI/ui.git
cd ui
bun install
bun run build
bun run preview
# http://localhost:3001
```

Three steps. Thirty minutes. See [examples](examples/) for a full vanilla HTML, React, Vue, and WordPress integration.

## License

MIT. See [LICENSE](LICENSE).

## Links

- [Documentation](https://roxyapi.com/ui)
- [API reference](https://roxyapi.com/api-reference)
- [Methodology](https://roxyapi.com/methodology)
- [Pricing](https://roxyapi.com/pricing)
- [Support](https://roxyapi.com/contact)
