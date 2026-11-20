import type { InterpSection } from './interp-accordion.js';
/** A summary and its detail as one accordion row takes them: the summary as the body and every paragraph of the detail under it. */
export declare function summaryProse(reading: {
    summary?: string;
    detailed?: string;
} | undefined): Pick<InterpSection, 'body' | 'extra'>;
