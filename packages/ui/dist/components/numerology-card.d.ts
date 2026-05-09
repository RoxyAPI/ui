import { LitElement } from 'lit';
interface NumerologyCommon {
    number?: number;
    calculation?: string;
    type?: 'single' | 'master' | string;
    hasKarmicDebt?: boolean;
    karmicDebtNumber?: number;
    karmicDebtMeaning?: string;
    meaning?: string;
}
interface CoreNumber {
    number?: number;
    type?: string;
    meaning?: string;
    calculation?: string;
}
interface FullChart {
    profile?: {
        fullName?: string;
        birthDate?: string;
    };
    coreNumbers?: Record<string, CoreNumber | number>;
    additionalInsights?: Record<string, unknown>;
    birthDayProfile?: Record<string, unknown>;
    maturityStatus?: string;
    luckyAssociations?: Record<string, unknown>;
    summary?: string;
}
interface PersonalYear {
    year?: number;
    personalYear?: number;
    title?: string;
    theme?: string;
    keywords?: string[];
    meaning?: string;
    advice?: string;
}
type NumerologyData = NumerologyCommon & FullChart & PersonalYear;
/**
 * Numerology card. Renders /numerology/{life-path,expression,personal-year,chart}.
 * Use the `type` attribute to switch the layout.
 */
export declare class RoxyNumerologyCard extends LitElement {
    static styles: import("lit").CSSResult[];
    data: NumerologyData | null;
    type: 'life-path' | 'expression' | 'personal-year' | 'chart';
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-numerology-card': RoxyNumerologyCard;
    }
}
export {};
//# sourceMappingURL=numerology-card.d.ts.map