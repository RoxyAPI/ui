import { LitElement } from 'lit';
interface PanchangTime {
    start?: string;
    end?: string;
}
interface PanchangData {
    date?: string;
    location?: {
        name?: string;
        latitude?: number;
        longitude?: number;
    };
    vara?: string;
    sunrise?: string;
    sunset?: string;
    moonrise?: string;
    moonset?: string;
    sunSign?: string;
    moonSign?: string;
    sunNakshatra?: string;
    tithi?: string | {
        name?: string;
        phase?: string;
        end?: string;
    };
    nakshatra?: string | {
        name?: string;
        lord?: string;
        end?: string;
    };
    yoga?: string | {
        name?: string;
        end?: string;
    };
    karana?: string | {
        name?: string;
        end?: string;
    };
    hora?: string;
    rahuKaal?: PanchangTime;
    yamaganda?: PanchangTime;
    gulika?: PanchangTime;
    abhijitMuhurta?: PanchangTime;
    brahmaMuhurta?: PanchangTime;
    vijayaMuhurta?: PanchangTime;
    nishitaMuhurta?: PanchangTime;
    godhuliMuhurta?: PanchangTime;
    pratahSandhya?: PanchangTime;
    sayahnaSandhya?: PanchangTime;
    durMuhurta?: PanchangTime[];
    varjyam?: PanchangTime[];
    amritKalam?: PanchangTime[];
    chandrabalam?: string | string[];
    tarabalam?: string;
    panchaka?: string;
    bhadra?: string;
    sunLongitude?: number;
    moonLongitude?: number;
}
/**
 * Panchang table for /vedic-astrology/panchang/{basic,detailed}. Detailed mode
 * renders 15+ muhurtas. Basic mode renders the five elements only.
 */
export declare class RoxyPanchangTable extends LitElement {
    static styles: import("lit").CSSResult[];
    data: PanchangData | null;
    detail: 'basic' | 'detailed';
    render(): import("lit").TemplateResult<1>;
    private formatPart;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-panchang-table': RoxyPanchangTable;
    }
}
export {};
//# sourceMappingURL=panchang-table.d.ts.map