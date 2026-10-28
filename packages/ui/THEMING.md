# Theming Roxy UI

**A handful of base tokens style the whole library.** Every component takes every colour, size, space, radius, font and duration from a `--roxy-*` CSS custom property, and only a few of them are bases: the page colour, the ink, one accent, the four status colours, three font families, the base text size and its scale, the space unit, the radius and the motion timing. Everything else derives from those with `calc()` and `color-mix()`, so one token restyles the library: set `--roxy-accent` and every accent mark, accent text and focus ring follows; set `--roxy-font-sans` and every heading and label follows; set `--roxy-radius` and every corner follows.

**The default look adapts to your page.** The body font token is unset, so every component inherits the font of the page it sits on. Ink is neutral, borders are hairlines, the card is the page colour, and one restrained accent marks what matters.

Custom properties inherit through the Shadow DOM boundary, so a value set on `:root` or any light-DOM ancestor reaches every component. Every component loads the token defaults into the page the moment it connects, from npm and from the CDN alike, so no stylesheet link is needed and your overrides always win over them.

## The host contract

**Your stylesheet wins. One plain declaration is the whole override.**

```css
:root {
	--roxy-accent: #6d28d9;
}
```

That line beats the shipped default in light mode, in dark mode, and under every mode signal, and it needs no `html:root`, no extra selector weight, and no `!important`. Two things make it true and they cover different cases: every default is declared at `:where()` specificity, which is zero, and everything this package ships sits in the `roxy` cascade layer, which any unlayered rule outranks whatever its specificity. So the same one line works from inside a layer of your own, which is where a framework writes its tokens:

```css
@layer base {
	:root {
		--roxy-bg: var(--background);
		--roxy-accent: var(--primary);
	}
}
```

Layer order is decided by the order the names are first seen, and `roxy` is registered by the stylesheet itself: the first component on the page injects it at the top of `<head>`, ahead of anything the page brought with it. If you link `tokens.css` yourself and you link it AFTER your own CSS, name the order once, before either sheet:

```css
@layer roxy, base, components, utilities;
```

**If you cannot own `:root`, say which mode you are in on the element you scope to.** A multi-tenant page, or a framework that owns `<html>`, puts its tokens on a wrapper instead. Custom properties inherit, so that works for every token you set. Every token you do NOT set still comes from `:root`, where the default is chosen by the visitor operating system, and a light page opened on a dark phone then draws the pale status inks onto a near-white card. Declare the mode on the same wrapper and the whole set follows it:

```html
<div class="my-site" data-theme="light">
	<roxy-natal-chart></roxy-natal-chart>
</div>
```

`data-theme="light"` or `data-theme="dark"`, or the `.light` / `.dark` class if you already write one there. Set it from your own data rather than from the visitor preference when the page has one mode by design.

## Base tokens

Set these and the rest follows. Dark mode reassigns the colour bases only. Set a base on `:root`, or on an element that also carries `data-theme`, `.light` or `.dark`, and every derivation below it follows.

### Colour bases

| Variable         | Light default | Dark default | Used by                                                                                                                         |
| ---------------- | ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `--roxy-bg`      | `#ffffff`     | `#0a0a0a`    | The page colour: the card, the field behind an input, the ink on a filled button. Every neutral derives from it and `--roxy-fg` |
| `--roxy-fg`      | `#0a0a0a`     | `#fafafa`    | Body text and headings, and the ink end of every neutral                                                                        |
| `--roxy-accent`  | `#4a6297`     | `#92aade`    | Planet glyphs, hexagram lines, the active tab, focus. The accent ink and the focus ring follow it                               |
| `--roxy-success` | `#16a34a`     | `#22c55e`    | Positive doshas, biorhythm peaks, the Wood element                                                                              |
| `--roxy-warning` | `#ea580c`     | `#fb923c`    | Caution states, mid severity, the Earth element                                                                                 |
| `--roxy-danger`  | `#dc2626`     | `#ef4444`    | Manglik present, critical days, the heat ramp, the Fire element                                                                 |
| `--roxy-info`    | `#0284c7`     | `#38bdf8`    | Informational badges, the Water element                                                                                         |

### Type, space, shape and motion bases

