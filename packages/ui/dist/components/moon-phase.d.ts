import { LitElement } from 'lit';
interface MoonPhaseData {
    date?: string;
    phase?: string;
    illumination?: number;
    age?: number;
    sign?: string;
    degree?: number;
    distance?: number;
    meaning?: {
        name?: string;
        symbol?: string;
        description?: string;
        keywords?: string[];
    };
    month?: string;
    year?: number;
    phases?: Array<MoonPhaseData>;
    upcoming?: Array<MoonPhaseData>;
}
/**
 * Moon phase card. Renders /astrology/moon-phase/{current,upcoming,calendar/...}.
 */
export declare class RoxyMoonPhase extends LitElement {
    static styles: import("lit").CSSResult[];
    data: MoonPhaseData | null;
    mode: 'current' | 'upcoming' | 'calendar';
    render(): import("lit").TemplateResult<1>;
    private renderSingle;
    private renderListItem;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-moon-phase': RoxyMoonPhase;
    }
}
export {};
//# sourceMappingURL=moon-phase.d.ts.map