import * as React from 'react';
import type { SearchCitiesResponse } from '../types/index.js';
type ElementAttrs = Omit<React.HTMLAttributes<HTMLElement>, 'children'>;
export interface RoxyLocationSearchProps extends ElementAttrs {
    className?: string;
    style?: React.CSSProperties;
    /** Browser-safe publishable key (pk_) the search sends with its request. A secret key is refused client-side and never sent. Leave unset when `endpoint` or `submitUrl` points at your own server route. */
    publishableKey?: string;
    /** Where the search sends its GET while the visitor types, as an absolute URL or a page-relative path such as "/api/roxy/location". Wins over submitUrl. Unset with no submitUrl, the search calls the RoxyAPI location search. */
    endpoint?: string;
    /** Your own backend route, which holds the secret key. With no endpoint set, each search is POSTed there as `{ path: "/location/search", method: "GET", query: { q, limit } }`, the shape every component request takes there. */
    submitUrl?: string;
    /** An object of your own, sent to your submitUrl route as `context` beside the search. Passed through untouched and never read. */
    submitContext?: Record<string, unknown>;
    /** Input placeholder. The default renders in the page language; a caller-supplied one is printed as given. */
    placeholder?: string;
    /** Initial text in the input, for restoring a previous search. */
    defaultValue?: string;
    /** Fires when the underlying <roxy-location-search> dispatches `roxy-location-select`. */
    onRoxyLocationSelect?: (event: CustomEvent<NonNullable<SearchCitiesResponse['cities']>[number] | {
        latitude?: number;
        longitude?: number;
        timezone?: string;
        utcOffset?: number;
        city?: string;
        province?: string;
        country?: string;
    }>) => void;
    /** Fires when the underlying <roxy-location-search> dispatches `roxy-validation-error`. */
    onRoxyValidationError?: (event: CustomEvent<{
        reason: string;
        message: string;
    }>) => void;
}
export declare const RoxyLocationSearch: React.ForwardRefExoticComponent<RoxyLocationSearchProps & React.RefAttributes<HTMLElement | null>>;
export {};