| Variable                 | Default                        | Notes                                                                                               |
| ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `--roxy-font-sans`       | `initial`                      | Body text. Unset, so every component inherits the page font; set a family to choose one             |
| `--roxy-font-display`    | `var(--roxy-font-sans)`        | Every heading and the form title. Follows the body font until set; one value restyles every heading |
| `--roxy-font-mono`       | `ui-monospace, ...`            | Numeric tables, code                                                                                |
| `--roxy-text-base`       | `1rem`                         | Body size, the base of the type scale                                                               |
| `--roxy-text-scale`      | `1.15`                         | The ratio between type steps                                                                        |
| `--roxy-space-unit`      | `0.25rem`                      | Every gap, padding and margin is a multiple of it                                                   |
| `--roxy-radius`          | `6px`                          | Every corner derives from it                                                                        |
| `--roxy-motion-duration` | `200ms`                        | Set to `0ms` to disable transitions and entry animations                                            |
| `--roxy-motion-easing`   | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease                                                                                       |

`prefers-reduced-motion: reduce` always pins the duration to `0ms`.

Weights, line heights and tracking are set directly; nothing derives from them.

| Variable                 | Default   | Notes      |
| ------------------------ | --------- | ---------- |
| `--roxy-weight-normal`   | `400`     | Body       |
| `--roxy-weight-bold`     | `600`     | Headings   |
| `--roxy-leading-tight`   | `1.25`    | Headings   |
| `--roxy-leading-normal`  | `1.5`     | Body       |
| `--roxy-tracking-tight`  | `-0.01em` | Card title |
| `--roxy-tracking-normal` | `0em`     | Body       |

## Derived tokens

Each one is computed from the bases above. You may still set any of them directly and your value wins.

### Colours

