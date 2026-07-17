# Theming Roxy UI

Every Roxy UI component reads its colors, fonts, spacing, and motion from a single set of `--roxy-*` CSS custom properties. Override them at `:root` to brand the whole library, or scope to one element to skin a single component. Custom properties inherit through the Shadow DOM boundary, so a value set on `:root` or any light-DOM ancestor reaches every component. The CDN bundle auto-loads the token defaults; your `:root` overrides always win over them.

## Token reference

### Color

| Variable | Light default | Dark default | Used by |
|---|---|---|---|
| `--roxy-bg` | `#ffffff` | `#0a0a0a` | Card and chart backgrounds |
| `--roxy-fg` | `#0a0a0a` | `#fafafa` | Body text, headings |
| `--roxy-muted` | `#71717a` | `#a1a1aa` | Secondary text, subheadings |
| `--roxy-border` | `#e4e4e7` | `#27272a` | Wheel lines, table borders |
| `--roxy-accent` | `#f59e0b` | `#fbbf24` | Planet glyphs, hexagram lines, focused state |
| `--roxy-accent-ink` | `#b45309` | `#fbbf24` | Accent-colored text and marks ON THE PAGE (a strong accent shade, "Now"/active labels, chart strokes). Map to a page-legible accent shade, NOT an on-accent foreground. |
| `--roxy-success` | `#16a34a` | `#22c55e` | Positive doshas, biorhythm peaks |
| `--roxy-warning` | `#ea580c` | `#fb923c` | Caution states, mid severity |
| `--roxy-danger` | `#dc2626` | `#ef4444` | Manglik present, critical days |
| `--roxy-info` | `#0284c7` | `#38bdf8` | Informational badges |
| `--roxy-ring` | `rgba(245, 158, 11, 0.4)` | `rgba(251, 191, 36, 0.45)` | Focus outlines |

Status tokens each have a `-fg` variant (e.g. `--roxy-success-fg`) for text rendered on top of the status color, sized for WCAG-AA contrast.

### Typography

| Variable | Default | Notes |
|---|---|---|
| `--roxy-font-sans` | `Geist, system-ui, ...` | Body text |
| `--roxy-font-display` | `var(--roxy-font-sans)` | Result headings and the self-fetch form title. Defaults to the body font, so nothing changes until you set it; override it for an editorial serif |
| `--roxy-font-mono` | `Geist Mono, ui-monospace, ...` | Numeric tables, code |
| `--roxy-text-xs` | `0.75rem` | Captions |
| `--roxy-text-sm` | `0.875rem` | Body small |
| `--roxy-text-base` | `1rem` | Body |
| `--roxy-text-lg` | `1.125rem` | Subheading |
| `--roxy-text-xl` | `1.5rem` | Heading |
| `--roxy-weight-normal` | `400` | Body |
| `--roxy-weight-bold` | `600` | Heading |
| `--roxy-leading-tight` | `1.2` | Heading |
| `--roxy-leading-normal` | `1.5` | Body |
| `--roxy-tracking-tight` | `-0.02em` | Heading |
| `--roxy-tracking-normal` | `0em` | Body |

### Spacing

| Variable | Default |
|---|---|
| `--roxy-space-xs` | `0.25rem` |
| `--roxy-space-sm` | `0.5rem` |
| `--roxy-space-md` | `1rem` |
| `--roxy-space-lg` | `1.5rem` |
| `--roxy-space-xl` | `2.5rem` |

### Radius

| Variable | Default |
|---|---|
| `--roxy-radius-sm` | `4px` |
| `--roxy-radius-md` | `8px` |
| `--roxy-radius-lg` | `12px` |
| `--roxy-radius-full` | `9999px` |

### Shadow

| Variable | Default |
|---|---|
| `--roxy-shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.06)` |
| `--roxy-shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.08), ...` |
| `--roxy-shadow-lg` | `0 12px 24px -8px rgba(0, 0, 0, 0.14)` |

### Motion

| Variable | Default | Notes |
|---|---|---|
| `--roxy-motion-duration` | `200ms` | Set to `0ms` to disable transitions and entry animations |
| `--roxy-motion-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease |

`prefers-reduced-motion: reduce` always pins duration to `0ms`. Honor this by default.

## Patterns

### Brand the whole library

```css
:root {
	--roxy-accent: #6d28d9;
	--roxy-radius-md: 12px;
	--roxy-font-sans: 'Inter', system-ui;
}
```

### Brand one component

```css
roxy-natal-chart {
	--roxy-accent: #d946ef;
	--roxy-border: #f0abfc;
}
```

### Dark mode

Three opt-in mechanisms work out of the box. The CDN bundle auto-loads the tokens, so all three work from one script tag; on the npm path the full `@roxyapi/ui` import pulls the same tokens in.

```css
/* System preference: nothing to do */

/* data-theme on the document, an ancestor, or the element itself */
:root[data-theme='dark'] { /* automatic */ }

