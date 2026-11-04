/** One self-hosted `@font-face` source: a family plus the subset file that carries it. */
export interface SelfHostedFontFace {
    family: 'Fraunces' | 'Jost' | 'Geist';
    /** Path under `dist/styles/fonts/`, mirrored verbatim on jsDelivr. */
    file: string;
    /** Matches the Google Fonts subset split this replaces, so a page still pays only for the script it renders. */
    unicodeRange: string;
}
export type FontKey = 'fraunces-jost' | 'jost' | 'geist' | 'system';
/** One choosable font pair: the stack for body text and the stack for headings. */
export interface RoxyFont {
    name: string;
    sans: string;
    display: string;
}
/** The font pairs a widget, a report and a plugin may choose, one definition each, published as `fonts[]` in `components-catalog.json`. */
export declare const ROXY_FONTS: Record<FontKey, RoxyFont>;
/** The self-hosted families a font pair names in its two stacks; a system pair names none. */
export declare function fontFamilies(key: FontKey): SelfHostedFontFace['family'][];
/** The subset files a font pair loads, published beside the pair's stylesheet. */
export declare function fontFaces(key: FontKey): SelfHostedFontFace[];
/** `@font-face` rules for subset files served under `base`, the folder that holds each family's directory, one per subset so a page downloads only the script it renders. */
export declare function fontFaceCss(faces: SelfHostedFontFace[], base: string): string;