| Variable            | Light default                                             | Dark default                                              | Used by                                                                                                                                            |
| ------------------- | --------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--roxy-surface`    | `var(--roxy-bg)`                                          | `var(--roxy-bg)`                                          | The card a component paints. Flat by default; set it to lift the card off the page                                                                 |
| `--roxy-primary`    | `var(--roxy-fg)`                                          | `var(--roxy-fg)`                                          | Strong ink, and the neutral end of the planet colour scale                                                                                         |
| `--roxy-secondary`  | `color-mix(in oklab, var(--roxy-fg) 78%, var(--roxy-bg))` | `color-mix(in oklab, var(--roxy-fg) 78%, var(--roxy-bg))` | Secondary ink: form labels, the generic renderer, chips, several chart strokes, the Metal element                                                  |
| `--roxy-muted`      | `color-mix(in oklab, var(--roxy-fg) 60%, var(--roxy-bg))` | `color-mix(in oklab, var(--roxy-fg) 60%, var(--roxy-bg))` | Captions, small labels, table headings. 6.4 to 1 on the default card in light, 6.1 in dark                                                         |
| `--roxy-border`     | `color-mix(in oklab, var(--roxy-fg) 14%, var(--roxy-bg))` | `color-mix(in oklab, var(--roxy-fg) 14%, var(--roxy-bg))` | Every hairline: card edge, table rule, wheel line                                                                                                  |
| `--roxy-accent-ink` | `color-mix(in oklab, var(--roxy-accent) 70%, black)`      | `var(--roxy-accent)`                                      | Accent-coloured text and marks on the page. Override only to make accent TEXT a different shade from accent FILLS, and keep it legible on the page |
| `--roxy-ring`       | `color-mix(in srgb, var(--roxy-accent) 40%, transparent)` | `color-mix(in srgb, var(--roxy-accent) 40%, transparent)` | Focus outlines                                                                                                                                     |
| `--roxy-heat`       | `var(--roxy-danger)`                                      | `var(--roxy-danger)`                                      | Intensity ramp for graded cells, mixed to transparency per tier so the text stays `--roxy-fg`                                                      |

Every status colour has a `-fg` partner: the ink for text on a tint of that status colour, derived from its own base, so re-pointing a status colour carries its text with it. Override a `-fg` only to break the ink away from its base.

| Variable            | Light default                                         | Dark default                                          |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `--roxy-success-fg` | `color-mix(in oklab, var(--roxy-success) 70%, black)` | `color-mix(in oklab, var(--roxy-success) 70%, white)` |
| `--roxy-warning-fg` | `color-mix(in oklab, var(--roxy-warning) 70%, black)` | `color-mix(in oklab, var(--roxy-warning) 70%, white)` |
| `--roxy-danger-fg`  | `color-mix(in oklab, var(--roxy-danger) 70%, black)`  | `color-mix(in oklab, var(--roxy-danger) 70%, white)`  |
| `--roxy-info-fg`    | `color-mix(in oklab, var(--roxy-info) 70%, black)`    | `color-mix(in oklab, var(--roxy-info) 70%, white)`    |

The 70 percent mix is measured: rasterised to real pixels the four shipped pairs land between 7.4 and 9.8 to 1 against the card and between 6.5 and 8.1 against a 12 percent tint of their own base. A palette of your own inherits the ratio; check any base you re-point that is much lighter than ours.

### Type scale

| Variable         | Default                                                                       | Used by         |
| ---------------- | ----------------------------------------------------------------------------- | --------------- |
| `--roxy-text-xs` | `calc(var(--roxy-text-sm) / var(--roxy-text-scale))`                          | Captions, chips |
| `--roxy-text-sm` | `calc(var(--roxy-text-base) / var(--roxy-text-scale))`                        | Labels, tables  |
| `--roxy-text-lg` | `calc(var(--roxy-text-base) * var(--roxy-text-scale))`                        | Card title      |
| `--roxy-text-xl` | `calc(var(--roxy-text-lg) * var(--roxy-text-scale) * var(--roxy-text-scale))` | Hero figures    |

### Space

| Variable            | Default                             |
| ------------------- | ----------------------------------- |
| `--roxy-space-xs`   | `var(--roxy-space-unit)`            |
| `--roxy-space-sm`   | `calc(var(--roxy-space-unit) * 2)`  |
| `--roxy-space-md`   | `calc(var(--roxy-space-unit) * 4)`  |
| `--roxy-space-lg`   | `calc(var(--roxy-space-unit) * 6)`  |
| `--roxy-space-xl`   | `calc(var(--roxy-space-unit) * 10)` |
| `--roxy-line-thick` | `calc(var(--roxy-space-unit) / 2)`  |
| `--roxy-touch`      | `calc(var(--roxy-space-unit) * 11)` |

`--roxy-line-thick` draws focus rings and accent rules; `--roxy-touch` is the minimum size of a touch target.

### Radius

| Variable             | Default                            |
| -------------------- | ---------------------------------- |
| `--roxy-radius-sm`   | `calc(var(--roxy-radius) / 2)`     |
| `--roxy-radius-md`   | `var(--roxy-radius)`               |
| `--roxy-radius-lg`   | `calc(var(--roxy-radius) * 5 / 3)` |
| `--roxy-radius-full` | `9999px`                           |

### Shadow

Surfaces are flat; only a floating layer (a popup, the enlarged chart) lifts.

| Variable           | Default                                                  |
| ------------------ | -------------------------------------------------------- |
| `--roxy-shadow-sm` | `none`                                                   |
| `--roxy-shadow-md` | `0 4px 12px color-mix(in srgb, black 10%, transparent)`  |
| `--roxy-shadow-lg` | `0 12px 32px color-mix(in srgb, black 18%, transparent)` |

**These tables are complete and a test keeps them that way.** `tests/theming-docs.test.ts` fails when a token defined in `src/styles/tokens.css` is missing here, and when a printed default or derivation differs from the one the file sets.

## Drawing hooks

Two properties the components read and the token sheet leaves unset. Each drawing falls back to a width that suits it, so set them only to change that size.

| Variable                      | Fallback    | Used by                                                                                                                                                                                                                                |
| ----------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--roxy-chart-max-width`      | Per drawing | The cap on a drawn chart (a wheel, a kundli, a bodygraph, a compass, a mandala) inside its card. Set it on `:root` for every chart on the page, or on one element for that chart. A grid or table figure spans the card and ignores it |
| `--roxy-chart-expanded-width` | `60rem`     | The width of the enlarged chart a reader opens from the chart toolbar or with a mouse click on the drawing                                                                                                                             |

```css
roxy-natal-chart {
	--roxy-chart-max-width: 40rem;
}
```

## Patterns

### Brand the whole library

```css
:root {
	--roxy-accent: #6d28d9;
	--roxy-radius: 12px;
	--roxy-font-sans: "Inter", system-ui;
}
```

### Brand one component

