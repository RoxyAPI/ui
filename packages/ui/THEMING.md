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
| `--roxy-font-sans` | `Geist, system-ui, ...` | Body and headings |
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

## A11y

Color contrast must stay at 4.5:1 minimum against `--roxy-bg` for body text and 3:1 for large text. The defaults pass WCAG AA. Verify any custom palette with the axe Chrome extension or any contrast checker before shipping.
