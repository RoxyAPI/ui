import { capitalize } from './string.js';

/**
 * Stable, theme-token stroke color per celestial body, for the multi-line map components (astrocartography, local space) where every body needs a distinct line that still follows the host theme.
 *
 * @remarks
 * Values are `var(--roxy-*)` references, so light and dark both resolve through the design tokens and a host override repaints every line with no rebuild. Classical bodies map to a fixed semantic token; any body the map omits (localized names, asteroids, the lunar nodes, Chiron, Lilith) falls back to a deterministic cycle keyed by its index in the response, so colors stay stable across re-renders and do not collide within the common 14-body set. Strokes and glyph fills are non-text chart marks, so the brighter base tokens are used directly rather than the WCAG-AA text variants.
 */
const PLANET_COLOR: Record<string, string> = {
	Sun: 'var(--roxy-accent)',
	Moon: 'var(--roxy-secondary)',
	Mercury: 'var(--roxy-info)',
	Venus: 'var(--roxy-success)',
	Mars: 'var(--roxy-danger)',
	Jupiter: 'var(--roxy-warning)',
	Saturn: 'var(--roxy-muted)',
	Uranus: 'var(--roxy-info-fg)',
	Neptune: 'var(--roxy-success-fg)',
	Pluto: 'var(--roxy-danger-fg)',
};

/** Deterministic fallback palette for bodies outside {@link PLANET_COLOR} (nodes, Chiron, Lilith, asteroids, or localized names). Keyed by response index so a given body keeps one color. */
const CYCLE = [
	'var(--roxy-accent)',
	'var(--roxy-info)',
	'var(--roxy-success)',
	'var(--roxy-danger)',
	'var(--roxy-warning)',
	'var(--roxy-secondary)',
	'var(--roxy-info-fg)',
	'var(--roxy-success-fg)',
	'var(--roxy-danger-fg)',
	'var(--roxy-accent-ink)',
	'var(--roxy-warning-fg)',
	'var(--roxy-primary)',
];

/** Theme-token color for a body, by name with an index fallback. {@link capitalize} matches the canonical TitleCase keys; unmapped or localized names cycle by `index`. */
export function planetColor(name: string, index = 0): string {
	return (
		PLANET_COLOR[capitalize(name)] ??
		CYCLE[index % CYCLE.length] ??
		'var(--roxy-accent)'
	);
}
