/**
 * Single source of truth for component metadata. Every consumer that needs
 * the (tag, pascal, slug, domain, description, heading, endpoints) tuple
 * reads from here: scripts/build-react.ts, scripts/build-registry.ts,
 * scripts/sync-docs.ts, scripts/build-widgets.ts, and the browser-side
 * apps/docs/manifest.js (mirrored at build time).
 *
 * Hand-maintained. Add a component → add one entry here. The OpenAPI spec
 * does not yet carry component metadata, so this stays manual.
 */
export type RoxyDomain = 'astrology' | 'vedic' | 'numerology' | 'tarot' | 'biorhythm' | 'iching' | 'utility';
export interface RoxyComponent {
    /** Pascal-case React export name, e.g. RoxyNatalChart */
    pascal: string;
    /** Custom-element tag, e.g. roxy-natal-chart */
    tag: string;
    /** Slug used in registry filenames and shadcn paths, e.g. natal-chart */
    slug: string;
    /** Domain bucket for filtering. */
    domain: RoxyDomain;
    /** Short human-readable heading shown on demo cards. */
    heading: string;
    /** SDK methods this component is designed to render. */
    endpoints: string[];
    /** One-line description for registry / docs / SEO meta. */
    description: string;
    /** Domain column label in the synced README/AGENTS table. */
    docsLabel: string;
    /** Endpoint(s) column body in the synced README/AGENTS table. */
    endpointLabel: string;
    /** What-it-renders column body in the synced README/AGENTS table. */
    docsSummary: string;
    /** Filter category in the browser demo grid. */
    topic: string;
    /**
     * True when the component does not consume a typed RoxyAPI response from a
     * customer server route. Three cases today:
     *   - <roxy-data>: pure renderer, accepts any shape, no fetch.
     *   - <roxy-location-search>: calls /location/search itself via publishable key.
     *   - <roxy-endpoint-form>: introspects the OpenAPI spec, emits roxy-submit.
     * The shadcn registry codegen emits a different doc body for these so we
     * never document a server route example with an undefined `data` reference.
     */
    selfFetching?: boolean;
}
export declare const ROXY_COMPONENTS: readonly RoxyComponent[];
export type RoxyComponentTag = (typeof ROXY_COMPONENTS)[number]['tag'];
export type RoxyComponentSlug = (typeof ROXY_COMPONENTS)[number]['slug'];
//# sourceMappingURL=manifest.d.ts.map