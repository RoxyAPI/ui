import { LitElement } from 'lit';
interface PlanetEntry {
    name?: string;
    planet?: string;
    longitude?: number;
    degree?: number;
    sign?: string;
}
interface InterAspect {
    planet1?: string;
    planet2?: string;
    aspect?: string;
    orb?: number;
    strength?: string;
    interpretation?: string;
}
interface SynastryData {
    person1?: {
        planets?: PlanetEntry[] | Record<string, PlanetEntry>;
        name?: string;
    };
    person2?: {
        planets?: PlanetEntry[] | Record<string, PlanetEntry>;
        name?: string;
    };
    compatibilityScore?: number;
    summary?: string;
    interAspects?: InterAspect[];
    strengths?: string[];
    challenges?: string[];
}
/**
 * Dual-wheel synastry chart with inter-aspects table. Pass `data` from
 * /astrology/synastry.
 */
export declare class RoxySynastryChart extends LitElement {
    static styles: import("lit").CSSResult[];
    data: SynastryData | null;
    render(): import("lit").TemplateResult<1>;
    private normalizePlanets;
    private renderSpokes;
    private renderSigns;
    private renderRing;
    private renderAspects;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-synastry-chart': RoxySynastryChart;
    }
}
export {};
//# sourceMappingURL=synastry-chart.d.ts.map