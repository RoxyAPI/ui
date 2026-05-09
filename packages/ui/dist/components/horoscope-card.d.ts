import { LitElement } from 'lit';
interface HoroscopeData {
    sign?: string;
    date?: string;
    overview?: string;
    love?: string;
    career?: string;
    health?: string;
    finance?: string;
    advice?: string;
    luckyNumber?: number | string;
    luckyColor?: string;
    compatibleSigns?: string[];
    moonSign?: string;
    moonPhase?: string;
    energyRating?: number;
    week?: string;
    month?: string;
    luckyDays?: string[];
    luckyNumbers?: number[];
}
/**
 * Daily, weekly, or monthly horoscope card. Pass `data` from
 * /astrology/horoscope/{sign}/{daily|weekly|monthly}.
 */
export declare class RoxyHoroscopeCard extends LitElement {
    static styles: import("lit").CSSResult[];
    data: HoroscopeData | null;
    period: 'daily' | 'weekly' | 'monthly';
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-horoscope-card': RoxyHoroscopeCard;
    }
}
export {};
//# sourceMappingURL=horoscope-card.d.ts.map