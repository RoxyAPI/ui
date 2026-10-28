import * as React from 'react';
import type { CalculateConnectionResponse } from '../types/index.js';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'data'>;
export interface RoxyHdConnectionProps extends ElementAttrs {
    /** Spec-derived response payload. Pass the raw RoxyAPI response. */
    data?: CalculateConnectionResponse;
    className?: string;
    style?: React.CSSProperties;
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
export declare const RoxyHdConnection: React.ForwardRefExoticComponent<RoxyHdConnectionProps & React.RefAttributes<HTMLElement | null>>;
export {};