A derivation is computed where it is declared, so on a single element set the derived tokens you need beside the base, or give the element a `data-theme` and every derivation follows its bases.

```css
roxy-natal-chart {
	--roxy-accent: #d946ef;
	--roxy-accent-ink: #a21caf;
	--roxy-border: #f0abfc;
}
```

### Dark mode

Three opt-in mechanisms work out of the box, on the CDN and the npm path alike, because every component loads the tokens when it connects.

```css
/* System preference: nothing to do */

/* data-theme on the document, an ancestor, or the element itself */
:root[data-theme="dark"] {
	/* automatic */
}

/* Tailwind dark class on the document, an ancestor, or the element itself */
.dark {
	/* automatic */
}
```

Tokens set on the `:root` / `.dark` / `[data-theme]` light-DOM element inherit through the shadow boundary into every component, so a `.dark` class anywhere above a component themes it. Per-element scope works too: `<roxy-natal-chart data-theme="dark">` runs one chart in dark on an otherwise light page.

"System preference: nothing to do" holds only while the mode is a whole-document question. A page that scopes its theme to a wrapper is the exception, and it is the common one on a multi-tenant site: the system preference still decides every token that wrapper does not set. Declare the mode on that wrapper, as the host contract above shows.

### Map Tailwind tokens

Tailwind users can map our tokens to theirs in a few lines of `globals.css`. Pick the syntax that matches your Tailwind version.

**Tailwind v4 (CSS-first config, recommended):**

```css
:root {
	--roxy-bg: var(--color-background);
	--roxy-fg: var(--color-foreground);
	--roxy-accent: var(--color-primary);
	--roxy-border: var(--color-border);
	--roxy-radius: var(--radius);
}
```

**Tailwind v3 (`tailwind.config.js`):**

```css
:root {
	--roxy-bg: theme(colors.background);
	--roxy-fg: theme(colors.foreground);
	--roxy-accent: theme(colors.primary.DEFAULT);
	--roxy-border: theme(colors.border);
	--roxy-radius: theme(borderRadius.md);
}
```

If you used the shadcn registry path, this bridge installs automatically and reads from your existing shadcn tokens.

### Per-domain accent presets

One accent per domain, so a multi-domain page reads as related products. Scope an accent to a wrapper and every component inside it picks it up.

Every ink value below is measured against the default page background: each passes WCAG AA (4.5:1) in **both** light and dark. `--roxy-accent` alone is enough, since the ink and the ring derive from it; the ink column is a hand-tuned shade for accent-coloured _text_ when you want one.

| Domain            | `--roxy-accent` | `--roxy-accent-ink` | Dark accent | Dark ink  |
| ----------------- | --------------- | ------------------- | ----------- | --------- |
| Western astrology | `#f59e0b`       | `#b45309`           | `#fbbf24`   | `#fbbf24` |
| Vedic astrology   | `#f97316`       | `#c2410c`           | `#fb923c`   | `#fdba74` |
| Numerology        | `#6366f1`       | `#4338ca`           | `#818cf8`   | `#a5b4fc` |
| Tarot             | `#8b5cf6`       | `#6d28d9`           | `#a78bfa`   | `#c4b5fd` |
| Human design      | `#06b6d4`       | `#0e7490`           | `#22d3ee`   | `#67e8f9` |
| Forecast          | `#0ea5e9`       | `#0369a1`           | `#38bdf8`   | `#7dd3fc` |
| Biorhythm         | `#10b981`       | `#047857`           | `#34d399`   | `#6ee7b7` |
| I Ching           | `#78716c`       | `#57534e`           | `#a8a29e`   | `#d6d3d1` |
| Crystals          | `#d946ef`       | `#a21caf`           | `#e879f9`   | `#f0abfc` |
| Dreams            | `#3b82f6`       | `#1d4ed8`           | `#60a5fa`   | `#93c5fd` |
| Angel numbers     | `#f43f5e`       | `#be123c`           | `#fb7185`   | `#fda4af` |
| Location          | `#14b8a6`       | `#0f766e`           | `#2dd4bf`   | `#5eead4` |

```css
/* Scope a preset to a section; components inside inherit it through the shadow boundary. */
.tarot-section {
	--roxy-accent: #8b5cf6;
	--roxy-accent-ink: #6d28d9;
	--roxy-ring: rgba(139, 92, 246, 0.4);
}
:root[data-theme="dark"] .tarot-section,
.dark .tarot-section {
	--roxy-accent: #a78bfa;
	--roxy-accent-ink: #c4b5fd;
}
```

