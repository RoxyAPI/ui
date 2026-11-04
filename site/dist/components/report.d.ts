import type { ChromeString } from '../i18n/chrome-strings.js';
import type { GenerateNatalReportResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
/** Every report operation answers this one shape. */
type ReportResponse = GenerateNatalReportResponse;
/** The two output formats the element shows: a download, or the document in place. */
export type ReportFormat = 'pdf' | 'html';
/** The sentence, in the page language, that leads the API message for a failure a visitor can act on. */
export declare function failureLead(failure: {
    status?: number;
    code?: string;
}): ChromeString | undefined;
/** The request `branding` the brand attributes describe, or undefined when none is set; a colour, font or theme the attributes ignore is left out. */
export declare function reportBranding(brand: {
    name?: string;
    logo?: string;
    footer?: string;
    color?: string;
    accent?: string;
    font?: string;
    theme?: string;
}): Record<string, unknown> | undefined;
/**
 * A branded report for any report operation: the visitor fills the form the operation asks for, and receives the finished document under the site owner's name, as a PDF download or in place on the page.
 *
 * @remarks
 * `report` picks the operation by its id, the last segment of its path; every report the API publishes is one, so a new one needs no new element. The brand attributes, `font` and `theme` reach the request `branding`, the same `brand-color`, `brand-accent` and `font` paint the form, so the page and the document share one look, and `hide-readings` asks for the charts without the written reading.
 */
export declare class RoxyReport extends RoxyDataElement<ReportResponse> {
    static endpoints: readonly import("../generated/endpoint-defaults.js").SelfFetchEndpoint[];
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    /** The report id, the last segment of its path (`natal`, `kundli`); the published ids are the `report` values in `components-catalog.json`. Unset, the first report is used. */
    report?: string;
    /** `pdf` offers the document as a download; `html` shows it in place. Anything else is `pdf`. */
    format: ReportFormat;
    /** The business or practitioner name printed on the cover and every page. */
    brandName?: string;
    /** An HTTPS URL of the logo printed on the cover. */
    brandLogo?: string;
    /** The line printed at the foot of every page, such as a disclaimer or a booking note. */
    brandFooter?: string;
    /** The theme preset the document is printed in, a `key` from `themes[]` in `components-catalog.json`; any other value is ignored. */
    theme?: string;
    private readonly pdfUrl;
    private frameObserver?;
    protected ownRequest(): Record<string, unknown>;
    disconnectedCallback(): void;
    protected renderData(d: ReportResponse): unknown;
    /** The HTML report in a frame of its own, so its stylesheet reads its own root and nothing on the page restyles it; no script runs inside. */
    private renderDocument;
    /** Size the frame to the document it holds, and keep it sized as the page width reflows it. */
    private fitFrame;
    protected renderLoading(): import("lit").TemplateResult<1>;
    protected renderError(message: string): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-report': RoxyReport;
    }
}
export {};
