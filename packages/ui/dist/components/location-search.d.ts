import { LitElement } from 'lit';
export interface CityResult {
    city: string;
    province?: string;
    country: string;
    iso2?: string;
    latitude: number;
    longitude: number;
    timezone: string;
    utcOffset: number;
    population?: number;
}
/**
 * Stateful location search input. Calls /location/search and emits
 * `roxy-location-select` CustomEvent with the chosen city. Required for any
 * chart endpoint.
 *
 * Lifted from jyotish-vedic-astrology-app/src/components/city-search.tsx,
 * keeping the 300ms debounce and click-outside behavior, replacing React
 * state with Lit reactive properties and using direct fetch to RoxyAPI.
 *
 * Attributes:
 *   api-key            optional. Direct call to roxyapi.com when set.
 *   publishable-key    optional. Browser-safe pk_* key with allowed_origins.
 *   endpoint           optional. Override URL (default https://roxyapi.com/api/v2/location/search).
 *   placeholder        optional. Input placeholder.
 *   default-value      optional. Pre-filled query.
 */
export declare class RoxyLocationSearch extends LitElement {
    static styles: import("lit").CSSResult[];
    apiKey?: string;
    publishableKey?: string;
    endpoint: string;
    placeholder: string;
    defaultValue: string;
    private query;
    private results;
    private isOpen;
    private isLoading;
    private highlight;
    private clickOutsideHandler?;
    private debouncedFetch;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private fetchResults;
    private onInput;
    private select;
    private onKeyDown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-location-search': RoxyLocationSearch;
    }
}
//# sourceMappingURL=location-search.d.ts.map