### High-contrast preset

For a low-vision or high-contrast mode. Body text hits WCAG **AAA** (7:1); every status colour clears AA against its background. Gate it behind `prefers-contrast: more`, a `data-contrast` attribute, or both.

```css
@media (prefers-contrast: more) {
	:root {
		--roxy-bg: #ffffff;
		--roxy-fg: #000000; /* 21:1  */
		--roxy-muted: #474747; /* 9.3:1 */
		--roxy-border: #000000;
		--roxy-accent: #8a4b00;
		--roxy-accent-ink: #8a4b00; /* 6.8:1 */
		--roxy-success: #006b2d;
		--roxy-warning: #8a3a00;
		--roxy-danger: #a30000;
		--roxy-info: #00548a;
	}
	:root[data-theme="dark"],
	.dark {
		--roxy-bg: #000000;
		--roxy-fg: #ffffff; /* 21:1   */
		--roxy-muted: #c9c9c9; /* 12.7:1 */
		--roxy-border: #ffffff;
		--roxy-accent: #ffc340;
		--roxy-accent-ink: #ffc340; /* 13.1:1 */
		--roxy-success: #4ade80;
		--roxy-warning: #fdba74;
		--roxy-danger: #ff8a8a;
		--roxy-info: #7dd3fc;
	}
}
```

### Theme presets

The default look is built in and adapts to the host page. Each named preset is one optional stylesheet that restyles every widget on a page, with a light and a dark palette, no shadows and hairline borders. The key is the file name, and every picker shows the display name; `components-catalog.json` lists both under `themes`.

| Preset     | Key and file                                          | Look                                                                                                 |
| ---------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Default    | built in                                              | Inherits the page font, neutral ink, hairlines, flat cards, one restrained blue accent               |
| Rosewater  | `practitioner`, `dist/styles/themes/practitioner.css` | Warm rosewater, serif headings, fonts bundled                                                        |
| Eucalyptus | `eucalyptus`, `dist/styles/themes/eucalyptus.css`     | Sage green on warm paper, serif headings                                                             |
| Kiln       | `kiln`, `dist/styles/themes/kiln.css`                 | Terracotta on cream, serif headings                                                                  |
| Moonlit    | `moonlit`, `dist/styles/themes/moonlit.css`           | Ink blue on cream, gold on night blue in dark mode, serif headings                                   |
| Celeste    | `celeste`, `dist/styles/themes/celeste.css`           | The roxyapi.com look: near-black ink on near-white, a teal accent, the system font and crisp corners |

Rosewater self-hosts its fonts inside this package; Eucalyptus, Kiln and Moonlit load the same two families from Google Fonts with one `@import` and share its generous radii (`--roxy-radius-sm: 0.4375rem`, `--roxy-radius-md: 0.875rem`, `--roxy-radius-lg: 1.575rem`). Celeste loads no font file and sets `--roxy-radius-sm: 0.125rem`, `--roxy-radius-md: 0.25rem`, `--roxy-radius-lg: 0.375rem`.

The colours each preset sets, with the names the Customize colors panel and the WordPress plugin show:

| Light           | Token              | Rosewater | Eucalyptus | Kiln      | Moonlit   | Celeste   |
| --------------- | ------------------ | --------- | ---------- | --------- | --------- | --------- |
| Accent          | `--roxy-accent`    | `#914955` | `#4c7060`  | `#a44a24` | `#254b5a` | `#017272` |
| Labels          | `--roxy-secondary` | `#503a3a` | `#3a4037`  | `#493d30` | `#2d3c47` | `#282f35` |
| Page background | `--roxy-bg`        | `#fbf6f3` | `#f8f7f2`  | `#faf4ea` | `#faf6ec` | `#fcfcfc` |
| Card background | `--roxy-surface`   | `#f5e8e0` | `#edefe6`  | `#efe6d6` | `#f1eadb` | `#fcfcfc` |
| Text            | `--roxy-fg`        | `#3e2a2c` | `#22281f`  | `#322820` | `#14232e` | `#030303` |
| Secondary text  | `--roxy-muted`     | `#7e625f` | `#666d63`  | `#74634f` | `#5c6a76` | `#474e55` |
| Borders         | `--roxy-border`    | `#ead9d2` | `#dce0d3`  | `#e6d8c2` | `#e4dbc6` | `#d4d8dd` |
| Warnings        | `--roxy-danger`    | `#b23a38` | `#b23a38`  | `#b23a38` | `#b23a38` | `#b23a38` |