/* Tailwind dark class on the document, an ancestor, or the element itself */
.dark { /* automatic */ }
```

Tokens set on the `:root` / `.dark` / `[data-theme]` light-DOM element inherit through the shadow boundary into every component, so a `.dark` class anywhere above a component themes it. Per-element scope works too: `<roxy-natal-chart data-theme="dark">` runs one chart in dark on an otherwise light page.

### Map Tailwind tokens

Tailwind users can map our tokens to theirs in five lines of `globals.css`. Pick the syntax that matches your Tailwind version.

**Tailwind v4 (CSS-first config, recommended):**

```css
:root {
	--roxy-bg: var(--color-background);
	--roxy-fg: var(--color-foreground);
	--roxy-accent: var(--color-primary);
	--roxy-border: var(--color-border);
	--roxy-radius-md: var(--radius);
}
```

**Tailwind v3 (`tailwind.config.js`):**

```css
:root {
	--roxy-bg: theme(colors.background);
	--roxy-fg: theme(colors.foreground);
	--roxy-accent: theme(colors.primary.DEFAULT);
	--roxy-border: theme(colors.border);
	--roxy-radius-md: theme(borderRadius.md);
}
```

If you used the shadcn registry path, this bridge installs automatically and reads from your existing shadcn tokens.

### Per-domain accent presets

One accent per domain, so a multi-domain page reads as twelve related products rather than twelve identical amber cards. Scope a preset to a wrapper and every component inside it picks it up.

Every ink value below is measured against the page background: all twelve pass WCAG AA (4.5:1) in **both** light and dark. Set `--roxy-accent` for fills and glyphs, `--roxy-accent-ink` for accent-coloured *text*, and `--roxy-ring` for focus outlines.

| Domain | `--roxy-accent` | `--roxy-accent-ink` | Dark accent | Dark ink |
|---|---|---|---|---|
| Western astrology (default) | `#f59e0b` | `#b45309` | `#fbbf24` | `#fbbf24` |
| Vedic astrology | `#f97316` | `#c2410c` | `#fb923c` | `#fdba74` |
| Numerology | `#6366f1` | `#4338ca` | `#818cf8` | `#a5b4fc` |
| Tarot | `#8b5cf6` | `#6d28d9` | `#a78bfa` | `#c4b5fd` |
| Human design | `#06b6d4` | `#0e7490` | `#22d3ee` | `#67e8f9` |
| Forecast | `#0ea5e9` | `#0369a1` | `#38bdf8` | `#7dd3fc` |
| Biorhythm | `#10b981` | `#047857` | `#34d399` | `#6ee7b7` |
| I Ching | `#78716c` | `#57534e` | `#a8a29e` | `#d6d3d1` |
| Crystals | `#d946ef` | `#a21caf` | `#e879f9` | `#f0abfc` |
| Dreams | `#3b82f6` | `#1d4ed8` | `#60a5fa` | `#93c5fd` |
| Angel numbers | `#f43f5e` | `#be123c` | `#fb7185` | `#fda4af` |
| Location | `#14b8a6` | `#0f766e` | `#2dd4bf` | `#5eead4` |

```css
/* Scope a preset to a section; components inside inherit it through the shadow boundary. */
.tarot-section {
	--roxy-accent: #8b5cf6;
	--roxy-accent-ink: #6d28d9;
	--roxy-ring: rgba(139, 92, 246, 0.4);
}
:root[data-theme='dark'] .tarot-section,
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
		--roxy-fg: #000000;       /* 21:1  */
		--roxy-muted: #474747;    /* 9.3:1 */
		--roxy-border: #000000;
		--roxy-accent: #8a4b00;
		--roxy-accent-ink: #8a4b00; /* 6.8:1 */
		--roxy-success: #006b2d;
		--roxy-warning: #8a3a00;
		--roxy-danger: #a30000;
		--roxy-info: #00548a;
	}
	:root[data-theme='dark'],
	.dark {
		--roxy-bg: #000000;
		--roxy-fg: #ffffff;        /* 21:1   */
		--roxy-muted: #c9c9c9;     /* 12.7:1 */
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

### Practitioner preset

An optional theme file restyles every widget on a page to a warm rosewater palette with a serif display font, shadowless with hairline borders and generous radii. It only reassigns `--roxy-*` tokens, so it layers on top of the base tokens: link it AFTER the token stylesheet (or the CDN bundle that injects them), and it composes with the same dark-mode machinery.

When authoring your own full re-theme, cover `--roxy-secondary` alongside `--roxy-fg` and `--roxy-muted`: it is the secondary ink used by form labels, the generic renderer, and several chart strokes, and the stock value is slate, so a warm or brand theme that skips it shows cool bluish labels, most visibly in dark mode.

The one-line option carries the full look, fonts included:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/practitioner.css">
```

Or copy the color tokens into your own stylesheet. The Customize Colors panel on the demo page has a Presets dropdown that fills the swatches and emits this snippet:

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
	--roxy-surface: #2e1e22;
	--roxy-fg: #f2e4df;
	--roxy-muted: #b39698;
	--roxy-border: #402c31;
	--roxy-accent: #d9a2a6;
	--roxy-danger: #e4736b;
}
```

`--roxy-accent-ink` and `--roxy-ring` derive from `--roxy-accent`, so the snippet does not set them. The serif display face and humanist sans body load from Google Fonts: the linked file imports both and sets `--roxy-font-display` / `--roxy-font-sans` for you, so the CSS snippet above (colors only) is the lighter option when you already have a type system.

## A11y

Color contrast must stay at 4.5:1 minimum against `--roxy-bg` for body text and 3:1 for large text. The defaults pass WCAG AA. Verify any custom palette with the axe Chrome extension or any contrast checker before shipping.

**One trap worth naming.** Accent-coloured text on a *tinted* background (a `color-mix` chip, a pill, a badge) is a different measurement from accent text on the plain page. `--roxy-accent-ink` and `--roxy-muted` on a tinted chip land around 4.2-4.5:1 and fail AA. On a tinted chip use `--roxy-fg` for the text and let the tint carry the accent. The tokens above are measured against `--roxy-bg`, not against a tint.
