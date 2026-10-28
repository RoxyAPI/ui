import { type PropType } from 'vue';
import type { CalculateZodiacAnimalResponse, GetDailyZodiacReadingResponse, GetZodiacAnimalResponse, GetZodiacCompatibilityResponse } from '../types/index.js';
export interface RoxyZodiacCardProps {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: CalculateZodiacAnimalResponse | GetZodiacAnimalResponse | GetDailyZodiacReadingResponse | GetZodiacCompatibilityResponse;
    /** Which of the four zodiac reads the response is: the animal a date falls in, the reference read of one animal, a daily reading, or the compatibility of a pair. */
    mode?: 'sign' | 'animal' | 'daily' | 'compatibility';
    /** Endpoint path for built-in self-fetch, e.g. "astrology/natal-chart". Optional: with a publishableKey or submitUrl and no endpoint, the component fetches its default endpoint, or the one its config prop (mode, period, type, spread, detail) selects. Set it to render any other endpoint the component draws. Pass `data` and no key for controlled mode. */
    endpoint?: string;
    /** HTTP method for the self-fetch request. Defaults to the method of the endpoint in use, and to POST beside an explicit endpoint. */
    method?: 'GET' | 'POST';
    /** Browser-safe publishable key (pk_) for self-fetch. A secret key is refused client-side and never sent. */
    publishableKey?: string;
    /** Override the API origin for self-hosted or proxied deployments. Absolute, or relative to the page for a same-origin route. */
    baseUrl?: string;
    /** Your own backend route, which holds the secret key. Every request the component makes, the city search included, is POSTed there as `{ path, method, body, query }` instead of calling RoxyAPI directly, and the component renders the JSON your route returns, so no key of any kind reaches the browser. */
    submitUrl?: string;
    /** An object of your own, sent to your submitUrl route as `context` beside the request, so a page can attach its own verification data to a proxied submission. Passed through untouched and never read by the component: what it holds is for your page and your route to agree on. Unset, nothing is added and the route receives the request exactly as before. Rides the submitUrl path only; a direct call sends what the endpoint declares. */
    submitContext?: Record<string, unknown>;
    /** Where the self-fetch form city search sends its GET, absolute or relative to the page. Optional beside submitUrl, which carries the city search too; set it only to send the city search somewhere else. Unset with no submitUrl, the search calls the public location endpoint. */
    locationUrl?: string;
    /** Override the OpenAPI spec URL the self-fetch form introspects. */
    specUrl?: string;
    /** Response language for self-fetch, forwarded to the API `lang` query parameter (en, tr, de, es, hi, pt, fr, ru). The form never shows a language field; the site owner sets it here. Defaults to English. */
    lang?: string;
    /** Override the self-fetch form submit-button label. Empty derives an outcome-first label from the endpoint (Get reading, Generate, Compare, Cast). */
    submitLabel?: string;
    /** Persist the last self-fetch form values in sessionStorage, keyed by endpoint, and prefill the form when the visitor returns. Off by default. */
    remember?: boolean;
    /** Your own words for a failed self-fetch the API did not explain (a dropped connection, a response with no message). A failure the API explains, such as a spent quota, reads as the API worded it. */
    errorMessage?: string;
    /** Render a small "Spiritual data by RoxyAPI" credit under a self-fetch result, linking back to RoxyAPI. Off by default; set any value to enable, or "off" to force it off. Never shown in controlled mode. */
    attribution?: string;
    /** Render the chart and the data and omit the written interpretation. Off by default. Use it when the page supplies its own words: the wheels, tables, grids, legends and numbers stay, and the interpretive prose is left out of the markup entirely. */
    hideReadings?: boolean;
    /** Comma-separated list of `part` names to take off this component, for example "patterns" or "patterns, legend". Per element rather than per site, so the same component can drop a block on one page and keep it on another with no CSS. Sibling of hideReadings and a different tool: this hides a whole block whatever it contains, where hideReadings drops interpretive prose out of the markup. Names come from the `parts` array in components-catalog.json; a name the component does not carry hides nothing and is not an error. */
    hideSections?: string;
}
export declare const RoxyZodiacCard: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<RoxyZodiacCardProps['data']>;
    };
    mode: {
        type: PropType<RoxyZodiacCardProps['mode']>;
    };
    endpoint: {
        type: PropType<RoxyZodiacCardProps['endpoint']>;
    };
    method: {
        type: PropType<RoxyZodiacCardProps['method']>;
    };
    publishableKey: {
        type: PropType<RoxyZodiacCardProps['publishableKey']>;
    };
    baseUrl: {
        type: PropType<RoxyZodiacCardProps['baseUrl']>;
    };
    submitUrl: {
        type: PropType<RoxyZodiacCardProps['submitUrl']>;
    };
    submitContext: {
        type: PropType<RoxyZodiacCardProps['submitContext']>;
    };
    locationUrl: {
        type: PropType<RoxyZodiacCardProps['locationUrl']>;
    };
    specUrl: {
        type: PropType<RoxyZodiacCardProps['specUrl']>;
    };
    lang: {
        type: PropType<RoxyZodiacCardProps['lang']>;
    };
    submitLabel: {
        type: PropType<RoxyZodiacCardProps['submitLabel']>;
    };
    remember: {
        type: PropType<RoxyZodiacCardProps['remember']>;
    };
    errorMessage: {
        type: PropType<RoxyZodiacCardProps['errorMessage']>;
    };
    attribution: {
        type: PropType<RoxyZodiacCardProps['attribution']>;
    };
    hideReadings: {
        type: PropType<RoxyZodiacCardProps['hideReadings']>;
    };
    hideSections: {
        type: PropType<RoxyZodiacCardProps['hideSections']>;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<RoxyZodiacCardProps['data']>;
    };
    mode: {
        type: PropType<RoxyZodiacCardProps['mode']>;
    };
    endpoint: {
        type: PropType<RoxyZodiacCardProps['endpoint']>;
    };
    method: {
        type: PropType<RoxyZodiacCardProps['method']>;
    };
    publishableKey: {
        type: PropType<RoxyZodiacCardProps['publishableKey']>;
    };
    baseUrl: {
        type: PropType<RoxyZodiacCardProps['baseUrl']>;
    };
    submitUrl: {
        type: PropType<RoxyZodiacCardProps['submitUrl']>;
    };
    submitContext: {
        type: PropType<RoxyZodiacCardProps['submitContext']>;
    };
    locationUrl: {
        type: PropType<RoxyZodiacCardProps['locationUrl']>;
    };
    specUrl: {
        type: PropType<RoxyZodiacCardProps['specUrl']>;
    };
    lang: {
        type: PropType<RoxyZodiacCardProps['lang']>;
    };
    submitLabel: {
        type: PropType<RoxyZodiacCardProps['submitLabel']>;
    };
    remember: {
        type: PropType<RoxyZodiacCardProps['remember']>;
    };
    errorMessage: {
        type: PropType<RoxyZodiacCardProps['errorMessage']>;
    };
    attribution: {
        type: PropType<RoxyZodiacCardProps['attribution']>;
    };
    hideReadings: {
        type: PropType<RoxyZodiacCardProps['hideReadings']>;
    };
    hideSections: {
        type: PropType<RoxyZodiacCardProps['hideSections']>;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