| Dark            | Token              | Rosewater | Eucalyptus | Kiln      | Moonlit   | Celeste   |
| --------------- | ------------------ | --------- | ---------- | --------- | --------- | --------- |
| Accent          | `--roxy-accent`    | `#d9a2a6` | `#9cc0ac`  | `#d98d5f` | `#c9a96b` | `#00bcbc` |
| Labels          | `--roxy-secondary` | `#e0cecb` | `#cfd5ca`  | `#dccdbc` | `#ced0c7` | `#c9ced4` |
| Page background | `--roxy-bg`        | `#231619` | `#191e19`  | `#211710` | `#0b1826` | `#050a0f` |
| Card background | `--roxy-surface`   | `#37272b` | `#2a312a`  | `#35281e` | `#1b2a39` | `#10171e` |
| Text            | `--roxy-fg`        | `#f2e4df` | `#e9ede3`  | `#f2e7d9` | `#efe7d3` | `#f5f5f5` |
| Secondary text  | `--roxy-muted`     | `#b39698` | `#9fa89b`  | `#b49d87` | `#92a4b2` | `#a0a5ab` |
| Borders         | `--roxy-border`    | `#49353a` | `#384138`  | `#463729` | `#263a4c` | `#282f35` |
| Warnings        | `--roxy-danger`    | `#e4736b` | `#e4736b`  | `#e4736b` | `#e4736b` | `#e4736b` |

Each file only reassigns `--roxy-*` tokens, so it layers on top of the base tokens and composes with the same dark-mode machinery. A preset sits in the `roxy.theme` layer and the defaults in `roxy.tokens`, so it outranks them whichever order the two files load, and your own declarations still outrank the preset.

A re-theme of your own can stop at `--roxy-bg`, `--roxy-fg` and `--roxy-accent`: the card, secondary ink, muted text and borders derive from the first two, so they take your hue. Set them as well only to tune them by hand, as the presets do.

The one-line option carries the full look, fonts included (Rosewater shown):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/practitioner.css">
```

Or copy the colour tokens into your own stylesheet. On the demo page the Theme menu applies a preset and fills the Customize colors swatches, which emit this snippet (Rosewater shown):

```css
:root {
	--roxy-bg: #fbf6f3;
	--roxy-surface: #f5e8e0;
	--roxy-fg: #3e2a2c;
	--roxy-muted: #7e625f;
	--roxy-border: #ead9d2;
	--roxy-accent: #914955;
	--roxy-danger: #b23a38;
}
:root[data-theme="dark"] {
	--roxy-bg: #231619;
	--roxy-surface: #37272b;
	--roxy-fg: #f2e4df;
	--roxy-muted: #b39698;
	--roxy-border: #49353a;
	--roxy-accent: #d9a2a6;
	--roxy-danger: #e4736b;
}
```

`--roxy-accent-ink` and `--roxy-ring` derive from `--roxy-accent`, and each status ink derives from its own status colour, so the snippet sets none of them: the warm danger above carries its own text. The Rosewater serif display face and humanist sans body ship inside this package: the linked file declares both as self-hosted fonts (OFL, bundled) and sets `--roxy-font-display` / `--roxy-font-sans` for you, so the CSS snippet above (colours only) is the lighter option when you already have a type system.

## A11y

Color contrast must stay at 4.5:1 minimum against `--roxy-bg` for body text and 3:1 for large text. The defaults pass WCAG AA. Verify any custom palette with the axe Chrome extension or any contrast checker before shipping.

**One trap worth naming.** Accent-coloured text on a _tinted_ background (a `color-mix` chip, a pill, a badge) is a different measurement from accent text on the plain page. `--roxy-accent-ink` and `--roxy-muted` on a tinted chip land around 4.2-4.5:1 and fail AA. On a tinted chip use `--roxy-fg` for the text and let the tint carry the accent. The tokens above are measured against `--roxy-bg`, not against a tint.
