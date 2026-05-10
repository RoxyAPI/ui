import { LitElement } from 'lit';
import type { GetDailyHoroscopeResponse, GetMonthlyHoroscopeResponse, GetWeeklyHoroscopeResponse } from '../types/index.js';
type HoroscopeData = GetDailyHoroscopeResponse | GetWeeklyHoroscopeResponse | GetMonthlyHoroscopeResponse;
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