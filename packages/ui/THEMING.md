# Theming Roxy UI

Every Roxy UI component reads its colors, fonts, spacing, and motion from a single set of CSS custom properties on `:host`. Override them at `:root` to brand the whole library, or scope to one element to skin a single component.

## Token reference

### Color

| Variable | Light default | Dark default | Used by |
|---|---|---|---|
| `--roxy-primary` | `#0f172a` | `#f8fafc` | Headings, primary text |
| `--roxy-secondary` | `#475569` | `#94a3b8` | Subheadings, muted accents |
| `--roxy-accent` | `#f59e0b` | `#fbbf24` | Planet glyphs, hexagram lines, focused state |
| `--roxy-success` | `#16a34a` | `#22c55e` | Positive doshas, biorhythm peaks |
| `--roxy-warning` | `#ea580c` | `#fb923c` | Caution states, mid severity |
| `--roxy-danger` | `#dc2626` | `#ef4444` | Manglik present, critical days |
| `--roxy-info` | `#0284c7` | `#38bdf8` | Informational badges |
| `--roxy-bg` | `#ffffff` | `#0a0a0a` | Card and chart backgrounds |
| `--roxy-fg` | `#0a0a0a` | `#fafafa` | Body text |
| `--roxy-muted` | `#71717a` | `#a1a1aa` | Secondary text |
| `--roxy-border` | `#e4e4e7` | `#27272a` | Wheel lines, table borders |
| `--roxy-ring` | `rgba(245, 158, 11, 0.4)` | `rgba(251, 191, 36, 0.45)` | Focus outlines |

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

Three opt-in mechanisms work out of the box.

```css
/* System preference: nothing to do */

/* data-theme on the document */
:root[data-theme='dark'] { /* automatic */ }

/* Tailwind dark class on an ancestor */
.dark roxy-natal-chart { /* automatic */ }
```

### Map Tailwind tokens

Tailwind users can map our tokens to theirs in five lines of `globals.css`:

```css
:root {
	--roxy-bg: theme(colors.background);
	--roxy-fg: theme(colors.foreground);
	--roxy-accent: theme(colors.primary.DEFAULT);
	--roxy-border: theme(colors.border);
	--roxy-radius-md: theme(borderRadius.md);
}
```

## A11y

Color contrast must stay at 4.5:1 minimum against `--roxy-bg` for body text and 3:1 for large text. The defaults pass WCAG AA. Verify any custom palette with the axe Chrome extension or any contrast checker before shipping.
