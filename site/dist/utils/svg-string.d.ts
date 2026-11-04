import { type Translate } from '../i18n/registry.js';
/** The namespace a standalone SVG document declares on its root, so a string saved as `image/svg+xml` parses. */
export declare const SVG_XMLNS = "http://www.w3.org/2000/svg";
/** Markup already written by {@link svg}, passed through a later interpolation as is. */
export declare class SvgMarkup {
    readonly markup: string;
    constructor(markup: string);
}
/** A value an {@link svg} interpolation accepts: an empty value writes nothing, like an absent part of a template. */
type SvgValue = SvgMarkup | string | number | null | undefined | readonly SvgValue[];
/** SVG markup as a plain string, written like a chart template: text is escaped, nested markup and lists pass through, and a value right after `=` becomes a quoted attribute, so one drawing serves a component, a worker and a server. */
export declare function svg(strings: TemplateStringsArray, ...values: SvgValue[]): SvgMarkup;
/** The options every chart drawing takes. */
export interface ChartOptions {
    /** The language the chart writes its own words in; the response values are drawn as the response carries them. A catalogue loaded from `@roxyapi/ui/locales/{lang}` is what translates them, and English needs none. */
    lang?: string;
}
/** The chrome translator for a chart drawn outside an element. */
export declare function chartTranslator(lang: string | undefined): Translate;
export {};
