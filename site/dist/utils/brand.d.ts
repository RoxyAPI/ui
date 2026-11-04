import { type FontKey } from '../styles/fonts.js';
import { type PaletteName } from '../styles/palette-names.js';
/** The accent ink in light mode, as `tokens.css` and every preset derive it. */
export declare const LIGHT_ACCENT_INK = "color-mix(in oklab, var(--roxy-accent) 70%, black)";
/** The accent ink in dark mode, as `tokens.css` and every preset derive it. */
export declare const DARK_ACCENT_INK = "var(--roxy-accent)";
/** The focus ring, as `tokens.css` derives it from the accent. */
export declare const ACCENT_RING = "color-mix(in srgb, var(--roxy-accent) 40%, transparent)";
/** A brand hex as six lowercase digits, `#rgb` spelled out, or undefined for anything the brand attributes ignore. */
export declare function brandHex(value: string | undefined): string | undefined;
/** True for a key of a published font pair. */
export declare function isFontKey(value: string | undefined): value is FontKey;
/** True for a key of a published theme preset. */
export declare function isThemeKey(value: string | undefined): value is PaletteName;
/** The host declarations a brand colour and a brand accent ask for, each re-deriving what the tokens derive from it; a value that is not `#rgb` or `#rrggbb` adds nothing. */
export declare function brandDeclarations(brand: {
    brandColor?: string;
    brandAccent?: string;
}): string;
/** The font pair an element declares: its own valid `font`, else the key a theme preset (or a page) names in `--roxy-font`, on the element or inherited (read with the element's own written pair off), unless the page set a font stack of its own, else none, which keeps the page font. An element drawn inside another one declares nothing of its own unless asked, because it inherits the pair from the element that draws it. */
export declare function resolveFontKey(host: Element, explicit?: string): FontKey | undefined;
/** The host declarations for a pair: the key, so a nested element resolves the same pair, and both stacks. */
export declare function fontDeclarations(key: FontKey): string;
/** Link a font pair's stylesheet into the document once, from `dist` (the release that served this code); a system pair, no `dist` and a missing document add nothing. */
export declare function injectRoxyFont(key: FontKey, dist?: string | undefined): void;
