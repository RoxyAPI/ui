/**
 * Theme preset palettes: the single source of truth for the shipped Roxy UI themes. Each entry drives a generated `styles/themes/{name}.css` file (via `scripts/sync-themes.ts`) and the demo customizer presets (via `scripts/sync-manifest.ts`). Edit the data here and rerun the codegen; never hand-edit the generated CSS.
 *
 * @remarks Every palette only reassigns `--roxy-*` tokens, so a theme file composes with the core token contract in `tokens.css` instead of replacing it. Light values are the practitioner-grade palettes; each dark surface and border is tuned by OKLCH rule rather than by eye: lightness of the card surface sits at least 0.06 above the page background and the border at least 0.05 above the surface, keeping each palette's own hue and chroma so the elevation reads as a warm lift, not a grey one, while foreground/surface stays above 7:1 and muted/surface above 4.5:1 for WCAG. The `practitioner` key keeps the shipped filename `practitioner.css` and displays as Rosewater; every surface that names a preset reads {@link Palette.displayName}.
 */
export type PaletteName = 'practitioner' | 'eucalyptus' | 'kiln' | 'moonlit' | 'celeste';
/** One self-hosted `@font-face` source: a family plus the subset file that carries it. */
export interface SelfHostedFontFace {
    family: 'Fraunces' | 'Jost';
    /** Path under `dist/styles/fonts/`, mirrored verbatim on jsDelivr. */
    file: string;
    /** Matches the Google Fonts subset split this replaces, so a page still pays only for the script it renders. */
    unicodeRange: string;
}
/**
 * The practitioner preset is the one theme served inside the hosted `/embed` shell, whose CSP allows styles and fonts only from `self` and jsDelivr. It self-hosts its two families from this package instead of importing them from Google Fonts; the other three presets are never served under that CSP and keep the `@import`. Weight range (400 to 600, the same span the `@import` requested) and subset split mirror Google Fonts exactly, so no language loses coverage it had.
 */
export declare const SELF_HOSTED_FONT_PALETTE: PaletteName;
export declare const SELF_HOSTED_FACES: SelfHostedFontFace[];
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
/** Type, radius and shadow a preset sets once for both modes; `fontImport` is null for a system stack. */
export interface ThemeChrome {
    fontImport: string | null;
    fontSans: string;
    fontDisplay: string;
    radius: {
        sm: string;
        md: string;
        lg: string;
    };
    shadow: {
        sm: string;
        md: string;
        lg: string;
    };
}
export interface Palette {
    /** The proper name a picker, a doc or a plugin shows, never translated; the key stays the file name. */
    displayName: string;
    light: PaletteTokens;
    dark: PaletteTokens;
    /** Overrides the shared chrome for a preset with a type system of its own. */
    chrome?: Partial<ThemeChrome>;
}
/**
 * Chrome every preset shares unless its palette overrides it, declared once in each theme light block and inherited by the dark blocks. `danger` varies by mode; the rest are mode-invariant.
 */
export declare const SHARED_THEME: ThemeChrome & {
    danger: {
        light: string;
        dark: string;
    };
};
/** The chrome one preset ships: the shared set with its own overrides on top. */
export declare function themeChrome(name: PaletteName): ThemeChrome;
export declare const ROXY_PALETTES: Record<PaletteName, Palette>;
/** Every colour one preset sets in one mode, its own tokens plus the shared `danger`; the one source for the theme stylesheets and the published catalog. */
export declare function paletteColors(name: PaletteName, mode: 'light' | 'dark'): PaletteTokens & {
    danger: string;
};
