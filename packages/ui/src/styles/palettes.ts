/**
 * Theme preset palettes: the single source of truth for the shipped Roxy UI themes. Each entry drives a generated `styles/themes/{name}.css` file (via `scripts/sync-themes.ts`) and the demo customizer presets (via `scripts/sync-manifest.ts`). Edit the data here and rerun the codegen; never hand-edit the generated CSS.
 *
 * @remarks Every palette only reassigns `--roxy-*` tokens, so a theme file composes with the core token contract in `tokens.css` instead of replacing it. Light values are the practitioner-grade palettes; each dark surface and border is tuned by OKLCH rule rather than by eye: lightness of the card surface sits at least 0.06 above the page background and the border at least 0.05 above the surface, keeping each palette's own hue and chroma so the elevation reads as a warm lift, not a grey one, while foreground/surface stays above 7:1 and muted/surface above 4.5:1 for WCAG. The `practitioner` preset is the rosewater palette and keeps the shipped filename `practitioner.css`.
 */

export type PaletteName = 'practitioner' | 'eucalyptus' | 'kiln' | 'moonlit';

/** The theme-varying tokens one palette sets per mode. `accent-ink` and `ring` derive from `accent`, and `danger` is shared, so none of them appear here. */
export interface PaletteTokens {
	accent: string;
	secondary: string;
	bg: string;
	surface: string;
	fg: string;
	muted: string;
	border: string;
}

export interface Palette {
	light: PaletteTokens;
	dark: PaletteTokens;
}

/**
 * Chrome that never varies by palette, declared once in each theme's light block and inherited by the dark blocks. `danger` still varies by mode; the rest are mode-invariant.
 */
export const SHARED_THEME = {
	fontImport:
		'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Jost:wght@400..600&display=swap',
	fontSans:
		'"Jost", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	fontDisplay:
		'"Fraunces", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
	radius: { sm: '0.4375rem', md: '0.875rem', lg: '1.575rem' },
	shadow: { sm: 'none', md: 'none', lg: 'none' },
	danger: { light: '#b23a38', dark: '#e4736b' },
} as const;

export const ROXY_PALETTES: Record<PaletteName, Palette> = {
	practitioner: {
		light: {
			accent: '#914955',
			secondary: '#503a3a',
			bg: '#fbf6f3',
			surface: '#f5e8e0',
			fg: '#3e2a2c',
			muted: '#7e625f',
			border: '#ead9d2',
		},
		dark: {
			accent: '#d9a2a6',
			secondary: '#e0cecb',
			bg: '#231619',
			surface: '#37272b',
			fg: '#f2e4df',
			muted: '#b39698',
			border: '#49353a',
		},
	},
	eucalyptus: {
		light: {
			accent: '#4c7060',
			secondary: '#3a4037',
			bg: '#f8f7f2',
			surface: '#edefe6',
			fg: '#22281f',
			muted: '#666d63',
			border: '#dce0d3',
		},
		dark: {
			accent: '#9cc0ac',
			secondary: '#cfd5ca',
			bg: '#191e19',
			surface: '#2a312a',
			fg: '#e9ede3',
			muted: '#9fa89b',
			border: '#384138',
		},
	},
	kiln: {
		light: {
			accent: '#a44a24',
			secondary: '#493d30',
			bg: '#faf4ea',
			surface: '#efe6d6',
			fg: '#322820',
			muted: '#74634f',
			border: '#e6d8c2',
		},
		dark: {
			accent: '#d98d5f',
			secondary: '#dccdbc',
			bg: '#211710',
			surface: '#35281e',
			fg: '#f2e7d9',
			muted: '#b49d87',
			border: '#463729',
		},
	},
	moonlit: {
		light: {
			accent: '#254b5a',
			secondary: '#2d3c47',
			bg: '#faf6ec',
			surface: '#f1eadb',
			fg: '#14232e',
			muted: '#5c6a76',
			border: '#e4dbc6',
		},
		dark: {
			accent: '#c9a96b',
			secondary: '#ced0c7',
			bg: '#0b1826',
			surface: '#1b2a39',
			fg: '#efe7d3',
			muted: '#92a4b2',
			border: '#263a4c',
		},
	},
};
